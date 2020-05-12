import { getCharacterSeries } from '../../../api/services/Series';
import { GetSeriesFactory } from '../../../factories/SeriesFactory';
import { ISerie } from '../../../interfaces/SerieInterface';
import Card from '../../../components/Card';
import FlexColumn from '../../../components/Blocks/FlexColumn';
import FlexRow from '../../../components/Blocks/FlexRow';
import LoadingMore from '../../heroes-list/components/LoadingMore';
import React, { useState, useEffect } from 'react';
import Separator from './Separator';

interface IHeroSeriesListProps {
  heroID: string;
}

const HeroSeriesList = ({ heroID }: IHeroSeriesListProps) => {
  const [seriesList, setSeriesList] = useState<ISerie[]>([]);
  const [isLoadingMore, setLoadingMore] = useState(false);

  const serieImage = (s: ISerie): string => `${s.thumbnail.path}.${s.thumbnail.extension}`;

  const fetchCharacterSeries = async (offset = 0, limit = 20) => {
    if (offset) {
      setLoadingMore(true);
    }
    try {
      const { data } = await getCharacterSeries(Number(heroID), { offset, limit });
      setSeriesList([...seriesList, ...GetSeriesFactory(data)]);
    } catch (e) {
      console.error(e);
    }
    finally {
      setLoadingMore(false);
    }
  };

  const handleScrollFromParent = () => {
    fetchCharacterSeries(seriesList.length);
  };

  useEffect(() => {
    fetchCharacterSeries();
  }, []);

  const renderSeriesList = () => (
    <FlexRow alignItems justifyItems>
      {seriesList.map(s => (
        <Card key={s.id} picURL={serieImage(s)} name={s.title} />
      ))}
    </FlexRow>
  );

  return (
    <FlexColumn>
      <Separator />
      <FlexRow alignItems justifyItems>
        <h1>Series List</h1>
      </FlexRow>
      {renderSeriesList()}
      {isLoadingMore ? <LoadingMore /> : null}
    </FlexColumn>
  );
};

export default HeroSeriesList;
