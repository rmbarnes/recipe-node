const {Pool} = require('pg');

const connectionString = process.env.DATABASE_URL || `postgres://pamlygubwcrqjl:7bb1cc73a10b01a55e38d7eb1436b11ac7aec9272ba5ae23284e820c8d01a8c0@ec2-54-225-110-156.compute-1.amazonaws.com/d4mu70t11254se`;

const pool = new Pool({ connectionString: connectionString, ssl: true });

// GET all recipes from DB
function getRecipesFromDB(callback) {
    console.log("getting recipes from db");

    var sql = "SELECT recipe_name FROM recipe";

    pool.query(sql, function(err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        }
        else {
            console.log(JSON.stringify(res.rows));
            callback(null, res.rows);
        }
    });
}

// GET user's recipes from DB
function getUserRecipesFromDB(id, callback) {
    console.log("getting user " + id + " list of recipes");

    var sql = "SELECT id, recipe_name, ingredients FROM recipe WHERE user_id = $1::int";

    var params = [id];

    pool.query(sql, params, function(err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        }
        else {
            console.log("result: " + res);
            console.log("error: " + err);
            callback(null, res.rows);
        }
    });
}

function postRecipeToDB(userId, req, callback) {
    console.log("posting recipe for user: " + userId);

    var sql = "INSERT INTO recipe(user_id, recipe_name, ingredients, category) VALUES($1, $2, $3, $4)";

    var params = [userId, req.body.recipe_name, req.body.ingredients, req.body.category];

    pool.query(sql, params, function(err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        }
        else {
            console.log("result: " + res);
            console.log(JSON.stringify(res.rows));
            callback(null, res.rows);
        }
    });
}


function updateRecipeToDB(recipeId, req, callback) {
    console.log("updating recipe: " + recipeId);

    var sql = "UPDATE recipe SET(recipe_name, ingredients, category) = ($2, $3, $4) WHERE id = $1";

    var params = [recipeId, req.body.recipe_name, req.body.ingredients, req.body.category];

    pool.query(sql, params, function(err, res) {
        console.log("res: " + res);
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        }
        else {
            console.log("result: " + res);
            console.log(JSON.stringify(res.rows));
            callback(null, res.rows);
        }
    });
}

function deleteRecipeFromDB(recipeId, callback) {
    console.log("deleting recipe: " + recipeId);

    var sql = "DELETE FROM recipe WHERE id = $1::int";

    var params = [recipeId];

    pool.query(sql, params, function(err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        }
        else {
            console.log("result: " + res);
            console.log(JSON.stringify(res.rows));
            callback(null, res.rows);
        }
    });
}

module.exports = {
    getRecipesFromDB: getRecipesFromDB,
    getUserRecipesFromDB: getUserRecipesFromDB,
    postRecipeToDB: postRecipeToDB,
    updateRecipeToDB: updateRecipeToDB,
    deleteRecipeFromDB: deleteRecipeFromDB
};
