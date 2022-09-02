export interface AxiosOptions {
  url?: string;
  headers?: {
    content_type?: string;
  };
}

export interface QueryFilter {
  pagina?: number;
  itens?: number;
  ordem?: "ASC" | "DESC";
  ordenarPor?: string;
}

export interface Blocos extends QueryFilter {
  id?: number[];
  idLegislatura?: number[];
}

export interface BlocosById extends QueryFilter {
  id: number;
}

export interface Deputados extends QueryFilter {
  id?: number[];
  nome?: string;
  idLegislatura?: number[];
  siglaUf?: string[];
  siglaPartido?: string[];
  siglaSexo?: string;

  dataInicio?: string;
  dataFim?: string;
}
