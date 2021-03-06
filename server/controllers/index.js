// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const Cat = models.Cat.CatModel;
const Dog = models.Dog.DogModel;

// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

let lastAdded = new Cat(defaultData);

const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastAdded.name,
    title: 'Home Page',
    pageName: 'Home Page',
  });
};

const readAllCats = (req, res, callback) => {
  Cat.find(callback).lean();
};

const readCat = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'A name is required' });
  }

  const name1 = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(doc);
  };

  return Cat.findByName(name1, callback);
};

const hostPage1 = (req, res) => {
  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.render('page1', {
      title: 'All Cats',
      cats: doc,
    });
  };

  readAllCats(req, res, callback);
};

const hostPage2 = (req, res) => {
  res.render('page2', { title: 'Add Cat' });
};

const hostPage3 = (req, res) => {
  res.render('page3', { title: 'Add Dog' });
};

const getName = (req, res) => {
  res.json({ name: lastAdded.name });
};

const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
  }

  const name = `${req.body.firstname} ${req.body.lastname}`;

  const catData = {
    name,
    bedsOwned: req.body.beds,
  };

  const newCat = new Cat(catData);

  const savePromise = newCat.save();

  savePromise.then(() => {
    lastAdded = newCat;
    return res.json({
      name: lastAdded.name,
      beds: lastAdded.bedsOwned,
    });
  });

  return savePromise.catch((err) => res.status(500).json({ err }));
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Cat.findByName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (!doc) {
      return res.status(404).json({ error: 'No Cats Found' });
    }

    return res.json({
      name: doc.name,
      beds: doc.bedsOwned,
    });
  });
};

const updateLast = (req, res) => {
  lastAdded.bedsOwned++;

  const savePromise = lastAdded.save();

  savePromise.then(() => res.json({
    name: lastAdded.name,
    beds: lastAdded.bedsOwned,
  }));

  savePromise.catch((err) => res.status(500).json({ err }));
};

const defaultDogData = {
  name: 'unknown',
  breed: 'dog',
  age: 0,
};

let lastAddedDog = new Dog(defaultDogData);

const readAllDogs = (req, res, callback) => {
  Dog.find(callback).lean();
};

const readDog = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'A name is required' });
  }

  const name1 = req.query.name;

  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(doc);
  };

  return Dog.findDogByName(name1, callback);
};

const getDogName = (req, res) => {
  res.json({ name: lastAddedDog.name });
};

const setDogName = (req, res) => {
  if (!req.body.name || !req.body.breed || !req.body.age) {
    return res.status(400).json({ error: 'name, breed, and age are all required' });
  }

  const { name } = req.body;
  const { breed } = req.body;

  const dogData = {
    name,
    breed,
    age: req.body.age,
  };

  const newDog = new Dog(dogData);

  const savePromise = newDog.save();

  savePromise.then(() => {
    lastAddedDog = newDog;
    return res.json({
      name: lastAddedDog.name,
      breed: lastAddedDog.breed,
      age: lastAddedDog.age,
    });
  });

  return savePromise.catch((err) => res.status(500).json({ err }));
};

const searchDogName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  return Dog.findDogByName(req.query.name, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    if (!doc) {
      return res.status(404).json({ error: 'No Dogs Found' });
    }

    return res.json({
      name: doc.name,
      breed: doc.breed,
      age: doc.age,
    });
  });
};

const updateLastDog = (req, res) => {
  lastAddedDog.age++;

  const savePromise = lastAdded.save();

  savePromise.then(() => res.json({
    name: lastAddedDog.name,
    breed: lastAddedDog.breed,
    age: lastAddedDog.age,
  }));

  savePromise.catch((err) => res.status(500).json({ err }));
};

const hostPage4 = (req, res) => {
  const callback = (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.render('page4', {
      title: 'All Dogs',
      dogs: doc,
    });
  };

  readAllDogs(req, res, callback);
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  page4: hostPage4,
  readCat,
  getName,
  setName,
  updateLast,
  searchName,
  readDog,
  getDogName,
  setDogName,
  updateLastDog,
  searchDogName,
  notFound,
};
