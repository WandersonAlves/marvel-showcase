import styled from 'styled-components';

interface IFlexRowProps {
  readonly alignItems?: boolean;
  readonly justifyItems?: boolean;
  readonly disableMobileColumn?: boolean;
}

const FlexRow = styled.div<IFlexRowProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => (props.alignItems ? 'center' : 'unset')};
  justify-content: ${props => (props.justifyItems ? 'center' : 'unset')};
  @media (max-width: 768px) {
    flex-direction: ${props => (props.disableMobileColumn ? 'unset' : 'column')};
  }
`;

export default FlexRow;
