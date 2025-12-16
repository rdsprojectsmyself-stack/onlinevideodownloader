import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Link2, Youtube, Instagram, Facebook, Layout, LogOut, User, Music, Disc, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DownloadOptions from "@/components/DownloadOptions"; // Import Component
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Downloader State
    const [url, setUrl] = useState('');
    const [processing, setProcessing] = useState(false);
    const [videoData, setVideoData] = useState(null); // New State for Video Info

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
        setVideoData(null); // Reset
    };

    const handleDownload = async () => {
        if (!url) return;
        setProcessing(true);
        setVideoData(null);

        // API Call Simulation
        setTimeout(() => {
            setProcessing(false);
            // Simulate video data fetch
            setVideoData({
                title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
                author: "Rick Astley",
                duration: "03:32",
                thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            });
        }, 1500);
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
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url('/background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Dark Overlay (50% Opacity for better background visibility) */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </div>

            <AnimatePresence mode="wait">
                {!user ? (
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-[420px] px-6"
                    >
                        <div className="relative rounded-3xl border border-white/20 bg-black/20 backdrop-blur-md shadow-2xl overflow-hidden p-8 text-center ring-1 ring-white/10">

                            {/* Title */}
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-8 drop-shadow-lg">
                                Join the Creative Flow
                            </h2>

                            {/* Google Sign In */}
                            <button
                                onClick={handleLogin}
                                className="group relative w-full h-12 bg-white hover:bg-white/90 text-slate-800 font-semibold text-sm rounded-full flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-6"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                                <span>Sign in with Google</span>
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center gap-4 mb-6">
                                <div className="h-px bg-white/20 flex-1" />
                                <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Or sign in with email</span>
                                <div className="h-px bg-white/20 flex-1" />
                            </div>

                            {/* Email/Pass Form */}
                            <div className="space-y-4">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-medium text-white/70 ml-1">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 h-11 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-xs font-medium text-white/70 ml-1">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 h-11 rounded-xl"
                                    />
                                </div>
                                <Button className="w-full h-12 bg-white/90 hover:bg-white text-black font-bold rounded-xl mt-2 transition-transform hover:scale-[1.02]">
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* --- POST-LOGIN UI (SEO Optimized & VidsSave Style) --- */
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full h-full flex flex-col justify-between"
                    >
                        {/* 1. HEADER SECTON */}
                        <header className="w-full flex justify-between items-center p-6 md:px-12 text-white/90">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                                    <Download className="h-6 w-6 text-white" />
                                </div>
                                <span className="font-extrabold tracking-tight text-xl hidden md:block text-white drop-shadow-md">
                                    RDS <span className="text-yellow-400">Factory</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md rounded-full pl-1 pr-4 py-1 border border-white/10 shadow-inner">
                                    <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white/20">
                                        <img src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=random"} alt="User Profile" className="h-full w-full object-cover" />
                                    </div>
                                    <span className="text-sm font-semibold hidden sm:block text-white/90">{user.displayName?.split(' ')[0]}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 bg-black/20 hover:bg-white/10 rounded-full transition-all border border-white/10 hover:border-white/30"
                                    title="Sign Out"
                                    aria-label="Sign Out"
                                >
                                    <LogOut className="h-5 w-5 text-white/90" />
                                </button>
                            </div>
                        </header>

                        {/* 2. MAIN HERO CONTENT */}
                        <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16 w-full max-w-5xl mx-auto">

                            {/* IF NO VIDEO DATA, SHOW HERO SEARCH */}
                            {!videoData ? (
                                <div className="text-center w-full space-y-8">

                                    {/* H1 Heading for SEO */}
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl leading-tight"
                                    >
                                        <span className="text-yellow-400">RDS</span> Factory
                                    </motion.h1>

                                    {/* H2 Subheading with Keywords */}
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg max-w-4xl mx-auto"
                                    >
                                        Free Online Video Downloader
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto"
                                    >
                                        Download Videos from YouTube, Facebook, Instagram, TikTok and more in HD.
                                    </motion.p>

                                    {/* 3. SEARCH / DOWNLOAD BAR */}
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="w-full max-w-3xl mx-auto mt-10 relative group"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                        <div className="relative flex items-center bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-2xl ring-1 ring-black/5">

                                            <div className="pl-4 text-gray-400">
                                                <Link2 className="h-6 w-6" />
                                            </div>

                                            <label htmlFor="url-input" className="sr-only">Paste video link here</label>
                                            <input
                                                id="url-input"
                                                type="url"
                                                placeholder="Paste URL or Search..."
                                                className="flex-1 bg-transparent border-none text-gray-800 placeholder:text-gray-500 focus:ring-0 text-lg px-4 h-14 font-medium"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            />

                                            <Button
                                                onClick={handleDownload}
                                                disabled={processing || !url}
                                                className="h-14 px-8 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg transition-all hover:scale-105 active:scale-95 border-none"
                                            >
                                                {processing ? (
                                                    <Loader2 className="animate-spin h-6 w-6" />
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Download className="h-6 w-6" />
                                                        <span>Download</span>
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-white/60 text-xs mt-3 font-medium tracking-wide">
                                            By using our service you accept our Terms of Service and Privacy Policy
                                        </p>
                                    </motion.div>

                                    {/* 4. PLATFORM ICON SECTION */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="pt-16"
                                    >
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 drop-shadow-md">
                                            Support the Most Popular Platforms
                                        </h3>
                                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                            {[
                                                { Icon: Facebook, label: "Facebook", bg: "bg-blue-600" },
                                                { Icon: Instagram, label: "Instagram", bg: "bg-pink-600" },
                                                { Icon: Youtube, label: "YouTube", bg: "bg-red-600" },
                                                { Icon: Music, label: "TikTok", bg: "bg-black" },
                                                { Icon: Layout, label: "Pinterest", bg: "bg-red-700" },
                                            ].map((platform, idx) => (
                                                <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                                    <div className={`h-16 w-16 md:h-20 md:w-20 rounded-full ${platform.bg} border-4 border-white/20 shadow-xl flex items-center justify-center group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-white/30 transition-all`}>
                                                        <platform.Icon className="h-8 w-8 md:h-10 md:w-10 text-white fill-current" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-white/90 drop-shadow-md">{platform.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                /* SHOW DOWNLOAD OPTIONS WHEN DATA EXISTS */
                                <DownloadOptions videoData={videoData} onReset={() => { setVideoData(null); setUrl(''); }} />
                            )}

                        </main>

                        {/* Footer / Copyright */}
                        <footer className="w-full text-center py-6 text-white/30 text-xs font-medium uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} RDS Factory All rights reserved.
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
