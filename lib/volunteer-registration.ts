export const volunteerAreas = [
  { id: "midia", name: "Mídia", summary: "Histórias que precisam ser contadas.", detail: "Fotografia, vídeo, design, redes sociais e transmissão. Use sua criatividade para levar essa mensagem mais longe.", number: "01" },
  { id: "intercessao", name: "Intercessão", summary: "Cada passo começa em oração.", detail: "Sustente cada etapa do movimento em oração, intercedendo pelas pessoas, pelas equipes e pelos lugares que vamos alcançar.", number: "02" },
  { id: "louvor", name: "Louvor", summary: "Uma só voz. Um só propósito.", detail: "Músicos, vocalistas e técnicos unidos para servir. Coloque seus dons a serviço de momentos de louvor e adoração a Jesus.", number: "03" },
  { id: "apoio", name: "Recepção e apoio", summary: "O cuidado está nos detalhes.", detail: "Acolhimento, organização, produção e suporte. Ajude a preparar cada encontro e a receber cada pessoa com cuidado.", number: "04" },
] as const;

export type VolunteerArea = (typeof volunteerAreas)[number];

export type VolunteerApplication = {
  name: string;
  phone: string;
  church: string;
  servesInMinistry: string;
  ministry: string;
  areaId: string;
  consent: boolean;
  website: string;
};

export class VolunteerValidationError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = "VolunteerValidationError";
    this.field = field;
  }
}

export function buildVolunteerPayload(application: VolunteerApplication): Record<string, string> {
  const name = application.name.trim();
  const church = application.church.trim();
  const ministry = application.ministry.trim();
  const area = volunteerAreas.find((item) => item.id === application.areaId);
  let phone = application.phone.replace(/\D/g, "");
  if (phone.length === 13 && phone.startsWith("55")) phone = phone.slice(2);

  if (application.website) throw new VolunteerValidationError("Não foi possível enviar. Recarregue a página e tente novamente.", "name");
  if (name.length < 2 || name.length > 120) throw new VolunteerValidationError("Informe seu nome completo.", "name");
  if (!/^[1-9]\d9\d{8}$/.test(phone)) throw new VolunteerValidationError("Informe um celular válido com DDD e nove dígitos, como (92) 99999-9999.", "phone");
  if (church.length < 2 || church.length > 160) throw new VolunteerValidationError("Informe o nome da igreja local que você frequenta.", "church");
  if (!["sim", "nao"].includes(application.servesInMinistry)) throw new VolunteerValidationError("Informe se você já serve em um ministério.", "servesInMinistry");
  if (application.servesInMinistry === "sim" && (ministry.length < 2 || ministry.length > 160)) throw new VolunteerValidationError("Informe em qual ministério você serve.", "ministry");
  if (!area) throw new VolunteerValidationError("Feche o formulário e selecione uma área de interesse.", "area");
  if (!application.consent) throw new VolunteerValidationError("Autorize o uso dos seus dados para análise da inscrição e contato.", "consent");

  return {
    Nome: name,
    Celular: `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`,
    "Igreja local": church,
    "Já serve em um ministério": application.servesInMinistry === "sim" ? "Sim" : "Não",
    "Ministério na igreja local": application.servesInMinistry === "sim" ? ministry : "Não se aplica",
    "Área de interesse": area.name,
    "Autorização para análise e contato": "Sim",
    _subject: `Nova inscrição de voluntário — ${area.name} | Vem e Vê`,
    _template: "table",
    _captcha: "false",
    _honey: "",
  };
}

export async function sendVolunteerApplication(
  payload: Record<string, string>,
  options: { signal: AbortSignal; pageUrl: string; fetcher?: typeof fetch },
): Promise<void> {
  const recipient = process.env.NEXT_PUBLIC_VOLUNTEER_EMAIL?.trim();
  if (!recipient) {
    throw new Error("As inscrições estão temporariamente indisponíveis. Tente novamente mais tarde.");
  }
  const fetcher = options.fetcher ?? fetch;
  let response: Response;

  try {
    response = await fetcher(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, _url: options.pageUrl }),
      signal: options.signal,
      credentials: "omit",
    });
  } catch {
    throw new Error("Não conseguimos confirmar o envio. Verifique sua conexão e tente novamente em alguns instantes.");
  }

  if (response.status === 429) {
    throw new Error("Há muitos envios neste momento. Aguarde alguns minutos e tente novamente.");
  }

  const result: unknown = await response.json().catch(() => null);
  const serviceMessage = result && typeof result === "object" && "message" in result && typeof result.message === "string"
    ? result.message.trim()
    : "";
  if (!response.ok || !result || typeof result !== "object" || !("success" in result) || (result.success !== true && result.success !== "true")) {
    throw new Error(serviceMessage || "Não foi possível confirmar sua inscrição. Seus dados continuam preenchidos; tente novamente em alguns instantes.");
  }
}
