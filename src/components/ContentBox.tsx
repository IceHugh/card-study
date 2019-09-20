import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemData } from 'types';
import MdViewer from './MdViewer';

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  transform: scale(0);
  /* transform-origin: 50px 50px; */
  &.active {
    top: 0;
    left: 0;
    transform: scale(1);
    width: 100%;
    height: 100%;
    > .content_active {
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
    }
  }
`;
const ContentMask = styled.div`
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.8); */
  position: absolute;
  left: 0;
  top: 0;
`;
const CardContent = styled.div`
  text-align: left;
  width: 800px;
  height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.8s 0.1s;
  user-select: text;
  transform-origin: 0 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  transform: translate(-50%, -50%);
  background: var(--tui-bg-main);
  border-radius: var(--border-radius-main);
  /* transition: all 0.8s 0.1s; */
`;
// interface ContentData {
//   activeStatus
// }
const ContentBox = (props: ItemData) => {
  const [activeStatus, setActive] = useState(false);
  const [contentStyle, setContentStyle] = useState();
  const activeCard = () => {
    console.log('active');
    setActive(true);
    setContentStyle((prevStytle: any) => ({
      transition: 'all 0.8s 0.05s',
      ...prevStytle,
    }));
  };
  const deactiveCard = () => {
    setActive(false);
  };
  useEffect(() => {
    console.log(props);
    if (!props.content) return;
    const { x, y } = props.center;
    setContentStyle({
      transformOrigin: `${x}px ${y}px`,
    });
    setTimeout(() => {
      activeCard();
    }, 200);
  }, [props.content]);
  return (
    <ContentContainer
      className={activeStatus ? 'active' : ''}
      style={contentStyle}>
      <ContentMask onClick={deactiveCard} />
      <CardContent className={activeStatus ? 'content_active' : ''}>
        {activeStatus && (
          <MdViewer viewContent={props.content} viewHeight={600} />
        )}
      </CardContent>
    </ContentContainer>
  );
};
export default ContentBox;
