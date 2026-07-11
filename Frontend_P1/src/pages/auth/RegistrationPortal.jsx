import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Terminal, Mail, Lock, ShieldCheck, User, Shield, Cpu, ArrowRight, RefreshCw } from "lucide-react";
import { setCredentials } from "../../redux/features/authSlice";
import { authService } from "../../services/authService";

const RegistrationPortal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [callsign, setCallsign] = useState("");
    const [role, setRole] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        if (password !== confirmPassword) {
            setError("KEY_MISMATCH: Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const data = await authService.register({
                name,
                email,
                password,
                callsign: callsign.trim() === "" ? null : callsign,
                role: role.trim() === "" ? null : role
            });

            dispatch(setCredentials({
                token: data.token,
                user: data.user
            }));

            navigate("/initialize");
        } catch (err) {
            if (err.response?.data?.validationErrors) {
                setFieldErrors(err.response.data.validationErrors);
                setError("Validation parameters failed. Check field inputs.");
            } else {
                setError(err.response?.data?.message || "Registration protocol rejected.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-abyss text-pure-white py-12 px-4 relative flex items-center justify-center selection:bg-neon-blue selection:text-abyss">
            
            <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />

            <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
                <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
                    INITIALIZE_IDENTITY // NEW_NODE
                </div>
                <div className="w-px h-24 bg-frame" />
                <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-neon-blue uppercase font-bold">
                    SECURITY_LOCK: ACTIVE
                </div>
            </aside>

            <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
                <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase font-bold">
                    PORT: 8080
                </div>
                <div className="w-px h-24 bg-frame" />
                <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
                    STATUS: SECURING_SIGNUP
                </div>
            </aside>

            <main className="relative z-10 w-full max-w-2xl">
                <div className="bg-panel/90 border border-neon-blue/40 shadow-[0_0_40px_rgba(0,136,255,0.15)] p-8 md:p-10 relative backdrop-blur-md">

                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue -translate-x-0.5 -translate-y-0.5" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue translate-x-0.5 -translate-y-0.5" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue -translate-x-0.5 translate-y-0.5" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue translate-x-0.5 translate-y-0.5" />

                    <div className="mb-8 text-center select-none">
                        <h1 className="font-mono text-2xl md:text-3xl font-black text-pure-white uppercase tracking-tight mb-1 flex items-center justify-center gap-2">
                            <Terminal size={18} className="text-neon-blue animate-pulse" />
                            Initialization Portal
                        </h1>
                        <p className="font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
                            Create Operator Profile Configuration
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 border border-danger/40 bg-danger/10 px-4 py-3 font-mono text-xs text-danger uppercase tracking-wider">
                            ⚠ {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="space-y-1.5 group/field">
                                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                    01 // IDENTITY NAME *
                                </label>
                                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                    <User size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="LEGAL NAME"
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                                    />
                                </div>
                                {fieldErrors.name && (
                                    <p className="font-mono text-[9px] text-danger uppercase pt-1">{fieldErrors.name}</p>
                                )}
                            </div>

                            <div className="space-y-1.5 group/field">
                                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                    02 // EMAIL ROUTE *
                                </label>
                                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                    <Mail size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="OPERATOR@GATEWAY.AI"
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="font-mono text-[9px] text-danger uppercase pt-1">{fieldErrors.email}</p>
                                )}
                            </div>

                        </div>

                        <div className="space-y-1.5 group/field">
                            <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                03 // SECURE PASSPHRASE *
                            </label>
                            <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                <Lock size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    disabled={isLoading}
                                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none"
                                />
                            </div>
                            {fieldErrors.password && (
                                <p className="font-mono text-[9px] text-danger uppercase pt-1">{fieldErrors.password}</p>
                            )}
                        </div>

                        <div className="space-y-1.5 group/field">
                            <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                04 // CONFIRM PASSPHRASE *
                            </label>
                            <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                <ShieldCheck size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="RE-ENTER KEY"
                                    disabled={isLoading}
                                    className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none"
                                />
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="font-mono text-[9px] text-danger uppercase pt-1">⚠ KEYS DO NOT MATCH</p>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="space-y-1.5 group/field">
                                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                    05 // CALLSIGN (OPTIONAL)
                                </label>
                                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                    <Shield size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                    <input
                                        type="text"
                                        value={callsign}
                                        onChange={(e) => setCallsign(e.target.value)}
                                        placeholder="GHOST-OPERATOR"
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                                    />
                                </div>
                                {fieldErrors.callsign && (
                                    <p className="font-mono text-[9px] text-danger uppercase pt-1">{fieldErrors.callsign}</p>
                                )}
                            </div>

                            <div className="space-y-1.5 group/field">
                                <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                    06 // OPERATIONAL ROLE (OPTIONAL)
                                </label>
                                <div className="relative border-b border-frame focus-within:border-neon-blue transition-colors duration-300 flex items-center bg-abyss/30 px-2">
                                    <Cpu size={14} className="text-steel/40 mr-2.5 shrink-0" />
                                    <input
                                        type="text"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="SOFTWARE ENGINEER"
                                        disabled={isLoading}
                                        className="w-full bg-transparent border-none focus:ring-0 text-pure-white font-mono text-xs md:text-sm py-3 px-0 placeholder:text-steel/40 tracking-[0.15em] outline-none uppercase"
                                    />
                                </div>
                                {fieldErrors.role && (
                                    <p className="font-mono text-[9px] text-danger uppercase pt-1">{fieldErrors.role}</p>
                                )}
                            </div>

                        </div>

                        <div className="pt-4 space-y-4">
                            <button
                                type="submit"
                                disabled={isLoading || !name || !email || !password || !confirmPassword || password !== confirmPassword}
                                className="w-full h-14 border border-neon-blue bg-neon-blue/5 group/btn relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,136,255,0.25)] button-cut cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 font-mono text-xs font-black text-pure-white uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <RefreshCw size={14} className="animate-spin" />
                                            INITIALIZING MATRIX...
                                        </>
                                    ) : (
                                        <>
                                            EXECUTE SIGNUP PROTOCOL
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="font-mono text-[10px] text-steel hover:text-pure-white uppercase tracking-[0.2em] transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    ALREADY REGISTERED? OPEN ACCESS TERMINAL
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-6 flex justify-between items-center px-2 opacity-30 font-mono text-[8px] uppercase tracking-widest text-steel/80 select-none pointer-events-none font-bold">
                    <span>SYSTEM_STATUS: NOMINAL</span>
                    <span>© 2026 INTERVIEW_AI_SYSTEMS</span>
                </div>
            </main>
        </div>
    );
};

export default RegistrationPortal;