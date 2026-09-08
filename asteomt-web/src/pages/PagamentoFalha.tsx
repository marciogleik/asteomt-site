import { Link } from 'react-router-dom';
import './PagamentoRetorno.css';

export function PagamentoFalha() {
  return (
    <div className="retorno-page">
      <div className="retorno-container">
        <div className="retorno-card failure">
          <div className="retorno-icon">❌</div>

          <h1 className="retorno-titulo">Pagamento Não Concluído</h1>

          <p className="retorno-subtitulo">
            Houve um problema ao processar seu pagamento. Nenhum valor foi cobrado.
          </p>

          <div className="retorno-info-box failure-box">
            <p>Possíveis motivos:</p>
            <ul>
              <li>Dados do cartão incorretos ou expirado</li>
              <li>Saldo insuficiente</li>
              <li>Pagamento cancelado pelo usuário</li>
              <li>Limite do cartão excedido</li>
            </ul>
          </div>

          <div className="retorno-acoes">
            <Link to="/registro" className="btn-retorno-primary failure-btn">
              Tentar Novamente
            </Link>
            <Link to="/" className="btn-retorno-secondary">
              Voltar para o Início
            </Link>
          </div>
        </div>

        <p className="retorno-rodape">
          Persistindo o problema, entre em contato com a ASTEO-MT para suporte.
        </p>
      </div>
    </div>
  );
}

export default PagamentoFalha;
