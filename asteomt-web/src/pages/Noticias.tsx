import { Link } from 'react-router-dom';
import { NOTICIAS } from '../data/noticias';
import { SEO } from '../components/SEO';
import './Noticias.css';

export function Noticias() {
  return (
    <div className="noticias-page">
      <SEO
        title="Portal de Notícias e Atualizações"
        description="Fique por dentro das últimas notícias, assembleias, audiências públicas e conquistas da ASTEO-MT na defesa dos Técnicos de Imobilizações Ortopédicas."
        path="/noticias"
      />
      <header className="noticias-header">
        <div className="noticias-header-content">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Voltar para Início
          </Link>
          <h1>Portal de Notícias</h1>
        </div>
      </header>

      <main className="noticias-content">
        {NOTICIAS.map((noticia) => (
          <article key={noticia.id} className={`noticia-card ${noticia.destaque ? 'noticia-destaque' : 'noticia-secundaria'}`}>
            <div className="noticia-badge">{noticia.badge}</div>
            <h2 className="noticia-titulo">{noticia.titulo}</h2>
            <div className="noticia-meta">
              <span className="noticia-data">📅 {noticia.data}</span>
              <span className="noticia-local">📍 {noticia.local}</span>
            </div>

            <div className="noticia-corpo-texto">
              <p className="intro-text"><strong>{noticia.intro}</strong></p>
              {noticia.texto.map((paragrafo, idx) => (
                <p key={idx}>{paragrafo}</p>
              ))}
            </div>

            {noticia.galeria && noticia.galeria.length > 0 && (
              <div className="noticia-galeria">
                <div className={`galeria-grid ${noticia.galeria.length === 1 ? 'single-img' : ''}`}>
                  {noticia.galeria.map((img, idx) => (
                    <img key={idx} src={img} alt={`${noticia.titulo} - Imagem ${idx + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {noticia.linkExterno && (
              <div className="noticia-acao">
                <a href={noticia.linkExterno.url} target="_blank" rel="noopener noreferrer" className="btn-social-news">
                  {noticia.linkExterno.label}
                </a>
              </div>
            )}

            {noticia.destaque && (
              <div className="noticia-autor">
                <div className="assinatura">
                  <strong>LEONARDO LEITE RIBEIRO</strong>
                  <span>Presidente da ASTEO-MT</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </main>
    </div>
  );
}

export default Noticias;
