import { Transparentish } from "../../../colors";
import FlexRow from "../../../components/Blocks/FlexRow";
import React from 'react';
import styled from "styled-components";

interface IDetailsGroupProps {
  readonly title: string;
  readonly value: any;
}

const DetailsLabel = styled.span`
  flex: 0 0 110px;
  margin-right: 10px;
  padding-top: 2px;
  color: ${Transparentish}
  font-weight: 600;
  text-transform: uppercase;
`;

const DetailsGroup = ({title, value}: IDetailsGroupProps) => (
  <FlexRow style={{width: '100%', lineHeight: '40px'}}>
    <DetailsLabel>{title}</DetailsLabel>
    <span style={{fontWeight: 600}}>{value}</span>
  </FlexRow>
);

export default DetailsGroup;