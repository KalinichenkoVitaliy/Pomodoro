import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './diagram.css';
import { TDaysWeek, TRootState } from '../../../../types/types';

import { timeToPropis } from '../../../../utils/lib';
import { selectDay } from '../../../../store/statsSlice';

const ReactDynamicImport = require('react-dynamic-import');
const loader = () => import(`react-apexcharts`);
const Chart = ReactDynamicImport({ loader });

export function Diagram() {
  const dispatch = useDispatch();
  const { day1, day2, day3, day4, day5, day6, day7 } = useSelector<TRootState, TDaysWeek>(
    (state) => state.statsState.stats.daysWeek
  );

  const dataMax =
    Math.max(
      day1.workMinutes,
      day2.workMinutes,
      day3.workMinutes,
      day4.workMinutes,
      day5.workMinutes,
      day6.workMinutes,
      day7.workMinutes
    ) * 0.013;
  const dataNull = dataMax <= 1 ? dataMax : 0.99;
  const dataDiagram = [
    day1.workMinutes > 0 ? day1.workMinutes : dataNull,
    day2.workMinutes > 0 ? day2.workMinutes : dataNull,
    day3.workMinutes > 0 ? day3.workMinutes : dataNull,
    day4.workMinutes > 0 ? day4.workMinutes : dataNull,
    day5.workMinutes > 0 ? day5.workMinutes : dataNull,
    day6.workMinutes > 0 ? day6.workMinutes : dataNull,
    day7.workMinutes > 0 ? day7.workMinutes : dataNull,
  ];

  const graphicalInit = () => {
    const graphical = document.querySelector('.apexcharts-graphical');
    graphical?.setAttribute('transform', 'translate(0, 30)');

    const gridline = document.querySelectorAll('.apexcharts-gridlines-horizontal > .apexcharts-gridline');
    gridline[gridline.length - 1].setAttribute('stroke', '');
    const gridlineOffsetY = gridline[gridline.length - 1].getAttribute('y2');

    const diagramBG = document.getElementById('diagramBG');
    if (gridlineOffsetY?.includes('380')) diagramBG?.classList.remove(styles.diagramBGHigh);
    else diagramBG?.classList.add(styles.diagramBGHigh);

    const yaxisTexts = document.querySelectorAll('.apexcharts-yaxis-texts-g > .apexcharts-text');
    yaxisTexts[yaxisTexts.length - 1].setAttribute('fill', 'transparent');
  };
  const coloringBars = () => {
    const paths = document.querySelectorAll('.apexcharts-series > .apexcharts-bar-area');
    const labels = document.querySelectorAll('.apexcharts-xaxis-texts-g > .apexcharts-xaxis-label');
    paths.forEach((path) => {
      const indexBar = Number(path.getAttribute('j'));
      const isEmpty = Number(path.getAttribute('val')) < 1;
      const isSelected = path.getAttribute('selected') === 'true';
      path.setAttribute('selected', isSelected ? 'true' : 'false');
      if (isEmpty) path.setAttribute('fill', isSelected ? '#999999' : '#C4C4C4');
      else path.setAttribute('fill', isSelected ? '#DC3E22' : '#EA8979');
      path.setAttribute('filter', '');
      labels[indexBar].setAttribute('fill', isSelected ? '#DC3E22' : '#999999');
    });
  };
  const handleClick = (dataPointIndex: number) => {
    dispatch(selectDay({ selectedDay: dataPointIndex + 1 }));
    coloringBars();
  };

  const options = {
    chart: {
      id: 'basic-bar',
      fontFamily: `'SFUIDisplay', sans-serif`,
      foreColor: '#333333',
      toolbar: {
        show: false,
      },
      events: {
        mounted: function (chartContext: any, config: any) {
          graphicalInit();
          coloringBars();
        },
        updated: function (chartContext: any, config: any) {
          graphicalInit();
          coloringBars();
        },
        click: function (event: MouseEvent, chartContext: any, config: any) {
          if (config.dataPointIndex >= 0) {
            const selectedDataPoints = chartContext.w.globals.selectedDataPoints;
            if (selectedDataPoints.length > 0) {
              const pointIndex: number = selectedDataPoints[0].length > 0 ? selectedDataPoints[0][0] : -1;
              handleClick(pointIndex);
            }
          }
        },
        dataPointMouseEnter: function (event: any, chartContext: any, config: any) {
          const elemBar: HTMLElement | null = event.target;
          if (elemBar) {
            const isEmpty = Number(elemBar.getAttribute('val')) < 1;
            const isSelected = elemBar.getAttribute('selected') === 'true';
            if (isEmpty) elemBar.setAttribute('fill', isSelected ? '#999999' : '#D9D9D9');
            else elemBar.setAttribute('fill', isSelected ? '#DC3E22' : '#EE735D');
            elemBar.setAttribute('filter', '');
          }
        },
        dataPointMouseLeave: function (event: any, chartContext: any, config: any) {
          const elemBar: HTMLElement | null = event.target;
          if (elemBar) {
            const isEmpty = Number(elemBar.getAttribute('val')) < 1;
            const isSelected = elemBar.getAttribute('selected') === 'true';
            if (isEmpty) elemBar.setAttribute('fill', isSelected ? '#999999' : '#C4C4C4');
            else elemBar.setAttribute('fill', isSelected ? '#DC3E22' : '#EA8979');
            elemBar.setAttribute('filter', '');
          }
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ['#EA8979'],
    },
    grid: {
      padding: {
        top: 0,
        right: 30,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value < 1 ? 'нет данных' : timeToPropis(value, true);
        },
      },
    },
    xaxis: {
      categories: [
        day1.dayNameShort,
        day2.dayNameShort,
        day3.dayNameShort,
        day4.dayNameShort,
        day5.dayNameShort,
        day6.dayNameShort,
        day7.dayNameShort,
      ],
      labels: {
        style: {
          colors: '#999999',
          fontSize: '24px',
          lineHeight: '29px',
        },
        offsetY: 5,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      opposite: true,
      tickAmount: 5,
      labels: {
        formatter: (value: number) => {
          return timeToPropis(value, true);
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
  };

  React.useEffect(() => {
    dispatch(selectDay({ selectedDay: 0 }));
  }, []);

  const series = [
    {
      name: 'Время работы за день',
      data: dataDiagram,
    },
  ];

  return (
    <div id='diagram' className={styles.diagram}>
      <Chart options={options} series={series} type='bar' width={'100%'} height={'100%'} />
    </div>
  );
}
