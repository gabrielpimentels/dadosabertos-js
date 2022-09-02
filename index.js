"use strict";

const axios = require("axios");

class DadosAbertos {
  apiUrl;

  constructor() {
    this.apiUrl = "https://dadosabertos.camara.leg.br/api/v2";
  }

  _Send(options) {
    return new Promise((resolve, reject) => {
      options.headers = { content_type: "application/json" };

      axios(options)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  _missing(param) {
    return new Promise((_resolve, reject) => {
      reject({
        response: { data: `ERRO: Parâmetro não encontrado - ${param}` },
      });
    });
  }

  blocos({
    id,
    idLegislatura,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "id",
  }) {
    const path = "blocos";
    let query = "";

    if (id)
      id.forEach((blocoId, index) => {
        query = query + `${index > 0 ? "&" : ""}id=${blocoId}`;
      });

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId) => {
        query = query + `&idLegislatura=${legislaturaId}`;
      });

    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const options = {
      url: `${this.apiUrl}/${path}?${query}`,
    };

    return this._Send(options);
  }

  blocosById({ id }) {
    const path = "blocos";

    if (!id) return this._missing("bloco ID");

    const options = {
      url: `${this.apiUrl}/${path}/${id}`,
    };

    return this._Send(options);
  }

  deputados({
    id,
    nome,
    idLegislatura,
    siglaUf,
    siglaPartido,
    siglaSexo,
    dataInicio,
    dataFim,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "id",
  }) {
    let query = "?";

    if (id)
      id.forEach((id, index) => {
        query = query + `${index > 0 ? "&" : ""}id=${id}`;
      });

    if (nome) query = query + `&nome=${nome}`;

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId) => {
        query = query + `&idLegislatura=${legislaturaId}`;
      });

    if (siglaUf)
      siglaUf.forEach((sigla) => {
        query = query + `&siglaUf=${sigla}`;
      });

    if (siglaPartido)
      siglaPartido.forEach((partido) => {
        query = query + `&siglaPartido=${partido}`;
      });

    if (siglaSexo) query = query + `&siglaSexo=${siglaSexo}`;

    if (dataInicio) query = query + `dataInicio=${dataInicio}`;
    if (dataFim) query = query + `&dataFim=${dataFim}`;

    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const path = `deputados${query}`;

    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoById(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}`;

    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }
}

module.exports = new DadosAbertos();
