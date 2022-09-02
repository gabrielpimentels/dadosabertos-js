"use strict";

import axios from "axios";
import { AxiosOptions, Blocos, BlocosById, Deputados } from "./types";

class DadosAbertos {
  apiUrl: string;

  constructor() {
    this.apiUrl = "https://dadosabertos.camara.leg.br/api/v2";
  }

  _Send(options: AxiosOptions) {
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

  _missing(param: string) {
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
  }: Blocos) {
    const path = "blocos";
    let query = "";

    if (id)
      id.forEach((blocoId: any, index: any) => {
        query = query + `${index > 0 ? "&" : ""}id=${blocoId}`;
      });

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId: any) => {
        query = query + `&idLegislatura=${legislaturaId}`;
      });

    if (pagina) query = query + `&pagina=${pagina}`;
    if (itens) query = query + `&itens=${itens}`;
    if (ordem) query = query + `&ordem=${ordem}`;
    if (ordenarPor) query = query + `&ordenarPor=${ordenarPor}`;

    const options: AxiosOptions = {
      url: `${this.apiUrl}/${path}?${query}`,
    };

    return this._Send(options);
  }

  blocosById({ id }: BlocosById) {
    const path = "blocos";

    if (!id) return this._missing("bloco ID");

    const options: AxiosOptions = {
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
  }: Deputados) {
    let query = "?";

    if (id)
      id.forEach((id: any, index: any) => {
        query = query + `${index > 0 ? "&" : ""}id=${id}`;
      });

    if (nome) query = query + `&nome=${nome}`;

    if (idLegislatura)
      idLegislatura.forEach((legislaturaId: any) => {
        query = query + `&idLegislatura=${legislaturaId}`;
      });

    if (siglaUf)
      siglaUf.forEach((sigla: any) => {
        query = query + `&siglaUf=${sigla}`;
      });

    if (siglaPartido)
      siglaPartido.forEach((partido: any) => {
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

    const options: AxiosOptions = {
      url: `${this.apiUrl}/${path}`,
    };

    return this._Send(options);
  }
}

export default new DadosAbertos();
