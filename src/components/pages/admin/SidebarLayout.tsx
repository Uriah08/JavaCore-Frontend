import Loading from "@/components/ui/Loading";
import { adminSidebar } from "@/constant";
import { ChevronLeft, CircleHelp, LogOut } from "lucide-react";
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
  const { authUser, setAuthUser } = useAuthContext();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setAuthUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="h-full flex bg-[#eee8e8]">
      {/* Sidebar */}
      <div
        className={`h-screen p-7 fixed w-[269px] bg-main flex flex-col z-20 transition-all duration-300 ${
          open ? "left-0" : "-left-[269px]"
        }`}
      >
        {/* Toggle button */}
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer absolute bg-main w-3 h-10 -right-[12px] top-1/2 -translate-y-1/2 rounded-e-lg flex items-center justify-center"
        >
          <ChevronLeft
            className={`text-white transition-transform ${
              !open && "rotate-180"
            }`}
          />
        </div>

        <div className="flex flex-col w-full justify-between h-full">
          {/* Logo & user info */}
          <div className="flex flex-col w-full">
            <Link to="/" className="flex gap-1 items-center mb-6">
              <img src="/logo.png" alt="logo" className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="flex flex-col text-white space-y-0 text-sm font-medium">
                  Java Condition Monitoring
                </span>
                <span className="text-[#a5a5a5] text-xs">
                  {authUser?.email}
                </span>
              </div>
            </Link>

            <h1 className="text-[#FFADAD] font-medium text-sm">Java Core</h1>

            {/* Menu Items */}
            <div className="flex flex-col w-full mt-2 gap-1">
              {adminSidebar.map((item) => (
                <React.Fragment key={item.link}>
                  {item.title === "Users" && (
                    <h1 className="text-[#FFADAD] font-medium text-sm mt-2">
                      Other
                    </h1>
                  )}
                  <Link
                    to={item.link}
                    onClick={() => setActive(item.link)}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 ${
                      active === item.link
                        ? "bg-white text-main"
                        : "hover:bg-[#a1a1a130]"
                    }`}
                  >
                    <item.icon
                      size={18}
                      className={
                        active === item.link ? "text-main" : "text-[#dfdfdf]"
                      }
                    />
                    <span
                      className={`text-sm font-medium ${
                        active === item.link ? "text-main" : "text-[#dfdfdf]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2">
            {/* Logout */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#a1a1a130] cursor-pointer"
            >
              <LogOut className="text-[#dfdfdf]" size={18} />
              <span className="text-sm text-[#dfdfdf]">Logout</span>
            </div>

            {/* Help Section */}
            <div className="bg-white p-3 rounded-lg">
              <div className="flex gap-3 items-center">
                <CircleHelp
                  size={30}
                  className="text-white bg-main rounded-sm p-1"
                />
                <h1 className="font-medium">Need Help?</h1>
              </div>
              <img
                src={"/contact-logo.png"}
                width={200}
                height={200}
                alt="help"
                className="object-center size-36 object-contain -mt-5 ml-3"
              />
              <button className="bg-main w-full text-white rounded-lg py-1 -mt-10">
                Contact Dev
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`h-full w-full transition-all duration-300 ${
          open ? (loading ? "" : "lg:pl-[269px]") : ""
        }`}
      >
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;
