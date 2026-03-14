
export function Termos() {
    return (
        <div className="page-container">
            <main className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                <h1 style={{ color: 'var(--gov-blue-dark)', marginBottom: '2rem' }}>Termos de Uso</h1>
                <p>Ao utilizar este portal, você concorda com os termos abaixo estabelecidos pela ASTEO-MT.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>1. Uso do Conteúdo</h2>
                <p>As informações neste site são de natureza institucional e técnica para uso dos profissionais da área.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>2. Cadastro de Membro</h2>
                <p>O associado é responsável pela veracidade dos dados informados e pela guarda de sua senha de acesso.</p>

                <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>3. Conduta</h2>
                <p>Reservamo-nos o direito de suspender acessos em caso de uso indevido do sistema ou infrações éticas.</p>
            </main>
        </div>
    );
}

export default Termos;
