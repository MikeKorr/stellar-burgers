export const baseUrl = "https://norma.nomoreparties.space/api";

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// export const reqData = (id, options) => {
//   return fetch(baseUrl + "/orders", options).then(checkResponse);
// };
type TRequest = {
  method?: string;
  headers?: {
    "Content-Type": string;
  };
  body?: string;
};

export const request = async (url: string, options?: TRequest) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};
