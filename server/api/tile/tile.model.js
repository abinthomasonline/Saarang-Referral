'use strict';

import mongoose from 'mongoose';

var TileSchema = new mongoose.Schema({
  name: String,
  count: Number
});

export default mongoose.model('Tile', TileSchema);
