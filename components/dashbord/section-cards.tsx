"use client";

import { useEffect, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  totalGenres: number;
  totalPendingRequests: number;
}

export function SectionCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  // Card configuration
  const cards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      trend: "+12.5%",
      trendIcon: <IconTrendingUp className="size-4" />,
      footerText: "Books added this month",
      footerDesc: "Keep track of all library books",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      trend: "-5%",
      trendIcon: <IconTrendingDown className="size-4" />,
      footerText: "User registration trend",
      footerDesc: "Monitor new and active users",
    },
    {
      title: "Total Genres",
      value: stats.totalGenres,
      trend: "+8%",
      trendIcon: <IconTrendingUp className="size-4" />,
      footerText: "Genres in the library",
      footerDesc: "Diversity of content available",
    },
    {
      title: "Pending Requests",
      value: stats.totalPendingRequests,
      trend: "+2%",
      trendIcon: <IconTrendingUp className="size-4" />,
      footerText: "Requests awaiting approval",
      footerDesc: "Monitor pending borrow requests",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                {card.trendIcon}
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footerText} {card.trendIcon}
            </div>
            <div className="text-muted-foreground">{card.footerDesc}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
