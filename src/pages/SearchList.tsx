import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryItem, MainSearch } from 'components';
// import { CategoryData } from 'types';
import Api from 'api';
import IconBack from 'assets/images/icon-back.png';

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
  display: grid;
  grid-template-rows: 120px 1fr;
`;
const GridBoxA = styled.header`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: 1fr minmax(280px, 2fr) 1fr;
  justify-items: center;
  align-items: center;
`;
const AItem = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const GridBoxB = styled.div`
  padding: 20px;
  max-height: 100%;
  overflow: hidden;
`;
const BContent = styled.div`
  overflow-y: auto;
  max-height: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-gap: 20px;
  justify-content: space-between;
`;
const ItemBox = styled.div`
  width: 180px;
  height: 120px;
  border-radius: var(--border-radius-button);
  background: var(--color-1);
  /* margin: 0 0 15px 0; */
`;
const BackButton = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  transform: translate(20px);
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
  const goBack = () => {
    history.goBack();
  };
  const testData = Array.from({ length: 100 }).fill(1);
  useEffect(() => {
    getCagegorys();
  }, []);
  return (
    <ListContainer>
      <GridBoxA>
        <AItem>
          <BackButton src={IconBack} onClick={goBack} />
        </AItem>
        <AItem>
          <MainSearch />
        </AItem>
        <AItem></AItem>
      </GridBoxA>
      <GridBoxB>
        <BContent>
          {categorys.length > 0 &&
            categorys.map(item => (
              <ItemBox key={item}>
                <CategoryItem {...item} />
              </ItemBox>
            ))}
        </BContent>
      </GridBoxB>
    </ListContainer>
  );
};

export default SearchList;
