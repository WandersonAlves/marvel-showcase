import React from 'react';
import styled from 'styled-components';

const MarvelInput = styled.input`
  font-size: 16px;
  border-width: 2px;
  border-color: #cccccc;
  border-style: solid;
  padding: 10px;
  border-radius: 10px 15px;
  background-color: #cccccc;
  box-shadow: 0px 0px 8px 0px rgba(42, 42, 42, 0.36);
  &:focus {
    outline: none;
  }
`;

export default MarvelInput;
