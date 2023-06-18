import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import Api from "./services/api";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/configureStore";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
Api.init({ url: process.env.REACT_APP_SERVER_URL });


root.render(

    <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>

            <BrowserRouter>

                <App />

            </BrowserRouter>

        </PersistGate>

    </Provider>
);
