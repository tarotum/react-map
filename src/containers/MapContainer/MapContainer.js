import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "./MapContainer.less";

// Import actions
import { saveMarkersAction } from "../../actions/actionCreators";

// Import components
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

// Import places types
import placesTypes from "../../utils/placesTypes";

const MapContainer = props => {
  // ref on google map element
  const refMap = useRef(null);

  // Finding location of user
  const [locationFound, setLocationFound] = useState(false);
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationFound(true);
      });
    } else {
      setLocationFound(false);
      global.console.error("Your browser doesn't support geolocation.");
    }
  }, []);

  // Add markers on the map
  const [markers, setMarkers] = useState([]);

  const addMarker = event => {
    const marker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkers(prevState => [...prevState, marker]);
  };

  useEffect(() => {
    refMap.current.map.addListener("click", addMarker);
  }, []);

  const saveMarkers = () => {
    props.saveMarkersAction(markers);
  };

  const showMarkers = () => {
    setMarkers(props.markers);
  };

  // Serch nearby places based on location
  const [placeType, setPlaceType] = useState(placesTypes[0]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const service = new refMap.current.props.google.maps.places.PlacesService(
      refMap.current.map
    );

    service.nearbySearch(
      {
        location,
        radius: "1000",
        type: placeType
      },
      (result, status) => {
        if (status === "OK" || status === "ZERO_RESULTS") setPlaces(result);
      }
    );
  }, [location, placeType]);

  return (
    <div className="map-container">
      <div className="map-control-panel">
        <div className="markers-controls">
          <Button className="markers-controls__button" onClick={saveMarkers}>
            Save markers
          </Button>
          <Button className="markers-controls__button" onClick={showMarkers}>
            Show markers
          </Button>
        </div>
        <h3 className="map-control-panel__title">Places types:</h3>
        <ul className="places-controls">
          {placesTypes.map(type => (
            <li key={type.length}>
              <label>
                <Input
                  type="radio"
                  name="type"
                  value={type}
                  checked={placeType === type}
                  onClick={({ currentTarget }) =>
                    setPlaceType(currentTarget.value)
                  }
                />
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-wrapper">
        <Map
          className="map"
          center={location}
          google={props.google}
          zoom={14}
          centerAroundCurrentLocation
          ref={refMap}
        >
          {locationFound && <Marker position={location} />}
          {markers &&
            markers.map(({ lat, lng }) => (
              <Marker key={lat + lng} position={{ lat, lng }} />
            ))}

          {places &&
            places.map(place => (
              <Marker
                key={place.place_id}
                icon={{
                  url: place.icon,
                  scaledSize: new refMap.current.props.google.maps.Size(20, 20)
                }}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                }}
              />
            ))}
        </Map>
      </div>
    </div>
  );
};

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
  markers: PropTypes.array.isRequired,
  saveMarkersAction: PropTypes.func.isRequired
};

export default connect(
  state => ({
    markers: state.markers
  }),
  { saveMarkersAction }
)(
  GoogleApiWrapper({
    apiKey: process.env.KEY
  })(MapContainer)
);
