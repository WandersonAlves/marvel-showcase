import { MarvelRedColor } from '../../../colors';
import React from 'react';
import styled from 'styled-components';

const Text = styled.h4`
  color: ${MarvelRedColor};
`;

const NoResults = () => <Text>No results found :(</Text>;

export default NoResults;
