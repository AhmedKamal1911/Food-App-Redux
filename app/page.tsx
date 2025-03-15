import { FoodCategoryKeys, Product } from "@/lib/types/shared";
import CategoriesSection from "./_components/sections/categories-section";
import HeroSection from "./_components/sections/hero-section";
import IntroSection from "./_components/sections/intro-section";
import MenuSection from "./_components/sections/menu-section";
const FoodCategories: Record<FoodCategoryKeys, string> = {
  burgers: "burgers",
  deserts: "deserts",
  drinks: "drinks",
  pasta: "pasta",
  pizzas: "pizzas",
  salads: "salads",
  all: "all",
} as const;
const products: Product[] = [
  {
    id: 1,
    label:
      "Special Lemon Juice help me plesaehelphelphelphelphelphelphelphelphelp help help help help help",
    imgSrc: "/images/special-products/lemon.png",
    price: 10.99,
    category: "drinks",
  },
  {
    id: 2,
    label: "Special Burger",
    imgSrc: "/images/special-products/burger.png",
    price: 10.99,
    category: "burgers",
  },
  {
    id: 3,
    label: "Green Salad",
    imgSrc: "/images/special-products/green-salad.png",
    price: 10.99,
    category: "salads",
  },
  {
    id: 4,
    label: "Meat Salad",
    imgSrc: "/images/special-products/meat-salad.png",
    price: 10.99,
    category: "salads",
  },
  {
    id: 5,
    label: "Olive Salad",
    imgSrc: "/images/special-products/olive-salad.png",
    price: 10.99,
    category: "salads",
  },
  {
    id: 6,
    label: "Orange Juice",
    imgSrc: "/images/special-products/orange.png",
    price: 10.99,
    category: "drinks",
  },
];
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <CategoriesSection />
      <MenuSection products={products} categories={FoodCategories} />
    </main>
  );
}
