import {
  WS_SUCCESS_ACTION,
  WS_STOP_ACTION,
  WS_ORDER_ACTION,
  WS_ERR_ACTION,
} from "../actions/route-actions";
import { wsReducer, wsState } from "./WsReducer";

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
  total: 1234,
  totalToday: 123,
};

describe("Тестирование wsReducer", () => {
  it("Проверка соединения на успех", () => {
    expect(wsReducer(wsState, WS_SUCCESS_ACTION())).toEqual({
      ...wsState,
      success: true,
    });
  });
  it("Проверка соединения на ошибки", () => {
    expect(wsReducer(wsState, WS_ERR_ACTION())).toEqual({
      ...wsState,
      success: false,
    });
  });
  it("Проверка закрытия соединения", () => {
    expect(wsReducer(wsState, WS_STOP_ACTION())).toEqual(wsState);
  });
  it("Проверка загрузки заказа", () => {
    expect(wsReducer(wsState, WS_ORDER_ACTION(testOrder))).toEqual({
      ...wsState,
      orders: testOrder.orders,
      total: testOrder.total,
      totalToday: testOrder.totalToday,
    });
  });
});
