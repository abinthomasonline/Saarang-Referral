/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tiles              ->  index
 * POST    /api/tiles              ->  create
 * GET     /api/tiles/:id          ->  show
 * PUT     /api/tiles/:id          ->  update
 * DELETE  /api/tiles/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Tile from './tile.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Tiles
export function index(req, res) {
  return Tile.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tile from the DB
export function show(req, res) {
  return Tile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tile in the DB
export function create(req, res) {
  return Tile.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Tile in the DB
export function update(req, res) {
  
  return Tile.findOne({'name': req.params.name}).exec()
    .then(handleEntityNotFound(res))
    .then(function(entity) {
      entity.count = entity.count + 1;
      return entity.save()
        .then(entity => {
          return entity;
        });
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tile from the DB
export function destroy(req, res) {
  return Tile.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
