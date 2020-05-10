import { MarvelRedColor, BackgroundLighterColor, Whitish, Transparentish } from '../colors';
import styled from 'styled-components';

const MarvelInput = styled.input`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: transparent;
  border-bottom-color: ${MarvelRedColor};
  border-style: solid;
  padding: 10px;
  background-color: ${BackgroundLighterColor};
  color: ${Whitish};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${Transparentish};
    font-weight: 600;
  }
`;

export default MarvelInput;
