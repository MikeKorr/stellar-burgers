import { Middleware } from "redux";
import { TMiddlewareActions } from "../services/actions/route-actions";

export const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";
export const ordersUrl: string = "wss://norma.nomoreparties.space/orders";

export const socketMiddleware = (
  url: string,
  actions: TMiddlewareActions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => {
      return (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onOrders } = actions;

        if (type === wsInit) {
          socket = new WebSocket(
            `${url}${type === wsInit && payload ? `?token=${payload}` : ""}`
          );
          if (socket) {
            socket.onopen = () => {
              dispatch({ type: onOpen });
            };
            socket.onerror = () => {
              dispatch({ type: onError });
            };
            socket.onmessage = (e) => {
              const { data } = e;
              const res = JSON.parse(data);
              const { success } = res;
              success && dispatch({ type: onOrders, payload: res });
            };
            socket.onclose = () => {
              dispatch({ type: onClose });
            };
          }
        }
        return next(action);
      };
    };
  };
};
