import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const routerConfig = {
  future: {
    v7_startTransition: true, // Habilita el comportamiento futuro de v7
    v7_relativeSplatPath: true, // Activa el comportamiento futuro para rutas Splat
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router {...routerConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
