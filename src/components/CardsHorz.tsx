import React from 'react';
import styled from 'styled-components';
import { CardData, ItemData } from 'types';
import CardItem from './CardItem';

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  /* overflow: hidden; */
`;
const ListScrollBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  scroll-padding-left: 10px;
  scroll-snap-type: x mandatory;
`;
const CardBox = styled.div`
  scroll-snap-align: start;
  margin: 0 10px;
  transition: transform 1s;
  &:hover {
    transform: scale(1.1);
  }
`;
interface CardsProps {
  cards: CardData[];
  itemClick?: (item: ItemData) => void;
}
const CardsHorz = (props: CardsProps) => {
  return (
    <ListContainer>
      <ListScrollBox>
        {props.cards &&
          props.cards.map(val => (
            <CardBox key={val.ulid}>
              <CardItem {...val} onClick={props.itemClick} />
            </CardBox>
          ))}
      </ListScrollBox>
    </ListContainer>
  );
};
export default CardsHorz;
