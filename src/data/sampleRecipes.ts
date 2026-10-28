import { Recipe } from '../types/recipe';

export const SAMPLE_RECIPES: Recipe[] = [
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
    description: 'Crisp sourdough bread topped with mashed ripe avocado, cherry tomatoes, microgreens, and a pinch of chili flakes.',
    ingredients: [
      '2 thick slices artisan sourdough bread',
      '1 large ripe Hass avocado',
      '1 tablespoon extra virgin olive oil',
      '1/2 lemon, juiced',
      '1/2 cup cherry tomatoes, halved',
      '1 pinch red pepper flakes',
      'Sea salt and freshly cracked black pepper to taste',
      'Fresh microgreens or cilantro for garnish'
    ],
    instructions: [
      'Toast sourdough slices until golden and crisp in a toaster or lightly oiled skillet.',
      'Cut avocado in half, discard pit, and scoop the flesh into a bowl.',
      'Add lemon juice, olive oil, salt, and pepper; mash coarsely with a fork.',
      'Generously spread the mashed avocado over the warm toast.',
      'Top with halved cherry tomatoes, microgreens, and a dusting of red pepper flakes. Serve immediately.'
    ]
  },
  {
    id: 'sample-2',
    name: 'Authentic Spaghetti Carbonara',
    category: 'Italian',
    categories: ['Italian', 'Dinner', 'Non-Vegetarian'],
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 4,
    calories: 620,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80',
    description: 'Roman pasta classic tossed with crispy guanciale, rich egg yolks, aged Pecorino Romano, and cracked black pepper.',
    ingredients: [
      '400g dried spaghetti or rigatoni',
      '150g guanciale or thick pancetta, diced',
      '4 large egg yolks + 1 whole egg',
      '1 cup Pecorino Romano cheese, freshly grated',
      '1 tablespoon coarsely ground black pepper',
      '1/2 cup reserved starchy pasta water',
      'Pinch of sea salt'
    ],
    instructions: [
      'Bring a large pot of salted water to a rolling boil and cook spaghetti until al dente.',
      'Meanwhile, fry guanciale in a wide skillet over medium heat until golden and crispy (about 7 minutes). Remove from direct heat.',
      'In a bowl, vigorously whisk egg yolks, whole egg, grated Pecorino, and plenty of cracked black pepper into a thick paste.',
      'Transfer hot pasta straight into the pan with guanciale and fat; toss well.',
      'Pour in the egg cheese mixture off heat, adding splashes of hot pasta water while tossing vigorously to emulsify into a silky sauce.',
      'Plate immediately with extra Pecorino and freshly cracked black pepper.'
    ]
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
    description: 'Fragrant minced chicken stir-fried with Thai holy basil, bird eye chilies, and garlic served over jasmine rice with a crispy fried egg.',
    ingredients: [
      '350g ground chicken thigh or breast',
      '1.5 cups fresh holy basil or Thai sweet basil leaves',
      '5 Thai bird eye chilies, finely sliced',
      '4 cloves garlic, crushed and minced',
      '1 tablespoon oyster sauce',
      '1 tablespoon light soy sauce',
      '1 teaspoon dark sweet soy sauce',
      '1 teaspoon fish sauce',
      '1 teaspoon brown sugar',
      '2 tablespoons vegetable oil',
      '2 crispy fried eggs and warm jasmine rice to serve'
    ],
    instructions: [
      'Pound garlic and bird eye chilies roughly in a mortar and pestle to release aromatic oils.',
      'Heat oil in a wok over high heat. Add garlic and chili paste; stir-fry for 30 seconds until fragrant.',
      'Add ground chicken, breaking it apart quickly with a spatula until cooked through (about 3-4 minutes).',
      'Add oyster sauce, soy sauces, fish sauce, and sugar; toss quickly to coat.',
      'Turn off heat, throw in fresh basil leaves, and toss until just wilted.',
      'Serve over steamed jasmine rice topped with a crispy fried egg with runny yolk.'
    ]
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
    description: 'Nutrient-packed fluffy quinoa with crisp cucumbers, kalamata olives, creamy feta, and lemon oregano vinaigrette.',
    ingredients: [
      '1 cup cooked tricolor quinoa, cooled',
      '1 English cucumber, diced',
      '1 cup grape tomatoes, halved',
      '1/3 cup Kalamata olives, pitted and sliced',
      '1/2 cup crumbled Greek feta cheese',
      '1/4 cup red onion, thinly sliced',
      '2 tablespoons extra virgin olive oil',
      '1 tablespoon fresh lemon juice',
      '1 teaspoon dried Greek oregano',
      'Salt and black pepper to taste'
    ],
    instructions: [
      'Cook quinoa according to package instructions with a pinch of salt and let it cool completely.',
      'In a small bowl, whisk olive oil, lemon juice, oregano, salt, and pepper into a bright dressing.',
      'In large serving bowls, lay down the fluffy quinoa base.',
      'Arrange diced cucumber, tomatoes, olives, sliced red onion, and crumbled feta in colorful sections on top.',
      'Drizzle with lemon oregano vinaigrette and toss right before enjoying.'
    ]
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
    description: 'Melt-in-your-mouth cloud-like pancakes with whipped meringue, pure maple syrup, and fresh seasonal berries.',
    ingredients: [
      '2 large eggs, whites and yolks separated',
      '2 tablespoons whole milk',
      '1/2 teaspoon pure vanilla extract',
      '4 tablespoons cake flour or all-purpose flour',
      '1/2 teaspoon baking powder',
      '2.5 tablespoons granulated sugar',
      '1 teaspoon lemon juice or cream of tartar',
      '1 tablespoon water for steaming',
      'Butter, fresh berries, and maple syrup for serving'
    ],
    instructions: [
      'In a bowl, whisk egg yolks, milk, and vanilla until pale. Sift in flour and baking powder; mix into a smooth batter.',
      'In another spotless bowl, beat egg whites with lemon juice until foamy, then gradually add sugar while whipping to stiff glossy peaks.',
      'Gently fold 1/3 of the meringue into yolk batter, then carefully fold in the remainder without deflating.',
      'Heat a nonstick lidded skillet on ultra-low heat with a brush of butter. Scoop tall mounds of batter onto the pan.',
      'Add a teaspoon of water around edges, cover with lid, and steam cook for 5 minutes.',
      'Carefully flip, add another splash of water, cover, and steam cook for 4-5 minutes until springy. Serve immediately with warm syrup.'
    ]
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
    description: 'Traditional Italian dessert with espresso-dipped ladyfingers layered with whipped mascarpone cream and Dutch cocoa.',
    ingredients: [
      '200g Italian Savoiardi (ladyfinger biscuits)',
      '250g authentic Italian mascarpone cheese',
      '3 large egg yolks',
      '1/2 cup granulated sugar',
      '1 cup heavy whipping cream',
      '1.5 cups freshly brewed strong espresso, cooled',
      '2 tablespoons Marsala wine or dark rum (optional)',
      '3 tablespoons unsweetened Dutch cocoa powder'
    ],
    instructions: [
      'Whisk egg yolks and sugar in a heatproof bowl over a pot of simmering water for 5 minutes until pale and ribbon-like. Cool slightly.',
      'Gently fold mascarpone into yolk mixture until velvety and lump-free.',
      'In a separate chilled bowl, whip heavy cream to soft peaks; fold into the mascarpone custard.',
      'Combine cooled espresso and rum in a shallow dish. Dip each ladyfinger for 1-2 seconds per side (do not soak).',
      'Arrange a single layer of ladyfingers in a glass dish, spread half the mascarpone cream, and repeat with another layer.',
      'Cover and chill in refrigerator for at least 4 hours (preferably overnight). Dust generously with cocoa powder before slicing.'
    ]
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
    description: 'Pan-seared bite-sized fresh salmon cubes glazed in golden garlic herb butter and fresh squeezed lemon.',
    ingredients: [
      '500g fresh salmon fillets, skinned and cut into 1-inch cubes',
      '2 tablespoons butter',
      '1 tablespoon olive oil',
      '4 garlic cloves, finely minced',
      '1 teaspoon smoked paprika',
      '1/2 lemon, juiced + lemon wedges',
      '2 tablespoons freshly chopped parsley',
      'Kosher salt and black pepper'
    ],
    instructions: [
      'Pat salmon cubes thoroughly dry with paper towels. Season evenly with salt, pepper, and smoked paprika.',
      'Heat olive oil and 1 tablespoon butter in a heavy skillet over medium-high heat until shimmering.',
      'Add salmon cubes in a single layer without crowding; sear undisturbed for 2-3 minutes until golden brown crust forms.',
      'Flip salmon and cook for another 2 minutes. Lower heat to medium-low.',
      'Add remaining butter and minced garlic, spooning melted sizzling butter over the salmon bites for 1 minute.',
      'Finish with lemon juice and chopped parsley. Serve hot alongside steamed asparagus or rice.'
    ]
  },
  {
    id: 'sample-8',
    name: 'Crunchy Vietnamese Spring Rolls (Gỏi Cuốn)',
    category: 'Snacks',
    categories: ['Snacks', 'Asian', 'Healthy'],
    prepTime: '25 mins',
    cookTime: '5 mins',
    servings: 4,
    calories: 220,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    description: 'Refreshing rice paper rolls packed with succulent prawns, crisp herbs, thin vermicelli noodles, and creamy peanut dip.',
    ingredients: [
      '8 large circular rice paper wrappers',
      '16 cooked tiger prawns, peeled and halved lengthwise',
      '100g thin rice vermicelli noodles, cooked and chilled',
      '1 cup crisp butterhead lettuce leaves, shredded',
      '1/2 cup fresh mint leaves',
      '1/2 cup fresh Thai basil or cilantro',
      '1 Persian cucumber, cut into matchsticks',
      '1/3 cup creamy peanut butter + 2 tbsp hoisin sauce + warm water for dipping sauce'
    ],
    instructions: [
      'Dip one rice paper sheet into warm water for 5 seconds until pliable; lay flat on a clean damp cutting board.',
      'Layer lettuce, vermicelli noodles, cucumber matchsticks, mint, and cilantro across the lower third.',
      'Place 3-4 prawn halves cut-side up across the middle section.',
      'Fold the bottom edge tightly over the fillings, tuck in both sides firmly, and roll upward tightly like a burrito.',
      'Repeat with remaining sheets. Whisk peanut butter, hoisin sauce, and warm water until glossy.',
      'Slice rolls in half diagonally and serve with creamy peanut dipping sauce.'
    ]
  },
  {
    id: 'sample-9',
    name: 'Classic Margherita Wood-Fired Pizza',
    category: 'Italian',
    categories: ['Italian', 'Dinner', 'Vegetarian'],
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 3,
    calories: 510,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp chewy crust topped with sweet San Marzano tomato sauce, fresh creamy buffalo mozzarella, and fragrant fresh basil.',
    ingredients: [
      '1 ball prepared artisan pizza dough (at room temperature)',
      '1/2 cup San Marzano crushed tomatoes',
      '150g fresh mozzarella or fior di latte, torn into chunks',
      'Fresh basil leaves',
      '1 tablespoon extra virgin olive oil',
      '1/2 teaspoon sea salt',
      '1 pinch dried oregano'
    ],
    instructions: [
      'Preheat oven to maximum temperature (around 500°F / 260°C) with a pizza stone or heavy baking steel inside.',
      'Stretch pizza dough on floured parchment paper into a 12-inch circle, leaving a slightly puffy outer rim.',
      'Spread crushed tomatoes evenly over dough, seasoning with a pinch of sea salt.',
      'Scatter torn mozzarella chunks across the sauce.',
      'Slide onto blazing hot pizza stone and bake for 9-12 minutes until crust is blistered and cheese is bubbly.',
      'Remove from oven, top immediately with fresh basil leaves and a generous swirl of extra virgin olive oil.'
    ]
  },
  {
    id: 'sample-10',
    name: 'Golden Loaded Vegetable Quesadillas',
    category: 'Lunch',
    categories: ['Lunch', 'Vegetarian', 'Snacks'],
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    calories: 430,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp golden flour tortillas stuffed with seasoned black beans, sweet corn, bell peppers, and melted Monterey Jack cheese.',
    ingredients: [
      '2 large flour tortillas',
      '1 cup Monterey Jack or cheddar cheese, freshly shredded',
      '1/2 cup black beans, rinsed and drained',
      '1/2 cup sweet corn kernels',
      '1/2 red bell pepper, finely diced',
      '1/2 teaspoon ground cumin',
      '1/4 teaspoon garlic powder',
      '1 tablespoon butter or olive oil',
      'Guacamole, sour cream, and salsa for dipping'
    ],
    instructions: [
      'In a bowl, toss black beans, corn, diced bell pepper, cumin, and garlic powder with a pinch of salt.',
      'Heat a skillet over medium heat with a dab of butter. Lay one tortilla flat.',
      'Spread shredded cheese over one half, spoon vegetable mixture on top, and add another layer of cheese before folding in half.',
      'Cook for 3-4 minutes until bottom is crispy and golden, then carefully flip and cook the other side until cheese is completely melted.',
      'Slice into crispy wedges and serve warm with cold guacamole and tangy salsa.'
    ]
  },
  {
    id: 'sample-11',
    name: 'Rich Japanese Tonkotsu Style Ramen',
    category: 'Asian',
    categories: ['Asian', 'Dinner', 'Non-Vegetarian'],
    prepTime: '20 mins',
    cookTime: '25 mins',
    servings: 2,
    calories: 680,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&auto=format&fit=crop&q=80',
    description: 'Springy ramen noodles immersed in a silky pork and sesame broth with tender chashu pork, soft ramen egg, and bamboo shoots.',
    ingredients: [
      '2 portions fresh or dried ramen noodles',
      '4 slices braised pork belly (chashu)',
      '2 soft-boiled marinated ramen eggs (ajitsuke tamago), halved',
      '4 cups rich pork or chicken bone broth',
      '2 tablespoons white miso paste',
      '1 tablespoon toasted sesame paste (tahini or nerigoma)',
      '1 tablespoon soy sauce',
      '1 teaspoon grated fresh ginger and 2 cloves grated garlic',
      '1 teaspoon toasted sesame oil',
      'Toppings: sliced scallions, nori seaweed sheets, menma (bamboo shoots)'
    ],
    instructions: [
      'In a saucepan, whisk grated garlic, ginger, miso paste, sesame paste, soy sauce, and sesame oil with hot bone broth; simmer gently.',
      'Boil water in a separate pot and cook ramen noodles according to instructions (typically 2-3 minutes) until firm to bite; drain well.',
      'Divide hot noodles between two deep ramen bowls.',
      'Ladle piping hot savory broth over the noodles.',
      'Artfully arrange braised chashu pork, halved marinated egg, bamboo shoots, nori sheet, and scallions on top.',
      'Serve immediately while steaming hot.'
    ]
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
    description: 'Tender pan-seared chicken breasts smothered in a rich garlic parmesan cream sauce loaded with sun-dried tomatoes and baby spinach.',
    ingredients: [
      '2 large chicken breasts, sliced horizontally into 4 thin cutlets',
      '1 tablespoon olive oil + 1 tablespoon butter',
      '4 cloves garlic, minced',
      '1/2 cup sun-dried tomatoes (in oil), drained and sliced',
      '1 cup heavy whipping cream',
      '1/2 cup low-sodium chicken broth',
      '1/2 cup freshly grated Parmesan cheese',
      '2 cups fresh baby spinach leaves',
      '1 teaspoon Italian seasoning, salt, and pepper'
    ],
    instructions: [
      'Season chicken cutlets on both sides with salt, pepper, and Italian seasoning.',
      'Heat oil and butter in a large skillet over medium-high heat. Sear chicken for 4-5 minutes per side until golden; transfer to a plate.',
      'In the same skillet, add minced garlic and sun-dried tomatoes; sauté for 1 minute until fragrant.',
      'Pour in chicken broth and heavy cream, scraping up the flavorful browned bits from the pan. Simmer for 3 minutes.',
      'Stir in grated Parmesan until smooth and melted, then fold in fresh baby spinach until just wilted.',
      'Return chicken and its resting juices to the pan, simmering for 2 minutes to reheat. Spoon creamy sauce over chicken and serve.'
    ]
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
    description: 'Wholesome creamy chia pudding infused with ceremonial Japanese matcha, almond milk, raw honey, and fresh kiwi.',
    ingredients: [
      '1/3 cup whole chia seeds',
      '1.25 cups unsweetened almond or oat milk',
      '1.5 teaspoons ceremonial grade matcha powder',
      '1.5 tablespoons pure maple syrup or raw honey',
      '1/2 teaspoon pure vanilla extract',
      'Fresh kiwi slices, coconut flakes, and raspberries for topping'
    ],
    instructions: [
      'In a small bowl, sift matcha powder and whisk with 2 tablespoons of warm milk until completely dissolved without clumps.',
      'In a mason jar or glass bowl, combine remaining milk, dissolved matcha, chia seeds, maple syrup, and vanilla.',
      'Whisk vigorously with a fork for 2 minutes to prevent chia seeds from sinking.',
      'Let sit for 10 minutes, then whisk again thoroughly to ensure even suspension.',
      'Seal tightly and refrigerate for at least 3 hours or overnight until thick and spoonable.',
      'Layer with sliced fresh kiwi, coconut flakes, and tart raspberries before eating.'
    ]
  },
  {
    id: 'sample-14',
    name: 'Spicy Crispy Korean Cauliflower Wings',
    category: 'Snacks',
    categories: ['Snacks', 'Asian', 'Vegetarian'],
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    calories: 270,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    description: 'Crispy battered cauliflower florets tossed in a sweet and spicy sticky Korean gochujang glaze with toasted sesame seeds.',
    ingredients: [
      '1 medium head cauliflower, cut into bite-sized florets',
      '3/4 cup all-purpose flour or cornstarch',
      '1/2 cup cold water + 1/2 cup club soda',
      '1 teaspoon garlic powder',
      '3 tablespoons Korean gochujang (chili paste)',
      '2 tablespoons honey or maple syrup',
      '1 tablespoon soy sauce',
      '1 tablespoon rice vinegar',
      '1 teaspoon toasted sesame oil',
      'Toasted sesame seeds and sliced green onions for garnish'
    ],
    instructions: [
      'Preheat oven to 450°F (230°C) and line a baking sheet with parchment paper.',
      'Whisk flour, garlic powder, salt, cold water, and club soda into a smooth, thin pancake batter consistency.',
      'Dip cauliflower florets into batter, shaking off excess, and spread evenly onto baking sheet.',
      'Bake for 20 minutes until crisp and lightly golden.',
      'Meanwhile, whisk gochujang, honey, soy sauce, rice vinegar, and sesame oil in a small saucepan over low heat for 2 minutes.',
      'Toss hot baked cauliflower in the sticky glaze until well coated. Return to oven for 5 minutes, then garnish with sesame seeds.'
    ]
  },
  {
    id: 'sample-15',
    name: 'Decadent Dark Chocolate Molten Lava Cake',
    category: 'Desserts',
    categories: ['Desserts', 'Vegetarian'],
    prepTime: '15 mins',
    cookTime: '12 mins',
    servings: 2,
    calories: 490,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    description: 'Warm, gooey molten center with rich bittersweet Belgian chocolate, served with vanilla bean ice cream.',
    ingredients: [
      '100g 70% dark bittersweet chocolate, chopped',
      '1/2 cup unsalted butter',
      '2 large eggs + 2 egg yolks',
      '1/3 cup powdered sugar',
      '2 tablespoons all-purpose flour',
      '1 pinch sea salt',
      'Cocoa powder for ramekins',
      'Vanilla bean ice cream and fresh mint for serving'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter two 6-ounce ramekins and dust inside thoroughly with cocoa powder.',
      'Melt chopped dark chocolate and butter together in a heatproof bowl set over simmering water; stir until glossy and smooth.',
      'In a bowl, whisk eggs, egg yolks, powdered sugar, and pinch of salt until pale and slightly frothy.',
      'Gently pour melted chocolate into egg mixture, folding to combine. Sift in flour and fold gently until smooth.',
      'Divide batter evenly between prepared ramekins and bake for exactly 12 minutes (edges should be firm, center still soft).',
      'Let cool for 1 minute, loosen edges with a knife, invert onto dessert plates, and serve immediately with vanilla ice cream.'
    ]
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
    description: 'Plump grilled shrimp tossed with baby arugula, juicy orange segments, creamy avocado, and honey lime vinaigrette.',
    ingredients: [
      '300g large raw shrimp, peeled and deveined',
      '4 cups fresh baby arugula',
      '1 orange, segmented',
      '1 ripe avocado, sliced',
      '1/4 cup shaved red onion',
      '2 tablespoons extra virgin olive oil',
      '1 lime, juiced',
      '1 teaspoon honey',
      '1 clove minced garlic',
      'Salt and freshly ground black pepper'
    ],
    instructions: [
      'Toss shrimp with 1 tablespoon olive oil, minced garlic, salt, and pepper.',
      'Grill or sear in a hot skillet for 2-3 minutes per side until pink and charred; remove to cool.',
      'In a small jar, shake lime juice, remaining olive oil, honey, salt, and pepper into a bright dressing.',
      'In a wide salad bowl, toss baby arugula with half the vinaigrette.',
      'Arrange grilled shrimp, fresh citrus segments, avocado slices, and shaved red onion on top.',
      'Drizzle remaining dressing over top and crack black pepper before serving.'
    ]
  }
];

export const CATEGORIES = [
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
  'My Food'
] as const;
