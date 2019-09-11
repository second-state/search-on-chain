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
})({"8wWJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function renderTemplate(obj, template) {
  var result = template;

  for (var k in obj) {
    var rk = new RegExp("{" + k + "}", 'g');
    result = result.replace(rk, obj[k]);
  }

  return result;
}

exports.renderTemplate = renderTemplate;
var qs = document.querySelector.bind(document);
exports.qs = qs;
},{}],"gqc0":[function(require,module,exports) {
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
},{}],"NOJ5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  LS_NAME: 'soc',
  PAGE_COUNT: 10,
  VIS_PAGE_NUMBER: 4
};
},{}],"pFhC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ES_API: 'https://etc.search.secondstate.io'
};
},{}],"NGGe":[function(require,module,exports) {
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
},{}],"xmoD":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var etc_1 = __importDefault(require("../env/etc"));

var es_ss_1 = __importDefault(require("./es-ss"));

var es = new es_ss_1.default(etc_1.default.ES_API);
exports.default = {
  searchAbi: function searchAbi(abi, cb) {
    es.shaAbi(JSON.stringify(abi)).then(function (data) {
      var d = JSON.parse(data);

      if (d.abiSha3) {
        es.searchUsingAbi(d.abiSha3).then(function (data) {
          cb(JSON.parse(data));
        }).catch(function (e) {
          console.log(e);
          alert('Error occured.');
        });
      }
    }).catch(function (e) {
      console.log(e);
      alert('Error occured.');
    });
  },
  searchKeywords: function searchKeywords(keywords, cb) {
    es.searchUsingKeywords({
      keywords: [keywords]
    }).then(function (data) {
      cb(JSON.parse(data));
    }).catch(function (e) {
      console.log(e);
      alert('Error occured.');
    });
  },
  submitAbi: function submitAbi(abi, txHash, cb) {
    es.submitAbi(JSON.stringify(abi), txHash).then(function (data) {
      cb(JSON.parse(data));
    }).catch(function (e) {
      console.log(e);
      alert('Error occured while submitting the abi.');
    });
  },
  getAbiCount: function getAbiCount(cb) {
    es.getAbiCount().then(function (data) {
      cb(data);
    });
  },
  getAllCount: function getAllCount(cb) {
    es.getAllCount().then(function (data) {
      cb(data);
    });
  },
  getContractCount: function getContractCount(cb) {
    es.getContractCount().then(function (data) {
      cb(data);
    });
  }
};
},{"../env/etc":"pFhC","./es-ss":"NGGe"}],"3SV9":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var constants_1 = __importDefault(require("../static/constants"));

var searchResults_1 = __importDefault(require("./searchResults"));

var div = document.createElement('div');
div.innerHTML = utils_1.qs('#searchResults').childNodes[3].textContent;
var PgTemplateElement = div.children[0];
var PgLinkTemplateElement = PgTemplateElement.querySelectorAll('li');

function appendPageNumber(pageElement, text, pageNumber) {
  var link = PgLinkTemplateElement[pageNumber < 0 ? pageNumber * -1 : 0].cloneNode(true);

  if (pageNumber >= 0) {
    link.childNodes[0].addEventListener('click', function (event) {
      searchResults_1.default.Instance.clear();
      searchResults_1.default.Instance.render(pageNumber);
      event.preventDefault();
    });
  }

  link.childNodes[0].textContent = text;
  pageElement.childNodes[1].appendChild(link);
}

