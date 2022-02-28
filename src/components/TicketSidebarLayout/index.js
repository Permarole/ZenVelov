import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import App from "../App";
import store from "../../app/store";
import { Provider } from "react-redux";

export default function TicketSidebarLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </Provider>
  );
}
