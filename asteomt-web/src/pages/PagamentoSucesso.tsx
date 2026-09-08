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
                <p>⚠️ Seu pagamento está em análise pelo Mercado Pago.</p>
                <p>Assim que for aprovado, suas credenciais de acesso serão enviadas ao seu e-mail automaticamente.</p>
              </>
            ) : (
              <>
                <p>📧 Verifique sua caixa de entrada — enviamos um e-mail com suas <strong>credenciais de acesso</strong> ao portal do associado.</p>
                <p>⏱️ Se o e-mail não aparecer em alguns minutos, confira também a pasta de <strong>Spam</strong>.</p>
              </>
            )}
          </div>

          <div className="retorno-proximos-passos">
            <h3>Próximos Passos</h3>
            <ol>
              <li>Acesse seu e-mail e encontre a mensagem da ASTEO-MT</li>
              <li>Use as credenciais recebidas para fazer login no portal</li>
              <li>Altere sua senha no primeiro acesso</li>
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
