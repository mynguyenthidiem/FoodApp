export default [
  {
    id: 1,
    slug: "the-rustic-bun",

    // BASIC

    name: "The Rustic Bun",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "American",

    cuisines: [
      "Burger",
      "Fast Food",
      "Sandwich",
    ],

    description:
      "Handcrafted burgers made with premium beef, artisan buns and homemade sauces.",

    // RATING

    rating: 4.8,

    reviewCount: 268,

    badge: "Top Rated",

    favorite: true,

    // STATUS

    isOpen: true,

    priceLevel: "$$",

    // DELIVERY

    delivery: {
      time: "20-30 min",

      fee: "$1.99",

      distance: "1.2 km",

      minimumOrder: "$10",
    },

    // FEATURES

    features: [
      "Free Delivery",
      "Outdoor Seating",
      "Family Friendly",
      "Takeaway",
      "Credit Card",
      "WiFi",
    ],

    // CONTACT

    info: {
      address: "123 Central Street, New York",

      phone: "+1 123 456 789",

      email: "hello@therusticbun.com",

      website: "https://therusticbun.com",

      openingHours: "09:00 AM - 10:00 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 2,
    slug: "clubhouse-central",

    name: "Clubhouse Central",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "American",

    cuisines: [
      "Burger",
      "Sandwich",
      "Coffee",
    ],

    description:
      "A cozy neighborhood restaurant serving gourmet burgers, handcrafted sandwiches and freshly brewed coffee all day.",

    rating: 4.5,

    reviewCount: 194,

    badge: "Popular",

    favorite: false,

    isOpen: true,

    priceLevel: "$$",

    delivery: {
      time: "15-25 min",
      fee: "$0.99",
      distance: "0.8 km",
      minimumOrder: "$8",
    },

    features: [
      "Free WiFi",
      "Takeaway",
      "Outdoor Seating",
      "Family Friendly",
      "Coffee Bar",
      "Credit Card",
    ],

    info: {
      address: "58 Broadway Avenue, New York",

      phone: "+1 212 555 2801",

      email: "contact@clubhousecentral.com",

      website: "https://clubhousecentral.com",

      openingHours: "08:00 AM - 09:30 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 3,
    slug: "tokyo-sushi",

    name: "Tokyo Sushi",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Japanese",

    cuisines: [
      "Sushi",
      "Sashimi",
      "Ramen",
    ],

    description:
      "Authentic Japanese cuisine prepared daily with premium seafood, handcrafted sushi and traditional ramen.",

    rating: 4.9,

    reviewCount: 325,

    badge: "New",

    favorite: false,

    isOpen: true,

    priceLevel: "$$$",

    delivery: {
      time: "30-40 min",
      fee: "$2.99",
      distance: "2.5 km",
      minimumOrder: "$15",
    },

    features: [
      "Fresh Seafood",
      "Chef's Special",
      "Family Friendly",
      "Takeaway",
      "Credit Card",
      "WiFi",
    ],

    info: {
      address: "88 Sakura Avenue, Tokyo District",

      phone: "+81 90 1234 5678",

      email: "hello@tokyosushi.com",

      website: "https://tokyosushi.com",

      openingHours: "11:00 AM - 10:30 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 4,
    slug: "roma-pasta",

    name: "Roma Pasta",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Italian",

    cuisines: [
      "Pizza",
      "Pasta",
      "Italian",
    ],

    description:
      "Traditional Italian recipes featuring handmade pasta, wood-fired pizzas and authentic Mediterranean flavors.",

    rating: 4.7,

    reviewCount: 287,

    badge: "Chef Pick",

    favorite: true,

    isOpen: true,

    priceLevel: "$$$",

    delivery: {
      time: "25-35 min",
      fee: "$1.99",
      distance: "1.7 km",
      minimumOrder: "$12",
    },

    features: [
      "Wood Fired Pizza",
      "Fresh Pasta",
      "Outdoor Seating",
      "Takeaway",
      "Wine Available",
      "Free WiFi",
    ],

    info: {
      address: "25 Roma Street, Little Italy",

      phone: "+39 555 123 456",

      email: "hello@romapasta.com",

      website: "https://romapasta.com",

      openingHours: "10:30 AM - 10:00 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 5,
    slug: "bombay-spice",

    name: "Bombay Spice",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Indian",

    cuisines: [
      "Indian",
      "Curry",
      "Grill",
    ],

    description:
      "Traditional Indian cuisine featuring authentic curries, tandoori specialties, fragrant biryanis and freshly baked naan.",

    rating: 4.6,

    reviewCount: 182,

    badge: "Trending",

    favorite: false,

    isOpen: true,

    priceLevel: "$$",

    delivery: {
      time: "20-30 min",
      fee: "$1.49",
      distance: "3.1 km",
      minimumOrder: "$15",
    },

    features: [
      "Halal",
      "Family Friendly",
      "Delivery",
      "Takeaway",
      "Vegetarian Options",
      "Free WiFi",
    ],

    info: {
      address: "58 Spice Avenue, Little India",

      phone: "+1 212 555 8877",

      email: "hello@bombayspice.com",

      website: "https://bombayspice.com",

      openingHours: "10:30 AM - 10:30 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 6,
    slug: "sweet-corner",

    name: "Sweet Corner",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Bakery",

    cuisines: [
      "Bakery",
      "Dessert",
      "Coffee",
    ],

    description:
      "A cozy bakery serving handcrafted cakes, pastries, artisan breads and freshly brewed coffee every day.",

    rating: 4.8,

    reviewCount: 156,

    badge: "Dessert",

    favorite: false,

    isOpen: true,

    priceLevel: "$",

    delivery: {
      time: "15-20 min",
      fee: "$0.99",
      distance: "1.4 km",
      minimumOrder: "$8",
    },

    features: [
      "Freshly Baked",
      "Coffee",
      "Birthday Cakes",
      "Takeaway",
      "Family Friendly",
      "Free WiFi",
    ],

    info: {
      address: "16 Baker Street, Downtown",

      phone: "+1 212 555 9032",

      email: "hello@sweetcorner.com",

      website: "https://sweetcorner.com",

      openingHours: "07:00 AM - 09:00 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
        "Custom Cakes",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 7,
    slug: "ocean-catch",

    name: "Ocean Catch",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Seafood",

    cuisines: [
      "Seafood",
      "Grill",
      "Western",
    ],

    description:
      "Fresh seafood delivered daily featuring lobster, oysters, grilled fish and signature coastal specialties.",

    rating: 4.7,

    reviewCount: 214,

    badge: "Fresh",

    favorite: true,

    isOpen: false,

    priceLevel: "$$$",

    delivery: {
      time: "30-45 min",
      fee: "$2.49",
      distance: "4 km",
      minimumOrder: "$18",
    },

    features: [
      "Fresh Seafood",
      "Outdoor Seating",
      "Family Friendly",
      "Takeaway",
      "Ocean View",
      "Free WiFi",
    ],

    info: {
      address: "88 Harbor Boulevard, Seaside District",

      phone: "+1 212 555 7421",

      email: "hello@oceancatch.com",

      website: "https://oceancatch.com",

      openingHours: "11:00 AM - 10:00 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },

  {
    id: 8,
    slug: "green-garden",

    name: "Green Garden",

    image: require("../assets/banner.jpg"),

    coverImage: require("../assets/banner.jpg"),

    gallery: [
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
      require("../assets/banner.jpg"),
    ],

    cuisine: "Vegetarian",

    cuisines: [
      "Vegetarian",
      "Vegan",
      "Healthy",
    ],

    description:
      "Healthy plant-based meals made with fresh organic ingredients, colorful salads and refreshing smoothies.",

    rating: 4.6,

    reviewCount: 145,

    badge: "Healthy",

    favorite: false,

    isOpen: true,

    priceLevel: "$$",

    delivery: {
      time: "20-25 min",
      fee: "$1.49",
      distance: "1.9 km",
      minimumOrder: "$12",
    },

    features: [
      "100% Fresh",
      "Vegan Friendly",
      "Organic Ingredients",
      "Takeaway",
      "Gluten-Free Options",
      "Free WiFi",
    ],

    info: {
      address: "120 Green Avenue, Eco District",

      phone: "+1 212 555 6633",

      email: "hello@greengarden.com",

      website: "https://greengarden.com",

      openingHours: "08:00 AM - 09:00 PM",

      paymentMethods: [
        "Cash",
        "Visa",
        "MasterCard",
        "Apple Pay",
      ],

      services: [
        "Delivery",
        "Takeaway",
        "Dine In",
      ],

      parking: true,

      wifi: true,
    },
  },
];