### Install

```sh
npm install dadosabertos-js
```

### Documentation

#### Setting Up

```js
import DadosAbertos from "dadosabertos-js";
```

Use:

```js
DadosAbertos.blocos().then((data) => console.log(data));
```

#### Data API

https://dadosabertos.camara.leg.br/

##### blocos({ id, idLegislatura, pagina, itens, ordem, ordenarPor }):

| Argument      | Type       | Value                                                                                      | Required |
| ------------- | ---------- | ------------------------------------------------------------------------------------------ | -------- |
| id            | array[Int] | Número(s) identificador(es) de um ou mais bloco(s), separados por vírgulas.                | false    |
| idLegislatura | array[Int] | Número(s) identificador(es) de uma ou mais legislatura(s), separados por vírgulas.         | false    |
| pagina        | Int        | Número da página de resultados. Default = 1                                                | false    |
| itens         | Int        | Número máximo de itens na página que se deseja obter com esta requisição. Default = 10     | false    |
| ordem         | String     | O sentido da ordenação: asc para A a Z ou 0 a 9, e desc para Z a A ou 9 a 0. Default = ASC | false    |
| ordenarPor    | String     | Nome do campo pelo qual a lista será ordenada: idLegislatura, id ou nome. Default = ID     | false    |

```js
DadosAbertos.blocos({ id: [1], idLegislatura: [1] })
  .then((data) => console.log(data))
  .catch(err) => console.log(err.response.data);
```

##### blocosById({ id, pagina, itens, ordem, ordenarPor }):

| Argument | Type | Value                                      | Required |
| -------- | ---- | ------------------------------------------ | -------- |
| id       | Int  | Número identificador do bloco de partidos. | true     |

```js
DadosAbertos.blocosById({ id: 1 })
  .then((data) => console.log(data))
  .catch(err) => console.log(err.response.data);
```

#### deputados():

| Argument      | Type          | Value                                                                                                       | Required |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| id            | array[Int]    | Número(s) identificador(es) de um deputado, separados por vírgulas.                                         | false    |
| nome          | String        | Parte nome parlamentar.                                                                                     | false    |
| idLegislatura | array[Int]    | Número(s) identificador(es) de uma ou mais legislatura(s), separados por vírgulas.                          | false    |
| siglaUf       | array[String] | Uma ou mais sigla(s) de unidades federativas (estados e Distrito Federal).                                  | false    |
| siglaPartido  | array[String] | Uma ou mais sigla(s) de partidos aos quais sejam filiados os deputados.                                     | false    |
| siglaSexo     | String        | Letra que designe o gênero dos parlamentares que se deseja buscar, sendo M para masculino e F para feminino | false    |
| dataInicio    | String        | Data de início de um intervalo de tempo, no formato AAAA-MM-DD.                                             | false    |
| dataFim       | String        | Data de término de um intervalo de tempo, no formato AAAA-MM-DD.                                            | false    |
| pagina        | Int           | Número da página de resultados. Default = 1                                                                 | false    |
| itens         | Int           | Número máximo de itens na página que se deseja obter com esta requisição. Default = 10                      | false    |
| ordem         | String        | O sentido da ordenação: asc para A a Z ou 0 a 9, e desc para Z a A ou 9 a 0. Default = ASC                  | false    |
| ordenarPor    | String        | Nome do campo pelo qual a lista será ordenada: idLegislatura, id ou nome. Default = nome                    | false    |

```js
DadosAbertos.deputados({ nome: "maria" })
  .then((data) => console.log(data))
  .catch(err) => console.log(err.response.data);
```

### Async / Await

Example usando Async & Await com express.js:

```js
app.post("/dadosabertos/blocos", async (req, res) => {
  const { id, idLegislatura } = req.body;

  let blocos = await da.blocos({ id, idLegislatura });

  if (!blocos) return res.status(400).send("Nenhum bloco encontrado!");
  res.status(200).json(blocos);
});
```

### Issues

https://github.com/gabrielpimentels/dadosabertos-js/issues

### License

MIT License

Copyright (c) 2022 Gabriel Pimentel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
