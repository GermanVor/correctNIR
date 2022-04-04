import React from "react";
import { TileLayer, useMap } from "react-leaflet";

import { Airports } from "./components/Airports";

function App() {
    return (
        <React.Fragment>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Airports />
        </React.Fragment>
    );
}

export default App;
