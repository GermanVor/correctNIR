import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "./MapSign.css";

export const makeSign = (text: string) => {
    return L.divIcon({
        html: ReactDOMServer.renderToString(<b>{text}</b>),
        className: "castom-map-sign",
    });
};
