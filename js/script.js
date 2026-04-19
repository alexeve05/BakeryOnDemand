import { API_KEY } from "./config.js";
const ingredientInput = document.getElementById("ingredientInput");
const generateButton = document.getElementById("generateButton");
const recipeCard = document.getElementById("recipeCard");
const ingredientList = document.getElementById("ingredientList");
const addIngredientButton = document.getElementById("addIngredientButton");
const vinylButton = document.getElementById("vinylButton");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;
let ingredients = [];
ingredientInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        addIngredientButton.click();
    }
});
generateButton.addEventListener("click", async () => {
    if(ingredients.length === 0){
        recipeCard.innerHTML = "<p>Add some ingredients first</p>";
        return;
    }
    recipeCard.innerHTML = "<p>Searching bakery...</p>";
    const recipe = await getRecipe(ingredients);
    if(!recipe){
        recipeCard.innerHTML = "<p>No recipes found...</p>";
        return;
    }
    displayRecipe(recipe);
});
async function getRecipe(ingredients){
    const query = ingredients.join(",");
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
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
addIngredientButton.addEventListener("click", () => {
    const value = ingredientInput.value.trim();
    if(!value){
        return;
    }
    ingredients.push(value);
    ingredientInput.value = "";
    renderIngredients();
});
function renderIngredients(){
    ingredientList.innerHTML = "";
    ingredients.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.addEventListener("click", () => {
            ingredients.splice(index, 1);
            renderIngredients();
        });
        li.appendChild(removeButton);
        ingredientList.appendChild(li);
    });
}
vinylButton.addEventListener("click", () => {
    if(!isPlaying){
        bgMusic.play();
        vinylButton.classList.add("spin");
    } else {
        bgMusic.pause();
        vinylButton.classList.remove("spin");
    }
    isPlaying = !isPlaying;
});