export type TLocation = {
  background: TLocation;
  hash: string;
  key: string;
  pathname: string;
  search: string;
  from: string;
  state: {
    background?: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
    };
  };
};

export type TOrderComponents = {
  _id: string;
  status: string;
  ingredients: Array<string>;
  name: string;
  createdAt: string;
  updateAt: string;
  number: number;
};
