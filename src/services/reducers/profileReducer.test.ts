import { profileReducer, profileState } from "./profileReducers";
import { GET_INFO_ACTION, PATCH_INFO_ACTION } from "../actions/route-actions";

const testInfo = {
  success: true,
  user: {
    email: "new",
    name: "new@mail.ru",
  },
};

describe("Тестирование profileReducer", () => {
  it("Получение профиля", () => {
    expect(profileReducer(profileState, GET_INFO_ACTION(testInfo))).toEqual({
      success: true,
      user: testInfo.user,
    });
  });
});
