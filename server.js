import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const API_URL = "https://crop-api-5ilz.onrender.com";


const port=3000;
const app=express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get("/",(req,res)=>{
    res.render("index.ejs");
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

