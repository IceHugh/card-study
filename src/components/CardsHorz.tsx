import React, { useState } from 'react';
import styled from 'styled-components';
import { CardData, ItemData } from 'types';
import CardItem from './CardItem';

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
`;
const CardBox = styled.div`
  margin: 0 10px;
`;
interface CardsProps {
  cards: CardData[];
  itemClick?: (item: ItemData) => void;
}
const CardsHorz = (props: CardsProps) => {
  return (
    <>
      <ListContainer>
        {props.cards &&
          props.cards.map(val => (
            <CardBox key={val.ulid}>
              <CardItem {...val} onClick={props.itemClick} />
            </CardBox>
          ))}
      </ListContainer>
    </>
  );
};
export default CardsHorz;
