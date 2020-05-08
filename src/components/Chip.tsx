import React from 'react';
import styled from 'styled-components';

interface IChipContainerProps {
  readonly color?: string;
}

interface IChipProps {
  content: string;
  color?: string;
}

const ChipContainer = styled.div<IChipContainerProps>`
  padding: 5px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: ${props => (props.color ? props.color : 'red')};
  width: fit-content;
`;

const Span = styled.span`
  color: white;
`;

const Chip = ({ content, color }: IChipProps) => (
  <ChipContainer color={color}>
    <Span>{content}</Span>
  </ChipContainer>
);

export default Chip;
