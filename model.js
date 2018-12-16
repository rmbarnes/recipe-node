const {Pool} = require('pg');
const bcrypt = require('bcrypt');

const connectionString = process.env.DATABASE_URL || `postgres://pamlygubwcrqjl:7bb1cc73a10b01a55e38d7eb1436b11ac7aec9272ba5ae23284e820c8d01a8c0@ec2-54-225-110-156.compute-1.amazonaws.com/d4mu70t11254se`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: true
});

function createAccountInDB(req, callback) {
    //first check if there is a user with that username
    var sql = "SELECT username FROM users WHERE username = $1";
    var username = req.body.newUsername;
    var password = req.body.newPassword;

    let hash = bcrypt.hashSync(password, 10);


    var firstParams = [username];

    pool.query(sql, firstParams, function (err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        } else {
            // more than one row??
            if (res.rows.length == 1 || username == res.rows.username) {
                callback(null, false);
            } else {
                // You're good! Insert the user into the db
                var sql = "INSERT INTO users(username, password, display_name) VALUES($1, $2, $3)";
                var params = [username, hash, req.body.displayName];

                pool.query(sql, params, function (err, res) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, res);
                    }
                });
            }
        }
    });

}

//Login
function loginFromDB(username, password, callback) {
    var sql = "SELECT id, username, password FROM users WHERE username = $1";

    var params = [username];

    pool.query(sql, params, function (err, res) {
        if (err) {
            console.log("error: " + err);
            callback(err, null);
        } else {

            // We got something back from the DB matching that username
            // check to see if it's just one row (0 means no username in db)
            // more than 1 is bad...
            if (res.rows.length != 1) {
                callback(null, false);
            } else {
                // verify the password on that row matches the one they
                // used
                var hash = res.rows[0].password;

                bcrypt.compare(password, hash, function(err, response) {
                    if(response) {
                        // Passwords match
                        callback(null, res.rows[0]);
                    } else {
                        // Passwords don't match
                        callback(null, false);
                    }
                });
            }
        }
    })
}

// GET all recipes from DB
function getRecipesFromDB(callback) {
    var sql = "SELECT id, recipe_name FROM recipe";

    pool.query(sql, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

// GET user's recipes from DB
function getUserRecipesFromDB(id, callback) {
    var sql = "SELECT id, recipe_name, ingredients FROM recipe WHERE user_id = $1::int";

    var params = [id];

    pool.query(sql, params, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

function postRecipeToDB(userId, req, callback) {
    var sql = "INSERT INTO recipe(user_id, recipe_name, ingredients, category) VALUES($1, $2, $3, $4)";

    var params = [userId, req.body.recipe_name, req.body.ingredients, req.body.category];

    pool.query(sql, params, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows[0]);
        }
    });
}


function updateRecipeToDB(recipeId, req, callback) {
    console.log("updating recipe: " + recipeId);

    var sql = "UPDATE recipe SET(recipe_name, ingredients) = ($2, $3) WHERE id = $1";

    var params = [recipeId, req.body.recipe_name, req.body.ingredients];

    pool.query(sql, params, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

function deleteRecipeFromDB(recipeId, callback) {
    console.log("deleting recipe: " + recipeId);

    var sql = "DELETE FROM recipe WHERE id = $1::int";

    var params = [recipeId];

    pool.query(sql, params, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

function getRecipeDetailsFromDB(id, callback) {
    console.log("getting recipe details for: " + id);

    var sql = "SELECT id, recipe_name, ingredients FROM recipe WHERE id = $1::int";

    var params = [id];

    pool.query(sql, params, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

module.exports = {
    createAccountInDB: createAccountInDB,
    loginFromDB: loginFromDB,
    getRecipesFromDB: getRecipesFromDB,
    getUserRecipesFromDB: getUserRecipesFromDB,
    postRecipeToDB: postRecipeToDB,
    updateRecipeToDB: updateRecipeToDB,
    deleteRecipeFromDB: deleteRecipeFromDB,
    getRecipeDetailsFromDB: getRecipeDetailsFromDB
};
