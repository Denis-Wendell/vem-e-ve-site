import Image from "next/image";
import { ExperienceCard } from "@/components/ExperienceCard";
import { MotionBackground } from "@/components/MotionBackground";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { VolunteerSection } from "@/components/VolunteerSection";
import louvorImage from "@/public/images/louvor.jpeg";
import testemunhoImage from "@/public/images/testemunho.jpeg";
import missaoImage from "@/public/images/missao.jpeg";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <MotionBackground />
        <section id="inicio" className="hero section-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-cross" aria-hidden="true">+</span> NASCIDOS NO AMAZONAS. MOVIDOS PELA FÉ.</p>
            <h1 id="hero-title">Pode algo bom<br />vir de <span className="outlined-word">Manaus?</span></h1>
            <p className="hero-answer">Vem e vê<span>.</span></p>
            <p className="hero-lead">Um movimento de pessoas dispostas a ir.<br className="desktop-break" /> Para anunciar Jesus. Para servir ao Reino.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#movimento">Conheça o movimento <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#servir">Quero fazer parte <span aria-hidden="true">↗</span></a>
            </div>
            <p className="scripture-reference">UM CONVITE QUE MUDA TUDO <span>JOÃO 1:46</span></p>
          </div>
          <div className="hero-picture-wrap">
            <div className="photo-frame photo-frame-one" aria-hidden="true" />
            <div className="photo-frame photo-frame-two" aria-hidden="true" />
            <figure className="hero-image">
              <Image src="/images/amazonas2.jpeg" alt="Vista aérea de um rio entre a floresta amazônica, próximo a Manaus." fill priority sizes="(max-width: 760px) 100vw, 47vw" />
              <div className="image-shade" />
              <div className="image-topline" aria-hidden="true"><span>AMAZONAS, BRASIL</span><span>01 / ORIGEM</span></div>
              <figcaption><span>É DAQUI QUE A GENTE VAI.</span><strong>Um coração avivado.<br />Um campo diante de nós.</strong></figcaption>
              <span className="image-cross" aria-hidden="true">+</span>
            </figure>
          </div>
          <div className="hero-bottom"><span>FÉ QUE SE TRANSFORMA EM MOVIMENTO</span><a href="#movimento">Continue a história <span aria-hidden="true">↓</span></a></div>
        </section>

        <div className="mission-strip" aria-label="Ir, servir, anunciar e amar"><span>IR.</span><i aria-hidden="true">+</i><span>SERVIR.</span><i aria-hidden="true">+</i><span>ANUNCIAR.</span><i aria-hidden="true">+</i><span>AMAR.</span></div>

        <section id="movimento" className="section section-width movement-section" aria-labelledby="movement-title">
          <Reveal className="section-heading">
            <p className="section-label"><span>01</span> O MOVIMENTO</p>
            <h2 id="movement-title">Jesus nos chamou<br />para <em>ir.</em></h2>
          </Reveal>
          <div className="movement-layout">
            <Reveal className="movement-statement">
              <p>Ir até pessoas.</p><p>Ir até lugares.</p><p>Ir além das<br />quatro paredes.</p>
              <span className="eyebrow">ESSE É O NOSSO IDE.</span>
            </Reveal>
            <Reveal delay={100} className="movement-story">
              <span className="eyebrow">UM CHAMADO. MUITAS HISTÓRIAS.</span>
              <h3>Tudo começou no<br />coração de servos.</h3>
              <p>Pessoas que entenderam que o Evangelho não poderia permanecer apenas dentro delas. Havia uma convicção: precisamos ir.</p>
              <p>O Vem e Vê nasce desse encontro entre fé e atitude. Anunciar as boas-novas. Servir pessoas. Fazer discípulos.</p>
              <blockquote>“Vem e vê.”<span>Não era apenas um nome. Era um convite.</span></blockquote>
            </Reveal>
          </div>
          <Reveal className="origin-note">
            <span className="origin-mark" aria-hidden="true">AM<span>BRASIL</span></span>
            <div><span className="eyebrow">NOSSO PONTO DE PARTIDA</span><h3>Começamos no Amazonas.</h3><p>É aqui que essa trajetória começa. Um coração avivado, um campo diante de nós e uma missão que precisa ser cumprida.</p></div>
            <span className="origin-cross" aria-hidden="true">+</span>
          </Reveal>
        </section>

        <section id="experiencias" className="section experience-section" aria-labelledby="experiences-title">
          <div className="section-width">
            <Reveal className="section-heading heading-split">
              <div><p className="section-label"><span>02</span> EXPERIÊNCIAS</p><h2 id="experiences-title">A fé ganha vida<br /><em>quando é vivida.</em></h2></div>
              <p className="heading-description">Encontros, histórias e passos de fé.<br />É assim que o movimento acontece.</p>
            </Reveal>
            <div className="experience-grid">
              <Reveal><ExperienceCard number="01" title="Comunhão" word="ADORAR." description="Pessoas reunidas para ouvir, compartilhar histórias e caminhar juntas na fé." imageSrc={louvorImage} imageAlt="Louvor em grupo" /></Reveal>
              <Reveal delay={80}><ExperienceCard number="02" title="Testemunhos" word="CRER." description="Histórias de vidas alcançadas e transformadas pelo Evangelho." imageSrc={testemunhoImage} imageAlt="Testemunho de fé" /></Reveal>
              <Reveal delay={160}><ExperienceCard number="03" title="Missão" word="IR." description="Fé em ação, além das quatro paredes, perto de quem precisa." imageSrc={missaoImage} imageAlt="Missão em ação" /></Reveal>
            </div>

          </div>
        </section>

        <section className="section section-width manifesto-section" aria-labelledby="manifesto-title">
          <Reveal>
            <p className="section-label"><span>03</span> NO QUE CREMOS</p>
            <h2 id="manifesto-title">O Evangelho ainda<br /><em>transforma vidas.</em></h2>
            <div className="manifesto-bottom">
              <p>Cremos em uma Igreja viva, disponível e apaixonada por Jesus. Fomos chamados para ir. Queremos ver pessoas encontrando Jesus, servos descobrindo seu chamado e igrejas caminhando pelo Reino.</p>
              <span className="manifesto-signature" aria-hidden="true">VEM<br />E VÊ<span>+</span></span>
            </div>
          </Reveal>
        </section>

        <section id="servir" className="section volunteer-section" aria-labelledby="volunteer-title">
          <div className="section-width">
            <Reveal className="section-heading heading-split">
              <div><p className="section-label"><span>04</span> FAÇA PARTE</p><h2 id="volunteer-title">Você viu.<br /><em>Agora, vem.</em></h2></div>
              <p className="heading-description">O Reino é construído por pessoas<br className="desktop-break" /> dispostas a dizer sim. Qual será<br className="desktop-break" /> a sua resposta?</p>
            </Reveal>
            <Reveal><VolunteerSection /></Reveal>
          </div>
        </section>

        <section className="closing-section section-width" aria-labelledby="closing-title">
          <Reveal>
            <p className="eyebrow">CUMPRINDO O IDE. ANUNCIANDO JESUS.</p>
            <h2 id="closing-title">Vem. Veja. <em>Vá.</em></h2>
            <div className="closing-bottom">
              <p>Pode algo bom vir de Manaus?<br /><strong>A gente acredita que sim.</strong></p>
              <a className="button button-primary" href="#servir">Encontre sua forma de servir <span aria-hidden="true">↗</span></a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-width">
          <div className="social-row">
            <div><span className="eyebrow">ACOMPANHE O MOVIMENTO</span><h2>A história continua por lá.</h2></div>
            <a className="instagram-link" href="https://www.instagram.com/vemevemovementt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @vemevemovementt (abre em nova aba)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
              <span>Instagram<strong>@vemevemovementt</strong></span><span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-top">
            <a className="brand" href="#inicio" aria-label="Vem e Vê — voltar ao início"><Image src="/brand/vem-e-ve.jpg" alt="" width={58} height={58} /><span className="brand-name">VEM E VÊ<span>Movimento evangelístico</span></span></a>
            <p>Do Amazonas. Pelo Reino.<br />Manaus, Amazonas · Brasil</p>
            <a className="back-top" href="#inicio">Voltar ao início <span aria-hidden="true">↑</span></a>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Vem e Vê · Movimento Evangelístico. Todos os direitos reservados.</p>
            <p className="footer-credit">
              Desenvolvido por{" "}
              <a href="https://deniwendell-dev.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfólio de Denis Wendell (abre em nova aba)">
                © 2026 Denis Wendell <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
