import { motion } from 'framer-motion';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useAdminData } from '../hooks/useAdminData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PerformanceMetric {
    name: string;
    value: number;
    color: string;
    formatter?: (value: number) => string;
}

const CircularProgress = ({ metric }: { metric: PerformanceMetric }) => {
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#1F2937',
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        blur: 3,
                        opacity: 0.2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: metric.color,
                        formatter: function (val) {
                            return metric.formatter ? metric.formatter(val) : `${val}%`;
                        }
                    }
                },
                hollow: {
                    margin: 15,
                    size: '65%'
                }
            }
        },
        colors: [metric.color],
        stroke: {
            lineCap: 'round',
            dashArray: 0
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100]
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50"
        >
            <div className="w-32 h-20">
                <ReactApexChart
                    options={options}
                    series={[metric.value]}
                    type="radialBar"
                    height="160px"
                />
            </div>
            <span className="text-sm text-gray-400 mt-2 font-medium">{metric.name}</span>
        </motion.div>
    );
};

const MetricCard = ({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col space-y-1 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50"
    >
        <span className="text-sm text-gray-400 font-medium">{label}</span>
        <span className="text-xl font-semibold tracking-tight">{value}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
            {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {change}
        </div>
    </motion.div>
);

const formatBandwidth = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let value = bytes;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex++;
    }

    return `${value.toFixed(1)}${units[unitIndex]}`;
};

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

export const SystemPerformance = () => {
    const { data } = useAdminData();
    const { performanceMetrics } = data;

    const metrics: PerformanceMetric[] = [
        {
            name: 'API Success',
            value: performanceMetrics.apiUsage.openAI.successRate,
            color: '#8B5CF6'
        },
        {
            name: 'Response Time',
            value: Math.min(100, (performanceMetrics.averageResponseTime / 1000) * 100),
            color: '#3B82F6',
            formatter: (val) => `${(val * 10).toFixed(0)}ms`
        },
        {
            name: 'Error Rate',
            value: Math.min(100, performanceMetrics.errorRate * 100),
            color: '#EC4899',
            formatter: (val) => `${val.toFixed(2)}%`
        },
        {
            name: 'System Load',
            value: 75, // Replace with actual system load
            color: '#10B981'
        }
    ];

    const apiMetrics = [
        {
            label: 'Total API Calls',
            value: formatNumber(performanceMetrics.apiUsage.openAI.totalCalls),
            change: '+12.5%',
            positive: true
        },
        {
            label: 'Avg. Tokens/Call',
            value: formatNumber(performanceMetrics.apiUsage.openAI.averageTokens),
            change: '-3.2%',
            positive: true
        },
        {
            label: 'Firebase Reads',
            value: formatNumber(performanceMetrics.apiUsage.firebase.reads),
            change: '+8.7%',
            positive: false
        },
        {
            label: 'Firebase Writes',
            value: formatNumber(performanceMetrics.apiUsage.firebase.writes),
            change: '+5.3%',
            positive: false
        },
        {
            label: 'Bandwidth Used',
            value: formatBandwidth(performanceMetrics.apiUsage.firebase.bandwidth),
            change: '+15.2%',
            positive: false
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">System Performance</h3>
                    <p className="text-sm text-gray-400 mt-1">Monitor system health and API usage</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    System Operational
                </div>
            </div>

            <div className="grid gap-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric) => (
                        <CircularProgress key={metric.name} metric={metric} />
                    ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {apiMetrics.map((metric) => (
                        <MetricCard key={metric.label} {...metric} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}; 