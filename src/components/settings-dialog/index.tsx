"use client";

import { ChartArea, Lock, LogOutIcon, LucideIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SettingsTab, useUiStore } from "@/store/ui.store";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { Password } from "./password";
import Usage from "./usage";

const data: { nav: { name: SettingsTab; label: string; icon: LucideIcon }[] } =
  {
    nav: [
      { name: "password", label: "Change password", icon: Lock },
      { name: "usage", label: "Usage", icon: ChartArea },
      { name: "logout", label: "Logout", icon: LogOutIcon },
    ],
  };

export function SettingsDialog() {
  const router = useRouter();
  const { signOut } = useUserStore();
  const {
    isSettingsDialogOpen,
    activeTab,
    setIsSettingsDialogOpen,
    setActiveTab,
  } = useUiStore();

  const handleTabClick = async (tab: SettingsTab) => {
    if (tab === "logout") {
      await signOut();
      router.push("/sign-in");
      router.refresh();
      return;
    }

    setActiveTab(tab);
  };

  return (
    <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === activeTab}
                          onClick={() => handleTabClick(item.name)}
                        >
                          <a href={`#${item.name}`}>
                            <item.icon />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink className="select-none">
                        Settings
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-medium select-none">
                        {
                          data.nav.find((item) => item.name === activeTab)
                            ?.label
                        }
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {activeTab === "password" && <Password />}
              {activeTab === "usage" && <Usage />}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
