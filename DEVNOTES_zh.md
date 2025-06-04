# <img src="./src/img/icon48.png" align="left" /> The Great-*er* Tab Discarder

**中文翻译版本 / Chinese Translation Version**

> **修改声明 / Modification Notice:**  
> 本文件是原英文版DEVNOTES.md的中文翻译版本，由用户于2025年6月进行汉化修改。  
> This file is a Chinese translation of the original English DEVNOTES.md, localized by user in June 2025.  
> 
> **许可证 / License:** 本作品继承原项目的GNU通用公共许可证v2  
> This work inherits the original project's GNU General Public License v2

---

```diff
- The Great Discarder
+ The Great-er Tab Discarder
```

# 开发者笔记

<br>

## 标签页迁移


### `suspended.html` 类型URL格式
- 末尾的uri没有编码 -- 他们的源代码明确说明了这一点
  > chrome-extension://`EXTID`/suspended.html#ttl=`TITLE`&pos=0&uri=`URI`


### "Tab Suspender" `park.html` URL格式
- fiabciakcmgepblmdkmemdbbkilneeeh
- 查询字符串在这里看起来编码正确，使用URL.searchParams到目前为止产生了良好的结果
  > chrome-extension://`EXTID`/park.html?title=`TITLE`&url=`URI`&tabId=`INT`&sessionId=`INT`&icon=data%3Aimage%2Fpng%3Bbase64%2C`data`


### "Tiny Suspender" `suspend.html` URL格式
- bbomjaikkcabgmfaomdichgcodnaeecf
  > chrome-extension://`EXTID`/suspend.html?url=`URI`&title=`TITLE`&favIconUrl=https%3A%2F%2Fkodey.com%2Fassets%2Fimg%2Ffavicons%2Ffavicon.ico&scroll_x=0&scroll_y=0&dark_mode=true

<br>

## 从源代码构建扩展

您必须安装nodejs

克隆仓库并运行这些命令：
```
npm install
npm run generate-key
npm run build
```

应该显示：
```
Done, without errors.
```

扩展的crx格式将在build/crx/目录中。您可以将其拖拽到chrome://extensions来本地安装。

<br>

## Chrome & Edge 扩展启动事件
Chrome文档：
[扩展service worker生命周期](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle)

- 使用空缓存目录启动浏览器
  - 1 service worker install
  - 3 service worker activate

- "正常"启动浏览器
  - 4 chrome onStartup

- 重新加载扩展（未打包）
  - 1 service worker install
  - 2 chrome onInstalled
  - 3 service worker activate

- 禁用扩展，然后重新启用
  - 1 service worker install
  - 3 service worker activate

- 从"非活跃"状态重新激活扩展
  - （无事件）

<br>

## 标签页状态 "lastAccessed"

[`lastAccessed`](https://developer.chrome.com/docs/extensions/reference/api/tabs)
API看起来几乎满足我们的需求，但它跟踪的状态略有不同，
使得它对我们来说不太有用。

该字段描述为：
> 标签页在其窗口中最后一次变为活跃状态的时间，以自纪元以来的毫秒数表示。

这意味着当您激活一个标签页时，该字段会更新。但如果您将该
标签页保持活跃状态一小时，然后切换开，该字段不会改变。它
不跟踪标签页最后一次使用或获得焦点的时间，只跟踪焦点最后一次
切换到它的时间。如果我们使用它来确定标签页最后一次使用的时间，我们会
过早地丢弃长时间保持活跃状态的标签页。

<br> 
