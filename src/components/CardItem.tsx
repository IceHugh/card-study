import React from 'react';
import styled from 'styled-components';
import { CardData, ItemData } from 'types';

const CardContainer = styled.section`
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: var(--border-radius-main);
  background: var(--color-2);
  box-shadow: 0 0 20px var(--color-2);
  position: relative;
  cursor: pointer;
  text-align: center;
`;
const CardTitle = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0;
    + .card_desc {
      opacity: 1;
      transform: translateY(-100%);
    }
  }
`;
const CardDesc = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s;
`;

interface ItemProps {
  onClick?: (obj: ItemData) => void;
}
const CardItem = (props: CardData & ItemProps) => {
  const activeCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    console.log(rect);
    const { left, top, width, height } = rect;
    const center = {
      x: Math.ceil(left + width / 2),
      y: Math.ceil(top + height / 2),
    };
    props.onClick &&
      props.onClick({
        center,
        content: props.content,
      });
  };
  return (
    <CardContainer onClick={activeCard}>
      <CardTitle className='card_title'>{props.title}</CardTitle>
      <CardDesc className='card_desc'>{props.desc}</CardDesc>
    </CardContainer>
  );
};
export default CardItem;
