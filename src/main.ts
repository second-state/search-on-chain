import Abis from './abis';
import Env from './env/etc';

(function init() {
  const tags = document.querySelector('#tags');
  const tagTemplate = tags.childNodes[1].textContent;

  Abis.forEach((abi, index) => {
    const html = renderTemplate(abi, tagTemplate);
    const div = document.createElement('div');
    div.innerHTML = html;
    tags.appendChild(div.childNodes[1]);

    searchSha3(abi.value).then(data => {
      if (data.abiSha3) {
        searchWithSha3(data.abiSha3).then(data => {
          document.querySelector(`#count_${abi.name}`).textContent = data.length;
          if (index === 0) {
            document.querySelector(`#count_${abi.name}`).parentElement.classList.add('active');
            if (data.length > 0) {
              renderSearchResults(data);
            }
          }
        })
      }
    });
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

function searchSha3(abi: object): Promise<any> {
  return fetch(Env.ES_API + 'api/sha_an_abi', {
    method: 'POST',
    body: JSON.stringify({"abi": JSON.stringify(abi)}),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return {};
    }
  });
}

function searchWithSha3(sha3: string): Promise<any> {
  return fetch(Env.ES_API + 'api/es_search', {
    method: 'POST',
    body: JSON.stringify({
      query: {
        bool: {
          must: [{
            match: {
              abiShaList: sha3
            }
          }]
        }
      }
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return [];
    }
  });
}

function renderSearchResults(data: Array<object>) {
  const searchResults = document.querySelector('#searchResults');
  const srTemplate = searchResults.childNodes[1].textContent;

  const title = document.createElement('h4');
  const count = document.createTextNode(data.length + (data.length === 1 ? ' Result' : ' Results'));
  title.appendChild(count);
  searchResults.appendChild(title);
  data.forEach(d => {
    const html = renderTemplate(d, srTemplate);
    const div = document.createElement('div');
    div.innerHTML = html;
    searchResults.appendChild(div.childNodes[1]);
  });
}