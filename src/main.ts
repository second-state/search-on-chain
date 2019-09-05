import Abis from './abis';
import Env from './env/etc';
import ES from './es-ss';

const es = new ES(Env.ES_API);

const srTemplate = document.querySelector('#searchResults').childNodes[1].textContent;

(function init() {
  const tags = document.querySelector('#tags');
  const tagTemplate = tags.childNodes[1].textContent;

  Abis.forEach((abi, index) => {
    const html = renderTemplate(abi, tagTemplate);
    const div = document.createElement('div');
    div.innerHTML = html;
    tags.appendChild(div.children[0]);

    es.shaAbi(JSON.stringify(abi.value)).then(data => {
      data = JSON.parse(data);
      if (data.abiSha3) {
        es.searchUsingAbi(data.abiSha3).then(data => {
          data = JSON.parse(data);
          document.querySelector(`#count_${abi.name}`).textContent = data.length;
          if (index === 0) {
            document.querySelector(`#count_${abi.name}`).parentElement.classList.add('active');
            if (data.length > 0) {
              renderSearchResults(data);
            }
          }
        }).catch(() => {
          alert('Network error');
        })
      }
    }).catch(() => {
      alert('Network error');
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
    const target = event.target as HTMLElement;
    if ( target.classList && target.classList.contains('btn')) {
      target.classList.add('active');
      document.querySelector('#searchResults').innerHTML = '';
      const tag = target.getAttribute('tag');
      let value = [];
      Abis.forEach(abi => {
        if (abi.name === tag) {
          value = abi.value;
        }
      })
      es.shaAbi(JSON.stringify(value)).then(data => {
        data = JSON.parse(data);
        if (data.abiSha3) {
          es.searchUsingAbi(data.abiSha3).then(data => {
            data = JSON.parse(data);
            if (data.length > 0) {
              document.querySelector(`#count_${tag}`).textContent = data.length;
              renderSearchResults(data);
            } else {
              noResult();
            }
          }).catch(() => {
            alert('Network error');
          });
        }
      }).catch(() => {
        alert('Network error');
      });
    }
  });
})();

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

function renderSearchResults(data: Array<object>) {
  const searchResults = document.querySelector('#searchResults');

  const title = document.createElement('h4');
  const count = document.createTextNode(data.length + (data.length === 1 ? ' Result' : ' Results'));
  title.appendChild(count);
  searchResults.appendChild(title);
  data.forEach(d => {
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
      renderSearchResults(data);
    } else {
      noResult();
    }
  });
}

function noResult() {
  document.querySelector('#searchResults').innerHTML = '<h4>No result</h4>';
}