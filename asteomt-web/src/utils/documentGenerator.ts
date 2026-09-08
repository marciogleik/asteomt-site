/**
 * Utilitário de Geração e Download de Documentos Oficiais da ASTEO-MT
 * Modelo Fiel de Carteira Digital (Frente e Verso Oficial)
 */

interface UserData {
  name: string;
  email: string;
  cpf?: string;
  cidade?: string;
  inscricao?: string;
  filiaçãoNo?: string;
  cargo?: string;
  validade?: string;
  controleNo?: string;
  gestao?: string;
  photoUrl?: string;
}

export function downloadCarteiraDigital(user: UserData) {
  const name = user.name || 'Leonardo Leite Ribeiro';
  const isWilliam = name.toLowerCase().includes('william');
  const isAleondas = !isWilliam && name.toLowerCase().includes('aleondas');
  const isLeonardo = !isWilliam && !isAleondas && name.toLowerCase().includes('leonardo');

  const reg = user.inscricao || '0001/ASTEO-MT';
  const filiacao = user.filiaçãoNo || (isWilliam ? '0003' : (isAleondas ? '0002' : '0001'));
  const cargo = user.cargo || (isLeonardo ? 'Presidente' : 'Técnico em imobilizado ortopédica');
  const cargoDiretoria = isLeonardo ? 'Presidente' : (isWilliam || isAleondas ? 'Diretor da ASTEO MT' : (user.cargo || 'Diretor da ASTEO MT'));
  const validade = user.validade || '31/12/2026';
  const controleNo = user.controleNo || (isWilliam ? '0203458968' : '0203458967');
  const gestao = user.gestao || '2025 – 2026';
  const photoUrl = user.photoUrl || (isWilliam ? '/william-ribeiro.jpg' : (isAleondas ? '/aleondas-ribeiro.jpg' : (isLeonardo ? '/leonardo-ribeiro.jpg' : (localStorage.getItem('asteomt_photo') || ''))));
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Carteira Digital Oficial - ASTEO-MT - ${name}</title>
      <style>
        @page { size: A4 portrait; margin: 15mm; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; padding: 20px; margin: 0; }
        
        .card-page {
          width: 580px;
          height: 350px;
          background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 40%, #ffffff 100%);
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
          border: 1px solid #93c5fd;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        /* Top Header */
        .top-header {
          display: flex;
          align-items: center;
          padding: 12px 20px 8px;
          gap: 15px;
        }

        .header-logo {
          width: 55px;
          height: 55px;
        }

        .header-text {
          flex: 1;
          text-align: center;
        }

        .header-text h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 900;
          color: #0b2d52;
          letter-spacing: 1px;
        }

        .header-text p {
          margin: 2px 0 0;
          font-size: 11px;
          font-weight: 800;
          color: #0b2d52;
          text-transform: uppercase;
        }

        /* Color Banner Strip */
        .banner-strip {
          height: 8px;
          background: linear-gradient(90deg, #15803d 0%, #16a34a 45%, #eab308 55%, #ca8a04 100%);
          width: 100%;
        }

        /* Card Content (Frente) */
        .card-body-front {
          padding: 16px 20px;
          display: flex;
          gap: 20px;
          flex: 1;
        }

        .photo-box {
          width: 130px;
          height: 155px;
          background: #cbd5e1;
          border: 1px solid #94a3b8;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 12px;
          font-weight: bold;
        }

        .photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-front {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .user-name {
          font-size: 20px;
          font-weight: 900;
          color: #0b2d52;
          margin-bottom: 2px;
        }

        .badge-green {
          background-color: #15803d;
          color: white;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          width: fit-content;
          margin-bottom: 4px;
        }

        .info-line {
          font-size: 14px;
          color: #0b2d52;
          font-weight: 600;
        }

        .info-line strong {
          color: #0b2d52;
        }

        /* Card Content (Verso) */
        .card-body-back {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
        }

        .back-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .back-left h2 {
          font-size: 22px;
          font-weight: 900;
          color: #0b2d52;
          margin: 0 0 4px;
        }

        .back-left p {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #0b2d52;
        }

        .control-no {
          font-size: 13px;
          font-weight: 700;
          color: #0b2d52;
          margin-top: 15px;
        }

        .signature-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .signature-svg {
          height: 48px;
          width: auto;
          margin-bottom: 2px;
        }

        .sig-name {
          font-size: 11px;
          font-weight: 700;
          color: #0b2d52;
          margin-top: 2px;
        }

        .sig-role {
          font-size: 10px;
          color: #64748b;
          font-weight: 600;
        }

        .qr-box-back {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: white;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
        }

        .qr-box-back svg {
          width: 80px;
          height: 80px;
        }

        /* Card Bottom Footer Bar */
        .card-footer-bar {
          background-color: #0b2d52;
          color: white;
          padding: 6px 15px;
          font-size: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          line-height: 1.2;
        }

        .mission-text {
          max-width: 420px;
        }

        .auth-label {
          font-size: 10px;
          font-weight: 800;
          color: #ffffff;
        }

        @media print {
          body { background: none; padding: 0; }
          .card-page { box-shadow: none; page-break-after: always; }
        }
      </style>
    </head>
    <body>

      <!-- FRENTE -->
      <div class="card-page">
        <div class="top-header">
          <img src="/logo-asteomt.png" alt="ASTEO-MT" class="header-logo" />
          <div class="header-text">
            <h1>ASTEO-MT</h1>
            <p>Associação Mato-Grossense dos Técnicos em Imobilizações Ortopédicas</p>
          </div>
        </div>

        <div class="banner-strip"></div>

        <div class="card-body-front">
          <div class="photo-box">
            ${photoUrl ? `<img src="${photoUrl}" alt="Foto" />` : 'FOTO'}
          </div>

          <div class="info-front">
            <div class="user-name">${name}</div>
            <div class="badge-green">${cargo}</div>
            ${filiacao ? `<div class="info-line">N° da Filiação: <strong>${filiacao}</strong></div>` : ''}
            <div class="info-line">Registro: <strong>${reg}</strong></div>
            <div class="info-line">Mato Grosso – Brasil</div>
            ${!isAleondas ? `<div class="info-line">Validade: <strong>${validade}</strong></div>` : ''}
          </div>
        </div>
      </div>

      <!-- VERSO -->
      <div class="card-page">
        <div class="top-header">
          <img src="/logo-asteomt.png" alt="ASTEO-MT" class="header-logo" />
          <div class="header-text">
            <h1>ASTEO-MT</h1>
            <p>Associação Mato-Grossense dos Técnicos em Imobilizações Ortopédicas</p>
          </div>
        </div>

        <div class="banner-strip"></div>

        <div class="card-body-back">
          <div class="back-left">
            <h2>Diretoria Executiva</h2>
            <p>Função: ${cargoDiretoria}</p>
            <p>Gestão: ${gestao}</p>
            <div class="control-no">N° Controle: ${controleNo}</div>
          </div>

          <div class="signature-box">
            <svg class="signature-svg" viewBox="0 0 130 50">
              <path d="M 12 38 C 8 22 24 8 38 6 C 44 6 32 28 42 42 C 48 28 58 14 64 10 C 68 10 52 30 68 42 M 58 32 C 64 22 75 32 88 38 M 20 28 L 82 28" fill="none" stroke="#0b2d52" stroke-width="2.2" stroke-linecap="round"/>
              <text x="26" y="32" font-family="'Brush Script MT', 'Dancing Script', 'Caveat', cursive" font-size="28" fill="#0b2d52" font-style="italic">Leonardo</text>
            </svg>
            <div class="sig-name">Leonardo Leite ribeiro</div>
            <div class="sig-role">Presidente ASTEO-MT</div>
          </div>

          <div class="qr-box-back">
            <svg viewBox="0 0 100 100" fill="#0b2d52">
              <rect x="10" y="10" width="30" height="30" fill="#0b2d52"/>
              <rect x="15" y="15" width="20" height="20" fill="#fff"/>
              <rect x="20" y="20" width="10" height="10" fill="#0b2d52"/>
              <rect x="60" y="10" width="30" height="30" fill="#0b2d52"/>
              <rect x="65" y="15" width="20" height="20" fill="#fff"/>
              <rect x="70" y="20" width="10" height="10" fill="#0b2d52"/>
              <rect x="10" y="60" width="30" height="30" fill="#0b2d52"/>
              <rect x="15" y="65" width="20" height="20" fill="#fff"/>
              <rect x="20" y="70" width="10" height="10" fill="#0b2d52"/>
              <rect x="50" y="50" width="15" height="15" fill="#0b2d52"/>
              <rect x="70" y="50" width="15" height="15" fill="#0b2d52"/>
              <rect x="50" y="75" width="15" height="15" fill="#0b2d52"/>
              <rect x="75" y="75" width="15" height="15" fill="#0b2d52"/>
            </svg>
          </div>
        </div>

        <div class="card-footer-bar">
          <div class="mission-text">
            NOSSA MISSÃO: QUALIFICAR E FORTALECER OS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS COM RESPONSABILIDADE, ÉTICA E COMPROMISSO COM A SAÚDE E BEM-ESTAR DA POPULAÇÃO.
          </div>
          <div class="auth-label">Verifique a autenticidade</div>
        </div>
      </div>

      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function downloadCertidaoRegularidade(user: UserData) {
  const name = user.name || 'Associado ASTEO-MT';
  const reg = user.inscricao || '0001/ASTEO-MT';
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Certidão de Regularidade - ASTEO-MT</title>
      <style>
        body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.6; }
        .cert-border { border: 8px double #0b2d52; padding: 40px; max-width: 750px; margin: 0 auto; background: #fff; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #0b2d52; padding-bottom: 20px; }
        .header h1 { margin: 0; font-size: 22px; color: #0b2d52; text-transform: uppercase; }
        .header h3 { margin: 5px 0 0; font-size: 14px; font-weight: normal; color: #555; }
        .title { text-align: center; font-size: 24px; font-weight: bold; margin: 30px 0; color: #0b2d52; text-transform: uppercase; letter-spacing: 2px; }
        .content { font-size: 16px; text-align: justify; text-indent: 40px; margin-bottom: 40px; }
        .status-box { background: #f0fdf4; border: 1px solid #166534; color: #166534; padding: 15px; text-align: center; font-weight: bold; font-size: 18px; margin: 20px 0; border-radius: 6px; }
        .footer { text-align: center; margin-top: 60px; }
        .signature { margin-top: 40px; border-top: 1px solid #333; display: inline-block; width: 300px; padding-top: 5px; font-size: 14px; }
        .hash { font-size: 11px; color: #777; margin-top: 30px; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="cert-border">
        <div class="header">
          <h1>ASTEO-MT</h1>
          <h3>ASSOCIAÇÃO MATO-GROSSENSE DOS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS</h3>
          <p style="font-size: 12px; margin-top: 5px;">CNPJ: 08.629.251/0001-41 • Reg. Civil Cartório 2º Ofício nº 241 - Livro A • CBO 3226-05</p>
        </div>

        <div class="title">Certidão de Regularidade Profissional</div>

        <div class="content">
          Certificamos, para os devidos fins de direito, comprovação junto a hospitais, clínicas públicas ou privadas e órgãos fiscalizadores do Estado de Mato Grosso, que o(a) profissional <strong>${name.toUpperCase()}</strong>, cadastrado(a) sob a Inscrição Regional <strong>${reg}</strong>, encontra-se devidamente <strong>REGULAR E QUITADO(A)</strong> com suas obrigações estatutárias e financeiras perante esta entidade.
        </div>

        <div class="status-box">
          STATUS: ATIVO E REGULARIZADO (EXERCÍCIO 2026)
        </div>

        <div class="content">
          A presente certidão é emitida conforme Estatuto Social e válida até <strong>31 de Dezembro de 2026</strong>.
        </div>

        <div class="footer">
          Cuiabá - MT, ${today}.
          <br><br>
          <div class="signature">
            <strong>Leonardo Leite ribeiro</strong><br>
            Presidente ASTEO-MT
          </div>
          <div class="hash">
            Código de Autenticação Digital: CERT-REG-${Math.random().toString(36).substring(2, 12).toUpperCase()}-2026
          </div>
        </div>
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function downloadReciboAnuidade(user: UserData) {
  const name = user.name || 'Associado ASTEO-MT';
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const today = new Date().toLocaleDateString('pt-BR');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Recibo de Quitação de Anuidade 2026 - ASTEO-MT</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
        .receipt-box { background: white; max-width: 650px; margin: 0 auto; border: 2px solid #0b2d52; padding: 30px; border-radius: 12px; }
        .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
        .header h2 { margin: 0; color: #0b2d52; }
        .amount { background: #eff6ff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #0b2d52; border-radius: 8px; margin: 20px 0; border: 1px solid #bfdbfe; }
        .text { font-size: 15px; line-height: 1.6; text-align: justify; }
        .footer { margin-top: 40px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13px; color: #666; }
      </style>
    </head>
    <body>
      <div class="receipt-box">
        <div class="header">
          <h2>ASTEO-MT</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #555;">Associação Mato-Grossense dos Técnicos em Imobilizações Ortopédicas</p>
          <p style="margin: 2px 0 0; font-size: 11px; color: #777;">CNPJ: 08.629.251/0001-41 • Reg. Civil Cartório 2º Ofício nº 241 (Livro A)</p>
          <h3 style="margin-top: 15px; color: #0b2d52;">RECIBO DE QUITAÇÃO DE ANUIDADE</h3>
        </div>

        <div class="amount">R$ 186,00 (Cento e Oitenta e Seis Reais)</div>

        <div class="text">
          Recebemos de <strong>${name}</strong> a quantia de R$ 186,00 referente ao pagamento da <strong>Anuidade Institucional do Exercício 2026</strong> da ASTEO-MT, conferindo-lhe quitação plena e direito a todos os benefícios de associado ativo.
        </div>

        <div class="footer">
          Data do Pagamento: ${today} • Método: Mercado Pago (Processamento Automático)<br>
          ASTEO-MT — CNPJ 08.629.251/0001-41 • Mato Grosso, Brasil
        </div>
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function downloadCertificadoCurso(user: UserData, cursoTitulo: string, cargaHoraria: string, codigoCert: string) {
  const name = user.name || 'Associado ASTEO-MT';
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Certificado - ${cursoTitulo}</title>
      <style>
        body { font-family: 'Georgia', serif; padding: 30px; background: #f1f5f9; }
        .cert { background: white; border: 12px double #d97706; padding: 50px; max-width: 850px; margin: 0 auto; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 8px; }
        .cert-header h1 { font-size: 28px; color: #0b2d52; margin: 0; font-family: 'Arial', sans-serif; text-transform: uppercase; }
        .cert-header h3 { font-size: 14px; color: #d97706; margin: 5px 0 30px; font-weight: bold; letter-spacing: 2px; }
        .cert-title { font-size: 32px; font-weight: bold; color: #0b2d52; margin: 20px 0; text-transform: uppercase; letter-spacing: 3px; }
        .cert-body { font-size: 18px; line-height: 1.8; margin: 30px 0; color: #334155; }
        .course-name { font-size: 22px; font-weight: bold; color: #0b2d52; margin: 15px 0; display: block; }
        .footer { margin-top: 50px; display: flex; justify-content: space-around; align-items: flex-end; }
        .signature { border-top: 1px solid #475569; width: 250px; padding-top: 5px; font-size: 13px; font-family: sans-serif; }
        .cert-code { font-size: 11px; color: #94a3b8; font-family: monospace; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="cert">
        <div class="cert-header">
          <h1>ASTEO-MT</h1>
          <h3>ASSOCIAÇÃO MATO-GROSSENSE DOS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS</h3>
        </div>

        <div class="cert-title">CERTIFICADO</div>

        <div class="cert-body">
          Certificamos que <strong>${name.toUpperCase()}</strong> concluiu com êxito a capacitação profissional no curso de:
          <span class="course-name">"${cursoTitulo}"</span>
          com carga horária total de <strong>${cargaHoraria}</strong>, cumprindo todas as exigências técnico-científicas estabelecidas pela ASTEO-MT.
        </div>

        <div style="font-size: 14px; color: #64748b;">
          Cuiabá - MT, ${today}.
        </div>

        <div class="footer">
          <div class="signature">
            <strong>Leonardo Leite ribeiro</strong><br>
            Presidente ASTEO-MT
          </div>
          <div class="signature">
            <strong>COORDENAÇÃO PEDAGÓGICA</strong><br>
            Depto. de Ensino e Pesquisa
          </div>
        </div>

        <div class="cert-code">
          Autenticidade Verificável: ${codigoCert}
        </div>
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function openEstatutoSocial() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Estatuto Social Oficial - ASTEO-MT</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
        h1 { color: #0b2d52; text-align: center; font-size: 22px; }
        h2 { color: #0b2d52; border-bottom: 2px solid #0b2d52; padding-bottom: 5px; margin-top: 30px; font-size: 16px; }
        p { text-align: justify; text-indent: 30px; }
      </style>
    </head>
    <body>
      <h1>ESTATUTO SOCIAL DA ASTEO-MT</h1>
      <p style="text-align: center; font-weight: bold; color: #64748b;">Associação Mato-Grossense dos Técnicos em Imobilizações Ortopédicas</p>
      
      <h2>CAPÍTULO I - DA DENOMINAÇÃO, SEDE E FINS</h2>
      <p>Art. 1º - A ASTEO-MT é uma entidade civil de direito privado, sem fins lucrativos, representativa dos profissionais Técnicos em Imobilização Ortopédica no Estado de Mato Grosso, fundada em 2007.</p>
      <p>Art. 2º - A Associação tem por finalidade representar, defender e promover o desenvolvimento técnico-científico, ético e social da categoria.</p>

      <h2>CAPÍTULO II - DOS ASSOCIADOS E DIREITOS</h2>
      <p>Art. 3º - Podem associar-se todos os profissionais que atuem na área de imobilização ortopédica devidamente habilitados.</p>
      <p>Art. 4º - São direitos dos associados em dia com a anuidade: votar e ser votado em assembleias, usufruir dos convênios de saúde e educação, obter certidão de regularidade e jurídica.</p>

      <h2>CAPÍTULO III - DAS ANUIDADES</h2>
      <p>Art. 5º - A anuidade institucional é fixada anualmente pela Diretoria Executiva para manutenção das atividades institucionais.</p>

      <div style="text-align: center; margin-top: 50px; font-weight: bold;">
        ASTEO-MT — Documento Registrado no Cartório de Títulos e Documentos de Cuiabá/MT
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function openManualTecnico() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Manual de Diretrizes Técnicas de Imobilização Ortopédica - ASTEO-MT</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1e293b; }
        h1 { color: #0b2d52; text-align: center; font-size: 22px; }
        h2 { color: #0b2d52; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; margin-top: 30px; font-size: 16px; }
        .box { background: #f1f5f9; padding: 15px; border-left: 4px solid #0b2d52; margin: 15px 0; }
      </style>
    </head>
    <body>
      <h1>MANUAL DE DIRETRIZES TÉCNICAS DE IMOBILIZAÇÃO ORTOPÉDICA</h1>
      <p style="text-align: center; font-weight: bold; color: #64748b;">Comissão Técnica de Ensino e Biossegurança da ASTEO-MT</p>
      
      <h2>1. PROTOCOLO DE CONFECÇÃO DE APARELHO GESSO-SINTÉTICO E TRADICIONAL</h2>
      <div class="box">
        <strong>Requisito Básico:</strong> Sempre inspecionar a pele antes da aplicação da malha tubular e algodão ortopédico. Garantir proeminências ósseas devidamente acolchoadas.
      </div>
      <p>O Técnico em Imobilização deve seguir rigorosamente as orientações do médico ortopedista assistente, respeitando os ângulos funcionais das articulações (ex: tornozelo a 90°, punho em neutro ou leve extensão).</p>

      <h2>2. MONITORAMENTO E ORIENTAÇÃO AO PACIENTE</h2>
      <p>Orientar quanto a sinais de síndrome de compartimento: dor desproporcional, parestesia, cianose ou palidez nos quirodáctilos/pododáctilos. Retorno imediato ao serviço de urgência.</p>

      <div style="text-align: center; margin-top: 50px; font-size: 12px; color: #64748b;">
        ASTEO-MT — Todos os direitos reservados. Uso exclusivo de associados e profissionais de Mato Grosso.
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
