import { USER_LOG_ACTION, USER_LOGOUT_ACTION } from "../actions/route-actions";
import { loginReducer, userState } from "./loginReducer";

describe("Тестирование loginReducer", () => {
  it("Авторизация", () => {
    expect(loginReducer(userState, USER_LOG_ACTION(true))).toEqual({
      login: true,
      logout: false,
    });
  });
  it("Деавторизация", () => {
    expect(loginReducer(userState, USER_LOGOUT_ACTION(true))).toEqual({
      login: false,
      logout: true,
    });
  });
});
