import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Scissors, Music, Video, FileAudio } from 'lucide-react';

const DownloadOptions = ({ videoData, onReset }) => {
    const [selectedFormat, setSelectedFormat] = useState('mp4-720');
    const [trimStart, setTrimStart] = useState('00:00');
    const [trimEnd, setTrimEnd] = useState(videoData.duration || '03:45');

    const handleDownload = () => {
        // Logic to trigger backend download with selected format and trim options
        console.log(`Downloading ${selectedFormat} ${selectedFormat.includes('mp3') ? `Trim: ${trimStart}-${trimEnd}` : ''}`);
        alert("Download Started!"); // Placeholder
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mt-8 px-4"
        >
            <Card className="bg-black/30 backdrop-blur-xl border-white/10 text-white overflow-hidden shadow-2xl">
                <CardHeader className="bg-white/5 border-b border-white/10 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Video className="h-5 w-5 text-teal-400" />
                        Video Ready to Download
                    </CardTitle>
                    <button onClick={onReset} className="text-xs text-white/50 hover:text-white underline">
                        Download Another
                    </button>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Thumbnail Column */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                            <img
                                src={videoData.thumbnail || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"}
                                alt="Video Thumbnail"
                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Video className="h-10 w-10 text-white/80" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-white line-clamp-2">{videoData.title || "Amazing Music Video 4K - Official Video"}</h3>
                        <p className="text-sm text-white/50">{videoData.author || "Artist Name"} • {videoData.duration || "03:45"}</p>
                    </div>

                    {/* Options Column */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Format Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-white/70">Select Format</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'mp4-1080', label: 'MP4 1080p', icon: Video, color: 'text-blue-400' },
                                    { id: 'mp4-720', label: 'MP4 720p', icon: Video, color: 'text-blue-400' },
                                    { id: 'aac', label: 'AAC Audio', icon: FileAudio, color: 'text-orange-400' },
                                    { id: 'mp3', label: 'MP3 Audio', icon: Music, color: 'text-green-400' },
                                ].map((fmt) => (
                                    <div
                                        key={fmt.id}
                                        onClick={() => setSelectedFormat(fmt.id)}
                                        className={`cursor-pointer rounded-xl border p-3 flex flex-col items-center justify-center gap-2 transition-all ${selectedFormat === fmt.id
                                                ? 'bg-white/20 border-teal-500/50 ring-2 ring-teal-500/20'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <fmt.icon className={`h-6 w-6 ${fmt.color}`} />
                                        <span className="text-sm font-medium">{fmt.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trim Options (Only for MP3) */}
                        <AnimatePresence>
                            {selectedFormat === 'mp3' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3 overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 text-yellow-400">
                                        <Scissors className="h-4 w-4" />
                                        <label className="text-sm font-medium">Trim Audio</label>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-xs text-white/50">Start Time</span>
                                            <Input
                                                type="text"
                                                value={trimStart}
                                                onChange={(e) => setTrimStart(e.target.value)}
                                                className="bg-black/20 border-white/10 text-white h-9"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-white/50">End Time</span>
                                            <Input
                                                type="text"
                                                value={trimEnd}
                                                onChange={(e) => setTrimEnd(e.target.value)}
                                                className="bg-black/20 border-white/10 text-white h-9"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <Button
                            onClick={handleDownload}
                            className="w-full h-12 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-900/20"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download {selectedFormat.toUpperCase()}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default DownloadOptions;
