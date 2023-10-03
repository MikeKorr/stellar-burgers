import { orderReducer, orderState } from "./orderReducer";
import { GET_ORDER_DONE_ACTION } from "../actions";

const id = "1234";

describe("Тестирование orderReducer", () => {
  it("Получение заказа", () => {
    expect(orderReducer(orderState, GET_ORDER_DONE_ACTION(id))).toEqual({
      id: id,
    });
  });
});
