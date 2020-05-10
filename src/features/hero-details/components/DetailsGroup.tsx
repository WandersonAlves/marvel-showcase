import DetailLabel from "./DetailLabel";
import FlexRow from "../../../components/Blocks/FlexRow";
import React from 'react';

interface IDetailsGroupProps {
  readonly title: string;
  readonly value: any;
}

const DetailsGroup = ({title, value}: IDetailsGroupProps) => (
  <FlexRow style={{width: '100%', lineHeight: '40px'}}>
    <DetailLabel>{title}</DetailLabel>
    <span style={{fontWeight: 600}}>{value}</span>
  </FlexRow>
);

export default DetailsGroup;