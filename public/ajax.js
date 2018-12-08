'use strict';
//const bcrypt = require('bcrypt');

function clientLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=" + username + "&password=" + password);
}

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
                    recipeDiv.innerHTML += '<li class="list-group-item">' + recipe.recipe_name + '</li></ul>';
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
                    recipeDiv.innerHTML += '<li class="list-group-item">' + recipe.recipe_name + '<button type="button" onclick="editRecipe(this.id)" class="btn btn-success" id="' + recipe.id + '">Edit</button><button type="button" onclick="deleteRecipe(this.id)" class="btn btn-danger" id="' + recipe.id + '">Delete</button></li></ul>';
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
