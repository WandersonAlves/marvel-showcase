import { MarvelRedColor } from '../colors';
import FlexRow from './Blocks/FlexRow';
import styled from 'styled-components';

const TopBar = styled(FlexRow)`
  background-color: ${MarvelRedColor};
  padding: 40px;
  width: 100%;
  align-items: center;
`;

export default TopBar;
