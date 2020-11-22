const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SongSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
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
