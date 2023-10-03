import { constructorReducer, constructorState } from "./construcoReducer";
import {
  SET_BUN_ACTION,
  ADD_ING_ACTION,
  DEL_ING_ACTION,
  DND_ING_ACTION,
  CLEAR_CONSTRUCTOR_ACTION,
} from "../actions";

const drag = 1;
const drop = 2;
export const bun1 = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
  id: "1",
};
export const bun2 = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
  id: "2",
};

export const sauce = {
  _id: "643d69a5c3f7b9001cfa0945",
  name: "Соус с шипами Антарианского плоскоходца",
  type: "sauce",
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: "https://code.s3.yandex.net/react/code/sauce-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
  __v: 0,
  id: "3",
};

export const main = {
  _id: "643d69a5c3f7b9001cfa0940",
  name: "Говяжий метеорит (отбивная)",
  type: "main",
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: "https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v: 0,
  id: "5",
};

describe("Тестирование constructorReducer", () => {
  it("Добавление булки", () => {
    expect(constructorReducer(constructorState, SET_BUN_ACTION(bun1))).toEqual({
      ...constructorState,
      buns: [bun1],
    });
  });
  it("Изменение булки", () => {
    expect(
      constructorReducer(
        { ...constructorState, buns: [bun1] },
        SET_BUN_ACTION(bun2)
      )
    ).toEqual({ ...constructorState, buns: [bun2] });
  });
});
it("Добавление ингредиента", () => {
  expect(constructorReducer(constructorState, ADD_ING_ACTION(main))).toEqual({
    ...constructorState,
    mains: [main],
  });
});
it("Добавление большего числа ингредиента", () => {
  expect(
    constructorReducer(
      { ...constructorState, mains: [main] },
      ADD_ING_ACTION(sauce)
    )
  ).toEqual({
    ...constructorState,
    mains: [main, sauce],
  });
});
it("Изменение местоположения ингредиента", () => {
  expect(
    constructorReducer(
      { ...constructorState, mains: [main, main, sauce] },
      DND_ING_ACTION(drag, drop)
    )
  ).toEqual({
    ...constructorState,
    mains: [main, sauce, main],
  });
});
it("Удаление ингредиента", () => {
  expect(
    constructorReducer(
      { ...constructorState, mains: [main, sauce] },
      DEL_ING_ACTION(sauce)
    )
  ).toEqual({
    ...constructorState,
    mains: [main],
  });
});
it("Очистка конструктора", () => {
  expect(
    constructorReducer(
      { ...constructorState, buns: [bun1], mains: [main, sauce] },
      CLEAR_CONSTRUCTOR_ACTION()
    )
  ).toEqual(constructorState);
});
