import { qs, renderTemplate } from '../utils/utils';
import PreTags from '../static/abis';
import C from '../static/constants';
import ES from "../utils/es";
import SearchResults from './searchResults';
import { hideMobile } from './mobile';

class Tag {
  static Template = qs('#tags').childNodes[1].textContent;
  static TemplateM = qs('#mobileTags').childNodes[3].textContent;
  static ActiveTag: Tag;

  public name: string;
  public abi: Array<object>;

  public set count(c: number) {
    this.dom.querySelector('.count-badge').textContent = c.toString();
    this.domM.querySelector('.count-badge').textContent = c.toString();
  }

  public removed: boolean;
  private dom: Element;
  private domM: Element;

  constructor(name: string, abi: Array<object>) {
    this.name = name;
    this.abi = abi;

    const tags = qs('#tags');
    let html = renderTemplate({name: this.name}, Tag.Template);
    let div = document.createElement('div');
    div.innerHTML = html;
    this.dom = div.children[0];
    tags.appendChild(this.dom);

    const tagsM = qs('#mobileTags');
    html = renderTemplate({name: this.name}, Tag.TemplateM);
    div.innerHTML = html;
    this.domM = div.children[0];
    tagsM.insertBefore(this.domM, tagsM.children[tagsM.children.length - 1]);

    function activate() {
      Tag.ActiveTag && Tag.ActiveTag.deactivate();
      this.activate();
      SearchResults.Instance && SearchResults.Instance.clear();
      ES.searchAbi(this.abi, d => {
        this.count = d.length;
        new SearchResults(d);
      });
    }

    this.dom.querySelector('button').addEventListener('click', () => {
      if (this.dom.querySelector('button').classList.contains('active')) {
        return;
      }
      activate.call(this);
    });

    this.domM.addEventListener('click', () => {
      if (this.domM.classList.contains('active') || this.domM.getAttribute('disabled')) {
        return;
      }
      activate.call(this);
      hideMobile();
    });

    this.dom.querySelector('.close-badge').addEventListener('click', () => {
      this.removed = true;
      this.dom.remove();
      this.domM.remove();
    });
    this.domM.querySelector('.close-badge').addEventListener('click', () => {
      this.removed = true;
      this.dom.remove();
      this.domM.remove();
    });
  }

  public preserve() {
    this.dom.classList.add('preserved');
    this.domM.classList.add('preserved');
  }

  public activate() {
    this.dom.querySelector('button').classList.add('active');
    this.domM.classList.add('active');
    Tag.ActiveTag = this;
  }

  public deactivate() {
    this.dom.querySelector('button').classList.remove('active');
    this.domM.classList.remove('active');
    Tag.ActiveTag = null;
  }

  public disable() {
    this.dom.querySelector('button').setAttribute('disabled', 'disabled');
    this.domM.setAttribute('disabled', 'disabled');
  }

  public enable() {
    this.dom.querySelector('button').removeAttribute('disabled');
    this.domM.removeAttribute('disabled');
  }

  public toJSON() {
    return {name: this.name, abi: this.abi};
  }
}

export default function() {
  PreTags.forEach((t, i) => {
    const tag = new Tag(t.name, t.abi);
    tag.preserve();
    if (i === 0) {
      tag.activate();
      ES.searchAbi(t.abi, d => {
        tag.count = d.length;
        new SearchResults(d);
      });
    } else {
      ES.searchAbi(t.abi, d => {
        tag.count = d.length;
      });
    }
  });

  const lsTags = new Array<Tag>();

  let ls: string|null = window.localStorage.getItem(C.LS_NAME);
  if (ls !== null) {
    const lt = JSON.parse(ls);
    if (lt.length > 0) {
      qs('#editTags').style.display = 'inline';
      qs('#mobileEditTags').style.display = 'inline';
    }
    lt.forEach(t => {
      const tag = new Tag(t.name, t.abi);
      lsTags.push(tag);
      ES.searchAbi(t.abi, d => {
        tag.count = d.length;
      });
    });
  }

  let editing = false;
  function edit() {
    if (!editing) {
      this.textContent = 'Done';
      qs('#tags').classList.add('editing');
      qs('#mobileTags').classList.add('editing');
      qs('#addTag').setAttribute('disabled', 'disabled');
      qs('#mobileAddTag').setAttribute('disabled', 'disabled');

      lsTags.forEach(t => {
        t.disable();
      });
      editing = true;
    } else {
      this.textContent = 'Edit Tags';
      qs('#tags').classList.remove('editing');
      qs('#mobileTags').classList.remove('editing');
      qs('#addTag').removeAttribute('disabled');
      qs('#mobileAddTag').removeAttribute('disabled');

      for (let i = lsTags.length-1; i >= 0; i--) {
        let t = lsTags[i];
        if (t.removed) {
          lsTags.splice(i, 1);
        } else {
          t.enable();
        }
      }
      if (lsTags.length === 0) {
        qs('#editTags').style.display = 'none';
        qs('#mobileEditTags').style.display = 'none';
      }
      window.localStorage.setItem(C.LS_NAME, JSON.stringify(lsTags));
      editing = false;
    }
  }
  qs('#editTags').addEventListener('click', edit);
  qs('#mobileEditTags').addEventListener('click', edit);

  qs('#submitTag').addEventListener('click', () => {
    const tagName = (qs('#tagName') as HTMLInputElement).value.trim();
    const abiStr = (qs('#tagAbi') as HTMLInputElement).value.trim();
    const txHash = (qs('#tagTxHash') as HTMLInputElement).value.trim();
    
    if (!/^[\w\s]+$/g.test(tagName)) {
      alert('Invlid tag name.');
      return;
    }

    let abi: Array<object>; 
    try {
      abi = JSON.parse(abiStr);
      if (typeof abi !== 'object') {
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

    for (let i = 0; i < PreTags.length; i++) {
      if (PreTags[i].name === tagName) {
        alert('Duplicated tag name.');
        return;
      }
    }

    for (let i = 0; i < lsTags.length; i++) {
      if (lsTags[i].name === tagName) {
        alert('Duplicated tag name.');
        return;
      }
    }

    ES.submitAbi(abi, txHash, d => {
      const tag = {
        name: tagName,
        abi,
        txHash
      };
      lsTags.push(new Tag(tagName, abi));
      window.localStorage.setItem(C.LS_NAME, JSON.stringify(lsTags));
      qs('#editTags').style.display = 'inline';
      qs('#mobileEditTags').style.display = 'inline';
      qs('#newTagModal form').reset();
      ((window as any).jQuery('#newTagModal') as any).modal('hide');
    });
  });
}

export { Tag }