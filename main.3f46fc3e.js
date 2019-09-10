// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"SsOS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  name: 'ERC20',
  abi: [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_spender",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_from",
      "type": "address"
    }, {
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_to",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }, {
      "name": "_spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "owner",
      "type": "address"
    }, {
      "indexed": true,
      "name": "spender",
      "type": "address"
    }, {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }]
}];
},{}],"pFhC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ES_API: 'https://etc.search.secondstate.io'
};
},{}],"0HzC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ESSS =
/*#__PURE__*/
function () {
  // Search Engine Base URL (Please include protocol. Please do not include trailing slash)
  // Example: https://search-engine.com
  function ESSS(_searchEngineBaseUrl) {
    _classCallCheck(this, ESSS);

    this.searchEngineBaseUrl = _searchEngineBaseUrl;
    console.log("Search Engine Base URL set to: " + this.searchEngineBaseUrl);
    this.indexStatus = {};
  }

  _createClass(ESSS, [{
    key: "setIndexStatusToTrue",
    value: function setIndexStatusToTrue(_transactionHash) {
      this.indexStatus[_transactionHash] = true;
    }
  }, {
    key: "setIndexStatusToFalse",
    value: function setIndexStatusToFalse(_transactionHash) {
      this.indexStatus[_transactionHash] = false;
    }
  }, {
    key: "getIndexStatus",
    value: function getIndexStatus(_transactionHash) {
      return this.indexStatus[_transactionHash];
    }
  }, {
    key: "queryUsingDsl",
    value: function queryUsingDsl(_query) {
      var url = this.searchEngineBaseUrl + "/api/es_search";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify(_query));
      });
    }
  }, {
    key: "updateStateOfContractAddress",
    value: function updateStateOfContractAddress(_abi, _address) {
      var url = this.searchEngineBaseUrl + "/api/update_state_of_contract_address";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["abi"] = _abi;
        data["address"] = _address;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "updateQualityScore",
    value: function updateQualityScore(_contractAddress, _qualityScore) {
      var url = this.searchEngineBaseUrl + "/api/es_update_quality";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["contractAddress"] = _contractAddress;
        data["qualityScore"] = _qualityScore;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "getMostRecentIndexedBlockNumber",
    value: function getMostRecentIndexedBlockNumber() {
      var url = this.searchEngineBaseUrl + "/api/most_recent_indexed_block_number";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var blockNumber = jsonResponse["aggregations"]["most_recent_block"]["value"];
              resolve(blockNumber);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify());
      });
    }
  }, {
    key: "getBlockInterval",
    value: function getBlockInterval() {
      var url = this.searchEngineBaseUrl + "/api/get_block_interval";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify());
      });
    }
  }, {
    key: "getAbiCount",
    value: function getAbiCount() {
      var url = this.searchEngineBaseUrl + "/api/es_get_abi_count";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var abiCount = jsonResponse["hits"]["total"];
              resolve(abiCount);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify());
      });
    }
  }, {
    key: "getAllCount",
    value: function getAllCount() {
      var url = this.searchEngineBaseUrl + "/api/es_get_all_count";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var allCount = jsonResponse["hits"]["total"];
              resolve(allCount);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify());
      });
    }
  }, {
    key: "getContractCount",
    value: function getContractCount() {
      var url = this.searchEngineBaseUrl + "/api/es_get_contract_count";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var allCount = jsonResponse["hits"]["total"];
              resolve(allCount);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.send(JSON.stringify());
      });
    }
  }, {
    key: "confirmDeployment",
    value: function confirmDeployment(_transactionHash) {
      var url = this.searchEngineBaseUrl + "/api/confirm_deployment";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["hash"] = _transactionHash;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "describeUsingTx",
    value: function describeUsingTx(_transactionHash) {
      var url = this.searchEngineBaseUrl + "/api/describe_using_tx";
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["hash"] = _transactionHash;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var allRecord = JSON.stringify(jsonResponse["hits"]["hits"][0]["_source"]);
              resolve(allRecord);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "submitAbi",
    value: function submitAbi(_abi, _transactionHash) {
      var url = this.searchEngineBaseUrl + "/api/submit_abi";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["abi"] = _abi;
        data["hash"] = _transactionHash;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "submitManyAbis",
    value: function submitManyAbis(_abis, _transactionHash) {
      var url = this.searchEngineBaseUrl + "/api/submit_many_abis";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = {};
        data["abis"] = _abis;
        data["hash"] = _transactionHash;

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "shaAbi",
    value: function shaAbi(_abi) {
      var url = this.searchEngineBaseUrl + "/api/sha_an_abi";
      return new Promise(function (resolve, reject) {
        //data
        var data = {};
        data["abi"] = _abi;
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "sortAbi",
    value: function sortAbi(_abi) {
      var url = this.searchEngineBaseUrl + "/api/sort_an_abi";
      return new Promise(function (resolve, reject) {
        //data
        var data = {};
        data["abi"] = _abi;
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "searchUsingAddress",
    value: function searchUsingAddress(_address) {
      var url = this.searchEngineBaseUrl + "/api/es_search";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = '{"query":{"bool":{"must":[{"match":{"contractAddress":"' + _address + '"}}]}}}'; //execution

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var jsonResponse = JSON.parse(xhr.responseText);
              var allRecord = JSON.stringify(jsonResponse[0]);
              resolve(allRecord);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
      });
    }
  }, {
    key: "searchUsingAbi",
    value: function searchUsingAbi(_abiHash) {
      var url = this.searchEngineBaseUrl + "/api/es_search";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var data = '{"query":{"bool":{"must":[{"match":{"abiShaList":"' + _abiHash + '"}}]}}}'; //execution

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
      });
    }
  }, {
    key: "searchUsingKeywords",
    value: function searchUsingKeywords(_keywords) {
      var url = this.searchEngineBaseUrl + "/api/es_search";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var listOfKeywords = _keywords["keywords"];
        var string = "";
        var i;

        for (i = 0; i < listOfKeywords.length; i++) {
          if (string.length == 0) {
            string = string + '"' + listOfKeywords[i];
          } else {
            string = string + "," + listOfKeywords[i];
          }
        }

        string = string + '"';
        var data = '{"query":{"query_string":{"query":' + string + '}}}';
        console.log(data); //execution

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(JSON.parse(data)));
      });
    }
  }, {
    key: "searchUsingKeywordsAndAbi",
    value: function searchUsingKeywordsAndAbi(_abiHash, _keywords) {
      var url = this.searchEngineBaseUrl + "/api/es_search";
      return new Promise(function (resolve, reject) {
        // request initialisation
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); //data

        var listOfKeywords = _keywords["keywords"];
        var string = "";
        var i;

        for (i = 0; i < listOfKeywords.length; i++) {
          if (string.length == 0) {
            string = string + '"' + listOfKeywords[i];
          } else {
            string = string + "," + listOfKeywords[i];
          }
        }

        string = string + '"';
        var data = '{"query":{"bool":{"must":[{"match":{"abiShaList":"' + _abiHash + '"}},{"query_string":{"query":' + string + '}}]}}}';
        console.log(data); //execution

        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.responseText);
            }
          }
        };

        xhr.onerror = reject;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(JSON.parse(data)));
      });
    }
  }]);

  return ESSS;
}();

