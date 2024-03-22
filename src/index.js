import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import FilmProvider from "./context/FilmContext";
import SearchProvider from "./context/SearchContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Auth0Provider } from "@auth0/auth0-react";
import "dropzone/dist/dropzone.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN_ID}
      clientId={process.env.REACT_APP_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SearchProvider>
          <FilmProvider>
            <App />
          </FilmProvider>
        </SearchProvider>
      </LocalizationProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
