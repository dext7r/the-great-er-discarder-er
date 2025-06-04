# <img src="./src/img/icon48.png" align="left" /> The Great-*er* Tab Discarder

**中文翻译版本 / Chinese Translation Version**

> **修改声明 / Modification Notice:**  
> 本文件是原英文版README.md的中文翻译版本，由用户于2025年6月进行汉化修改。  
> This file is a Chinese translation of the original English README.md, localized by user in June 2025.  
> 
> **许可证 / License:** 本作品继承原项目的GNU通用公共许可证v2  
> This work inherits the original project's GNU General Public License v2

---

通过释放非活跃或旧标签页占用的内存和资源，帮助您的浏览器加载和运行更快。

无跟踪，无花哨功能，只有更快的浏览体验！

在Chrome和Edge中完全支持Manifest V3。

<br>

## 欢迎
...来自以下扩展的所有用户：
- **The Marvellous Suspender**
- **The Great Suspender (notrack)**
- **Tab Suspender**
- **Tiny Suspender**
- 本扩展可以迁移您暂停的标签页！

> 您的标签页"Suspender"扩展是否显示警告"此扩展可能很快不再受支持"？<br>

不要冒丢失暂停标签页的风险！

本扩展可以迁移您现有的暂停标签页，这样当Chrome移除您旧的不受支持的扩展时，您就不会丢失它们。

<br>

## 获取扩展   <img src="./src/img/chrome.svg" height="32" valign="text-bottom" /> <img src="./src/img/edge.svg" height="32" valign="text-bottom" /> <img src="./src/img/brave.svg" height="32" valign="text-bottom" />


