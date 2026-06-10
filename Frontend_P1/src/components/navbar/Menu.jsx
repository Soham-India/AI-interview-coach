import React from "react";
import { Link } from "react-router-dom";
import { closeMenu } from "../../redux/features/drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle, BarChart3, Archive, User } from "lucide-react";

const NAV_LINKS = [
  { icon: PlusCircle, label: "NEW INTERVIEW", path: "/interview" },
  { icon: BarChart3, label: "ANALYTICS", path: "/analytics" },
  { icon: Archive, label: "ARCHIVE", path: "/archive" },
  { icon: User, label: "PROFILE", path: "/profile" },
];

const Menu = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.drawer.isMenuOpen);

  return (
    <div>
      {/* Backdrop */}
      <div
        onClick={() => dispatch(closeMenu())}
        className={`fixed inset-0 z-50 bg-abyss/70 backdrop-blur-md transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Parent Container (Handles Shadow + Position) */}
      <aside
        className="fixed z-60 top-5 right-5 bottom-5 w-[calc(100%-40px)] max-w-[560px] filter drop-shadow-2xl will-change-transform"
        style={{
          transform: isMenuOpen ? "translateX(0)" : "translateX(110%)",
          transition: "transform 850ms cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        {/* OUTER LAYER (Border Color) */}
        <div className="panel-cut w-full h-full bg-frame">
          {/* INNER LAYER (Content Panel + Layout) */}
          <div className="panel-cut absolute inset-[1px] bg-icy-blue text-ink flex flex-col justify-between">
            {/* 1. HEADER (Moved to top of DOM) */}
            <div className="h-20 shrink-0 flex items-center justify-between px-10 md:px-12 border-b border-frame/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-ink" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-ink/70 font-medium">
                  Explore
                </span>
              </div>

              <button
                onClick={() => dispatch(closeMenu())}
                className="bg-abyss text-white button-cut px-7 h-14 flex items-center gap-3 uppercase tracking-[0.25em] text-xs hover:scale-[1.03] transition-all cursor-pointer"
              >
                <span className="text-lg">✦</span>
                CLOSE
              </button>
            </div>

            {/* 2. NAVIGATION LINKS (Centered Middle) */}
            <div className="flex-1 flex items-center justify-center px-10">
              <nav className="flex flex-col items-start gap-8 w-full max-w-sm">
                {NAV_LINKS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => dispatch(closeMenu())}
                      className="flex items-center gap-6 group w-full py-2"
                    >
                      <Icon
                        size={32}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-ink/70 group-hover:text-ink"
                      />
                      <span className="text-3xl md:text-4xl font-black tracking-tight uppercase text-ink/80 group-hover:text-ink transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* 3. FOOTER (Stays at Bottom) */}
            <div className="border-t border-frame/20 px-10 md:px-12 py-6 bg-ink/5">
              <div className="text-xs tracking-[0.3em] uppercase text-ink/60">
                www.interviewai.dev
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Menu;
