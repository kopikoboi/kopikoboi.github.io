// Load initial data from data.json
let initialRecipes = [];
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        initialRecipes = data.recipes;
        loadRecipes();
    })
    .catch(error => console.error('Error loading recipes:', error));

// Load recipes from localStorage or initial data
function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing recipes
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    (recipes.length > 0 ? recipes : initialRecipes).forEach(recipe => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.instructions}</p>`;
        recipeList.appendChild(div);
    });
}

// Show add recipe form
function showRecipes() {
    const addRecipeDiv = document.getElementById('add-recipe');
    addRecipeDiv.style.display = addRecipeDiv.style.display === 'none' ? 'block' : 'none';
}

// Add new recipe and store in localStorage
function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const instructions = document.getElementById('recipe-instructions').value;
    if (name && instructions) {
        const recipe = { name, instructions };
        let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        const recipeList = document.getElementById('recipe-list');
        const div = document.createElement('div');
        div.innerHTML = `<h3>${name}</h3><p>${instructions}</p>`;
        recipeList.appendChild(div);

        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-instructions').value = '';
    }
}

// Reset recipes to initial state from data.json
function resetRecipes() {
    if (confirm('Apakah Anda yakin ingin mengatur ulang semua resep?')) {
        localStorage.removeItem('recipes'); // Hapus data localStorage
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = ''; // Hapus tampilan resep
        initialRecipes.forEach(recipe => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.instructions}</p>`;
            recipeList.appendChild(div);
        });
    }
}

// Load recipes on page load
window.onload = loadRecipes;
