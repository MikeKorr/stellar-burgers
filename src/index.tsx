import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </DndProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
