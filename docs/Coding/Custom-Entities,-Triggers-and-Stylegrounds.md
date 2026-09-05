> [!IMPORTANT] 重要
> 本 wiki 页面假设你已经通过模板设置好了你的代码模组（code mod）。
>
> **不了解模板是什么？请查看 [代码模组设置](Code-Mod-Setup.md) wiki 页面以开始上手。**
>
> [!NOTE] 说明
> 这是一份指南，解释了如何定义自定义实体（entity）、触发器（trigger）或风格地面（styleground）。
> 关于如何将实体、触发器或风格地面与 Lönn 集成以用于地图制作的信息，请参阅 [Lönn Wiki :link:](https://github.com/CelestialCartographers/Loenn/wiki)。
>
# 目录

- [目录](#目录)
- [自定义实体](#自定义实体)
  - [API 概览](#api-概览)
  - [碰撞箱 / 碰撞](#碰撞箱-碰撞)
  - [深度 / 更新与渲染顺序](#深度-更新与渲染顺序)
  - [组件](#组件)
  - [更多 `[CustomEntity]` 功能](#更多-customentity-功能)
- [自定义触发器](#自定义触发器)
- [其他特性](#其他特性)
  - [`[Tracked]`](#tracked)
  - [`[TrackedAs]`](#trackedas)
  - [`[RegisterStrawberry]`](#registerstrawberry)
- [自定义风格地面](#自定义风格地面)

# 自定义实体

要创建一个自定义实体 *（一种你可以放置在地图中的对象）*，请创建一个继承自 `Monocle.Entity` 的类，并在文件顶部添加 `using Celeste.Mod.Entities;`。  
然后，添加 `[CustomEntity]` 特性，以便 Everest 在加载 `.bin` 地图数据时能够检测到它。

传递给 `[CustomEntity]` 的 ID 必须是唯一的。最常见的格式是 `[CustomEntity("ModName/EntityName")]`。

这个类应该长这样：

```cs
// ExampleEntity.cs
using Celeste.Mod.Entities;
using Monocle;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleEntity")]
public class ExampleEntity : Entity
{
    // ...
}
```

> [!IMPORTANT] 重要
> 为了能够在 Lönn 中放置你的实体，你还需要为它创建一个 [**Lönn 插件 :link:**](https://github.com/CelestialCartographers/Loenn/wiki/Plugin-Structure)。
>
<!--
有关这些内容的示例很多，参见 [Spring Collab 2020 仓库 :link:](https://github.com/EverestAPI/SpringCollab2020/tree/master/Ahorn)。`entities` 和 `triggers` 文件夹包含实体/触发器插件，`lang` 文件夹包含不同选项的提示文字。要让 Ahorn 插件与代码中的实体建立联系，加粗的部分必须一致：

Ahorn 插件：
> @mapdef Trigger "**SpringCollab2020/NoRefillField**" NoRefillField(x::Integer, y::Integer, width::Integer=Maple.defaultTriggerWidth, height::Integer=Maple.defaultTriggerHeight)

代码：
> [CustomEntity("**SpringCollab2020/NoRefillField**")]
> class NoRefillField : Trigger { ... }

<br></br>
-->

当 Everest 从地图数据生成你的实体时，它会查找一个特殊的构造函数，如果找到就会调用它。  
它会按照以下精确顺序检查：

1. `public ExampleEntity(EntityData data, Vector2 offset, EntityID id)`  
   在制作不会重生的实体时很有用。
1. `public ExampleEntity(EntityData data, Vector2 offset)`  
   最常用的构造函数签名。
1. `public ExampleEntity(Vector2 offset)`  
   不太常用，因为它缺少 `EntityData` 参数。
1. `public ExampleEntity()`  
   常用于"控制器"实体。  
   *（这类实体不可见、无碰撞，但在幕后做一些事情）*

下面解释每个参数的含义：
- `data` - 包含实体相对于房间的位置以及你在 Lönn 中分配的属性
- `offset` - 房间左上角的偏移量
- `id` - 实体的唯一 ID，通常用于防止实体被再次加载

你的构造函数需要使用给定的 *绝对* 位置调用 `base` *（或者在制作"控制器"实体时不传位置）*，否则实体将生成在错误的位置。  
绝对位置可以通过 `data.Position + offset` 计算得出。

下面是一个定义了构造函数的示例：

```cs
// ExampleEntity.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleEntity")]
public class ExampleEntity : Entity
{
    // Used when loading the entity from a map
    // Remember to call base(data.Position + offset)!
    public ExampleEntity(EntityData data, Vector2 offset)
        : base(data.Position + offset)
    {
        // ...
    }
}
```

> [!IMPORTANT] 重要
> 如果 Everest 找不到具有这些签名之一的构造函数，它将无法生成你的实体。  
> 注意访问级别——构造函数必须是 `public`！
>
现在，你可以在构造函数中使用 `data` 参数的各种成员，从 Lönn 读取信息。  
下面是一些示例：
- `data.Bool(...)` - 读取一个 `bool` 值
- `data.Float(...)` - 读取一个 `float` 值
- `data.String(...)` - 读取一个 `string` 值
- `data.HexColor(...)` - 读取一个十六进制颜色值
- `data.Nodes` - 相对于实体的节点位置数组

## API 概览

下面是 `Entity` 可用的一些基本成员。
- `Position` - 实体的绝对位置
- `Scene` - 实体被添加到的场景
- `Active` - 实体是否可以更新其状态
- `Visible` - 实体是否可以渲染自身
- `Collidable` - 实体是否可以被碰撞 - [在下面阅读更多](#碰撞箱-碰撞)
- `Collider` - 实体的碰撞器 - [在下面阅读更多](#碰撞箱-碰撞)
- `Depth` - 实体的更新/渲染顺序 - [在下面阅读更多](#深度-更新与渲染顺序)
- `Components` - 添加到实体上的组件 - [在下面阅读更多](#组件)

> [!NOTE] 说明
> 出于本教程的目的，`Scene` 假定始终是一个 `Level`。  
> 你可以自行将其转换为 `Level`，或使用 `SceneAs<Level>()`。
>
`Entity` 类有两个你可以重写的重要方法：
- `Update` - 实体处于 `Active` 状态时每帧调用
- `Render` - 实体处于 `Visible` 状态时每帧调用

> [!NOTE] 说明
> 通常在每个可见帧中你应该会看到一次 `Update` 调用，随后是一次 `Render` 调用。  
> 然而，在卡顿帧期间可能并非如此。每个可见帧中 `Update` 可能被多次调用。`Render` 保证每个可见帧运行一次。
>
```cs
// ExampleEntity.cs

// Update your entity state here - not called if Active is false
public override void Update()
{
    // Remember to call base.Update() to update your entity's components!
    // (read more about components below)
    base.Update();

    // Spawn confetti every second at the entity position
    if (Scene.OnInterval(1f))
        Scene.Add(new SummitCheckpoint.ConfettiRenderer(Position));
}

// Render your entity here - not called if Visible is false
public override void Render()
{
    // Remember to call base.Render() to render your entity's components!
    // (read more about components below)
    base.Render();

    // Render a centered red square that flashes every second
    // at the entity position
    if (Scene.BetweenInterval(1f))
    {
        const float SquareSize = 16; // pixels
        Draw.Rect(
            x: X - SquareSize / 2, 
            y: Y - SquareSize / 2,
            width: SquareSize,
            height: SquareSize,
            color: Color.Red
        );
    }
}
```

还有一些生命周期方法：
- `Added` - 实体首次添加到关卡时调用一次
- `Awake` - 本帧 *所有* 实体都添加到关卡后调用一次
- `Removed` - 实体正在从关卡中移除时调用一次 *（例如在过场之后，或重生时）*
- `SceneEnd` - 场景切换时调用一次 *（例如通过"保存并退出 / 返回地图"退出关卡，或在 Celestial Resort 打开 PICO-8 控制台时）*
  - 场景切换 **不会** 调用 `Removed`，需要单独处理。

> [!NOTE] 说明
> 不同实体的生命周期方法的调用顺序取决于它们的添加/移除顺序。
>
> [!WARNING] 警告
> 如果 `Added` 尚未被调用，`Scene` 将为 `null`。这意味着在构造函数中 `Scene` 永远是 `null`！  
> 将需要用到 `Scene` 的代码移到调用 `base.Added(scene)` 之后。
>
```cs
// ExampleEntity.cs

// Do things immediately after your entity has been added to the level
public override void Added(Scene scene)
{
    // Remember to call base.Added(scene)!
    base.Added(scene);
    Logger.Verbose("ExampleMod/ExampleEntity", "Example entity added!");
}

// Do things after all entities have been added to the level on this frame
public override void Awake(Scene scene)
{
    // Remember to call base.Awake(scene)!
    base.Awake(scene);
    Logger.Verbose("ExampleMod/ExampleEntity", "Example entity awake!");
}

// Do things after your entity has been removed from the level
public override void Removed(Scene scene)
{
    // Remember to call base.Removed(scene)!
    base.Removed(scene);
    Logger.Verbose("ExampleMod/ExampleEntity", "Example entity removed!");
}

// Do things before exiting the level
public override void SceneEnd(Scene scene)
{
    // Remember to call base.SceneEnd(scene)!
    base.SceneEnd(scene);
    Logger.Verbose("ExampleMod/ExampleEntity", "Exiting the level!");
}
```


## 碰撞箱 / 碰撞

实体可以通过 `Collider` 字段定义自定义碰撞器。对于矩形碰撞箱，你可以为 `Collider` 分配一个 `Hitbox`：

```cs
// ExampleEntity.cs
public ExampleEntity(EntityData data, Vector2 offset)
    : base(data.Position + offset)
{
    // Create an 8x8 collider, offset 4 pixels left and 4 pixels up
    // (which makes it centered)
    Collider = new Hitbox(8, 8, -4, -4);
}
```

碰撞器的示例包括：
- `Hitbox` - 一个矩形碰撞箱
- `Circle` - 一个近似圆形的碰撞箱
- `Grid` - 一个矩形的碰撞箱网格
- `ColliderList` - 一个或多个 `Collider` 的组合

如有必要，你可以通过继承 `Collider` 类来定义自己的自定义碰撞器。

你可以通过将 `Collidable` 设为 `false` 来禁用实体的碰撞。

要实际检查碰撞，你可以使用各种以 `Collide` 开头的方法，例如...
- `CollideCheck<T>` - 检查与任意一个类型为 `T` 的 [**已跟踪**](#tracked) 实体的碰撞
- `CollideFirst<T>` - 返回第一个与你的实体发生碰撞的类型为 `T` 的 [**已跟踪**](#tracked) 实体，如果没有则返回 `null`
- `CollideAll<T>` - 返回所有与你的实体发生碰撞的类型为 `T` 的 [**已跟踪**](#tracked) 实体，如果没有则返回空列表
- ...以及更多。

或者，你也可以使用 `Collide` 类：
- `Collide.Check` - 检查与给定实体或给定实体集合中至少一个实体的碰撞
- `Collide.First` - 从给定实体集合中返回第一个与你的实体发生碰撞的实体，如果没有则返回 `null`
- `Collide.All` - 从给定实体集合中返回所有与你的实体发生碰撞的实体，如果没有则返回空列表
- ...以及更多。

> [!TIP] 提示
> 对于与玩家的碰撞，你应该使用 `PlayerCollider` 组件，因为它更高效。  
> 你可以在 [这里](#组件) 阅读更多关于组件的信息。
>
下面是一个删除任何进入其碰撞箱的 `TheoCrystal` 的实体示例：
```cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleEntity")]
public class ExampleEntity : Entity
{
    // ExampleEntity.cs
    public ExampleEntity(EntityData data, Vector2 offset)
        : base(data.Position + offset)
    {
        // Create an 8x8 collider, offset 4 pixels left and 4 pixels up
        // (which makes it centered)
        Collider = new Hitbox(8, 8, -4, -4);
    }

    public override void Update()
    {
        // Remember to call base.Update() to update your entity's components!
        // (read more about components below)
        base.Update();

        // Get the first Theo Crystal that collides with our entity, if any
        // CollideFirst<T>() requires T to be [Tracked], which TheoCrystal
        // happens to be
        // (read more about [Tracked] entities below)
        TheoCrystal theo = CollideFirst<TheoCrystal>();

        // Delete it if we find one
        if (theo is not null)
            theo.RemoveSelf();
    }
}
```

## 深度 / 更新与渲染顺序

你可以通过更改 `Depth` 来改变实体的更新/渲染顺序。  
数值越低表示实体 *越靠前* 并且 *越晚* 更新。数值越高表示实体 *越靠后* 并且 *越早* 更新。Madeline 使用深度 `0`。  
一些常用的深度常量可以在 `Depths` 类中找到。

> [!IMPORTANT] 重要
> 处于相同深度的多个实体的更新/渲染顺序并不一致，可能会根据实体的添加和/或移除顺序而变化。
>
> 这在深度 `0` 时尤其成问题，因为 Madeline 就在这个深度。  
> 这可能会随机导致看似无规律但 *（重要）* 的行为差异。
>
例如，如果我们希望实体出现在背景贴花之后并先于它们更新：

```cs
// ExampleEntity.cs
public ExampleEntity(EntityData data, Vector2 offset)
    : base(data.Position + offset)
{
    // Place us slightly behind background decals
    Depth = Depths.BGDecals + 50;
}
```

## 组件

实体可以有 `Component`，它们是可复用的代码片段，可以独立地附加到多个实体上。  
这有助于防止代码重复并简化逻辑。

> [!TIP] 提示
> 一些有用的组件包括：
> - `Image` - 渲染一张静态图片
> - `Sprite` - 渲染在 `Sprites.xml` 中定义的动画精灵图 *（使用 `GFX.SpriteBank.Create("sprite_name")` 创建精灵图）*
> - `PlayerCollider` - 当 Madeline 与实体碰撞时运行代码 *（可以接受非默认碰撞器）*
> - `DashListener` - 当 Madeline 在关卡任意位置冲刺时运行代码
> - `Holdable` - 允许 Madeline 像拿起 Theo 或果冻那样拿起实体
> - `SoundSource` - 添加一个局部声源 *（哇！）*
> - `WindMover` - 当你的实体被风吹动时运行代码
> - `Coroutine` - 运行一个可以暂停的方法
>
组件可以在任何时间通过调用实体的 `Add` 方法来添加。  
这通常直接在构造函数中完成，但也可以在任何时候进行。

组件会按照它们的添加顺序进行更新和渲染。

> [!IMPORTANT] 重要
> 记住要在 `Update` 和 `Render` 中分别调用 `base.Update()` 和 `base.Render()`！  
> 这两个方法负责为你添加到实体上的组件运行逻辑。
>
下面是一个示例，它添加了一个火炬精灵图，玩家冲刺时将其点亮，玩家触碰时将其熄灭：

```cs
// ExampleEntity.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleEntity")]
public class ExampleEntity : Entity
{
    private readonly Sprite TorchSprite;

    // Used when loading the entity from a map
    // Remember to call base(data.Position + offset)!
    public ExampleEntity(EntityData data, Vector2 offset)
        : base(data.Position + offset)
    {
        // Define a centered 32x32px (4x4 tile) hitbox
        Collider = new Hitbox(32f, 32f, -16f, -16f);

        // Create a Sprite based on the Sprites.xml name
        // Store its reference so that we can do stuff with it
        Add(TorchSprite = GFX.SpriteBank.Create("torch"));

        // Add a DashListener which runs OnDash when Madeline dashes
        Add(new DashListener(OnDash));

        // Add a PlayerCollider which runs OnPlayer when Madeline touches it
        Add(new PlayerCollider(OnPlayer))
    }

    // Called when Madeline dashes
    private void OnDash(Vector2 dashDirection)
    {
        // Play the "turnOn" animation defined in Sprites.xml
        TorchSprite.Play("turnOn");
    }

    // Called when Madeline touches the entity
    private void OnPlayer(Player player)
    {
        // Play the "off" animation defined in Sprites.xml
        TorchSprite.Play("off");
    }
}
```

## 更多 `[CustomEntity]` 功能

`[CustomEntity]` 接受多个 ID，如果你需要向后兼容，这会很有用：

```cs
// ExampleEntity.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleEntityNew", "ExampleMod/ExampleEntity")]
public class ExampleEntity : Entity
{
    // ...
}
```

或者，你也可以提供生成器方法（generator methods），这样可以让你对实体的生成方式有更多控制。  
默认情况下，Everest 会查找名为 `Load` 的生成器。你可以通过在 `[CustomEntity]` 的 ID 后面加一个等号来指定不同的生成器名称。

生成器方法必须是 **静态** 的，返回 `Entity` *（或继承自它的类型）*，并且接受 4 个参数：
- `Level` - 实体应生成到的关卡场景  
  如有必要，可以在 `level.Session` 中找到与当前会话相关的数据
- `LevelData` - 直接来自 `.bin` 文件的关卡数据
- `Vector2` - 房间左上角的偏移量 *（与构造函数中相同）*
- `EntityData` - 包含实体相对于房间的位置以及你在 Lönn 中分配的属性 *（与构造函数中相同）*

> [!IMPORTANT] 重要
> 如果提供了生成器方法，它将优先于特殊构造函数。
>
下面是一个使用两个不同实体 ID、需要两种不同加载方式的实体示例：

```cs
// ExampleEntity.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity(
    "ExampleMod/ExampleEntityNew",
    "ExampleMod/ExampleEntity = LoadLegacy")]
public class ExampleEntity : Entity
{
    // Called by Everest when loading a "ExampleMod/ExampleEntityNew" entity
    // No generator name specified in CustomEntity, but it defaults to Load (if present)
    public static ExampleEntity Load(
        Level level,
        LevelData levelData,
        Vector2 offset,
        EntityData entityData)
        => new ExampleEntity(entityData, offset, isLegacy: false);

    // Called by Everest when loading a "ExampleMod/ExampleEntity" entity
    // The generator name is specified in CustomEntity
    public static ExampleEntity LoadLegacy(
        Level level,
        LevelData levelData,
        Vector2 offset,
        EntityData entityData)
        => new ExampleEntity(entityData, offset, isLegacy: true);

    // This constructor won't be used by Everest!
    // - The signature is different
    // - We have defined generator methods, so Everest will use those
    public ExampleEntity(EntityData data, Vector2 offset, bool isLegacy)
        : base(data.Position + offset)
    {
        // ...
    }
}
```

# 自定义触发器

自定义触发器的写法与 [自定义实体](#自定义实体) 几乎完全相同。  
唯一的区别是它们继承自 `Celeste.Trigger`，而不是 `Monocle.Entity`。  
基构造函数也有两个参数而不是一个：`EntityData` 和 `Vector2`。

然后，你可以重写这些方法中的一个 *（或多个）*：
- `OnEnter` - 玩家进入触发器时调用一次
- `OnStay` - 玩家停留在触发器内时每帧调用
- `OnLeave` - 玩家退出触发器时调用一次

下面是一个统计玩家在触发器内停留时间的触发器示例：

```cs
// ExampleTrigger.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/ExampleTrigger")]
public class ExampleTrigger : Trigger
{
    private float Timer;

    // Used when loading the trigger from a map
    // Remember to call base(data, offset)!
    public ExampleTrigger(EntityData data, Vector2 offset)
        : base(data, offset)
    {
        // ...
    }

    // Log when Madeline enters the trigger
    public override void OnEnter(Player player)
    {
        Logger.Info("ExampleMod/ExampleTrigger",
            "The trigger has been entered.");
    }

    // Accumulate time while Madeline stays in the trigger
    public override void OnStay(Player player)
    {
        Timer += Engine.DeltaTime;
    }

    // Log how long Madeline was inside when she exits the trigger
    // Round the time to 2 decimal places
    public override void OnLeave(Player player)
    {
        Logger.Info("ExampleMod/ExampleTrigger",
            $"The trigger has been exited. Time: {Timer:F2} sec.");
        Timer = 0;
    }
}
```

# 其他特性

还有一些你可能会觉得有用的其他特性。

## `[Tracked]`

`[Tracked]` 特性会把你的实体注册到跟踪器（tracker）中。这可以让你更高效地找到你的实体。

```cs
Entity firstEntity;

// Slow - iterates through *every* entity in the scene
firstEntity = Scene.Entities.FindFirst<ExampleEntity>();

// Fast - the tracker keeps track of every entity type in a list
// Requires the [Tracked] attribute on ExampleEntity
firstEntity = Scene.Tracker.GetEntity<ExampleEntity>();
```

```cs
// Slow:
// - iterates through *every* entity in the scene
// - creates a new list every time, using up memory
foreach (ExampleEntity entity in Scene.Entities.FindAll<ExampleEntity>())
{
    // ...
}

// Fast:
// - the tracker keeps track of every entity type in a list
// - returns the same list every time
// Requires the [Tracked] attribute on ExampleEntity
foreach (ExampleEntity entity in Scene.Tracker.GetEntities<ExampleEntity>())
{
    // ...
}
```

> [!IMPORTANT] 重要
> `GetEntities<T>()` 返回的是跟踪器内部使用的列表的 *引用*，**而不是副本**。  
>
> 只要你以只读方式使用它 *（例如遍历它）*，一切都没问题。  
> 但是，**不要修改它**。如果你需要实体列表的副本，请改用 `GetEntitiesCopy<T>()`。
>
它还能让你使用 `CollideCheck<T>()` *（及其重载）*，其中 `T` 是一个 `Entity`。  
`CollideCheck` 要求 `T` 标记了 `[Tracked]`，否则会 *~~暴力崩~~ 呃*，崩溃。

这个特性有一个参数，用来决定搜索时是否包含 *子类*。默认值为 `false`。

这意味着如果你有一个实体继承自你的已跟踪实体...

```cs
// DerivedEntity.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[CustomEntity("ExampleMod/DerivedEntity")]
public class DerivedEntity : ExampleEntity
{
    // ...
}
```

...那么 `Scene.Tracker.GetEntities<ExampleEntity>()` 将返回：
- 如果 `ExampleEntity` 标注了 `[Tracked]`，则返回场景中所有的 `ExampleEntity` 对象
- 如果 `ExampleEntity` 标注了 `[Tracked(true)]`，则返回所有 `ExampleEntity` **和 `DerivedEntity`** 对象  

## `[TrackedAs]`

如果你用 `[TrackedAs(type)]` 标注你的实体，它将以与指定类型完全相同的方式被跟踪。

例如...

```cs
// ExampleCustomWater.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Entities;

[TrackedAs(typeof(Water))]
[CustomEntity("ExampleMod/ExampleCustomWater")]
public class ExampleCustomWater : Water
{
    // ...
}
```

...意思是"`ExampleCustomWater` 应该以与 `Water` 完全相同的方式被跟踪"。

这有以下几个好处：
- `CollideCheck<Water>()` 也会检查与 `ExampleCustomWater` 的碰撞，使 Madeline 无需额外代码即可在你的自定义水中游泳
- `Scene.Tracker.GetEntities<Water>()` 也会返回 `ExampleCustomWater` 实体
- ...等等。

这里用在 [Spring Collab 2020 :link:](https://github.com/EverestAPI/SpringCollab2020/blob/master/Entities/FlagToggleWater.cs) 中。

当你开发一个继承自已跟踪原版实体的实体时，如果原版实体带有 `[Tracked(false)]` 导致子类默认不被跟踪，这个特性就很有用。

> [!IMPORTANT] 重要
> 使用 `[TrackedAs]` 时，你的实体必须继承自你所提供的类型。
>
> Celeste 和每个模组都期望 `Scene.Tracker.GetEntities<T>()` *（其中 `T` 是一个 `Entity`）* 返回的实体是 `T` 的实例，如果有实体不继承自 `T`，**就会** *~~燃~~ 呃*，崩溃。
>
## `[RegisterStrawberry]`

这个特性可以放在任何继承自 `Strawberry` 或实现 `IStrawberry` 的类上。  
它可以让自定义草莓被正确计入草莓总数，例如计入暂停菜单中的草莓跟踪器中。

下面是 *Spring Collab 2020* 中的一个示例：

```cs
[RegisterStrawberry(isTracked: true, blocksNormalCollection: false)]
[CustomEntity("SpringCollab2020/CassetteFriendlyStrawberry")]
public class CassetteFriendlyStrawberry : Strawberry
{
    // ...
}
```

这个特性有两个参数：
- `isTracked` - 草莓是否应计入最大浆果数，以及是否应显示在存档点卡片 / 暂停菜单跟踪器上。  
  在这种情况下，其存档点 ID 和顺序将由 Everest 自动分配。

- `blocksNormalCollection` - 浆果是否有特定的收集规则，类似于金草莓。  
  在这种情况下，它将允许"草莓列车"中位于其后面的浆果被收集。

作为参考，在原版中：
- 红草莓是被跟踪的，并且不阻止正常收集
- 金草莓是不被跟踪的，并且阻止正常收集
- 月亮浆果是不被跟踪的，并且不阻止正常收集

如果你的自定义浆果不继承 `Strawberry`，并且你希望种子行为正常，你可以让你的自定义浆果实现 `IStrawberrySeeded`，然后使用 `GenericStrawberrySeed` 类来代替原版草莓种子。  
有关示例，请参阅 *Spring Collab 2020* 的 [Glass Berry :link:](https://github.com/EverestAPI/SpringCollab2020/blob/master/Entities/GlassBerry.cs)。

# 自定义风格地面

自定义风格地面的写法与实体非常相似，但有几点关键区别：
- 类必须使用 `[CustomBackdrop]`，而不是 `[CustomEntity]`
- 类必须继承自 `Backdrop`
- 构造函数/生成器必须接受一个类型为 `BinaryPacker.Element` 的参数
- 生成器 *（如果有的话）* 必须返回 `Backdrop` *（或继承自它的类型）*

> [!TIP] 提示
> `BinaryPacker.Element` 的行为与 `EntityData` 非常相似。
>
下面是一个示例：
```cs
// ExampleStyleground.cs
using Celeste.Mod.Entities;
using Monocle;
using Microsoft.Xna.Framework;

namespace Celeste.Mod.ExampleMod.Stylegrounds;

// Note the [CustomBackdrop] attribute
[CustomBackdrop("ExampleMod/ExampleStyleground")]
public class ExampleStyleground : Backdrop
{
    // No base() call needed, as the base constructor accepts 0 parameters
    public ExampleStyleground(BinaryPacker.Element data)
    {
        // ...
    }
}
```

在 `Update` 和 `Render` 之外，它还提供了两个额外的方法：
- `BeforeRender` - 在渲染之前做一些事情
- `Ended` - 在关卡结束后做清理工作 *（例如通关、"保存并退出"、"返回地图"等）*
