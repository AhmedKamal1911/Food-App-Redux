"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User, Bell, Info } from "lucide-react";
import GeneralSettingsContent from "./general-settings-content";
import PersonalInfoContent from "./personal-info-content";
import { User as UserType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
export type UserInfo = Omit<UserType, "password"> & { hasPassword: boolean };
const getTabsContent = (userInfo: UserInfo) => {
  const tabs = [
    {
      value: "general",
      label: "General",
      icon: <User className="w-5 h-5" />,
      content: (
        <GeneralSettingsContent
          hasPassword={userInfo.hasPassword}
          userId={userInfo.id}
        />
      ),
    },
    {
      value: "personal-info",
      label: "Personal Info",
      icon: <Info className="w-5 h-5" />,
      content: <PersonalInfoContent user={userInfo} />,
    },
    {
      value: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      content: (
        <>
          <span className="text-xl font-semibold mb-2 block">
            Notifications
          </span>
          <span className="text-gray-600 block">
            Manage your notification preferences here.
          </span>
        </>
      ),
    },
  ];

  return tabs;
};
type Props = {
  user: UserInfo;
};
export default function SettingsTabs({ user }: Props) {
  const tab = useSearchParams().get("tab");
  const tabs = getTabsContent(user);
  console.log({ pass: user.hasPassword });
  return (
    <Tabs
      value={tab ?? undefined}
      defaultValue={tabs[0].value}
      className="w-full"
    >
      <ScrollArea className="w-full">
        <TabsList className="bg-gray-100 rounded-md p-1 flex gap-2 mx-auto mb-3">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("tab", tab.value);

                window.history.replaceState(null, "", url.toString());
              }}
              className="flex items-center gap-2 px-5 py-4 rounded-sm font-semibold text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white text-[18px]"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="bg-white shadow-md border rounded-md p-3 sm:p-6 min-h-[200px]">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
