import { RESET_PASS_ACTION } from "../actions/route-actions";
import { resetReducer, resetState } from "./resetReducer";

describe("Тестирование resetReducer", () => {
  it("Проверка сброса", () => {
    expect(resetReducer(resetState, RESET_PASS_ACTION(true))).toEqual({
      success: true,
    });
  });
});
