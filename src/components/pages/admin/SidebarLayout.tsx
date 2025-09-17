import Loading from "@/components/ui/Loading";
import { adminSidebar } from "@/constant";
import { ChevronLeft, LogOut } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "@/store/auth-api";
import { useAuthContext } from "@/context/AuthProvider";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: Props) => {
    const [logout] = useLogoutMutation();
    const pathname = useLocation();
    const [active, setActive] = useState(pathname.pathname || "/job-registry");
    const { authUser } = useAuthContext();
    const { setAuthUser } = useAuthContext();

    const [open, setOpen] = useState(true);
    const [loading] = useState(true);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            setAuthUser(null);
            localStorage.removeItem("user");
        } catch (err) {
        console.error("Logout failed", err);
        }
    }
  return (
    <div>
      <div className="h-full w-screen flex bg-[#eee8e8]">
        <div
          className={`h-screen fixed p-3 bg-gradient-to-b from-[#2b2b2b] via-[#5a0000] to-[#2b2b2b] rounded-r-lg flex flex-col z-20 justify-between min-w-[269px] ${
            open ? "" : "-left-[269px]"
          }`}
        >
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer absolute bg-[#5a0000] w-3 h-10 -right-[12px] top-1/2 -translate-y-1/2 rounded-e-lg flex items-center justify-center"
          >
            <ChevronLeft className={`text-white ${!open && "rotate-180"}`} />
          </div>
          <div className="flex flex-col w-full justify-between h-full">
            <div className="flex flex-col w-full">
              <Link to={"/"} className="flex gap-1 items-center">
              <img 
                  src="/logo.png" 
                  alt="logo" 
                  className="w-12 h-12" 
              />
              <div className="flex flex-col">
                <div className="flex flex-col text-white space-y-0 text-sm font-medium">Java Condition Monitoring</div>
                <div className="text-[#a5a5a5] text-xs">{authUser?.email}</div>
              </div>
            </Link>
              <h1 className="text-xs text-[#a5a5a5] mt-3 px-2 pt-2">Java Core</h1>
              <div className="flex flex-col w-full mt-2 gap-1">
                {adminSidebar.map((item) => (
                  <>
                    {item.title === "Users" && (
                      <h1 className="text-xs text-[#a5a5a5] mt-3 px-2 pt-2">
                        Other
                      </h1>
                    )}
                    <Link onClick={() => setActive(item.link)} to={item.link} className={`flex items-center gap-3 px-2 py-1 rounded-sm ${active === item.link ? 'bg-[#a1a1a130]' : 'hover:bg-[#a1a1a130]'}`}>
                      <item.icon className="text-[#dfdfdf]" size={15}/>
                      <h1 className="text-[#dfdfdf] text-sm">{item.title}</h1>
                    </Link>
                  </>
                ))}
            </div>
            </div>
            <div className="flex-col flex gap-2">
              <div onClick={handleLogout} className={`flex items-center gap-3 px-2 py-1 rounded-sm hover:bg-[#a1a1a130] cursor-pointer`}>
                <LogOut className="text-[#dfdfdf]" size={15}/>
                <h1 className="text-[#dfdfdf] text-sm">Logout</h1>
              </div>
              <div className="border border-zinc-700 rounded-lg p-2 flex gap-3 items-center">
                <img 
                  src="/developer-icon.png" 
                  alt="logo" 
                  className="w-12 h-12" />
                  <div className="flex-col flex gap-1 w-full">
                    <h1 className="text-sm text-[#dfdfdf]">Need Help?</h1>
                    <button className="bg-[#4b0d0d17] hover:bg-[#c9676717] border border-zinc-600 w-full text-[#dfdfdf] px-3 py-1 cursor-pointer rounded-lg text-xs">Contact Dev</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`h-full w-full ${
          open ? (loading ? "" : "lg:pl-[269px]") : ""
        }`}
      >
        {loading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default SidebarLayout
