import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Screen Dimensions
const { width } = Dimensions.get('window');

// Persistent Storage Keys
const STORAGE_FAVORITES_KEY = '@foodie_favorites_v1';
const STORAGE_USER_RECIPES_KEY = '@foodie_user_recipes_v1';

// Theme Colors
const COLORS = {
  background: '#FAF7F2',
  cardBg: '#FFFFFF',
  accent: '#FF6433', // Coral / Orange primary
  accentLight: '#FFEFEB',
  accentDark: '#E04818',
  secondary: '#2E7D32',
  textDark: '#1E1B18',
  textMuted: '#7A726A',
  border: '#E8E2D9',
  cardShadow: '#1A0E05',
  star: '#FFA726',
  error: '#D32F2F',
  success: '#388E3C',
};

// Available Categories
const CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Vegetarian',
  'Non-Vegetarian',
  'Healthy',
  'Italian',
  'Asian',
  'My Food',
];

// Difficulty Options
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

// Initial 16 Sample Recipes
const SAMPLE_RECIPES = [
  {
    id: 'sample-1',
    name: 'Classic Creamy Avocado Toast',
    category: 'Breakfast',
    categories: ['Breakfast', 'Vegetarian', 'Healthy'],
    prepTime: '10 mins',
    cookTime: '5 mins',
    servings: 2,
    calories: 280,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp artisan sourdough bread topped with coarsely mashed Hass avocado, juicy cherry tomatoes, and chili flakes.',
    ingredients: [
      '2 thick slices artisan sourdough bread',
      '1 large ripe Hass avocado',
      '1 tablespoon extra virgin olive oil',
      '1/2 lemon, freshly juiced',
      '1/2 cup cherry tomatoes, halved',
      'Pinch of red pepper flakes & sea salt',
      'Microgreens or fresh cilantro for garnish',
    ],
    instructions: [
      'Toast sourdough slices until deep golden and crisp.',
      'Cut avocado, remove pit, and scoop into a small bowl.',
      'Mash with lemon juice, olive oil, sea salt, and black pepper.',
      'Spread mashed avocado generously over warm toast.',
      'Top with cherry tomatoes, microgreens, and red pepper flakes.',
    ],
  },
  {
    id: 'sample-2',
    name: 'Authentic Roman Spaghetti Carbonara',
    category: 'Italian',
    categories: ['Italian', 'Dinner', 'Non-Vegetarian'],
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 4,
    calories: 620,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80',
    description: 'Silky Roman pasta tossed with crispy cured guanciale, rich egg yolks, aged Pecorino Romano, and cracked black pepper.',
    ingredients: [
      '400g spaghetti or rigatoni',
      '150g cured guanciale or pancetta, cubed',
      '4 large farm fresh egg yolks + 1 whole egg',
      '1 cup Pecorino Romano cheese, freshly grated',
      '1 tablespoon freshly ground black pepper',
      '1/2 cup reserved starchy pasta cooking water',
    ],
    instructions: [
      'Cook spaghetti in a large pot of boiling salted water until al dente.',
      'Fry guanciale in a wide skillet over medium heat until golden and crispy; remove pan from heat.',
      'Whisk egg yolks, whole egg, grated Pecorino, and pepper in a bowl to form a thick paste.',
      'Transfer hot pasta straight into skillet with guanciale and toss to coat with flavorful rendered fat.',
      'Pour egg mixture into pasta off heat, vigorously tossing and splashing hot pasta water until a glossy sauce forms.',
      'Garnish with extra Pecorino and cracked black pepper before serving.',
    ],
  },
  {
    id: 'sample-3',
    name: 'Spicy Thai Basil Chicken (Pad Krapow)',
    category: 'Asian',
    categories: ['Asian', 'Dinner', 'Non-Vegetarian'],
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: 2,
    calories: 450,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80',
    description: 'Aromatic minced chicken stir-fried with fragrant holy basil, garlic, and fiery bird eye chilies served with a crispy fried egg.',
    ingredients: [
      '350g minced chicken thigh or breast',
      '1.5 cups fresh holy basil or Thai sweet basil leaves',
      '5 bird eye chilies, thinly sliced',
      '4 cloves garlic, crushed',
      '1 tablespoon oyster sauce',
      '1 tablespoon light soy sauce',
      '1 teaspoon dark sweet soy sauce',
      '1 teaspoon fish sauce',
      '1 teaspoon brown sugar',
      '2 crispy fried eggs and warm jasmine rice',
    ],
    instructions: [
      'Pound garlic and bird eye chilies roughly in a mortar to release fragrance.',
      'Heat 2 tbsp oil in a hot wok over high heat. Add garlic chili paste; stir-fry for 30 seconds.',
      'Add minced chicken, breaking up chunks with a spatula until cooked through (3-4 mins).',
      'Stir in oyster sauce, soy sauces, fish sauce, and sugar; toss vigorously to coat.',
      'Turn off heat, stir in basil leaves until wilted, and spoon over jasmine rice with fried eggs.',
    ],
  },
  {
    id: 'sample-4',
    name: 'Mediterranean Quinoa Glow Bowl',
    category: 'Healthy',
    categories: ['Healthy', 'Lunch', 'Vegetarian'],
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 2,
    calories: 390,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    description: 'Vibrant bowl with fluffy tricolor quinoa, crisp cucumber, sweet cherry tomatoes, Kalamata olives, and Greek feta cheese.',
    ingredients: [
      '1 cup cooked tricolor quinoa, cooled',
      '1 English cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/3 cup Kalamata olives, pitted and sliced',
      '1/2 cup Greek feta cheese, crumbled',
      '1/4 cup red onion, thinly sliced',
      '2 tablespoons extra virgin olive oil',
      '1 tablespoon fresh lemon juice',
      '1 teaspoon dried oregano, sea salt, and black pepper',
    ],
    instructions: [
      'Rinse and cook quinoa according to package directions, then allow to cool completely.',
      'Whisk olive oil, lemon juice, dried oregano, salt, and pepper in a small bowl for the dressing.',
      'Divide quinoa between two shallow serving bowls.',
      'Arrange cucumber, cherry tomatoes, olives, feta, and red onion in neat colorful sections on top.',
      'Drizzle vinaigrette evenly over the bowl and toss before enjoying.',
    ],
  },
  {
    id: 'sample-5',
    name: 'Fluffy Japanese Soufflé Pancakes',
    category: 'Breakfast',
    categories: ['Breakfast', 'Desserts', 'Vegetarian'],
    prepTime: '20 mins',
    cookTime: '15 mins',
    servings: 2,
    calories: 340,
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-light, melt-in-your-mouth cloud pancakes topped with whipped honey butter, powdered sugar, and fresh raspberries.',
    ingredients: [
      '2 large eggs (whites and yolks separated)',
      '2 tablespoons whole milk',
      '1/2 teaspoon pure vanilla extract',
      '4 tablespoons cake flour',
      '1/2 teaspoon baking powder',
      '2.5 tablespoons granulated sugar',
      '1/2 teaspoon lemon juice',
      'Butter, maple syrup, and fresh berries for serving',
    ],
    instructions: [
      'Whisk egg yolks, milk, and vanilla in a bowl until pale. Sift in flour and baking powder; mix into a smooth batter.',
      'In a separate clean bowl, whip egg whites with lemon juice, gradually adding sugar until stiff glossy peaks form.',
      'Carefully fold 1/3 of meringue into yolk batter, then gently fold remaining meringue without deflating.',
      'Heat a nonstick lidded pan over low heat with a touch of butter. Spoon tall dollops of batter onto the pan.',
      'Add 1 tsp water to the pan edge, cover with lid, and steam for 5 minutes.',
      'Flip gently, add another splash of water, cover, and steam for 4-5 minutes until cooked through. Serve immediately.',
    ],
  },
  {
    id: 'sample-6',
    name: 'Velvety Homemade Tiramisu',
    category: 'Desserts',
    categories: ['Desserts', 'Italian', 'Vegetarian'],
    prepTime: '25 mins',
    cookTime: '0 mins',
    servings: 6,
    calories: 420,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80',
    description: 'A timeless Italian confection of delicate espresso-soaked ladyfingers layered with rich mascarpone zabaglione and dark cocoa.',
    ingredients: [
      '200g Savoiardi ladyfinger biscuits',
      '250g Italian mascarpone cheese',
      '3 large egg yolks',
      '1/2 cup granulated sugar',
      '1 cup heavy whipping cream',
      '1.5 cups strong cooled espresso',
      '2 tablespoons dark rum (optional)',
      '3 tablespoons unsweetened Dutch cocoa powder',
    ],
    instructions: [
      'Whisk egg yolks and sugar over a double boiler for 5 mins until thick and ribbon-like; cool slightly.',
      'Gently fold softened mascarpone into the yolk mixture until silky.',
      'Whip heavy cream to soft peaks in another bowl; gently fold into the mascarpone cream.',
      'Dip ladyfingers into cooled espresso for 1-2 seconds per side (do not oversaturate).',
      'Layer half the soaked biscuits in a serving dish, spread half the mascarpone cream, and repeat.',
      'Refrigerate for at least 4 hours. Dust generously with cocoa powder right before serving.',
    ],
  },
  {
    id: 'sample-7',
    name: 'Crispy Garlic Butter Salmon Bites',
    category: 'Dinner',
    categories: ['Dinner', 'Non-Vegetarian', 'Healthy'],
    prepTime: '10 mins',
    cookTime: '10 mins',
    servings: 3,
    calories: 460,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    description: 'Succulent bite-sized fresh salmon cubes seared golden brown and tossed in foaming garlic butter, lemon, and fresh parsley.',
    ingredients: [
      '500g fresh salmon fillet, skinless and cut into 1-inch cubes',
      '2 tablespoons unsalted butter',
      '1 tablespoon extra virgin olive oil',
      '4 cloves garlic, finely minced',
      '1 teaspoon smoked paprika',
      'Juice of 1/2 lemon + lemon wedges',
      '2 tablespoons chopped fresh Italian parsley',
      'Salt and freshly cracked black pepper',
    ],
    instructions: [
      'Pat salmon cubes dry with paper towels; season generously with salt, pepper, and paprika.',
      'Heat olive oil and 1 tbsp butter in a large skillet over high heat.',
      'Sear salmon cubes in a single layer for 2-3 minutes undisturbed until a crispy golden crust forms.',
      'Flip gently and cook for 2 more minutes. Lower heat to medium-low.',
      'Add remaining butter and minced garlic, basting sizzling butter over salmon for 1 minute.',
      'Finish with lemon juice and fresh parsley; serve hot with rice or greens.',
    ],
  },
  {
    id: 'sample-8',
    name: 'Vietnamese Fresh Spring Rolls (Gỏi Cuốn)',
    category: 'Snacks',
    categories: ['Snacks', 'Asian', 'Healthy'],
    prepTime: '25 mins',
    cookTime: '5 mins',
    servings: 4,
    calories: 220,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp, translucent rice paper rolls packed with juicy prawns, soft rice noodles, mint, cucumber, and creamy hoisin peanut dip.',
    ingredients: [
      '8 circular rice paper wrappers',
      '16 cooked tiger prawns, peeled and halved',
      '100g thin rice vermicelli noodles, cooked and cooled',
      '1 cup fresh butterhead lettuce, shredded',
      '1/2 cup fresh mint and Thai basil leaves',
      '1 cucumber, cut into matchsticks',
      '1/3 cup peanut butter + 2 tbsp hoisin sauce + warm water for dip',
    ],
    instructions: [
      'Dip a rice paper wrapper in warm water for 5 seconds; lay flat on a damp board.',
      'Layer lettuce, vermicelli noodles, cucumber, mint, and basil on the bottom third.',
      'Place 3-4 prawn halves cut-side up across the middle.',
      'Fold the bottom edge over fillings, fold in both sides tightly, and roll upward snugly.',
      'Whisk peanut butter, hoisin sauce, and warm water into a glossy dipping sauce.',
      'Cut rolls in half and serve fresh with the peanut dipping sauce.',
    ],
  },
  {
    id: 'sample-9',
    name: 'Classic Margherita Stone Pizza',
    category: 'Italian',
    categories: ['Italian', 'Dinner', 'Vegetarian'],
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 3,
    calories: 510,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80',
    description: 'Artisanal Neapolitan crust blistered in high heat with San Marzano tomato puree, melted fior di latte, and aromatic basil leaves.',
    ingredients: [
      '1 ball artisan pizza dough (at room temperature)',
      '1/2 cup San Marzano crushed tomatoes',
      '150g fresh mozzarella cheese, torn into pieces',
      'Fresh basil leaves',
      '1 tablespoon extra virgin olive oil',
      'Sea salt and dried oregano to taste',
    ],
    instructions: [
      'Preheat oven to maximum heat (500°F / 260°C) with a pizza stone inside.',
      'Stretch pizza dough on parchment paper into a 12-inch disc, preserving an airy outer crust.',
      'Spread crushed tomatoes evenly, seasoning with a pinch of sea salt.',
      'Distribute torn mozzarella chunks over the tomato sauce.',
      'Bake for 9-12 minutes until crust is beautifully blistered and cheese is melted.',
      'Remove from oven, top with fresh basil, and finish with a swirl of olive oil.',
    ],
  },
  {
    id: 'sample-10',
    name: 'Cheesy Vegetable & Black Bean Quesadillas',
    category: 'Lunch',
    categories: ['Lunch', 'Vegetarian', 'Snacks'],
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    calories: 430,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    description: 'Toasted buttery flour tortillas packed with seasoned black beans, sweet corn, diced peppers, and melted Monterey Jack cheese.',
    ingredients: [
      '2 large flour tortillas',
      '1 cup shredded Monterey Jack or cheddar cheese',
      '1/2 cup cooked black beans, rinsed',
      '1/2 cup sweet corn kernels',
      '1/2 red bell pepper, diced',
      '1/2 teaspoon ground cumin & garlic powder',
      '1 tablespoon butter',
      'Salsa, guacamole, and sour cream for serving',
    ],
    instructions: [
      'In a bowl, mix black beans, corn, diced bell pepper, cumin, garlic powder, and salt.',
      'Melt a knob of butter in a skillet over medium heat and place one tortilla flat.',
      'Cover half the tortilla with cheese, add vegetable filling, and top with more cheese before folding over.',
      'Cook 3-4 minutes per side until golden and crispy with melted cheese inside.',
      'Slice into warm wedges and serve with chilled guacamole and salsa.',
    ],
  },
  {
    id: 'sample-11',
    name: 'Rich Savory Tonkotsu Pork Ramen',
    category: 'Asian',
    categories: ['Asian', 'Dinner', 'Non-Vegetarian'],
    prepTime: '20 mins',
    cookTime: '25 mins',
    servings: 2,
    calories: 680,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&auto=format&fit=crop&q=80',
    description: 'Hearty bowl of chewy ramen noodles in a velvety garlic pork broth with tender chashu pork belly, marinated egg, and scallions.',
    ingredients: [
      '2 portions fresh or dried ramen noodles',
      '4 slices braised chashu pork belly',
      '2 soft-boiled marinated ramen eggs, halved',
      '4 cups rich pork or chicken bone broth',
      '2 tablespoons white miso paste',
      '1 tablespoon toasted sesame paste or tahini',
      '1 tablespoon soy sauce',
      '1 teaspoon grated garlic & ginger',
      'Toppings: scallions, nori seaweed, bamboo shoots',
    ],
    instructions: [
      'Simmer broth with garlic, ginger, miso, sesame paste, and soy sauce until piping hot and fragrant.',
      'Cook ramen noodles in boiling water for 2-3 minutes until firm to bite; drain well.',
      'Divide hot noodles between two deep bowls.',
      'Ladle hot savory broth generously over noodles.',
      'Arrange chashu slices, halved eggs, bamboo shoots, and nori sheets on top. Garnish with chopped scallions.',
    ],
  },
  {
    id: 'sample-12',
    name: 'Creamy Tuscan Garlic Herb Chicken',
    category: 'Dinner',
    categories: ['Dinner', 'Non-Vegetarian', 'Italian'],
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 4,
    calories: 550,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    description: 'Golden pan-seared chicken cutlets bathed in a velvety garlic parmesan cream sauce packed with sun-dried tomatoes and baby spinach.',
    ingredients: [
      '2 large chicken breasts, sliced horizontally into cutlets',
      '1 tablespoon olive oil + 1 tablespoon butter',
      '4 cloves garlic, minced',
      '1/2 cup sun-dried tomatoes in oil, sliced',
      '1 cup heavy whipping cream',
      '1/2 cup chicken broth',
      '1/2 cup freshly grated Parmesan cheese',
      '2 cups fresh baby spinach',
      'Italian seasoning, salt, and black pepper',
    ],
    instructions: [
      'Season chicken with salt, pepper, and Italian seasoning.',
      'Sear chicken in hot olive oil and butter for 4-5 mins per side until golden; transfer to a plate.',
      'In the same skillet, sauté garlic and sun-dried tomatoes for 1 minute.',
      'Add broth and cream, bringing to a gentle simmer for 3 minutes.',
      'Stir in Parmesan cheese until melted, then fold in baby spinach until wilted.',
      'Return chicken to skillet, baste with sauce for 2 minutes, and serve warm.',
    ],
  },
  {
    id: 'sample-13',
    name: 'Matcha Green Tea Chia Seed Pudding',
    category: 'Healthy',
    categories: ['Healthy', 'Breakfast', 'Vegetarian', 'Desserts'],
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 2,
    calories: 210,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    description: 'Wholesome creamy chia pudding infused with ceremonial Japanese matcha, creamy almond milk, raw honey, and fresh kiwi.',
    ingredients: [
      '1/3 cup whole chia seeds',
      '1.25 cups unsweetened almond or oat milk',
      '1.5 teaspoons Japanese matcha powder',
      '1.5 tablespoons pure maple syrup or honey',
      '1/2 teaspoon vanilla extract',
      'Fresh kiwi slices and raspberries for topping',
    ],
    instructions: [
      'Whisk matcha powder with 2 tbsp warm milk until smooth and lump-free.',
      'Combine remaining milk, dissolved matcha, chia seeds, maple syrup, and vanilla in a glass jar.',
      'Whisk thoroughly for 2 minutes, wait 10 minutes, and whisk again.',
      'Refrigerate for at least 3 hours or overnight until set.',
      'Top with fresh kiwi slices and raspberries before serving.',
    ],
  },
  {
    id: 'sample-14',
    name: 'Spicy Crispy Korean Cauliflower Bites',
    category: 'Snacks',
    categories: ['Snacks', 'Asian', 'Vegetarian'],
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    calories: 270,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    description: 'Crispy oven-baked cauliflower florets glazed in a fiery-sweet sticky Korean gochujang chili sauce with toasted sesame seeds.',
    ingredients: [
      '1 medium head cauliflower, broken into florets',
      '3/4 cup flour or cornstarch',
      '1 cup cold water or club soda',
      '3 tablespoons Korean gochujang paste',
      '2 tablespoons honey or agave',
      '1 tablespoon soy sauce & 1 tsp sesame oil',
      'Sesame seeds and sliced green onions for garnish',
    ],
    instructions: [
      'Preheat oven to 450°F (230°C) and line baking sheet with parchment.',
      'Whisk flour, garlic powder, and cold water into a smooth batter.',
      'Dip cauliflower florets into batter and spread onto baking sheet.',
      'Bake for 20 minutes until crisp and lightly golden.',
      'Warm gochujang, honey, soy sauce, and sesame oil in a small pan.',
      'Toss hot cauliflower in glaze, bake 5 more minutes, and sprinkle with sesame seeds.',
    ],
  },
  {
    id: 'sample-15',
    name: 'Warm Bittersweet Chocolate Lava Cake',
    category: 'Desserts',
    categories: ['Desserts', 'Vegetarian'],
    prepTime: '15 mins',
    cookTime: '12 mins',
    servings: 2,
    calories: 490,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    description: 'Decadent individual molten cakes with a rich, oozing Belgian chocolate center served with vanilla bean ice cream.',
    ingredients: [
      '100g 70% dark bittersweet chocolate',
      '1/2 cup unsalted butter',
      '2 large eggs + 2 egg yolks',
      '1/3 cup powdered sugar',
      '2 tablespoons flour',
      'Pinch of sea salt',
      'Vanilla ice cream for serving',
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter two 6-oz ramekins and dust with cocoa powder.',
      'Melt dark chocolate and butter together until silky and smooth.',
      'Whisk eggs, egg yolks, powdered sugar, and salt until pale.',
      'Fold melted chocolate into eggs, then gently fold in flour.',
      'Divide into ramekins and bake for exactly 12 minutes until edges are set but center remains soft.',
      'Invert onto plates and serve immediately with vanilla ice cream.',
    ],
  },
  {
    id: 'sample-16',
    name: 'Zesty Citrus Grilled Shrimp Salad',
    category: 'Lunch',
    categories: ['Lunch', 'Healthy', 'Non-Vegetarian'],
    prepTime: '15 mins',
    cookTime: '6 mins',
    servings: 2,
    calories: 320,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&auto=format&fit=crop&q=80',
    description: 'Juicy seared tiger shrimp tossed with wild arugula, sweet orange segments, creamy avocado, and honey lime vinaigrette.',
    ingredients: [
      '300g raw tiger shrimp, peeled and deveined',
      '4 cups fresh baby arugula',
      '1 navel orange, segmented',
      '1 ripe avocado, sliced',
      '2 tablespoons extra virgin olive oil',
      'Juice of 1 fresh lime',
      '1 teaspoon honey & 1 clove minced garlic',
      'Salt and freshly cracked black pepper',
    ],
    instructions: [
      'Toss shrimp with 1 tbsp olive oil, minced garlic, salt, and pepper.',
      'Sear shrimp in a smoking hot skillet for 2-3 mins per side until pink and curled.',
      'Shake lime juice, remaining olive oil, honey, salt, and pepper in a small jar.',
      'Toss arugula with half the vinaigrette in a salad bowl.',
      'Top with seared shrimp, citrus segments, and avocado slices; drizzle with remaining dressing.',
    ],
  },
];

