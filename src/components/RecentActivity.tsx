import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, XCircle, Clock, Activity, Zap, ArrowUpRight } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';

interface ActivityItem {
    id: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    time: string;
}

const activities: ActivityItem[] = [
    { id: 1, type: 'success', message: 'Payment processed successfully', time: '2m ago' },
    { id: 2, type: 'error', message: 'Failed to connect to API endpoint', time: '5m ago' },
    { id: 3, type: 'warning', message: 'High memory usage detected', time: '10m ago' },
    { id: 4, type: 'success', message: 'New user registration', time: '15m ago' },
    { id: 5, type: 'success', message: 'Database backup completed', time: '20m ago' },
    { id: 6, type: 'error', message: 'Service deployment failed', time: '25m ago' },
];

const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
        case 'success':
            return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        case 'error':
            return <XCircle className="w-4 h-4 text-red-500" />;
        case 'warning':
            return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
};

const PeakHourIndicator = ({ hour, count, maxCount }: { hour: number; count: number; maxCount: number }) => {
    const percentage = (count / maxCount) * 100;
    const timeLabel = `${hour.toString().padStart(2, '0')}:00`;

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10 font-medium">{timeLabel}</span>
            <div className="flex-1 bg-black/20 rounded-full h-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                    style={{
                        boxShadow: '0 0 8px rgba(139, 92, 246, 0.3)'
                    }}
                />
            </div>
            <span className="text-xs text-gray-400 w-16 text-right font-medium">{count} scans</span>
        </div>
    );
};

export const RecentActivity = () => {
    const { data } = useAdminData();
    const { activityStats, realtimeStats } = data;

    const maxPeakCount = Math.max(...activityStats.peakUsageHours.map(h => h.count));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <p className="text-sm text-gray-400 mt-1">Real-time system events and metrics</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400 font-medium">
                            {realtimeStats.activeScans} active
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">
                            {activityStats.todayActivities} today
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800/50">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                        <h4 className="text-sm font-medium text-gray-400">System Events</h4>
                        <button className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                            View all
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-gray-800/50">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors"
                            >
                                {getIcon(activity.type)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-300">{activity.message}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock className="w-3 h-3 text-gray-500" />
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-400">Peak Usage Hours</h4>
                        <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <div className="space-y-3">
                        {activityStats.peakUsageHours.map((hour) => (
                            <PeakHourIndicator
                                key={hour.hour}
                                hour={hour.hour}
                                count={hour.count}
                                maxCount={maxPeakCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 