'use strict';

var app = require('../..');
import request from 'supertest';

var newTile;

describe('Tile API:', function() {

  describe('GET /api/tiles', function() {
    var tiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/tiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tiles).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/tiles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tiles')
        .send({
          name: 'New Tile',
          info: 'This is the brand new tile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTile = res.body;
          done();
        });
    });

    it('should respond with the newly created tile', function() {
      expect(newTile.name).to.equal('New Tile');
      expect(newTile.info).to.equal('This is the brand new tile!!!');
    });

  });

  describe('GET /api/tiles/:id', function() {
    var tile;

    beforeEach(function(done) {
      request(app)
        .get('/api/tiles/' + newTile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tile = res.body;
          done();
        });
    });

    afterEach(function() {
      tile = {};
    });

    it('should respond with the requested tile', function() {
      expect(tile.name).to.equal('New Tile');
      expect(tile.info).to.equal('This is the brand new tile!!!');
    });

  });

  describe('PUT /api/tiles/:id', function() {
    var updatedTile;

    beforeEach(function(done) {
      request(app)
        .put('/api/tiles/' + newTile._id)
        .send({
          name: 'Updated Tile',
          info: 'This is the updated tile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTile = {};
    });

    it('should respond with the updated tile', function() {
      expect(updatedTile.name).to.equal('Updated Tile');
      expect(updatedTile.info).to.equal('This is the updated tile!!!');
    });

  });

  describe('DELETE /api/tiles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tiles/' + newTile._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tile does not exist', function(done) {
      request(app)
        .delete('/api/tiles/' + newTile._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
