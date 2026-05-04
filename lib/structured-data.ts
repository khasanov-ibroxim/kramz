import { Locale } from '@/i18n-config';

const baseUrl = 'https://gurlanglobalteks.uz';

export function generateOrganizationSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gurlan Global Teks',
    alternateName: lang === 'ru' ? 'Гурлан Глобал Текс' : 'Gurlan Global Teks',
    description: lang === 'ru'
      ? 'Современный текстильный кластер от хлопка до готовой одежды. Производство 6 млн изделий в год.'
      : 'Modern textile cluster from cotton to finished garments. Production of 6 million items per year.',
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: '+998978570005',
    email: 'gurlanglobal@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: lang === 'ru' ? 'ул.Мустакиллик, 5' : 'Mustaqillik St., 5',
      addressLocality: lang === 'ru' ? 'Гурленский район' : 'Gurlan district',
      addressRegion: lang === 'ru' ? 'Хорезмская область' : 'Khorezm region',
      addressCountry: 'UZ'
    },
    sameAs: [
      'https://t.me/ggt_inc',
      'https://wa.me/998978570005',
      'https://www.instagram.com/ggt_textile/'
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 1000
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide'
    }
  };
}

export function generateWebSiteSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gurlan Global Teks',
    alternateName: lang === 'ru' ? 'Гурлан Глобал Текс' : 'Gurlan Global Teks',
    url: `${baseUrl}/${lang}`,
    description: lang === 'ru'
      ? 'Официальный сайт текстильного производства полного цикла'
      : 'Official website of full-cycle textile production',
    inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${lang}/products?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateManufacturerSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Manufacturer',
    name: 'Gurlan Global Teks',
    description: lang === 'ru'
      ? 'Вертикально интегрированное текстильное производство полного цикла'
      : 'Vertically integrated full-cycle textile production',
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: '+998978570005',
    email: 'gurlanglobal@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: lang === 'ru' ? 'ул.Мустакиллик, 5' : 'Mustaqillik St., 5',
      addressLocality: lang === 'ru' ? 'Гурленский район' : 'Gurlan district',
      addressRegion: lang === 'ru' ? 'Хорезмская область' : 'Khorezm region',
      addressCountry: 'UZ'
    },
    brand: {
      '@type': 'Brand',
      name: 'Gurlan Global Teks'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: lang === 'ru' ? 'Текстильная продукция' : 'Textile products',
          description: lang === 'ru'
            ? 'Хлопок, пряжа, ткани, готовая одежда'
            : 'Cotton, yarn, fabrics, finished garments'
        }
      }
    ]
  };
}

export function generateBreadcrumbSchema(
  lang: Locale,
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  };
}

export function generateProductSchema(
  lang: Locale,
  name: string,
  description: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: image ? `${baseUrl}${image}` : `${baseUrl}/og-products.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Gurlan Global Teks'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Gurlan Global Teks',
      url: `${baseUrl}/${lang}`
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'Gurlan Global Teks'
      }
    }
  };
}
