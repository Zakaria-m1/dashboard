import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAdminData } from '../hooks/useAdminData';

type TimeRange = 'daily' | 'weekly' | 'monthly';

const TimeRangeButton = ({ range, active, onClick }: { range: TimeRange; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm rounded-lg transition-colors font-medium
      ${active ? 'bg-purple-500/20 text-purple-400' : 'bg-black/20 hover:bg-gray-800/50 text-gray-400'}`}
    >
        {range.charAt(0).toUpperCase() + range.slice(1)}
    </button>
);

export const Analytics = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('daily');
    const { data } = useAdminData();
    const { activityStats, financialMetrics, performanceMetrics } = data;

    const chartConfigs = {
        activity: {
            series: [
                {
                    name: 'API Calls',
                    data: [31, 40, 28, 51, 42, 109, 100, 93, 85, 99, 75, 82]
                },
                {
                    name: 'Active Users',
                    data: [11, 32, 45, 32, 34, 52, 41, 55, 49, 62, 69, 91]
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    background: 'transparent',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                theme: {
                    mode: 'dark'
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                colors: ['#8B5CF6', '#3B82F6'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.3,
                        opacityTo: 0.1,
                        stops: [0, 90, 100]
                    }
                },
                grid: {
                    borderColor: 'rgba(255,255,255,0.1)',
                    strokeDashArray: 3,
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    labels: {
                        style: {
                            colors: '#9ca3af',
                            fontFamily: 'inherit'
                        }
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
                            colors: '#9ca3af',
                            fontFamily: 'inherit'
                        }
                    }
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                        show: false
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    labels: {
                        colors: '#9ca3af'
                    }
                }
            } as ApexOptions
        },
        scanTypes: {
            series: [
                activityStats.scansByType.FOOD_SCAN,
                activityStats.scansByType.BARCODE_SCAN,
                activityStats.scansByType.MACRO_UPDATE
            ],
            options: {
                chart: {
                    type: 'donut',
                    background: 'transparent'
                },
                theme: {
                    mode: 'dark'
                },
                labels: ['Food Scans', 'Barcode Scans', 'Macro Updates'],
                colors: ['#8B5CF6', '#3B82F6', '#EC4899'],
                plotOptions: {
                    pie: {
                        donut: {
                            size: '75%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total Scans',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
                                    }
                                }
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#fff'],
                        fontFamily: 'inherit'
                    },
                    dropShadow: {
                        enabled: true,
                        blur: 3
                    }
                },
                legend: {
                    show: true,
                    position: 'bottom',
                    labels: {
                        colors: '#9ca3af'
                    },
                    fontFamily: 'inherit'
                },
                tooltip: {
                    theme: 'dark',
                    y: {
                        formatter: (val) => val.toString()
                    }
                }
            } as ApexOptions
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Analytics Overview</h3>
                    <p className="text-sm text-gray-400 mt-1">Track user activity and system usage</p>
                </div>
                <div className="flex gap-2">
                    {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
                        <TimeRangeButton
                            key={range}
                            range={range}
                            active={timeRange === range}
                            onClick={() => setTimeRange(range)}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Activity Trends</h4>
                    <div className="h-[350px]">
                        <ReactApexChart
                            options={chartConfigs.activity.options}
                            series={chartConfigs.activity.series}
                            type="area"
                            height="100%"
                        />
                    </div>
                </div>

                <div className="lg:col-span-1 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Scan Distribution</h4>
                    <div className="h-[350px]">
                        <ReactApexChart
                            options={chartConfigs.scanTypes.options}
                            series={chartConfigs.scanTypes.series}
                            type="donut"
                            height="100%"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 