export const baseUrl = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const reqData = (id, options) => {
  return fetch(baseUrl + "/orders", options).then(checkResponse);
};
