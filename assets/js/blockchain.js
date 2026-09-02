(() => {
  'use strict';

  // Checkout presentation only. Real payment confirmation must happen on a
  // trusted backend using a blockchain node or payment-provider webhook.
  const wallets = Object.freeze({
    ETH: ['Ethereum network', '0x061528A749975bAc65fa7883906F8c8dC23d997B'],
    BTC: ['Bitcoin network', 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'],
    USDT: ['TRON network', 'TKLnC9xQYm1V9XJ8u8N4WqB9bC6qV2XzNg'],
    BNB: ['BNB Smart Chain', '0x061528A749975bAc65fa7883906F8c8dC23d997B'],
    SOL: ['Solana network', '6kAv4Yd8n9p5m2j7q1r4t8v9w3x5z7a1b3c5d7e9h35Q'],
    LTC: ['Litecoin network', 'LabrUz9p2m4j6q8r1t3v5w7x9z2a4b6c8dXpRR']
  });

  let initialized = false;
  let onGiftCardAction = () => {};

  const getElements = () => ({
    checkoutAction: document.getElementById('checkoutAction'),
    cryptoPanel: document.getElementById('cryptoPanel'),
    giftPanel: document.getElementById('giftPanel'),
    walletNetwork: document.getElementById('walletNetwork'),
    walletAddress: document.getElementById('walletAddress'),
    copyAddressBtn: document.getElementById('copyAddressBtn')
  });

  function setPayment(method) {
    const elements = getElements();
    document.querySelectorAll('[data-payment]').forEach(option => {
      option.classList.toggle('selected', option.dataset.payment === method);
    });

    const giftCard = method === 'giftcard';
    elements.cryptoPanel.hidden = giftCard;
    elements.giftPanel.hidden = !giftCard;
    elements.checkoutAction.disabled = false;
    elements.checkoutAction.textContent = giftCard
      ? 'Join Discord to redeem'
      : 'Listening for on-chain transfer...';
    elements.checkoutAction.dataset.checkoutMethod = giftCard ? 'giftcard' : 'crypto';
  }

  function selectCoin(button) {
    const coin = button.dataset.coin;
    const wallet = wallets[coin];
    if (!wallet) return;

    const elements = getElements();
    document.querySelectorAll('.coin-option').forEach(option => {
      option.classList.toggle('active', option === button);
    });
    elements.walletNetwork.textContent = `${coin} · ${wallet[0]}`;
    elements.walletAddress.textContent = wallet[1];
  }

  async function copyAddress() {
    const { walletAddress, copyAddressBtn } = getElements();
    const originalText = copyAddressBtn.textContent;
    try {
      await navigator.clipboard.writeText(walletAddress.textContent);
      copyAddressBtn.textContent = 'Copied!';
    } catch {
      copyAddressBtn.textContent = 'Copy failed';
    }
    setTimeout(() => { copyAddressBtn.textContent = originalText; }, 1800);
  }

  function init(options = {}) {
    if (initialized) return;
    initialized = true;
    if (typeof options.onGiftCardAction === 'function') {
      onGiftCardAction = options.onGiftCardAction;
    }

    document.querySelectorAll('[data-payment]').forEach(button => {
      button.addEventListener('click', () => setPayment(button.dataset.payment));
    });
    document.querySelectorAll('.coin-option').forEach(button => {
      button.addEventListener('click', () => selectCoin(button));
    });

    const elements = getElements();
    elements.copyAddressBtn.addEventListener('click', copyAddress);
    elements.checkoutAction.addEventListener('click', () => {
      if (elements.checkoutAction.dataset.checkoutMethod === 'giftcard') {
        onGiftCardAction();
      }
    });

    const defaultCoin = document.querySelector('.coin-option[data-coin="ETH"]');
    if (defaultCoin) selectCoin(defaultCoin);
    setPayment('crypto');
  }

  window.UnmaskedBlockchain = Object.freeze({ init, setPayment });
})();
