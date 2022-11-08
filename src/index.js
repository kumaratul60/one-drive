import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PropagateLoader from "react-spinners/PropagateLoader";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div
          style={{
            // textAlign: "center",
            display: "grid",
            placeItems: "center",
            marginTop: "300px",
          }}
        >
          {/* <h3>Loading...</h3> */}
          <PropagateLoader loading={true} color="#307B73" />
        </div>
      }
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
