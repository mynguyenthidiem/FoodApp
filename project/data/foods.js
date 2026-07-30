export default [

  {
    id: 101,
    restaurantId: 1,

    name: "Classic Burger",

    image: require("../assets/banner.jpg"),

    description:
      "Premium beef, cheddar cheese, lettuce, tomato and signature sauce.",

    category: "mains",

    price: 14.5,

    rating: 4.8,

    reviewCount: 126,

    calories: 720,

    preparationTime: "15 min",

    popular: true,

    recommended: true,

    isNew: false,

    available: true,

    favorite: false,

    ingredients: [
      "Beef Patty",
      "Cheddar",
      "Lettuce",
      "Tomato",
      "Burger Bun",
      "Signature Sauce",
    ],

    options: [
      {
        name: "Size",
        required: true,
        choices: [
          { label: "Regular", price: 0 },
          { label: "Large", price: 3 },
        ],
      },
      {
        name: "Cheese",
        required: false,
        choices: [
          { label: "No Cheese", price: 0 },
          { label: "Extra Cheese", price: 2 },
        ],
      },
    ],
  },

  {
    id: 102,
    restaurantId: 1,

    name: "Double Cheese Burger",

    image: require("../assets/banner.jpg"),

    description:
      "Double beef patties with cheddar cheese and caramelized onions.",

    category: "Burger",

    price: 18,

    rating: 4.9,

    reviewCount: 88,

    calories: 910,

    preparationTime: "18 min",

    popular: true,

    recommended: false,

    isNew: false,

    available: true,

    favorite: false,

    ingredients: [
      "Double Beef",
      "Cheddar",
      "Onion",
      "Burger Bun",
    ],
  },

  {
    id: 103,
    restaurantId: 1,

    name: "Chicken Burger",

    image: require("../assets/banner.jpg"),

    description:
      "Grilled chicken breast with honey mustard sauce.",

    category: "Burger",

    price: 13,

    rating: 4.7,

    reviewCount: 74,

    calories: 630,

    preparationTime: "15 min",

    popular: false,

    recommended: true,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 104,
    restaurantId: 1,

    name: "French Fries",

    image: require("../assets/banner.jpg"),

    description:
      "Golden crispy fries served with ketchup.",

    category: "sides",

    price: 5,

    rating: 4.6,

    reviewCount: 55,

    calories: 320,

    preparationTime: "8 min",

    popular: true,

    recommended: false,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 105,
    restaurantId: 1,

    name: "Onion Rings",

    image: require("../assets/banner.jpg"),

    description:
      "Beer battered crispy onion rings.",

    category: "sides",

    price: 6,

    rating: 4.5,

    reviewCount: 41,

    calories: 350,

    preparationTime: "8 min",

    popular: false,

    recommended: false,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 106,
    restaurantId: 1,

    name: "Coca-Cola",

    image: require("../assets/banner.jpg"),

    description: "330ml",

    category: "drinks",

    price: 2.5,

    rating: 4.4,

    reviewCount: 22,

    calories: 140,

    preparationTime: "2 min",

    popular: false,

    recommended: false,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 107,
    restaurantId: 1,

    name: "Orange Juice",

    image: require("../assets/banner.jpg"),

    description: "Freshly squeezed orange juice.",

    category: "drinks",

    price: 3.5,

    rating: 4.7,

    reviewCount: 31,

    calories: 120,

    preparationTime: "3 min",

    popular: false,

    recommended: true,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 108,
    restaurantId: 1,

    name: "Chocolate Brownie",

    image: require("../assets/banner.jpg"),

    description:
      "Served warm with vanilla ice cream.",

    category: "desserts",

    price: 7,

    rating: 4.9,

    reviewCount: 49,

    calories: 430,

    preparationTime: "6 min",

    popular: true,

    recommended: true,

    isNew: false,

    available: true,

    favorite: false,
  },

  {
    id: 109,
    restaurantId: 1,

    name: "Avocado Salad",

    image: require("../assets/banner.jpg"),

    description:
      "Creamy avocado with crisp garden greens.",

    category: "appetizers",

    price: 12,

    rating: 4.7,

    reviewCount: 29,

    calories: 280,

    preparationTime: "10 min",

    popular: false,

    recommended: false,

    isNew: true,

    available: true,

    favorite: false,
  },
    {
    id: 110,
    restaurantId: 2,
    categoryId: "appetizers",

    name: "Garlic Bread",

    image: require("../assets/banner.jpg"),

    description:
      "Freshly baked garlic bread with butter and herbs.",

    price: 5.5,

    rating: 4.6,

    reviewCount: 61,

    calories: 210,

    preparationTime: "10 min",

    isPopular: true,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 111,
    restaurantId: 2,
    categoryId: "appetizers",

    name: "Chicken Wings",

    image: require("../assets/banner.jpg"),

    description:
      "Crispy chicken wings served with BBQ sauce.",

    price: 8,

    rating: 4.7,

    reviewCount: 88,

    calories: 430,

    preparationTime: "15 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    isFavorite: false,
  },

  {
    id: 112,
    restaurantId: 2,
    categoryId: "mains",

    name: "Club Sandwich",

    image: require("../assets/banner.jpg"),

    description:
      "Triple-layer sandwich with grilled chicken, bacon and cheese.",

    price: 13,

    rating: 4.8,

    reviewCount: 139,

    calories: 640,

    preparationTime: "18 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: true,
  },

  {
    id: 113,
    restaurantId: 2,
    categoryId: "mains",

    name: "Beef Burger Deluxe",

    image: require("../assets/banner.jpg"),

    description:
      "Juicy beef burger topped with cheddar and caramelized onions.",

    price: 16,

    rating: 4.8,

    reviewCount: 157,

    calories: 760,

    preparationTime: "20 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 114,
    restaurantId: 2,
    categoryId: "sides",

    name: "Curly Fries",

    image: require("../assets/banner.jpg"),

    description:
      "Seasoned crispy curly fries.",

    price: 5,

    rating: 4.5,

    reviewCount: 74,

    calories: 350,

    preparationTime: "8 min",

    isPopular: false,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 115,
    restaurantId: 2,
    categoryId: "sides",

    name: "Mozzarella Sticks",

    image: require("../assets/banner.jpg"),

    description:
      "Golden fried mozzarella cheese sticks.",

    price: 6.5,

    rating: 4.7,

    reviewCount: 81,

    calories: 390,

    preparationTime: "10 min",

    isPopular: true,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 116,
    restaurantId: 2,
    categoryId: "drinks",

    name: "Cappuccino",

    image: require("../assets/banner.jpg"),

    description:
      "Fresh espresso with steamed milk.",

    price: 4.5,

    rating: 4.8,

    reviewCount: 96,

    calories: 120,

    preparationTime: "5 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 117,
    restaurantId: 2,
    categoryId: "drinks",

    name: "Iced Latte",

    image: require("../assets/banner.jpg"),

    description:
      "Cold espresso with creamy milk.",

    price: 5,

    rating: 4.7,

    reviewCount: 77,

    calories: 150,

    preparationTime: "5 min",

    isPopular: false,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 118,
    restaurantId: 2,
    categoryId: "desserts",

    name: "Cheesecake",

    image: require("../assets/banner.jpg"),

    description:
      "Classic New York cheesecake.",

    price: 6.5,

    rating: 4.9,

    reviewCount: 112,

    calories: 420,

    preparationTime: "5 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: true,
  },
    {
    id: 119,
    restaurantId: 3,
    categoryId: "appetizers",

    name: "Tempura Shrimp",

    image: require("../assets/banner.jpg"),

    description:
      "Crispy shrimp tempura served with traditional dipping sauce.",

    price: 10.5,

    rating: 4.8,

    reviewCount: 118,

    calories: 320,

    preparationTime: "15 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 120,
    restaurantId: 3,
    categoryId: "appetizers",

    name: "Gyoza",

    image: require("../assets/banner.jpg"),

    description:
      "Pan-fried pork dumplings with soy dipping sauce.",

    price: 8,

    rating: 4.7,

    reviewCount: 91,

    calories: 280,

    preparationTime: "12 min",

    isPopular: true,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 121,
    restaurantId: 3,
    categoryId: "mains",

    name: "Salmon Sushi Set",

    image: require("../assets/banner.jpg"),

    description:
      "Fresh salmon nigiri and sushi rolls prepared by our chef.",

    price: 19.5,

    rating: 4.9,

    reviewCount: 246,

    calories: 520,

    preparationTime: "20 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: true,
  },

  {
    id: 122,
    restaurantId: 3,
    categoryId: "mains",

    name: "Tuna Sashimi",

    image: require("../assets/banner.jpg"),

    description:
      "Premium sliced bluefin tuna served with wasabi.",

    price: 22,

    rating: 4.9,

    reviewCount: 173,

    calories: 280,

    preparationTime: "15 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 123,
    restaurantId: 3,
    categoryId: "mains",

    name: "Tonkotsu Ramen",

    image: require("../assets/banner.jpg"),

    description:
      "Slow-cooked pork broth with chashu, egg and noodles.",

    price: 16,

    rating: 4.8,

    reviewCount: 201,

    calories: 690,

    preparationTime: "18 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: true,
  },

  {
    id: 124,
    restaurantId: 3,
    categoryId: "mains",

    name: "Chicken Katsu Curry",

    image: require("../assets/banner.jpg"),

    description:
      "Japanese curry served with crispy chicken cutlet and rice.",

    price: 17,

    rating: 4.8,

    reviewCount: 165,

    calories: 760,

    preparationTime: "20 min",

    isPopular: true,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 125,
    restaurantId: 3,
    categoryId: "drinks",

    name: "Matcha Latte",

    image: require("../assets/banner.jpg"),

    description:
      "Premium Japanese matcha with fresh milk.",

    price: 5,

    rating: 4.7,

    reviewCount: 82,

    calories: 160,

    preparationTime: "5 min",

    isPopular: true,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 126,
    restaurantId: 3,
    categoryId: "drinks",

    name: "Green Tea",

    image: require("../assets/banner.jpg"),

    description:
      "Traditional hot Japanese green tea.",

    price: 3,

    rating: 4.6,

    reviewCount: 67,

    calories: 5,

    preparationTime: "3 min",

    isPopular: false,
    isRecommended: false,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 127,
    restaurantId: 3,
    categoryId: "desserts",

    name: "Mochi Ice Cream",

    image: require("../assets/banner.jpg"),

    description:
      "Soft rice cake filled with creamy ice cream.",

    price: 6,

    rating: 4.8,

    reviewCount: 95,

    calories: 210,

    preparationTime: "5 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: false,
  },

  {
    id: 128,
    restaurantId: 3,
    categoryId: "desserts",

    name: "Matcha Cheesecake",

    image: require("../assets/banner.jpg"),

    description:
      "Creamy cheesecake infused with premium matcha powder.",

    price: 7.5,

    rating: 4.9,

    reviewCount: 104,

    calories: 390,

    preparationTime: "5 min",

    isPopular: true,
    isRecommended: true,
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    isFavorite: true,
  },
  
  {
    id: 401,
    restaurantId: 4,

    name: "Bruschetta",

    image: require("../assets/banner.jpg"),

    category: "appetizers",

    description:
      "Toasted artisan bread topped with tomatoes, basil and olive oil.",

    price: 8,

    rating: 4.7,

    reviewCount: 61,

    calories: 220,

    preparationTime: "10 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Italian", "Vegetarian"],
  },

  {
    id: 402,
    restaurantId: 4,

    name: "Caesar Salad",

    image: require("../assets/banner.jpg"),

    category: "appetizers",

    description:
      "Fresh romaine lettuce with parmesan cheese and Caesar dressing.",

    price: 9,

    rating: 4.6,

    reviewCount: 52,

    calories: 280,

    preparationTime: "10 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Salad"],
  },

  {
    id: 403,
    restaurantId: 4,

    name: "Margherita Pizza",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Wood-fired pizza with mozzarella, basil and tomato sauce.",

    price: 16,

    rating: 4.9,

    reviewCount: 168,

    calories: 730,

    preparationTime: "20 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Pizza", "Chef Pick"],
  },

  {
    id: 404,
    restaurantId: 4,

    name: "Pepperoni Pizza",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Classic Italian pizza loaded with spicy pepperoni.",

    price: 18,

    rating: 4.8,

    reviewCount: 143,

    calories: 810,

    preparationTime: "20 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Pizza"],
  },

  {
    id: 405,
    restaurantId: 4,

    name: "Spaghetti Carbonara",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Creamy carbonara with pancetta and parmesan cheese.",

    price: 17,

    rating: 4.9,

    reviewCount: 136,

    calories: 760,

    preparationTime: "18 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Pasta"],
  },

  {
    id: 406,
    restaurantId: 4,

    name: "Seafood Alfredo",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Fresh shrimp and squid tossed in creamy Alfredo sauce.",

    price: 21,

    rating: 4.8,

    reviewCount: 95,

    calories: 840,

    preparationTime: "22 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Seafood", "Pasta"],
  },

  {
    id: 407,
    restaurantId: 4,

    name: "Italian Soda",

    image: require("../assets/banner.jpg"),

    category: "drink",

    description:
      "Sparkling fruit-flavored Italian soda.",

    price: 4,

    rating: 4.5,

    reviewCount: 29,

    calories: 140,

    preparationTime: "2 min",

    popular: false,

    recommended: false,

    available: true,

    tags: ["Drink"],
  },

  {
    id: 408,
    restaurantId: 4,

    name: "Espresso",

    image: require("../assets/banner.jpg"),

    category: "drink",

    description:
      "Authentic Italian espresso.",

    price: 3.5,

    rating: 4.8,

    reviewCount: 55,

    calories: 8,

    preparationTime: "3 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Coffee"],
  },

  {
    id: 409,
    restaurantId: 4,

    name: "Tiramisu",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Classic Italian dessert with mascarpone and coffee.",

    price: 7,

    rating: 4.9,

    reviewCount: 111,

    calories: 450,

    preparationTime: "8 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Dessert"],
  },

  {
    id: 410,
    restaurantId: 4,

    name: "Panna Cotta",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Vanilla panna cotta served with berry sauce.",

    price: 6.5,

    rating: 4.7,

    reviewCount: 62,

    calories: 360,

    preparationTime: "8 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Dessert"],
  },

  {
    id: 501,
    restaurantId: 5,

    name: "Vegetable Samosa",

    image: require("../assets/banner.jpg"),

    category: "appetizers",

    description:
      "Crispy pastry filled with spiced potatoes and peas.",

    price: 6.5,

    rating: 4.7,

    reviewCount: 82,

    calories: 290,

    preparationTime: "10 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Indian", "Vegetarian"],
  },

  {
    id: 502,
    restaurantId: 5,

    name: "Chicken Tikka",

    image: require("../assets/banner.jpg"),

    category: "appetizers",

    description:
      "Marinated chicken grilled in a traditional tandoor oven.",

    price: 10,

    rating: 4.8,

    reviewCount: 97,

    calories: 340,

    preparationTime: "18 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Grilled"],
  },

  {
    id: 503,
    restaurantId: 5,

    name: "Butter Chicken",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Creamy tomato curry served with fragrant basmati rice.",

    price: 17.5,

    rating: 4.9,

    reviewCount: 186,

    calories: 790,

    preparationTime: "22 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Signature", "Curry"],
  },

  {
    id: 504,
    restaurantId: 5,

    name: "Lamb Rogan Josh",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Tender lamb slow-cooked with Kashmiri spices.",

    price: 19,

    rating: 4.8,

    reviewCount: 118,

    calories: 760,

    preparationTime: "24 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Lamb"],
  },

  {
    id: 505,
    restaurantId: 5,

    name: "Chicken Biryani",

    image: require("../assets/banner.jpg"),

    category: "mains",

    description:
      "Classic basmati rice cooked with aromatic spices and chicken.",

    price: 16.5,

    rating: 4.8,

    reviewCount: 149,

    calories: 820,

    preparationTime: "25 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Rice"],
  },

  {
    id: 506,
    restaurantId: 5,

    name: "Mango Lassi",

    image: require("../assets/banner.jpg"),

    category: "drink",

    description:
      "Traditional yogurt drink blended with sweet mango.",

    price: 4.5,

    rating: 4.7,

    reviewCount: 55,

    calories: 220,

    preparationTime: "5 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Drink"],
  },

  {
    id: 507,
    restaurantId: 5,

    name: "Masala Chai",

    image: require("../assets/banner.jpg"),

    category: "drink",

    description:
      "Traditional Indian spiced milk tea.",

    price: 3.5,

    rating: 4.6,

    reviewCount: 49,

    calories: 140,

    preparationTime: "5 min",

    popular: false,

    recommended: false,

    available: true,

    tags: ["Tea"],
  },

  {
    id: 508,
    restaurantId: 5,

    name: "Gulab Jamun",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Soft milk dumplings soaked in rose-flavored syrup.",

    price: 5.5,

    rating: 4.8,

    reviewCount: 84,

    calories: 350,

    preparationTime: "8 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Dessert"],
  },

  {
    id: 509,
    restaurantId: 5,

    name: "Kulfi",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Traditional Indian pistachio ice cream.",

    price: 6,

    rating: 4.7,

    reviewCount: 63,

    calories: 280,

    preparationTime: "5 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Ice Cream"],
  },

  {
    id: 601,
    restaurantId: 6,

    name: "Butter Croissant",

    image: require("../assets/banner.jpg"),

    category: "bakery",

    description:
      "Flaky French butter croissant baked fresh every morning.",

    price: 3.5,

    rating: 4.8,

    reviewCount: 118,

    calories: 280,

    preparationTime: "5 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Bakery", "Breakfast"],
  },

  {
    id: 602,
    restaurantId: 6,

    name: "Chocolate Danish",

    image: require("../assets/banner.jpg"),

    category: "bakery",

    description:
      "Soft pastry filled with rich Belgian chocolate.",

    price: 4,

    rating: 4.7,

    reviewCount: 84,

    calories: 340,

    preparationTime: "5 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Bakery", "Chocolate"],
  },

  {
    id: 603,
    restaurantId: 6,

    name: "Strawberry Shortcake",

    image: require("../assets/banner.jpg"),

    category: "cakes",

    description:
      "Fresh cream sponge cake topped with seasonal strawberries.",

    price: 18,

    rating: 4.9,

    reviewCount: 175,

    calories: 620,

    preparationTime: "15 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Cake", "Signature"],
  },

  {
    id: 604,
    restaurantId: 6,

    name: "Red Velvet Cake",

    image: require("../assets/banner.jpg"),

    category: "cakes",

    description:
      "Classic red velvet cake layered with cream cheese frosting.",

    price: 20,

    rating: 4.9,

    reviewCount: 152,

    calories: 690,

    preparationTime: "15 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Cake"],
  },

  {
    id: 605,
    restaurantId: 6,

    name: "Cheesecake Slice",

    image: require("../assets/banner.jpg"),

    category: "cakes",

    description:
      "Creamy New York cheesecake with blueberry topping.",

    price: 8,

    rating: 4.8,

    reviewCount: 98,

    calories: 510,

    preparationTime: "8 min",

    popular: false,

    recommended: true,

    available: true,

    tags: ["Cheesecake"],
  },

  {
    id: 606,
    restaurantId: 6,

    name: "Cappuccino",

    image: require("../assets/banner.jpg"),

    category: "coffee",

    description:
      "Espresso with steamed milk and silky foam.",

    price: 4.5,

    rating: 4.8,

    reviewCount: 91,

    calories: 120,

    preparationTime: "5 min",

    popular: true,

    recommended: false,

    available: true,

    tags: ["Coffee"],
  },

  {
    id: 607,
    restaurantId: 6,

    name: "Caramel Latte",

    image: require("../assets/banner.jpg"),

    category: "coffee",

    description:
      "Fresh espresso blended with caramel syrup and milk.",

    price: 5,

    rating: 4.7,

    reviewCount: 75,

    calories: 210,

    preparationTime: "5 min",

    popular: false,

    recommended: false,

    available: true,

    tags: ["Coffee", "Sweet"],
  },

  {
    id: 608,
    restaurantId: 6,

    name: "Macaron Box",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Assorted French macarons in seasonal flavors.",

    price: 9,

    rating: 4.8,

    reviewCount: 87,

    calories: 360,

    preparationTime: "5 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Dessert"],
  },

  {
    id: 609,
    restaurantId: 6,

    name: "Chocolate Lava Cake",

    image: require("../assets/banner.jpg"),

    category: "dessert",

    description:
      "Warm chocolate cake with a rich molten center.",

    price: 7,

    rating: 4.9,

    reviewCount: 139,

    calories: 470,

    preparationTime: "10 min",

    popular: true,

    recommended: true,

    available: true,

    tags: ["Chocolate", "Dessert"],
  },

  {
    id: 801,
    restaurantId: 8,

    category: "salads",

    name: "Avocado Salad",

    description:
      "Fresh avocado, cherry tomatoes, mixed greens and lemon dressing.",

    image: require("../assets/banner.jpg"),

    price: 10,

    rating: 4.7,

    reviewCount: 61,

    isPopular: true,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "10-15 min",

    calories: 320,
  },

  {
    id: 802,
    restaurantId: 8,

    category: "salads",

    name: "Quinoa Bowl",

    description:
      "Quinoa with roasted vegetables, kale and sesame dressing.",

    image: require("../assets/banner.jpg"),

    price: 11,

    rating: 4.6,

    reviewCount: 45,

    isPopular: false,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "12-18 min",

    calories: 390,
  },

  {
    id: 803,
    restaurantId: 8,

    category: "mains",

    name: "Vegan Buddha Bowl",

    description:
      "Brown rice, roasted vegetables, tofu and creamy tahini sauce.",

    image: require("../assets/banner.jpg"),

    price: 15,

    rating: 4.9,

    reviewCount: 120,

    isPopular: true,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "18-22 min",

    calories: 560,
  },

  {
    id: 804,
    restaurantId: 8,

    category: "mains",

    name: "Grilled Veggie Wrap",

    description:
      "Whole wheat wrap filled with grilled vegetables and hummus.",

    image: require("../assets/banner.jpg"),

    price: 13,

    rating: 4.7,

    reviewCount: 68,

    isPopular: true,

    isRecommended: false,

    isAvailable: true,

    preparationTime: "15-20 min",

    calories: 470,
  },

  {
    id: 805,
    restaurantId: 8,

    category: "mains",

    name: "Mushroom Pasta",

    description:
      "Whole wheat pasta tossed with mushrooms, spinach and garlic.",

    image: require("../assets/banner.jpg"),

    price: 16,

    rating: 4.8,

    reviewCount: 89,

    isPopular: true,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "20-25 min",

    calories: 610,
  },

  {
    id: 806,
    restaurantId: 8,

    category: "smoothies",

    name: "Green Detox Smoothie",

    description:
      "Spinach, kale, apple, cucumber and ginger.",

    image: require("../assets/banner.jpg"),

    price: 6,

    rating: 4.8,

    reviewCount: 72,

    isPopular: true,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "5 min",

    calories: 180,
  },

  {
    id: 807,
    restaurantId: 8,

    category: "smoothies",

    name: "Berry Protein Shake",

    description:
      "Mixed berries, banana and plant-based protein.",

    image: require("../assets/banner.jpg"),

    price: 6.5,

    rating: 4.7,

    reviewCount: 58,

    isPopular: false,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "5 min",

    calories: 260,
  },

  {
    id: 808,
    restaurantId: 8,

    category: "desserts",

    name: "Chia Pudding",

    description:
      "Chia seeds soaked in almond milk with fresh berries.",

    image: require("../assets/banner.jpg"),

    price: 6,

    rating: 4.6,

    reviewCount: 37,

    isPopular: false,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "3 min",

    calories: 210,
  },

  {
    id: 809,
    restaurantId: 8,

    category: "desserts",

    name: "Vegan Chocolate Cake",

    description:
      "Rich dairy-free chocolate cake with cocoa frosting.",

    image: require("../assets/banner.jpg"),

    price: 7,

    rating: 4.9,

    reviewCount: 81,

    isPopular: true,

    isRecommended: true,

    isAvailable: true,

    preparationTime: "3 min",

    calories: 430,
  },
];