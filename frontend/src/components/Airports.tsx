import React from "react";
import { RequestName } from "../common/requestName";
import { AirportType } from "../common/interfaces";
import { Marker, Popup, useMap } from "react-leaflet";

import { makeSign } from "./MapSign/MapSign";
import { useFetchData } from "../service";

export const Airports = () => {
    const map = useMap();

    const [airportsData, fetchAirportsState] = useFetchData<AirportType[]>(
        RequestName.GET_AIRPORTS
    );

    React.useEffect(() => {
        fetchAirportsState().then(({ data }) => {
            if (data && data.length) {
                map.flyTo(data[0].coordinats);
            }
        });
    }, []);

    return (
        <React.Fragment>
            {airportsData.data?.map(({ name, coordinats, icao }, i) => (
                <Marker position={coordinats} icon={makeSign(name)}>
                    <Popup>{name}</Popup>
                </Marker>
            ))}
        </React.Fragment>
    );
};
