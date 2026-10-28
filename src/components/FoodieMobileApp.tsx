import React, { useState, useEffect, useMemo } from 'react';
import {
  Utensils,
  Heart,
  Search,
  ArrowLeft,
  Clock,
  Flame,
  Gauge,
  Plus,
  Trash2,
  Edit3,
  Bookmark,
  Check,
  X,
  Camera,
  Image as ImageIcon,
  Sparkles,
  Users,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { Recipe, ScreenType, DifficultyLevel } from '../types/recipe';
import { SAMPLE_RECIPES, CATEGORIES } from '../data/sampleRecipes';

const STORAGE_FAVORITES_KEY = 'foodie_favorites_v1';
const STORAGE_USER_RECIPES_KEY = 'foodie_user_recipes_v1';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop&q=80';

export function FoodieMobileApp() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);

  // Selected Recipe
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // App Data
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Delete modal state
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  // Form State
  const [formId, setFormId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Dinner');
  const [formPrepTime, setFormPrepTime] = useState('20 mins');
  const [formServings, setFormServings] = useState('4');
  const [formCalories, setFormCalories] = useState('380');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('Easy');
  const [formImage, setFormImage] = useState('');
  const [formIngredients, setFormIngredients] = useState<string[]>(['']);
  const [formInstructions, setFormInstructions] = useState<string[]>(['']);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      } else {
        // Pre-favorite sample-1 & sample-2 for initial delight
        setFavorites(['sample-1', 'sample-6']);
      }

      const storedUser = localStorage.getItem(STORAGE_USER_RECIPES_KEY);
      if (storedUser) {
        setUserRecipes(JSON.parse(storedUser));
      } else {
        // Sample custom user recipe to showcase My Food
        const initialCustomRecipe: Recipe = {
          id: 'user_init_1',
          name: 'Golden Saffron & Mushroom Risotto',
          category: 'Dinner',
          categories: ['Dinner', 'Italian', 'Vegetarian', 'My Food'],
          prepTime: '25 mins',
          servings: 3,
          calories: 420,
          difficulty: 'Medium',
          image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
          ingredients: [
            '1.5 cups Carnaroli or Arborio rice',
            '4 cups hot vegetable stock steeped with saffron threads',
            '250g cremini mushrooms, sliced',
            '1 medium shallot, minced',
            '1/2 cup dry white wine',
            '3 tbsp butter + 1 tbsp olive oil',
            '1/2 cup freshly grated Parmigiano Reggiano'
          ],
          instructions: [
            'Steep a pinch of saffron threads in hot vegetable stock for 10 minutes.',
            'Sauté sliced mushrooms in olive oil until golden brown; set aside.',
            'In the same wide pot, cook minced shallot in 1 tbsp butter until translucent.',
            'Add rice and toast for 2 minutes until translucent at the edges.',
            'Pour in white wine, stirring continuously until completely absorbed.',
            'Ladle in hot saffron stock one ladle at a time, stirring steadily until creamy and al dente (about 18 mins).',
            'Fold in sautéed mushrooms, remaining butter, and grated Parmigiano. Rest 2 mins before serving.'
          ],
          isUserCreated: true,
          createdAt: Date.now()
        };
        setUserRecipes([initialCustomRecipe]);
      }
    } catch (e) {
      console.warn('Storage read warning', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const persistFavorites = (nextFavs: string[]) => {
    setFavorites(nextFavs);
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(nextFavs));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  };

  const persistUserRecipes = (nextRecipes: Recipe[]) => {
    setUserRecipes(nextRecipes);
    try {
      localStorage.setItem(STORAGE_USER_RECIPES_KEY, JSON.stringify(nextRecipes));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  };

  // Navigation
  const navigateTo = (screen: ScreenType, recipe: Recipe | null = null) => {
    if (recipe) setSelectedRecipe(recipe);
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
      setScreenHistory(['home']);
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    const isFav = favorites.includes(recipe.id);
    let next: string[];
    if (isFav) {
      next = favorites.filter((id) => id !== recipe.id);
      showToast(`Removed "${recipe.name}" from favorites`);
    } else {
      next = [...favorites, recipe.id];
      showToast(`Saved "${recipe.name}" to favorites!`);
    }
    persistFavorites(next);
  };

  // Open Form for Add
  const openAddRecipe = () => {
    setFormId(null);
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

  // Open Form for Edit
  const openEditRecipe = (recipe: Recipe) => {
    setFormId(recipe.id);
    setFormName(recipe.name);
    setFormCategory(recipe.category);
    setFormPrepTime(recipe.prepTime || '20 mins');
    setFormServings(String(recipe.servings || '4'));
    setFormCalories(String(recipe.calories || '380'));
    setFormDifficulty(recipe.difficulty || 'Easy');
    setFormImage(recipe.image || '');
    setFormIngredients(recipe.ingredients?.length ? [...recipe.ingredients] : ['']);
    setFormInstructions(recipe.instructions?.length ? [...recipe.instructions] : ['']);
    setFormErrors({});
    navigateTo('edit-recipe', recipe);
  };

  // Form submit
  const handleSaveRecipe = () => {
    const errors: Record<string, string> = {};

    if (!formName.trim()) {
      errors.name = 'Recipe name is required.';
    }

    const cleanedIngs = formIngredients.map((i) => i.trim()).filter((i) => i.length > 0);
    if (cleanedIngs.length === 0) {
      errors.ingredients = 'At least one ingredient is required.';
    }

    const cleanedSteps = formInstructions.map((s) => s.trim()).filter((s) => s.length > 0);
    if (cleanedSteps.length === 0) {
      errors.instructions = 'At least one instruction step is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newRecipe: Recipe = {
      id: formId || 'user_' + Date.now().toString(),
      name: formName.trim(),
      category: formCategory,
      categories: [formCategory, 'My Food'],
      prepTime: formPrepTime.trim() || '20 mins',
      servings: parseInt(formServings, 10) || 4,
      calories: parseInt(formCalories, 10) || 350,
      difficulty: formDifficulty,
      image: formImage.trim() || DEFAULT_IMAGE,
      ingredients: cleanedIngs,
      instructions: cleanedSteps,
      isUserCreated: true,
      createdAt: Date.now()
    };

    if (formId) {
      const updated = userRecipes.map((r) => (r.id === formId ? newRecipe : r));
      persistUserRecipes(updated);
      setSelectedRecipe(newRecipe);
      showToast('Recipe updated successfully!');
    } else {
      const updated = [newRecipe, ...userRecipes];
      persistUserRecipes(updated);
      showToast('New recipe created and saved to My Recipes!');
    }

    setCurrentScreen('my-food');
    setScreenHistory(['home', 'my-food']);
  };

  // Delete
  const handleConfirmDelete = () => {
    if (!recipeToDelete) return;
    const nextRecipes = userRecipes.filter((r) => r.id !== recipeToDelete.id);
    persistUserRecipes(nextRecipes);
    if (favorites.includes(recipeToDelete.id)) {
      persistFavorites(favorites.filter((id) => id !== recipeToDelete.id));
    }
    showToast(`Deleted "${recipeToDelete.name}"`);
    setRecipeToDelete(null);
  };

  // Feed items
  const allRecipes = useMemo(() => {
    return [...userRecipes, ...SAMPLE_RECIPES];
  }, [userRecipes]);

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

  const favoritedRecipes = useMemo(() => {
    return allRecipes.filter((r) => favorites.includes(r.id));
  }, [allRecipes, favorites]);

  // Image upload simulator for web
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#FAF7F2] text-[#1E1B18] select-none font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-[#1E1B18] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-[#FF6433] shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-stone-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header className="shrink-0 bg-[#FAF7F2]/95 backdrop-blur border-b border-[#E8E2D9] px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          {currentScreen !== 'home' ? (
            <button
              onClick={goBack}
              className="p-1.5 rounded-lg bg-white border border-[#E8E2D9] text-[#1E1B18] hover:bg-[#FFEFEB] active:scale-95 transition-transform"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#FF6433] flex items-center justify-center text-white shadow-sm shadow-[#FF6433]/40">
              <Utensils className="w-4 h-4" />
            </div>
          )}

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-[#1E1B18] leading-none">
              {currentScreen === 'home' && 'Foodie'}
              {currentScreen === 'details' && 'Recipe Details'}
              {currentScreen === 'favorites' && 'Favorites'}
              {currentScreen === 'my-food' && 'My Recipes'}
              {currentScreen === 'add-recipe' && 'Add Recipe'}
              {currentScreen === 'edit-recipe' && 'Edit Recipe'}
            </h1>
            {currentScreen === 'home' && (
              <p className="text-[11px] text-[#7A726A] font-medium leading-none mt-1">
                Delicious food, everyday.
              </p>
            )}
          </div>
        </div>

        {/* Quick Nav Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigateTo('favorites')}
            className={`relative p-2 rounded-full border transition-colors ${
              currentScreen === 'favorites'
                ? 'bg-[#FFEFEB] border-[#FF6433] text-[#FF6433]'
                : 'bg-white border-[#E8E2D9] text-[#1E1B18] hover:bg-stone-50'
            }`}
            title="Favorites"
          >
            <Heart
              className={`w-4 h-4 ${
                favorites.length > 0 ? 'fill-[#FF6433] text-[#FF6433]' : 'text-[#1E1B18]'
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6433] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('my-food')}
            className={`p-2 rounded-full border transition-colors ${
              currentScreen === 'my-food'
                ? 'bg-[#FFEFEB] border-[#FF6433] text-[#FF6433]'
                : 'bg-white border-[#E8E2D9] text-[#1E1B18] hover:bg-stone-50'
            }`}
            title="My Food"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SCREEN CONTAINER */}
      <main className="flex-1 overflow-y-auto">
        {/* ---------------- SCREEN 1: HOME FEED ---------------- */}
        {currentScreen === 'home' && (
          <div className="pb-24">
            {/* Search Bar */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center bg-white border border-[#E8E2D9] rounded-2xl px-3.5 py-2 shadow-sm focus-within:border-[#FF6433] focus-within:ring-1 focus-within:ring-[#FF6433]">
                <Search className="w-4 h-4 text-[#7A726A] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search recipes by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#1E1B18] placeholder-[#7A726A] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#7A726A] hover:text-[#1E1B18]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Horizontal Category Bar (12 categories) */}
            <div className="px-4 py-2 border-b border-[#E8E2D9]/60">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (cat === 'My Food') {
                          navigateTo('my-food');
                        } else {
                          setSelectedCategory(cat);
                        }
                      }}
                      className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#FF6433] text-white shadow-sm shadow-[#FF6433]/30 scale-102'
                          : 'bg-white border border-[#E8E2D9] text-[#7A726A] hover:border-stone-400'
                      }`}
                    >
                      {cat === 'My Food' ? '★ My Food' : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipe Cards Feed */}
            <div className="px-4 py-3 space-y-4">
              {feedRecipes.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                    <Utensils className="w-8 h-8 text-stone-400" />
                  </div>
                  <h3 className="font-bold text-base text-[#1E1B18]">No recipes found</h3>
                  <p className="text-xs text-[#7A726A] max-w-xs mt-1">
                    Try another search term or switch categories to explore more dishes.
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-3 px-4 py-1.5 rounded-lg border border-[#FF6433] text-[#FF6433] text-xs font-semibold hover:bg-[#FFEFEB]"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                feedRecipes.map((recipe) => {
                  const isFav = favorites.includes(recipe.id);
                  return (
                    <div
                      key={recipe.id}
                      onClick={() => navigateTo('details', recipe)}
                      className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      {/* Image Container */}
                      <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={recipe.image || DEFAULT_IMAGE}
                          alt={recipe.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-[#1E1B18]/75 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                          {recipe.category}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recipe);
                          }}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-transform"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFav
                                ? 'fill-[#FF6433] text-[#FF6433]'
                                : 'text-stone-700 hover:text-[#FF6433]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-3.5">
                        <h2 className="font-bold text-sm text-[#1E1B18] line-clamp-1 group-hover:text-[#FF6433] transition-colors">
                          {recipe.name}
                        </h2>

                        <div className="flex items-center gap-4 mt-2.5 text-xs text-[#7A726A] font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#FF6433]" />
                            {recipe.prepTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-[#FF6433]" />
                            {recipe.calories} kcal
                          </span>
                          <span className="flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5 text-[#FF6433]" />
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 2: RECIPE DETAILS ---------------- */}
        {currentScreen === 'details' && selectedRecipe && (
          <div className="pb-24">
            {/* Hero Image */}
            <div className="relative h-60 w-full bg-stone-100">
              <img
                src={selectedRecipe.image || DEFAULT_IMAGE}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Category */}
              <div className="absolute bottom-4 left-4 bg-[#FF6433] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {selectedRecipe.category}
              </div>

              {/* Floating Heart Button */}
              <button
                onClick={() => toggleFavorite(selectedRecipe)}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorites.includes(selectedRecipe.id)
                      ? 'fill-[#FF6433] text-[#FF6433]'
                      : 'text-stone-700'
                  }`}
                />
              </button>
            </div>

            {/* Title & Description */}
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-xl font-extrabold text-[#1E1B18] leading-snug">
                {selectedRecipe.name}
              </h1>
              {selectedRecipe.description && (
                <p className="text-xs text-[#7A726A] mt-1.5 leading-relaxed">
                  {selectedRecipe.description}
                </p>
              )}
            </div>

            {/* Metrics 4-Box Grid */}
            <div className="grid grid-cols-2 gap-2.5 px-4 my-3">
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] flex flex-col items-center justify-center text-center shadow-xs">
                <Clock className="w-5 h-5 text-[#FF6433] mb-1" />
                <span className="text-xs font-bold text-[#1E1B18]">{selectedRecipe.prepTime}</span>
                <span className="text-[10px] text-[#7A726A]">Prep Time</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] flex flex-col items-center justify-center text-center shadow-xs">
                <Users className="w-5 h-5 text-[#FF6433] mb-1" />
                <span className="text-xs font-bold text-[#1E1B18]">
                  {selectedRecipe.servings} Servings
                </span>
                <span className="text-[10px] text-[#7A726A]">Yield</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] flex flex-col items-center justify-center text-center shadow-xs">
                <Flame className="w-5 h-5 text-[#FF6433] mb-1" />
                <span className="text-xs font-bold text-[#1E1B18]">
                  {selectedRecipe.calories} kcal
                </span>
                <span className="text-[10px] text-[#7A726A]">Calories</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] flex flex-col items-center justify-center text-center shadow-xs">
                <Gauge className="w-5 h-5 text-[#FF6433] mb-1" />
                <span className="text-xs font-bold text-[#1E1B18]">{selectedRecipe.difficulty}</span>
                <span className="text-[10px] text-[#7A726A]">Difficulty</span>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="px-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-4 h-4 text-[#FF6433]" />
                <h2 className="text-sm font-bold text-[#1E1B18]">
                  Ingredients ({selectedRecipe.ingredients?.length || 0})
                </h2>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E2D9] p-3.5 divide-y divide-stone-100">
                {selectedRecipe.ingredients?.map((ing, i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6433] mt-1.5 shrink-0" />
                    <span className="text-xs text-[#1E1B18] leading-relaxed">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="px-4 mt-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#FF6433]" />
                <h2 className="text-sm font-bold text-[#1E1B18]">Step-by-Step Instructions</h2>
              </div>
              <div className="space-y-2.5">
                {selectedRecipe.instructions?.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white p-3.5 rounded-2xl border border-[#E8E2D9] flex items-start gap-3 shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFEFEB] text-[#FF6433] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs text-[#1E1B18] leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* If user created, offer Edit */}
            {selectedRecipe.isUserCreated && (
              <div className="px-4 mt-6">
                <button
                  onClick={() => openEditRecipe(selectedRecipe)}
                  className="w-full py-3 rounded-xl bg-[#FF6433] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#E04818] active:scale-98 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit This Recipe
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------------- SCREEN 3: FAVORITES ---------------- */}
        {currentScreen === 'favorites' && (
          <div className="pb-24 px-4 pt-3 space-y-4">
            {favoritedRecipes.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFEFEB] flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8 text-[#FF6433]" />
                </div>
                <h2 className="font-bold text-base text-[#1E1B18]">No Favorite Recipes Yet</h2>
                <p className="text-xs text-[#7A726A] max-w-xs mt-1">
                  Browse through recipes and tap the heart icon on any card to save it here for fast
                  reference.
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#FF6433] text-white text-xs font-bold shadow-sm hover:bg-[#E04818]"
                >
                  Explore Recipes
                </button>
              </div>
            ) : (
              favoritedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => navigateTo('details', recipe)}
                  className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="relative h-40 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={recipe.image || DEFAULT_IMAGE}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3 bg-[#1E1B18]/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {recipe.category}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                    >
                      <Heart className="w-4 h-4 fill-[#FF6433] text-[#FF6433]" />
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-sm text-[#1E1B18] line-clamp-1">{recipe.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#7A726A]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF6433]" />
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#FF6433]" />
                        {recipe.calories} kcal
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ---------------- SCREEN 4: MY FOOD / MY RECIPES ---------------- */}
        {currentScreen === 'my-food' && (
          <div className="pb-24 px-4 pt-3">
            {/* Top Bar with Add Button */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-extrabold text-[#1E1B18]">My Recipes</h2>
                <p className="text-xs text-[#7A726A]">
                  {userRecipes.length} personal {userRecipes.length === 1 ? 'recipe' : 'recipes'}
                </p>
              </div>

              <button
                onClick={openAddRecipe}
                className="px-3.5 py-2 rounded-xl bg-[#FF6433] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#E04818] active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Recipe
              </button>
            </div>

            {/* List */}
            {userRecipes.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-[#E8E2D9] p-6">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <Bookmark className="w-7 h-7 text-stone-400" />
                </div>
                <h3 className="font-bold text-sm text-[#1E1B18]">You haven't added any recipes yet</h3>
                <p className="text-xs text-[#7A726A] max-w-xs mt-1">
                  Create your own signature dishes, upload your food photo, and keep track of steps.
                </p>
                <button
                  onClick={openAddRecipe}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#FF6433] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Recipe
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {userRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs"
                  >
                    <div
                      onClick={() => navigateTo('details', recipe)}
                      className="flex p-3 gap-3 cursor-pointer hover:bg-stone-50 transition-colors"
                    >
                      <img
                        src={recipe.image || DEFAULT_IMAGE}
                        alt={recipe.name}
                        className="w-18 h-18 rounded-xl object-cover shrink-0 bg-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#FF6433] uppercase tracking-wider">
                          {recipe.category}
                        </span>
                        <h4 className="font-bold text-sm text-[#1E1B18] truncate mt-0.5">
                          {recipe.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#7A726A] mt-1.5">
                          <span>⏱ {recipe.prepTime}</span>
                          <span>🔥 {recipe.calories} kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar: Edit, Delete */}
                    <div className="border-t border-stone-100 px-3 py-2 flex items-center justify-between bg-stone-50/60 text-xs">
                      <span className="text-[11px] text-stone-500 font-medium">Custom Dish</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFavorite(recipe)}
                          className="p-1.5 text-stone-600 hover:text-[#FF6433]"
                          title="Favorite"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              favorites.includes(recipe.id) ? 'fill-[#FF6433] text-[#FF6433]' : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => openEditRecipe(recipe)}
                          className="px-2.5 py-1 rounded-lg bg-[#FFEFEB] text-[#FF6433] font-bold flex items-center gap-1 hover:bg-[#FFDFD6]"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => setRecipeToDelete(recipe)}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 font-bold flex items-center gap-1 hover:bg-red-100"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- SCREEN 5 & 6: ADD / EDIT RECIPE FORM ---------------- */}
        {(currentScreen === 'add-recipe' || currentScreen === 'edit-recipe') && (
          <div className="pb-28 px-4 pt-3 space-y-4">
            {/* Recipe Name */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B18] mb-1">
                Recipe Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Grandma's Secret Berry Pie"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                }}
                className={`w-full bg-white border ${
                  formErrors.name ? 'border-red-500' : 'border-[#E8E2D9]'
                } rounded-xl px-3 py-2.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#FF6433]`}
              />
              {formErrors.name && (
                <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Image Upload / Preview */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B18] mb-1">Recipe Image</label>
              <div className="bg-white border border-[#E8E2D9] rounded-2xl p-3 text-center">
                {formImage ? (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden mb-2.5 bg-stone-100">
                    <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setFormImage('')}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-full border-2 border-dashed border-[#E8E2D9] rounded-xl flex flex-col items-center justify-center mb-2.5 bg-stone-50 text-[#7A726A]">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[11px]">No image selected</span>
                    <span className="text-[9px] text-stone-400">
                      Default photo will be used if left blank
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <label className="flex-1 py-2 rounded-xl bg-[#FF6433] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E04818]">
                    <Camera className="w-3.5 h-3.5" />
                    {formImage ? 'Change Image' : 'Select Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      const presets = [
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
                        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
                        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
                        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
                      ];
                      setFormImage(presets[Math.floor(Math.random() * presets.length)]);
                    }}
                    className="px-3 py-2 rounded-xl border border-[#E8E2D9] text-[#1E1B18] text-xs font-semibold hover:bg-stone-50"
                  >
                    Sample Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B18] mb-1">Category</label>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.filter((c) => c !== 'All' && c !== 'My Food').map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      formCategory === cat
                        ? 'bg-[#FF6433] text-white'
                        : 'bg-white border border-[#E8E2D9] text-[#7A726A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Prep Time & Servings */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">Prep Time</label>
                <input
                  type="text"
                  placeholder="20 mins"
                  value={formPrepTime}
                  onChange={(e) => setFormPrepTime(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">Servings</label>
                <input
                  type="number"
                  placeholder="4"
                  value={formServings}
                  onChange={(e) => setFormServings(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18]"
                />
              </div>
            </div>

            {/* Calories & Difficulty */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">Calories (kcal)</label>
                <input
                  type="number"
                  placeholder="380"
                  value={formCalories}
                  onChange={(e) => setFormCalories(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] mb-1">Difficulty</label>
                <div className="flex gap-1">
                  {(['Easy', 'Medium', 'Hard'] as DifficultyLevel[]).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setFormDifficulty(diff)}
                      className={`flex-1 py-2 rounded-xl text-[11px] font-bold border ${
                        formDifficulty === diff
                          ? 'bg-[#FFEFEB] border-[#FF6433] text-[#FF6433]'
                          : 'bg-white border-[#E8E2D9] text-[#7A726A]'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#1E1B18]">
                  Ingredients <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormIngredients([...formIngredients, ''])}
                  className="text-xs font-bold text-[#FF6433] flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Ingredient
                </button>
              </div>

              {formErrors.ingredients && (
                <p className="text-[11px] text-red-500 mb-1">{formErrors.ingredients}</p>
              )}

              <div className="space-y-2">
                {formIngredients.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-4 text-center text-xs text-[#FF6433] font-bold">•</span>
                    <input
                      type="text"
                      placeholder={`e.g. 2 cups flour`}
                      value={item}
                      onChange={(e) => {
                        const copy = [...formIngredients];
                        copy[idx] = e.target.value;
                        setFormIngredients(copy);
                        if (formErrors.ingredients) setFormErrors({ ...formErrors, ingredients: '' });
                      }}
                      className="flex-1 bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formIngredients.length > 1) {
                          setFormIngredients(formIngredients.filter((_, i) => i !== idx));
                        } else {
                          setFormIngredients(['']);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Instructions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#1E1B18]">
                  Cooking Instructions <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormInstructions([...formInstructions, ''])}
                  className="text-xs font-bold text-[#FF6433] flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Step
                </button>
              </div>

              {formErrors.instructions && (
                <p className="text-[11px] text-red-500 mb-1">{formErrors.instructions}</p>
              )}

              <div className="space-y-2">
                {formInstructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFEFEB] text-[#FF6433] text-[10px] font-bold flex items-center justify-center shrink-0 mt-2">
                      {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      placeholder={`Describe step ${idx + 1}...`}
                      value={step}
                      onChange={(e) => {
                        const copy = [...formInstructions];
                        copy[idx] = e.target.value;
                        setFormInstructions(copy);
                        if (formErrors.instructions)
                          setFormErrors({ ...formErrors, instructions: '' });
                      }}
                      className="flex-1 bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1E1B18]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formInstructions.length > 1) {
                          setFormInstructions(formInstructions.filter((_, i) => i !== idx));
                        } else {
                          setFormInstructions(['']);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-700 mt-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveRecipe}
              className="w-full py-3.5 rounded-xl bg-[#FF6433] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#E04818] active:scale-98 transition-all"
            >
              <Check className="w-4 h-4" />
              {currentScreen === 'edit-recipe' ? 'Save Changes' : 'Save Recipe'}
            </button>
          </div>
        )}
      </main>

      {/* BOTTOM MOBILE TAB BAR */}
      <nav className="shrink-0 bg-white border-t border-[#E8E2D9] px-6 py-2 flex items-center justify-between z-20">
        <button
          onClick={() => {
            setCurrentScreen('home');
            setScreenHistory(['home']);
          }}
          className={`flex flex-col items-center gap-1 ${
            currentScreen === 'home' ? 'text-[#FF6433]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold">Discover</span>
        </button>

        <button
          onClick={() => navigateTo('favorites')}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === 'favorites' ? 'text-[#FF6433]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className={`w-5 h-5 ${favorites.length > 0 && currentScreen === 'favorites' ? 'fill-[#FF6433]' : ''}`} />
          <span className="text-[10px] font-bold">Favorites</span>
          {favorites.length > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#FF6433]" />
          )}
        </button>

        <button
          onClick={() => navigateTo('my-food')}
          className={`flex flex-col items-center gap-1 ${
            currentScreen === 'my-food' ? 'text-[#FF6433]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-bold">My Food</span>
        </button>

        <button
          onClick={openAddRecipe}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-800"
        >
          <div className="w-6 h-6 rounded-full bg-[#FF6433] text-white flex items-center justify-center -mt-1 shadow-sm">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#FF6433]">Create</span>
        </button>
      </nav>

      {/* DELETE CONFIRMATION MODAL */}
      {recipeToDelete && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1E1B18]">Delete Recipe?</h3>
            <p className="text-xs text-[#7A726A] mt-1.5 leading-relaxed">
              Are you sure you want to permanently delete "{recipeToDelete.name}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setRecipeToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E8E2D9] text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
