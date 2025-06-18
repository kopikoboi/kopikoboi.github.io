// Load data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const recipeList = document.getElementById('recipe-list');
        data.recipes.forEach(recipe => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.instructions}</p>`;
            recipeList.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading recipes:', error));

// Show add recipe form
function showRecipes() {
    const addRecipeDiv = document.getElementById('add-recipe');
    addRecipeDiv.style.display = addRecipeDiv.style.display === 'none' ? 'block' : 'none';
}

// Add new recipe (client-side only, stored in localStorage)
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

// Load recipes from localStorage on page load
window.onload = function() {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.instructions}</p>`;
        recipeList.appendChild(div);
    });
};
