const fs = require("fs");
const http = require("http");
const url = require("url");

const replacePlaceholders = require("./modules/replacePlaceholders");

// To read data file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, {
  encoding: "utf-8",
});
const dataArr = JSON.parse(data);

// To read temp-card.html file
const tempCard = fs.readFileSync(`${__dirname}/templates/temp-card.html`, {
  encoding: "utf-8",
});

// To read temp-overview.html file
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/temp-overview.html`,
  {
    encoding: "utf-8",
  }
);

// To read product.html file
const product = fs.readFileSync(`${__dirname}/templates/product.html`, {
  encoding: "utf-8",
});

// Servers
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = dataArr
      .map((el) => replacePlaceholders(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%temp_cards%}/g, cardsHtml);

    res.writeHead(200, "Products loaded!", {
      "Content-type": "text/html",
    });
    res.end(output);
  } else if (pathname === "/product") {
    const productObj = dataArr[query.id];
    const output = replacePlaceholders(product, productObj);

    res.end(output);
  } else if (pathname === "/api") {
    res.end(data);
  } else {
    res.writeHead(404, "error", {
      "Content-Type": "text/html",
      "Special-Header": "Hello-World",
    });

    res.end("<h1>Page Not Found..</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("The server is Listening right now!...");
});
