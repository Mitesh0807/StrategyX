import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { User } from "./entities/User.entity";

import { ProductService } from "./services/product.service";
import { CreateProductDto } from "./dto/product.dto";

const usersData = [
  {
    email: "admin@example.com",
    password: "password123",
    firstName: "Admin",
    lastName: "User",
    isActive: true,
  },
  {
    email: "johndoe@example.com",
    password: "securepassword",
    firstName: "John",
    lastName: "Doe",
    isActive: true,
  },
];

const productsDataSeed: Array<
  Omit<CreateProductDto, "image"> & { image?: string; userEmail: string }
> = [
  {
    name: "Smart Laptop XL",
    description:
      "A powerful and sleek laptop for all your needs. Features a 15-inch display.",
    category: "Electronics",
    price: 1299.99,
    quantity: 15,
    image: "https://via.placeholder.com/300/09f/fff.png?text=Laptop+XL",
    userEmail: "admin@example.com",
  },
  {
    name: "The Art of Coding",
    description: "An insightful book into the world of software development.",
    category: "Books",
    price: 29.5,
    quantity: 50,
    image: "https://via.placeholder.com/300/f90/fff.png?text=Coding+Book",
    userEmail: "johndoe@example.com",
  },
  {
    name: "Comfort Cotton T-Shirt",
    description: "A soft and comfortable t-shirt, perfect for everyday wear.",
    category: "Apparel",
    price: 19.99,
    quantity: 100,
    image: "https://via.placeholder.com/300/0f9/fff.png?text=T-Shirt",
    userEmail: "admin@example.com",
  },
  {
    name: "Espresso Coffee Maker",
    description:
      "Brew your favorite espresso at home with this easy-to-use machine.",
    category: "Home & Kitchen", // Category name as a string
    price: 89.0,
    quantity: 0,
    image: "https://via.placeholder.com/300/90f/fff.png?text=Coffee+Maker",
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
];

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection initialized for seeding. 🚀");

    const userRepository = AppDataSource.getRepository(User);

    const productService = new ProductService();

    const createdUsersMap = new Map<string, User>();
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
    if (createdUsersMap.size === 0) {
      console.error(
        "❌ No users available to associate products with. Skipping product seeding.",
      );
    } else {
      for (const productSeedDto of productsDataSeed) {
        const user = createdUsersMap.get(productSeedDto.userEmail);
        if (!user) {
          console.warn(
            `⚠️ User with email ${productSeedDto.userEmail} not found for product "${productSeedDto.name}". Skipping.`,
          );
          continue;
        }

        const existingProduct = await productService.findExistingProduct(
          productSeedDto.name,
          user.id,
        );

        if (!existingProduct) {
          const productDto: CreateProductDto = {
            name: productSeedDto.name,
            description: productSeedDto.description,
            category: productSeedDto.category,
            price: productSeedDto.price,
            quantity: productSeedDto.quantity,
            image: productSeedDto.image,
          };

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
    }

    console.log("\n✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed.");
    }
  }
}

seedDatabase();
