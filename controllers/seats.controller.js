const Seat = require('../models/seat.models')
 const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {

    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getOne = async (req, res) => {

    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getPost = async (req, res) => {

    try {
      const clean = sanitize(req.body);
      const { day, seat, client, email } = clean;

      const newSeat = new Seat({
        day: day,
        seat: seat,
        client: client,
         email: email,
      });
      await newSeat.save();
      res.json({newSeat});

    } catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getPut = async (req, res) => {

    const { day, seat, client, email } = req.body;
    try {
      const seatChoose = await(Seat.findById(req.params.id));
      if(seatChoose) {
        await Seat.updateOne({ _id: req.params.id }, { $set: {
            day: day,
            seat: seat,
            client: client,
            email: email
        }});
        res.json({ seatChoose });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};


exports.getDelete =  async (req, res) => {

    try {
      const seat = await(Seat.findById(req.params.id));
      if(seat) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ seat });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
