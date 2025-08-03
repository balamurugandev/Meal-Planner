import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { ChefHat, ShoppingCart, Clock, Users, DollarSign } from 'lucide-react';

const MealPlanner = () => {
  const { user } = useAuth();
  const { userProfile, canGenerateMealPlan, incrementMealPlanUsage, isPremium } = useUser();
  const { config, region } = useSettings();
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: userProfile?.dietary_restrictions || [],
    allergies: userProfile?.allergies || [],
    budget: userProfile?.budget_level || 'medium',
    servings: userProfile?.household_size || 2,
    cuisinePreferences: userProfile?.cuisine_preferences || [],
    dislikes: []
  });

  const dietaryOptions = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb'
  ];

  // Use region-specific cuisines
  const cuisineOptions = config.cuisines;

  const handlePreferenceChange = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const generateRegionalMealPlan = () => {
    const isIndian = region === 'India';
    const selectedCuisines = preferences.cuisinePreferences;
    const dietaryRestrictions = preferences.dietaryRestrictions;
    
    // Parse dietary restrictions
    const isVegetarian = dietaryRestrictions.includes('vegetarian');
    const isVegan = dietaryRestrictions.includes('vegan');
    const isGlutenFree = dietaryRestrictions.includes('gluten-free');
    const isDairyFree = dietaryRestrictions.includes('dairy-free');
    const isKeto = dietaryRestrictions.includes('keto');
    const isPaleo = dietaryRestrictions.includes('paleo');
    const isLowCarb = dietaryRestrictions.includes('low-carb');
    
    // Parse cuisines
    const isSouthIndian = selectedCuisines.includes('south-indian');
    const isNorthIndian = selectedCuisines.includes('north-indian');
    const isGujarati = selectedCuisines.includes('gujarati');
    const isPunjabi = selectedCuisines.includes('punjabi');
    const isMediterranean = selectedCuisines.includes('mediterranean');
    const isItalian = selectedCuisines.includes('italian');
    const isMexican = selectedCuisines.includes('mexican');
    const isAsian = selectedCuisines.includes('asian') || selectedCuisines.includes('chinese') || selectedCuisines.includes('thai') || selectedCuisines.includes('japanese');
    
    // COMPREHENSIVE SMART SUBSTITUTION SYSTEM
    const getProtein = (vegOption, nonVegOption, ketoVegOption = null, ketoNonVegOption = null) => {
      if (isVegan) {
        return vegOption
          .replace(/paneer|cheese|yogurt|ghee|butter/gi, 'tofu')
          .replace(/milk/gi, 'coconut milk')
          .replace(/egg/gi, 'chickpea flour');
      }
      if (isVegetarian) {
        if (isKeto && ketoVegOption) return ketoVegOption;
        return vegOption;
      }
      if (isKeto && ketoNonVegOption) return ketoNonVegOption;
      return nonVegOption;
    };
    
    const getGrain = (defaultGrain, glutenFreeAlt = 'rice', lowCarbAlt = 'cauliflower rice') => {
      if (isKeto || isLowCarb) return lowCarbAlt;
      if (isGlutenFree) return glutenFreeAlt;
      if (isPaleo) return 'sweet potato';
      return defaultGrain;
    };
    
    const getDairy = (defaultDairy, altOption = 'coconut milk') => {
      if (isVegan || isDairyFree) return altOption;
      return defaultDairy;
    };
    
    const getBread = (defaultBread) => {
      if (isKeto || isLowCarb) return 'lettuce wraps';
      if (isGlutenFree) return 'rice bread';
      if (isPaleo) return 'sweet potato slices';
      return defaultBread;
    };
    
    const getSpice = (defaultSpice, paleoAlt = 'herbs') => {
      if (isPaleo) return paleoAlt;
      return defaultSpice;
    };

    let weekPlan = {};
    let cuisineType = '';
    
    // Generate meal plans based on region and cuisine
    if (isIndian) {
      if (isSouthIndian) {
        cuisineType = 'South Indian';
        weekPlan = {
          monday: {
            breakfast: { name: isGlutenFree ? "Rice Idli with Sambar" : "Idli with Sambar", prepTime: "20 minutes" },
            lunch: { name: getProtein("Sambar Rice with Rasam", "Fish Curry with " + getGrain("Rice")), prepTime: "35 minutes" },
            dinner: { name: "Dosa with Potato Curry", prepTime: "25 minutes" }
          },
          tuesday: {
            breakfast: { name: "Upma with Coconut Chutney", prepTime: "15 minutes" },
            lunch: { name: getProtein("Curd Rice with Pickle", "Chicken Chettinad with " + getGrain("Rice")), prepTime: "30 minutes" },
            dinner: { name: "Uttapam with Sambar", prepTime: "20 minutes" }
          },
          wednesday: {
            breakfast: { name: "Rava Dosa with Chutney", prepTime: "18 minutes" },
            lunch: { name: getProtein("Vegetable Biryani", "Mutton Biryani"), prepTime: "45 minutes" },
            dinner: { name: "Appam with Vegetable Stew", prepTime: "30 minutes" }
          }
        };
      } else if (isNorthIndian) {
        cuisineType = 'North Indian';
        weekPlan = {
          monday: {
            breakfast: { name: getDairy("Aloo Paratha with Yogurt"), prepTime: "25 minutes" },
            lunch: { name: getProtein("Dal Makhani with " + getGrain("Rice"), "Butter Chicken with Naan"), prepTime: "40 minutes" },
            dinner: { name: "Roti with Palak Paneer", prepTime: "30 minutes" }
          },
          tuesday: {
            breakfast: { name: "Poha with Tea", prepTime: "12 minutes" },
            lunch: { name: getProtein("Rajma with " + getGrain("Rice"), "Chicken Curry with " + getGrain("Rice")), prepTime: "45 minutes" },
            dinner: { name: "Chapati with Mixed Dal", prepTime: "25 minutes" }
          },
          wednesday: {
            breakfast: { name: "Stuffed Paratha with Pickle", prepTime: "30 minutes" },
            lunch: { name: getProtein("Chole Bhature", "Lamb Curry with " + getGrain("Rice")), prepTime: "50 minutes" },
            dinner: { name: "Khichdi with " + getDairy("Ghee"), prepTime: "20 minutes" }
          }
        };
      } else if (isPunjabi) {
        cuisineType = 'Punjabi';
        weekPlan = {
          monday: {
            breakfast: { name: "Makki Roti with Sarson Saag", prepTime: "30 minutes" },
            lunch: { name: getProtein("Dal Makhani with " + getGrain("Rice"), "Butter Chicken with Naan"), prepTime: "45 minutes" },
            dinner: { name: "Roti with Rajma", prepTime: "35 minutes" }
          },
          tuesday: {
            breakfast: { name: "Chole Kulche", prepTime: "25 minutes" },
            lunch: { name: getProtein("Palak Paneer with " + getGrain("Rice"), "Chicken Tikka Masala"), prepTime: "40 minutes" },
            dinner: { name: "Sarson Saag with Makki Roti", prepTime: "40 minutes" }
          },
          wednesday: {
            breakfast: { name: "Puri with Aloo Sabzi", prepTime: "20 minutes" },
            lunch: { name: getProtein("Kadhi Pakora", "Lamb Curry"), prepTime: "50 minutes" },
            dinner: { name: getDairy("Kheer with Puri"), prepTime: "30 minutes" }
          }
        };
      } else if (isGujarati) {
        cuisineType = 'Gujarati';
        weekPlan = {
          monday: {
            breakfast: { name: "Dhokla with Green Chutney", prepTime: "20 minutes" },
            lunch: { name: "Gujarati Thali (Dal, Sabzi, Roti)", prepTime: "35 minutes" },
            dinner: { name: "Khichdi with Kadhi", prepTime: "30 minutes" }
          },
          tuesday: {
            breakfast: { name: isKeto ? "Dhokla with Chutney" : "Fafda with Jalebi", prepTime: "15 minutes" },
            lunch: { name: "Undhiyu with Puri", prepTime: "45 minutes" },
            dinner: { name: "Rotli with Shaak", prepTime: "25 minutes" }
          },
          wednesday: {
            breakfast: { name: "Handvo with Chutney", prepTime: "25 minutes" },
            lunch: { name: "Dal Dhokli", prepTime: "40 minutes" },
            dinner: { name: isKeto ? "Vegetable Curry" : "Kheer with Puri", prepTime: "30 minutes" }
          }
        };
      } else {
        // Default Indian
        cuisineType = 'Mixed Indian';
        weekPlan = {
          monday: {
            breakfast: { name: "Idli with Sambar", prepTime: "15 minutes" },
            lunch: { name: getProtein("Dal Rice with Sabzi", "Chicken Curry with " + getGrain("Rice")), prepTime: "30 minutes" },
            dinner: { name: getGrain("Roti") + " with Dal and Vegetables", prepTime: "25 minutes" }
          },
          tuesday: {
            breakfast: { name: "Upma with Coconut Chutney", prepTime: "12 minutes" },
            lunch: { name: getProtein("Rajma " + getGrain("Rice"), "Fish Curry with " + getGrain("Rice")), prepTime: "35 minutes" },
            dinner: { name: "Chapati with Paneer Curry", prepTime: "30 minutes" }
          },
          wednesday: {
            breakfast: { name: "Dosa with Sambar", prepTime: "20 minutes" },
            lunch: { name: getProtein("Chole with " + getGrain("Rice"), "Mutton Curry with " + getGrain("Rice")), prepTime: "40 minutes" },
            dinner: { name: "Khichdi with " + getDairy("Yogurt"), prepTime: "20 minutes" }
          }
        };
      }
    } else {
      // International cuisines
      if (isMediterranean) {
        cuisineType = 'Mediterranean';
        weekPlan = {
          monday: {
            breakfast: { name: getDairy("Greek Yogurt with Honey and Nuts"), prepTime: "5 minutes" },
            lunch: { name: getProtein("Mediterranean Quinoa Bowl", "Grilled Chicken Greek Salad"), prepTime: "15 minutes" },
            dinner: { name: getProtein("Stuffed Bell Peppers", "Grilled Fish with Lemon"), prepTime: "35 minutes" }
          },
          tuesday: {
            breakfast: { name: "Mediterranean Omelet", prepTime: "12 minutes" },
            lunch: { name: "Hummus with Pita and Vegetables", prepTime: "8 minutes" },
            dinner: { name: getProtein("Ratatouille", "Lamb Souvlaki"), prepTime: "40 minutes" }
          },
          wednesday: {
            breakfast: { name: getDairy("Feta and Spinach Scramble"), prepTime: "15 minutes" },
            lunch: { name: "Tabbouleh Salad", prepTime: "10 minutes" },
            dinner: { name: getProtein("Vegetarian Moussaka", "Seafood Paella"), prepTime: "50 minutes" }
          }
        };
      } else if (isItalian) {
        cuisineType = 'Italian';
        weekPlan = {
          monday: {
            breakfast: { name: "Cappuccino with Cornetto", prepTime: "10 minutes" },
            lunch: { name: getProtein(getGrain("Pasta Primavera"), "Chicken Alfredo"), prepTime: "25 minutes" },
            dinner: { name: getProtein("Margherita Pizza", "Spaghetti Bolognese"), prepTime: "35 minutes" }
          },
          tuesday: {
            breakfast: { name: getDairy("Italian Yogurt with Berries"), prepTime: "5 minutes" },
            lunch: { name: getProtein("Minestrone Soup", "Chicken Cacciatore"), prepTime: "30 minutes" },
            dinner: { name: getProtein("Risotto with Mushrooms", "Veal Marsala"), prepTime: "40 minutes" }
          },
          wednesday: {
            breakfast: { name: "Espresso with Biscotti", prepTime: "5 minutes" },
            lunch: { name: getDairy("Caesar Salad with Parmesan"), prepTime: "10 minutes" },
            dinner: { name: getProtein("Pasta Arrabbiata", "Seafood Linguine"), prepTime: "30 minutes" }
          }
        };
      } else if (isMexican) {
        cuisineType = 'Mexican';
        weekPlan = {
          monday: {
            breakfast: { name: isKeto ? "Mexican Scrambled Eggs" : "Huevos Rancheros", prepTime: "15 minutes" },
            lunch: { name: getProtein("Black Bean Burrito", "Chicken Burrito"), prepTime: "20 minutes" },
            dinner: { name: getProtein("Vegetable Enchiladas", "Beef Tacos"), prepTime: "30 minutes" }
          },
          tuesday: {
            breakfast: { name: "Mexican Smoothie Bowl", prepTime: "8 minutes" },
            lunch: { name: getProtein("Quinoa Stuffed Peppers", "Chicken Quesadilla"), prepTime: "25 minutes" },
            dinner: { name: "Chiles Rellenos", prepTime: "35 minutes" }
          },
          wednesday: {
            breakfast: { name: "Chilaquiles", prepTime: "20 minutes" },
            lunch: { name: "Pozole Soup", prepTime: "40 minutes" },
            dinner: { name: getProtein("Vegetable Tamales", "Fish Tacos"), prepTime: "45 minutes" }
          }
        };
      } else if (isAsian) {
        cuisineType = 'Asian';
        weekPlan = {
          monday: {
            breakfast: { name: "Congee with Vegetables", prepTime: "15 minutes" },
            lunch: { name: getProtein("Vegetable Fried " + getGrain("Rice"), "Sweet and Sour Chicken"), prepTime: "25 minutes" },
            dinner: { name: getProtein("Ma Po Tofu", "Kung Pao Chicken"), prepTime: "30 minutes" }
          },
          tuesday: {
            breakfast: { name: "Asian Smoothie Bowl", prepTime: "12 minutes" },
            lunch: { name: getProtein("Tofu Stir Fry", "Beef Stir Fry"), prepTime: "20 minutes" },
            dinner: { name: "Hot Pot", prepTime: "35 minutes" }
          },
          wednesday: {
            breakfast: { name: "Green Tea with Rice Cakes", prepTime: "5 minutes" },
            lunch: { name: getProtein("Vegetable Spring Rolls", "Chicken Satay"), prepTime: "18 minutes" },
            dinner: { name: getProtein("Buddha's Delight", "Peking Duck"), prepTime: "40 minutes" }
          }
        };
      } else {
        // Default American
        cuisineType = 'American';
        weekPlan = {
          monday: {
            breakfast: { name: isVegan ? "Oatmeal with Berries" : "Scrambled Eggs with Toast", prepTime: "10 minutes" },
            lunch: { name: getProtein("Quinoa Buddha Bowl", "Grilled Chicken Salad"), prepTime: "15 minutes" },
            dinner: { name: getProtein(getGrain("Pasta Primavera"), "Baked Salmon with Sweet Potato"), prepTime: "30 minutes" }
          },
          tuesday: {
            breakfast: { name: getDairy("Greek Yogurt Parfait"), prepTime: "5 minutes" },
            lunch: { name: getProtein("Veggie Wrap", "Turkey Sandwich"), prepTime: "8 minutes" },
            dinner: { name: getProtein("Vegetable Stir Fry", "Grilled Chicken with Sweet Potato"), prepTime: "25 minutes" }
          },
          wednesday: {
            breakfast: { name: "Smoothie Bowl", prepTime: "8 minutes" },
            lunch: { name: getProtein("Mediterranean Bowl", "Chicken Caesar Salad"), prepTime: "12 minutes" },
            dinner: { name: getProtein("Black Bean Tacos", "Beef Stir Fry"), prepTime: "20 minutes" }
          }
        };
      }
    }

    // COMPREHENSIVE SHOPPING LIST GENERATION
    const generateAdvancedShoppingList = () => {
      const baseList = {
        grains: [],
        vegetables: [],
        proteins: [],
        dairy: [],
        spices: [],
        produce: [],
        pantry: [],
        oils: []
      };
      
      if (isIndian) {
        // Indian-specific ingredients
        baseList.grains = isKeto ? 
          ['cauliflower rice', 'almond flour', 'coconut flour'] : 
          isGlutenFree ? 
            ['rice', 'rice flour', 'quinoa', 'millet'] : 
            ['rice', 'wheat flour', 'dal (lentils)', 'semolina', 'besan'];
            
        baseList.vegetables = [
          'onions', 'tomatoes', 'green chilies', 'ginger', 'garlic', 
          'curry leaves', 'coriander leaves', 'mint leaves',
          ...(isSouthIndian ? ['coconut', 'drumsticks', 'okra'] : []),
          ...(isNorthIndian ? ['spinach', 'cauliflower', 'peas'] : []),
          ...(isPunjabi ? ['mustard greens', 'radish', 'turnip'] : []),
          ...(isGujarati ? ['bottle gourd', 'bitter gourd', 'fenugreek leaves'] : [])
        ];
        
        baseList.spices = [
          'turmeric', 'cumin seeds', 'coriander seeds', 'mustard seeds',
          'fenugreek seeds', 'cardamom', 'cinnamon', 'cloves',
          'red chili powder', 'garam masala', 'hing (asafoetida)',
          ...(isSouthIndian ? ['curry powder', 'sambar powder', 'rasam powder'] : []),
          ...(isNorthIndian ? ['kasoori methi', 'amchur', 'chaat masala'] : []),
          ...(isPunjabi ? ['black cardamom', 'bay leaves', 'fennel seeds'] : [])
        ];
        
        baseList.proteins = isVegetarian ? 
          ['paneer', 'tofu', 'dal varieties', 'chickpeas', 'rajma', 'chana dal'] :
          ['chicken', 'fish', 'mutton', 'eggs', 'paneer', 'dal varieties'];
          
        baseList.dairy = isVegan || isDairyFree ? 
          ['coconut milk', 'coconut oil', 'cashew cream'] :
          ['yogurt', 'milk', 'ghee', 'butter', 'cream'];
          
        baseList.oils = ['mustard oil', 'coconut oil', 'sesame oil'];
        
      } else {
        // International ingredients
        baseList.produce = isKeto ? 
          ['avocado', 'leafy greens', 'broccoli', 'cauliflower', 'zucchini', 'bell peppers', 'asparagus'] :
          ['berries', 'bananas', 'apples', 'lettuce', 'tomatoes', 'cucumbers', 'carrots'];
          
        baseList.grains = isKeto ? 
          ['cauliflower rice', 'zucchini noodles', 'shirataki noodles'] :
          isGlutenFree ? 
            ['rice', 'quinoa', 'gluten-free oats', 'rice pasta'] :
            ['oats', 'bread', 'pasta', 'rice', 'quinoa'];
            
        baseList.proteins = isVegetarian ?
          (isKeto ? ['tofu', 'tempeh', 'nuts', 'seeds', 'cheese'] : ['tofu', 'beans', 'lentils', 'quinoa', 'nuts']) :
          (isKeto ? ['chicken', 'salmon', 'beef', 'eggs', 'cheese'] : ['chicken breast', 'salmon', 'turkey', 'beef', 'eggs']);
          
        baseList.dairy = isVegan || isDairyFree ?
          (isKeto ? ['coconut cream', 'almond milk', 'nutritional yeast'] : ['almond milk', 'coconut yogurt', 'cashew cheese']) :
          (isKeto ? ['heavy cream', 'cheese', 'butter'] : ['Greek yogurt', 'milk', 'cheese']);
          
        baseList.spices = isMediterranean ? 
          ['oregano', 'basil', 'thyme', 'rosemary', 'olive oil', 'lemon'] :
          isItalian ?
            ['basil', 'oregano', 'garlic', 'parmesan', 'olive oil'] :
            isMexican ?
              ['cumin', 'chili powder', 'paprika', 'lime', 'cilantro'] :
              ['black pepper', 'salt', 'garlic powder', 'herbs'];
              
        baseList.oils = ['olive oil', 'avocado oil', 'coconut oil'];
      }
      
      // Add paleo-specific items
      if (isPaleo) {
        baseList.pantry = ['coconut flour', 'almond flour', 'honey', 'coconut aminos'];
        baseList.proteins = baseList.proteins.filter(p => !p.includes('bean') && !p.includes('lentil'));
      }
      
      // Add keto-specific items
      if (isKeto) {
        baseList.pantry = [...(baseList.pantry || []), 'MCT oil', 'stevia', 'erythritol', 'psyllium husk'];
        baseList.dairy = [...baseList.dairy, 'heavy cream', 'cream cheese'];
      }
      
      return baseList;
    };

    const shoppingList = generateAdvancedShoppingList();

    // Generate dietary restriction summary
    const restrictionSummary = [];
    if (isVegan) restrictionSummary.push('vegan');
    else if (isVegetarian) restrictionSummary.push('vegetarian');
    if (isGlutenFree) restrictionSummary.push('gluten-free');
    if (isDairyFree) restrictionSummary.push('dairy-free');
    if (isKeto) restrictionSummary.push('keto');
    if (isPaleo) restrictionSummary.push('paleo');
    if (isLowCarb) restrictionSummary.push('low-carb');

    const restrictionText = restrictionSummary.length > 0 ? 
      ` following ${restrictionSummary.join(', ')} dietary guidelines` : '';

    return {
      weekPlan,
      shoppingList,
      nutritionalSummary: {
        averageCaloriesPerDay: isKeto ? "1600-1800 calories" : "1800-2000 calories",
        balanceNotes: `Well-balanced ${cuisineType} meals${restrictionText}. Optimized for ${region} preferences with ${preferences.servings} ${preferences.servings === 1 ? 'person' : 'people'}.`
      }
    };
  };

  const handleGeneratePlan = async () => {
    if (!canGenerateMealPlan()) {
      alert('You have reached your weekly limit. Upgrade to Premium for unlimited plans!');
      return;
    }

    setLoading(true);
    
    try {
      console.log('🚀 Starting meal plan generation...');
      
      // Use local generation (no AI for now)
      console.log('📝 Using local meal plan generation...');
      const generatedPlan = generateRegionalMealPlan();
      console.log('✅ Local meal plan generated successfully');
      
      // Save meal plan to database
      if (user) {
        try {
          console.log('💾 Saving meal plan to database...');
          const { saveMealPlan } = await import('../lib/supabase');
          const { error: saveError } = await saveMealPlan(user.id, generatedPlan, preferences);
          
          if (saveError) {
            console.error('❌ Error saving meal plan:', saveError);
            // Don't fail the whole process if save fails
            console.log('⚠️ Continuing without saving to database');
          } else {
            console.log('✅ Meal plan saved to database');
          }
        } catch (saveError) {
          console.error('❌ Exception saving meal plan:', saveError);
          console.log('⚠️ Continuing without saving to database');
        }
      }
      
      // Update UI and usage count
      setMealPlan(generatedPlan);
      await incrementMealPlanUsage();
      
      console.log('🎉 Meal plan generation completed successfully');
      
    } catch (error) {
      console.error('❌ Error generating meal plan:', error);
      alert('Failed to generate meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMealPlan = () => {
    if (!mealPlan?.weekPlan) return null;

    const days = Object.keys(mealPlan.weekPlan);
    
    return (
      <div className="space-y-8">
        {/* Meal Plan Grid */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-6">Your Weekly Meal Plan</h3>
          <div className="grid gap-6">
            {days.map(day => (
              <div key={day} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-lg text-primary mb-4 capitalize">
                  {day}
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {['breakfast', 'lunch', 'dinner'].map(meal => (
                    <div key={meal} className="space-y-2">
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 capitalize">{meal}</h5>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {mealPlan.weekPlan[day][meal]?.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <Clock size={12} className="inline mr-1" />
                          {mealPlan.weekPlan[day][meal]?.prepTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping List */}
        {mealPlan.shoppingList && (
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
              <ShoppingCart className="mr-2" />
              Shopping List
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(mealPlan.shoppingList).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 capitalize">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutritional Summary */}
        {mealPlan.nutritionalSummary && (
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-4">Nutritional Summary</h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Average Calories per Day:</strong> {mealPlan.nutritionalSummary.averageCaloriesPerDay}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <strong>Balance Notes:</strong> {mealPlan.nutritionalSummary.balanceNotes}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center">
              <ChefHat className="mr-2" />
              Yummurai Meal Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Generate personalized meal plans for {region} • {config.currency} pricing
            </p>
          </div>
          
          {!isPremium && (
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Plans used this week: {userProfile?.meal_plans_used_this_week || 0}/3
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Free tier</p>
            </div>
          )}
        </div>
      </div>

      {/* Preferences Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-primary mb-6">Meal Preferences</h2>
        
        <div className="space-y-6">
          {/* Basic Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Number of Servings
              </label>
              <select
                value={preferences.servings}
                onChange={(e) => setPreferences(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                className="input-field"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Budget Level
              </label>
              <select
                value={preferences.budget}
                onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                className="input-field"
              >
                <option value="low">Budget-friendly ({config.pricing.budgetLevels.low})</option>
                <option value="medium">Moderate ({config.pricing.budgetLevels.medium})</option>
                <option value="high">Premium ({config.pricing.budgetLevels.high})</option>
              </select>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Dietary Restrictions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {dietaryOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.dietaryRestrictions.includes(option)}
                    onChange={() => handlePreferenceChange('dietaryRestrictions', option)}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Cuisine Preferences ({region} focused)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cuisineOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.cuisinePreferences.includes(option)}
                    onChange={() => handlePreferenceChange('cuisinePreferences', option)}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <button
              onClick={handleGeneratePlan}
              disabled={loading || !canGenerateMealPlan()}
              className="btn-primary w-full md:w-auto"
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
            
            {!canGenerateMealPlan() && !isPremium && (
              <p className="text-sm text-red-600 mt-2">
                Weekly limit reached. Upgrade to Premium for unlimited plans!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Generated Meal Plan */}
      {mealPlan && renderMealPlan()}
    </div>
  );
};

export default MealPlanner;