import React from 'react';
import styled from 'styled-components';
import { CategoryData } from 'types';
import CategoryItem from './CategoryItem';

const ListCotainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  padding: 10px;
`;
const ListItemBox = styled.div`
  position: relative;
  width: 180px;
  height: 120px;
  border-radius: 5px;
  overflow: hidden;
  background: var(--color-1);
  margin: 0 auto 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  &:hover {
    .btn-del {
      display: block;
    }
    .btn-sync {
      display: block;
    }
  }
`;
// 左上角同步 右上角删除
const CornerButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 40px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  display: none;
  font-size: 24px;
  border-bottom-right-radius: 5px;
  background: var(--color-3);
  color: var(--color-2);
  text-shadow: 0 0 10px var(--color-2);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 10px var(--color-3);
  }
  &:active {
    opacity: 0.7;
  }
`;
const CornerButtonSync = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  width: 40px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  display: none;
  font-size: 24px;
  border-bottom-right-radius: 5px;
  background: var(--color-3);
  color: var(--color-2);
  text-shadow: 0 0 10px var(--color-2);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 10px var(--color-3);
  }
  &:active {
    opacity: 0.7;
  }
`;
interface ListProps {
  categorys?: CategoryData[];
  selectIndex: number;
  onSelect?: (i: number) => void;
  onDel?: (i: number) => void;
  onSync?: (i: number) => void;
}
const CategoryList = (props: ListProps) => {
  const itemClick = (i: number) => {
    console.log(i);
    props.onSelect && props.onSelect(i);
  };
  const btnDel = (i: number) => {
    console.log(i);
    props.onDel && props.onDel(i);
  };
  const btnSync = (i: number) => {
    console.log(i);
    props.onSync && props.onSync(i);
  };
  return (
    <ListCotainer>
      {props.categorys &&
        props.categorys.map((cate, index) => (
          <ListItemBox key={cate.ulid} onClick={() => itemClick(index)}>
            <CornerButton className='btn-del' onClick={() => btnDel(index)}>
              x
            </CornerButton>
            <CornerButtonSync
              className='btn-sync'
              onClick={() => btnSync(index)}>
              同步
            </CornerButtonSync>
            <CategoryItem {...cate} select={props.selectIndex === index} />
          </ListItemBox>
        ))}
    </ListCotainer>
  );
};

export default CategoryList;
