"use client";

import { useState } from "react";
import { VolunteerRegistration } from "@/components/VolunteerRegistration";
import { volunteerAreas as areas } from "@/lib/volunteer-registration";
import type { VolunteerArea } from "@/lib/volunteer-registration";

export function VolunteerSection() {
  const [selected, setSelected] = useState<VolunteerArea["id"]>(areas[0].id);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const current = areas.find((area) => area.id === selected)!;

  return (
    <div className="volunteer-layout">
      <fieldset className="volunteer-choices">
        <legend>Encontre sua área para servir</legend>
        {areas.map((area) => (
          <label key={area.id} className={`volunteer-card ${selected === area.id ? "is-selected" : ""}`}>
            <input type="radio" name="volunteer-area" value={area.id} checked={selected === area.id} onChange={() => setSelected(area.id)} aria-labelledby={`${area.id}-name`} aria-describedby={`${area.id}-summary`} />
            <span className="area-number" aria-hidden="true">{area.number}</span>
            <span className="area-copy"><strong id={`${area.id}-name`}>{area.name}</strong><span id={`${area.id}-summary`}>{area.summary}</span></span>
            <span className="radio-indicator" aria-hidden="true" />
          </label>
        ))}
      </fieldset>
      <aside className="volunteer-detail" aria-label="Sobre a área escolhida">
        <span className="eyebrow">MUITAS FORMAS DE DIZER SIM</span>
        <div className="area-detail-copy" aria-live="polite" aria-atomic="true">
          <p className="detail-number" aria-hidden="true">/{current.number}</p>
          <h3>{current.name}</h3><p>{current.detail}</p>
        </div>
        <div className="registration-note">
          <span className="registration-icon" aria-hidden="true">+</span>
          <div>
            <strong>Seu próximo passo começa aqui.</strong>
            <p>Inscreva-se para servir em {current.name}. Nossa equipe vai conhecer sua história e entrar em contato.</p>
            <button className="button button-primary volunteer-registration-button" type="button" onClick={() => setRegistrationOpen(true)} aria-haspopup="dialog">Seja um voluntário <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </aside>
      {registrationOpen && <VolunteerRegistration area={current} onClose={() => setRegistrationOpen(false)} />}
    </div>
  );
}
