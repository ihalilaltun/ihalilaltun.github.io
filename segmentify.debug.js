/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!(function (root, name, definition) {
  /*if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else*/
  root[name] = definition();
})(this, 'bowser', function () {
  /**
   * See useragents.js for examples of navigator.userAgent
   */

  var t = true;

  function detect(ua) {
    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
      likeAndroid = /like android/i.test(ua),
      android = !likeAndroid && /android/i.test(ua),
      nexusMobile = /nexus\s*[0-6]\s*/i.test(ua),
      nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua),
      chromeos = /CrOS/.test(ua),
      silk = /silk/i.test(ua),
      sailfish = /sailfish/i.test(ua),
      tizen = /tizen/i.test(ua),
      webos = /(web|hpw)os/i.test(ua),
      windowsphone = /windows phone/i.test(ua),
      samsungBrowser = /SamsungBrowser/i.test(ua),
      windows = !windowsphone && /windows/i.test(ua),
      mac = !iosdevice && !silk && /macintosh/i.test(ua),
      linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
      edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
      versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
      tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua),
      mobile = !tablet && /[^-]mobi/i.test(ua),
      xbox = /xbox/i.test(ua),
      result;

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera',
        opera: t,
        version:
          versionIdentifier ||
          getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
      };
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera',
        opera: t,
        version:
          getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) ||
          versionIdentifier,
      };
    } else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android',
        samsungBrowser: t,
        version:
          versionIdentifier ||
          getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
      };
    } else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast',
        coast: t,
        version:
          versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i),
      };
    } else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser',
        yandexbrowser: t,
        version:
          versionIdentifier ||
          getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
      };
    } else if (/ucbrowser/i.test(ua)) {
      result = {
        name: 'UC Browser',
        ucbrowser: t,
        version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i),
      };
    } else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon',
        maxthon: t,
        version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i),
      };
    } else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany',
        epiphany: t,
        version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i),
      };
    } else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin',
        puffin: t,
        version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i),
      };
    } else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir',
        sleipnir: t,
        version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i),
      };
    } else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon',
        kMeleon: t,
        version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i),
      };
    } else if (windowsphone) {
      result = {
        name: 'Windows Phone',
        osname: 'Windows Phone',
        windowsphone: t,
      };
      if (edgeVersion) {
        result.msedge = t;
        result.version = edgeVersion;
      } else {
        result.msie = t;
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
      }
    } else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer',
        msie: t,
        version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i),
      };
    } else if (chromeos) {
      result = {
        name: 'Chrome',
        osname: 'Chrome OS',
        chromeos: t,
        chromeBook: t,
        chrome: t,
        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
      };
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge',
        msedge: t,
        version: edgeVersion,
      };
    } else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi',
        vivaldi: t,
        version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier,
      };
    } else if (sailfish) {
      result = {
        name: 'Sailfish',
        osname: 'Sailfish OS',
        sailfish: t,
        version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i),
      };
    } else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey',
        seamonkey: t,
        version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i),
      };
    } else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox',
        firefox: t,
        version: getFirstMatch(
          /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i,
        ),
      };
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t;
        result.osname = 'Firefox OS';
      }
    } else if (silk) {
      result = {
        name: 'Amazon Silk',
        silk: t,
        version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i),
      };
    } else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS',
        phantom: t,
        version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i),
      };
    } else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS',
        slimer: t,
        version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i),
      };
    } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry',
        osname: 'BlackBerry OS',
        blackberry: t,
        version:
          versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i),
      };
    } else if (webos) {
      result = {
        name: 'WebOS',
        osname: 'WebOS',
        webos: t,
        version:
          versionIdentifier ||
          getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i),
      };
      /touchpad\//i.test(ua) && (result.touchpad = t);
    } else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada',
        osname: 'Bada',
        bada: t,
        version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i),
      };
    } else if (tizen) {
      result = {
        name: 'Tizen',
        osname: 'Tizen',
        tizen: t,
        version:
          getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) ||
          versionIdentifier,
      };
    } else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla',
        qupzilla: t,
        version:
          getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) ||
          versionIdentifier,
      };
    } else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium',
        chromium: t,
        version:
          getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) ||
          versionIdentifier,
      };
    } else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome',
        chrome: t,
        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
      };
    } else if (android) {
      result = {
        name: 'Android',
        version: versionIdentifier,
      };
    } else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari',
        safari: t,
      };
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    } else if (iosdevice) {
      result = {
        name:
          iosdevice == 'iphone'
            ? 'iPhone'
            : iosdevice == 'ipad'
            ? 'iPad'
            : 'iPod',
      };
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier;
      }
    } else if (/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot',
        googlebot: t,
        version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier,
      };
    } else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /),
      };
    }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || 'Blink';
        result.blink = t;
      } else {
        result.name = result.name || 'Webkit';
        result.webkit = t;
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier;
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || 'Gecko';
      result.gecko = t;
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t;
      result.osname = 'Android';
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t;
      result.ios = t;
      result.osname = 'iOS';
    } else if (mac) {
      result.mac = t;
      result.osname = 'macOS';
    } else if (xbox) {
      result.xbox = t;
      result.osname = 'Xbox';
    } else if (windows) {
      result.windows = t;
      result.osname = 'Windows';
    } else if (linux) {
      result.linux = t;
      result.osname = 'Linux';
    }

    function getWindowsVersion(s) {
      switch (s) {
        case 'NT':
          return 'NT';
        case 'XP':
          return 'XP';
        case 'NT 5.0':
          return '2000';
        case 'NT 5.1':
          return 'XP';
        case 'NT 5.2':
          return '2003';
        case 'NT 6.0':
          return 'Vista';
        case 'NT 6.1':
          return '7';
        case 'NT 6.2':
          return '8';
        case 'NT 6.3':
          return '8.1';
        case 'NT 10.0':
          return '10';
        default:
          return undefined;
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(
        getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i),
      );
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
      tablet ||
      nexusTablet ||
      iosdevice == 'ipad' ||
      (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile))) ||
      result.silk
    ) {
      result.tablet = t;
    } else if (
      mobile ||
      iosdevice == 'iphone' ||
      iosdevice == 'ipod' ||
      android ||
      nexusMobile ||
      result.blackberry ||
      result.webos ||
      result.bada
    ) {
      result.mobile = t;
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (
      result.msedge ||
      (result.msie && result.version >= 10) ||
      (result.yandexbrowser && result.version >= 15) ||
      (result.vivaldi && result.version >= 1.0) ||
      (result.chrome && result.version >= 20) ||
      (result.samsungBrowser && result.version >= 4) ||
      (result.firefox && result.version >= 20.0) ||
      (result.safari && result.version >= 6) ||
      (result.opera && result.version >= 10.0) ||
      (result.ios && result.osversion && result.osversion.split('.')[0] >= 6) ||
      (result.blackberry && result.version >= 10.1) ||
      (result.chromium && result.version >= 20)
    ) {
      result.a = t;
    } else if (
      (result.msie && result.version < 10) ||
      (result.chrome && result.version < 20) ||
      (result.firefox && result.version < 20.0) ||
      (result.safari && result.version < 6) ||
      (result.opera && result.version < 10.0) ||
      (result.ios && result.osversion && result.osversion.split('.')[0] < 6) ||
      (result.chromium && result.version < 20)
    ) {
      result.c = t;
    } else result.x = t;

    return result;
  }

  var bowser = detect(
    typeof navigator !== 'undefined' ? navigator.userAgent || '' : '',
  );

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem === 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split('.').length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [],
      i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(
      getVersionPrecision(versions[0]),
      getVersionPrecision(versions[1]),
    );
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join('.0');

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split('.'), function (chunk) {
        return new Array(20 - chunk.length).join('0') + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      } else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      } else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void 0;
    }

    if (strictMode === void 0) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = '' + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error(
              'Browser version in the minVersion map should be a string: ' +
                browser +
                ': ' +
                String(minVersions),
            );
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser;
});

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
function initializeMustache(mustache) {
  var objectToString = Object.prototype.toString;
  var isArray =
    Array.isArray ||
    function isArrayPolyfill(object) {
      return objectToString.call(object) === '[object Array]';
    };

  function isFunction(object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr(obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty(obj, propName) {
    return obj != null && typeof obj === 'object' && propName in obj;
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;

  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template) return [];

    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;

    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp(
        '\\s*' + escapeRegExp('}' + tagsToCompile[1]),
      );
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe)) break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error(
            'Unclosed section "' + openSection[1] + '" at ' + start,
          );
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error(
        'Unclosed section "' + openSection[1] + '" at ' + scanner.pos,
      );

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector =
            sections.length > 0
              ? sections[sections.length - 1][4]
              : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos() {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0) return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re),
      match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this,
        names,
        index,
        lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value)) value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache() {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render(template, view, partials) {
    var tokens = this.parse(template);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens(
    tokens,
    context,
    partials,
    originalTemplate,
  ) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#')
        value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^')
        value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>')
        value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined) buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection(
    token,
    context,
    partials,
    originalTemplate,
  ) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(
          token[4],
          context.push(value[j]),
          partials,
          originalTemplate,
        );
      }
    } else if (
      typeof value === 'object' ||
      typeof value === 'string' ||
      typeof value === 'number'
    ) {
      buffer += this.renderTokens(
        token[4],
        context.push(value),
        partials,
        originalTemplate,
      );
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error(
          'Cannot use higher-order sections without the original template',
        );

      // Extract the portion of the original template that the section contains.
      value = value.call(
        context.view,
        originalTemplate.slice(token[3], token[5]),
        subRender,
      );

      if (value != null) buffer += value;
    } else {
      buffer += this.renderTokens(
        token[4],
        context,
        partials,
        originalTemplate,
      );
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted(
    token,
    context,
    partials,
    originalTemplate,
  ) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial(
    token,
    context,
    partials,
  ) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
  };

  Writer.prototype.escapedValue = function escapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.2.1';
  mustache.tags = ['{{', '}}'];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache() {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse(template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render(template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError(
        'Invalid template! Template should be a "string" ' +
          'but "' +
          typeStr(template) +
          '" was given as the first ' +
          'argument for mustache#render(template, view, partials)',
      );
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html(template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
}

/* Segmentify Initializer */
(function () {
  var _SgmntfY_ = (window['_SgmntfY_'] = {
    // log levels
    LOG_LEVELS: {
      SILENT: 0,
      ERROR: 1,
      WARN: 2,
      INFO: 3,
      DEBUG: 4,
    },
    // state variables
    _variables: {
      jq: window['SegmentifyjQuery'] || null,
      mustache: null,
      domain: window['SegmentifyDomain'] || window.location.hostname,
      ua: {
        agentString: window.navigator.userAgent,
        type: null,
        name: null,
        version: null,
        os: null,
        osversion: null,
      },
      controlGroup: {
        type: undefined,
        source: undefined,
        experimentID: undefined,
        controlValue: undefined,
        activeValue: undefined,
      },
      search: {
        maxMobileWidth: 801,
        searchMinChar: 0,
        searchDelay: 50,
        input: '',
        manuelTrigger: '', // mobile input selector
        manuelTriggerEnabledForDesktop: false,
        manuelTriggerDesktop: '', // desktop input selector
        cancelText: 'Cancel',
        showAll: 'Show All',
        notFound: 'Sorry, there are no results for that search term. ',
        initialCampaign: null,
        isExecutable: false,
        searchTimer: null,
        isExecutableForAfter: false,
        manuelTriggerClicked: false,
        forceRemoveInputVal: false,
        queryVerboseLog: false,
        queryOverrideKey: '_sgf_search_override_query',
        bannerTargets: {
          ASSETS_HEADER: '.sgm-search-sidebar',
          ASSETS_FOOTER: '.sgm-search-sidebar',
          RESULTS_HEADER: '.sgm-search-products',
          RESULTS_FOOTER: '.sgm-search-products',
        },
      },
      pa: {
        loaded: false,
        disabled: false,
        wait: false,
      },
      journey: {},
      userStorageKey: '_sgf_user_id',
      sessionStorageKey: '_sgf_session_id',
      pushPermissionKey: '_sgf_push_permission_asked',
      testMode: '_sgf_test_mode',
      tracking: '_sgf_tracking',
      storage: {
        delayedActions: { key: '_sgf_delayed_actions', local: true },
        delayedCampaigns: { key: '_sgf_delayed_campaigns', local: true },
        pageViewCampaigns: { key: '_sgf_pageview_campaigns', local: true },
        retryQueue: { key: '_sgf_rq', local: true },
        extensionStatus: { key: 'segmentifyExtension', local: true },
        qaExtensionStatus: { key: '_sgf_qa_ext', local: true },
        clickedBanners: { key: '_sgf_clicked_banners', local: false },
        nextPageQueue: { key: '_sgf_npq', local: true },
        user: { key: '_sgf_user_id', local: false },
        session: { key: '_sgf_session_id', local: false },
        qaMode: { key: '_sgf_qa_mode', local: true },
        searchNoCache: { key: '_sgf_search_no_cache', local: true },
        userData: { key: '_sgf_ud', local: false },
      },
      logLevel: 'ERROR',
      segmentifyObj: null,
      recommendedProducts: [],
      recommendedPromotions: [],
      waitingKeys: false,
      keysTryCount: 0,
      apiKey: null,
      skipProductDetail: {
        device: [], // if current device is member of given list, don't send product detail
      },
      offerRecommendedProducts: false,
      offerRecommendedPromotions: false,
      runTimer: null,
      initTimer: null,
      initTryCount: 0,
      initTryLimit: 50,
      isPageHide: false,
      cssPreload: false,
      constants: {
        frequency: 100, // check for new events for every 100 milliseconds
        redirectDelay: 1000, // minimum amount of delay before redirect
        retryLimit: 3, // number of tries for sending requests to engine, after limit is reached, event is discarded
        eventTimeout: 10, // timeout in seconds for sending an event
        clickedBannersLimit: 20, // number of clicked banners to store
        recommendationSelectorFindLimit: 50, // number of tries for finding if recommendation-selector cannot be found
      },
      requiredParams: {
        PAGE_VIEW: [],
        PRODUCT_VIEW: ['productId'],
        BASKET_OPERATIONS: ['productId', 'basketId', 'step'],
        CHECKOUT: ['totalPrice', 'basketId', 'step'],
        USER_OPERATIONS: ['step'],
        FORM: ['formName', 'fields'],
        CUSTOM_EVENT: ['type'],
        INTERACTION: ['type'],
        BANNER_OPERATIONS: ['type', 'title', 'group', 'order'],
        BANNER_GROUP_VIEW: ['group'],
        INTERNAL_BANNER_GROUP: ['group'],
        USER_CHANGE: ['oldUserId'],
        PROMOTION: ['type', 'code'],
        SEARCH: [],
        FILTER: ['source'],
        COUPON: ['type'],
        JOURNEY: ['type'],
        WISHLIST: ['step'],
        PERSONA_QUIZ: [],
        GAMIFICATION: [],
      },
      optionalParams: {
        PAGE_VIEW: ['category', 'subCategory', 'external'],
        PRODUCT_VIEW: [
          'title',
          'url',
          'mUrl',
          'image',
          'imageXS',
          'imageS',
          'imageM',
          'imageL',
          'imageXL',
          'additionalImages',
          'mainCategory',
          'category',
          'categories',
          'price',
          'oldPrice',
          'specialPrice',
          'lastUpdateTime',
          'inStock',
          'stockCount',
          'stockRatio',
          'stockStatus',
          'brand',
          'gender',
          'labels',
          'sizes',
          'allSizes',
          'colors',
          'publishTime',
          'source',
          'noUpdate',
          'activeBanners',
          'groupId',
          'scoreCount',
          'reviewCount',
          'subSource',
          'paramsList',
        ],
        BASKET_OPERATIONS: ['price', 'quantity', 'size', 'activeBanners'],
        CHECKOUT: [
          'productList',
          'orderNo',
          'paymentType',
          'activeBanners',
          'cartUrl',
          'totalDiscount',
          'discounts',
          'shipment',
          'tax',
          'coupon',
        ],
        USER_OPERATIONS: [
          'username',
          'fullName',
          'phone',
          'gender',
          'birthDate',
          'segments',
          'memberSince',
          'service',
          'isRegistered',
          'isLogin',
          'location',
          'emailNtf',
          'mailTest',
          'pushTest',
          'custom',
          'external',
          'userIysPermissions',
          'lastSearchDeletedKeywords',
          'triggerType',
          'channel',
          'type',
          'identity',
          'source',
          'pushToken',
          'whatsappNtf',
        ],
        FORM: [],
        CUSTOM_EVENT: [],
        INTERACTION: ['interactionId', 'instanceId'],
        BANNER_OPERATIONS: ['productId', 'category', 'brand', 'label'],
        BANNER_GROUP_VIEW: [],
        INTERNAL_BANNER_GROUP: ['banners'],
        USER_CHANGE: [],
        PROMOTION: [
          'title',
          'url',
          'mUrl',
          'image',
          'mImage',
          'startDate',
          'endDate',
          'categories',
          'brands',
          'labels',
          'productIds',
          'publishTime',
        ],
        SEARCH: [
          'query',
          'type',
          'ordering',
          'filters',
          'trigger',
          'service',
          'mode',
        ],
        FILTER: ['productId', 'categories', 'brands', 'sizes', 'prices'],
        COUPON: [],
        JOURNEY: ['step', 'answer', 'instanceId'],
        WISHLIST: ['productId', 'favoritesList'],
        PERSONA_QUIZ: ['answers', 'instanceId'],
        GAMIFICATION: ['type', 'record', 'used'],
      },
      segmentifyApiUrl: '//gandalf.segmentify.com/',
      segmentifyQaApiUrl: '//gandalf-qa.segmentify.com',
      segmentifyCDNUrl: '//cdn.segmentify.com/',
      jQueryUrl: '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
      paUrl: 'https://cdn.sgmntfy.com/pa.js',
      dataLayer: 'sgfLayer',
      consumeDataLayer: true,
      dataLayerConfig: {},
      categoryHierarchy: false,
      disableNextPage: false,
      language: 'EN',
      currency: '',
      region: '',
      pushInfo: {
        dataCenter: '',
        qaDataCenter: 'https://gimli-qa.segmentify.com/',
        promptInteraction: '',
      },
      ga: {
        groupCookie: '__SegmentifyGroup__',
        group: undefined,
        tracker: 'window.ga',
        tracker4: 'window.gtag',
        trackerName: undefined,
        activated: false,
        enabled: false,
        ga4: false,
        activateTryCount: 100,
        activateTriedCount: 0,

        // current state
        activeGroup: undefined,
        activePage: undefined,

        // groups
        groups: {
          control: 'SGM-CG',
          groupA: 'SGM-GA',
          groupB: 'SGM-GB',
          unknown: 'SGM-UN',
        },

        // update dimension names for integration
        dimensions: {
          sgmGroup: undefined,
          sgmUser: undefined,
          sgmSession: undefined,
          sgmPage: undefined,
          sgmWidget: undefined,
          sgmProduct: undefined,
        },
      },
      doNotTrack: false,
    },
    // Data Loaders
    _loadJavascript: function (url, async, onload) {
      // Load the script
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = async;
      if (onload && typeof onload === 'function') {
        if (typeof script.onreadystatechange !== 'undefined')
          script.onreadystatechange = function () {
            if (
              this.readyState === 'loaded' ||
              this.readyState === 'complete'
            ) {
              onload();
              script.onreadystatechange = null;
            }
          };
        else script.onload = onload;
      }
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
      return script;
    },
    _loadCSS: function (url, onload) {
      // Load css file
      var link = document.createElement('link');
      link.type = 'text/css';
      if (_SgmntfY_._variables.cssPreload) {
        link.rel = 'preload';
        link.as = 'style';
      } else {
        link.rel = 'stylesheet';
      }
      link.media = 'screen';
      if (onload && typeof onload === 'function') {
        if (typeof link.onreadystatechange !== 'undefined')
          link.onreadystatechange = function () {
            if (
              this.readyState === 'loaded' ||
              this.readyState === 'complete'
            ) {
              onload();
              link.onreadystatechange = null;
            }
          };
        else link.onload = onload;
      }
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
      return link;
    },
    _sgfPopupCloseHandler: function (isPopupClose, requestData) {
      if (
        isPopupClose === false ||
        _SgmntfY_._jbOverFlowOperations._journeyFinished(requestData)
      ) {
        // the function runs after popup closed that has "seg-popup-close" class
        _SgmntfY_._jbOverFlowOperations._enableBodyOverFlowForJBWrapper();
        _SgmntfY_._jbTriggerButtonReEnable();
        window.setTimeout(function () {
          var jbWrapperEl = document.querySelector(
            _SgmntfY_._variables.journey.wrapperSelector,
          );
          if (jbWrapperEl) {
            jbWrapperEl.parentNode.removeChild(jbWrapperEl);
          }
        }, 500);
      }
    },
    // response actions
    _actions: {
      _notificationWindow: function (params) {
        // vertical top middle bottom
        // horizontal left center right
        var config = {
          title: params['notificationTitle'],
          vertical: 'middle',
          horizontal: 'center',
        };
        var title = params.notificationTitle;
        switch (params['windowPosition']) {
          case 'top':
            config['vertical'] = 'top';
            break;
          case 'bottom':
            config['vertical'] = 'bottom';
            break;
          case 'left':
            config['horizontal'] = 'left';
            break;
          case 'right':
            config['horizontal'] = 'right';
            break;
          case 'top-left':
            config['vertical'] = 'top';
            config['horizontal'] = 'left';
            break;
          case 'top-right':
            config['vertical'] = 'top';
            config['horizontal'] = 'right';
            break;
          case 'bottom-left':
            config['vertical'] = 'bottom';
            config['horizontal'] = 'left';
            break;
          case 'bottom-right':
            config['vertical'] = 'bottom';
            config['horizontal'] = 'right';
            break;
        }

        var outerHtml = _SgmntfY_._getJq()(
          '<div class="seg-popup seg-[[vertical]]-[[horizontal]] segFadeInUp fancybox-segmentify"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        );
        var notificationBody = _SgmntfY_
          ._getJq()('<div class="fancybox-body" />')
          .appendTo(outerHtml.find('.fancybox-inner'));
        if (params.html instanceof _SgmntfY_._getJq())
          notificationBody.append(params.html);
        else notificationBody.html(params.html);
        var button_overlay = _SgmntfY_
          ._getJq()('<div />')
          .appendTo(notificationBody);
        var buttons = params.buttons || [];
        for (var i = 0; i < buttons.length; i++) {
          _SgmntfY_
            ._getJq()(
              '<button data-newWindow="' +
                buttons[i].newWindow +
                '" data-target="' +
                buttons[i].buttonUrl +
                '" class="fancybox-button ' +
                buttons[i].buttonColor +
                '">' +
                buttons[i].buttonTitle +
                '</button>',
            )
            .appendTo(button_overlay);
        }
        if (params.windowStyle === 'seamless') {
          if (title)
            _SgmntfY_
              ._getJq()(
                '<div class="overlay-area-title" ><span>' +
                  title +
                  '</span></div>',
              )
              .appendTo(notificationBody);
          button_overlay.addClass('overlay-area-buttons').addClass('right');
          title = null;
        }
        if (params.isModal === 'false') {
          _SgmntfY_
            ._getJq()('<span class="seg-popup-close"></span>')
            .appendTo(outerHtml);
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(outerHtml.prop('outerHTML'), config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        if (params.overlay === 'true') {
          _SgmntfY_
            ._getJq()('<div class="seg-popup-overlay"></div>')
            .prependTo(_SgmntfY_._getJq()('body'));
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }
        if (params.isModal === 'false') {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-popup-close')
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              $this
                .parent('.seg-popup')
                .removeClass('segFadeInUp')
                .addClass('segFadeOutDown');
              window.setTimeout(function () {
                $this.parent('.seg-popup').remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, 1000);
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'close',
                instanceId: params['instanceId'],
                interactionId: params['instanceId'],
              });
            });
        }
        params.cssCode &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(params.cssCode)
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          params.javascriptCode && eval(params.javascriptCode);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing javascript code: ' + err,
          );
        }
        if (_SgmntfY_._getJq()('.seg-popup').find('form')) {
          var $inner = _SgmntfY_._getJq()('.seg-popup .fancybox-body');
          var $form = $inner.find('form').eq(0);
          $form.bind('submit', function (event) {
            event.preventDefault();
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              'Popup Form button click for actionId: ' + params['actionId'],
            );
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'submit',
              interactionId: params['formName'],
              instanceId: params['instanceId'],
            });
            _SgmntfY_._variables.segmentifyObj('user:form', {
              formName: params['formName'],
              fields: $form.sgmSerializeForm(),
            });
            $inner.html(params['successHtml']);
            setTimeout(function () {
              $inner
                .parents('.seg-popup')
                .removeClass('segFadeInUp')
                .addClass('segFadeOutDown');
              $inner.parents('.seg-popup').remove();
              _SgmntfY_._getJq()('.seg-popup-overlay').remove();
            }, 1000);
          });
        }
        // bind buttons
        var redirectFn = function (buttonObj) {
          var actualRedirectFn = function (buttonObj, target) {
            window.open(buttonObj.data('target'), target);
            buttonObj
              .parents('.seg-popup')
              .removeClass('segFadeInUp')
              .addClass('segFadeOutDown');
            window.setTimeout(function () {
              buttonObj.parent('.seg-popup').remove();
              _SgmntfY_._getJq()('.seg-popup-overlay').remove();
            }, 1000);
          };
          if (
            buttonObj.data('newwindow') === 'true' ||
            buttonObj.data('newwindow') === true
          )
            actualRedirectFn(buttonObj, '_blank');
          else
            setTimeout(function () {
              actualRedirectFn(buttonObj, '_self');
            }, _SgmntfY_._variables.constants.redirectDelay);
        };
        _SgmntfY_
          ._getJq()('.seg-popup .fancybox-button')
          .click(function () {
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              'Notification Window button click for actionId: ' +
                params['actionId'],
            );
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              interactionId: _SgmntfY_._getJq()(this).text(),
              instanceId: params['instanceId'],
            });
            redirectFn(_SgmntfY_._getJq()(this));
          });
        // bind click handler
        _SgmntfY_
          ._getJq()('.seg-popup a img')
          .bind('click', function () {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              instanceId: params['instanceId'],
              interactionId: params['instanceId'],
            });
          });
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: params['instanceId'],
          interactionId: params['instanceId'],
        });
      },
      notificationBanner: function (params) {
        // initialize buttons by parsing json string
        var buttons = [];
        try {
          if (params['buttons']) buttons = JSON.parse(params['buttons']);
        } catch (exception) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Cannot parse buttons json, str: ' + params['buttons'],
          );
          buttons = [];
        }
        params.buttons = buttons;
        params.html = _SgmntfY_._getJq()(
          '<div><a href="' +
            params.redirectUrl +
            '"><img id="sgm_img" src="' +
            params.imageUrl +
            '"></a></div>',
        );
        _SgmntfY_._actions._notificationWindow(params);
      },
      notificationMessage: function (params) {
        // initialize buttons by parsing json string
        var buttons = [];
        try {
          if (params['buttons']) buttons = JSON.parse(params['buttons']);
        } catch (exception) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Cannot parse buttons json, str: ' + params['buttons'],
          );
          buttons = [];
        }
        params.html = params.notificationText;
        params.buttons = buttons;
        _SgmntfY_._actions._notificationWindow(params);
      },
      visitorForm: function (params) {
        function checkSelectorAndRender() {
          var params = this.params;
          var selectorCount = this.selectorCount;
          // get target selector into a variable
          var targetElement = params.selector;

          // if target selector is not defined or does not exist in the page, retry
          if (!targetElement || !_SgmntfY_._getJq()(targetElement).length) {
            // insert log
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in finding target element[' +
                target +
                '], element does not exist',
            );
            if (
              selectorCount <
              _SgmntfY_._variables.constants.recommendationSelectorFindLimit
            ) {
              ++this.selectorCount;
              var binded = checkSelectorAndRender.bind(this);
              setTimeout(binded, 100);
            }
          } else {
            try {
              targetElement
                .addClass('sgm-recommendation sgm-clearcss')
                .html(params.formHtml);
              var $form = targetElement.find('form').eq(0);
              $form.submit(function (event) {
                event.preventDefault();
                _SgmntfY_.LOG_MESSAGE(
                  'DEBUG',
                  'In-page Form button click for actionId: ' +
                    params['actionId'],
                );
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'submit',
                  interactionId: params['formName'],
                  instanceId: params['instanceId'],
                });
                _SgmntfY_._variables.segmentifyObj('user:form', {
                  formName: params['formName'],
                  fields: $form.sgmSerializeForm(),
                });
                setTimeout(function () {
                  targetElement.html(params['successHtml']);
                }, 1000);
              });
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'ERROR',
                'Error in filling target element[' +
                  params.selector +
                  '] with visitor form: ' +
                  err,
              );
            }
          }
        }

        switch (params.actionType) {
          case 'INPAGE_WIDGET': {
            var binded_context = checkSelectorAndRender.bind({
              params: params,
              selectorCount: 1,
            });
            binded_context();
            break;
          }
          case 'POPUP_WINDOW':
          default: {
            params.html = params.formHtml;
            _SgmntfY_._actions._notificationWindow(params);
            break;
          }
        }
      },
      recommendProducts: function (params, request) {
        var previousMetadata = {
          productId: request.originalParams.productId,
          productUrl: request.originalParams.productUrl,
          instanceId: params.instanceId,
        };

        function dynamicItemKey(item) {
          var key = item['recommendationSource'];
          if (
            typeof item['timeFrame'] !== 'undefined' &&
            _SgmntfY_._isNotEmpty(item['timeFrame'])
          ) {
            key += '|' + item['timeFrame'];
            if (
              typeof item['score'] !== 'undefined' &&
              _SgmntfY_._isNotEmpty(item['score'])
            ) {
              key += '|' + item['score'];
            }
          }
          return key;
        }

        function checkDynamicItemCount(items, itemKey) {
          for (var i = 0; i < items.length; ++i) {
            if (dynamicItemKey(items[i]) === itemKey) {
              return items[i].itemCount;
            }
          }
          return null;
        }

        //check product function.
        //return true is product exists
        function checkProductInList(list, id) {
          for (var innerProd = 0; innerProd < list.length; innerProd++) {
            if (list[innerProd].productId == id) return true;
          }
          return false;
        }

        function checkSelectorAndRender() {
          var params = this.params;
          var selectorCount = this.selectorCount;
          // get target selector into a variable
          var target = params.selector;

          // if target selector is not defined or does not exist in the page, retry
          if (!target || !_SgmntfY_._getJq()(target).length) {
            // insert log
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in finding target element[' +
                target +
                '], element does not exist',
            );
            if (
              selectorCount <
              _SgmntfY_._variables.constants.recommendationSelectorFindLimit
            ) {
              ++this.selectorCount;
              var binded = checkSelectorAndRender.bind(this);
              setTimeout(binded, 100);
            }
          } else {
            var renderIdx = 0;
            var reConf = {
              title: notificationTitle,
              products: productList,
              index: function () {
                return ++renderIdx;
              },
              discount: function () {
                try {
                  var price = this.price;
                  var oldPrice = this.oldPrice;

                  if (!price || !oldPrice || price == oldPrice) return null;

                  var discountRatio = 100 - (price * 100) / oldPrice;

                  return discountRatio > 0 && Math.round(discountRatio);
                } catch (err) {
                  // if any error occurs return null
                  return null;
                }
              },
              commaFormatPrice: function () {
                return this.toFixed(2).toString().replace(/\./g, ',');
              },
              dotFormatPrice: function () {
                return this.toFixed(2).toString();
              },
            };

            var getProductCardPart = function (part) {
              try {
                var design = JSON.parse(params.productCardDesign);
                switch (part) {
                  case 'html':
                    return design.html;
                  case 'css':
                    return design.css;
                  case 'prejs':
                    return design.prejs;
                  case 'postjs':
                    return design.postjs;
                  default:
                    return null;
                }
              } catch (err) {
                _SgmntfY_.LOG_MESSAGE(
                  'WARN',
                  'Error in executing product card code: ' + err,
                );
              }
            };

            try {
              if (params.preJsCode) {
                eval(params.preJsCode);
                var retVal = preRenderConf(reConf);
                if (typeof retVal !== 'undefined' && !retVal) {
                  _SgmntfY_.LOG_MESSAGE(
                    'WARN',
                    'preRenderConf returned false exiting!',
                  );
                  return;
                }
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'impression',
                  interactionId: params['actionId'],
                  instanceId: params['instanceId'],
                });
                _SgmntfY_.GA.sendWidgetImpression(params['instanceId']);
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product recommendation pre js code: ' + err,
              );
            }

            var productCardPreJs = getProductCardPart('prejs');
            try {
              if (productCardPreJs) {
                eval(productCardPreJs);
                var retVal = preRenderConf(reConf);
                if (typeof retVal !== 'undefined' && !retVal) {
                  _SgmntfY_.LOG_MESSAGE(
                    'WARN',
                    'preRenderConf returned false exiting!',
                  );
                  return;
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product card pre js code: ' + err,
              );
            }

            // check if the account is freemium/brand is enabled
            if (reConf['brandingEnabled']) {
              // if branding is enabled add "recommended by Segmentify" into to recommendation title
              reConf.title +=
                '<a target="_blank" class="seg-rec-logo" href="//www.segmentify.com">Recommended by <img src="//cdn.segmentify.com/images/sgm-logo.svg" /></a>';
            }

            var recoTemplate = params.recommendationTemplate;

            // if product card design is defined, replace the product card part in the recommendation template
            var productCardHtml = getProductCardPart('html');
            if (productCardHtml) {
              var productCardPattern =
                /\[\[#products\]\](.*?)\[\[\/products\]\]/s;
              recoTemplate = recoTemplate.replace(
                productCardPattern,
                `[[#products]]${productCardHtml}[[/products]]`,
              );
            }

            // render products with the given template
            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(recoTemplate, reConf);

            if (params['cssCode'])
              _SgmntfY_
                ._getJq()('<style />')
                .html(params['cssCode'])
                .prependTo(_SgmntfY_._getJq()('body'));

            if (getProductCardPart('css'))
              _SgmntfY_
                ._getJq()('<style />')
                .html(getProductCardPart('css'))
                .prependTo(_SgmntfY_._getJq()('body'));

            try {
              // get target element as jQuery object
              var targetElement = _SgmntfY_._getJq()(target).first();

              // put rendered recommendation HTML into the target
              if (params.insertType === 'SELF') {
                targetElement.html(renderedHtml);
                if (wvCB) {
                  wvCB(targetElement);
                }
              } else {
                var $div = _SgmntfY_._getJq()('<div/>', {
                  class: 'seg-reco-wrapper seg-clear',
                });
                if (
                  params.insertType === 'AFTER' ||
                  params.insertType === 'BEFORE'
                ) {
                  params.insertType === 'AFTER'
                    ? $div.html(renderedHtml).insertAfter(targetElement)
                    : $div.html(renderedHtml).insertBefore(targetElement);
                } else if (
                  params.insertType === 'APPEND' ||
                  params.insertType === 'PREPEND'
                ) {
                  params.insertType === 'APPEND'
                    ? $div.html(renderedHtml).appendTo(targetElement)
                    : $div.html(renderedHtml).prependTo(targetElement);
                }
                if (wvCB) {
                  wvCB($div);
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in filling target element[' +
                  target +
                  '] with product recommendations: ' +
                  err,
              );
            }

            try {
              params.postJsCode && eval(params.postJsCode);
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product recommendation post js code: ' +
                  err,
              );
            }

            var productCardPostJs = getProductCardPart('postjs');
            try {
              if (productCardPostJs) eval(productCardPostJs);
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product card post js code: ' + err,
              );
            }

            _SgmntfY_._bindRecommendationTrackEvents(
              params.insertType === 'SELF' ? targetElement : $div,
              params.recommendationSettings,
              params.instanceId,
              0,
            );
          }
        }

        // calculate product list from response
        var productList = [];
        var recommendedProducts = params.recommendedProducts || {};
        var dynamicItems = JSON.parse(params.dynamicItems) || [];

        var recoVersion = params['version'] || 'v1';
        if (recoVersion === 'v1') {
          if (params.ordering === 'SHUFFLE') {
            function allNull(arr) {
              for (var i in arr) {
                if (arr.hasOwnProperty(i)) {
                  if (arr[i] !== undefined || arr[i] !== null) {
                    return false;
                  }
                }
              }
              return true;
            }

            function arrayRandom() {
              return parseInt(Math.random() * 100);
            }

            function randomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            }

            var itemCounts = [];
            var dynamicLengths = [];
            for (var idx in dynamicItems) {
              if (dynamicItems.hasOwnProperty(idx)) {
                itemCounts.push(parseInt(dynamicItems[idx]['itemCount'] || 0));
                var source = dynamicItemKey(dynamicItems[idx]);
                if (recommendedProducts.hasOwnProperty(source))
                  dynamicLengths.push(recommendedProducts[source].length);
                else dynamicLengths.push(0);
              }
            }
            var firstLevel = [];
            var firstLevelTotal = itemCounts.reduce(function (a, b) {
              return a + b;
            }, 0);
            for (idx in itemCounts) {
              if (itemCounts.hasOwnProperty(idx)) {
                var _idx = parseInt(idx);
                if (_idx === itemCounts.length - 1) {
                  firstLevel.push(100);
                } else {
                  var pct = parseInt((itemCounts[idx] / firstLevelTotal) * 100);
                  if (_idx === 0) firstLevel.push(pct);
                  else firstLevel.push(firstLevel[firstLevel.length - 1] + pct);
                }
              }
            }
            var secondLevel = [];
            for (var dl in dynamicLengths) {
              if (dynamicLengths.hasOwnProperty(dl)) {
                var len = dynamicLengths[dl];
                var sumOfSquares = (len * (len + 1) * (2 * len + 1)) / 6;
                var tmpArr = [];
                for (var l = len; l > 0; --l) {
                  if (l === 1) {
                    tmpArr.push(100);
                  } else {
                    pct = parseInt((Math.pow(l, 2) / sumOfSquares) * 100);
                    if (l === len) tmpArr.push(pct);
                    else tmpArr.push(tmpArr[tmpArr.length - 1] + pct);
                  }
                }
                secondLevel.push(tmpArr);
              }
            }
            var dynamicProducts = [];
            var iteration = 0;
            while (true) {
              // break under these conditions
              if (++iteration > 10000) {
                break;
              }
              if (dynamicProducts.length >= firstLevelTotal) {
                break;
              }
              var allNullCheck = true;
              for (idx in dynamicItems) {
                if (dynamicItems.hasOwnProperty(idx)) {
                  source = dynamicItemKey(dynamicItems[idx]);
                  var tmpCheck = true;
                  if (recommendedProducts.hasOwnProperty(source)) {
                    tmpCheck = allNull(recommendedProducts[source]);
                  }
                  if (!tmpCheck) {
                    allNullCheck = false;
                    break;
                  }
                }
              }
              if (allNullCheck) {
                break;
              }
              // search for products
              var rand = arrayRandom();
              var firstLevelIndex = -1;
              for (var fl in firstLevel) {
                if (firstLevel.hasOwnProperty(fl)) {
                  if (rand < firstLevel[fl]) {
                    firstLevelIndex = parseInt(fl);
                    break;
                  }
                }
              }
              if (
                firstLevelIndex === -1 ||
                !dynamicItems.hasOwnProperty(firstLevelIndex.toString())
              ) {
                continue;
              }
              source = dynamicItemKey(dynamicItems[firstLevelIndex]);
              rand = arrayRandom();
              var secondLevelIndex = -1;
              for (var sl in secondLevel[firstLevelIndex]) {
                if (secondLevel[firstLevelIndex].hasOwnProperty(sl)) {
                  if (rand < secondLevel[firstLevelIndex][sl]) {
                    secondLevelIndex = parseInt(sl);
                    break;
                  }
                }
              }
              if (
                secondLevelIndex === -1 ||
                !recommendedProducts[source].hasOwnProperty(
                  secondLevelIndex.toString(),
                )
              ) {
                continue;
              }
              var candidate = recommendedProducts[source].splice(
                secondLevelIndex,
                1,
              )[0];
              if (candidate == null) {
                continue;
              }
              recommendedProducts[source].splice(secondLevelIndex, 0, null);

              var eliminationFuncRetVal = false;
              if (params.eliminationFunction) {
                var func = _SgmntfY_._getObjectByString(
                  window,
                  params.eliminationFunction,
                );
                if (typeof func === 'function') {
                  try {
                    eliminationFuncRetVal = func.call(null, candidate);
                  } catch (err) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Error in executing product recommendation elimination js function: ' +
                        err,
                    );
                  }
                }
              }
              // if eliminated, continue loop
              if (eliminationFuncRetVal) {
                continue;
              }

              candidate.name = _SgmntfY_._decodeHtml(candidate.name);

              var sourceLastVisited =
                'RECOMMENDATION_SOURCE_LAST_VISITED' ===
                  dynamicItems[firstLevelIndex]['recommendationSource'] ||
                'RECOMMENDATION_EVENT_DATA' ===
                  dynamicItems[firstLevelIndex]['recommendationSource'];
              switch (params.elimination) {
                case 'ELIMINATE_DUPLICATES':
                case 'ELIMINATE_PREVIOUS':
                  if (!checkProductInList(productList, candidate.productId)) {
                    if (
                      sourceLastVisited ||
                      !_SgmntfY_._containsRecommendedProduct(
                        candidate.productId,
                      ) ||
                      _SgmntfY_._variables.offerRecommendedProducts
                    ) {
                      productList.push(candidate);
                      dynamicProducts.push(candidate);
                      if (!sourceLastVisited) {
                        _SgmntfY_._addRecommendedProduct(candidate.productId);
                      }
                    }
                  }
                  break;
                case 'NO_ELIMINATION':
                default:
                  productList.push(candidate);
                  dynamicProducts.push(candidate);
                  if (!sourceLastVisited) {
                    _SgmntfY_._addRecommendedProduct(candidate.productId);
                  }
                  break;
              }
            }
            //add static items randomly
            for (
              var i = 0;
              i <
              recommendedProducts['RECOMMENDATION_SOURCE_STATIC_ITEMS'].length;
              ++i
            ) {
              var elm =
                recommendedProducts['RECOMMENDATION_SOURCE_STATIC_ITEMS'][i];
              if (!checkProductInList(productList, elm.productId)) {
                productList.splice(randomInt(0, productList.length), 0, elm);
              }
            }
          } else {
            var missingCount = 0;
            /* add static items */
            for (
              var i = 0;
              i <
              recommendedProducts['RECOMMENDATION_SOURCE_STATIC_ITEMS'].length;
              ++i
            ) {
              var elm =
                recommendedProducts['RECOMMENDATION_SOURCE_STATIC_ITEMS'][i];
              if (!checkProductInList(productList, elm.productId)) {
                productList.push(elm);
              }
            }
            /* add dynamic items */
            for (var ri = 0; ri < dynamicItems.length; ++ri) {
              var curRecommendationSource = dynamicItemKey(dynamicItems[ri]);
              var curCatItemCount = parseInt(
                checkDynamicItemCount(dynamicItems, curRecommendationSource),
              );
              if (isNaN(curCatItemCount)) {
                curCatItemCount = 0;
              }

              if (
                recommendedProducts.hasOwnProperty(curRecommendationSource) &&
                curCatItemCount
              ) {
                missingCount += curCatItemCount;
                var index = 0;
                for (
                  var i = 0;
                  i < recommendedProducts[curRecommendationSource].length;
                  ++i
                ) {
                  var elm = recommendedProducts[curRecommendationSource][i];

                  elm.name = _SgmntfY_._decodeHtml(elm.name);

                  if (index >= curCatItemCount && missingCount === 0) {
                    break;
                  }

                  var eliminationFnRetVal = false;
                  if (params.eliminationFunction) {
                    var fx = _SgmntfY_._getObjectByString(
                      window,
                      params.eliminationFunction,
                    );
                    if (typeof fx === 'function') {
                      try {
                        eliminationFnRetVal = fx.call(null, elm);
                      } catch (err) {
                        _SgmntfY_.LOG_MESSAGE(
                          'WARN',
                          'Error in executing product recommendation elimination js function: ' +
                            err,
                        );
                      }
                    }
                  }

                  // if eliminated, continue loop
                  if (eliminationFnRetVal) {
                    continue;
                  }

                  var sourceLastVisited =
                    'RECOMMENDATION_SOURCE_LAST_VISITED' ===
                      dynamicItems[ri].recommendationSource ||
                    'RECOMMENDATION_EVENT_DATA' ===
                      dynamicItems[ri].recommendationSource;
                  switch (params.elimination) {
                    case 'ELIMINATE_DUPLICATES':
                    case 'ELIMINATE_PREVIOUS':
                      if (!checkProductInList(productList, elm.productId)) {
                        if (
                          sourceLastVisited ||
                          !_SgmntfY_._containsRecommendedProduct(
                            elm.productId,
                          ) ||
                          _SgmntfY_._variables.offerRecommendedProducts
                        ) {
                          productList.push(elm);
                          if (!sourceLastVisited) {
                            _SgmntfY_._addRecommendedProduct(elm.productId);
                          }
                          ++index;
                          --missingCount;
                        }
                      }
                      break;
                    case 'NO_ELIMINATION':
                    default:
                      productList.push(elm);
                      if (!sourceLastVisited) {
                        _SgmntfY_._addRecommendedProduct(elm.productId);
                      }
                      ++index;
                      --missingCount;
                      break;
                  }
                }
              }
            }
          }
        } else if (recoVersion === 'v3') {
          if (recommendedProducts.length) {
            // static products
            var staticProducts = recommendedProducts[0] || [];
            for (var i = 0; i < staticProducts.length; ++i) {
              var elm = staticProducts[i];
              if (!checkProductInList(productList, elm.productId)) {
                productList.push(elm);
              }
            }
            // dynamic products
            var missingCount = 0;
            for (var ri = 1; ri < recommendedProducts.length; ++ri) {
              var dynamicItem = dynamicItems[ri - 1];
              var curCatItemCount = parseInt(dynamicItem['itemCount']);
              if (isNaN(curCatItemCount)) {
                curCatItemCount = 0;
              }
              if (curCatItemCount) {
                missingCount += curCatItemCount;
                var index = 0;
                for (var i = 0; i < recommendedProducts[ri].length; ++i) {
                  var elm = recommendedProducts[ri][i];

                  elm.name = _SgmntfY_._decodeHtml(elm.name);

                  if (index >= curCatItemCount && missingCount === 0) {
                    break;
                  }

                  var sourceLastVisited =
                    'RECOMMENDATION_SOURCE_LAST_VISITED' ===
                      dynamicItem['recommendationSource'] ||
                    'RECOMMENDATION_EVENT_DATA' ===
                      dynamicItem['recommendationSource'];
                  switch (params['elimination']) {
                    case 'ELIMINATE_DUPLICATES':
                    case 'ELIMINATE_PREVIOUS':
                      if (!checkProductInList(productList, elm.productId)) {
                        if (
                          sourceLastVisited ||
                          !_SgmntfY_._containsRecommendedProduct(
                            elm.productId,
                          ) ||
                          _SgmntfY_._variables.offerRecommendedProducts
                        ) {
                          productList.push(elm);
                          if (!sourceLastVisited) {
                            _SgmntfY_._addRecommendedProduct(elm.productId);
                          }
                          ++index;
                          --missingCount;
                        }
                      }
                      break;
                    case 'NO_ELIMINATION':
                    default:
                      productList.push(elm);
                      if (!sourceLastVisited) {
                        _SgmntfY_._addRecommendedProduct(elm.productId);
                      }
                      ++index;
                      --missingCount;
                      break;
                  }
                }
              }
            }
          }
        }

        var notificationTitleMap = JSON.parse(
          params['notificationTitleMap'] || '{}',
        );
        var notificationTitle =
          notificationTitleMap[request.data.lang] || params.notificationTitle;
        if (productList.length === 0) {
          if (
            params['actionType'] === 'CALLBACK' &&
            request.recommendationCallback
          ) {
            request.recommendationCallback(
              notificationTitle,
              [],
              previousMetadata,
              null,
            );
          }
          return;
        } /* else if (params.ordering == 'SHUFFLE') {
          productList = _SgmntfY_._shuffle(productList);
        }*/

        if (
          params['actionType'] !== 'INPAGE_WIDGET' &&
          params['actionType'] !== 'POPUP_RECO'
        ) {
          _SgmntfY_._variables.segmentifyObj('event:interaction', {
            type: 'impression',
            interactionId: params['actionId'],
            instanceId: params['instanceId'],
          });
          _SgmntfY_.GA.sendWidgetImpression(params['instanceId']);
        }
        var wvInteractionId = params['interactionId'];
        var wvInstanceId = params['instanceId'];
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: wvInteractionId,
              instanceId: wvInstanceId,
            });
            _SgmntfY_.GA.sendWidgetView(params['instanceId']);
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._variables.segmentifyObj('event:interaction', {
                    type: 'widget-view',
                    interactionId: wvInteractionId,
                    instanceId: wvInstanceId,
                  });
                  _SgmntfY_.GA.sendWidgetView(params['instanceId']);
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };
        switch (params.actionType) {
          case 'CALLBACK': {
            if (request.recommendationCallback) {
              request.recommendationCallback(
                notificationTitle,
                productList,
                previousMetadata,
                wvCB,
              );
            }
            break;
          }
          case 'INPAGE_WIDGET': {
            var binded_context = checkSelectorAndRender.bind({
              params: params,
              selectorCount: 1,
            });
            binded_context();
            break;
          }
          case 'JAVASCRIPT_FUNCTION': {
            // call javascript function
            var fx = _SgmntfY_._getObjectByString(window, params.jsFunction);
            if (typeof fx === 'function') {
              try {
                fx.call(
                  null,
                  notificationTitle,
                  productList,
                  previousMetadata,
                  wvCB,
                );
              } catch (err) {
                _SgmntfY_.LOG_MESSAGE(
                  'WARN',
                  'Error in executing product recommendation js function: ' +
                    err,
                );
              }
            } else {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Product Recommendation javascript function(' +
                  params.jsFunction +
                  ') does not exist',
              );
            }

            break;
          }
          case 'POPUP_RECO': {
            var title = '';
            var language = request['data']['lang'];

            var isSingleLanguage =
              params['notificationTitle'] && params['notificationTitle'] !== ''
                ? params['notificationTitle']
                : notificationTitle || '';
            var isMultiLanguage =
              params['notificationTitleMap'] &&
              params['notificationTitleMap'] !== '';

            if (isMultiLanguage) {
              title = JSON.parse(params['notificationTitleMap'])[language];
            } else {
              title = isSingleLanguage;
            }

            var config = {
              title: title,
              vertical: params['verticalPosition'],
              horizontal: params['horizontalPosition'],
              button: _SgmntfY_._jbGetButtonText('DELIVERY'),
            };

            var isJourney =
              _SgmntfY_._jbOverFlowOperations._journeyFinished(request);
            if (isJourney === false && productList.length < 3) {
              return;
            }

            var campaignType = params['type'];

            config['products'] = productList;
            try {
              if (params['preJsCode']) {
                eval(params['preJsCode']);
                var retVal = preRenderConf(config);
                if (typeof retVal !== 'undefined' && !retVal) {
                  _SgmntfY_.LOG_MESSAGE(
                    'WARN',
                    'preRenderConf returned false exiting!',
                  );
                  return;
                }
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'impression',
                  interactionId: params['actionId'],
                  instanceId: params['instanceId'],
                });
                _SgmntfY_.GA.sendWidgetImpression(params['instanceId']);
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing campaign pre js code: ' + err,
              );
            }
            var _products = [];
            var _productId = '';
            if (request.originalParams && request.originalParams['params']) {
              _productId = request.originalParams['params']['productId'] || '';
            }
            for (var i = 0; i < config['products'].length; ++i) {
              if (
                isJourney === false &&
                _products.length === 3 &&
                campaignType !== 'POPUP_BUILDER'
              ) {
                break;
              }
              var _product = config['products'][i];
              if (_product['productId'] !== _productId) {
                _products.push(_product);
              }
            }
            if (
              isJourney === false &&
              _products.length !== 3 &&
              campaignType !== 'POPUP_BUILDER'
            ) {
              return;
            }
            config['products'] = _products;
            // render campaign html
            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(params['recommendationTemplate'], config);

            if (campaignType === 'POPUP_BUILDER') {
              //Popup Builder implementation
              params.html = renderedHtml;
              _SgmntfY_._campaigns.POPUP_BUILDER(params);
            } else {
              //Default Popup reco implementation
              _SgmntfY_._getJq()('body').prepend(renderedHtml);
              params['cssCode'] &&
                _SgmntfY_
                  ._getJq()('<style />')
                  .html(params['cssCode'])
                  .prependTo(_SgmntfY_._getJq()('body'));
              _SgmntfY_._jbDeliveryOnBindEventHandler();

              // overlay
              if (params['overlay'] === 'true') {
                _SgmntfY_._getJq()('.seg-popup-overlay').show();
              }
              // bind close handler
              _SgmntfY_
                ._getJq()('.seg-popup-close')
                .bind('click', function () {
                  var $this = _SgmntfY_._getJq()(this);
                  $this
                    .parent('.seg-popup')
                    .removeClass('segFadeInUp')
                    .addClass('segFadeOutDown');
                  window.setTimeout(function () {
                    _SgmntfY_._sgfPopupCloseHandler(true, request);
                    $this.parent('.seg-popup').remove();
                    _SgmntfY_._getJq()('.seg-popup-overlay').remove();
                  }, 1000);
                });
            }

            try {
              params['postJsCode'] && eval(params['postJsCode']);
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing campaign post js code: ' + err,
              );
            }
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: params['interactionId'],
              instanceId: params['instanceId'],
            });
            _SgmntfY_.GA.sendWidgetView(params['instanceId']);
            break;
          }
          case 'WEB_NOTIFICATION':
          case 'SEND_MAIL':
            // server side action
            break;
          case 'POPUP_WINDOW':
          default: {
            break;
          }
        }
      },
      recommendPromotion: function (params, request) {
        var metadata = {
          title: params['notificationTitle'],
        };

        function checkDynamicItemCount(items, item) {
          for (var i = 0; i < items.length; ++i) {
            if (
              items[i].recommendationSource +
                '|' +
                items[i].timeFrame +
                '|' +
                items[i].score ===
              item
            ) {
              return items[i].itemCount;
            }
          }
          return null;
        }

        //return true if promotion exists
        function checkPromotionInList(list, code) {
          for (var innerProm = 0; innerProm < list.length; innerProm++) {
            if (list[innerProm]['code'] === code) return true;
          }
          return false;
        }

        function checkSelectorAndRender() {
          var params = this.params;
          var selectorCount = this.selectorCount;
          // get target selector into a variable
          var target = params.selector;

          // if target selector is not defined or does not exist in the page, retry
          if (!target || !_SgmntfY_._getJq()(target).length) {
            // insert log
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in finding target element[' +
                target +
                '], element does not exist',
            );
            if (
              selectorCount <
              _SgmntfY_._variables.constants.recommendationSelectorFindLimit
            ) {
              ++this.selectorCount;
              var binded = checkSelectorAndRender.bind(this);
              setTimeout(binded, 100);
            }
          } else {
            var renderIdx = 0;
            var reConf = {
              title: params['notificationTitle'],
              promotionList: promotionList,
              index: function () {
                return ++renderIdx;
              },
            };

            try {
              if (params.preJsCode) {
                eval(params.preJsCode);
                var retVal = preRenderConf(reConf);
                if (typeof retVal !== 'undefined' && !retVal) {
                  _SgmntfY_.LOG_MESSAGE(
                    'WARN',
                    'preRenderConf returned false exiting!',
                  );
                  return;
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing promotion recommendation pre js code: ' +
                  err,
              );
            }

            // check if the account is freemium/brand is enabled
            if (reConf['brandingEnabled']) {
              // if branding is enabled add "recommended by Segmentify" into to recommendation title
              reConf.title +=
                '<a target="_blank" class="seg-rec-logo" href="//www.segmentify.com">Recommended by <img src="//cdn.segmentify.com/images/sgm-logo.svg" /></a>';
            }

            // render promotions with the given template
            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(params.recommendationTemplate, reConf);

            try {
              // get target element as jQuery object
              var targetElement = _SgmntfY_._getJq()(target).first();

              // put rendered recommendation HTML into the target
              if (params.insertType === 'SELF') {
                targetElement
                  .addClass('seg-promotion-wrapper')
                  .html(renderedHtml);
                targetElement.attr('data-sgf-scenario-id', params.instanceId);
                if (wvCB) {
                  wvCB(targetElement);
                }
              } else {
                var $div = _SgmntfY_._getJq()('<div/>', {
                  class: 'seg-promotion-wrapper',
                });
                $div.attr('data-sgf-scenario-id', params.instanceId);
                if (
                  params.insertType === 'AFTER' ||
                  params.insertType === 'BEFORE'
                ) {
                  params.insertType === 'AFTER'
                    ? $div.html(renderedHtml).insertAfter(targetElement)
                    : $div.html(renderedHtml).insertBefore(targetElement);
                } else if (
                  params.insertType === 'APPEND' ||
                  params.insertType === 'PREPEND'
                ) {
                  params.insertType === 'APPEND'
                    ? $div.html(renderedHtml).appendTo(targetElement)
                    : $div.html(renderedHtml).prependTo(targetElement);
                }
                if (wvCB) {
                  wvCB($div);
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in filling target element[' +
                  target +
                  '] with promotion recommendations: ' +
                  err,
              );
            }

            try {
              params.postJsCode && eval(params.postJsCode);
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing promotion recommendation post js code: ' +
                  err,
              );
            }
            _SgmntfY_._bindRecommendationTrackEvents(
              params.insertType === 'SELF' ? targetElement : $div,
              params.recommendationSettings,
              params.instanceId,
              0,
            );
          }
        }

        // calculate promotion list from response
        var promotionList = [];
        var recommendedPromotions = params['recommendedPromotions'] || {};
        var dynamicItems = JSON.parse(params['dynamicItems']) || [];

        //put static items first
        for (
          var i = 0;
          i <
          recommendedPromotions['RECOMMENDATION_SOURCE_STATIC_ITEMS'].length;
          ++i
        ) {
          var elm =
            recommendedPromotions['RECOMMENDATION_SOURCE_STATIC_ITEMS'][i];
          if (!checkPromotionInList(promotionList, elm.code)) {
            promotionList.push(elm);
          }
        }

        var missingCount = 0;
        /* add dynamic items */
        for (var ri = 0; ri < dynamicItems.length; ++ri) {
          if (typeof dynamicItems[ri].timeFrame === 'undefined') {
            dynamicItems[ri].timeFrame = 'null';
          }
          var curRecommendationSource =
            dynamicItems[ri].recommendationSource +
            '|' +
            dynamicItems[ri].timeFrame +
            '|' +
            dynamicItems[ri].score;
          var curCatItemCount = parseInt(
            checkDynamicItemCount(dynamicItems, curRecommendationSource),
          );
          if (isNaN(curCatItemCount)) {
            curCatItemCount = 0;
          }

          if (
            recommendedPromotions.hasOwnProperty(curRecommendationSource) &&
            curCatItemCount
          ) {
            missingCount += curCatItemCount;
            var index = 0;
            for (
              var i = 0;
              i < recommendedPromotions[curRecommendationSource].length;
              ++i
            ) {
              var elm = recommendedPromotions[curRecommendationSource][i];
              elm.name = _SgmntfY_._decodeHtml(elm.name);

              if (index >= curCatItemCount && missingCount == 0) {
                break;
              }

              var eliminationFnRetVal = false;
              if (params.eliminationFunction) {
                var fx = _SgmntfY_._getObjectByString(
                  window,
                  params.eliminationFunction,
                );
                if (typeof fx === 'function') {
                  try {
                    eliminationFnRetVal = fx.call(null, elm);
                  } catch (err) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Error in executing promotion recommendation elimination js function: ' +
                        err,
                    );
                  }
                }
              }

              // if eliminated, continue loop
              if (eliminationFnRetVal) {
                continue;
              }

              switch (params.elimination) {
                case 'ELIMINATE_DUPLICATES':
                case 'ELIMINATE_PREVIOUS':
                  if (!checkPromotionInList(promotionList, elm.code)) {
                    if (
                      !_SgmntfY_._containsRecommendedPromotion(elm.code) ||
                      _SgmntfY_._variables.offerRecommendedPromotions
                    ) {
                      promotionList.push(elm);
                      _SgmntfY_._addRecommendedPromotion(elm.code);
                      ++index;
                      --missingCount;
                    }
                  }
                  break;
                case 'NO_ELIMINATION':
                default:
                  promotionList.push(elm);
                  _SgmntfY_._addRecommendedPromotion(elm.code);
                  ++index;
                  --missingCount;
                  break;
              }
            }
          }
        }

        if (promotionList.length === 0) {
          // params.actionType == CALLBACK
          if (
            params['actionType'] === 'CALLBACK' &&
            request.recommendationCallback
          ) {
            request.recommendationCallback([], metadata, null);
          }
          return;
        } else if (params.ordering === 'SHUFFLE') {
          promotionList = _SgmntfY_._shuffle(promotionList);
        }

        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          interactionId: params['actionId'],
          instanceId: params['instanceId'],
        });

        var wvInteractionId = params['interactionId'];
        var wvInstanceId = params['instanceId'];
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: wvInteractionId,
              instanceId: wvInstanceId,
            });
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._variables.segmentifyObj('event:interaction', {
                    type: 'widget-view',
                    interactionId: wvInteractionId,
                    instanceId: wvInstanceId,
                  });
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };

        switch (params['actionType']) {
          case 'CALLBACK': {
            if (request.recommendationCallback) {
              // params.actionType == CALLBACK
              request.recommendationCallback(promotionList, metadata, wvCB);
            }
            break;
          }
          case 'INPAGE_WIDGET': {
            var binded_context = checkSelectorAndRender.bind({
              params: params,
              selectorCount: 1,
            });
            binded_context();
            break;
          }
          default:
            break;
        }
      },
      recommendKeyword: function (params, request) {
        var metadata = {
          title: params['notificationTitle'],
        };

        function checkDynamicItemCount(items, item) {
          for (var i = 0; i < items.length; ++i) {
            if (
              items[i].recommendationSource + '|' + items[i].timeFrame ==
              item
            ) {
              return items[i].itemCount;
            }
          }
          return null;
        }

        //return true if promotion exists
        function checkKeywordInList(list, item) {
          for (var key = 0; key < list.length; key++) {
            if (list[key] == item) return true;
          }
          return false;
        }

        function checkSelectorAndRender() {
          var params = this.params;
          var keywordList = this.keywordList;
          var selectorCount = this.selectorCount;
          // get target selector into a variable
          var target = params.selector;

          // if target selector is not defined or does not exist in the page, retry
          if (!target || !_SgmntfY_._getJq()(target).length) {
            // insert log
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in finding target element[' +
                target +
                '], element does not exist',
            );
            if (
              selectorCount <
              _SgmntfY_._variables.constants.recommendationSelectorFindLimit
            ) {
              ++this.selectorCount;
              var binded = checkSelectorAndRender.bind(this);
              setTimeout(binded, 100);
            }
          } else {
            var keywords = [];
            for (var k = 0; k < keywordList.length; ++k) {
              keywords.push({ name: keywordList[k], url: '' });
            }

            // declare recommendation title variable
            var recoTitle = params.notificationTitle;

            var renderIdx = 0;
            var reConf = {
              title: recoTitle,
              keywords: keywords,
              index: function () {
                return ++renderIdx;
              },
            };

            try {
              if (params.preJsCode) {
                eval(params.preJsCode);
                var retVal = preRenderConf(reConf);
                if (typeof retVal !== 'undefined' && !retVal) {
                  _SgmntfY_.LOG_MESSAGE(
                    'WARN',
                    'preRenderConf returned false exiting!',
                  );
                  return;
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product recommendation pre js code: ' + err,
              );
            }

            // check if the account is freemium/brand is enabled
            //if (reConf['brandingEnabled']) {
            // if branding is enabled add "recommended by Segmentify" into to recommendation title
            //reConf.title += "<a target=\"_blank\" class=\"seg-rec-logo\" href=\"\/\/www.segmentify.com\">Recommended by <img src=\"\/\/cdn.segmentify.com/images/sgm-logo.svg\" /></a>";
            //}

            // render products with the given template
            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(params.recommendationTemplate, reConf);

            try {
              // get target element as jQuery object
              var targetElement = _SgmntfY_._getJq()(target).first();

              // put rendered recommendation HTML into the target
              if (params.insertType === 'SELF') {
                targetElement.html(renderedHtml);
                targetElement.attr('data-sgf-scenario-id', params.instanceId);
                if (wvCB) {
                  wvCB(targetElement);
                }
              } else {
                var $div = _SgmntfY_._getJq()('<div/>', {
                  class: 'seg-reco-wrapper seg-clear',
                });
                $div.attr('data-sgf-scenario-id', params.instanceId);
                if (
                  params.insertType === 'AFTER' ||
                  params.insertType === 'BEFORE'
                ) {
                  params.insertType === 'AFTER'
                    ? $div.html(renderedHtml).insertAfter(targetElement)
                    : $div.html(renderedHtml).insertBefore(targetElement);
                } else if (
                  params.insertType === 'APPEND' ||
                  params.insertType === 'PREPEND'
                ) {
                  params.insertType === 'APPEND'
                    ? $div.html(renderedHtml).appendTo(targetElement)
                    : $div.html(renderedHtml).prependTo(targetElement);
                }
                if (wvCB) {
                  wvCB($div);
                }
              }
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in filling target element[' +
                  target +
                  '] with product recommendations: ' +
                  err,
              );
            }

            try {
              params.postJsCode && eval(params.postJsCode);
            } catch (err) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in executing product recommendation post js code: ' +
                  err,
              );
            }
            _SgmntfY_._bindRecommendationTrackEvents(
              params.insertType === 'SELF' ? targetElement : $div,
              params.recommendationSettings,
              params.instanceId,
              0,
            );

            // bind click handler
            _SgmntfY_
              ._getJq()('.seg-label a')
              .on('click', function () {
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'click',
                  interactionId: params['actionId'],
                  instanceId: params['instanceId'],
                });
              });
          }
        }

        // calculate promotion list from response
        var keywordList = [];
        var recommendedKeywords = params['recommendedKeywords'] || {};
        var dynamicItems = JSON.parse(params['dynamicItems']) || [];

        //put static items first
        for (
          var i = 0;
          i < recommendedKeywords['RECOMMENDATION_SOURCE_STATIC_ITEMS'].length;
          ++i
        ) {
          var elm =
            recommendedKeywords['RECOMMENDATION_SOURCE_STATIC_ITEMS'][i];
          if (!checkKeywordInList(keywordList, elm)) {
            keywordList.push(elm);
          }
        }

        var missingCount = 0;
        /* add dynamic items */
        for (var ri = 0; ri < dynamicItems.length; ++ri) {
          if (typeof dynamicItems[ri].timeFrame === 'undefined') {
            dynamicItems[ri].timeFrame = 'null';
          }
          var curRecommendationSource =
            dynamicItems[ri].recommendationSource +
            '|' +
            dynamicItems[ri].timeFrame;
          var curCatItemCount = parseInt(
            checkDynamicItemCount(dynamicItems, curRecommendationSource),
          );
          if (isNaN(curCatItemCount)) {
            curCatItemCount = 0;
          }

          if (
            recommendedKeywords.hasOwnProperty(curRecommendationSource) &&
            curCatItemCount
          ) {
            missingCount += curCatItemCount;
            var index = 0;
            for (
              var i = 0;
              i < recommendedKeywords[curRecommendationSource].length;
              ++i
            ) {
              var elm = recommendedKeywords[curRecommendationSource][i];

              elm.name = _SgmntfY_._decodeHtml(elm.name);

              if (index >= curCatItemCount && missingCount == 0) {
                break;
              }

              keywordList.push(elm);
              ++index;
              --missingCount;
            }
          }
        }

        if (keywordList.length === 0) {
          // params.actionType == CALLBACK
          if (request.recommendationCallback) {
            request.recommendationCallback([], metadata, null);
          }
          return;
        } else if (params.ordering === 'SHUFFLE') {
          keywordList = _SgmntfY_._shuffle(keywordList);
        }

        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          interactionId: params['actionId'],
          instanceId: params['instanceId'],
        });

        var wvInteractionId = params['interactionId'];
        var wvInstanceId = params['instanceId'];
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: wvInteractionId,
              instanceId: wvInstanceId,
            });
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._variables.segmentifyObj('event:interaction', {
                    type: 'widget-view',
                    interactionId: wvInteractionId,
                    instanceId: wvInstanceId,
                  });
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };

        switch (params['actionType']) {
          case 'CALLBACK': {
            if (request.recommendationCallback) {
              request.recommendationCallback(keywordList, metadata, wvCB);
            }
            break;
          }
          case 'INPAGE_WIDGET': {
            var binded_context = checkSelectorAndRender.bind({
              params: params,
              keywordList: keywordList,
              selectorCount: 1,
            });
            binded_context();
            break;
          }
          default:
            break;
        }
      },
      webNotification: function (params) {
        // server side action
      },
      redirectUrl: function (params) {
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Redirecting action to url: ' + params.redirectUrl,
        );
        window.location = params.redirectUrl;
      },
      jsFunctionCall: function (params) {
        params['actionType'] = 'JAVASCRIPT_FUNCTION';
        _SgmntfY_._actions.jsAction(params);
      },
      jsAction: function (params) {
        // get action type;
        var actionType = params['actionType'];
        switch (actionType) {
          case 'JAVASCRIPT_EVENT': {
            var event = params['event'],
              parameters = [];
            // initialize parameters by parsing json string
            try {
              if (params['parameters'])
                parameters = JSON.parse(params['parameters']);
            } catch (exception) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Js Action (Event Trigger) - Cannot parse parameters json, str: ' +
                  params['parameters'],
              );
              parameters = [];
            }
            parameters.push(function () {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'js_success',
                interactionId: params['actionId'],
                instanceId: params['instanceId'],
              });
            });
            parameters.push(function () {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'js_reject',
                interactionId: params['actionId'],
                instanceId: params['instanceId'],
              });
            });
            // trigger event on document with parameters
            _SgmntfY_._getJq()(document).trigger(event, parameters);
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              'Js Action (Event Trigger) - Triggered Event: ' + event,
            );
            break;
          }
          case 'JAVASCRIPT_CODE': {
            try {
              eval(params['javascriptCode']);
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'js_success',
                interactionId: params['actionId'],
                instanceId: params['instanceId'],
              });
              _SgmntfY_.LOG_MESSAGE(
                'DEBUG',
                'Js Action (Execute Code) successfully executed',
              );
            } catch (err) {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'js_reject',
                interactionId: params['actionId'],
                instanceId: params['instanceId'],
              });
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error in JS Action (Execute Code): ' + err,
              );
            }
            break;
          }
          case 'JAVASCRIPT_FUNCTION':
          default: {
            var fx = window[params['function']],
              parameters = [];
            // call function
            if (typeof fx === 'function') {
              // initialize parameters by parsing json string
              try {
                if (params['parameters'])
                  parameters = JSON.parse(params['parameters']);
              } catch (exception) {
                _SgmntfY_.LOG_MESSAGE(
                  'WARN',
                  'Js Action (Function Call) - Cannot parse parameters json, str: ' +
                    params['parameters'],
                );
                parameters = [];
              }
              parameters.push(function () {
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'js_success',
                  interactionId: params['actionId'],
                  instanceId: params['instanceId'],
                });
              });
              parameters.push(function () {
                _SgmntfY_._variables.segmentifyObj('event:interaction', {
                  type: 'js_reject',
                  interactionId: params['actionId'],
                  instanceId: params['instanceId'],
                });
              });
              // actual call
              fx.apply(null, parameters);
              _SgmntfY_.LOG_MESSAGE(
                'DEBUG',
                'Js Action (Function Call) successfully run for function: ' +
                  params['function'],
              );
            } else
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Js Action (Function Call) failed, non existing function: ' +
                  params['function'],
              );
            break;
          }
        }
      },
      jsCountdownTimer: function (params) {
        var timeout = params['timeout'];
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Starting countdown timer with ' +
            (timeout || 0) * 1000 +
            ' second(s)',
        );
        setTimeout(function () {
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Countdown timer finished after ' +
              (timeout || 0) * 1000 +
              ' second(s)',
          );
          _SgmntfY_._variables.segmentifyObj('event:interaction', {
            type: 'timeout',
            interactionId: params['actionId'],
            instanceId: params['instanceId'],
          });
        }, (timeout || 0) * 1000);
      },
      sendBannerDetails: function (params, request) {
        var data = request.originalParams;
        data.group = params.group;
        // send back
        var requestDatas = [];
        var requestData = _SgmntfY_._functions.bannerGroupDetail(data);
        if (requestData) {
          requestDatas.push(requestData);
        }
        _SgmntfY_._sendRequestToServer(requestDatas);
      },
      showPopup: function (params, request) {
        var config = {
          instanceId: params['instanceId'],
          title: params['notificationTitle'],
          vertical: params['verticalPosition'],
          horizontal: params['horizontalPosition'],
        };
        try {
          if (params['preJsCode'] && params['preJsCode'] != '') {
            eval(params['preJsCode']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing jb trigger pre js code: ' + err,
          );
        }
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(params.recommendationTemplate, config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);

        var styleDataId = _SgmntfY_._variables.journey.instanceId + '_trigger';
        params['cssCode'] &&
          _SgmntfY_
            ._getJq()('<style data-id=' + styleDataId + '/>')
            .html(params['cssCode'])
            .prependTo(_SgmntfY_._getJq()('body'));

        if (params['overlay'] === 'true') {
          _SgmntfY_
            ._getJq()('<div class="seg-popup-overlay"></div>')
            .prependTo(_SgmntfY_._getJq()('body'));
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }
        // bind click event for jb trigger
        document
          .getElementById('sgm-journey-trigger-' + config.instanceId)
          .addEventListener(
            'click',
            _SgmntfY_._jbTriggerClickHandler.bind(this, config.instanceId),
          );

        try {
          params['postJsCode'] && eval(params['postJsCode']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing jb trigger post js code: ' + err,
          );
        }
      },
      buildJourney: function (params, request) {
        var jbDiscoverySteps;
        if (params['discovery']) {
          jbDiscoverySteps = JSON.parse(params['discovery']) || [];
        }
        if (jbDiscoverySteps.length > 0 && jbDiscoverySteps[0].type) {
          _SgmntfY_._jbOnInitJourneyFlowExecution(
            params.instanceId,
            jbDiscoverySteps,
          );
          _SgmntfY_._variables.journey.isCategoryTree = params['isCategoryTree']
            ? params['isCategoryTree']
            : 'true';

          var eventParams = {
            step: _SgmntfY_._variables.journey.currentStep,
            instanceId: _SgmntfY_._variables.journey.instanceId,
            answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
          };
          _SgmntfY_._variables.segmentifyObj('journey:start', eventParams);

          var jbDiscoveryData = {
            steps: jbDiscoverySteps,
            tree: params['tree'],
          };
          //calculate jb discovery pages count
          _SgmntfY_._jbCalculatePagesCount(jbDiscoveryData);
          // start to view from first step
          _SgmntfY_._jbOnStepViewHandler(jbDiscoveryData);
        }
      },
      giveCoupon: function (params, request) {
        if (params && params.coupon) {
          var notificationTitleMap = JSON.parse(
            params['notificationTitleMap'] || '{}',
          );
          var notificationTitle =
            notificationTitleMap[request.data.lang] || params.notificationTitle;

          var config = {
            coupon: params.coupon,
            button: _SgmntfY_._jbGetButtonText('DELIVERY'),
            couponTitle: notificationTitle,
            instanceId: params.instanceId,
          };

          try {
            if (params['preJsCode'] && params['preJsCode'] !== '') {
              eval(params['preJsCode']);
              if (preRenderConf) {
                var retVal = preRenderConf(config);
              }
              if (typeof retVal !== 'undefined' && !retVal) {
                _SgmntfY_.LOG_MESSAGE(
                  'WARN',
                  'preRenderConf returned false exiting!',
                );
                return;
              }
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in executing jb trigger pre js code: ' + err,
            );
          }

          var domparser = new DOMParser();
          var hasPopupRecoTemplate = false;
          try {
            if (
              _SgmntfY_._getJq()('#sgm-journey-coupon-template').length === 0
            ) {
              var renderedHtml = _SgmntfY_
                ._getMustache()
                .render(params.recommendationTemplate, config);
              _SgmntfY_._getJq()('body').prepend(renderedHtml);
            } else {
              hasPopupRecoTemplate = true;
            }

            var couponWrapperTemplate = domparser
              .parseFromString(params.recommendationTemplate, 'text/html')
              .getElementById('sgm-journey-coupon-template');

            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(couponWrapperTemplate.innerHTML, config);
            _SgmntfY_
              ._getJq()('#sgm-journey-coupon-template')
              .html(renderedHtml);
            _SgmntfY_
              ._getJq()('#sgm-journey-coupon-wrapper')
              .removeClass('sgm-journey-none');
            var copyButton = document.querySelector(
              '.sgm-journey-discovery-action.sgm-journey-discovery-action-copy',
            );
            if (copyButton) {
              copyButton.classList.remove('sgm-journey-none');
            }
            _SgmntfY_._jbDeliveryOnBindEventHandler(hasPopupRecoTemplate);

            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: params['actionId'],
              instanceId: _SgmntfY_._variables.journey.instanceId,
            });

            var styleDataId =
              _SgmntfY_._variables.journey.instanceId + '_delivery';
            params['cssCode'] &&
              _SgmntfY_
                ._getJq()('<style data-id=' + styleDataId + '/>')
                .html(params['cssCode'])
                .prependTo(
                  _SgmntfY_._getJq()('.sgm-journey-delivery.seg-popup'),
                );
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in rendering jb coupon: ' + err,
            );
          }

          try {
            if (params['postJsCode'] && params['postJsCode'] !== '') {
              eval(params['postJsCode']);
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in executing jb trigger post js code: ' + err,
            );
          }
        }
      },
      landingPage: function (params, request) {
        if (params && params.landingPageUrl) {
          var notificationTitleMap = JSON.parse(
            params['notificationTitleMap'] || '{}',
          );
          var notificationTitle =
            notificationTitleMap[request.data.lang] || params.notificationTitle;
          _SgmntfY_._variables.journey.landingPageUrl = params.landingPageUrl;

          var config = {
            button: _SgmntfY_._jbGetButtonText('DELIVERY'),
          };
          config.button['redirect'] = notificationTitle;

          try {
            if (params['preJsCode'] && params['preJsCode'] !== '') {
              eval(params['preJsCode']);
              if (preRenderConf) {
                var retVal = preRenderConf(config);
              }
              if (typeof retVal !== 'undefined' && !retVal) {
                _SgmntfY_.LOG_MESSAGE(
                  'WARN',
                  'preRenderConf returned false exiting!',
                );
                return;
              }
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in executing jb trigger pre js code: ' + err,
            );
          }

          var domparser = new DOMParser();
          try {
            var redirectButtonTemplate = domparser
              .parseFromString(params.recommendationTemplate, 'text/html')
              .getElementById('sgm-journey-action-redirect');

            var renderedHtml = _SgmntfY_
              ._getMustache()
              .render(redirectButtonTemplate.innerHTML, config);
            _SgmntfY_
              ._getJq()('#sgm-journey-action-redirect')
              .html(renderedHtml);

            params['cssCode'] &&
              _SgmntfY_
                ._getJq()('<style />')
                .html(params['cssCode'])
                .prependTo(
                  _SgmntfY_._getJq()('.sgm-journey-delivery.seg-popup'),
                );

            var redirectButton = document.getElementById(
              'sgm-journey-action-redirect',
            );
            if (redirectButton) {
              redirectButton.classList.remove('sgm-journey-none');
            }
            _SgmntfY_._jbDeliveryOnBindEventHandler(true);
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in rendering jb landing Page: ' + err,
            );
          }

          try {
            if (params['postJsCode'] && params['postJsCode'] !== '') {
              eval(params['postJsCode']);
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in executing jb trigger post js code: ' + err,
            );
          }
        }
      },
    },
    _jbOverFlowOperations: {
      _disableBodyOverFlowForJBWrapper: function () {
        _SgmntfY_._evalSearchBodyScrollLockPreJs();
        // in some event handler after showing the target element...disable body scroll
        var targetElement = document.querySelector(
          _SgmntfY_._variables.journey.wrapperSelector,
        );
        if (targetElement) {
          bodyScrollLock.disableBodyScroll(targetElement);
        }
      },
      _enableBodyOverFlowForJBWrapper: function () {
        // the method runs after finish to view journey pages
        var journeyWrapper = document.querySelector(
          _SgmntfY_._variables.journey.wrapperSelector,
        );
        if (journeyWrapper) {
          window.setTimeout(function () {
            bodyScrollLock.enableBodyScroll(journeyWrapper);
          }, 100);
        }
      },
      _journeyFinished: function (request) {
        return (
          request &&
          request.originalParams &&
          (request.originalParams.type === 'SUCCESS' ||
            request.originalParams.type === 'sfy-jb-finish')
        );
      },
    },
    _jbCalculatePagesCount: function (jbDiscoveryData) {
      _SgmntfY_._variables.journey.allPageCount = jbDiscoveryData.steps.length;
      _SgmntfY_._variables.journey.barRatio = 0;

      if (_SgmntfY_._variables.journey.allPageCount > 0) {
        _SgmntfY_._variables.journey.barRatio =
          100 / _SgmntfY_._variables.journey.allPageCount;
      }
    },
    _jbTriggerClickHandler: function (instanceId) {
      // the method runs after clicked the trigger button
      _SgmntfY_._variables.segmentifyObj('journey:init', {
        instanceId: instanceId,
      });
    },
    _jbOnInitJourneyFlowExecution: function (instanceId, steps) {
      // the method runs before start to view journey pages

      _SgmntfY_._jbSetInitialVariables(instanceId, steps);
      _SgmntfY_._getJq()('.seg-popup-overlay').remove();

      var deviceClass =
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.journey.maxMobileWidth
          ? 'sgm-journey-mobile'
          : 'sgm-journey-desktop';
      if (!document.getElementById('sgm-journey-main-wrapper')) {
        _SgmntfY_
          ._getJq()(
            '<div id="sgm-journey-main-wrapper" class="' +
              deviceClass +
              '" ></div>',
          )
          .prependTo(_SgmntfY_._getJq()('body'));
      }
      _SgmntfY_._jbOverFlowOperations._disableBodyOverFlowForJBWrapper();

      // before journey start set invisible the trigger buttons
      var triggerButtons = document.querySelectorAll('.sgm-journey-trigger');
      if (triggerButtons && triggerButtons.length > 0) {
        triggerButtons.forEach(function (tButton) {
          tButton.classList.add('sgm-journey-none');
        });
      }
    },
    _jbOnDestroyJourneyFlowExecution: function (hasDelivery) {
      var params = {
        step: _SgmntfY_._variables.journey.currentStep,
        instanceId: _SgmntfY_._variables.journey.instanceId,
        answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
      };

      try {
        var journeyWrapper = document.querySelector(
          _SgmntfY_._variables.journey.wrapperSelector,
        );
        if (hasDelivery === false) {
          _SgmntfY_._jbOverFlowOperations._enableBodyOverFlowForJBWrapper();
          _SgmntfY_._jbTriggerButtonReEnable();
          journeyWrapper &&
            journeyWrapper.parentNode.removeChild(journeyWrapper);
        } else {
          _SgmntfY_._variables.segmentifyObj('journey:finish', params);
          journeyWrapper && journeyWrapper.classList.add('sgm-journey-none');
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('WARN', 'Error in destroying jb flow: ' + err);
      }
    },
    _jbTriggerButtonReEnable: function () {
      // after journey finish(request) set visible the trigger buttons
      var triggerButtons = document.querySelectorAll('.sgm-journey-trigger');
      if (triggerButtons && triggerButtons.length > 0) {
        triggerButtons.forEach(function (tButton) {
          tButton.classList.remove('sgm-journey-none');
        });
      }
    },
    _jbSetInitialVariables: function (instanceId, steps) {
      // initial journey variable after trigger
      // first step will be set to show
      _SgmntfY_._variables.journey = {
        answer: {},
        closed: false,
        instanceId: instanceId,
        currentStep: null,
        nextStep: steps[0].type,
        previousStep: undefined,
        allSteps: steps.map(function (s) {
          return s.type;
        }),
        maxMobileWidth: 801,
        priceRange: { min: undefined, max: undefined },
        buttonTextMap: _SgmntfY_._variables.journey.buttonTextMap || {
          EN: {
            copy: 'Copy',
            next: 'Next',
            previous: 'Go Back',
            close: 'Close',
            skip: 'Skip',
            finish: 'Finish',
            start: "Let's Start",
            customize: 'Customize',
            skipAndFinish: 'Skip & Finish',
          },
          TR: {
            copy: 'Kopyala',
            next: 'Sonraki',
            previous: 'Geri Dön',
            close: 'Kapat',
            skip: 'Atla',
            finish: 'Bitir',
            start: 'Hadi Başlayalım',
            customize: 'Özelleştir',
            skipAndFinish: 'Atla ve Bitir',
          },
        },
        wrapperSelector: '#sgm-journey-main-wrapper',
        pageCount: 0,
        allPageCount: 0,
        barRatio: 0,
        barWidth: 0,
        isTriggeredBackButton: false,
        progressBar: {
          EN: {
            label: 'Step ',
            separator: ' of ',
          },
          TR: {
            label: 'Adım ',
            separator: ' / ',
          },
        },
      };
    },
    _jbTransformStepItems: function (stepName, data) {
      return data;
    },
    _jbTransformCategoryStepItems: function (stepName, data) {
      var _isCategoryTree = _SgmntfY_._variables.journey.isCategoryTree;
      return data.map(function (treeMember) {
        var item = {};
        item.originalData = treeMember;
        item.lastChild = treeMember;
        if (_isCategoryTree && _isCategoryTree === 'false') {
          var categoryTree = treeMember.split('>');
          item.lastChild = categoryTree[categoryTree.length - 1].trim();
        }
        return item;
      });
    },
    _jbGetStepItems: function (stepName, stepItems, jbDiscoveryDataTree) {
      // prepare the data that will show on the journey step
      try {
        var answer = _SgmntfY_._variables.journey.answer;
        if (stepName === 'MAIN_CATEGORY') {
          return _SgmntfY_._jbTransformStepItems(
            stepName,
            Object.keys(jbDiscoveryDataTree),
          );
        } else if (stepName === 'CATEGORY') {
          return _SgmntfY_._jbTransformCategoryStepItems(
            stepName,
            Object.keys(jbDiscoveryDataTree[answer.mainCategory]),
          );
        } else if (stepName === 'BRAND') {
          return _SgmntfY_._jbTransformStepItems(
            stepName,
            Object.keys(
              jbDiscoveryDataTree[answer.mainCategory][answer.category],
            ),
          );
        } else if (
          stepName === 'SIZE' ||
          stepName === 'COLOR' ||
          stepName === 'PRICE_RANGE' ||
          stepName === 'CUSTOM_PRICE_RANGE'
        ) {
          var stepDataMap = {
            SIZE: 's',
            COLOR: 'c',
            PRICE_RANGE: 'p',
            CUSTOM_PRICE_RANGE: 'p',
          };
          var items = [];
          if (_SgmntfY_._variables.journey.allSteps.indexOf('BRAND') > -1) {
            var selectedBrandNames = Object.keys(
              jbDiscoveryDataTree[answer.mainCategory][answer.category],
            );
            if (answer.brand && answer.brand.length > 0) {
              selectedBrandNames = answer.brand;
            }
            selectedBrandNames.forEach(function (brandName) {
              var brandData =
                jbDiscoveryDataTree[answer.mainCategory][answer.category][
                  brandName
                ];
              items.push.apply(items, brandData[stepDataMap[stepName]] || []);
            });
          } else {
            var categoryData =
              jbDiscoveryDataTree[answer.mainCategory][answer.category];
            items.push.apply(items, categoryData[stepDataMap[stepName]] || []);
          }
          if (stepName === 'PRICE_RANGE' || stepName === 'CUSTOM_PRICE_RANGE') {
            var possiblePriceRangesMin = items
              .map(onMapPriceRange.bind(null, false))
              .sort(onSortPriceRange);
            var possiblePriceRangesMax = items
              .map(onMapPriceRange.bind(null, true))
              .sort(onSortPriceRange);
            if (
              possiblePriceRangesMin &&
              possiblePriceRangesMin.length > 0 &&
              possiblePriceRangesMax &&
              possiblePriceRangesMax.length > 0
            ) {
              if (stepName === 'CUSTOM_PRICE_RANGE') {
                return [
                  possiblePriceRangesMin[0],
                  possiblePriceRangesMax[possiblePriceRangesMax.length - 1],
                ];
              } else {
                return _SgmntfY_._jbGetPriceRangeData(
                  possiblePriceRangesMin[0],
                  possiblePriceRangesMax[possiblePriceRangesMax.length - 1],
                );
              }
            } else {
              return [];
            }
          } else {
            // visible only
            var dataCount = 0;
            stepItems.forEach(function (item) {
              if (item && item.itemCount) {
                dataCount = dataCount + item.itemCount;
              }
            });
            return _SgmntfY_
              ._getDistinctArray(items.sort(onSortObject).map(onMapObject))
              .slice(0, dataCount);
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error occurred while preparing journey items',
        );
      }

      return [];

      ////////

      function onSortObject(item1, item2) {
        return Object.entries(item2)[0][1] - Object.entries(item1)[0][1];
      }

      function onMapObject(item) {
        var entry = Object.entries(item);
        return entry && entry[0] && entry[0][0] ? entry[0][0] : undefined;
      }

      function onMapPriceRange(isMax, item) {
        var index = isMax === true ? 1 : 0;
        if (item && item.split('-') && item.split('-')[index]) {
          var rangeData = item.split('-')[index].trim();
          if (rangeData === '') {
            return 0;
          }
          return parseFloat(rangeData);
        }
      }

      function onSortPriceRange(val1, val2) {
        return val1 - val2;
      }
    },
    _jbGetPriceRangeData: function (minValue, maxValue) {
      if (minValue === 0 && maxValue === 0) {
        return [];
      }
      var normalizedMin = nearest(minValue, true);
      var normalizedMax = nearest(maxValue, false);

      if (normalizedMin == normalizedMax) {
        if (minValue === maxValue) {
          return [minValue.toString()];
        } else {
          return [minValue + ' - ' + maxValue];
        }
      }
      var difference = normalizedMax - normalizedMin;
      var range = difference / 6;
      var firstPoint = normalizedMin + range;
      var thirdPoint = normalizedMax - range;
      var secondPoint = (firstPoint + thirdPoint) / 2;
      var nearestFirstPoint = nearestFive(firstPoint);
      var nearestSecondPoint = nearestFive(secondPoint);
      var nearestThirdPoint = nearestFive(thirdPoint);
      if (nearestFirstPoint < minValue) {
        nearestFirstPoint = Math.ceil(minValue);
      }
      if (nearestThirdPoint > maxValue) {
        nearestThirdPoint = Math.floor(maxValue);
      }
      var firstRange = '0 - ' + nearestFirstPoint;
      var secondRange = nearestFirstPoint + ' - ' + nearestSecondPoint;
      var thirdRange = nearestSecondPoint + ' - ' + nearestThirdPoint;
      var fourthRange = nearestThirdPoint + '+';
      return [firstRange, secondRange, thirdRange, fourthRange];

      /////////

      function nearest(value, isMin) {
        var normalized;
        if (value > 100000) {
          var remaining = value % 1000;
          if (isMin === true) {
            value += 1000;
          }
          normalized = value - remaining;
        } else if (value > 10000) {
          var remaining = value % 500;
          if (isMin === true) {
            value += 500;
          }
          normalized = value - remaining;
        } else if (value > 1000) {
          var remaining = value % 100;
          if (isMin === true) {
            value += 100;
          }
          normalized = value - remaining;
        } else if (value > 100) {
          var remaining = value % 10;
          if (isMin === true) {
            value += 10;
          }
          normalized = value - remaining;
        } else if (value > 50) {
          var remaining = value % 5;
          if (isMin === true) {
            value += 5;
          }
          normalized = value - remaining;
        } else {
          normalized = nearestFive(value);
        }
        return normalized;
      }

      function nearestFive(value) {
        var remaining = value % 5;
        if (remaining >= 2.5) {
          value += 5;
        }
        return Math.floor(value - remaining);
      }
    },
    _jbGetButtonText: function (stepName, stepButtonTextMap) {
      var buttonData = {};

      if (
        _SgmntfY_._variables.journey &&
        _SgmntfY_._variables.journey.buttonTextMap
      ) {
        var defaultButtonTextLanguage = _SgmntfY_._variables.journey
          .buttonTextMap[_SgmntfY_._variables.language]
          ? _SgmntfY_._variables.language
          : 'EN';

        if (
          stepButtonTextMap &&
          stepButtonTextMap[_SgmntfY_._variables.language]
        ) {
          buttonData['next'] = stepButtonTextMap[_SgmntfY_._variables.language];
        } else {
          if (stepName === 'WELCOME') {
            buttonData['next'] =
              _SgmntfY_._variables.journey.buttonTextMap[
                defaultButtonTextLanguage
              ].start;
          } else {
            buttonData['next'] =
              _SgmntfY_._variables.journey.buttonTextMap[
                defaultButtonTextLanguage
              ].next;
          }
        }
        buttonData['skip'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].skip;
        buttonData['skipAndFinish'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].skipAndFinish;
        buttonData['finish'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].finish;
        buttonData['copy'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].copy;
        buttonData['close'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].close;
        buttonData['customize'] =
          _SgmntfY_._variables.journey.buttonTextMap[
            defaultButtonTextLanguage
          ].customize;
      }

      return buttonData;
    },
    _jbOnStepViewHandler: function (jbDiscoveryData) {
      // the method runs when start to step viewing
      var currentStep;
      if (_SgmntfY_._variables.journey.isTriggeredBackButton) {
        // if came from previous button we set currentStep with previous step
        currentStep = _SgmntfY_._jbGetPrevStepData(jbDiscoveryData);
      } else {
        // it shows the step that defined in _SgmntfY_._variables.journey.nextStep
        // if nextStep is undefined then the flow execution will finish
        currentStep = _SgmntfY_._jbGetCurrentStepData(jbDiscoveryData, true);
      }

      if (currentStep) {
        shiftStep(currentStep);

        var config = {
          title: currentStep.titleMap[_SgmntfY_._variables.language],
          step: currentStep.type.toLowerCase(),
          button: _SgmntfY_._jbGetButtonText(
            currentStep.type,
            currentStep.buttonTextMap,
          ),
          items: _SgmntfY_._jbGetStepItems(
            currentStep.type,
            currentStep.items,
            jbDiscoveryData.tree,
          ),
          currencyCode: _SgmntfY_._variables.currency,
        };

        var params = {
          step: _SgmntfY_._variables.journey.currentStep,
          instanceId: _SgmntfY_._variables.journey.instanceId,
        };
        _SgmntfY_._variables.segmentifyObj('journey:view', params);

        try {
          if (currentStep['preJsCode'] && currentStep['preJsCode'] != '') {
            eval(currentStep['preJsCode']);
            if (preRenderConf) {
              var retVal = preRenderConf(config);
            }
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing jb trigger pre js code: ' + err,
          );
        }
        // set progress bar current page and width
        _SgmntfY_._jbSetPageCountAndProgressBarWidth();

        if (
          _SgmntfY_._variables.journey.currentStep !== 'WELCOME' &&
          config.items.length === 0
        ) {
          // skip the step if data is empty
          _SgmntfY_._jbOnStepViewHandler(jbDiscoveryData);
        } else {
          var renderedHtml = _SgmntfY_
            ._getMustache()
            .render(currentStep.recommendationTemplate, config);
          _SgmntfY_._getJq()('#sgm-journey-main-wrapper').html(renderedHtml);
          _SgmntfY_._jbOnBindEventHandler(jbDiscoveryData, config.items);

          var styleDataId =
            _SgmntfY_._variables.journey.instanceId + '_' + currentStep.type;
          currentStep['cssCode'] &&
            _SgmntfY_
              ._getJq()('<style data-id=' + styleDataId + '/>')
              .html(currentStep['cssCode'])
              .prependTo(
                _SgmntfY_._getJq()(
                  _SgmntfY_._variables.journey.wrapperSelector,
                ),
              );

          //set progress bar and label
          _SgmntfY_._jbSetProgressBar();

          if (!_SgmntfY_._variables.journey.nextStep) {
            // if next step does not exist
            _SgmntfY_._jbActionButtonHandler(
              'skipAndFinish',
              currentStep,
              true,
            );
          } else {
            if (_SgmntfY_._variables.journey.currentStep === 'WELCOME') {
              _SgmntfY_._jbActionButtonHandler('next', currentStep, true);
            } else {
              _SgmntfY_._jbActionButtonHandler('skip', currentStep, true);
            }
          }
          if (_SgmntfY_._variables.journey.isTriggeredBackButton) {
            if (_SgmntfY_._jbIsSingleDataSelect() === false) {
              reselectItems(
                _SgmntfY_._variables.journey.currentStep.toLowerCase(),
              );
              _SgmntfY_._jbActionButtonHandler('next', currentStep, true);
            }
          }
          // we set deafult previous button to false after set step and page count
          _SgmntfY_._variables.journey.isTriggeredBackButton = false;
          // previous step handler
          _SgmntfY_._jbActionButtonHandler(
            'previous',
            currentStep,
            !!_SgmntfY_._variables.journey.previousStep,
          );

          try {
            currentStep.postJsCode && eval(currentStep.postJsCode);
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in executing product recommendation post js code: ' + err,
            );
          }
        }
      } else {
        _SgmntfY_._variables.segmentifyObj('journey:success', {
          instanceId: _SgmntfY_._variables.journey.instanceId,
          answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
        });
      }

      function shiftStep(currentStep) {
        _SgmntfY_._variables.journey.currentStep = currentStep.type;
        for (var index = 0; index < jbDiscoveryData.steps.length; index++) {
          if (
            jbDiscoveryData.steps[index] &&
            jbDiscoveryData.steps[index].type === currentStep.type
          ) {
            //set previous step
            if (!!jbDiscoveryData.steps[index - 1]) {
              _SgmntfY_._variables.journey.previousStep =
                jbDiscoveryData.steps[index - 1].type;
            } else {
              _SgmntfY_._variables.journey.previousStep = undefined;
            }
            if (!!jbDiscoveryData.steps[index + 1]) {
              _SgmntfY_._variables.journey.nextStep =
                jbDiscoveryData.steps[index + 1].type;
            } else {
              _SgmntfY_._variables.journey.nextStep = undefined;
            }
            break;
          }
          if (index === jbDiscoveryData.steps.length - 1) {
            _SgmntfY_._variables.journey.nextStep = undefined;
          }
        }
      }

      function reselectItems(currentStep) {
        var selectedClassName = _SgmntfY_._jbIsCheckMarkDataSelect()
          ? 'sgm-journey-checkmark'
          : 'sgm-journey-content-selected';
        var currentElements = document.querySelectorAll(
          _SgmntfY_._variables.journey.wrapperSelector +
            ' .' +
            'sgm-journey-content-item',
        );
        var values = _SgmntfY_._variables.journey.answer[currentStep];
        if (
          currentElements &&
          currentElements.length > 0 &&
          values &&
          values.length > 0
        ) {
          currentElements.forEach(function (el) {
            values.forEach(function (val) {
              if (el.hasAttribute('data-original-value') && val) {
                if (el.getAttribute('data-original-value') === val) {
                  el.classList.add(selectedClassName);
                }
              }
            });
          });
        }
      }
    },
    _jbSetPageCountAndProgressBarWidth: function () {
      if (_SgmntfY_._variables.journey.isTriggeredBackButton) {
        if (_SgmntfY_._variables.journey.pageCount > 0) {
          _SgmntfY_._variables.journey.pageCount -= 1;
          _SgmntfY_._variables.journey.barWidth -=
            _SgmntfY_._variables.journey.barRatio;
        }
      } else {
        if (
          _SgmntfY_._variables.journey.pageCount <
          _SgmntfY_._variables.journey.allPageCount
        ) {
          _SgmntfY_._variables.journey.pageCount += 1;
          _SgmntfY_._variables.journey.barWidth +=
            _SgmntfY_._variables.journey.barRatio;
        }
      }
    },
    _jbSetProgressBar: function () {
      var barElem = document.getElementById('sgm-journey-bar');
      if (barElem) {
        var width = _SgmntfY_._variables.journey.barWidth;
        // control if last child not fill bar because of decimal fix to 100
        if (width + _SgmntfY_._variables.journey.barRatio > 100) {
          barElem.style.width = '100%';
        } else {
          barElem.style.width = width + '%';
        }
        var language = 'EN';
        if (_SgmntfY_._variables.language === 'TR') {
          language = _SgmntfY_._variables.language;
        }

        var progressBar = _SgmntfY_._variables.journey.progressBar[language];
        document.getElementById('sgm-journey-progress-label').innerHTML =
          progressBar.label +
          _SgmntfY_._variables.journey.pageCount +
          progressBar.separator +
          _SgmntfY_._variables.journey.allPageCount;
      }
    },
    _jbGetPrevStepData: function (jbDiscoveryData) {
      var currentStep = jbDiscoveryData.steps.filter(onFilterStep);
      if (currentStep) {
        return currentStep[0];
      }

      function onFilterStep(step) {
        return step.type === _SgmntfY_._variables.journey.previousStep;
      }
    },
    _jbGetCurrentStepData: function (jbDiscoveryData, forNext) {
      var currentStep = jbDiscoveryData.steps.filter(onFilterStep);
      if (currentStep) {
        return currentStep[0];
      }

      /////

      function onFilterStep(step) {
        return (
          step.type ===
          (forNext === true
            ? _SgmntfY_._variables.journey.nextStep
            : _SgmntfY_._variables.journey.currentStep)
        );
      }
    },
    _jbOnBindEventHandler: function (jbDiscoveryData, contentItems) {
      // events will bind that we need on the journey step

      var closeButton = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-topbar span.sgm-journey-close',
      );
      if (closeButton) {
        closeButton.addEventListener('click', _SgmntfY_._jbExitHandler);
      }

      var actionButton = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-action .sgm-journey-discovery-action',
      );
      if (actionButton) {
        actionButton.addEventListener(
          'click',
          _SgmntfY_._jbOnStepChangeHandler.bind(this, jbDiscoveryData),
        );
      }

      var prevActionButton = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-action .sgm-journey-discovery-prev-action',
      );
      if (prevActionButton) {
        prevActionButton.addEventListener(
          'click',
          _SgmntfY_._jbOnPrevStepChangeHandler.bind(this, jbDiscoveryData),
        );
      }

      var customizePriceRangeButton = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-content .sgm-journey-price-range-customize-button',
      );
      if (customizePriceRangeButton) {
        customizePriceRangeButton.addEventListener(
          'click',
          _SgmntfY_._jbOnPriceRangeCustomizeHandler.bind(
            this,
            contentItems,
            jbDiscoveryData,
          ),
        );
      }

      var itemElements = document.querySelectorAll(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-content .sgm-journey-content-item',
      );
      if (itemElements && itemElements.length > 0) {
        itemElements.forEach(onIterateItemElementBindClick);
      }

      //////

      function onIterateItemElementBindClick(itemElement) {
        itemElement.addEventListener(
          'click',
          _SgmntfY_._jbOnDataSelectHandler.bind(this, jbDiscoveryData),
          false,
        );
      }
    },
    _jbDeliveryOnBindEventHandler: function (hasPopupRecoTemplate) {
      var deliveryActions = document.querySelectorAll(
        '.sgm-journey-delivery .sgm-journey-discovery-action',
      );
      if (deliveryActions && deliveryActions.length > 0) {
        deliveryActions.forEach(onBindAction);

        if (hasPopupRecoTemplate === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-popup-close')
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              $this
                .parent('.seg-popup')
                .removeClass('segFadeInUp')
                .addClass('segFadeOutDown');
              window.setTimeout(function () {
                _SgmntfY_._sgfPopupCloseHandler(false);
                $this.parent('.seg-popup').remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, 1000);
            });
        }
      }

      ///////

      function onBindAction(actionButton) {
        if (actionButton.getAttribute('data-type') === 'copy') {
          actionButton.addEventListener(
            'click',
            _SgmntfY_._textCopyToClipBoard.bind(
              this,
              'sgm-journey-delivery-coupon',
            ),
          );
        } else if (actionButton.getAttribute('data-type') === 'close') {
          actionButton.addEventListener('click', _SgmntfY_._jbOnCloseDelivery);
        } else if (actionButton.getAttribute('data-type') === 'redirect') {
          actionButton.addEventListener('click', _SgmntfY_._jbOnLandingPage);
        }
      }
    },
    _jbOnLandingPage: function () {
      window.location = _SgmntfY_._variables.journey.landingPageUrl;
    },
    _jbOnCloseDelivery: function () {
      var deliveryWrapper = document.querySelector(
        '.sgm-journey-delivery.seg-popup',
      );
      if (deliveryWrapper) {
        deliveryWrapper.classList.remove('segFadeInUp');
        deliveryWrapper.classList.add('segFadeOutDown');
        window.setTimeout(function () {
          _SgmntfY_._sgfPopupCloseHandler(false);
          deliveryWrapper.parentNode.removeChild(deliveryWrapper);
        }, 1000);
      }
    },
    _jbOnPriceRangeCustomizeHandler: function (contentItems, jbDiscoveryData) {
      // initialization of price range selection
      var rangeSelectEl = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-content-price-range-select',
      );
      var customizeEl = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-content-price-range-custom',
      );
      if (rangeSelectEl && customizeEl) {
        rangeSelectEl.classList.add('sgm-journey-none');
        customizeEl.classList.remove('sgm-journey-none');

        var currentStepData = _SgmntfY_._jbGetCurrentStepData(
          jbDiscoveryData,
          false,
        );
        _SgmntfY_._jbActionButtonHandler('finish', currentStepData, true);

        // remove selection in price list
        var currentSelectedElements = document.querySelectorAll(
          _SgmntfY_._variables.journey.wrapperSelector +
            '.sgm-journey-content-selected',
        );
        if (currentSelectedElements && currentSelectedElements.length > 0) {
          currentSelectedElements.forEach(function (selectedEl) {
            selectedEl.classList.remove('sgm-journey-content-selected');
          });
        }
        var priceRanges = _SgmntfY_._jbGetStepItems(
          'CUSTOM_PRICE_RANGE',
          null,
          jbDiscoveryData.tree,
        );
        var initialMinVal;
        var initialMaxVal;
        if (priceRanges && priceRanges.length === 2) {
          initialMinVal = priceRanges[0];
          initialMaxVal = priceRanges[1];
        } else {
          initialMinVal = parseInt(
            contentItems && contentItems.length > 0
              ? contentItems[0].replace('-', '').trim()
              : 0,
          );
          initialMaxVal = parseInt(
            contentItems && contentItems.length > 0
              ? contentItems[contentItems.length - 1].replace('-', '').trim()
              : 0,
          );
        }
        initialMinVal = initialMinVal - (initialMinVal % 10);
        initialMaxVal = initialMaxVal - (initialMaxVal % 10) + 10;
        var rangeMin =
          _SgmntfY_._variables.journey.priceRange.min ||
          (initialMinVal >= 2 ? initialMinVal - 2 : initialMinVal);
        var rangeMax =
          _SgmntfY_._variables.journey.priceRange.max ||
          initialMaxVal + (initialMaxVal > 10 ? 20 : 5);

        document.getElementById(
          'sgm-journey-slider-range-input-value-min',
        ).min = rangeMin;
        document.getElementById(
          'sgm-journey-slider-range-input-value-min',
        ).max = rangeMax;
        document.getElementById(
          'sgm-journey-slider-range-input-value-min',
        ).value = initialMinVal;

        document.getElementById(
          'sgm-journey-slider-range-input-value-max',
        ).min = rangeMin;
        document.getElementById(
          'sgm-journey-slider-range-input-value-max',
        ).max = rangeMax;
        document.getElementById(
          'sgm-journey-slider-range-input-value-max',
        ).value = initialMaxVal;

        onChangeJBSliderInputMin(
          document.getElementById('sgm-journey-slider-range-input-value-max'),
          initialMinVal,
        );
        onChangeJBSliderInputMax(
          document.getElementById('sgm-journey-slider-range-input-value-min'),
          initialMaxVal,
        );

        document
          .getElementById('sgm-journey-slider-range-input-value-min')
          .addEventListener('input', onChangeJBSliderInputMin.bind(this));
        document
          .getElementById('sgm-journey-slider-range-input-value-max')
          .addEventListener('input', onChangeJBSliderInputMax.bind(this));

        function onChangeJBSliderInputMin(target, selectedValue) {
          if (target.type === 'input') target = target.currentTarget;

          if (!selectedValue && selectedValue !== 0) {
            selectedValue = Math.min(
              target.value,
              document.getElementById(
                'sgm-journey-slider-range-input-value-max',
              ).value,
            );
          }
          var minVal = parseInt(target.min);
          var maxVal = parseInt(target.max);
          var targetValue =
            (100 / (maxVal - minVal)) * selectedValue -
            (100 / (maxVal - minVal)) * minVal;

          document.getElementsByClassName(
            'sgm-journey-slider-range-point-min',
          )[0].style.left = targetValue + '%';
          document.getElementsByClassName(
            'sgm-journey-slider-inverse-left',
          )[0].style.width = targetValue + '%';
          document.getElementsByClassName(
            'sgm-journey-slider-range-fill',
          )[0].style.left = targetValue + '%';
          document.getElementsByClassName(
            'sgm-journey-slider-range-fill',
          )[0].min = targetValue;
          document.getElementById(
            'sgm-journey-slider-range-point-value-min',
          ).parentElement.style.left = targetValue + '%';
          document.getElementById(
            'sgm-journey-slider-range-point-value-min',
          ).innerHTML = '' + selectedValue;
          document.getElementById('price-range-min').value = selectedValue;

          var customHiddenElement = document.querySelector(
            _SgmntfY_._variables.journey.wrapperSelector +
              ' .sgm-journey-content-item-custom',
          );
          if (customHiddenElement) {
            customHiddenElement.classList.add('sgm-journey-content-selected');
            customHiddenElement.setAttribute(
              'data-original-value',
              document.getElementById('price-range-min').value +
                ' - ' +
                document.getElementById('price-range-max').value,
            );
          }
        }

        function onChangeJBSliderInputMax(target, selectedValue) {
          if (target.type === 'input') target = target.currentTarget;

          if (!selectedValue && selectedValue !== 0) {
            selectedValue = Math.max(
              target.value,
              document.getElementById(
                'sgm-journey-slider-range-input-value-min',
              ).value,
            );
          }
          var minVal = parseInt(target.min);
          var maxVal = parseInt(target.max);
          var targetValue =
            (100 / (maxVal - minVal)) * parseInt(selectedValue) -
            (100 / (maxVal - minVal)) * minVal;

          document.getElementsByClassName(
            'sgm-journey-slider-inverse-right',
          )[0].style.width = 100 - targetValue + '%';
          document.getElementsByClassName(
            'sgm-journey-slider-range-fill',
          )[0].style.right = 100 - targetValue + '%';
          document.getElementsByClassName(
            'sgm-journey-slider-range-fill',
          )[0].max = targetValue;
          document.getElementsByClassName(
            'sgm-journey-slider-range-point-max',
          )[0].style.left = targetValue + '%';
          document.getElementById(
            'sgm-journey-slider-range-point-value-max',
          ).parentElement.style.left = targetValue + '%';
          document.getElementById(
            'sgm-journey-slider-range-point-value-max',
          ).innerHTML = '' + selectedValue;
          document.getElementById('price-range-max').value = selectedValue;

          var customHiddenElement = document.querySelector(
            _SgmntfY_._variables.journey.wrapperSelector +
              ' .sgm-journey-content-item-custom',
          );
          if (customHiddenElement) {
            customHiddenElement.classList.add('sgm-journey-content-selected');
            customHiddenElement.setAttribute(
              'data-original-value',
              document.getElementById('price-range-min').value +
                ' - ' +
                document.getElementById('price-range-max').value,
            );
          }
        }
      }
    },
    _jbOnDataSelectHandler: function (jbDiscoveryData, selectedElement) {
      // the method runs after select data(item) on the journey step

      var selectedClassName = _SgmntfY_._jbIsCheckMarkDataSelect()
        ? 'sgm-journey-checkmark'
        : 'sgm-journey-content-selected';
      if (_SgmntfY_._jbIsSingleDataSelect()) {
        var previouslySelectedElements = document.querySelectorAll(
          _SgmntfY_._variables.journey.wrapperSelector +
            ' .' +
            selectedClassName,
        );
        if (
          previouslySelectedElements &&
          previouslySelectedElements.length > 0
        ) {
          previouslySelectedElements.forEach(function (el) {
            el.classList.remove('sgm-journey-content-selected');
          });
        }
        selectedElement.currentTarget.classList.add(
          'sgm-journey-content-selected',
        );

        if (_SgmntfY_._jbIsAllowedToChangeStepAfterSelect()) {
          _SgmntfY_._jbOnStepChangeHandler(jbDiscoveryData);
        }
      } else {
        if (
          selectedElement.currentTarget.classList.contains(selectedClassName)
        ) {
          selectedElement.currentTarget.classList.remove(selectedClassName);
        } else {
          selectedElement.currentTarget.classList.add(selectedClassName);
        }

        var currentSelectedElements = document.querySelectorAll(
          _SgmntfY_._variables.journey.wrapperSelector +
            ' .' +
            selectedClassName,
        );

        var hasSelectedData =
          currentSelectedElements && currentSelectedElements.length > 0;
        var currentStepData = _SgmntfY_._jbGetCurrentStepData(
          jbDiscoveryData,
          false,
        );

        // if there is not next step
        !_SgmntfY_._variables.journey.nextStep &&
          hasSelectedData &&
          _SgmntfY_._jbActionButtonHandler('finish', currentStepData, true);
        !_SgmntfY_._variables.journey.nextStep &&
          !hasSelectedData &&
          _SgmntfY_._jbActionButtonHandler(
            'skipAndFinish',
            currentStepData,
            true,
          );

        // if there is next step
        _SgmntfY_._variables.journey.nextStep &&
          hasSelectedData &&
          _SgmntfY_._jbActionButtonHandler('next', currentStepData, true);
        _SgmntfY_._variables.journey.nextStep &&
          !hasSelectedData &&
          _SgmntfY_._jbActionButtonHandler('skip', currentStepData, true);
      }
    },
    _jbActionButtonHandler: function (buttonType, currentStepData, isVisible) {
      // buttonType: next, skip, finish, skipAndFinish
      var buttonEl = document.querySelector(
        _SgmntfY_._variables.journey.wrapperSelector +
          ' .sgm-journey-action .sgm-journey-discovery-action',
      );
      if (buttonType === 'previous') {
        buttonEl = document.querySelector(
          _SgmntfY_._variables.journey.wrapperSelector +
            ' .sgm-journey-action .sgm-journey-discovery-prev-action',
        );
      }
      if (buttonEl) {
        if (isVisible === true) {
          buttonEl.classList.remove('sgm-journey-none');
          buttonEl.setAttribute('data-type', buttonType);
          if (buttonType === 'previous') {
            var language;
            if (_SgmntfY_._variables.language === 'TR') {
              language = _SgmntfY_._variables.language;
            } else {
              language = 'EN';
            }
            buttonEl.textContent =
              _SgmntfY_._variables.journey.buttonTextMap[language].previous;
          } else {
            buttonEl.textContent =
              _SgmntfY_._jbGetButtonText(
                currentStepData.type,
                currentStepData.buttonTextMap,
              )[buttonType] || '';
          }
        } else {
          buttonEl.classList.add('sgm-journey-none');
        }
      }
    },
    _jbIsSingleDataSelect: function () {
      // the method detects which steps have single selection data
      return (
        _SgmntfY_._variables.journey.currentStep === 'MAIN_CATEGORY' ||
        _SgmntfY_._variables.journey.currentStep === 'CATEGORY'
      );
    },
    _jbIsCheckMarkDataSelect: function () {
      return _SgmntfY_._variables.journey.currentStep === 'COLOR';
    },
    _jbIsAllowedToChangeStepAfterSelect: function () {
      // if it's true then no need to click next button to go to next step
      return (
        _SgmntfY_._variables.journey.currentStep === 'MAIN_CATEGORY' ||
        _SgmntfY_._variables.journey.currentStep === 'CATEGORY'
      );
    },
    _jbOnStepChangeHandler: function (jbDiscoveryData) {
      // the method is a bridge between after data selection and next page viewing
      // when data selection is finished the method runs before to view next step
      var selectedClassName = _SgmntfY_._jbIsCheckMarkDataSelect()
        ? 'sgm-journey-checkmark'
        : 'sgm-journey-content-selected';

      var selectedValues = [];
      var currentSelectedElements = document.querySelectorAll(
        _SgmntfY_._variables.journey.wrapperSelector + ' .' + selectedClassName,
      );
      if (currentSelectedElements && currentSelectedElements.length > 0) {
        currentSelectedElements.forEach(function (selectedEl) {
          if (selectedEl.hasAttribute('data-original-value')) {
            selectedValues.push(selectedEl.getAttribute('data-original-value'));
          }
        });
      }

      _SgmntfY_._jbPrepareJourneyAnswer(selectedValues);
      var params = {
        step: _SgmntfY_._variables.journey.currentStep,
        instanceId: _SgmntfY_._variables.journey.instanceId,
        answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
      };
      _SgmntfY_._variables.segmentifyObj('journey:select', params);

      // view next step
      _SgmntfY_._jbOnStepViewHandler(jbDiscoveryData);
    },
    _jbPrepareJourneyAnswer: function (selectedValues) {
      // the method is a utility to prepare data in expected format
      switch (_SgmntfY_._variables.journey.currentStep) {
        case 'MAIN_CATEGORY':
          _SgmntfY_._variables.journey.answer['mainCategory'] =
            selectedValues[0];
          break;
        case 'CATEGORY':
          _SgmntfY_._variables.journey.answer['category'] = selectedValues[0];
          break;
        case 'BRAND':
          _SgmntfY_._variables.journey.answer['brand'] = selectedValues;
          break;
        case 'SIZE':
          _SgmntfY_._variables.journey.answer['size'] = selectedValues;
          break;
        case 'COLOR':
          _SgmntfY_._variables.journey.answer['color'] = selectedValues;
          break;
        case 'PRICE_RANGE':
          if (selectedValues && selectedValues.length > 0) {
            selectedValues = selectedValues.map(function (val) {
              return val.replace('+', ' - ');
            });
          }
          _SgmntfY_._variables.journey.answer['priceRange'] = selectedValues;
          break;
      }
    },
    _jbOnPrevStepChangeHandler: function (jbDiscoveryData) {
      // when the method runs before to view previous step
      _SgmntfY_._variables.journey.isTriggeredBackButton = true;
      _SgmntfY_._jbRecalculateJourneyAnswer(jbDiscoveryData);
      var params = {
        step: _SgmntfY_._variables.journey.currentStep,
        instanceId: _SgmntfY_._variables.journey.instanceId,
        answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
      };
      _SgmntfY_._variables.segmentifyObj('journey:select', params);

      // view next step
      _SgmntfY_._jbOnStepViewHandler(jbDiscoveryData);
    },
    _jbRecalculateJourneyAnswer: function (jbDiscoveryData) {
      // the method is a remove current step from answer
      if (_SgmntfY_._variables.journey.previousStep === 'MAIN_CATEGORY') {
        _SgmntfY_._variables.journey.answer = {};
      } else if (_SgmntfY_._variables.journey.previousStep === 'CATEGORY') {
        var mainCateogryValue =
          _SgmntfY_._variables.journey.answer['mainCategory'];
        _SgmntfY_._variables.journey.answer = {};
        _SgmntfY_._variables.journey.answer.mainCategory = mainCateogryValue;
      } else {
        var calculatedAnswers = {};
        for (var index = 0; index < jbDiscoveryData.steps.length; index++) {
          // reset until current step
          var stepType = jbDiscoveryData.steps[index].type;
          var answerType = stepType.toLowerCase();
          if (stepType === 'MAIN_CATEGORY') {
            answerType = 'mainCategory';
          } else if (stepType === 'PRICE_RANGE') {
            answerType = 'priceRange';
          }
          if (_SgmntfY_._variables.journey.currentStep !== stepType) {
            if (_SgmntfY_._variables.journey.answer[answerType]) {
              calculatedAnswers[answerType] =
                _SgmntfY_._variables.journey.answer[answerType];
            }
          } else {
            _SgmntfY_._variables.journey.answer = {};
            _SgmntfY_._variables.journey.answer = calculatedAnswers;
            break;
          }
        }
      }
    },
    _jbExitHandler: function () {
      var params = {
        step: _SgmntfY_._variables.journey.currentStep,
        instanceId: _SgmntfY_._variables.journey.instanceId,
        answer: JSON.stringify(_SgmntfY_._variables.journey.answer),
      };
      _SgmntfY_._variables.segmentifyObj('journey:exit', params);
      _SgmntfY_._jbOnDestroyJourneyFlowExecution(false);
    },
    _getDistinctArray: function (array) {
      if (array && array.length > 0) {
        return array.filter(function (value, index) {
          return value && array.indexOf(value) === index;
        });
      } else {
        return [];
      }
    },
    _campaigns: {
      NEWSLETTER: function (campaign, request) {
        var config = {
          title: campaign['title'],
          description: campaign['description'],
          placeholder: campaign['placeholder'],
          fullNamePlaceHolder: campaign['fullNamePlaceHolder'],
          termsUrl: campaign['termsUrl'],
          termsText: campaign['termsText'],
          buttonSubmitText: campaign['buttonSubmitText'],
          buttonThanksText: campaign['buttonThanksText'],
          buttonBgColor: campaign['buttonBgColor'],
          buttonTextColor: campaign['buttonTextColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          overlay: campaign['overlay'] === 'true',
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Newsletter popup appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        //show overlay if exists
        if (config.overlay) {
          _SgmntfY_
            ._getJq()('<div class="seg-popup-overlay"></div>')
            .prependTo(_SgmntfY_._getJq()('body'));
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }

        // bind close handler
        _SgmntfY_
          ._getJq()('.seg-popup-close')
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(this);
            $this
              .parent('.seg-popup')
              .removeClass('segFadeInUp')
              .addClass('segFadeOutDown');
            window.setTimeout(function () {
              $this.parent('.seg-popup').remove();
              if (config.overlay) {
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }
            }, 1000);
          });
        // bind submit handler
        _SgmntfY_
          ._getJq()('.seg-form-submit')
          .bind('click', function (e) {
            _SgmntfY_
              ._getJq()('.seg-form-input')
              .removeClass('seg-form-invalid');
            _SgmntfY_
              ._getJq()('.seg-email-collection .seg-checkbox')
              .removeClass('seg-form-invalid');
            e.preventDefault();
            var $formInputEmail = _SgmntfY_._getJq()(
              '.seg-form-input[name="email"]',
            );
            var $formInputFullName = _SgmntfY_._getJq()(
              '.seg-form-input[name="fullName"]',
            );
            var $formCheckbox = _SgmntfY_._getJq()(
              '.seg-email-collection .seg-form-footer input[type="checkbox"]',
            );
            let isTrue;
            if ($formInputFullName.length > 0) {
              isTrue =
                isEmail($formInputEmail.val()) &&
                !_SgmntfY_._isEmpty($formInputFullName.val()) &&
                $formCheckbox.is(':checked') === true;
            } else {
              isTrue =
                isEmail($formInputEmail.val()) &&
                $formCheckbox.is(':checked') === true;
            }
            if (isTrue) {
              _SgmntfY_._getJq()(this).addClass('seg-sending');
              _SgmntfY_._getJq()(this).css({ 'pointer-events': 'none' });
              setTimeout(function () {
                if (config.overlay) {
                  _SgmntfY_._getJq()('.seg-popup-overlay').remove();
                }

                _SgmntfY_
                  ._getJq()('.seg-email-collection')
                  .addClass('seg-popup-thanks')
                  .removeClass('segFadeInUp');

                _SgmntfY_._getJq()(this).parent('.seg-popup').remove();
              }, 1300);
              setTimeout(function () {
                _SgmntfY_
                  ._getJq()('.seg-email-collection')
                  .addClass('segFadeOutDown');
              }, 3000);
              setTimeout(function () {
                _SgmntfY_._getJq()('.seg-email-collection').remove();
              }, 6000);
              // send form event
              var $newsletterForm = _SgmntfY_._getJq()('#seg-email-collection');
              if ($newsletterForm.length > 0) {
                _SgmntfY_._variables.segmentifyObj('user:form', {
                  formName: campaign['name'],
                  fields: $newsletterForm.sgmSerializeForm(),
                  params: {
                    instanceId: campaign['instanceId'],
                  },
                });
                // Contact Source Info
                _SgmntfY_._variables.segmentifyObj('user:update', {
                  email: $newsletterForm.sgmSerializeForm()['email'],
                  source: 'email-collection',
                });
                // send iys event
                _SgmntfY_._variables.segmentifyObj('user:iyspermissions', {
                  email: $newsletterForm.sgmSerializeForm()['email'],
                  emailNtf: true,
                });
              }
            }
            if (!isEmail($formInputEmail.val())) {
              $formInputEmail.addClass('seg-form-invalid');
            }
            if (_SgmntfY_._isEmpty($formInputFullName.val())) {
              $formInputFullName.addClass('seg-form-invalid');
            }
            if ($formCheckbox.is(':checked') == false) {
              _SgmntfY_
                ._getJq()('.seg-terms .seg-checkbox')
                .addClass('seg-form-invalid');
            }
          });

        var isEmail = function (email) {
          var regex =
            /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        };
      },
      FORM: function (campaign, request) {
        var config = {
          title: campaign['title'],
          description: campaign['description'],
          buttonSubmitText: campaign['buttonSubmitText'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
        };
        var fields = campaign['fields'] || [];
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i];
          // common config
          config['ff' + i + '_required'] = field['required'];
          // field specific config
          if (field['type'] === 'INPUT') {
            config['ff' + i + '_name'] = field['name'];
            config['ff' + i + '_placeholder'] = field['placeholder'];
            config['ff' + i + '_inputType'] = field['inputType'];
            if (field['name']) {
              config['ff' + i + '_fieldName'] = field['name'];
            } else {
              config['ff' + i + '_fieldName'] = 'input-' + i;
            }
          } else if (field['type'] === 'TEXT_AREA') {
            config['ff' + i + '_name'] = field['name'];
            config['ff' + i + '_placeholder'] = field['placeholder'];
            if (field['name']) {
              config['ff' + i + '_fieldName'] = field['name'];
            } else {
              config['ff' + i + '_fieldName'] = 'textarea-' + i;
            }
          } else if (
            field['type'] === 'CHECKBOX' ||
            field['type'] === 'RADIO_BUTTON'
          ) {
            config['ff' + i + '_groupTitle'] = field['groupTitle'];
            config['ff' + i + '_options'] = field['options'];
            if (field['groupTitle']) {
              config['ff' + i + '_fieldName'] = field['groupTitle'];
            } else {
              if (field['type'] === 'CHECKBOX') {
                config['ff' + i + '_fieldName'] = 'checkbox-' + i;
              } else {
                config['ff' + i + '_fieldName'] = 'radiobutton-' + i;
              }
            }
          }
        }
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Form popup appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        // instanceId
        _SgmntfY_
          ._getJq()('.seg-form-survey')
          .each(function () {
            var $this = _SgmntfY_._getJq()(this);
            if ($this.attr('class').indexOf('cmp_') === -1) {
              $this.addClass(campaign['instanceId']);
            }
          });
        // overlay
        if (campaign['overlay'] === 'true') {
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }
        // bind close handler
        _SgmntfY_
          ._getJq()('.' + campaign['instanceId'] + ' .seg-popup-close')
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(this);
            $this
              .parent('.seg-popup')
              .removeClass('segFadeInUp')
              .addClass('segFadeOutDown');
            window.setTimeout(function () {
              $this.parent('.seg-popup').remove();
              _SgmntfY_._getJq()('.seg-popup-overlay').remove();
            }, 1000);
          });
        // bind submit handler
        _SgmntfY_
          ._getJq()('.' + campaign['instanceId'] + ' .seg-form-submit')
          .bind('click', function (e) {
            e.preventDefault();
            var $this = _SgmntfY_._getJq()(this);
            var $formSurvey = _SgmntfY_._getJq()(
              '.' + campaign['instanceId'] + '.seg-form-survey',
            );
            var $form = $formSurvey.find('.seg-form');
            if (checkValidity($form)) {
              $this.addClass('seg-sending');
              $this.css({ 'pointer-events': 'none' });
              setTimeout(function () {
                $formSurvey
                  .addClass('seg-popup-thanks')
                  .removeClass('segFadeInUp');
              }, 1300);
              setTimeout(function () {
                $formSurvey.addClass('segFadeOutDown');
              }, 3000);
              setTimeout(function () {
                $formSurvey.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, 6000);
              // send form event
              if ($form.length > 0) {
                _SgmntfY_._variables.segmentifyObj('user:form', {
                  formName: campaign['name'],
                  fields: $form.sgmSerializeForm(),
                  params: {
                    instanceId: campaign['instanceId'],
                  },
                });
              }
            }
          });

        var checkValidity = function ($form) {
          try {
            $form.find('.seg-form-invalid').removeClass('seg-form-invalid');
            var fields = $form.find('input,textarea');
            var retVal = true;
            for (var i = 0; i < fields.length; ++i) {
              var field = fields[i];
              var $field = _SgmntfY_._getJq()(field);
              if ($field.attr('type') === 'checkbox') {
                continue;
              }
              if (!field.checkValidity()) {
                if ($field.attr('type') === 'radio') {
                  $field.parent().addClass('seg-form-invalid');
                } else {
                  $field.addClass('seg-form-invalid');
                }
                retVal = false;
              }
            }
            var $checkboxes = $form.find('input[type="checkbox"]');
            var checkboxNames = [];
            $checkboxes.each(function () {
              if (checkboxNames.indexOf(this.name) == -1) {
                checkboxNames.push(this.name);
              }
            });
            for (var j = 0; j < checkboxNames.length; ++j) {
              if (
                $form.find('input[name="' + checkboxNames[j] + '"]:required')
                  .length > 0 &&
                $form.find('input[name="' + checkboxNames[j] + '"]:checked')
                  .length == 0
              ) {
                $form
                  .find('input[name="' + checkboxNames[j] + '"]')
                  .parent()
                  .addClass('seg-form-invalid');
                retVal = false;
              }
            }
            return retVal;
          } catch (e) {
            return true;
          }
        };
      },
      POPUP_BANNER: function (campaign, request) {
        var config = {
          title: campaign['title'],
          image: campaign['image'],
          url: campaign['url'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
        };

        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        // overlay
        if (campaign['overlay'] === 'true') {
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }
        // bind close handler
        _SgmntfY_
          ._getJq()('.seg-popup-close')
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(this);
            $this
              .parent('.seg-popup')
              .removeClass('segFadeInUp')
              .addClass('segFadeOutDown');
            window.setTimeout(function () {
              $this.parent('.seg-popup').remove();
              _SgmntfY_._getJq()('.seg-popup-overlay').remove();
            }, 1000);
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'close',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // bind click handler
        _SgmntfY_
          ._getJq()('.seg-banner-container-v2 img')
          .bind('click', function () {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
      },
      /**
       * Persona Quiz SDK implementation
       * @see https://segmentify.atlassian.net/browse/SFY-157
       * Only Persona Quiz specified params added here, most detailed
       * information please checkout the response.
       * @param {object} campaign Campaign object
       * @param {string} campaign.quizTitle Quiz title
       * @param {object[]} campaign.responses Quiz responses
       * @param {string} campaign.responses.response Quiz response title
       * @param {string} campaign.responses.image Quiz response image
       * @param {string} campaign.responses.segmentName Quiz response segment name
       * @param {number} campaign.responses.segmentId Quiz response segment id
       * @param {object} campaign.resultButton Quiz submit button
       * @param {string} campaign.resultButton.title Submit button text
       * @param {string} campaign.resultButton.backgroundColor Submit button background color
       * @param {string} campaign.resultButton.textColor Submit button text color
       * @param {string} campaign.html Quiz html
       * @param {string} campaign.css Quiz css
       * @param {string} campaign.preJs Quiz pre-js
       * @param {string} campaign.postJs Quiz post-js
       * @param {string} campaign.overlay Popup overlay
       * @param {string} campaign.verticalPosition Popup vertical position
       * @param {string} campaign.horizontalPosition Popup horizontal position
       * @return {undefined} no return value
       */
      PERSONA_QUIZ: function (campaign, request) {
        if (typeof campaign === 'undefined') return;

        // Required _SgmntfY_ variables
        var jQuery = _SgmntfY_._getJq();
        var Mustache = _SgmntfY_._getMustache();
        var queue = _SgmntfY_._variables.segmentifyObj;
        var log = _SgmntfY_.LOG_MESSAGE;

        // Accessable variables from the pre-render and render methods.
        var config = {
          quizTitle: campaign['quizTitle'],
          responses: campaign['responses'],
          resultButton: campaign['resultButton'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          instanceId: campaign['instanceId'],
          onlyOneSelected: campaign['onlyOneSelected'],
        };

        // Pre-render the Persona Quiz HTML
        if (campaign.hasOwnProperty('preJs') === true) {
          try {
            /**
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
             * DO NOT USE eval() here. @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
             */
            var preRender = Function(
              '"use strict";return ('.concat(campaign['preJs'], ')'),
            )();

            var preRenderStatus = preRender(config);
            if (typeof preRenderStatus !== 'undefined' && !preRenderStatus) {
              log('WARN', 'preRenderConf returned false exiting!');
              return;
            }
          } catch (error) {
            log(
              'WARN',
              'Error in executing campaign pre js code: '.concat(error),
            );
          }
        }

        // Render the Persona Quiz HTML
        if (campaign.hasOwnProperty('html') === true) {
          var html = Mustache.render(campaign.html, config);
          var htmlContainer = document.createElement('div');
          htmlContainer.innerHTML = html;

          document.body.appendChild(htmlContainer);
        }

        // Append the CSS into the head
        if (campaign.hasOwnProperty('css') === true) {
          var css = document.createElement('style');
          css.innerHTML = campaign.css;

          document.head.appendChild(css);
        }

        var logic =
          /**
           * Persona Quiz logic
           * @param {object} config Config object
           * @param {string} config.instanceId The instance id of the campaign
           * @param {boolean} config.onlyOneSelected Whether or not to allow only one selection
           * @param {Function} queue Segmentify event queue
           * @return {boolean} Whether or not to continue the campaign
           */
          (function (config, queue) {
            var instanceId = config.instanceId;
            var onlyOneSelected = config.onlyOneSelected;
            var successTimeout = config.successTimeout || 5000;

            // DOM querys
            var persona = document.querySelectorAll(
              '.seg-my-persona-'.concat(instanceId, ' .seg-persona-item'),
            );
            var button = document.querySelector(
              '.seg-my-persona-'.concat(
                instanceId,
                ' .seg-persona-submit--button',
              ),
            );
            var checkboxes = document.querySelectorAll(
              '.seg-my-persona-'.concat(
                instanceId,
                ' .seg-persona-item .seg-persona-item--checkbox',
              ),
            );
            var container = document.querySelector(
              '.seg-my-persona-'.concat(instanceId),
            );
            var closeButton = document.getElementById(
              'seg-my-persona-'.concat(instanceId, '--close'),
            );

            // If the required elements are not exist, exit.
            if (
              persona === null ||
              button === null ||
              checkboxes === null ||
              container === null ||
              closeButton === null
            )
              return false;

            /**
             * Add the event listener to the persona items
             * @param {MouseEvent} event @see https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
             * @param {MouseEvent.currentTarget} currentTarget the target element of the event
             */
            var personaClickHandler = function (event) {
              var currentTarget = event.currentTarget;

              var checkbox = currentTarget.querySelector(
                '.seg-persona-item--checkbox',
              );

              // Checks for multiple answers
              if (onlyOneSelected === true) {
                checkboxes.forEach(function (checkboxEl) {
                  checkboxEl.classList.remove('selected');
                });
                persona.forEach(function (personaEl) {
                  personaEl.classList.remove('selected');
                });
              }

              if (checkbox.classList.contains('selected')) {
                // If already checked remove the selected class
                currentTarget
                  .querySelector('.seg-persona-item--checkbox')
                  .classList.remove('selected');

                currentTarget.classList.remove('selected');
              } else {
                // If not checked add the selected class
                currentTarget
                  .querySelector('.seg-persona-item--checkbox')
                  .classList.add('selected');

                currentTarget.classList.add('selected');
              }

              return true;
            };

            // Bind the event listener to the persona items
            persona.forEach(function (element) {
              element.addEventListener('click', personaClickHandler);
            });

            // Bind the event listener to the submit button
            button.addEventListener('click', function () {
              const state = [];

              // Get the selected persona items
              checkboxes.forEach(function (element) {
                if (element.classList.contains('selected') === false) return;

                state.push({
                  segmentName: element.getAttribute('segment-name'),
                  segmentId: element.getAttribute('segment-id'),
                });
              });

              if (state.length === 0) {
                // If no persona item is selected, show error.
                container.classList.add('seg-persona-error');
              } else {
                // If persona item is selected, remove the error class and send the event & show success.
                container.classList.remove('seg-persona-error');
                container.classList.add('seg-persona-success');
                setTimeout(function () {
                  closeButton.click();
                }, successTimeout);

                // Send the impression event
                queue('select:persona', {
                  answers: state,
                  instanceId: campaign['instanceId'],
                });
              }
            });
          })(config, queue);

        if (typeof logic !== 'undefined' && logic === false) {
          log(
            'WARN',
            'Persona Quiz logic returned false, please checkout the required elements!',
          );
        }

        // Post-render the Persona Quiz HTML
        if (campaign.hasOwnProperty('postJs') === true) {
          try {
            /**
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
             * DO NOT USE eval() here. @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
             */
            Function('"use strict";return ('.concat(campaign.postJs, ')'))();
          } catch (error) {
            log(
              'WARN',
              'Error in executing campaign post js code: '.concat(error),
            );
          }
        }

        // Popup overlay
        // TODO: Convert to the pure JS version
        if (campaign['overlay'] === 'true') {
          jQuery('.seg-popup-overlay').show();
        }

        // Bind the close button handler
        // TODO: Convert to the pure JS version
        jQuery('.seg-popup-close').bind('click', function () {
          var closeElement = jQuery(this);
          closeElement
            .parent('.seg-popup')
            .removeClass('segFadeInUp')
            .addClass('segFadeOutDown');

          window.setTimeout(function () {
            closeElement.parent('.seg-popup').remove();
            jQuery('.seg-popup-overlay').remove();
          }, 1000);

          // Send the interaction event
          queue('event:interaction', {
            type: 'close',
            instanceId: campaign['instanceId'],
            interactionId: campaign['instanceId'],
          });
        });

        // Send the impression event
        queue('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
      },
      NOTIFICATION_BAR: function (campaign, request) {
        var config = {
          title: campaign['title'],
          image: campaign['image'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          url: campaign['url'],
          instanceId: campaign['instanceId'],
          divClass: 'sgf-notif-bar-' + (campaign['verticalPosition'] || 'top'),
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Notification Bar appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // add sticky option
        if (campaign['sticky'] === 'true') {
          _SgmntfY_
            ._getJq()('.seg-notification-bar')
            .addClass('seg-notification-bar-sticky');

          // each all existing sticky bars
          _SgmntfY_
            ._getJq()('.seg-notification-bar-sticky:not([data-loaded])')
            .each(function () {
              // get current iteration
              var $this = _SgmntfY_._getJq()(this);

              $this.attr('data-loaded', 'true');

              // check if notification bar has an image
              if ($this.find('img').length) {
                // simpler image construction
                var barImage = $this.find('img:first');
                var barImageUrl =
                  barImage.attr('src') || barImage.attr('data-src');

                // wait image to be loaded
                barImage.on('load', function () {
                  // get parent notification bar element
                  var $this = _SgmntfY_
                    ._getJq()(this)
                    .parents('.seg-notification-bar:first');

                  // get body padding-top css value
                  var topBarHeight = parseInt(
                    _SgmntfY_
                      ._getJq()('body')
                      .css('padding-top')
                      .replace('px', ''),
                  );

                  // get body padding-bottom css value
                  var bottomBarHeight = parseInt(
                    _SgmntfY_
                      ._getJq()('body')
                      .css('padding-bottom')
                      .replace('px', ''),
                  );

                  if ($this.hasClass('sgf-notif-bar-top')) {
                    topBarHeight += $this.height();
                  } else if ($this.hasClass('sgf-notif-bar-bottom')) {
                    bottomBarHeight += $this.height();
                  }

                  _SgmntfY_
                    ._getJq()('body')
                    .css('padding-top', topBarHeight)
                    .css('padding-bottom', bottomBarHeight);
                });

                // set image src attribute with the image url
                barImage[0].src = barImageUrl;
              }
            });
        }
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        // bind click handler
        if (
          _SgmntfY_._getJq()(
            '.seg-notification-bar-v2-' + campaign['instanceId'],
          ).length
        ) {
          _SgmntfY_
            ._getJq()('.seg-notification-bar-v2-' + campaign['instanceId'])
            .bind('click', function () {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'click',
                instanceId: campaign['instanceId'],
                interactionId: campaign['instanceId'],
              });
            });
        } else {
          _SgmntfY_
            ._getJq()('.sgf-link')
            .bind('click', function () {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'click',
                instanceId: campaign['instanceId'],
                interactionId: campaign['instanceId'],
              });
            });
        }
      },
      PUSH_PERMISSION: function (campaign, request) {
        var config = {
          title: campaign['title'],
          text: campaign['text'],
          icon: campaign['icon'],
          buttonLaterText: campaign['buttonLaterText'],
          buttonAllowText: campaign['buttonAllowText'],
          safariEnabled: campaign['safariEnabled'],
          swPath: campaign['serviceWorkerPath'],
          twoStepEnabled: campaign['twoStepEnabled'],
        };
        // change swPath if necessary
        if (
          window.location.origin.indexOf('www') > 0 &&
          config.swPath.indexOf('www') < 0
        ) {
          config.swPath = config.swPath.replace('https://', 'https://www.');
        } else if (
          window.location.origin.indexOf('www') < 0 &&
          config.swPath.indexOf('www') > 0
        ) {
          config.swPath = config.swPath.replace('https://www.', 'https://');
        }

        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }

        try {
          // 1- get existing value
          var _pushPermissionKey = _SgmntfY_._getPersistentData(
            _SgmntfY_._variables.pushPermissionKey,
          );
          var exdays = -1;
          var frequency = campaign.frequency;
          if (frequency) {
            if (frequency.type === 'SESSION') {
              exdays = 0;
            } else if (frequency.type === 'LIFETIME') {
              exdays = 390;
            } else if (frequency.type === 'DAYS') {
              exdays = frequency.param;
            }
          }
          // 2- set new cookie expiration
          _SgmntfY_._storePersistentData(
            _SgmntfY_._variables.pushPermissionKey,
            'true',
            exdays,
          );
          // 3- check cookie value
          if (
            _SgmntfY_._isNotEmpty(_pushPermissionKey) &&
            _pushPermissionKey === 'true'
          ) {
            return;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Error while checking campaign frequency:' + err,
          );
          // in case of error just set pushPermissionKey expiration time to session
          _SgmntfY_._storePersistentData(
            _SgmntfY_._variables.pushPermissionKey,
            'true',
            0,
          );
        }

        try {
          campaign['postJs'] && eval(campaign['postJs']);
          // populate pushInfo object
          if (/OPR/i.test(navigator.userAgent))
            _SgmntfY_._variables.pushInfo.agent = 'Opera';
          else if (
            /YaBrowser/i.test(navigator.userAgent) ||
            /Yowser/i.test(navigator.userAgent)
          )
            _SgmntfY_._variables.pushInfo.agent = 'Yandex';
          else if (/SamsungBrowser/i.test(navigator.userAgent))
            _SgmntfY_._variables.pushInfo.agent = 'Samsung';
          else if (/ucbrowser/i.test(navigator.userAgent))
            _SgmntfY_._variables.pushInfo.agent = 'UCBrowser';
          else if (/Chrome/i.test(navigator.userAgent))
            _SgmntfY_._variables.pushInfo.agent = 'Chrome';
          else if (/Firefox/i.test(navigator.userAgent))
            _SgmntfY_._variables.pushInfo.agent = 'Firefox';

          if ('safari' in window && 'pushNotification' in window.safari) {
            _SgmntfY_._variables.pushInfo.agent = 'Safari';
          }

          if (
            _SgmntfY_._variables.pushInfo.agent === 'Chrome' ||
            _SgmntfY_._variables.pushInfo.agent === 'Opera' ||
            _SgmntfY_._variables.pushInfo.agent === 'Yandex' ||
            _SgmntfY_._variables.pushInfo.agent === 'Samsung' ||
            _SgmntfY_._variables.pushInfo.agent === 'UCBrowser' ||
            _SgmntfY_._variables.pushInfo.agent === 'Firefox'
          ) {
            _SgmntfY_._variables.pushInfo.isFirebaseCompatible = true;
          }

          if (
            _SgmntfY_._variables.pushInfo.agent !== 'Safari' &&
            (_SgmntfY_._variables.pushInfo.permissionMethod === 'Firebase' ||
              _SgmntfY_._variables.pushInfo.permissionMethod ===
                'FirebaseV2') &&
            _SgmntfY_._variables.pushInfo.isFirebaseCompatible
          ) {
            if (_SgmntfY_._variables.pushInfo.useV2) {
              _SgmntfY_._variables.pushInfo.fcm.getToken = {};
              _SgmntfY_._pushInitFCM(campaign, config);
            } else {
              _SgmntfY_
                ._getJq()
                .getScript(
                  _SgmntfY_._variables.pushInfo.firebase.scriptUrl,
                  function () {
                    if (_SgmntfY_._variables.pushInfo.isFirebaseCompatible) {
                      if (!firebase.apps.length) {
                        firebase.initializeApp({
                          apiKey: _SgmntfY_._variables.pushInfo.firebase.apiKey,
                          messagingSenderId:
                            _SgmntfY_._variables.pushInfo.firebase
                              .messagingSenderId,
                        });
                      }
                      _SgmntfY_._variables.pushInfo.messaging =
                        firebase.messaging();
                    }
                    if ('serviceWorker' in navigator) {
                      navigator.serviceWorker
                        .register(config.swPath, { updateViaCache: 'none' })
                        .then(function (reg) {
                          if (
                            _SgmntfY_._variables.pushInfo.isFirebaseCompatible
                          ) {
                            firebase.messaging().useServiceWorker(reg);
                          }
                          _SgmntfY_._variables.pushInfo.serviceWorkerReg = reg;
                          _SgmntfY_._pushInitPermissionCampaign(
                            campaign,
                            config,
                          );
                        })
                        .catch(function (e) {
                          _SgmntfY_.LOG_MESSAGE(
                            'ERROR',
                            'Error while registering service worker ' + e,
                          );
                        });
                    }
                  },
                );
            }
          }

          if (_SgmntfY_._variables.pushInfo.agent === 'Safari') {
            _SgmntfY_._pushInitPermissionCampaign(campaign, config);
          }
          if (
            _SgmntfY_._variables.pushInfo.agent !== 'Safari' &&
            _SgmntfY_._variables.pushInfo.permissionMethod === 'Vapid'
          ) {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker
                .register(config.swPath, { updateViaCache: 'none' })
                .then(function (reg) {
                  _SgmntfY_._variables.pushInfo.serviceWorkerReg = reg;
                  _SgmntfY_._pushInitPermissionCampaign(campaign, config);
                })
                .catch(function (e) {
                  _SgmntfY_.LOG_MESSAGE(
                    'ERROR',
                    'Error while registering service worker in vapid method' +
                      e,
                  );
                });
            }
          }
        } catch (e) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Error while executing PUSH_PERMISSION campaign ' + e,
          );
        }
      },
      HERO_BANNER: function (campaign) {
        var config = {
          title: campaign['title'],
          url: campaign['url'],
          image: campaign['image'],
          instanceId: campaign['instanceId'],
        };
        // widget-view callback definition
        var _instanceId = campaign['instanceId']; // will also be used for interactionId
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._interaction('widget-view', _instanceId, _instanceId);
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._interaction(
                    'widget-view',
                    _instanceId,
                    _instanceId,
                  );
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };
        // html & preJs & postJs & css
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        try {
          // get target element as jQuery object
          var _target = campaign['targetSelector'];
          var targetElement = _SgmntfY_._getJq()(_target).first();
          // put rendered banner HTML into the target
          var _targetPosition = campaign['targetPosition'];
          if (_targetPosition === 'SELF') {
            targetElement.html(renderedHtml);
            if (wvCB) {
              wvCB(targetElement);
            }
          } else {
            var $div = _SgmntfY_._getJq()('<div/>', {
              class: 'seg-hero-banner-wrapper seg-clear',
            });
            if (_targetPosition === 'AFTER' || _targetPosition === 'BEFORE') {
              _targetPosition === 'AFTER'
                ? $div.html(renderedHtml).insertAfter(targetElement)
                : $div.html(renderedHtml).insertBefore(targetElement);
            } else if (
              _targetPosition === 'APPEND' ||
              _targetPosition === 'PREPEND'
            ) {
              _targetPosition === 'APPEND'
                ? $div.html(renderedHtml).appendTo(targetElement)
                : $div.html(renderedHtml).prependTo(targetElement);
            }
            if (wvCB) {
              wvCB($div);
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in filling target element [' +
              _target +
              '] for banner: ' +
              err,
          );
        }
        if (campaign['css']) {
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        }
        try {
          if (campaign['postJs']) {
            eval(campaign['postJs']);
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Hero Banner inserted to html for campaign(' + _instanceId + ')',
        );
        // interaction events
        // send impression
        _SgmntfY_._interaction('impression', _instanceId, _instanceId);
        // bind click handler
        if (_SgmntfY_._getJq()('.seg-hero-banner-link-' + _instanceId).length) {
          _SgmntfY_
            ._getJq()('.seg-hero-banner-link-' + _instanceId)
            .bind('click', function () {
              _SgmntfY_._interaction('click', _instanceId, _instanceId);
            });
        }
      },
      ADDED_TO_BASKET: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          iconUrl: campaign['iconUrl'],
          horizontal: campaign['horizontalPosition'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'AddedToBasket appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });

        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      LAST_BOUGHT_TIME: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'LastBoughtTime appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      PRODUCT_PURCHASE_COUNTER: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'ProductPurchaseCounter appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      PRODUCT_VIEW_COUNTER: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'ProductViewCounter appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      SAVING_OVER: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'SavingOver appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      SCORE_AND_REVIEW: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'ScoreAndReview appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      STOCK_COUNT: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'StockCount appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      PREVIOUSLY_ADDED_TO_BASKET: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'PreviouslyAddedToBasket appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      LAST_VISIT_TIME: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'LastVisitTime appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      FAVORITE_ACTIVITY: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          campaignMessage: campaign['campaignMessage'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
          iconUrl: campaign['iconUrl'],
          fadeOut: campaign['fadeOut'],
          runFadeOut: true,
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
          if (config.fadeOut === undefined || config.fadeOut === 0) {
            config.fadeOut = 1;
            config.runFadeOut = false;
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'FavoriteActivity appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        if (config.runFadeOut === false) {
          // bind close handler
          _SgmntfY_
            ._getJq()('.seg-social-proof-popup-close-' + config.instanceId)
            .bind('click', function () {
              var $this = _SgmntfY_._getJq()(this);
              window.setTimeout(function () {
                $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
                $this.remove();
                _SgmntfY_._getJq()('.seg-popup-overlay').remove();
              }, config.fadeOut * 1000);
            });
        } else {
          var $this = _SgmntfY_._getJq()(
            _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            ),
          );
          window.setTimeout(function () {
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          }, config.fadeOut * 1000);
        }

        _SgmntfY_
          ._getJq()('.seg-social-proof-close-' + config.instanceId)
          .bind('click', function () {
            var $this = _SgmntfY_._getJq()(
              '.seg-social-proof-popup-close-' + config.instanceId,
            );
            $this.removeClass('segFadeInUp').addClass('segFadeOutDown');
            $this.remove();
            _SgmntfY_._getJq()('.seg-popup-overlay').remove();
          });
      },
      SEE_ALL: function (campaign) {
        var config = {
          instanceId: campaign['instanceId'],
          buttonText: campaign['buttonText'],
          buttonUrl: campaign['buttonUrl'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
        };
        // widget-view callback definition
        var _instanceId = campaign['instanceId']; // will also be used for interactionId
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._interaction('widget-view', _instanceId, _instanceId);
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._interaction(
                    'widget-view',
                    _instanceId,
                    _instanceId,
                  );
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };
        // html & preJs & postJs & css
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        try {
          // get target element as jQuery object
          var _target = campaign['targetSelector'];
          var targetElement = _SgmntfY_._getJq()(_target).first();
          // put rendered banner HTML into the target
          var _targetPosition = campaign['targetPosition'];
          if (_targetPosition === 'SELF') {
            targetElement.html(renderedHtml);
            if (wvCB) {
              wvCB(targetElement);
            }
          } else {
            var $div = _SgmntfY_._getJq()('<div/>', {
              class: 'sgm-see-all-button-wrapper seg-clear',
            });
            if (_targetPosition === 'AFTER' || _targetPosition === 'BEFORE') {
              _targetPosition === 'AFTER'
                ? $div.html(renderedHtml).insertAfter(targetElement)
                : $div.html(renderedHtml).insertBefore(targetElement);
            } else if (
              _targetPosition === 'APPEND' ||
              _targetPosition === 'PREPEND'
            ) {
              _targetPosition === 'APPEND'
                ? $div.html(renderedHtml).appendTo(targetElement)
                : $div.html(renderedHtml).prependTo(targetElement);
            }
            if (wvCB) {
              wvCB($div);
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in filling target element [' +
              _target +
              '] for banner: ' +
              err,
          );
        }
        if (campaign['css']) {
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        }
        try {
          if (campaign['postJs']) {
            eval(campaign['postJs']);
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'SeeAll campaign inserted to html for campaign(' + _instanceId + ')',
        );
        // interaction events
        // send impression
        _SgmntfY_._interaction('impression', _instanceId, _instanceId);
        // bind click handler
        if (_SgmntfY_._getJq()('.seg-see-all-link-' + _instanceId).length) {
          _SgmntfY_
            ._getJq()('.seg-see-all-link-' + _instanceId)
            .bind('click', function () {
              location.href = config.buttonUrl;
            });
        }
      },
      WHEEL_OF_FORTUNE: function (campaign) {
        var config = {
          slices: campaign['possibleRewards'],
          reward: campaign['reward'],
          instanceId: campaign['instanceId'],
          wofBackGroundImg: campaign['bgImage'],
          wofHeader: campaign['campaignTitle'],
          wofModalHeader: campaign['resultTitle'],
          pointerColor: campaign['pointerColor'],
          wheelBaseColor: campaign['baseColor'],
          pointerImage: campaign['pointerImage'],
          contentOfButton: campaign['ctaButtonContent'],
          contentButtonColor: campaign['ctaButtonColor'],
          contentButtonTextColor: campaign['ctaButtonTextColor'],
          overlay: campaign['overlay'],
        };

        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'FavoriteActivity appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );

        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });

        // WOF IMPLEMENTATIONS START HERE

        // CAMPAIGN OBJECT AND VARIABLES
        function getScreenWidth() {
          return window.innerWidth;
        }

        var slicesLength = config.slices.length;

        var wofHeader = document.querySelector('.seg-wof-header');
        var elSpin = document.querySelector('.seg-wof-content-of-button');
        var wheelBaseRectangle = document.querySelector(
          '#seg-wheel-base-circle',
        );
        var wheelBaseCircle = document.querySelector('#seg-wheel-circle');
        var wheelPointer = document.querySelector('#seg-wof-pointer-svg');
        var wheelCenterPointImg = document.querySelector(
          '.seg-wof-center-point-image',
        );
        var contentOfButton = document.querySelector(
          '.seg-wof-content-of-button',
        );
        var overlay = document.querySelector('.seg-drop-layout');

        var modalClose = document.querySelector(
          '.seg-modal-bg .seg-wof-modal-close',
        );
        var winModalClose = document.querySelector(
          '.seg-wof-win-bg .seg-wof-modal-close',
        );

        var wheelBg = document.querySelector('.seg-modal-bg');
        var winModalBackGround = document.querySelector('.seg-wof-win-bg');
        var winModalHeader = document.querySelector(
          '.seg-wof-win-bg .seg-wof-header',
        );
        var windDescription = document.querySelector(
          '.seg-wof-win-description',
        );
        var winCoupon = document.querySelectorAll('.seg-wof-win-coupon');
        var anchorButton = document.querySelector(
          '.seg-wof-win-description-button',
        );

        var couponBtn = document.querySelectorAll('.seg-wof-copy-coupon');
        var btnCouponInitialState = document.querySelectorAll(
          '.seg-copy-btn-initial-state',
        );
        var btnCouponFinalState = document.querySelectorAll(
          '.seg-copy-btn-final-state',
        );

        var couponReady = document.querySelector('.seg-coupon-ready-icon');
        var couponReadyIcon = document.querySelector('.seg-coupon-ready-icon');
        var couponReadyModal = document.querySelector(
          '.seg-coupon-ready-modal',
        );
        var couponReadyContainer = document.querySelector(
          '.seg-coupon-ready-container',
        );
        var couponReadyCloseIcon = document.querySelector(
          '.seg-arrow-close-icon',
        );
        var segCouponReadyHeader = document.querySelector(
          '.seg-coupon-ready-header',
        );
        var couponReadyContent = document.querySelector(
          '.seg-coupon-ready-header-content',
        );
        var pointerImageContainer = document.querySelector('.seg-wof-icon');

        var wheelRotateContainer = document.querySelector(
          '.sfy-wheel-container',
        );

        function drawWheelBase() {
          document.body.classList.add('seg-overflow-lock');
          // Set overlay activity
          overlay.style['background-color'] =
            config.overlay === 'true' ? 'rgba(53,44,44,0.8)' : 'transparent';
          // Set wheel background image
          wheelBg.style.backgroundImage = `url(${config.wofBackGroundImg})`;
          // Set wheel header
          wofHeader.innerHTML = config.wofHeader;
          // Wheel Pointer
          wheelPointer.style.fill = config.pointerColor;
          // Wheel Base Circle
          wheelBaseRectangle.style.fill = config.wheelBaseColor;
          // Wheel Base
          wheelBaseCircle.style.fill = config.wheelBaseColor;
          // Content of Button
          contentOfButton.innerHTML = config.contentOfButton;
          // Content of Button Color
          contentOfButton.setAttribute(
            'style',
            'background-color: ' + config.contentButtonColor + '!important',
          );
          // Content of Button Text Color
          contentOfButton.style.color = config.contentButtonTextColor;

          // Pointer Image
          if (config.pointerImage && config.pointerImage !== '') {
            wheelCenterPointImg.src = config.pointerImage;
          } else {
            wheelCenterPointImg.remove();
            pointerImageContainer.style.backgroundColor = config.wheelBaseColor;
          }
        }

        var PI = Math.PI;
        var tot = slicesLength;
        var TAU = 2 * PI;
        var arc = TAU / tot; //current angles
        var isSpinning = false; //Is wheel spinning?
        var isAccelerating = false; //Is wheel accelerating?
        var freeSpinning = true; //Is wheel response received or spin free?
        var finishDegree = 0; // last degree of wheel
        var isReadyToFinish = false; // is wheel has all flags set to true
        var differenceDegreeForFinish = 360 * 8; // 8 rotations
        var angleForOneSlice = 360 / slicesLength;
        var userHasSpinWheelWonReward = config.reward.assignedToUser;

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        function winHandler() {
          if (!config.pointerImage) {
            wheelCenterPointImg.style.display = 'none';
          }
          wheelBg.remove();

          wheelBg.style.display = 'none';

          winModalBackGround.style.backgroundImage = `url(${config.wofBackGroundImg})`;

          winModalBackGround.style.display = 'block';

          windDescription.innerHTML = config.reward.description;
          winModalHeader.innerHTML = config.wofModalHeader;

          for (var c = 0; c < winCoupon.length; c++) {
            winCoupon[c].value = config.reward.coupon;
          }

          anchorButton.href = config.reward.couponUrl;

          _SgmntfY_._variables.segmentifyObj('gamification:wof', {
            type: 'win',
            interactionId: config.instanceId,
            instanceId: config.instanceId,
            used: 'true',
            record: config.reward,
          });

          anchorButton.addEventListener('click', function () {
            winModalBackGround.style.display = 'none';
          });
        }

        modalClose.addEventListener('click', function (e) {
          _SgmntfY_._variables.segmentifyObj('gamification:wof', {
            type: 'win',
            interactionId: config.instanceId,
            instanceId: config.instanceId,
            used: 'false',
            record: config.reward,
          });
          document.body.classList.remove('seg-overflow-lock');
          wheelBg.remove();
          overlay.remove();
        });

        winModalClose.addEventListener('click', function (e) {
          winModalBackGround.style.display = 'none';
          overlay.style.display = 'none';
          couponReadyContainer.style.display = 'inline-flex';
          document.body.classList.remove('seg-overflow-lock');
        });

        function degreesToRadians(degrees) {
          return (degrees * Math.PI) / 180;
        }

        // to change the color of buttons and banner of wof
        anchorButton.style.backgroundColor = config.contentButtonColor;
        couponReadyIcon.style.backgroundColor = config.contentButtonColor;
        segCouponReadyHeader.style.backgroundColor = config.contentButtonColor;

        for (var cp = 0; cp < couponBtn.length; cp++) {
          couponBtn[cp].style.backgroundColor = config.contentButtonColor;
          couponBtn[cp].addEventListener('click', function (e) {
            document.body.classList.remove('seg-overflow-lock');
            navigator.clipboard.writeText(config.reward.coupon);

            for (let bsi = 0; bsi < btnCouponInitialState.length; bsi++) {
              btnCouponInitialState[bsi].style.display = 'none';
              btnCouponFinalState[bsi].style.display = 'block';
            }

            setTimeout(function () {
              for (let bsi = 0; bsi < btnCouponInitialState.length; bsi++) {
                btnCouponFinalState[bsi].style.display = 'none';
                btnCouponInitialState[bsi].style.display = 'block';
              }
            }, 1000);
          });
        }

        function frame() {
          if (!isSpinning) return;

          if (!isReadyToFinish) {
            var randomFinishDegreeInSlice = randomInRange(
              2,
              angleForOneSlice - 2,
            );
            differenceDegreeForFinish += randomFinishDegreeInSlice;

            finishDegree =
              (config.reward.index * angleForOneSlice +
                differenceDegreeForFinish) *
              -1;
          }

          isReadyToFinish = true;

          if (isReadyToFinish) {
            wheelRotateContainer.style.transition = 'none';
            wheelRotateContainer.style.transform = `rotate(0deg)`;
            wheelRotateContainer.style.transition = 'transform 5s ease-out 0s';
            wheelRotateContainer.style.transform = `rotate(${finishDegree}deg)`;

            isSpinning = false;

            setTimeout(function () {
              winHandler();
            }, 6750);
          }
        }

        function wheelEngine() {
          frame();
          requestAnimationFrame(wheelEngine);
        }

        elSpin.addEventListener('click', function (e) {
          if (isSpinning) return;
          isSpinning = true;
          isAccelerating = true;

          wheelRotateContainer.style.transition =
            'transform 15s cubic-bezier(0.1, 0, 1, 1) 0s';
          wheelRotateContainer.style.transform = `rotate(10800deg)`;

          _SgmntfY_._variables.segmentifyObj('event:interaction', {
            type: 'click',
            instanceId: campaign['instanceId'],
            interactionId: campaign['instanceId'],
          });

          setTimeout(function () {
            freeSpinning = false;
          }, 3000);
        });

        couponReadyIcon.addEventListener('click', function (e) {
          var screenWidth = getScreenWidth();
          if (screenWidth <= 600) {
            couponReadyIcon.style.setProperty('display', 'none', 'important');
            couponReadyContainer.top = '15%';
            couponReadyContainer.style.marginLeft = '-30px';
            couponReadyContent.innerHTML = config.reward.description;
          }
          couponReadyModal.style.display = 'flex';
          couponReadyContent.innerHTML = config.reward.description;
        });

        couponReadyCloseIcon.addEventListener('click', function (e) {
          if (getScreenWidth() <= 600) {
            couponReadyModal.style.display = 'none';
            couponReadyContainer.top = '0%';
            couponReadyContainer.style.marginLeft = '0px';
            couponReadyIcon.style.display = 'flex';
          }
          couponReadyModal.style.display = 'none';
          couponReadyIcon.style.display = 'flex';
        });

        // INIT!
        if (!userHasSpinWheelWonReward) {
          drawWheelBase();
          wheelEngine();
        } else {
          overlay.style.display = 'none';
          couponReadyContainer.style.display = 'flex';
          couponReadyContent.innerHTML = config.reward.description;
          winCoupon[1].value = config.reward.coupon;
        }

        // WOF IMPLEMENTATIONS FINISHES HERE
      },
      POP_UP_BANNER_COUNTDOWN: function (campaign) {
        var config = {
          targetUrl: campaign['targetUrl'],
          name: campaign['name'],
          title: campaign['title'],
          description: campaign['description'],
          seperator: campaign['seperator'],
          showOnWebsite: campaign['showOnWebsite'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          imageUrl: campaign['imageUrl'],
          overlay: campaign['overlay'],
          endDate: campaign['endDate'],
          vertical: campaign['verticalPosition'],
          horizontal: campaign['horizontalPosition'],
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'FavoriteActivity appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // overlay
        if (config.overlay) {
          _SgmntfY_._getJq()('.seg-popup-overlay').show();
        }
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        // bind close handler
        _SgmntfY_
          ._getJq()('.seg-popup-countdown-close')
          .bind('click', function () {
            window.clearInterval(popUpInterval);
            var $this = _SgmntfY_._getJq()(this);
            $this
              .parent('.seg-popup')
              .removeClass('segFadeInUp')
              .addClass('segFadeOutDown');
            window.setTimeout(function () {
              $this.parent('.seg-popup').remove();
              _SgmntfY_._getJq()('.seg-popup-overlay').remove();
            }, 1000);
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'close',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // bind click handler
        _SgmntfY_
          ._getJq()('.seg-banner-container-v2 img')
          .bind('click', function () {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // COUNT_DOWN_BNP IMPLEMENTATIONS STARTS HERE
        var mainElement = document.querySelector('.seg-countdown-timeWrapper');

        function createCountDownItem(obj) {
          var count = 0;
          count++;
          var timeCardHTML;
          if (count > 1) {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownP' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'n"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n';
            mainElement.innerHTML += timeCardHTML;
          } else {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownP' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'n"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n' +
              '<h3 style="color:' +
              config.textColor +
              '" class="seg-countdown-seperator ' +
              obj.activate +
              'CountdownP' +
              '">' +
              config.seperator +
              '</h3>';
            mainElement.innerHTML += timeCardHTML;
          }
        }

        countdownRenderer(config.showOnWebsite);

        function countdownRenderer(timeObj) {
          timeObj.forEach((item) => {
            createCountDownItem(item);
          });
          Array.from(document.querySelectorAll('.trueCountdownP')).slice(
            -1,
          )[0].style.display = 'none';
        }

        var popUpInterval = setInterval(function () {
          var dayVal = document.querySelector('#seg-countdown-DAYn');
          var hourVal = document.querySelector('#seg-countdown-HOURn');
          var minVal = document.querySelector('#seg-countdown-MINUTEn');
          var secVal = document.querySelector('#seg-countdown-SECONDn');
          var diff = new Date(config.endDate) - new Date();
          var d = Math.floor(diff / 1000 / 60 / 60 / 24);
          var h = Math.floor(diff / 1000 / 60 / 60) % 24;
          var m = Math.floor(diff / 1000 / 60) % 60;
          var s = Math.floor(diff / 1000) % 60;
          if (s < 0) {
            window.clearInterval(popUpInterval);
            return;
          }
          if (h < 10) {
            hourVal.innerHTML = '0' + h + '';
          } else {
            hourVal.innerHTML = h;
          }
          if (m < 10) {
            minVal.innerHTML = '0' + m + '';
          } else {
            minVal.innerHTML = m;
          }
          if (s < 10) {
            secVal.innerHTML = '0' + s + '';
          } else {
            secVal.innerHTML = s;
          }
          dayVal.innerHTML = d;
        }, 1000);
        // COUNT_DOWN_BNP IMPLEMENTATIONS FINISHES HERE
      },
      SCRATCH: function (campaign) {
        var config = {
          bgBgColor: campaign['bgBgColor'],
          bgImage: campaign['bgImage'],
          bgTextColor: campaign['bgTextColor'],
          campaignTitle: campaign['campaignTitle'],
          description: campaign['description'],
          contentOfResultButton: campaign['contentOfResultButton'],
          contentButtonColor: campaign['scratchTextColor'],
          contentBgColor: campaign['scratchBgColor'],
          reward: campaign['reward'],
          overlay: campaign['overlay'],
          instanceId: campaign['instanceId'],
        };

        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Scratch modal appended to html body for scratch campaign(' +
            campaign['instanceId'] +
            ')',
        );

        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
          nextPage: 'false',
        });

        // SCRATCH IMPLEMENTATIONS START HERE

        // Screen size
        var screenWidth = window.innerWidth;

        function getScreenWidth() {
          return screenWidth;
        }

        // Auto close Modal

        var autoCloseModal = {
          isTrue: false,
          timing: 5000,
        };

        // Variable Declarations for Scratch

        var scratchHeader = document.querySelector('.seg-scratch-header');
        var scratchDescription = document.querySelector(
          '.seg-scratch-description',
        );
        var scratchCanvas = document.getElementById('seg-scratch-canvas');
        var scratchContext = scratchCanvas.getContext('2d', {
          willReadFrequently: true,
        });
        var scratchOverlay = document.querySelector('.seg-scratch-drop-layout');
        var scratchCoupon = document.querySelector('.seg-scratch-coupon');
        var scratchContainer = document.querySelector('.seg-scratch-container');

        // Modal Close Handlers
        var modalClose = document.querySelector(
          '.seg-scratch-modal-bg .seg-scratch-modal-close',
        );
        var winModalClose = document.querySelector(
          '.seg-scratch-win-bg .seg-scratch-modal-close',
        );

        // Win Modal
        var scratchBg = document.querySelector('.seg-scratch-modal-bg');
        var winModalBackGround = document.querySelector('.seg-scratch-win-bg');
        var windDescription = document.querySelector(
          '.seg-scratch-win-description',
        );
        var winScratchHeader = document.querySelector(
          '.seg-scratch-win-bg .seg-scratch-header',
        );
        var winCoupon = document.querySelectorAll('.seg-scratch-win-coupon');
        var anchorButton = document.querySelector(
          '.seg-scratch-win-description-button',
        );
        var segScratch = document.querySelector(
          '.seg-scratch-modal-bg .seg-scratch',
        );
        var segWinScratch = document.querySelector(
          '.seg-scratch-win-bg .seg-scratch',
        );

        // Copy elements
        var couponBtn = document.querySelectorAll('.seg-scratch-copy-coupon');
        var btnCouponInitialState = document.querySelectorAll(
          '.seg-copy-btn-initial-state',
        );
        var btnCouponFinalState = document.querySelectorAll(
          '.seg-copy-btn-final-state',
        );

        // Coupon is ready
        var couponReady = document.querySelector('.seg-coupon-ready-icon');
        var couponReadyIcon = document.querySelector('.seg-coupon-ready-icon');
        var couponReadyModal = document.querySelector(
          '.seg-coupon-ready-modal',
        );
        var couponReadyContainer = document.querySelector(
          '.seg-coupon-ready-container',
        );
        var couponReadyCloseIcon = document.querySelector(
          '.seg-arrow-close-icon',
        );
        var couponReadyContent = document.querySelector(
          '.seg-coupon-ready-header-content',
        );

        var dynamicWidth = 440;
        var dynamicHeight = 85;

        if (getScreenWidth() <= 576) {
          scratchContext.canvas.width = 300;
          dynamicWidth = 300;
          scratchContext.canvas.height = 50;
          dynamicHeight = 50;
        } else {
          scratchContext.canvas.width = 440;
          scratchContext.canvas.height = 85;
        }

        function getCanvasArea() {
          return dynamicHeight * dynamicWidth;
        }

        function drawScratchBase() {
          segScratch.style.backgroundImage = `url(${config.bgImage})`;
          segScratch.style['background-color'] = config.bgBgColor;
          segScratch.style['color'] = `${config.bgTextColor} !important`;
          scratchDescription.style.color = config.bgTextColor || '#989898';
          scratchHeader.style.color = config.bgTextColor || 'black';
          scratchCoupon.style.color = config.bgTextColor || 'black';

          scratchOverlay.style['background-color'] =
            config.overlay === 'true' ? 'rgba(53,44,44,0.8)' : 'transparent';
          scratchHeader.innerHTML = config.campaignTitle;

          scratchDescription.innerHTML = config.description;
          scratchCoupon.innerHTML = config.reward.coupon;

          anchorButton.innerHTML = config.contentOfResultButton;
          anchorButton.style['background-color'] = config.contentBgColor;
          anchorButton.style['color'] = config.contentButtonColor;

          scratchContext.globalCompositeOperation = 'source-over';
          var x, y;
          x = y = 0;
          // Create gradient
          var scratch_gradient = scratchContext.createLinearGradient(
            100,
            0,
            0,
            0,
          );
          scratch_gradient.addColorStop(0, '#B9B9B9');
          scratch_gradient.addColorStop(1, '#E4E4E4');
          // fill rectangle
          scratchContext.fillStyle = scratch_gradient;
          scratchContext.fillRect(x, y, dynamicWidth, dynamicHeight);
        }

        function getMobileOffset(event) {
          var _rect = event.target.getBoundingClientRect();
          var _offsetX = event.touches[0].clientX - _rect.left;
          var _offsetY = event.touches[0].clientY - _rect.top;
          var _result = { offsetX: _offsetX, offsetY: _offsetY };
          return _result;
        }

        // Logical Variable Declarations
        var PI = Math.PI;
        var isDrag = false;
        var isEventSent = false;
        var couponHasBeenAssigned = config.reward.assignedToUser;
        var isWinEventSent = false;
        var allMobileOffsets = null;

        function clearArc(x, y) {
          scratchContext.globalCompositeOperation = 'destination-out';
          scratchContext.beginPath();
          scratchContext.arc(x, y, 15, 0, PI * 2, false);
          scratchContext.fill();
        }

        scratchCanvas.addEventListener(
          'mousedown',
          function (event) {
            isDrag = true;

            clearArc(event.offsetX, event.offsetY);
            judgeVisible();

            if (!isEventSent) {
              _SgmntfY_._variables.segmentifyObj('event:interaction', {
                type: 'click',
                instanceId: campaign['instanceId'],
                interactionId: campaign['instanceId'],
                nextPage: 'false',
              });
              isEventSent = true;
            }
          },
          false,
        );

        scratchCanvas.addEventListener(
          'mousemove',
          function (event) {
            if (!isDrag) {
              return;
            }

            clearArc(event.offsetX, event.offsetY);
            judgeVisible();
          },
          false,
        );

        scratchCanvas.addEventListener(
          'mouseup',
          function (event) {
            isDrag = false;
          },
          false,
        );

        scratchCanvas.addEventListener(
          'mouseleave',
          function (event) {
            isDrag = false;
          },
          false,
        );

        scratchCanvas.addEventListener(
          'touchstart',
          function (event) {
            if (event.targetTouches.length !== 1) {
              return;
            }
            if (event.cancelable) event.preventDefault();

            allMobileOffsets = getMobileOffset(event);
            isDrag = true;

            clearArc(allMobileOffsets.offsetX, allMobileOffsets.offsetY);
            judgeVisible();
          },
          false,
        );

        scratchCanvas.addEventListener(
          'touchmove',
          function (event) {
            if (!isDrag || event.targetTouches.length !== 1) {
              return;
            }
            if (event.cancelable) event.preventDefault();

            allMobileOffsets = getMobileOffset(event);

            clearArc(allMobileOffsets.offsetX, allMobileOffsets.offsetY);
            judgeVisible();
          },
          false,
        );

        scratchCanvas.addEventListener(
          'touchend',
          function (event) {
            isDrag = false;
          },
          false,
        );

        // copy coupon to clipboard
        for (var cp = 0; cp < couponBtn.length; cp++) {
          couponBtn[cp].addEventListener('click', function (e) {
            navigator.clipboard.writeText(config.reward.coupon);

            for (let bsi = 0; bsi < btnCouponInitialState.length; bsi++) {
              btnCouponInitialState[bsi].style.display = 'none';
              btnCouponFinalState[bsi].style.display = 'block';
            }

            setTimeout(function () {
              for (let bsi = 0; bsi < btnCouponInitialState.length; bsi++) {
                btnCouponFinalState[bsi].style.display = 'none';
                btnCouponInitialState[bsi].style.display = 'block';
              }
            }, 1000);
          });
        }

        function judgeVisible() {
          var scratchAreaExecutor = 8.5e-1; // desktop width
          if (getScreenWidth() <= 596) {
            scratchAreaExecutor = 7e-1;
          }

          var imageData = scratchContext.getImageData(
            0,
            0,
            dynamicWidth,
            dynamicHeight,
          );
          var pixels = imageData.data;
          var result = {};
          var i;
          var len;

          // count alpha values
          for (i = 3, len = pixels.length; i < len; i += 4) {
            result[pixels[i]] || (result[pixels[i]] = 0);
            result[pixels[i]]++;
          }

          // we are comparing the alpha value(means gray are of scratch) of the scratch area with the total area
          // if alpha value is lower than 10000, showing the coupon code
          if (result[255] < getCanvasArea() * scratchAreaExecutor) {
            setTimeout(function () {
              winHandler();
            }, 5000);
          }
        }

        function winHandler() {
          // Hide Scratch
          scratchBg.style.display = 'none';

          // Show win modal
          winModalBackGround.style.display = 'block';

          segWinScratch.style.backgroundImage = `url(${config.bgImage})`;
          segWinScratch.style['background-color'] = config.bgBgColor;
          segWinScratch.style['color'] = `${config.bgTextColor} !important`;

          winScratchHeader.style.color = config.bgTextColor || 'black';
          windDescription.style.color = config.bgTextColor || 'black';

          // Show win message
          windDescription.innerHTML = config.reward.description;

          // Show win coupon
          for (var c = 0; c < winCoupon.length; c++) {
            winCoupon[c].value = config.reward.coupon;
            winCoupon[c].style.color = config.bgTextColor || 'black';
          }

          if (!isWinEventSent) {
            _SgmntfY_._variables.segmentifyObj('gamification:scratch', {
              type: 'win',
              interactionId: config.instanceId,
              instanceId: config.instanceId,
              used: 'true',
              record: config.reward,
            });
            isWinEventSent = true;
          }

          // Show win Url
          anchorButton.href = config.reward.couponUrl;

          anchorButton.addEventListener('click', function () {
            winModalBackGround.style.display = 'none';
          });

          if (autoCloseModal.isTrue) {
            setTimeout(function () {
              winModalBackGround.style.display = 'none';
            }, autoCloseModal.timing);
          }
        }

        modalClose.addEventListener('click', function (e) {
          _SgmntfY_._variables.segmentifyObj('gamification:scratch', {
            type: 'win',
            interactionId: campaign['instanceId'],
            instanceId: campaign['instanceId'],
            used: 'false',
            record: config.reward,
          });

          scratchBg.style.display = 'none';
          scratchOverlay.style.display = 'none';
        });

        winModalClose.addEventListener('click', function (e) {
          winModalBackGround.style.display = 'none';
          scratchOverlay.style.display = 'none';
          couponReadyContainer.style.display = 'inline-flex';
        });

        couponReadyIcon.addEventListener('click', function (e) {
          if (getScreenWidth() <= 576) {
            couponReadyIcon.style.display = 'none';
            couponReadyModal.style.display = 'flex';
            couponReadyContainer.top = '15%';
            couponReadyContainer.style.marginLeft = '-30px';
            couponReadyContent.innerHTML = config.reward.description;
          }
          couponReadyModal.style.display = 'flex';
          couponReadyContent.innerHTML = config.reward.description;
        });

        couponReadyCloseIcon.addEventListener('click', function (e) {
          if (getScreenWidth() <= 576) {
            couponReadyModal.style.display = 'none';
            couponReadyContainer.top = '0%';
            couponReadyContainer.style.marginLeft = '0px';
            couponReadyIcon.style.display = 'flex';
          }
          couponReadyModal.style.display = 'none';
          couponReadyIcon.style.display = 'flex';
        });

        if (!couponHasBeenAssigned) {
          drawScratchBase();
        } else {
          scratchOverlay.style.display = 'none';
          couponReadyContainer.style.display = 'flex';
          couponReadyContent.innerHTML = config.reward.description;
          winCoupon[1].value = config.reward.coupon;
        }
      },
      HERO_BANNER_COUNTDOWN: function (campaign) {
        var config = {
          targetUrl: campaign['targetUrl'],
          name: campaign['name'],
          title: campaign['title'],
          description: campaign['description'],
          seperator: campaign['seperator'],
          showOnWebsite: campaign['showOnWebsite'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          imageUrl: campaign['imageUrl'],
          endDate: campaign['endDate'],
          targetSelector: campaign['targetSelector'],
          instanceId: campaign['instanceId'],
          targetPosition: campaign['targetPosition'],
        };
        // widget-view callback definition
        var wvCB = function ($elem) {
          var eventSent = false;
          if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
            _SgmntfY_._interaction(
              'widget-view',
              config.instanceId,
              config.instanceId,
            );
            eventSent = true;
          } else {
            if (!eventSent) {
              var widgetViewInterval = setInterval(function () {
                if (!eventSent && _SgmntfY_._isElemVisible($elem)) {
                  _SgmntfY_._interaction(
                    'widget-view',
                    config.instanceId,
                    config.instanceId,
                  );
                  eventSent = true;
                  window.clearInterval(widgetViewInterval);
                }
              }, 100);
            }
          }
        };
        // html & preJs & postJs & css
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }

        try {
          // get target element as jQuery object
          var _target = campaign['targetSelector'];
          var targetElement = _SgmntfY_._getJq()(_target).first();
          // put rendered banner HTML into the target
          var _targetPosition = campaign['targetPosition'];
          if (_targetPosition === 'SELF') {
            targetElement.html(renderedHtml);
            if (wvCB) {
              wvCB(targetElement);
            }
          } else {
            var $div = _SgmntfY_._getJq()('<div/>', {
              class: 'seg-hero-banner-wrapper seg-clear',
            });
            if (_targetPosition === 'AFTER' || _targetPosition === 'BEFORE') {
              _targetPosition === 'AFTER'
                ? $div.html(renderedHtml).insertAfter(targetElement)
                : $div.html(renderedHtml).insertBefore(targetElement);
            } else if (
              _targetPosition === 'APPEND' ||
              _targetPosition === 'PREPEND'
            ) {
              _targetPosition === 'APPEND'
                ? $div.html(renderedHtml).appendTo(targetElement)
                : $div.html(renderedHtml).prependTo(targetElement);
            }
            if (wvCB) {
              wvCB($div);
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in filling target element [' +
              _target +
              '] for banner: ' +
              err,
          );
        }

        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'HeroBannerCountCown appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        // bind click handler
        _SgmntfY_
          ._getJq()('.seg-banner-container-v2 img')
          .bind('click', function () {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // COUNT_DOWN_BNP IMPLEMENTATIONS STARTS HERE
        var mainElement = document.querySelector('.seg-countdown-timeWrapperH');

        function createCountDownItem(obj) {
          var count = 0;
          count++;
          var timeCardHTML;
          if (count > 1) {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownH' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'nhero"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n';
            mainElement.innerHTML += timeCardHTML;
          } else {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownH' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'nhero"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n' +
              '<h3 style="color:' +
              config.textColor +
              '" class="seg-countdown-seperator ' +
              obj.activate +
              'CountdownH' +
              '">' +
              config.seperator +
              '</h3>';
            mainElement.innerHTML += timeCardHTML;
          }
        }

        countdownRenderer(config.showOnWebsite);

        function countdownRenderer(timeObj) {
          timeObj.forEach((item) => {
            createCountDownItem(item);
          });
          Array.from(document.querySelectorAll('.trueCountdownH')).slice(
            -1,
          )[0].style.display = 'none';
        }

        var heroInterval = setInterval(function () {
          var dayVal = document.querySelector('#seg-countdown-DAYnhero');
          var hourVal = document.querySelector('#seg-countdown-HOURnhero');
          var minVal = document.querySelector('#seg-countdown-MINUTEnhero');
          var secVal = document.querySelector('#seg-countdown-SECONDnhero');
          var diff = new Date(config.endDate) - new Date();
          var d = Math.floor(diff / 1000 / 60 / 60 / 24);
          var h = Math.floor(diff / 1000 / 60 / 60) % 24;
          var m = Math.floor(diff / 1000 / 60) % 60;
          var s = Math.floor(diff / 1000) % 60;
          if (s < 0) {
            window.clearInterval(heroInterval);
            return;
          }
          if (h < 10) {
            hourVal.innerHTML = '0' + h + '';
          } else {
            hourVal.innerHTML = h;
          }
          if (m < 10) {
            minVal.innerHTML = '0' + m + '';
          } else {
            minVal.innerHTML = m;
          }
          if (s < 10) {
            secVal.innerHTML = '0' + s + '';
          } else {
            secVal.innerHTML = s;
          }
          dayVal.innerHTML = d;
        }, 1000);
        // COUNT_DOWN_BNP IMPLEMENTATIONS FINISHES HERE
      },
      NOTIFICATION_BAR_COUNTDOWN: function (campaign) {
        var config = {
          targetUrl: campaign['targetUrl'],
          name: campaign['name'],
          title: campaign['title'],
          description: campaign['description'],
          seperator: campaign['seperator'],
          showOnWebsite: campaign['showOnWebsite'],
          bgColor: campaign['bgColor'],
          textColor: campaign['textColor'],
          sticky: campaign['sticky'],
          imageUrl: campaign['imageUrl'],
          endDate: campaign['endDate'],
          divClass:
            'sgf-notif-bar-' +
            (campaign['verticalPosition'].toLowerCase() || 'top'),
        };
        try {
          if (campaign['preJs']) {
            eval(campaign['preJs']);
            var retVal = preRenderConf(config);
            if (typeof retVal !== 'undefined' && !retVal) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'preRenderConf returned false exiting!',
              );
              return;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign pre js code: ' + err,
          );
        }
        // render campaign html
        var renderedHtml = _SgmntfY_
          ._getMustache()
          .render(campaign['html'], config);
        _SgmntfY_._getJq()('body').prepend(renderedHtml);
        campaign['css'] &&
          _SgmntfY_
            ._getJq()('<style />')
            .html(campaign['css'])
            .prependTo(_SgmntfY_._getJq()('body'));
        try {
          campaign['postJs'] && eval(campaign['postJs']);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing campaign post js code: ' + err,
          );
        }
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'NotificationBarCountDown appended to html body for campaign(' +
            campaign['instanceId'] +
            ')',
        );
        // add sticky option
        if (config.sticky) {
          _SgmntfY_
            ._getJq()('.seg-notification-bar')
            .addClass('seg-notification-bar-sticky');
        }
        // send impression
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });
        // bind click handler
        _SgmntfY_
          ._getJq()('.seg-banner-container-v2 img')
          .bind('click', function () {
            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'click',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });
          });
        // COUNT_DOWN_BNP IMPLEMENTATIONS STARTS HERE
        var mainElement = document.querySelector('.seg-countdown-timeWrapperN');

        function createCountDownItem(obj) {
          var count = 0;
          count++;
          var timeCardHTML;
          if (count > 1) {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownN' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'ntf"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n';
            mainElement.innerHTML += timeCardHTML;
          } else {
            timeCardHTML =
              '<div id=' +
              obj.type +
              ' class="seg-flexCol-center ' +
              obj.activate +
              'CountdownN' +
              '">\n' +
              '<h3 style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              'ntf"></h3>\n' +
              '<span style="color:' +
              config.textColor +
              '" id="seg-countdown-' +
              obj.type +
              't">' +
              obj.text +
              '</span>\n' +
              '</div>\n' +
              '<h3 style="color:' +
              config.textColor +
              '" class="seg-countdown-seperator ' +
              obj.activate +
              'CountdownN' +
              '">' +
              config.seperator +
              '</h3>';
            mainElement.innerHTML += timeCardHTML;
          }
        }

        countdownRenderer(config.showOnWebsite);

        function countdownRenderer(timeObj) {
          timeObj.forEach((item) => {
            createCountDownItem(item);
          });
          Array.from(document.querySelectorAll('.trueCountdownN')).slice(
            -1,
          )[0].style.display = 'none';
        }

        var ntfCountdownInterval = setInterval(function () {
          var dayVal = document.querySelector('#seg-countdown-DAYntf');
          var hourVal = document.querySelector('#seg-countdown-HOURntf');
          var minVal = document.querySelector('#seg-countdown-MINUTEntf');
          var secVal = document.querySelector('#seg-countdown-SECONDntf');
          var diff = new Date(config.endDate) - new Date();
          var d = Math.floor(diff / 1000 / 60 / 60 / 24);
          var h = Math.floor(diff / 1000 / 60 / 60) % 24;
          var m = Math.floor(diff / 1000 / 60) % 60;
          var s = Math.floor(diff / 1000) % 60;
          if (s < 0) {
            window.clearInterval(ntfCountdownInterval);
            return;
          }
          if (h < 10) {
            hourVal.innerHTML = '0' + h + '';
          } else {
            hourVal.innerHTML = h;
          }
          if (m < 10) {
            minVal.innerHTML = '0' + m + '';
          } else {
            minVal.innerHTML = m;
          }
          if (s < 10) {
            secVal.innerHTML = '0' + s + '';
          } else {
            secVal.innerHTML = s;
          }
          dayVal.innerHTML = d;
        }, 1000);
        // COUNT_DOWN_BNP IMPLEMENTATIONS FINISHES HERE
      },
      POPUP_BUILDER: function (campaign) {
        var config = {
          name: campaign['name'],
          html: campaign['html'],
          css: campaign['css'] || campaign['cssCode'],
          subType: campaign['subType'],
          instanceId: campaign['instanceId'],
        };

        var POPUP_BUILDER_SUBTYPES = Object.freeze({
          CUSTOM: 'CUSTOM',
          EMAIL_COLLECTION: 'EMAIL_COLLECTION',
          SALES_POPUP: 'SALES_POPUP',
        });

        var OVERLAY_Z_INDEX = Object.freeze({
          POPUP_CONTENT: 2147483647,
          POPUP_OVERLAY: 2147483646,
        });

        var CLASS_LIST = Object.freeze({
          UNIQUE_POPUP_ID: `segmentify-popup-builder_${config.instanceId}`,
          POPUP_CONTAINER: 'u-popup-container',
          POPUP_OVERLAY: 'u-popup-overlay',
          CLOSE_BUTTON: 'u-close-button',
          POPUP_CONTENT: 'u-popup-main',
          SUBMIT_BUTTON: 'button[type="submit"]',
        });

        var CONTAINER_STYLE = Object.freeze({
          POPUP_CONTAINER:
            'position: fixed; z-index:' + OVERLAY_Z_INDEX.POPUP_CONTENT,
        });

        // Memoize initial body's overflow value
        var bodyOverflow = document.body.style.overflow;

        // Segmentify Event Queue
        var queue = _SgmntfY_._variables.segmentifyObj;

        // Create Popup Container & Overlay
        var SegmentifyPopupBuilderContainer = document.createElement('div');
        SegmentifyPopupBuilderContainer.classList.add(
          CLASS_LIST.POPUP_CONTAINER,
        );
        SegmentifyPopupBuilderContainer.id = CLASS_LIST.UNIQUE_POPUP_ID;
        SegmentifyPopupBuilderContainer.style.cssText =
          CONTAINER_STYLE.POPUP_CONTAINER;

        // Create Campaign Style Element
        var campaignStyleElement;

        // Create Style Element for Campaign CSS
        if (config.css) {
          var campaignStyle = document.createElement('style');

          campaignStyle.id = `segmentify-popup-builder-css_${config.instanceId}`;

          campaignStyle.innerHTML = config.css;

          campaignStyleElement = campaignStyle;
        }

        // Create Email Overlay
        var emailCollectionOverlay;
        emailCollectionOverlay = document.createElement('div');
        emailCollectionOverlay.classList.add(CLASS_LIST.POPUP_OVERLAY);
        emailCollectionOverlay.style.zIndex = OVERLAY_Z_INDEX.POPUP_OVERLAY;

        // Append Container into Body
        document.body.appendChild(SegmentifyPopupBuilderContainer);

        // Append Campaign HTML into Container
        document.getElementById(CLASS_LIST.UNIQUE_POPUP_ID).innerHTML =
          config.html;

        // Append Overlay into Container
        SegmentifyPopupBuilderContainer.append(emailCollectionOverlay);

        // Set Popup Content Z-Index
        SegmentifyPopupBuilderContainer.querySelector(
          `.${CLASS_LIST.POPUP_CONTENT}`,
        ).style.zIndex = OVERLAY_Z_INDEX.POPUP_CONTENT;

        // Append Campaign Style into Container
        if (campaignStyleElement && config.css) {
          SegmentifyPopupBuilderContainer.appendChild(campaignStyleElement);
        }

        // Add Event Listener for Close Button Interaction
        var closePopupButton = SegmentifyPopupBuilderContainer.querySelector(
          `.${CLASS_LIST.CLOSE_BUTTON}`,
        );

        if (closePopupButton) {
          closePopupButton.removeAttribute('href');

          closePopupButton.addEventListener('click', function () {
            queue('event:interaction', {
              type: 'close',
              instanceId: campaign['instanceId'],
              interactionId: campaign['instanceId'],
            });

            // Remove Popup Container from Body & Remove Overflow Hidden
            document.body.style.overflow = bodyOverflow;
            SegmentifyPopupBuilderContainer.remove();
          });
        }

        var form = SegmentifyPopupBuilderContainer.querySelector('form');

        if (form) {
          form.id = config['instanceId'];

          const submitBtn = form.querySelector(CLASS_LIST.SUBMIT_BUTTON);
          submitBtn.setAttribute('form', config['instanceId']);

          ['method', 'action', 'target'].forEach((attr) =>
            form.removeAttribute(attr),
          );
        }

        // Send Impression Event
        queue('event:interaction', {
          type: 'impression',
          instanceId: campaign['instanceId'],
          interactionId: campaign['instanceId'],
        });

        function emailCollectionEvents(email) {
          // Contact Source Info
          queue('user:update', {
            email,
            source: 'email-collection',
          });

          // User Signup
          queue('user:signup', {
            email,
            emailNtf: true,
            isRegistered: true,
          });

          // Send iys event
          queue('user:iyspermissions', {
            email,
            emailNtf: true,
          });
        }

        function handleFormEvent(formValues) {
          queue('user:form', {
            formName: config['name'],
            fields: formValues,
            params: {
              instanceId: config['instanceId'],
            },
          });
        }

        function handleFormSubmit(type, formObject) {
          var formKeyValues = {};

          if (formObject)
            formObject.forEach((value, key) => {
              formKeyValues[key] = value;
            });

          if (Object.keys(formKeyValues).length > 0)
            handleFormEvent(formKeyValues);

          if (
            formKeyValues.email &&
            type === POPUP_BUILDER_SUBTYPES.EMAIL_COLLECTION
          )
            emailCollectionEvents(formKeyValues['email']);

          document.querySelector(`.u-close-button`).click();
        }

        function handleEmailCollectionPopup() {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var formObject = new FormData(form);
            handleFormSubmit(
              POPUP_BUILDER_SUBTYPES.EMAIL_COLLECTION,
              formObject,
            );
          });
        }

        function handleSalesPopup() {
          // Handle sales popup
        }

        function handleCustomPopup() {
          if (form) {
            form.addEventListener('submit', function (e) {
              e.preventDefault();
              e.stopPropagation();
              var formObject = new FormData(form);
              handleFormSubmit(POPUP_BUILDER_SUBTYPES.CUSTOM, formObject);
            });
          }
        }

        switch (config.subType) {
          case POPUP_BUILDER_SUBTYPES.CUSTOM:
            return handleCustomPopup();
          case POPUP_BUILDER_SUBTYPES.EMAIL_COLLECTION:
            return handleEmailCollectionPopup();
          case POPUP_BUILDER_SUBTYPES.SALES_POPUP:
            return handleSalesPopup();
          default:
            break;
        }
      },
    },
    // Functions
    _functions: {
      getFunction: function (name) {
        switch (name.toLowerCase()) {
          case 'apikey':
            return _SgmntfY_._functions.setApiKey;
          case 'loglevel':
            return _SgmntfY_._functions.setLogLevel;
          case 'variables':
            return _SgmntfY_._functions.setVariables;
          case 'userid':
            return _SgmntfY_._functions.setUserId;
          case 'view:page':
            return _SgmntfY_._functions.pageView;
          case 'view:product':
            return _SgmntfY_._functions.productView;
          case 'basket:add':
            return _SgmntfY_._functions.addToBasket;
          case 'basket:remove':
            return _SgmntfY_._functions.removeFromBasket;
          case 'basket:clear':
            return _SgmntfY_._functions.clearBasket;
          case 'checkout:basket':
            return _SgmntfY_._functions.checkoutViewBasket;
          case 'checkout:customer':
            return _SgmntfY_._functions.checkoutCustomerInfo;
          case 'checkout:payment':
            return _SgmntfY_._functions.checkoutPaymentInfo;
          case 'checkout:purchase':
            return _SgmntfY_._functions.checkoutPurchase;
          case 'user:signin':
            return _SgmntfY_._functions.userSignIn;
          case 'user:signout':
            return _SgmntfY_._functions.userSignOut;
          case 'user:signup':
            return _SgmntfY_._functions.userSignUp;
          case 'user:subscribe':
            return _SgmntfY_._functions.userSubscribe;
          case 'user:unsubscribe':
            return _SgmntfY_._functions.userUnsubscribe;
          case 'user:update':
            return _SgmntfY_._functions.userInfoUpdate;
          case 'user:iyspermissions':
            return _SgmntfY_._functions.userIysPermissions;
          case 'user:lastsearchdeletedkeywords':
            return _SgmntfY_._functions.lastSearchDeletedKeywords;
          case 'user:identify':
            return _SgmntfY_._functions.userIdentify;
          case 'event:custom':
            return _SgmntfY_._functions.customEvent;
          case 'event:interaction':
            return _SgmntfY_._functions.interaction;
          case 'user:form':
            return _SgmntfY_._functions.userForm;
          case 'banner:impression':
            return _SgmntfY_._functions.bannerImpression;
          case 'banner:click':
            return _SgmntfY_._functions.bannerClick;
          case 'banner:update':
            return _SgmntfY_._functions.bannerUpdate;
          case 'bannergroup:view':
            return _SgmntfY_._functions.bannerGroupView;
          case 'bannergroup:detail':
            return _SgmntfY_._functions.bannerGroupDetail;
          case 'impression:promotion':
            return _SgmntfY_._functions.promotionImpression;
          case 'view:promotion':
            return _SgmntfY_._functions.promotionView;
          case 'push:click:interaction':
            return _SgmntfY_._functions.pushInteraction;
          case 'search': // backward compatible
            return _SgmntfY_._functions.search;
          case 'search:instant':
            return _SgmntfY_._functions.search;
          case 'search:faceted':
            return _SgmntfY_._functions.facetedSearch;
          case 'filter':
            return _SgmntfY_._functions.filter;
          case 'coupon':
            return _SgmntfY_._functions.coupon;
          case 'email:click':
            return _SgmntfY_._functions.mailClickInteraction;
          case 'ga:event':
            return _SgmntfY_.GA.sendEvent;
          case 'journey:init':
            return _SgmntfY_._functions.initJourney;
          case 'journey:success':
            return _SgmntfY_._functions.successJourney;
          case 'journey:start':
            return _SgmntfY_._functions.startJourney;
          case 'journey:view':
            return _SgmntfY_._functions.viewJourney;
          case 'journey:select':
            return _SgmntfY_._functions.selectJourney;
          case 'journey:exit':
            return _SgmntfY_._functions.exitJourney;
          case 'journey:skip':
            return _SgmntfY_._functions.skipJourney;
          case 'journey:finish':
            return _SgmntfY_._functions.finishJourney;
          case 'favorite:add':
            return _SgmntfY_._functions.favoriteAdd;
          case 'favorite:remove':
            return _SgmntfY_._functions.favoriteRemove;
          case 'favorite:detail':
            return _SgmntfY_._functions.favoriteDetail;
          case 'view:favorites':
            return _SgmntfY_._functions.favoritesView;
          case 'select:persona':
            return _SgmntfY_._functions.personaSelect;
          case 'gamification:wof':
            return _SgmntfY_._functions.wheelOfFortune;
          case 'gamification:scratch':
            return _SgmntfY_._functions.scratch;
          default:
            return function (params) {
              _SgmntfY_.LOG_MESSAGE('WARN', 'Unexpected Command: ' + name);
            };
        }
      },
      getDataLayerFunction: function (name, params) {
        try {
          if (typeof name === 'undefined') {
            name = '';
          }
          if (typeof params === 'undefined') {
            params = {};
          }
          if (typeof params.step === 'undefined') {
            params.step = '';
          }
          if (typeof params.type === 'undefined') {
            params.type = '';
          }

          switch (name.toLowerCase()) {
            case 'page':
              return _SgmntfY_._functions.pageView;
            case 'product':
              return _SgmntfY_._functions.productView;
            case 'basket':
              switch (params['step'].toLowerCase()) {
                case 'add':
                  return _SgmntfY_._functions.addToBasket;
                case 'remove':
                  return _SgmntfY_._functions.removeFromBasket;
                case 'clear':
                  return _SgmntfY_._functions.clearBasket;
                default:
                  return function (params) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Unexpected Basket Operations Step: ' + params['step'],
                    );
                  };
              }
            case 'checkout':
              switch (params['step'].toLowerCase()) {
                case 'basket':
                  return _SgmntfY_._functions.checkoutViewBasket;
                case 'customer':
                  return _SgmntfY_._functions.checkoutCustomerInfo;
                case 'payment':
                  return _SgmntfY_._functions.checkoutPaymentInfo;
                case 'purchase':
                  return _SgmntfY_._functions.checkoutPurchase;
                default:
                  return function (params) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Unexpected Checkout Step: ' + params['step'],
                    );
                  };
              }
            case 'user':
              switch (params['step'].toLowerCase()) {
                case 'signin':
                  return _SgmntfY_._functions.userSignIn;
                case 'signout':
                  return _SgmntfY_._functions.userSignOut;
                case 'signup':
                  return _SgmntfY_._functions.userSignUp;
                case 'subscribe':
                  return _SgmntfY_._functions.userSubscribe;
                case 'unsubscribe':
                  return _SgmntfY_._functions.userUnsubscribe;
                case 'update':
                  return _SgmntfY_._functions.userInfoUpdate;
                case 'iyspermissions':
                  return _SgmntfY_._functions.userIysPermissions;
                case 'lastsearchdeletedkeywords':
                  return _SgmntfY_._functions.lastSearchDeletedKeywords;
                case 'identify':
                  return _SgmntfY_._functions.userIdentify;
                default:
                  return function (params) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Unexpected User Operations Step: ' + params['step'],
                    );
                  };
              }
            case 'interaction':
              return _SgmntfY_._functions.interaction;
            case 'form':
              return _SgmntfY_._functions.userForm;
            case 'banners':
              return _SgmntfY_._functions.bannerGroupView;
            case 'banner':
              switch (params['type'].toLowerCase()) {
                case 'impression':
                  return _SgmntfY_._functions.bannerImpression;
                case 'click':
                  return _SgmntfY_._functions.bannerClick;
                case 'update':
                  return _SgmntfY_._functions.bannerUpdate;
                default:
                  return function (params) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Unexpected Banner Operations Type: ' + params['type'],
                    );
                  };
              }
            case 'custom':
              return _SgmntfY_._functions.customEvent;
            case 'promotion':
              switch (params['type'].toLowerCase()) {
                case 'impression':
                  return _SgmntfY_._functions.promotionImpression;
                case 'view':
                  return _SgmntfY_._functions.promotionView;
                default:
                  return function (params) {
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Unexpected Promotion Type: ' + params['type'],
                    );
                  };
              }
            default:
              return function (params) {
                _SgmntfY_.LOG_MESSAGE('WARN', 'Unexpected Command: ' + name);
              };
          }
        } catch (error) {
          return function () {
            _SgmntfY_.LOG_MESSAGE('WARN', 'Unexpected Command: ' + error);
          };
        }
      },
      callFunction: function (commands) {
        // multiple commands
        var requestDatas = [];
        commands = commands || [];
        for (var i = 0; i < commands.length; i++) {
          var command = commands[i];
          var commandFunction = _SgmntfY_._functions.getFunction(command[0]);
          var commandArguments = Array.prototype.slice.call(command, 1);
          try {
            var requestData = commandFunction.apply(null, commandArguments);
            if (requestData) {
              requestDatas = requestDatas.concat(requestData);
            }
            _SgmntfY_.LOG_MESSAGE('INFO', 'Event triggered: ' + command[0]);
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'Error',
              "Can't convert command(" +
                command[0] +
                ') into request data. Details: ' +
                err,
            );
          }
        }
        _SgmntfY_._sendRequestToServer(requestDatas);
      },
      setApiKey: function (apiKey, skipStyle) {
        _SgmntfY_._variables.apiKey = apiKey;
        _SgmntfY_.LOG_MESSAGE('DEBUG', 'Api Key: ' + apiKey);
        if (skipStyle) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Account specific style is disabled, skipping...',
          );
        } else {
          var cssFile =
            _SgmntfY_._variables.segmentifyCDNUrl + apiKey + '/segmentify.css';
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Loading account specific css file: ' + cssFile,
          );
          _SgmntfY_._loadCSS(cssFile);
        }

        if (_SgmntfY_._isNotEmpty(_SgmntfY_._variables.apiKey)) {
          _SgmntfY_._consumeNextPageQueue();
          _SgmntfY_._consumeRetryQueue();
        }
        // activate ga if necessary, after _SgmntfY_.init() called
        if (_SgmntfY_._variables.ga.enabled) {
          _SgmntfY_.GA.activate();
        }
      },
      setLogLevel: function (logLevel) {
        var logLevelObject = _SgmntfY_.LOG_LEVELS[logLevel];
        if (typeof logLevelObject !== 'undefined') {
          _SgmntfY_._variables.logLevel = logLevelObject;
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Segmentify Log Level Changed to: ' + logLevel,
          );
        }
      },
      setVariables: function (variables) {
        variables = variables || {};
        _SgmntfY_._extend(_SgmntfY_._variables, variables);
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Segmentify Variables are updated - New Values: ' + variables,
        );
      },
      setUserId: function (userId, doNotSendUserChangeEvent) {
        if (_SgmntfY_._variables.doNotTrack === true) {
          return;
        }
        var oldUserId = _SgmntfY_._getUserId();
        _SgmntfY_._storePersistentData(
          _SgmntfY_._variables.userStorageKey,
          userId,
          390,
          _SgmntfY_._variables.storage.user.local,
        );
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Segmentify User Id Changed to: ' + userId,
        );
        if (
          _SgmntfY_._isNotEmpty(doNotSendUserChangeEvent) &&
          ('true' === doNotSendUserChangeEvent ||
            true === doNotSendUserChangeEvent)
        ) {
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Segmentify User Id Changed to: ' +
              userId +
              ' without sending USER_CHANGE event.',
          );
        } else {
          try {
            if (typeof userId === 'number') {
              userId = userId.toString();
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              "Can't parse number to string: " + err,
            );
          }
          if (oldUserId !== userId) {
            var data = {};
            data['oldUserId'] = oldUserId || '';
            data['async'] = 'false';
            return _SgmntfY_._prepareRequest(data, 'USER_CHANGE');
          }
        }
      },
      pageView: function (data) {
        data = data || {};
        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        _SgmntfY_.GA.sendPageView(data['category'] || '');
        return _SgmntfY_._prepareRequest(data, 'PAGE_VIEW');
      },
      productView: function (data) {
        data = data || {};
        data['url'] = _SgmntfY_._clearProductUrl(data['url'] || document.URL);

        // don't touch below line
        // although engine doesn't use productUrl parameter, it is used for product metadata (only usage)
        data.productUrl = data['productUrl'] || data['url'] || document.URL;
        if (typeof data.productId === 'number') {
          data.productId = data.productId.toString();
        }
        if (typeof data.categories === 'string') {
          if (data.categories.indexOf('|') !== -1) {
            var catArray = data.categories.split('|');
            data.categories = [];
            for (var idx in catArray) {
              if (catArray.hasOwnProperty(idx)) {
                data.categories.push(catArray[idx].trim());
              }
            }
          } else {
            data.categories = [data.categories];
          }
        } else {
          // trim categories
          for (var i in data.categories) {
            if (data.categories.hasOwnProperty(i)) {
              if (typeof data.categories[i] === 'string')
                data.categories[i] = data.categories[i].trim();
            }
          }
        }
        data['categories'] = (data['categories'] || []).filter(_SgmntfY_._null);
        data['paramsList'] = data['paramsList'] || {};
        data['source'] =
          _SgmntfY_._sourceOfUrl().source === 'SOCIAL'
            ? _SgmntfY_._sourceOfUrl().source
            : _SgmntfY_._sourceOfUrl();
        data['subSource'] = _SgmntfY_._sourceOfUrl().subSource
          ? _SgmntfY_._sourceOfUrl().subSource
          : null;

        var clickedBanners = _SgmntfY_._getClickedBanners();
        if (clickedBanners.length > 0) {
          var activeBanners = [];
          for (var i = 0; i < clickedBanners.length; ++i) {
            var basic = _SgmntfY_._split(clickedBanners[i], ':', 4);
            if (basic.length === 4 && !isNaN(parseInt(basic[2]))) {
              activeBanners.push({
                title: basic[0],
                group: basic[1],
                order: parseInt(basic[2]),
              });
            }
          }
          data['activeBanners'] = activeBanners;
        }
        if (
          _SgmntfY_._variables.skipProductDetail.device.indexOf(
            _SgmntfY_._variables.ua.type,
          ) >= 0
        ) {
          data['noUpdate'] = ['all'];
        }
        // send request
        return _SgmntfY_._prepareRequest(data, 'PRODUCT_VIEW');
      },
      addToBasket: function (data) {
        data = data || {};
        data['step'] = 'add';
        data['async'] = 'false';
        data['quantity'] = data['quantity'] || 1;
        var clickedBanners = _SgmntfY_._getClickedBanners();
        if (clickedBanners.length > 0) {
          var activeBanners = [];
          for (var i = 0; i < clickedBanners.length; ++i) {
            var basic = _SgmntfY_._split(clickedBanners[i], ':', 4);
            if (basic.length === 4 && !isNaN(parseInt(basic[2]))) {
              activeBanners.push({
                title: basic[0],
                group: basic[1],
                order: parseInt(basic[2]),
              });
            }
          }
          data['activeBanners'] = activeBanners;
        }
        if (
          !_SgmntfY_._variables.disableNextPage &&
          typeof data['nextPage'] === 'undefined'
        ) {
          data['nextPage'] = true;
        }

        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'BASKET_OPERATIONS');
      },
      removeFromBasket: function (data) {
        data = data || {};
        data['step'] = 'remove';
        data['async'] = 'false';
        if (
          !_SgmntfY_._variables.disableNextPage &&
          typeof data['nextPage'] === 'undefined'
        ) {
          data['nextPage'] = true;
        }
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'BASKET_OPERATIONS');
      },
      clearBasket: function (data) {
        data = data || {};
        data['step'] = 'clear';
        data['async'] = 'false';
        if (
          !_SgmntfY_._variables.disableNextPage &&
          typeof data['nextPage'] === 'undefined'
        ) {
          data['nextPage'] = true;
        }
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'BASKET_OPERATIONS');
      },
      checkoutViewBasket: function (data) {
        data = data || {};
        data['step'] = 'view-basket';
        if (data.hasOwnProperty('productList')) {
          for (var p = 0; p < data['productList'].length; ++p) {
            data['productList'][p]['quantity'] =
              data['productList'][p]['quantity'] || 1;
          }
        }
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'CHECKOUT');
      },
      checkoutCustomerInfo: function (data) {
        data = data || {};
        data['step'] = 'customer-info';
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'CHECKOUT');
      },
      checkoutPaymentInfo: function (data) {
        data = data || {};
        data['step'] = 'payment-info';
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        return _SgmntfY_._prepareRequest(data, 'CHECKOUT');
      },
      checkoutPurchase: function (data) {
        data = data || {};
        data['step'] = 'purchase';
        data['basketId'] =
          data['basketId'] || 'basket_' + _SgmntfY_._getUserId(); // if basketId is not supplied use userId
        if (data.hasOwnProperty('productList')) {
          for (var p = 0; p < data['productList'].length; ++p) {
            data['productList'][p]['quantity'] =
              data['productList'][p]['quantity'] || 1;
          }
        }
        var clickedBanners = _SgmntfY_._getClickedBanners();
        if (clickedBanners.length > 0) {
          var activeBanners = [];
          for (var i = 0; i < clickedBanners.length; ++i) {
            var basic = _SgmntfY_._split(clickedBanners[i], ':', 4);
            if (basic.length === 4 && !isNaN(parseInt(basic[2]))) {
              activeBanners.push({
                title: basic[0],
                group: basic[1],
                order: parseInt(basic[2]),
              });
            }
          }
          data['activeBanners'] = activeBanners;
        }

        return _SgmntfY_._prepareRequest(data, 'CHECKOUT');
      },
      userSignIn: function (data) {
        data = data || {};
        data['step'] = 'signin';
        data['async'] = 'false';
        data['isLogin'] = true;
        data['isRegistered'] = true;

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userSignOut: function (data) {
        data = data || {};
        data['step'] = 'signout';
        data['async'] = 'false';
        data['isLogin'] = false;

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userSignUp: function (data) {
        data = data || {};
        data['step'] = 'signup';
        data['async'] = 'false';
        data['isRegistered'] = true;

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userSubscribe: function (data) {
        data = data || {};
        data['step'] = 'subscribe';
        data['async'] = 'false';

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userUnsubscribe: function (data) {
        data = data || {};
        data['step'] = 'unsubscribe';
        data['async'] = 'false';

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }
        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userInfoUpdate: function (data) {
        data = data || {};
        data['step'] = 'update';
        data['async'] = 'false';
        if (typeof data['isLogin'] !== 'undefined') {
          data['isRegistered'] =
            data['isLogin'] === 'true' || data['isLogin'] === true
              ? 'true'
              : data['isRegistered'];
        }

        if (
          _SgmntfY_._variables.pa.loaded === true &&
          _SgmntfY_._variables.pa.disabled === false
        ) {
          data['external'] = _SgmntfY_._variables.pa.data.output;
        }

        if (data['source'] && data['source'] === 'email-collection') {
          data['emailNtf'] = true;
        }

        if (data['source'] && data['source'] === 'whatsapp-collection') {
          data['whatsappNtf'] = true;
        }

        var dataStr = JSON.stringify(data);
        var localDataStr = _SgmntfY_._getPersistentData(
          'sgfUserUpdateData',
          true,
        );
        if (localDataStr === undefined || dataStr !== localDataStr) {
          _SgmntfY_._storePersistentData(
            'sgfUserUpdateData',
            dataStr,
            -1,
            true,
          );
          return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
        }
      },
      userIysPermissions: function (data) {
        data = data || {};
        data['step'] = 'iyspermissions';
        data['async'] = 'false';

        var emailIysSource =
          _SgmntfY_._variables.ua.type === 'PC' ? 'HS_WEB' : 'HS_MOBIL';
        var emailIysReceiptType = 'BIREYSEL';
        var emailIysAllowDate = new Date().getTime();

        data['userIysPermissions'] = {
          emailIysReceiptType,
          emailIysSource,
          emailIysAllowDate,
        };

        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      lastSearchDeletedKeywords: function (data) {
        data = data || {};
        data['step'] = 'delete_last_search';
        data['async'] = 'false';

        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userIdentify: function (data) {
        var utm_source = _SgmntfY_._getQueryParameter('utm_source');
        var utm_medium = _SgmntfY_._getQueryParameter('utm_medium');
        var _sgm_action = _SgmntfY_._getQueryParameter('_sgm_action');

        data = data || {};

        data['step'] = 'identify';
        data['async'] = 'false';
        data['channel'] =
          utm_source === 'segmentify' ? utm_medium : _sgm_action;

        if (data['triggerType'] === 'override') {
          data['type'] = 'plain';
        } else if (data['triggerType'] === 'withUtmCode') {
          data['identity'] = _SgmntfY_._getQueryParameter('utm_code');
          data['type'] = 'sgm-hash';
        }

        delete data.triggerType;

        return _SgmntfY_._prepareRequest(data, 'USER_OPERATIONS');
      },
      userForm: function (data) {
        data = data || {};
        data['async'] = 'false';
        return _SgmntfY_._prepareRequest(data, 'FORM');
      },
      customEvent: function (data) {
        data = data || {};
        return _SgmntfY_._prepareRequest(data, 'CUSTOM_EVENT');
      },
      search: function (data) {
        data = data || {};
        var _params = data['params'] || {};
        _params = _SgmntfY_._getSearchVerboseParams(_params);
        data['params'] = _params;
        data['type'] = 'instant';
        return _SgmntfY_._prepareRequest(data, 'SEARCH');
      },
      facetedSearch: function (data) {
        data = data || {};
        var _params = data['params'] || {};
        _params = _SgmntfY_._getSearchVerboseParams(_params);
        data['params'] = _params;
        data['type'] = 'faceted';
        return _SgmntfY_._prepareRequest(data, 'SEARCH');
      },
      interaction: function (data) {
        data = data || {};
        data['async'] = 'false';
        if (
          !_SgmntfY_._variables.disableNextPage &&
          typeof data['nextPage'] === 'undefined'
        ) {
          data['nextPage'] = true;
        }
        if (
          data['type'] === 'impression' ||
          data['type'] === 'widget-view' ||
          data['type'] === 'push-permission-impression' ||
          data['type'] === 'push' ||
          data['type'] === 'email' ||
          data['type'] === 'slider:arrow:left' ||
          data['type'] === 'slider:arrow:right'
        ) {
          data['nextPage'] = false;
        }
        return _SgmntfY_._prepareRequest(data, 'INTERACTION');
      },
      bannerImpression: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['type'] = 'impression';
        return _SgmntfY_._prepareRequest(data, 'BANNER_OPERATIONS');
      },
      bannerClick: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['type'] = 'click';
        if (
          !_SgmntfY_._variables.disableNextPage &&
          typeof data['nextPage'] === 'undefined'
        ) {
          data['nextPage'] = true;
        }
        _SgmntfY_._addClickedBanner(
          data['title'],
          data['group'],
          data['order'],
          data['url'],
        );
        return _SgmntfY_._prepareRequest(data, 'BANNER_OPERATIONS');
      },
      bannerUpdate: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['type'] = 'update';
        return _SgmntfY_._prepareRequest(data, 'BANNER_OPERATIONS');
      },
      bannerGroupView: function (data) {
        data = data || {};
        return _SgmntfY_._prepareRequest(data, 'BANNER_GROUP_VIEW');
      },
      bannerGroupDetail: function (data) {
        data = data || {};
        data['async'] = 'false';
        return _SgmntfY_._prepareRequest(data, 'INTERNAL_BANNER_GROUP');
      },
      promotionImpression: function (data) {
        data = data || {};
        data['type'] = 'impression';
        if (typeof data['categories'] === 'string') {
          data['categories'] = [data['categories']];
        }
        data['categories'] = (data['categories'] || []).filter(_SgmntfY_._null);
        if (typeof data['brands'] === 'string') {
          data['brands'] = [data['brands']];
        }
        data['brands'] = (data['brands'] || []).filter(_SgmntfY_._null);
        if (typeof data['labels'] === 'string') {
          data['labels'] = [data['labels']];
        }
        data['labels'] = (data['labels'] || []).filter(_SgmntfY_._null);
        if (typeof data['productIds'] === 'string') {
          data['productIds'] = [data['productIds']];
        }
        data['productIds'] = (data['productIds'] || []).filter(_SgmntfY_._null);
        return _SgmntfY_._prepareRequest(data, 'PROMOTION');
      },
      promotionView: function (data) {
        data = data || {};
        data['type'] = 'view';
        if (typeof data['categories'] === 'string') {
          data['categories'] = [data['categories']];
        }
        data['categories'] = (data['categories'] || []).filter(_SgmntfY_._null);
        if (typeof data['brands'] === 'string') {
          data['brands'] = [data['brands']];
        }
        data['brands'] = (data['brands'] || []).filter(_SgmntfY_._null);
        if (typeof data['labels'] === 'string') {
          data['labels'] = [data['labels']];
        }
        data['labels'] = (data['labels'] || []).filter(_SgmntfY_._null);
        if (typeof data['productIds'] === 'string') {
          data['productIds'] = [data['productIds']];
        }
        data['productIds'] = (data['productIds'] || []).filter(_SgmntfY_._null);
        return _SgmntfY_._prepareRequest(data, 'PROMOTION');
      },
      pushInteraction: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['nextPage'] = 'false';
        // set cookie for push campaign for 10 minutes
        _SgmntfY_._storePersistentData(data.instanceId, '1', 0.006);
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Push campaign interaction is sent for campaign: ' + data.instanceId,
        );
        return _SgmntfY_._prepareRequest(data, 'INTERACTION');
      },
      filter: function (data) {
        data = data || {};
        data['categories'] = (data['categories'] || []).filter(_SgmntfY_._null);
        data['brands'] = (data['brands'] || []).filter(_SgmntfY_._null);
        data['sizes'] = (data['sizes'] || []).filter(_SgmntfY_._null);
        data['prices'] = (data['prices'] || []).filter(_SgmntfY_._null);
        return _SgmntfY_._prepareRequest(data, 'FILTER');
      },
      coupon: function (data) {
        data = data || {};
        data['nextPage'] = 'false';
        return _SgmntfY_._prepareRequest(data, 'COUPON');
      },
      mailClickInteraction: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['nextPage'] = 'false';
        // set cookie for mail campaign for 10 minutes
        _SgmntfY_._storePersistentData(data.instanceId + '_email', '1', 0.006);
        return _SgmntfY_._prepareRequest(data, 'INTERACTION');
      },
      initJourney: function (data) {
        data = data || {};
        data['type'] = 'INIT';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      successJourney: function (data) {
        data = data || {};
        data['type'] = 'SUCCESS';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      startJourney: function (data) {
        data = data || {};
        data['type'] = 'START';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      viewJourney: function (data) {
        data = data || {};
        data['type'] = 'VIEW';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      selectJourney: function (data) {
        data = data || {};
        data['type'] = 'SELECT';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      exitJourney: function (data) {
        data = data || {};
        data['type'] = 'EXIT';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      skipJourney: function (data) {
        data = data || {};
        data['type'] = 'SKIP';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      finishJourney: function (data) {
        data = data || {};
        data['type'] = 'FINISH';
        return _SgmntfY_._prepareRequest(data, 'JOURNEY');
      },
      favoriteAdd: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['step'] = 'add';
        return _SgmntfY_._prepareRequest(data, 'WISHLIST');
      },
      favoriteRemove: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['step'] = 'remove';
        return _SgmntfY_._prepareRequest(data, 'WISHLIST');
      },
      favoriteDetail: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['step'] = 'detail';
        return _SgmntfY_._prepareRequest(data, 'WISHLIST');
      },
      favoritesView: function (data) {
        data = data || {};
        data['async'] = 'false';
        data['step'] = 'view-favorites';
        return _SgmntfY_._prepareRequest(data, 'WISHLIST');
      },
      personaSelect: function (data) {
        data = data || {};
        return _SgmntfY_._prepareRequest(data, 'PERSONA_QUIZ');
      },
      wheelOfFortune: function (data) {
        data = data || {};
        data['used'] = data.used;
        data['record'] = data.record;
        data['nextPage'] = 'false';
        return _SgmntfY_._prepareRequest(data, 'GAMIFICATION');
      },
      scratch: function (data) {
        data = data || {};
        data['used'] = data.used;
        data['record'] = data.record;
        return _SgmntfY_._prepareRequest(data, 'GAMIFICATION');
      },
    },
    _bindRecommendationTrackEvents: function (
      targetElement,
      recommendationSettings,
      instanceId,
      tryCount,
    ) {
      if (tryCount > 10) {
        return;
      }
      tryCount = tryCount + 1;
      var hasSliderClick =
        recommendationSettings && recommendationSettings.sliderClick;
      var leftArrowSelector =
        hasSliderClick && recommendationSettings.sliderClick.leftArrowSelector;
      var rightArrowSelector =
        hasSliderClick && recommendationSettings.sliderClick.rightArrowSelector;

      if (!leftArrowSelector || !rightArrowSelector) {
        return;
      }

      var leftArrowElement = targetElement.find(leftArrowSelector);
      var rightArrowElement = targetElement.find(rightArrowSelector);
      if (leftArrowElement.length === 0 || rightArrowElement.length === 0) {
        setTimeout(
          _SgmntfY_._bindRecommendationTrackEvents,
          200,
          targetElement,
          recommendationSettings,
          instanceId,
          tryCount,
        );
      } else {
        leftArrowElement.on('click', function () {
          _SgmntfY_._sendSliderClick(instanceId, 'left');
        });

        rightArrowElement.on('click', function () {
          _SgmntfY_._sendSliderClick(instanceId, 'right');
        });
      }
    },
    _sendSliderClick: function (instanceId, interactionType) {
      _SgmntfY_._variables.segmentifyObj('event:interaction', {
        type: 'slider:arrow:' + interactionType,
        interactionId: 'slider:arrow:' + interactionType,
        instanceId: instanceId,
      });
      _SgmntfY_.GA.sendArrowClick(instanceId, interactionType);
    },
    _prepareRequest: function (params, eventName, consumeNextPage) {
      // if don't send flag is set, ignore request
      if (
        typeof params['noSend'] !== 'undefined' &&
        params['noSend'] === 'true'
      ) {
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'No send flag is set for event: ' + eventName + ', ignoring event',
        );
        return;
      }
      // if page is translated (chrome), ignore request
      if (
        _SgmntfY_._getJq()('html').hasClass('translated-ltr') ||
        _SgmntfY_._getJq()('html').hasClass('translated-rtl')
      ) {
        _SgmntfY_.LOG_MESSAGE('DEBUG', 'Page is translated, ignoring event');
        return;
      }
      if (navigator && navigator.language && navigator.language === 'c') {
        _SgmntfY_.LOG_MESSAGE('DEBUG', 'This is a bot, ignoring event');
        return;
      }
      // check api key
      if (_SgmntfY_._isEmpty(_SgmntfY_._variables.apiKey)) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          'Api Key is not set, not sending event: ' + eventName,
        );
        return; // error no api key is set
      }
      // check user id
      if (_SgmntfY_._isEmpty(_SgmntfY_._getUserId())) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          'userId is not set, not sending event: ' + eventName,
        );
        return; // error no user id is set
      }
      // check session id
      if (_SgmntfY_._isEmpty(_SgmntfY_._getSessionId())) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          'sessionId is not set, not sending event: ' + eventName,
        );
        return; // error no session id is set
      }

      if (typeof consumeNextPage === 'undefined') {
        consumeNextPage = false;
      }
      if (
        !consumeNextPage &&
        typeof params['nextPage'] === 'boolean' &&
        params['nextPage'] === true
      ) {
        _SgmntfY_._addToNextPageQueue({ eventName: eventName, params: params });
        return null;
      }
      var eventTime = new Date();
      // request object
      var request = {
        data: {
          name: eventName,
          userId: _SgmntfY_._getUserId(),
          sessionId: _SgmntfY_._getSessionId(),
          testMode: _SgmntfY_._getTestMode() || 'false',
          device: _SgmntfY_._variables.ua.type || 'PC',
          noProcess: params.noProcess || false,
          tryCount: 0,
          nextPage: params['nextPage'] || false,
          dnt: _SgmntfY_._variables.doNotTrack,
          params: params['params'] || {},
          recommendIds: (params['recommendIds'] || []).filter(_SgmntfY_._null),
          pageUrl: _SgmntfY_._getRequestParam(
            params['pageUrl'],
            document.URL,
            false,
          ),
          referrer: _SgmntfY_._getRequestParam(
            params['referrer'],
            document.referrer,
            false,
          ),
          browser: _SgmntfY_._getRequestParam(
            params['browser'],
            _SgmntfY_._variables.ua.name,
            false,
          ),
          os: _SgmntfY_._getRequestParam(
            params['os'],
            _SgmntfY_._variables.ua.os,
            false,
          ),
          osversion: _SgmntfY_._getRequestParam(
            params['osversion'],
            _SgmntfY_._variables.ua.osversion,
            false,
          ),
          userAgent: _SgmntfY_._getRequestParam(
            params['userAgent'],
            _SgmntfY_._variables.ua.agentString,
            false,
          ),
          lang: _SgmntfY_._getRequestParam(
            params['lang'],
            _SgmntfY_._variables.language,
            true,
          ),
          currency: _SgmntfY_._getRequestParam(
            params['currency'],
            _SgmntfY_._variables.currency,
            true,
          ),
          region: _SgmntfY_._getRequestParam(
            params['region'],
            _SgmntfY_._variables.region,
            true,
          ),
          async: params['async'] || 'true',
          globalMode: _SgmntfY_._getControlGroup(),
          experiments: _SgmntfY_._experiment.init() || {},
          email: params['email'] || '',
          ft: _SgmntfY_._getFireTime(eventTime) || '',
          tz: _SgmntfY_._getTimeZone(eventTime) || '',
        },
        originalParams: params,
        eventName: eventName,
      };
      if (params.hasOwnProperty('bypassControlGroup')) {
        request['data']['bypassControlGroup'] =
          params['bypassControlGroup'] === true; // make sure it is boolean true
      }
      if (typeof params.recommendationCallback === 'function') {
        _SgmntfY_._getJq().extend(request, {
          recommendationCallback: params.recommendationCallback,
        });
      }
      if (typeof params._cb === 'function') {
        _SgmntfY_._getJq().extend(request, { _cb: params._cb });
      }

      // check required params
      var requiredParams = _SgmntfY_._variables.requiredParams[eventName];
      for (var i = 0; i < requiredParams.length; ++i) {
        if (_SgmntfY_._isNotEmpty(params[requiredParams[i]])) {
          request.data[requiredParams[i]] = params[requiredParams[i]];
          if (typeof request.data[requiredParams[i]] === 'string') {
            request.data[requiredParams[i]] = _SgmntfY_
              ._clearNullByte(request.data[requiredParams[i]])
              .trim();
          }
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Missing parameter[' +
              requiredParams[i] +
              '] in event: ' +
              eventName,
          );
          return; // error required parameter is missing
        }
      }
      // add optional parameters
      var optionalParams = _SgmntfY_._variables.optionalParams[eventName];
      for (var i = 0; i < optionalParams.length; ++i) {
        if (_SgmntfY_._isNotEmpty(params[optionalParams[i]])) {
          request.data[optionalParams[i]] = params[optionalParams[i]];
          if (typeof request.data[optionalParams[i]] === 'string') {
            request.data[optionalParams[i]] = _SgmntfY_
              ._clearNullByte(request.data[optionalParams[i]])
              .trim();
          }
        }
      }

      return request;
    },
    _getRequestParam: function (value, defaultValue, sendDefaultValue) {
      if (_SgmntfY_._variables.doNotTrack === true) {
        if (sendDefaultValue) return defaultValue;
        else return null;
      } else {
        return value || defaultValue;
      }
    },
    // Persistent Data Functions
    _storePersistentData: function setCookie(
      cname,
      cvalue,
      exdays,
      useWebStorage,
    ) {
      if (_SgmntfY_._variables.doNotTrack === true) {
        return;
      }
      //check for web storage
      if (typeof Storage !== 'undefined' && useWebStorage) {
        try {
          localStorage.setItem(cname, cvalue);
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Segmentify Persistent Data (Local Storage) Update: ' +
              cname +
              ': ' +
              cvalue,
          );
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            "Can't store Persistent Data (Local Storage) Update: " +
              cname +
              ': ' +
              cvalue,
          );
        }
      } else {
        if (typeof cvalue === 'string') {
          cvalue = encodeURIComponent(cvalue);
        }
        var d,
          expires = '',
          domain = '',
          cookie;
        if (exdays) {
          d = new Date();
          d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
          expires = '; expires=' + d.toGMTString();
        }
        if (
          _SgmntfY_._variables.domain &&
          _SgmntfY_._variables.domain.split('.').length >= 2
        ) {
          domain = '; domain=' + _SgmntfY_._variables.domain;
        }
        cookie = cname + '=' + cvalue + expires + domain + '; path=/';
        try {
          document.cookie = cookie;
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Segmentify Persistent Data (Cookie) Update: ' + cookie,
          );
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            "Can't store Persistent Data (Cookie) Update: " + cookie,
          );
        }
      }
    },
    _getPersistentData: function getCookie(cname, useWebStorage) {
      if (_SgmntfY_._variables.doNotTrack === true) {
        return null;
      }
      if (typeof Storage !== 'undefined' && useWebStorage) {
        try {
          return localStorage.getItem(cname);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            "Can't get Persistent Data (Local Storage): " + cname,
          );
          return null;
        }
      } else {
        var name = cname + '=';
        try {
          var ca = document.cookie.split(';');
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0)
              return decodeURIComponent(c.substring(name.length, c.length));
          }
          return null;
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            "Can't get Persistent Data (Cookie): " + cname,
          );
          return null;
        }
      }
    },
    _clearProductUrl: function (url) {
      var parameters = [
        '_sgm_source',
        '_sgm_campaign',
        '_sgm_action',
        '_sgm_type',
        '_sgm_test',
        'utm_source',
        'utm_medium',
        'utm_term',
        'utm_content',
        'utm_campaign',
        'utm_type',
        'p_id',
        'gclid',
        'ds_p',
        'ds_eid',
        'ds_aid',
        'ds_e',
        'ds_c',
        'ds_cid',
        'ds_ag',
        'ds_agid',
        'ds_k',
        'ds_kid',
        'ds_kids',
        'ds_kidnl',
        'gclick',
        'gsrc',
        'gclsrc',
        '_sgm_coupon',
        '_sgm_term',
        '_sgm_pinned',
        '_sgm_pin_position',
      ];
      return _SgmntfY_._stripQueryParameters(url, parameters);
    },
    _stripQueryParameters: function (url, parameters) {
      if (typeof parameters === 'undefined' || !parameters) return url;
      else if (typeof parameters === 'string') parameters = [parameters];
      //prefer to use l.search if you have a location/link object
      var urlParts = (url || '').split('?');
      if (urlParts.length >= 2) {
        var prefixes = [];
        for (var i = 0; i < (parameters || []).length; i++) {
          prefixes.push(encodeURIComponent(parameters[i]) + '=');
        }

        var paramPairs = urlParts[1].split(/[&;]/g);
        //reverse iteration as may be destructive
        for (var i = paramPairs.length; i-- > 0; ) {
          for (var j = 0; j < prefixes.length; j++) {
            //idiom for string.startsWith
            if (paramPairs[i].lastIndexOf(prefixes[j], 0) !== -1) {
              paramPairs.splice(i, 1);
              break;
            }
          }
        }

        if (paramPairs.length > 0)
          return urlParts[0] + '?' + paramPairs.join('&');
        else return urlParts[0];
      } else return url;
    },
    _getQueryParameter: function (name, url) {
      var trackedUrl = location.search;
      if (this._isEmpty(trackedUrl)) {
        var locationHash = location.hash;
        if (
          this._isNotEmpty(locationHash) &&
          locationHash.indexOf('?') !== -1
        ) {
          trackedUrl = locationHash.substring(locationHash.indexOf('?'));
        }
      }
      if (typeof url !== 'undefined') {
        trackedUrl = url;
      }
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#?]*)'),
        results = regex.exec(trackedUrl);
      return results === null
        ? ''
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    _sendTrackedEvent: function (url) {
      var _sgm_push_redirect_url = _SgmntfY_._getQueryParameter(
        '_sgm_push_redirect_url',
        url,
      );
      if (_sgm_push_redirect_url && _sgm_push_redirect_url.length !== 0) {
        window.location = _sgm_push_redirect_url;
      }

      var _sgm_campaign,
        _sgm_action,
        _sgm_source,
        _sgm_coupon,
        _sgm_term,
        _sgm_pinned,
        _sgm_pin_position;

      if (
        _SgmntfY_._getQueryParameter('utm_source', url) === 'segmentify' &&
        _SgmntfY_._getQueryParameter('_sgm_custom', url) !== 'true'
      ) {
        // v2 checks
        _sgm_campaign = _SgmntfY_._getQueryParameter('utm_campaign', url);
        _sgm_action = _SgmntfY_._getQueryParameter('utm_medium', url);
        _sgm_source = _SgmntfY_._getQueryParameter('utm_content', url);
      } else {
        // v1 checks
        _sgm_campaign = _SgmntfY_._getQueryParameter('_sgm_campaign', url);
        _sgm_action = _SgmntfY_._getQueryParameter('_sgm_action', url);
        _sgm_source = _SgmntfY_._getQueryParameter('_sgm_source', url);
      }
      _sgm_coupon = _SgmntfY_._getQueryParameter('_sgm_coupon', url);
      _sgm_term = _SgmntfY_._getQueryParameter('_sgm_term', url);
      _sgm_pinned = _SgmntfY_._getQueryParameter('_sgm_pinned', url);
      if (_sgm_pinned === 'true') {
        _sgm_pin_position = _SgmntfY_._getQueryParameter(
          '_sgm_pin_position',
          url,
        );
      }

      if (_sgm_action === 'push') {
        var _interaction = _SgmntfY_._getPersistentData(_sgm_campaign);
        if (
          _SgmntfY_._isEmpty(_interaction) ||
          (_SgmntfY_._isNotEmpty(_interaction) && _interaction === '0') ||
          _sgm_campaign === 'REPLENISHMENT'
        ) {
          _SgmntfY_.LOG_MESSAGE(
            'DEBUG',
            'Sending tracked event: ' +
              _sgm_action +
              ' - ' +
              _sgm_campaign +
              ' - ' +
              _sgm_source +
              ' - type: push-click',
          );
          _SgmntfY_._variables.segmentifyObj('push:click:interaction', {
            type: 'push-click',
            interactionId: _sgm_source,
            instanceId: _sgm_campaign,
          });
        }
      }

      if (_sgm_action === 'email') {
        var _interaction = _SgmntfY_._getPersistentData(
          _sgm_campaign + '_email',
        );
        if (
          _SgmntfY_._isEmpty(_interaction) ||
          (_SgmntfY_._isNotEmpty(_interaction) && _interaction === '0')
        ) {
          _SgmntfY_._variables.segmentifyObj('email:click', {
            type: 'email-click',
            interactionId: _sgm_source,
            instanceId: _sgm_campaign,
          });
        }
      }

      var _params = {};
      if (_sgm_term) {
        _params['term'] = _sgm_term;
      }
      if (_sgm_pinned === 'true' && _sgm_pin_position) {
        _params['pinPosition'] = _sgm_pin_position;
      }
      if (_sgm_campaign && _sgm_action && _sgm_source) {
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'Sending tracked event: ' +
            _sgm_action +
            ' - ' +
            _sgm_campaign +
            ' - ' +
            _sgm_source,
        );
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: _sgm_action,
          interactionId: _sgm_source,
          instanceId: _sgm_campaign,
          params: _params,
        });

        if (_sgm_action === 'push' && _sgm_coupon) {
          _SgmntfY_._variables.segmentifyObj('coupon', {
            type: _sgm_action,
            interactionId: _sgm_source,
            instanceId: _sgm_campaign,
          });
        }

        if (_sgm_action === 'click') {
          _SgmntfY_.GA.sendProductClick(_sgm_campaign, _sgm_source);
        }
      }
    },
    _setTestMode: function (paramMode) {
      var mode = paramMode || _SgmntfY_._getQueryParameter('_sgm_test');
      _SgmntfY_._toggleTestMode(mode);

      // check current test mode
      if (
        _SgmntfY_._getExtensionStatus('test') !== 'exists' &&
        _SgmntfY_._getTestMode() === 'true'
      ) {
        try {
          var testModeTemplate = [
            '<div class="sgm-test-mode-header">',
            '<a href="http://www.segmentify.com" target="_blank" class="sgm-logo"> </a>',
            '<a href="https://chrome.google.com/webstore/detail/segmentify/dhcffckfimabfhbbjdngnajhnlohfjeo" target="_blank" class="sgm-ext"><span>Get <strong>Chrome Extension</strong> Now!</span></a>',
            '<span class="sgm-test-mode-Show-Hide" data-hide="Hide" data-show="Show"></span>',
            '<div class="sgm-test-mode-key">',
            '<h2 id="sgm-test-mode-message"> Your browser is in<strong>Segmentify Test Mode</strong> </h2>',
            '<div class="sgm-test-mode-radio">',
            '<input class="sgm-tgl sgm-tgl-ios" id="sgm-cb1" type="checkbox" checked>',
            '<label class="sgm-tgl-btn" for="sgm-cb1"></label>',
            '</div>',
            '</div>',
            '</div>',
          ].join('\n');

          setTimeout(function () {
            _SgmntfY_._getJq()('body').prepend(testModeTemplate);
            if (_SgmntfY_._variables.ua.name.toLowerCase() !== 'chrome') {
              _SgmntfY_._getJq()('.sgm-test-mode-header .sgm-ext').hide();
            }
            _SgmntfY_._getJq()('body').addClass('sgm-test-body');

            _SgmntfY_
              ._getJq()('#sgm-cb1')
              .change(function () {
                var $this = _SgmntfY_._getJq()(this);
                setTimeout(function () {
                  _SgmntfY_._toggleTestMode(
                    $this.is(':checked') ? 'on' : 'off',
                  );
                }, 400);
              });

            _SgmntfY_
              ._getJq()('.sgm-test-mode-Show-Hide')
              .click(function () {
                _SgmntfY_._getJq()('body').toggleClass('sgm-test-header-open');
              });
          }, 800);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE('DEBUG', "Can't show test mode header: " + err);
        }
      }
    },
    _getTestMode: function () {
      return _SgmntfY_._getPersistentData(_SgmntfY_._variables.testMode);
    },
    _toggleTestMode: function (mode) {
      if (mode === 'on') {
        _SgmntfY_
          ._getJq()('#sgm-test-mode-message')
          .html('Your browser is in<strong>Segmentify Test Mode</strong>');
        _SgmntfY_
          ._getJq()('#sgm-test-mode-message')
          .find('strong')
          .css('color', '#50BC61');
        _SgmntfY_.LOG_MESSAGE('INFO', 'Segmentify Test Mode activated');
        _SgmntfY_._storePersistentData(
          _SgmntfY_._variables.testMode,
          'true',
          180,
        ); // expire in 180 days
      } else if (mode === 'off') {
        _SgmntfY_
          ._getJq()('#sgm-test-mode-message')
          .html('<strong>Segmentify Test Mode</strong> is disabled');
        _SgmntfY_
          ._getJq()('#sgm-test-mode-message')
          .find('strong')
          .css('color', '#fff');
        _SgmntfY_.LOG_MESSAGE('INFO', 'Segmentify Test Mode deactivated');
        _SgmntfY_._storePersistentData(
          _SgmntfY_._variables.testMode,
          'false',
          180,
        ); // expire in 180 days
        window.alert(
          'You are out of Segmentify Test Mode, you will not see test campaigns.',
        );
        window.location = _SgmntfY_._stripQueryParameters(
          document.URL,
          '_sgm_test',
        );
      }
    },
    _getTracking: function () {
      var _tracking = _SgmntfY_._getPersistentData(
        _SgmntfY_._variables.tracking,
      );
      if (_SgmntfY_._isNotEmpty(_tracking)) {
        _SgmntfY_._setTracking(_tracking);
      }
      return _tracking;
    },
    _setTracking: function (tracking) {
      if (tracking !== 'disabled') {
        tracking = 'enabled';
      }
      _SgmntfY_._storePersistentData(
        _SgmntfY_._variables.tracking,
        tracking,
        390,
      );
    },
    _getQaMode: function () {
      try {
        var qaModeStorage = _SgmntfY_._variables.storage.qaMode;
        return (
          _SgmntfY_._getPersistentData(
            qaModeStorage.key,
            qaModeStorage.local,
          ) || 'false'
        );
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE('DEBUG', "Can't read QA mode status: " + err);
        return 'false';
      }
    },
    _setQaMode: function (paramMode) {
      var mode = paramMode || _SgmntfY_._getQueryParameter('_sgf_qa');
      _SgmntfY_._toggleQaMode(mode);

      // check current test mode
      if (
        _SgmntfY_._getExtensionStatus('qa') !== 'exists' &&
        _SgmntfY_._getQaMode() === 'true'
      ) {
        try {
          var qaModeTemplate = [
            '<div class="sgm-test-mode-header">',
            '<a href="http://www.segmentify.com" target="_blank" class="sgm-logo-blue"> </a>',
            '<a href="https://chrome.google.com/webstore/detail/segmentify/dhcffckfimabfhbbjdngnajhnlohfjeo" target="_blank" class="sgm-ext"><span>Get <strong>QA Extension</strong> Now!</span></a>',
            '<span class="sgm-test-mode-Show-Hide" data-hide="Hide" data-show="Show"></span>',
            '<div class="sgm-test-mode-key">',
            '<h2 id="sgm-qa-mode-message"> Your browser is in<strong>Segmentify QA Mode</strong> </h2>',
            '<div class="sgm-test-mode-radio">',
            '<input class="sgm-tgl sgm-tgl-ios" id="sgm-cb1" type="checkbox" checked>',
            '<label class="sgm-tgl-btn" for="sgm-cb1"></label>',
            '</div>',
            '</div>',
            '</div>',
          ].join('\n');

          setTimeout(function () {
            _SgmntfY_._getJq()('body').prepend(qaModeTemplate);
            if (_SgmntfY_._variables.ua.name.toLowerCase() !== 'chrome') {
              _SgmntfY_._getJq()('.sgm-test-mode-header .sgm-ext').hide();
            }
            _SgmntfY_._getJq()('body').addClass('sgm-test-body');

            _SgmntfY_
              ._getJq()('#sgm-cb1')
              .change(function () {
                var $this = _SgmntfY_._getJq()(this);
                setTimeout(function () {
                  _SgmntfY_._toggleQaMode($this.is(':checked') ? 'on' : 'off');
                }, 400);
              });

            _SgmntfY_
              ._getJq()('.sgm-test-mode-Show-Hide')
              .click(function () {
                _SgmntfY_._getJq()('body').toggleClass('sgm-test-header-open');
              });
          }, 800);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE('DEBUG', "Can't show test mode header: " + err);
        }
      }
    },
    _toggleQaMode: function (mode) {
      var qaModeStorage = _SgmntfY_._variables.storage.qaMode;
      if (mode === 'on') {
        _SgmntfY_
          ._getJq()('#sgm-qa-mode-message')
          .html('Your browser is in<strong>Segmentify QA Mode</strong>');
        _SgmntfY_
          ._getJq()('#sgm-qa-mode-message')
          .find('strong')
          .css('color', '#50BC61');
        _SgmntfY_.LOG_MESSAGE('INFO', 'Segmentify QA Mode activated');
        _SgmntfY_._storePersistentData(
          qaModeStorage.key,
          'true',
          180,
          qaModeStorage.local,
        ); // expire in 180 days
      } else if (mode === 'off') {
        _SgmntfY_
          ._getJq()('#sgm-qa-mode-message')
          .html('<strong>Segmentify QA Mode</strong> is disabled');
        _SgmntfY_
          ._getJq()('#sgm-qa-mode-message')
          .find('strong')
          .css('color', '#fff');
        _SgmntfY_.LOG_MESSAGE('INFO', 'Segmentify QA Mode deactivated');
        _SgmntfY_._storePersistentData(
          qaModeStorage.key,
          'false',
          180,
          qaModeStorage.local,
        ); // expire in 180 days
        window.alert('You are out of Segmentify QA Mode.');
        window.location = _SgmntfY_._stripQueryParameters(
          document.URL,
          '_sgf_qa',
        );
      }
    },
    _getSearchVerboseParams: function (params) {
      var searchQueryOverride = _SgmntfY_._getSearchQueryOverride();
      if (searchQueryOverride) {
        params['_search_no_cache_'] = 'true';
        params['_search_query_override_'] = searchQueryOverride;
      } else {
        params['_search_no_cache_'] = _SgmntfY_._getSearchNoCache();
      }
      if (_SgmntfY_._variables.search.queryVerboseLog === true) {
        params['_search_query_verbose_log_'] = 'true';
      }
      return params;
    },
    _getSearchNoCache: function () {
      try {
        if (_SgmntfY_._variables.search.searchNoCache === true) {
          return 'true';
        } else {
          var searchNoCacheStorage = _SgmntfY_._variables.storage.searchNoCache;
          return (
            _SgmntfY_._getPersistentData(
              searchNoCacheStorage.key,
              searchNoCacheStorage.local,
            ) || 'false'
          );
        }
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          "Can't read Search no cache status: " + err,
        );
        return 'false';
      }
    },
    _getSearchQueryOverride: function () {
      try {
        var searchQueryOverride = _SgmntfY_._getPersistentData(
          _SgmntfY_._variables.search.queryOverrideKey,
          true,
        );
        var expires = JSON.parse(searchQueryOverride).expires;
        if (Date.parse(expires) > new Date()) {
          return searchQueryOverride;
        } else {
          _SgmntfY_._unsetSearchQueryOverride();
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    _getEventUrl: function () {
      if (_SgmntfY_._getQaMode() === 'true') {
        return _SgmntfY_._variables.segmentifyQaApiUrl;
      } else {
        return _SgmntfY_._variables.segmentifyApiUrl;
      }
    },
    _getPushUrl: function () {
      if (_SgmntfY_._getQaMode() === 'true') {
        return _SgmntfY_._variables.pushInfo.qaDataCenter;
      } else {
        return _SgmntfY_._variables.pushInfo.dataCenter;
      }
    },
    _getSessionId: function () {
      if (_SgmntfY_._variables.doNotTrack === true) {
        return 'ANONYMOUS_SESSION';
      }
      var _sessionId = _SgmntfY_._getPersistentData(
        _SgmntfY_._variables.sessionStorageKey,
        _SgmntfY_._variables.storage.session.local,
      );
      return _sessionId ? _sessionId.trim() : '';
    },
    _getUserId: function () {
      if (_SgmntfY_._variables.doNotTrack === true) {
        return 'ANONYMOUS_USER';
      }
      var _userId = _SgmntfY_._getPersistentData(
        _SgmntfY_._variables.userStorageKey,
        _SgmntfY_._variables.storage.user.local,
      );
      return _userId ? _userId.trim() : '';
    },
    _shuffle: function (o) {
      for (
        var j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      )
        return o;
    },
    _getClickedBanners: function () {
      try {
        var clickedBannersStorage = _SgmntfY_._variables.storage.clickedBanners;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              clickedBannersStorage.key,
              clickedBannersStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('DEBUG', "Can't read clicked banners: " + err);
      }
      return [];
    },
    _addClickedBanner: function (title, group, order, url) {
      if (
        typeof title === 'undefined' ||
        typeof group === 'undefined' ||
        typeof order === 'undefined' ||
        typeof url === 'undefined'
      ) {
        return;
      }
      var bannerKey = title + ':' + group + ':' + order + ':' + url;
      var clickedBanners = _SgmntfY_._getClickedBanners();
      if (clickedBanners.indexOf(bannerKey) === -1) {
        clickedBanners.push(bannerKey);
      }

      if (
        clickedBanners.length >
        _SgmntfY_._variables.constants.clickedBannersLimit
      ) {
        clickedBanners = clickedBanners.splice(
          clickedBanners.length -
            _SgmntfY_._variables.constants.clickedBannersLimit,
        );
      }
      var clickedBannersStorage = _SgmntfY_._variables.storage.clickedBanners;
      _SgmntfY_._storePersistentData(
        clickedBannersStorage.key,
        JSON.stringify(clickedBanners),
        0,
        clickedBannersStorage.local,
      );
    },
    _getDelayedActions: function () {
      try {
        var delayedActionsStorage = _SgmntfY_._variables.storage.delayedActions;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              delayedActionsStorage.key,
              delayedActionsStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', "Can't read delayed actions: " + err);
      }
      return [];
    },
    _setDelayedActions: function (delayedActions) {
      var delayedActionsStorage = _SgmntfY_._variables.storage.delayedActions;
      _SgmntfY_._storePersistentData(
        delayedActionsStorage.key,
        JSON.stringify(delayedActions),
        0,
        delayedActionsStorage.local,
      );
    },
    _addDelayedAction: function (action) {
      var delayedActions = _SgmntfY_._getDelayedActions();
      for (var i = 0; i < delayedActions.length; i++) {
        if (delayedActions[i].params.actionId === action.params.actionId)
          return false;
      }
      var currentDate = new Date();
      if (action.delayDate.getTime() < currentDate.getTime()) return false;
      else {
        var type = action.type;
        var actionFunction = _SgmntfY_._actions[action.type];
        var params = action.params;
        var request = action.request;
        setTimeout(function () {
          var delayedActions = _SgmntfY_._getDelayedActions();
          var exist = false;
          for (var i = 0; i < delayedActions.length; i++) {
            if (delayedActions[i].params.actionId === action.params.actionId)
              exist = true;
          }
          if (exist) {
            _SgmntfY_.LOG_MESSAGE(
              'INFO',
              'Action(' + type + ') is triggered after delay',
            );
            actionFunction.call(null, params, request);
            _SgmntfY_._removeDelayedAction(params.actionId);
          }
        }, action.delayDate.getTime() -
          currentDate.getTime() +
          Math.floor(Math.random() * 750));
        delayedActions.push(action);
        _SgmntfY_._setDelayedActions(delayedActions);
        return true;
      }
    },
    _removeDelayedAction: function (actionId) {
      var delayedActions = _SgmntfY_._getDelayedActions();
      for (var i = 0; i < delayedActions.length; i++) {
        if (delayedActions[i].params.actionId === actionId) {
          delayedActions.splice(i, 1);
          _SgmntfY_._setDelayedActions(delayedActions);
          return;
        }
      }
    },
    _getRetryQueue: function () {
      try {
        var retryQueueStorage = _SgmntfY_._variables.storage.retryQueue;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              retryQueueStorage.key,
              retryQueueStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', "Can't read retry queue: " + err);
      }
      return [];
    },
    _setRetryQueue: function (retryQueue) {
      var retryQueueStorage = _SgmntfY_._variables.storage.retryQueue;
      _SgmntfY_._storePersistentData(
        retryQueueStorage.key,
        JSON.stringify(retryQueue),
        0,
        retryQueueStorage.local,
      );
    },
    _addToRetryQueue: function (q) {
      var rq = _SgmntfY_._getRetryQueue();
      while (q.length > 0) {
        var ev = q.shift();
        var retryable =
          ev['eventName'] === 'CHECKOUT' ||
          ev['eventName'] === 'BASKET_OPERATIONS' ||
          ev['eventName'] === 'INTERACTION';
        if (!retryable) {
          continue;
        }
        var tc = ev.data.tryCount || 0;
        if (tc < _SgmntfY_._variables.constants.retryLimit) {
          ev.data.tryCount = tc + 1;
          if (_SgmntfY_._variables.isPageHide) {
            ev.originalParams.discardResponse = 'true';
          }
          rq.push(ev);
        }
      }
      _SgmntfY_._setRetryQueue(rq);
    },
    _consumeRetryQueue: function () {
      var rq = _SgmntfY_._getRetryQueue();
      if (rq && rq.length > 0) {
        var q = [];
        while (rq.length > 0) {
          var ev = rq.shift();
          // update user and session id
          ev.data.userId = _SgmntfY_._getUserId();
          ev.data.sessionId = _SgmntfY_._getSessionId();
          q.push(ev);
        }
        _SgmntfY_._sendRequestToServer(q);
        _SgmntfY_._setRetryQueue([]);
      }
    },
    _getDataLayer: function () {
      return window[_SgmntfY_._variables.dataLayer];
    },
    _consumeDataLayer: function () {
      if (_SgmntfY_._variables.consumeDataLayer) {
        var dlq = [];
        var extractEvent = function (key, params) {
          if (
            params.hasOwnProperty('__processed__') &&
            params['__processed__'] === true
          )
            return;
          var extendedParams = _SgmntfY_._extend(params, common);
          var func = _SgmntfY_._functions.getDataLayerFunction(
            key,
            extendedParams,
          );
          var dle = func.apply(null, [extendedParams]);
          if (dle) dlq.push(dle);
        };
        var transformEventData = function (key, params) {
          var newParams = JSON.parse(JSON.stringify(params));
          var config = _SgmntfY_._variables.dataLayerConfig[key] || {};
          for (var c in config) {
            if (config.hasOwnProperty(c)) {
              var v = config[c];
              if (newParams.hasOwnProperty(v)) {
                var param = newParams[v];
                delete newParams[v];
                newParams[c] = param;
              }
            }
          }
          return newParams;
        };
        var dataLayer = _SgmntfY_._getDataLayer() || {};
        var common = transformEventData('common', dataLayer['common'] || {});
        if (common.hasOwnProperty('userId')) {
          var userChangeRequest = _SgmntfY_._functions.setUserId(
            common['userId'],
          );
          if (userChangeRequest) {
            dlq.push(userChangeRequest);
            delete _SgmntfY_._getDataLayer()['common']['userId'];
          }
        }
        for (var key in dataLayer) {
          if (dataLayer.hasOwnProperty(key)) {
            if (key === 'common') {
              continue;
            }
            if (_SgmntfY_._getJq().isArray(dataLayer[key])) {
              for (var a = 0; a < dataLayer[key].length; ++a) {
                extractEvent(key, transformEventData(key, dataLayer[key][a]));
                _SgmntfY_._getDataLayer()[key][a]['__processed__'] = true;
              }
            } else {
              extractEvent(key, transformEventData(key, dataLayer[key]));
              _SgmntfY_._getDataLayer()[key]['__processed__'] = true;
            }
          }
        }
        if (dlq.length > 0) {
          _SgmntfY_._sendRequestToServer(dlq);
        }
      }
    },
    _getNextPageQueue: function () {
      try {
        var nextPageQueueStorage = _SgmntfY_._variables.storage.nextPageQueue;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              nextPageQueueStorage.key,
              nextPageQueueStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', "Can't read next page queue: " + err);
      }
      return [];
    },
    _setNextPageQueue: function (nextPageQueue) {
      var nextPageQueueStorage = _SgmntfY_._variables.storage.nextPageQueue;
      _SgmntfY_._storePersistentData(
        nextPageQueueStorage.key,
        JSON.stringify(nextPageQueue),
        0,
        nextPageQueueStorage.local,
      );
    },
    _addToNextPageQueue: function (request) {
      var npq = _SgmntfY_._getNextPageQueue();
      npq.push(request);
      _SgmntfY_._setNextPageQueue(npq);
    },
    _consumeNextPageQueue: function () {
      var npq = _SgmntfY_._getNextPageQueue();
      if (npq && npq.length > 0) {
        var q = [];
        while (npq.length > 0) {
          var ev = npq.shift();
          if (!ev.hasOwnProperty('data')) {
            ev = _SgmntfY_._prepareRequest(ev['params'], ev['eventName'], true);
          }
          // update user and session id
          ev.data.userId = _SgmntfY_._getUserId();
          ev.data.sessionId = _SgmntfY_._getSessionId();
          q.push(ev);
        }
        _SgmntfY_._sendRequestToServer(q);
        _SgmntfY_._setNextPageQueue([]);
      }
    },
    _addRecommendedProduct: function (productId) {
      _SgmntfY_._variables.recommendedProducts.push(productId);
    },
    _containsRecommendedProduct: function (productId) {
      return _SgmntfY_._variables.recommendedProducts.indexOf(productId) >= 0;
    },
    _addRecommendedPromotion: function (promoCode) {
      _SgmntfY_._variables.recommendedPromotions.push(promoCode);
    },
    _containsRecommendedPromotion: function (promoCode) {
      return _SgmntfY_._variables.recommendedPromotions.indexOf(promoCode) >= 0;
    },
    _getExtensionStatus: function (extension) {
      try {
        var extensionStatusStorage;
        if ('qa' === extension) {
          extensionStatusStorage =
            _SgmntfY_._variables.storage.qaExtensionStatus;
        } else {
          extensionStatusStorage = _SgmntfY_._variables.storage.extensionStatus;
        }
        return (
          _SgmntfY_._getPersistentData(
            extensionStatusStorage.key,
            extensionStatusStorage.local,
          ) || ''
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('DEBUG', "Can't read extension status: " + err);
      }
      return '';
    },
    _getDelayedCampaigns: function () {
      try {
        var delayedCampaignsStorage =
          _SgmntfY_._variables.storage.delayedCampaigns;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              delayedCampaignsStorage.key,
              delayedCampaignsStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', "Can't read delayed campaigns: " + err);
      }
      return [];
    },
    _setDelayedCampaigns: function (delayedCampaigns) {
      var delayedCampaignsStorage =
        _SgmntfY_._variables.storage.delayedCampaigns;
      _SgmntfY_._storePersistentData(
        delayedCampaignsStorage.key,
        JSON.stringify(delayedCampaigns),
        0,
        delayedCampaignsStorage.local,
      );
    },
    _addDelayedCampaign: function (delayedCampaign) {
      var delayedCampaigns = _SgmntfY_._getDelayedCampaigns();
      for (var i = 0; i < delayedCampaigns.length; ++i) {
        if (
          delayedCampaigns[i]['campaign']['instanceId'] ===
          delayedCampaign['campaign']['instanceId']
        )
          return false;
      }
      var now = new Date();
      if (delayedCampaign['time'].getTime() < now.getTime()) {
        return false;
      } else {
        var campaign = delayedCampaign['campaign'];
        var request = delayedCampaign['request'];
        var campaignFunction = _SgmntfY_._campaigns[campaign['type']];
        setTimeout(function () {
          var delayedCampaigns = _SgmntfY_._getDelayedCampaigns();
          var exist = false;
          for (var i = 0; i < delayedCampaigns.length; ++i) {
            if (
              delayedCampaigns[i]['campaign']['instanceId'] ===
              delayedCampaign['campaign']['instanceId']
            )
              exist = true;
          }
          if (exist) {
            _SgmntfY_.LOG_MESSAGE(
              'INFO',
              'Campaign (' + campaign['type'] + ') triggered after delay',
            );
            campaignFunction.call(null, campaign, request);
            _SgmntfY_._removeDelayedCampaign(campaign['instanceId']);
          }
        }, delayedCampaign['time'].getTime() -
          now.getTime() +
          Math.floor(Math.random() * 750));
        delayedCampaigns.push(delayedCampaign);
        _SgmntfY_._setDelayedCampaigns(delayedCampaigns);
        return true;
      }
    },
    _removeDelayedCampaign: function (instanceId) {
      var delayedCampaigns = _SgmntfY_._getDelayedCampaigns();
      for (var i = 0; i < delayedCampaigns.length; i++) {
        if (delayedCampaigns[i]['campaign']['instanceId'] === instanceId) {
          delayedCampaigns.splice(i, 1);
          _SgmntfY_._setDelayedCampaigns(delayedCampaigns);
          return;
        }
      }
    },
    _getPageViewsCampaigns: function () {
      try {
        var pageViewCampaignsStorage =
          _SgmntfY_._variables.storage.pageViewCampaigns;
        return (
          JSON.parse(
            _SgmntfY_._getPersistentData(
              pageViewCampaignsStorage.key,
              pageViewCampaignsStorage.local,
            ),
          ) || []
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', "Can't read pageview campaigns: " + err);
      }
      return [];
    },
    _setPageViewsCampaigns: function (pageViewCampaigns) {
      var pageViewCampaignsStorage =
        _SgmntfY_._variables.storage.pageViewCampaigns;
      _SgmntfY_._storePersistentData(
        pageViewCampaignsStorage.key,
        JSON.stringify(pageViewCampaigns),
        0,
        pageViewCampaignsStorage.local,
      );
    },
    _addPageViewsCampaign: function (pageViewsCampaign) {
      var pageViewsCampaigns = _SgmntfY_._getPageViewsCampaigns();
      for (var i = 0; i < pageViewsCampaigns.length; ++i) {
        if (
          pageViewsCampaigns[i]['campaign']['instanceId'] ===
          pageViewsCampaign['campaign']['instanceId']
        ) {
          if (pageViewsCampaign['sessionId'] === _SgmntfY_._getSessionId()) {
            return false;
          } else {
            _SgmntfY_._removePageViewsCampaign(
              pageViewsCampaign['campaign']['instanceId'],
            );
            break;
          }
        }
      }
      pageViewsCampaigns.push(pageViewsCampaign);
      _SgmntfY_._setPageViewsCampaigns(pageViewsCampaigns);
      return true;
    },
    _removePageViewsCampaign: function (instanceId) {
      var pageViewsCampaigns = _SgmntfY_._getPageViewsCampaigns();
      for (var i = 0; i < pageViewsCampaigns.length; i++) {
        if (pageViewsCampaigns[i]['campaign']['instanceId'] === instanceId) {
          pageViewsCampaigns.splice(i, 1);
          _SgmntfY_._setPageViewsCampaigns(pageViewsCampaigns);
          return;
        }
      }
    },
    _triggerPageViewsCampaign: function (pageViewCampaign) {
      if (
        pageViewCampaign['pageView'] === 0 &&
        pageViewCampaign['sessionId'] === _SgmntfY_._getSessionId()
      ) {
        var campaign = pageViewCampaign['campaign'];
        var request = pageViewCampaign['request'];
        var campaignFunction = _SgmntfY_._campaigns[campaign['type']];
        var pageViewCampaigns = _SgmntfY_._getPageViewsCampaigns();
        var exist = false;
        for (var i = 0; i < pageViewCampaigns.length; ++i) {
          if (
            pageViewCampaigns[i]['campaign']['instanceId'] ===
            pageViewCampaign['campaign']['instanceId']
          )
            exist = true;
        }
        if (exist) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Campaign (' + campaign['type'] + ') triggered after pageviews',
          );
          campaignFunction.call(null, campaign, request);
          _SgmntfY_._removePageViewsCampaign(campaign['instanceId']);
        }
      }
    },
    _interaction: function (type, instanceId, interactionId) {
      _SgmntfY_._variables.segmentifyObj('event:interaction', {
        type: type,
        instanceId: instanceId,
        interactionId: interactionId,
      });
    },
    _getFireTime: function (date) {
      function pad(number, length) {
        var s = number.toString();
        while (s.length < length) {
          s = '0' + s;
        }
        return s;
      }

      try {
        return (
          date.getFullYear() +
          '.' +
          pad(date.getMonth() + 1, 2) +
          '.' +
          pad(date.getDate(), 2) +
          ' ' +
          pad(date.getHours(), 2) +
          ':' +
          pad(date.getMinutes(), 2) +
          ':' +
          pad(date.getSeconds(), 2) +
          '.' +
          pad(date.getMilliseconds(), 3)
        );
      } catch (e) {
        return '';
      }
    },
    _getTimeZone: function (date) {
      try {
        return date.getTimezoneOffset().toString();
      } catch (e) {
        return '';
      }
    },
    // Getters
    _getJq: function () {
      return _SgmntfY_._variables.jq;
    },
    _getMustache: function () {
      return _SgmntfY_._variables.mustache;
    },
    _getObjectByString: function (o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, ''); // strip a leading dot
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          o = o[k];
        } else {
          return;
        }
      }
      return o;
    },
    // Misc
    _isUndefined: function (value) {
      return typeof value === 'undefined';
    },
    _notNull: function (value) {
      return typeof value !== 'undefined' && value != null;
    },
    _isEmpty: function (value) {
      return typeof value === 'undefined' || value == null || value === '';
    },
    _isNotEmpty: function (value) {
      return !_SgmntfY_._isEmpty(value);
    },
    _isPlainObject: function (obj) {
      if (typeof obj == 'object' && obj !== null) {
        if (typeof Object.getPrototypeOf == 'function') {
          var proto = Object.getPrototypeOf(obj);
          return proto === Object.prototype || proto === null;
        }
        return Object.prototype.toString.call(obj) == '[object Object]';
      }
      return false;
    },
    _isElemVisible: function ($elem) {
      try {
        if (_SgmntfY_._exists($elem) && $elem.css('display') !== 'none') {
          var $window = _SgmntfY_._getJq()(window);

          var docViewTop = $window.scrollTop();
          var docViewBottom = docViewTop + $window.height();

          if ($elem instanceof HTMLElement) {
            $elem = _SgmntfY_._getJq()($elem);
          } else if ($elem instanceof HTMLCollection) {
            $elem = _SgmntfY_._getJq()($elem[0]);
          }
          var elemTop = $elem.offset().top;
          var elemBottom = elemTop + 100; // seeing 100 pixels of element is enough for us

          return elemBottom <= docViewBottom && elemTop >= docViewTop;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    },
    _exists: function (elem) {
      if (elem instanceof HTMLElement) {
        return elem !== null;
      } else if (
        elem instanceof HTMLCollection ||
        elem instanceof _SgmntfY_._getJq() ||
        elem instanceof jQuery ||
        elem instanceof $
      ) {
        return elem.length > 0;
      } else {
        return false;
      }
    },
    _extend: function () {
      var options,
        name,
        src,
        copy,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target;
        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            if (options.hasOwnProperty(name)) {
              src = target[name];
              copy = options[name];

              // Prevent never-ending loop
              if (target === copy) {
                continue;
              }

              // Recurse if we're merging plain objects or arrays
              if (deep && copy && _SgmntfY_._isPlainObject(copy)) {
                clone =
                  src && typeof src === 'object' && src !== null ? src : {};

                // Never move original objects, clone them
                target[name] = _SgmntfY_._extend(deep, clone, copy);

                // Don't bring in undefined values
              } else if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }
      }

      // Return the modified object
      return target;
    },
    _split: function (str, separator, limit) {
      if (str && typeof str === 'string') {
        var i,
          array = str.split(separator);
        for (i = 0; i < array.length; i++) {
          array[i] = array[i].trim();
        }
        if (limit && limit < array.length) {
          var result = array.splice(0, limit - 1);
          result.push(array.join(separator));
          array = result;
        }
        return array;
      } else return null;
    },
    _parseFloat: function (value) {
      if (value == null) return value;
      else if (typeof value === 'undefined') return null;
      else if (typeof value === 'number') return value;
      else if (typeof value === 'string') return parseFloat(value);
      else return value;
    },
    _parseBoolean: function (value) {
      if (typeof value === 'undefined') return null;
      else if (typeof value === 'number') {
        if (value === 0) return 'false';
        else return 'true';
      } else if (typeof value === 'string') {
        if (value === '0' || value.toLowerCase() === 'false') return 'false';
        else return 'true';
      } else if (typeof value === 'boolean') return value.toString();
      else return value;
    },
    _null: function (item) {
      return item != undefined && item != '';
    },
    _clearNullByte: function (value) {
      return value.replace(/\0/g, '');
    },
    _checkVersion: function (required, current) {
      var cur = current.split('.');
      var min = required.split('.');
      prevs = [];

      for (var i = 0, len = Math.max(cur.length, min.length); i < len; i++) {
        cur[i] = parseInt(cur[i]);
        if (isNaN(cur[i])) cur[i] = 0;
        min[i] = parseInt(min[i]);
        if (isNaN(min[i])) min[i] = 0;
        if (cur[i] < min[i]) return false;
        else if (cur[i] > min[i]) return true;
      }
      return true;
    },
    _updateBrowserAndDeviceInfo: function () {
      if (typeof window['bowser'] === 'undefined') {
        return;
      }
      var _bowser = window['bowser']._detect(
        _SgmntfY_._variables.ua.agentString,
      );
      if (_SgmntfY_._variables.ua.type == null) {
        // type
        if (_bowser.tablet) _SgmntfY_._variables.ua.type = 'tablet';
        else if (_bowser.mobile) _SgmntfY_._variables.ua.type = 'mobile';
        else _SgmntfY_._variables.ua.type = 'PC';
        // name
        if (_bowser.chromium) _SgmntfY_._variables.ua.name = 'Chrome';
        else _SgmntfY_._variables.ua.name = _bowser.name;
        // version
        _SgmntfY_._variables.ua.version = _bowser.version;
      }
      if (_SgmntfY_._variables.ua.os == null) {
        // os
        _SgmntfY_._variables.ua.os = _bowser.osname || 'Other';
        _SgmntfY_._variables.ua.osversion = _bowser.osversion;
      }
    },
    _addLeavePageHandler: function (action, request) {
      var type = action['type'];
      var params = action['params'];
      var actionFunction = _SgmntfY_._actions[type];

      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Action(' + type + ') will be triggered when user leaves page',
      );
      var mouseLeaveHandler = function (event) {
        if (event.clientY < 0) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Action(' + type + ') is triggered at user leave page',
          );
          _SgmntfY_._getJq()(document).unbind('mouseleave', mouseLeaveHandler);
          actionFunction.call(null, params, request);
        }
      };
      _SgmntfY_._getJq()(document).bind('mouseleave', mouseLeaveHandler);
    },
    _addWaitPageHandler: function (action, request) {
      var type = action['type'];
      var params = action['params'];
      var delayAction = action['delayAction'] || null;
      var actionFunction = _SgmntfY_._actions[type];

      var delayTime = parseInt(delayAction.time);
      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Action(' +
          type +
          ') will be triggered after ' +
          delayTime +
          ' second(s) delay on same page',
      );
      setTimeout(function () {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Action(' + type + ') is triggered after delay',
        );
        actionFunction.call(null, params, request);
      }, delayTime * 1000);
    },
    _addScrollHandler: function (action, request) {
      var type = action['type'];
      var delayAction = action['delayAction'];
      var scrollPct = parseInt(delayAction['time']) || 0;
      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Action (' +
          type +
          ') will be triggered after ' +
          scrollPct +
          '% of page is scrolled',
      );
      var scrollHandler = function () {
        if (scrollPct <= _SgmntfY_._getScrollPercent()) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Action (' +
              type +
              ') triggered after ' +
              scrollPct +
              '% of page is scrolled',
          );
          _SgmntfY_._getJq()(document).unbind('scroll', scrollHandler);
          var actionFunction = _SgmntfY_._actions[type];
          actionFunction.call(null, action['params'], request);
        }
      };
      _SgmntfY_._getJq()(document).bind('scroll', scrollHandler);
    },
    // campaign handlers
    _addCampaignDelayHandler: function (campaign, request) {
      var type = campaign['type'];
      var timing = campaign['timing'];
      var delayTime = parseInt(timing['param']);
      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Campaign (' +
          type +
          ') will be triggered after ' +
          delayTime +
          ' second(s) delay on same page',
      );
      window.setTimeout(function () {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Campaign (' + type + ') triggered after ' + delayTime + ' delay',
        );
        var campaignFunction = _SgmntfY_._campaigns[type];
        campaignFunction.call(null, campaign, request);
      }, delayTime * 1000);
    },
    _addCampaignDelayAllPagesHandler: function (campaign, request) {
      var timing = campaign['timing'] || '0';
      var delayTime = new Date(
        new Date().getTime() + 1000 * parseInt(timing['param']),
      );
      var delayedCampaign = {
        campaign: campaign,
        request: request,
        time: delayTime,
      };
      // check this campaign is already stored for triggering
      if (!_SgmntfY_._addDelayedCampaign(delayedCampaign)) {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Campaign (' +
            campaign['instanceId'] +
            ') already added for delayed campaign',
        );
      } else {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Campaign (' +
            campaign['instanceId'] +
            ') added for delayed campaign in future',
        );
      }
    },
    _addCampaignPageViewsHandler: function (campaign, request) {
      var timing = campaign['timing'] || '0';
      var pageView = parseInt(timing['param']) - 1;
      var pageViewCampaign = {
        campaign: campaign,
        request: request,
        pageView: pageView,
        sessionId: _SgmntfY_._getSessionId(),
      };
      // check this campaign is already stored for triggering
      if (!_SgmntfY_._addPageViewsCampaign(pageViewCampaign)) {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Campaign (' +
            campaign['instanceId'] +
            ') already added for pageview campaign',
        );
      } else {
        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Campaign (' +
            campaign['instanceId'] +
            ') added for pageview campaign in future',
        );
      }
    },
    _addCampaignScrollHandler: function (campaign, request) {
      var type = campaign['type'];
      var timing = campaign['timing'];
      var scrollPct = parseInt(timing.param);
      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Campaign (' +
          type +
          ') will be triggered after ' +
          scrollPct +
          '% of page is scrolled',
      );
      var scrollHandler = function () {
        if (scrollPct <= _SgmntfY_._getScrollPercent()) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Campaign (' +
              type +
              ') triggered after ' +
              scrollPct +
              '% of page is scrolled',
          );
          _SgmntfY_._getJq()(document).unbind('scroll', scrollHandler);
          var campaignFunction = _SgmntfY_._campaigns[type];
          campaignFunction.call(null, campaign, request);
        }
      };
      _SgmntfY_._getJq()(document).bind('scroll', scrollHandler);
    },
    _addCampaignLeaveHandler: function (campaign, request) {
      var type = campaign['type'];
      _SgmntfY_.LOG_MESSAGE(
        'INFO',
        'Campaign (' + type + ') will be triggered when user leaves page',
      );
      var leaveHandler = function (event) {
        if (event.clientY < 0) {
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'Campaign (' + type + ') triggered at user leave page',
          );
          _SgmntfY_._getJq()(document).unbind('mouseleave', leaveHandler);
          var campaignFunction = _SgmntfY_._campaigns[type];
          campaignFunction.call(null, campaign, request);
        }
      };
      _SgmntfY_._getJq()(document).bind('mouseleave', leaveHandler);
    },
    _addCampaignInteractionHandler: function (campaign, request) {},
    _getScrollPercent: function () {
      var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
      return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    },
    // Post Data
    _updateUserAndSessionId: function (requiredKeyCount) {
      if (_SgmntfY_._variables.doNotTrack === true) {
        return;
      }
      _SgmntfY_._variables.waitingKeys = true;
      // get keys
      var request = {
        data: null,
        url:
          _SgmntfY_._getEventUrl() +
          '/get/key/v1.json?count=' +
          requiredKeyCount,
      };
      _SgmntfY_
        ._getJq()
        .ajax({
          contentType: 'text/plain',
          processData: false,
          type: 'GET',
          url: request.url,
          timeout: _SgmntfY_._variables.constants.eventTimeout * 1000,
        })
        .done(function (responseData, textStatus, jqXHR) {
          _SgmntfY_._ajaxSuccess(request, responseData, textStatus);
          // update user id
          if (requiredKeyCount === 2) {
            _SgmntfY_._storePersistentData(
              _SgmntfY_._variables.userStorageKey,
              responseData[1],
              390,
              _SgmntfY_._variables.storage.user.local,
            ); // expire in 13 months
          }
          var userId = _SgmntfY_._getUserId();
          if (_SgmntfY_._isEmpty(userId)) {
            _SgmntfY_.LOG_MESSAGE('ERROR', "Can't update User Id");
            return;
          }
          _SgmntfY_.LOG_MESSAGE('INFO', 'User Id Changed: ' + userId);
          // update session id
          _SgmntfY_._storePersistentData(
            _SgmntfY_._variables.sessionStorageKey,
            responseData[0],
            0,
            _SgmntfY_._variables.storage.session.local,
          ); // session cookie
          if (_SgmntfY_._isEmpty(_SgmntfY_._getSessionId())) {
            _SgmntfY_.LOG_MESSAGE('ERROR', "Can't update User Session");
            return;
          }
          _SgmntfY_.LOG_MESSAGE(
            'INFO',
            'User Session Changed: ' + responseData[0],
          );
          _SgmntfY_._variables.waitingKeys = false;
          _SgmntfY_._variables.keysTryCount++;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          _SgmntfY_._ajaxError(request, jqXHR, textStatus, errorThrown);
          _SgmntfY_._variables.keysTryCount++;
          _SgmntfY_._variables.waitingKeys = false;
        });
    },
    _sendRequestToServer: function (requestDataArray) {
      // check datas
      if (!requestDataArray || requestDataArray.length <= 0) return;
      // combine data of all requests
      var dataArray = [];
      for (var i = 0; i < requestDataArray.length; i++) {
        dataArray.push(requestDataArray[i].data);
      }
      var _headers = {
        'X-Sfy-Api-Key': _SgmntfY_._variables.apiKey,
      };

      _SgmntfY_
        ._getJq()
        .ajax({
          contentType: 'text/plain',
          processData: false,
          type: 'POST',
          url:
            _SgmntfY_._getEventUrl() +
            '/add/events/v1.json?apiKey=' +
            _SgmntfY_._variables.apiKey,
          data: JSON.stringify(dataArray),
          headers: _headers,
          timeout: _SgmntfY_._variables.constants.eventTimeout * 1000,
        })
        .done(function (responseData, textStatus, jqXHR) {
          _SgmntfY_._ajaxSuccess(dataArray, responseData, textStatus);
          var statusCode = responseData['statusCode'] || '';
          if (statusCode === 'SUCCESS') {
            var responses = responseData['responses'];
            var campaigns = responseData['campaigns'];
            var searches = responseData['search'];
            var coupons = responseData['coupons'] || [[]];
            var experiments = responseData['experiments'] || {};

            if (
              _SgmntfY_._experiment.get() !==
              _SgmntfY_._experiment.toString(experiments)
            ) {
              _SgmntfY_._experiment.store(
                _SgmntfY_._experiment.toString(experiments),
              );
            }
            _SgmntfY_._setUserData(responseData['u'] || {});

            if (
              responses.length === requestDataArray.length &&
              campaigns.length === requestDataArray.length
            ) {
              for (var j = 0; j < responses.length; j++) {
                var request = requestDataArray[j];
                var responseArray = responses[j];
                var campaignArray = campaigns[j];
                var searchArray = searches[j];

                var couponArray = coupons[j];

                // check discard flag
                if (request.originalParams.discardResponse !== 'true') {
                  _SgmntfY_._getResponse(request, responseArray);
                  _SgmntfY_._getCampaign(request, campaignArray);
                  _SgmntfY_._getSearchCampaign(request, searchArray);
                  _SgmntfY_.initCoupon(couponArray);

                  if (typeof request._cb === 'function' && searchArray) {
                    if (searchArray) {
                      request._cb(searchArray);
                    } else {
                      request._cb();
                    }
                  }
                } else {
                  _SgmntfY_.LOG_MESSAGE(
                    'DEBUG',
                    'Action(' + request.eventName + ') responses are discarded',
                  );
                }
              }
            } else {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Segmentify response length(' +
                  responses.length +
                  ") doesn't match request length(" +
                  requestDataArray.length +
                  ')',
              );
            }
          } else {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Segmentify response is (' + statusCode + ')',
            );
            if (statusCode === 'NO_SESSIONID') {
              _SgmntfY_._updateUserAndSessionId(1);
            } else if (statusCode === 'NO_USERID') {
              _SgmntfY_._updateUserAndSessionId(2);
            }
          }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          var isJBRequest = false;
          for (var i = 0; i < requestDataArray.length; i++) {
            if (
              _SgmntfY_._jbOverFlowOperations._journeyFinished(
                requestDataArray[i],
              )
            ) {
              isJBRequest = true;
            }
          }
          if (isJBRequest) {
            _SgmntfY_._jbOnDestroyJourneyFlowExecution(false);
          }
          _SgmntfY_._searchFailHandler(
            requestDataArray,
            jqXHR,
            textStatus,
            errorThrown,
          );
          _SgmntfY_._addToRetryQueue(requestDataArray);
          _SgmntfY_._ajaxError(dataArray, jqXHR, textStatus, errorThrown);
        });
    },
    _searchFailHandler: function (
      requestDataArray,
      jqXHR,
      textStatus,
      errorThrown,
    ) {
      var sgmSearchEventRequest = null;
      if (requestDataArray && requestDataArray.length > 0) {
        sgmSearchEventRequest = requestDataArray.filter(function (item) {
          return item.eventName === 'SEARCH';
        });
      }
      if (sgmSearchEventRequest && sgmSearchEventRequest.length > 0) {
        var searchEventReq = sgmSearchEventRequest[0];
        if (
          searchEventReq.data &&
          searchEventReq.data.type === 'faceted' &&
          typeof searchEventReq._cb === 'function'
        ) {
          searchEventReq._cb(null, {
            jqXHR: jqXHR,
            textStatus: textStatus,
            errorThrown: errorThrown,
          });
        } else {
          if (_SgmntfY_._getJq()('.seg-search-wrapper').length !== 0) {
            if (
              _SgmntfY_._getJq()(window).width() <
              _SgmntfY_._variables.search.maxMobileWidth
            ) {
              var sgmSearchEventRequest = null;
              if (
                sgmSearchEventRequest &&
                sgmSearchEventRequest.length > 0 &&
                _SgmntfY_._variables.search.initialCampaign
              ) {
                _SgmntfY_._getSearchCampaign(sgmSearchEventRequest[0], [
                  { campaign: _SgmntfY_._variables.search.initialCampaign },
                ]);
              } else {
                _SgmntfY_
                  ._getJq()
                  .each(_SgmntfY_._searchGetInputElement(), function () {
                    if (
                      _SgmntfY_._getJq()(this).css('transform') ==
                      'matrix(1, 0, 0, 1, 0, -2000)'
                    ) {
                      _SgmntfY_._getJq()(this).addClass('seg-search-unset');
                      _SgmntfY_
                        ._getJq()('.seg-search-wrapper')
                        .removeClass('open');
                      _SgmntfY_
                        ._getJq()('.seg-search-wrapper')
                        .removeClass('sgm-search-open');
                      _SgmntfY_._getJq()(this).blur();
                    }
                  });
              }
            } else {
              if (
                _SgmntfY_._getJq()('.seg-search-wrapper').hasClass('open') ||
                _SgmntfY_
                  ._getJq()('.seg-search-wrapper')
                  .hasClass('sgm-search-open')
              ) {
                _SgmntfY_._getJq()('.seg-search-wrapper').removeClass('open');
                _SgmntfY_
                  ._getJq()('.seg-search-wrapper')
                  .removeClass('sgm-search-open');
              }
            }
          }
        }
      }
    },
    _setUserData: function (userData) {
      try {
        _SgmntfY_._storePersistentData(
          _SgmntfY_._variables.storage.userData.key,
          JSON.stringify(userData),
          0,
          _SgmntfY_._variables.storage.userData.local,
        );
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE('ERROR', 'Error while setting user data: ' + e);
      }
    },
    _getUserMode: function () {
      try {
        var _ud =
          JSON.parse(
            _SgmntfY_._getPersistentData(
              _SgmntfY_._variables.storage.userData.key,
              _SgmntfY_._variables.storage.userData.local,
            ),
          ) || {};
        return _ud && _ud['gm'] ? _ud['gm'] : '';
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE('ERROR', 'Error while getting user data: ' + e);
        return '';
      }
    },
    // Response Handlers
    _getResponse: function (request, responseArray) {
      _SgmntfY_._jbCheckDeliveryStep(request, responseArray);
      for (var key = 0; key < responseArray.length; key++) {
        var response = responseArray[key];
        if (response.hasOwnProperty('type')) {
          var type = response['type'];
          var delayAction = response['delayAction'] || null;
          var params = response['params'];
          var instanceId = response['instanceId'];
          var actionFunction = _SgmntfY_._actions[type];
          if (params['isControlGroup'] === false) {
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              'User is in control group for campaign: ' + params.instanceId,
            );
            continue;
          }
          if (typeof actionFunction === 'function') {
            // triggered when user leaves window
            if (delayAction && delayAction.type === 'LEAVE_PAGE') {
              _SgmntfY_._addLeavePageHandler(response, request);
            } else if (
              delayAction &&
              delayAction.type === 'WAIT_SAME_PAGE' &&
              parseInt(delayAction.time) > 0
            ) {
              _SgmntfY_._addWaitPageHandler(response, request);
            } else if (
              delayAction &&
              delayAction.type === 'WAIT_ALL_PAGES' &&
              parseInt(delayAction.time) > 0
            ) {
              // check this action is already stored for triggering
              var delayDate = new Date(
                new Date().getTime() + 1000 * parseInt(delayAction.time),
              );
              var action = {
                delayDate: delayDate,
                params: params,
                type: type,
                request: request,
              };
              if (!_SgmntfY_._addDelayedAction(action)) {
                _SgmntfY_.LOG_MESSAGE(
                  'INFO',
                  'Action(id=' +
                    action.params.actionId +
                    ') is already added for delayed action',
                );
              } else {
                _SgmntfY_.LOG_MESSAGE(
                  'INFO',
                  'Action(id=' +
                    action.params.actionId +
                    ') is added for delayed action in future',
                );
              }
            } else if (delayAction && delayAction.type === 'SCROLL') {
              _SgmntfY_._addScrollHandler(response, request);
            } else {
              _SgmntfY_.LOG_MESSAGE(
                'INFO',
                'Action(' + type + ') triggered immediately',
              );
              actionFunction.call(null, params, request);
            }
          } else {
            _SgmntfY_.LOG_MESSAGE('WARN', 'Unknown action: ' + type);
          }
        }
      }
    },
    _jbCheckDeliveryStep: function (request, responseArray) {
      if (_SgmntfY_._jbOverFlowOperations._journeyFinished(request)) {
        var hasRecoData = false;
        var hasCouponData = false;
        var hasLandingPage = false;
        var landingPage;
        for (var key = 0; key < responseArray.length; key++) {
          var response = responseArray[key];
          var type = response['type'];
          if (
            type === 'recommendProducts' &&
            Object.keys(response.params.recommendedProducts)
          ) {
            Object.keys(response.params.recommendedProducts).forEach(function (
              recoType,
            ) {
              if (
                response.params.recommendedProducts[recoType] &&
                response.params.recommendedProducts[recoType].length > 0
              ) {
                hasRecoData = true;
              }
            });
          }
          if (type === 'giveCoupon') {
            hasCouponData = true;
          }
          if (type === 'landingPage') {
            landingPage = response['params'].landingPageUrl;
            if (landingPage && landingPage.length > 0) {
              hasLandingPage = true;
            }
          }
        }
        if (
          hasRecoData === true ||
          hasCouponData === true ||
          hasLandingPage === true
        ) {
          _SgmntfY_._jbOnDestroyJourneyFlowExecution(true);
          //if only landing page active we redirect to landing page
          if (hasRecoData === false && hasCouponData === false) {
            _SgmntfY_.LOG_MESSAGE(
              'DEBUG',
              'Redirecting action to url: ' + landingPage,
            );
            window.location = landingPage;
          }
        } else {
          _SgmntfY_._jbOnDestroyJourneyFlowExecution(false);
        }
      }
    },
    // campaign handler
    _getCampaign: function (request, campaignArray) {
      for (var key = 0; key < campaignArray.length; key++) {
        var campaign = campaignArray[key] || {};
        if (campaign.hasOwnProperty('type')) {
          var type = campaign['type'];
          var campaignFunction = _SgmntfY_._campaigns[type];
          if (typeof campaignFunction === 'function') {
            var timing = campaign['timing'] || {};
            if (timing['type'] === 'DELAY') {
              _SgmntfY_._addCampaignDelayHandler(campaign, request);
            } else if (timing['type'] === 'DELAY_ALL_PAGES') {
              _SgmntfY_._addCampaignDelayAllPagesHandler(campaign, request);
            } else if (timing['type'] === 'PAGE_VIEWS') {
              _SgmntfY_._addCampaignPageViewsHandler(campaign, request);
            } else if (timing['type'] === 'SCROLL') {
              _SgmntfY_._addCampaignScrollHandler(campaign, request);
            } else if (timing['type'] === 'PAGELEAVE') {
              _SgmntfY_._addCampaignLeaveHandler(campaign, request);
            } else if (timing['type'] === 'INTERACTION') {
              _SgmntfY_._addCampaignInteractionHandler(campaign, request);
            } else {
              _SgmntfY_.LOG_MESSAGE(
                'INFO',
                'Campaign (' + type + ') triggered immediately.',
              );
              campaignFunction.call(null, campaign, request);
            }
          } else {
            _SgmntfY_.LOG_MESSAGE('WARN', 'Unknown campaign: ' + type);
          }
        }
      }
    },
    initCoupon: function (couponArray) {
      try {
        if (couponArray.length === 0) {
          return;
        }

        var currentCoupon = _SgmntfY_
          ._getJq()(document)
          .find('#seg-coupon-asimov');
        if (currentCoupon && currentCoupon.length > 0) {
          return;
        }

        var coupon = couponArray[0];

        var html = coupon.widget.html;
        var validationText = coupon.widget.validationText;
        var config = {
          code: coupon.code,
          valid_until:
            validationText +
            ' ' +
            new Date(coupon.validUntil).toLocaleDateString(),
          copy_button_text: coupon.widget.copyButtonText,
          description: coupon.widget.description,
          title: coupon.widget.title,
        };

        var renderedHtml = _SgmntfY_._getMustache().render(html, config);
        renderedHtml = _SgmntfY_._getJq()(renderedHtml);
        var _parent = renderedHtml.first();
        var _content = renderedHtml.find('.seg-coupon-asimov_content');
        var _switch = renderedHtml.find('.seg-coupon-asimov_switch');

        if (coupon.widget.position === 'RIGHT') {
          _parent.addClass('seg-coupon-asimov_right');
        }

        _content.css({
          'background-color': coupon.widget.backgroundColor,
          color: coupon.widget.foregroundColor,
        });

        _switch.css({
          'background-color': coupon.widget.backgroundColor,
          color: coupon.widget.foregroundColor,
        });

        _SgmntfY_._getJq()('body').prepend(renderedHtml);

        _SgmntfY_.bindCouponBindings({
          copiedInfoText: coupon.widget.copiedInfoText,
        });
        _SgmntfY_._openCoupon();
        setTimeout(function () {
          _SgmntfY_._closeCoupon();
        }, 2000);
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE('WARN', "Coupon couldn't be rendered!");
      }
    },
    bindCouponBindings: function (lang) {
      try {
        function toggle() {
          var _container = _SgmntfY_._getJq()('#seg-coupon-asimov');
          _container.addClass('no-interaction');
          _container.css(
            'height',
            _SgmntfY_._getJq()('#seg-coupon-asimov').prop('scrollHeight'),
          );

          // close
          if (_container.hasClass('seg-coupon-asimov_open')) {
            var switchHeight = _container
              .children('.seg-coupon-asimov_switch')
              .height();
            _container.css('height', switchHeight);
          }
          // open
          else {
            setTimeout(function () {
              _container.css('height', 'auto');
            }, 500);
          }
          setTimeout(function () {
            _container.removeClass('no-interaction');
          }, 500);
          _container.toggleClass('seg-coupon-asimov_open');
        }

        _SgmntfY_
          ._getJq()(document)
          .on('click', '.seg-coupon-asimov_switch', function () {
            var _innerContainer = _SgmntfY_
              ._getJq()(this)
              .parent('#seg-coupon-asimov');
            if (_innerContainer.hasClass('no-interaction')) {
              return false;
            }

            toggle();
          });

        _SgmntfY_
          ._getJq()(document)
          .on(
            'click',
            '.seg-coupon-asimov_copy:not(.no-interaction)',
            function () {
              _SgmntfY_
                ._getJq()('#seg-coupon-asimov')
                .addClass('no-interaction');
              _SgmntfY_._getJq()(this).addClass('no-interaction');
              _SgmntfY_._textCopyToClipBoard('seg-coupon-asimov_code');
              var actionButtonText = _SgmntfY_
                ._getJq()('.seg-coupon-asimov_copy')
                .html();
              _SgmntfY_
                ._getJq()('.seg-coupon-asimov_copy')
                .html(lang.copiedInfoText);
              setTimeout(function () {
                toggle();
                setTimeout(function () {
                  _SgmntfY_
                    ._getJq()('.seg-coupon-asimov_copy')
                    .html(actionButtonText);
                  _SgmntfY_
                    ._getJq()('#seg-coupon-asimov')
                    .removeClass('no-interaction');
                  _SgmntfY_
                    ._getJq()('.seg-coupon-asimov_copy')
                    .removeClass('no-interaction');
                }, 400);
              }, 1000);
              return false;
            },
          );
      } catch (e) {
        _SgmntfY_.LOG_MESSAGE('WARN', 'Could not bind coupon bindings.');
      }
    },
    _textCopyToClipBoard: function (node) {
      node = document.getElementsByClassName(node)[0];

      if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
      } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Could not select text in node: Unsupported browser.',
        );
      }
      document.execCommand('copy');
      if (window.getSelection) {
        // All browsers, except IE <=8
        window.getSelection().removeAllRanges();
      } else if (document.selection) {
        // IE <=8
        document.selection.empty();
      }
    },
    _openCoupon: function () {
      var _container = _SgmntfY_._getJq()('#seg-coupon-asimov');
      _container.addClass('no-interaction');
      _container.css(
        'height',
        _SgmntfY_._getJq()('#seg-coupon-asimov').prop('scrollHeight'),
      );
      // open
      setTimeout(function () {
        _container.css('height', 'auto');
      }, 500);
      setTimeout(function () {
        _container.removeClass('no-interaction');
      }, 500);
      _container.toggleClass('seg-coupon-asimov_open');
    },
    _closeCoupon: function () {
      var _container = _SgmntfY_._getJq()('#seg-coupon-asimov');
      _container.addClass('no-interaction');
      _container.css(
        'height',
        _SgmntfY_._getJq()('#seg-coupon-asimov').prop('scrollHeight'),
      );
      // close
      if (_container.hasClass('seg-coupon-asimov_open')) {
        var switchHeight = _container
          .children('.seg-coupon-asimov_switch')
          .height();
        _container.css('height', switchHeight);
      }
      setTimeout(function () {
        _container.removeClass('no-interaction');
      }, 500);
      _container.toggleClass('seg-coupon-asimov_open');
    },
    _decodeHtml: function (html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
    _getControlGroup: function () {
      var controlGroup = 'REAL';
      try {
        // check control group active, if not don't return group
        // so it will be ignored at sending event
        if (
          _SgmntfY_._variables.controlGroup &&
          _SgmntfY_._variables.controlGroup.source === 'OPTIMIZE'
        ) {
          // get group
          var group =
            window.google_optimize &&
            window.google_optimize.get(
              _SgmntfY_._variables.controlGroup.experimentID,
            );
          if (
            group &&
            group == _SgmntfY_._variables.controlGroup.controlValue
          ) {
            controlGroup = 'CONTROL';
          }
        }
      } catch (error) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error in executing _getControlGroup: ' + error,
        );
      }
      return controlGroup;
    },
    // search campaign handler
    _getSearchCampaign: function (request, searchArray) {
      if (request.eventName === 'SEARCH' && request.data.type === 'faceted') {
        if (typeof request._cb === 'function') {
          return request._cb(searchArray);
        }
      } else {
        if (isSearchEventAndExecutable() && searchArray.length === 0) {
          searchArray = [
            { campaign: _SgmntfY_._variables.search.initialCampaign },
          ];
        }

        if (searchArray.length !== 0) {
          if (
            searchArray[0].isExecutable === true ||
            searchArray[0].isExecutableForAfter === true
          ) {
            setSearchVariables();
            _SgmntfY_._initSearch();
          } else {
            if (
              typeof searchArray[0].isExecutable === 'undefined' &&
              typeof searchArray[0].isExecutableForAfter === 'undefined'
            ) {
              var queryOnInput = undefined;
              if (
                _SgmntfY_._variables.search.currentActiveInput &&
                _SgmntfY_._variables.search.currentActiveInput.value
              ) {
                queryOnInput =
                  _SgmntfY_._variables.search.currentActiveInput.value.trim();
              }
              if (
                request.data.query === undefined ||
                typeof _SgmntfY_._variables.search.currentActiveInput ===
                  'undefined' ||
                request.data.query ===
                  _SgmntfY_._prepareSearchQuery(queryOnInput)
              ) {
                _SgmntfY_._searchResultHandler(request, searchArray);
              }
            }
          }
        }
      }

      if (isSearchEventHasRedirection()) {
        eval(_SgmntfY_._variables.search.redirectionJs);
      }

      function setSearchVariables() {
        var initialCampaign = searchArray[0].initialCampaign;
        _SgmntfY_._variables.search.isExecutable = searchArray[0].isExecutable;
        _SgmntfY_._variables.search.isExecutableForAfter =
          searchArray[0].isExecutableForAfter;
        _SgmntfY_._variables.search.input = searchArray[0].idOrClassName;
        _SgmntfY_._variables.search.manuelTrigger =
          searchArray[0].manuelTrigger;
        _SgmntfY_._variables.search.initialCampaign = initialCampaign;
        _SgmntfY_._variables.search.searchMinChar =
          (initialCampaign && initialCampaign.minCharacterCount) || 3;
        _SgmntfY_._variables.search.searchDelay =
          (initialCampaign && initialCampaign.searchDelay) || 500;
        _SgmntfY_._variables.search.shadowRootElements =
          searchArray[0].shadowRootElements || [];
        _SgmntfY_._variables.search.shadowRootElementsForHide =
          searchArray[0].shadowRootElementsForHide || [];
        _SgmntfY_._variables.search.shadowRootElementsForTrigger =
          searchArray[0].shadowRootElementsForTrigger || [];
        _SgmntfY_._variables.search.forceRemoveInputVal =
          initialCampaign &&
          typeof initialCampaign.forceRemoveInputVal !== 'undefined'
            ? initialCampaign.forceRemoveInputVal
            : false;
        _SgmntfY_._variables.search.clearInputBindingsOnSite =
          searchArray[0].clearInputBindingsOnSite;
        _SgmntfY_._variables.search.redirectionEnabled =
          searchArray[0].redirectionEnabled;

        if (_SgmntfY_._variables.search.redirectionEnabled) {
          _SgmntfY_._variables.search.redirectionJs =
            searchArray[0].redirectionJs;
        }

        if (
          _SgmntfY_._variables.search.input.indexOf(',input#sgm-qa-search') ===
          -1
        ) {
          _SgmntfY_._variables.search.input =
            _SgmntfY_._variables.search.input + ',input#sgm-qa-search';
        }
        _SgmntfY_._searchSetActiveRootElement();
      }

      function isSearchEventAndExecutable() {
        return (
          request.eventName === 'SEARCH' &&
          (_SgmntfY_._variables.search.isExecutable ||
            _SgmntfY_._variables.search.isExecutableForAfter)
        );
      }

      function isSearchEventHasRedirection() {
        return (
          request.eventName === 'PAGE_VIEW' &&
          _SgmntfY_._variables.search.redirectionEnabled
        );
      }
    },
    _searchSetActiveRootElement: function () {
      _SgmntfY_._variables.search.activeRootElement = document;
      _SgmntfY_._variables.search.activeRootElementForHide = document;
      _SgmntfY_._variables.search.activeRootElementForTrigger = document;

      _SgmntfY_._variables.search.shadowRootElements.forEach(
        onIterateShadowRootElements,
      ); // input selector
      _SgmntfY_._variables.search.shadowRootElementsForHide.forEach(
        onIterateShadowRootElementsForHide,
      ); // hide element selector
      _SgmntfY_._variables.search.shadowRootElementsForTrigger.forEach(
        onIterateShadowRootElementsForTrigger,
      ); // manuel trigger selector

      //////

      function onIterateShadowRootElements(shadowRootEl) {
        var rootEl = _SgmntfY_._getJq()(
          shadowRootEl,
          _SgmntfY_._variables.search.activeRootElement,
        );
        if (rootEl && rootEl.length > 0) {
          _SgmntfY_._variables.search.activeRootElement = rootEl[0].shadowRoot;
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'ShadowRoot Element could not be found: ' + shadowRootEl,
          );
        }
      }

      function onIterateShadowRootElementsForHide(shadowRootEl) {
        var rootEl = _SgmntfY_._getJq()(
          shadowRootEl,
          _SgmntfY_._variables.search.activeRootElementForHide,
        );
        if (rootEl && rootEl.length > 0) {
          _SgmntfY_._variables.search.activeRootElementForHide =
            rootEl[0].shadowRoot;
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'ShadowRoot Element For Hide could not be found: ' + shadowRootEl,
          );
        }
      }

      function onIterateShadowRootElementsForTrigger(shadowRootEl) {
        var rootEl = _SgmntfY_._getJq()(
          shadowRootEl,
          _SgmntfY_._variables.search.activeRootElementForTrigger,
        );
        if (rootEl && rootEl.length > 0) {
          _SgmntfY_._variables.search.activeRootElementForTrigger =
            rootEl[0].shadowRoot;
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'ShadowRoot Element For Trigger could not be found: ' +
              shadowRootEl,
          );
        }
      }
    },
    _isSearchOpen: function () {
      var searchWrapper = _SgmntfY_._getJq()('.seg-search-wrapper');
      return (
        searchWrapper.hasClass('open') ||
        searchWrapper.hasClass('sgm-search-open')
      );
    },
    _searchInputActivateHandler: function (event) {
      if (
        _SgmntfY_._getJq()('.seg-search-wrapper') &&
        _SgmntfY_._isSearchOpen()
      ) {
        return;
      }
      _SgmntfY_._variables.search.currentActiveInput = event.target;

      if (_SgmntfY_._getJq()('.seg-search-wrapper').length === 0) {
        var $divLoad = _SgmntfY_._getJq()('<div/>', {
          class: 'seg-search-wrapper',
        });
        $divLoad.appendTo('body');
      }

      initializeSearchWindow();

      if (_SgmntfY_._variables.search.forceRemoveInputVal === true) {
        _SgmntfY_._variables.search.currentActiveInput.value = '';
      }
      var _sgmSearchInputValLength =
        _SgmntfY_._variables.search.currentActiveInput.value.trim().length;
      _SgmntfY_._variables.search.keywordSearch =
        _sgmSearchInputValLength >= _SgmntfY_._variables.search.searchMinChar;
      _SgmntfY_._variables.search.emptySearch =
        _sgmSearchInputValLength === 0 ||
        _sgmSearchInputValLength < _SgmntfY_._variables.search.searchMinChar;

      if (
        _SgmntfY_._variables.search.emptySearch === true ||
        _SgmntfY_._variables.search.keywordSearch === true
      ) {
        _SgmntfY_._sendSearchRequest();
      }

      /////
      function initializeSearchWindow() {
        if (
          _SgmntfY_._getJq()(window).width() <
          _SgmntfY_._variables.search.maxMobileWidth
        ) {
          if (
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !window.MSStream
          ) {
            _SgmntfY_._getJq()('.seg-search-wrapper').addClass('keyboard-on');
            _SgmntfY_
              ._getJq()('.seg-search-wrapper')
              .addClass('sgm-search-keyboard-on');
            _SgmntfY_
              ._getJq()('.seg-search-wrapper')
              .addClass('sgm-search-ios-device');
          }

          var willBeAddNoSideBarClass =
            typeof sgmSearchSettings !== 'undefined' &&
            sgmSearchSettings.mobileSearchAssets &&
            sgmSearchSettings.mobileSearchAssets.length === 0;

          if (willBeAddNoSideBarClass) {
            _SgmntfY_._getJq()('.seg-search-wrapper').addClass('no-sidebar');
            _SgmntfY_
              ._getJq()('.seg-search-wrapper')
              .addClass('sgm-search-no-sidebar');
          }
          _SgmntfY_._getJq()('.seg-search-wrapper').addClass('mobile');
          _SgmntfY_
            ._getJq()('.seg-search-wrapper')
            .addClass('sgm-search-mobile');

          // set meta-viewport if not set
          var hasViewPort = false;
          var metaTags = _SgmntfY_._getJq()('meta');
          metaTags.each(function (metaTag) {
            if (metaTag.name === 'viewport') {
              hasViewPort = true;

              if (
                metaTag.content.includes('width=') === true &&
                metaTag.content.includes('width=device-width') !== true
              ) {
                if (metaTag.content.includes('user-scalable=') !== true) {
                  metaTag.content =
                    metaTag.content.concat(' ,user-scalable=no');
                }
              } else {
                if (metaTag.content.includes('width=device-width') !== true) {
                  metaTag.content = metaTag.content.concat(
                    ' ,width=device-width',
                  );
                }
                if (metaTag.content.includes('initial-scale=') !== true) {
                  metaTag.content = metaTag.content.concat(
                    ' ,initial-scale=1.0',
                  );
                }
                if (metaTag.content.includes('maximum-scale=') !== true) {
                  metaTag.content = metaTag.content.concat(
                    ' ,maximum-scale=1.0',
                  );
                }
                if (metaTag.content.includes('user-scalable=') !== true) {
                  metaTag.content =
                    metaTag.content.concat(' ,user-scalable=no');
                }
              }
            }
          });
          if (!hasViewPort) {
            var metaTag = document.createElement('meta');
            metaTag.name = 'viewport';
            metaTag.content =
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.getElementsByTagName('head')[0].appendChild(metaTag);
          }
        }
      }
    },
    _setSearchQueryOverride: function (queryOverride) {
      if (queryOverride && typeof queryOverride === 'object') {
        var expires = new Date();
        expires.setHours(expires.getHours() + 2);
        queryOverride.expires = expires;
        _SgmntfY_._storePersistentData(
          _SgmntfY_._variables.search.queryOverrideKey,
          JSON.stringify(queryOverride),
          1,
          true,
        ); // expire in 1 day
      }
    },
    _unsetSearchQueryOverride: function () {
      _SgmntfY_._storePersistentData(
        _SgmntfY_._variables.search.queryOverrideKey,
        null,
        0,
        true,
      );
    },
    _disableSearchTriggerEventsOnSite: function () {
      if (_SgmntfY_._variables.search.clearInputBindingsOnSite === true) {
        _SgmntfY_._searchGetInputElement().off();
      }
      if (_SgmntfY_._getActiveSearchManuelTrigger()) {
        _SgmntfY_._searchGetManuelTriggerElementForMobile().off();
      }
      _SgmntfY_._searchGetInputElement().attr('autocomplete', 'OFF');
    },
    _getActiveSearchManuelTrigger: function () {
      if (
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.search.maxMobileWidth
      ) {
        return _SgmntfY_._variables.search.manuelTrigger;
      } else if (
        _SgmntfY_._getJq()(window).width() >=
          _SgmntfY_._variables.search.maxMobileWidth &&
        _SgmntfY_._variables.search.manuelTriggerEnabledForDesktop === true
      ) {
        return _SgmntfY_._variables.search.manuelTriggerDesktop;
      }
      return null;
    },
    _activateSgmSearchTriggerEvents: function () {
      var inputElements =
        _SgmntfY_._variables.search.activeRootElement.querySelectorAll(
          _SgmntfY_._variables.search.input,
        );
      if (
        bowser.name.toLowerCase() === 'safari' ||
        (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
      ) {
        if (inputElements && inputElements.length) {
          inputElements.forEach(function (inputElement) {
            inputElement.addEventListener(
              'click',
              _SgmntfY_._searchInputActivateHandler,
            );
          });
          _SgmntfY_
            ._getJq()(document)
            .on(
              'click',
              '#sgm-mobile-input input',
              _SgmntfY_._searchInputActivateHandler,
            );
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'search input element could not found while loading the script',
          );
          _SgmntfY_
            ._getJq()(document)
            .on(
              'click',
              _SgmntfY_._variables.search.input + ', #sgm-mobile-input input',
              _SgmntfY_._searchInputActivateHandler,
            );
        }
      } else {
        if (inputElements && inputElements.length) {
          inputElements.forEach(function (inputElement) {
            inputElement.addEventListener(
              'focus',
              _SgmntfY_._searchInputActivateHandler,
            );
          });
          _SgmntfY_
            ._getJq()(document)
            .on(
              'focus',
              '#sgm-mobile-input input',
              _SgmntfY_._searchInputActivateHandler,
            );
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'search input element could not found while loading the script',
          );
          _SgmntfY_
            ._getJq()(document)
            .on(
              'focus',
              _SgmntfY_._variables.search.input + ', #sgm-mobile-input input',
              _SgmntfY_._searchInputActivateHandler,
            );
        }
      }
    },
    _searchGetInputElement: function () {
      return _SgmntfY_._getJq()(
        _SgmntfY_._variables.search.input,
        _SgmntfY_._variables.search.activeRootElement,
      );
    },
    _searchGetManuelTriggerElementForDesktop: function () {
      return _SgmntfY_._getJq()(
        _SgmntfY_._variables.search.manuelTriggerDesktop,
        _SgmntfY_._variables.search.activeRootElementForTrigger,
      );
    },
    _searchGetManuelTriggerElementForMobile: function () {
      return _SgmntfY_._getJq()(
        _SgmntfY_._variables.search.manuelTrigger,
        _SgmntfY_._variables.search.activeRootElementForTrigger,
      );
    },
    _initSearch: function () {
      _SgmntfY_._disableSearchTriggerEventsOnSite();
      _SgmntfY_._activateSgmSearchTriggerEvents();

      _SgmntfY_
        ._getJq()
        .each(_SgmntfY_._searchGetInputElement(), function (inputEl) {
          if (
            this === _SgmntfY_._variables.search.activeRootElement.activeElement
          ) {
            _SgmntfY_._searchInputActivateHandler({ target: this });
            return false;
          }
        });

      // when typing or pasting
      var inputElements =
        _SgmntfY_._variables.search.activeRootElement.querySelectorAll(
          _SgmntfY_._variables.search.input,
        );
      if (inputElements && inputElements.length > 0) {
        inputElements.forEach(function (inputElement) {
          inputElement.addEventListener('input', onSearchInputHandler);
          inputElement.addEventListener('blur', onBlurSgmMobileInput);
        });
        _SgmntfY_
          ._getJq()(document)
          .on('input', '#sgm-mobile-input input', onSearchInputHandler);
        _SgmntfY_
          ._getJq()(document)
          .on('blur', '#sgm-mobile-input input', onBlurSgmMobileInput);
      } else {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'search input element could not found while loading the script',
        );
        _SgmntfY_
          ._getJq()(document)
          .on(
            'input',
            _SgmntfY_._variables.search.input + ', #sgm-mobile-input input',
            onSearchInputHandler,
          );
        _SgmntfY_
          ._getJq()(document)
          .on(
            'blur',
            _SgmntfY_._variables.search.input + ', #sgm-mobile-input input',
            onBlurSgmMobileInput,
          );
      }

      if (_SgmntfY_._getActiveSearchManuelTrigger()) {
        var manuelTriggerElements =
          _SgmntfY_._variables.search.activeRootElementForTrigger.querySelectorAll(
            _SgmntfY_._getActiveSearchManuelTrigger(),
          );
        if (manuelTriggerElements && manuelTriggerElements.length) {
          manuelTriggerElements.forEach(function (manuelTriggerElement) {
            manuelTriggerElement.addEventListener(
              'click',
              onManuelTriggerFocusHandler,
            );
          });
        } else {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'search manuel trigger element could not found while binding the event',
          );
          _SgmntfY_
            ._getJq()(document)
            .on(
              'click',
              _SgmntfY_._getActiveSearchManuelTrigger(),
              onManuelTriggerFocusHandler,
            );
        }
      }

      _SgmntfY_._evalSearchBodyScrollLockPreJs();

      //////////////

      function onSearchInputHandler(event) {
        _SgmntfY_._variables.search.currentActiveInput = event.target;
        var searchValue = _SgmntfY_._variables.search.currentActiveInput.value;

        _SgmntfY_
          ._getJq()(_SgmntfY_._variables.search.currentActiveInput)
          .not('#sgm-mobile-input input')
          .attr('value', searchValue);

        _SgmntfY_._variables.search.keywordSearch =
          searchValue.length >= _SgmntfY_._variables.search.searchMinChar;
        _SgmntfY_._variables.search.emptySearch =
          searchValue.length === 0 ||
          searchValue.length < _SgmntfY_._variables.search.searchMinChar;

        if (
          _SgmntfY_._variables.search.emptySearch === true ||
          _SgmntfY_._variables.search.keywordSearch === true
        ) {
          _SgmntfY_._sendSearchRequest();
        }
      }

      function onManuelTriggerFocusHandler() {
        if (_SgmntfY_._getJq()('.seg-search-wrapper').length === 0) {
          var $divLoad = _SgmntfY_._getJq()('<div/>', {
            class: 'seg-search-wrapper',
          });
          $divLoad.appendTo('body');
        }
        _SgmntfY_._variables.search.emptySearch = true;
        _SgmntfY_._variables.search.keywordSearch = false;
        _SgmntfY_._sendSearchRequest(true);
      }

      function onBlurSgmMobileInput() {
        _SgmntfY_._getJq()('.seg-search-wrapper').removeClass('keyboard-on');
        _SgmntfY_
          ._getJq()('.seg-search-wrapper')
          .removeClass('sgm-search-keyboard-on');
        _SgmntfY_._searchGetInputElement().removeAttr('readonly');
      }
    },
    _sendSearchRequest: function (isManuelTriggered) {
      var query = '';
      _SgmntfY_._variables.search.manuelTriggerClicked = false;
      if (isManuelTriggered) {
        _SgmntfY_._variables.search.manuelTriggerClicked = true;
      } else {
        query =
          _SgmntfY_._variables.search.currentActiveInput &&
          _SgmntfY_._variables.search.currentActiveInput.value &&
          _SgmntfY_._variables.search.currentActiveInput.value.trim();
      }

      try {
        if (_SgmntfY_._variables.search.searchTimer) {
          clearTimeout(_SgmntfY_._variables.search.searchTimer);
        }
      } catch (error) {}

      _SgmntfY_._variables.search.searchTimer = setTimeout(
        onSearchDelay,
        _SgmntfY_._variables.search.searchDelay,
      );

      /////
      //TODO https://segmentify.atlassian.net/browse/DEV-72
      function onSearchDelay() {
        if (_SgmntfY_._variables.search.emptySearch === true) {
          _SgmntfY_._variables.segmentifyObj('search', { query: '' });
        }
        if (
          _SgmntfY_._variables.search.keywordSearch === true &&
          query.length >= _SgmntfY_._variables.search.searchMinChar
        ) {
          _SgmntfY_._variables.segmentifyObj('search', {
            query: _SgmntfY_._prepareSearchQuery(query),
          });
        }
      }
    },
    _triggerSearch: function (searchTriggerObj) {
      if (
        _SgmntfY_._variables.search.isExecutable === true ||
        _SgmntfY_._variables.search.isExecutableForAfter === true
      ) {
        var searchText = searchTriggerObj && searchTriggerObj.searchText;
        if (!searchText) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'searchText is mandatory field to trigger search',
          );
          return;
        }
        var defaultSearchTriggerVal = {
          delay: 0,
          isManuelTriggered: false,
          inputSelector: _SgmntfY_._variables.search.input,
          manuelTrigger: _SgmntfY_._getActiveSearchManuelTrigger(),
        };

        var _searchTriggerObj = _SgmntfY_._getCopiedObject(
          defaultSearchTriggerVal,
          searchTriggerObj,
        );

        setTimeout(triggerSearchHandler, _searchTriggerObj.delay);
      } else {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'search is not executable to trigger search',
        );
      }

      ///////

      function triggerSearchHandler() {
        var inputElement = _SgmntfY_._getJq()(_searchTriggerObj.inputSelector);
        if (inputElement && inputElement.length > 0) {
          _SgmntfY_._variables.search.currentActiveInput = inputElement[0];
          _SgmntfY_._variables.search.currentActiveInput.value = searchText;

          //click & focus
          _SgmntfY_
            ._getJq()(
              _SgmntfY_._variables.search.currentActiveInput,
              _SgmntfY_._variables.search.activeRootElement,
            )
            .click();
          _SgmntfY_
            ._getJq()(
              _SgmntfY_._variables.search.currentActiveInput,
              _SgmntfY_._variables.search.activeRootElement,
            )
            .focus();

          if (
            _searchTriggerObj.isManuelTriggered === true &&
            _searchTriggerObj.manuelTrigger
          ) {
            _SgmntfY_._getJq()(_searchTriggerObj.manuelTrigger).click();
          } else {
            _SgmntfY_._sendSearchRequest();
          }
        }
      }
    },
    _prepareSearchQuery: function (query) {
      // to manipulate search query (it is not related synonyms)
      return query;
    },
    // search handler
    _searchResultHandler: function (request, searchResult) {
      var searchArray = searchResult[0];
      var campaign = searchArray['campaign'];
      var products = searchArray['products'] || [];
      var brands = searchArray['brands'] || {};
      var brandProducts = searchArray['brandProducts'] || {};
      var categories = searchArray['categories'] || {};
      var categoryProducts = searchArray['categoryProducts'] || {};
      var mostSearchedProducts = searchArray['mostSearchedProducts'] || {};
      var keywords = searchArray['keywords'] || {};
      var meta = searchArray['meta'] || {};
      var additionalContents = searchArray['contents'] || [];
      var banners = searchArray['banners'] || [];
      var lastSearches = searchArray['lastSearches'] || [];
      var meanings = searchArray['meanings'] || [];
      var noResultSearch = searchArray['noResult'] || {};
      var isProductsFound = products.length > 0;
      var redirectUrl = searchArray['redirectUrl'] || {};
      var isBigScreen = sessionStorage.getItem('isBigScreen');

      if (campaign == null) {
        return;
      }

      _SgmntfY_._variables.segmentifyObj('event:interaction', {
        type: 'impression',
        interactionId: 'static',
        instanceId: campaign['instanceId'],
      });

      if (
        (products !== null && products.length > 0) ||
        (noResultSearch !== null &&
          noResultSearch.recommendedProducts &&
          noResultSearch.recommendedProducts.length > 0)
      ) {
        _SgmntfY_._variables.segmentifyObj('event:interaction', {
          type: 'widget-view',
          interactionId: 'static',
          instanceId: campaign['instanceId'],
        });
      }

      _SgmntfY_._variables.search.emptySearch =
        campaign['instanceId'] === 'BEFORE_SEARCH';
      _SgmntfY_._variables.search.keywordSearch =
        campaign['instanceId'] === 'SEARCH';
      _SgmntfY_._variables.search.forceRemoveInputVal =
        campaign['forceRemoveInputVal'];

      sgmSearchSettings = {
        data: {},
        mobileInput: '#sgm-mobile-input',
        searchResultsEl: '.seg-search-wrapper',
        incremental: searchArray['incremental'],
        searchUrlPrefix: campaign['searchUrlPrefix'],
        instanceId: campaign['instanceId'],
        html: campaign['html'],
        postJs: campaign['postJs'],
        preJs: campaign['preJs'],
        css: campaign['css'],
        openingDirection: campaign['openingDirection'],
        input: campaign['searchInputSelector'],
        forceRemoveInputVal: campaign['forceRemoveInputVal'],
        currentSearchBoxEl: campaign['hideCurrentSelector'],
        searchAssets: campaign['searchAssets'] || [],
        mobileSearchAssets: campaign['mobileSearchAssets'] || [],
        searchAssetsTexts: campaign['stringSearchAssetTextMap'] || [],
        categoryTreeView: false,
        manuelTrigger: campaign['triggerSelector'],
        sgmSearchShowAll: false,
        resultsTopMargin: {
          mobile: 0,
          desktop: 0,
        },
        searchHistoryClearSettings: {
          clearQueryBasedEnabled: false,
          clearButtonEnabled: false,
          clearButtonText: '',
        },
        isSidebarItemsClickable: {
          categories: false,
          brands: false,
          keywords: false,
          lastSearches: false,
        },
        highlightEnabled: {
          categories: false,
          brands: false,
          keywords: false,
        },
        itemLimits: {
          howManyBrand: 0,
          howManyCategory: 0,
          howManyKeyword: 0,
          howManyDesktopProduct:
            noResultSearch['desktopItemCount'] || campaign['desktopItemCount'],
          howManyMobileProduct:
            noResultSearch['mobileItemCount'] || campaign['mobileItemCount'],
        },
        itemEnable: {
          category: false,
          brand: false,
          keyword: false,
          lastSearches: false,
        },
        sidebar: {
          mobile: false,
          desktop: true,
        },
        texts: {
          categories: '',
          popularCategories: '',
          brands: '',
          popularBrands: '',
          keywords: '',
          products: '',
          showAll: 'Show All',
          currency: '',
          notFound: '',
          cancelText: '',
        },
      };
      if (sgmSearchSettings.input.indexOf(',input#sgm-qa-search') === -1) {
        sgmSearchSettings.input =
          sgmSearchSettings.input + ',input#sgm-qa-search';
      }
      if (
        _SgmntfY_._getJq()(window).width() <
          _SgmntfY_._variables.search.maxMobileWidth &&
        sgmSearchSettings.mobileSearchAssets.length === 0
      ) {
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('no-sidebar');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('sgm-search-no-sidebar');
      }
      if (_SgmntfY_._getJq()('#sgm_current_search_box').length === 0) {
        // TODO jquery hide yöntimi bak fehmi
        var siteSearchBoxSelector =
          _SgmntfY_._variables.search.activeRootElementForHide;
        if (_SgmntfY_._variables.search.activeRootElementForHide === document) {
          siteSearchBoxSelector = 'head';
        }
        _SgmntfY_
          ._getJq()(siteSearchBoxSelector)
          .append(
            '<style id="sgm_current_search_box">' +
              sgmSearchSettings.currentSearchBoxEl +
              ' { display: none!important; position: absolute!important; left: -999999px!important; top: -99999999px!important; visibility: hidden!important; opacity: 0!important }</style>',
          );
      }
      _SgmntfY_._variables.search.searchDelay =
        campaign['searchDelay'] > 50 ? campaign['searchDelay'] : 50;
      _SgmntfY_._variables.search.searchMinChar = campaign['minCharacterCount'];

      sgmSearchSettings.texts.showAll = _SgmntfY_._variables.search.showAll;

      // asset settings
      var searchAssetElements =
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.search.maxMobileWidth
          ? sgmSearchSettings.mobileSearchAssets
          : sgmSearchSettings.searchAssets;
      _SgmntfY_._getJq().each(searchAssetElements, function (index, assetItem) {
        if (assetItem['type'] === 'CATEGORY') {
          sgmSearchSettings.categoryTreeView = assetItem['categoryTreeView'];
          sgmSearchSettings.isSidebarItemsClickable.categories =
            assetItem['clickable'];
          sgmSearchSettings.itemLimits.howManyCategory = assetItem['itemCount'];
          sgmSearchSettings.itemEnable.category = true;
          sgmSearchSettings.highlightEnabled.categories =
            assetItem['highlight'];
        } else if (assetItem['type'] === 'BRAND') {
          sgmSearchSettings.isSidebarItemsClickable.brands =
            assetItem['clickable'];
          sgmSearchSettings.itemLimits.howManyBrand = assetItem['itemCount'];
          sgmSearchSettings.itemEnable.brand = true;
          sgmSearchSettings.highlightEnabled.brands = assetItem['highlight'];
        } else if (assetItem['type'] === 'KEYWORD') {
          sgmSearchSettings.isSidebarItemsClickable.keywords =
            assetItem['clickable'];
          sgmSearchSettings.itemLimits.howManyKeyword = assetItem['itemCount'];
          sgmSearchSettings.itemEnable.keyword = true;
          sgmSearchSettings.highlightEnabled.keywords = assetItem['highlight'];
        } else if (assetItem['type'] === 'LAST_SEARCHES') {
          sgmSearchSettings.itemLimits.howManyKeyword = assetItem['itemCount'];
          sgmSearchSettings.itemEnable.lastSearches = true;
          sgmSearchSettings.isSidebarItemsClickable.lastSearches =
            assetItem['clickable'];
          sgmSearchSettings.searchHistoryClearSettings.clearButtonText =
            assetItem['clearButtonText'];
          sgmSearchSettings.searchHistoryClearSettings.clearButtonEnabled =
            assetItem['clearButtonEnabled'];
          sgmSearchSettings.searchHistoryClearSettings.clearQueryBasedEnabled =
            assetItem['clearQueryBasedEnabled'];
        }
      });

      // text settings
      var currentDeviceIsPC =
        'PC' === (_SgmntfY_._variables.ua.type || 'PC').toUpperCase();
      _SgmntfY_
        ._getJq()
        .each(
          sgmSearchSettings.searchAssetsTexts,
          function (language, assetText) {
            if (language === request.data.lang) {
              sgmSearchSettings.texts.categories = assetText['categoriesText'];
              sgmSearchSettings.texts.popularCategories = currentDeviceIsPC
                ? assetText['popularCategoriesText']
                : assetText['mobilePopularCategoriesText'];
              sgmSearchSettings.texts.brands = assetText['brandsText'];
              sgmSearchSettings.texts.popularBrands = currentDeviceIsPC
                ? assetText['popularBrandsText']
                : assetText['mobilePopularBrandsText'];
              sgmSearchSettings.texts.popularProducts =
                assetText['popularProductsText'];
              sgmSearchSettings.texts.products =
                assetText['popularProductsText'];
              sgmSearchSettings.texts.keywords = currentDeviceIsPC
                ? assetText['popularKeywordsText']
                : assetText['mobilePopularKeywordsText'];
              sgmSearchSettings.texts.lastSearchesText =
                assetText['lastSearchesText'];
              sgmSearchSettings.texts.cancelText =
                assetText['mobileCancelText'];
              sgmSearchSettings.texts.notFound = assetText['notFoundText'];
            }
          },
        );

      // set search data
      sgmSearchSettings.data['categories'] =
        _SgmntfY_._getArrayOfMap(categories);
      sgmSearchSettings.data['brands'] = _SgmntfY_._getArrayOfMap(brands);
      sgmSearchSettings.data['keywords'] =
        _SgmntfY_._getArrayOfKeywordsMap(keywords);
      sgmSearchSettings.data.texts = sgmSearchSettings.texts;
      if (products.length) {
        sgmSearchSettings.data['products'] =
          _SgmntfY_._getArrayOfProductMap(products);
      } else if (
        noResultSearch !== null &&
        noResultSearch.recommendedProducts &&
        noResultSearch.recommendedProducts.length > 0
      ) {
        sgmSearchSettings.data['products'] = _SgmntfY_._getArrayOfProductMap(
          noResultSearch.recommendedProducts,
        );
        sgmSearchSettings.data.texts.products = noResultSearch.text;
      }
      sgmSearchSettings.data.meta = meta;
      sgmSearchSettings.data.keywordsProducts = keywords;
      sgmSearchSettings.data.categoryProducts = categoryProducts;
      sgmSearchSettings.data.mostSearchedProducts = mostSearchedProducts;
      sgmSearchSettings.data.brandProducts = brandProducts;
      sgmSearchSettings.data.itemEnable = sgmSearchSettings.itemEnable;
      sgmSearchSettings.data.synonyms = searchArray.synonyms;
      sgmSearchSettings.data.additionalContents = additionalContents;
      sgmSearchSettings.data.banners = banners.slice(0, 5);
      sgmSearchSettings.data.lastSearches = lastSearches;
      sgmSearchSettings.data.meanings = meanings;
      sgmSearchSettings.data.request = request;
      sgmSearchSettings.data.redirectUrl = redirectUrl;
      sgmSearchSettings.data.searchHistoryClearSettings =
        sgmSearchSettings.searchHistoryClearSettings;

      try {
        if (sgmSearchSettings.preJs) {
          eval(sgmSearchSettings.preJs);
          var retVal = preRenderConf(sgmSearchSettings);
          if (typeof retVal !== 'undefined' && !retVal) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'preRenderConf returned false exiting!',
            );
            return;
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error in executing product search pre js code: ' + err,
        );
      }

      if (!sgmSearchSettings.data.products) {
        return;
      }

      _SgmntfY_._populateSearchResults(sgmSearchSettings.data, null, true);

      if (!isProductsFound) {
        addNoResultIcon();
        noResultStyle();
      }

      _SgmntfY_
        ._getJq()(document)
        .on(
          'submit',
          sgmSearchSettings.searchResultsEl + ' form',
          function (e) {
            e.preventDefault();
            _SgmntfY_._goToSearchResultPage();
          },
        );

      // click event for sidebar items
      _SgmntfY_
        ._getJq()(document)
        .on('click', '.sgm-search-sidebar ul li', function () {
          var group = _SgmntfY_._getJq()(this).parent('ul').data('group');
          if (sgmSearchSettings.isSidebarItemsClickable[group] === true) {
            var dataUrl = _SgmntfY_._getJq()(this).attr('data-url') || '';
            if (dataUrl) {
              window.location.href = _SgmntfY_._getJq()(this).attr('data-url');
              _SgmntfY_
                ._getJq()(sgmSearchSettings.searchResultsEl)
                .removeClass('open');
              _SgmntfY_
                ._getJq()(sgmSearchSettings.searchResultsEl)
                .removeClass('sgm-search-open');
            }
          }
        });

      // hover event form sidebar items
      _SgmntfY_
        ._getJq()(document)
        .on('mouseover', '.sgm-search-sidebar li', function () {
          var currentName = _SgmntfY_._getJq()(this).data('original');
          var selectedName = getSelectedName();
          if (
            _SgmntfY_._getJq()(window).width() >=
              _SgmntfY_._variables.search.maxMobileWidth &&
            currentName != selectedName
          ) {
            var group = _SgmntfY_._getJq()(this).parent('ul').data('group');
            _SgmntfY_
              ._getJq()('.sgm-search-sidebar li.selected')
              .removeClass('selected');
            _SgmntfY_
              ._getJq()('.sgm-search-sidebar li.sgm-search-selected')
              .removeClass('sgm-search-selected');
            _SgmntfY_._getJq()(this).addClass('selected');
            _SgmntfY_._getJq()(this).addClass('sgm-search-selected');
            var productMap = {};
            if (group === 'keywords') {
              productMap = sgmSearchSettings.data.keywordsProducts;
            } else if (group === 'categories') {
              productMap = sgmSearchSettings.data.categoryProducts;
            } else if (group === 'brands') {
              productMap = sgmSearchSettings.data.brandProducts;
            }

            _SgmntfY_._getJq().each(productMap, function (name, products) {
              if (
                name &&
                currentName &&
                name.toString() === currentName.toString()
              ) {
                var data = {};
                data['products'] = _SgmntfY_._getArrayOfProductMap(products);
                _SgmntfY_._populateSearchResults(data, 'products');
              }
            });
            _SgmntfY_
              ._getJq()('.sgm-search-products-title')
              .html(_SgmntfY_._getJq()(this).text());
          }

          function getSelectedName() {
            var selectedEl = document.querySelector(
              '.sgm-search-sidebar li.selected',
            );
            if (
              selectedEl &&
              selectedEl.dataset &&
              selectedEl.dataset.original
            ) {
              return selectedEl.dataset.original.toString();
            }
            return '';
          }
        });

      // close results when window size changed
      _SgmntfY_
        ._getJq()(window)
        .on(
          'load resize scroll orientationchange',
          onChangeWindowOrOrientation,
        );

      _SgmntfY_
        ._getJq()(document)
        .on('click', '#sgm-mobile-input-cancel', _SgmntfY_.mobileSearchCancel);

      _SgmntfY_
        ._getJq()(document)
        .on('click', '.sgm-search-show-all', function (e) {
          document.location =
            sgmSearchSettings.searchUrlPrefix +
            _SgmntfY_._variables.search.currentActiveInput.value.trim();
        });

      // isAlternative Screen reads cookie - click out of box and close results

      if (isBigScreen === '1') {
        return;
      } else {
        _SgmntfY_._getJq()(document).on('click', '*', onCloseSearchResult);

        _SgmntfY_
          ._getJq()('.sgm-search-wrapper')
          .addClass('seg-infinit-z-index');
      }
      ////////

      function onChangeWindowOrOrientation(event) {
        _SgmntfY_._setSearchResultsPosition();
        _SgmntfY_._openSearchResults();
        if (
          _SgmntfY_._getJq()(window).width() <
          _SgmntfY_._variables.search.maxMobileWidth
        ) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('mobile');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('sgm-search-mobile');
          if (
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !window.MSStream
          ) {
            _SgmntfY_
              ._getJq()('.seg-search-wrapper')
              .addClass('sgm-search-ios-device');
          }
        } else {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('mobile');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('sgm-search-mobile');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('sgm-search-ios-device');
        }
      }

      function onCloseSearchResult(e) {
        try {
          if (
            _SgmntfY_
              ._getJq()(sgmSearchSettings.searchResultsEl)
              .hasClass('open') ||
            _SgmntfY_
              ._getJq()(sgmSearchSettings.searchResultsEl)
              .hasClass('sgm-search-open')
          ) {
            var searchResultEl = _SgmntfY_._getJq()(
              sgmSearchSettings.searchResultsEl,
            );
            var searchInputEl = _SgmntfY_._getJq()(
              sgmSearchSettings.input,
              _SgmntfY_._variables.search.activeRootElement,
            );

            // if clicked element is not in search box or clicked element is not mobile input cancel
            if (
              (!searchResultEl.is(e.target) &&
                searchResultEl.has(e.target).length === 0 &&
                !_SgmntfY_
                  ._getJq()(searchInputEl)
                  .is(
                    _SgmntfY_._variables.search.activeRootElement.activeElement,
                  )) ||
              _SgmntfY_._getJq()(e.target).attr('id') ===
                'sgm-mobile-input-cancel'
            ) {
              var targetElement = document.querySelector(
                sgmSearchSettings.searchResultsEl,
              );
              // 2. ...in some event handler after showing the target element...disable body scroll
              bodyScrollLock.enableBodyScroll(targetElement);
              _SgmntfY_._getJq()('.seg-search-wrapper').remove();
              _SgmntfY_._variables.search.manuelTriggerClicked = false;
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE('WARN', 'Error in document click: ' + err);
        }
      }

      // add no result icon to no result found area in after search
      function addNoResultIcon() {
        try {
          var noResultIconElemString = `
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.9765 0.398438C7.84221 0.398438 0.399597 7.84034 0.399597 16.9753C0.399597 26.1096 7.8415 33.5522 16.9765 33.5522C20.9273 33.5522 24.5561 32.1554 27.4087 29.8368L38.626 41.0542C39.2957 41.7239 40.3857 41.7239 41.0554 41.0542C41.725 40.3846 41.725 39.3125 41.0554 38.6428L29.838 27.4254C32.1613 24.5715 33.5534 20.9309 33.5534 16.976C33.5534 7.84176 26.1115 0.399146 16.9765 0.399146V0.398438ZM16.9765 3.82785C24.2576 3.82785 30.1233 9.69351 30.1233 16.9746C30.1233 24.2557 24.2576 30.1214 16.9765 30.1214C9.69538 30.1214 3.82972 24.2557 3.82972 16.9746C3.82972 9.69351 9.69538 3.82785 16.9765 3.82785Z" fill="#999999"/>
            </svg>`;
          var noResultIconElemDomParser = new DOMParser();
          var noResultIconElem = noResultIconElemDomParser
            .parseFromString(noResultIconElemString, 'text/html')
            .getElementsByTagName('svg')[0];
          var noResultIconNewLine = document.createElement('br');
          var noResultIconTargetElem = document.querySelector(
            '.sgm-search-products-title-container',
          );

          noResultIconTargetElem.prepend(noResultIconNewLine);
          noResultIconTargetElem.prepend(noResultIconElem);

          noResultIconTargetElem.style['text-align'] = 'center';
          noResultIconTargetElem.style['margin-bottom'] = '8px';
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in adding no search result icon in after search: ',
            +err,
          );
        }
      }

      // change style of no result search window
      function noResultStyle() {
        var noResultContainer = _SgmntfY_._getJq()(
          sgmSearchSettings.searchResultsEl,
        );
        noResultContainer.find('ul a').css('width', 'calc(50% - 6px)');
        noResultContainer
          .find('ul a:nth-child(odd)')
          .css('margin-right', '10px');
        noResultContainer
          .find('ul a:nth-child(even)')
          .css('margin-right', 'unset');
        noResultContainer.find('hr').css('background-color', 'transparent');
      }
    },
    _getArrayOfMap: function (data) {
      var newArray = [];
      var index = 0;
      _SgmntfY_._getJq().each(data, function (key, value) {
        newArray[index] = {
          name: key,
          url: value,
        };
        index = index + 1;
      });
      return newArray;
    },
    _populateSearchResults: function (data, type, openResultsFlag) {
      data.emptySearch = _SgmntfY_._variables.search.emptySearch;
      data.keywordSearch = _SgmntfY_._variables.search.keywordSearch;
      var productsTemplate = null;
      var domparser = new DOMParser();
      // TODO https://segmentify.atlassian.net/browse/DEV-72
      try {
        productsTemplate = domparser
          .parseFromString(sgmSearchSettings.html, 'text/html')
          .getElementById('sgm-search-product-template');
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error in html parsing for id: sgm-search-product-template: ' + err,
        );
        return;
      }

      var template;
      var rendered;

      var tempSgmSearchSettingsData = _SgmntfY_._getCopiedObject(data);
      if (
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.search.maxMobileWidth
      ) {
        tempSgmSearchSettingsData.products = data.products.slice(
          0,
          sgmSearchSettings.itemLimits.howManyMobileProduct,
        );
      } else {
        tempSgmSearchSettingsData.products = data.products.slice(
          0,
          sgmSearchSettings.itemLimits.howManyDesktopProduct,
        );
      }

      if (type === 'products') {
        rendered = _SgmntfY_
          ._getMustache()
          .render(productsTemplate.innerHTML, tempSgmSearchSettingsData);
        _SgmntfY_._fillSearchResults(rendered, 'products');
      } else {
        if (_SgmntfY_._getJq()('.sgm-search-sidebar').length === 0) {
          try {
            template = domparser
              .parseFromString(sgmSearchSettings.html, 'text/html')
              .getElementById('sgm-search-template');
            if (template) {
              template = _SgmntfY_._decodeHtml(template.innerHTML);
              rendered = _SgmntfY_
                ._getMustache()
                .render(template, tempSgmSearchSettingsData, {
                  products: productsTemplate.innerHTML,
                });
              _SgmntfY_._fillSearchResults(rendered);
            }
          } catch (err) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error in html parsing for id: sgm-search-template: ' + err,
            );
          }
        } else {
          getTemplateAndFillSearchResult('sgm-search-sidebar');
          getTemplateAndFillSearchResult('sgm-search-header');
          getTemplateAndFillSearchResult('sgm-search-products');
        }

        if (_SgmntfY_._getJq()('.sgm-search-sidebar').length === 1) {
          rendered = _SgmntfY_
            ._getMustache()
            .render(productsTemplate.innerHTML, tempSgmSearchSettingsData);
          _SgmntfY_._fillSearchResults(rendered, 'products');
        }
      }
      _SgmntfY_
        ._getJq()(sgmSearchSettings.searchResultsEl)
        .find('.sgm-search-sidebar')
        .find('li')
        .each(function () {
          var sidebarItemText = _SgmntfY_._getJq()(this).text();
          sidebarItemText = _SgmntfY_._prepareSearchAssetText(sidebarItemText);

          var searchInputText = '';
          if (
            _SgmntfY_._variables.search.currentActiveInput &&
            _SgmntfY_._variables.search.currentActiveInput.value
          ) {
            searchInputText =
              _SgmntfY_._variables.search.currentActiveInput.value.trim();
          }

          var searchDataGroup = this.parentElement.getAttribute('data-group');
          var inputTexts = sgmSearchSettings.data.synonyms || [];
          if (inputTexts.length === 0) {
            inputTexts.push(searchInputText);
          }
          if (searchInputText && searchInputText !== '') {
            if (
              searchDataGroup === 'categories' &&
              sgmSearchSettings.highlightEnabled.categories
            ) {
              sidebarItemText = _SgmntfY_._highlight(
                inputTexts,
                sidebarItemText,
              );
            } else if (
              searchDataGroup === 'brands' &&
              sgmSearchSettings.highlightEnabled.brands
            ) {
              sidebarItemText = _SgmntfY_._highlight(
                inputTexts,
                sidebarItemText,
              );
            } else if (
              searchDataGroup === 'keywords' &&
              sgmSearchSettings.highlightEnabled.keywords
            ) {
              sidebarItemText = _SgmntfY_._highlight(
                inputTexts,
                sidebarItemText,
              );
            }
          }
          _SgmntfY_._getJq()(this).html(sidebarItemText);
        });

      if (
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.search.maxMobileWidth
      ) {
        var newFormWrapper = '<form action="/"></form>';
        var newInputWrapper = '<div id="sgm-mobile-input"></div>';
        if (_SgmntfY_._getJq()('#sgm-mobile-input').length === 0) {
          var currentInputClone = _SgmntfY_._getJq()(
            "<input type='search' name='search' autocomplete='OFF'>",
          );
          currentInputClone
            .insertBefore(
              _SgmntfY_
                ._getJq()(sgmSearchSettings.searchResultsEl)
                .children('.sgm-search-header'),
            )
            .wrap(newInputWrapper)
            .wrap(newFormWrapper);
          _SgmntfY_
            ._getJq()('#sgm-mobile-input')
            .append(
              '<div id="sgm-mobile-input-clear"></div><div id="sgm-mobile-input-cancel">' +
                sgmSearchSettings.texts.cancelText +
                '</div>',
            );

          var sgmMobileInput = _SgmntfY_._getJq()('#sgm-mobile-input input');

          if (sgmMobileInput && sgmMobileInput.length > 0) {
            if (!_SgmntfY_._variables.search.currentActiveInput) {
              _SgmntfY_._variables.search.currentActiveInput =
                sgmMobileInput[0];
            }

            setTimeout(function () {
              sgmMobileInput
                .val(_SgmntfY_._variables.search.currentActiveInput.value)
                .focus();
              _SgmntfY_._variables.search.currentActiveInput =
                sgmMobileInput[0];
              _SgmntfY_
                ._searchGetInputElement()
                .not('#sgm-mobile-input input')
                .attr('readonly', 'readonly');
            }, 10);
          }
        }
      }
      if (openResultsFlag === true) {
        _SgmntfY_._openSearchResults(true);
        _SgmntfY_._searchFillAdditionalContents();
        _SgmntfY_._searchFillBanners(sgmSearchSettings.data.banners);
      }

      applyPostProcess();

      //////////

      function getTemplateAndFillSearchResult(className) {
        try {
          var template = domparser
            .parseFromString(sgmSearchSettings.html, 'text/html')
            .getElementsByClassName(className)[0];
          if (template) {
            template = _SgmntfY_._decodeHtml(template.innerHTML);
            rendered = _SgmntfY_
              ._getMustache()
              .render(template, tempSgmSearchSettingsData, {
                products: productsTemplate.innerHTML,
              });
            _SgmntfY_._fillSearchResults(rendered, className);
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in parsing html for  ' + className + ' in search ' + err,
          );
        }
      }

      function applyPostProcess() {
        try {
          var sgmSearchStyleId = 'sgmStyle' + sgmSearchSettings.instanceId;
          var sgmStyleElement = document.getElementById(sgmSearchStyleId);
          if (sgmStyleElement !== null && sgmSearchSettings.css) {
            sgmStyleElement.innerHTML = sgmSearchSettings.css;
          } else {
            sgmSearchSettings.css &&
              _SgmntfY_
                ._getJq()('<style id="' + sgmSearchStyleId + '" />')
                .html(sgmSearchSettings.css)
                .prependTo(_SgmntfY_._getJq()('body'));
          }
          sgmSearchSettings.postJs && eval(sgmSearchSettings.postJs);
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in executing product SEARCH post js or css code: ' + err,
          );
        }
      }
    },
    _searchResetAdditionalContents: function () {
      _SgmntfY_
        ._getJq()('.seg-search-wrapper div[data-sgm-ac-position^=searchbox]')
        .each(onIterateAdditionalContentEl);

      //////
      function onIterateAdditionalContentEl(index, el) {
        _SgmntfY_._getJq()(el).html('');
      }
    },
    _searchFillAdditionalContents: function () {
      _SgmntfY_._searchResetAdditionalContents();
      if (sgmSearchSettings.data.additionalContents) {
        for (
          var i = 0;
          i < sgmSearchSettings.data.additionalContents.length;
          i++
        ) {
          var content = sgmSearchSettings.data.additionalContents[i];
          _SgmntfY_
            ._getJq()(
              '.seg-search-wrapper div[data-sgm-ac-position=' +
                content.key +
                ']',
            )
            .html(content.html);
        }
      }
    },
    _searchResetBanners: function () {
      _SgmntfY_
        ._getJq()('.seg-search-wrapper .seg-search-banner')
        .each(function (index, el) {
          _SgmntfY_._getJq()(el).html('');
        });
    },
    _searchRenderBanner: function (data) {
      var container = document.querySelector(
        '[seg-search-banner-position="' + data.position + '"]',
      );

      // Creates flexbox container for the banners
      if (container === null) {
        var targets = _SgmntfY_._variables.search.bannerTargets;

        container = document.createElement('div');
        container.classList.add('seg-search-banner-position');
        container.setAttribute('seg-search-banner-position', data.position);

        // If the banner position will precede the elements in the content, 'prepend' method will use 'append' method otherwise
        if (
          data.position === 'ASSETS_HEADER' ||
          data.position === 'RESULTS_HEADER'
        ) {
          _SgmntfY_._getJq()(targets[data.position]).prepend(container);
        } else {
          _SgmntfY_._getJq()(targets[data.position]).append(container);
        }
      }

      var banner = document.createElement('div');
      banner.classList.add('seg-search-banner');
      banner.style.width = data.width || '100%';
      banner.style.height = data.height || 'auto';
      container.appendChild(banner);

      var anchor = document.createElement('a');
      anchor.classList.add('seg-search-banner__anchor');
      anchor.href = data.targetUrl;
      if (data.newtab === true) {
        anchor.target = '_blank';
      }
      banner.appendChild(anchor);

      var image = document.createElement('img');
      image.classList.add('seg-search-banner__image');
      image.alt = data.name;
      image.src = data.bannerUrl;
      image.style.width = '100%';
      image.style.height = data.height || 'auto';
      anchor.appendChild(image);
    },
    _searchFillBanners: function (banners) {
      try {
        _SgmntfY_._searchResetBanners();
        if (banners) {
          for (var i = 0; i < banners.length; i++) {
            var banner = banners[i];
            _SgmntfY_._searchRenderBanner(banner);

            _SgmntfY_._variables.segmentifyObj('event:interaction', {
              type: 'widget-view',
              interactionId: _SgmntfY_._getQueryParameter(
                '_sgm_source',
                banner.targetUrl,
              ),
              instanceId: _SgmntfY_._getQueryParameter(
                '_sgm_campaign',
                banner.targetUrl,
              ),
            });
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error in filling searchbox banners.' + err,
        );
      }
    },
    _prepareSearchAssetText: function (sidebarItemText) {
      if (sgmSearchSettings.categoryTreeView === false) {
        try {
          sidebarItemText = sidebarItemText
            .replace(/>/g, '/')
            .toLocaleLowerCase(_SgmntfY_._variables.language)
            .split('/');
          sidebarItemText = sidebarItemText[sidebarItemText.length - 1];
        } catch (err) {
          sidebarItemText = sidebarItemText
            .replace(/>/g, '/')
            .toLocaleLowerCase()
            .split('/');
          sidebarItemText = sidebarItemText[sidebarItemText.length - 1];
        }
      } else {
        try {
          sidebarItemText = sidebarItemText
            .replace(/>/g, '/')
            .toLocaleLowerCase(_SgmntfY_._variables.language);
        } catch (err) {
          sidebarItemText = sidebarItemText
            .replace(/>/g, '/')
            .toLocaleLowerCase();
        }
      }
      sidebarItemText = toCapitalize(sidebarItemText);

      return sidebarItemText;

      ////////

      function toCapitalize(_str) {
        return _str
          .toLowerCase()
          .split(' ')
          .map(function (s) {
            return s.charAt(0).toUpperCase() + s.substring(1);
          })
          .join(' ');
      }
    },
    mobileSearchCancel: function (e) {
      e.stopImmediatePropagation();
      var targetElement = document.querySelector('.seg-search-wrapper');
      // 2. ...in some event handler after showing the target element...disable body scroll
      bodyScrollLock.enableBodyScroll(targetElement);
      _SgmntfY_._getJq()('body, .wrapper-1').removeClass('noscroll');
      _SgmntfY_._getJq()('.seg-search-wrapper').remove();
      _SgmntfY_._searchGetInputElement().val('');
      _SgmntfY_._variables.search.manuelTriggerClicked = false;
    },
    _goToSearchResultPage: function () {
      if (
        _SgmntfY_._variables.search.currentActiveInput.value.trim().length > 0
      ) {
        window.location.href =
          sgmSearchSettings.searchUrlPrefix +
          encodeURIComponent(
            _SgmntfY_._variables.search.currentActiveInput.value.trim(),
          );
      }
      return false;
    },
    _highlight: function (focusedInputs, sideBarText) {
      focusedInputs.forEach(function (focusedInput) {
        var searchQuery = focusedInput.toLocaleLowerCase();
        var regexp = new RegExp(searchQuery, 'ig');

        try {
          searchQuery = focusedInput.toLocaleLowerCase(
            _SgmntfY_._variables.language,
          );
          regexp = new RegExp(searchQuery, 'ig');
        } catch (err) {}

        sideBarText = sideBarText.replace(
          regexp,
          "<span class='sgm-search-keyword-highlight'>$&</span>",
        );
      });
      return sideBarText;
    },
    _openSearchResults: function (openFlag) {
      // sidebar or not
      if (
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .hasClass('mobile') ||
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .hasClass('sgm-search-mobile')
      ) {
        if (
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .find('.sgm-search-sidebar li').length === 0
        ) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('no-sidebar');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('sgm-search-no-sidebar');
        } else {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('no-sidebar');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('sgm-search-no-sidebar');
        }
      } else {
        if (
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .find('.sgm-search-sidebar li').length === 0
        ) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('no-sidebar');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('sgm-search-no-sidebar');
        } else {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('no-sidebar');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('sgm-search-no-sidebar');
        }
      }
      // products or not
      if (
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .find('.sgm-search-products li').length === 0
      ) {
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('no-products');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('sgm-search-no-products');
      } else {
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .removeClass('no-products');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .removeClass('sgm-search-no-products');
      }
      // cursor for sidebar items
      if (sgmSearchSettings.isSidebarItemsClickable.categories === true) {
        _SgmntfY_
          ._getJq()('.sgm-search-sidebar ul[data-group=categories] li')
          .addClass('sgm-cursor-pointer');
      }
      if (sgmSearchSettings.isSidebarItemsClickable.brands === true) {
        _SgmntfY_
          ._getJq()('.sgm-search-sidebar ul[data-group=brands] li')
          .addClass('sgm-cursor-pointer');
      }
      if (sgmSearchSettings.isSidebarItemsClickable.keywords === true) {
        _SgmntfY_
          ._getJq()('.sgm-search-sidebar ul[data-group=keywords] li')
          .addClass('sgm-cursor-pointer');
      }
      if (sgmSearchSettings.sgmSearchShowAll === false) {
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('no-show-all');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('sgm-search-no-show-all');
      }
      if (_SgmntfY_._variables.search.manuelTriggerClicked === true) {
        _SgmntfY_._disableBodyScrollAndAddOpen(openFlag);
        _SgmntfY_._variables.search.manuelTriggerClicked = false;
      } else {
        _SgmntfY_
          ._getJq()
          .each(
            _SgmntfY_._getJq()(
              sgmSearchSettings.input,
              _SgmntfY_._variables.search.activeRootElement,
            ),
            function () {
              if (_SgmntfY_._getJq()(this).is(':focus')) {
                _SgmntfY_._disableBodyScrollAndAddOpen(openFlag);
                return false;
              }
            },
          );
      }
    },
    _disableBodyScrollAndAddOpen: function (openFlag) {
      _SgmntfY_._setSearchResultsPosition();
      if (openFlag) {
        _SgmntfY_._getJq()(sgmSearchSettings.searchResultsEl).addClass('open');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('sgm-search-open');
        if (
          _SgmntfY_._getJq()(window).width() <
          _SgmntfY_._variables.search.maxMobileWidth
        ) {
          var targetElement = document.querySelector('.seg-search-wrapper');
          // 2. ...in some event handler after showing the target element...disable body scroll
          if (targetElement) {
            bodyScrollLock.disableBodyScroll(targetElement);
          }
          if (sgmSearchSettings.mobileSearchAssets.length === 0) {
            _SgmntfY_
              ._getJq()(sgmSearchSettings.searchResultsEl)
              .addClass('no-sidebar');
            _SgmntfY_
              ._getJq()(sgmSearchSettings.searchResultsEl)
              .addClass('sgm-search-no-sidebar');
          }
        }
      }
    },
    _setSearchProductCategory: function (tempProduct, originalProduct) {
      if (originalProduct.category && originalProduct.category.length > 0) {
        if (sgmSearchSettings.categoryTreeView === false) {
          var _replacedCategory = originalProduct.category[0]
            .replace(/>/g, '/')
            .toLocaleLowerCase();

          try {
            _replacedCategory = originalProduct.category[0]
              .replace(/>/g, '/')
              .toLocaleLowerCase(_SgmntfY_._variables.language);
          } catch (err) {}

          _replacedCategory = _replacedCategory.split('/');
          _replacedCategory = _replacedCategory[_replacedCategory.length - 1];
          tempProduct['category'] = _replacedCategory;
        } else {
          try {
            tempProduct['category'] = originalProduct.category[0]
              .replace(/>/g, '/')
              .toLocaleLowerCase(_SgmntfY_._variables.language);
          } catch (err) {
            tempProduct['category'] = originalProduct.category[0]
              .replace(/>/g, '/')
              .toLocaleLowerCase();
          }
        }
        tempProduct['categories-original'] = originalProduct.category[0];

        if (sgmSearchSettings.incremental === true) {
          tempProduct['categories-original'] = [];
          _SgmntfY_
            ._getJq()
            .each(originalProduct.category, function (key, value) {
              tempProduct['categories-original'].push(value);
            });
        }
      }
    },
    _getArrayOfProductMap: function (data) {
      var mappedProducts = [];
      if (Array.isArray(data)) {
        data.forEach(onIterateData);
      }
      return mappedProducts;

      //////
      function onIterateData(originalProduct) {
        var tempProduct = {};
        _SgmntfY_._getJq().extend(tempProduct, originalProduct);

        tempProduct['name'] = _SgmntfY_._decodeHtml(originalProduct.name);

        _SgmntfY_._setSearchProductCategory(tempProduct, originalProduct);

        if (tempProduct.brand) {
          try {
            tempProduct['brand'] = originalProduct.brand.toLocaleLowerCase(
              _SgmntfY_._variables.language,
            );
          } catch (err) {
            tempProduct['brand'] = originalProduct.brand.toLocaleLowerCase();
          }
          tempProduct['brands-original'] = originalProduct.brand;
        }
        mappedProducts.push(tempProduct);
      }
    },
    _getArrayOfKeywordsMap: function (data) {
      var newArray = [];
      var index = 0;
      _SgmntfY_._getJq().each(data, function (key, value) {
        newArray[index] = {
          name: key,
          url: sgmSearchSettings.searchUrlPrefix + key,
        };
        index = index + 1;
      });
      return newArray;
    },
    _fillSearchResults: function (renderedHtml, type) {
      try {
        if (
          _SgmntfY_._getJq()(sgmSearchSettings.searchResultsEl).length === 0
        ) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .html(renderedHtml);
        } else {
          if (type === 'products') {
            _SgmntfY_._getJq()('.sgm-search-products ul').html(renderedHtml);
          } else {
            if (_SgmntfY_._getJq()('.sgm-search-sidebar').length === 0) {
              _SgmntfY_
                ._getJq()(sgmSearchSettings.searchResultsEl)
                .html(renderedHtml);
            } else {
              if (type === 'sgm-search-sidebar') {
                _SgmntfY_._getJq()('.sgm-search-sidebar').html(renderedHtml);
              } else if (type === 'sgm-search-header') {
                _SgmntfY_._getJq()('.sgm-search-header').html(renderedHtml);
              } else if (type === 'sgm-search-products') {
                _SgmntfY_._getJq()('.sgm-search-products').html(renderedHtml);
              }
            }
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'WARN',
          'Error in filling target element[' +
            type +
            '] with product recommendations: ' +
            err,
        );
      }
    },
    _setSearchResultsPosition: function () {
      if (
        _SgmntfY_._getJq()(window).width() <
        _SgmntfY_._variables.search.maxMobileWidth
      ) {
        var vh = _SgmntfY_._getJq()(window).innerHeight() * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('mobile');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .addClass('sgm-search-mobile');
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
          _SgmntfY_
            ._getJq()('.seg-search-wrapper')
            .addClass('sgm-search-ios-device');
        }
      } else {
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .removeClass('mobile');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .removeClass('sgm-search-mobile');
        _SgmntfY_
          ._getJq()(sgmSearchSettings.searchResultsEl)
          .removeClass('sgm-search-ios-device');

        var timestamp = Date.now() | 0;

        _SgmntfY_._setSearchPositionInterval();
        _SgmntfY_._renderOnNextTick(
          _SgmntfY_._setSearchPositionInterval,
          timestamp,
          3000,
        );
      }
    },
    /**
     * This function is used to set the position of the search results.
     * @param {function} callback - The callback function.
     * @param {number} timestamp - The timestamp.
     * @param {number} timeout - Callback methods run until timeout excited.
     */
    _renderOnNextTick: function (f, timestamp, timeout) {
      var currentTimestamp = Date.now() | 0;
      if (currentTimestamp - timestamp < timeout) {
        // First frame
        requestAnimationFrame(function () {
          // Runs the callback function every 2 frame. (30fps)
          requestAnimationFrame(f);
          requestAnimationFrame(function () {
            _SgmntfY_._renderOnNextTick(f, timestamp, timeout);
          });
        });
      }
    },
    _setSearchPositionInterval: function () {
      //TODO https://segmentify.atlassian.net/browse/DEV-72
      if (
        _SgmntfY_._getJq()(window).width() >
          _SgmntfY_._variables.search.maxMobileWidth &&
        (_SgmntfY_._getJq()('.seg-search-wrapper').hasClass('no-products') ||
          _SgmntfY_
            ._getJq()('.seg-search-wrapper')
            .hasClass('sgm-search-no-products'))
      ) {
        return;
      }
      var direction = sgmSearchSettings.openingDirection.toLowerCase();
      var stickyFlag = false;
      var staticFlag = false;
      var doNothing = false;

      var currentActiveInput = _SgmntfY_._getJq()(
        _SgmntfY_._variables.search.currentActiveInput,
        _SgmntfY_._variables.search.activeRootElement,
      );
      currentActiveInput
        .parents()
        .not('body')
        .not('html')
        .each(function (index, elem) {
          if (_SgmntfY_._getJq()(elem).css('position') === 'fixed') {
            stickyFlag = true;
            return false;
          } else if (_SgmntfY_._getJq()(elem).css('position') === 'static') {
            staticFlag = true;
            return false;
          }
          if (_SgmntfY_._getJq()(elem).css('display') === 'none') {
            doNothing = true;
            _SgmntfY_._getJq()('.seg-search-wrapper').removeClass('open');
            _SgmntfY_
              ._getJq()('.seg-search-wrapper')
              .removeClass('sgm-search-open');
            return false;
          }
        });

      if (doNothing === false) {
        if (stickyFlag === true) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('seg-position-absolute');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('seg-position-fixed');
        } else if (staticFlag === true) {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('seg-position-absolute');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('seg-position-fixed');
        } else {
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .removeClass('seg-position-absolute');
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .addClass('seg-position-absolute');
        }

        var inputPosition =
          _SgmntfY_._variables.search.currentActiveInput.getBoundingClientRect();
        var lastInputPosition = { top: '', left: '' };

        if (typeof inputPosition === 'undefined') {
          return;
        }

        // input'un top pozisyonu değişmişse
        if (inputPosition.top !== lastInputPosition.top) {
          var inputHeight = _SgmntfY_
            ._getJq()(
              _SgmntfY_._variables.search.currentActiveInput,
              _SgmntfY_._variables.search.activeRootElement,
            )
            .outerHeight();
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .css('top', inputPosition.top + inputHeight + 1);
          lastInputPosition.top = inputPosition.top;
        }

        // input'un left pozisyonu değişmişse
        if (inputPosition.left !== lastInputPosition.left) {
          var ww = _SgmntfY_._getJq()(window).width();
          var inputWidth = _SgmntfY_
            ._getJq()(
              _SgmntfY_._variables.search.currentActiveInput,
              _SgmntfY_._variables.search.activeRootElement,
            )
            .parent()
            .outerWidth();
          var resultElWidth = _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .outerWidth();

          var css = {
            right: inputPosition.left,
            center: inputPosition.left - resultElWidth / 2 + inputWidth / 2,
            left: inputPosition.left + inputWidth - resultElWidth,
          };

          if (direction === 'right') {
            // if there is no enough space on right
            if (css[direction] + resultElWidth >= ww) {
              // align center by input
              css[direction] = css['center'];
            }
          } else if (direction === 'left') {
            // if there is no enough space on left
            if (css[direction] <= 0) {
              // align center by input
              css[direction] = css['center'];
            }
          }

          if (css[direction] === css['center']) {
            // ortalayınca sağ ya da sol kenar ekranın dışına taşıyorsa
            if (css['center'] <= 0 || css['center'] + resultElWidth >= ww) {
              // ekrana ortala
              css[direction] = ww / 2 - resultElWidth / 2;
            }
          }
          _SgmntfY_
            ._getJq()(sgmSearchSettings.searchResultsEl)
            .css('left', css[direction]);
        }
        lastInputPosition = inputPosition;
      }
    },
    _evalSearchBodyScrollLockPreJs: function () {
      (function (global, factory) {
        var mod = {
          exports: {},
        };
        factory(mod.exports);
        window.bodyScrollLock = mod.exports;
      })(this, function (exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        function _toConsumableArray(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          } else {
            return Array.from(arr);
          }
        }

        // Older browsers don't support event options, feature detect it.

        // Adopted and modified solution from Bohdan Didukh (2017)
        // https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

        var hasPassiveEvents = false;
        if (typeof window !== 'undefined') {
          var passiveTestOptions = {
            get passive() {
              hasPassiveEvents = true;
              return undefined;
            },
          };
          window.addEventListener('testPassive', null, passiveTestOptions);
          window.removeEventListener('testPassive', null, passiveTestOptions);
        }

        var isIosDevice =
          typeof window !== 'undefined' &&
          window.navigator &&
          window.navigator.platform &&
          /iP(ad|hone|od)/.test(window.navigator.platform);

        var locks = [];
        var documentListenerAdded = false;
        var initialClientY = -1;
        var previousBodyOverflowSetting = void 0;
        var previousHtmlOverflowSetting = void 0;
        var previousBodyPaddingRight = void 0;

        // returns true if `el` should be allowed to receive touchmove events.
        var allowTouchMove = function allowTouchMove(el) {
          return locks.some(function (lock) {
            return !!(
              lock.options.allowTouchMove && lock.options.allowTouchMove(el)
            );
          });
        };

        var preventDefault = function preventDefault(rawEvent) {
          var e = rawEvent || window.event;

          // For the case whereby consumers adds a touchmove event listener to document.
          // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
          // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
          // the touchmove event on document will break.
          if (allowTouchMove(e.target)) {
            return true;
          }

          // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
          if (e.touches.length > 1) return true;

          if (e.preventDefault) e.preventDefault();

          return false;
        };

        var setOverflowHidden = function setOverflowHidden(options) {
          // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
          // the responsiveness for some reason. Setting within a setTimeout fixes this.
          setTimeout(function () {
            // If previousBodyPaddingRight is already set, don't set it again.
            if (previousBodyPaddingRight === undefined) {
              var _reserveScrollBarGap =
                !!options && options.reserveScrollBarGap === true;
              var scrollBarGap =
                window.innerWidth - document.documentElement.clientWidth;

              if (_reserveScrollBarGap && scrollBarGap > 0) {
                previousBodyPaddingRight = document.body.style.paddingRight;
                document.body.style.paddingRight = scrollBarGap + 'px';
              }
            }

            // If previousBodyOverflowSetting is already set, don't set it again.
            if (previousBodyOverflowSetting === undefined) {
              previousBodyOverflowSetting = document.body.style.overflow;
              document.body.style.cssText = 'overflow:hidden !important';
              _SgmntfY_._getJq()('html').css('overflow', 'hidden !important');
            }
            if (previousHtmlOverflowSetting === undefined) {
              previousHtmlOverflowSetting = _SgmntfY_
                ._getJq()('html')
                .css('overflow');
              _SgmntfY_._getJq()('html').css('overflow', 'hidden');
            }
          });
        };

        var restoreOverflowSetting = function restoreOverflowSetting() {
          // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
          // the responsiveness for some reason. Setting within a setTimeout fixes this.
          setTimeout(function () {
            if (previousBodyPaddingRight !== undefined) {
              document.body.style.paddingRight = previousBodyPaddingRight;

              // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
              // can be set again.
              previousBodyPaddingRight = undefined;
            }

            if (previousBodyOverflowSetting !== undefined) {
              document.body.style.overflow = previousBodyOverflowSetting;

              // Restore previousBodyOverflowSetting to undefined
              // so setOverflowHidden knows it can be set again.
              previousBodyOverflowSetting = undefined;
            }
            if (previousHtmlOverflowSetting !== undefined) {
              _SgmntfY_
                ._getJq()('html')
                .css('overflow', previousHtmlOverflowSetting);

              // Restore previousHtmlOverflowSetting to undefined
              // so setOverflowHidden knows it can be set again.
              previousHtmlOverflowSetting = undefined;
            }
          });
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
        var isTargetElementTotallyScrolled =
          function isTargetElementTotallyScrolled(targetElement) {
            return targetElement
              ? targetElement.scrollHeight - targetElement.scrollTop <=
                  targetElement.clientHeight
              : false;
          };

        var handleScroll = function handleScroll(event, targetElement) {
          var clientY = event.targetTouches[0].clientY - initialClientY;

          if (allowTouchMove(event.target)) {
            return false;
          }

          if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
            // element is at the top of its scroll.
            return preventDefault(event);
          }

          if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
            // element is at the top of its scroll.
            return preventDefault(event);
          }

          event.stopPropagation();
          return true;
        };

        var disableBodyScroll = (exports.disableBodyScroll =
          function disableBodyScroll(targetElement, options) {
            if (isIosDevice) {
              // targetElement must be provided, and disableBodyScroll must not have been
              // called on this targetElement before.
              if (!targetElement) {
                // eslint-disable-next-line no-console
                console.error(
                  'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.',
                );
                return;
              }

              if (
                targetElement &&
                !locks.some(function (lock) {
                  return lock.targetElement === targetElement;
                })
              ) {
                var lock = {
                  targetElement: targetElement,
                  options: options || {},
                };

                locks = [].concat(_toConsumableArray(locks), [lock]);

                targetElement.ontouchstart = function (event) {
                  if (event.targetTouches.length === 1) {
                    // detect single touch.
                    initialClientY = event.targetTouches[0].clientY;
                  }
                };
                targetElement.ontouchmove = function (event) {
                  if (event.targetTouches.length === 1) {
                    // detect single touch.
                    handleScroll(event, targetElement);
                  }
                };

                if (!documentListenerAdded) {
                  document.addEventListener(
                    'touchmove',
                    preventDefault,
                    hasPassiveEvents ? { passive: false } : undefined,
                  );
                  documentListenerAdded = true;
                }
              }
            } else {
              setOverflowHidden(options);
              var _lock = {
                targetElement: targetElement,
                options: options || {},
              };

              locks = [].concat(_toConsumableArray(locks), [_lock]);
            }
          });

        var clearAllBodyScrollLocks = (exports.clearAllBodyScrollLocks =
          function clearAllBodyScrollLocks() {
            if (isIosDevice) {
              // Clear all locks ontouchstart/ontouchmove handlers, and the references.
              locks.forEach(function (lock) {
                lock.targetElement.ontouchstart = null;
                lock.targetElement.ontouchmove = null;
              });

              if (documentListenerAdded) {
                document.removeEventListener(
                  'touchmove',
                  preventDefault,
                  hasPassiveEvents ? { passive: false } : undefined,
                );
                documentListenerAdded = false;
              }

              locks = [];

              // Reset initial clientY.
              initialClientY = -1;
            } else {
              restoreOverflowSetting();
              locks = [];
            }
          });

        var enableBodyScroll = (exports.enableBodyScroll =
          function enableBodyScroll(targetElement) {
            if (isIosDevice) {
              if (!targetElement) {
                // eslint-disable-next-line no-console
                console.error(
                  'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.',
                );
                return;
              }

              targetElement.ontouchstart = null;
              targetElement.ontouchmove = null;

              locks = locks.filter(function (lock) {
                return lock.targetElement !== targetElement;
              });

              if (documentListenerAdded && locks.length === 0) {
                document.removeEventListener(
                  'touchmove',
                  preventDefault,
                  hasPassiveEvents ? { passive: false } : undefined,
                );

                documentListenerAdded = false;
              }
            } else {
              locks = locks.filter(function (lock) {
                return lock.targetElement !== targetElement;
              });
              if (!locks.length) {
                restoreOverflowSetting();
              }
            }
          });
      });
    },
    _getCopiedObject: function () {
      var toObj = Object();
      for (var i = 0; i < arguments.length; i++) {
        if (typeof Object.assign === 'function') {
          Object.assign(toObj, arguments[i]);
        } else {
          _SgmntfY_._getJq().extend(toObj, arguments[i]);
        }
      }
      return toObj;
    },
    // push permission functions
    _pushInitPermissionCampaign: function (campaign, config) {
      // render html by default for safari
      if (
        config.safariEnabled &&
        _SgmntfY_._variables.pushInfo.agent === 'Safari'
      ) {
        if (
          _SgmntfY_._variables.pushInfo.subscription !== 'GRANTED' &&
          _SgmntfY_._variables.pushInfo.subscription !== 'DENIED'
        ) {
          checkRemotePermission(
            window.safari.pushNotification.permission(
              _SgmntfY_._variables.pushInfo.safari.webPushId,
            ),
          );

          function checkRemotePermission(permissionData) {
            if (permissionData.permission === 'denied') {
              if (_SgmntfY_._variables.pushInfo.subscription !== 'DENIED') {
                fetch(
                  _SgmntfY_._getPushUrl() +
                    'subscription/deny?apiKey=' +
                    _SgmntfY_._variables.apiKey +
                    '&userId=' +
                    _SgmntfY_._getUserId() +
                    '&instanceId=' +
                    _SgmntfY_._variables.pushInfo.instanceId +
                    '&browser=' +
                    _SgmntfY_._variables.pushInfo.agent +
                    '&device=' +
                    _SgmntfY_._variables.ua.type.toUpperCase(),
                );
                return;
              }
              _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
            } else if (permissionData.permission === 'granted') {
              _SgmntfY_._pushSendSafariSubscription(permissionData, true);
              _SgmntfY_._variables.pushInfo.promptInteraction = 'granted';
            } else {
              _SgmntfY_._pushRenderHtml(campaign, config);
              _SgmntfY_._pushBindClickHandlers(false, false);
              _SgmntfY_._variables.pushInfo.safariEnabled =
                config.safariEnabled;
            }
          }
        }
      } else {
        var isVapid =
          _SgmntfY_._variables.pushInfo.permissionMethod === 'Vapid';
        var isFirebase =
          _SgmntfY_._variables.pushInfo.isFirebaseCompatible &&
          _SgmntfY_._variables.pushInfo.permissionMethod === 'Firebase';
        var isFirebaseV2 =
          _SgmntfY_._variables.pushInfo.isFirebaseCompatible &&
          _SgmntfY_._variables.pushInfo.useV2 &&
          _SgmntfY_._variables.pushInfo.permissionMethod === 'FirebaseV2';
        var shouldIShowPopUp = _SgmntfY_._pushShouldShowPopUp(config);
        _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
          .getSubscription()
          .then(function (pushSub) {
            if (pushSub) {
              if (_SgmntfY_._variables.pushInfo.subscription !== 'GRANTED') {
                // remove subscription details in order to get new subscriptionId/auth and p256dh over new server credentials
                pushSub
                  .unsubscribe()
                  .then(function (successful) {
                    if (successful) {
                      _SgmntfY_._pushRequestPermissionFunc(
                        isVapid,
                        isFirebase,
                        isFirebaseV2,
                        true,
                      );
                    }
                  })
                  .catch(function (e) {
                    _SgmntfY_.LOG_MESSAGE(
                      'ERROR',
                      'Error while unsubscribing user: ' + e,
                    );
                  });
              }
            } else {
              _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
                .permissionState({ userVisibleOnly: true })
                .then(function (permissionState) {
                  if (
                    permissionState === 'denied' ||
                    permissionState === 'DENIED'
                  ) {
                    _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
                    _SgmntfY_.LOG_MESSAGE('WARN', 'Permission request denied!');
                    if (
                      _SgmntfY_._variables.pushInfo.subscription !== 'DENIED'
                    ) {
                      fetch(
                        _SgmntfY_._getPushUrl() +
                          'subscription/deny?apiKey=' +
                          _SgmntfY_._variables.apiKey +
                          '&userId=' +
                          _SgmntfY_._getUserId() +
                          '&instanceId=' +
                          _SgmntfY_._variables.pushInfo.instanceId +
                          '&browser=' +
                          _SgmntfY_._variables.pushInfo.agent +
                          '&device=' +
                          _SgmntfY_._variables.ua.type.toUpperCase(),
                      );
                    }
                  } else if (
                    permissionState === 'granted' ||
                    permissionState === 'GRANTED'
                  ) {
                    _SgmntfY_._variables.pushInfo.promptInteraction = 'granted';
                    if (
                      _SgmntfY_._variables.pushInfo.subscription !== 'GRANTED'
                    ) {
                      _SgmntfY_._pushRequestPermissionFunc(
                        isVapid,
                        isFirebase,
                        isFirebaseV2,
                        true,
                      );
                    }
                  } else if (
                    permissionState === 'prompt' ||
                    permissionState === 'PROMPT'
                  ) {
                    _SgmntfY_._variables.pushInfo.promptInteraction = 'prompt';
                    if (shouldIShowPopUp) {
                      _SgmntfY_._pushRenderHtml(campaign, config);
                      _SgmntfY_._pushBindClickHandlers(true, false);
                    } else {
                      _SgmntfY_._pushRequestPermissionFunc(
                        isVapid,
                        isFirebase,
                        isFirebaseV2,
                        false,
                      );
                    }
                  }
                })
                .catch(function (e) {
                  _SgmntfY_.LOG_MESSAGE(
                    'ERROR',
                    'Error while getting push permission state, isVapid [' +
                      isVapid +
                      '], isFirebase [' +
                      isFirebase +
                      '] ' +
                      e,
                  );
                  _SgmntfY_._pushFadeUp(1);
                });
            }
          })
          .catch(function (e) {
            _SgmntfY_.LOG_MESSAGE(
              'ERROR',
              'Error while getting subscription, isVapid [' +
                isVapid +
                '], isFirebase [' +
                isFirebase +
                '] ' +
                e,
            );
            _SgmntfY_._pushFadeUp(1);
          });
      }
    },
    _pushRequestPermissionFunc: function (
      isVapid,
      isFirebase,
      isFirebaseV2,
      isSilent,
    ) {
      if (isVapid) {
        _SgmntfY_._pushRequestPermissionVapid(isSilent);
      } else if (isFirebase) {
        _SgmntfY_._pushRequestPermission(isSilent);
      } else if (isFirebaseV2) {
        _SgmntfY_._pushRequestPermissionV2(isSilent);
      }
    },
    _pushFadeUp: function (timeout) {
      _SgmntfY_._getJq()('.seg-popup-push').addClass('seg-fade-up');
      window.setTimeout(function () {
        _SgmntfY_._getJq()('.seg-popup-push').remove();
      }, timeout);
    },
    _pushRenderHtml: function (campaign, config) {
      var renderedHtml = _SgmntfY_
        ._getMustache()
        .render(campaign['html'], config);
      _SgmntfY_._getJq()('body').prepend(renderedHtml);
      campaign['css'] &&
        _SgmntfY_
          ._getJq()('<style />')
          .html(campaign['css'])
          .prependTo(_SgmntfY_._getJq()('body'));
      _SgmntfY_.LOG_MESSAGE(
        'DEBUG',
        'Push Permission appended to html body for campaign(' +
          campaign['instanceId'] +
          ')',
      );
    },
    _pushBindClickHandlers: function (bindPermissionToClickEvent, isSilent) {
      _SgmntfY_
        ._getJq()('.seg-popup-push-bttn-later-new')
        .click(function () {
          _SgmntfY_._variables.segmentifyObj('event:interaction', {
            type: 'push-permission-impression',
            instanceId: _SgmntfY_._variables.pushInfo.instanceId,
            interactionId: _SgmntfY_._variables.pushInfo.instanceId,
          });
          _SgmntfY_._pushFadeUp(500);
        });
      _SgmntfY_
        ._getJq()('.seg-popup-push-bttn-allow-new')
        .click(function () {
          _SgmntfY_._variables.segmentifyObj('event:interaction', {
            type: 'push-permission-impression',
            instanceId: _SgmntfY_._variables.pushInfo.instanceId,
            interactionId: _SgmntfY_._variables.pushInfo.instanceId,
          });
          _SgmntfY_._pushFadeUp(500);
          if (bindPermissionToClickEvent) {
            if (_SgmntfY_._variables.pushInfo.permissionMethod === 'Firebase') {
              _SgmntfY_._variables.pushInfo.messaging
                .requestPermission()
                .then(function () {
                  _SgmntfY_._pushGetFirebasePermission(isSilent);
                })
                .catch(function (e) {
                  if (e.code === 'messaging/permission-blocked') {
                    _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
                    _SgmntfY_.LOG_MESSAGE(
                      'WARN',
                      'Permission requested denied :' + e,
                    );
                    if (
                      _SgmntfY_._variables.pushInfo.subscription !== 'DENIED'
                    ) {
                      fetch(
                        _SgmntfY_._getPushUrl() +
                          'subscription/deny?apiKey=' +
                          _SgmntfY_._variables.apiKey +
                          '&userId=' +
                          _SgmntfY_._getUserId() +
                          '&instanceId=' +
                          _SgmntfY_._variables.pushInfo.instanceId +
                          '&browser=' +
                          _SgmntfY_._variables.pushInfo.agent +
                          '&device=' +
                          _SgmntfY_._variables.ua.type.toUpperCase(),
                      );
                    }
                  } else if (e.code === 'messaging/permission-default') {
                    _SgmntfY_._variables.pushInfo.promptInteraction = 'close';
                  } else {
                    _SgmntfY_.LOG_MESSAGE(
                      'ERROR',
                      'Error while getting subscription details at _pushBindClickHandlers() isFireBase [true]: ' +
                        e,
                    );
                    _SgmntfY_._pushFadeUp(1);
                  }
                });
            } else if (
              _SgmntfY_._variables.pushInfo.permissionMethod === 'Vapid'
            ) {
              var subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: _SgmntfY_._pushUrlBase64ToUint8Array(
                  _SgmntfY_._variables.pushInfo.vapid.publicKey,
                ),
              };
              _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
                .subscribe(subscribeOptions)
                .then(function (subscription) {
                  _SgmntfY_._pushSendSubscription(subscription, true, isSilent);
                  _SgmntfY_._variables.pushInfo.promptInteraction = 'granted';
                })
                .catch(function (e) {
                  _SgmntfY_.LOG_MESSAGE(
                    'ERROR',
                    'Error while getting subscription details at _pushBindClickHandlers() isVapid [true]: ' +
                      e,
                  );
                  _SgmntfY_._pushFadeUp(1);
                  _SgmntfY_._pushSetPromptInteractionForVapid();
                });
            } else if (
              _SgmntfY_._variables.pushInfo.permissionMethod === 'FirebaseV2'
            ) {
              _SgmntfY_._pushRequestPermissionV2(false);
            }
          }
          if (
            _SgmntfY_._variables.pushInfo.agent === 'Safari' &&
            _SgmntfY_._variables.pushInfo.safariEnabled
          ) {
            _SgmntfY_._pushGetSafariPermission();
          }
        });
    },
    _pushGetSafariPermission: function () {
      checkRemotePermission(
        window.safari.pushNotification.permission(
          _SgmntfY_._variables.pushInfo.safari.webPushId,
        ),
      );

      function checkRemotePermission(permissionData) {
        if (permissionData.permission === 'default') {
          window.safari.pushNotification.requestPermission(
            _SgmntfY_._variables.pushInfo.safari.packageUrl,
            _SgmntfY_._variables.pushInfo.safari.webPushId,
            {},
            checkRemotePermission,
          );
        } else if (permissionData.permission === 'denied') {
          _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
          if (_SgmntfY_._variables.pushInfo.subscription !== 'DENIED') {
            fetch(
              _SgmntfY_._getPushUrl() +
                'subscription/deny?apiKey=' +
                _SgmntfY_._variables.apiKey +
                '&userId=' +
                _SgmntfY_._getUserId() +
                '&instanceId=' +
                _SgmntfY_._variables.pushInfo.instanceId +
                '&browser=' +
                _SgmntfY_._variables.pushInfo.agent +
                '&device=' +
                _SgmntfY_._variables.ua.type.toUpperCase(),
            );
          }
        } else if (permissionData.permission === 'granted') {
          _SgmntfY_._variables.pushInfo.promptInteraction = 'granted';
          _SgmntfY_._pushSendSafariSubscription(permissionData, false);
        }
      }
    },
    _pushShouldShowPopUp: function (config) {
      if (!config.twoStepEnabled) {
        return false;
      }
      var browser = bowser.name.toLowerCase();
      var version = parseFloat(bowser.version);

      if (browser.indexOf('chrome') >= 0) {
        if (version >= 80) {
          return true;
        }
      }
      if (browser.indexOf('firefox') >= 0) {
        if (version >= 72) {
          return true;
        }
      }
      if (browser.indexOf('opera') >= 0) {
        if (version >= 67) {
          return true;
        }
      }
      if (browser.indexOf('yandex') >= 0) {
        if (version >= 20) {
          return true;
        }
      }
      if (browser.indexOf('samsung') >= 0) {
        if (version >= 12) {
          return true;
        }
      }
      return false;
    },
    _pushGetFirebasePermission: function (isSilent) {
      _SgmntfY_._variables.pushInfo.messaging
        .getToken()
        .then(function (currentToken) {
          if (currentToken) {
            _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
              .getSubscription()
              .then(function (subscription) {
                _SgmntfY_._pushSendSubscription(subscription, false, isSilent);
              })
              .catch(function (e) {
                _SgmntfY_.LOG_MESSAGE(
                  'ERROR',
                  'Error while getting subscription details at _pushGetFirebasePermission() : ' +
                    e,
                );
              });
          }
        })
        .catch(function (e) {
          if (e.code && e.code === 'messaging/token-unsubscribe-failed') {
            _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
              .getSubscription()
              .then(function (subscription) {
                _SgmntfY_._pushSendSubscription(subscription, false, isSilent);
              })
              .catch(function (e) {
                _SgmntfY_.LOG_MESSAGE(
                  'ERROR',
                  'Error while getting subscription details at _pushGetFirebasePermission() : ' +
                    e,
                );
              });
          } else {
            _SgmntfY_.LOG_MESSAGE(
              'ERROR',
              'Error while getting subscription token at _pushGetFirebasePermission() :  ' +
                e,
            );
          }
        });
    },
    _pushRequestPermission: function (isSilent) {
      _SgmntfY_._variables.pushInfo.messaging
        .requestPermission()
        .then(function () {
          _SgmntfY_._pushGetFirebasePermission(isSilent);
        })
        .catch(function (e) {
          if (e.code === 'messaging/permission-blocked') {
            _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
            _SgmntfY_.LOG_MESSAGE('WARN', 'Permission requested denied :' + e);
            if (_SgmntfY_._variables.pushInfo.subscription !== 'DENIED') {
              fetch(
                _SgmntfY_._getPushUrl() +
                  'subscription/deny?apiKey=' +
                  _SgmntfY_._variables.apiKey +
                  '&userId=' +
                  _SgmntfY_._getUserId() +
                  '&instanceId=' +
                  _SgmntfY_._variables.pushInfo.instanceId +
                  '&browser=' +
                  _SgmntfY_._variables.pushInfo.agent +
                  '&device=' +
                  _SgmntfY_._variables.ua.type.toUpperCase(),
              );
            }
          } else if (e.code === 'messaging/permission-default') {
            _SgmntfY_._variables.pushInfo.promptInteraction = 'close';
          } else {
            _SgmntfY_.LOG_MESSAGE(
              'ERROR',
              'Error while getting subscription details at _pushRequestPermission() isFireBase [true]: ' +
                e,
            );
            _SgmntfY_._pushFadeUp(1);
          }
        });
    },
    _pushRequestPermissionV2: function (isSilent) {
      _SgmntfY_._variables.pushInfo.fcm
        .getToken(_SgmntfY_._variables.pushInfo.fcm.messaging, {
          vapidKey: _SgmntfY_._variables.pushInfo.fcm.vapidKey,
          serviceWorkerRegistration:
            _SgmntfY_._variables.pushInfo.serviceWorkerReg,
        })
        .then(function (currentToken) {
          if (currentToken) {
            _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
              .getSubscription()
              .then(function (pushSub) {
                if (pushSub) {
                  _SgmntfY_._pushSendSubscription(
                    pushSub,
                    false,
                    isSilent,
                    currentToken,
                  );
                }
              });
          } else {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'No registration token available. Request permission to generate one isFireBaseV2 [true]',
            );
          }
        })
        .catch(function (e) {
          if (e.code === 'messaging/permission-blocked') {
            _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
            _SgmntfY_.LOG_MESSAGE('WARN', 'Permission requested denied :' + e);
            if (_SgmntfY_._variables.pushInfo.subscription !== 'DENIED') {
              fetch(
                _SgmntfY_._getPushUrl() +
                  'subscription/deny?apiKey=' +
                  _SgmntfY_._variables.apiKey +
                  '&userId=' +
                  _SgmntfY_._getUserId() +
                  '&instanceId=' +
                  _SgmntfY_._variables.pushInfo.instanceId +
                  '&browser=' +
                  _SgmntfY_._variables.pushInfo.agent +
                  '&device=' +
                  _SgmntfY_._variables.ua.type.toUpperCase(),
              );
            }
          } else if (e.code === 'messaging/permission-default') {
            _SgmntfY_._variables.pushInfo.promptInteraction = 'close';
          } else {
            _SgmntfY_.LOG_MESSAGE(
              'ERROR',
              'Error while getting subscription details at _pushRequestPermission() isFireBaseV2 [true]: ' +
                e,
            );
            _SgmntfY_._pushFadeUp(1);
          }
        });
    },
    _pushRequestPermissionVapid: function (isSilent) {
      var subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: _SgmntfY_._pushUrlBase64ToUint8Array(
          _SgmntfY_._variables.pushInfo.vapid.publicKey,
        ),
      };
      _SgmntfY_._variables.pushInfo.serviceWorkerReg.pushManager
        .subscribe(subscribeOptions)
        .then(function (subscription) {
          _SgmntfY_._pushSendSubscription(subscription, true, isSilent);
        })
        .catch(function (e) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Error while getting subscription details at _pushRequestPermissionVapid() : ' +
              e,
          );
          _SgmntfY_._pushSetPromptInteractionForVapid();
        });
    },
    _pushSendSubscription: function (pushSub, isVapid, isSilent, fcmToken) {
      var subscriptionId = pushSub['endpoint'].split('/').slice(-1)[0];
      var endpoint = pushSub['endpoint']
        .replace(subscriptionId, '')
        .slice(0, -1);
      var auth = pushSub.getKey ? pushSub.getKey('auth') : '';
      var key = pushSub.getKey ? pushSub.getKey('p256dh') : '';
      var userId = _SgmntfY_._getUserId();
      var dataArray = {
        subscriptionId: subscriptionId,
        auth: auth
          ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth)))
          : '',
        key: key
          ? btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
          : '',
        userId: userId,
        agent: _SgmntfY_._variables.pushInfo.agent,
        endpoint: endpoint,
        deviceType: _SgmntfY_._variables.ua.type.toUpperCase(),
        isVapid: isVapid,
        fcmToken: fcmToken,
      };
      _SgmntfY_._variables.pushInfo.promptInteraction = 'granted';
      _SgmntfY_._pushSendFetchSubscriptionAllowRequest(dataArray, isSilent);
    },
    _pushSendSafariSubscription: function (permissionData, isSilent) {
      var dataArray = {
        subscriptionId: permissionData['deviceToken'],
        auth: '',
        key: '',
        userId: _SgmntfY_._getUserId(),
        agent: 'Safari',
        endpoint: '',
        deviceType: _SgmntfY_._variables.ua.type.toUpperCase(),
        isVapid: false,
      };
      _SgmntfY_._pushSendFetchSubscriptionAllowRequest(dataArray, isSilent);
    },
    _pushSendFetchSubscriptionAllowRequest: function (dataArray, isSilent) {
      var fetchUrl =
        _SgmntfY_._getPushUrl() +
        'subscription/push' +
        '?apiKey=' +
        _SgmntfY_._variables.apiKey +
        '&instanceId=' +
        _SgmntfY_._variables.pushInfo.instanceId +
        '&isSilent=' +
        isSilent;
      fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataArray),
      }).then(
        function (res) {
          if (!res.ok) {
            res.text().then(function (data) {
              _SgmntfY_._pushSendPermissionError(
                dataArray['subscriptionId'],
                data,
              );
            });
          }
        },
        function (e) {
          _SgmntfY_._pushSendPermissionError(dataArray['subscriptionId'], e);
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Error while sending subscription info to BE: ' + e,
          );
        },
      );
    },
    _pushSendPermissionError: function (subscriptionId, errorMessage) {
      var url =
        _SgmntfY_._getPushUrl() +
        'subscription/error' +
        '?apiKey=' +
        _SgmntfY_._variables.apiKey;
      var body = {
        subscriptionId: subscriptionId,
        userId: _SgmntfY_._getUserId(),
        message: errorMessage,
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    _pushUrlBase64ToUint8Array: function (base64String) {
      var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
    _pushSetPromptInteractionForVapid: function () {
      if ('Notification' in window) {
        if (Notification.permission === 'denied') {
          _SgmntfY_._variables.pushInfo.promptInteraction = 'denied';
        } else if (Notification.permission === 'default') {
          _SgmntfY_._variables.pushInfo.promptInteraction = 'close';
        }
      }
    },
    _pushInitFCM: function (campaign, config) {
      const script = document.createElement('script');
      script.type = 'module';
      const firebaseConfig = {
        apiKey: _SgmntfY_._variables.pushInfo.fcm.apiKey,
        messagingSenderId: _SgmntfY_._variables.pushInfo.fcm.messagingSenderId,
        projectId: _SgmntfY_._variables.pushInfo.fcm.projectId,
        appId: _SgmntfY_._variables.pushInfo.fcm.appId,
      };
      script.textContent = `
                import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
                import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js';
                const app = initializeApp(${JSON.stringify(firebaseConfig)});
                const messaging = getMessaging(app);
                _SgmntfY_._variables.pushInfo.fcm.messaging = messaging;
                _SgmntfY_._variables.pushInfo.fcm.getToken = getToken;
                _SgmntfY_._pushInitFCMCallBack(${JSON.stringify(
                  campaign,
                )},${JSON.stringify(config)});
            `;
      document.body.appendChild(script);
    },
    _pushInitFCMCallBack: function (campaign, config) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register(config.swPath, { updateViaCache: 'none' })
          .then(function (reg) {
            _SgmntfY_._variables.pushInfo.serviceWorkerReg = reg;
            _SgmntfY_._pushInitPermissionCampaign(campaign, config);
          })
          .catch(function (e) {
            _SgmntfY_.LOG_MESSAGE(
              'ERROR',
              'Error while registering service worker ' + e,
            );
          });
      }
    },
    // GA methods
    GA: {
      activateTracker: function () {
        try {
          ++_SgmntfY_._variables.ga.activateTriedCount;
          if (
            _SgmntfY_._variables.ga.activateTriedCount >
            _SgmntfY_._variables.ga.activateTryCount
          ) {
            return;
          }

          var _tracker;
          // If GA4 is enabled, try to activate it first
          if (_SgmntfY_._variables.ga.ga4) {
            _tracker = Function('return ' + _SgmntfY_._variables.ga.tracker4)();
            if (!_tracker) {
              _SgmntfY_.LOG_MESSAGE(
                'WARN',
                'Error evaluating _SgmntfY_._variables.ga.tracker4, cannot evaluate ga4!',
              );
            } else {
              _SgmntfY_._variables.ga.activated = true;
              _SgmntfY_._variables.ga.tracker = _tracker;
            }
            return;
          }

          _tracker = Function('return ' + _SgmntfY_._variables.ga.tracker)();

          if (!_tracker) {
            _SgmntfY_.LOG_MESSAGE(
              'WARN',
              'Error evaluating _SgmntfY_._variables.ga.tracker, cannot evaluate ga!',
            );
          } else {
            if (_tracker.loaded) {
              _SgmntfY_._variables.ga.tracker = _tracker;
              if (_SgmntfY_._variables.ga.trackerName) {
                _SgmntfY_._variables.ga.activated = true;
              } else {
                var trackerList = _SgmntfY_._variables.ga.tracker.getAll();
                for (var i = 0; i < trackerList.length; i++) {
                  var tracker = trackerList[i];
                  if (tracker) {
                    _SgmntfY_._variables.ga.trackerName = tracker.get('name');
                    _SgmntfY_._variables.ga.activated = true;
                    break;
                  }
                }
              }
            }
          }
        } catch (err) {
          _SgmntfY_.LOG_MESSAGE(
            'ERROR',
            'Error evaluating _SgmntfY_._variables.ga.tracker: ' + err,
          );
        }
      },

      // dimension setter
      setDimension: function (name, data) {
        if (!_SgmntfY_._variables.ga.activated) {
          _SgmntfY_.GA.activateTracker();
          if (
            _SgmntfY_._variables.ga.activateTriedCount <
            _SgmntfY_._variables.ga.activateTryCount
          ) {
            _SgmntfY_.GA.setDimension(name, data);
          }
        }
        var trackerName = _SgmntfY_._variables.ga.trackerName;
        if (trackerName) {
          _SgmntfY_._variables.ga.tracker(trackerName + '.set', name, data);
        }
      },
      setGroup: function (group) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmGroup,
          group,
        );
        _SgmntfY_._variables.ga.activeGroup = group;
      },
      setUser: function (user) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmUser,
          user,
        );
      },
      setSession: function (session) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmSession,
          session,
        );
      },
      setPage: function (page) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmPage,
          page,
        );
      },
      setWidget: function (widget) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmWidget,
          widget,
        );
      },
      setProduct: function (product) {
        _SgmntfY_.GA.setDimension(
          _SgmntfY_._variables.ga.dimensions.sgmProduct,
          product,
        );
      },

      // event sender
      eventCategory: function () {
        if (_SgmntfY_._variables.ga.activeGroup) {
          return 'Segmentify.' + _SgmntfY_._variables.ga.activeGroup;
        }
        if (
          _SgmntfY_._variables.ga.group &&
          _SgmntfY_._variables.ga.group === 'CHECK'
        ) {
          _SgmntfY_.GA.getGroup(_SgmntfY_._getUserId(), _SgmntfY_.GA.setGroup);
        } else {
          var group =
            _SgmntfY_._variables.ga.groups[_SgmntfY_._variables.ga.group];
          if (group) {
            return 'Segmentify.' + group;
          } else {
            return 'Segmentify.' + _SgmntfY_._variables.ga.groups.unknown;
          }
        }
      },
      convertAndSend: function (_fields) {
        var isGA4Active = _SgmntfY_._variables.ga.ga4;
        // default event fields
        var fields;
        if (isGA4Active) {
          fields = {
            eventAction:
              'sgm_' + _fields.action.toLowerCase().replace(/ /g, '_'),
            event_label: _fields.label,
            event_value: _fields.value,
            non_interaction: true,
          };
        } else {
          fields = {
            eventCategory: _fields.category || _SgmntfY_.GA.eventCategory(),
            eventAction: _fields.action,
            eventLabel: _fields.label,
            eventValue: _fields.value,
            nonInteraction: true,
          };
        }

        // add custom dimensions
        if (_SgmntfY_._variables.ga.dimensions.sgmPage) {
          fields[_SgmntfY_._variables.ga.dimensions.sgmPage] =
            _SgmntfY_._variables.ga.activePage;
        }
        if (_fields.sgmWidget && _SgmntfY_._variables.ga.dimensions.sgmWidget) {
          fields[_SgmntfY_._variables.ga.dimensions.sgmWidget] =
            _fields.sgmWidget;
        }
        if (
          _fields.sgmProduct &&
          _SgmntfY_._variables.ga.dimensions.sgmProduct
        ) {
          fields[_SgmntfY_._variables.ga.dimensions.sgmProduct] =
            _fields.sgmProduct;
        }

        // send event
        _SgmntfY_.GA.sendEvent(fields);
      },
      sendEvent: function (request) {
        if (!_SgmntfY_._variables.ga.enabled) {
          return;
        }
        if (
          !request.eventCategory &&
          !request['event_category'] &&
          !_SgmntfY_._variables.ga.ga4
        ) {
          request.eventCategory = _SgmntfY_.GA.eventCategory();
          // add to segmentify event queue again
          _SgmntfY_._variables.segmentifyObj('ga:event', request);
          return;
        }
        // if ga not activated try to activate it before adding to queue again
        if (!_SgmntfY_._variables.ga.activated) {
          _SgmntfY_.GA.activateTracker();
        }
        var gaActivated = _SgmntfY_._variables.ga.activated;
        if (gaActivated) {
          if (_SgmntfY_._variables.ga.ga4) {
            // send prepared event-handlers to google-analytics with related/selected tracker
            const eventAction = request.eventAction;
            const requestWithoutEventAction = Object.assign({}, request);
            delete requestWithoutEventAction.eventAction;
            _SgmntfY_._variables.ga.tracker(
              'event',
              eventAction,
              requestWithoutEventAction,
            );
          } else {
            // send prepared event-handlers to google-analytics with related/selected tracker
            _SgmntfY_._variables.ga.tracker(
              _SgmntfY_._variables.ga.trackerName + '.send',
              'event',
              request,
            );
          }
        } else {
          if (
            _SgmntfY_._variables.ga.activateTriedCount <
            _SgmntfY_._variables.ga.activateTryCount
          ) {
            // add to segmentify event queue again
            _SgmntfY_._variables.segmentifyObj('ga:event', request);
          }
        }
      },
      // general
      sendPageView: function (category) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Page View',
          label: category || _SgmntfY_._variables.ga.activePage,
        });
      },
      // recommendation
      sendWidgetImpression: function (widgetName, widgetPosition) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Widget Impression',
          label: widgetName,
          sgmWidget: widgetPosition,
        });
      },
      sendWidgetView: function (widgetName, widgetPosition) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Widget View',
          label: widgetName,
          sgmWidget: widgetPosition,
        });
      },
      sendWidgetClick: function (widgetName, tabPosition) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Widget Click',
          label: widgetName,
          sgmWidget: tabPosition,
        });
      },
      sendArrowClick: function (widgetName, arrow) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Arrow Click',
          label: widgetName,
          sgmWidget: arrow,
        });
      },
      sendProductClick: function (widgetName, productId, productPosition) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Product Click',
          label: widgetName,
          sgmWidget: productId,
          sgmProduct: productPosition,
        });
      },
      sendQuickBasket: function (widgetName, productId, productPosition) {
        _SgmntfY_.GA.convertAndSend({
          action: 'Quick Basket',
          label: widgetName,
          sgmWidget: productId,
          sgmProduct: productPosition,
        });
      },

      // get current group
      getGroup: function (userId, callback) {
        // in case segmentify still not inited then return unknown group
        if (!_SgmntfY_._variables.apiKey) {
          return callback(_SgmntfY_._variables.ga.groups.unknown);
        }
        var endpoint =
          _SgmntfY_._getEventUrl() +
          '/v2/global/user/' +
          _SgmntfY_._variables.apiKey +
          '/' +
          userId;
        var _successCallback = function (data) {
          var result =
            data.customObject === 'REAL'
              ? _SgmntfY_._variables.ga.groups.groupA
              : _SgmntfY_._variables.ga.groups.control;
          _SgmntfY_._storePersistentData(
            _SgmntfY_._variables.ga.groupCookie,
            result,
            1,
          );
          callback(result);
        };
        var _errorCallback = function () {
          // default set to Segmentify active
          callback(_SgmntfY_._variables.ga.groups.unknown);
        };
        _SgmntfY_._getRequest(endpoint, {}, _successCallback, _errorCallback);
      },
    },
    // make get request
    _getRequest: function (_url, _headers, _successCallback, _errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', _url, true);
      xhr.responseType = 'json';
      xhr.timeout = 5000;
      for (var header in _headers || {}) {
        xhr.setRequestHeader(header, _headers[header]);
      }
      xhr.ontimeout = function (err) {
        _errorCallback();
      };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 400) {
            // check response to be json. IE will not automatically parse
            var responseData = xhr.response;
            try {
              if (typeof responseData === 'string') {
                responseData = JSON.parse(responseData);
              }
            } catch (err) {}
            _successCallback(responseData);
          }
          // error - timeout should be status = 0
          else {
            _errorCallback();
          }
        }
      };
      xhr.send();
    },
    _sourceOfUrl: function () {
      var source = '';
      var referrerOrUrl = document.referrer || document.URL;

      if (referrerOrUrl) {
        var gclid = _SgmntfY_._getQueryParameter('gclid');
        var utm_medium = _SgmntfY_._getQueryParameter('utm_medium');

        function socialMediaChannelMatch(valueOrBool) {
          var referrer = referrerOrUrl;

          var socialMediaChannels = [
            'facebook',
            'instagram',
            'pinterest',
            'snapchat',
            'tiktok',
            'twitter',
          ];

          if (!valueOrBool) {
            return socialMediaChannels.find(function (channel) {
              return referrer.indexOf(channel) > -1;
            });
          } else {
            return !!socialMediaChannels.find(function (channel) {
              return referrer.indexOf(channel) > -1;
            });
          }
        }

        function socialMediaReferrerChannel(matchedReferrer) {
          if (matchedReferrer) {
            var socialMediaConverter = {
              facebook: 'FACEBOOK',
              instagram: 'INSTAGRAM',
              pinterest: 'PINTEREST',
              snapchat: 'SNAPCHAT',
              twitter: 'TWITTER',
              tiktok: 'TIKTOK',
            };
            return {
              source: 'SOCIAL',
              subSource: socialMediaConverter[socialMediaChannelMatch(false)],
            };
          }
          return null;
        }

        if (socialMediaChannelMatch(true)) {
          return socialMediaReferrerChannel(document.referrer || document.URL);
        }

        if (gclid.length) {
          return 'PAID';
        }

        if (utm_medium.length) {
          switch (utm_medium) {
            case 'social':
              source = 'SOCIAL';
              break;
            case 'organic':
              source = 'SEARCH';
              break;
            case 'cpc':
            case 'cpm':
            case 'ocpm':
            case 'paid-media':
            case 'affiliate':
            case 'banner':
            case 'retargeting':
            case 'shopping':
              source = 'PAID';
              break;
            case 'email':
              source = 'EMAIL';
              break;
            case 'push':
            case 'webpush':
              source = 'PUSH';
              break;
            default:
              break;
          }
        }

        if (!source.length && _SgmntfY_._notNull(document.referrer)) {
          // extract domain from referrer
          var referrer = document.referrer
            .replace('https://', '')
            .replace('http://', '');
          referrer = referrer.substring(0, referrer.indexOf('/'));
          if (referrer.indexOf(_SgmntfY_._variables.domain) !== -1) {
            source = 'INTERNAL';
          } else if (socialMediaChannelMatch(referrer)) {
            source = socialMediaReferrerChannel(referrer);
          } else if (
            referrer.indexOf('google') !== -1 ||
            referrer.indexOf('g.co') !== -1 ||
            referrer.indexOf('bing') !== -1 ||
            referrer.indexOf('yandex') !== -1 ||
            referrer.indexOf('yahoo') !== -1
          ) {
            source = 'SEARCH';
          } else if (
            referrer.indexOf('cimri.com') !== -1 ||
            referrer.indexOf('akakce.com') !== -1 ||
            referrer.indexOf('ucuzcu.com') !== -1 ||
            referrer.indexOf('bilio.com') !== -1 ||
            referrer.indexOf('auspreiser.de') !== -1 ||
            referrer.indexOf('billiger.de') !== -1 ||
            referrer.indexOf('dooyoo.de') !== -1 ||
            referrer.indexOf('geizhals.de') !== -1 ||
            referrer.indexOf('guenstiger.de') !== -1 ||
            referrer.indexOf('idealo.de') !== -1 ||
            referrer.indexOf('kelkoo.de') !== -1 ||
            referrer.indexOf('preis.de') !== -1 ||
            referrer.indexOf('preissuchmaschine.de') !== -1 ||
            referrer.indexOf('geizkragen.de') !== -1 ||
            referrer.indexOf('preisvergleich.de') !== -1 ||
            referrer.indexOf('preisroboter.de') !== -1 ||
            referrer.indexOf('vergelijk.be') !== -1 ||
            referrer.indexOf('pazaruvaj') !== -1 ||
            referrer.indexOf('nabava.net') !== -1 ||
            referrer.indexOf('ceneje.si') !== -1 ||
            referrer.indexOf('heureka') !== -1 ||
            referrer.indexOf('pricerunner') !== -1 ||
            referrer.indexOf('hinnavaatlus') !== -1 ||
            referrer.indexOf('skroutz.gr') !== -1 ||
            referrer.indexOf('agrep.hu') !== -1 ||
            referrer.indexOf('arukereso.hu') !== -1 ||
            referrer.indexOf('trovaprezzi.it') !== -1 ||
            referrer.indexOf('prisjakt.no') !== -1 ||
            referrer.indexOf('prisguiden.no') !== -1 ||
            referrer.indexOf('ceneo.pl') !== -1 ||
            referrer.indexOf('kuantokusta.pt') !== -1 ||
            referrer.indexOf('compari.ro') !== -1
          ) {
            source = 'LISTING';
          }
        }
        if (!source.length) {
          source = 'OTHER';
        }
      }
      return source;
    }, // add serialize form method
    _enableSerializeForm: function ($) {
      if ($.fn.sgmSerializeForm) return;
      $.fn.sgmSerializeForm = function () {
        'use strict';

        var result = {};
        var extend = function (i, element) {
          var node = result[element.name];

          // If node with same name exists already, need to convert it to an array as it
          // is a multi-value field (i.e., checkboxes)

          if ('undefined' !== typeof node && node !== null) {
            if ($.isArray(node)) {
              node.push(element.value);
            } else {
              result[element.name] = [node, element.value];
            }
          } else {
            result[element.name] = element.value;
          }
        };

        $.each(this.serializeArray(), extend);

        // convert array into joined strings
        $.each(result, function (key, value) {
          if (
            'undefined' !== typeof value &&
            value !== null &&
            $.isArray(value)
          ) {
            result[key] = value.join();
          }
        });

        return result;
      };
    },
    // Initializers
    init: function () {
      // get Segmentify object
      _SgmntfY_._variables.namespace = window['SegmentifyTrackingObject'];
      _SgmntfY_._variables.segmentifyObj =
        window[_SgmntfY_._variables.namespace];
      // check tracking
      var _tracking = _SgmntfY_._getQueryParameter('_sgm_tracking');
      if (_SgmntfY_._isNotEmpty(_tracking)) {
        _SgmntfY_._setTracking(_tracking);
      }
      if ('disabled' === _SgmntfY_._getTracking()) {
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          'End-user opted-out Segmentify tracking!',
        );
        return;
      }
      if (
        !_SgmntfY_._notNull(_SgmntfY_._variables.segmentifyObj) ||
        !_SgmntfY_._notNull(_SgmntfY_._variables.segmentifyObj.q)
      ) {
        ++_SgmntfY_._variables.initTryCount;
        if (
          _SgmntfY_._variables.initTryCount > _SgmntfY_._variables.initTryLimit
        ) {
          /*console.error("Segmentify initialization code error, namespace: " + _SgmntfY_._variables.namespace);*/
          window.clearTimeout(_SgmntfY_._variables.initTimer);
          return;
        }
        window.clearTimeout(_SgmntfY_._variables.initTimer);
        _SgmntfY_._variables.initTimer = window.setTimeout(_SgmntfY_.init, 100);
      } else {
        if (_SgmntfY_._variables.initTimer) {
          window.clearTimeout(_SgmntfY_._variables.initTimer);
        }
        _SgmntfY_.modernize();
        _SgmntfY_.LOG_MESSAGE('DEBUG', '*** Segmentify is loading... ***');
        // merge defaults with user given parameters
        _SgmntfY_._extend(
          true,
          _SgmntfY_._variables,
          _SgmntfY_._variables.segmentifyObj.config,
        );
        _SgmntfY_._functions.setLogLevel(_SgmntfY_._variables.logLevel);

        // check domain is set
        if (
          !(
            _SgmntfY_._variables.domain &&
            document.URL.indexOf(_SgmntfY_._variables.domain) >= 0
          )
        ) {
          console.error(
            'Segmentify domain is not set properly: ' +
              _SgmntfY_._variables.domain,
          );
          return;
        }

        // initialize variables
        window.onpagehide = _SgmntfY_._windowPageHide;
        // load necessary libraries
        if (_SgmntfY_._variables.jq == null) {
          _SgmntfY_._loadJavascript(
            _SgmntfY_._variables.jQueryUrl,
            true,
            function () {
              _SgmntfY_._variables.jq = jQuery.noConflict(true);
              _SgmntfY_._enableSerializeForm(_SgmntfY_._variables.jq);
              _SgmntfY_._initializeDelayedActions();
              _SgmntfY_._initializeDelayedCampaigns();
              _SgmntfY_._initializePageViewsCampaigns();
              _SgmntfY_._sendTrackedEvent();
              _SgmntfY_._segmentifyIdentifyUser();
              _SgmntfY_._setTestMode();
              _SgmntfY_._setQaMode();
            },
          );
        } else {
          if (
            !_SgmntfY_._checkVersion('1.7', _SgmntfY_._variables.jq.fn.jquery)
          ) {
            console.error('Segmentify requires jQuery version >= 1.7');
            return;
          }
          _SgmntfY_._enableSerializeForm(_SgmntfY_._variables.jq);
          _SgmntfY_._initializeDelayedActions();
          _SgmntfY_._initializeDelayedCampaigns();
          _SgmntfY_._initializePageViewsCampaigns();
          _SgmntfY_._sendTrackedEvent();
          _SgmntfY_._segmentifyIdentifyUser();
          _SgmntfY_._setTestMode();
          _SgmntfY_._setQaMode();
        }

        if (
          _SgmntfY_._variables.doNotTrack === false &&
          _SgmntfY_._variables.pa.loaded === false
        ) {
          _SgmntfY_._loadJavascript(
            _SgmntfY_._variables.paUrl,
            true,
            function () {
              _SgmntfY_._variables.pa.loaded = true;
              _SgmntfY_._variables.pa.data = __PA.default;
            },
          );

          // When the PA methods 5 frequency times still not loaded, skip the loading
          setTimeout(function () {
            if (_SgmntfY_._variables.pa.loaded === false) {
              _SgmntfY_._variables.pa.loaded = true;
              _SgmntfY_._variables.pa.disabled = true;
            }
          }, _SgmntfY_._variables.constants.frequency * 5);
        }

        if (_SgmntfY_._variables.mustache == null) {
          _SgmntfY_._variables.mustache = {};
          initializeMustache(_SgmntfY_._variables.mustache);
          _SgmntfY_._variables.mustache.tags = ['[[', ']]'];
        }

        // Get Browser & Device Info
        _SgmntfY_._updateBrowserAndDeviceInfo();

        // run loop
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          '*** Running on a ' + _SgmntfY_._variables.ua.type + ' ***',
        );
        _SgmntfY_.LOG_MESSAGE(
          'DEBUG',
          '*** Segmentify loaded and started... ***',
        );
        _SgmntfY_.run();

        // tell the whole world segmentify is inited
        _SgmntfY_._dispatchInitEvent();
        // dispatch Identify
      }
    },
    _initializeDelayedActions: function () {
      try {
        // get delayed actions and reset
        var delayedActions = _SgmntfY_._getDelayedActions();
        _SgmntfY_._setDelayedActions([]);
        // try to re-add them
        var currentDate = new Date();
        for (var i = 0; i < delayedActions.length; i++) {
          delayedActions[i].delayDate = new Date(delayedActions[i].delayDate);
          if (delayedActions[i].delayDate.getTime() > currentDate.getTime()) {
            _SgmntfY_._addDelayedAction(delayedActions[i]);
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          "Can't initialize delayed actions: " + err,
        );
      }
    },
    _initializeDelayedCampaigns: function () {
      try {
        // get delayed campaigns and reset
        var delayedCampaigns = _SgmntfY_._getDelayedCampaigns();
        _SgmntfY_._setDelayedCampaigns([]);
        // try to re-add them
        var currentTime = new Date();
        for (var i = 0; i < delayedCampaigns.length; ++i) {
          delayedCampaigns[i]['time'] = new Date(delayedCampaigns[i]['time']);
          if (delayedCampaigns[i]['time'].getTime() > currentTime.getTime()) {
            _SgmntfY_._addDelayedCampaign(delayedCampaigns[i]);
          }
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          "Can't initialize delayed campaigns: " + err,
        );
      }
    },
    _initializePageViewsCampaigns: function () {
      try {
        var pageViewCampaigns = _SgmntfY_._getPageViewsCampaigns();
        for (var i = 0; i < pageViewCampaigns.length; ++i) {
          pageViewCampaigns[i]['pageView'] =
            pageViewCampaigns[i]['pageView'] - 1;
          _SgmntfY_._setPageViewsCampaigns(pageViewCampaigns);
          _SgmntfY_._triggerPageViewsCampaign(pageViewCampaigns[i]);
        }
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE(
          'ERROR',
          "Can't initialize pageview campaigns: " + err,
        );
      }
    },
    _dispatchInitEvent: function () {
      try {
        if (window.dispatchEvent) {
          var detailObj = {
            testMode: _SgmntfY_._getTestMode(),
            qaMode: _SgmntfY_._getQaMode(),
          };
          window.dispatchEvent(
            new CustomEvent('segmentifyInited', { detail: detailObj }),
          );
        }
      } catch (err) {}
    },
    _segmentifyIdentifyUser: function () {
      var utm_code = _SgmntfY_._getQueryParameter('utm_code');
      if (utm_code) {
        try {
          _SgmntfY_._variables.segmentifyObj('user:identify', {
            triggerType: 'withUtmCode',
          });
        } catch (e) {
          console.log('Error Segmentify Cannot Identify User: ', e);
        }
      }
    },
    // Request Loggers
    _ajaxError: function (request, jqXHR, textStatus, errorThrown) {
      _SgmntfY_.LOG_MESSAGE(
        'WARN',
        'Error in sending event:\n' +
          'Event Data: ' +
          JSON.stringify(request.data) +
          '\n' +
          'Response: ' +
          jqXHR.responseText +
          '\n' +
          'Status: ' +
          textStatus +
          '\n' +
          'Error: ' +
          errorThrown,
      );
    },
    _ajaxSuccess: function (requestData, responseData, textStatus) {
      _SgmntfY_.LOG_MESSAGE(
        'DEBUG',
        'Success in sending event:\n' +
          'Event Data: ' +
          JSON.stringify(requestData) +
          '\n' +
          'Status: ' +
          textStatus +
          '\n' +
          'Response Data: ' +
          JSON.stringify(responseData),
      );
    },
    // Document PageHide Function To Store all events to cookie
    _windowPageHide: function () {
      // set pageHide true
      _SgmntfY_._variables.isPageHide = true;
      // cancel run timer
      window.clearTimeout(_SgmntfY_._variables.runTimer);
      // first add normal event queue
      var q = [];
      while (_SgmntfY_._variables.segmentifyObj.q.length > 0) {
        try {
          var command = _SgmntfY_._variables.segmentifyObj.q.shift();
          var commandFunction = _SgmntfY_._functions.getFunction(command[0]);
          var commandArguments = Array.prototype.slice.call(command, 1);
          var ev = commandFunction.apply(null, commandArguments);
          ev.originalParams.discardResponse = 'true';
          q.push(ev);
        } catch (err) {}
      }
      // second add retry queue
      var rq = _SgmntfY_._getRetryQueue();
      while (rq.length > 0) {
        try {
          var ev = rq.shift();
          ev.originalParams.discardResponse = 'true';
          q.push(ev);
        } catch (err) {}
      }
      // store all events in storage
      _SgmntfY_._setRetryQueue(q);
    },
    // run - process messages in queue
    run: function () {
      try {
        var paStatus;

        if (_SgmntfY_._variables.pa.wait === true) {
          paStatus = _SgmntfY_._variables.pa.loaded === true;
        } else {
          paStatus = true;
        }

        // if jQuery not loaded or queue not created, wait for it
        if (
          _SgmntfY_._variables.jq &&
          paStatus &&
          ((_SgmntfY_._variables.segmentifyObj.q &&
            _SgmntfY_._variables.segmentifyObj.q.length > 0) ||
            _SgmntfY_._getDataLayer())
        ) {
          if (
            !_SgmntfY_._variables.waitingKeys &&
            _SgmntfY_._variables.keysTryCount < 5
          ) {
            // update user & session id if necessary
            var requiredKeyCount = 0;
            if (_SgmntfY_._variables.doNotTrack === false) {
              var userId = _SgmntfY_._getUserId();
              var sessionId = _SgmntfY_._getSessionId();
              if (_SgmntfY_._isEmpty(userId)) requiredKeyCount = 2;
              else if (_SgmntfY_._isEmpty(sessionId)) requiredKeyCount = 1;
              else if (
                _SgmntfY_._isNotEmpty(sessionId) &&
                _SgmntfY_._variables.segmentifyObj.q.length > 0
              ) {
                _SgmntfY_._storePersistentData(
                  _SgmntfY_._variables.sessionStorageKey,
                  sessionId,
                  0,
                  _SgmntfY_._variables.storage.session.local,
                );
                _SgmntfY_._storePersistentData(
                  _SgmntfY_._variables.userStorageKey,
                  userId,
                  390,
                  _SgmntfY_._variables.storage.user.local,
                );
              }
            }
            if (requiredKeyCount > 0) {
              _SgmntfY_._updateUserAndSessionId(requiredKeyCount);
            } else {
              // if not waiting status, normal operation
              if (
                _SgmntfY_._variables.segmentifyObj.q &&
                _SgmntfY_._variables.segmentifyObj.q.length > 0
              ) {
                var commands = _SgmntfY_._variables.segmentifyObj.q.splice(
                  0,
                  _SgmntfY_._variables.segmentifyObj.q.length,
                );
                _SgmntfY_._functions.callFunction(commands);
              }
              if (_SgmntfY_._getDataLayer()) {
                _SgmntfY_._consumeDataLayer();
              }
            }
          }
        }
        // after queue empty invoke again
        window.clearTimeout(_SgmntfY_._variables.runTimer);
        _SgmntfY_._variables.runTimer = window.setTimeout(
          _SgmntfY_.run,
          _SgmntfY_._variables.constants.frequency,
        );
      } catch (err) {
        _SgmntfY_.LOG_MESSAGE('ERROR', 'Error in run: ' + err);
        // after error invoke again
        window.clearTimeout(_SgmntfY_._variables.runTimer);
        _SgmntfY_._variables.runTimer = window.setTimeout(
          _SgmntfY_.run,
          _SgmntfY_._variables.constants.frequency,
        );
      }
    },
    modernize: function () {
      // string startsWith
      if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (prefix) {
          return this.lastIndexOf(prefix, 0) === 0;
        };
      }

      // string endsWith
      if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
      }

      // string trim
      if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
          return this.replace(/^\s+|\s+$/g, '');
        };
      }

      // Array indexOf
      if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var O = Object(this);
          var len = O.length >>> 0;
          if (len === 0) {
            return -1;
          }

          var n = +fromIndex || 0;
          if (Math.abs(n) === Infinity) {
            n = 0;
          }
          if (n >= len) {
            return -1;
          }

          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (k in O && O[k] === searchElement) {
              return k;
            }
            k++;
          }
          return -1;
        };
      }

      // Array map
      if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {
          var T, A, k;
          if (this == null) {
            throw new TypeError(' this is null or not defined');
          }
          var O = Object(this);
          var len = O.length >>> 0;
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          if (arguments.length > 1) {
            T = thisArg;
          }
          A = new Array(len);
          k = 0;
          while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
              kValue = O[k];
              mappedValue = callback.call(T, kValue, k, O);
              A[k] = mappedValue;
            }
            k++;
          }
          return A;
        };
      }

      // JSON stringify ensure
      var __original_json_stringify__ = JSON.stringify;
      JSON.stringify = function (value, replacer, space) {
        // store original
        var arrayToJSON = Array.prototype.toJSON;
        var numberToJSON = Number.prototype.toJSON;
        var stringToJSON = String.prototype.toJSON;
        // delete them
        delete Number.prototype.toJSON;
        delete Array.prototype.toJSON;
        delete String.prototype.toJSON;
        // calculate
        var result = undefined;
        try {
          result = __original_json_stringify__(value, replacer, space);
        } catch (err) {
          result = undefined;
        }
        // restore
        if (arrayToJSON) Array.prototype.toJSON = arrayToJSON;
        if (numberToJSON) Number.prototype.toJSON = numberToJSON;
        if (stringToJSON) String.prototype.toJSON = stringToJSON;

        return result;
      };

      if (typeof window.CustomEvent !== 'function') {
        function CustomEvent(event, params) {
          params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined,
          };
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail,
          );
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
      }
    },
    LOG_MESSAGE: function (logLevel, message) {
      var currentLevel = _SgmntfY_._variables.logLevel;
      var logLevelObject = _SgmntfY_.LOG_LEVELS[logLevel];
      if (
        typeof logLevelObject != 'undefined' &&
        logLevelObject <= currentLevel
      ) {
        console.log('Segmentify[' + logLevel + ']: ' + message);
      }
    },
    _experiment: {
      /**
       * String formatted experiments.
       * Contains: EXPERIMENT ID, VARIATION ID, MODULE NAME
       * @typedef {string} ExperimentString
       */

      /**
       * Json formatted experiments.
       * @typedef {object} ExperimentJson
       */

      /**
       * Allows converting object formatted experiments to supported string
       * format
       * @param {ExperimentJson} experiments Object formatted experiments
       * @return {ExperimentString} String formatted experiments
       */
      toString: function (experiments) {
        try {
          var config = _SgmntfY_._experiment.config;
          var keys = Object.keys(config.modules);
          var formatted = [];

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            for (var id in experiments[key]) {
              if (Object.prototype.hasOwnProperty.call(experiments[key], id)) {
                var value = experiments[key][id];
                var module = config.modules[key];
                formatted.push([id, value, module].join(config.seperator.sub));
              }
            }
          }

          return formatted.join(config.seperator.items);
        } catch (error) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in converting experiments to string: ' + error,
          );
        }
      },
      /**
       * Allows converting supported string format to object format.
       * @param {ExperimentString} experiments String formatted experiments
       * @return {ExperimentJson} Object formatted experiments
       */
      toJson: function (experiments) {
        try {
          if (experiments === null || experiments === '') return {};

          var config = _SgmntfY_._experiment.config;
          var list = experiments.split(config.seperator.items);
          var modules = Object.fromEntries(
            Object.entries(config.modules).map(function (entry) {
              return [entry[1], entry[0]];
            }),
          );
          var response = {};

          for (var i = 0; i < list.length; i++) {
            var experiment = list[i].split(config.seperator.sub);

            var id = experiment[0];
            var value = experiment[1];
            var module = experiment[2];

            if (typeof response[modules[module]] === 'undefined') {
              response[modules[module]] = {};
            }
            response[modules[module]][id] = value;
          }

          return response;
        } catch (error) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in converting experiments to JSON: ' + error,
          );
        }
      },
      /**
       * Allows to store experiments
       * @param {ExperimentString} experiments String formatted experiments
       */
      store: function (experiments) {
        var config = _SgmntfY_._experiment.config;

        _SgmntfY_.LOG_MESSAGE(
          'INFO',
          'Experiment stored: [' + experiments + ']',
        );

        _SgmntfY_._storePersistentData(
          config.storage.name,
          experiments,
          config.storage.expire,
        );
      },
      /**
       * Able to get active experiments
       * @return {ExperimentString} String formatted experiments
       */
      get: function () {
        var config = _SgmntfY_._experiment.config;

        return _SgmntfY_._getPersistentData(config.storage.name);
      },
      /**
       * This method able to change experiment group
       * @param {ExperimentString} experiment {{EXPERIMENT ID}}:{{NEW GROUP}}
       */
      preview: function (experiment) {
        try {
          var config = _SgmntfY_._experiment.config;

          var exp =
            experiment || _SgmntfY_._getQueryParameter('_sgf_experiment');
          if (exp === '') return;

          var id = exp.split(config.seperator.sub)[0];
          var value = exp.split(config.seperator.sub)[1];

          var keys = Object.keys(config.modules);
          var experiments = _SgmntfY_._experiment.toJson(
            _SgmntfY_._experiment.get(),
          );

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (typeof experiments[key] !== 'undefined') {
              if (typeof experiments[key][id] !== 'undefined') {
                experiments[key][id] = value;

                if (
                  _SgmntfY_._experiment.toString(experiments) !==
                  _SgmntfY_._experiment.get()
                ) {
                  _SgmntfY_.LOG_MESSAGE(
                    'INFO',
                    'Experiment "' +
                      id +
                      '" group changed to the "' +
                      value +
                      '"',
                  );
                  _SgmntfY_._experiment.store(
                    _SgmntfY_._experiment.toString(experiments),
                  );
                }
              }
            }
          }
        } catch (error) {
          _SgmntfY_.LOG_MESSAGE(
            'WARN',
            'Error in experiments preview: ' + error,
          );
        }
      },
      /**
       * Initialize experiments.
       * @return {ExperimentJson} Json formatted experiments
       */
      init: function () {
        _SgmntfY_._experiment.preview();
        return _SgmntfY_._experiment.toJson(_SgmntfY_._experiment.get()) || {};
      },
      config: {
        storage: {
          name: '_sgf_exp',
          expire: 30,
        },
        queryName: '_sgf_experiment',
        modules: {
          RECOMMENDATION: 'R',
          SEARCH: 'S',
          PUSH: 'P',
          BT: 'B',
        },
        seperator: {
          items: '|',
          sub: ':',
        },
      },
    },
  });

  // initialize Segmentify
  _SgmntfY_.init();
})(window);
