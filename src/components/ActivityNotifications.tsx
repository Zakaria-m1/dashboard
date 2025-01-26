"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useAdminData } from "@/hooks/useAdminData";

interface Item {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}

const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};

const getActivityIcon = (type: string): string => {
    switch (type) {
        case 'payment':
            return '💸';
        case 'user':
            return '👤';
        case 'scan':
            return '📸';
        case 'api':
            return '🔌';
        case 'error':
            return '⚠️';
        default:
            return '📝';
    }
};

const getActivityColor = (type: string): string => {
    switch (type) {
        case 'payment':
            return '#00C9A7';
        case 'user':
            return '#FFB800';
        case 'scan':
            return '#1E86FF';
        case 'api':
            return '#8B5CF6';
        case 'error':
            return '#FF3D71';
        default:
            return '#64748b';
    }
};

export function ActivityNotifications({
    className,
}: {
    className?: string;
}) {
    const { data } = useAdminData();
    const { activityStats } = data;

    const notifications: Item[] = activityStats.recentActivities.map(activity => ({
        name: activity.action,
        description: activity.details,
        time: activity.timestamp,
        icon: getActivityIcon(activity.type),
        color: getActivityColor(activity.type),
    }));

    return (
        <div
            className={cn(
                "relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg border border-gray-800/50 bg-black/20 backdrop-blur-sm p-6",
                "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-purple-500/5 before:to-transparent before:opacity-50",
                className,
            )}
        >
            <div className="mb-4 flex items-center justify-between relative z-10">
                <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
                <span className="text-sm text-gray-400">{notifications.length} activities</span>
            </div>
            <AnimatedList delay={500} className="relative z-10">
                {notifications.map((item, idx) => (
                    <Notification key={idx} {...item} />
                ))}
            </AnimatedList>
        </div>
    );
} 