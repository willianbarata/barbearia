import { readdir } from "fs/promises";
import path from "path";

import HeroSequence from "@/components/HeroSequence";
import Reveal from "@/components/Reveal";
import { siteConfig, whatsappHref } from "@/lib/siteConfig";

async function getFrameSrcList() {
  const dir = path.join(process.cwd(), "public", "img");
  const files = await readdir(dir);
  return files
    .filter((f) => /^frame_\d+\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((f) => `/img/${f}`);
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="icon">{children}</span>;
}

export default async function Page() {
  const frames = await getFrameSrcList();
  const before = frames[0] ?? "/img/frame_001.jpg";
  const after = frames.at(-1) ?? "/img/frame_080.jpg";

  return (
    <div>
      <header className="header">
        <div className="container headerInner">
          <a className="brand" href="#top" aria-label={siteConfig.name}>
            <span className="brandMark" aria-hidden="true">
              C
            </span>
            <span className="brandText">
              <span className="brandName">{siteConfig.name}</span>
              <span className="brandTag">{siteConfig.tagline}</span>
            </span>
          </a>

          <nav className="nav" aria-label="Navegação">
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#processo">Processo</a>
            <a href="#resultados">Resultados</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#localizacao">Localização</a>
          </nav>

          <div className="headerActions">
            <a className="btn btnGhost" href="#pacotes">
              Ver pacotes
            </a>
            <a className="btn btnGold" href={whatsappHref()} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <HeroSequence
          frames={frames}
          headline="De descuidado a impecável"
          subheadline="Transformações reais em São José do Rio Preto"
          supporting="Barbearia premium para homens que valorizam estilo"
        />

        <section id="sobre" className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">SOBRE</p>
              <h2 className="h2">Mais que um corte, uma experiência</h2>
              <p className="lead">
                Na Cavalheiro Barbearia, cada detalhe importa. Oferecemos um ambiente sofisticado,
                atendimento personalizado e profissionais especializados em transformar seu visual com
                precisão e estilo.
              </p>
              <div className="split">
                <div className="splitCard">
                  <h3 className="h3">Atendimento de alto nível</h3>
                  <p>
                    Do primeiro contato ao acabamento final: atenção, conforto e uma rotina que eleva
                    seu padrão.
                  </p>
                </div>
                <div className="splitCard">
                  <h3 className="h3">Técnica + estética</h3>
                  <p>
                    Degradês, tesoura, alinhamento e barba com precisão — tudo para um visual limpo e
                    confiante.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="servicos" className="section sectionAlt">
          <div className="container">
            <Reveal>
              <p className="eyebrow">SERVIÇOS</p>
              <h2 className="h2">Nossos serviços</h2>
              <div className="grid cards">
                <article className="card">
                  <Icon>✂</Icon>
                  <h3 className="h3">Corte masculino</h3>
                  <p>Consultoria rápida + corte sob medida, com finalização premium.</p>
                </article>
                <article className="card">
                  <Icon>🪒</Icon>
                  <h3 className="h3">Barba completa</h3>
                  <p>Desenho, alinhamento e hidratação para uma barba marcada e confortável.</p>
                </article>
                <article className="card">
                  <Icon>★</Icon>
                  <h3 className="h3">Corte + barba</h3>
                  <p>Combo de impacto para um visual harmônico e impecável.</p>
                </article>
                <article className="card">
                  <Icon>〰</Icon>
                  <h3 className="h3">Degradê / fade</h3>
                  <p>Transições suaves, simetria e acabamento limpo no detalhe.</p>
                </article>
                <article className="card">
                  <Icon>♛</Icon>
                  <h3 className="h3">Acabamento premium</h3>
                  <p>Ritual final com styling, alinhamento e sensação de “novo”.</p>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="processo" className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">PROCESSO</p>
              <h2 className="h2">O cuidado em cada detalhe</h2>
              <div className="steps">
                <div className="step">
                  <Icon>🫧</Icon>
                  <div>
                    <h3 className="h3">Lavagem e preparação</h3>
                    <p>Começo certo para um corte mais preciso e uma barba mais confortável.</p>
                  </div>
                </div>
                <div className="step">
                  <Icon>⚙</Icon>
                  <div>
                    <h3 className="h3">Corte com máquina</h3>
                    <p>Base sólida, degradê limpo e controle total de linhas e volumes.</p>
                  </div>
                </div>
                <div className="step">
                  <Icon>✁</Icon>
                  <div>
                    <h3 className="h3">Ajuste com tesoura</h3>
                    <p>Textura, caimento e naturalidade — do clássico ao moderno.</p>
                  </div>
                </div>
                <div className="step">
                  <Icon>🧴</Icon>
                  <div>
                    <h3 className="h3">Finalização da barba</h3>
                    <p>Desenho, alinhamento e hidratação para um resultado premium.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="resultados" className="section sectionAlt">
          <div className="container">
            <Reveal>
              <p className="eyebrow">RESULTADOS</p>
              <h2 className="h2">Transformações</h2>
              <div className="results">
                <div className="resultCard">
                  <div className="resultLabel">Antes</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="resultImg" src={before} alt="Antes do corte" loading="lazy" />
                </div>
                <div className="resultCard">
                  <div className="resultLabel">Depois</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="resultImg" src={after} alt="Depois do corte" loading="lazy" />
                </div>
              </div>
              <div className="callout">
                <p>
                  Quer um resultado que combine com seu estilo e rotina? A gente ajusta o visual no
                  detalhe — sem perder personalidade.
                </p>
                <a className="btn btnGold" href={whatsappHref()} target="_blank" rel="noreferrer">
                  Agendar horário
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">GALERIA</p>
              <h2 className="h2">Nosso ambiente</h2>
              <p className="lead">
                Cadeirões, espelhos, ferramentas e um clima sofisticado — feito para você relaxar e
                sair melhor do que chegou.
              </p>
              <div className="grid gallery">
                {[frames[12], frames[28], frames[44], frames[60], frames[72], frames[79]]
                  .filter(Boolean)
                  .map((src, idx) => (
                    <a key={`${src}-${idx}`} className="galleryItem" href="#top" aria-label="Imagem">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src!} alt="" loading="lazy" />
                      <span className="galleryGlow" aria-hidden="true" />
                    </a>
                  ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="depoimentos" className="section sectionAlt">
          <div className="container">
            <Reveal>
              <p className="eyebrow">DEPOIMENTOS</p>
              <h2 className="h2">Clientes satisfeitos</h2>
              <div className="grid testimonials">
                <figure className="quote">
                  <blockquote>“Melhor corte que já fiz!”</blockquote>
                  <figcaption>— Rodrigo</figcaption>
                </figure>
                <figure className="quote">
                  <blockquote>“Ambiente top e atendimento impecável”</blockquote>
                  <figcaption>— Felipe</figcaption>
                </figure>
                <figure className="quote">
                  <blockquote>“Saí outra pessoa”</blockquote>
                  <figcaption>— Gustavo</figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="pacotes" className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">PACOTES</p>
              <h2 className="h2">Pacotes especiais</h2>
              <div className="grid packages">
                <article className="package">
                  <h3 className="h3">Corte + barba</h3>
                  <p>O combo essencial para manter presença sempre em dia.</p>
                  <ul className="list">
                    <li>Consultoria rápida</li>
                    <li>Degradê + alinhamento</li>
                    <li>Barba com hidratação</li>
                  </ul>
                  <a className="btn btnGhost" href={whatsappHref()} target="_blank" rel="noreferrer">
                    Quero esse combo
                  </a>
                </article>
                <article className="package packageHighlight">
                  <div className="badge">Mais pedido</div>
                  <h3 className="h3">Plano mensal</h3>
                  <p>Regularidade e estilo: visual sempre alinhado no mês.</p>
                  <ul className="list">
                    <li>Manutenções programadas</li>
                    <li>Prioridade de agenda</li>
                    <li>Acabamento premium</li>
                  </ul>
                  <a className="btn btnGold" href={whatsappHref()} target="_blank" rel="noreferrer">
                    Agendar agora
                  </a>
                </article>
                <article className="package">
                  <h3 className="h3">Experiência premium</h3>
                  <p>Ritual completo para uma transformação marcante.</p>
                  <ul className="list">
                    <li>Preparação completa</li>
                    <li>Detalhamento com tesoura</li>
                    <li>Finalização e styling</li>
                  </ul>
                  <a className="btn btnGhost" href={whatsappHref()} target="_blank" rel="noreferrer">
                    Quero a experiência
                  </a>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section sectionCta">
          <div className="container">
            <Reveal>
              <div className="ctaBox">
                <div>
                  <h2 className="h2">Seu novo visual começa hoje</h2>
                  <p className="lead">Agende seu horário e eleve seu padrão</p>
                </div>
                <div className="ctaActions">
                  <a className="btn btnGold" href={whatsappHref()} target="_blank" rel="noreferrer">
                    Agendar agora
                  </a>
                  <a className="btn btnGhost" href={whatsappHref()} target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="localizacao" className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">LOCALIZAÇÃO</p>
              <h2 className="h2">São José do Rio Preto - SP</h2>
              <p className="lead">Fácil acesso, localização privilegiada</p>
              <div className="map">
                <div className="mapInner">
                  <div className="mapPin" aria-hidden="true" />
                  <p className="mapText">
                    Mapa (placeholder) — adicione o embed do Google Maps quando quiser.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <a
        className="waFloat"
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <span className="waPulse" aria-hidden="true" />
        <span className="waIcon" aria-hidden="true">
          WhatsApp
        </span>
      </a>

      <footer className="footer">
        <div className="container footerInner">
          <div>
            <div className="footerBrand">{siteConfig.name}</div>
            <div className="muted">{siteConfig.tagline}</div>
          </div>
          <div className="footerCols">
            <div>
              <div className="footerTitle">Endereço</div>
              <div className="muted">Av. Exemplo, 123 — Centro</div>
              <div className="muted">São José do Rio Preto - SP</div>
            </div>
            <div>
              <div className="footerTitle">Horário</div>
              <div className="muted">Seg–Sáb: 09:00 – 20:00</div>
              <div className="muted">Dom: Fechado</div>
            </div>
            <div>
              <div className="footerTitle">Contato</div>
              <div className="muted">WhatsApp: {siteConfig.whatsappDisplay}</div>
              <div className="footerLinks">
                <a href={whatsappHref()} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a href="#top">Instagram</a>
                <a href="#top">TikTok</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <div className="container muted">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
