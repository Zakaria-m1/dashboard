"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNotificationStore, Notification } from "@/stores/notificationStore";

const NotificationItem = ({ notification }: { notification: Notification }) => {
    const removeNotification = useNotificationStore((state) => state.removeNotification);

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(notification.id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [notification.id, removeNotification]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                "bg-gray-900/80 backdrop-blur-md border border-gray-800/50",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
                "transform-gpu"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: `${notification.color}20`,
                        color: notification.color,
                    }}
                >
                    <span className="text-lg">{notification.icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <div className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-100">
                        <span className="text-sm sm:text-base">{notification.name}</span>
                        <span className="mx-1 text-gray-500">·</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm font-normal text-gray-400">
                        {notification.description}
                    </p>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-gray-800/5 to-gray-900/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>
    );
};

export function NotificationToast() {
    const notifications = useNotificationStore((state) => state.notifications);

    return (
        <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 z-50 flex w-full flex-col items-center gap-4 p-4 sm:max-w-[440px]">
            <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </AnimatePresence>
        </div>
    );
} 