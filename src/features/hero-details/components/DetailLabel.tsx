import { Transparentish } from "../../../colors";
import styled from "styled-components";

export const DetailLabel = styled.span`
  flex: 0 0 125px;
  margin-right: 10px;
  padding-top: 2px;
  color: ${Transparentish}
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 768px) {
    flex: unset;
  }
`;

export default DetailLabel;