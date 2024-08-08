// src/Map.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const Map = () => {
  const [vehiclePath, setVehiclePath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ lat: 17.385044, lng: 78.486671 });

  useEffect(() => {
    const fetchVehicleData = async () => {
      const response = await fetch('http://localhost:5000/vehicle-location');
      const data = await response.json();
      setVehiclePath(data.path);
      setCurrentPosition(data.path[data.path.length - 1]);
    };

    fetchVehicleData(); // Fetch immediately
    const interval = setInterval(fetchVehicleData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDpfiabwBAcHA1weArweryvxdVCJiuF1F8">
      <GoogleMap mapContainerStyle={{ height: '400px', width: '800px' }} center={currentPosition} zoom={14}>
        <Marker position={currentPosition} />
        <Polyline path={vehiclePath} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
