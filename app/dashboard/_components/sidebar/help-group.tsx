import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronDown, HelpCircle, HelpingHand, Star } from "lucide-react";

const help = [
  {
    title: "Support",
    url: "#",
    icon: HelpingHand,
  },
  {
    title: "FeedBack",
    url: "#",
    icon: Star,
  },
];
export default function HelpGroup() {
  const { state, isMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible className="group">
            <CollapsibleTrigger asChild>
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-between cursor-pointer rounded-sm py-5">
                  {state === "collapsed" && !isMobile ? (
                    <HelpCircle />
                  ) : (
                    <div className="flex gap-2">
                      <HelpCircle />
                      <span className="font-semibold text-[18px]">Help</span>
                    </div>
                  )}

                  <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {help.map((item, i) => (
                  <SidebarMenuSubItem key={i}>
                    <SidebarMenuSubButton
                      className="hover:bg-primary/30 py-5 rounded-sm"
                      asChild
                    >
                      <a className="text-gray-200!" href={item.url}>
                        <item.icon className=" text-primary!" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
