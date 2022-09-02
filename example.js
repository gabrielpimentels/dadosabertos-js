const dadosabertos = require(".");

dadosabertos
  .deputados({ nome: "maria" })
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err.response.data);
  });
