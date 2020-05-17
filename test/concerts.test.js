const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Concert = require('../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({
          _id: '5d9f1140f10a81216cfd5555',
          performer: 'TEST Ola Wilk',
          genre: 'POP',
          price: 40,
          day: 2,
          image: '/img/uploads/1fsd324fsdg.jpg',
        });
        await testConcertOne.save();

        const testConcertTwo = new Concert({
          _id: '5d9f1140f10a81216cfd1111',
          performer: 'TEST Johny Bravo',
          genre: 'ROCK',
          price: 20,
          day: 2,
        });

        await testConcertTwo.save();
    });

    it('should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return concert by :id', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd5555');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.length).to.be.not.be.null;
    });

    it('/ should return performer by name', async () => {
        const res = await request(server).get('/api/concerts/performer/TEST Ola Wilk');

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/ should return genre by name', async () => {
        const res = await request(server).get('/api/concerts/genre/ROCK');

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
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
    after(async () => {
        await Concert.deleteMany({ performer: /^TEST /});
    });
});