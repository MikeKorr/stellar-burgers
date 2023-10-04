import { USER_REG_ACTION } from "../actions/route-actions";
import { registrationReducer, regState } from "./registrationReducer";

export const testUser = {
  email: "new@mail.ru",
  name: "new",
  password: "newnewnew",
};

describe("Тестирование registrationReducer", () => {
  it("Проверка регистрации", () => {
    expect(
      registrationReducer(
        regState,
        USER_REG_ACTION({ success: true, user: testUser })
      )
    ).toEqual({
      success: true,
      user: testUser,
    });
  });
});
