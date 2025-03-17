import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/constants";
 

export default function AppSideBar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row items-center gap-4">
          <div className="bg-light-100 p-2 rounded-full">
            {/* <img src={''} alt="logo" /> */}
            <h1>TS</h1>
          </div>
          {open && <h1 className="font-semibold text-xl">Tiny Steps</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="min-h-[200px] justify-start flex gap-2">
              {adminNavItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "hover:bg-gray-200 rounded-lg hover:text-black",
                    location.pathname === item.url ? "bg-primary-main text-white" : "",
                    open && "py-1"
                  )}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className={cn(
            "flex flex-row p-1 justify-between hover:bg-gray-200 rounded-lg hover:text-black cursor-pointer",
            open && "p-2"
          )}
        >
          {open && <h1>Logout</h1>}
          <LogOut size={24} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
