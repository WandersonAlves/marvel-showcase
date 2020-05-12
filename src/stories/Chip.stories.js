import React from 'react';
import Chip from '../components/Chip';

export default {
  title: 'Chip',
  component: Chip,
};

export const ChipDefaultColor = () => <Chip content={'test'}/>;
export const ChipCustomColor = () => <Chip content={'test'} color="black"/>;
