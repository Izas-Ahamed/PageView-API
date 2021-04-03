var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res) => {
  if (req.url === "/getviews" && req.method === "GET") {
    var data = JSON.parse(readFile());
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.end(JSON.stringify(data));
  }

  if (req.url === "/addview" && req.method === "POST") {
    writeFile();
    var data = JSON.parse(readFile());
    res.setHeader("Content-Type", "application/text");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
    res.end("Page View Added Successfully 😉");
  }

  if (req.url === "/resetviews" && req.method === "DELETE") {
    writeFile();
    resetFile();
    res.setHeader("Content-Type", "application/text");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, DELETE");
    res.end("View Deleted Successfully 🗑️");
  }

  if (req.url === "/addclick" && req.method === "POST") {
    writeClicksCount();
    res.setHeader("Content-Type", "application/text");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
    res.end("Page Click Added Successfully 😉");
  }
});

var readFile = () => {
  return fs.readFileSync("views.json", (err, data) => {
    if (err) console.log(err);
  });
};

var writeFile = () => {
  var data = JSON.parse(readFile());
  if (data.pageViewed) {
    data.pageViewed = data.pageViewed + 1;
  } else {
    data = { pageViewed: 1, clicks: data.clicks };
  }
  fs.writeFileSync("views.json", JSON.stringify(data), (err) => {
    console.log(err);
  });
};

var writeClicksCount = () => {
  var data = JSON.parse(readFile());
  if (data.clicks >= 0) {
    data.clicks = data.clicks + 1;
  } else {
    data = { pageViewed: data.pageViewed, clicks: 1 };
  }
  fs.writeFileSync("views.json", JSON.stringify(data), (err) => {
    console.log(err);
  });
};

var resetFile = () => {
  data = { pageViewed: 0, clicks: 0 };
  fs.writeFileSync("views.json", data, (err) => {
    console.log(err);
  });
};

const port = process.env.PORT || 3000;
server.listen(port);
