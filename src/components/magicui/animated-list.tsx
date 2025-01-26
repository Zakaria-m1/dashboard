"use client";

import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedList({
    children,
    className,
    delay = 1000,
}: AnimatedListProps) {
    const [scope, animate] = useAnimate();
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (!scope.current) return;

        const items = scope.current.children;
        if (!items.length) return;

        // Reset all items to initial state
        animate(
            items,
            { opacity: 0, y: 20 },
            { duration: 0 }
        );

        // Animate items in sequence with a staggered delay
        timeoutRef.current = setTimeout(() => {
            animate(
                items,
                {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        bounce: 0.3
                    }
                },
                {
                    duration: 0.5,
                    delay: stagger(0.1),
                    ease: "easeOut",
                }
            );
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [scope, animate, delay, children]);

    return (
        <div
            ref={scope}
            className={cn(
                "flex flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700",
                className
            )}
        >
            {children}
        </div>
    );
} 