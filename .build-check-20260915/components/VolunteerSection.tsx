"use client";

import { useState } from "react";

const areas = [
  { id: "midia", name: "Mídia", summary: "Histórias que precisam ser contadas.", detail: "Fotografia, vídeo, design, redes sociais e transmissão. Use sua criatividade para levar essa mensagem mais longe.", number: "01" },
  { id: "intercessao", name: "Intercessão", summary: "Cada passo começa em oração.", detail: "Sustente cada etapa do movimento em oração, intercedendo pelas pessoas, pelas equipes e pelos lugares que vamos alcançar.", number: "02" },
  { id: "louvor", name: "Louvor", summary: "Uma só voz. Um só propósito.", detail: "Músicos, vocalistas e técnicos unidos para servir. Coloque seus dons a serviço de momentos de louvor e adoração a Jesus.", number: "03" },
  { id: "apoio", name: "Recepção e apoio", summary: "O cuidado está nos detalhes.", detail: "Acolhimento, organização, produção e suporte. Ajude a preparar cada encontro e a receber cada pessoa com cuidado.", number: "04" },
];

export function VolunteerSection() {
  const [selected, setSelected] = useState(areas[0].id);
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
            <strong>Inscrições em breve</strong>
            <p>Estamos preparando os próximos passos. Acompanhe o movimento no Instagram.</p>
            <a className="text-link" href="https://www.instagram.com/vemevemovementt/" target="_blank" rel="noopener noreferrer" aria-label="@vemevemovementt no Instagram (abre em nova aba)">@vemevemovementt <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </aside>
    </div>
  );
}
