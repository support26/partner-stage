import React, { lazy, Suspense } from "react";
import Loader from "Loader";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import App from "./App";

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from "store/rootReducer";
import { MaterialUIControllerProvider } from "context";
const App = lazy(() => import("./App"));

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Suspense fallback={<Loader/>}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
        </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
