import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const spb = [59.95, 30.33];

function App() {
    React.useEffect(() => {
        fetch(`/qwerty`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(console.log);
    }, []);

    return (
        <MapContainer center={spb} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
}

export default App;
