import cacaoImg from '../assets/cacao-site.webp'
import cajouxImg from '../assets/cajoux-site.webp'
import cannelleImg from '../assets/cannelle-site.webp'
import gingembreImg from '../assets/gingembre-site.webp'
import moringaImg from '../assets/moringa-site.webp'
import poivreNoirImg from '../assets/poivre-noire-site.webp'

const products = [
  /* ───────────────── Moringa ───────────────── */
  {
    name: { fr: 'Moringa', en: 'Moringa' },
    slug: 'moringa',
    type: { fr: 'Poudre', en: 'Powder' },
    formats: { fr: '100g, 200g', en: '100g, 200g' },
    description: {
      fr: "L'arbre miracle de Madagascar. Riche en vitamines, minéraux et antioxydants naturels.",
      en: 'The miracle tree of Madagascar. Rich in vitamins, minerals, and natural antioxidants.',
    },
    details: {
      fr: "Surnommé « l'arbre de vie », le moringa est un super-aliment naturel. Nos feuilles sont séchées à basse température pour préserver tous les nutriments.",
      en: 'Known as the "tree of life," moringa is a natural superfood. Our leaves are dried at low temperature to preserve every nutrient.',
    },
    longDescription: {
      fr: "Le moringa, surnommé « l'arbre de vie », est une plante aux multiples vertus, cultivée dans les terres riches de Madagascar. Notre poudre de moringa est obtenue par un processus minutieux : les feuilles sont récoltées à la main, séchées naturellement à l'ombre pour préserver leurs nutriments, puis finement moulues.",
      en: 'Moringa, known as the "tree of life," is a plant with countless benefits, grown in the rich soils of Madagascar. Our moringa powder is produced through a meticulous process: the leaves are hand-harvested, naturally shade-dried to preserve their nutrients, then finely ground.',
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: 'Elle contient plus de 90 nutriments essentiels, dont des protéines végétales, des vitamines A, C et E, du calcium, du potassium et du fer.',
          en: 'It contains over 90 essential nutrients, including plant-based proteins, vitamins A, C, and E, calcium, potassium, and iron.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: 'Elle aide à renforcer le système immunitaire, améliore la vitalité, soutient la digestion et contribue à la régulation du métabolisme.',
          en: 'It helps strengthen the immune system, boosts vitality, supports digestion, and contributes to metabolic regulation.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Idéale pour enrichir les smoothies, jus, infusions, sauces ou plats traditionnels. Une petite cuillère suffit pour booster votre alimentation quotidienne.',
          en: 'Perfect for enriching smoothies, juices, infusions, sauces, or traditional dishes. Just one teaspoon is enough to supercharge your daily diet.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Cultivée localement, sans additifs ni produits chimiques, elle valorise les ressources naturelles et soutient les communautés rurales.',
          en: 'Locally grown without additives or chemicals, it promotes natural resources and supports rural communities.',
        },
      },
    ],
    closing: {
      fr: 'Un super-aliment complet, qui incarne la force et la richesse de la biodiversité malgache.',
      en: 'A complete superfood that embodies the strength and richness of Madagascar\'s biodiversity.',
    },
    image: moringaImg,
    alt: {
      fr: 'Moringa en poudre de Madagascar — super-aliment riche en vitamines Kazépices',
      en: 'Madagascar moringa powder — vitamin-rich superfood by Kazépices',
    },
    color: 'from-green-600/20',
    category: 'poudre',
  },

  /* ───────────────── Poivre Noir ───────────────── */
  {
    name: { fr: 'Poivre Noir', en: 'Black Pepper' },
    slug: 'poivre-noir',
    type: { fr: 'Poudre', en: 'Powder' },
    formats: { fr: '100g, 200g', en: '100g, 200g' },
    description: {
      fr: "Le roi des épices. Notre poivre noir de Madagascar offre un arôme intense et une saveur boisée unique.",
      en: 'The king of spices. Our Madagascar black pepper offers an intense aroma and unique woody flavor.',
    },
    details: {
      fr: 'Récolté à maturité parfaite, notre poivre noir développe des notes boisées et légèrement fruitées. Un indispensable pour relever tous vos plats.',
      en: 'Harvested at peak maturity, our black pepper develops woody and subtly fruity notes. An essential ingredient to elevate all your dishes.',
    },
    longDescription: {
      fr: "Le poivre noir de Madagascar est considéré comme l'un des meilleurs au monde. Récolté à maturité parfaite dans les forêts tropicales de l'île, il développe des notes boisées et légèrement fruitées qui subliment chaque plat.",
      en: "Madagascar black pepper is regarded as one of the finest in the world. Harvested at peak maturity in the island's tropical forests, it develops woody and subtly fruity notes that elevate every dish.",
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: "Riche en pipérine, un composé qui favorise l'absorption des nutriments, ainsi qu'en vitamines K et C, manganèse et fer.",
          en: 'Rich in piperine, a compound that enhances nutrient absorption, as well as vitamins K and C, manganese, and iron.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: "Il stimule la digestion, possède des propriétés antioxydantes et aide à améliorer l'absorption de la curcumine.",
          en: 'It stimulates digestion, has antioxidant properties, and helps improve curcumin absorption.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Incontournable en cuisine pour relever viandes, poissons, légumes et sauces. Ajoutez-le en fin de cuisson pour préserver tout son arôme.',
          en: 'A kitchen essential for seasoning meats, fish, vegetables, and sauces. Add it at the end of cooking to preserve its full aroma.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Récolté à la main dans le respect des cycles naturels, sans pesticides ni engrais chimiques.',
          en: 'Hand-harvested in harmony with natural cycles, without pesticides or chemical fertilizers.',
        },
      },
    ],
    closing: {
      fr: "Le roi des épices, symbole de l'excellence malgache.",
      en: 'The king of spices, a symbol of Malagasy excellence.',
    },
    image: poivreNoirImg,
    alt: {
      fr: 'Poivre noir en poudre de Madagascar — arôme intense et boisé Kazépices',
      en: 'Madagascar black pepper powder — intense and woody aroma by Kazépices',
    },
    color: 'from-stone-500/20',
    category: 'poudre',
  },

  /* ───────────────── Gingembre ───────────────── */
  {
    name: { fr: 'Gingembre', en: 'Ginger' },
    slug: 'gingembre',
    type: { fr: 'Poudre', en: 'Powder' },
    formats: { fr: '100g, 200g', en: '100g, 200g' },
    description: {
      fr: "Racine énergisante au goût piquant et chaud. Parfait pour vos infusions et plats exotiques.",
      en: 'An energizing root with a spicy, warm taste. Perfect for your infusions and exotic dishes.',
    },
    details: {
      fr: 'Notre gingembre malgache est sélectionné pour son piquant caractéristique et ses bienfaits digestifs. Idéal en infusion, en cuisine ou en pâtisserie.',
      en: 'Our Malagasy ginger is selected for its distinctive spiciness and digestive benefits. Ideal in infusions, cooking, or baking.',
    },
    longDescription: {
      fr: "Le gingembre de Madagascar est une racine au goût piquant et chaud, cultivée dans les terres fertiles de l'île. Notre poudre de gingembre est obtenue à partir de racines soigneusement sélectionnées, séchées et moulues pour conserver toute leur puissance aromatique.",
      en: "Madagascar ginger is a root with a spicy, warm flavor, cultivated in the island's fertile soils. Our ginger powder is made from carefully selected roots, dried and ground to preserve their full aromatic potency.",
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: "Riche en gingérol, un puissant anti-inflammatoire naturel, ainsi qu'en vitamines B6, magnésium et manganèse.",
          en: 'Rich in gingerol, a powerful natural anti-inflammatory, as well as vitamin B6, magnesium, and manganese.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: 'Il stimule la digestion, soulage les nausées, renforce le système immunitaire et possède des propriétés anti-inflammatoires reconnues.',
          en: 'It stimulates digestion, relieves nausea, strengthens the immune system, and has well-recognized anti-inflammatory properties.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Parfait en infusion chaude, dans les currys, marinades, pâtisseries et jus de fruits frais. Un allié quotidien pour votre bien-être.',
          en: 'Perfect in hot infusions, curries, marinades, pastries, and fresh fruit juices. A daily ally for your well-being.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Cultivé de manière traditionnelle à Madagascar, sans produits chimiques, dans le respect de la terre et des saisons.',
          en: 'Traditionally cultivated in Madagascar without chemicals, respecting the land and the seasons.',
        },
      },
    ],
    closing: {
      fr: 'Une racine puissante et polyvalente, au cœur de la tradition malgache.',
      en: 'A powerful and versatile root, at the heart of Malagasy tradition.',
    },
    image: gingembreImg,
    alt: {
      fr: 'Gingembre en poudre de Madagascar — racine énergisante naturelle Kazépices',
      en: 'Madagascar ginger powder — natural energizing root by Kazépices',
    },
    color: 'from-yellow-600/20',
    category: 'poudre',
  },

  /* ───────────────── Cannelle ───────────────── */
  {
    name: { fr: 'Cannelle', en: 'Cinnamon' },
    slug: 'cannelle',
    type: { fr: 'Poudre', en: 'Powder' },
    formats: { fr: '100g, 200g', en: '100g, 200g' },
    description: {
      fr: "Cannelle douce et parfumée de Madagascar, idéale pour vos desserts et boissons chaudes.",
      en: 'Sweet, fragrant Madagascar cinnamon, ideal for desserts and hot beverages.',
    },
    details: {
      fr: "Notre cannelle de Madagascar se distingue par sa douceur et son parfum envoûtant. Parfaite pour les desserts, le thé, le café et les plats sucrés-salés.",
      en: 'Our Madagascar cinnamon stands out for its sweetness and captivating fragrance. Perfect for desserts, tea, coffee, and sweet-savory dishes.',
    },
    longDescription: {
      fr: "La cannelle de Madagascar se distingue par sa douceur exceptionnelle et son parfum envoûtant. Récoltée à partir de l'écorce interne du cannelier, elle est séchée naturellement puis réduite en une poudre fine et aromatique.",
      en: "Madagascar cinnamon stands out for its exceptional sweetness and captivating fragrance. Harvested from the inner bark of the cinnamon tree, it is naturally dried and ground into a fine, aromatic powder.",
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: "Riche en cinnamaldéhyde, un composé aux propriétés antimicrobiennes, ainsi qu'en fibres, manganèse et calcium.",
          en: 'Rich in cinnamaldehyde, a compound with antimicrobial properties, as well as fiber, manganese, and calcium.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: 'Elle aide à réguler la glycémie, possède des propriétés antioxydantes et contribue à améliorer la circulation sanguine.',
          en: 'It helps regulate blood sugar levels, has antioxidant properties, and contributes to improved blood circulation.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Parfaite pour les desserts, pâtisseries, boissons chaudes (thé, café, chocolat), et les plats sucrés-salés. Un incontournable de la cuisine.',
          en: 'Perfect for desserts, pastries, hot beverages (tea, coffee, hot chocolate), and sweet-savory dishes. A must-have in the kitchen.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Récoltée de manière durable, notre cannelle soutient les communautés productrices locales de Madagascar.',
          en: 'Sustainably harvested, our cinnamon supports local producer communities in Madagascar.',
        },
      },
    ],
    closing: {
      fr: 'Une épice douce et envoûtante, trésor des forêts malgaches.',
      en: 'A sweet and captivating spice, a treasure of the Malagasy forests.',
    },
    image: cannelleImg,
    alt: {
      fr: 'Cannelle en poudre de Madagascar — douce et parfumée Kazépices',
      en: 'Madagascar cinnamon powder — sweet and fragrant by Kazépices',
    },
    color: 'from-orange-700/20',
    category: 'poudre',
  },

  /* ───────────────── Cacao ───────────────── */
  {
    name: { fr: 'Cacao', en: 'Cocoa' },
    slug: 'cacao',
    type: { fr: 'Poudre', en: 'Powder' },
    formats: { fr: '100g, 200g', en: '100g, 200g' },
    description: {
      fr: "Cacao pur de Madagascar, aux arômes fruités et intenses. Un trésor chocolaté d'exception.",
      en: 'Pure Madagascar cocoa with fruity, intense aromas. An exceptional chocolate treasure.',
    },
    details: {
      fr: "Notre cacao malgache est reconnu pour ses notes fruitées uniques. Issu de fèves triées à la main, fermentées et torréfiées avec soin dans nos ateliers.",
      en: 'Our Malagasy cocoa is renowned for its unique fruity notes. Made from hand-sorted beans, naturally fermented and carefully roasted in our workshops.',
    },
    longDescription: {
      fr: "Le cacao de Madagascar est mondialement reconnu pour la finesse de ses arômes fruités et sa richesse incomparable. Nos fèves sont triées à la main, fermentées naturellement et torréfiées avec soin pour obtenir une poudre de cacao pure et intense.",
      en: 'Madagascar cocoa is world-renowned for the finesse of its fruity aromas and its incomparable richness. Our beans are hand-sorted, naturally fermented, and carefully roasted to produce a pure, intense cocoa powder.',
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: 'Très riche en flavonoïdes antioxydants, magnésium, fer, zinc et en théobromine, un stimulant naturel doux.',
          en: 'Exceptionally rich in antioxidant flavonoids, magnesium, iron, zinc, and theobromine, a gentle natural stimulant.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: 'Il favorise la bonne humeur, protège le système cardiovasculaire, améliore la concentration et soutient le métabolisme énergétique.',
          en: 'It promotes good mood, protects the cardiovascular system, improves focus, and supports energy metabolism.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Idéal pour les boissons chocolatées, pâtisseries, smoothies, ou simplement saupoudré sur vos fruits et céréales.',
          en: 'Ideal for hot chocolate, pastries, smoothies, or simply sprinkled over your fruits and cereals.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Cultivé en agroforesterie à Madagascar, notre cacao préserve la biodiversité et soutient les producteurs locaux.',
          en: 'Grown using agroforestry methods in Madagascar, our cocoa preserves biodiversity and supports local producers.',
        },
      },
    ],
    closing: {
      fr: "Un cacao d'exception, reflet du terroir unique de Madagascar.",
      en: "An exceptional cocoa, a reflection of Madagascar's unique terroir.",
    },
    image: cacaoImg,
    alt: {
      fr: 'Cacao en poudre de Madagascar — arômes fruités et intenses Kazépices',
      en: 'Madagascar cocoa powder — fruity and intense aromas by Kazépices',
    },
    color: 'from-amber-900/20',
    category: 'poudre',
  },

  /* ───────────────── Noix de Cajou ───────────────── */
  {
    name: { fr: 'Noix de Cajou', en: 'Cashew Nuts' },
    slug: 'noix-de-cajou',
    type: { fr: 'Fruit sec', en: 'Dried fruit' },
    formats: { fr: '100g, 250g', en: '100g, 250g' },
    description: {
      fr: "Noix de cajou croquantes de Madagascar, grillées naturellement. Un en-cas sain et savoureux.",
      en: 'Crunchy Madagascar cashew nuts, naturally roasted. A healthy and delicious snack.',
    },
    details: {
      fr: "Nos noix de cajou sont récoltées à la main et grillées naturellement pour préserver leur croquant et leur saveur douce et crémeuse.",
      en: 'Our cashew nuts are hand-harvested and naturally roasted to preserve their crunch and smooth, creamy flavor.',
    },
    longDescription: {
      fr: "Les noix de cajou de Madagascar sont réputées pour leur qualité exceptionnelle. Récoltées à la main et transformées avec soin, elles conservent tout leur croquant naturel et leur saveur douce et crémeuse qui en fait un en-cas irrésistible.",
      en: 'Madagascar cashew nuts are renowned for their exceptional quality. Hand-harvested and carefully processed, they retain all their natural crunch and smooth, creamy flavor, making them an irresistible snack.',
    },
    benefits: [
      {
        label: { fr: 'Valeur nutritionnelle', en: 'Nutritional value' },
        text: {
          fr: 'Riches en acides gras insaturés, protéines végétales, magnésium, phosphore, zinc et vitamines B.',
          en: 'Rich in unsaturated fatty acids, plant-based proteins, magnesium, phosphorus, zinc, and B vitamins.',
        },
      },
      {
        label: { fr: 'Bienfaits santé', en: 'Health benefits' },
        text: {
          fr: 'Elles contribuent à la santé cardiovasculaire, renforcent les os et les muscles, et apportent une énergie durable.',
          en: 'They support cardiovascular health, strengthen bones and muscles, and provide sustained energy.',
        },
      },
      {
        label: { fr: 'Usages', en: 'Uses' },
        text: {
          fr: 'Parfaites en en-cas, dans les salades, plats sautés, granolas ou réduites en beurre de cajou maison.',
          en: 'Perfect as a snack, in salads, stir-fries, granola, or blended into homemade cashew butter.',
        },
      },
      {
        label: { fr: 'Engagement environnemental', en: 'Environmental commitment' },
        text: {
          fr: 'Issues de vergers malgaches, nos noix de cajou soutiennent une filière locale durable et responsable.',
          en: 'From Malagasy orchards, our cashew nuts support a sustainable and responsible local supply chain.',
        },
      },
    ],
    closing: {
      fr: "Un fruit sec d'excellence, symbole du savoir-faire malgache.",
      en: 'A premium dried fruit, a symbol of Malagasy craftsmanship.',
    },
    image: cajouxImg,
    alt: {
      fr: 'Noix de cajou de Madagascar — croquantes et naturelles Kazépices',
      en: 'Madagascar cashew nuts — crunchy and natural by Kazépices',
    },
    color: 'from-amber-500/20',
    category: 'fruit-sec',
  },
]

export default products

/**
 * Product text helper — resolves a bilingual field for the given language.
 * Usage: pt(product.name, 'en') → "Moringa"
 */
export function pt(field, lang) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || field.fr || ''
}
