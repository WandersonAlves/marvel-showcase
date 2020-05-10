import { MarvelRedColor, BackgroundLighterColor, Whitish } from "../colors";
import styled from "styled-components";

const MarvelButton = styled.button`
  font-weight: 600;
  font-size: 1rem;
  padding: 10px;
  text-transform: uppercase;
  border-width: 2px;
  border-color: transparent;
  border-bottom-color: ${MarvelRedColor};
  padding: 10px !important ;
  background-color: ${BackgroundLighterColor} !important ;
  color: ${Whitish} !important;
  border-style: solid;
  background-color: grey;
  color: white;
`;

export default MarvelButton;