import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Link2, Youtube, Instagram, Facebook, Layout, LogOut, User, Music, Disc, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Downloader State
    const [url, setUrl] = useState('');
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('idle');

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // SEO & Title Update
    useEffect(() => {
        if (user) {
            document.title = "Universal Video Downloader - Fast & Free Online HD Video Saver";
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = "Free online video downloader to download videos from YouTube, Instagram, TikTok and more quickly and securely.";
        } else {
            document.title = "Login | Universal Video Downloader";
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUrl('');
        setStatus('idle');
    };

    const handleDownload = async () => {
        if (!url) return;
        setProcessing(true);
        setStatus('processing');

        // API Call Simulation
        setTimeout(() => {
            setProcessing(false);
            setStatus('success');
        }, 2000);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
                <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans text-white">

            {/* GLOBAL BACKGROUND */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark Overlay (60-70% Opacity) */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </div>

            <AnimatePresence mode="wait">
                {!user ? (
                    /* --- LOGIN UI (Keep Existing Premium Theme) --- */
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-[400px] px-6"
                    >
                        <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden p-8 text-center ring-1 ring-black/5">
                            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-teal-500/30 blur-[60px]" />
                            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/30 blur-[60px]" />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/20 shadow-inner backdrop-blur-md">
                                    <Download className="h-8 w-8 text-white drop-shadow-md" />
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
                                    Universal Downloader
                                </h1>
                                <p className="text-white/60 text-sm mb-10 font-medium">
                                    Login to start downloading
                                </p>

                                <button
                                    onClick={handleLogin}
                                    className="group relative w-full h-12 bg-white hover:bg-white/90 text-slate-800 font-semibold text-sm rounded-full flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                                    <span>Sign in with Google</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* --- POST-LOGIN HERO UI (New VidsSave Style) --- */
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full h-full flex flex-col justify-between"
                    >
                        {/* 1. HEADER */}
                        <header className="w-full flex justify-between items-center p-6 md:px-12 text-white/90">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                                    <Download className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-bold tracking-tight text-lg hidden md:block">Universal Video Downloader</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full pl-1 pr-4 py-1 border border-white/10">
                                    <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20">
                                        <img src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=random"} alt="User" className="h-full w-full object-cover" loading="lazy" />
                                    </div>
                                    <span className="text-sm font-medium hidden sm:block">{user.displayName?.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-5 w-5 text-white/80" />
                                </button>
                            </div>
                        </header>

                        {/* 2. HERO CONTENT */}
                        <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
                            <div className="text-center max-w-3xl mx-auto space-y-6">

                                {/* H1 Heading */}
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight"
                                >
                                    Fast & Free Online <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                        Video Downloader
                                    </span>
                                </motion.h1>

                                {/* H2 Subheading */}
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mx-auto"
                                >
                                    Download videos from YouTube, Instagram, Facebook, TikTok and more in HD quality
                                </motion.h2>

                                {/* 3. SEARCH / DOWNLOAD BAR */}
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="w-full max-w-2xl mx-auto mt-8 relative group"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl">

                                        <div className="pl-4 text-white/40">
                                            <Link2 className="h-6 w-6" />
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Paste video link here or search"
                                            className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 text-lg px-4 h-14"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />

                                        <Button
                                            onClick={handleDownload}
                                            disabled={processing || !url}
                                            className="h-14 px-8 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-lg shadow-lg shadow-teal-900/20 transition-all hover:scale-105"
                                        >
                                            {processing ? (
                                                <Loader2 className="animate-spin h-6 w-6" />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Download className="h-5 w-5" />
                                                    <span>Download</span>
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>

                                {/* 4. PLATFORM ICON SECTION */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-12"
                                >
                                    <p className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-6">
                                        Supports the Most Popular Platforms
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/50">
                                        {[
                                            { Icon: Youtube, label: "YouTube" },
                                            { Icon: Instagram, label: "Instagram" },
                                            { Icon: Facebook, label: "Facebook" },
                                            { Icon: Music, label: "TikTok" }, // Using Music for TikTok
                                            { Icon: Layout, label: "Pinterest" },
                                        ].map((platform, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
                                                <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                                    <platform.Icon className="h-6 w-6" />
                                                </div>
                                                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{platform.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        </main>

                        {/* Footer / Copyright */}
                        <footer className="w-full text-center py-6 text-white/20 text-xs">
                            &copy; {new Date().getFullYear()} Universal Video Downloader. All rights reserved.
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
