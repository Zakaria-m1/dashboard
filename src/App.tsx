import { KeyMetrics } from './components/KeyMetrics';
import { Analytics } from './components/Analytics';
import { RecentActivity } from './components/RecentActivity';
import { SystemPerformance } from './components/SystemPerformance';
import { NotificationToast } from './components/NotificationToast';
import { DemoNotifications } from './components/DemoNotifications';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <NotificationToast />
      <DemoNotifications />

      {/* Main Content */}
      <main className="relative min-h-screen p-8">
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-black pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              System Monitor
            </h1>
            <p className="text-gray-500 mt-2">
              Real-time performance analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm flex items-center gap-2 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Operational
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="relative grid gap-8 mt-40">
          {/* Key Metrics */}
          <section>
            <KeyMetrics />
          </section>

          {/* Charts */}
          <section>
            <Analytics />
          </section>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="lg:col-span-1">
              <RecentActivity />
            </section>
            <section className="lg:col-span-1">
              <SystemPerformance />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;