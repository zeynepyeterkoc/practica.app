document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipesList = document.getElementById('recipesList');
    const recipeIdInput = document.getElementById('recipeId');
    const favoritesList = document.getElementById('favoritesList');
    const showFavoritesButton = document.getElementById('showFavorites');
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderRecipes() {
        recipesList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.dataset.id = recipe.id;

            const recipeName = document.createElement('h2');
            recipeName.innerText = recipe.name;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.innerText = `Ingrediente: ${recipe.ingredients}`;

            const recipeDetails = document.createElement('p');
            recipeDetails.innerText = recipe.details;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;

            const actionButtonsDiv = document.createElement('div');
            actionButtonsDiv.classList.add('action-buttons');

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Șterge';
            deleteButton.onclick = () => deleteRecipe(recipe.id);

            const editButton = document.createElement('button');
            editButton.innerText = 'Editează';
            editButton.classList.add('edit');
            editButton.onclick = () => editRecipe(recipe.id);

            const favoriteButton = document.createElement('button');
            favoriteButton.innerHTML = '❤'; /* Inimă */
            favoriteButton.classList.add('favorite');
            favoriteButton.onclick = () => addToFavorites(recipe.id);

            actionButtonsDiv.appendChild(editButton);
            actionButtonsDiv.appendChild(favoriteButton);
            actionButtonsDiv.appendChild(deleteButton);

            recipeDiv.appendChild(recipeName);
            recipeDiv.appendChild(recipeIngredients);
            recipeDiv.appendChild(recipeDetails);
            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(actionButtonsDiv);

            recipesList.appendChild(recipeDiv);
        });
    }

    function renderFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.dataset.id = recipe.id;

            const recipeName = document.createElement('h2');
            recipeName.innerText = recipe.name;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.innerText = `Ingrediente: ${recipe.ingredients}`;

            const recipeDetails = document.createElement('p');
            recipeDetails.innerText = recipe.details;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;

            const removeFavoriteButton = document.createElement('button');
            removeFavoriteButton.innerHTML = '💔'; /* Inimă ruptă */
            removeFavoriteButton.classList.add('remove-favorite');
            removeFavoriteButton.onclick = () => deleteFavorite(recipe.id);

            recipeDiv.appendChild(recipeName);
            recipeDiv.appendChild(recipeIngredients);
            recipeDiv.appendChild(recipeDetails);
            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(removeFavoriteButton);

            favoritesList.appendChild(recipeDiv);
        });
    }

    function addRecipe(name, ingredients, details, image) {
        const id = recipeIdInput.value ? parseInt(recipeIdInput.value) : new Date().getTime();
        const newRecipe = { id, name, ingredients, details, image };

        if (recipeIdInput.value) {
            recipes = recipes.map(recipe => recipe.id === id ? newRecipe : recipe);
        } else {
            recipes.push(newRecipe);
        }

        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
        recipeForm.reset();
        recipeIdInput.value = '';
    }

    function deleteRecipe(id) {
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
    }

    function editRecipe(id) {
        const recipe = recipes.find(recipe => recipe.id === id);
        recipeIdInput.value = recipe.id;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeIngredients').value = recipe.ingredients;
        document.getElementById('recipeDetails').value = recipe.details;
        document.getElementById('recipeImage').value = ''; // Resmi düzenlemek için eklemek gerekebilir
    }

    function addToFavorites(id) {
        const recipe = recipes.find(recipe => recipe.id === id);
        if (!favorites.some(favorite => favorite.id === id)) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    function deleteFavorite(id) {
        favorites = favorites.filter(recipe => recipe.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }

    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const recipeName = document.getElementById('recipeName').value;
        const recipeIngredients = document.getElementById('recipeIngredients').value;
        const recipeDetails = document.getElementById('recipeDetails').value;
        const recipeImage = document.getElementById('recipeImage').files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            addRecipe(recipeName, recipeIngredients, recipeDetails, e.target.result);
        };

        if (recipeImage) {
            reader.readAsDataURL(recipeImage);
        }
    });

    showFavoritesButton.addEventListener('click', () => {
        if (favoritesList.style.display === 'none') {
            renderFavorites();
            favoritesList.style.display = 'block';
            showFavoritesButton.innerText = 'Ascunde Favoritele';
        } else {
            favoritesList.style.display = 'none';
            showFavoritesButton.innerText = 'Vezi Favorite';
        }
    });

    renderRecipes();
});

