import React from "react";
import { geolocated } from "react-geolocated";
import {
  Map,
  google,
  InfoWindow,
  Marker,
  GoogleApiWrapper
} from "google-maps-react";
import MyMapComponent from "./MyMapComponent";
import MapUIWrapper from "./MapUIWrapper.component";
//import MyMapComponent from './MapContainer';

const BRITTANIA_SCHOOL_SCENARIO_ID = 5897;
const FRENCH_SCHOOL_SCENARIO_ID = 5898;
export const appStep = {
  WAITING_FOR_DESTINATION_SELECTION: 0,
  GOT_SELECTION: 1
};
const moata = "";
const DRIVE_HOSTING_ROOT = "https://drive.google.com/uc?export=view&id=";
const SCHOOL_KML_LAYER_KEY = "1wggRAAJELGbyc8vPetjimxeMATKHOmAY";
const TRAFFIC_KML_LAYER_KEY = "1eySKm8LkSsZLF_I3jx-NkCqf4T7pnS1O";
const CROSSWALK_KML_LAYER_KEY = "1P3_cvVz7pDdw1GitpOjeO12et46n81gj";
const ROUTE_KML_LAYER_KEY = "11be42wqFKA8ycw7Ss5pPW3bLRkZD1huX";
const CONSTRUCTION_KML_ADDR =
  "http://vanmapp1.vancouver.ca/googleKml/road_ahead";

class YourLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 49.250743,
      lng: -123.117735,
      isDrawerOpen: false,
      currentAppStep: appStep.WAITING_FOR_DESTINATION_SELECTION,
      destinationFeatureData: { name: "default", position: { lat: 0, lng: 0 } },
      routeCoordinates: [],
      kmlLayers: [
        {
          layerName: "schools",
          url: `${DRIVE_HOSTING_ROOT}${SCHOOL_KML_LAYER_KEY}`,
          isShown: true,
          onClick: event => this.selectSchool(event.featureData)
        },
        {
          layerName: "trafficControl",
          url: `${DRIVE_HOSTING_ROOT}${TRAFFIC_KML_LAYER_KEY}`,
          isShown: true,
          onClick: undefined
        },
        {
          layerName: "construction",
          url: CONSTRUCTION_KML_ADDR,
          isShown: true,
          onClick: undefined
        },
        {
          layerName: "crosswalk",
          url: `${DRIVE_HOSTING_ROOT}${CROSSWALK_KML_LAYER_KEY}`,
          isShown: true,
          onClick: undefined
        }
      ],
      routeScore: "No route"
    };
  }
  /* onClick={markerData => {
    console.info(`Name: ${markerData.featureData.name}`);
    console.info(`Longitute ${markerData.latLng.lng()}`);
    console.info(`Latitude ${markerData.latLng.lat()}`);
    props.selectSchool(markerData.featureData);
  }} */

  selectSchool = schoolFeatureData => {
    let scenarioID;
    let validSchoolRoute = false;
    console.info(schoolFeatureData);
    if (schoolFeatureData.name.includes("L'Ecole")) {
      scenarioID = FRENCH_SCHOOL_SCENARIO_ID;
      validSchoolRoute = true;
    } else if (schoolFeatureData.name.includes("Brit")) {
      scenarioID = BRITTANIA_SCHOOL_SCENARIO_ID;
      validSchoolRoute = true;
    }
    if (validSchoolRoute) {
      fetch("https://api.moata.com/v1/auth/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: "philip.cooper@mottmac.com",
          password: moata
        })
      })
        .then(response => response.json())
        .then(data => {
          // fetch('https://api.moata.com/v1/projects/949/assets?assetName=INTERSECTIONS&assetTypeId=1', {
          fetch(
            `https://api.moata.com/v1/scenarios/${scenarioID}/layers/49100%20/geometries?srId=Wgs844326`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + data.accessToken,
                "Content-Type": "application/json"
              }
            }
          )
            .then(r => r.json())
            .then(d => {
              const routeCoordinates = d.features[0].geometry.coordinates.reduce(
                (accumulator, currVal) => {
                  accumulator.push({
                    lng: parseFloat(currVal[0]),
                    lat: parseFloat(currVal[1])
                  });
                  return accumulator;
                },
                []
              );
              const routeScore = d.features[0].properties.score;
              this.setState({
                routeCoordinates,
                routeScore
              });
            });
        });
    }
  };

  render() {
    return (
      <div style={{ overflowY: "hidden" }}>
        <MapUIWrapper
          isDrawerOpen={this.state.isDrawerOpen}
          currentAppStep={this.state.currentAppStep}
          routeScore={this.state.routeScore}
        />
        <MyMapComponent
          startingLocation={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          isMarkerShown
          kmlLayers={this.state.kmlLayers}
          routeCoordinates={this.state.routeCoordinates}
        />
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: true,
  userDecisionTimeout: 5000
})(YourLocation);
