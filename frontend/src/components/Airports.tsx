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
                map.flyTo(data[0].coordinates);
            }
        });
    }, []);

    return (
        <React.Fragment>
            {airportsData.data?.map(({ name, coordinates, icao }, i) => (
                <Marker position={coordinates} icon={makeSign(name)} key={i}>
                    <Popup>{name}</Popup>
                </Marker>
            ))}
        </React.Fragment>
    );
};
