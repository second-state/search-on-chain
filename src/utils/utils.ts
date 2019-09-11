function renderTemplate(obj: Object, template: string): string {
  let result = template;
  for (let k in obj) {
    const rk = new RegExp(`{${k}}`, 'g')
    result = result.replace(rk, obj[k]);
  }
  return result;
}

const qs = document.querySelector.bind(document);

export { qs, renderTemplate };