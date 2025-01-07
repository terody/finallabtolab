import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import type { Lab } from '../types/lab';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 33.7175, // Orange County approximate center
  lng: -117.8311
};

interface LabMapProps {
  labs: Lab[];
  onLabSelect: (lab: Lab) => void;
}

export default function LabMap({ labs, onLabSelect }: LabMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<Lab | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    labs.forEach(lab => {
      bounds.extend({ lat: lab.coordinates.lat, lng: lab.coordinates.lng });
    });
    map.fitBounds(bounds);
  }, [labs]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {labs.map((lab) => (
          <Marker
            key={lab.id}
            position={{ lat: lab.coordinates.lat, lng: lab.coordinates.lng }}
            onClick={() => setSelectedMarker(lab)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.coordinates.lat, lng: selectedMarker.coordinates.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedMarker.name}</h3>
              <p className="text-sm text-gray-600">{selectedMarker.address}</p>
              <button
                onClick={() => onLabSelect(selectedMarker)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}