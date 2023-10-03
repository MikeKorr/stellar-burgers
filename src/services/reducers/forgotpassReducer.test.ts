import { forgotpassReducer, forgotpassState } from "./forgotpassReducer";
import { GET_PASS_ACTION } from "../actions/route-actions";

describe("Тестирование forgotpassReducer", () => {
  it("Успешное получение", () => {
    expect(forgotpassReducer(forgotpassState, GET_PASS_ACTION(true))).toEqual({
      success: true,
    });
  });
  it("Ошибка получения", () => {
    expect(forgotpassReducer(forgotpassState, GET_PASS_ACTION(false))).toEqual(
      forgotpassState
    );
  });
});
