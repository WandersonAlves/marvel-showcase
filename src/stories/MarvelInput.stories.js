import React from 'react';
import MarvelInput from '../components/MarvelInput';

export default {
  title: 'MarvelInput',
  component: MarvelInput,
};

export const MarvelInputWithoutPlaceholder = () => <MarvelInput />;
export const MarvelInputWithPlaceholder = () => <MarvelInput placeholder="From storybook"/>;
export const MarvelInputWithValueOnIt = () => <MarvelInput value={"custom value"}/>;
export const MarvelInputDisabled = () => <MarvelInput disabled/>;
