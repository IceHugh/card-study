import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconLocation from 'assets/images/icon_location.png';
import IconGeo from 'assets/images/icon_geolocation.png';

import Map from './map';
declare const AMap: any;
let mapInstance: any;

// class MapViewer extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// }
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MapViewer: React.FC = () => {
  const initMap = () => {
    mapInstance = new Map('container');
    mapInstance.setGeocationIcon({
      offset: [-15, -15],
      image: IconGeo,
      imageSize: [30, 30],
    });
    mapInstance.setMarkerDefaultIcon({
      size: [30, 30],
      image: IconLocation,
      imageSize: [30, 30],
      imageOffset: [-3, -2],
    });
    mapInstance.getGeo().then((res: any) => {
      const { position } = res;
      const { lng, lat } = position;
      console.log(position);
      if (mapInstance) {
        // mapInstance.setCircleMarker({
        //   center: [lng, lat],
        //   radius: 550,
        // });
      }
    });
    mapInstance.setMarkerByClick({ only: true, distance: 300, outClear: true });
  };
  useEffect(() => {
    initMap();
  }, []);
  return <Container id='container'></Container>;
};
export default MapViewer;
