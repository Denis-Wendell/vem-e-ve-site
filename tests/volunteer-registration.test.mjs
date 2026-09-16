import assert from "node:assert/strict";
import { test } from "node:test";
import { buildVolunteerPayload, sendVolunteerApplication, volunteerAreas, VolunteerValidationError } from "../lib/volunteer-registration.ts";

const application = {
  name: "Pessoa de Teste",
  phone: "(92) 99999-0000",
  church: "Igreja de Teste",
  servesInMinistry: "sim",
  ministry: "Recepção",
  areaId: "midia",
  consent: true,
  website: "",
};

const options = () => ({ signal: new AbortController().signal, pageUrl: "http://localhost:3000/#servir" });

test("preserva a área selecionada e os dados da inscrição em cada uma das quatro áreas", () => {
  for (const area of volunteerAreas) {
    const payload = buildVolunteerPayload({ ...application, areaId: area.id });
    assert.equal(payload["Área de interesse"], area.name);
    assert.equal(payload.Nome, application.name);
    assert.equal(payload["Igreja local"], application.church);
    assert.equal(payload["Ministério na igreja local"], "Recepção");
    assert.match(payload._subject, new RegExp(area.name));
  }
});

test("normaliza celular com código do Brasil e remove espaços extras", () => {
  const payload = buildVolunteerPayload({ ...application, phone: "+55 (92) 99999-0000", name: "  Pessoa de Teste  ", church: " Igreja de Teste " });
  assert.equal(payload.Celular, "(92) 99999-0000");
  assert.equal(payload.Nome, "Pessoa de Teste");
  assert.equal(payload["Igreja local"], "Igreja de Teste");
});

test("não inclui ministério antigo quando a pessoa muda a resposta para não", () => {
  const payload = buildVolunteerPayload({ ...application, servesInMinistry: "nao", ministry: "Informação anterior" });
  assert.equal(payload["Já serve em um ministério"], "Não");
  assert.equal(payload["Ministério na igreja local"], "Não se aplica");
});

test("rejeita campos vazios, celular inválido, área desconhecida, falta de consentimento e honeypot", () => {
  const cases = [
    [{ name: "   " }, "name"],
    [{ church: "  " }, "church"],
    [{ phone: "99999-0000" }, "phone"],
    [{ phone: "(92) 3333-0000" }, "phone"],
    [{ phone: "(00) 99999-0000" }, "phone"],
    [{ servesInMinistry: "" }, "servesInMinistry"],
    [{ ministry: "  " }, "ministry"],
    [{ areaId: "desconhecida" }, "area"],
    [{ consent: false }, "consent"],
    [{ website: "https://spam.example" }, "name"],
  ];
  for (const [change, field] of cases) {
    assert.throws(() => buildVolunteerPayload({ ...application, ...change }), (error) => error instanceof VolunteerValidationError && error.field === field);
  }
});

test("envia os campos por POST JSON ao destinatário e aceita confirmação explícita", async () => {
  for (const success of [true, "true"]) {
    let calls = 0;
    await sendVolunteerApplication(buildVolunteerPayload(application), {
      ...options(),
      fetcher: async (url, init) => {
        calls += 1;
        const recipient = process.env.NEXT_PUBLIC_VOLUNTEER_EMAIL?.trim() || "deniswendell0101@gmail.com";
        assert.equal(url, `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`);
        assert.equal(init.method, "POST");
        assert.equal(init.headers["Content-Type"], "application/json");
        assert.equal(init.credentials, "omit");
        assert.ok(init.signal instanceof AbortSignal);
        const body = JSON.parse(init.body);
        assert.equal(body["Área de interesse"], "Mídia");
        assert.equal(body._url, "http://localhost:3000/#servir");
        assert.equal(body._template, "table");
        return Response.json({ success });
      },
    });
    assert.equal(calls, 1);
  }
});

test("HTTP 200 com false, string false ou sem confirmação nunca é tratado como sucesso", async () => {
  for (const result of [{ success: false }, { success: "false" }, { success: 1 }, {}, null]) {
    await assert.rejects(sendVolunteerApplication(buildVolunteerPayload(application), { ...options(), fetcher: async () => Response.json(result) }), /Não foi possível confirmar/);
  }
});

test("rejeita resposta HTTP de erro ou conteúdo inesperado", async () => {
  for (const response of [Response.json({ success: true }, { status: 500 }), new Response("<html>Erro</html>", { status: 200 })]) {
    await assert.rejects(sendVolunteerApplication(buildVolunteerPayload(application), { ...options(), fetcher: async () => response }), /Não foi possível confirmar/);
  }
});

test("informa limite de envios sem confirmar inscrição", async () => {
  await assert.rejects(sendVolunteerApplication(buildVolunteerPayload(application), { ...options(), fetcher: async () => new Response("", { status: 429 }) }), /Aguarde alguns minutos/);
});

test("falha de rede ou cancelamento não produz confirmação falsa", async () => {
  for (const error of [new TypeError("Network error"), new DOMException("Aborted", "AbortError")]) {
    await assert.rejects(sendVolunteerApplication(buildVolunteerPayload(application), { ...options(), fetcher: async () => { throw error; } }), /Não conseguimos confirmar o envio/);
  }
});
