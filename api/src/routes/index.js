const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const getAllDogs = require("../controllers/getAllDogs");
const getApiInfo = require("../controllers/getApiInfo")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res, next) => {
  const { name } = req.query;
  try {
    let allDogs = await getAllDogs();

    if (name) {
      let dogName = await allDogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res
            .status(404)
            .send(`Sorry, we don´t have a dog with ${name} as Name 🤷‍♀️`);
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/dogs/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let allDogs = await getAllDogs();

    if (id) {
      let dogId = await allDogs.filter((el) => el.id == id);
      dogId.length
        ? res.status(200).json(dogId)
        : res
            .status(404)
            .send(`Sorry, we don´t have a race with ${id} as ID 🤷‍♀️`);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/dog", async (req, res) => {
  let { name, image, weightMin, weightMax, heightMin, heightMax, life_span, temperaments, createdInDb } =
    req.body;

  let dogCreate = await Dog.create({
    name,
    image,
    weightMax,
    weightMin,
    heightMin,
    heightMax,
    life_span: life_span + " " + "years",
    createdInDb,
  });
  let temperamentDb = await Temperament.findAll({
    where: { name: temperaments },
  });
  dogCreate.addTemperament(temperamentDb);
  res.status(200).send("🐕 Race created successfully 🐶");
});

router.get("/temperament", async (req, res, next) => {
  try {
    const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogsDb = dogsApi.data
      .map((elem) => elem.temperament)
      .join()
      .split(",");
    const dogsDbTrim = dogsDb.map((elem) => elem.trim());

    dogsDbTrim.forEach((elem) => {
      if (elem !== "") {
        Temperament.findOrCreate({
          where: {
            name: elem,
          },
        });
      }
    });

    const allTemperaments = await Temperament.findAll({
      order: [["name", "ASC"]],
    });

    return res.status(200).send(allTemperaments);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