function Pagination(totalCount, current) {
  var pageElement = PgTemplateElement.cloneNode(true);
  var toBeRemoved = pageElement.childNodes[1].childNodes;

  for (var i = toBeRemoved.length - 1; i >= 0; i--) {
    pageElement.childNodes[1].removeChild(toBeRemoved[i]);
  }

  var EndPageNumber = Math.floor((totalCount - 1) / constants_1.default.PAGE_COUNT);

  if (current === 0) {
    appendPageNumber(pageElement, 'Previous', -2);
  } else {
    appendPageNumber(pageElement, 'Previous', current - 1);
  }

  var startPage = current - constants_1.default.VIS_PAGE_NUMBER / 2;
  var endPage = current + constants_1.default.VIS_PAGE_NUMBER / 2;

  if (startPage < 0) {
    startPage = 0;
    endPage = startPage + constants_1.default.VIS_PAGE_NUMBER;

    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
    }
  } else {
    if (endPage > EndPageNumber) {
      endPage = EndPageNumber;
      startPage = endPage - constants_1.default.VIS_PAGE_NUMBER;

      if (startPage < 0) {
        startPage = 0;
      }
    }
  }

  if (startPage > 0) {
    appendPageNumber(pageElement, '1', 0);

    if (startPage === 2) {
      appendPageNumber(pageElement, '2', 1);
    } else if (startPage > 2) {
      appendPageNumber(pageElement, '...', current - constants_1.default.VIS_PAGE_NUMBER / 2 - 2);
    }
  }

  for (var i = startPage; i <= endPage; i++) {
    appendPageNumber(pageElement, "" + (i + 1), i === current ? -1 : i);
  }

  if (endPage < EndPageNumber) {
    if (endPage < EndPageNumber - 2) {
      appendPageNumber(pageElement, '...', current + constants_1.default.VIS_PAGE_NUMBER / 2 + 2);
    } else if (endPage === EndPageNumber - 2) {
      appendPageNumber(pageElement, "" + EndPageNumber, EndPageNumber - 1);
    }

    appendPageNumber(pageElement, "" + (EndPageNumber + 1), EndPageNumber);
  }

  var nextLink;

  if (current === EndPageNumber) {
    appendPageNumber(pageElement, 'Next', -2);
  } else {
    appendPageNumber(pageElement, 'Next', current + 1);
  }

  utils_1.qs('#searchResults').appendChild(pageElement);
}

exports.default = Pagination;
},{"../utils/utils":"8wWJ","../static/constants":"NOJ5","./searchResults":"7co4"}],"7co4":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var constants_1 = __importDefault(require("../static/constants"));

var pagination_1 = __importDefault(require("./pagination"));

