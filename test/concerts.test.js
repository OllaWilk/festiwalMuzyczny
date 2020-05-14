const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Concert = require('../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {

        try {
            const testConcertOne = new Concert({
                _id: '5d9f1140f10a81216cf44',
                performer: 'Ola Wilk',
                genre: 'POP',
                price: 40,
                day: 2,
                image: '/img/uploads/1fsd324fsdg.jpg'
            });
            await testConcertOne.save();

            const testConcertTwo = new Concert({
                _id: '5d9f1140f10a81216cf44',
                performer: 'Johny Bravo',
                genre: 'ROCK',
                price: 20,
                day: 2,
                image: '/img/uploads/1fsd324fsdg.jpg'
            });
            await testConcertTwo.save();
        } catch (err) {
          console.log(err);
        }
    });

      after(async () => {

        try {
          await Concert.deleteMany();
        } catch (err) {
            console.log(err);
        }
      });

    it('/ should return all concerts', async () => {

        try {
            const res = await request(server).get('/api/concerts'); //odwołuję się do serwera i łączę się z endpointem/api/concerts

            expect(res.status).to.be.equal(200); //mam otrzymać od serwera kod sukcesu
            expect(res.body).to.be.an('array'); //sprawdzam czy jest tablica
            expect(res.body.length).to.be.equal(2); //tablica zawiera 2 elementy
        } catch (err) {
            console.log(err);
        }
    });

    it('/:id should return concert by :id', async () => {

        try {
          const res = await request(server).get('/api/concerts/5d9f1140f10a81216cf44');

          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.be.null;
        } catch (err) {
            console.log(err);
        }
    });

    it('/ should return performer by name', async () => {

        try {
          const res = await request(server).get('/api/concerts/performer/Ola Wilk');

          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.not.be.equal(1);
        } catch (err) {
            console.log(err);
        }
    });

    it('/ should return genre by name', async () => {

        try {
          const res = await request(server).get('/api/concerts/genre/POP');

          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.not.be.equal(1);
        } catch (err) {
            console.log(err);
        }
    });

    it('should return concerts by day', async () => {

        try {
            const res = await request(server).get('/api/concerts/day/2');

            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(2);

        } catch (err) {
            console.log(err);
        }
    });

});