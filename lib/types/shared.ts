export type Product = {
  id: number;
  label: string;
  price: number;
  imgSrc: string;
  category: FoodCategoryKeys;
};

export type FoodCategoryKeys =
  | "burgers"
  | "deserts"
  | "drinks"
  | "pasta"
  | "pizzas"
  | "salads"
  | "all";
