var chai = require('chai');
var app = require('../server').app;
const request = require('supertest');
var assert = chai.assert;
describe('Add new user /user/add ', () => {
   
    // Writing just one unit test, just for demo purpose.

    // Note - I coud mock the save function if I use any real database.
    // Since Im not using any datbase just a json file i'm not mocking the save to json.


    it ('Response should not be null', (done) => {
        request(app).post('/user/add')
        .send(
            {
                "firstName": "fname",
                "lastName": "lname",
                "email": "some@email",
                "credits": 10
            }
        )
        .end((err, res)=>{
            assert.isNotNull(res, 'Everything is ok..');
            done();
        });
    });
});