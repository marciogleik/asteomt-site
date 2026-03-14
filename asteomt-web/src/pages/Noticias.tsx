import { Link } from 'react-router-dom';
import audiencia1 from '../assets/images/noticias/audiencia-1.jpg';
import audiencia2 from '../assets/images/noticias/audiencia-2.jpg';
import audiencia3 from '../assets/images/noticias/audiencia-3.jpg';
import parceriaImg from '../assets/images/noticias/parceria-unifacc.png';
import './Noticias.css';

const NOTICIAS = [
  {
    id: 'parceria-unifacc',
    badge: 'Parceria Institucional',
    titulo: 'ASTEO-MT e Universidade Católica de Cuiabá em tratativas para Parceria Institucional',
    data: '13 de março de 2026',
    local: 'Cuiabá - MT',
    intro: 'A ASTEO-MT (Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas) está em tratativas com a Universidade Católica de Cuiabá para estabelecer uma parceria institucional.',
    texto: [
      'A iniciativa busca fortalecer a formação e a valorização dos profissionais da área de imobilizações ortopédicas no estado de Mato Grosso, promovendo oportunidades de capacitação, desenvolvimento acadêmico e integração entre a associação e a instituição de ensino.',
      'A parceria visa abrir portas para estágios, cursos de extensão e reconhecimento acadêmico da prática profissional, elevando o padrão de atendimento em todo o estado.'
    ],
    galeria: [parceriaImg],
    linkExterno: {
      label: 'Siga a UNIFACC no Instagram',
      url: 'https://www.instagram.com/unifaccmt/'
    },
    destaque: true
  },
  {
    id: 'audiencia-almt',
    badge: 'Ação Institucional',
    titulo: 'Audiência Pública na ALMT debate Valorização de trabalhadores da imobilização ortopédica',
    data: '28 de novembro de 2025',
    local: 'Assembleia Legislativa de Mato Grosso',
    intro: 'A Assembleia Legislativa de Mato Grosso (ALMT) sediou uma audiência pública histórica para discutir a valorização dos profissionais de imobilização ortopédica no estado.',
    texto: [
      'O evento reuniu lideranças políticas e técnicos da área. A iniciativa proposta por Leonardo Leite Ribeiro, em parceria com a presidência nacional da categoria, focou na regulamentação e no reconhecimento da importância desses profissionais no sistema de saúde.',
      'A união demonstrada foi fundamental para pautar as necessidades da classe junto aos legisladores estaduais.'
    ],
    galeria: [audiencia1, audiencia2, audiencia3],
    destaque: false
  }
];

export function Noticias() {
  return (
    <div className="noticias-page">
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
                    <img key={idx} src={img} alt={`Imagem ${idx + 1} da notícia`} />
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
