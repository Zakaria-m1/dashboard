import { motion } from 'framer-motion';
import { Activity, Users, CreditCard, Server, TrendingUp, Zap, Database, Clock } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    icon: typeof Activity;
    title: string;
    value: string;
    trend?: number;
    color: string;
    subValue?: string;
}

const MetricCard = ({ icon: Icon, title, value, trend, color, subValue }: MetricCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:bg-gray-800/50 transition-colors group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl" />
            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-gray-400 text-sm mb-1">{title}</p>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                        {value}
                    </h3>
                    {subValue && (
                        <p className="text-gray-500 text-sm mt-1">
                            {subValue}
                        </p>
                    )}
                    {trend && (
                        <div className={cn(
                            "text-sm mt-2 flex items-center gap-1",
                            trend > 0 ? "text-green-400" : "text-red-400"
                        )}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </div>
                    )}
                </div>
                <div className="p-2.5 rounded-lg bg-gray-800/50 text-gray-400 group-hover:text-gray-300 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </motion.div>
    );
};

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

export const KeyMetrics = () => {
    const { data, loading } = useAdminData();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-800/50 rounded-xl" />
                ))}
            </div>
        );
    }

    const {
        userStats,
        activityStats,
        financialMetrics,
        performanceMetrics,
        realtimeStats
    } = data;

    const metrics = [
        {
            icon: Users,
            title: 'Active Users',
            value: formatNumber(userStats.activeToday),
            trend: ((userStats.activeToday - userStats.activeLast7Days / 7) / (userStats.activeLast7Days / 7)) * 100,
            color: 'bg-purple-500/20',
            subValue: `${formatNumber(userStats.totalUsers)} total users`
        },
        {
            icon: CreditCard,
            title: 'Revenue',
            value: formatCurrency(financialMetrics.revenue.today),
            trend: ((financialMetrics.revenue.today - financialMetrics.revenue.thisMonth / 30) / (financialMetrics.revenue.thisMonth / 30)) * 100,
            color: 'bg-blue-500/20',
            subValue: `${formatCurrency(financialMetrics.revenue.thisMonth)} this month`
        },
        {
            icon: Activity,
            title: 'API Calls',
            value: formatNumber(performanceMetrics.apiUsage.openAI.totalCalls),
            color: 'bg-pink-500/20',
            subValue: `${performanceMetrics.apiUsage.openAI.successRate.toFixed(1)}% success rate`
        },
        {
            icon: Server,
            title: 'Server Load',
            value: `${performanceMetrics.errorRate.toFixed(2)}%`,
            color: 'bg-green-500/20',
            subValue: `${performanceMetrics.averageResponseTime}ms avg response`
        },
        {
            icon: TrendingUp,
            title: 'Growth',
            value: `${userStats.newUsersToday} today`,
            trend: ((userStats.newUsersToday - (userStats.totalUsers / 365)) / (userStats.totalUsers / 365)) * 100,
            color: 'bg-yellow-500/20',
            subValue: 'New users'
        },
        {
            icon: Zap,
            title: 'Active Scans',
            value: formatNumber(realtimeStats.activeScans),
            color: 'bg-indigo-500/20',
            subValue: `${formatNumber(activityStats.averageDailyScans)} daily average`
        },
        {
            icon: Database,
            title: 'Storage',
            value: formatNumber(performanceMetrics.apiUsage.firebase.bandwidth),
            color: 'bg-red-500/20',
            subValue: `${formatNumber(performanceMetrics.apiUsage.firebase.reads)} reads today`
        },
        {
            icon: Clock,
            title: 'Response Time',
            value: `${performanceMetrics.averageResponseTime}ms`,
            color: 'bg-cyan-500/20',
            subValue: `${realtimeStats.queuedRequests} in queue`
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
                <MetricCard key={metric.title} {...metric} />
            ))}
        </div>
    );
}; 