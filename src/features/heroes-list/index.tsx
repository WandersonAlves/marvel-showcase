import { GetCharacters } from '../../api/services/Characters';
import { GetCharactersFactory } from '../../factories/CharacterFactory';
import { ICharacter } from '../../interfaces/CharacterInterface';
import Card from '../../components/Card';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 40px;
  overflow-x: auto;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroesList = () => {
  const [heros, setHeros] = useState<ICharacter[]>([]);

  const getCharacters = async () => {
    const { data } = await GetCharacters();
    setHeros(GetCharactersFactory(data));
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Container>
      {heros.map(h => (
        <Card key={h.id} picURL={h.thumbnail.path} name={h.name} />
      ))}
    </Container>
  );
};

export default HeroesList;
