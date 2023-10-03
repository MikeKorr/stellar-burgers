import { SCROLL_ING, SET_TAB } from "../actions";
import { scrollReducer, scrollState } from "./scrollReduser";

describe("Тестирование scrollReducer", () => {
  it("Проверка скролла ингредиента", () => {
    expect(
      scrollReducer(scrollState, { type: SCROLL_ING, payload: "main" })
    ).toEqual({
      scroll: "main",
      current: "",
    });
  });
  it("Проверка скролла таба", () => {
    expect(
      scrollReducer(scrollState, { type: SET_TAB, payload: "main" })
    ).toEqual({
      scroll: "",
      current: "main",
    });
  });
});
