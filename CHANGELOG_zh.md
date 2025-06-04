# <img src="./src/img/icon48.png" align="left" /> The Great-*er* Tab Discarder

**中文翻译版本 / Chinese Translation Version**

> **修改声明 / Modification Notice:**  
> 本文件是原英文版CHANGELOG.md的中文翻译版本，由用户于2025年6月进行汉化修改。  
> This file is a Chinese translation of the original English CHANGELOG.md, localized by user in June 2025.  
> 
> **许可证 / License:** 本作品继承原项目的GNU通用公共许可证v2  
> This work inherits the original project's GNU General Public License v2

---

```diff
- The Great Discarder
+ The Great-er Tab Discarder
```

# 更新日志

## 1.4.0 - 2025年6月
- 新增：**暂停标签页**的*选项*
  - 网站图标变暗 🎉
  (  [#5](https://github.com/rkodey/the-great-er-discarder-er/issues/5),
    [#41](https://github.com/rkodey/the-great-er-discarder-er/issues/41),
    [#45](https://github.com/rkodey/the-great-er-discarder-er/issues/45) )
  - 点击页面任意位置恢复暂停的标签页
  ( [#41](https://github.com/rkodey/the-great-er-discarder-er/issues/41),
    [#57](https://github.com/rkodey/the-great-er-discarder-er/issues/57) )
  - 通过刷新恢复暂停的标签页
- 修复：Chrome直接打开时阻止暂停标签页的问题
  ( [#58](https://github.com/rkodey/the-great-er-discarder-er/issues/58) )
  - 例如通过会话恢复工具打开
- 修复：浏览器初始启动时暂停标签页网站图标不加载的问题
  (  [#5](https://github.com/rkodey/the-great-er-discarder-er/issues/5),
    [#58](https://github.com/rkodey/the-great-er-discarder-er/issues/58),
    [#60](https://github.com/rkodey/the-great-er-discarder-er/issues/60) )
  - 注意：网站图标必须在浏览器缓存中才能正确加载，直到我完成添加本地缓存
- 新增：主扩展弹出窗口的详细信息
  - 显示丢弃和暂停的标签页数量
  ( [#11](https://github.com/rkodey/the-great-er-discarder-er/issues/11) )
  - 显示分配的键盘快捷键
- 新增：自动选项保存功能，并移除了保存和取消按钮
- 更新：后台代码使用模块以便于集成

## 1.3.0 - 2025年4月
- 新增：添加了**暂停标签页**功能
  ( [关闭 #42](https://github.com/rkodey/the-great-er-discarder-er/issues/42) )
  - 除了丢弃标签页外，您还可以使用扩展弹出窗口或键盘快捷键暂停单个标签页
  - 您可以在设置中切换自动暂停和丢弃标签页
- 新增：**暂停的标签页**可以自定义标签页标题前缀以设置视觉区别
  ( [部分 #41](https://github.com/rkodey/the-great-er-discarder-er/issues/41) )
  ( [部分 #5](https://github.com/rkodey/the-great-er-discarder-er/issues/5) )
  - 示例前缀：💤 🔴 🟡 ( ...以及更多颜色 )
  - 如果收到积极反馈，我也在考虑网站图标自定义
- 更新：**迁移**标签页现在更加出色，您可以查看和选择要迁移或转换的符合条件的标签页
- 新增：**Tiny Suspender** `suspend.html` 标签页可以迁移！
  ( [关闭 #51](https://github.com/rkodey/the-great-er-discarder-er/issues/51) )
- 修复：标签页迁移以更好地处理不同格式，这应该可以防止循环
  ( [可能有助于 #45](https://github.com/rkodey/the-great-er-discarder-er/issues/45) )

## 1.2.2 - 2025年3月
- 修复："启动时丢弃"（再次修复）以防止浏览器重启空闲worker时丢弃标签页
  ( [关闭 #43](https://github.com/rkodey/the-great-er-discarder-er/issues/43) )

## 1.2.1 - 2025年3月
- 修复："启动时丢弃"在浏览器启动过程中偶尔会被跳过
- 重新整理标签页迁移页面以简化一些内容

## 1.2.0 - 2025年3月
- 新增：从"**Tab Suspender**"迁移 `park.html` 标签页
  ( [关闭 #40](https://github.com/rkodey/the-great-er-discarder-er/issues/40) )
- 修复："暂时不丢弃此标签页"
  ( [关闭 #39](https://github.com/rkodey/the-great-er-discarder-er/issues/39) )
  - 将此操作重命名为"暂停丢弃此标签页"以尝试澄清/简化
- 修复：与弹出窗口和上下文菜单操作相关的几个其他问题
  - 几个弹出窗口和上下文菜单操作无法工作
  - 重写了大量选项存储代码
- 新增：现在可以选择在分析器页面上显示标签页组

## 1.1.0 - 2025年2月
- 新增：从几个其他扩展迁移 `suspended.html` 标签页，
  如"**The Marvellous Suspender**"和"**The Great Suspender (notrack)**"
  ( [关闭 #35](https://github.com/rkodey/the-great-er-discarder-er/issues/35) )
- 新增：自动深色模式
- 新名称！算是吧。暂时小改，看看可见性是否会改变

## 1.0.1 - 2025年2月
- 修复：Manifest V3 更改中引入的 tempWhitelist 错误
  ( [关闭 #33](https://github.com/rkodey/the-great-er-discarder-er/issues/33) )
- 更新：分析器页面显示标签页组和固定状态
- 更新：分析器页面按窗口分组 - 再次感谢 ( [vapier](https://github.com/vapier) )
- 添加：在扩展弹出窗口中添加分析器页面链接

## 1.0.0 - 2025年2月
- 更新到Manifest V3。终于！
- 非常感谢**Mike Frysinger** ( [vapier](https://github.com/vapier) ) 完成所有困难的工作！
- 版本间隔几乎4年...天哪！

## 0.2.1 - 2021年10月
- 添加新的弹出窗口命令，根据选项丢弃所有符合条件的标签页（即不强制）( 关闭上游 #18 )
- "启动时丢弃"选项有自己的组和可见性
  ( ( [关闭 #9](https://github.com/rkodey/the-great-er-discarder-er/issues/9) ) - 感谢 @LordXerus )
- 添加选项以启用到浏览器丢弃页面的链接 ( 关闭上游 #39 )
- 更新选项标签页切换到现有标签页而不是总是打开新标签页
- 更新HTML，使用更粗的字体和调整后的布局，使其更易于阅读
- 标准化和格式化HTML和CSS文件
- 移除time-grunt依赖
- 移除唠叨功能
- 清理日志记录

## 0.2.0 - 2021年2月
- 此分支的首个正式版本
- 添加启动时丢弃所有标签页的新选项
- 移除Google Analytics
- 移除不需要的（我认为）扩展权限 
