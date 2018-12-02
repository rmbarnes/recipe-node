'use strict';

function allRecipes() {
    let recipeDiv = document.getElementById('recipes'); // var results

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/browse');
    xhr.send();

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);

                console.log(results[0]);
                recipeDiv.innerHTML = "<ul class='list-group'>";
                results.map(recipe => {
                    recipeDiv.innerHTML += '<li class="list-group-item" style="display: flex; justify-content: space-between">' + recipe.recipe_name + '<button type="button" onclick="editRecipe(\'' + recipe.id + '\')" class="btn btn-success float-right">Edit</button></li></ul>';
                });
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

function userRecipes() {
    let userId = 2; //get this id somehow
    let recipeDiv = document.getElementById('recipes'); // var results

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/user-recipes/' + userId);
    xhr.send();

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);

                console.log(results[0]);

                recipeDiv.innerHTML = "<ul class='list-group'>";
                results.map(recipe => {
                    recipeDiv.innerHTML += '<li class="list-group-item" style="display: flex; justify-content: space-between">' + recipe.recipe_name + '<button type="button" onclick="editRecipe(\'' + recipe.id + '\')" class="btn btn-success">Edit</button></li></ul>';
                });
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

function addRecipe() {

    console.log("adding the recipe..");

    let recipeName = document.getElementById("recipeTitle").value;
    let ingredients = document.getElementById('ingredients').value;

    console.log('Recipe Name: ' + recipeName);
    console.log('ingredients: ' + ingredients);
    let recipeDiv = document.getElementById('added-recipe').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user-recipes/2', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("recipe_name=" + recipeName + "&ingredients=" + ingredients);

    //    xhr.onreadystatechange = function() {
    //        let DONE = 4;
    //        let OK = 200;
    //        if (xhr.readyState === DONE) {
    //            if (xhr.status === OK) {
    //                var results = JSON.parse(xhr.responseText);
    //
    //                console.log("result? " + JSON.parse(xhr.responseText));
    //
    //                recipeDiv.innerHTML = "<ul>";
    //                results.Search.map(movie => {
    //                    recipeDiv.innerHTML += '<li>' + movie.Title;
    //
    //                    recipeDiv.innerHTML += '<button type="button" onclick="getMovie(\'' + movie.imdbID + '\')">View Details</button></li>';
    //                });
    //                recipeDiv.innerHTML += "</ul>";
    //            } else {
    //                console.log('Error: ' + xhr.status);
    //            }
    //        }
    //    };
}
