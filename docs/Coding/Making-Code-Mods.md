> [!IMPORTANT] 重要
> **在你能为代码模组添加功能之前，请务必先按照[代码模组设置指南](Code-Mod-Setup.md)进行操作。**
>
# 目录

* [阅读游戏代码](#阅读游戏代码)
* [在特定事件发生时执行代码](#在特定事件发生时执行代码)
* [修改游戏代码](#修改游戏代码)
  * [`On.Celeste` 钩子](#on-celeste-钩子)
  * [`IL.Celeste` 钩子（高级）](#il-celeste-钩子-高级)
  * [钩挂协程（高级）](#钩挂协程-高级)
  * [更改钩子顺序（高级）](#更改钩子顺序-高级)
* [访问私有字段/属性/方法](#访问私有字段-属性-方法)
* [向对象附加自定义数据](#向对象附加自定义数据)

# 阅读游戏代码

借助[反编译器 :link:](https://en.wikipedia.org/wiki/Decompiler)，阅读编译后程序的代码成为可能。

Celeste 是用 C# 编写的，因此是一个 .NET 程序集。这意味着你需要一个 .NET 反编译器才能阅读 Celeste 的代码。

下面是一组常用的 .NET 反编译器。  
*下面列出的所有程序都能够导出游戏的反编译源码，你可以用任何编辑器打开并浏览这些源码。*

- [**ILSpy** :link:](https://github.com/icsharpcode/ILSpy) *（仅限 Windows）* 与 [**AvaloniaILSpy** :link:](https://github.com/icsharpcode/AvaloniaILSpy) *（跨平台）*
  - 有一个可用的插件，可以将 Visual Studio 使用的反编译引擎替换为 ILSpy 的引擎

- [**dnSpy** :link:](https://github.com/dnSpyEx/dnSpy) *（仅限 Windows）*
  - 已停更的 dnSpy 项目的非官方延续
  - 使用 ILSpy 反编译引擎，但并不总是完全保持最新

- [**ILSpyCMD** :link:](https://github.com/icsharpcode/ILSpy/tree/master/ICSharpCode.ILSpyCmd) *（跨平台）*
  - 用于反编译程序集的命令行工具

> [!NOTE] 说明
> 编译和反编译都是有损过程。  
> 反编译器产出的代码几乎总是与原始源代码不同，即使它们执行的操作完全相同。
>
> 其中一些最显著的差异包括：
> - 完全没有注释 *（xmldocs 除外）*
> - 编译器生成的类型和代码
> - 泛型局部变量名
> - 略有不同的代码布局
>
> 由于编译器生成的类型，反编译出来的代码往往无法不经修改就直接编译回程序集。
>
Celeste 的代码位于游戏文件中的 `Celeste.dll` 程序集内。如果你需要查看原版代码，可以在 `orig/Celeste.exe` 中找到。  
代码模组同样是用 C# 编写的 .NET 程序集。你可以像反编译 Celeste 一样反编译它们。

> [!WARNING] 小心
> **在任何地方上传或再分发反编译后的 Celeste 代码都是完全非法的。**
>
# 在特定事件发生时执行代码

你可以使用 Everest 事件，在诸如新关卡开始等事件发生时执行某些操作。  
[**Everest 事件参考**](Everest-Events.md)

例如，要在玩家生成时调用 `onPlayerSpawn` 方法，请使用如下代码：
```cs
Everest.Events.Player.OnSpawn += onPlayerSpawn;
```

# 修改游戏代码

如果你想修改游戏的行为，可以用 [ILSpy :link:](https://github.com/icsharpcode/ILSpy/releases) 或 [dnSpy :link:](https://github.com/0xd4d/dnSpy/releases) 查看游戏代码。ILSpy 能给出更好的反编译代码，而 dnSpy 提供了调试器。

一旦你找到了想要修改的方法，就可以使用 `On.Celeste` 或 `IL.Celeste` 来修改它。这两个命名空间分别允许你创建一种类型的钩子——On 钩子和 IL 钩子。（不过，你不应该在文件中导入这些命名空间，因为它们会与包含实际 Celeste 类型的 `Celeste` 主命名空间产生冲突。）钩子允许你更改甚至替换*现有* Celeste 代码的行为。

注意：`On.Celeste` 和 `IL.Celeste` 来自 `MMHOOK_Celeste.dll`，这是由 [MonoMod HookGen :link:](https://github.com/MonoMod/MonoMod/tree/reorganize/src/MonoMod.RuntimeDetour.HookGen) 在安装 Everest 时自动生成的。如果你使用的是 Everest Core（版本 >= 1.4465），可以立即使用它；但如果你针对的是更早的版本，你需要将 Everest 安装到游戏的 OpenGL / FNA 版本上，以自动生成可用的 .dll，否则你需要 Windows 独占且已过时的 XNA Framework 才能编译你的模组。

如果你想钩挂 `MMHOOK_Celeste.dll` 未提供的方法，可以手动构造一个钩子。参见 [IL.* 钩子](#il-钩子) 了解 IL 钩子的构建过程，或参见 [ExampleMod :link:](https://github.com/EverestAPI/ExampleMod/blob/master/Examples/Hooks.cs) 获取两种手动构造钩子的带注释示例。

## `On.Celeste` 钩子

这类钩子允许你用自定义方法"替换"原版中的某个方法。你可以通过钩子传入的 `orig` 参数，在需要时调用原方法。

例如，[Extended Variants :link:](https://github.com/maddie480/ExtendedVariantMode) 使用下面的代码让游戏认为攀墙跳始终不可能：
```cs
public void Load() {
    On.Celeste.Player.WallJumpCheck += modPlayerWallJumpCheck;
}

public void Unload() {
    On.Celeste.Player.WallJumpCheck -= modPlayerWallJumpCheck;
}

private static bool modPlayerWallJumpCheck(On.Celeste.Player.orig_WallJumpCheck orig, Player self, int dir) {
    if (Settings.DisableWallJumping) {
        // instead of running the vanilla method, return false all the time.
        return false;
    }

    // call the vanilla method by calling the "orig" method.
    return orig(self, dir);
}
```

当 `Settings.DisableWallJumping` 为 true 时，`Player.WallJumpCheck()` 的原版代码不会运行，该方法将始终返回 `false`。否则，该方法会表现得与原版一致。

### 钩子的静态性

Celeste 模组社区普遍认为，即使 [MonoMod :link:](https://github.com/MonoMod/MonoMod) 支持将 On 钩子声明为实例方法，也应将其声明为 static。这是因为钩子被视为对某个方法的"全局"修改，与包含该方法的类有多少个实例、以及是哪些实例无关。因此，从代码设计角度看，static 是最合理的。
此外，这样做还能带来一点速度上的提升，因为钩挂方法的对象不需要被存储，也不需要在该钩挂方法每次被调用时重新取出。

## `IL.Celeste` 钩子（高级）

这类钩子允许修改方法的*内容*。当你想在一个大方法的特定位置注入或修改代码，又不想把整个方法复制粘贴到你的模组中时，这类钩子非常有用。

当你为一个方法添加 IL 钩子时，钩子会立即收到一个 `ILContext` 对象并被调用。例如：
```cs
IL.Celeste.Player.DashBegin += modDashLength;

private void modDashLength(ILContext il) { ... }
```

这个对象允许你直接、按你想要的方式修改该方法的 *IL 代码*。CIL 全称是 [Common Intermediate Language :link:](https://en.wikipedia.org/wiki/Common_Intermediate_Language)（公共中间语言），是一种较低级的语言。例如，这段代码：
```cs
if (SaveData.Instance.Assists.SuperDashing) {
    dashAttackTimer += 0.15f;
}
```
会转换为：
```
IL_009f: ldsfld class Celeste.SaveData Celeste.SaveData::Instance   <= load SaveData.Instance
IL_00a4: ldflda valuetype Celeste.Assists Celeste.SaveData::Assists <= load the Assists field in it
IL_00a9: ldfld bool Celeste.Assists::SuperDashing                   <= load the SuperDashing field in it
IL_00ae: brfalse.s IL_00c2                              <= if this is false, jump over the contents of the if

IL_00b0: ldarg.0                                        <= load "this"
IL_00b1: ldarg.0                                        <= load "this" again
IL_00b2: ldfld float32 Celeste.Player::dashAttackTimer  <= load the dashAttackTimer in this
IL_00b7: ldc.r4 0.15                                    <= load 0.15 to the stack
IL_00bc: add                                    <= this adds the 2 latest loaded things, so dashAttackTimer + 0.15
IL_00bd: stfld float32 Celeste.Player::dashAttackTimer  <= save the result to dashAttackTimer

IL_00c2: [...]
```

[**所有现有指令的列表** :link:](https://en.wikipedia.org/wiki/List_of_CIL_instructions)  
关于每个 OpCode 对应哪种 Operand 类型的参考，可以[在此下载 :link:](https://github.com/EverestAPI/Resources/files/4774310/MonoCecilOpCodes.txt)，详见[这篇 stackoverflow 帖子 :link:](https://stackoverflow.com/a/7215711)。

在 ILSpy 和 dnSpy 中，你可以使用左上角的这个下拉框查看 IL 代码：
![ILSpy 中用于在 IL 和 C# 之间切换的下拉框截图 :link:](https://user-images.githubusercontent.com/52103563/75152044-6b504900-5708-11ea-8f00-b42d02946a39.png)

在 dnSpy 中，你也可以右键点击一行代码来查看其对应的 IL。

IL 钩子允许你添加、删除或修改这些 IL 指令。例如：

```cs
private void modDashLength(ILContext il) {
    ILCursor cursor = new ILCursor(il);

    // jump where 0.3 or 0.15f are loaded (those are dash times)
    while (cursor.TryGotoNext(MoveType.After, instr => instr.MatchLdcR4(0.3f) || instr.MatchLdcR4(0.15f))) {
        Logger.Log("ExtendedVariantMode/DashLength", $"Applying dash length to constant at {cursor.Index} in CIL code for {cursor.Method.FullName}");

        cursor.EmitDelegate<Func<float>>(determineDashLengthFactor);
        cursor.Emit(OpCodes.Mul);
    }
}

private static float determineDashLengthFactor() {
    return Settings.DashLength / 10f;
}
```

这段代码会在代码中查找每一个 `ldc.r4 0.3` 或 `ldc.r4 0.15`（也就是说，每次用到 0.3f 和 0.15f 的地方），并将它们与 `determineDashLengthFactor()` 返回的值相乘。

这是打补丁前 IL 代码的样子：
```
dashAttackTimer = 0.3f;
=>
ldarg.0
ldc.r4 0.3
stfld float32 Celeste.Player::dashAttackTimer
```
下面是打补丁后代码的简化视图：
```
ldarg.0
ldc.r4 0.3
call float32 determineDashLengthFactor()
mul                               <= multiplies 0.3 and the result from determineDashLengthFactor()
stfld float32 Celeste.Player::dashAttackTimer
=>
dashAttackTimer = 0.3f * determineDashLengthFactor();
```
冲刺攻击计时器（决定冲刺时长）现在会被乘以一个从模组设置中取出的任意系数。

[Extended Variants :link:](https://github.com/maddie480/ExtendedVariantMode/tree/master/Variants) 大量依赖 IL 钩子来略微改动游戏机制（例如重力和最大下落速度），因此它有很多这方面的示例。

**请注意，至少在 Steam 上，IL 代码在 XNA 和 FNA 版本之间略有不同**。强烈建议在两个版本上测试 IL 钩子。

## 钩挂协程（高级）

协程是返回 `IEnumerator` 并且包含 `yield return xxx` 的方法。它们的名字通常以 "Routine" 结尾。

- 当调用 `yield return [number]` 时，协程会暂停这么长的时间（以秒为单位）。
- 当调用 `yield return null` 时，协程会暂停一帧。
- 当调用 `yield return [IEnumerable instance]` 时，协程会开始执行传入的 `IEnumerable`，直到它结束，然后继续执行该语句之后的代码。

钩挂它们的行为比较特殊：

### On.* 钩子

在钩挂协程时，必须将任何 `yield return orig()` 包裹在一个 `SwapImmediately` 对象中，如下所示：

```cs
private static IEnumerator onFileSelectLeave(On.Celeste.OuiFileSelect.orig_Leave orig, OuiFileSelect self, Oui next) {
    yield return new SwapImmediately(orig(self, next));

    Logger.Log("TestMod", "I left file select!");
}
```
这是因为协程在切换 `IEnumerator` 时会有一帧的延迟。  
> [!IMPORTANT] 重要
> 为了能无问题地使用 `yield return new SwapImmediately(orig(self))`，你需要在 everest.yaml 中依赖 Everest 2781 或更高版本。
>
> [!WARNING] 警告
> 这种单行写法并非在所有情况下都有效，尤其是当原版协程是一个会更改状态的"状态机"协程时（`StateMachine.State = xx`）。在这种情况下，你在协程结束后**插入**的任何代码都不会运行。要解决这个问题，你可以改用下面的写法：
> ```cs
> IEnumerator origEnum = orig(self);
> while (origEnum.MoveNext()) yield return origEnum.Current;
> ```
>
> 请注意，从 Everest 6064 开始就不再需要这样做了，因此为了享受该修复，请在 everest.yaml 中依赖 Everest 6064 或更高版本。
>
另外，如果你想处理 `orig()` 协程返回的每一个值，请确保在遍历它之前调用 `SafeEnumerate`：
```cs
private static IEnumerator onFileSelectLeave(On.Celeste.OuiFileSelect.orig_Leave orig, OuiFileSelect self, Oui next) {
    var origEnum = orig(self, next).SafeEnumerate();
    while (origEnum.MoveNext()) {
        // do your processing here
        yield return /* origEnum.Current or anything you'd wish */;
        // do anything after
    }
}
```
这可以确保在 `origEnum` 返回 `SwapImmediately` 对象的情况下，你仍然能遍历所有值。请注意，即使你钩挂的原版方法没有这样做，`orig` 指向的是下一个要调用的钩子，或者实际的原版方法，因此在前一种情况下它可能返回任何东西。
> [!IMPORTANT] 重要
> 为了能无问题地使用 `SafeEnumerate`，你需要在 everest.yaml 中依赖 Everest 6064 或更高版本。
>
### IL.* 钩子

协程的实际代码并不在该方法本身中。例如，`Player.DashCoroutine()` 的 IL 代码是：
```
IL_0000: ldc.i4.0
IL_0001: newobj instance void Celeste.Player/'<DashCoroutine>d__423'::.ctor(int32)
IL_0006: dup
IL_0007: ldarg.0
IL_0008: stfld class Celeste.Player Celeste.Player/'<DashCoroutine>d__423'::'<>4__this'
IL_000d: ret
```

⬆️ 这并不是该方法的实际代码，它只是实例化了一个 `Celeste.Player/'<DashCoroutine>d__423'` 对象并返回它。`IL.Celeste.Player.DashCoroutine += ...` 钩挂的正是这段代码，因此使用它会导致意想不到的结果。

你在 ILSpy 的 C# 视图中看到的代码实际上位于 `Celeste.Player/'<DashCoroutine>d__423'::MoveNext()` 中，所以如果你想要 IL 钩挂它，这才是你该钩挂的方法。

你可以通过手动构建 IL 钩子来实现：
```cs
ILHook dashCoroutineHook = new ILHook(
    typeof(Player).GetMethod("DashCoroutine", BindingFlags.NonPublic | BindingFlags.Instance).GetStateMachineTarget(),
    modDashSpeed);
```
`GetStateMachineTarget()` 的作用就是将 `Celeste.Player::DashCoroutine()` 转换为 `Celeste.Player/'<DashCoroutine>d__423'::MoveNext()`。

要撤销这个 IL 钩子，你可以：
```
dashCoroutineHook.Dispose();
```

请注意，手动构建 IL 钩子对于钩挂 orig_* 方法以及其他未通过 `IL.Celeste.*` 开放的方法也很有用。

## 更改钩子顺序（高级）

默认情况下，钩子以类似栈的方式运行：最先应用的钩子将最后运行，而最后应用的钩子将在目标方法被调用时最先运行。

MonoMod 提供了一种方式来声明你的钩子相对于其他钩子的顺序：
```cs
// Via the using pattern (to apply it to multiple hooks, or hooks via `On.`):
using (new DetourConfigContext(
    new DetourConfig("ModID")
        .AddBefore("ModID1")
        .AddAfter("ModID2")
        .WithPriority(0)).Use()
) {
    // This hook will be ran before hooks tagged with ModID1 and after the ones with ModID2
    On.Celeste.Player.WallJumpCheck += modPlayerWallJumpCheck;
}
// or directly into the hook instance
myHook = new Hook(typeof(Player).GetMethod("WallJumpCheck"), modPlayerWallJumpCheck, 
                  new DetourConfig("ModID1", priority: 0, before: ["ModID1"], after: ["ModID2"]));
```
> [!NOTE] 说明
> 当 `DetourConfig` 直接传递给 `Hook` 构造函数（第二种形式）时，它会优先于 `using` 模式。
>
你需要为你创建的每个 `DetourConfig` 提供一个 ID，它应该能代表该配置所应用的对象。一个好的模式是使用你的模组名称加上某个标识该钩子用途的后缀："MyMod_PlayerWallJumpCheck"。其他模组将在它们的 `DetourConfig` 中使用这个 ID。

此外，还有一个类型为 `int?`（可空 `int`）的 priority（优先级）参数。当它不为 `null` 时，它会细化会被放置在同一位置的钩子的排序（值越大越靠前），它总是在 `before` 和 `after` 列表之后被检查。当传入 `null`（默认值）时，任何具有非空 priority 的钩子都会被放置在它之前。

> [!IMPORTANT] 重要
> 不带任何 `DetourConfig` 应用的钩子将在*所有*带 `DetourConfig` 的钩子之后运行，因此目前无法让你的钩子恰好紧挨着原方法调用之前被调用。一种变通方案是改为 ILHook 该方法，并在方法的最开头 `EmitDelegate` 你的钩子回调。
>
> [!NOTE] 说明
> 不过，让某个钩子先于其他所有钩子运行是可能的，只需将 `priority` 设置为 `int.MaxValue`。这并不能完全保证你的钩子会第一个运行（另一个模组可能也这样做，或者它可能在它的 `before` 列表中指定了你的 ID），但在大多数情况下它已经足够可靠。
>
另请参阅：
- [RuntimeDetour 用法文档 :link:](https://github.com/MonoMod/MonoMod/blob/reorganize/docs/RuntimeDetour/Usage.md)
- [`DetourConfig` 源码 :link:](https://github.com/MonoMod/MonoMod/blob/reorganize/src/MonoMod.RuntimeDetour/DetourConfig.cs)
- [`DetourConfigContext` 源码 :link:](https://github.com/MonoMod/MonoMod/blob/reorganize/src/MonoMod.RuntimeDetour/DetourContext.cs)
- [MonoMod detour 顺序单元测试 :link:](https://github.com/MonoMod/MonoMod/blob/reorganize/src/MonoMod.UnitTest/RuntimeDetour/DetourOrderTest.cs)

# 访问私有字段/属性/方法

为了访问类中的私有字段/属性/方法，你可以使用 [CelesteMod.Publicizer 包 :link:](https://nuget.org/packages/CelesteMod.Publicizer)。只需更新你的 `.csproj` 中对 `Celeste.dll` 的引用**并重新构建项目**即可。

> [!IMPORTANT] 重要
> 你的 IDE 可能会抱怨找不到 Celeste 类型。这通常可以通过重启 IDE / 使其缓存失效来解决。
>
然后，你就可以像访问公共成员一样访问一切了：

```cs
Sprite vanillaSprite = someStrawberrySeedObject.sprite;
someStrawberrySeedObject.sprite = modSprite;
```

你可能会发现有些部分仍然不是公共的。那些属于 Everest，是被有意保留的，以避免模组依赖 Everest 内部行为。


另外，你也可以使用 [DynamicData :link:](https://github.com/MonoMod/MonoMod/blob/master/MonoMod.Utils/DynamicData.cs)。为此，请创建或获取缓存的 DynamicData 对象，并将你想要访问其字段的对象传给它：
```cs
DynamicData strawberrySeedData = new DynamicData(someStrawberrySeedObject);

// For performance, it is recommended to use DynamicData.For() to create the dynamicData once, and reuse it each time it is required.
DynamicData strawberrySeedData = DynamicData.For(someStrawberrySeedObject);
```
如果你只想访问静态字段/属性/方法：
```cs
DynamicData inputData = new DynamicData(typeof(Input));
```

完成上述操作后，你就可以通过下面的方式访问和设置 `someStrawberrySeedObject` 上你想要的字段/属性：
```cs
Sprite vanillaSprite = strawberrySeedData.Get<Sprite>("sprite"); // gets someStrawberrySeedObject.sprite
strawberrySeedData.Set("sprite", modSprite);    // changes someStrawberrySeedObject.sprite
```
你还可以调用私有方法：
```cs
strawberrySeedData.Invoke("OnGainLeader");
strawberrySeedData.Invoke("OnPlayer", player);
```

> [!WARNING] 小心
> 避免在热路径（例如每帧钩子）中反复使用 `DynamicData.For()` 创建 DynamicData，因为它会导致显著且难以察觉的性能影响，尤其是在大对象上执行时。
>
# 向对象附加自定义数据

虽然可以使用 DynamicData 向任何对象附加自定义数据，但出于性能原因并不推荐这样做。相反，推荐的做法是使用一个你附加到实体上的自定义组件，然后进行检查：
```cs
// The component:
public class CustomDataComponent : Component
{
    public int Data;

    public CustomDataComponent(int data) : base(visible: false, active: false) {
        this.Data = data;
    }
}

// Adding the component to e.g. the player:
if (player.Get<CustomDataComponent>() is null) {
    player.Add(new CustomDataComponent(5));
}

// Reading the component:
if (player.Get<CustomDataComponent>() is CustomDataComponent customData) {
    int data = customData.Data;
}
```

请注意，`Entity.Get<T>()` 的性能与实体的组件数量呈线性关系。这通常是可以接受的，但作为替代，也可以使用 [ConditionalWeakTable :link:](https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.conditionalweaktable-2?view=net-10.0) 来获得以实体为键的近乎恒定的访问时间。不过，如果这样的表被设为 static，你需要注意与 SpeedrunTool 的兼容性，所以只有在迫不得已时才使用它。
