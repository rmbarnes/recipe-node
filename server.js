const express = require('express');
const app = express();
const {Pool} = require('pg');
const controller = require('./controller.js');


const PORT = process.env.PORT || 5000;

const connectionString = process.env.DATABASE_URL || `postgres://pamlygubwcrqjl:7bb1cc73a10b01a55e38d7eb1436b11ac7aec9272ba5ae23284e820c8d01a8c0@ec2-54-225-110-156.compute-1.amazonaws.com/d4mu70t11254se`;

const pool = new Pool({ connectionString: connectionString, ssl: true });

app.use(express.json()) //supports json encoded bodies
    .use(express.urlencoded({extended:true}));

app.user(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'));

app.get("/browse", controller.getAllRecipes);
app.get("/user-recipes/:id", controller.getUserRecipes);
app.post("/user-recipes/:id", controller.postRecipe);
app.put("/user-recipe/:id", controller.updateRecipe);
app.delete("/user-recipe/:id", controller.deleteRecipe);


app.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
});



//post the new meal plan
//function postMealPlan(req, response) {
//    var userId = req.query.id;
//
//    postPlanToDB(userId, function(err, result) {
//        if (err || result == null) {
//            response.status(500).json({success: false, data: err});
//        } else {
//            response.status(200).json(result);
//        }
//    });
//}
//
//function postPlanToDB(userId, callback) {
//    console.log("posting meal plan for user: " + userId);
//
//    // FIRST post to the meal plan table
//    var sql = "INSERT INTO meal_plan(user_id, start_date, end_date) VALUES($1, $2, $3)";
//
//    var params = [userId, req.body.start_date, req.body.end_date];
//
//    pool.query(sql, params, function(err, res) {
//        if (err) {
//            console.log("error: " + err);
//            callback(err, null);
//        }
//        else {
//            console.log("result: " + res);
//            console.log(JSON.stringify(res.rows));
//            callback(null, res.rows);
//        }
//    });
//
//    // THEN post to the meal plan recipe table
//
//    // GET THE Last inserted id from the meal plan
//    var planId = something;
//    for
//        var sql2 = "INSERT INTO public.meal_plan_recipe(meal_plan_id, recipe_id)";
//
//    var params = [userId, req.body.start_date, req.body.end_date];
//
//    pool.query(sql2, params, function(err, res) {
//        if (err) {
//            console.log("error: " + err);
//            callback(err, null);
//        }
//        else {
//            console.log("result: " + res);
//            console.log(JSON.stringify(res.rows));
//            callback(null, res.rows);
//        }
//    });
//}


//$query = $db->prepare("INSERT INTO public.meal_plan(user_id, start_date, end_date)
//                      VALUES (:userId, :start, :end)");
//
//$query->bindValue(':userId', $userId, PDO::PARAM_INT);
//$query->bindValue(':start', $start, PDO::PARAM_STR);
//$query->bindValue(':end', $end, PDO::PARAM_STR);
//
//$query->execute();
//
//$planId = $db->lastInsertId("meal_plan_id_seq");
//
//foreach ($recipes as $recipeId)
//{
//    $secondQuery = $db->prepare("INSERT INTO public.meal_plan_recipe(meal_plan_id, recipe_id)
//                                VALUES (:mealPlanId, :recipeId)");
//
//    $secondQuery->bindValue(':mealPlanId', $planId, PDO::PARAM_INT);
//    $secondQuery->bindValue(':recipeId', $recipeId, PDO::PARAM_INT);
//
//    $secondQuery->execute();
//}
