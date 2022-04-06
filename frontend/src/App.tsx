import React from "react";
import { TileLayer } from "react-leaflet";

import { Airports } from "./components/Airports";
import { ControlPanel } from "./components/ControlPanel";

function App() {
    return (
        <React.Fragment>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Airports />
            <ControlPanel />
        </React.Fragment>
    );
}

export default App;
