export type MockProductCategory = "Food" | "Pharmacy" | "Toys";

export type MockProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MockProductCategory;
  tags: string;
};

export const MOCK_TRENDING_PRODUCTS: MockProduct[] = [
  {
    id: "1",
    name: "Salmon & Sweet Potato Adult",
    price: 54.99,
    description: "Grain-free dry food for sensitive stomachs.",
    category: "Food",
    tags: "dog, adult, digestion, salmon",
  },
  {
    id: "2",
    name: "Hip & Joint Soft Chews",
    price: 32.5,
    description: "Glucosamine daily support for active dogs.",
    category: "Pharmacy",
    tags: "dog, adult, joint care",
  },
  {
    id: "3",
    name: "Dental Rope Tug Set",
    price: 18.0,
    description: "Textured fibers to help reduce tartar.",
    category: "Toys",
    tags: "dog, puppy, dental",
  },
  {
    id: "4",
    name: "Chicken Pâté Kitten",
    price: 28.99,
    description: "High-protein wet food for growing kittens.",
    category: "Food",
    tags: "cat, kitten, digestion",
  },
  {
    id: "5",
    name: "Calming Diffuser Refill",
    price: 24.0,
    description: "Feline pheromone comfort for multi-cat homes.",
    category: "Pharmacy",
    tags: "cat, adult, digestion",
  },
  {
    id: "6",
    name: "Feather Wand Chase Pack",
    price: 14.5,
    description: "Interactive play to burn energy indoors.",
    category: "Toys",
    tags: "cat, adult, toys",
  },
];
