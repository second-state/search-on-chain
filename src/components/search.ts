import { qs, renderTemplate } from '../utils/utils';
import ES from "../utils/es";
import { Tag } from './tag';
import SearchResults from './searchResults';

function searchUsingKeywords() {
  Tag.ActiveTag && Tag.ActiveTag.deactivate();
  const q = (qs('#searchInput') as HTMLInputElement).value;
  if (!q || /^\s*$/g.test(q)) {
    return;
  }
  SearchResults.Instance && SearchResults.Instance.clear();
  ES.searchKeywords(q, d => {
    new SearchResults(d);
  });
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