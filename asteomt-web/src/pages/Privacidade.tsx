
import { SEO } from '../components/SEO';

export function Privacidade() {
    return (
        <div className="page-container">
            <SEO
                title="Política de Privacidade"
                description="Política de privacidade da Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas (ASTEO-MT)."
                path="/privacidade"
            />
            <main className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                <h1 style={{ color: 'var(--gov-blue-dark)', marginBottom: '2rem' }}>Política de Privacidade</h1>
                <p>A ASTEO-MT valoriza a privacidade de seus associados. Esta política descreve como coletamos e protegemos seus dados pessoais.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>1. Coleta de Dados</h2>
                <p>Coletamos nome, CPF, e-mail e dados profissionais para fins de filiação e comunicação institucional.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>2. Uso das Informações</h2>
                <p>Seus dados são utilizados exclusivamente para o gerenciamento da sua conta de membro e emissão de certificados.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>3. Segurança</h2>
                <p>Implementamos medidas técnicas para garantir a segurança dos seus dados contra acessos não autorizados.</p>
            </main>
        </div>
    );
}

export default Privacidade;
