import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CategoryData } from 'types';
import CategoryItem from './CategoryItem';
import iconDelete from 'assets/images/icon-delete.png';
import iconSync from 'assets/images/icon-sync.png';

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
    .icon-delete,
    .icon-sync {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const RotateAni = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;
const IconImageBox = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 5px;
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s;
  cursor: pointer;
  &.icon-delete {
    left: 5px;
  }
  &.icon-sync {
    right: 5px;
    &:hover {
      animation: ${RotateAni} 1s 1 forwards;
    }
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
            <IconImageBox
              src={iconDelete}
              className='icon-delete'
              onClick={() => btnDel(index)}
            />
            <IconImageBox
              src={iconSync}
              className='icon-sync'
              onClick={() => btnSync(index)}
            />
            <CategoryItem {...cate} select={props.selectIndex === index} />
          </ListItemBox>
        ))}
    </ListCotainer>
  );
};

export default CategoryList;
