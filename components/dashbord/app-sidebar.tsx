"use client"

import * as React from "react"
import {
  IconBook,
  IconChartBar,
  IconDashboard,
  IconStar,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Books",
      url: "/dashboard/manage-books",
      icon: IconBook,
    },
    {
      title: "Manage Genres",
      url: "/dashboard/manage-genre",
      icon: IconChartBar,
    },
    {
      title: "Manage Users",
      url: "/dashboard/manage-users",
      icon: IconUsers,
    },
    {
      title: "Moderate Reviews",
      url: "/dashboard/moderate-review",
      icon: IconStar,
    },
    {
      title: "Manage Tutorials",
      url: "/dashboard/manage-tutorials",
      icon: IconVideo,
    },
  ],

}

const userData = {
  user: {
    name: "User 1",
    email: "user@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Browse Books",
      url: "/dashboard/browse-books",
      icon: IconBook,
    },
    {
      title: "My Library",
      url: "/dashboard/my-library",
      icon: IconChartBar,
    },
    {
      title: "Book Details",
      url: "/dashboard/book-details",
      icon: IconUsers,
    },
    {
      title: "Tutorials",
      url: "/dashboard/tutorial",
      icon: IconVideo,
    },
  ],

}
const user = "Admin" as string

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconBook className="!size-5" />
                <span className="text-base font-semibold">BookWorm</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user == "Admin" ? data.navMain : userData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user == "Admin" ? data.user : userData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
