import { qs, renderTemplate } from '../utils/utils';
import ES from "../utils/es";

function renderSummary(ready: Object) {
  const summary = qs('#seSummary');
  const sumTemplate = summary.childNodes[1].textContent;
  const html = renderTemplate(ready, sumTemplate);
  summary.innerHTML = html;
}

export default function() {
  let ready = {
    abiUploaded: 0,
    contractCount: 0,
    contractAdhered: 0,
    count: 0
  };
  ES.getAbiCount(d => {
    ready.abiUploaded = d;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  ES.getAllCount(d => {
    ready.contractCount = d;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  ES.getContractCount(d => {
    ready.contractAdhered = d;
    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
}