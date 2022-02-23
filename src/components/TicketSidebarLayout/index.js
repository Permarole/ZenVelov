import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import App from "../App"

export default function TicketSidebarLayout() {
    return (
        <AuthProvider>
            <App></App>
        </AuthProvider>
    )
}