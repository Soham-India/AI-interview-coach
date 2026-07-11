import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Terminal, Mail, Lock, ArrowRight, RefreshCw } from "lucide-react";
import { setCredentials } from "../../redux/features/authSlice";
import { authService } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await authService.login({ email, password });

            dispatch(setCredentials({
                token: data.token,
                user: data.user,
            }));

            navigate("/initialize");

        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-abyss text-pure-white overflow-hidden relative flex items-center justify-center selection:bg-neon-blue selection:text-abyss">

            {/* Background */}
            <div className="absolute inset-0 wireframe-grid opacity-20 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050b14_95%)] pointer-events-none z-0" />

            {/* Side telemetry — left */}
            <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
                <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
                    OPERATOR_AUTHENTICATION // SECURE_CHANNEL
                </div>
                <div className="w-px h-24 bg-frame" />
                <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.4em] text-neon-blue uppercase font-bold">
                    ENCRYPTION: AES-256
                </div>
            </aside>

            {/* Side telemetry — right */}
            <aside className="fixed right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center space-y-12 opacity-40 select-none pointer-events-none">
                <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase font-bold">
                    LATENCY: 14MS
                </div>
                <div className="w-px h-24 bg-frame" />
                <div className="[writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] text-steel uppercase animate-pulse">
                    STATUS: AWAITING_CREDENTIALS
                </div>
            </aside>

            {/* Main card */}
            <main className="relative z-10 w-full max-w-xl px-4">
                <div className="bg-panel/90 border border-neon-blue/40 shadow-[0_0_40px_rgba(0,136,255,0.15)] p-10 relative backdrop-blur-md">

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue -translate-x-0.5 -translate-y-0.5" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue translate-x-0.5 -translate-y-0.5" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue -translate-x-0.5 translate-y-0.5" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue translate-x-0.5 translate-y-0.5" />

                    {/* Header */}
                    <div className="mb-8 text-center select-none">
                        <h1 className="font-mono text-2xl md:text-3xl font-black text-pure-white uppercase tracking-tight mb-1 flex items-center justify-center gap-2">
                            <Terminal size={18} className="text-neon-blue animate-pulse" />
                            Access Terminal
                        </h1>
                        <p className="font-mono text-[10px] text-steel uppercase tracking-widest font-bold">
                            Operator Credential Verification
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 border border-danger/40 bg-danger/10 px-4 py-3 font-mono text-xs text-danger uppercase tracking-wider">
                            ⚠ {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email */}
                        <div className="space-y-1.5 group/field">
                            <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                01 // EMAIL ADDRESS
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
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5 group/field">
                            <label className="block font-mono text-[9px] text-neon-blue uppercase tracking-widest opacity-80 group-focus-within/field:opacity-100 font-bold select-none">
                                02 // PASSWORD
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
                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-blue transition-all duration-500 group-focus-within/field:w-full" />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 space-y-4">
                            <button
                                type="submit"
                                disabled={isLoading || !email || !password}
                                className="w-full h-14 border border-neon-blue bg-neon-blue/5 group/btn relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,136,255,0.25)] button-cut cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-neon-blue/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 font-mono text-xs font-black text-pure-white uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <RefreshCw size={14} className="animate-spin" />
                                            AUTHENTICATING...
                                        </>
                                    ) : (
                                        <>
                                            AUTHENTICATE
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            <div className="text-center">
                                <Link
                                    to="/register"
                                    className="font-mono text-[10px] text-steel hover:text-pure-white uppercase tracking-[0.2em] transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    NO ACCOUNT? INITIALIZE PROTOCOL
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer metadata */}
                <div className="mt-6 flex justify-between items-center px-2 opacity-30 font-mono text-[8px] uppercase tracking-widest text-steel/80 select-none pointer-events-none font-bold">
                    <span>SYSTEM_STATUS: NOMINAL</span>
                    <span>© 2026 INTERVIEW_AI_SYSTEMS</span>
                </div>
            </main>
        </div>
    );
};

export default Login;