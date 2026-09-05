这是一篇关于如何在代码模组中定义自定义事件的指南。如果你不熟悉 C# 语言，或者没有制作 Celeste 代码模组的经验，[Lua Cutscenes :link:](https://gamebanana.com/mods/53678) 可能是更合适的选择。  
如果你有兴趣制作代码模组但不知从何入手，请阅读 [你的第一个代码模组](Your-First-Code-Mod.md) 来开始。

## 目录
- [**EventTrigger**](#eventtrigger)
- [**OnCustomEvent**](#oncustomevent)
- [**CustomEvent**](#customevent-特性)
- [**CutsceneEntity**](#cutsceneentity)
  - [**CutsceneNode**](#cutscenenode)


## `EventTrigger`
为了使用任何自定义事件，需要在关卡中的某个位置放置一个 `EventTrigger`。
事件触发器的工作方式与其他任何 `Trigger` 相同，当玩家进入其判定框时被激活。

`event` 数据字段是将要被触发的事件的 ID。
事件 ID 应当是唯一的，并且应包含模组名称或一个不太可能被其他模组重复使用的昵称。

如果事件触发器被放置在屏幕边缘，可能有必要将 `onSpawn` 字段设为 true，以便在进入屏幕时立即触发事件。


## `OnCustomEvent`
钩取 [`EventTrigger.OnEventTrigger`](Everest-Events.md#eventtrigger) 提供了一种在进入 EventTrigger 时执行几乎任何操作的方式。
只需检查 eventID 是否与目标事件匹配，如果匹配则返回 `true`，以通知游戏已找到合适的事件。

> [!IMPORTANT] 重要
> 虽然这可能是一种方便测试代码的方式，但仅在没有其他预定义选项时才推荐使用。  
例如，`EventTrigger` 可以用来设置关卡标志或结束关卡，但如果不需要其他行为，`FlagTrigger` 或 `CompleteAreaTrigger` 是更好的选择。


## `[CustomEvent]` 特性
要创建一个在进入相应的 [`EventTrigger`](#eventtrigger) 时会被自动添加的自定义实体，请创建一个继承 `Monocle.Entity` 的类，并用 `[CustomEvent]` 特性对其进行标注，
以便游戏在加载地图时能够检测到它：
```cs
[CustomEvent("mymodname/myevent")]
class MyEvent : Entity { ... }
```

你必须定义一个构造函数，游戏才能构建你的事件。该构造函数允许的签名按优先级顺序如下：
* `public MyEvent(EventTrigger trigger, Player player, string eventID)`
* `public MyEvent()`

你还可以为一个自定义事件指定多个 ID（这对向后兼容很有用）：
```cs
[CustomEvent("mymodname/myevent", "mynewmodname/myevent")]
```
或者让不同的 ID 调用你的实体的不同静态生成器方法：
```cs
[CustomEvent(
    "mymodname/myeventup = LoadUp",
    "mymodname/myeventdown = LoadDown"
)]
public class MyEvent : Entity {

    public static Entity LoadUp(EventTrigger trigger, Player player, string eventID)
        => new MyEvent(player, eventID, Directions.Up);
    public static Entity LoadDown(EventTrigger trigger, Player player, string eventID)
        => new MyEvent(player, eventID, Directions.Down);

    [...]
}
```
如果在 CustomEvent ID 中没有指定生成器方法，Everest 将查找名为 `Load` 的生成器方法。

> [!NOTE] 说明
> 如果提供了生成器方法，它将优先于任何已定义的构造函数。
>
>
## `CutsceneEntity`
事件触发器的一个主要用途是触发过场动画，这可以通过向关卡添加一个 `CutsceneEntity` 来实现。
这可以通过上面描述的两种方法中的任何一种来完成。

`CutsceneEntity` 是一个包含两个必需方法的抽象类：

* `OnBegin(Level level)` 应被用于设置过场动画，并添加一个新的 [`Coroutine` :link:](https://github.com/EverestAPI/Resources/wiki/Monocle-Reference#Coroutine) 在其中执行过场动画。  
* `OnEnd(Level level)` 应被用于在协程完成后进行清理。如果有必要，应检查 `WasSkipped` 字段，以防过场动画被提前结束。

`EndCutscene(Level level, bool removeSelf)` 应在*协程*结束时调用，以让关卡知道过场动画已经完成。

过场动画示例：
```cs
[CustomEvent("MyModName/MyCustomEvent")] //"MyModName" 应替换为你模组的名称。这是为了防止出现重复的事件。
public class TestEvent : CutsceneEntity
{
    private Player player;
    public TestEvent(EventTrigger trigger, Player player, string eventID) : base()
    {
        this.player = player;
    }
    public override void OnBegin(Level level)
    {
        Add(new Coroutine(cutscene()));
    }
    private IEnumerator cutscene()
    {
        //一个简单的过场动画：让玩家转向左侧，等待一秒，再转向右侧，等待 0.5 秒，然后结束。
        player.StateMachine.State = Player.StDummy;
        player.Facing = Facings.Left;
        yield return 1f;
        player.Facing = Facings.Right;
        yield return 0.5f;
        EndCutscene(Level); //告诉关卡过场动画已完成，并调用 "OnEnd"。
    }
    public override void OnEnd(Level level)
    {
        if (WasSkipped)
        {
            //确保玩家面向右侧，因为如果过场动画没有被跳过，结束时他们会面向右侧。
            player.Facing = Facings.Right;
        }
        //将玩家的状态恢复正常
        player.StateMachine.State = Player.StNormal;
    }
}
```


### `CutsceneNode`
过场动画节点是可以放置在关卡中的命名点，用于在过场动画内部进行引用。  
可以通过 `CutsceneNode.Find(string name)` 获取它们。
