import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Link2, Youtube, Instagram, Facebook, Layout, LogOut } from 'lucide-react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [url, setUrl] = useState('');
    const [processing, setProcessing] = useState(false);

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
    };

    const handleDownload = async () => {
        if (!url) return;
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            alert('Download started!');
        }, 1500);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black">
                <Loader2 className="h-10 w-10 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url('/background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            <AnimatePresence mode="wait">
                {!user ? (
                    /* LOGIN PAGE */
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10 w-full max-w-[420px] mx-4"
                    >
                        <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-center mb-8">
                                Sign in to start downloading videos
                            </p>

                            <button
                                onClick={handleLogin}
                                className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
                            >
                                <img
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    className="h-5 w-5"
                                />
                                <span>Sign in with Google</span>
                            </button>

                            <div className="flex items-center gap-4 my-6">
                                <div className="h-px bg-gray-300 flex-1" />
                                <span className="text-gray-500 text-sm">Or continue with email</span>
                                <div className="h-px bg-gray-300 flex-1" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full h-11 px-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full h-11 px-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>

                                <button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors shadow-md">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* POST-LOGIN PAGE */
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full min-h-screen flex flex-col"
                    >
                        {/* HEADER */}
                        <header className="w-full flex justify-between items-center p-6 md:px-12">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <Download className="h-6 w-6 text-white" />
                                </div>
                                <span className="font-bold text-xl text-white hidden md:block">
                                    RDS Factory
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full pl-1 pr-4 py-1 border border-white/20">
                                    <img
                                        src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=random"}
                                        alt="User"
                                        className="h-9 w-9 rounded-full border-2 border-white/30"
                                    />
                                    <span className="text-sm font-semibold text-white hidden sm:block">
                                        {user.displayName?.split(' ')[0] || 'User'}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        </header>

                        {/* MAIN CONTENT */}
                        <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
                            <div className="text-center w-full max-w-3xl space-y-8">
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl"
                                >
                                    RDS Factory
                                </motion.h1>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
                                >
                                    Free Online Video Downloader
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                    className="text-lg md:text-xl text-white/90 font-medium"
                                >
                                    Download Videos from YouTube, Facebook, Instagram, TikTok and more in HD.
                                </motion.p>

                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="w-full mt-10"
                                >
                                    <div className="flex items-center bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl">
                                        <div className="pl-4 text-gray-400">
                                            <Link2 className="h-6 w-6" />
                                        </div>

                                        <input
                                            type="url"
                                            placeholder="Paste video URL here..."
                                            className="flex-1 bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none text-lg px-4 h-14 font-medium"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />

                                        <button
                                            onClick={handleDownload}
                                            disabled={processing || !url}
                                            className="h-14 px-8 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                                        >
                                            {processing ? (
                                                <Loader2 className="animate-spin h-6 w-6" />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Download className="h-6 w-6" />
                                                    <span>Download</span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-white/60 text-xs mt-3 font-medium">
                                        By using our service you accept our Terms of Service and Privacy Policy
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-16"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                                        Support the Most Popular Platforms
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                        {[
                                            { Icon: Facebook, label: "Facebook", bg: "bg-blue-600" },
                                            { Icon: Instagram, label: "Instagram", bg: "bg-pink-600" },
                                            { Icon: Youtube, label: "YouTube", bg: "bg-red-600" },
                                            { Icon: Layout, label: "TikTok", bg: "bg-black" },
                                        ].map((platform, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                                                <div className={`h-16 w-16 md:h-20 md:w-20 rounded-full ${platform.bg} border-4 border-white/20 shadow-xl flex items-center justify-center group-hover:shadow-2xl group-hover:scale-110 transition-all`}>
                                                    <platform.Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-white/90">{platform.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </main>

                        <footer className="w-full text-center py-6 text-white/40 text-xs">
                            &copy; {new Date().getFullYear()} RDS Factory. All rights reserved.
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
