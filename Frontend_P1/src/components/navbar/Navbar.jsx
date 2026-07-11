import React, { useCallback, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openMenu } from "../../redux/features/drawerSlice";
import {
    selectCurrentUser,
    selectIsAuthenticated,
    logout,
} from "../../redux/features/authSlice";
import AbortPopup from "../ui/AbortPopup";

const Navbar = ({
    isSimulation = false,
    timeString = "00:00:00",
    progressPercent = 0,
}) => {
    const dispatch = useDispatch();

    // Read from Redux — single source of truth
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);

    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    // Fix 1 & 5: No navigate — let ProtectedRoute handle redirect. Memoized.
    const handleLogoutConfirm = useCallback(() => {
        dispatch(logout());
        setIsLogoutOpen(false);
    }, [dispatch]);

    return (
        <header
            id="main-header"
            className="fixed top-0 left-0 w-full bg-abyss flex justify-between items-center px-margin-edge h-18 z-50 border-b border-frame transition-all duration-300 select-none"
        >
            {/* Logout confirmation dialog */}
            <AbortPopup
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogoutConfirm}
                title="TERMINATE SESSION?"
                message="You are about to disconnect from the system. All active simulation data will be preserved. Proceed with logout?"
                confirmText="CONFIRM LOGOUT"
                cancelText="REMAIN CONNECTED"
            />

            {/* Left — branding or simulation timer */}
            {!isSimulation ? (
                <div className="font-scene-focus text-[24px] font-extrabold uppercase tracking-tighter text-icy-blue leading-none">
                    <Link to="/" className="hover:opacity-90 transition-opacity">
                        INTERVIEW{" "}
                        <span className="text-inverse-primary drop-shadow-[0_0_12px_rgba(0,136,255,0.65)]">
                            AI
                        </span>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col">
                    <span className="text-steel font-mono text-[9px] uppercase tracking-wider font-bold opacity-60">
                        Elapsed Time
                    </span>
                    <span className="text-pure-white font-mono text-sm md:text-base font-black tracking-widest leading-tight">
                        {timeString}
                    </span>
                </div>
            )}

            {/* Center — progress bar during simulation */}
            {isSimulation && (
                <div className="flex-1 max-w-xl px-12 hidden md:block">
                    <div className="h-[2px] w-full bg-frame relative rounded-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-neon-blue transition-all duration-300 shadow-[0_0_8px_#0088FF]"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1.5 font-mono text-[9px] uppercase tracking-widest font-bold">
                        <span className="text-steel">Chamber Progression</span>
                        <span className="text-neon-blue">{Math.round(progressPercent)}%</span>
                    </div>
                </div>
            )}

            {/* Right — auth controls + menu */}
            <div
                className="flex items-stretch h-10 overflow-hidden"
                style={{
                    clipPath: "polygon(10% 0px, 100% 0px, 100% 90%, 90% 100%, 0px 100%, 0px 10%)",
                }}
            >
                {/* Fix 2: Only check isAuthenticated — don't gate on currentUser */}
                {isAuthenticated ? (
                    <>
                        {/* Fix 4: Use <Link> instead of button + navigate */}
                        <Link
                            to="/profile"
                            className="bg-deep-panel hover:bg-raised-panel text-pure-white px-5 flex items-center gap-3.5 transition-colors duration-300 border-r border-frame font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                        >
                            {currentUser?.avatarUrl ? (
                                <img
                                    alt={currentUser?.name}
                                    src={currentUser.avatarUrl}
                                    className="w-4 h-4 rounded-full object-cover grayscale border border-neon-blue/20 shrink-0"
                                />
                            ) : (
                                <div className="w-4 h-4 rounded-full bg-neon-blue/20 border border-neon-blue/40 shrink-0 flex items-center justify-center text-[8px] text-neon-blue font-black">
                                    {/* Fix 3: Fully safe optional chain */}
                                    {currentUser?.name?.charAt(0)?.toUpperCase() ?? "?"}
                                </div>
                            )}
                            <span className="hidden sm:inline">
                                {currentUser?.callsign ?? currentUser?.name ?? "PROFILE"}
                            </span>
                        </Link>

                        {/* Logout button */}
                        <button
                            onClick={() => setIsLogoutOpen(true)}
                            className="bg-deep-panel hover:bg-danger/10 text-steel hover:text-danger px-4 flex items-center gap-2 transition-colors duration-300 border-r border-frame font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                            title="Logout"
                        >
                            <LogOut size={13} strokeWidth={2.5} />
                        </button>
                    </>
                ) : (
                    /* Login button — unauthenticated */
                    <Link
                        to="/login"
                        className="bg-deep-panel hover:bg-raised-panel text-pure-white px-5 flex items-center gap-2 transition-colors duration-300 border-r border-frame font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                    >
                        <LogIn size={13} strokeWidth={2.5} />
                        <span>LOGIN</span>
                    </Link>
                )}

                {/* Menu toggle */}
                <button
                    id="open-menu"
                    onClick={() => dispatch(openMenu())}
                    className="bg-icy-blue hover:bg-pure-white text-ink px-5 flex items-center gap-2 transition-colors duration-300 font-mono text-xs font-black uppercase tracking-widest cursor-pointer"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                    <span>MENU</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;

