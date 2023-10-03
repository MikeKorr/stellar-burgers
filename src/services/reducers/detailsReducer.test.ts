import { detailReducer, detailState } from "./detailsReducer";
import { ADD_DETAILS_ACTION, DEL_DETAILS_ACTION } from "../actions";
import { main } from "./constructorReducer.test";

describe("Тестирование detailReducer", () => {
  it("Добавление деталей", () => {
    expect(detailReducer(detailState, ADD_DETAILS_ACTION(main))).toEqual({
      ingDetails: main,
    });
  });
  it("Удаление деталей", () => {
    expect(detailReducer(detailState, DEL_DETAILS_ACTION())).toEqual(
      detailState
    );
  });
});
