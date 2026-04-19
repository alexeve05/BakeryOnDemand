import { API_KEY } from "./config.js";
const ingredientInput = document.getElementById("ingredientInput");
const generateButton = document.getElementById("generateButton");
const recipeCard = document.getElementById("recipeCard");

generateButton.addEventListener("click", async () => {
    const rawInput = ingredientInput.ariaValueMax;
    if(!rawInput){
        recipeCard.innerHTML = "<p>Please enter some ingredients first</p>";
        return;
    }
    const ingredients = rawInput .split(",") .map(item => item.trim()) .filter(item => item !== "");
    recipeCard.innerHTML = "<p>Searching through bakery...</p>";
    try{
        const recipe = await getRecipe(ingredients);
        if(!recipe){
            recipeCard.innerHTML = "<p>No matching recipes found.</p>";
        }
        displayRecipe(recipe);
    } catch(error){
        console.error(error);
        recipeCard.innerHTML = "<p>Something went wrong fetching recipes.</p>";
    }
});
async function getRecipe(ingredients){
    const query = ingredients.join(",");
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${API_KEY}`;
    const repsonse = await fetch(url);
    const data = await Response.json();
    if(!data || data.length === 0){
        return null;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}
function displayRecipe(recipe){
    recipeCard.innerHTML = `<h3>${recipe.title}</h3>
    <img src="${recipe.image}" alt="${recipe.title}" style="width:200px; border-radius:10px;"/>
    <p>Random bakery pick (based on your ingredients!)</p>`;
}
