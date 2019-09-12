import { qs } from '../utils/utils';
import { search } from './search';
import C from '../static/constants';

export default function() {
  const web3 = (window as any).web3;
  const ethereum = (window as any).ethereum;
  const $ = (window as any).jQuery;

  if (!web3 ||
      !web3.currentProvider ||
      web3.currentProvider.isMetaMask !== true ||
      !web3.eth ||
      !ethereum
    ) {
    return;
  }

  const ls = window.localStorage.getItem(C.LS_SETTING);
  if (ls !== null) {
    const settings = JSON.parse(ls);
    if (settings && settings.metamask && settings.metamask.dismiss) {
      return;
    }
  }

  function showLinkToast(account: string) {
    qs('#metaMaskAccountLink').textContent = account;
    qs('#metaMaskAccountLink').addEventListener('click', e => {
      (qs('#searchInput') as HTMLInputElement).value = `creator:${account}`;
      search();
      e.preventDefault();
    });
    $('#metaMaskAccountToast').toast('show');
  }

  const accounts = web3.eth.accounts;
  if (accounts && accounts.length > 0) {
    qs('#metaMaskAuthorizeToast').remove();
    showLinkToast(accounts[0]);
  } else {
    qs('#metaMaskAuthorizeBtn').addEventListener('click', () => {
      ethereum.enable().then(d => {
        $('#metaMaskAuthorizeToast').on('hidden.bs.toast', () => {
          showLinkToast(d[0]);
        }).toast('hide');
      });
    });
    $('#metaMaskAuthorizeToast').toast('show');
  }

  const dismiss = document.querySelectorAll('.toast .dismiss');
  dismiss.forEach(d => {
    d.addEventListener('click', () => {
      window.localStorage.setItem(C.LS_SETTING, JSON.stringify({metamask: {dismiss: true}}));
    });
  });
}