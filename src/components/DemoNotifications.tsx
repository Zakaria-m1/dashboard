"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/stores/notificationStore";

const demoNotifications = [
    {
        name: "New user signup",
        description: "John Doe just joined the platform",
        icon: "👤",
        color: "#FFB800",
        time: "Just now"
    },
    {
        name: "Payment processed",
        description: "Premium subscription - $49.99",
        icon: "💸",
        color: "#00C9A7",
        time: "Just now"
    },
    {
        name: "API Integration",
        description: "Connected to OpenAI API",
        icon: "🔌",
        color: "#8B5CF6",
        time: "Just now"
    },
    {
        name: "Food scan completed",
        description: "Nutritional analysis successful",
        icon: "📸",
        color: "#1E86FF",
        time: "Just now"
    },
    {
        name: "System update",
        description: "Database optimization complete",
        icon: "⚡",
        color: "#10B981",
        time: "Just now"
    },
    {
        name: "New feedback",
        description: "5-star rating received",
        icon: "⭐",
        color: "#F59E0B",
        time: "Just now"
    },
    {
        name: "Milestone reached",
        description: "10,000 active users!",
        icon: "🎉",
        color: "#EC4899",
        time: "Just now"
    }
];

export function DemoNotifications() {
    const addNotification = useNotificationStore((state) => state.addNotification);

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            const notification = demoNotifications[index];
            addNotification(notification);

            index = (index + 1) % demoNotifications.length;
        }, 3000); // Show a new notification every 3 seconds

        return () => clearInterval(interval);
    }, [addNotification]);

    return null; // This component doesn't render anything
} 