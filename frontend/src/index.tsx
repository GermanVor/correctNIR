import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { MapContainer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const spb: LatLngExpression = [59.95, 30.33];

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MapContainer center={spb} zoom={12}>
        <App />
    </MapContainer>
);

reportWebVitals();
