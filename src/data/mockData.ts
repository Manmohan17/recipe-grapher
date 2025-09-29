export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  difficulty: string;
  image?: string;
}

export interface Substitution {
  original: string;
  substitute: string;
  note?: string;
}

export const ingredients: Ingredient[] = [
  { id: '1', name: 'Chicken', category: 'Protein' },
  { id: '2', name: 'Rice', category: 'Grains' },
  { id: '3', name: 'Onion', category: 'Vegetables' },
  { id: '4', name: 'Garlic', category: 'Vegetables' },
  { id: '5', name: 'Tomato', category: 'Vegetables' },
  { id: '6', name: 'Pasta', category: 'Grains' },
  { id: '7', name: 'Olive Oil', category: 'Oils' },
  { id: '8', name: 'Salt', category: 'Seasonings' },
  { id: '9', name: 'Pepper', category: 'Seasonings' },
  { id: '10', name: 'Cheese', category: 'Dairy' },
  { id: '11', name: 'Beef', category: 'Protein' },
  { id: '12', name: 'Carrots', category: 'Vegetables' },
  { id: '13', name: 'Potatoes', category: 'Vegetables' },
  { id: '14', name: 'Eggs', category: 'Dairy' },
  { id: '15', name: 'Milk', category: 'Dairy' },
  { id: '16', name: 'Flour', category: 'Grains' },
  { id: '17', name: 'Butter', category: 'Dairy' },
  { id: '18', name: 'Basil', category: 'Herbs' },
  { id: '19', name: 'Spinach', category: 'Vegetables' },
  { id: '20', name: 'Bell Pepper', category: 'Vegetables' },
];

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Chicken Fried Rice',
    description: 'A delicious Asian-inspired dish with tender chicken and fluffy rice',
    ingredients: ['Chicken', 'Rice', 'Onion', 'Garlic', 'Eggs', 'Salt', 'Pepper', 'Olive Oil'],
    cookTime: '30 mins',
    difficulty: 'Easy',
  },
  {
    id: '2',
    name: 'Creamy Pasta Carbonara',
    description: 'Rich and creamy Italian pasta with cheese and eggs',
    ingredients: ['Pasta', 'Eggs', 'Cheese', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    cookTime: '25 mins',
    difficulty: 'Medium',
  },
  {
    id: '3',
    name: 'Beef Stew',
    description: 'Hearty and comforting beef stew with vegetables',
    ingredients: ['Beef', 'Potatoes', 'Carrots', 'Onion', 'Garlic', 'Tomato', 'Salt', 'Pepper'],
    cookTime: '90 mins',
    difficulty: 'Medium',
  },
  {
    id: '4',
    name: 'Tomato Basil Pasta',
    description: 'Simple and fresh pasta with tomatoes and basil',
    ingredients: ['Pasta', 'Tomato', 'Basil', 'Garlic', 'Olive Oil', 'Salt', 'Cheese'],
    cookTime: '20 mins',
    difficulty: 'Easy',
  },
  {
    id: '5',
    name: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable stir fry',
    ingredients: ['Bell Pepper', 'Carrots', 'Onion', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    cookTime: '15 mins',
    difficulty: 'Easy',
  },
  {
    id: '6',
    name: 'Chicken Parmesan',
    description: 'Crispy breaded chicken with melted cheese',
    ingredients: ['Chicken', 'Flour', 'Eggs', 'Cheese', 'Tomato', 'Basil', 'Olive Oil', 'Salt'],
    cookTime: '40 mins',
    difficulty: 'Medium',
  },
];

export const substitutions: Substitution[] = [
  { original: 'Chicken', substitute: 'Tofu', note: 'For vegetarian option' },
  { original: 'Chicken', substitute: 'Turkey', note: 'Leaner alternative' },
  { original: 'Beef', substitute: 'Chicken', note: 'Lighter option' },
  { original: 'Beef', substitute: 'Mushrooms', note: 'Vegetarian alternative' },
  { original: 'Butter', substitute: 'Olive Oil', note: 'Healthier fat' },
  { original: 'Milk', substitute: 'Almond Milk', note: 'Dairy-free option' },
  { original: 'Pasta', substitute: 'Rice', note: 'Different grain base' },
  { original: 'Rice', substitute: 'Quinoa', note: 'Higher protein' },
  { original: 'Cheese', substitute: 'Nutritional Yeast', note: 'Vegan option' },
];
