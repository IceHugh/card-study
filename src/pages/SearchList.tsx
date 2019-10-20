import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryItem } from 'components';
import { CategoryData } from 'types';
import Api from 'api';

const ListContainer = styled.section`
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around; */
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #000;
  /* overflow-y: auto; */
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: 'a b b' 'a b b' 'c c c';
`;
const GridBoxA = styled.div`
  background: red;
`;
const GridBoxB = styled.div`
  background: yellow;
`;
const ItemBox = styled.div`
  width: 180px;
  height: 120px;
  border-radius: var(--border-radius-button);
  background: var(--color-1);
  margin: 0 0 15px 0;
`;
const ShapeContainer = styled.aside`
  /* width: 100px;
  height: 100px;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: red; */
`;
const SearchList = (props: RouteComponentProps) => {
  const { history } = props;
  const [categorys, setCategorys] = useState([]);
  const getCagegorys = async () => {
    try {
      const res: any = await Api.getCategorys().json();
      const { data } = res;
      console.log(data);
      setCategorys(data);
      console.log(categorys);
    } catch (error) {
      console.log(error);
    }
  };
  const testData = Array.from({ length: 100 }).fill(1);
  useEffect(() => {
    getCagegorys();
  }, []);
  return (
    <ListContainer>
      <GridBoxA>
        {/* {categorys.length > 0 &&
          testData.map(item => (
            <ItemBox key={item}>
              <CategoryItem {...categorys[0]} />
            </ItemBox>
          ))} */}
      </GridBoxA>
      <GridBoxB>
        <ShapeContainer />
      </GridBoxB>
    </ListContainer>
  );
};

export default SearchList;
