import _ from 'lodash';
import React, { useState } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryHistogram,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

import styles from './HistogramWithSliderChart.module.scss';
import YearSlider from './Slider/YearSlider.component';

const LIGHT_GREY = 'hsl(355, 20%, 90%)';
const PRIMARY_COLOR = 'hsl(355, 92%, 67%)';

const sharedAxisStyles = {
  axis: {
    stroke: 'transparent',
  },
  tickLabels: {
    fill: LIGHT_GREY,
    fontSize: 14,
  },
  axisLabel: {
    fill: LIGHT_GREY,
    padding: 36,
    fontSize: 15,
    fontStyle: 'italic',
  },
};

const yearToSeason = (year: number) => `${year}-${`${year + 1}`.slice(2, 4)}`;

type DatumType = {
  [key: string | number]: any;
};

type HistogramDataProps = {
  data: DatumType;
};

type GetTooltipTextProps = {
  datum: DatumType;
};

const HistogramWithSliderChart = ({
  data: histogramData,
}: HistogramDataProps) => {
  const YEARS = Object.keys(histogramData).map((year) => parseInt(year, 10));
  const FIRST_YEAR = YEARS[0] || 0;
  const LAST_YEAR = YEARS[YEARS.length - 1] || 0;
  const TOTAL_YEARS = LAST_YEAR - FIRST_YEAR;

  let marks = {};
  YEARS.forEach((year, index) => {
    marks = { ...marks, [index]: year };
  });

  const [year, setYear] = useState<number>(FIRST_YEAR);

  const getTooltipText = ({ datum }: GetTooltipTextProps) => {
    const { binnedData, x0, x1 } = datum;

    const playerCount = binnedData.length;

    if (!playerCount) {
      return null;
    }

    const playerNames = binnedData
      .slice(0, 2)
      .map(({ player }: { player: string }) => {
        const [firstName, lastName] = player.split(' ');
        return lastName ? `${firstName?.slice(0, 1)}. ${lastName}` : firstName;
      })
      .join(', ');

    const playerNamesList = `\n (${playerNames}${
      playerCount > 2 ? `, and ${playerCount - 2} more players` : ''
    })`;

    return `${playerCount} player${
      playerCount === 1 ? '' : 's'
    } averaged between ${x0}-${x1} 3PT attempts ${playerNamesList}`;
  };

  const getYear = (percent: any) =>
    Math.round(FIRST_YEAR + TOTAL_YEARS * (percent / TOTAL_YEARS));

  return (
    <div>
      <svg className={styles.GradientSvg}>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='50%' y2='100%'>
            <stop offset='0%' stopColor='#FFE29F' />
            <stop offset='40%' stopColor='#FFA99F' />
            <stop offset='100%' stopColor={PRIMARY_COLOR} />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.Card}>
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }: any) =>
                datum.y > 0 ? getTooltipText(datum) || '' : ''
              }
              voronoiDimension='x'
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  style={{
                    fill: LIGHT_GREY,
                    fontSize: 11,
                  }}
                  flyoutStyle={{
                    fill: '#24232a',
                    stroke: PRIMARY_COLOR,
                    strokeWidth: 0.5,
                  }}
                />
              }
            />
          }
          height={280}
        >
          <VictoryLabel
            text={`3pt Attempts Per Game Averages (${yearToSeason(year)})`}
            x={225}
            y={18}
            textAnchor='middle'
            style={{ fill: LIGHT_GREY, fontSize: 16 }}
          />
          <VictoryAxis
            style={{
              ...sharedAxisStyles,
              grid: {
                fill: LIGHT_GREY,
                stroke: LIGHT_GREY,
                pointerEvents: 'painted',
                strokeWidth: 0.5,
              },
            }}
            label='# of players'
            dependentAxis
          />
          <VictoryAxis
            style={{
              ...sharedAxisStyles,
              axisLabel: { ...sharedAxisStyles.axisLabel, padding: 35 },
            }}
            label='3pt attempts per game'
          />
          <VictoryHistogram
            cornerRadius={2}
            domain={{ y: [0, 125] }}
            animate={{ duration: 300 }}
            data={histogramData[year]}
            bins={_.range(0, 16, 2)}
            style={{
              data: {
                stroke: 'transparent',
                fill: 'url(#gradient)',
                strokeWidth: 1,
              },
              labels: {
                fill: 'red',
              },
            }}
            x='3pa'
          />
        </VictoryChart>

        <YearSlider
          year={year}
          setYear={setYear}
          getYear={getYear}
          years={YEARS}
          marks={marks}
          primaryColor={PRIMARY_COLOR}
        />
      </div>
    </div>
  );
};

export default HistogramWithSliderChart;
