"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1001px)");
    const resize = () => { if (desktop.matches) setOpen(false); };

    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <div className="header-inner">
        <a className="brand" href="#inicio" aria-label="Vem e Vê — início" onClick={() => setOpen(false)}>
          <Image src="/brand/vem-e-ve.jpg" alt="" width={58} height={58} priority />
          <span className="brand-name">VEM E VÊ<span>Movimento evangelístico</span></span>
        </a>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          <span>{open ? "Fechar" : "Menu"}</span>
          <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="main-navigation" aria-label="Navegação principal" className={open ? "is-open" : ""}>
          <a href="#movimento" onClick={() => setOpen(false)}>O movimento</a>
          <a href="#experiencias" onClick={() => setOpen(false)}>Experiências</a>
          <a href="https://www.instagram.com/vemevemovementt/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} aria-label="Instagram do Vem e Vê (abre em nova aba)">Instagram <span aria-hidden="true">↗</span></a>
          <a href="#servir" onClick={() => setOpen(false)}>Quero servir <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
