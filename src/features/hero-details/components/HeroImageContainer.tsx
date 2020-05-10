import FlexColumn from "../../../components/Blocks/FlexColumn";
import styled from "styled-components";

interface IHeroImageContainer {
  readonly picURL: string;
}

const HeroImageContainer = styled(FlexColumn)<IHeroImageContainer>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(20px);
  opacity: 20%;
  background-image: url(${props => props.picURL});
  background-position: center;
  background-size: cover;
  z-index: -1;
`;

export default HeroImageContainer;
