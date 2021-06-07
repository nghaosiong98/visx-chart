import React from 'react';
import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  // treemapBinary,
  // treemapDice,
  // treemapResquarify,
  // treemapSlice,
  // treemapSliceDice,
} from '@visx/hierarchy';
// import { TileMethod } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';

const color1 = '#f3e9d2';
const color2 = '#4281a4';
const background = '#114b5f';

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

const TreemapChart = ({ margin = defaultMargin, width, height, data }:Treemap.Props) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const colorScale = scaleLinear<string>({
    domain: [0, Math.max(...data.map(d => d.size || 0))],
    range: [color2, color1],
  });
  
  const _data = stratify<Treemap.Datum>()
    .id(d => d.id)
    .parentId(d => d.parent)(data)
    .sum(d => d.size || 0);

  const root = hierarchy(_data).sort((a,b) => (b.value || 0) - (a.value || 0));

  return (
    <>
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill={background} />
        <Treemap<typeof _data>
          top={margin.top}
          root={root}
          size={[xMax, yMax]}
          tile={treemapSquarify}
          round
        >
          {treemap => (
            <Group>
              {treemap
                .descendants()
                .reverse()
                .map((node, i) => {
                  const nodeWidth = node.x1 - node.x0;
                  const nodeHeight = node.y1 - node.y0;
                  return (
                    <Group
                      key={`node-${i}`}
                      top={node.y0 + margin.top}
                      left={node.x0 + margin.left}
                    >
                      {node.depth === 1 && (
                        <rect
                          width={nodeWidth}
                          height={nodeHeight}
                          stroke={background}
                          strokeWidth={4}
                          fill="transparent"
                        />
                      )}
                      {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                    </Group>
                  )
                })
              }
            </Group>
          )}
        </Treemap>
      </svg>
    </>
  )
}

export default TreemapChart;
