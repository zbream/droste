const express = require("express");
const fs = require("fs");

const FILE_PATH = "./index.html";
const PORT = 6969;
const MAX = 100;

// initialize template file
const FILE = fs.readFileSync(FILE_PATH, "utf8");

const app = express();

app.get('/', (req, res) => {
    sendFile(res, 0);
})

app.get('/:id', (req, res) => {
  const num = +(req.params.id);

  // ignore non-numeric requests (/favicon.ico)
  if (isNaN(num)) {
    res.sendStatus(404);
    return;
  }

  // stop after a number of results
  if (num > MAX) {
    res.send("");
    return;
  }

  setTimeout(() => {
    sendFile(res, num);
  }, 100);
});

app.listen(PORT, () => {
  console.log(`DrosteServer started, Port ${PORT}.`);
});

function sendFile(res, num) {
  // ex) the 0th file contains a link to the 1st file
  const file = FILE.replace("{{NUM}}", num + 1);
  res.send(file);
}
