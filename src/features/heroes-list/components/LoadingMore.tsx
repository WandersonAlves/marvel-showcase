/**
 * Credits to https://icons8.com/cssload/
 */
import { MarvelRedColor } from '../../../colors';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const KeyframeAnimation = keyframes`
  0%{}

	50%{
		background-color: transparent;
	}

	100%{}
`;

const CircleMain = styled.div`
  background-color: ${MarvelRedColor};
  float: left;
  height: 31px;
  margin-left: 17px;
  width: 31px;
  animation-name: ${KeyframeAnimation};
  animation-duration: 1.0675s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  border-radius: 20px;
`;

const CircleMainContainer = styled.div`
  position: absolute;
  width: 146px;
  margin: auto;
  bottom: 20px;
  left: 45%;
`;

const Circle1 = styled(CircleMain)`
  animation-delay: 0.2095s;
`;

const Circle2 = styled(CircleMain)`
  animation-delay: 0.4955s;
`;

const Circle3 = styled(CircleMain)`
  animation-delay: 0.6385s;
`;

const LoadingMore = () => (
  <CircleMainContainer>
    <Circle1 />
    <Circle2 />
    <Circle3 />
  </CircleMainContainer>
);

export default LoadingMore;
