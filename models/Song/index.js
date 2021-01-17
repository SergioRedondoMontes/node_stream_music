const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    picture: {
      type: Object,
    },
    artist: {
      type: Array,
    },
    year: {
      type: String,
    },
    genre: {
      type: Array,
    },
    musicSrc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Song = mongoose.model("song", SongSchema);

module.exports = Song;
