import React from 'react';
import styled from 'styled-components';
import { MapViewer } from 'components';

const Page = styled.main`
  width: 100%;
  height: 100%;
`;
const MapBox = styled.section`
  width: 100%;
  height: 100%;
`;
const Map: React.FC = () => {
  return (
    <Page>
      <MapBox>
        <MapViewer />
      </MapBox>
    </Page>
  );
};
export default Map;
