import React, { useEffect } from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { Beer, Video, Trophy } from "lucide-react"; // Import your icons here
import { api } from "../utils/api";
import { useUserStore } from "../libs/zustand/auth";

type TStats = {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  count: number;
};

type TAnalytics = {
  videoPendingCount: number;
  totalEntryCount: number;
  oweCount: number;
};
export default function StatsSection() {
  const { user } = useUserStore();
  const [analytics, setAnalytics] = React.useState<TAnalytics>({
    oweCount: 0,
    totalEntryCount: 0,
    videoPendingCount: 0,
  });

  const getDashboardAnalytics = async () => {
    if (!user) return;
    try {
      const { data, status } = await api.getDashboardAnalyticsApi(user._id);
      if (status === 200) {
        setAnalytics({
          oweCount: data.oweCount,
          totalEntryCount: data.totalEntryCount,
          videoPendingCount: data.videoPendingCount,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDashboardAnalytics();
  }, [user]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Beer className="text-blue-500 w-10 h-10 " />
          <div className="flex flex-col">
            <p className="text-md">Beers Owed</p>
            <p className="text-small text-default-500">{analytics.oweCount}</p>
          </div>
        </CardHeader>
      </Card>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Video className="text-green-500 w-10 h-10 " />
          <div className="flex flex-col">
            <p className="text-md">Videos Pending</p>
            <p className="text-small text-default-500">
              {analytics.videoPendingCount}
            </p>
          </div>
        </CardHeader>
      </Card>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Trophy className="text-yellow-500 w-10 h-10 " />
          <div className="flex flex-col">
            <p className="text-md">Your Entries</p>
            <p className="text-small text-default-500">
              {analytics.totalEntryCount}
            </p>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