var _default = ESSS;
exports.default = _default;
},{}],"ZCfc":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var abis_1 = __importDefault(require("./abis"));

var etc_1 = __importDefault(require("./env/etc"));

var es_ss_1 = __importDefault(require("./es-ss"));

var es = new es_ss_1.default(etc_1.default.ES_API);
var LS_NAME = 'soc';
var AllTags = abis_1.default;
var qs = document.querySelector.bind(document);
var tagTemplate = qs('#tags').childNodes[1].textContent;
var srTemplate = qs('#searchResults').childNodes[1].textContent;
var div = document.createElement('div');
div.innerHTML = qs('#searchResults').childNodes[3].textContent;
var pgTemplateElement = div.children[0];
var pgLinkTemplateElement = pgTemplateElement.querySelectorAll('li');
var PageCount = 10;

(function init() {
  var lsTags = window.localStorage.getItem(LS_NAME);

  if (lsTags !== null) {
    lsTags = JSON.parse(lsTags);
    AllTags = AllTags.concat(lsTags);
  }

  AllTags.forEach(function (tag, index) {
    renderTag(tag);
    es.shaAbi(JSON.stringify(tag.abi)).then(function (data) {
      data = JSON.parse(data);

      if (data.abiSha3) {
        es.searchUsingAbi(data.abiSha3).then(function (data) {
          data = JSON.parse(data);
          qs("#count_" + tag.name).textContent = data.length;

          if (index === 0) {
            qs("#count_" + tag.name).parentElement.classList.add('active');

            if (data.length > 0) {
              renderSearchResults(data, 0);
            }
          }
        }).catch(function (e) {
          console.log(e);
          alert('Error occured.');
        });
      }
    }).catch(function (e) {
      console.log(e);
      alert('Error occured.');
    });
  });
  var ready = {
    abiUploaded: 0,
    contractCount: 0,
    contractAdhered: 0,
    count: 0
  };
  es.getAbiCount().then(function (data) {
    ready.abiUploaded = data;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es.getAllCount().then(function (data) {
    ready.contractCount = data;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es.getContractCount().then(function (data) {
    ready.contractAdhered = data;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  }); // event register

  qs('#searchButton').addEventListener('click', function () {
    searchUsingKeywords();
  });
  qs('#searchInput').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      searchUsingKeywords();
    }
  });
  qs('#tags').addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList && (target.classList.contains('btn') || target.classList.contains('count-badge'))) {
      if (target.classList.contains('count-badge')) {
        target = target.parentElement;
      }

      var activeTagButton = qs('#tags .btn.active');

      if (activeTagButton) {
        activeTagButton.classList.remove('active');
      }

      target.classList.add('active');
      qs('#searchResults').innerHTML = '';
      var tag_1 = target.getAttribute('tag');
      var abi_1 = [];
      AllTags.forEach(function (t) {
        if (t.name === tag_1) {
          abi_1 = t.abi;
        }
      });
      es.shaAbi(JSON.stringify(abi_1)).then(function (data) {
        data = JSON.parse(data);

        if (data.abiSha3) {
          es.searchUsingAbi(data.abiSha3).then(function (data) {
            data = JSON.parse(data);

            if (data.length > 0) {
              qs("#count_" + tag_1).textContent = data.length;
              renderSearchResults(data, 0);
            } else {
              noResult();
            }
          }).catch(function (e) {
            console.log(e);
            alert('Error occured.');
          });
        }
      }).catch(function (e) {
        console.log(e);
        alert('Error occured.');
      });
    }
  });
  qs('#submitTag').addEventListener('click', function (event) {
    var tagName = qs('#tagName').value.trim();
    var abi = qs('#tagAbi').value.trim();
    var txHash = qs('#tagTxHash').value.trim();

    if (!/^[\w\s]+$/g.test(tagName)) {
      alert('Invlid tag name.');
      return;
    }

    try {
      var t = JSON.parse(abi);

      if (_typeof(t) !== 'object') {
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

    for (var i = 0; i < AllTags.length; i++) {
      if (AllTags[i].name === tagName) {
        alert('Duplicated tagName.');
        return;
      }
    }

    es.submitAbi(abi, txHash).then(function (data) {
      data = JSON.parse(data);
      var tags = window.localStorage.getItem(LS_NAME);

      if (tags === null) {
        tags = [];
      } else {
        tags = JSON.parse(tags);
      }

      var tag = {
        name: tagName,
        abi: JSON.parse(abi),
        txHash: txHash
      };
      renderTag(tag);
      tags.push(tag);
      AllTags.push(tag);
      window.localStorage.setItem(LS_NAME, JSON.stringify(tags));
      window.jQuery('#newTagModal').modal('hide');
    }).catch(function (e) {
      console.log(e);
      alert('Error occured while submitting the abi.');
    });
  });
})();

