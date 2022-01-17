import * as https from "https";
var fs = require("fs");

var configs = require("./configs.json");
var mode = process.argv.slice(2)[0];
if (!mode || (mode !== "followers" && mode !== "following")) {
  throw "Please specify the mode: (followers or following)";
}
var outFile = `data/${mode}.txt`;

var options = {
  host: "api.github.com",
  path: `/users/${configs.githubUser}/${mode}`,
  method: "GET",
  headers: { "user-agent": "node.js" },
};

if (mode === "following") {
  options.path += "?per_page=100";
}

const req = https.get(options, (res) => {
  if (configs.debug) console.log(`STATUS: ${res.statusCode}`);

  var bodyChunks: any[] = [];
  res
    .on("data", (data) => {
      bodyChunks.push(data);
    })
    .on("end", () => {
      var buf = Buffer.concat(bodyChunks);
      var jsonBuf = JSON.parse(buf.toString("utf-8"));
      var fileContent: String = "";
      var counter: number = 0;
      var counterTitle: String =
        mode === "followers" ? "Seguidores" : "Seguindo";

      jsonBuf.forEach((e: any) => {
        fileContent += e.login + "\n";
        counter += 1;
      });
      var finalFile: String = `${counterTitle}: ${counter}\n` + fileContent;

      fs.writeFile(outFile, finalFile, function (err: String) {
        if (err) {
          throw `Failed writting file ${outFile}: ${err}`;
        }
        console.log(`Your ${mode} was written to ${outFile}!`);
      });
    });
});

req.on("error", (err) => {
  console.error(err);
});

req.end();
