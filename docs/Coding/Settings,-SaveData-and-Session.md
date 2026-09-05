<!--
  TODO: add screenshots! if someone is reading this and would like to assist, i would be very grateful
  - Snip
-->

# 目录

- [目录](#目录)
- [简介](#简介)
- [设置](#设置)
- [用法](#用法)
- [自定义设置](#设置)
  - [入门设置](#设置)
    - [`Boolean`](#boolean)
    - [`Int32` (`int`)](#int32-int)
    - [`Enum`](#enum)
    - [`Single` (`float`)](#single-float)
    - [`String`](#string)
    - [`ButtonBinding`](#buttonbinding)
    - [子菜单](#子菜单)
    - [通用特性](#通用特性)
      - [`[SettingName]`](#settingname)
      - [`[SettingSubText]`](#settingsubtext)
      - [`[SettingSubHeader]`](#settingsubheader)
      - [`[SettingInGame]`](#settingingame)
      - [`[SettingNeedsRelaunch]`](#settingneedsrelaunch)
  - [高级设置](#设置)
    - [手动创建菜单项](#手动创建菜单项)
    - [运行时创建设置](#设置)
    - [全屏子菜单（仅主菜单）](#子菜单)
    - [自定义设置项](#设置)
  - [大师级设置](#设置)

# 简介

Celeste 通过三种方式存储持久化数据。

- `Session`：
  包含与当前游玩进程相关的数据，例如死亡次数、花费时间、当前收集的草莓数以及当前房间。  
  会话数据在 *保存并退出* 之后仍会保留，并在 *重开章节* 或 *返回地图* 时重置。

- `SaveData`：
  包含与整个存档文件相关的数据，例如冲刺总次数、最少死亡数、历史收集的草莓总数，以及是否已收集 *水晶之心*。  
  存档数据在整个存档文件中持久保留，只有在删除其关联的存档文件时才会被重置。

- `Settings`：
  包含全局适用于整个 Celeste 的数据，例如当前语言、音乐和音效音量、默认存档文件名，以及是否已解锁 *变体模式*。  
  设置绝不会在游戏内被重置。重置设置的唯一方式是在 Celeste 之外删除设置文件。

Everest 允许模组以 `EverestModuleSession`、`EverestModuleSaveData` 和 `EverestModuleSettings` 类的形式保存持久化数据。

原版信息在写入磁盘时会[序列化 :link:](https://en.wikipedia.org/wiki/Serialization)为 [XML :link:](https://en.wikipedia.org/wiki/XML)，而 Everest 默认使用 [YAML :link:](https://en.wikipedia.org/wiki/YAML)。

如果出于任何原因你需要为持久化数据定义自己的格式，你可以从 `EverestModuleBinarySession`、`EverestModuleBinarySaveData` 和 `EverestModuleBinarySettings` 继承。

# 设置

> [!NOTE] 说明
> 如果你使用了 Celeste Code Mod 模板，那么所有设置工作都已为你完成。  
> 参阅 [代码模组设置](Code-Mod-Setup.md) 页面了解如何使用该模板。
>
要能够存储持久化数据，你需要创建一个继承自上述某个 Everest 类型的类型。

以自定义存档数据为例。创建一个继承自 `EverestModuleSaveData` 的类。

```cs
// ExampleModSaveData.cs

namespace Celeste.Mod.ExampleMod;

public class ExampleModSaveData : EverestModuleSaveData
{
}
```

然后，你需要告诉 Everest 存档数据所存储的类型。在你的模组类中，重写 `SaveDataType` 属性并将其值设为 `ExampleModSaveData` 类型。

```cs
// ExampleModModule.cs

namespace Celeste.Mod.ExampleMod;

public class ExampleModModule : EverestModule
{
    public static ExampleModModule Instance;

    public override Type SaveDataType => typeof(ExampleModSaveData);

    public ExampleModModule()
    {
        Instance = this;
    }

    // ...
}
```

`EverestModule` 通过实例属性 `_SaveData` 暴露你的存档数据。建议同时创建一个静态的 `SaveData` 属性，将实例属性转换为 `SaveData` 类型。

```cs
// ExampleModModule.cs

namespace Celeste.Mod.ExampleMod;

public class ExampleModModule : EverestModule
{
    public static ExampleModModule Instance;

    public override Type SaveDataType => typeof(ExampleModSaveData);
    public static ExampleModSaveData SaveData => (ExampleModSaveData)Instance._SaveData;

    public ExampleModModule()
    {
        Instance = this;
    }
}
```

# 用法

存储数据很简单——只需在类上定义一个**公共实例[属性 :link:](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)**，并在需要时对其赋值。请注意，两个访问器都必须是公共的。  
**其他任何内容都不会被序列化。**

> [!TIP] 提示
> 如果你想从序列化中省略某个属性，请给它加上 `[YamlIgnore]` 特性。  
> 这需要添加 `YamlDotNet` NuGet 包。
>
让我们定义一些自定义存档数据属性：

```cs
// ExampleModSaveData.cs

namespace Celeste.Mod.ExampleMod;

public class ExampleModSaveData : EverestModuleSaveData
{
    // Public instance properties work
    public bool MyBool { get; set; }

    // Default to 10 if there is no saved value
    public int MyNumber { get; set; } = 10;

    // Don't save the property value
    [YamlIgnore]
    public float MyFloat { get; set; }
}
```

然后，要访问属性值，请从你的模组类中引用 `Session`、`SaveData` 或 `Settings` 属性并访问所需内容。  
在此示例中，`ExampleModModule.SaveData.MyNumber` 从我们的自定义存档数据中访问 `MyNumber` 属性。

# 自定义设置

`EverestModuleSettings` 类型很特殊。Everest 会检查你的设置类，并在 Mod Options 菜单中生成你模组的设置区块。

它的行为非常可定制。  
对于[入门设置](#设置)，你可以使用许多特性来控制设置的行为。  
对于[高级控制](#高级设置)，你可以指定设置属性的菜单项如何实例化，并手动将其添加到菜单中。  
如果你觉得自己是[设置大师](#设置)，你可以在你的模组模块中重写整个模组区块的生成方式。

> [!TIP] 提示
> 如果你希望某个属性不出现在设置菜单中，请给它加上 `[SettingIgnore]` 特性。
>
## 入门设置

如果你想要简单的设置，Everest 会为你完成大量繁重工作。它会根据属性类型自动猜测要选择哪个菜单项。  
你也可以为属性[添加特性](#通用特性)，告诉 Everest 你希望设置如何表现。

支持的属性类型包括：
- [`Boolean`](#boolean)
- [`Int32` (`int`)](#int32-int)
- [`Enum`](#enum)
- [`Single` (`float`)](#single-float)
- [`String`](#string)
- [`ButtonBinding`](#buttonbinding)

此外，你还可以创建[子菜单](#子菜单)。

---

### `Boolean`

`bool` 属性会变成一个开/关滑块。

```cs
// Define an on/off toggle
public bool MyToggle { get; set; }
```

---

### `Int32` (`int`)

`int` 属性可以是滑块，也可以是带用户进入数字输入菜单的按钮。

要使该属性成为滑块，你必须给它加上 `[SettingRange]` 特性来定义设置的允许范围。  
你还可以指定是否为较大范围优化滑块。

要使该属性成为数字输入，你必须给它加上 `[SettingNumberInput]` 特性来定义最大位数，以及是否允许负数。  
默认情况下允许负数，且设置最多可有 `6` 位数字。

> [!IMPORTANT] 重要
> 使用 `[SettingNumberInput]` 的设置将在游戏内被禁用，因为在游戏内尝试打开数字输入菜单会导致 Celeste 崩溃。
>
```cs
// Set the range of MySlider to [-10, 10]
[SettingRange(min: -10, max: 10)]
public int MySlider { get; set; }

// Set the range of MyLargeSlider to [-1000, 1000],
// and optimize for large ranges
[SettingRange(min: -1000, max: 1000, largeRange: true)]
public int MyLargeSlider { get; set; }

// Allow the user to type an up to 6 digits long number
// Note: The setting will be disabled in-game
[SettingNumberInput]
public int MyNumberInput { get; set; }

// Allow the user to type an up to 5 digits long number, without allowing negatives
// Note: The setting will be disabled in-game
[SettingNumberInput(allowNegatives: false, maxLength: 5)]
public int MyOtherNumberInput { get; set; }
```

---

### `Enum`

`Enum` 属性会变成一个滑块，可在其所有值之间滚动。  
顺序由赋予该枚举的值决定。

```cs
public enum MyEnumeration
{
    One,
    Two,
    Three,
    Four,
    Five
}

// Define a slider which scrolls through the options in MyEnumeration
public MyEnumeration MyEnumSlider { get; set; }

// Scroll order is determined by the enum's integer value
// This means that the slider will scroll right in the order of World, There, Hello
public enum MyOtherEnumeration
{
    Hello = 5,
    There = 0,
    World = -5
}

// Define a slider which scrolls through the options in MyOtherEnumeration
public MyOtherEnumeration MyOtherEnumSlider { get; set; } = MyOtherEnumeration.World;
```

---

### `Single` (`float`)

`float` 属性会变成一个带用户进入数字输入菜单的按钮。

你必须给它加上 `[SettingNumberInput]` 特性来定义最大位数，以及是否允许负数。  
默认情况下允许负数，且设置最多可有 `6` 位数字。

> [!IMPORTANT] 重要
> 使用 `[SettingNumberInput]` 的设置将在游戏内被禁用，因为在游戏内尝试打开数字输入菜单会导致 Celeste 崩溃。
>
```cs
// Allow the user to type an up to 6 digits long number
[SettingNumberInput]
public int MyNumberInput { get; set; }

// Allow the user to type an up to 5 digits long number, without allowing negatives
[SettingNumberInput(allowNegatives: false, maxLength: 5)]
public float MyOtherNumberInput { get; set; }
```

---

### `String`

`string` 属性会变成一个带用户进入文本输入菜单的按钮。

你可以使用 `[SettingMinLength]` 和 `[SettingMaxLength]` 特性控制字符串长度范围。  
默认情况下，字符串可以是 `1` 到 `12` 个字符。

> [!IMPORTANT] 重要
> 字符串设置将在游戏内被禁用，因为在游戏内尝试打开文本输入菜单会导致 Celeste 崩溃。
>
```cs
// Allow the user to type a string between 1 and 12 characters
public string MyTextInput { get; set; }

// Allow the user to type a string exactly 6 characters long
[SettingMinLength(6)]
[SettingMaxLength(6)]
public string MyTextInput { get; set; }
```

---

### `ButtonBinding`

`ButtonBinding` 属性允许模组定义自定义按键绑定，与原版的相互独立。  
它们可以在模组的 Mod Options 区块中重新绑定。

你可以通过添加 `[DefaultButtonBinding]` 特性来指定默认绑定。  
`Buttons` 枚举使用的是 Xbox 布局。这意味着 Xbox 上的 A 键对应 Switch 上的 B 键、PlayStation 上的 X 键，仅举几例。

```cs
// Define a custom button binding
// Defaults to the A button on controller, and the C key on keyboard
[DefaultButtonBinding(button: Buttons.A, key: Keys.C)]
public ButtonBinding MyCustomBinding { get; set; }

// Define another custom button binding
// Defaults to the A, B, X and Y buttons on controller,
// and the Z, X and C keys on keyboard
[DefaultButtonBinding(
    buttons: new[] {
        Buttons.A, Buttons.B, Buttons.X, Buttons.Y
    },
    keys: new[] {
        Keys.Z, Keys.X, Keys.C
    }
)]
public ButtonBinding MyOtherCustomBinding { get; set; }
```

然后，在与绑定交互时，你可以使用 `ButtonBinding` 的各种成员：
- `MyCustomBinding.Pressed` - 绑定是否刚刚被按下或正处于缓冲中
- `MyCustomBinding.Check` - 绑定当前是否被按住
- `MyCustomBinding.Repeating` - 绑定是否已按住足够长时间而进入重复状态
- `MyCustomBinding.Released` - 绑定是否刚刚被释放
- `MyCustomBinding.ConsumePress()` - 消耗按下与缓冲，使绑定从当前帧剩余部分开始不再报告按下
- `MyCustomBinding.ConsumeBuffer()` - 仅消耗缓冲，使绑定从当前帧剩余部分开始不再报告按下（**仅当输入被缓冲时**）

`ButtonBinding.ConsumePress()` 与 `ButtonBinding.ConsumeBuffer()` 之间的区别仅在按钮按下被登记的同一帧内调用时才显现。  
`ButtonBinding.ConsumePress()` 会使绑定从当前帧剩余部分开始不再报告按下，而 `ButtonBinding.ConsumeBuffer()` 会**继续报告按下**直到下一帧。

> [!NOTE] 说明
> 默认情况下，`ButtonBinding` 有 `0.08` 秒 *（`5` 帧）* 的缓冲时间。
>
> 如果你想更改它 *（以及绑定的其他属性）*，请在模组类中重写 `OnInputInitialize` 并在其中修改绑定属性。
> ```cs
> // ExampleModModule.cs
>
> // Called by Everest in Input.Initialize()
> public override void OnInputInitialize()
> {
>     // Remember to call base.OnInputInitialize(),
>     // so that Everest creates your bindings properly
>     base.OnInputInitialize();
>
>     // Set BufferTime to 0 seconds
>     Settings.MyCustomBinding.BufferTime = 0;
> }
> ```
>
---

### 子菜单

要创建子菜单，请创建一个带有 `[SettingSubMenu]` 特性的类。

然后，创建一个以你刚刚定义的类为类型的属性。

> [!NOTE] 说明
> 适用于设置类的所有限制同样适用于子菜单类。
>
> 另请注意，并非所有特性都受支持或能按预期工作。  
> 如果你有修复该问题的想法，Everest 欢迎提交 pull request。
>
```cs
[SettingSubMenu]
public class ExampleSubMenu
{
    public bool Toggle { get; set; }

    [SettingRange(min: -10, max: 10)]
    public int Slider { get; set; }
}

// Create a submenu
// Remember to initialize it to set its default values
public ExampleSubMenu SubMenu { get; set; } = new();
```

---

### 通用特性

在上述特性之外，还有一些不特定于属性类型的特性。

这些特性包括：
- [`[SettingName]`](#settingname)
- [`[SettingSubText]`](#settingsubtext)
- [`[SettingSubHeader]`](#settingsubheader)
- [`[SettingInGame]`](#settingingame)
- [`[SettingNeedsRelaunch]`](#settingneedsrelaunch)

---

#### `[SettingName]`

允许你为设置定义自定义 Dialog ID。

如果未指定，设置的 Dialog ID 将是 `$"modoptions_{typeName}_{propertyName}"`，其中 `typeName` 是设置类型名 *（如有则去掉结尾的 `Settings` 部分）*，`propertyName` 是属性的名称。

如果 Dialog ID 未定义，设置名称将以空格分隔的 PascalCase 形式显示。

> [!TIP] 提示
> Dialog ID 不区分大小写。  
> 这意味着 `"MODOPTIONS_EXAMPLEMOD_ABC"` 与 `"modoptions_examplemod_abc"` 相同。
>
```cs
namespace Celeste.Mod.ExampleMod;

// The default dialog keys will begin with "modoptions_ExampleMod_",
// because the "Settings" part is stripped
public class ExampleModSettings : EverestModuleSettings
{
    // Use the default dialog key for this setting,
    // which is "modoptions_ExampleMod_UnnamedSetting"
    // If there is such a dialog ID defined, use its translation,
    // else default to spaced pascal case, which is "Unnamed Setting"
    public bool UnnamedSetting { get; set; }

    // Use a custom dialog key for this setting
    // If there is such a dialog ID defined, use its translation,
    // else default to spaced pascal case, which is "Named Setting"
    [SettingName("EXAMPLEMOD_SETTINGS_NAMEDSETTING")]
    public bool NamedSetting { get; set; }
}
```

此特性也可应用于设置类型，用于定义设置标题头所使用的 Dialog ID。

如果未指定，标题 Dialog ID 将是 `$"modoptions_{typeName}_title"`，其中 `typeName` 是设置类型名 *（如有则去掉结尾的 `Settings` 部分）*。

如果 Dialog ID 未定义，标题头将以空格分隔的 PascalCase 形式显示。

```cs
namespace Celeste.Mod.ExampleMod;

// Use a custom dialog key for the Mod Options title header
// If there is such a dialog ID defined, use its translation,
// else default to spaced pascal case, which is "Example Mod",
// because the "Settings" part is stripped
[SettingName("EXAMPLEMOD_SETTINGS_TITLE")]
public class ExampleModSettings : EverestModuleSettings
{
}
```

---

#### `[SettingSubText]`

允许你为设置定义描述，该描述在设置被选中时显示。

Everest 会尝试将特性内容解释为 Dialog ID，如果无法解释，则按原样显示内容。

> [!TIP] 提示
> 虽然理论上你可以使用任何文本，但你应该使用 Dialog ID。这可以确保你的描述可被翻译。
>
```cs
// Add a description with the given dialog ID
// If there is such a dialog ID defined, use its translation,
// else display it unchanged
[SettingSubText("MODOPTIONS_EXAMPLEMOD_EXAMPLE_HINT")]
public bool ToggleWithDescription { get; set; }
```

---

#### `[SettingSubHeader]`

允许你用副标题分隔设置。

Everest 会尝试将特性内容解释为 Dialog ID，如果无法解释，则按原样显示内容。

> [!TIP] 提示
> 虽然理论上你可以使用任何文本，但你应该使用 Dialog ID。这可以确保你的副标题可被翻译。
>
```cs
// Add a subheader before the setting with the given dialog ID
// If there is such a dialog ID defined, use its translation,
// else display it unchanged
[SettingSubHeader("MODOPTIONS_EXAMPLEMOD_SUBHEADER")]
public bool ToggleWithSubHeader { get; set; }
```

---

#### `[SettingInGame]`

允许你指定设置是仅在游戏内可见，还是仅在主菜单可见。

```cs
// Show the setting in-game only
[SettingInGame(true)]
public bool InGameOnlyToggle { get; set; }

// Show the setting in the main menu only
[SettingInGame(false)]
public bool MainMenuOnlyToggle { get; set; }
```

---

#### `[SettingNeedsRelaunch]`

允许你在设置被更改时提醒用户：更改生效需要重启 Celeste。

```cs
// Warn when the setting is changed that a restart of Celeste is required
[SettingNeedsRelaunch]
public bool RestartRequiredToggle { get; set; }
```

## 高级设置

有时你需要比 Everest 默认提供的更多设置控制权。幸运的是，Everest 允许你指定与设置属性对应的菜单项如何创建，而将其余一切交由 Everest 处理。

例如：

- 如果要根据其他设置来禁用某个设置呢？
- 如果要动态创建菜单项呢？
- 如果要创建完全自定义的菜单项呢？
- 如果要创建一个带你进入全屏子菜单的按钮呢？

以上一切皆可实现，下文将对此进行说明。

---

### 手动创建菜单项

要指定设置菜单项如何创建，请创建**公共实例** `CreateXYZEntry` 方法，其中 `XYZ` 是属性的名称。  
该方法需要两个参数：
- `TextMenu menu`：应向其添加菜单项的菜单
- `bool inGame`：菜单是否在游戏内打开

Everest 会将以下属性类型转换为以下菜单项：

- `Boolean`
  - `TextMenu.OnOff`
- `Int32` (`int`)
  - `[SettingRange(largeRange: false)]`：`TextMenu.Slider`
  - `[SettingRange(largeRange: true)]`：`TextMenuExt.IntSlider`
  - `[SettingNumberInput]`：`TextMenu.Button`，其会进入 `OuiNumberInput`
- `Enum`
  - `TextMenu.Slider`
- `Single` (`float`)
  - `TextMenu.Button`，按下时会进入 `OuiNumberInput`
- `String`
  - `TextMenu.Button`，按下时会进入 `OuiModOptionString`
- `ButtonBinding`
  - `TextMenu.Button`，按下时会……
    - 对于控制器，向场景添加新的 `ModuleSettingsButtonConfigUI` 实体
    - 对于键盘，向场景添加新的 `ModuleSettingsKeyboardConfigUI` 实体
- 子菜单
  - `TextMenuExt.SubMenu`

> [!TIP] 提示
> 如果你想精确了解 Everest 如何根据代码结构构造你的设置，请查看 [`EverestModule.CreateModMenuSection` :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L639) 中那个 *庞大的方法*。  
>
> Everest 大量使用[反射 :link:](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/reflection-and-attributes/)为你构造模组设置。
> 如果你对 C# 不太熟悉，这段代码可能难以阅读。
>
> 以下是针对给定属性类型的相关代码片段：
> - `Boolean`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L701-L706)
> - `Int32` (`int`) 搭配 `[SettingRange]`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L707-L719)
> - `Int32` (`int`) 或 `Single` (`float`) 搭配 `[SettingNumberInput]`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L720-L748)
> - `Enum`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L749-L763)
> - `String`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L764-L781)
> - `ButtonBinding`
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L531-L532)
> - 子菜单
>   - [链接 :link:](https://github.com/EverestAPI/Everest/blob/a178cc3b863807a72aed1a40706dc1db3b2d3df5/Celeste.Mod.mm/Mod/Module/EverestModule.cs#L813-L847)
>
以下是一个创建 `int` 属性的示例，该属性：
- 在 `40` 和 `50` 之间切换
- 名称来源于 `MODOPTIONS_EXAMPLEMOD_INTEGERTOGGLE` Dialog ID
- 仅在游戏内启用

```cs
// Create the property; then Everest will look for a CreateIntegerToggleEntry and invoke it
public int IntegerToggle { get; set; } = 40;

// If you need to, you can store the menu entry to edit later.
private TextMenu.OnOff IntegerToggleEntry;

// Specify how to create the menu item
public void CreateIntegerToggleEntry(TextMenu menu, bool inGame)
{
    // Create a new TextMenu.OnOff item
    // with the MODOPTIONS_EXAMPLEMOD_INTEGERTOGGLE dialog ID
    // and make it on if IntegerToggle is 50
    menu.Add(IntegerToggleEntry = new TextMenu.OnOff(
        label: Dialog.Clean("MODOPTIONS_EXAMPLEMOD_INTEGERTOGGLE"),
        on: IntegerToggle == 50
    ));

    // Disable it if not in-game
    IntegerToggleEntry.Disabled = !inGame;

    // On change, set IntegerToggle to 50 if on, and 40 if off
    IntegerToggleEntry.Change(newValue => IntegerToggle = newValue ? 50 : 40);
}
```

> [!NOTE] 说明
> `CreateXYZEntry` 方法也适用于子菜单。  
> **但是，第一个参数会从 `TextMenu` 变为 `TextMenuExt.SubMenu`！**
> ```cs
> public ExampleMenu Menu { get; set; } = new();
>
> [SettingSubMenu]
> public class ExampleMenu
> {
>     public int IntegerToggle { get; set; } = 40;
>
>     private TextMenu.OnOff IntegerToggleEntry;
>
>     // Note that the first parameter changes to a TextMenuExt.SubMenu
>     public void CreateIntegerToggleEntry(TextMenuExt.SubMenu subMenu, bool inGame)
>     {
>         subMenu.Add(IntegerToggleEntry = new TextMenu.OnOff(
>             label: Dialog.Clean("MODOPTIONS_EXAMPLEMOD_EXAMPLEMENU_INTEGERTOGGLE"),
>             on: IntegerToggle == 50
>         ));
>
>         IntegerToggleEntry.Disabled = !inGame;
>
>         IntegerToggleEntry.Change(newValue => IntegerToggle = newValue ? 50 : 40);
>     }
> }
> ```
>
---

### 运行时创建设置

`CreateXYZEntry` *并不*一定要与它所命名的属性绑定。事实上，每个 `CreateXYZEntry` 方法并不限于只能创建一个菜单项。  
这可用于创建动态设置菜单。

以下是一个示例：一个包含许多动态开/关设置的子菜单。

```cs
// The dictionary stores the actual dynamic settings
// Remember to make it a public instance property so that it gets serialized
public Dictionary<string, bool> DynamicSettings { get; set; } = new();

// Don't serialize the dynamic menu - there's nothing there anyway
[YamlIgnore]
public DynamicSettingsMenu SettingsMenu { get; set; } = new();

// Create the actual submenu class
[SettingSubMenu]
public class DynamicSettingsMenu
{
    // Create a dummy property so that we can make use of the CreateDummyEntry method
    // We won't be actually using this - we just want the method
    [YamlIgnore]
    public bool Dummy { get; set; }

    // If you need to access the setting items in the future, they'll be stored here
    public Dictionary<string, TextMenu.OnOff> DynamicSettingItems = new();

    // Remember that the first argument becomes a TextMenuExt.SubMenu
    public void CreateDummyEntry(TextMenuExt.SubMenu menu, bool inGame)
    {
        Dictionary<string, bool> dynamicSettings = ExampleModModule.Settings.DynamicSettings;

        foreach ((string settingName, bool settingValue) in dynamicSettings)
        {
            // Note that the setting name won't be translatable
            TextMenu.OnOff settingEntry = new(
                label: settingName,
                on: settingValue
            );

            settingEntry.Change(newValue => dynamicSettings[settingName] = newValue);

            DynamicSettingItems[settingName] = settingEntry;
            menu.Add(settingEntry);
        }
    }
}
```

现在，你可以通过访问 `DynamicSettings` 字典来添加、删除、读取和写入动态设置。

> [!NOTE] 说明
> `CreateXYZEntry` 方法仅在 Mod Options 菜单即将打开时被调用一次。
>
> 这意味着，当 Mod Options 菜单已经打开时添加的动态设置，需要关闭并重新打开菜单才能与其交互。
>
---

### 全屏子菜单（仅主菜单）

要创建全屏子菜单，请创建一个继承自 `OuiGenericMenu` 并实现 `OuiModOptions.ISubmenu` 接口的类。  
*（**Oui** 是 **O**verworld **U**ser **I**nterface（Overworld 用户界面）的缩写）*

然后，要访问该菜单，请调用 `OuiGenericMenu.Goto<T>`。  
它有一个必需参数，即 `Action<Overworld>`，当从当前子菜单返回父菜单时会调用它。如有必要，可以在 `backToParentMenu` 字段中访问它。  
传递给该方法的任何其他参数都可以从该 Oui 的 `parameters` 字段访问。

```cs
// OuiExampleSubmenu.cs

namespace Celeste.Mod.ExampleMod;

public class OuiExampleSubmenu : OuiGenericMenu, OuiModOptions.ISubmenu
{
    // Set the submenu title
    // Titles are generally in all uppercase
    public override string MenuName => "EXAMPLE SUBMENU";

    // Add menu items
    // Note the casing - this method is in camelCase
    protected override void addOptionsToMenu(TextMenu menu)
    {
        // The "return to parent Oui" Action<Overworld> is found in the
        // "backToParentMenu" field

        // Any remaining parameters passed to "OuiGenericMenu.Goto<T>(...)"
        // are present in the "parameters" field

        TextMenu.OnOff exampleToggle = new(
            label: "Example Toggle",
            on: false
        );

        exampleToggle.Change(newValue =>
            Logger.Debug(nameof(OuiExampleSubmenu), $"Example Toggle set to {newValue}.")
        );

        menu.Add(exampleToggle);
    }
}
```

然后，你可以在设置中创建一个按钮，按下时访问该子菜单。

```cs
// Create a dummy property so that we can make use of the CreateSubmenuExampleEntry method
// We won't be actually using this - we just want the method
[YamlIgnore]
public bool SubmenuExample { get; set; }

public void CreateSubmenuExampleEntry(TextMenu menu, bool inGame)
{
    // Only add the button if in the main menu
    if (inGame)
        return;

    TextMenu.Button submenuButton = new("Submenu Example");

    // Go to our custom menu
    // When exiting, return to the Mod Options menu
    submenuButton.Pressed(() =>
        OuiGenericMenu.Goto<OuiExampleSubmenu>(
            backToParentMenu: overworld => overworld.Goto<OuiModOptions>()
        )
    );

    menu.Add(submenuButton);
}
```

---

### 自定义设置项

如果任何内置菜单项不能满足你的需求，你随时可以创建自己的菜单项。

要做到这一点，请创建一个继承自 `TextMenu.Item` 的类，并重写其属性。  
实现完成后，只需将该菜单项添加到 `TextMenu` 中。

> [!TIP] 提示
> 你可以参考现有类，例如 `TextMenu.Button` 或 `TextMenu.Slider<T>`。
>
下面是一个示例菜单项，当按下 *Confirm*、*Left* 或 *Right* 中的任意绑定键时会播放声音。

```cs
// ExampleMenuItem.cs

public class ExampleMenuItem : TextMenu.Item
{
    public string Label;

    public ExampleMenuItem(string label)
        => Label = label;

    // Menu item properties

    public override float LeftWidth()
        => ActiveFont.Measure(Label).X;

    public override float Height()
        => ActiveFont.LineHeight;

    // Mod Search support

    public override string SearchLabel()
        => Label;

    // Interactions

    public override void ConfirmPressed()
        => PlaySound();

    public override void LeftPressed()
        => PlaySound();

    public override void RightPressed()
        => PlaySound();

    private static void PlaySound()
        => Audio.Play(SFX.ui_game_increment_strawberry);

    // Rendering

    public override void Render(Vector2 position, bool highlighted)
    {
        float alpha = Container.Alpha;
        bool isTwoColumn = Container.InnerContent == TextMenu.InnerContentMode.TwoColumn;

        ActiveFont.DrawOutline(
            Label,
            position: position + (isTwoColumn
                ? Vector2.Zero
                : Vector2.UnitX * (Container.Width / 2f)),
            justify: isTwoColumn
                ? Vector2.UnitY / 2f
                : Vector2.One / 2f,
            scale: Vector2.One,
            color: Disabled
                ? Color.DarkSlateGray
                : (highlighted ? Container.HighlightColor : Color.White) * alpha,
            stroke: 2f,
            strokeColor: Color.Black * (alpha * alpha * alpha)
        );
    }
}
```

## 大师级设置

如果你觉得自己足够独立，想完全由自己处理模组选项，你可以在模组模块中定义 `CreateModMenuSection` 方法。

> [!IMPORTANT] 重要
> 因为你重写了该方法，**Everest 将不再处理菜单创建**。  
> 这意味着前述所有特性以及 `CreateXYZEntry` 方法都将失效。
>
```cs
// ExampleModModule.cs

namespace Celeste.Mod.ExampleMod;

public class ExampleModModule : EverestModule
{
    public static ExampleModModule Instance;

    public override Type SessionType => typeof(ExampleModSession);
    public static ExampleModSession Session => (ExampleModSession)Instance._Session;

    public override Type SaveDataType => typeof(ExampleModSaveData);
    public static ExampleModSaveData SaveData => (ExampleModSaveData)Instance._SaveData;

    public override Type SettingsType => typeof(ExampleModSettings);
    public static ExampleModSettings Settings => (ExampleModSettings)Instance._Settings;

    public ExampleModModule()
    {
        Instance = this;
    }

    // Override how the mod menu section is created
    // The pauseSnapshot argument represents the Level.PauseSnapshot,
    // which lets you change how the sound is muffled
    // (for example, when hovering over the Music/SFX sliders in vanilla)
    protected override void CreateModMenuSection(TextMenu menu, bool inGame, EventInstance pauseSnapshot)
    {
        // Remember to add the section header, else your settings won't be visible
        CreateModMenuSectionHeader(menu, inGame, pauseSnapshot);
        
        // Now, add your own stuff!

        // Add your keyboard/controller binding buttons, if necessary
        CreateModMenuSectionKeyBindings(menu, inGame, pauseSnapshot);
    }
}
```

> [!NOTE] 说明
> 如果你还需要控制 Mod Options 区块的创建方式，或控制打开按键绑定菜单的按钮的创建方式，你也可以重写 `CreateModMenuSectionHeader` 和 `CreateModMenuSectionKeyBindings` 方法。
>
>
> ```cs
> // ExampleModModule.cs
>
> namespace Celeste.Mod.ExampleMod;
>
> public class ExampleModModule : EverestModule
> {
>     public static ExampleModModule Instance;
>
>     public override Type SessionType => typeof(ExampleModSession);
>     public static ExampleModSession Session => (ExampleModSession)Instance._Session;
>
>     public override Type SaveDataType => typeof(ExampleModSaveData);
>     public static ExampleModSaveData SaveData => (ExampleModSaveData)Instance._SaveData;
>
>     public override Type SettingsType => typeof(ExampleModSettings);
>     public static ExampleModSettings Settings => (ExampleModSettings)Instance._Settings;
>
>     public ExampleModModule()
>     {
>         Instance = this;
>     }
>
>     protected override void CreateModMenuSectionHeader(TextMenu menu, bool inGame, EventInstance pauseSnapshot)
>     {
>         // Create your Mod Options section header
>     }
>
>     protected override void CreateModMenuSection(TextMenu menu, bool inGame, EventInstance pauseSnapshot)
>     {
>         // Create your Mod Options settings
>         // Make sure to create the header first!
>     }
>
>     protected override void CreateModMenuSectionKeyBindings(TextMenu menu, bool inGame, EventInstance pauseSnapshot)
>     {
>         // Create your Mod Options section key bindings buttons
>         // (the "Keyboard Config" / "Controller Config" buttons)
>     }
> }
> ```
