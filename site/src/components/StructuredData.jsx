function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://kazepices.com/#organization',
        name: 'Kazepices Madagascar',
        url: 'https://kazepices.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://kazepices.com/logo.webp',
          width: 200,
          height: 200,
        },
        description:
          'Epices naturelles et artisanales de Madagascar. Curcuma, poivre noir, gingembre, moringa, cannelle — 100% naturel, sans produits chimiques.',
        founder: {
          '@type': 'Person',
          name: 'Ikbal Charifou',
        },
        foundingLocation: {
          '@type': 'Place',
          name: 'Madagascar',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MG',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contact@kazepices.com',
          contactType: 'customer service',
          availableLanguage: ['French'],
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://kazepices.com/#website',
        url: 'https://kazepices.com',
        name: 'Kazepices Madagascar',
        publisher: {
          '@id': 'https://kazepices.com/#organization',
        },
        inLanguage: 'fr-FR',
      },
    ],
  }

  return <JsonLd data={data} />
}

export function ProductListSchema({ products }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Epices naturelles de Madagascar — Kazepices',
    description:
      'Catalogue complet des epices et huiles naturelles Kazepices : curcuma, poivre noir, gingembre, moringa, cannelle, huile de moringa.',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${product.name} de Madagascar`,
        description: product.description,
        image: typeof product.image === 'string' ? product.image : undefined,
        brand: {
          '@type': 'Brand',
          name: 'Kazepices',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Madagascar',
        },
        category: product.type,
        material: '100% naturel',
      },
    })),
  }

  return <JsonLd data={data} />
}

export function BreadcrumbSchema({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://kazepices.com/#business',
    name: 'Kazepices Madagascar',
    description:
      'Producteur et distributeur d\'epices naturelles et artisanales de Madagascar. Curcuma, poivre noir, gingembre, moringa, cannelle — livraison internationale.',
    url: 'https://kazepices.com',
    logo: 'https://kazepices.com/logo.webp',
    image: 'https://kazepices.com/og-image.jpg',
    email: 'contact@kazepices.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MG',
      addressRegion: 'Madagascar',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -18.9149,
      longitude: 47.5316,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: 'Ikbal Charifou',
    },
  }

  return <JsonLd data={data} />
}
