
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const CATEGORIES = [
  "전체",
  "드론",
  "로봇 암",
  "로봇 그리퍼",
  "리프 스프링",
  "머신 바이스",
  "서스펜션",
  "V4 엔진",
];

export default function ExploreSidebar() {
  const selectedCategory = "전체"; // Default selected for now

  return (
    <SidebarProvider className="min-h-0 h-full">
      <Sidebar
        collapsible="none"
        className="w-40 border-none bg-transparent sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        <SidebarHeader className="pb-4 pl-2">
          <h2 className="text-foundation-gray-8 text-lg font-extrabold">학습 카테고리</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {CATEGORIES.map((category) => (
                  <SidebarMenuItem key={category}>
                    <SidebarMenuButton
                      asChild
                      isActive={category === selectedCategory}
                      className="h-10 px-4 py-3 text-foundation-black-text text-base font-bold transition-colors hover:bg-foundation-blue-1 hover:text-foundation-blue-6 data-[active=true]:bg-foundation-blue-1 data-[active=true]:text-foundation-blue-6 data-[active=true]:text-lg data-[active=true]:font-bold"
                    >
                      <button>
                        <span>{category}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}