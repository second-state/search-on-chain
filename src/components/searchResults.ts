import { qs, renderTemplate } from '../utils/utils';
import C from '../static/constants';
import Pagination from './pagination';

class SearchResults {
  static Template = qs('#searchResults').childNodes[1].textContent;
  static Instance: SearchResults;

  private data: Array<object>;

  constructor(data: Array<object>) {
    this.data = data;
    this.render(0);
    SearchResults.Instance = this;
  }

  clear() {
    qs('#searchResults').innerHTML = '';
  }

  render(page: number) {
    const searchResults = qs('#searchResults');

    if (!this.data || this.data.length === 0) {
      searchResults.innerHTML = '<h4>No result</h4>';
      return;
    }
  
    const title = document.createElement('h4');
    const count = document.createTextNode(this.data.length + (this.data.length === 1 ? ' Result' : ' Results'));
    title.appendChild(count);
    searchResults.appendChild(title);
  
    const pageData = this.data.slice(page * C.PAGE_COUNT, (page+1) * C.PAGE_COUNT);
  
    pageData.forEach(d => {
      const html = renderTemplate(d, SearchResults.Template);
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
  
    if (this.data.length > C.PAGE_COUNT) {
      Pagination(this.data.length, page);
    }
  }
}

export default SearchResults;