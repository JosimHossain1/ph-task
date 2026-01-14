import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { IconBook } from "@tabler/icons-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <p>Loading sidebar...</p>;
  }

  // Admin nav
  const adminNav = [
    { title: "Dashboard", url: "/dashboard", iconName: "dashboard" },
    { title: "Manage Books", url: "/dashboard/manage-books", iconName: "book" },
    { title: "Manage Genres", url: "/dashboard/manage-genre", iconName: "chart" },
    { title: "Manage Users", url: "/dashboard/manage-users", iconName: "users" },
    { title: "Moderate Reviews", url: "/dashboard/moderate-review", iconName: "star" },
    { title: "Manage Tutorials", url: "/dashboard/manage-tutorials", iconName: "video" },
  ];

  // User nav
  const userNav = [
    { title: "Dashboard", url: "/dashboard", iconName: "dashboard" },
    { title: "Browse Books", url: "/dashboard/browse-books", iconName: "book" },
    { title: "My Library", url: "/dashboard/my-library", iconName: "chart" },
    { title: "Book Details", url: "/dashboard/book-details", iconName: "users" },
    { title: "Tutorials", url: "/dashboard/tutorial", iconName: "video" },
  ];

  const navItems = currentUser.role === "Admin" ? adminNav : userNav;

  const userInfo = {
    name:  currentUser.name,
    email: currentUser.email,
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconBook className="!size-5" />
                <span className="text-base font-semibold">BookWorm</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  );
}
