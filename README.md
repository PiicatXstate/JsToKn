# JsToKn
JsToKn能够将符合规范的Javascript代码转化为KittenN可以识别的积木文本  
此项目仍在开发中……    
  
2025.2.10 立项  
2025.3 完成界面设计，部分完成转译文件 `editor/js/ConvKernel.js`，更改转换方案，使用Acorn进行语法分析  
2025.4.5 重新更改项目树，对 `editor/js/ConvKernel.js` 的字符串转译进行重构
2025.4.6 将 `editor/js/ConvKernel.js` 重构使其满足新的字符串转译方法；分离 RuleJson 至 `src/convert.json`