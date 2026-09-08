import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: string;
}

const DEFAULT_TITLE = 'ASTEOMT | Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas';
const DEFAULT_DESCRIPTION = 'Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas (ASTEO-MT). Entidade dedicada ao fortalecimento, valorização e desenvolvimento da categoria em Mato Grosso.';
const BASE_URL = 'https://asteomt.com.br';

export function SEO({
  title,
  description,
  keywords,
  path = '',
  image = `${BASE_URL}/logo-asteomt.png`,
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // 1. Título do Documento
    const fullTitle = title ? `${title} | ASTEOMT` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper para atualizar ou criar meta tag
    const setMetaTag = (selector: string, attribute: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`${selector}[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper para atualizar link canonical
    const setCanonicalLink = (url: string) => {
      let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    const currentDescription = description || DEFAULT_DESCRIPTION;
    const currentCanonicalUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    // 2. Metadados Padrão
    setMetaTag('meta', 'name', 'description', currentDescription);
    if (keywords) {
      setMetaTag('meta', 'name', 'keywords', keywords);
    }
    setCanonicalLink(currentCanonicalUrl);

    // 3. Open Graph
    setMetaTag('meta', 'property', 'og:title', fullTitle);
    setMetaTag('meta', 'property', 'og:description', currentDescription);
    setMetaTag('meta', 'property', 'og:url', currentCanonicalUrl);
    setMetaTag('meta', 'property', 'og:image', image);
    setMetaTag('meta', 'property', 'og:type', type);

    // 4. Twitter Cards
    setMetaTag('meta', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta', 'name', 'twitter:description', currentDescription);
    setMetaTag('meta', 'name', 'twitter:image', image);

  }, [title, description, keywords, path, image, type]);

  return null;
}

export default SEO;
