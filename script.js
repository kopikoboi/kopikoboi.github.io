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
    .catch(error => console.error('Error:', error));
