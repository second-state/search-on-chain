import { qs, renderTemplate } from '../utils/utils';
import C from '../static/constants';
import SearchResults from './searchResults';

const div = document.createElement('div');
div.innerHTML = qs('#searchResults').childNodes[3].textContent;
const PgTemplateElement = div.children[0];
const PgLinkTemplateElement = PgTemplateElement.querySelectorAll('li');

function appendPageNumber(pageElement: Node, text: string, pageNumber: number) {
  const link = PgLinkTemplateElement[pageNumber < 0 ? pageNumber*-1 : 0].cloneNode(true);
  if (pageNumber >= 0) {
    link.childNodes[0].addEventListener('click', (event) => {
      SearchResults.Instance.clear();
      SearchResults.Instance.render(pageNumber);
      event.preventDefault();
    });
  }
  link.childNodes[0].textContent = text;
  pageElement.childNodes[1].appendChild(link);
}

export default function Pagination(totalCount: number, current: number) {
  const pageElement = PgTemplateElement.cloneNode(true);
  const toBeRemoved = pageElement.childNodes[1].childNodes;
  for (let i = toBeRemoved.length-1; i >= 0; i--) {
    pageElement.childNodes[1].removeChild(toBeRemoved[i]);
  }
  const EndPageNumber = Math.floor((totalCount-1) / C.PAGE_COUNT);

  if (current === 0) {
    appendPageNumber(pageElement, 'Previous', -2);
  } else {
    appendPageNumber(pageElement, 'Previous', current - 1);
  }

  let startPage = current - C.VIS_PAGE_NUMBER/2;
  let endPage = current + C.VIS_PAGE_NUMBER/2;
  if (startPage < 0) {
    startPage = 0;
    endPage = startPage + C.VIS_PAGE_NUMBER;
    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
    }
  } else {
    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
      startPage = endPage - C.VIS_PAGE_NUMBER;
      if (startPage < 0) {
        startPage = 0;
      }
    }
  }

  if (startPage > 0) {
    appendPageNumber(pageElement, '1', 0);
    if (startPage === 2) {
      appendPageNumber(pageElement, '2', 1);
    } else if (startPage > 2) {
      appendPageNumber(pageElement, '...', current - C.VIS_PAGE_NUMBER/2 - 2);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    appendPageNumber(pageElement, `${i+1}`, (i === current ? -1 : i));
  }
  if (endPage < EndPageNumber) {
    if (endPage < EndPageNumber - 2) {
      appendPageNumber(pageElement, '...', current + C.VIS_PAGE_NUMBER/2 + 2);
    } else if (endPage === EndPageNumber - 2) {
      appendPageNumber(pageElement, `${EndPageNumber}`, EndPageNumber - 1);
    }
    appendPageNumber(pageElement, `${EndPageNumber+1}`, EndPageNumber);
  }
  
  let nextLink;
  if (current === EndPageNumber) {
    appendPageNumber(pageElement, 'Next', -2);
  } else {
    appendPageNumber(pageElement, 'Next', current + 1);
  }

  qs('#searchResults').appendChild(pageElement);
}