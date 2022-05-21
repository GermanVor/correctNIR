import React from "react";
import { RequestName } from "../common/requestName";
import { AirportType } from "../common/interfaces";
import { Marker } from "react-leaflet";

import { makeSign } from "./MapSign/MapSign";
import { useFetchData } from "../service";

export const Airports = () => {
    const [airportsData, fetchAirportsState] = useFetchData<AirportType[]>(
        RequestName.GET_AIRPORTS
    );

    React.useEffect(() => {
        fetchAirportsState();
    }, []);

    return (
        <React.Fragment>
            {airportsData.data?.map(({ name, coordinates }, i) => (
                <Marker position={coordinates} icon={makeSign(name)} key={i} />
            ))}
        </React.Fragment>
    );
};
