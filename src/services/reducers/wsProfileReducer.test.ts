import {
  WS_SUCCESS_PROFILE_ACTION,
  WS_STOP_PROFILE_ACTION,
  WS_ORDER_PROFILE_ACTION,
  WS_ERR_PROFILE_ACTION,
} from "../actions/route-actions";
import { wsProfileReducer, wsProfileState } from "./wsProfileReducer";

const testOrder = {
  success: true,
  orders: [
    {
      createdAt: "2023-09-28T09:57:04.650Z",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0945",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d",
      ],
      name: "Space антарианский люминесцентный флюоресцентный бургер",
      number: 21725,
      status: "done",
      updateAt: "2023-09-28T09:57:05.064Z",
      _id: "65154df06d2997001caab6bc",
    },
  ],
};

describe("Тестирование wsProfileReducer", () => {
  it("Проверка соединения на успех", () => {
    expect(
      wsProfileReducer(wsProfileState, WS_SUCCESS_PROFILE_ACTION())
    ).toEqual({
      ...wsProfileState,
      success: true,
    });
  });
  it("Проверка соединения на ошибки", () => {
    expect(wsProfileReducer(wsProfileState, WS_ERR_PROFILE_ACTION())).toEqual({
      ...wsProfileState,
      success: false,
    });
  });
  it("Проверка закрытия соединения", () => {
    expect(wsProfileReducer(wsProfileState, WS_STOP_PROFILE_ACTION())).toEqual(
      wsProfileState
    );
  });
  it("Проверка загрузки заказа", () => {
    expect(
      wsProfileReducer(wsProfileState, WS_ORDER_PROFILE_ACTION(testOrder))
    ).toEqual({
      ...wsProfileState,
      orders: testOrder.orders,
    });
  });
});
