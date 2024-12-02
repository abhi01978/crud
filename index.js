const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const user = require('./models/user');
const { name } = require('ejs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// const userModel = require('./usermodel');

// app.get('/', (req, res) => {
//     res.send("hey");

// }) 


// app.get('/create', async (req, res) => {
//   let createuser = await userModel.create({
//         name: "abhishek",
//         email: "abhi@gmail.com",
//         username: "rahul",
//     })
//     res.send(createuser);
// }) 



// app.get('/update', async (req, res) => {
//     let updatedusre = await userModel.findOneAndUpdate({username: "abhi"}, {name: "laddo"}, {new: true})

//     res.send(updatedusre);
//   }) 

    ///USER FIND//
// app.get("/read",  async (req, res) =>{
//    let usres = await userModel.findOne({name: "abhishek"});
//    res.send(usres);

// })

  //END//

// app.get("/delete",  async (req, res) =>{
//     let usres = await userModel.findOneAndDelete({username: "abhi"});
//     res.send(usres);
 
//  })


app.get('/', (req, res) =>{
    res.render("index");
})



app.get("/search", function (req, res) {

  res.render("search");
});

// app.get("/save/:postid",  async function (req, res) {
//   let user = await userModel.findOne({ username: req.session.passport.user });

//   if (user.saved.indexOf(req.params.postid) === -1) {
//     user.saved.push(req.params.postid);
//   } else {
//     var index = user.saved.indexOf(req.params.postid);
//     user.saved.splice(index, 1);
//   }
//   await user.save();
//   res.json(user);
// });

app.get("/search/:user", async function (req, res) {
  const searchTerm = `^${req.params.user}`;
  const regex = new RegExp(searchTerm);

  let users = await userModel.find();

  res.json(users);
});

app.get('/read', async (req, res) =>{
  let users = await userModel.find()
    res.render("read", {users});
})


app.get('/edit/:userid', async (req, res) =>{
    let users = await  userModel.findOne({_id: req.params.userid})
    res.render("edit", {users});
  })
  

app.post('/update/:userid', async (req, res) =>{
    let {image, name, email} = req.body;

    let users = await  userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new: true})
    res.redirect("/read");


  })  

app.get('/delete/:id', async (req, res) =>{
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
  })



app.post('/create', async (req, res) =>{
    let {name, email, image} = req.body;
  let createuser =  await userModel.create({
        name,
        email,
        image,
    })
    res.redirect("/read");

})



app.listen(3000);