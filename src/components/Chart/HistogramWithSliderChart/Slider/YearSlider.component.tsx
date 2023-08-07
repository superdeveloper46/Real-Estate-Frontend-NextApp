import { useState } from 'react';

import styles from '../HistogramWithSliderChart.module.scss';
import TooltipSlider from './TooltipSlider.component';

type YearSliderType = {
  year: number;
  setYear: any;
  getYear: any;
  years: any;
  marks: any;
  primaryColor: string;
};

const YearSlider = (props: YearSliderType) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div className={styles.SliderContainer}>
      <TooltipSlider
        onChange={(newValue: any) => {
          setValue(newValue);
          const calculatedYear = props.getYear(newValue);

          if (props.year !== calculatedYear) {
            props.setYear(calculatedYear);
          }
        }}
        style={{ color: props.primaryColor }}
        value={value}
        min={0}
        max={props.years.length - 1}
        marks={props.marks}
        tipFormatter={(val: number) =>
          `${props.years[val]}-${`${props.years[val] + 1}`.slice(2, 4)}`
        }
        tipProps={undefined}
      />
    </div>
  );
};

export default YearSlider;
