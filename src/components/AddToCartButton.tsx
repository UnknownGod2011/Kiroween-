import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { addToCart } from '../utils/cartStorage';

interface AddToCartButtonProps {
  tshirtElementId: string;
  color: string;
  material: string;
  size: string;
  onSuccess?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tshirtElementId,
  color,
  material,
  size,
  onSuccess,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // Find the T-shirt element
      const element = document.getElementById(tshirtElementId);
      if (!element) {
        console.error('T-shirt element not found');
        setIsAdding(false);
        return;
      }

      // Capture the element as image
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/png');

      // Add to cart
      addToCart({
        image: imageDataUrl,
        color,
        material,
        size,
      });

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      // Callback
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="add-to-cart-button group relative"
      >
        <span className="relative z-10 flex items-center gap-3">
          {isAdding ? (
            <>
              <div className="spinner" />
              Capturing...
            </>
          ) : (
            <>
              🛒 Add to Cart
            </>
          )}
        </span>
        <div className="button-glow" />
      </button>

      {/* Success Animation - Ghost carrying T-shirt */}
      {showSuccess && (
        <div className="success-animation">
          <div className="ghost-carrier">
            👻
            <div className="mini-tshirt">👕</div>
          </div>
          <div className="success-text">Added to Cart!</div>
        </div>
      )}

      <style>{`
        .add-to-cart-button {
          position: relative;
          padding: 16px 48px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 2px solid #34d399;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 
            0 0 20px rgba(16, 185, 129, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .add-to-cart-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 
            0 0 30px rgba(16, 185, 129, 0.6),
            0 6px 16px rgba(0, 0, 0, 0.4);
          border-color: #6ee7b7;
        }

        .add-to-cart-button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .add-to-cart-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .button-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .add-to-cart-button:hover .button-glow {
          opacity: 1;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Animation */
        .success-animation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .ghost-carrier {
          position: relative;
          font-size: 80px;
          animation: ghostFlyUp 1.5s ease-out forwards;
          filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.8));
        }

        .mini-tshirt {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 40px;
          animation: tshirtSwing 0.5s ease-in-out infinite;
        }

        @keyframes ghostFlyUp {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-400px) scale(1);
            opacity: 0;
          }
        }

        @keyframes tshirtSwing {
          0%, 100% {
            transform: translateX(-50%) rotate(-5deg);
          }
          50% {
            transform: translateX(-50%) rotate(5deg);
          }
        }

        .success-text {
          font-size: 24px;
          font-weight: bold;
          color: #10b981;
          text-shadow: 
            0 0 10px rgba(16, 185, 129, 0.8),
            0 0 20px rgba(16, 185, 129, 0.6);
          animation: successTextFade 1.5s ease-out forwards;
        }

        @keyframes successTextFade {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
};

export default AddToCartButton;
