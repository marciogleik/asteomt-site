import audiencia1 from '../assets/images/noticias/audiencia-1.jpg';
import audiencia2 from '../assets/images/noticias/audiencia-2.jpg';
import audiencia3 from '../assets/images/noticias/audiencia-3.jpg';
import parceriaImg from '../assets/images/noticias/parceria-unifacc.png';

export const NOTICIAS = [
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
