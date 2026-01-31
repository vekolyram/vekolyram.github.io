稍微整理了一下

**一、获取蓝图对象**
在Mod开发Hook阶段，可以借助快捷键操作来便捷地完成hook：
<img width="987" height="220" alt="Image" src="https://github.com/user-attachments/assets/d5db028c-ccc3-4965-ab76-177d8b5c2a41" />
如上图所示，借助快捷键可直接拿到 `cardfunction` 的UObject。实际测验中，目前staticfindobject无法直接获取此bpcfs对象，因此推荐使用这种方法。

**二、函数调用方式**
UE4SS Lua Mod里函数调用与参数传递通常会让人迷惑，实际操作流程如下：
1. **函数调用**
   对一个object调用其方法时，格式一般为 `obj:FuncName()`，如：`bpcfs:GiveKreditsBySide()`，需注意self将自动作为第一个参数传入。
2. **参数传递**
   方法括号中从第二个内参数开始的内容就是传参，枚举参数可直接用int数值。
3. **蓝图返回值的获取**
   查看UHT，如果函数为蓝图重写并有引用参数，该参数可能为蓝图函数返回值，在UE4SS Lua Mod中需用table变量接收。例如：
   `T:DrawCardsFromDeckBySide(0,1,5,false,false,{},0.2)`

**补充说明：**
- 若在hook中存储uobject、后续在其它地方使用，返回数据可能不是实时更新。比如DrawCardsFromDeckBySide会在指挥点变化后才体现，导致抽卡类函数无即时反馈。
- 一个最基础的Hook如下：
```lua
RegisterHook("/Game/Blueprints/Cards/BP_CardFunctions.BP_CardFunctions_C:DrawCardsFromDeckBySide", function (self,instigatorID, side, NumCards, cardSeen, OpponentDraw, cardsIDs, drawDelay)
    s = self:get()
    side2 = side:get()
    s:GiveKreditsBySide(side:get(), 24, 0, {})
end)
```
可以看到，hook的回调函数第一个参数永远是self，后续是具体args。所有参数都需要用Param:get()解包才能获取实际值，与前述方法相呼应。

一些图放评论区了