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
  width: 50%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${Transparentish};
    font-weight: 600;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default MarvelInput;