function renderTag(tag) {
  var tags = qs('#tags');
  var html = renderTemplate(tag, tagTemplate);
  var div = document.createElement('div');
  div.innerHTML = html;
  tags.appendChild(div.children[0]);
}

function renderTemplate(obj, template) {
  var result = template;

  for (var k in obj) {
    var rk = new RegExp("{" + k + "}", 'g');
    result = result.replace(rk, obj[k]);
  }

  return result;
}

function renderSummary(ready) {
  var summary = qs('#seSummary');
  var sumTemplate = summary.childNodes[1].textContent;
  var html = renderTemplate(ready, sumTemplate);
  summary.innerHTML = html;
}

function renderSearchResults(data, page) {
  var searchResults = qs('#searchResults');
  var title = document.createElement('h4');
  var count = document.createTextNode(data.length + (data.length === 1 ? ' Result' : ' Results'));
  title.appendChild(count);
  searchResults.appendChild(title);
  var pageData = data.slice(page * PageCount, (page + 1) * PageCount);
  pageData.forEach(function (d) {
    var html = renderTemplate(d, srTemplate);
    var div = document.createElement('div');
    div.innerHTML = html;
    var sr = div.children[0];
    searchResults.appendChild(sr);
    var dtt = sr.querySelector('dt');
    var ddt = sr.querySelector('dd');
    var fd = d.functionData;

    for (var k in fd) {
      var dt = dtt.cloneNode();
      dt.textContent = k;
      var dd = ddt.cloneNode();
      dd.textContent = fd[k];
      dtt.parentElement.appendChild(dt);
      dtt.parentElement.appendChild(dd);
    }
  });

  if (data.length > PageCount) {
    renderPage(data, page);
  }
}

