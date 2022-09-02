"use strict";

const axios = require("axios");

class DadosAbertos {
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
    let query = "?";

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

    const path = `blocos${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  blocosById(id) {
    if (!id) return this._missing("bloco ID");

    const path = `blocos`;
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

  deputadoDespesas({
    id,
    idLegislatura,
    anos,
    meses,
    cnpjCpfFornecedor,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "ano",
  }) {
    if (!id) return this._missing("deputado ID");

    let query = "?";

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId, index) => {
        query = query + `${index > 0 ? "&" : ""}idLegislatura=${legislaturaId}`;
      });

    if (anos)
      anos.forEach((ano) => {
        query = query + `&ano=${ano}`;
      });

    if (meses)
      meses.forEach((mes) => {
        query = query + `&mes=${mes}`;
      });

    if (cnpjCpfFornecedor)
      query = query + `&cnpjCpfFornecedor=${cnpjCpfFornecedor}`;
    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const path = `deputados/${id}/despesas${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoDiscursos({
    id,
    idLegislatura,
    dataInicio,
    dataFim,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "dataHoraInicio",
  }) {
    if (!id) return this._missing("deputado ID");

    let query = "?";

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId) => {
        query = query + `${index > 0 ? "&" : ""}idLegislatura=${legislaturaId}`;
      });

    if (dataInicio) query = query + `&dataInicio=${dataInicio}`;
    if (dataFim) query = query + `&dataFim=${dataFim}`;
    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const path = `deputados/${id}/discursos${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoEventos({
    id,
    dataInicio,
    dataFim,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "dataHoraInicio",
  }) {
    if (!id) return this._missing("deputado ID");

    let query = "?";

    if (dataInicio) query = query + `&dataInicio=${dataInicio}`;
    if (dataFim) query = query + `&dataFim=${dataFim}`;
    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const path = `deputados/${id}/eventos${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoFrentes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/frentes`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoOcupacoes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/ocupacoes`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoOrgaos({
    id,
    dataInicio,
    dataFim,
    pagina,
    itens,
    ordem,
    ordenarPor,
  }) {
    if (!id) return this._missing("deputado ID");

    let query = "?";

    if (dataInicio) query = query + `&dataInicio=${dataInicio}`;
    if (dataFim) query = query + `&dataFim=${dataFim}`;
    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const path = `deputados/${id}/orgaos${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  deputadoProfissoes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/profissoes`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  legislaturasMesa({ id, dataInicio, dataFim }) {
    if (!id) return this._missing("legislatura ID");

    let query = "?";

    if (dataInicio) query = query + `&dataInicio=${dataInicio}`;
    if (dataFim) query = query + `&dataFim=${dataFim}`;

    const path = `legislaturas/${id}/mesa${query}`;
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    console.log(options);

    return this._Send(options);
  }

  refDeputadosCodSituacao() {
    const path = "referencias/deputados/codSituacao";
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }

  refDeputadosSituacao() {
    const path = "referencias/situacoesDeputado";
    const options = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }
}

module.exports = new DadosAbertos();
