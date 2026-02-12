import React, { useState, useEffect } from "react";
import "../css/downloading.css";

const Downloading: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(300);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [visibleFiles, setVisibleFiles] = useState<number[]>([0, 1, 2, 3, 4, 5]);
    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 0.33;
            });
        }, 1000);

        const timerInterval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timerInterval);
                    setShowDangerAlert(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(timerInterval);
        };
    }, []);

    useEffect(() => {
        const files = [
            { type: "document", delay: 1 },
            { type: "video", delay: 2 },
            { type: "document", delay: 3 },
            { type: "document", delay: 4 },
            { type: "video", delay: 5 },
            { type: "document", delay: 6 },
        ];

        const animationDuration = 2;
        const totalCycleDuration = (Math.max(...files.map(f => f.delay)) + animationDuration) * 1000;

        const startCycle = () => {
            setVisibleFiles([0, 1, 2, 3, 4, 5]);

            const timers = files.map((file, index) => {
                const hideTime = (file.delay + animationDuration) * 1000;
                return setTimeout(() => {
                    setVisibleFiles((prev) => prev.filter((i) => i !== index));
                }, hideTime);
            });

            return timers;
        };

        let currentTimers = startCycle();

        const cycleInterval = setInterval(() => {
            currentTimers.forEach((t) => clearTimeout(t));
            currentTimers = startCycle();
        }, totalCycleDuration);

        return () => {
            clearInterval(cycleInterval);
            currentTimers.forEach((t) => clearTimeout(t));
        };
    }, []);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const files = [
        { type: "document", delay: 1 },
        { type: "video", delay: 2 },
        { type: "document", delay: 3 },
        { type: "document", delay: 4 },
        { type: "video", delay: 5 },
        { type: "document", delay: 6 },
    ];

    const renderFileIcon = (type: string) => {
        if (type === "video") {
            return (
                <svg width="30" height="30" viewBox="0 0 30 40" fill="none">
                    <path
                        d="M5 0C3.34315 0 2 1.34315 2 3V37C2 38.6569 3.34315 40 5 40H25C26.6569 40 28 38.6569 28 37V10L18 0H5Z"
                        fill="#E91E63"
                        stroke="#C2185B"
                        strokeWidth="1.5"
                    />
                    <path d="M18 0V8C18 9.10457 18.8954 10 20 10H28L18 0Z" fill="#C2185B" />
                    <path
                        d="M11 16L20 20.5L11 25V16Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1"
                    />
                    <rect x="8" y="28" width="14" height="2" rx="1" fill="white" />
                </svg>
            );
        }
        return (
            <svg width="30" height="30" viewBox="0 0 30 40" fill="none">
                <path
                    d="M5 0C3.34315 0 2 1.34315 2 3V37C2 38.6569 3.34315 40 5 40H25C26.6569 40 28 38.6569 28 37V10L18 0H5Z"
                    fill="#2196F3"
                    stroke="#1565C0"
                    strokeWidth="1.5"
                />
                <path d="M18 0V8C18 9.10457 18.8954 10 20 10H28L18 0Z" fill="#1565C0" />
                <line x1="8" y1="18" x2="22" y2="18" stroke="white" strokeWidth="1.5" />
                <line x1="8" y1="23" x2="22" y2="23" stroke="white" strokeWidth="1.5" />
                <line x1="8" y1="28" x2="18" y2="28" stroke="white" strokeWidth="1.5" />
            </svg>
        );
    };

    return (
        <div className="downloading-container">
            <div className="shield-icon2">
                <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
                    <path
                        d="M30 5L5 15V30C5 45 15 60 30 65C45 60 55 45 55 30V15L30 5Z"
                        fill="#F44336"
                        stroke="#C62828"
                        strokeWidth="2"
                    />
                    <path
                        d="M20 20L40 40M40 20L20 40"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="folders-container">
                <div className="folder source-folder">
                    <svg width="50" height="50" viewBox="0 0 90 75" fill="none">
                        <path
                            d="M8 20C8 17.2386 10.2386 15 13 15H32L38 20H82C84.7614 20 87 22.2386 87 25V35H8V20Z"
                            fill="#FFB74D"
                            stroke="#F57C00"
                            strokeWidth="2"
                        />
                        <path
                            d="M8 35V68C8 70.7614 10.2386 73 13 73H82C84.7614 73 87 70.7614 87 68V35H8Z"
                            fill="#FFA726"
                            stroke="#F57C00"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                <div className="file-transfer-area">
                    {files.map((file, index) => (
                        visibleFiles.includes(index) && (
                            <div
                                key={index}
                                className="file-flying"
                                style={{ animationDelay: `${file.delay}s` }}
                            >
                                {renderFileIcon(file.type)}
                            </div>
                        )
                    ))}
                </div>

                <div className="folder destination-folder">
                    <svg width="50" height="50" viewBox="0 0 90 75" fill="none">
                        <path
                            d="M8 20C8 17.2386 10.2386 15 13 15H32L38 20H82C84.7614 20 87 22.2386 87 25V35H8V20Z"
                            fill="#FFB74D"
                            stroke="#F57C00"
                            strokeWidth="2"
                        />
                        <path
                            d="M8 35V68C8 70.7614 10.2386 73 13 73H82C84.7614 73 87 70.7614 87 68V35H8Z"
                            fill="#FFA726"
                            stroke="#F57C00"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>

            <div className="progress-section">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <div className="progress-info">
                        <span className="progress-percentage">{Math.floor(progress)}%</span>
                        <span className="time-remaining">
                            {showDangerAlert ? "DANGER ALERT!" : formatTime(timeRemaining)}
                        </span>
                    </div>
                </div>
            </div>
            {/*<p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>YOUR FILES MIGHT BE IN DANGER ACT NOW!</p>*/}
            <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>Toll-free Number</p>
        </div>
    );
};

export default Downloading;