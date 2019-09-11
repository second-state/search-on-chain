import Env from '../env/etc';
import ES from './es-ss';

const es = new ES(Env.ES_API);

export default {
  searchAbi(abi: Array<object>, cb: Function) {
    es.shaAbi(JSON.stringify(abi)).then(data => {
      const d = JSON.parse(data);
      if (d.abiSha3) {
        es.searchUsingAbi(d.abiSha3).then(data => {
          cb(JSON.parse(data));
        }).catch((e) => {
          console.log(e);
          alert('Error occured.');
        })
      }
    }).catch((e) => {
      console.log(e);
      alert('Error occured.');
    });
  },

  searchKeywords(keywords: string, cb: Function) {
    es.searchUsingKeywords({keywords: [keywords]}).then((data) => {
      cb(JSON.parse(data));
    }).catch(e => {
      console.log(e);
      alert('Error occured.');
    });
  },

  submitAbi(abi: Array<object>, txHash: string, cb: Function) {
    es.submitAbi(JSON.stringify(abi), txHash).then((data) => {
      cb(JSON.parse(data));
    }).catch(e => {
      console.log(e);
      alert('Error occured while submitting the abi.');
    });
  },

  getAbiCount(cb: Function) {
    es.getAbiCount().then(data => {
      cb(data);
    });
  },

  getAllCount(cb: Function) {
    es.getAllCount().then(data => {
      cb(data);
    });
  },

  getContractCount(cb: Function) {
    es.getContractCount().then(data => {
      cb(data);
    });
  }
}