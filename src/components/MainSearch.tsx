import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBox = styled.div`
  width: 100%;
  min-width: 280px;
  height: 40px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 15px 5px var(--color-2);
`;
const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  color: #ccc;
  padding: 0 10px 0 20px;
  text-align: center;
  &::placeholder {
    color: var(--color-2);
  }
`;
const SearchButton = styled.button`
  width: 20%;
  height: 100%;
  max-width: 100px;
  min-height: 40px;
  background: var(--color-2);
  color: var(--color-3);
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.7;
  }
`;
interface SearchProps {
  name?: string;
  onClick?: () => void;
}
const MainSearch = (props: SearchProps) => {
  const [keyword, setKeyword] = useState('');
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchHandler = () => {
    console.log(keyword);
  };
  return (
    <SearchBox>
      <SearchInput
        type='search'
        autoFocus
        onChange={inputChange}
        placeholder='输入关键词'
      />
      <SearchButton onClick={searchHandler}>搜索</SearchButton>
    </SearchBox>
  );
};
export default MainSearch;