// Fallback Default Image
const DEFAULT_RECIPE_IMAGE =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop&q=80';

export default function App() {
  // Navigation State: 'home' | 'details' | 'favorites' | 'my-food' | 'add-recipe' | 'edit-recipe'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState(['home']);

  // Selected Recipe for Details / Editing
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // App Data State
  const [favorites, setFavorites] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Delete Confirmation Modal State
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Recipe Form State (used for both Add and Edit)
  const [formRecipeId, setFormRecipeId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Dinner');
  const [formPrepTime, setFormPrepTime] = useState('20 mins');
  const [formServings, setFormServings] = useState('4');
  const [formCalories, setFormCalories] = useState('400');
  const [formDifficulty, setFormDifficulty] = useState('Easy');
  const [formImage, setFormImage] = useState('');
  const [formIngredients, setFormIngredients] = useState(['']);
  const [formInstructions, setFormInstructions] = useState(['']);
  const [formErrors, setFormErrors] = useState({});

  // Load Saved Data on Mount
  useEffect(() => {
    loadPersistedData();
  }, []);

  const loadPersistedData = async () => {
    try {
      setIsLoading(true);
      const [storedFavs, storedUserRecipes] = await Promise.all([
        AsyncStorage.getItem(STORAGE_FAVORITES_KEY),
        AsyncStorage.getItem(STORAGE_USER_RECIPES_KEY),
      ]);

      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      if (storedUserRecipes) {
        setUserRecipes(JSON.parse(storedUserRecipes));
      }
    } catch (e) {
      console.warn('Storage read failed, falling back to memory state', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Persist Favorites Helper
  const persistFavorites = async (newFavs) => {
    setFavorites(newFavs);
    try {
      await AsyncStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(newFavs));
    } catch (e) {
      console.warn('Failed saving favorites to AsyncStorage', e);
    }
  };

  // Persist User Recipes Helper
  const persistUserRecipes = async (newRecipes) => {
    setUserRecipes(newRecipes);
    try {
      await AsyncStorage.setItem(STORAGE_USER_RECIPES_KEY, JSON.stringify(newRecipes));
    } catch (e) {
      console.warn('Failed saving user recipes to AsyncStorage', e);
    }
  };

  // Navigation Helpers
  const navigateTo = (screen, recipe = null) => {
    if (recipe) {
      setSelectedRecipe(recipe);
    }
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
      setScreenHistory(['home']);
    }
  };

  // Favorites Toggle
  const toggleFavorite = (recipe) => {
    const isFav = favorites.includes(recipe.id);
    let nextFavorites;
    if (isFav) {
      nextFavorites = favorites.filter((id) => id !== recipe.id);
    } else {
      nextFavorites = [...favorites, recipe.id];
    }
    persistFavorites(nextFavorites);
  };

  // Image Picker Handler
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Permission to access photo gallery is needed to upload your recipe picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFormImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Image Picker Error', 'Unable to pick image: ' + error.message);
    }
  };

  // Open Form for Adding New Recipe
  const openAddRecipeScreen = () => {
    setFormRecipeId(null);
    setFormName('');
    setFormCategory('Dinner');
    setFormPrepTime('20 mins');
    setFormServings('4');
    setFormCalories('380');
    setFormDifficulty('Easy');
    setFormImage('');
    setFormIngredients(['']);
    setFormInstructions(['']);
    setFormErrors({});
    navigateTo('add-recipe');
  };

  // Open Form for Editing Existing Recipe
  const openEditRecipeScreen = (recipe) => {
    setFormRecipeId(recipe.id);
    setFormName(recipe.name);
    setFormCategory(recipe.category);
    setFormPrepTime(recipe.prepTime || '20 mins');
    setFormServings(String(recipe.servings || '4'));
    setFormCalories(String(recipe.calories || '350'));
    setFormDifficulty(recipe.difficulty || 'Easy');
    setFormImage(recipe.image || '');
    setFormIngredients(recipe.ingredients && recipe.ingredients.length > 0 ? [...recipe.ingredients] : ['']);
    setFormInstructions(recipe.instructions && recipe.instructions.length > 0 ? [...recipe.instructions] : ['']);
    setFormErrors({});
    navigateTo('edit-recipe', recipe);
  };

  // Form Validation & Save
  const handleSaveRecipe = () => {
    const errors = {};

    if (!formName.trim()) {
      errors.name = 'Recipe name is required.';
    }

    const cleanedIngredients = formIngredients.map((i) => i.trim()).filter((i) => i.length > 0);
    if (cleanedIngredients.length === 0) {
      errors.ingredients = 'At least one ingredient is required.';
    }

    const cleanedInstructions = formInstructions.map((s) => s.trim()).filter((s) => s.length > 0);
    if (cleanedInstructions.length === 0) {
      errors.instructions = 'At least one instruction step is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Alert.alert('Validation Notice', 'Please correct the highlighted fields before saving.');
      return;
    }

    const recipeData = {
      id: formRecipeId || 'user_' + Date.now().toString(),
      name: formName.trim(),
      category: formCategory,
      categories: [formCategory, 'My Food'],
      prepTime: formPrepTime.trim() || '20 mins',
      servings: parseInt(formServings, 10) || 4,
      calories: parseInt(formCalories, 10) || 350,
      difficulty: formDifficulty,
      image: formImage.trim() || DEFAULT_RECIPE_IMAGE,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      isUserCreated: true,
      updatedAt: Date.now(),
    };

    if (formRecipeId) {
      // Edit existing
      const updated = userRecipes.map((r) => (r.id === formRecipeId ? recipeData : r));
      persistUserRecipes(updated);
      setSelectedRecipe(recipeData);
      Alert.alert('Recipe Updated', 'Your changes have been successfully saved!');
    } else {
      // Create new
      const updated = [recipeData, ...userRecipes];
      persistUserRecipes(updated);
      Alert.alert('Recipe Created', 'New recipe has been added to My Recipes!');
    }

    // Return to My Food screen directly
    setCurrentScreen('my-food');
    setScreenHistory(['home', 'my-food']);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!recipeToDelete) return;
    const nextList = userRecipes.filter((r) => r.id !== recipeToDelete.id);
    persistUserRecipes(nextList);

    // If favorited, remove from favorites
    if (favorites.includes(recipeToDelete.id)) {
      persistFavorites(favorites.filter((id) => id !== recipeToDelete.id));
    }

    setRecipeToDelete(null);
    Alert.alert('Deleted', 'Recipe was removed from your collection.');
  };

  // All combined recipes for search / favorites
  const allRecipes = useMemo(() => {
    return [...userRecipes, ...SAMPLE_RECIPES];
  }, [userRecipes]);

  // Filtered recipes for Main Feed
  const feedRecipes = useMemo(() => {
    let list = SAMPLE_RECIPES;

    if (selectedCategory === 'All') {
      list = SAMPLE_RECIPES;
    } else if (selectedCategory === 'My Food') {
      list = userRecipes;
    } else {
      list = SAMPLE_RECIPES.filter((r) => {
        if (r.category === selectedCategory) return true;
        if (r.categories && r.categories.includes(selectedCategory)) return true;
        return false;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }

    return list;
  }, [selectedCategory, searchQuery, userRecipes]);

  // Favorited recipes list
  const favoritedRecipes = useMemo(() => {
    return allRecipes.filter((r) => favorites.includes(r.id));
  }, [allRecipes, favorites]);

  // -------------------------------------------------------------
  // RENDER HELPERS
  // -------------------------------------------------------------

  const renderHeader = (title, showBack = true) => (
    <View style={styles.headerBar}>
      <View style={styles.headerLeft}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoBadge}>
            <Ionicons name="restaurant" size={20} color={COLORS.cardBg} />
          </View>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Quick Nav Icons */}
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => navigateTo('favorites')}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favorites.length > 0 ? 'heart' : 'heart-outline'}
            size={24}
            color={favorites.length > 0 ? COLORS.accent : COLORS.textDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => navigateTo('my-food')}
          activeOpacity={0.7}
        >
          <Ionicons name="book-outline" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // -------------------------------------------------------------
  // SCREEN 1: HOME FEED
  // -------------------------------------------------------------
  const renderHomeScreen = () => (
    <View style={styles.screenContainer}>
      {/* Brand Header */}
      <View style={styles.homeHeader}>
        <View style={styles.brandContainer}>
          <View style={styles.brandIconWrapper}>
            <Ionicons name="restaurant" size={22} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandTitle}>Foodie</Text>
            <Text style={styles.brandSubtitle}>What are you cooking today?</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.headerIconBtn, currentScreen === 'favorites' && styles.headerIconBtnActive]}
            onPress={() => navigateTo('favorites')}
          >
            <Ionicons
              name={favorites.length > 0 ? 'heart' : 'heart-outline'}
              size={24}
              color={favorites.length > 0 ? COLORS.accent : COLORS.textDark}
            />
            {favorites.length > 0 && (
              <View style={styles.badgeIndicator}>
                <Text style={styles.badgeText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => navigateTo('my-food')}
          >
            <Ionicons name="book-outline" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes by name..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontally Scrollable Categories (At least 12 categories) */}
      <View style={styles.categoryBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                onPress={() => {
                  if (cat === 'My Food') {
                    navigateTo('my-food');
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryPillText, isSelected && styles.categoryPillTextActive]}>
                  {cat === 'My Food' ? '★ ' + cat : cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Recipe Cards Feed */}
      <FlatList
        data={feedRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No recipes found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with another recipe name or choose a different category.
            </Text>
            {searchQuery ? (
              <TouchableOpacity style={styles.outlineActionBtn} onPress={() => setSearchQuery('')}>
                <Text style={styles.outlineActionBtnText}>Clear Search</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        }
        renderItem={({ item }) => {
          const isFav = favorites.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.recipeCard}
              activeOpacity={0.9}
              onPress={() => navigateTo('details', item)}
            >
              <View style={styles.cardImageContainer}>
                <Image
                  source={{ uri: item.image || DEFAULT_RECIPE_IMAGE }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardTag}>
                  <Text style={styles.cardTagText}>{item.category}</Text>
                </View>

                {/* Heart Button */}
                <TouchableOpacity
                  style={styles.cardHeartBtn}
                  onPress={() => toggleFavorite(item)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={22}
                    color={isFav ? COLORS.accent : COLORS.textDark}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.name}
                </Text>

                <View style={styles.cardMetaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.prepTime}</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons name="flame-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.calories} kcal</Text>
                  </View>

                  <View style={styles.metaItem}>
                    <Ionicons name="speedometer-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.difficulty}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  // -------------------------------------------------------------
  // SCREEN 2: RECIPE DETAILS SCREEN
  // -------------------------------------------------------------
  const renderDetailsScreen = () => {
    if (!selectedRecipe) return null;
    const isFav = favorites.includes(selectedRecipe.id);

    return (
      <View style={styles.screenContainer}>
        {renderHeader(selectedRecipe.name, true)}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailsContent}>
          {/* Main Recipe Image */}
          <View style={styles.detailsImageWrapper}>
            <Image
              source={{ uri: selectedRecipe.image || DEFAULT_RECIPE_IMAGE }}
              style={styles.detailsHeroImage}
              resizeMode="cover"
            />
            {/* Floating Heart Button */}
            <TouchableOpacity
              style={styles.detailsFloatingHeart}
              onPress={() => toggleFavorite(selectedRecipe)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={28}
                color={isFav ? COLORS.accent : COLORS.textDark}
              />
            </TouchableOpacity>

            <View style={styles.detailsCategoryPill}>
              <Text style={styles.detailsCategoryText}>{selectedRecipe.category}</Text>
            </View>
          </View>

          {/* Title & Short Description */}
          <View style={styles.detailsHeaderSection}>
            <Text style={styles.detailsMainTitle}>{selectedRecipe.name}</Text>
            {selectedRecipe.description ? (
              <Text style={styles.detailsDescriptionText}>{selectedRecipe.description}</Text>
            ) : null}
          </View>

          {/* Key Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Ionicons name="time-outline" size={24} color={COLORS.accent} />
              <Text style={styles.metricValue}>{selectedRecipe.prepTime}</Text>
              <Text style={styles.metricLabel}>Prep Time</Text>
            </View>

            <View style={styles.metricCard}>
              <Ionicons name="people-outline" size={24} color={COLORS.accent} />
              <Text style={styles.metricValue}>{selectedRecipe.servings} Servings</Text>
              <Text style={styles.metricLabel}>Yield</Text>
            </View>

            <View style={styles.metricCard}>
              <Ionicons name="flame-outline" size={24} color={COLORS.accent} />
              <Text style={styles.metricValue}>{selectedRecipe.calories} kcal</Text>
              <Text style={styles.metricLabel}>Calories</Text>
            </View>

            <View style={styles.metricCard}>
              <Ionicons name="speedometer-outline" size={24} color={COLORS.accent} />
              <Text style={styles.metricValue}>{selectedRecipe.difficulty}</Text>
              <Text style={styles.metricLabel}>Difficulty</Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="basket-outline" size={22} color={COLORS.accent} />
              <Text style={styles.sectionTitle}>
                Ingredients ({selectedRecipe.ingredients ? selectedRecipe.ingredients.length : 0})
              </Text>
            </View>
            <View style={styles.ingredientsBox}>
              {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 ? (
                selectedRecipe.ingredients.map((ingredient, idx) => (
                  <View key={idx} style={styles.ingredientRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyNote}>No ingredients listed.</Text>
              )}
            </View>
          </View>

          {/* Step-by-Step Cooking Instructions */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="restaurant-outline" size={22} color={COLORS.accent} />
              <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>
            </View>

            {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 ? (
              selectedRecipe.instructions.map((step, idx) => (
                <View key={idx} style={styles.instructionStepCard}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepInstructionText}>{step}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyNote}>No instructions listed.</Text>
            )}
          </View>

          {/* If user created, offer Edit button */}
          {selectedRecipe.isUserCreated && (
            <View style={styles.detailsActionsRow}>
              <TouchableOpacity
                style={styles.detailsEditBtn}
                onPress={() => openEditRecipeScreen(selectedRecipe)}
              >
                <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                <Text style={styles.detailsEditBtnText}>Edit This Recipe</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  };

  // -------------------------------------------------------------
  // SCREEN 3: FAVORITES SCREEN
  // -------------------------------------------------------------
  const renderFavoritesScreen = () => (
    <View style={styles.screenContainer}>
      {renderHeader('My Favorites (' + favoritedRecipes.length + ')', true)}

      <FlatList
        data={favoritedRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={68} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Favorite Recipes Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on any recipe to save it here for fast access.
            </Text>
            <TouchableOpacity style={styles.primaryActionBtn} onPress={() => navigateTo('home')}>
              <Text style={styles.primaryActionBtnText}>Explore Recipes</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.recipeCard}
              activeOpacity={0.9}
              onPress={() => navigateTo('details', item)}
            >
              <View style={styles.cardImageContainer}>
                <Image
                  source={{ uri: item.image || DEFAULT_RECIPE_IMAGE }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardTag}>
                  <Text style={styles.cardTagText}>{item.category}</Text>
                </View>
                <TouchableOpacity
                  style={styles.cardHeartBtn}
                  onPress={() => toggleFavorite(item)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="heart" size={22} color={COLORS.accent} />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={styles.cardMetaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.prepTime}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="flame-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.calories} kcal</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="speedometer-outline" size={15} color={COLORS.accent} />
                    <Text style={styles.metaText}>{item.difficulty}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  // -------------------------------------------------------------
  // SCREEN 4: MY FOOD / MY RECIPES
  // -------------------------------------------------------------
  const renderMyFoodScreen = () => (
    <View style={styles.screenContainer}>
      {renderHeader('My Food', true)}

      <View style={styles.myFoodTopBar}>
        <View>
          <Text style={styles.myFoodHeading}>My Recipes</Text>
          <Text style={styles.myFoodSub}>
            {userRecipes.length} personal {userRecipes.length === 1 ? 'recipe' : 'recipes'} created
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addNewButton}
          onPress={openAddRecipeScreen}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addNewButtonText}>Add New Recipe</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={userRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={68} color={COLORS.border} />
            <Text style={styles.emptyTitle}>You haven't added any recipes yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your own signature dishes, upload your food photo, and keep track of steps.
            </Text>
            <TouchableOpacity style={styles.primaryActionBtn} onPress={openAddRecipeScreen}>
              <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.primaryActionBtnText}>Create Your First Recipe</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          const isFav = favorites.includes(item.id);
          return (
            <View style={styles.userRecipeCard}>
              <TouchableOpacity
                style={styles.userCardContent}
                activeOpacity={0.9}
                onPress={() => navigateTo('details', item)}
              >
                <Image
                  source={{ uri: item.image || DEFAULT_RECIPE_IMAGE }}
                  style={styles.userRecipeImage}
                  resizeMode="cover"
                />
                <View style={styles.userRecipeDetails}>
                  <Text style={styles.userRecipeCategory}>{item.category}</Text>
                  <Text style={styles.userRecipeTitle} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.userRecipeMetaRow}>
                    <Text style={styles.userRecipeMetaText}>⏱ {item.prepTime}</Text>
                    <Text style={styles.userRecipeMetaText}>🔥 {item.calories} kcal</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Edit and Delete Buttons */}
              <View style={styles.userCardActions}>
                <TouchableOpacity
                  style={styles.cardActionButton}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isFav ? COLORS.accent : COLORS.textMuted}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardActionButton, styles.editActionButton]}
                  onPress={() => openEditRecipeScreen(item)}
                >
                  <Ionicons name="pencil" size={16} color={COLORS.accent} />
                  <Text style={styles.editActionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardActionButton, styles.deleteActionButton]}
                  onPress={() => setRecipeToDelete(item)}
                >
                  <Ionicons name="trash-outline" size={16} color={COLORS.error} />
                  <Text style={styles.deleteActionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );

  // -------------------------------------------------------------
  // SCREEN 5 & 6: ADD / EDIT RECIPE FORM
  // -------------------------------------------------------------
  const renderRecipeForm = (isEdit = false) => {
    // Dynamic Ingredients Helpers
    const updateIngredient = (text, index) => {
      const next = [...formIngredients];
      next[index] = text;
      setFormIngredients(next);
    };

    const addIngredientField = () => {
      setFormIngredients([...formIngredients, '']);
    };

    const removeIngredientField = (index) => {
      if (formIngredients.length <= 1) {
        setFormIngredients(['']);
      } else {
        setFormIngredients(formIngredients.filter((_, i) => i !== index));
      }
    };

    // Dynamic Instructions Helpers
    const updateInstruction = (text, index) => {
      const next = [...formInstructions];
      next[index] = text;
      setFormInstructions(next);
    };

    const addInstructionField = () => {
      setFormInstructions([...formInstructions, '']);
    };

    const removeInstructionField = (index) => {
      if (formInstructions.length <= 1) {
        setFormInstructions(['']);
      } else {
        setFormInstructions(formInstructions.filter((_, i) => i !== index));
      }
    };

    return (
      <View style={styles.screenContainer}>
        {renderHeader(isEdit ? 'Edit Recipe' : 'Add New Recipe', true)}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContentContainer}
        >
          {/* Recipe Name */}
          <View style={styles.formFieldGroup}>
            <Text style={styles.formLabel}>
              Recipe Name <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[styles.formTextInput, formErrors.name && styles.inputErrorBorder]}
              placeholder="e.g. Grandma's Secret Berry Pie"
              placeholderTextColor={COLORS.textMuted}
              value={formName}
              onChangeText={(val) => {
                setFormName(val);
                if (formErrors.name) setFormErrors({ ...formErrors, name: null });
              }}
            />
            {formErrors.name && <Text style={styles.formErrorText}>{formErrors.name}</Text>}
          </View>

          {/* Recipe Image Picker */}
          <View style={styles.formFieldGroup}>
            <Text style={styles.formLabel}>Recipe Image</Text>
            <View style={styles.imagePickerSection}>
              {formImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: formImage }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.imageRemoveBadge}
                    onPress={() => setFormImage('')}
                  >
                    <Ionicons name="close" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholderBox}>
                  <Ionicons name="image-outline" size={40} color={COLORS.textMuted} />
                  <Text style={styles.imagePlaceholderText}>No image selected</Text>
                  <Text style={styles.imagePlaceholderSub}>A default photo will be used if left blank</Text>
                </View>
              )}

              <View style={styles.imageButtonRow}>
                <TouchableOpacity
                  style={styles.uploadImageButton}
                  onPress={handlePickImage}
                  activeOpacity={0.8}
                >
                  <Ionicons name="camera-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.uploadImageButtonText}>
                    {formImage ? 'Change Photo' : 'Select from Gallery'}
                  </Text>
                </TouchableOpacity>

                {/* Preset sample image picker */}
                <TouchableOpacity
                  style={styles.sampleImageButton}
                  onPress={() => {
                    const sampleImgs = [
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
                      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
                      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
                    ];
                    const chosen = sampleImgs[Math.floor(Math.random() * sampleImgs.length)];
                    setFormImage(chosen);
                  }}
                >
                  <Text style={styles.sampleImageButtonText}>Use Sample Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Category Selector */}
          <View style={styles.formFieldGroup}>
            <Text style={styles.formLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
              {CATEGORIES.filter((c) => c !== 'All' && c !== 'My Food').map((cat) => {
                const isSelected = formCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChoicePill, isSelected && styles.categoryChoicePillActive]}
                    onPress={() => setFormCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryChoicePillText,
                        isSelected && styles.categoryChoicePillTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Metadata Row: Prep Time, Servings, Calories, Difficulty */}
          <View style={styles.metaInputGrid}>
            <View style={styles.metaInputField}>
              <Text style={styles.formLabel}>Prep Time</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="25 mins"
                placeholderTextColor={COLORS.textMuted}
                value={formPrepTime}
                onChangeText={setFormPrepTime}
              />
            </View>

            <View style={styles.metaInputField}>
              <Text style={styles.formLabel}>Servings</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="4"
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                value={formServings}
                onChangeText={setFormServings}
              />
            </View>
          </View>

          <View style={styles.metaInputGrid}>
            <View style={styles.metaInputField}>
              <Text style={styles.formLabel}>Calories (kcal)</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="400"
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
                value={formCalories}
                onChangeText={setFormCalories}
              />
            </View>

            <View style={styles.metaInputField}>
              <Text style={styles.formLabel}>Difficulty</Text>
              <View style={styles.difficultyPickerRow}>
                {DIFFICULTIES.map((diff) => {
                  const isSelected = formDifficulty === diff;
                  return (
                    <TouchableOpacity
                      key={diff}
                      style={[
                        styles.difficultyOptionBtn,
                        isSelected && styles.difficultyOptionBtnActive,
                      ]}
                      onPress={() => setFormDifficulty(diff)}
                    >
                      <Text
                        style={[
                          styles.difficultyOptionText,
                          isSelected && styles.difficultyOptionTextActive,
                        ]}
                      >
                        {diff}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Dynamic Ingredients List */}
          <View style={styles.formFieldGroup}>
            <View style={styles.fieldHeaderBetween}>
              <Text style={styles.formLabel}>
                Ingredients <Text style={styles.requiredStar}>*</Text>
              </Text>
              <TouchableOpacity onPress={addIngredientField} style={styles.addMiniBtn}>
                <Ionicons name="add-circle" size={18} color={COLORS.accent} />
                <Text style={styles.addMiniBtnText}>Add Ingredient</Text>
              </TouchableOpacity>
            </View>

            {formErrors.ingredients && (
              <Text style={styles.formErrorText}>{formErrors.ingredients}</Text>
            )}

            {formIngredients.map((item, idx) => (
              <View key={idx} style={styles.dynamicRow}>
                <Text style={styles.dynamicIndexText}>•</Text>
                <TextInput
                  style={[styles.formTextInput, styles.dynamicInput]}
                  placeholder={`e.g. 2 cups all-purpose flour`}
                  placeholderTextColor={COLORS.textMuted}
                  value={item}
                  onChangeText={(val) => updateIngredient(val, idx)}
                />
                <TouchableOpacity
                  style={styles.removeRowBtn}
                  onPress={() => removeIngredientField(idx)}
                >
                  <Ionicons name="close-circle-outline" size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Dynamic Step-by-Step Instructions */}
          <View style={styles.formFieldGroup}>
            <View style={styles.fieldHeaderBetween}>
              <Text style={styles.formLabel}>
                Cooking Instructions <Text style={styles.requiredStar}>*</Text>
              </Text>
              <TouchableOpacity onPress={addInstructionField} style={styles.addMiniBtn}>
                <Ionicons name="add-circle" size={18} color={COLORS.accent} />
                <Text style={styles.addMiniBtnText}>Add Step</Text>
              </TouchableOpacity>
            </View>

            {formErrors.instructions && (
              <Text style={styles.formErrorText}>{formErrors.instructions}</Text>
            )}

            {formInstructions.map((step, idx) => (
              <View key={idx} style={styles.dynamicStepRow}>
                <View style={styles.stepFormBadge}>
                  <Text style={styles.stepFormBadgeText}>{idx + 1}</Text>
                </View>
                <TextInput
                  style={[styles.formTextInput, styles.dynamicStepInput]}
                  placeholder={`Describe step ${idx + 1}...`}
                  placeholderTextColor={COLORS.textMuted}
                  value={step}
                  multiline
                  onChangeText={(val) => updateInstruction(val, idx)}
                />
                <TouchableOpacity
                  style={styles.removeRowBtn}
                  onPress={() => removeInstructionField(idx)}
                >
                  <Ionicons name="close-circle-outline" size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveRecipeBtn}
            onPress={handleSaveRecipe}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.saveRecipeBtnText}>
              {isEdit ? 'Save Changes' : 'Save Recipe'}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  };

  // -------------------------------------------------------------
  // DELETE CONFIRMATION MODAL
  // -------------------------------------------------------------
  const renderDeleteModal = () => (
    <Modal
      visible={!!recipeToDelete}
      transparent
      animationType="fade"
      onRequestClose={() => setRecipeToDelete(null)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalIconWrap}>
            <Ionicons name="alert-circle" size={36} color={COLORS.error} />
          </View>
          <Text style={styles.modalTitle}>Delete Recipe?</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to permanently delete "{recipeToDelete?.name}"? This action cannot be undone.
          </Text>

          <View style={styles.modalButtonRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setRecipeToDelete(null)}
            >
              <Text style={styles.modalCancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalDeleteBtn}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.modalDeleteBtnText}>Yes, Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // -------------------------------------------------------------
  // SCREEN ROUTER
  // -------------------------------------------------------------
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return renderHomeScreen();
      case 'details':
        return renderDetailsScreen();
      case 'favorites':
        return renderFavoritesScreen();
      case 'my-food':
        return renderMyFoodScreen();
      case 'add-recipe':
        return renderRecipeForm(false);
      case 'edit-recipe':
        return renderRecipeForm(true);
      default:
        return renderHomeScreen();
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Loading Foodie...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {renderActiveScreen()}
      {renderDeleteModal()}
    </SafeAreaView>
  );
}

// -------------------------------------------------------------
// STYLES
// -------------------------------------------------------------
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: '500',
  },

  // Headers
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 4,
    paddingBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    flexShrink: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: 8,
    marginLeft: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  headerIconBtnActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  badgeIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.accent,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
  },

  // Categories Scrollbar
  categoryBarContainer: {
    marginBottom: 10,
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryPillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Recipe Cards
  recipeListContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  recipeCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#EBE5DC',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(30, 27, 24, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardHeartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  cardBody: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 10,
    lineHeight: 22,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  // Details Screen
  detailsContent: {
    paddingBottom: 30,
  },
  detailsImageWrapper: {
    height: 250,
    width: '100%',
    position: 'relative',
    backgroundColor: '#EBE5DC',
  },
  detailsHeroImage: {
    width: '100%',
    height: '100%',
  },
  detailsFloatingHeart: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  detailsCategoryPill: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailsCategoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsHeaderSection: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  detailsMainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 30,
    marginBottom: 8,
  },
  detailsDescriptionText: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  metricCard: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    margin: '2%',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 6,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },

  // Ingredients and Instructions
  sectionBlock: {
    marginHorizontal: 16,
    marginTop: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  ingredientsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EFE7',
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 20,
  },
  instructionStepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
  },
  stepInstructionText: {
    fontSize: 14,
    color: COLORS.textDark,
    flex: 1,
    lineHeight: 21,
  },
  detailsActionsRow: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  detailsEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  detailsEditBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // My Food Screen
  myFoodTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  myFoodHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  myFoodSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  addNewButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  userRecipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  userCardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  userRecipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#EBE5DC',
  },
  userRecipeDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  userRecipeCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
  },
  userRecipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 2,
    marginBottom: 4,
  },
  userRecipeMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  userRecipeMetaText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  userCardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F5EFE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cardActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FAF7F2',
  },
  editActionButton: {
    backgroundColor: COLORS.accentLight,
  },
  editActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    marginLeft: 4,
  },
  deleteActionButton: {
    backgroundColor: '#FFEBEE',
  },
  deleteActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.error,
    marginLeft: 4,
  },

  // Form Fields
  formContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formFieldGroup: {
    marginBottom: 18,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  requiredStar: {
    color: COLORS.error,
  },
  formTextInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textDark,
  },
  inputErrorBorder: {
    borderColor: COLORS.error,
  },
  formErrorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    fontWeight: '500',
  },
  imagePickerSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  imagePreviewContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imageRemoveBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderBox: {
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: '#E8E2D9',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FAF7F2',
  },
  imagePlaceholderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 4,
  },
  imagePlaceholderSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  imageButtonRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  uploadImageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadImageButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sampleImageButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FAF7F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleImageButtonText: {
    color: COLORS.textDark,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChoicePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
  },
  categoryChoicePillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  categoryChoicePillText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  categoryChoicePillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  metaInputGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  metaInputField: {
    flex: 1,
  },
  difficultyPickerRow: {
    flexDirection: 'row',
    gap: 4,
  },
  difficultyOptionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  difficultyOptionBtnActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  difficultyOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  difficultyOptionTextActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  fieldHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addMiniBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
  },
  dynamicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dynamicIndexText: {
    fontSize: 18,
    color: COLORS.accent,
    width: 20,
    textAlign: 'center',
  },
  dynamicInput: {
    flex: 1,
  },
  removeRowBtn: {
    padding: 8,
  },
  dynamicStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepFormBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  stepFormBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  dynamicStepInput: {
    flex: 1,
    minHeight: 48,
  },
  saveRecipeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  saveRecipeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 18,
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  outlineActionBtn: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 14,
  },
  outlineActionBtnText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyNote: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  modalMessage: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  modalDeleteBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.error,
    alignItems: 'center',
  },
  modalDeleteBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
