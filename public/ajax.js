'use strict';
//const bcrypt = require('bcrypt');

function loginPage() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/login', true);
    xhr.send();
}

function clientLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + username + "&password=" + password);

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log("HELLO!! " + xhr)

            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };

}

function allRecipes() {
    let recipeDiv = document.getElementById('recipes'); // var results

    let detailDiv = document.getElementById('details'); // var results
    detailDiv.style.display = "none";

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
                    recipeDiv.innerHTML += '<li class="list-group-item">' + recipe.recipe_name + '<button type="button" onclick="viewDetails(this.id)" class="btn btn-primary" id="' + recipe.id + '">Details</button></li></ul>';
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
                    recipeDiv.innerHTML += '<li class="list-group-item">' + recipe.recipe_name + '<div class="buttons"><button type="button" onclick="viewDetails(this.id)" class="btn btn-primary" id="' + recipe.id + '">Details</button><button type="button" onclick="openEditRecipe(this.id)" class="btn btn-success" id="' + recipe.id + '">Edit</button><button type="button" onclick="deleteRecipe(this.id)" class="btn btn-danger" id="' + recipe.id + '">Delete</button></div></li></ul>';
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
    let recipeDiv = document.getElementById('recipes');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/user-recipes/2', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send("recipe_name=" + recipeName + "&ingredients=" + ingredients);

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);

                console.log("result: " + results);
                userRecipes();

            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

function openEditRecipe(id) {
    console.log("editing recipe: " + id);
    let detailDiv = document.getElementById('details'); // var results
    detailDiv.style.display = "block"; // show the detail div
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/recipe-details/' + id);
    xhr.send();

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);
                console.log(results[0]);

                results.map(recipe => {
                    detailDiv.innerHTML = "<div class='form-row'><div class='form-group'><label for='newRecipeTitle'>Recipe Name: </label><input type='text' class='form-control' id='newRecipeTitle' name='newRecipeTitle' value='"+ recipe.recipe_name + "'></div></div><div class='form-row'><div class='form-group'><label for='newIngredients'>Ingredients: </label><textarea class='form-control' id='newIngredients' name='newIngredients' rows='6' placeholder=''>" + recipe.ingredients + "</textarea></div></div><button class='btn btn-success' onclick='editRecipe("+recipe.id+")'>Save</button>";
                });

            }
        }
    }

}

function editRecipe(id) {
    let detailDiv = document.getElementById('details'); // the div for the form

    let recipeName = document.getElementById("newRecipeTitle").value;
    let ingredients = document.getElementById('newIngredients').value;

//    let detailDiv = document.getElementById('details'); // var results

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/user-recipes/' + id);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("recipe_name=" + recipeName + "&ingredients=" + ingredients);

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);
                console.log(results[0]);
                userRecipes();
                details.style.display = "none"; // hide the form again

            }
        }
    }
}

function deleteRecipe(id) {
    console.log("deleting the recipe..");

    let recipeId = id;
    let recipeDiv = document.getElementById('recipes'); // var results

    console.log('Recipe ID: ' + recipeId);

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/user-recipes/' + recipeId, true);

    xhr.send(null);

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);

                console.log("deleted recipe with id: " + recipeId);
                userRecipes();

            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
}

function viewDetails(id) {
    let detailDiv = document.getElementById('details'); // var results
    detailDiv.style.display = "block"; // show the detail div

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/recipe-details/' + id);
    xhr.send();

    xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var results = JSON.parse(xhr.responseText);
                console.log(results[0]);

                results.map(recipe => {
                    detailDiv.innerHTML = "<div class='list-group details'><h4 class='list-group-item-heading'>"+ recipe.recipe_name + "</h4><div class='list-group-item-text'>" + recipe.ingredients + "</div></div>";
                });

            }
        }
    }
}
