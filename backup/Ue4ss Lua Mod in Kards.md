**获取蓝图**
创建mod不多赘述了，来到hook阶段，有个小技巧，就是使用快捷键进行hook，

<img width="987" height="220" alt="Image" src="https://github.com/user-attachments/assets/d5db028c-ccc3-4965-ab76-177d8b5c2a41" />

就像这样，我们就获得了cardfunction的uobject，测验后发现staticfindobject暂时不能获得这个bpcfs的对象，所以只能先这么用了
**调用函数**
ue4ss lua mod 函数调用与传参返回比较难，整理了一下大概这样
1. 函数调用
我们对一个object使用冒号+函数（bpcfs:GiveKreditsBySide）就是调用这个object的一个函数，并将self作为第一个参数传进去（这个很重要），并且调用函数
2. 参数传递
在上面那个使用冒号的句子中，向括号里写的东西就是参数，枚举值可以用int代替
3. 蓝图返回
观察UHT，发现函数是蓝图重写+有参数是是引用，那么这个参数实际上是一个蓝图中的返回值，在ue4ssluamod中，我们需要使用一个table来接收这个返回值，所以最终的调用就像这样子
`T:DrawCardsFromDeckBySide(0,1,5,false,false,{},0.2)`
**另：**
1. 如果你使用hook中存储uobject然后再其他地方,反馈不是实时的，比如DrawCardsFromDeckBySide会在指挥点变化后显示，抽牌函数会没效果
2. 一个基本的hook像这样
```
RegisterHook("/Game/Blueprints/Cards/BP_CardFunctions.BP_CardFunctions_C:DrawCardsFromDeckBySide", function (self,instigatorID, side, NumCards, cardSeen, OpponentDraw, cardsIDs, drawDelay)
 s= self:get()
 side2= side:get()
 s:GiveKreditsBySide(side:get(),24,0,{})
end)
```
不难看出hook时传入的callback function第一个参数为self，第二个开始才是参数，与上文呼应（bushi），且每个参数都需要使用Param:get()进行解包获得真正的值

一些图放评论区了