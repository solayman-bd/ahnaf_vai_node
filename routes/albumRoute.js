const albumRoute = require("express").Router();
const albumModel = require("../models/albumModel");
const { responseGenerator } = require("../utils");

//post
//demo url:http://localhost:8800/album?name=solayman2&description=hi&year=2022
albumRoute.post("/", async (req, res) => {
  const { authorization } = req.headers;
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
      res.status(200).json(responseGenerator(album, 200, ""));
    } else {
      res
        .status(401)
        .json(responseGenerator(null, 401, "Unauthorized Request"));
    }
  } catch (err) {
    res.status(500).json(responseGenerator(null, 500, err.message));
  }
});
//get
//demo url:http://localhost:8800/album/61938345bafa2eb01dfb4cecw
albumRoute.get("/:id", async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization === process.env.AUTH) {
      //find album
      const album = await albumModel.findById(req.params.id);

      //sending response
      res.status(200).json(responseGenerator(album, 200, ""));
    } else {
      res
        .status(401)
        .json(responseGenerator(null, 401, "Unauthorized Request"));
    }
  } catch (err) {
    res.status(500).json(responseGenerator(null, 500, err.message));
  }
});

//put
//demo url: http://localhost:8800/album/619382e4bafa2eb01dfb4ce6?name=rahim&description=updated
albumRoute.put("/:id", async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization === process.env.AUTH) {
      const updatedData = {
        name: req.query.name,
        description: req.query.description,
        year: req.query.year,
        file: req.body.file,
      };
      const updatedAlbum = await albumModel.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.status(200).json(responseGenerator(updatedAlbum, 200, "Updated"));
    } else {
      res
        .status(401)
        .json(responseGenerator(null, 401, "Unauthorized Request"));
    }
  } catch (err) {
    res.status(500).json(responseGenerator(null, 500, err.message));
  }
});
//delete
//demo url:http://localhost:8800/album/61938345bafa2eb01dfb4cecw
albumRoute.delete("/:id", async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (authorization === process.env.AUTH) {
      //find and delte album
      const album = await albumModel.findByIdAndDelete(req.params.id);

      //sending response
      res.status(200).json(responseGenerator(album, 200, "Deleted"));
    } else {
      res
        .status(401)
        .json(responseGenerator(null, 401, "Unauthorized Request"));
    }
  } catch (err) {
    res.status(500).json(responseGenerator(null, 500, err.message));
  }
});

module.exports = albumRoute;
