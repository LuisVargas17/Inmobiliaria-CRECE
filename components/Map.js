import { useEffect } from 'react';

export default function Map() {
  useEffect(() => {
    // Este script carga el mapa de Google Maps
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAjZypUoCMyO7qbJSbrVsZPOVDp-1t_ZRw&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
    
    window.initMap = () => {
      new google.maps.Map(document.getElementById("map"), {
        center: { lat: 17.0402, lng: -92.9375 }, // Coordenadas de Tuxtla Gutiérrez
        zoom: 12,
      });
    };
  }, []);
  
  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}
