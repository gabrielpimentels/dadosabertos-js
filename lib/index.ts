"use strict";

import axios from "axios";
import { AxiosOptions, Blocos, BlocosById } from "types";

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
    itens,
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

    let options: AxiosOptions = {
      url: `${this.apiUrl}/${path}?${query}`,
    };

    return this._Send(options);
  }

  blocosById({ id }: BlocosById) {
    const path = "blocos";

    if (!id) return this._missing("bloco ID");

    let options: AxiosOptions = {
      url: `${this.apiUrl}/${path}/${id}`,
    };

    return this._Send(options);
  }
}

export default new DadosAbertos();
