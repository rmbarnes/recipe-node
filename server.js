const express = require('express');
const app = express();
const controller = require('./controller.js');
const path = require('path');
const session = require('express-session');

const PORT = process.env.PORT || 5000;


app.use(express.json()) //supports json encoded bodies
    .use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'coolcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}));

app.use(express.static(path.join(__dirname, "/public/")))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'));

app.get("/login", (req, res) => res.render('pages/login'));
app.post("/login", controller.login);
//app.post("/logout", logout);
app.get("/browse", controller.getAllRecipes);
app.get("/user-recipes/:id", controller.getUserRecipes);
app.get("/recipe-details/:id", controller.getRecipeDetails);
app.post("/user-recipes/:id", controller.postRecipe);
app.put("/user-recipes/:id", controller.updateRecipe);
app.delete("/user-recipes/:id", controller.deleteRecipe);


app.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
});
