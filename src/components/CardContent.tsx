import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemData } from 'types';
import iconClose from 'assets/images/icon-close.png';
import MdViewer from './MdViewer';

const CardContent = styled.div`
  height: 100%;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  /* transition: all 0.8s 0.1s; */
`;
const CardBox = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px 0;
  overflow: hidden;
  background: var(--tui-bg-main);
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  /* overflow-y: auto; */
`;
const IconImageBox = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
`;
interface ContentData {
  close?: () => void;
}
const ContentBox = (props: ItemData & ContentData) => {
  const { close } = props;
  return (
    <CardContent>
      <IconImageBox src={iconClose} onClick={() => close && close()} />
      <CardBox>
        <MdViewer viewContent={props.content} viewHeight={600} />
      </CardBox>
    </CardContent>
  );
};
export default ContentBox;
