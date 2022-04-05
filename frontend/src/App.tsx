import React from "react";
import { TileLayer } from "react-leaflet";
import { VectorLayersExample } from "./components/Route";

import { Airports } from "./components/Airports";

function App() {
    return (
        <React.Fragment>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Airports />

            <VectorLayersExample />

        </React.Fragment>
    );
}

export default App;
