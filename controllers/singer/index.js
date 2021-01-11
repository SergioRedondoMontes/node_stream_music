const fs = require("fs");
const mm = require("musicmetadata");
const Song = require("../../models/Song");

const client = require("scp2");

exports.uploadSong = async (req, res) => {
  client.scp(
    req.file.path,
    {
      host: "172.17.0.4",
      username: "root",
      password: "",
      path: "/usr/src/stream-music",
    },
    function (err) {
      res.send(err);
      console.log(req.file.path);
      console.log("files uploaded in remote server");
    }
  );

  let parser = new mm(
    fs.createReadStream(req.file.path),
    { duration: true },
    async (err, metadata) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      if (metadata) {
        console.log(metadata);
        var base64data = metadata.picture[0].data.toString("base64");
        const newSong = new Song({
          ...metadata,
          picture: { ...metadata.picture[0], data: base64data },
          musicSrc: req.file.path.split("/")[
            req.file.path.split("/").length - 1
          ],
        });
        await newSong.save();
        res.send("ok");
      }
    }
  );

  //   parser.on("metadata", function (result) {
  //     console.log(result);
  //   });
};
