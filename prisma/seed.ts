import { PrismaClient, SizeEnum } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

async function main() {
  console.log("🗑️ Clearing existing data...");
  await prisma.size.deleteMany({});
  await prisma.extra.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.productCategory.deleteMany({});

  console.log("🌱 Seeding categories...");
  const categories = [
    { name: "Burgers" },
    { name: "Pizzas" },
    { name: "Sandwiches" },
  ];

  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const slug = slugify(category.name, { lower: true });
      return await prisma.productCategory.upsert({
        where: { slug },
        update: {},
        create: {
          name: category.name,
          slug,
          image: "/images/categories-section/burger.jpg",
        },
      });
    })
  );

  console.log("🍔 Seeding products...");
  const products = [
    {
      name: "Cheeseburger",
      description: "Delicious cheeseburger with beef patty",
    },
    { name: "Double Burger", description: "Double patty for extra hunger" },
    { name: "BBQ Burger", description: "Smoky BBQ-flavored burger" },
    {
      name: "Margherita Pizza",
      description: "Classic Margherita with fresh tomatoes",
    },
    { name: "Pepperoni Pizza", description: "Topped with spicy pepperoni" },
    { name: "Veggie Pizza", description: "Loaded with fresh veggies" },
    {
      name: "Chicken Sandwich",
      description: "Crispy chicken with fresh lettuce",
    },
    {
      name: "Club Sandwich",
      description: "Multi-layer sandwich with turkey and ham",
    },
    {
      name: "Grilled Cheese",
      description: "Perfectly grilled cheese sandwich",
    },
    {
      name: "Philly Cheesesteak",
      description: "Tender beef with melted cheese",
    },
  ];

  const productData = await Promise.all(
    products.map(async (product, index) => {
      const slug = slugify(product.name, { lower: true });
      const category = categoryData[index % categoryData.length];

      return await prisma.product.upsert({
        where: { slug },
        update: {},
        create: {
          name: product.name,
          slug,
          description: product.description,
          image: "/images/special-products/burger.png",
          price: parseFloat((Math.random() * 10 + 5).toFixed(2)), // Random price between $5 - $15
          categoryId: category.id,
        },
      });
    })
  );

  console.log("📏 Seeding sizes...");
  const sizes = ["Small", "Medium", "Large"] as SizeEnum[];

  await Promise.all(
    productData.flatMap((product) =>
      sizes.map(async (size: SizeEnum, index) => {
        return await prisma.size.upsert({
          where: { name_productId: { productId: product.id, name: size } }, // 🔥 استخدام مفتاح مركب
          update: {},
          create: {
            name: size, // ✅ بدون `as SizeEnum` إذا كان معرّفًا في Prisma
            price: +(index + 1 * 2.5).toFixed(2), // Small: 2.5, Medium: 5, Large: 7.5
            productId: product.id,
          },
        });
      })
    )
  );

  console.log("🛠️ Seeding extras...");
  const extras = ["Cheese", "Bacon", "Mushrooms", "Onions", "Jalapenos"];

  await Promise.all(
    productData.flatMap((product) =>
      extras.map(async (extra) => {
        return await prisma.extra.upsert({
          where: { name_productId: { productId: product.id, name: extra } },
          update: {},
          create: {
            name: extra,
            price: parseFloat((Math.random() * 2 + 1).toFixed(2)), // Random price between $1 - $3
            productId: product.id,
          },
        });
      })
    )
  );

  console.log("✅ Seed data inserted successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
