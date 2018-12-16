const model = require('./model.js')

function createAccount(req, response) {

    model.createAccountInDB(req, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            if (result == false) {
                response.redirect('/login?e=' + 'err');
            }
            else {
                successStatus = {success: true};
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            }
        }
    });
}

//login the user
function login(req, response) {
    var username = req.body.username;
    var password = req.body.password;
    var successStatus = {success: false};

    model.loginFromDB(username, password, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            if (result == false) {
                response.redirect('/login?e=' + 'err');
            }
            else {
                req.session.user = result.username;
                req.session.userId = result.id;
                console.log('session user: ' + req.session.user);
                successStatus = {success: true};
                response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            }
        }
    });
}

//middleware function to verify login
function verifyLogin(req, response, next) {
    if (req.session.user) {
        next();
    }
    else {
        var result = {success: false};
        response.redirect('/login');
    }
}

// handle logout functionality
function logout(req, response) {
    if (req.session.user) {

        req.session.destroy();
        //navigate to login page
        response.writeHead(302, {
            'Location': '/login'
        });
        response.end();
    }
}

//get All Recipes
function getAllRecipes(req, response) {

    model.getRecipesFromDB(function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}


// get user's recipes
function getUserRecipes(req, response) {
    var id = req.session.userId;

    model.getUserRecipesFromDB(id, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}

//post a new recipe
function postRecipe(req, response) {
    var userId = req.session.userId;

    model.postRecipeToDB(userId, req, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}

function updateRecipe(req, response) {
    var recipeId = req.params.id;

    model.updateRecipeToDB(recipeId, req, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}

//delete recipe
function deleteRecipe(req, response) {
    var recipeId = req.params.id;

    model.deleteRecipeFromDB(recipeId, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}

function getRecipeDetails(req, response) {
    var id = req.params.id;

    model.getRecipeDetailsFromDB(id, function (err, result) {
        if (err || result == null) {
            response.status(500).json({
                success: false,
                data: err
            });
        } else {
            response.status(200).json(result);
        }
    });
}

module.exports = {
    createAccount: createAccount,
    login: login,
    logout: logout,
    verifyLogin: verifyLogin,
    getAllRecipes: getAllRecipes,
    getUserRecipes: getUserRecipes,
    postRecipe: postRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
    getRecipeDetails: getRecipeDetails
};
