const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serwowanie statycznych plików
app.use(express.static(path.join(__dirname, "/")));

app.listen(port, () => {
  console.log(`Server działa na porcie ${port}`);
});
