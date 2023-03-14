(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('a18n'), require('react'), require('trtc-js-sdk'), require('rtc-detect')) :
  typeof define === 'function' && define.amd ? define(['a18n', 'react', 'trtc-js-sdk', 'rtc-detect'], factory) :
  (global = global || self, global['rtc-device-detector'] = factory(global.a18n, global.React, global.TRTC, global.RTCDetect));
}(this, (function (a18n, React, TRTC, RTCDetect) { 'use strict';

  a18n = a18n && Object.prototype.hasOwnProperty.call(a18n, 'default') ? a18n['default'] : a18n;
  var React__default = 'default' in React ? React['default'] : React;
  TRTC = TRTC && Object.prototype.hasOwnProperty.call(TRTC, 'default') ? TRTC['default'] : TRTC;
  RTCDetect = RTCDetect && Object.prototype.hasOwnProperty.call(RTCDetect, 'default') ? RTCDetect['default'] : RTCDetect;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function Button(_ref) {
    var type = _ref.type,
        onClick = _ref.onClick,
        className = _ref.className,
        children = _ref.children;
    React.useEffect(function () {}, []);
    return /*#__PURE__*/React__default.createElement("button", {
      type: "button",
      onClick: onClick,
      className: "button ".concat(type, " ").concat(className)
    }, children);
  }

  /**
   * 判断设备是否连接网络
   */

  function isOnline() {
    var url = 'https://web.sdk.qcloud.com/trtc/webrtc/assets/trtc-logo.png';
    return new Promise(function (resolve) {
      try {
        var xhr = new XMLHttpRequest();
        var timeout = setTimeout(function () {
          xhr.abort();
          resolve(false);
        }, 2000);

        xhr.onload = function () {
          clearTimeout(timeout);
          resolve(true);
        };

        xhr.onerror = function () {
          resolve(false);
        };

        xhr.open('GET', url, true);
        xhr.send();
      } catch (err) {// console.log(err);
      }
    });
  }
  var NETWORK_QUALITY = {
    0: '未知',
    1: '极佳',
    2: '较好',
    3: '一般',
    4: '差',
    5: '极差',
    6: '断开'
  };
  var handleGetUserMediaError = function handleGetUserMediaError(error) {
    console.error('getUserMedia error', error);

    switch (error.name) {
      case 'NotReadableError':
        // 当系统或浏览器异常的时候，可能会出现此错误，您可能需要引导用户重启电脑/浏览器来尝试恢复。
        console.error(a18n('暂时无法访问摄像头/麦克风，请确保系统授予当前浏览器摄像头/麦克风权限，并且没有其他应用占用摄像头/麦克风'));
        return;

      case 'NotAllowedError':
        console.error(a18n('用户/系统已拒绝授权访问摄像头或麦克风'));
        return;

      case 'NotFoundError':
        // 找不到摄像头或麦克风设备
        console.error(a18n('找不到摄像头或麦克风设备'));
        return;

      case 'OverConstrainedError':
        console.error(a18n('采集属性设置错误，如果您指定了 cameraId/microphoneId，请确保它们是一个有效的非空字符串'));
        return;

      default:
        console.error(a18n('初始化本地流时遇到未知错误, 请重试'));
        return;
    }
  }; // 图标

  var CameraIcon = /*#__PURE__*/React__default.createElement("svg", {
    t: "1626142712993",
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3296",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M520.896 815.296c197.952 0 358.976-166.08 358.976-370.112s-161.088-370.112-358.976-370.112-358.848 166.016-358.848 370.112 160.96 370.112 358.848 370.112z m0-676.224c162.688 0 294.976 137.344 294.976 306.112 0 168.832-132.288 306.112-294.976 306.112-162.624 0-294.848-137.344-294.848-306.112-0.064-168.768 132.224-306.112 294.848-306.112z",
    "p-id": "3297"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M824.256 746.112a32.128 32.128 0 0 0-29.888 56.64c21.888 11.584 27.264 20.736 27.52 22.528-1.92 20.864-106.688 69.824-300.992 69.824-191.488 0-299.072-49.536-300.864-69.824 0.128-1.664 5.056-10.432 26.176-21.888a32 32 0 0 0-30.464-56.256c-49.344 26.688-59.712 57.216-59.712 78.144 0 91.968 189.12 133.824 364.864 133.824 175.808 0 364.992-41.856 364.992-133.824 0-21.248-10.688-52.224-61.632-79.168zM520.96 618.816a173.632 173.632 0 1 0 0.128-347.264 173.632 173.632 0 0 0-0.128 347.264z m-59.968-315.648a70.976 70.976 0 1 1 0 141.952 70.976 70.976 0 0 1 0-141.952z",
    "p-id": "3298"
  }));
  var MicIcon = /*#__PURE__*/React__default.createElement("svg", {
    t: "1626144633308",
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3443",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M801.728 364.8a32 32 0 0 0-32 32v91.392c0 129.28-115.648 234.432-257.728 234.432S254.272 617.408 254.272 488.192V393.216a32 32 0 0 0-64 0v94.976c0 157.888 133.248 286.208 300.672 296.448v99.392H357.632c-16.128 0-29.184 14.336-29.184 32.064 0 17.664 13.056 31.936 29.184 31.936h319.04c16.064 0 29.184-14.272 29.184-31.936 0-17.728-13.12-32.064-29.184-32.064H554.944v-101.376c156.992-19.776 278.784-143.488 278.784-294.464V396.8c0-17.728-14.272-32-32-32z",
    "p-id": "3444"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M517.12 678.656a199.104 199.104 0 0 0 198.912-198.848V268.736A199.168 199.168 0 0 0 517.12 69.888a199.04 199.04 0 0 0-198.784 198.848v211.072a199.04 199.04 0 0 0 198.784 198.848z m85.056-126.784a49.856 49.856 0 1 1 0-99.648 49.856 49.856 0 0 1 0 99.648zM382.336 268.736c0-74.368 60.48-134.848 134.784-134.848a135.04 135.04 0 0 1 134.912 134.848v28.48H382.336v-28.48z",
    "p-id": "3445"
  }));
  var SpeakerIcon = /*#__PURE__*/React__default.createElement("svg", {
    t: "1626144666665",
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3590",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M784 371.2c-16-25.6-35.2-44.8-44.8-54.4-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4 3.2 3.2 6.4 6.4 9.6 9.6 9.6 9.6 19.2 22.4 25.6 35.2 57.6 86.4 57.6 179.2-38.4 278.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0C851.2 598.4 851.2 476.8 784 371.2z",
    "p-id": "3591"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M896 246.4c-16-25.6-35.2-48-54.4-70.4-9.6-12.8-19.2-19.2-25.6-25.6-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4 3.2 3.2 12.8 9.6 22.4 22.4 16 19.2 32 38.4 48 64 105.6 160 105.6 336-70.4 518.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0C1014.4 630.4 1014.4 425.6 896 246.4z",
    "p-id": "3592"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M483.2 86.4l-217.6 185.6-108.8 0c-57.6 0-108.8 48-108.8 108.8l0 272c0 60.8 48 108.8 108.8 108.8l96 0 230.4 182.4c54.4 41.6 105.6 16 105.6-51.2l0-755.2C588.8 67.2 534.4 41.6 483.2 86.4zM534.4 889.6c0 22.4-3.2 22.4-19.2 9.6l-236.8-185.6c-3.2-3.2-9.6-6.4-16-6.4l-105.6 0c-28.8 0-54.4-25.6-54.4-54.4l0-272c0-28.8 25.6-54.4 54.4-54.4l118.4 0c6.4 0 12.8-3.2 16-6.4l224-192c16-12.8 16-12.8 16 6.4L531.2 889.6z",
    "p-id": "3593"
  }));
  var NetworkIcon = /*#__PURE__*/React__default.createElement("svg", {
    t: "1626144678606",
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3738",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M955.392 514.56c0-242.688-196.608-439.296-439.296-439.296C273.408 75.264 76.8 271.872 76.8 514.56c0 242.688 196.608 439.296 439.296 439.296 116.224 0 221.696-45.056 300.032-118.784 5.12-1.536 9.728-4.096 13.312-8.704 3.072-3.072 5.12-6.656 6.656-10.752C909.824 736.768 955.392 631.296 955.392 514.56zM481.792 893.952c-0.512-1.024-1.536-1.536-2.56-2.56-47.104-40.96-85.504-89.6-114.176-143.36 38.4-15.872 79.36-25.6 121.856-28.672l0 174.592C485.376 893.952 483.328 893.952 481.792 893.952zM136.192 542.72l113.152 0c3.072 61.44 16.384 121.344 38.912 177.664-21.504 12.288-41.472 26.112-60.928 41.984C175.616 702.464 142.336 626.176 136.192 542.72zM230.4 262.656c18.944 15.36 38.912 28.672 59.392 40.96-23.552 56.832-37.376 118.272-40.448 180.736L136.704 484.352C143.36 399.872 177.664 323.072 230.4 262.656zM549.376 135.168c1.024 1.024 1.536 2.048 3.072 3.072 45.568 39.424 83.456 86.528 111.616 138.24-37.888 15.36-77.824 24.576-118.784 27.648l0-168.96C546.816 135.168 548.352 135.168 549.376 135.168zM895.488 484.352l-113.152 0c-3.584-62.464-17.408-123.392-40.96-180.736 20.992-11.776 40.96-25.6 59.904-40.96C854.528 323.072 888.832 399.872 895.488 484.352zM486.912 484.352 308.224 484.352c3.072-53.76 15.36-105.984 34.816-155.136 45.568 18.944 94.208 30.208 143.872 33.28L486.912 484.352zM486.912 542.72l0 117.76c-50.688 3.072-99.84 14.848-145.92 33.792-18.432-48.128-29.696-99.328-32.768-151.552L486.912 542.72zM545.28 542.72l178.176 0c-3.072 52.736-14.336 103.936-32.768 152.064-46.08-19.456-95.232-30.72-145.408-34.304L545.28 542.72zM545.28 484.352 545.28 362.496c49.664-3.072 98.304-14.336 143.36-32.768 19.456 49.152 31.232 101.376 34.816 154.624L545.28 484.352zM716.8 250.368c-17.408-31.744-37.376-61.952-60.928-90.112 37.888 14.848 72.704 35.84 103.424 61.44C745.472 232.448 731.136 242.176 716.8 250.368zM486.912 134.656l0 168.96c-40.96-3.072-81.408-12.288-118.784-27.648 28.16-51.712 65.536-98.304 111.104-137.728 1.024-1.024 2.56-2.56 3.584-3.584C483.84 135.168 485.376 135.168 486.912 134.656zM315.392 250.368c-14.848-8.704-28.672-18.432-42.496-28.672 30.72-25.6 65.536-46.08 102.912-60.928C352.768 188.416 332.288 218.624 315.392 250.368zM312.832 774.144c17.408 33.28 38.4 65.024 62.464 94.208-38.912-15.36-74.752-37.376-106.496-64C283.136 793.088 297.984 783.36 312.832 774.144zM545.28 894.464l0-174.592c41.984 3.072 82.944 12.8 121.344 28.672-28.672 53.76-67.072 102.4-114.176 143.36-1.024 1.024-1.536 1.536-2.56 2.56C548.352 893.952 546.816 893.952 545.28 894.464zM718.848 774.656c14.848 9.216 29.696 18.944 43.52 30.208-31.232 26.624-67.072 48.128-105.984 63.488C680.448 839.68 701.44 807.936 718.848 774.656zM743.936 720.896c22.528-56.32 35.84-116.736 38.912-178.176L896 542.72c-6.144 83.968-39.936 160.256-91.648 220.672C784.896 747.52 764.928 733.184 743.936 720.896z",
    "p-id": "3739"
  }));
  var ErrorIcon = /*#__PURE__*/React__default.createElement("svg", {
    t: "1626151898274",
    className: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "3223",
    width: "28",
    height: "28"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M1024 518.314667C1024 794.794667 794.737778 1024 505.685333 1024 229.205333 1024 0 794.737778 0 518.314667 0 229.262222 229.262222 0 505.685333 0 794.737778 0 1024 229.262222 1024 518.314667zM512 256a48.128 48.128 0 0 0-48.753778 51.370667L477.866667 614.4h68.266666l14.620445-307.029333A48.355556 48.355556 0 0 0 512 256z m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z",
    fill: "#FF0000",
    "p-id": "3224"
  }));

  var _templateObject, _templateObject2, _templateObject3, _templateObject4;
  function DeviceConnect(_ref) {
    var stepNameList = _ref.stepNameList,
        startDeviceDetect = _ref.startDeviceDetect;

    var _useState = React.useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        progress = _useState2[0],
        setProgress = _useState2[1];

    var _useState3 = React.useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        deviceState = _useState4[0],
        setDeviceState = _useState4[1];

    var _useState5 = React.useState({}),
        _useState6 = _slicedToArray(_useState5, 2),
        connectResult = _useState6[0],
        setConnectResult = _useState6[1];

    var _useState7 = React.useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        showConnectResult = _useState8[0],
        setShowConnectResult = _useState8[1];

    var _useState9 = React.useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        showRemind = _useState10[0],
        setShowRemind = _useState10[1];

    var hasCameraDetect = stepNameList.indexOf('camera') >= 0;
    var hasMicrophoneDetect = stepNameList.indexOf('microphone') >= 0;
    var hasSpeakerDetect = stepNameList.indexOf('speaker') >= 0;
    var hasNetworkDetect = stepNameList.indexOf('network') >= 0;
    var deviceFailAttention = a18n('1. 若浏览器弹出提示，请选择“允许”<br>') + a18n('2. 若杀毒软件弹出提示，请选择“允许”<br>') + a18n('3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>') + a18n('4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>') + a18n('5. 检查摄像头/麦克风是否正确连接并开启<br>') + a18n('6. 尝试重新连接摄像头/麦克风<br>') + a18n('7. 尝试重启设备后重新检测');
    var networkFailAttention = a18n('1. 请检查设备是否联网<br>') + a18n('2. 请刷新网页后再次检测<br>') + a18n('3. 请尝试更换网络后再次检测');
    React.useEffect(function () {
      getDeviceConnectResult();
      return function () {
        return handleReset();
      };
    }, []);
    React.useEffect(function () {
      var interval;

      if (showConnectResult === false) {
        interval = setInterval(function () {
          setProgress(function (oldProgress) {
            if (oldProgress === 100) {
              clearInterval(interval);
              setShowConnectResult(true);
              return 100;
            }

            return oldProgress + 10;
          });
        }, 200);
      }

      return function () {
        clearInterval(interval);
      };
    }, [showConnectResult]);

    var handleReset = function handleReset() {
      setProgress(0);
      setConnectResult({});
      setShowConnectResult(false);
      getDeviceConnectResult();
    };

    var getPrepareConnectInfo = function getPrepareConnectInfo() {
      var deviceDetectList = [];
      hasCameraDetect && deviceDetectList.push(a18n('摄像头'));
      hasMicrophoneDetect && deviceDetectList.push(a18n('麦克风'));
      hasSpeakerDetect && deviceDetectList.push(a18n('扬声器'));
      hasNetworkDetect && deviceDetectList.push(a18n('网络'));
      var deviceDetectInfo = '';

      if (deviceDetectList.length === 1) {
        deviceDetectInfo = deviceDetectList[0];
      }

      if (deviceDetectList.length === 2) {
        deviceDetectInfo = "".concat(deviceDetectList[0]).concat(a18n('和')).concat(deviceDetectList[1]);
      }

      if (deviceDetectList.length > 2) {
        var _deviceDetectList$spl = deviceDetectList.splice(deviceDetectList.length - 1, 1),
            _deviceDetectList$spl2 = _slicedToArray(_deviceDetectList$spl, 1),
            lastDetectInfo = _deviceDetectList$spl2[0];

        deviceDetectInfo = "".concat(deviceDetectList.join(a18n('分隔符'))).concat(a18n('和')).concat(lastDetectInfo);
      }

      return a18n(_templateObject || (_templateObject = _taggedTemplateLiteral(["\u8BBE\u5907\u68C0\u6D4B\u524D\u8BF7\u786E\u8BA4\u8BBE\u5907\u8FDE\u63A5\u4E86", ""])), deviceDetectInfo);
    };

    var getDeviceConnectResult = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var cameraList, micList, speakerList, hasCameraDevice, hasMicrophoneDevice, hasSpeakerDevice, hasNetworkConnect, deviceStateObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cameraList = [];
                micList = [];
                speakerList = [];
                _context.prev = 3;
                _context.next = 6;
                return TRTC.getCameras();

              case 6:
                cameraList = _context.sent;
                _context.next = 9;
                return TRTC.getMicrophones();

              case 9:
                micList = _context.sent;
                _context.next = 12;
                return TRTC.getSpeakers();

              case 12:
                speakerList = _context.sent;
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                console.log('rtc-device-detector getDeviceList error', _context.t0);

              case 18:
                hasCameraDevice = hasCameraDetect ? cameraList.length > 0 : true;
                hasMicrophoneDevice = hasMicrophoneDetect ? micList.length > 0 : true;
                hasSpeakerDevice = hasSpeakerDetect ? speakerList.length > 0 : true;

                if (!hasNetworkDetect) {
                  _context.next = 27;
                  break;
                }

                _context.next = 24;
                return isOnline();

              case 24:
                _context.t1 = _context.sent;
                _context.next = 28;
                break;

              case 27:
                _context.t1 = true;

              case 28:
                hasNetworkConnect = _context.t1;
                deviceStateObj = {
                  hasCameraDevice: hasCameraDevice,
                  hasMicrophoneDevice: hasMicrophoneDevice,
                  hasSpeakerDevice: hasSpeakerDevice,
                  hasNetworkConnect: hasNetworkConnect,
                  hasCameraConnect: !hasCameraDetect,
                  hasMicrophoneConnect: !hasMicrophoneDetect,
                  hasSpeakerConnect: hasSpeakerDevice
                };
                setDeviceState(deviceStateObj);
                setConnectResult(getDeviceConnectInfo(deviceStateObj));

                if (hasCameraDetect && hasCameraDevice) {
                  navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                  }).then(function (stream) {
                    deviceStateObj = _objectSpread2(_objectSpread2({}, deviceStateObj), {}, {
                      hasCameraConnect: true
                    });
                    setDeviceState(deviceStateObj); // 显示设备连接信息

                    setConnectResult(getDeviceConnectInfo(deviceStateObj)); // 释放摄像头设备

                    stream.getTracks()[0].stop();
                  })["catch"](function (error) {
                    handleGetUserMediaError(error);
                  });
                }

                if (hasMicrophoneDetect && hasMicrophoneDevice) {
                  navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: hasMicrophoneDevice
                  }).then(function (stream) {
                    deviceStateObj = _objectSpread2(_objectSpread2({}, deviceStateObj), {}, {
                      hasMicrophoneConnect: hasMicrophoneDevice
                    });
                    setDeviceState(deviceStateObj); // 显示设备连接信息

                    setConnectResult(getDeviceConnectInfo(deviceStateObj)); // 释放麦克风设备

                    stream.getTracks()[0].stop();
                  })["catch"](function (error) {
                    handleGetUserMediaError(error);
                  });
                }

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 15]]);
      }));

      return function getDeviceConnectResult() {
        return _ref2.apply(this, arguments);
      };
    }();

    var getDeviceConnectInfo = function getDeviceConnectInfo(deviceState) {
      var connectInfo = a18n('连接出错，请重试');

      if (deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect && deviceState.hasSpeakerConnect && deviceState.hasNetworkConnect) {
        if (hasNetworkDetect) {
          connectInfo = a18n('设备及网络连接成功，请开始设备检测');
        } else {
          connectInfo = a18n('设备连接成功，请开始设备检测');
        }

        return {
          info: connectInfo,
          success: true
        };
      } // 第一步：浏览器未检测到摄像头/麦克风/扬声器设备的提示


      if (!(deviceState.hasCameraDevice && deviceState.hasMicrophoneDevice && deviceState.hasSpeakerDevice)) {
        connectInfo = a18n(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\u672A\u68C0\u6D4B\u5230", "", "", "\u8BBE\u5907\uFF0C\u8BF7\u68C0\u67E5\u8BBE\u5907\u8FDE\u63A5"])), deviceState.hasCameraDevice ? '' : a18n('【摄像头】'), deviceState.hasMicrophoneDevice ? '' : a18n('【麦克风】'), deviceState.hasSpeakerDevice ? '' : a18n('【扬声器】'));
        return {
          info: connectInfo,
          success: false
        };
      } // 第二步：浏览器未拿到摄像头/麦克风权限的提示


      if (!(deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect)) {
        var deviceList = [];
        var deviceInfo = '';

        if (!deviceState.hasCameraConnect) {
          deviceList.push(a18n('摄像头'));
        }

        if (!deviceState.hasMicrophoneConnect) {
          deviceList.push(a18n('麦克风'));
        }

        if (deviceList.length === 1) {
          deviceInfo = deviceList[0];
        } else if (deviceList.length > 1) {
          deviceInfo = deviceList.join(a18n('和'));
        }

        connectInfo = deviceState.hasNetworkConnect ? a18n(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\u8BF7\u5141\u8BB8\u6D4F\u89C8\u5668\u53CA\u7F51\u9875\u8BBF\u95EE", "\u8BBE\u5907"])), deviceInfo) : a18n(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\u8BF7\u5141\u8BB8\u6D4F\u89C8\u5668\u53CA\u7F51\u9875\u8BBF\u95EE", "\u8BBE\u5907\uFF0C\u5E76\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5"])), deviceInfo);
        return {
          info: connectInfo,
          success: false,
          remind: deviceFailAttention
        };
      } // 第三步：浏览器检测未连接网络的提示


      if (!deviceState.hasNetworkConnect) {
        connectInfo = a18n('网络连接失败，请检查网络连接');
        return {
          info: connectInfo,
          success: false,
          remind: networkFailAttention
        };
      }

      return {
        info: connectInfo,
        success: false
      };
    };

    return /*#__PURE__*/React__default.createElement("div", {
      className: "device-connect"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-title"
    }, a18n('设备连接')), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-prepare-info"
    }, getPrepareConnectInfo()), /*#__PURE__*/React__default.createElement("div", {
      className: "device-display"
    }, stepNameList.map(function (stepName, index) {
      if (stepName === 'camera') {
        return /*#__PURE__*/React__default.createElement("div", {
          key: index,
          className: "".concat(showConnectResult && (deviceState.hasCameraConnect ? 'connect-success' : 'connect-fail'))
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "device"
        }, CameraIcon));
      }

      if (stepName === 'microphone') {
        return /*#__PURE__*/React__default.createElement("div", {
          key: index,
          className: "".concat(showConnectResult && (deviceState.hasMicrophoneConnect ? 'connect-success' : 'connect-fail'))
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "device"
        }, MicIcon));
      }

      if (stepName === 'speaker') {
        return /*#__PURE__*/React__default.createElement("div", {
          key: index,
          className: "".concat(showConnectResult && (deviceState.hasSpeakerConnect ? 'connect-success' : 'connect-fail'))
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "device"
        }, SpeakerIcon));
      }

      if (stepName === 'network') {
        return /*#__PURE__*/React__default.createElement("div", {
          key: index,
          className: "".concat(showConnectResult && (deviceState.hasNetworkConnect ? 'connect-success' : 'connect-fail'))
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "device"
        }, NetworkIcon));
      }

      return null;
    }), !showConnectResult && /*#__PURE__*/React__default.createElement("div", {
      className: "outer-progress"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "inner-progress",
      style: {
        transform: "translateX(".concat(progress - 100, "%)")
      }
    }))), !showConnectResult && /*#__PURE__*/React__default.createElement("div", {
      className: "text gray-text"
    }, a18n('设备正在连接中，请稍后')), showConnectResult && /*#__PURE__*/React__default.createElement("div", {
      className: "text ".concat(connectResult.success ? 'green-text' : 'red-text')
    }, /*#__PURE__*/React__default.createElement("span", null, connectResult.info), connectResult.remind && /*#__PURE__*/React__default.createElement("div", {
      className: "error-connect",
      onTouchStart: function onTouchStart() {
        return setShowRemind(true);
      },
      onMouseEnter: function onMouseEnter() {
        return setShowRemind(true);
      },
      onTouchEnd: function onTouchEnd() {
        return setShowRemind(false);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowRemind(false);
      }
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "error-icon"
    }, ErrorIcon), showRemind && /*#__PURE__*/React__default.createElement("div", {
      className: "connect-attention-info",
      dangerouslySetInnerHTML: {
        __html: connectResult.remind
      }
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "button-container"
    }, !showConnectResult && /*#__PURE__*/React__default.createElement(Button, {
      type: "disabled"
    }, a18n('开始检测')), showConnectResult && !(deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect && deviceState.hasSpeakerConnect && deviceState.hasNetworkConnect) && /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: handleReset
    }, a18n('重新连接')), showConnectResult && deviceState.hasCameraConnect && deviceState.hasMicrophoneConnect && deviceState.hasSpeakerConnect && deviceState.hasNetworkConnect && /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: startDeviceDetect
    }, a18n('开始检测'))));
  }

  var getDeviceList = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(deviceType) {
      var deviceList;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              deviceList = [];
              _context.t0 = deviceType;
              _context.next = _context.t0 === 'camera' ? 4 : _context.t0 === 'microphone' ? 8 : _context.t0 === 'speaker' ? 12 : 16;
              break;

            case 4:
              _context.next = 6;
              return TRTC.getCameras();

            case 6:
              deviceList = _context.sent;
              return _context.abrupt("break", 17);

            case 8:
              _context.next = 10;
              return TRTC.getMicrophones();

            case 10:
              deviceList = _context.sent;
              return _context.abrupt("break", 17);

            case 12:
              _context.next = 14;
              return TRTC.getSpeakers();

            case 14:
              deviceList = _context.sent;
              return _context.abrupt("break", 17);

            case 16:
              return _context.abrupt("break", 17);

            case 17:
              return _context.abrupt("return", deviceList);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getDeviceList(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  function DeviceSelect(_ref2) {
    var deviceType = _ref2.deviceType,
        onChange = _ref2.onChange,
        choseDevice = _ref2.choseDevice;

    var _useState = React.useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        deviceList = _useState2[0],
        setDeviceList = _useState2[1];

    var _useState3 = React.useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        activeDevice = _useState4[0],
        setActiveDevice = _useState4[1];

    var _useState5 = React.useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        activeDeviceId = _useState6[0],
        setActiveDeviceId = _useState6[1];

    React.useEffect(function () {
      function getDeviceListData() {
        return _getDeviceListData.apply(this, arguments);
      }

      function _getDeviceListData() {
        _getDeviceListData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var list, deviceIdList;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return getDeviceList(deviceType);

                case 2:
                  list = _context2.sent;
                  deviceIdList = list.map(function (item) {
                    return item.deviceId;
                  });
                  setDeviceList(list);

                  if (choseDevice && deviceIdList.indexOf(choseDevice.deviceId) >= 0) {
                    setActiveDevice(list.filter(function (item) {
                      return item.deviceId === choseDevice.deviceId;
                    })[0]);
                    setActiveDeviceId(choseDevice.deviceId);
                  } else {
                    setActiveDevice(list[0]);
                    setActiveDeviceId(list[0].deviceId);
                  }

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return _getDeviceListData.apply(this, arguments);
      }

      getDeviceListData();
    }, []);
    React.useEffect(function () {
      if (activeDevice && JSON.stringify(activeDevice) !== '{}') {
        onChange && onChange(activeDevice);
      }
    }, [activeDevice]);
    navigator.mediaDevices.addEventListener('devicechange', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var newList;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getDeviceList(deviceType);

            case 2:
              newList = _context3.sent;
              setDeviceList(newList);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    var handleChange = function handleChange(event) {
      var deviceID = event.target.value;
      var activeDevice = deviceList.find(function (item) {
        return item.deviceId === deviceID;
      });
      setActiveDevice(activeDevice);
      setActiveDeviceId(deviceID);
    };

    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("select", {
      className: "device-select",
      value: activeDeviceId,
      onChange: handleChange
    }, deviceList.map(function (item, index) {
      return /*#__PURE__*/React__default.createElement("option", {
        value: item.deviceId,
        key: index
      }, item.label);
    })));
  }

  var localStream = null;
  var currentDetector = 'camera';
  function cameraDetector(_ref) {
    var activeDetector = _ref.activeDetector,
        handleCompleted = _ref.handleCompleted;

    var _useState = React.useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        cameraLabel = _useState2[0],
        setCameraLabel = _useState2[1];

    var _useState3 = React.useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        cameraID = _useState4[0],
        setCameraID = _useState4[1];

    var _useState5 = React.useState(null),
        _useState6 = _slicedToArray(_useState5, 2),
        choseDevice = _useState6[0],
        setChoseDevice = _useState6[1];

    var initStream = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cameraID) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                localStream = TRTC.createStream({
                  video: true,
                  audio: false,
                  cameraId: cameraID
                });
                _context.next = 3;
                return localStream.initialize();

              case 3:
                localStream.play('camera-video');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function initStream(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    React.useEffect(function () {
      if (activeDetector === currentDetector && !localStream && cameraID) {
        initStream(cameraID);
      }

      return function () {
        if (activeDetector === currentDetector) {
          localStream && localStream.close();
          localStream = null;
        }
      };
    }, [activeDetector]);

    var handleCameraChange = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cameraDevice) {
        var deviceId, label;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setChoseDevice(cameraDevice);
                deviceId = cameraDevice.deviceId, label = cameraDevice.label;

                if (localStream) {
                  localStream.switchDevice('video', deviceId);
                } else {
                  initStream(deviceId);
                }

                setCameraID(deviceId);
                setCameraLabel(label);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function handleCameraChange(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    var handleError = function handleError() {
      handleCompleted('error', cameraLabel);
    };

    var handleSuccess = function handleSuccess() {
      handleCompleted('success', cameraLabel);
    };

    return activeDetector === currentDetector && /*#__PURE__*/React__default.createElement("div", {
      className: "testing-body"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-list"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "device-list-title"
    }, a18n('摄像头选择')), /*#__PURE__*/React__default.createElement(DeviceSelect, {
      deviceType: "camera",
      choseDevice: choseDevice,
      onChange: handleCameraChange
    })), /*#__PURE__*/React__default.createElement("div", {
      id: "camera-video",
      className: "camera-video"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info"
    }, a18n('是否可以清楚的看到自己？')), /*#__PURE__*/React__default.createElement("div", {
      className: "button-list"
    }, /*#__PURE__*/React__default.createElement(Button, {
      type: "outlined",
      onClick: handleError
    }, a18n('看不到')), /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: handleSuccess
    }, a18n('看的到')))));
  }

  var localStream$1 = null;
  var currentDetector$1 = 'microphone';
  var timer = null;
  function MicrophoneDetector(_ref) {
    var activeDetector = _ref.activeDetector,
        handleCompleted = _ref.handleCompleted;

    var _useState = React.useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        microphoneID = _useState2[0],
        setMicrophoneID = _useState2[1];

    var _useState3 = React.useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        microphoneLabel = _useState4[0],
        setMicrophoneLabel = _useState4[1];

    var _useState5 = React.useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        volumeNum = _useState6[0],
        setVolumeNum = _useState6[1];

    var _useState7 = React.useState(null),
        _useState8 = _slicedToArray(_useState7, 2),
        choseDevice = _useState8[0],
        setChoseDevice = _useState8[1];

    var initStream = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(microphoneID) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('microphoneID', microphoneID);
                localStream$1 = TRTC.createStream({
                  video: false,
                  audio: true,
                  microphoneId: microphoneID
                });
                _context.next = 4;
                return localStream$1.initialize();

              case 4:
                localStream$1.play('audio-container');
                timer = setInterval(function () {
                  var volume = localStream$1.getAudioLevel();
                  setVolumeNum(Math.ceil(28 * volume));
                }, 100);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function initStream(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    React.useEffect(function () {
      if (activeDetector === currentDetector$1 && !localStream$1 && microphoneID) {
        initStream(microphoneID);
      }

      return function () {
        if (activeDetector === currentDetector$1) {
          localStream$1 && localStream$1.close();
          localStream$1 = null;
          clearInterval(timer);
          setVolumeNum(0);
        }
      };
    }, [activeDetector]);

    var handleMicrophoneChange = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(microphoneDevice) {
        var deviceId, label;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setChoseDevice(microphoneDevice);
                deviceId = microphoneDevice.deviceId, label = microphoneDevice.label;

                if (localStream$1) {
                  localStream$1.switchDevice('audio', deviceId);
                } else {
                  initStream(deviceId);
                }

                setMicrophoneID(deviceId);
                setMicrophoneLabel(label);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function handleMicrophoneChange(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    return activeDetector === currentDetector$1 && /*#__PURE__*/React__default.createElement("div", {
      className: "testing-body"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-list"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "device-list-title"
    }, a18n('麦克风选择')), /*#__PURE__*/React__default.createElement(DeviceSelect, {
      deviceType: "microphone",
      choseDevice: choseDevice,
      onChange: handleMicrophoneChange
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "mic-testing-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "mic-testing-info"
    }, a18n('对着麦克风说"哈喽"试试～')), /*#__PURE__*/React__default.createElement("div", {
      className: "mic-bar-container"
    }, new Array(28).fill('').map(function (item, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        key: index,
        className: "mic-bar ".concat(volumeNum > index && 'active')
      });
    })), /*#__PURE__*/React__default.createElement("div", {
      id: "audio-container"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info"
    }, a18n('是否可以看到音量图标跳动？')), /*#__PURE__*/React__default.createElement("div", {
      className: "button-list"
    }, /*#__PURE__*/React__default.createElement(Button, {
      type: "outlined",
      onClick: function onClick() {
        return handleCompleted('error', microphoneLabel);
      }
    }, a18n('看不到')), /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: function onClick() {
        return handleCompleted('success', microphoneLabel);
      }
    }, a18n('看的到')))));
  }

  var currentDetector$2 = 'speaker';
  var audioPlayer = null;
  var mp3Url = 'https://web.sdk.qcloud.com/trtc/electron/download/resources/media/TestSpeaker.mp3';
  function SpeakerDetector(_ref) {
    var audioUrl = _ref.audioUrl,
        activeDetector = _ref.activeDetector,
        handleCompleted = _ref.handleCompleted;

    var _useState = React.useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        speakerLabel = _useState2[0],
        setSpeakerLabel = _useState2[1];

    var _useState3 = React.useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        url = _useState4[0],
        setUrl = _useState4[1];

    var _useState5 = React.useState(null),
        _useState6 = _slicedToArray(_useState5, 2),
        choseDevice = _useState6[0],
        setChoseDevice = _useState6[1];

    React.useEffect(function () {
      if (audioUrl === '') {
        setUrl(mp3Url);
      } else {
        setUrl(audioUrl);
      }
    }, [audioUrl]);
    React.useEffect(function () {
      if (activeDetector === currentDetector$2) {
        audioPlayer = document.getElementById('audio-player');
      }

      return function () {
        if (audioPlayer && !audioPlayer.paused) {
          audioPlayer.pause();
        }

        audioPlayer && (audioPlayer.currentTime = 0);
      };
    }, [activeDetector]);

    var handleSpeakerChange = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(speakerDevice) {
        var deviceId, label;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setChoseDevice(speakerDevice);
                deviceId = speakerDevice.deviceId, label = speakerDevice.label;
                _context.t0 = audioPlayer;

                if (!_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return audioPlayer.setSinkId(deviceId);

              case 6:
                setSpeakerLabel(label);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function handleSpeakerChange(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    return activeDetector === currentDetector$2 && /*#__PURE__*/React__default.createElement("div", {
      className: "testing-body"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-list"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "device-list-title"
    }, a18n('扬声器选择')), /*#__PURE__*/React__default.createElement(DeviceSelect, {
      deviceType: "speaker",
      choseDevice: choseDevice,
      onChange: handleSpeakerChange
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "audio-player-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "audio-player-info"
    }, a18n('请调高设备音量，点击播放下面的音频试试～')), /*#__PURE__*/React__default.createElement("audio", {
      id: "audio-player",
      src: url,
      controls: true
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info-container"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-info"
    }, a18n('是否可以听到声音？')), /*#__PURE__*/React__default.createElement("div", {
      className: "button-list"
    }, /*#__PURE__*/React__default.createElement(Button, {
      type: "outlined",
      onClick: function onClick() {
        return handleCompleted('error', speakerLabel);
      }
    }, a18n('听不到')), /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: function onClick() {
        return handleCompleted('success', speakerLabel);
      }
    }, a18n('听的到')))));
  }

  var _templateObject$1;
  var uplinkClient = null;
  var downlinkClient = null;
  var uplinkStream = null;
  var networkTestingResult = {
    uplinkNetworkQualities: [],
    downlinkNetworkQualities: [],
    rttList: []
  };
  var currentDetector$3 = 'network';
  var timer$1 = null;
  function networkDetector(_ref) {
    var activeDetector = _ref.activeDetector,
        networkDetectInfo = _ref.networkDetectInfo,
        handleCompleted = _ref.handleCompleted,
        generateReport = _ref.generateReport;

    var _useState = React.useState({}),
        _useState2 = _slicedToArray(_useState, 2),
        detectorInfo = _useState2[0],
        setDetectorInfo = _useState2[1];

    var _useState3 = React.useState(15),
        _useState4 = _slicedToArray(_useState3, 2),
        count = _useState4[0],
        setCount = _useState4[1];

    React.useEffect(function () {
      return function () {
        setDetectorInfo({});
      };
    }, []);
    React.useEffect(function () {
      if (activeDetector === currentDetector$3 && count !== 0) {
        setCount(15);
        getDetectorInfo();
      }

      return function () {
        clearInterval(timer$1);
        uplinkStream && uplinkStream.close();
        uplinkClient && uplinkClient.leave();
        downlinkClient && downlinkClient.leave();
      };
    }, [activeDetector]);
    React.useEffect(function () {
      if (count === 0) {
        getAverageInfo(detectorInfo);
        uplinkStream && uplinkStream.close();
        uplinkClient && uplinkClient.leave();
        downlinkClient && downlinkClient.leave();
      }
    }, [count]);
    var showRttValue = React.useMemo(function () {
      if (typeof detectorInfo.rtt === 'undefined') {
        return '';
      }

      if (detectorInfo.rtt === 0) {
        return a18n('未知');
      }

      return "".concat(detectorInfo.rtt, "ms");
    }, [detectorInfo.rtt]);

    var isWebRTCSupported = function isWebRTCSupported() {
      var apiList = ['RTCPeerConnection', 'webkitRTCPeerConnection', 'RTCIceGatherer'];
      return apiList.filter(function (api) {
        return api in window;
      }).length > 0;
    };

    var isUserMediaSupported = function isUserMediaSupported() {
      if (!navigator.mediaDevices) {
        return false;
      }

      var apiList = ['getUserMedia', 'enumerateDevices'];
      return apiList.filter(function (api) {
        return api in navigator.mediaDevices;
      }).length === apiList.length;
    };

    var isWebSocketSupported = function isWebSocketSupported() {
      return 'WebSocket' in window && 2 === window.WebSocket.CLOSING;
    };

    var getDetectorInfo = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var detect, systemResult, webRTCSupportResult, APISupportResult, detectorInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                detect = new RTCDetect();
                systemResult = detect.getSystem();
                webRTCSupportResult = isWebRTCSupported && isUserMediaSupported && isWebSocketSupported;
                APISupportResult = detect.getAPISupported();
                detectorInfo = {
                  system: systemResult.OS,
                  browser: "".concat(systemResult.browser.name, " ").concat(systemResult.browser.version),
                  TRTCSupport: webRTCSupportResult ? a18n('支持') : a18n('不支持'),
                  screenMediaSupport: APISupportResult.isScreenCaptureAPISupported ? a18n('支持') : a18n('不支持')
                };
                setDetectorInfo(detectorInfo);
                timer$1 = setInterval(function () {
                  setCount(function (prevValue) {
                    var newValue = prevValue - 1;

                    if (newValue === 0) {
                      clearInterval(timer$1);
                      return 0;
                    }

                    return newValue;
                  });
                }, 1000);
                testUplinkNetworkQuality();
                testDownlinkNetworkQuality();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getDetectorInfo() {
        return _ref2.apply(this, arguments);
      };
    }(); // 获取上行网络质量和RTT


    var testUplinkNetworkQuality = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var sdkAppId, roomId, _networkDetectInfo$up, uplinkUserId, uplinkUserSig;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sdkAppId = networkDetectInfo.sdkAppId, roomId = networkDetectInfo.roomId;
                _networkDetectInfo$up = networkDetectInfo.uplinkUserInfo, uplinkUserId = _networkDetectInfo$up.uplinkUserId, uplinkUserSig = _networkDetectInfo$up.uplinkUserSig;
                uplinkClient = TRTC.createClient({
                  sdkAppId: sdkAppId,
                  userId: uplinkUserId,
                  userSig: uplinkUserSig,
                  mode: 'rtc',
                  useStringRoomId: typeof roomId === 'string'
                });
                uplinkStream = TRTC.createStream({
                  audio: true,
                  video: false
                });
                _context3.next = 6;
                return uplinkStream.initialize();

              case 6:
                uplinkClient.on('network-quality', /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
                    var uplinkNetworkQuality, _yield$uplinkClient$g, rtt;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            uplinkNetworkQuality = event.uplinkNetworkQuality;
                            networkTestingResult.uplinkNetworkQualities.push(uplinkNetworkQuality);
                            setDetectorInfo(function (prevConfig) {
                              return _objectSpread2(_objectSpread2({}, prevConfig), {}, {
                                uplinkQuality: uplinkNetworkQuality
                              });
                            });
                            _context2.next = 5;
                            return uplinkClient.getTransportStats();

                          case 5:
                            _yield$uplinkClient$g = _context2.sent;
                            rtt = _yield$uplinkClient$g.rtt;
                            setDetectorInfo(function (prevConfig) {
                              return _objectSpread2(_objectSpread2({}, prevConfig), {}, {
                                rtt: rtt
                              });
                            });
                            networkTestingResult.rttList.push(rtt);

                          case 9:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                _context3.next = 9;
                return uplinkClient.join({
                  roomId: roomId
                });

              case 9:
                _context3.next = 11;
                return uplinkClient.publish(uplinkStream);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function testUplinkNetworkQuality() {
        return _ref3.apply(this, arguments);
      };
    }(); // 获取下行网络质量


    function testDownlinkNetworkQuality() {
      return _testDownlinkNetworkQuality.apply(this, arguments);
    } // 获取15秒检测平均值


    function _testDownlinkNetworkQuality() {
      _testDownlinkNetworkQuality = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var sdkAppId, roomId, _networkDetectInfo$do, downlinkUserId, downlinkUserSig;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                sdkAppId = networkDetectInfo.sdkAppId, roomId = networkDetectInfo.roomId;
                _networkDetectInfo$do = networkDetectInfo.downlinkUserInfo, downlinkUserId = _networkDetectInfo$do.downlinkUserId, downlinkUserSig = _networkDetectInfo$do.downlinkUserSig;
                downlinkClient = TRTC.createClient({
                  sdkAppId: sdkAppId,
                  userId: downlinkUserId,
                  userSig: downlinkUserSig,
                  mode: 'rtc',
                  useStringRoomId: typeof roomId === 'string'
                });
                downlinkClient.on('stream-added', /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return downlinkClient.subscribe(event.stream, {
                              audio: true,
                              video: true
                            });

                          case 2:
                            downlinkClient.on('network-quality', function (event) {
                              var downlinkNetworkQuality = event.downlinkNetworkQuality;
                              networkTestingResult.downlinkNetworkQualities.push(downlinkNetworkQuality);
                              setDetectorInfo(function (prevConfig) {
                                return _objectSpread2(_objectSpread2({}, prevConfig), {}, {
                                  downlinkQuality: downlinkNetworkQuality
                                });
                              });
                            });

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }());
                _context5.next = 6;
                return downlinkClient.join({
                  roomId: roomId
                });

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return _testDownlinkNetworkQuality.apply(this, arguments);
    }

    var getAverageInfo = function getAverageInfo(detectorInfo) {
      var uplinkAverageQuality = Math.ceil(networkTestingResult.uplinkNetworkQualities.reduce(function (value, current) {
        return value + current;
      }, 0) / networkTestingResult.uplinkNetworkQualities.length);
      var downlinkAverageQuality = Math.ceil(networkTestingResult.downlinkNetworkQualities.reduce(function (value, current) {
        return value + current;
      }, 0) / networkTestingResult.downlinkNetworkQualities.length);
      var rttAverageQuality = Math.ceil(networkTestingResult.rttList.reduce(function (value, current) {
        return value + current;
      }, 0) / networkTestingResult.rttList.length);

      var detectorResultInfo = _objectSpread2(_objectSpread2({}, detectorInfo), {}, {
        uplinkQuality: uplinkAverageQuality,
        downlinkQuality: downlinkAverageQuality,
        rtt: rttAverageQuality
      });

      if (networkTestingResult.uplinkNetworkQualities.length === 0) {
        detectorResultInfo.uplinkQuality = 0;
      }

      if (networkTestingResult.downlinkNetworkQualities.length === 0) {
        detectorResultInfo.downlinkQuality = 0;
      }

      if (networkTestingResult.rttList.length === 0) {
        detectorResultInfo.rtt = 0;
      }

      networkTestingResult.uplinkNetworkQualities = [];
      networkTestingResult.downlinkNetworkQualities = [];
      networkTestingResult.rttList = [];
      handleCompleted('success', detectorResultInfo);
      setDetectorInfo(detectorResultInfo);
    };

    return activeDetector === currentDetector$3 && /*#__PURE__*/React__default.createElement("div", {
      className: "testing-body"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-list"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('操作系统')), /*#__PURE__*/React__default.createElement("div", {
      className: !detectorInfo.system ? 'network-loading' : ''
    }, detectorInfo.system)), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('浏览器')), /*#__PURE__*/React__default.createElement("div", {
      className: !detectorInfo.browser ? 'network-loading' : ''
    }, detectorInfo.browser)), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('是否支持TRTC')), /*#__PURE__*/React__default.createElement("div", {
      className: !detectorInfo.TRTCSupport ? 'network-loading' : ''
    }, detectorInfo.TRTCSupport)), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('是否支持屏幕分享')), /*#__PURE__*/React__default.createElement("div", {
      className: !detectorInfo.screenMediaSupport ? 'network-loading' : ''
    }, detectorInfo.screenMediaSupport)), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('网络延时')), /*#__PURE__*/React__default.createElement("div", {
      className: typeof detectorInfo.rtt === 'undefined' ? 'network-loading' : ''
    }, showRttValue)), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('上行网络质量')), /*#__PURE__*/React__default.createElement("div", {
      className: !NETWORK_QUALITY[detectorInfo.uplinkQuality] ? 'network-loading' : ''
    }, a18n(NETWORK_QUALITY[detectorInfo.uplinkQuality] || ''))), /*#__PURE__*/React__default.createElement("div", {
      className: "testing-item-container"
    }, /*#__PURE__*/React__default.createElement("div", null, a18n('下行网络质量')), /*#__PURE__*/React__default.createElement("div", {
      className: !NETWORK_QUALITY[detectorInfo.downlinkQuality] ? 'network-loading' : ''
    }, a18n(NETWORK_QUALITY[detectorInfo.downlinkQuality] || '')))), count > 0 ? /*#__PURE__*/React__default.createElement(Button, {
      className: "gray-button",
      type: "disabled"
    }, a18n(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\u5269\u4F59\u68C0\u6D4B\u65F6\u95F4\uFF08", "\uFF09s"])), count)) : /*#__PURE__*/React__default.createElement(Button, {
      className: "report-button",
      type: "contained",
      onClick: generateReport
    }, a18n('查看检测报告')));
  }

  function DetectorReport(_ref) {
    var reportData = _ref.reportData,
        handleReset = _ref.handleReset,
        handleClose = _ref.handleClose;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "device-testing-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "testing-title"
    }, a18n('检测报告')), /*#__PURE__*/React__default.createElement("div", {
      className: "device-report-list"
    }, reportData.camera && /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, CameraIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, reportData.camera.result)), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.camera.type === 'success' ? 'green' : 'red')
    }, reportData.camera.type === 'success' ? a18n('正常') : a18n('异常'))), /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, MicIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, reportData.microphone.result)), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.microphone.type === 'success' ? 'green' : 'red')
    }, reportData.microphone.type === 'success' ? a18n('正常') : a18n('异常'))), reportData.speaker && /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, SpeakerIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, reportData.speaker.result)), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.speaker.type === 'success' ? 'green' : 'red')
    }, reportData.speaker.type === 'success' ? a18n('正常') : a18n('异常'))), reportData.network && /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, NetworkIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, a18n('网络延时'))), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.network.result.rtt > 0 && reportData.network.result.rtt <= 200 ? 'green' : 'red')
    }, reportData.network.result.rtt === 0 ? a18n('未知') : "".concat(reportData.network.result.rtt, "ms"))), reportData.network && /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, NetworkIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, a18n('上行网络质量'))), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.network.result.uplinkQuality > 0 && reportData.network.result.uplinkQuality < 4 ? 'green' : 'red')
    }, a18n(NETWORK_QUALITY[reportData.network.result.uplinkQuality]))), reportData.network && /*#__PURE__*/React__default.createElement("div", {
      className: "device-report"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "device-info"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "report-icon"
    }, NetworkIcon), /*#__PURE__*/React__default.createElement("div", {
      className: "device-name"
    }, a18n('下行网络质量'))), /*#__PURE__*/React__default.createElement("div", {
      className: "".concat(reportData.network.result.downlinkQuality > 0 && reportData.network.result.downlinkQuality < 4 ? 'green' : 'red')
    }, a18n(NETWORK_QUALITY[reportData.network.result.downlinkQuality])))), /*#__PURE__*/React__default.createElement("div", {
      className: "device-report-footer"
    }, /*#__PURE__*/React__default.createElement(Button, {
      type: "outlined",
      onClick: handleReset
    }, a18n('重新检测')), /*#__PURE__*/React__default.createElement(Button, {
      type: "contained",
      onClick: handleClose
    }, a18n('完成检测'))));
  }

  var en = {
    摄像头选择: 'Camera selection',
    '是否可以清楚的看到自己？': 'Can you see yourself clearly?',
    看不到: 'No',
    看的到: 'Yes',
    检测报告: 'Detect Report',
    正常: 'Normal',
    异常: 'Abnormal',
    网络延时: 'Network Delay',
    上行网络质量: 'Uplink network quality',
    下行网络质量: 'Downlink network quality',
    重新检测: 'Retest',
    完成检测: 'Done',
    '1. 若浏览器弹出提示，请选择“允许”<br>': '1. If a prompt pops up in the browser, please <br>select "allow"<br>',
    '2. 若杀毒软件弹出提示，请选择“允许”<br>': '2. If the anti-virus software pops up a prompt, <br>please select "allow"<br>',
    '3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>': '3. Check the system settings and allow the browser <br>to access the camera and microphone<br>',
    '4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>': '4. Check the browser settings to allow web access <br>to the camera and microphone<br>',
    '5. 检查摄像头/麦克风是否正确连接并开启<br>': '5. Check that the camera / microphone is properly <br>connected and turned on<br>',
    '6. 尝试重新连接摄像头/麦克风<br>': '6. Try reconnecting the camera / microphone<br>',
    '7. 尝试重启设备后重新检测': '7. Test again after trying to restart the device',
    '1. 请检查设备是否联网<br>': '1. Please check whether the device is connected to the Internet<br>',
    '2. 请刷新网页后再次检测<br>': '2. Please refresh the page and check again<br>',
    '3. 请尝试更换网络后再次检测': '3. Please try to replace the network and check again',
    '连接出错，请重试': 'Connection error, please try again',
    '设备连接成功，请开始设备检测': 'Device connected successfully, please start device detection',
    '设备及网络连接成功，请开始设备检测': 'Device and network connected successfully, please start device detection',
    '未检测到%1%2%3设备，请检查设备连接': 'The %1%2%3 device was not detected, please check the device connection',
    '【摄像头】': 'camera',
    '【麦克风】': 'microphone',
    '【扬声器】': 'speaker',
    '请允许浏览器及网页访问%s设备': 'Please allow browser and web access to the %s device',
    '请允许浏览器及网页访问%s设备，并检查网络连接': 'Please allow browsers and web pages to access the %s device and check the network connection',
    '网络连接失败，请检查网络连接': 'Network connection failed. Please check the network connection',
    设备连接: 'Device Connection',
    '设备检测前请确认设备连接了%s': 'Please make sure %s is connected before testing',
    摄像头: 'camera',
    麦克风: 'microphone',
    扬声器: 'speaker',
    网络: 'network',
    和: ' and ',
    分隔符: ', ',
    '设备正在连接中，请稍后': 'The device is connecting, please wait...',
    开始检测: 'Start testing',
    重新连接: 'Reconnecting',
    跳过检测: 'Skip detection',
    麦克风选择: 'Microphone selection',
    '对着麦克风说"哈喽"试试～': 'Say "hello" to the microphone and try',
    '是否可以看到音量图标跳动？': 'Can you see the volume icon jump?',
    操作系统: 'Operating system',
    浏览器: 'Browser',
    是否支持TRTC: 'Is TRTC supported',
    是否支持屏幕分享: 'Is screen sharing supported',
    支持: 'Support',
    不支持: 'Not support',
    '剩余检测时间（%s）s': 'Detection time remaining (%s) s',
    查看检测报告: 'View test report',
    扬声器选择: 'Speaker selection',
    '请调高设备音量，点击播放下面的音频试试～': 'Please turn up the volume of the device and click to play the audio below',
    '是否可以听到声音？': 'Can you hear the sound?',
    听不到: 'No',
    听的到: 'Yes',
    未知: 'Unknown',
    极佳: 'Very good',
    较好: 'Preferably',
    一般: 'Commonly',
    差: 'Bad',
    极差: 'Very bad',
    断开: 'Break off',
    '暂时无法访问摄像头/麦克风，请确保系统授予当前浏览器摄像头/麦克风权限，并且没有其他应用占用摄像头/麦克风': 'Unable to access the camera / microphone temporarily. Please make sure that the system grants the camera / microphone permission to the current browser, and no other application occupies the camera / microphone',
    '用户/系统已拒绝授权访问摄像头或麦克风': 'The user / system has denied access to the camera or microphone',
    找不到摄像头或麦克风设备: 'Camera or microphone device not found',
    '采集属性设置错误，如果您指定了 cameraId/microphoneId，请确保它们是一个有效的非空字符串': 'Collection property setting error, if you specified cameraId / microphoneId, please make sure they are a valid non empty string',
    '初始化本地流时遇到未知错误, 请重试': 'An unknown error was encountered while initializing the local stream. Please try again',
    camera: 'CAMERA',
    microphone: 'MICROPHONE',
    speaker: 'SPEAKER',
    network: 'NETWORK'
  };

  var zh = {
    摄像头选择: '摄像头选择',
    '是否可以清楚的看到自己？': '是否可以清楚的看到自己？',
    看不到: '看不到',
    看的到: '看的到',
    检测报告: '检测报告',
    正常: '正常',
    异常: '异常',
    网络延时: '网络延时',
    上行网络质量: '上行网络质量',
    下行网络质量: '下行网络质量',
    重新检测: '重新检测',
    完成检测: '完成检测',
    '1. 若浏览器弹出提示，请选择“允许”<br>': '1. 若浏览器弹出提示，请选择“允许”<br>',
    '2. 若杀毒软件弹出提示，请选择“允许”<br>': '2. 若杀毒软件弹出提示，请选择“允许”<br>',
    '3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>': '3. 检查系统设置，允许浏览器访问摄像头及麦克风<br>',
    '4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>': '4. 检查浏览器设置，允许网页访问摄像头及麦克风<br>',
    '5. 检查摄像头/麦克风是否正确连接并开启<br>': '5. 检查摄像头/麦克风是否正确连接并开启<br>',
    '6. 尝试重新连接摄像头/麦克风<br>': '6. 尝试重新连接摄像头/麦克风<br>',
    '7. 尝试重启设备后重新检测': '7. 尝试重启设备后重新检测',
    '1. 请检查设备是否联网<br>': '1. 请检查设备是否联网<br>',
    '2. 请刷新网页后再次检测<br>': '2. 请刷新网页后再次检测<br>',
    '3. 请尝试更换网络后再次检测': '3. 请尝试更换网络后再次检测',
    '连接出错，请重试': '连接出错，请重试',
    '设备%s连接成功，请开始设备检测': '设备%s连接成功，请开始设备检测',
    及网络: '及网络',
    '未检测到%1%2%3设备，请检查设备连接': '未检测到%1%2%3设备，请检查设备连接',
    '【摄像头】': '【摄像头】',
    '【麦克风】': '【麦克风】',
    '【扬声器】': '【扬声器】',
    '请允许浏览器及网页访问%s设备': '请允许浏览器及网页访问%s设备',
    '请允许浏览器及网页访问%s设备，并检查网络连接': '请允许浏览器及网页访问%s设备，并检查网络连接',
    '网络连接失败，请检查网络连接': '网络连接失败，请检查网络连接',
    设备连接: '设备连接',
    '设备检测前请确认设备连接了%s': '设备检测前请确认设备连接了%s',
    摄像头: '摄像头',
    麦克风: '麦克风',
    扬声器: '扬声器',
    网络: '网络',
    和: '和',
    分隔符: '、',
    '设备正在连接中，请稍后': '设备正在连接中，请稍后',
    开始检测: '开始检测',
    重新连接: '重新连接',
    跳过检测: '跳过检测',
    麦克风选择: '麦克风选择',
    '对着麦克风说"哈喽"试试～': '对着麦克风说 哈喽 试试～',
    '是否可以看到音量图标跳动？': '是否可以看到音量图标跳动？',
    操作系统: '操作系统',
    浏览器: '浏览器',
    是否支持TRTC: '是否支持TRTC',
    是否支持屏幕分享: '是否支持屏幕分享',
    支持: '支持',
    不支持: '不支持',
    '剩余检测时间（%s）s': '剩余检测时间（%s）s',
    查看检测报告: '查看检测报告',
    扬声器选择: '扬声器选择',
    '请调高设备音量，点击播放下面的音频试试～': '请调高设备音量，点击播放下面的音频试试～',
    '是否可以听到声音？': '是否可以听到声音？',
    听不到: '听不到',
    听的到: '听的到',
    未知: '未知',
    极佳: '极佳',
    较好: '较好',
    一般: '一般',
    差: '差',
    极差: '极差',
    断开: '断开',
    '暂时无法访问摄像头/麦克风，请确保系统授予当前浏览器摄像头/麦克风权限，并且没有其他应用占用摄像头/麦克风': '暂时无法访问摄像头/麦克风，请确保系统授予当前浏览器摄像头/麦克风权限，并且没有其他应用占用摄像头/麦克风',
    '用户/系统已拒绝授权访问摄像头或麦克风': '用户/系统已拒绝授权访问摄像头或麦克风',
    找不到摄像头或麦克风设备: '找不到摄像头或麦克风设备',
    '采集属性设置错误，如果您指定了 cameraId/microphoneId，请确保它们是一个有效的非空字符串': '采集属性设置错误，如果您指定了 cameraId/microphoneId，请确保它们是一个有效的非空字符串',
    '初始化本地流时遇到未知错误, 请重试': '初始化本地流时遇到未知错误, 请重试',
    camera: '摄像头',
    microphone: '麦克风',
    speaker: '扬声器',
    network: '网络'
  };

  a18n.addLocaleResource('en', en);
  a18n.addLocaleResource('zh-CN', zh);
  function DeviceDetector(_ref) {
    var _this = this;

    var visible = _ref.visible,
        onClose = _ref.onClose,
        _ref$lang = _ref.lang,
        lang = _ref$lang === void 0 ? 'zh-CN' : _ref$lang,
        _ref$audioUrl = _ref.audioUrl,
        audioUrl = _ref$audioUrl === void 0 ? '' : _ref$audioUrl,
        _ref$hasCameraDetect = _ref.hasCameraDetect,
        hasCameraDetect = _ref$hasCameraDetect === void 0 ? true : _ref$hasCameraDetect,
        _ref$hasNetworkDetect = _ref.hasNetworkDetect,
        hasNetworkDetect = _ref$hasNetworkDetect === void 0 ? true : _ref$hasNetworkDetect,
        networkDetectInfo = _ref.networkDetectInfo;

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        open = _useState2[0],
        setOpen = _useState2[1];

    var _useState3 = React.useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        detectStage = _useState4[0],
        setDetectStage = _useState4[1];

    var _useState5 = React.useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        activeStep = _useState6[0],
        setActiveStep = _useState6[1];

    var _useState7 = React.useState({}),
        _useState8 = _slicedToArray(_useState7, 2),
        completed = _useState8[0],
        setCompleted = _useState8[1];

    var _useState9 = React.useState({}),
        _useState10 = _slicedToArray(_useState9, 2),
        containerStyle = _useState10[0],
        setContainerStyle = _useState10[1];

    React.useEffect(function () {
      setOpen(visible);
    }, [visible]);
    React.useEffect(function () {
      a18n.setLocale(lang);
    }, [lang]);
    var detect = new RTCDetect();
    var result = detect.getSystem();
    var stepNameList = ['camera', 'microphone', 'speaker', 'network'];

    if (!hasCameraDetect) {
      stepNameList.indexOf('camera') >= 0 && stepNameList.splice(stepNameList.indexOf('camera'), 1);
    } // iOS系统和firefox浏览器，不包含扬声器检测


    if (['Firefox', 'Safari'].indexOf(result.browser.name) > -1 || result.OS === 'iOS') {
      stepNameList.indexOf('speaker') >= 0 && stepNameList.splice(stepNameList.indexOf('speaker'), 1);
    }

    if (!hasNetworkDetect) {
      stepNameList.indexOf('network') >= 0 && stepNameList.splice(stepNameList.indexOf('network'), 1);
    }

    React.useEffect(function () {
      handleSize();
      window.addEventListener('resize', handleSize.bind(_this));
      return function () {
        window.removeEventListener('resize', handleSize.bind(_this));
      };
    }, []);

    var handleSize = function handleSize() {
      if (window.innerWidth > 520) {
        setContainerStyle({
          transform: 'scale(1)'
        });
        return;
      }

      var Width = 520;
      var Height = 480;
      var scaleX = window.innerWidth / Width;
      var scaleY = window.innerHeight / Height;
      var scale = Math.min(scaleX, scaleY);
      setContainerStyle({
        transform: "scale(".concat(scale, ")")
      });
    };

    var stopBubble = function stopBubble(event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }; // 重新检测


    var handleReset = function handleReset() {
      setCompleted({});
      setDetectStage(0);
      setActiveStep(0);
    }; // 完成检测


    var handleClose = function handleClose() {
      setOpen(false);
      handleReset();
      onClose();
    }; // 点击切换step


    var handleStep = function handleStep(step) {
      if (completed[stepNameList[step]] && completed[stepNameList[step]].completed) {
        setActiveStep(step);
      }
    }; // 处理step的完成事件


    var handleCompleted = function handleCompleted(type, result) {
      setCompleted(function (prevConfig) {
        return _objectSpread2(_objectSpread2({}, prevConfig), {}, _defineProperty({}, stepNameList[activeStep], {
          completed: true,
          type: type,
          result: result
        }));
      });

      if (activeStep < stepNameList.length - 1) {
        setActiveStep(activeStep + 1);
      }

      if (stepNameList.indexOf('network') < 0 && activeStep === stepNameList.length - 1) {
        setDetectStage(2);
      }
    };

    return open && /*#__PURE__*/React__default.createElement("div", {
      className: "device-detector-backdrop"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "root",
      style: containerStyle,
      onClick: stopBubble
    }, /*#__PURE__*/React__default.createElement(Button, {
      type: "outlined",
      className: "close",
      onClick: handleClose
    }, a18n('跳过检测')), detectStage === 0 && /*#__PURE__*/React__default.createElement(DeviceConnect, {
      stepNameList: stepNameList,
      startDeviceDetect: function startDeviceDetect() {
        return setDetectStage(1);
      }
    }), detectStage === 1 && /*#__PURE__*/React__default.createElement("div", {
      className: "step-container"
    }, stepNameList.map(function (label, index) {
      var success = completed[stepNameList[index]] && completed[stepNameList[index]].type === 'success';
      var error = completed[stepNameList[index]] && completed[stepNameList[index]].type === 'error';
      var active = activeStep === index;
      var stateClassName = '';

      if (active || success) {
        stateClassName = 'active';
      } else if (error) {
        stateClassName = 'error';
      }

      return /*#__PURE__*/React__default.createElement("div", {
        key: index,
        onClick: handleStep.bind(_this, index),
        className: "step ".concat(stateClassName)
      }, /*#__PURE__*/React__default.createElement("span", {
        className: "step-icon"
      }, label === 'camera' && CameraIcon, label === 'microphone' && MicIcon, label === 'speaker' && SpeakerIcon, label === 'network' && NetworkIcon), /*#__PURE__*/React__default.createElement("span", {
        className: "step-label"
      }, a18n(label)));
    })), detectStage === 1 && /*#__PURE__*/React__default.createElement("div", {
      className: "testing-container"
    }, stepNameList.map(function (step, index) {
      if (step === 'camera') {
        return /*#__PURE__*/React__default.createElement(cameraDetector, {
          key: index,
          activeDetector: stepNameList[activeStep],
          handleCompleted: handleCompleted
        });
      }

      if (step === 'microphone') {
        return /*#__PURE__*/React__default.createElement(MicrophoneDetector, {
          key: index,
          activeDetector: stepNameList[activeStep],
          handleCompleted: handleCompleted
        });
      }

      if (step === 'speaker') {
        return /*#__PURE__*/React__default.createElement(SpeakerDetector, {
          key: index,
          audioUrl: audioUrl,
          activeDetector: stepNameList[activeStep],
          handleCompleted: handleCompleted
        });
      }

      if (step === 'network') {
        return /*#__PURE__*/React__default.createElement(networkDetector, {
          key: index,
          activeDetector: stepNameList[activeStep],
          networkDetectInfo: networkDetectInfo,
          handleCompleted: handleCompleted,
          generateReport: function generateReport() {
            return setDetectStage(2);
          }
        });
      }

      return null;
    })), detectStage === 2 && /*#__PURE__*/React__default.createElement(DetectorReport, {
      reportData: completed,
      handleReset: handleReset,
      handleClose: handleClose
    })));
  }

  return DeviceDetector;

})));