function renderPage(data, page) {
  var VisPageNumber = 4;
  var pageElement = pgTemplateElement.cloneNode(true);
  var toBeRemoved = pageElement.childNodes[1].childNodes;

  for (var i = toBeRemoved.length - 1; i >= 0; i--) {
    pageElement.childNodes[1].removeChild(toBeRemoved[i]);
  }

  var EndPageNumber = Math.floor((data.length - 1) / PageCount);

  if (page === 0) {
    appendPageNumber(data, pageElement, 'Previous', -2);
  } else {
    appendPageNumber(data, pageElement, 'Previous', page - 1);
  }

  var startPage = page - VisPageNumber / 2;
  var endPage = page + VisPageNumber / 2;

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
      appendPageNumber(data, pageElement, '...', page - VisPageNumber / 2 - 2);
    }
  }

  for (var i = startPage; i <= endPage; i++) {
    appendPageNumber(data, pageElement, "" + (i + 1), i === page ? -1 : i);
  }

  if (endPage < EndPageNumber) {
    if (endPage < EndPageNumber - 2) {
      appendPageNumber(data, pageElement, '...', page + VisPageNumber / 2 + 2);
    } else if (endPage === EndPageNumber - 2) {
      appendPageNumber(data, pageElement, "" + EndPageNumber, EndPageNumber - 1);
    }

    appendPageNumber(data, pageElement, "" + (EndPageNumber + 1), EndPageNumber);
  }

  var nextLink;

  if (page === EndPageNumber) {
    appendPageNumber(data, pageElement, 'Next', -2);
  } else {
    appendPageNumber(data, pageElement, 'Next', page + 1);
  }

  qs('#searchResults').appendChild(pageElement);
}

function appendPageNumber(data, pageElement, text, pageNumber) {
  var link = pgLinkTemplateElement[pageNumber < 0 ? pageNumber * -1 : 0].cloneNode(true);

  if (pageNumber >= 0) {
    link.childNodes[0].addEventListener('click', function (event) {
      qs('#searchResults').innerHTML = '';
      renderSearchResults(data, pageNumber);
      event.preventDefault();
    });
  }

  link.childNodes[0].textContent = text;
  pageElement.childNodes[1].appendChild(link);
}

function searchUsingKeywords() {
  qs('#searchResults').innerHTML = '';
  var activeTagButton = qs('#tags .btn.active');

  if (activeTagButton) {
    activeTagButton.classList.remove('active');
  }

  var q = qs('#searchInput').value;

  if (!q || /^\s*$/g.test(q)) {
    return;
  }

  es.searchUsingKeywords({
    keywords: [q]
  }).then(function (data) {
    data = JSON.parse(data);

    if (data.length > 0) {
      renderSearchResults(data, 0);
    } else {
      noResult();
    }
  });
}

function noResult() {
  qs('#searchResults').innerHTML = '<h4>No result</h4>';
}
},{"./abis":"SsOS","./env/etc":"pFhC","./es-ss":"0HzC"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.3f46fc3e.js.map