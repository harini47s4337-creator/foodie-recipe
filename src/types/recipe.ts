export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type CategoryType =
  | 'All'
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snacks'
  | 'Desserts'
  | 'Vegetarian'
  | 'Non-Vegetarian'
  | 'Healthy'
  | 'Italian'
  | 'Asian'
  | 'My Food';

export interface Recipe {
  id: string;
  name: string;
  category: string;
  categories: string[];
  prepTime: string;
  cookTime?: string;
  servings: number;
  calories: number;
  difficulty: DifficultyLevel;
  image: string;
  ingredients: string[];
  instructions: string[];
  isUserCreated?: boolean;
  createdAt?: number;
  description?: string;
}

export type ScreenType =
  | 'home'
  | 'details'
  | 'favorites'
  | 'my-food'
  | 'add-recipe'
  | 'edit-recipe';
