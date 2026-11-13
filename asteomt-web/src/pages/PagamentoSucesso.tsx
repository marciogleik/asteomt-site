import { Link, useSearchParams } from 'react-router-dom';
import './PagamentoRetorno.css';

export function PagamentoSucesso() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const isPending = status === 'pending' || status === 'in_process';

  return (
    <div className="retorno-page">
      <div className="retorno-container">
        <div className={`retorno-card ${isPending ? 'pending' : 'success'}`}>
          <div className="retorno-icon">
            {isPending ? '⏳' : '✅'}
          </div>

          <h1 className="retorno-titulo">
            {isPending ? 'Pagamento em Análise' : 'Pagamento Confirmado!'}
          </h1>

          <p className="retorno-subtitulo">
            {isPending
              ? 'Seu pagamento está sendo processado. Aguarde a confirmação.'
              : 'Sua filiação à ASTEO-MT foi ativada com sucesso!'
            }
          </p>

          <div className="retorno-info-box">
            {isPending ? (
              <>
                <p>⚠️ Seu pagamento está em análise pelo Asaas.</p>
                <p>Assim que for aprovado, sua filiação será ativada automaticamente.</p>
              </>
            ) : (
              <>
                <p>🔑 Para entrar no portal do associado, use seu <strong>e-mail</strong> e a <strong>senha que você criou</strong> no cadastro.</p>
              </>
            )}
          </div>

          <div className="retorno-proximos-passos">
            <h3>Próximos Passos</h3>
            <ol>
              <li>Clique em "Acessar o Portal do Associado"</li>
              <li>Entre com seu e-mail e a senha que você criou no cadastro</li>
              <li>Explore todos os benefícios exclusivos para associados</li>
            </ol>
          </div>

          <div className="retorno-acoes">
            <Link to="/login" className="btn-retorno-primary">
              Acessar o Portal do Associado
            </Link>
            <Link to="/" className="btn-retorno-secondary">
              Voltar para o Início
            </Link>
          </div>
        </div>

        <p className="retorno-rodape">
          Ficou com alguma dúvida? Entre em contato conosco pelo WhatsApp ou e-mail da ASTEO-MT.
        </p>
      </div>
    </div>
  );
}

export default PagamentoSucesso;
