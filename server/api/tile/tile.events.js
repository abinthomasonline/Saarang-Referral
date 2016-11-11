/**
 * Tile model events
 */

'use strict';

import {EventEmitter} from 'events';
import Tile from './tile.model';
var TileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TileEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Tile.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TileEvents.emit(event + ':' + doc._id, doc);
    TileEvents.emit(event, doc);
  }
}

export default TileEvents;
