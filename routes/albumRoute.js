const albumRoute = require("express").Router();
const albumModel = require("../models/albumModel");

//register

albumRoute.post("/", async (req, res) => {
  const { authorization } = req.headers;
  // console.log({
  //   name: req.query.name,
  //   description: req.query.description,
  //   year: req.query.year,
  //   file: req.body.file,
  // });
  try {
    if (authorization === process.env.AUTH) {
      //create new album
      const newAlbum = new albumModel({
        name: req.query.name,
        description: req.query.description,
        year: req.query.year,
        file: req.body.file,
      });

      //save user to database and response
      const album = await newAlbum.save();
      res.status(200).json(album);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

albumRoute.get("/", (req, res) => {
  res.send("I am from album route");
});

// //login
// albumRoute.post("/login", async (req, res) => {
//   try {
//     const user = await albumModel.findOne({
//       email: req.body.email,
//     });
//     !user && res.status(404).send("User Not Found");
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     !validPassword && res.status(400).send("Password is incorrect");
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).json(error);
//   }
// });

module.exports = albumRoute;
