"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { buildVolunteerPayload, sendVolunteerApplication, VolunteerValidationError } from "@/lib/volunteer-registration";
import type { VolunteerArea } from "@/lib/volunteer-registration";

type VolunteerRegistrationProps = {
  area: VolunteerArea;
  onClose: () => void;
};

export function VolunteerRegistration({ area, onClose }: VolunteerRegistrationProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);
  const request = useRef<AbortController | null>(null);
  const submitting = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [servesInMinistry, setServesInMinistry] = useState("");
  const isSubmitting = status === "submitting";

  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      request.current?.abort();
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (status === "success") successTitle.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    let payload: Record<string, string>;
    setError("");

    try {
      payload = buildVolunteerPayload({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        church: String(data.get("church") ?? ""),
        servesInMinistry,
        ministry: String(data.get("ministry") ?? ""),
        areaId: area.id,
        consent: data.get("consent") === "on",
        website: String(data.get("website") ?? ""),
      });
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Revise os campos e tente novamente.");
      if (cause instanceof VolunteerValidationError) {
        const field = form.elements.namedItem(cause.field);
        if (field instanceof HTMLElement) field.focus();
        else if (field instanceof RadioNodeList && field[0] instanceof HTMLElement) field[0].focus();
      }
      return;
    }

    submitting.current = true;
    setStatus("submitting");
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      await sendVolunteerApplication(payload, { signal: controller.signal, pageUrl: `${window.location.origin}${window.location.pathname}#servir` });
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível confirmar o envio. Tente novamente.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
      submitting.current = false;
    }
  }

  return (
    <dialog ref={dialog} className="volunteer-dialog" aria-labelledby="volunteer-registration-title" aria-describedby="volunteer-registration-intro" onCancel={(event) => {
      event.preventDefault();
      if (!submitting.current) onClose();
    }}>
      <div className="volunteer-dialog-header">
        <div><p className="eyebrow">FAÇA PARTE DO MOVIMENTO</p><h2 id="volunteer-registration-title">Seja um voluntário</h2></div>
        <button className="volunteer-dialog-close" type="button" onClick={onClose} disabled={isSubmitting} aria-label="Fechar inscrição"><span aria-hidden="true">×</span></button>
      </div>
      <p id="volunteer-registration-intro" className="volunteer-dialog-intro">Conte um pouco sobre você e sua caminhada. Queremos conhecer quem vai servir com a gente.</p>

      {status === "success" ? (
        <div className="volunteer-success" role="status">
          <span className="volunteer-success-icon" aria-hidden="true">✓</span>
          <h3 ref={successTitle} tabIndex={-1}>Inscrição enviada!</h3>
          <p>Sua inscrição para <strong>{area.name}</strong> será analisada pela nossa equipe. Retornaremos o contato pelo celular informado.</p>
          <button type="button" className="button button-primary" onClick={onClose}>Concluir <span aria-hidden="true">✓</span></button>
        </div>
      ) : (
        <form className="volunteer-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
          <p className="volunteer-form-notice">Todos os campos são obrigatórios.</p>
          <div className="volunteer-form-grid">
            <label className="volunteer-field" htmlFor="volunteer-name"><span>Nome completo</span><input id="volunteer-name" name="name" autoComplete="name" required minLength={2} maxLength={120} disabled={isSubmitting} /></label>
            <label className="volunteer-field" htmlFor="volunteer-phone"><span>Celular com DDD</span><input id="volunteer-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(92) 99999-9999" required maxLength={22} disabled={isSubmitting} /><span className="volunteer-field-hint">Usaremos este número para entrar em contato.</span></label>
          </div>
          <label className="volunteer-field" htmlFor="volunteer-church"><span>Nome da igreja local que você frequenta</span><input id="volunteer-church" name="church" required minLength={2} maxLength={160} disabled={isSubmitting} /></label>
          <fieldset className="volunteer-ministry" disabled={isSubmitting}>
            <legend>Você já serve em algum ministério na sua igreja local?</legend>
            <div className="volunteer-radio-options">
              <label><input type="radio" name="servesInMinistry" value="sim" checked={servesInMinistry === "sim"} onChange={() => setServesInMinistry("sim")} required /> Sim</label>
              <label><input type="radio" name="servesInMinistry" value="nao" checked={servesInMinistry === "nao"} onChange={() => setServesInMinistry("nao")} required /> Não</label>
            </div>
          </fieldset>
          {servesInMinistry === "sim" && (
            <label className="volunteer-field" htmlFor="volunteer-ministry"><span>Em qual ministério você serve?</span><input id="volunteer-ministry" name="ministry" required minLength={2} maxLength={160} disabled={isSubmitting} /><span className="volunteer-field-hint">Ex.: recepção, intercessão, mídia, suporte ou brigada.</span></label>
          )}
          <label className="volunteer-area" htmlFor="volunteer-area"><span>Área de interesse</span><input id="volunteer-area" name="area" value={area.name} readOnly /><span className="volunteer-field-hint">Área escolhida antes de abrir a inscrição. Para mudar, feche este formulário e selecione outra área.</span></label>
          <div hidden aria-hidden="true"><label htmlFor="volunteer-website">Deixe este campo vazio</label><input id="volunteer-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <label className="volunteer-consent"><input type="checkbox" name="consent" required disabled={isSubmitting} /><span>Autorizo o uso do meu nome, celular e informações sobre minha igreja e ministério para análise desta inscrição e contato sobre o voluntariado.</span></label>
          {error && <p className="volunteer-form-error" role="alert">{error}</p>}
          <div className="volunteer-form-actions">
            <button type="submit" className="button button-primary" disabled={isSubmitting}>{isSubmitting ? "Enviando inscrição…" : "Enviar inscrição"}<span aria-hidden="true">↗</span></button>
            <p className="volunteer-form-privacy">Sua inscrição será enviada por e-mail à equipe do Vem e Vê, por meio do FormSubmit, para análise e retorno pelo celular informado.</p>
          </div>
        </form>
      )}
    </dialog>
  );
}