var SearchResults =
/** @class */
function () {
  function SearchResults(data) {
    this.data = data;
    this.render(0);
    SearchResults.Instance = this;
  }

  SearchResults.prototype.clear = function () {
    utils_1.qs('#searchResults').innerHTML = '';
  };

  SearchResults.prototype.render = function (page) {
    var searchResults = utils_1.qs('#searchResults');

    if (!this.data || this.data.length === 0) {
      searchResults.innerHTML = '<h4>No result</h4>';
      return;
    }

    var title = document.createElement('h4');
    var count = document.createTextNode(this.data.length + (this.data.length === 1 ? ' Result' : ' Results'));
    title.appendChild(count);
    searchResults.appendChild(title);
    var pageData = this.data.slice(page * constants_1.default.PAGE_COUNT, (page + 1) * constants_1.default.PAGE_COUNT);
    pageData.forEach(function (d) {
      var html = utils_1.renderTemplate(d, SearchResults.Template);
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

    if (this.data.length > constants_1.default.PAGE_COUNT) {
      pagination_1.default(this.data.length, page);
    }
  };

  SearchResults.Template = utils_1.qs('#searchResults').childNodes[1].textContent;
  return SearchResults;
}();

exports.default = SearchResults;
},{"../utils/utils":"8wWJ","../static/constants":"NOJ5","./pagination":"3SV9"}],"tjhc":[function(require,module,exports) {
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

var utils_1 = require("../utils/utils");

var abis_1 = __importDefault(require("../static/abis"));

var constants_1 = __importDefault(require("../static/constants"));

var es_1 = __importDefault(require("../utils/es"));

var searchResults_1 = __importDefault(require("./searchResults"));

var Tag =
/** @class */
function () {
  function Tag(name, abi) {
    var _this = this;

    this.name = name;
    this.abi = abi;
    var tags = utils_1.qs('#tags');
    var html = utils_1.renderTemplate({
      name: this.name
    }, Tag.Template);
    var div = document.createElement('div');
    div.innerHTML = html;
    this.dom = div.children[0];
    tags.appendChild(this.dom);
    this.dom.querySelector('button').addEventListener('click', function () {
      if (_this.dom.querySelector('button').classList.contains('active')) {
        return;
      }

      Tag.ActiveTag && Tag.ActiveTag.deactivate();

      _this.activate();

      searchResults_1.default.Instance && searchResults_1.default.Instance.clear();
      es_1.default.searchAbi(_this.abi, function (d) {
        _this.count = d.length;
        new searchResults_1.default(d);
      });
    });
    this.dom.querySelector('.close-badge').addEventListener('click', function () {
      _this.removed = true;

      _this.dom.remove();
    });
  }

  Object.defineProperty(Tag.prototype, "count", {
    set: function set(c) {
      this.dom.querySelector('.count-badge').textContent = c.toString();
    },
    enumerable: true,
    configurable: true
  });

  Tag.prototype.preserve = function () {
    this.dom.classList.add('preserved');
  };

  Tag.prototype.activate = function () {
    this.dom.querySelector('button').classList.add('active');
    Tag.ActiveTag = this;
  };

  Tag.prototype.deactivate = function () {
    this.dom.querySelector('button').classList.remove('active');
    Tag.ActiveTag = null;
  };

  Tag.prototype.disable = function () {
    this.dom.querySelector('button').setAttribute('disabled', 'disabled');
  };

  Tag.prototype.enable = function () {
    this.dom.querySelector('button').removeAttribute('disabled');
  };

  Tag.prototype.toJSON = function () {
    return {
      name: this.name,
      abi: this.abi
    };
  };

  Tag.Template = utils_1.qs('#tags').childNodes[1].textContent;
  return Tag;
}();

exports.Tag = Tag;

function default_1() {
  abis_1.default.forEach(function (t, i) {
    var tag = new Tag(t.name, t.abi);
    tag.preserve();

    if (i === 0) {
      tag.activate();
      es_1.default.searchAbi(t.abi, function (d) {
        tag.count = d.length;
        new searchResults_1.default(d);
      });
    } else {
      es_1.default.searchAbi(t.abi, function (d) {
        tag.count = d.length;
      });
    }
  });
  var lsTags = new Array();
  var ls = window.localStorage.getItem(constants_1.default.LS_NAME);

  if (ls !== null) {
    var lt = JSON.parse(ls);

    if (lt.length > 0) {
      utils_1.qs('#editTags').style.display = 'inline';
    }

    lt.forEach(function (t) {
      var tag = new Tag(t.name, t.abi);
      lsTags.push(tag);
      es_1.default.searchAbi(t.abi, function (d) {
        tag.count = d.length;
      });
    });
  }

  var editing = false;
  utils_1.qs('#editTags').addEventListener('click', function () {
    if (!editing) {
      this.textContent = 'Done';
      utils_1.qs('#tags').classList.add('editing');
      utils_1.qs('#addTag').setAttribute('disabled', 'disabled');
      lsTags.forEach(function (t) {
        t.disable();
      });
      editing = true;
    } else {
      this.textContent = 'Edit Tags';
      utils_1.qs('#tags').classList.remove('editing');
      utils_1.qs('#addTag').removeAttribute('disabled');

      for (var i = lsTags.length - 1; i >= 0; i--) {
        var t = lsTags[i];

        if (t.removed) {
          lsTags.splice(i, 1);
        } else {
          t.enable();
        }
      }

      if (lsTags.length === 0) {
        utils_1.qs('#editTags').style.display = 'none';
      }

      window.localStorage.setItem(constants_1.default.LS_NAME, JSON.stringify(lsTags));
      editing = false;
    }
  });
  utils_1.qs('#submitTag').addEventListener('click', function () {
    var tagName = utils_1.qs('#tagName').value.trim();
    var abiStr = utils_1.qs('#tagAbi').value.trim();
    var txHash = utils_1.qs('#tagTxHash').value.trim();

    if (!/^[\w\s]+$/g.test(tagName)) {
      alert('Invlid tag name.');
      return;
    }

    var abi;

    try {
      abi = JSON.parse(abiStr);

      if (_typeof(abi) !== 'object') {
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

    for (var i = 0; i < abis_1.default.length; i++) {
      if (abis_1.default[i].name === tagName) {
        alert('Duplicated tag name.');
        return;
      }
    }

    for (var i = 0; i < lsTags.length; i++) {
      if (lsTags[i].name === tagName) {
        alert('Duplicated tag name.');
        return;
      }
    }

    es_1.default.submitAbi(abi, txHash, function (d) {
      var tag = {
        name: tagName,
        abi: abi,
        txHash: txHash
      };
      lsTags.push(new Tag(tagName, abi));
      window.localStorage.setItem(constants_1.default.LS_NAME, JSON.stringify(lsTags));
      utils_1.qs('#editTags').style.display = 'inline';
      utils_1.qs('#newTagModal form').reset();
      window.jQuery('#newTagModal').modal('hide');
    });
  });
}

exports.default = default_1;
},{"../utils/utils":"8wWJ","../static/abis":"gqc0","../static/constants":"NOJ5","../utils/es":"xmoD","./searchResults":"7co4"}],"SrDI":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var es_1 = __importDefault(require("../utils/es"));

function renderSummary(ready) {
  var summary = utils_1.qs('#seSummary');
  var sumTemplate = summary.childNodes[1].textContent;
  var html = utils_1.renderTemplate(ready, sumTemplate);
  summary.innerHTML = html;
}

function default_1() {
  var ready = {
    abiUploaded: 0,
    contractCount: 0,
    contractAdhered: 0,
    count: 0
  };
  es_1.default.getAbiCount(function (d) {
    ready.abiUploaded = d;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es_1.default.getAllCount(function (d) {
    ready.contractCount = d;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
  es_1.default.getContractCount(function (d) {
    ready.contractAdhered = d;

    if (++ready.count === 3) {
      renderSummary(ready);
    }
  });
}

exports.default = default_1;
},{"../utils/utils":"8wWJ","../utils/es":"xmoD"}],"rZ55":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var es_1 = __importDefault(require("../utils/es"));

var tag_1 = require("./tag");

var searchResults_1 = __importDefault(require("./searchResults"));

function searchUsingKeywords() {
  tag_1.Tag.ActiveTag && tag_1.Tag.ActiveTag.deactivate();
  var q = utils_1.qs('#searchInput').value;

  if (!q || /^\s*$/g.test(q)) {
    return;
  }

  searchResults_1.default.Instance && searchResults_1.default.Instance.clear();
  es_1.default.searchKeywords(q, function (d) {
    new searchResults_1.default(d);
  });
}

function default_1() {
  utils_1.qs('#searchButton').addEventListener('click', function () {
    searchUsingKeywords();
  });
  utils_1.qs('#searchInput').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      searchUsingKeywords();
    }
  });
}

exports.default = default_1;
},{"../utils/utils":"8wWJ","../utils/es":"xmoD","./tag":"tjhc","./searchResults":"7co4"}],"ZCfc":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tag_1 = __importDefault(require("./components/tag"));

var summary_1 = __importDefault(require("./components/summary"));

var search_1 = __importDefault(require("./components/search"));

summary_1.default();
tag_1.default();
search_1.default();
},{"./components/tag":"tjhc","./components/summary":"SrDI","./components/search":"rZ55"}]},{},["ZCfc"], null)
//# sourceMappingURL=/main.60cb5726.js.map