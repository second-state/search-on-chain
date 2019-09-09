import Tags from './abis';
import Env from './env/etc';
import ES from './es-ss';

const es = new ES(Env.ES_API);

const LS_NAME = 'soc';

interface Tag {
  name: string,
  abi: Array<object>
}

let AllTags: Array<Tag> = Tags;

const srTemplate = document.querySelector('#searchResults').childNodes[1].textContent;
const pgWholeTemplate = document.querySelector('#searchResults').childNodes[3].textContent;
const div = document.createElement('div');
div.innerHTML = pgWholeTemplate;
const pgTemplateElement = div.children[0];
const pgLinkTemplateElement = pgTemplateElement.querySelectorAll('li');
const PageCount = 10;

(function init() {
  let lsTags: any = window.localStorage.getItem(LS_NAME);
  if (lsTags !== null) {
    lsTags = JSON.parse(lsTags);
    AllTags = AllTags.concat(lsTags);
  }

  const tags = document.querySelector('#tags');
  const tagTemplate = tags.childNodes[1].textContent;

  AllTags.forEach((tag, index) => {
    const html = renderTemplate(tag, tagTemplate);
    const div = document.createElement('div');
    div.innerHTML = html;
    // if (index < Tags.length) {
    //   div.querySelector('.close-badge').remove();
    // }
    tags.appendChild(div.children[0]);

    es.shaAbi(JSON.stringify(tag.abi)).then(data => {
      data = JSON.parse(data);
      if (data.abiSha3) {
        es.searchUsingAbi(data.abiSha3).then(data => {
          data = JSON.parse(data);
          document.querySelector(`#count_${tag.name}`).textContent = data.length;
          if (index === 0) {
            document.querySelector(`#count_${tag.name}`).parentElement.classList.add('active');
            if (data.length > 0) {
              renderSearchResults(data, 0);
            }
          }
        }).catch((e) => {
          console.log(e);
          alert('Error occured.');
        })
      }
    }).catch((e) => {
      console.log(e);
      alert('Error occured.');
    });
  });

  let ready = {
    abiUploaded: 0,
    contractCount: 0,
    contractAdhered: 0,
    count: 0
  };
  es.getAbiCount().then(data => {
    ready.abiUploaded = data;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es.getAllCount().then(data => {
    ready.contractCount = data;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es.getContractCount().then(data => {
    ready.contractAdhered = data;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });

  // event register
  document.querySelector('#searchButton').addEventListener('click', () => {
    searchUsingKeywords();
  });
  document.querySelector('#searchInput').addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      searchUsingKeywords();
    }
  });

  document.querySelector('#tags').addEventListener('click', (event) => {
    let target = event.target as HTMLElement;
    if (target.classList && (target.classList.contains('btn') || target.classList.contains('count-badge'))) {
      if (target.classList.contains('count-badge')) {
        target = target.parentElement;
      }
      const activeTagButton = document.querySelector('#tags .btn.active')
      if (activeTagButton) {
        activeTagButton.classList.remove('active');
      }
      target.classList.add('active');
      document.querySelector('#searchResults').innerHTML = '';
      const tag = target.getAttribute('tag');
      let abi = [];
      AllTags.forEach(t => {
        if (t.name === tag) {
          abi = t.abi;
        }
      });
      es.shaAbi(JSON.stringify(abi)).then(data => {
        data = JSON.parse(data);
        if (data.abiSha3) {
          es.searchUsingAbi(data.abiSha3).then(data => {
            data = JSON.parse(data);
            if (data.length > 0) {
              document.querySelector(`#count_${tag}`).textContent = data.length;
              renderSearchResults(data, 0);
            } else {
              noResult();
            }
          }).catch((e) => {
            console.log(e);
            alert('Error occured.');
          });
        }
      }).catch((e) => {
        console.log(e);
        alert('Error occured.');
      });
    }
  });

  document.querySelector('#submitTag').addEventListener('click', (event) => {
    const tagName = (document.querySelector('#tagName') as HTMLInputElement).value.trim();
    const abi = (document.querySelector('#tagAbi') as HTMLInputElement).value.trim();
    const txHash = (document.querySelector('#tagTxHash') as HTMLInputElement).value.trim();
    
    if (!/^[\w\s]+$/g.test(tagName)) {
      alert('Invlid tag name.');
      return;
    }
    try {
      const t = JSON.parse(abi);
      if (typeof t !== 'object') {
        alert('Invalid abi');
        return;
      }
    } catch (e) {
      alert('Invalid abi');
      return;
    }

    if (!/^0x[a-zA-Z0-9]{64}$/g.test(txHash)) {
      alert('Invalid txHash');
      return;
    }

    for (let i = 0; i < AllTags.length; i++) {
      if (AllTags[i].name === tagName) {
        alert('Duplicated tagName.');
        return;
      }
    }

    es.submitAbi(abi, txHash).then((data) => {
      data = JSON.parse(data);
      let tags: any = window.localStorage.getItem(LS_NAME);
      if (tags === null) {
        tags = [];
      } else {
        tags = JSON.parse(tags);
      }
      const tag = {
        name: tagName,
        abi: JSON.parse(abi),
        txHash: txHash
      };
      renderTag(tag);
      tags.push(tag);
      AllTags.push(tag);
      window.localStorage.setItem(LS_NAME, JSON.stringify(tags));
      ((window as any).jQuery('#newTagModal') as any).modal('hide');
    }).catch(e => {
      console.log(e);
      alert('Error occured while submitting the abi.')
    });
  });
})();

function renderTag(tag: object) {
  const tags = document.querySelector('#tags');
  const tagTemplate = tags.childNodes[1].textContent;
  const html = renderTemplate(tag, tagTemplate);
  const div = document.createElement('div');
  div.innerHTML = html;
  tags.appendChild(div.children[0]);
}

function renderTemplate(obj: Object, template: string): string {
  let result = template;
  for (let k in obj) {
    const rk = new RegExp(`{${k}}`, 'g')
    result = result.replace(rk, obj[k]);
  }
  return result;
}

function renderSummary(ready: Object) {
  const summary = document.querySelector('#seSummary');
  const sumTemplate = summary.childNodes[1].textContent;
  const html = renderTemplate(ready, sumTemplate);
  summary.innerHTML = html;
}

function renderSearchResults(data: Array<object>, page: number) {
  const searchResults = document.querySelector('#searchResults');

  const title = document.createElement('h4');
  const count = document.createTextNode(data.length + (data.length === 1 ? ' Result' : ' Results'));
  title.appendChild(count);
  searchResults.appendChild(title);

  const pageData = data.slice(page * PageCount, (page+1) * PageCount);

  pageData.forEach(d => {
    const html = renderTemplate(d, srTemplate);
    const div = document.createElement('div');
    div.innerHTML = html;
    const sr = div.children[0];
    searchResults.appendChild(sr);

    const dtt = sr.querySelector('dt');
    const ddt = sr.querySelector('dd');
    const fd = (d as any).functionData;
    for (let k in fd) {
      const dt = dtt.cloneNode();
      dt.textContent = k;
      const dd = ddt.cloneNode();
      dd.textContent = fd[k];
      dtt.parentElement.appendChild(dt);
      dtt.parentElement.appendChild(dd);
    }
  });

  if (data.length > PageCount) {
    renderPage(data, page);
  }
}

function renderPage(data: Array<object>, page: number) {
  const VisPageNumber = 4;
  const pageElement = pgTemplateElement.cloneNode(true);
  const toBeRemoved = pageElement.childNodes[1].childNodes;
  for (let i = toBeRemoved.length-1; i >= 0; i--) {
    pageElement.childNodes[1].removeChild(toBeRemoved[i]);
  }
  const EndPageNumber = Math.floor((data.length-1) / PageCount);

  if (page === 0) {
    appendPageNumber(data, pageElement, 'Previous', -2);
  } else {
    appendPageNumber(data, pageElement, 'Previous', page - 1);
  }

  let startPage = page - VisPageNumber/2;
  let endPage = page + VisPageNumber/2;
  if (startPage < 0) {
    startPage = 0;
    endPage = startPage + VisPageNumber;
    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
    }
  } else {
    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
      startPage = endPage - VisPageNumber;
      if (startPage < 0) {
        startPage = 0;
      }
    }
  }

  if (startPage > 0) {
    appendPageNumber(data, pageElement, '1', 0);
    if (startPage === 2) {
      appendPageNumber(data, pageElement, '2', 1);
    } else if (startPage > 2) {
      appendPageNumber(data, pageElement, '...', page - VisPageNumber/2 - 2);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    appendPageNumber(data, pageElement, `${i+1}`, (i === page ? -1 : i));
  }
  if (endPage < EndPageNumber) {
    if (endPage < EndPageNumber - 2) {
      appendPageNumber(data, pageElement, '...', page + VisPageNumber/2 + 2);
    } else if (endPage === EndPageNumber - 2) {
      appendPageNumber(data, pageElement, `${EndPageNumber}`, EndPageNumber - 1);
    }
    appendPageNumber(data, pageElement, `${EndPageNumber+1}`, EndPageNumber);
  }
  
  let nextLink;
  if (page === EndPageNumber) {
    appendPageNumber(data, pageElement, 'Next', -2);
  } else {
    appendPageNumber(data, pageElement, 'Next', page + 1);
  }

  document.querySelector('#searchResults').appendChild(pageElement);
}

function appendPageNumber(data: Array<object>, pageElement: Node, text: string, pageNumber: number) {
  const link = pgLinkTemplateElement[pageNumber < 0 ? pageNumber*-1 : 0].cloneNode(true);
  if (pageNumber >= 0) {
    link.childNodes[0].addEventListener('click', (event) => {
      document.querySelector('#searchResults').innerHTML = '';
      renderSearchResults(data, pageNumber);
      event.preventDefault();
    });
  }
  link.childNodes[0].textContent = text;
  pageElement.childNodes[1].appendChild(link);
}

function searchUsingKeywords() {
  document.querySelector('#searchResults').innerHTML = '';
  const activeTagButton = document.querySelector('#tags .btn.active')
  if (activeTagButton) {
    activeTagButton.classList.remove('active');
  }
  const q = (document.querySelector('#searchInput') as HTMLInputElement).value;
  if (!q || /^\s*$/g.test(q)) {
    return;
  }
  es.searchUsingKeywords({keywords: [q]}).then((data) => {
    data = JSON.parse(data);
    if (data.length > 0) {
      renderSearchResults(data, 0);
    } else {
      noResult();
    }
  });
}

function noResult() {
  document.querySelector('#searchResults').innerHTML = '<h4>No result</h4>';
}