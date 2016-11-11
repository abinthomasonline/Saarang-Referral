'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tileCtrlStub = {
  index: 'tileCtrl.index',
  show: 'tileCtrl.show',
  create: 'tileCtrl.create',
  update: 'tileCtrl.update',
  destroy: 'tileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tile.controller': tileCtrlStub
});

describe('Tile API Router:', function() {

  it('should return an express router instance', function() {
    expect(tileIndex).to.equal(routerStub);
  });

  describe('GET /api/tiles', function() {

    it('should route to tile.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'tileCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/tiles/:id', function() {

    it('should route to tile.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'tileCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/tiles', function() {

    it('should route to tile.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'tileCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/tiles/:id', function() {

    it('should route to tile.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'tileCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tiles/:id', function() {

    it('should route to tile.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'tileCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tiles/:id', function() {

    it('should route to tile.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'tileCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
