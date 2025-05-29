import "reflect-metadata";
let AppDataSource: any;
let User: any;
let Product: any;
let ProductService: any;
let CreateProductDto: any;

try {
  AppDataSource = require("./config/database").AppDataSource;
  User = require("./entities/User.entity").User;
  Product = require("./entities/Product.entity").Product;
  ProductService = require("./services/product.service").ProductService;
  CreateProductDto = require("./dto/product.dto").CreateProductDto;
} catch (e) {
  console.warn(
    "Warning: Failed to import actual modules. Mock setup will be used. Error:",
    e,
  );
}

if (typeof AppDataSource === "undefined") {
  console.warn(
    "Warning: AppDataSource is not defined. Using mock setup for demonstration.",
  );
  let _isInitialized = false;
  AppDataSource = {
    _isInitialized: false,
    initialize: async () => {
      AppDataSource._isInitialized = true;
      console.log("Mock AppDataSource initialized.");
      return Promise.resolve();
    },
    get isInitialized() {
      return AppDataSource._isInitialized;
    },
    destroy: async () => {
      AppDataSource._isInitialized = false;
      console.log("Mock AppDataSource destroyed.");
      return Promise.resolve();
    },
    getRepository: (entity: any) => {
      const mockRepo = {
        findOneBy: async (criteria: any) => {
          console.log(
            `Mock findOneBy called for ${entity?.name} with criteria:`,
            criteria,
          );

          if (
            entity?.name === "User" &&
            criteria?.email &&
            usersData.find((u) => u.email === criteria.email)
          ) {
            return Promise.resolve(
              usersData.find((u) => u.email === criteria.email),
            );
          }

          return Promise.resolve(undefined);
        },
        create: (data: any) => {
          console.log(
            `Mock create called for ${entity?.name} with data:`,
            data,
          );
          return { ...data, id: Math.random().toString(36).substring(2, 10) };
        },
        save: async (data: any) => {
          console.log(`Mock save called for ${entity?.name} with data:`, data);
          return Promise.resolve(data);
        },
      };
      return mockRepo;
    },
  };
}

if (typeof User === "undefined") {
  console.warn(
    "Warning: User entity is not defined. Using mock setup for demonstration.",
  );
  User = class MockUser {
    id!: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    isActive!: boolean;
  };
}

if (typeof Product === "undefined") {
  console.warn(
    "Warning: Product entity is not defined. Using mock setup for demonstration.",
  );
  Product = class MockProduct {
    id!: string;
    name!: string;
    description!: string;
    category!: string;
    price!: number;
    quantity!: number;
    image?: string;
    user!: InstanceType<typeof User>;
  };
}

if (typeof ProductService === "undefined") {
  console.warn(
    "Warning: ProductService is not defined. Using mock setup for demonstration.",
  );
  ProductService = class MockProductService {
    findExistingProduct = async (name: string, userId: string) => {
      console.log(
        `Mock findExistingProduct called for name: ${name}, userId: ${userId}`,
      );

      return Promise.resolve(undefined);
    };
    createProduct = async (dto: any, userId: string) => {
      console.log(
        `Mock createProduct called with DTO:`,
        dto,
        `userId: ${userId}`,
      );
      return Promise.resolve({
        ...dto,
        id: Math.random().toString(36).substring(2, 10),
        userId,
      });
    };
  };
}

if (typeof CreateProductDto === "undefined") {
  console.warn(
    "Warning: CreateProductDto is not defined. Using mock setup for demonstration.",
  );

  CreateProductDto = class MockCreateProductDto {
    name!: string;
    description!: string;
    category!: string;
    price!: number;
    quantity!: number;
    image?: string;
  };
}

const usersData = [
  {
    id: 1000,
    email: "admin@example.com",
    password: "password123",
    firstName: "Admin",
    lastName: "MainUser",
    isActive: true,
  },
  {
    id: 54555,
    email: "johndoe@example.com",
    password: "securepassword",
    firstName: "John",
    lastName: "Doe",
    isActive: true,
  },
  {
    id: 1222,
    email: "alice.wonder@example.com",
    password: "passwordAlice",
    firstName: "Alice",
    lastName: "Wonderland",
    isActive: true,
  },
];

const productsDataSeed: Array<
  Omit<InstanceType<typeof CreateProductDto>, "image"> & {
    image?: string;
    userEmail: string;
  }
