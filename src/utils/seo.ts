export const generateMetaTags = (pageTitle: string, pageDescription: string) => {
  document.title = `${pageTitle} | SQTE`;
  
  // Meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', pageDescription);
  }

  // OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  
  if (ogTitle) {
    ogTitle.setAttribute('content', pageTitle);
  }
  if (ogDescription) {
    ogDescription.setAttribute('content', pageDescription);
  }
};

export const generateStructuredData = (data: {
  type: string;
  name: string;
  description: string;
  image?: string;
  url?: string;
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": data.type,
    "name": data.name,
    "description": data.description,
    ...(data.image && { "image": data.image }),
    ...(data.url && { "url": data.url })
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
};