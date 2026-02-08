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
} from '@/components/ui/sidebar';
import { CATEGORIES } from '@/constants/explore';

export default function ExploreSidebar() {
  const selectedCategory = '전체'; // Default selected for now

  return (
    <SidebarProvider className="h-full min-h-0">
      <Sidebar
        collapsible="none"
        className="sticky top-28 max-h-[calc(100vh-8rem)] w-40 overflow-y-auto border-none bg-transparent"
      >
        <SidebarHeader className="pb-4 pl-2">
          <h2 className="text-foundation-gray-8 text-lg font-extrabold">
            학습 카테고리
          </h2>
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
                      className="text-foundation-black-text hover:bg-foundation-blue-1 hover:text-foundation-blue-6 data-[active=true]:bg-foundation-blue-1 data-[active=true]:text-foundation-blue-6 h-10 px-4 py-3 text-base font-bold transition-colors data-[active=true]:text-lg data-[active=true]:font-bold"
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