<img src="./src/img/chrome.svg" height="20" valign="text-bottom" />&nbsp;
[Chrome网上应用店](https://chromewebstore.google.com/detail/the-great-er-tab-discarder/plpkmjcnhhnpkblimgenmdhghfgghdpp)

<img src="./src/img/edge.svg" height="20" valign="text-bottom" />&nbsp;
[Microsoft Edge加载项](https://microsoftedge.microsoft.com/addons/detail/the-greater-tab-discarder/lieejiddoadedggjdkgeellgeeibbnai)

如果您喜欢这个扩展，请在应用商店中提交⭐⭐⭐⭐⭐评分！

<br>

## "丢弃"标签页是什么意思？
> 丢弃的标签页是指其内容已从内存中卸载，但仍在标签页栏中可见的标签页。
> 下次激活时，其内容会自动重新加载。

丢弃标签页不会关闭、移除或删除标签页。
它原生地告诉您的浏览器可以释放内存和资源，是保持浏览器快速高效运行的首选方式。

## 那么"暂停"标签页呢？
标签页暂停是节省内存的老式方法，**但允许视觉自定义**。
您的浏览器仍会为暂停的"迷你页面"分配一些资源以允许自定义。
您也可以丢弃暂停的标签页...也许能获得两全其美的效果。

<br>

## 截图
<img src="./screenshots/Popup Light.png" height="200" /> &nbsp;
<img src="./screenshots/Options Light.png" height="200" /> &nbsp;

<img src="./screenshots/Popup Dark.png" height="200" /> &nbsp;
<img src="./screenshots/Options Dark.png" height="200" /> &nbsp;

<br>

## 新功能

### 2025年6月
- **暂停标签页**的新*选项*
  - 网站图标变暗 🎉
  - 点击页面任意位置恢复暂停的标签页
  - 通过刷新恢复暂停的标签页
- 修复了Chrome直接打开时阻止暂停标签页的问题
  - 例如通过会话恢复工具打开
- 修复了浏览器初始启动时暂停标签页网站图标不加载的问题
  - 注意：网站图标必须在浏览器缓存中才能正确加载，直到我完成添加本地缓存
- 主扩展弹出窗口的新详细信息
  - 显示丢弃和暂停的标签页数量
  - 显示分配的键盘快捷键
- 新的自动选项保存功能，并移除了保存和取消按钮
- 更新后台代码以使用模块，便于集成

### 2025年4月
- 添加了**暂停标签页**功能
  - 除了丢弃标签页外，还可以使用扩展弹出窗口或键盘快捷键暂停单个标签页
  - 在设置中切换自动暂停和丢弃标签页
- **暂停的标签页**可以自定义标签页标题前缀以设置视觉区别
  - 示例前缀：💤 🔴 🟡 (...以及更多颜色)
  - 如果收到积极反馈，我也在考虑网站图标自定义
- **迁移**标签页现在更加出色，您可以查看和选择要迁移或转换的符合条件的标签页
- **Tiny Suspender** `suspend.html` 标签页可以迁移！
- 修复了标签页迁移以更好地处理不同格式，这应该可以防止循环

### 2025年3月
- **Tab Suspender** `park.html` 标签页可以迁移！
- 修复了几个影响弹出窗口和上下文菜单操作的问题（由Manifest V3引入）
- **启动时丢弃**功能已修复，以处理偶发的浏览器启动问题
- 重新整理标签页迁移页面以简化一些内容
- 现在可以选择在分析器页面上显示标签页组

详见[CHANGELOG_zh.md](./CHANGELOG_zh.md)获取完整详情。

<br>

## 功能亮点
- **暂停标签页** - 除了丢弃标签页外，还可以暂停标签页，为您提供一些视觉自定义选项。您可以丢弃或暂停或两者兼用！
- **迁移标签页** - 从其他扩展迁移您暂停的标签页 - 或者，您可以将它们转换为正确的丢弃标签页！
- **自动深色模式** - 扩展遵循您浏览器的外观设置。
- **启动时丢弃所有标签页** - 防止您的浏览器在启动时重新加载所有标签页，这可以大大加快启动时间。
- **丢弃所有符合条件的标签页** - 与"丢弃所有其他标签页"相同，但遵循当前的自动丢弃设置，比如跳过固定和音频标签页。
- **显示标签页详细信息** - 在弹出菜单中添加链接，显示有用的详细信息，以查看扩展如何看待事物。
- **设置** - 如果存在现有的设置标签页，将重新使用它。
- **移除Google Analytics** - 无跟踪，无花哨功能，只有更快的浏览体验！

<br>

## 帮助与支持

如果您对使用扩展有建议或问题，请
- [如果您有问题，请开始讨论](https://github.com/rkodey/the-great-er-discarder-er/discussions)。
- [提交错误报告或功能请求](https://github.com/rkodey/the-great-er-discarder-er/issues)。

<br>

## 贡献者
- 非常感谢**Mike Frysinger**（[vapier](https://github.com/vapier)）更新到Manifest V3！
- [LordXerus](https://github.com/LordXerus)
  <br><br>详见[DEVNOTES_zh.md](./DEVNOTES_zh.md)获取更多开发者笔记

## 致谢
- 感谢deanoemcke的原始扩展（在出售之前）[thegreatdiscarder](https://github.com/deanoemcke/)。
- 此包使用Aaron Powell编写的indexedDb包装器[db.js](https://github.com/aaronpowell/db.js)。

## 图标归属

<img src="./src/img/chrome.svg" height="20" valign="text-bottom" />&nbsp;
<a href="https://commons.wikimedia.org/wiki/File:Google_Chrome_icon_(February_2022).svg">Google</a>，公共领域，来自维基媒体共享资源<br>
<img src="./src/img/edge.svg" height="20" valign="text-bottom" />&nbsp;
<a href="https://commons.wikimedia.org/wiki/File:Microsoft_Edge_logo_(2019).svg">Microsoft Corporation</a>，<a href="http://opensource.org/licenses/mit-license.php">MIT</a>，来自维基媒体共享资源<br>
<img src="./src/img/brave.svg" height="20" valign="text-bottom" />&nbsp;
<a href="https://commons.wikimedia.org/wiki/File:Brave_lion_icon.svg">Brave Software, Inc.</a>，<a href="https://www.mozilla.org/en-US/MPL/2.0/">MPL 2</a>，来自维基媒体共享资源<br>

## 许可证

本作品根据GNU通用公共许可证（v2）授权 
