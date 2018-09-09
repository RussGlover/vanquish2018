/* eslint-disable no-undef */
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  KmlLayer,
  Polyline
} from "react-google-maps";
import React from "react";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{
      lat: props.startingLocation.lat,
      lng: props.startingLocation.lng
    }}
    style={{ overflowY: "hidden" }}
  >
    {props.kmlLayers.reduce((accum, currVal) => {
      if (currVal.isShown) {
        accum.push(
          <KmlLayer
            url={currVal.url}
            options={{ preserveViewport: true }}
            onClick={currVal.onClick}
            key={currVal.layerName}
          />
        );
      }
      return accum;
    }, [])}
    <Polyline
      geodesic={true}
      options={{
        strokeColor: "#00ba0f",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: props.routeCoordinates
      }}
    />
    <Marker position={props.routeCoordinates[0]} />
    <Marker
      position={props.routeCoordinates[props.routeCoordinates.length - 1]}
    />
    <Marker position={{ lng: -123.0639, lat: 49.27377 }} />
    <Marker position={{ lng: -123.1201752360193, lat: 49.25529663062061 }} />
  </GoogleMap>
));
export default MyMapComponent;
