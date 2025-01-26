import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: number;
  color: string;
  pulseColor: string;
}

export function StatusCard({ icon: Icon, title, value, trend, color, pulseColor }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={2000}
        className="relative group"
      >
        <div
          className="absolute -inset-0.5 bg-gradient-to-r opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur"
          style={{
            '--tw-gradient-from': color,
            '--tw-gradient-to': pulseColor,
          } as any}
        />
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-[color:var(--glow-color)] transition-all duration-300">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[color:var(--glow-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`p-3 rounded-lg transition-colors duration-300`}
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </motion.div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
              </div>
              <motion.h3
                className="text-3xl font-bold text-white mt-3 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {value}
              </motion.h3>
              <div className="flex items-center gap-2 mt-2">
                <motion.span
                  className={`flex items-center ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </motion.span>
                <span className="text-gray-500 text-sm">vs last period</span>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}