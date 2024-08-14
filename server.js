import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const API_URL = "https://crop-api-3.onrender.com";
//https://crop-api-3.onrender.com


const port=8080;
const app=express();
 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


let isAuthenticated = false;

// Your login route
app.post('/', (req, res) => {
    
    const username = req.body.username; 
    const password = req.body.password;
    console.log(username);
    console.log(password);

    if(username === "farmer01@gmail.com" && password === "farmer01"){
      isAuthenticated=true;
      res.redirect("/");
    }   
    else{
      res.render("login.ejs");
    }
});

// Route to render the index page
app.get('/', (req, res) => {
    // Check if the user is authenticated
    if (isAuthenticated) {
        res.render('index.ejs');
    } else {
        // Redirect to the login page if not authenticated
        isAuthenticated = true;
        res.render('login.ejs'); // Assuming you have a login route
    }
});
app.get('/community', (req, res) => {
      res.render('community.ejs'); 
});
var response =[];
var type;
app.get("/:id", async (req, res) => {
  try {
    type=req.params.id;
    response = await axios.get(`${API_URL}/${req.params.id}`);
    res.render("name.ejs", {
      post: response.data,
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// category
app.get("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const response = await axios.get(`${API_URL}/${category}/${id}`);
    console.log(response.data);
    res.render("disease.ejs", {
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

//disease
// Define a single route with a category parameter
app.get("/:category/:disease/:id", async (req, res) => {
  try {
    const { category,disease, id } = req.params;
    const response = await axios.get(`${API_URL}/${category}/${disease}/${id}`);
    console.log(response.data);
    res.render("solution.ejs", {
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

