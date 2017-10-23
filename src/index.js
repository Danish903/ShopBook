import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

import reducers from "./reducers";


import registerServiceWorker from './registerServiceWorker';

import thunk from "redux-thunk";
import "./styles/modal.css";

//REACT COMPONENTS
import AppRouter from "./routes/AppRouter";

//STEP 1: create the store
const store = createStore(reducers, applyMiddleware(thunk, logger));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));




registerServiceWorker();
