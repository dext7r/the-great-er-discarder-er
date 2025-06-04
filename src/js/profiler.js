// @ts-check

import { log, warn } from './log.js';

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
    const title = chrome.i18n.getMessage('profilerTitle');
    if (title) {
      document.title = title;
      const gsTitle = document.getElementById('gsTitle');
      if (gsTitle) {
        gsTitle.textContent = title;
      }
    }
  }

  const browser = navigator.userAgent.match(/Chrome\/.*Edg\//i) ? 'edge' : 'chrome';
  let windows = {};


  /**
   * @param {HTMLTableSectionElement} table
   * @param {object}  info
   * @param {boolean} first
   */
  function generateTabInfo(table, info, first) {
    // log('generateTabInfo');

    const
      windowId = info?.windowId ?? '?',
      tabId = info?.tabId ?? '?',
      groupId = info?.groupId > 0 ? info?.groupId : '',
      groupName = info?.group?.title,
      groupColor = info?.group?.color ?? '',
      pinned = info?.pinned ? '<i class="fa fa-thumb-tack"></i>' : '',
      tabTitle = info?.tab.title ?? chrome.i18n.getMessage('unknown') || 'unknown',
      tabStatus = info?.status ?? chrome.i18n.getMessage('unknown') || 'unknown',
      tabURL = info?.tabUrl ?? '?',
      tabTimer = info?.timerUp ?? '';

    const displayMap = {
      'audible': `<span> <i class="fa fa-volume-up"></i> ${chrome.i18n.getMessage('audible') || 'audible'} </span>`,
      'discarded': `<span class="dim"> <i class="fa fa-recycle"></i> ${chrome.i18n.getMessage('discarded') || 'discarded'} </span>`,
      'suspended': `<span class="dim"> &#x1F4A4; ${chrome.i18n.getMessage('suspended') || 'suspended'} </span>`,
    }

    // log('5 tab info', groupId, groupName, groupColor);

    const row = table.insertRow();
    if (first) {
      row.className = 'newrow';
    }

    // let win       = '';
    if (!windows[windowId]) {
      windows[windowId] = 1;
      const link = document.createElement('a');
      link.href = '#';
      const windowText = chrome.i18n.getMessage('windowNumber', [Object.keys(windows).length.toString()]) || `Window ${Object.keys(windows).length}`;
      link.innerText = windowText;
      link.onclick = () => {
        chrome.windows.update(windowId, { focused: true });
        return false;
      }
      row.insertCell().appendChild(link);
      // win = `<a href="#" target="_blank"></a>`;
    }
    else {
      row.insertCell();
    }

    // row.insertCell().innerText = tabId;

    const group = row.insertCell();
    group.className = 'center';
    group.innerHTML = groupName ? `<span class="group ${browser} ${groupColor}">${groupName}</span>` : groupId;

    const title = row.insertCell();
    title.className = 'title';
    title.setAttribute('title', tabURL);
    title.innerText = tabTitle;

    const timer = row.insertCell();
    timer.className = 'center';
    timer.innerText = tabTimer;

    row.insertCell().innerHTML = displayMap[tabStatus] || tabStatus;
    row.insertCell().innerHTML = pinned;
  }

  /**
   * @param {object|null} groupMap
   */
  function generateRows(groupMap = null) {
    // log('generateRows');
    document.documentElement.style.cursor = 'progress';

    // log('4 main loop', groupMap);

    const tableEl = document.getElementById('profileTabTableBody');
    if (!(tableEl instanceof HTMLTableSectionElement)) return;
    tableEl.innerHTML = '';

    // Wait 100ms to allow the table to visually clear and the cursor to update
    setTimeout(async () => {
      const windows = new Map();
      const tabs = await chrome.tabs.query({});

      for (let i = 0; i < tabs.length; ++i) {
        const curTab = tabs[i];
        if (!windows.has(curTab.windowId)) {
          windows.set(curTab.windowId, []);
        }
        const win = windows.get(curTab.windowId);

        const discardInfo = await chrome.runtime.sendMessage({ action: 'requestTabInfo', tab: curTab });
        discardInfo.tab = curTab;
        if (groupMap) {
          discardInfo.group = groupMap[discardInfo.groupId];
        }
        win.push(discardInfo);
      }

      for (const winId of Array.from(windows.keys()).sort()) {
        const infos = windows.get(winId);
        let first = true;
        for (const discardInfo of infos) {
          generateTabInfo(tableEl, discardInfo, first);
          first = false;
        }
      }
      document.documentElement.style.cursor = 'default';
    }, 100);
  }

  function generateTable() {

    windows = {};

    // log('1 perms');
    chrome.permissions.contains({ permissions: ['tabGroups'] }, async (fShowGroups) => {

      if (fShowGroups) {

        const groupsEl = document.getElementById('enableTabGroups');
        if (groupsEl) groupsEl.style.display = 'none';

        // log('2 tabGroups', chrome.tabGroups);
        const groupMap = {};
        chrome.tabGroups?.query({}, function (groups) {
          groups.forEach((group) => {
            groupMap[group.id] = group;
          });
          generateRows(groupMap);
        });
        // log('3 tabGroups', chrome.tabGroups);

      }
      else {
        generateRows();
      }

    });
  }


  window.onload = function () {

    // 首先加载i18n文本
    loadI18nMessages();

    const refreshEl = document.getElementById('refreshProfiler');
    if (refreshEl) {
      refreshEl.onclick = function (e) {
        generateTable();
        return false;
      };
    }

    const groupsEl = document.getElementById('enableTabGroups');
    if (groupsEl) {
      groupsEl.onclick = function (e) {
        chrome.permissions.request({ permissions: ['tabGroups'] }, (fAccepted) => {
          generateTable();
        });
        return false;
      };
    }

    window.onfocus = () => {
      generateTable();
    }

    window.setTimeout(() => {
      generateTable();
    }, 100);

    /*
    chrome.processes.onUpdatedWithMemory.addListener(function (processes) {
      chrome.tabs.query({}, function (tabs) {
        var html = '';
        html += generateMemStats(processes);
        html += '<br />';
        html += generateTabStats(tabs);
        document.getElementById('profileTabTable').innerHTML = html;
      });
    });
    */
  };
}());
