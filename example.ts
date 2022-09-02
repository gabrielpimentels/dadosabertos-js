import DadosAbertos from "./lib";

DadosAbertos.blocosById({ id: 1 })
  .then((_data) => console.log(_data))
  .catch((_err) => {
    console.log("err.response.data");
  });
