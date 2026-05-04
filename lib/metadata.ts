import { Metadata } from 'next';
import { Locale } from '@/i18n-config';
import { generateHreflangLinks } from './hreflang';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const baseUrl = 'https://gurlanglobalteks.uz';

const metadataByPage: Record<string, Record<Locale, PageMetadata>> = {
  home: {
    ru: {
      title: 'Gurlan Global Teks - Текстильное производство полного цикла',
      description: 'Современный текстильный кластер от хлопка до готовой одежды. Производство 6 млн изделий в год. Сертификаты OEKO-TEX, SEDEX, ISO.',
      keywords: 'текстиль, производство одежды, хлопок, пряжа, ткани, Узбекистан, экспорт, OEKO-TEX, SEDEX',
      ogImage: '/og-image.jpg'
    },
    en: {
      title: 'Gurlan Global Teks - Full Cycle Textile Production',
      description: 'Modern textile cluster from cotton to finished garments. Production of 6 million items per year. OEKO-TEX, SEDEX, ISO certified.',
      keywords: 'textile, garment production, cotton, yarn, fabrics, Uzbekistan, export, OEKO-TEX, SEDEX',
      ogImage: '/og-image.jpg'
    }
  },
  about: {
    ru: {
      title: 'О компании - Gurlan Global Teks',
      description: 'Вертикально интегрированное текстильное производство полного цикла. Контроль качества на каждом этапе от хлопка до готовой продукции.',
      keywords: 'о компании, текстильный кластер, производство, Гурлан, Узбекистан',
      ogImage: '/og-about.jpg'
    },
    en: {
      title: 'About Company - Gurlan Global Teks',
      description: 'Vertically integrated full-cycle textile production. Quality control at every stage from cotton to finished products.',
      keywords: 'about company, textile cluster, production, Gurlan, Uzbekistan',
      ogImage: '/og-about.jpg'
    }
  },
  production: {
    ru: {
      title: 'Производство - Gurlan Global Teks',
      description: 'Полный цикл производства: хлопок, пряжа, крашение, ткани, готовая продукция. Современное оборудование от мировых лидеров.',
      keywords: 'производство, хлопок, пряжа, крашение, ткани, трикотаж, одежда',
      ogImage: '/og-production.jpg'
    },
    en: {
      title: 'Production - Gurlan Global Teks',
      description: 'Full production cycle: cotton, yarn, dyeing, fabrics, finished products. Modern equipment from world leaders.',
      keywords: 'production, cotton, yarn, dyeing, fabrics, knitwear, garments',
      ogImage: '/og-production.jpg'
    }
  },
  products: {
    ru: {
      title: 'Продукция - Gurlan Global Teks',
      description: 'Мужская и женская одежда, ткани, пряжа. Производство 6 млн изделий в год. Высокое качество и международные стандарты.',
      keywords: 'продукция, одежда, мужская одежда, женская одежда, ткани, трикотаж',
      ogImage: '/og-products.jpg'
    },
    en: {
      title: 'Products - Gurlan Global Teks',
      description: 'Men\'s and women\'s clothing, fabrics, yarn. Production of 6 million items per year. High quality and international standards.',
      keywords: 'products, clothing, men\'s wear, women\'s wear, fabrics, knitwear',
      ogImage: '/og-products.jpg'
    }
  },
  contact: {
    ru: {
      title: 'Контакты - Gurlan Global Teks',
      description: 'Свяжитесь с нами: +998 97 857 00 05, gurlanglobal@gmail.com. Адрес: Узбекистан, Хорезмская область, Гурленский район.',
      keywords: 'контакты, связаться, адрес, телефон, email, Гурлан',
      ogImage: '/og-contact.jpg'
    },
    en: {
      title: 'Contact - Gurlan Global Teks',
      description: 'Contact us: +998 97 857 00 05, gurlanglobal@gmail.com. Address: Uzbekistan, Khorezm region, Gurlan district.',
      keywords: 'contact, reach us, address, phone, email, Gurlan',
      ogImage: '/og-contact.jpg'
    }
  }
};

export function generatePageMetadata(
  page: keyof typeof metadataByPage,
  lang: Locale,
  customTitle?: string,
  customDescription?: string
): Metadata {
  const pageData = metadataByPage[page]?.[lang] || metadataByPage.home[lang];

  const title = customTitle || pageData.title;
  const description = customDescription || pageData.description;
  const ogImage = pageData.ogImage || '/og-image.jpg';

  const pagePath = page === 'home' ? '' : page;
  const hreflangLinks = generateHreflangLinks(lang, pagePath);

  return {
    title,
    description,
    keywords: pageData.keywords,
    authors: [{ name: 'Gurlan Global Teks' }],
    creator: 'Gurlan Global Teks',
    publisher: 'Gurlan Global Teks',
    metadataBase: new URL(baseUrl),
    alternates: hreflangLinks,
    openGraph: {
      type: 'website',
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      url: `${baseUrl}/${lang}/${pagePath}`,
      title,
      description,
      siteName: 'Gurlan Global Teks',
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