> = [
  {
    name: "Smart Laptop XL",
    description:
      "A powerful and sleek laptop for all your needs. Features a 15-inch display.",
    category: "Electronics",
    price: 1299.99,
    quantity: 15,

    userEmail: "admin@example.com",
  },
  {
    name: "The Art of Coding",
    description: "An insightful book into the world of software development.",
    category: "Books",
    price: 29.5,
    quantity: 50,

    userEmail: "johndoe@example.com",
  },
  {
    name: "Comfort Cotton T-Shirt",
    description: "A soft and comfortable t-shirt, perfect for everyday wear.",
    category: "Apparel",
    price: 19.99,
    quantity: 100,

    userEmail: "admin@example.com",
  },
  {
    name: "Espresso Coffee Maker",
    description:
      "Brew your favorite espresso at home with this easy-to-use machine.",
    category: "Home & Kitchen",
    price: 89.0,
    quantity: 0,

    userEmail: "johndoe@example.com",
  },
  {
    name: "Wireless Ergonomic Mouse",
    description:
      "Comfortable and precise wireless mouse for long working hours.",
    category: "Electronics",
    price: 35.0,
    quantity: 30,

    userEmail: "admin@example.com",
  },

  {
    name: "Bluetooth Headphones Pro",
    description:
      "Noise-cancelling over-ear headphones with 20-hour battery life.",
    category: "Electronics",
    price: 199.99,
    quantity: 25,

    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Organic Green Tea",
    description: "A refreshing and healthy pack of 100 green tea bags.",
    category: "Groceries",
    price: 15.99,
    quantity: 200,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Yoga Mat Premium",
    description: "Eco-friendly and non-slip yoga mat for your daily practice.",
    category: "Sports & Outdoors",
    price: 45.0,
    quantity: 60,

    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle, keeps drinks cold for 24 hours.",
    category: "Home & Kitchen",
    price: 22.5,
    quantity: 120,
    userEmail: "admin@example.com",
  },
  {
    name: "Sci-Fi Novel: Galaxy's Edge",
    description: "A thrilling adventure in a galaxy far, far away.",
    category: "Books",
    price: 18.75,
    quantity: 75,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Men's Running Shoes",
    description: "Lightweight and breathable shoes for optimal performance.",
    category: "Apparel",
    price: 79.99,
    quantity: 40,

    userEmail: "peter.parker@example.com",
  },
  {
    name: "Smartphone Gimbal Stabilizer",
    description: "Capture smooth videos with this 3-axis gimbal.",
    category: "Electronics",
    price: 119.0,
    quantity: 18,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Herbal Shampoo",
    description: "Natural ingredients for healthy and shiny hair.",
    category: "Beauty & Personal Care",
    price: 12.99,
    quantity: 90,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Garden Tool Set",
    description: "Durable 3-piece set for all your gardening needs.",
    category: "Garden & Outdoor",
    price: 32.0,
    quantity: 33,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Office Chair Ergonomic",
    description: "Mesh back chair with lumbar support for comfort.",
    category: "Office Products",
    price: 159.5,
    quantity: 10,
    userEmail: "admin@example.com",
  },
  {
    name: "Instant Read Thermometer",
    description: "Digital thermometer for cooking and BBQ.",
    category: "Home & Kitchen",
    price: 14.95,
    quantity: 65,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Mystery Thriller Collection",
    description: "A box set of 5 gripping mystery novels.",
    category: "Books",
    price: 45.99,
    quantity: 22,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Women's Winter Jacket",
    description: "Warm and stylish jacket for cold weather.",
    category: "Apparel",
    price: 120.0,
    quantity: 28,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "4K Action Camera",
    description: "Waterproof action camera with multiple accessories.",
    category: "Electronics",
    price: 99.99,
    quantity: 35,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Pet Grooming Brush",
    description: "Deshedding tool for dogs and cats.",
    category: "Pet Supplies",
    price: 17.5,
    quantity: 70,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact and loud speaker with 10-hour playback.",
    category: "Electronics",
    price: 49.99,
    quantity: 55,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Cookbook: World Flavors",
    description: "Explore international cuisine with over 200 recipes.",
    category: "Books",
    price: 34.0,
    quantity: 40,
    userEmail: "admin@example.com",
  },
  {
    name: "Kids' Building Blocks Set",
    description: "Educational and fun building blocks for children.",
    category: "Toys & Games",
    price: 25.99,
    quantity: 80,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Smartwatch Fitness Tracker",
    description: "Tracks steps, heart rate, and sleep patterns.",
    category: "Electronics",
    price: 75.0,
    quantity: 42,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Aromatherapy Diffuser",
    description: "Ultrasonic essential oil diffuser with mood lights.",
    category: "Home & Kitchen",
    price: 28.99,
    quantity: 60,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Travel Backpack",
    description: "Durable and spacious backpack for travel and hiking.",
    category: "Sports & Outdoors",
    price: 65.0,
    quantity: 30,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Graphic Novel: The Watchers",
    description: "A stunning visual story of heroes and villains.",
    category: "Books",
    price: 22.0,
    quantity: 25,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Men's Leather Wallet",
    description: "Classic bifold wallet with RFID protection.",
    category: "Apparel",
    price: 29.95,
    quantity: 110,
    userEmail: "admin@example.com",
  },
  {
    name: "Wireless Charging Pad",
    description: "Qi-certified fast wireless charger for compatible devices.",
    category: "Electronics",
    price: 24.99,
    quantity: 70,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Organic Coffee Beans",
    description: "Whole bean dark roast coffee, 1kg bag.",
    category: "Groceries",
    price: 22.0,
    quantity: 50,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Resistance Bands Set",
    description: "Set of 5 exercise bands for home workouts.",
    category: "Sports & Outdoors",
    price: 18.99,
    quantity: 95,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Non-Stick Frying Pan",
    description: "10-inch ceramic coated frying pan, PFOA-free.",
    category: "Home & Kitchen",
    price: 33.5,
    quantity: 45,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Historical Fiction: The Last Kingdom",
    description: "A gripping tale set in Viking-age England.",
    category: "Books",
    price: 16.99,
    quantity: 60,
    userEmail: "admin@example.com",
  },
  {
    name: "Sun Hat Wide Brim",
    description: "UPF 50+ sun protection for outdoor activities.",
    category: "Apparel",
    price: 21.0,
    quantity: 70,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Gaming Mouse Pad XL",
    description: "Extended mouse pad with smooth surface for gaming.",
    category: "Electronics",
    price: 19.99,
    quantity: 80,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Face Serum Vitamin C",
    description: "Brightening and anti-aging facial serum.",
    category: "Beauty & Personal Care",
    price: 25.5,
    quantity: 50,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Car Phone Mount",
    description: "Universal air vent phone holder for cars.",
    category: "Automotive",
    price: 13.99,
    quantity: 150,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable brightness and color temperature desk lamp.",
    category: "Office Products",
    price: 30.0,
    quantity: 40,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Digital Kitchen Scale",
    description: "Precise food scale for baking and cooking, up to 5kg.",
    category: "Home & Kitchen",
    price: 16.75,
    quantity: 60,
    userEmail: "admin@example.com",
  },
  {
    name: "Poetry Anthology: Whispers of Time",
    description: "A collection of contemporary and classic poems.",
    category: "Books",
    price: 14.5,
    quantity: 30,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Silk Scarf",
    description: "Elegant pure silk scarf, various patterns.",
    category: "Apparel",
    price: 38.0,
    quantity: 20,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "USB C Hub Adapter",
    description: "Multiport adapter with HDMI, USB 3.0, and SD card reader.",
    category: "Electronics",
    price: 27.99,
    quantity: 55,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Dog Chew Toys Set",
    description: "Durable chew toys for aggressive chewers, 3-pack.",
    category: "Pet Supplies",
    price: 20.0,
    quantity: 65,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Board Game: Settlers of Iron",
    description: "A strategy board game of resource management and expansion.",
    category: "Toys & Games",
    price: 49.5,
    quantity: 15,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Electric Toothbrush",
    description: "Rechargeable toothbrush with multiple brushing modes.",
    category: "Beauty & Personal Care",
    price: 40.0,
    quantity: 0,
    userEmail: "admin@example.com",
  },
  {
    name: "Camping Tent for 2",
    description: "Lightweight and waterproof tent for backpacking.",
    category: "Sports & Outdoors",
    price: 85.99,
    quantity: 22,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Self-Help: The Power of Now",
    description: "A guide to spiritual enlightenment.",
    category: "Books",
    price: 12.99,
    quantity: 100,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Baby Onesies (5-Pack)",
    description: "Soft organic cotton onesies for infants.",
    category: "Baby Products",
    price: 28.0,
    quantity: 40,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Security Camera Outdoor",
    description: "Wireless weatherproof security camera with night vision.",
    category: "Electronics",
    price: 69.0,
    quantity: 33,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Baking Mat Set",
    description: "Silicone non-stick baking mats, set of 2.",
    category: "Home & Kitchen",
    price: 15.99,
    quantity: 70,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Language Learning Software",
    description: "Learn Spanish with interactive lessons and AI tutor.",
    category: "Software",
    price: 99.0,
    quantity: 100,
    userEmail: "admin@example.com",
  },
  {
    name: "Sketchbook Pro",
    description: "A4 size sketchbook with 100 sheets of thick paper.",
    category: "Office Products",
    price: 10.5,
    quantity: 85,
    userEmail: "peter.parker@example.com",
  },
  {
    name: "Fitness Dumbbell Set",
    description: "Adjustable dumbbell set, 5-25 lbs.",
    category: "Sports & Outdoors",
    price: 129.99,
    quantity: 12,
    userEmail: "alice.wonder@example.com",
  },
  {
    name: "Wall Art Canvas Print",
    description: "Abstract modern art for home decor, 24x36 inch.",
    category: "Home Decor",
    price: 55.0,
    quantity: 18,
    userEmail: "johndoe@example.com",
  },
  {
    name: "Professional Hair Dryer",
    description: "Ionic technology for fast drying and less frizz.",
    category: "Beauty & Personal Care",
    price: 65.0,
    quantity: 25,
    userEmail: "carol.danvers@example.com",
  },
  {
    name: "Puzzle 1000 Pieces: Mountain View",
    description: "Challenging and beautiful jigsaw puzzle.",
    category: "Toys & Games",
    price: 18.0,
    quantity: 40,
    userEmail: "bob.builder@example.com",
  },
  {
    name: "Classic Novel: Pride and Prejudice",
    description: "Jane Austen's beloved masterpiece.",
    category: "Books",
    price: 9.99,
    quantity: 150,
    userEmail: "admin@example.com",
  },
  {
    name: "Smart Plug (2-Pack)",
    description: "Control your home appliances remotely via app.",
    category: "Smart Home",
    price: 25.99,
    quantity: 60,
    userEmail: "peter.parker@example.com",
  },
];

