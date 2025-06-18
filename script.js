// Load initial data from data.json
let initialRecipes = [];
let roasterInfo = {};
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        initialRecipes = data.recipes;
        roasterInfo = data.roasterInfo;
        loadRecipes();
        displayRoasterInfo();
    })
    .catch(error => console.error('Error loading data:', error));

// Load recipes from localStorage or initial data
function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing recipes
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const displayRecipes = recipes.length > 0 ? recipes : initialRecipes;

    displayRecipes.forEach(recipe => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Bahan:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instruksi:</strong> ${recipe.instructions}</p>
        `;
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
    const ingredients = document.getElementById('recipe-instructions').value.split(',').map(item => item.trim()); // Misalnya input dipisah dengan koma
    const instructions = document.getElementById('recipe-instructions').value.split('\n')[0]; // Ambil baris pertama sebagai instruksi
    if (name && instructions && ingredients.length > 0) {
        const recipe = { name, ingredients, instructions };
        let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        const recipeList = document.getElementById('recipe-list');
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Bahan:</strong> ${ingredients.join(', ')}</p>
            <p><strong>Instruksi:</strong> ${instructions}</p>
        `;
        recipeList.appendChild(div);

        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-instructions').value = '';
    } else {
        alert('Mohon isi nama, bahan (pisah dengan koma), dan instruksi!');
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
            div.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Bahan:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Instruksi:</strong> ${recipe.instructions}</p>
            `;
            recipeList.appendChild(div);
        });
    }
}

// Display roaster information
function displayRoasterInfo() {
    const footer = document.querySelector('footer');
    const roasterDiv = document.createElement('div');
    roasterDiv.innerHTML = `
        <p><strong>Roaster:</strong> ${roasterInfo.name}</p>
        <p><strong>Lokasi:</strong> ${roasterInfo.location}</p>
        <p><strong>Sejak:</strong> ${roasterInfo.since}</p>
    `;
    footer.insertBefore(roasterDiv, footer.firstChild);
}

// Load recipes on page load
window.onload = function() {
    loadRecipes();
};
