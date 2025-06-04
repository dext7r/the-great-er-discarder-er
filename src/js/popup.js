// @ts-check

(function () {

  'use strict';

  /**
   * 加载i18n文本到页面元素
   */
  function loadI18nMessages() {
    // 加载所有带有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n');
      if (messageKey) {
        const message = chrome.i18n.getMessage(messageKey);
        if (message) {
          element.textContent = message;
        }
      }
    });

    // 设置页面标题
    const title = chrome.i18n.getMessage('popupTitle');
    if (title) {
      document.title = title;
    }
  }

  /**
   * @param {string} status
   * @param {string} modeLabel
   */
  function setStatus(status, modeLabel) {
    var statusDetail = '',
      statusIconClass = '',
      message;

    if (status === 'normal') {
      statusDetail = chrome.i18n.getMessage('statusNormal', [modeLabel]);
      statusIconClass = 'fa fa-clock-o';

    } else if (status === 'special') {
      statusDetail = chrome.i18n.getMessage('statusSpecial', [modeLabel]);
      statusIconClass = 'fa fa-remove';

    } else if (status === 'whitelisted') {
      statusDetail = chrome.i18n.getMessage('statusWhitelisted');
      statusIconClass = 'fa fa-check';
      message = 'removeWhitelist';

    } else if (status === 'audible') {
      statusDetail = chrome.i18n.getMessage('statusAudible');
      statusIconClass = 'fa fa-volume-up';

    } else if (status === 'pinned') {
      statusDetail = chrome.i18n.getMessage('statusPinned');
      statusIconClass = 'fa fa-thumb-tack';

    } else if (status === 'tempWhitelist') {
      statusDetail = chrome.i18n.getMessage('statusTempWhitelist', [modeLabel]);
      statusIconClass = 'fa fa-pause-circle';
      message = 'undoTempWhitelist';

    } else if (status === 'never') {
      statusDetail = chrome.i18n.getMessage('statusNever', [modeLabel]);
      statusIconClass = 'fa fa-ban';

    } else if (status === 'noConnectivity') {
      statusDetail = chrome.i18n.getMessage('statusNoConnectivity');
      statusIconClass = 'fa fa-pause-circle';

    } else if (status === 'charging') {
      statusDetail = chrome.i18n.getMessage('statusCharging');
      statusIconClass = 'fa fa-pause-circle';
    }

    setVisibility('header', true);
    const detailElem = document.getElementById('statusDetail');
    if (detailElem) {
      detailElem.innerHTML = statusDetail;
    }
    const iconElem = document.getElementById('statusIcon');
    if (iconElem) {
      iconElem.className = statusIconClass;
    }

    const linkElem = document.getElementsByTagName('a')[0];
    if (message) {
      linkElem.onclick = () => {
        chrome.runtime.sendMessage({ action: message });
        window.close();
      };
    }
  }

  /**
   * @param {string} id
   * @param {string} str
   */
  function setInnerHTML(id, str) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.innerHTML = str;
    }
  }
  /**
   * @param {string} id
   * @param {boolean} visible
   */
  function setVisibility(id, visible) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.style.display = visible ? 'block' : 'none';
    }
  }

  function setVisibilityForSelectedGroup() {
    chrome.tabs.query({ highlighted: true, lastFocusedWindow: true }, function (tabs) {
      setVisibility('discardSelectedGroup', tabs && tabs.length > 1);
    });
  }

  /**
   * @param {object} options
   */
  function setEligibleOptions(options) {
    var menu = document.getElementById('discardAllEligible');
    var div = document.getElementById('eligibleText');
    if (menu && div) {
      var aExcludes = [];
      if (options.dontDiscardPinned) aExcludes.push(chrome.i18n.getMessage('skipPinned'));
      if (options.dontDiscardAudio) aExcludes.push(chrome.i18n.getMessage('skipAudio'));
      if (aExcludes.length) {
        menu.style.display = 'block';
        const skipText = chrome.i18n.getMessage('skipText', [aExcludes.join(chrome.i18n.getMessage('and'))]);
        div.innerText = skipText;
      }
      else {
        menu.style.display = 'none';
      }
    }
  }

  /**
   * @param {boolean} value
   */
  function setModeLabels(value) {
    // console.log('setModeLabels');
    document.querySelectorAll('span.modeLabel').forEach((element) => {
      element.innerHTML = value ? chrome.i18n.getMessage('suspend') : chrome.i18n.getMessage('discard');
    });
  }

  /**
   * @param {string} idMessage
   */
  function addClickListener(idMessage) {
    document.getElementById(idMessage)?.addEventListener('click', function (e) {
      // console.log(`click ${idMessage}`);
      chrome.runtime.sendMessage({ action: idMessage });
      window.close();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {

    // 首先加载i18n文本
    loadI18nMessages();

    addClickListener('discardOne');
    addClickListener('suspendOne');
    addClickListener('discardAll');
    addClickListener('discardAllEligible');
    addClickListener('reloadAll');
    addClickListener('discardSelected');
    addClickListener('suspendSelected');
    addClickListener('reloadSelected');
    addClickListener('whitelist');
    addClickListener('tempWhitelist');
    addClickListener('openOptionsTab');
    addClickListener('openDiscardsTab');
    addClickListener('openProfilerTab');
    addClickListener('debugReload');

    chrome.runtime.sendMessage({ action: 'requestCurrentTabInfo' }, function (info) {
      // console.log('requestCurrentTabInfo', info);

      chrome.runtime.sendMessage({ action: 'requestCurrentOptions' }, function (options) {
        // console.log('requestCurrentOptions', options);
        setModeLabels(options.suspendMode);
        setVisibility('showDiscardsLinkGroup', options.addDiscardsMenu);
        setEligibleOptions(options);

        var status = info.status,
          //timeLeft = info.timerUp, // unused
          discardOneVisible = (status === 'discarded' || status === 'special' || status === 'unknown') ? false : true,
          whitelistVisible = (status !== 'whitelisted' && status !== 'special') ? true : false,
          pauseVisible = (status === 'normal') ? true : false;

        setVisibilityForSelectedGroup();
        setVisibility('currentGroup', discardOneVisible || whitelistVisible || pauseVisible);
        setVisibility('discardOne', discardOneVisible);
        setVisibility('suspendOne', discardOneVisible);  // set suspendOne visibility same as discardOne
        setVisibility('whitelist', whitelistVisible);
        setVisibility('tempWhitelist', pauseVisible);
        setVisibility('debugReload', !(chrome.runtime.getManifest().update_url));

        const modeLabel = options.suspendMode ? chrome.i18n.getMessage('suspend') : chrome.i18n.getMessage('discard');
        setStatus(status, modeLabel);

        chrome.commands.getAll(function (commands) {
          console.log('commands', commands);
          for (const command of commands) {
            if (command.shortcut && command.name === '1-discard-tab') {
              setInnerHTML('discardShortcut', command.shortcut);
            }
            if (command.shortcut && command.name === '2-suspend-tab') {
              setInnerHTML('suspendShortcut', command.shortcut);
            }
          }
        });

        setTimeout(() => {
          chrome.runtime.sendMessage({ action: 'requestDiscardStats' }, function (stats) {
            // console.log('requestDiscardStats', stats);
            const out = [];
            if (stats.discarded) out.push(`${stats.discarded} ${chrome.i18n.getMessage('discard')}`);
            if (stats.suspended) out.push(`${stats.suspended} ${chrome.i18n.getMessage('suspend')}`);
            if (out.length) {
              setInnerHTML('discardStats', ` &nbsp; ( ${out.join(', ')} )`);
            }
          });
        }, 200);

      });

    });
  });

}());
