import React from 'react';
import BubbleChart from './BubbleChart';
import { getSeededRandom } from '@visx/mock-data';
import { Story } from '@storybook/react';

export default {
  component: BubbleChart,
  title: 'BubbleChart',
}

const Template: Story<BubbleChart.Props> = (args) => <BubbleChart {...args} />;

export const Default = Template.bind({});

const seededRandom = getSeededRandom(0.88);
const generateRandomNumber = (max: number) => Math.floor((seededRandom() * max) + 1);
const data: BubbleChart.Datum[] = Array(100).fill(null).map(() => ({
  x: generateRandomNumber(600),
  y: generateRandomNumber(300),
  z: generateRandomNumber(10),
}));

Default.args = {
  data,
  width: 1000,
  height: 500,
};