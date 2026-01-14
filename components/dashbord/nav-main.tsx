"use client";

import * as React from "react";
import {
  IconBook,
  IconChartBar,
  IconDashboard,
  IconStar,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";

const iconsMap: Record<string, React.ElementType> = {
  dashboard: IconDashboard,
  book: IconBook,
  chart: IconChartBar,
  users: IconUsers,
  star: IconStar,
  video: IconVideo,
};

interface NavItem {
  title: string;
  url: string;
  iconName: string;
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = iconsMap[item.iconName];
        return (
          <li key={item.url}>
            <a
              href={item.url}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
