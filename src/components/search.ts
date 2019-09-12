import { qs, renderTemplate } from '../utils/utils';
import ES from "../utils/es";
import { Tag } from './tag';
import SearchResults from './searchResults';

const DslTemplate = {
  "query": {
    "bool": {
      "must": [{
          "match": {}
      }]
    }
  }
};

const FieldsMapping = {
  txhash: 'TxHash',
  block: 'blockNumber',
  contract: 'contractAddress',
  creator: 'creator'
}

function filterDsl(q: string): object {
  const m = /^([a-zA-Z]+)\:(.+)$/g.exec(q);
  if (!m || m.length !== 3 || !FieldsMapping[m[1].toLowerCase()]) {
    return null;
  }
  let dsl = JSON.parse(JSON.stringify(DslTemplate));
  dsl.query.bool.must[0].match[FieldsMapping[m[1].toLowerCase()]] = m[2].trim();
  return dsl;
}

function searchUsingKeywords() {
  Tag.ActiveTag && Tag.ActiveTag.deactivate();
  let q = (qs('#searchInput') as HTMLInputElement).value;
  if (!q || /^\s*$/g.test(q)) {
    return;
  }
  q = q.trim();
  const dsl = filterDsl(q);
  SearchResults.Instance && SearchResults.Instance.clear();
  if (dsl === null) {
    ES.searchKeywords(q, d => {
      new SearchResults(d);
    });
  } else {
    ES.searchDsl(dsl, d => {
      new SearchResults(d);
    });
  }
}

export default function() {
  qs('#searchButton').addEventListener('click', () => {
    searchUsingKeywords();
  });
  qs('#searchInput').addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      searchUsingKeywords();
    }
  });
}

export { searchUsingKeywords as search };