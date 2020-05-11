const Concert = require('../models/concert.model')


exports.getAll = async (req, res) => {

    try {
        res.json(await Concert.find());
    } catch(err) {
        res.status(500).json(err);
    }
};


exports.getOne = async (req, res) => {

    try {
        const concert = await Concert.findById(req.params.id);

    if (!concert) {
        res.status(404).json({ message: 'Concert not found...' });
    } else {
        res.json(concert);
    }
    } catch(err) {
        res.status(500).json(err);
    }
};


exports.getPost =  async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
        const newConcert = new Concert({
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image
        });
      await newConcert.save();
      res.json({ newConcert });

    } catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getPut = async (req, res) => {

    const { performer, genre, price, day, image } = req.body;
    try {
      const concert = await(Concert.findById(req.params.id));
      if(concert) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image}});
        res.json({ concert });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getDelete = async (req, res) => {

    try {
      const concert = await(Concert.findById(req.params.id));
      if(concert) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getPerformer = async (req, res) => {

  try {
    const concertPerformer = await Concert.find({ performer: req.params.performer });
    if (concertPerformer) {
      res.json(concertPerformer);
    } else {
      res.status(404).json({ message: 'Not found '});
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getGenre = async (req, res) => {

  try {
    const concertGenre = await Concert.find({ genre: req.params.genre });
    if (concertGenre) {
      res.json(concertGenre);
    } else {
      res.status(404).json({ message: 'Not found '});
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getMinMaxPrice = async (req, res) => {

  try {

    const concertPrice = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max } });
    if (concertPrice) {
      res.json(concertPrice);
    } else {
      res.status(404).json({ message: 'Not found '});
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getDay = async (req, res) => {

  try {
    const concertDay = await Concert.find({ day: req.params.day });
    if (concertDay) {
      res.json(concertDay);
    } else {
      res.status(404).json({ message: 'Not found '});
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};