async function seedDatabase() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log("Database connection initialized for seeding. 🚀");

    const userRepository = AppDataSource.getRepository(User);

    const productService =
      new ProductService(/* pass dependencies if needed, e.g., AppDataSource or repository */);

    const createdUsersMap = new Map<string, InstanceType<typeof User>>();
    console.log("\n--- Seeding Users ---");
    for (const userData of usersData) {
      let user = await userRepository.findOneBy({ email: userData.email });
      if (!user) {
        user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`👤 Created user: ${user.email} (ID: ${user.id})`);
      } else {
        console.log(`👤 User already exists: ${user.email} (ID: ${user.id})`);
      }
      createdUsersMap.set(user.email, user);
    }

    console.log("\n--- Seeding Products ---");
    if (createdUsersMap.size === 0 && usersData.length > 0) {
      console.warn(
        "⚠️ No users were added to createdUsersMap. Product seeding might fail if users are not 'found' by the mock.",
      );

      usersData.forEach((u) =>
        createdUsersMap.set(u.email, u as InstanceType<typeof User>),
      );
      if (createdUsersMap.size === 0) {
        console.error(
          "❌ No users available (even from mock data) to associate products with. Skipping product seeding.",
        );
      } else {
        console.log(
          "ℹ️ Populated createdUsersMap with mock usersData for product seeding.",
        );
      }
    } else if (createdUsersMap.size === 0 && usersData.length === 0) {
      console.error(
        "❌ No users defined in usersData. Skipping product seeding.",
      );
    }

    for (const productSeedDto of productsDataSeed) {
      const user = createdUsersMap.get(productSeedDto.userEmail);
      if (!user) {
        console.warn(
          `⚠️ User with email ${productSeedDto.userEmail} not found in createdUsersMap for product "${productSeedDto.name}". Skipping.`,
        );
        continue;
      }

      const existingProduct = await productService.findExistingProduct(
        productSeedDto.name,
        user.id,
      );

      if (!existingProduct) {
        const productDto = {
          name: productSeedDto.name,
          description: productSeedDto.description,
          category: productSeedDto.category,
          price: productSeedDto.price,
          quantity: productSeedDto.quantity,
        } as InstanceType<typeof CreateProductDto>;

        await productService.createProduct(productDto, user.id);
        console.log(
          `🛍️ Created product: "${productDto.name}" (Category: ${productDto.category}) for user ${user.email}`,
        );
      } else {
        console.log(
          `🛍️ Product "${existingProduct.name}" (Category: ${existingProduct.category}) already exists for user ${user.email}.`,
        );
      }
    }

    console.log("\n✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed.");
    }
  }
}

if (require.main === module) {
  console.log("Running seedDatabase directly...");
  seedDatabase()
    .then(() => {
      console.log("seedDatabase function finished.");
    })
    .catch((err) => {
      console.error("Error running seedDatabase directly:", err);
    });
}

export { usersData, productsDataSeed, seedDatabase };
