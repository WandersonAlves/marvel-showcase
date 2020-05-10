import { useParams } from 'react-router-dom';
import FlexColumn from '../../components/Blocks/FlexColumn';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface HeroDetailsProps {
  heroID: string;
}

const Container = styled(FlexColumn)`
  padding: 40px;
  align-items: center;
  overflow-x: auto;
`;

const HeroDetails: FunctionComponent<HeroDetailsProps> = (props: any) => {
  const { heroID } = useParams<HeroDetailsProps>();

  console.log(heroID);
  return (
    <Container>
      <span>{heroID}</span>
    </Container>
  );
};

export default HeroDetails;
