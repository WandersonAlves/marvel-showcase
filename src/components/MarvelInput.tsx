import { MarvelRedColor } from '../colors';
import styled from 'styled-components';

const MarvelInput = styled.input`
  font-size: 16px;
  font-weight: 600;
  border-width: 2px;
  border-color: ${MarvelRedColor};
  border-style: solid;
  padding: 10px;
  border-radius: 10px 15px;
  background-color: ${MarvelRedColor};
  color: white;
  box-shadow: 0px 0px 8px 0px rgba(42, 42, 42, 0.36);
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: white;
    font-weight: 600;
  }
`;

export default MarvelInput;
