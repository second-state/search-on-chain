import { qs } from '../utils/utils';

export default function() {
  qs('#mobileMenuToggler').addEventListener('click', () => {
    qs('#mobileBack').classList.add('show');
  });

  qs('#mobileBack').addEventListener('click', () => {
    qs('#mobileBack').classList.remove('show');
  })
}

export function hideMobile() {
  qs('#mobileBack').classList.remove('show');
}