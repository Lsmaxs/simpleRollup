(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/objectSpread')) :
    typeof define === 'function' && define.amd ? define(['@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/objectSpread'], factory) :
    (global = global || self, factory(global._regeneratorRuntime, global._asyncToGenerator, global._toConsumableArray, global._objectSpread));
}(this, function (_regeneratorRuntime, _asyncToGenerator, _toConsumableArray, _objectSpread) { 'use strict';

    _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
    _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
    _toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
    _objectSpread = _objectSpread && _objectSpread.hasOwnProperty('default') ? _objectSpread['default'] : _objectSpread;

    function dome() {
      return new Promose(function (res, rej) {
        try {
          setTimeout(function () {
            var objA = {
              'vv': 1
            };
            var objB = {
              'bb': 2
            };

            var mergeObj = _objectSpread({}, objA, objB);

            res(mergeObj);
          }, 3000);
        } catch (err) {
          rej(err);
        }
      });
    }

    var Array1 = Array(10).fill(6);
    var Array2 = ['a', 'b', 'v', 'd'];
    var newArray = [].concat(_toConsumableArray(Array1), Array2);
    var ArrayFlat = newArray.flat();

    function initDemo() {
      return _initDemo.apply(this, arguments);
    }

    function _initDemo() {
      _initDemo = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var data;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dome();

              case 2:
                data = _context.sent;
                console.log(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _initDemo.apply(this, arguments);
    }

    initDemo();

}));
