import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';

export function LiveChart() {
  const [series, setSeries] = useState([{
    name: 'System Performance',
    data: Array(30).fill(0).map(() => Math.floor(Math.random() * 100))
  }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeries(currentSeries => [{
        ...currentSeries[0],
        data: [
          ...currentSeries[0].data.slice(1),
          Math.floor(Math.random() * 100)
        ]
      }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      type: 'area',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      strokeDashArray: 5
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100]
      }
    },
    theme: {
      mode: 'dark'
    },
    tooltip: {
      theme: 'dark'
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af'
        }
      }
    },
    colors: ['#8B5CF6']
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-[300px]"
    >
      <Chart
        options={options}
        series={series}
        type="area"
        height="100%"
      />
    </motion.div>
  );
}