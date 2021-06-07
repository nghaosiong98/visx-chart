import React from 'react';
import TreemapChart from './TreemapChart';
import { Story } from '@storybook/react';
import shakespeare from '@visx/mock-data/lib/mocks/shakespeare';

export default {
  component: TreemapChart,
  title: 'TreemapChart',
}

const Template: Story<Treemap.Props> = (args) => <TreemapChart {...args} />;

export const Default = Template.bind({});

Default.args = {
  height: 500,
  width: 1000,
  data: shakespeare,
}
