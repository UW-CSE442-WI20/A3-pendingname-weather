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
})({"index2.js":[function(require,module,exports) {
var COLORS = ['#EC6E85', '#56A0E5', '#6DBEBF', '#F7CE6B', '#bff77c', '#f798b5', '#9e99f7', '#89def7', '#7ef78b', '#f7ae46', '#95b5fe', '#4dbc42', '#bc404a'];
var YEARS = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
var config = {
  type: 'line',
  data: {
    labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [{
      label: 'Protection',
      borderColor: window.chartColors.grey,
      backgroundColor: window.chartColors.grey,
      data: [15.83, 16.75, 20.15, 20.33, 23.88, 24.76, 25.09, 25.91, 31.23, 34.59, 35.04, 36.35, 35.73, 34.06, 32.86, 33.99, 35.84, 36.8, 38.15, 38.25, 43.57, 47.83, 50.16, 52.14, 53.6]
    }, {
      label: 'General Government',
      borderColor: COLORS[7],
      backgroundColor: COLORS[7],
      data: [28.07, 29.57, 32.67, 39.92, 45.1, 35.1, 35.46, 36.23, 37.65, 41.02, 44.08, 48.66, 50.59, 48.97, 44.39, 43.66, 47.12, 48.51, 47.99, 48.28, 58.68, 56.32, 55.86, 55.55, 55.64]
    }, {
      label: 'Transportation',
      borderColor: COLORS[4],
      backgroundColor: COLORS[4],
      data: [46.85, 54.45, 61.83, 67.07, 64.63, 67.89, 70.24, 72.91, 77.62, 84.29, 91.97, 92.97, 93.02, 91.67, 91.92, 89.53, 92.57, 93.55, 92.79, 96.22, 100.89, 100.22, 87.38, 83.44, 82.82]
    }, {
      label: 'Other Spending',
      borderColor: COLORS[11],
      backgroundColor: COLORS[11],
      data: [79.84, 72.56, 72.08, 77.12, 75.53, 94.45, 126.17, 71.03, 99.33, 377.18, 29.79, 96.39, 135.05, 30.28, 0.37, 22.36, 50.17, 68.52, 102.56, 96, 108.66, 68.35, 66, 53.65, 28.69]
    }, {
      label: 'Education',
      borderColor: window.chartColors.purple,
      backgroundColor: window.chartColors.purple,
      data: [59.93, 63.61, 77.83, 90.54, 96.37, 106.37, 127.58, 100.81, 100.86, 89.77, 140.33, 113.67, 103.28, 85.29, 102.63, 133.78, 121.69, 156.3, 107.94, 147.98, 125.78, 115.6, 113.55, 109.06, 106.5]
    }, {
      label: 'Interest',
      borderColor: window.chartColors.blue,
      backgroundColor: window.chartColors.blue,
      data: [222.95, 206.17, 170.95, 153.07, 160.25, 183.99, 226.6, 237.11, 252.76, 186.9, 196.19, 229.96, 220.41, 220.89, 228.96, 223.18, 240.03, 262.55, 324.98, 375.61, 478.81, 547.5, 609.88, 663.69, 701.69]
    }, {
      label: 'Welfare',
      borderColor: window.chartColors.green,
      backgroundColor: window.chartColors.green,
      data: [171.38, 183.04, 223.62, 242.43, 237.76, 245.52, 249.59, 254.23, 313.42, 406.89, 495.78, 466.21, 411.2, 397.8, 370.26, 361.87, 365.61, 356.75, 348.31, 365.95, 355.89, 355.27, 365.42, 368.16, 368.51]
    }, {
      label: 'Health Care',
      borderColor: window.chartColors.yellow,
      backgroundColor: window.chartColors.yellow,
      data: [351.62, 389.62, 427.35, 468.97, 509.48, 549.19, 582.61, 641.79, 671.36, 764.43, 820.7, 858.16, 818.54, 856.14, 921.14, 1028.43, 1105.83, 1130.44, 1139.92, 1235.96, 1301.18, 1371.39, 1442.7, 1481.57, 1512.76]
    }, {
      label: 'Pensions',
      borderColor: window.chartColors.orange,
      backgroundColor: window.chartColors.orange,
      data: [453.91, 480.9, 502.72, 517.53, 537.42, 564.71, 590.58, 636.12, 668.75, 738.64, 756.13, 782.28, 819.5, 870.94, 914.57, 953.6, 980.57, 1006.64, 1047.42, 1107.71, 1163.58, 1236.24, 1313.95, 1386.79, 1462.97]
    }, {
      label: 'Defense',
      borderColor: window.chartColors.red,
      backgroundColor: window.chartColors.red,
      data: [358.57, 366.19, 421.7, 482.92, 542.43, 599.98, 621.13, 652.56, 729.58, 793.97, 847.06, 878.43, 839.25, 818.85, 799.95, 801.44, 813.19, 821.57, 858.99, 890.08, 1008.53, 1046.48, 1072.56, 1076.04, 1079.8]
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      fontSize: 20,
      text: 'U.S. Federal Government Spending Visualization'
    },
    tooltips: {
      mode: 'index'
    },
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }],
      yAxes: [{
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: 'USD (Billions)'
        }
      }]
    },
    elements: {
      line: {
        tension: 0
      }
    }
  }
};
var currentYear = 2020;

window.onload = function () {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function () {
  config.data.datasets.forEach(function (dataset) {
    dataset.data = dataset.data.map(function () {
      return randomScalingFactor();
    });
  });
  window.myLine.update();
});
var colorNames = Object.keys(window.chartColors); // let addDataClickCount = 0;
// document.getElementById('addData').addEventListener('click', function() {
// if (config.data.datasets.length > 0 && addDataClickCount < 18) {
// addDataClickCount++;
// var year = YEARS[config.data.labels.length % YEARS.length];
// config.data.labels.push(year);
// window.myLine.update();
// }
// });
// document.getElementById('removeData').addEventListener('click', function() {
// addDataClickCount--;
// config.data.labels.splice(-1, 1);
// window.myLine.update();
// });

document.getElementById('reset').addEventListener('click', function () {
  location.reload(true);
});
document.getElementById('yearSlider').addEventListener("change", function () {
  var textDisplay = document.getElementById('value');
  var slider = document.getElementById('yearSlider');
  textDisplay.innerHTML = slider.value;

  if (slider.value > currentYear) {
    for (var i = currentYear; i < slider.value; i++) {
      var year = YEARS[config.data.labels.length % YEARS.length];
      config.data.labels.push(year);
    }
  } else if (slider.value < currentYear) {
    for (var i = currentYear; i > slider.value; i--) {
      config.data.labels.splice(-1, 1);
    }
  }

  currentYear = slider.value;
  window.myLine.update();
}, false);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55579" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index2.js"], null)
//# sourceMappingURL=/index2.d4334c5b.js.map