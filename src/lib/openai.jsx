import OpenAI from 'openai';

// OpenAI configuration
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, move this to backend
});

export const generateMealPlan = async (userPreferences, region = 'India') => {
  const {
    dietaryRestrictions = [],
    allergies = [],
    budget = 'medium',
    servings = 2,
    cuisinePreferences = [],
    dislikes = []
  } = userPreferences;

  // Create a comprehensive prompt for AI
  const prompt = `Generate a detailed 7-day meal plan with the following specifications:

REGION: ${region}
DIETARY RESTRICTIONS: ${dietaryRestrictions.join(', ') || 'None'}
ALLERGIES: ${allergies.join(', ') || 'None'}
CUISINE PREFERENCES: ${cuisinePreferences.join(', ') || 'Mixed'}
BUDGET LEVEL: ${budget}
SERVINGS: ${servings} people
DISLIKES: ${dislikes.join(', ') || 'None'}

REQUIREMENTS:
1. Create culturally authentic ${region === 'India' ? 'Indian' : 'International'} meals
2. Respect all dietary restrictions and allergies
3. Include breakfast, lunch, and dinner for each day
4. Provide detailed ingredients list for each meal
5. Include cooking instructions and prep time
6. Generate a categorized shopping list
7. Provide nutritional summary

${region === 'India' ? `
INDIAN CUISINE FOCUS:
- Use authentic Indian spices and cooking methods
- Include regional variations based on cuisine preferences
- Use appropriate grains (rice, wheat, millets)
- Include dal, vegetables, and traditional preparations
- Consider vegetarian options prominently
` : `
INTERNATIONAL CUISINE FOCUS:
- Use global ingredients and cooking methods
- Include variety from selected cuisine preferences
- Balance proteins, carbs, and vegetables
- Include both vegetarian and non-vegetarian options
`}

DIETARY SUBSTITUTIONS:
${dietaryRestrictions.includes('vegan') ? '- Replace all animal products with plant-based alternatives' : ''}
${dietaryRestrictions.includes('keto') ? '- Use low-carb alternatives (cauliflower rice, zucchini noodles)' : ''}
${dietaryRestrictions.includes('gluten-free') ? '- Use gluten-free grains and alternatives' : ''}
${dietaryRestrictions.includes('dairy-free') ? '- Use coconut milk, almond milk, and dairy alternatives' : ''}

FORMAT: Return ONLY valid JSON in this exact structure:
{
  "weekPlan": {
    "monday": {
      "breakfast": {"name": "", "ingredients": [], "instructions": "", "prepTime": ""},
      "lunch": {"name": "", "ingredients": [], "instructions": "", "prepTime": ""},
      "dinner": {"name": "", "ingredients": [], "instructions": "", "prepTime": ""}
    },
    "tuesday": { /* same structure */ },
    "wednesday": { /* same structure */ },
    "thursday": { /* same structure */ },
    "friday": { /* same structure */ },
    "saturday": { /* same structure */ },
    "sunday": { /* same structure */ }
  },
  "shoppingList": {
    "grains": [],
    "vegetables": [],
    "proteins": [],
    "dairy": [],
    "spices": [],
    "produce": [],
    "pantry": []
  },
  "nutritionalSummary": {
    "averageCaloriesPerDay": "",
    "balanceNotes": ""
  }
}`;

  try {
    console.log('🤖 Generating AI meal plan...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional nutritionist and meal planning expert specializing in ${region === 'India' ? 'Indian' : 'international'} cuisine. Generate practical, healthy, and culturally authentic meal plans that respect dietary restrictions and preferences. Always respond with valid JSON only.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    console.log('✅ AI meal plan generated successfully');
    
    // Parse and validate JSON response
    const mealPlan = JSON.parse(response);
    
    // Validate required structure
    if (!mealPlan.weekPlan || !mealPlan.shoppingList || !mealPlan.nutritionalSummary) {
      throw new Error('Invalid meal plan structure from AI');
    }
    
    return mealPlan;
    
  } catch (error) {
    console.error('❌ Error generating AI meal plan:', error);
    
    // Fallback to a basic meal plan if AI fails
    console.log('🔄 Using fallback meal plan...');
    return generateFallbackMealPlan(userPreferences, region);
  }
};

// Fallback meal plan generator
const generateFallbackMealPlan = (userPreferences, region) => {
  const { dietaryRestrictions = [], cuisinePreferences = [], servings = 2 } = userPreferences;
  const isVegetarian = dietaryRestrictions.includes('vegetarian') || dietaryRestrictions.includes('vegan');
  const isIndian = region === 'India';
  
  if (isIndian) {
    return {
      weekPlan: {
        monday: {
          breakfast: { name: "Idli with Sambar", ingredients: ["rice", "urad dal", "sambar mix"], instructions: "Steam idli, prepare sambar", prepTime: "20 minutes" },
          lunch: { name: isVegetarian ? "Dal Rice" : "Chicken Curry with Rice", ingredients: ["rice", "dal", "spices"], instructions: "Cook rice and dal separately", prepTime: "30 minutes" },
          dinner: { name: "Roti with Vegetables", ingredients: ["wheat flour", "mixed vegetables"], instructions: "Make roti, cook vegetables", prepTime: "25 minutes" }
        },
        tuesday: {
          breakfast: { name: "Upma", ingredients: ["semolina", "vegetables"], instructions: "Roast semolina, add vegetables", prepTime: "15 minutes" },
          lunch: { name: "Rajma Rice", ingredients: ["rajma", "rice", "spices"], instructions: "Cook rajma curry with rice", prepTime: "40 minutes" },
          dinner: { name: "Chapati with Dal", ingredients: ["wheat flour", "dal"], instructions: "Make chapati, prepare dal", prepTime: "30 minutes" }
        },
        wednesday: {
          breakfast: { name: "Dosa", ingredients: ["rice", "urad dal"], instructions: "Make dosa batter, cook dosa", prepTime: "20 minutes" },
          lunch: { name: "Vegetable Biryani", ingredients: ["rice", "vegetables", "spices"], instructions: "Layer rice and vegetables", prepTime: "45 minutes" },
          dinner: { name: "Khichdi", ingredients: ["rice", "dal", "vegetables"], instructions: "Cook everything together", prepTime: "25 minutes" }
        }
      },
      shoppingList: {
        grains: ["rice", "wheat flour", "semolina", "urad dal"],
        vegetables: ["onions", "tomatoes", "potatoes", "mixed vegetables"],
        proteins: isVegetarian ? ["dal varieties", "paneer"] : ["chicken", "dal varieties"],
        dairy: ["yogurt", "milk"],
        spices: ["turmeric", "cumin", "coriander", "garam masala"],
        produce: ["ginger", "garlic", "green chilies"],
        pantry: ["oil", "salt", "sugar"]
      },
      nutritionalSummary: {
        averageCaloriesPerDay: "1800-2000 calories",
        balanceNotes: `Balanced Indian meals for ${servings} people with adequate protein and vegetables.`
      }
    };
  } else {
    return {
      weekPlan: {
        monday: {
          breakfast: { name: "Oatmeal with Berries", ingredients: ["oats", "berries", "milk"], instructions: "Cook oats, add berries", prepTime: "10 minutes" },
          lunch: { name: isVegetarian ? "Quinoa Bowl" : "Grilled Chicken Salad", ingredients: ["quinoa", "vegetables"], instructions: "Cook quinoa, add vegetables", prepTime: "15 minutes" },
          dinner: { name: isVegetarian ? "Pasta Primavera" : "Salmon with Vegetables", ingredients: ["pasta", "vegetables"], instructions: "Cook pasta, sauté vegetables", prepTime: "25 minutes" }
        },
        tuesday: {
          breakfast: { name: "Greek Yogurt Parfait", ingredients: ["yogurt", "granola", "fruits"], instructions: "Layer ingredients", prepTime: "5 minutes" },
          lunch: { name: "Veggie Wrap", ingredients: ["tortilla", "vegetables", "hummus"], instructions: "Wrap ingredients in tortilla", prepTime: "10 minutes" },
          dinner: { name: "Stir Fry", ingredients: ["vegetables", "rice"], instructions: "Stir fry vegetables, serve with rice", prepTime: "20 minutes" }
        },
        wednesday: {
          breakfast: { name: "Smoothie Bowl", ingredients: ["fruits", "yogurt", "granola"], instructions: "Blend fruits, top with granola", prepTime: "8 minutes" },
          lunch: { name: "Mediterranean Bowl", ingredients: ["quinoa", "vegetables", "feta"], instructions: "Combine ingredients", prepTime: "12 minutes" },
          dinner: { name: "Tacos", ingredients: ["tortillas", "beans", "vegetables"], instructions: "Assemble tacos", prepTime: "15 minutes" }
        }
      },
      shoppingList: {
        grains: ["oats", "quinoa", "pasta", "rice", "tortillas"],
        vegetables: ["mixed vegetables", "lettuce", "tomatoes"],
        proteins: isVegetarian ? ["beans", "tofu", "quinoa"] : ["chicken", "salmon", "beans"],
        dairy: ["yogurt", "milk", "cheese"],
        spices: ["herbs", "spices"],
        produce: ["berries", "fruits"],
        pantry: ["olive oil", "salt", "pepper"]
      },
      nutritionalSummary: {
        averageCaloriesPerDay: "1800-2000 calories",
        balanceNotes: `Balanced international meals for ${servings} people with variety and nutrition.`
      }
    };
  }
};

export const getRecipeSuggestions = async (ingredients, dietaryRestrictions = []) => {
  const prompt = `Suggest 3 quick and easy recipes using these ingredients: ${ingredients.join(', ')}
  
Dietary restrictions: ${dietaryRestrictions.join(', ') || 'None'}

Requirements:
- Use only the provided ingredients or common pantry items
- Respect dietary restrictions
- Provide simple cooking instructions
- Include prep time and difficulty level

FORMAT: Return ONLY valid JSON array:
[
  {
    "name": "",
    "ingredients": [],
    "instructions": "",
    "prepTime": "",
    "difficulty": "easy/medium/hard"
  }
]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful cooking assistant. Provide simple, practical recipes using available ingredients. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
    
  } catch (error) {
    console.error('Error getting recipe suggestions:', error);
    
    // Fallback recipes
    return [
      {
        name: "Simple Stir Fry",
        ingredients: ingredients.slice(0, 4),
        instructions: "Heat oil, add ingredients, stir fry for 5-7 minutes, season to taste.",
        prepTime: "10 minutes",
        difficulty: "easy"
      },
      {
        name: "Quick Salad",
        ingredients: ingredients.slice(0, 3),
        instructions: "Chop ingredients, mix together, add dressing of choice.",
        prepTime: "5 minutes",
        difficulty: "easy"
      }
    ];
  }
};