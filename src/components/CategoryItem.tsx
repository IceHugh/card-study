import React from 'react';
import styled from 'styled-components';
import { CategoryData } from 'types';
import formatDate from 'utils/formatDate';

const CategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  min-width: 160px;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: ${(prop: any) => (prop.select ? '0 0 5px #fff' : '')};
`;
const CategoryCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: var(--color-1);
  overflow: hidden;
  &:hover {
    opacity: 0;
  }
  transition: opacity 0.8s;
`;
const CategoryTitle = styled.h3`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
`;
const DateAuthBox = styled.span`
  display: flex;
  justify-content: center;
`;
const CategoryDate = styled.span`
  font-size: 14px;
`;
const CategoryAuth = styled.span`
  font-size: 14px;
  margin-right: 10px;
`;
const CategoryDesc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CurtomProps {
  select?: boolean;
}
const CategoryItem = (props: CategoryData & CurtomProps) => {
  return (
    <CategoryContainer select={props.select}>
      <CategoryCard>
        <div>
          <CategoryTitle>{props.name}</CategoryTitle>
          <DateAuthBox>
            <CategoryAuth>{props.authName}</CategoryAuth>
            <CategoryDate>{formatDate(props.careteDate)}</CategoryDate>
          </DateAuthBox>
        </div>
      </CategoryCard>
      <CategoryDesc>{props.desc}</CategoryDesc>
    </CategoryContainer>
  );
};
export default CategoryItem;
