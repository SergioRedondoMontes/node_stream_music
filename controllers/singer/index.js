const fs = require("fs");
const mm = require("musicmetadata");
const Song = require("../../models/Song");
exports.uploadSong = async (req, res) => {
  console.log();
  let parser = new mm(
    fs.createReadStream(req.file.path),
    { duration: true },
    async (err, metadata) => {
      if (err) {
        console.log(err);
      }
      if (metadata) {
        console.log(metadata);
        var base64data = metadata.picture[0].data.toString("base64");
        const newSong = new Song({
          ...metadata,
          picture: { ...metadata.picture[0], data: base64data },
          musicSrc: req.file.path,
        });
        await newSong.save();
      }
    }
  );

  //   parser.on("metadata", function (result) {
  //     console.log(result);
  //   });
};
