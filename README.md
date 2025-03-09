<!-- >>>> <font face="HarmonyOS Sans SC"></font> -->
# <font face="HarmonyOS Sans SC">JsToKn 开发文档</font>
> ## <font face="HarmonyOS Sans SC">项目介绍</font>
>> <font face="HarmonyOS Sans SC">JsToKn可以将Javascript代码转换为KittenN可以识别的积木文本</font>   
>> <font face="HarmonyOS Sans SC">JsToKn的完整内容由Python代码作为后端服务端，油猴作为前端修改器</font>

> ## <font face="HarmonyOS Sans SC">开发文档</font>
>> ## <font face="HarmonyOS Sans SC">第一类积木 : 总体触发</font>

>>> ### <font face="HarmonyOS Sans SC">当开始运行</font>
>>>> <font face="HarmonyOS Sans SC">`Start(){ //ContinueCode };`</font>  
>>>> <font face="HarmonyOS Sans SC">大括号内填写接下来的代码，此积木无参数，括号内可直接留空</font>

>>> ### <font face="HarmonyOS Sans SC">当角色被点击 / 按下 / 放开</font>
>>>> <font face="HarmonyOS Sans SC">`#{role}.click(){ //ContinueCode }; // 当角色被点击`</font>  
>>>> <font face="HarmonyOS Sans SC">`#{role}.mouseup(){ //ContinueCode }; // 当角色被按下`</font>  
>>>> <font face="HarmonyOS Sans SC">`#{role}.mousedown(){ //ContinueCode }; // 当角色被放开`</font>  
>>>> <font face="HarmonyOS Sans SC"> 大括号内填写接下来的代码，此积木无参数，括号内可直接留空,{role}替换为角色类型量</font>

>>> ### <font face="HarmonyOS Sans SC">当向上、向下、向左、向右滑动屏幕</font>
>>>> <font face="HarmonyOS Sans SC">`Slip( #{Direction} ){ //ContinueCode };`</font>  
>>>> <font face="HarmonyOS Sans SC">{Direction} 为滑动方向 </font>  
>>>> <font face="HarmonyOS Sans SC"> up 向上 down向下 left向左 right向右</font>

>>> ### <font face="HarmonyOS Sans SC">当（开始、持续、结束）碰到角色</font>
>>>> <font face="HarmonyOS Sans SC">`#{role}.collide( #{state} ){ //ContinueCode };`</font>  
>>>> <font face="HarmonyOS Sans SC"> `// JsToKn删除了Kn的角色属性 `</font>  
>>>> <font face="HarmonyOS Sans SC">{role}替换为角色类型量，{state}为碰撞类型</font>  
<font face="HarmonyOS Sans SC">start 开始 keep 持续 end结束</font>

>>> ### <font face="HarmonyOS Sans SC">当 ......</font>
>>>> <font face="HarmonyOS Sans SC">`If( #{Condition} ){ //ContinueCode };`</font>   
>>>> <font face="HarmonyOS Sans SC"> {Conditon}为触发条件 </font>

>>> ### <font face="HarmonyOS Sans SC">当收到广播</font>
>>>> <font face="HarmonyOS Sans SC">`Cast( #{CastName } ){ //ContinueCode };`</font>   
>>>> <font face="HarmonyOS Sans SC">{CastName}为广播名</font>

>>> ### <font face="HarmonyOS Sans SC">当克隆体启动时</font>
>>>> <font face="HarmonyOS Sans SC">`Clone(){ //ContinueCode };`</font>   
>>>> <font face="HarmonyOS Sans SC"></font>

>>> ### <font face="HarmonyOS Sans SC"></font>
>>>> <font face="HarmonyOS Sans SC">``</font>   
>>>> <font face="HarmonyOS Sans SC"></font>