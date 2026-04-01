import audiencia1 from '../assets/images/noticias/audiencia-1.jpg';
import audiencia2 from '../assets/images/noticias/home-hero.png';
import audiencia3 from '../assets/images/noticias/audiencia-3.jpg';
import parceriaImg from '../assets/images/noticias/parceria-unifacc.png';
import parceriaDuma from '../assets/images/noticias/parceria-duma.png';

export const NOTICIAS = [
  {
    id: 'parceria-duma',
    badge: 'Nova Parceria',
    titulo: 'ASTEO-MT e Duma Psicologia e Saúde firmam parceria para cuidado emocional dos associados',
    data: '20 de março de 2026',
    local: 'Atendimento Online',
    intro: 'A ASTEO-MT e a Duma Psicologia e Saúde estabelecem convênio para oferecer suporte psicológico qualificado com condições exclusivas para associados e seus familiares.',
    texto: [
      'Esta parceria é firmada entre a Duma Psicologia e Saúde e a ASTEO-MT, sendo destinada aos associados ativos da instituição, com extensão do benefício aos seus respectivos cônjuges e filhos. O objetivo é proporcionar acesso a um serviço psicológico qualificado, com condições diferenciadas, mantendo o padrão de excelência, confidencialidade e cuidado característicos da Duma.',
      'A clínica oferece terapia online para adultos (individual, casal e grupo), com acolhimento sensível, clareza e exclusividade. A Duma estabelece um ecossistema de parcerias com o objetivo de ampliar o acesso a um cuidado psicológico qualificado, mantendo seu posicionamento de excelência e profundidade clínica.',
      'Benefícios exclusivos: Associados ativos, cônjuges e filhos. Atendimentos de acompanhamento psicológico exclusivamente on-line.'
    ],
    galeria: [parceriaDuma],
    linkExterno: {
      label: 'Visitar Site da Duma Saúde',
      url: 'https://dumasaude.com'
    },
    contato: {
      whatsapp: '+55 62 99903-4804',
      email: 'info@dumasaude.com',
      instagram: 'https://www.instagram.com/dumasaud'
    },
    destaque: true
  },
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
