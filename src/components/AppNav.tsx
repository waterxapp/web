import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Droplets, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
export function AppNav(): JSX.Element {
  const { pathname } = useLocation();
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const visibleLinks = NAV_LINKS.filter(link => user?.role && link.roles.includes(user.role));
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Droplets className="h-7 w-7 text-brand" />
          <span className="text-lg font-semibold text-foreground">{APP_NAME}</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {visibleLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname.startsWith(link.href)}>
                <Link to={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-4 p-2">
            <div className="text-sm">
                <div className="font-semibold text-foreground">{user?.name}</div>
                <div className="text-muted-foreground">{user?.role}</div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}