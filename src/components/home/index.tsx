import styled from 'styled-components';

export const PageContainer = styled.main`
  width: 100vw;
  height: 100vh;
  background: #000;
  position: relative;
`;
export const GridBox = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 200px 1fr;
  grid-template-rows: ${(prop: any) =>
    prop.show ? '120px 1fr 120px' : '1fr 300px 1fr'};
  grid-template-areas: 'a b' 'a c' 'a d';
  transition: all 1s;
  @media (max-width: 600px) {
    grid-template-columns: 0 1fr;
    grid-template-rows: 120px 1fr 120px;
  }
`;
export const GridA = styled.div`
  grid-area: a;
  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
  }
`;
export const GridB = styled.div`
  grid-area: b;
  border-left: 2px solid var(--color-3);
  border-bottom: 2px solid var(--color-3);
  box-shadow: 0 0 10px 0 var(--color-3) inset;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  display: flex;
  transition: all 1s;
`;
export const GridC = styled.div`
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  grid-area: c;
`;
export const GridD = styled.div`
  grid-area: d;
  border-left: 2px solid var(--color-3);
  border-top: 2px solid var(--color-3);
  box-shadow: 0 0 10px 0 var(--color-3) inset;
  border-top-left-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  transition: all 1s;
`;
export const GridDRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const AvatarBox = styled.div`
  margin: 0 100px;
`;

export const FormBox = styled.div`
  border-top-left-radius: 10px;
  height: 100%;
  width: ${(prop: any) => (prop.show ? '300px' : '0')};
  overflow: hidden;
  transform: ${(prop: any) =>
    prop.show ? 'translateX(0)' : 'translateX(-120%)'};
  transition: transform 0.5s;
`;
