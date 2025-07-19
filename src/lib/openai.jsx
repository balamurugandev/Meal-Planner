// Mock OpenAI functions for development
// Replace with real OpenAI implementation when ready

export const generateMealPlan = async (userPreferences) => {
  const {
    dietaryRestrictions = [],
    allergies = [],
    budget = 'medium',
    servings = 2,
    cuisinePreferences = [],
    dislikes = []
  } = userPreferences;

  // Mock meal plan data
  const mockMealPlan = {
    weekPlan: {
      monday: {
        breakfast: {
          name: "Avocado Toast with Eggs",
          ingredients: ["2 slices whole grain bread", "1 avocado", "2 eggs", "salt", "pepper"],
          instructions: "Toast bread, mash avocado, fry eggs, assemble and season.",
          prepTime: "10 minutes"
        },
        lunch: {
          name: "Mediterranean Quinoa Bowl",
          ingredients: ["1 cup quinoa", "cucumber", "tomatoes", "feta cheese", "olive oil"],
          instructions: "Cook quinoa, chop vegetables, combine with feta and dressing.",
          prepTime: "15 minutes"
        },
        dinner: {
          name: "Grilled Chicken with Vegetables",
          ingredients: ["chicken breast", "broccoli", "carrots", "olive oil", "herbs"],
          instructions: "Season and grill chicken, steam vegetables, serve together.",
          prepTime: "25 minutes"
        }
      },
      tuesday: {
        breakfast: {
          name: "Greek Yogurt Parfait",
          ingredients: ["Greek yogurt", "berries", "granola", "honey"],
          instructions: "Layer yogurt, berries, and granola. Drizzle with honey.",
          prepTime: "5 minutes"
        },
        lunch: {
          name: "Turkey and Hummus Wrap",
          ingredients: ["whole wheat tortilla", "turkey slices", "hummus", "lettuce", "tomato"],
          instructions: "Spread hummus on tortilla, add turkey and vegetables, roll up.",
          prepTime: "8 minutes"
        },
        dinner: {
          name: "Salmon with Sweet Potato",
          ingredients: ["salmon fillet", "sweet potato", "asparagus", "lemon", "herbs"],
          instructions: "Bake salmon and sweet potato, steam asparagus, serve with lemon.",
          prepTime: "30 minutes"
        }
      },
      wednesday: {
        breakfast: {
          name: "Oatmeal with Fruits",
          ingredients: ["oats", "milk", "banana", "berries", "nuts"],
          instructions: "Cook oats with milk, top with fruits and nuts.",
          prepTime: "8 minutes"
        },
        lunch: {
          name: "Caprese Salad",
          ingredients: ["mozzarella", "tomatoes", "basil", "balsamic vinegar", "olive oil"],
          instructions: "Slice tomatoes and mozzarella, arrange with basil, drizzle with dressing.",
          prepTime: "10 minutes"
        },
        dinner: {
          name: "Vegetable Stir Fry",
          ingredients: ["mixed vegetables", "tofu", "soy sauce", "ginger", "garlic", "rice"],
          instructions: "Stir fry vegetables and tofu with seasonings, serve over rice.",
          prepTime: "20 minutes"
        }
      },
      thursday: {
        breakfast: {
          name: "Smoothie Bowl",
          ingredients: ["frozen berries", "banana", "yogurt", "granola", "chia seeds"],
          instructions: "Blend fruits with yogurt, pour into bowl, top with granola and seeds.",
          prepTime: "7 minutes"
        },
        lunch: {
          name: "Chicken Caesar Salad",
          ingredients: ["romaine lettuce", "grilled chicken", "parmesan", "croutons", "caesar dressing"],
          instructions: "Chop lettuce, add chicken and toppings, toss with dressing.",
          prepTime: "12 minutes"
        },
        dinner: {
          name: "Pasta Primavera",
          ingredients: ["pasta", "zucchini", "bell peppers", "cherry tomatoes", "olive oil", "herbs"],
          instructions: "Cook pasta, sauté vegetables, combine with herbs and oil.",
          prepTime: "25 minutes"
        }
      },
      friday: {
        breakfast: {
          name: "Breakfast Burrito",
          ingredients: ["tortilla", "scrambled eggs", "cheese", "salsa", "avocado"],
          instructions: "Scramble eggs, warm tortilla, add fillings and roll up.",
          prepTime: "12 minutes"
        },
        lunch: {
          name: "Asian Lettuce Wraps",
          ingredients: ["lettuce leaves", "ground turkey", "water chestnuts", "soy sauce", "ginger"],
          instructions: "Cook turkey with seasonings, serve in lettuce cups.",
          prepTime: "15 minutes"
        },
        dinner: {
          name: "Baked Cod with Quinoa",
          ingredients: ["cod fillet", "quinoa", "green beans", "lemon", "herbs"],
          instructions: "Bake cod with herbs, cook quinoa, steam green beans.",
          prepTime: "28 minutes"
        }
      },
      saturday: {
        breakfast: {
          name: "Pancakes with Berries",
          ingredients: ["flour", "eggs", "milk", "berries", "maple syrup"],
          instructions: "Make pancake batter, cook pancakes, serve with berries and syrup.",
          prepTime: "20 minutes"
        },
        lunch: {
          name: "Buddha Bowl",
          ingredients: ["quinoa", "roasted vegetables", "chickpeas", "tahini", "greens"],
          instructions: "Arrange quinoa, vegetables, and chickpeas in bowl, drizzle with tahini.",
          prepTime: "18 minutes"
        },
        dinner: {
          name: "Beef Stir Fry",
          ingredients: ["beef strips", "broccoli", "snap peas", "soy sauce", "rice"],
          instructions: "Stir fry beef and vegetables, season, serve over rice.",
          prepTime: "22 minutes"
        }
      },
      sunday: {
        breakfast: {
          name: "French Toast",
          ingredients: ["bread", "eggs", "milk", "cinnamon", "berries"],
          instructions: "Dip bread in egg mixture, cook until golden, serve with berries.",
          prepTime: "15 minutes"
        },
        lunch: {
          name: "Soup and Sandwich",
          ingredients: ["tomato soup", "grilled cheese sandwich", "butter", "cheese"],
          instructions: "Heat soup, make grilled cheese sandwich, serve together.",
          prepTime: "12 minutes"
        },
        dinner: {
          name: "Roast Chicken Dinner",
          ingredients: ["whole chicken", "potatoes", "carrots", "herbs", "gravy"],
          instructions: "Roast chicken with vegetables, make gravy, serve family style.",
          prepTime: "90 minutes"
        }
      }
    },
    shoppingList: {
      produce: ["avocado", "cucumber", "tomatoes", "broccoli", "carrots", "berries", "banana", "lettuce", "asparagus", "sweet potato"],
      proteins: ["eggs", "chicken breast", "turkey slices", "salmon fillet", "tofu", "ground turkey", "cod fillet", "beef strips"],
      grains: ["whole grain bread", "quinoa", "oats", "pasta", "rice", "flour"],
      dairy: ["Greek yogurt", "feta cheese", "mozzarella", "milk", "cheese", "butter"],
      pantry: ["olive oil", "salt", "pepper", "herbs", "honey", "soy sauce", "balsamic vinegar", "tahini", "maple syrup"]
    },
    nutritionalSummary: {
      averageCaloriesPerDay: "1800-2000 calories",
      balanceNotes: "Well-balanced meals with adequate protein, healthy fats, and complex carbohydrates. Includes variety of fruits and vegetables for essential nutrients."
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('Mock: Generated meal plan with preferences:', userPreferences);
  return mockMealPlan;
};

export const getRecipeSuggestions = async (ingredients, dietaryRestrictions = []) => {
  // Mock recipe suggestions
  const mockRecipes = [
    {
      name: "Quick Veggie Scramble",
      ingredients: ingredients.slice(0, 4),
      instructions: "Heat oil in pan, add vegetables, scramble with eggs, season to taste.",
      prepTime: "10 minutes",
      difficulty: "easy"
    },
    {
      name: "Simple Stir Fry",
      ingredients: ingredients.slice(0, 5),
      instructions: "Heat oil, add ingredients in order of cooking time, stir fry until tender.",
      prepTime: "15 minutes",
      difficulty: "easy"
    },
    {
      name: "Fresh Salad Bowl",
      ingredients: ingredients.slice(0, 6),
      instructions: "Chop all ingredients, combine in bowl, dress with oil and vinegar.",
      prepTime: "8 minutes",
      difficulty: "easy"
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Mock: Generated recipe suggestions for ingredients:', ingredients);
  return mockRecipes;
};