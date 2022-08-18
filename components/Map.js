import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";

// React-Map-GL 라이브러리를 이용해 지도 띄우고 모든 마커 표시
function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // SearchResults 객체를 getCenter에 필요한 { latitude: 52.516272, longitude: 13.377722 } 객체로 변환
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // Geolib 라이브러리의 getCenter를 이용해서 해당 지역의 모든 좌표 중에서 가장 center에 위치한 좌표 계산
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <>
      <ReactMapGL
        mapStyle="mapbox://styles/nuri---10/cl6wdd22d000t14rw2mwyi1us"
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onMove={(event) => setViewport(event.viewport)}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetRight={-10}
            >
              <p
                role="img"
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
            </Marker>

            {/* Marker 를 클릭하면 팝업 보여줌 */}
            {selectedLocation.long === result.long ? (
              <Popup
                closeOnClick={false}
                onClose={() => setSelectedLocation({})}
                longitude={result.long}
                latitude={result.lat}
              >
                {result.title}
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </ReactMapGL>
    </>
  );
}
export default Map;
