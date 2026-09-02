(() => {
  'use strict';

  // Checkout presentation only. Real payment confirmation must happen on a
  // trusted backend using a blockchain node or payment-provider webhook.
  const wallets = Object.freeze({
    ETH: ['Ethereum network', '0x0615A60fb53F2ff76B33E7b86BB3712a0ded997B'],
    BTC: ['Bitcoin network', 'bc1qw5pchv2vq96pxedm59tp00x8m0elud8lfkt0yg'],
    USDT: ['Solana network only · USDT (SPL)', '6kAv4YgN2ep9XwuQH5trrMwVtkzvEeWoUyWgcX3ih35Q'],
    BNB: ['BNB Smart Chain', '0x0615A60fb53F2ff76B33E7b86BB3712a0ded997B'],
    SOL: ['Solana network', '6kAv4YgN2ep9XwuQH5trrMwVtkzvEeWoUyWgcX3ih35Q'],
    LTC: ['Litecoin network', 'LabrUzTjay6SiSnxVax8NRptBahsUtXpRR']
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
