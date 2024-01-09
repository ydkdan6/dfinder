

function autoComplete() {
    const searchInput = document.getElementById('searchInput').value;
    const apiKey = 'cd9420f3eaec4fc8a7ee888431dbbee4';
    const apiUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchInput}&apiKey=${apiKey}`;

    showLoader();
    fetch (apiUrl)
        .then(response => response.json())
        .then(data => { displaySuggestions(data) 
        hideLoader();
        })
        .catch(error => { console.error('Errorfetching suggestions', error)
        hideLoader();
    });
}

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (suggestions.length === 0){
        suggestionsDiv.innerHTML = '<p>No suggestions found. </p>';
    } else {
        suggestions.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `<p>${suggestion.name}</p>`;
            suggestionDiv.addEventListener('click', () => {
                document.getElementById('searchInput').value = suggestion.name;
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(suggestionDiv);
        });
    }
}

function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value;
    const apiKey = 'cd9420f3eaec4fc8a7ee888431dbbee4';
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput}&number=5&apiKey=${apiKey}`;

    showLoader();
    fetch (apiUrl)
        .then(response => response.json())
        .then(data => { displayRecipes(data) 
        hideLoader();
        })
        .catch(error => {console.error('Error fetching Recipes', error)
    hideLoader();
    });
}

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (recipes.length === 0){
        resultsDiv.textContent = 'No recipes found.';
    } else {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            const recipeTitle = document.createElement('h3');
            const recipeImage = document.createElement('img');
            const missingIngredients = document.createElement('p');

            recipeTitle.textContent = recipe.title;
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            missingIngredients.textContent = `Missing Ingredients: ${recipe.missedIngredients.map(ingredient => ingredient.name).join(',')}`;

            recipeDiv.appendChild(recipeTitle);
            recipeDiv.appendChild(document.createElement('br'));
            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(document.createElement('br'));
            recipeDiv.appendChild(missingIngredients);

            resultsDiv.appendChild(recipeDiv);
        });
    }
}

function showLoader() {
    const loader = document.querySelector('.dot-spinner');
    loader.style.display = 'block';
  }
  
  function hideLoader() {
    const loader = document.querySelector('.dot-spinner');
    loader.style.display = 'none';
  }

  
function showContainer() {
    const container = document.querySelector('.container');
    container.style.display = 'block';
  }

  setTimeout(() => {
    hideLoader();
    showContainer();
  }, 10000);