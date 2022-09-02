"use strict";

const axios = require("axios");
const queryString = require("query-string");

class DadosAbertos {
  constructor() {
    this.apiUrl = "https://dadosabertos.camara.leg.br/api/v2";
  }

  _Send(options) {
    return new Promise((resolve, reject) => {
      options.headers = { content_type: "application/json" };

      axios(options)
        .then((data) => resolve(data.data))
        .catch((err) => reject(err.response.data));
    });
  }

  _missing(param) {
    return new Promise((_resolve, reject) =>
      reject(`ERRO: Parâmetro não encontrado - ${param}`)
    );
  }

  /* BLOCOS - BEGIN */

  blocos({
    id,
    idLegislatura,
    pagina,
    itens = 10,
    ordem = "ASC",
    ordenarPor = "id",
  }) {
    const query = queryString.stringify({
      id,
      idLegislatura,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `blocos${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  blocosById(id) {
    if (!id) return this._missing("bloco ID");

    const path = `blocos`;

    return this._Send({
      url: `${this.apiUrl}/${path}/${id}`,
    });
  }

  /* BLOCOS - END */

  /* DEPUTADOS - BEGIN */

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
    const query = queryString.stringify({
      id,
      nome,
      idLegislatura,
      siglaUf,
      siglaPartido,
      siglaSexo,
      dataInicio,
      dataFim,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `deputados${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  deputadoById(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
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

    const query = queryString.stringify({
      idLegislatura,
      anos,
      meses,
      cnpjCpfFornecedor,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `deputados/${id}/despesas${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
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

    const query = queryString.stringify({
      idLegislatura,
      dataInicio,
      dataFim,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `deputados/${id}/discursos${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
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

    const query = queryString.stringify({
      dataInicio,
      dataFim,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `deputados/${id}/eventos${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  deputadoFrentes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/frentes`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  deputadoOcupacoes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/ocupacoes`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
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

    const query = queryString.stringify({
      dataInicio,
      dataFim,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `deputados/${id}/orgaos${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  deputadoProfissoes(id) {
    if (!id) return this._missing("deputado ID");

    const path = `deputados/${id}/profissoes`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  refDeputadosCodSituacao() {
    return this._Send({
      url: `${this.apiUrl}/referencias/deputados/codSituacao`,
    });
  }

  refDeputadosSituacao() {
    return this._Send({
      url: `${this.apiUrl}/referencias/situacoesDeputado`,
    });
  }

  /* DEPUTADOS - END */

  /* LEGISLATURA - BEGIN */

  legislaturas({
    id,
    data,
    pagina,
    itens = 10,
    ordem = "DESC",
    ordenarPor = "id",
  }) {
    const query = queryString.stringify({
      id,
      data,
      pagina,
      itens,
      ordem,
      ordenarPor,
    });

    const path = `legislaturas${query ? `?${query}` : ""}`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  legislaturasById(id) {
    if (!id) return this._missing("legislatura ID");

    return this._Send({
      url: `${this.apiUrl}/legislaturas/${id}`,
    });
  }

  legislaturaMesa({ idLegislatura, dataInicio, dataFim }) {
    if (!idLegislatura) return this._missing("legislatura ID");

    const query = queryString.stringify({
      dataInicio,
      dataFim,
    });

    const path = `legislaturas/${idLegislatura}/mesa${
      query ? `?${query}` : ""
    }`;

    return this._Send({
      url: `${this.apiUrl}/${path}`,
    });
  }

  /* LEGISLATURA - END */
}

module.exports = new DadosAbertos();
