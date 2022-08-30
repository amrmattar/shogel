import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "/node_modules/jquery/dist/jquery.min.js"
import "./utility/bootstrapEdit.scss";
import "./utility/colors.sass";
import "./utility/vars.sass";
import "./utility/colors.sass";
import "./utility/fonts.sass";
import "./utility/utilities.sass";
import "./utility/icons.sass";
import "./utility/images.sass";
import { Provider } from 'react-redux'
import { store } from './core/redux/Store/Store.core'

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
// document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
