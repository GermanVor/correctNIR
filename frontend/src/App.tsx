import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Airports } from "./components/Airports";

const spb = [59.95, 30.33];

function App() {
    return (
        <MapContainer center={spb} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Airports />
        </MapContainer>
    );
}

export default App;
