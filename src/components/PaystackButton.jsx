
import React from 'react';
import usePaystackLegacy from '@/app/hooks/usePaystackLegacy';

const PaystackLegacyButton = ({
  amount,
  email,
  publicKey,
  reference,
  firstname = '',
  lastname = '',
  metadata = {},
  onSuccess,
  onClose,
  children,
  className = '',
}) => {
  const { isReady } = usePaystackLegacy();

  const initializePayment = () => {
    if (!isReady || !window.PaystackPop) {
      console.error('Paystack script not loaded');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amount * 100, // Convert to kobo
      firstname,
      lastname,
      ref: reference,
      metadata,
      callback: (response) => {
        onSuccess(response);
      },
      onClose: () => {
        if (onClose) onClose();
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={initializePayment}
      disabled={!isReady}
      className={`${className} ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children || 'Pay with Paystack'}
    </button>
  );
};

export default PaystackLegacyButton;
