import { Link } from 'react-router-dom';
import audiencia1 from '../assets/images/noticias/audiencia-1.jpg';
import audiencia2 from '../assets/images/noticias/audiencia-2.jpg';
import audiencia3 from '../assets/images/noticias/audiencia-3.jpg';
import './Noticias.css';

export function Noticias() {
  return (
    <div className="noticias-page">
      <div className="noticias-header">
        <div className="noticias-header-content">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar
          </Link>
          <h1>Notícias</h1>
        </div>
      </div>

      <main className="noticias-content">
        <article className="noticia-destaque">
          <div className="noticia-badge">Destaque</div>
          <h2 className="noticia-titulo">
            Audiência Pública "Valorização de trabalhadores que atuam na imobilização ortopédica"
          </h2>
          <div className="noticia-meta">
            <span className="noticia-data">28 de novembro de 2025</span>
            <span className="noticia-local">Assembleia Legislativa de Mato Grosso</span>
          </div>

          <div className="noticia-texto-intro">
            <p>
              No dia 28 de novembro, a Assembleia Legislativa de Mato Grosso, em Cuiabá, sediou a 
              Audiência Pública "Valorização de trabalhadores que atuam na imobilização ortopédica". 
              A iniciativa foi proposta por <strong>Leonardo Leite Ribeiro</strong>, representante da 
              categoria em Água Boa, em parceria com a presidência nacional da Associação dos Técnicos 
              em Imobilização do Brasil.
            </p>
            <p>
              O encontro reuniu profissionais e autoridades para discutir desafios, necessidades e 
              caminhos para o fortalecimento da profissão em Mato Grosso. A audiência marcou um avanço 
              importante no reconhecimento do papel essencial desses trabalhadores na recuperação e 
              segurança dos pacientes.
            </p>
            <p>
              A ASTEO-MT reforça seu compromisso com a defesa da categoria e com a promoção contínua 
              da qualidade dos serviços prestados à população.
            </p>
          </div>

          <div className="noticia-galeria">
            <div className="galeria-grid">
              <img src={audiencia1} alt="Equipe ASTEO-MT na Assembleia Legislativa" />
              <img src={audiencia2} alt="Participantes da audiência pública" />
              <img src={audiencia3} alt="Profissionais de imobilização ortopédica reunidos" />
            </div>
          </div>

          <div className="noticia-corpo">
            <div className="mensagem-presidente">
              <h3>Mensagem do Presidente da ASTEO-MT</h3>
              
              <blockquote>
                <p>
                  "No dia 28 de novembro de 2025, vivenciamos um momento histórico para os profissionais 
                  de Imobilização Ortopédica do Estado de Mato Grosso. Pela primeira vez, nossa categoria 
                  esteve no centro de uma audiência dedicada exclusivamente à valorização e ao reconhecimento 
                  da nossa profissão — um avanço que marca o início de uma nova fase para todos nós.
                </p>
                
                <p>
                  Como presidente da ASTEO-MT, registro meu profundo agradecimento ao deputado Dr. Eugênio, 
                  que acolheu nossa pauta, abriu portas importantes e demonstrou verdadeiro compromisso com 
                  a evolução da nossa classe.
                </p>
                
                <p>
                  Minha gratidão também à direção da Faculdade UNIFACC-MT, que firmou o compromisso de ofertar 
                  o curso de Imobilização Ortopédica, ampliando oportunidades e fortalecendo a formação 
                  profissional em nosso estado.
                </p>
                
                <p>
                  A todos os profissionais que participaram desse momento, meu muito obrigado. Tenho certeza 
                  de que cada um saiu de lá mais fortalecido, mais consciente do nosso papel e mais esperançoso 
                  quanto às mudanças que estamos construindo.
                </p>
                
                <p>
                  Agradeço ainda à equipe da ASTEO-MT pelo empenho, dedicação e seriedade com que têm conduzido 
                  cada etapa desse processo.
                </p>
                
                <p>
                  Reafirmo aqui meu compromisso, enquanto presidente, de seguir trabalhando incansavelmente 
                  pela valorização, pelo reconhecimento e pelo desenvolvimento da nossa categoria.
                </p>
                
                <p className="mensagem-final">
                  Muito obrigado a todos!<br />
                  Seguimos unidos — porque juntos somos mais fortes. 💙
                </p>
              </blockquote>
              
              <div className="assinatura">
                <strong>Leonardo Leite Ribeiro</strong>
                <span>Presidente da ASTEO-MT</span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
