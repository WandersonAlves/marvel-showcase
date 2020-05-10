import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default FlexRow;
