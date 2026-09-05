某些情况下你可能想使用或扩展另一个模组的功能。本页将根据你的使用场景介绍一些常见方法和建议。

# 目录
* [依赖管理](#依赖管理)
* [代码安全性](#代码安全性)
* [技巧](#技巧)
  * [直接添加](#直接添加)
  * [ModInterop](#modinterop)
  * [程序集引用](#程序集引用)
  * [反射](#反射)
  * [钩子（Hook）](#钩子-hook)

# 依赖管理
在处理其他模组之前，先了解 Everest 如何处理依赖加载会很有帮助。依赖在模组的 [everest.yaml](https://github.com/EverestAPI/Resources/wiki/everest.yaml-Setup) 文件中定义。根据所使用的标记，依赖可以被指定为**必需**或**可选**。必需依赖必须在你的模组加载之前完成加载。可选依赖若未启用则会被忽略，但一旦启用就会被视为必需依赖（更详细的信息参见[此处](https://github.com/EverestAPI/Resources/wiki/Mod-Structure#optional-dependencies-for-everestyaml-advanced)）。

一般来说，你应尽量限制模组的必需依赖数量，以保持其轻量和灵活。

# 代码安全性
关于 Celeste 模组开发，有一点很重要：用[访问修饰符 :link:](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers) 标记代码可访问或可扩展的惯例在此并不适用。方法被标记为 `public` 并不意味着它可以在模组之外安全使用——在很多情况下，这些访问修饰符只是原版游戏的遗留物，而原版游戏并未被设计为可供其他程序集引用。同样，将方法标记为 `private` 也并不意味着其他模组无法访问它。像[反射](#反射)这样的工具可以用来绕开这些限制。

因此，大多数跨模组功能的实现都被视为**不安全**。在可能的情况下请进行防御性编程，并准备好必要时进行修复。无法保证某个方法始终以相同方式工作，甚至无法保证其签名不变，不过也正因如此，建议在可能的情况下不修改接口。唯一的例外是当模组作者明确将某个接口标记为 [API :link:](https://en.wikipedia.org/wiki/API) 时，这本质上是一份"契约"，保证其签名和功能不会改变。然而，是否遵守这份契约取决于模组作者。

# 技巧
下面介绍几种实现跨模组功能的不同方式，大致按推荐程度从高到低排列。

## 直接添加
这看起来可能显而易见，但实现任何涉及另一个模组的新功能的最简单、最安全的方式是**把它添加进那个模组**。如果你只是想创建一个与某个模组实体相似的实体，或对现有实体稍作调整，可以尝试联系作者，看看能否直接添加进他们的模组。许多老模组由 [Communal Helper 组织 :link:](https://github.com/CommunalHelper#legacy-helper-project) 维护，并乐于接受贡献和请求。

## ModInterop
[ModInterop :link:](https://github.com/MonoMod/MonoMod/blob/master/README-ModInterop.md) 是 MonoMod 的一项功能，也是我们最接近"官方"API 的东西。一个模组创建一组要导出的方法，然后其他模组可以通过 `MonoMod.Interop` 将它们作为委托导入。如果依赖被禁用，委托将为 `null`，否则你可以调用它来访问其他模组的功能，而无需添加直接依赖。

当然，模组必须首先创建 API，别人才能使用。如果你的模组中需要访问某些字段或方法，可以考虑联系模组作者添加一个 ModInterop API。

你也可以为自己的模组考虑使用它！请记住，**API 就是一份契约**。使用你的 API 的模组开发者会期望它至少在下一个大版本之前都能正常工作。还建议为你的 API 编写文档，至少注明每个方法被添加时的版本。

> [!NOTE] 说明
> 要使用 ModInterop API，你应该为模组添加一个**依赖**，版本为该接口被添加时的版本。如果你的模组在没有所导入 API 的情况下也能工作，请使用*可选依赖*。
>
> 在下面的示例中，`GetDreamTunnelDashState` 是在 Communal Helper 1.13.3 中添加的，因此那将是我们用于 everest.yaml 的最低版本。
>
---

下面是一个如何使用 ModInterop 的示例。  
假设我们需要检查 CommunalHelper 的 Dream Tunnel 状态。

CommunalHelper 的 [Exports 类 :link:](https://github.com/CommunalHelper/CommunalHelper/blob/dev/src/Exports.cs) 导出了一个可被调用以获取 `StDreamTunnel` 状态编号的函数。
```cs
[ModExportName("CommunalHelper.DashStates")]
public static class DashStates
{
    public static int GetDreamTunnelDashState()
    {
        return DreamTunnelDash.StDreamTunnelDash;
    }
}
```

要使用它，我们需要先导入它。创建一个 `public` 类，并用与 CommunalHelper 的 DashStates 类的 `[ModExportName]` 相匹配的 `[ModImportName]` 对其标注。  
然后，创建一个 **`public static`** 字段，其名称**与导出的方法名相同**，其类型**是与导出方法签名匹配的委托类型**。  
在本例中，`int GetDreamTunnelState()` 可以赋给 `Func<int>`，因此我们在导入类中创建一个 `Func<int> GetDreamTunnelDashState` 字段。

```cs
[ModImportName("CommunalHelper.DashStates")]
public static class CommunalHelperImports
{
    public static Func<int> GetDreamTunnelDashState;
}
```

> [!TIP] 提示
> 有时签名类型会变得有些冗长。在这种情况下，你可以自行创建委托类型并在字段中使用它，只要它与导出方法的签名匹配即可。  
> 这样做的好处是你能在 IDE 中直接看到参数名。
>
> ```cs
> [ModImportName("CommunalHelper.DashStates")]
> public static class CommunalHelperImports
> {   
>     public delegate Component DreamTunnelInteractionDelegate(
>         Action&lt;Player> onPlayerEnter, Action&lt;Player> onPlayerExit);
>
>     public static DreamTunnelInteractionDelegate DreamTunnelInteraction;
>
>     // would've been the following otherwise:
>     // public static Func&lt;Action&lt;Player>, Action&lt;Player>, Component> DreamTunnelInteraction;
> }
> ```
>
然后，我们需要告诉 ModInterop 实际执行导入。我们可以通过 `typeof(CommunalHelperImports).ModInterop();` 来实现——通常放在你的模块的 `Load()` 方法中。
```cs
public override void Load()
{
    typeof(CommunalHelperImports).ModInterop();
}
```

最后，我们可以使用导入。只需在导入类中调用该字段即可调用该方法。  
如果你的依赖是可选的，该字段*可能为* `null`。请先检查你的依赖是否已加载，或该字段是否不为 `null`。

如果导入方法失败（签名或名称不匹配），该字段也将为 `null`。

```cs
// If the dependency is required:
int dreamTunnelState = CommunalHelperImports.GetDreamTunnelDashState();

// If the dependency is optional: (falls back to -1 if it's disabled)
int dreamTunnelState = CommunalHelperImports.GetDreamTunnelDashState?.Invoke() ?? -1;
```

> [!TIP] 提示
> Snip 的 [ModInteropImportGenerator :link:](https://github.com/SnipUndercover/ModInteropImportGenerator) 让导入过程更简单。  
> 它是一个 Roslyn 源码生成器，让你用熟悉的方法声明语法来声明导入——只需复制粘贴方法签名（去掉方法体）并将其改为 `partial` 即可。就这么简单！  
> 它还提供加载时校验；如果出现问题（必需的依赖被禁用、调用了尚未导入的导入、导入部分成功等），它会抛出异常，并附带详细信息以及需要检查的内容。
>
> 更多细节请参阅其 README。下面是一个使用它的导入类示例：
>
> ```cs
> [GenerateImports("CommunalHelper.DashStates", RequiredDependency = true)]
> public static partial class CommunalHelperImports
> {
>     public static partial int GetDreamTunnelDashState();
>     public static partial Component DreamTunnelInteraction(
>         Action&lt;Player> onPlayerEnter, Action&lt;Player> onPlayerExit);
> }
> ```
>
> 要执行导入，你需要调用 `CommunalHelperImports.Load()`。
>
以下是公开的 ModInterop API 列表（欢迎添加或更新你自己的）：
- [Achievement Helper :link:](https://github.com/Brokemia/AchievementHelper/blob/master/AchievementHelperExports.cs)
- [BGswitch :link:](https://github.com/CommunalHelper/BGswitch#api)
- [Cavern Helper :link:](https://github.com/CommunalHelper/CavernHelper#api)
- [Communal Helper :link:](https://github.com/CommunalHelper/CommunalHelper/blob/dev/src/Exports.cs)
- Collab Utils 2 - [大厅工具方法 :link:](https://github.com/EverestAPI/CelesteCollabUtils2/blob/master/LobbyHelper.cs) 和 [自定义心形贴图素材库访问 :link:](https://github.com/EverestAPI/CelesteCollabUtils2/blob/master/UI/InGameOverworldHelper.cs)（参见这两个类的底部）
- [Frost Helper :link:](https://github.com/JaThePlayer/FrostHelper/blob/master/Code/FrostHelper/API/API.cs)
- [Gravity Helper :link:](https://github.com/swoolcock/GravityHelper/blob/develop/Source/GravityHelperAPI.cs)
- [Head 2 Head :link:](https://github.com/corkr900/Head2Head/wiki/API-Reference)
- [Speedrun Tool :link:](https://github.com/DemoJameson/Celeste.SpeedrunTool/tree/master/SpeedrunTool/Source/ModInterop)
- [Viv Helper :link:](https://github.com/Viv-0/VivHelper/blob/master/_Code/Module,%20Extensions,%20Etc/VivHelperAPI.cs)
- [Mapping Utils :link:](https://github.com/JaThePlayer/CelesteMappingUtils/tree/main/Api)

## 程序集引用
使用模组接口最直接的方式是直接引用其他模组：
```csharp
// using namespace Celeste.Mod.CommunalHelper.DashStates;
bool inDreamTunnelState = player.StateMachine.State == DreamTunnelDash.StDreamTunnelDash;
```
这与前面的示例相同，只是直接引用了原始字段。直接引用仅限于 `public` 接口（或从派生类访问 `protected`）。如果你想使用 `private` 或 `internal` 的内容，则需要使用[反射](#反射)。

代码更简单，但要求我们向项目添加对 Communal Helper 的程序集引用。如果你的源码是公开的，任何构建该项目的人（包括任何自动构建工作流）也需要添加该依赖。直接分发依赖不受鼓励（并且视许可证而定可能违法），除非你使用 [mono-cil-strip :link:](https://man.archlinux.org/man/mono-cil-strip.1.en) 之类的工具移除源代码但仍然允许针对该 DLL 进行构建。如果接口在未来的更新中被修改，你将不得不更新你的代码以及剥离后的 DLL。

> [!WARNING] 警告
> 如果你的代码引用了未加载的依赖，**游戏将直接崩溃**。  
> 你可以通过将它设为必需依赖来避免这种情况，或者在引用可选依赖之前添加检查，确认它们是否已加载。
>
这种检查的常见实现如下：
```csharp
// MyModule.Load()
// communalHelperLoaded -> public static bool 
EverestModuleMetadata communalHelper = new() {
  Name = "CommunalHelper",
  Version = new Version(1, 13 ,3)
};

communalHelperLoaded = Everest.Loader.DependencyLoaded(communalHelper);

// MyModule.Entity
if (communalHelperLoaded) {
    FunctionThatReferencesCommunalHelper();
}
```
在 `MyModule.Load()` 中检查依赖状态，让我们可以使用 `communalHelperLoaded` 作为任何引用的包装条件，因为可选依赖在启用时会在我们的模组之前加载。请注意，我们不能在这个 if 语句中直接引用 Communal Helper——方法在进入时就会被完整编译，因此在通过加载检查之前，我们不能调用任何包含对其他程序集引用的方法。

## 反射
[反射 :link:](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/reflection) 是一种让你在运行时动态创建和使用类型、方法等的工具。ModInterop 和 [DynamicData](Making-Code-Mods.md#访问私有字段-属性-方法) 内部就使用了反射。

你可以使用反射访问标记为 `internal` 或 `private` 的内容，甚至完全避免直接的程序集引用。然而，非公开的接口和实现细节发生变化的几率很高，不过反射也允许你在接口发生变化时添加防护措施。例如，如果你使用反射查找某个方法而它已不存在，将会返回 `null`，你可以在调用该方法之前对其进行检查。

下面是一个示例：
```csharp
// MyModule.Load()
// communalHelper -> EverestModuleMetadata from previous section
// dreamTunnelDashState -> public static FieldInfo
if (Everest.Loader.TryGetDependency(communalHelper, out EverestModule communalModule) {
  Assembly communalAssembly = communalModule.GetType().Assembly;
  Type dreamTunnelDash = communalAssembly.GetType("Celeste.Mod.CommunalHelper.DashStates.DreamTunnelDash");
  dreamTunnelDashState = dreamTunnelDash.GetField("StDreamTunnelDash", BindingFlags.Public | BindingFlags.Static);
}

// MyMod.Entity
bool inDreamTunnelState = player.StateMachine.State == MyModule.dreamTunnelDashState?.GetValue(null) ?? -1;
```
如你所见，这让我们可以在完全不引用程序集的情况下访问一个字段，方式与 ModInterop 类似。不过，代码会变得更复杂、更脆弱、可读性更差。

## 钩子（Hook）
还可以使用反射为另一个模组添加手动 IL 钩子，方法类似于[此处 :link:](https://github.com/EverestAPI/Resources/wiki/Making-Code-Mods#il-hooks) 描述的方式。不过，像这样改变另一个模组的行为通常不受鼓励。安装模组的用户通常希望它按描述的方式运行，因此任何外部改动都应尽可能小并做好文档记录。而且这比用反射调用方法还要脆弱，因为它同时依赖于签名和 IL 保持相对稳定。
