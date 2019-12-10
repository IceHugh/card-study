import React from 'react';
import styled from 'styled-components';
import { CardData, ItemData } from 'types';
import CardItem from './CardItem';

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  background: #000;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
`;
const CardBox = styled.div`
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
      {props.cards &&
        props.cards.map(val => (
          <CardBox key={val.ulid}>
            <CardItem {...val} onClick={props.itemClick} />
          </CardBox>
        ))}
    </ListContainer>
  );
};
export default CardsHorz;
