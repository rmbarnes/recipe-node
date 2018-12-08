const model = require('./model.js')

function renderLoginPage(req, res) {
    console.log("on the login page");
    res.render('pages/login');
}

//login the user
function login(req, response) {

    model.loginFromDB(req, response, function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {

            console.log(result[0].username);


            var success = {success: false};

            if (req.body.username == result[0].username && req.body.password == result[0].password)
            {
                req.session.user = req.body.username;
                return response.writeHead(302, {
                    'Location': '/'
                });
                response.end();
            }
            else {
                success = {success: false};
            }

        }
    });
}

//get All Recipes
function getAllRecipes(req, response) {

    model.getRecipesFromDB(function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {
            response.status(200).json(result);
        }
    });
}


// get user's recipes
function getUserRecipes(req, response) {
    var id = req.params.id;

    model.getUserRecipesFromDB(id, function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {
            response.status(200).json(result);
        }
    });
}

//post a new recipe
function postRecipe(req, response) {
    var userId = req.params.id;

    console.log("userId: " + userId);

    model.postRecipeToDB(userId, req, function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {
            response.status(200).json(result);
        }
    });
}

function updateRecipe(req, response) {
    var recipeId = req.params.id;
    console.log("recipeId: " + recipeId);

    model.updateRecipeToDB(recipeId, req, function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {
            response.status(200).json(result);
        }
    });
}

//delete recipe
function deleteRecipe(req, response) {
    var recipeId = req.params.id;

    model.deleteRecipeFromDB(recipeId, function(err, result) {
        if (err || result == null) {
            response.status(500).json({success: false, data: err});
        } else {
            response.status(200).json(result);
        }
    });
}


module.exports = {
    login: login,
    renderLoginPage: renderLoginPage,
    getAllRecipes: getAllRecipes,
    getUserRecipes: getUserRecipes,
    postRecipe: postRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe
};
