import { siteUrl } from './site'

export function generateWebsiteStructuredData(url: string = siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SAHILDEV',
    description:
      'A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts by Sahil Satasiya.',
    url,
    author: {
      '@type': 'Person',
      name: 'Sahil Satasiya',
      url: 'https://github.com/sahil1402',
    },
  }
}

export function generatePersonStructuredData(url: string = siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sahil Satasiya',
    url,
    image: `${url}/profile-pic.png`,
    sameAs: ['https://github.com/sahil1402', 'https://www.linkedin.com/in/sahilsatasiya/'],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Meridian Intelligence',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  }
}
