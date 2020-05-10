import { MarvelRedColor } from '../colors';
import FlexRow from './Blocks/FlexRow';
import styled from 'styled-components';

const TopBar = styled(FlexRow)`
  background-color: ${MarvelRedColor};
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

export default TopBar;
