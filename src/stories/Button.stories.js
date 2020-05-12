import React from 'react';
import MarvelButton from '../components/MarvelButton';

export default {
  title: 'MarvelButton',
  component: MarvelButton,
};

export const MarvelButtonDefault = () => <MarvelButton>Hellow!</MarvelButton>;
export const MarvelButtonDisabled = () => <MarvelButton disabled>I'm disabled</MarvelButton>;
