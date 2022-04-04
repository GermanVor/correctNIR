import React from "react";
import { RequestName } from "../common/requestName";
import { AirportType } from "../common/interfaces";

const useAirportsState = (): AirportType[] => {
    const [state, setState] = React.useState<AirportType[]>([]);

    React.useEffect(() => {
        fetch(RequestName.GET_AIRPORTS)
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
            })
            .then(setState);
    }, []);

    return state;
};

export const Airports = () => {
    const airportsState = useAirportsState();

    console.log(airportsState);

    return <></>;
};
