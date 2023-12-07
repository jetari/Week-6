// const express = require("express");

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen = (port, () => {
//   console.log(`Example app listening at ${port}`);
// });

function countOccurrences(str, char) {
  return str.split("").filter((ch) => ch === char).length;
}
