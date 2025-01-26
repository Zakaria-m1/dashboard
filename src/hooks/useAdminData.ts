import { useState, useEffect } from "react";

interface UserStats {
  totalUsers: number;
  activeToday: number;
  activeLast7Days: number;
  activeLast30Days: number;
  premiumUsers: number;
  newUsersToday: number;
}

interface ActivityStats {
  totalActivities: number;
  todayActivities: number;
  scansByType: {
    FOOD_SCAN: number;
    BARCODE_SCAN: number;
    MACRO_UPDATE: number;
  };
  averageDailyScans: number;
  peakUsageHours: { hour: number; count: number }[];
  activeUserRetention: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  recentActivities: {
    type: "payment" | "user" | "scan" | "api" | "error";
    action: string;
    details: string;
    timestamp: string;
  }[];
}

interface FinancialMetrics {
  revenue: {
    today: number;
    thisMonth: number;
    total: number;
    subscriptionRevenue: number;
    oneTimePayments: number;
  };
  costs: {
    openAI: {
      today: number;
      thisMonth: number;
      total: number;
      averagePerUser: number;
    };
    firebase: {
      estimatedMonthly: number;
    };
    total: {
      today: number;
      thisMonth: number;
      total: number;
    };
  };
  profits: {
    today: number;
    thisMonth: number;
    total: number;
    margin: number;
  };
}

interface PerformanceMetrics {
  averageResponseTime: number;
  errorRate: number;
  apiUsage: {
    openAI: {
      totalCalls: number;
      averageTokens: number;
      successRate: number;
    };
    firebase: {
      reads: number;
      writes: number;
      bandwidth: number;
    };
  };
}

export interface AdminDashboardData {
  timestamp: Date;
  userStats: UserStats;
  activityStats: ActivityStats;
  financialMetrics: FinancialMetrics;
  performanceMetrics: PerformanceMetrics;
  realtimeStats: {
    currentlyOnline: number;
    activeScans: number;
    queuedRequests: number;
  };
}

// Mock data for development
const mockData: AdminDashboardData = {
  timestamp: new Date(),
  userStats: {
    totalUsers: 12847,
    activeToday: 2847,
    activeLast7Days: 8234,
    activeLast30Days: 10123,
    premiumUsers: 1234,
    newUsersToday: 156,
  },
  activityStats: {
    totalActivities: 234567,
    todayActivities: 12345,
    scansByType: {
      FOOD_SCAN: 8234,
      BARCODE_SCAN: 3456,
      MACRO_UPDATE: 655,
    },
    averageDailyScans: 11234,
    peakUsageHours: [
      { hour: 12, count: 1234 },
      { hour: 13, count: 1156 },
      { hour: 18, count: 987 },
      { hour: 19, count: 876 },
      { hour: 20, count: 765 },
    ],
    activeUserRetention: {
      daily: 78,
      weekly: 65,
      monthly: 45,
    },
    recentActivities: [
      {
        type: "payment",
        action: "Payment made",
        details: "Payment ID: 12345",
        timestamp: "2024-04-01T12:00:00",
      },
      {
        type: "user",
        action: "User registered",
        details: "New user: John Doe",
        timestamp: "2024-04-01T13:00:00",
      },
      {
        type: "scan",
        action: "Scan performed",
        details: "Food scan",
        timestamp: "2024-04-01T18:00:00",
      },
      {
        type: "api",
        action: "API call",
        details: "Success",
        timestamp: "2024-04-01T19:00:00",
      },
      {
        type: "error",
        action: "Error",
        details: "Failed to fetch data",
        timestamp: "2024-04-01T20:00:00",
      },
    ],
  },
  financialMetrics: {
    revenue: {
      today: 2345.67,
      thisMonth: 45678.9,
      total: 234567.89,
      subscriptionRevenue: 198765.43,
      oneTimePayments: 35802.46,
    },
    costs: {
      openAI: {
        today: 456.78,
        thisMonth: 8765.43,
        total: 45678.9,
        averagePerUser: 0.23,
      },
      firebase: {
        estimatedMonthly: 50,
      },
      total: {
        today: 556.78,
        thisMonth: 9815.43,
        total: 49678.9,
      },
    },
    profits: {
      today: 1788.89,
      thisMonth: 35863.47,
      total: 184888.99,
      margin: 78.82,
    },
  },
  performanceMetrics: {
    averageResponseTime: 234,
    errorRate: 0.45,
    apiUsage: {
      openAI: {
        totalCalls: 234567,
        averageTokens: 345,
        successRate: 99.55,
      },
      firebase: {
        reads: 1234567,
        writes: 234567,
        bandwidth: 45678,
      },
    },
  },
  realtimeStats: {
    currentlyOnline: 1234,
    activeScans: 67,
    queuedRequests: 12,
  },
};

export const useAdminData = (refreshInterval = 5000) => {
  const [data, setData] = useState<AdminDashboardData>(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In production, replace this with actual API call
        // const response = await functions.httpsCallable('getDashboardData')({ forceRefresh: false });
        // setData(response.data);
        setData(mockData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch dashboard data")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { data, loading, error };
};
