import React from "react";
import { RequestName } from "../common/requestName";
import { AirportType } from "../common/interfaces";
import { Marker, Popup, useMap } from "react-leaflet";

import { makeSign } from "./MapSign";

const useAirportsState = (): [AirportType[], () => Promise<AirportType[] | void>] => {
    const [state, setState] = React.useState<AirportType[]>([]);

    const fetchData = React.useCallback(() => {
        return fetch(RequestName.GET_AIRPORTS)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((value: AirportType[]) => {
                setState(value);
                return value;
            })
            .catch(console.error);
    }, []);

    return [state, fetchData];
};

export const Airports = () => {
    const map = useMap();

    const [airportsState, fetchData] = useAirportsState();

    React.useEffect(() => {
        fetchData().then((value) => {
            if (value && value[0]) {
                map.flyTo(value[0].coordinats);
            }
        });
    }, []);

    return (
        <React.Fragment>
            {airportsState.map(({ name, coordinats, icao }, i) => (
                // <CircleMarker center={coordinats} color="black" fill key={i}>
                //     <Popup>{name}</Popup>
                // </CircleMarker>
                <Marker position={coordinats} icon={makeSign(name)}>
                    <Popup>{name}</Popup>
                </Marker>
            ))}
        </React.Fragment>
    );
};
