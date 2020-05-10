import { MarvelRedColor } from '../colors';
import CenteredContainer from './Blocks/CenteredContainer';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const KeyframeAnimation = keyframes`
  0%, 10% {
		transform: perspective(136px) rotateX(-180deg);
		opacity: 0;
	}
	25%, 75% {
		transform: perspective(136px) rotateX(0deg);
		opacity: 1;
	}
	90%, 100% {
		transform: perspective(136px) rotateY(180deg);
		opacity: 0;
	}
`;

const Container = styled(CenteredContainer)`
  height: calc(100vh - 40px);
`;

const MainDiv = styled.div`
  width: 73px;
  height: 73px;
  margin: 0 auto;
  margin-top: 49px;
  position: relative;
  transform: rotateZ(45deg);
`;

const InnerDiv = styled.div`
  position: relative;
  transform: rotateZ(45deg);
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${MarvelRedColor};
    animation: ${KeyframeAnimation} 2.76s infinite linear both;
    transform-origin: 100% 100%;
  }
`;

const InnerDiv2 = styled(InnerDiv)`
  transform: scale(1.1) rotateZ(90deg);
  &:before {
    animation-delay: 0.35s;
  }
`;

const InnerDiv3 = styled(InnerDiv)`
  transform: scale(1.1) rotateZ(180deg);
  &:before {
    animation-delay: 0.69s;
  }
`;

const InnerDiv4 = styled(InnerDiv)`
  transform: scale(1.1) rotateZ(270deg);
  &:before {
    animation-delay: 1.04s;
  }
`;

const Loading = () => (
  <Container>
    <MainDiv>
      <InnerDiv />
      <InnerDiv2 />
      <InnerDiv4 />
      <InnerDiv3 />
    </MainDiv>
  </Container>
);

export default Loading;
