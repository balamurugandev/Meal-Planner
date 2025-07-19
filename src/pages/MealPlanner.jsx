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
    
    // Dietary restrictions
    const isVegetarian = dietaryRestrictions.includes('vegetarian');
    const isVegan = dietaryRestrictions.includes('vegan');
    const isGlutenFree = dietaryRestrictions.includes('gluten-free');
    const isDairyFree = dietaryRestrictions.includes('dairy-free');
    const isKeto = dietaryRestrictions.includes('keto');
    const isPaleo = dietaryRestrictions.includes('paleo');
    const isLowCarb = dietaryRestrictions.includes('low-carb');
    // Mediterranean is a cuisine, not a dietary restriction
    const isMediterraneanCuisine = selectedCuisines.includes('mediterranean');
    
    // Cuisine preferences
    const isSouthIndian = selectedCuisines.includes('south-indian');
    const isNorthIndian = selectedCuisines.includes('north-indian');
    const isGujarati = selectedCuisines.includes('gujarati');
    const isPunjabi = selectedCuisines.includes('punjabi');
    const isBengali = selectedCuisines.includes('bengali');
    const isItalian = selectedCuisines.includes('italian');
    const isChinese = selectedCuisines.includes('chinese');
    const isContinental = selectedCuisines.includes('continental');
    const isAmerican = selectedCuisines.includes('american');
    const isMexican = selectedCuisines.includes('mexican');
    const isAsian = selectedCuisines.includes('asian');
    const isThai = selectedCuisines.includes('thai');
    const isJapanese = selectedCuisines.includes('japanese');
    const isFrench = selectedCuisines.includes('french');
    
    // Helper function to get appropriate protein
    const getProtein = (defaultVeg, defaultNonVeg, ketoOption = null) => {
      if (isVegan) return defaultVeg.replace(/paneer|cheese|yogurt|ghee/gi, 'tofu').replace(/milk/gi, 'coconut milk');
      if (isVegetarian) return defaultVeg;
      if (isKeto && ketoOption) return ketoOption;
      return defaultNonVeg;
    };
    
    // Helper function to get appropriate grains
    const getGrain = (defaultGrain, glutenFreeOption = 'rice', lowCarbOption = 'cauliflower rice') => {
      if (isGlutenFree) return glutenFreeOption;
      if (isKeto || isLowCarb) return lowCarbOption;
      return defaultGrain;
    };
    
    // Helper function to get dairy alternatives
    const getDairy = (defaultDairy, dairyFreeOption = 'coconut milk') => {
      if (isVegan || isDairyFree) return dairyFreeOption;
      return defaultDairy;
    };

    let weekPlan = {};
    let shoppingList = {};
    let cuisineType = '';

    if (isIndian) {
      // INDIAN CUISINE COMBINATIONS
      if (isSouthIndian) {
        cuisineType = 'South Indian';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isGlutenFree ? "Rice Idli with Sambar" : "Idli with Sambar and Coconut Chutney", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Coconut Fish Curry (no rice)" : "Sambar Rice with Rasam",
                isKeto ? "Spicy Fish Curry with Coconut" : "Fish Curry with Rice"
              ), 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: isGlutenFree ? "Rice Dosa with Potato Curry" : "Dosa with Potato Curry", 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: isGlutenFree ? "Rice Upma with Coconut Chutney" : "Upma with Coconut Chutney", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Coconut Vegetable Curry" : "Curd Rice with Pickle",
                isKeto ? "Chicken Chettinad (no rice)" : "Chicken Chettinad with Rice"
              ), 
              prepTime: "30 minutes" 
            },
            dinner: { 
              name: "Uttapam with Sambar", 
              prepTime: "20 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Rava Dosa with Chutney", 
              prepTime: "18 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Vegetable Avial with Coconut" : "Vegetable Biryani",
                isKeto ? "Mutton Pepper Fry" : "Mutton Biryani"
              ), 
              prepTime: "45 minutes" 
            },
            dinner: { 
              name: "Appam with Vegetable Stew", 
              prepTime: "30 minutes" 
            }
          }
        };
        
        shoppingList = {
          grains: isGlutenFree ? ["rice", "rice flour"] : ["rice", "wheat flour", "semolina", "rava"],
          vegetables: ["onions", "tomatoes", "potatoes", "green chilies", "ginger", "garlic", "curry leaves", "coconut"],
          spices: ["turmeric", "cumin", "coriander", "mustard seeds", "hing", "black pepper", "cardamom"],
          proteins: getProtein(
            ["dal", "coconut", "vegetables"], 
            ["fish", "chicken", "mutton", "eggs"],
            ["fish", "chicken", "coconut"]
          ),
          dairy: getDairy(["yogurt", "buttermilk"], ["coconut milk", "coconut oil"])
        };
      }
      
      else if (isNorthIndian) {
        cuisineType = 'North Indian';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isGlutenFree ? "Poha with Vegetables" : getDairy("Aloo Paratha with Yogurt", "Aloo Paratha with Coconut Chutney"), 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Palak Paneer (no rice)" : "Dal Makhani with " + getGrain("Rice", "Rice", "Cauliflower Rice"),
                isKeto ? "Butter Chicken (no naan)" : "Butter Chicken with " + getGrain("Naan", "Rice Naan", "Lettuce Wraps")
              ), 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: getGrain("Roti", "Rice Roti", "Cauliflower Roti") + " with Palak Paneer", 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Poha with Tea", 
              prepTime: "12 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Rajma with " + getGrain("Rice", "Rice", "Cauliflower Rice"),
                "Chicken Curry with " + getGrain("Rice", "Rice", "Cauliflower Rice")
              ), 
              prepTime: "40 minutes" 
            },
            dinner: { 
              name: getGrain("Chapati", "Rice Chapati", "Lettuce Wraps") + " with Mixed Dal", 
              prepTime: "25 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: isGlutenFree ? "Stuffed Rice Paratha with Pickle" : "Stuffed Paratha with Pickle", 
              prepTime: "25 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Chole Masala (no bhature)" : "Chole Bhature",
                isKeto ? "Lamb Curry (no rice)" : "Lamb Curry with Rice"
              ), 
              prepTime: "45 minutes" 
            },
            dinner: { 
              name: "Khichdi with " + getDairy("Ghee", "Coconut Oil"), 
              prepTime: "20 minutes" 
            }
          }
        };
        
        shoppingList = {
          grains: isGlutenFree ? ["rice", "rice flour"] : ["wheat flour", "rice", "dal"],
          vegetables: ["onions", "tomatoes", "potatoes", "spinach", "green chilies", "ginger", "garlic"],
          spices: ["turmeric", "cumin", "coriander", "garam masala", "red chili powder", "hing"],
          proteins: getProtein(
            ["paneer", "dal", "chickpeas", "rajma"], 
            ["chicken", "lamb", "mutton"],
            ["paneer", "chicken", "lamb"]
          ),
          dairy: getDairy(["yogurt", "milk", "ghee", "butter"], ["coconut milk", "coconut oil"])
        };
      }
      
      else if (isPunjabi) {
        cuisineType = 'Punjabi';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isGlutenFree ? "Makki Roti with Sarson Saag" : "Aloo Paratha with Lassi", 
              prepTime: "25 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Dal Makhani with " + getGrain("Rice", "Rice", "Cauliflower Rice"),
                "Butter Chicken with " + getGrain("Naan", "Rice", "Lettuce Wraps")
              ), 
              prepTime: "40 minutes" 
            },
            dinner: { 
              name: getGrain("Roti", "Rice Roti", "Cauliflower Roti") + " with Rajma", 
              prepTime: "30 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Chole Kulche", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Palak Paneer with Rice",
                "Chicken Tikka Masala with Rice"
              ), 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: "Sarson Saag with Makki Roti", 
              prepTime: "35 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Puri with Aloo Sabzi", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Kadhi Pakora with Rice",
                "Lamb Curry with Rice"
              ), 
              prepTime: "45 minutes" 
            },
            dinner: { 
              name: "Kheer with Puri", 
              prepTime: "25 minutes" 
            }
          }
        };
      }
      
      else if (isGujarati) {
        cuisineType = 'Gujarati';
        weekPlan = {
          monday: {
            breakfast: { 
              name: "Dhokla with Green Chutney", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: "Gujarati Thali (Dal, Sabzi, " + getGrain("Roti", "Rice Roti", "Lettuce Wraps") + ")", 
              prepTime: "30 minutes" 
            },
            dinner: { 
              name: "Khichdi with Kadhi", 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: isKeto ? "Dhokla with Chutney" : "Fafda with Jalebi", 
              prepTime: "10 minutes" 
            },
            lunch: { 
              name: "Undhiyu with " + getGrain("Puri", "Rice Puri", "Vegetable Salad"), 
              prepTime: "40 minutes" 
            },
            dinner: { 
              name: getGrain("Rotli", "Rice Rotli", "Lettuce Wraps") + " with Shaak", 
              prepTime: "20 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Handvo with Chutney", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: "Dal Dhokli", 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: isKeto ? "Vegetable Curry" : "Kheer with Puri", 
              prepTime: "25 minutes" 
            }
          }
        };
      }
      
      else {
        // Default Indian with mixed cuisines
        cuisineType = 'Mixed Indian';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isVegan ? "Poha with Vegetables" : "Idli with Sambar", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Dal Rice with Sabzi",
                "Chicken Curry with Rice"
              ), 
              prepTime: "30 minutes" 
            },
            dinner: { 
              name: getGrain("Roti", "Rice", "Cauliflower Rice") + " with Dal and Vegetables", 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Upma with Coconut Chutney", 
              prepTime: "12 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Rajma Rice",
                "Fish Curry with Rice"
              ), 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: getGrain("Chapati", "Rice Chapati", "Lettuce Wraps") + " with Paneer Curry", 
              prepTime: "30 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Dosa with Sambar", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Chole with Rice",
                "Mutton Curry with Rice"
              ), 
              prepTime: "40 minutes" 
            },
            dinner: { 
              name: "Khichdi with " + getDairy("Yogurt", "Coconut Milk"), 
              prepTime: "20 minutes" 
            }
          }
        };
      }
      
      // Default Indian shopping list if not set above
      if (!shoppingList.grains) {
        shoppingList = {
          grains: isGlutenFree ? ["rice", "rice flour"] : ["rice", "wheat flour", "dal", "semolina"],
          vegetables: ["onions", "tomatoes", "potatoes", "green chilies", "ginger", "garlic", "curry leaves"],
          spices: ["turmeric", "cumin", "coriander", "garam masala", "mustard seeds", "hing"],
          proteins: getProtein(
            ["paneer", "dal", "chickpeas", "coconut"], 
            ["chicken", "fish", "mutton", "eggs"],
            ["paneer", "chicken", "fish"]
          ),
          dairy: getDairy(["yogurt", "milk", "ghee"], ["coconut milk", "coconut oil"])
        };
      }
    } 
    
    else {
      // USA/INTERNATIONAL CUISINE COMBINATIONS
      if (isItalian) {
        cuisineType = 'Italian';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isKeto ? "Italian Frittata" : "Cappuccino with Cornetto", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Caprese Salad with Mozzarella" : "Pasta Primavera",
                isKeto ? "Chicken Parmigiana (no pasta)" : "Chicken Alfredo Pasta"
              ), 
              prepTime: "25 minutes" 
            },
            dinner: { 
              name: getProtein(
                isKeto ? "Eggplant Parmigiana" : "Margherita Pizza",
                isKeto ? "Osso Buco" : "Spaghetti Bolognese"
              ), 
              prepTime: "35 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Italian Yogurt with Berries", 
              prepTime: "5 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Minestrone Soup",
                "Chicken Cacciatore"
              ), 
              prepTime: "30 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Risotto with Mushrooms",
                "Veal Marsala"
              ), 
              prepTime: "40 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Espresso with Biscotti", 
              prepTime: "5 minutes" 
            },
            lunch: { 
              name: "Caesar Salad with Parmesan", 
              prepTime: "10 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Pasta Arrabbiata",
                "Seafood Linguine"
              ), 
              prepTime: "25 minutes" 
            }
          }
        };
      }
      
      else if (isMexican) {
        cuisineType = 'Mexican';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isKeto ? "Mexican Scrambled Eggs" : "Huevos Rancheros", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Burrito Bowl (no rice)" : "Black Bean Burrito",
                isKeto ? "Chicken Fajita Bowl" : "Chicken Burrito"
              ), 
              prepTime: "20 minutes" 
            },
            dinner: { 
              name: getProtein(
                isKeto ? "Veggie Taco Salad" : "Vegetable Enchiladas",
                isKeto ? "Carne Asada Salad" : "Beef Tacos"
              ), 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Mexican Smoothie Bowl", 
              prepTime: "8 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Quinoa Stuffed Peppers",
                "Chicken Quesadilla"
              ), 
              prepTime: "25 minutes" 
            },
            dinner: { 
              name: "Chiles Rellenos", 
              prepTime: "30 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Chilaquiles", 
              prepTime: "20 minutes" 
            },
            lunch: { 
              name: "Pozole Soup", 
              prepTime: "35 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Vegetable Tamales",
                "Fish Tacos"
              ), 
              prepTime: "40 minutes" 
            }
          }
        };
      }
      
      else if (isAsian || isThai || isJapanese || isChinese) {
        cuisineType = isJapanese ? 'Japanese' : isThai ? 'Thai' : isChinese ? 'Chinese' : 'Asian';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isJapanese ? "Miso Soup with Rice" : isThai ? "Thai Coconut Porridge" : "Congee with Vegetables", 
              prepTime: "15 minutes" 
            },
            lunch: { 
              name: getProtein(
                isJapanese ? "Vegetable Sushi Bowl" : isThai ? "Pad Thai with Tofu" : "Vegetable Fried Rice",
                isJapanese ? "Chicken Teriyaki" : isThai ? "Thai Basil Chicken" : "Sweet and Sour Chicken"
              ), 
              prepTime: "25 minutes" 
            },
            dinner: { 
              name: getProtein(
                isJapanese ? "Vegetable Ramen" : isThai ? "Green Curry with Vegetables" : "Ma Po Tofu",
                isJapanese ? "Salmon Teriyaki" : isThai ? "Thai Fish Curry" : "Kung Pao Chicken"
              ), 
              prepTime: "30 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: isJapanese ? "Japanese Pancakes" : "Asian Smoothie Bowl", 
              prepTime: "12 minutes" 
            },
            lunch: { 
              name: getProtein(
                isJapanese ? "Vegetable Bento" : "Tofu Stir Fry",
                isJapanese ? "Chicken Katsu" : "Beef Stir Fry"
              ), 
              prepTime: "20 minutes" 
            },
            dinner: { 
              name: isJapanese ? "Miso Glazed Eggplant" : isThai ? "Tom Yum Soup" : "Hot Pot", 
              prepTime: "35 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Green Tea with Rice Cakes", 
              prepTime: "5 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Vegetable Spring Rolls",
                "Chicken Satay"
              ), 
              prepTime: "18 minutes" 
            },
            dinner: { 
              name: getProtein(
                isJapanese ? "Vegetable Tempura" : "Buddha's Delight",
                isJapanese ? "Beef Sukiyaki" : "Peking Duck"
              ), 
              prepTime: "40 minutes" 
            }
          }
        };
      }
      
      else if (isMediterraneanCuisine) {
        cuisineType = 'Mediterranean';
        weekPlan = {
          monday: {
            breakfast: { 
              name: "Greek Yogurt with Honey and Nuts", 
              prepTime: "5 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Mediterranean Quinoa Bowl",
                "Grilled Chicken Greek Salad"
              ), 
              prepTime: "15 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Stuffed Bell Peppers",
                "Grilled Fish with Lemon"
              ), 
              prepTime: "30 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: "Mediterranean Omelet", 
              prepTime: "10 minutes" 
            },
            lunch: { 
              name: "Hummus with Pita and Vegetables", 
              prepTime: "8 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Ratatouille",
                "Lamb Souvlaki"
              ), 
              prepTime: "35 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Feta and Spinach Scramble", 
              prepTime: "12 minutes" 
            },
            lunch: { 
              name: "Tabbouleh Salad", 
              prepTime: "10 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Vegetarian Moussaka",
                "Seafood Paella"
              ), 
              prepTime: "45 minutes" 
            }
          }
        };
      }
      
      else {
        // Default American/Continental
        cuisineType = 'American';
        weekPlan = {
          monday: {
            breakfast: { 
              name: isKeto ? "Keto Scrambled Eggs with Avocado" : isVegan ? "Oatmeal with Berries" : "Scrambled Eggs with Toast", 
              prepTime: "10 minutes" 
            },
            lunch: { 
              name: getProtein(
                isKeto ? "Quinoa Salad Bowl" : "Quinoa Buddha Bowl",
                isKeto ? "Grilled Chicken Salad" : "Grilled Chicken Salad"
              ), 
              prepTime: "15 minutes" 
            },
            dinner: { 
              name: getProtein(
                isKeto ? "Zucchini Noodles with Pesto" : "Pasta Primavera",
                isKeto ? "Baked Salmon with Asparagus" : "Baked Salmon with Sweet Potato"
              ), 
              prepTime: "25 minutes" 
            }
          },
          tuesday: {
            breakfast: { 
              name: isVegan ? "Chia Pudding" : getDairy("Greek Yogurt Parfait", "Coconut Yogurt Parfait"), 
              prepTime: "5 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Veggie Wrap",
                "Turkey Sandwich"
              ), 
              prepTime: "8 minutes" 
            },
            dinner: { 
              name: getProtein(
                "Vegetable Stir Fry",
                isKeto ? "Grilled Chicken with Broccoli" : "Grilled Chicken with Sweet Potato"
              ), 
              prepTime: "30 minutes" 
            }
          },
          wednesday: {
            breakfast: { 
              name: "Smoothie Bowl", 
              prepTime: "8 minutes" 
            },
            lunch: { 
              name: getProtein(
                "Mediterranean Bowl",
                "Chicken Caesar Salad"
              ), 
              prepTime: "12 minutes" 
            },
            dinner: { 
              name: getProtein(
                isKeto ? "Cauliflower Tacos" : "Black Bean Tacos",
                isKeto ? "Beef Stir Fry with Vegetables" : "Beef Stir Fry"
              ), 
              prepTime: "20 minutes" 
            }
          }
        };
      }
      
      // International shopping list
      shoppingList = {
        produce: isKeto ? 
          ["avocado", "leafy greens", "broccoli", "cauliflower", "zucchini", "bell peppers"] :
          ["berries", "bananas", "lettuce", "tomatoes", "sweet potato", "broccoli", "avocado"],
        proteins: getProtein(
          isKeto ? ["tofu", "nuts", "seeds", "avocado"] : ["quinoa", "black beans", "tofu", "nuts"],
          isKeto ? ["chicken", "salmon", "beef", "eggs"] : ["chicken breast", "salmon", "turkey", "beef"],
          ["chicken", "salmon", "beef", "eggs"]
        ),
        grains: isKeto ? 
          ["cauliflower rice", "zucchini noodles"] :
          isGlutenFree ? ["rice", "quinoa", "gluten-free oats"] :
          ["oats", "bread", "pasta", "rice", "quinoa"],
        dairy: getDairy(
          isKeto ? ["cheese", "heavy cream"] : ["Greek yogurt", "cheese", "milk"],
          isKeto ? ["coconut cream", "nutritional yeast"] : ["almond milk", "coconut yogurt", "nutritional yeast"]
        )
      };
    }

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
        balanceNotes: `Well-balanced ${cuisineType} meals${restrictionText}. Tailored for ${region} preferences with appropriate portion sizes for ${preferences.servings} ${preferences.servings === 1 ? 'person' : 'people'}.`
      }
    };
  };

  const handleGeneratePlan = () => {
    if (!canGenerateMealPlan()) {
      alert('You have reached your weekly limit. Upgrade to Premium for unlimited plans!');
      return;
    }

    setLoading(true);
    
    // Simulate loading for UI demo
    setTimeout(() => {
      const samplePlan = generateRegionalMealPlan();
      setMealPlan(samplePlan);
      incrementMealPlanUsage();
      setLoading(false);
    }, 2000);
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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