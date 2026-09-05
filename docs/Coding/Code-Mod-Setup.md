# 目录

* [项目搭建](#项目搭建)
  * [先决条件](#先决条件)
* [模组类](#模组类)
* [模组设置、会话与存档数据](#模组设置-会话与存档数据)

<!--
  注释掉本篇和对应的文章：我还没见过有人需要求助于手动代码模组搭建。
  我暂时不打算删除它，以防万一，而且删掉也太浪费了。
  如果你觉得确实有必要恢复手动搭建指南，尽管去做——但请在 #modding_dev 或别处告诉我们。

  - Snip（2023 年 12 月 19 日）

  * [手动搭建](#手动搭建)
-->

# 项目搭建

## 先决条件

- [Everest :link:](https://everestapi.github.io/)
- 一款支持 C# 语言的 IDE，例如：
  - [JetBrains Rider :link:](https://www.jetbrains.com/rider/) *（自 [2024 年 10 月 24 日起 :link:](https://blog.jetbrains.com/blog/2024/10/24/webstorm-and-rider-are-now-free-for-non-commercial-use-2/) 对非商业用途免费）*
  - [Visual Studio :link:](https://visualstudio.microsoft.com/)
  - 安装了 [C# Dev Kit :link:](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) 扩展的 [Visual Studio Code :link:](https://code.visualstudio.com)
  - 或者其他
- [.NET 8.0 SDK 或更高版本 :link:](https://dotnet.microsoft.com/en-us/download/dotnet/latest)

Celeste 使用 C# 编写，运行在 .NET Framework 4.5.2 上。现代版本的 Everest 会将 Celeste 转换到 .NET Framework 的现代继任者 .NET 8.0 上运行。因此，所有新的代码模组都以面向 .NET 8.0 的 C# 类库项目起步。

一些旧代码模组并不面向 .NET Core 8.0。Everest 5577 之前制作的模组面向 .NET Core 7.0，而 Everest 4465 之前制作的模组面向 .NET Framework 4.5.2。   
面向 .NET Framework 的模组称为*旧版模组（legacy mods）*，而面向 .NET Core 的模组则称为*核心模组（core mods）*。核心模组可以使用所有现代 C# 特性，并拥有许多其他优势。

> [!IMPORTANT] 重要
> Everest 使用[语义化版本控制 :link:](https://semver.org/)。  
> 这意味着版本号遵循 `MAJOR.MINOR.PATCH` 的格式，并且**更改主版本号必定会破坏依赖你的代码模组的模组。**
>
> 所以，如果一个模组依赖 YourMod 1.3.5：
> - 安装 YourMod 1.0.x 将无法工作
> - 安装 YourMod 1.3.0 将无法工作
> - 安装 YourMod 1.3.5 将正常工作（当然）
> - 安装 YourMod 1.6.x 将正常工作
> - **安装 YourMod 2.0.x 将无法工作**。用户将不得不改用 YourMod 1.3.x 或更高版本。
>
搭建代码模组最简单的方式是使用 [CelesteMod.Templates dotnet 模板 :link:](https://github.com/EverestAPI/CelesteModTemplate)。

### Windows

首先，你需要在 **Windows Terminal** 中打开你的 `Mods` 文件夹。例如，你可以打开 Olympus，在 *Installations* 下点击 *Manage*，然后点击 *Browse*。此时应会弹出一个**文件资源管理器（File Explorer）**窗口。

右键点击 `Mods` 文件夹，然后点击 *Open in Terminal*（在终端中打开）。

![在终端中打开窗口](https://github.com/EverestAPI/Resources/assets/49392266/1acd0256-02f2-4af0-b6fc-25e45a8bb6ea)

> [!NOTE] 说明
> 如果你没有 *Open In Terminal* 选项，可以改为 <kbd>Shift</kbd>+右键点击 `Mods` 文件夹，然后选择 *Open PowerShell window here*（在此处打开 PowerShell 窗口）。
>
如果你从未制作过代码模组，需要先安装模板。在终端中输入以下命令并按 <kbd>Enter</kbd>。
```
dotnet new install CelesteMod.Templates
```

> [!TIP] 提示
> 记得不时运行 `dotnet new update`，以确保你的代码模组模板是最新的。
>
然后，要实际使用该模板，请输入以下命令。  
记得将 `MyCelesteMod` 替换为你的模组名称。

```batch
md MyCelesteMod
cd MyCelesteMod
dotnet new celestemod
```

> [!TIP] 提示
> 你可以向 `dotnet new celestemod` 命令添加参数来调整模板。这些参数在[模板仓库 :link:](https://github.com/EverestAPI/CelesteModTemplate)中有说明。
>
> 例如，`dotnet new celestemod --Samples` 会为你生成一些示例实体：一个普通实体、一个固态实体（solid）和一个触发器（trigger）。
> 如果你想进一步了解它们，请查看[自定义实体、触发器与风格背景](Custom-Entities,-Triggers-and-Stylegrounds.md) 维基页面！
>
你应该会看到类似这样的输出：

![命令输出](https://github.com/EverestAPI/Resources/assets/49392266/9c5d57a4-7dd5-481c-8cd9-897e04a71553)

关闭 Terminal 窗口。  
然后打开 `Mods` 里面的 `MyCelesteMod` 文件夹。

要打开模组项目，请双击解决方案（`.sln`）文件。

### Linux/macOS

打开终端（Terminal）。

如果你从未制作过代码模组，需要先安装模板。在终端中输入以下命令并按 <kbd>Enter</kbd>。
```
dotnet new install CelesteMod.Templates
```

> [!TIP] 提示
> 记得不时运行 `dotnet new update`，以确保你的代码模组模板是最新的。
>
然后，要实际使用该模板，请先用 `cd` 导航到你的 `Celeste/Mods` 文件夹，再输入以下命令。  
记得将 `MyCelesteMod` 替换为你的模组名称。

```sh
mkdir MyCelesteMod
cd MyCelesteMod
dotnet new celestemod
```

> [!TIP] 提示
> 你可以向 `dotnet new celestemod` 命令添加参数来调整模板。这些参数在[模板仓库 :link:](https://github.com/EverestAPI/CelesteModTemplate)中有说明。
>
> 例如，`dotnet new celestemod --Samples` 会为你生成一些示例实体：一个普通实体、一个固态实体（solid）和一个触发器（trigger）。
> 如果你想进一步了解它们，请查看[自定义实体、触发器与风格背景](Custom-Entities,-Triggers-and-Stylegrounds.md) 维基页面！
>
关闭 Terminal 窗口。  
然后打开你的 `Mods` 文件夹中的 `MyCelesteMod` 文件夹。

要打开模组项目，请使用 Visual Studio Code 打开**文件夹**（请确保已安装 C# Dev Kit 扩展），或使用你的 IDE 打开解决方案（`.sln`）文件。

<!--
## 手动搭建

> [!NOTE] 说明
> 本指南不涉及如何在 Core 版 Everest 安装上搭建非 Core 模组。这种情况请使用上面的模板。
>
这种搭建方式不需要 NuGet 或 git，但如果你是 Windows 用户，需要切换到 OpenGL 分支。Linux 和 macOS 用户已经在使用 FNA。**Everest 会在运行时把你的模组从 FNA 重新链接到 XNA。**
- 在 Steam 中，右键点击库中的游戏，选择"属性"，然后选择 `opengl` "beta"。
- 在 itch 中，直接安装 Celeste Windows OpenGL 版本。
- Epic Games 已经在使用 FNA。

请注意，使用模组并不需要在 OpenGL 版本上*游玩*，因此可以只用一份游戏文件副本专门用来构建模组。

更新完成后，请务必重新安装 Everest。

- 打开你的 C# IDE。出于教程目的，这里使用的 IDE 是 Visual Studio。
- 新建一个项目。
- 在顶部栏选择 `.NET Framework 4.5.2`（Core 模组选择 `.NET 7.0`）。
- 在左侧栏选择 `Installed` > `Visual C#`。
- 选择模板 `Class Library` 或 `Class Library (.NET Framework)`（**不是** `Standard`、`Core`、`Portable`、`Universal Windows` 等）。
- 在 Celeste/Mods 中创建你的模组。

对话框应该类似这样：

![1-newproj](https://user-images.githubusercontent.com/1200380/55094149-1a7a3f80-50b6-11e9-89bc-939573f4b578.png)

- 新建一个内容如下的 `everest.yaml` 文本文件（Core 模组请将 `Name: Everest` 替换为 `Name: EverestCore`）：

```yaml
- Name: YourMod
  Version: 1.0.0
  DLL: Code/bin/Debug/YourMod.dll
  Dependencies:
    - Name: Everest
      Version: 1.0.0
```

> [!NOTE] 说明
> 关于模组结构、`everest.yaml` 格式、如何添加额外内容以及如何打包你的模组，请[阅读模组结构页面](https://github.com/EverestAPI/Resources/wiki/Mod-Structure)。
>
- 右键点击项目的 "References"，选择 "Add Reference..."，然后 "Browse..." 到你的 Celeste 安装目录，并按下图所示设置你的引用（添加相关引用，移除自动添加的多余引用）：

![2-refs](https://user-images.githubusercontent.com/1200380/55094153-1bab6c80-50b6-11e9-8135-2d484d589ab4.png)

你会在 Celeste 安装目录中找到这些引用的大多数 dll 文件。对非 Core 模组而言，"Celeste" 就是 Celeste.exe 本身。

> [!IMPORTANT] 重要
> 务必选中所有这些引用，右键 > "属性"，并将 "Copy Local" 设置为 "False"，否则你会不小心把这些文件的副本打包进模组！
>
> [!WARNING] 警告
> 如果你想保持非 Core 模组的跨平台兼容性，请确保只使用下面这个列表中的 .NET Framework 系统库（依赖项，而不是命名空间）。  
> Core 模组在可以安全访问哪些 API 方面没有限制。
> - `System`
> - `System.Configuration`
> - `System.Core`
> - `System.Data`
> - `System.Drawing`（可用，但行为不可预测）
> - `System.Runtime.Serialization`
> - `System.Security`
> - `System.Xml`
> - `System.Xml.Linq`
>
> 这意味着：`Microsoft.CSharp`、`System.Windows.[anything]`、`System.IO.Compression` 以及其他库都必须从你的引用中移除。  
> 如需最新列表，请查看[预编译 MonoKickstart 库列表 :link:](https://github.com/flibitijibibo/MonoKickstart/tree/02b1b80e61c1be2341133cb7e17806728dc55ddd/precompiled)，因为 Celeste 在 Linux / macOS 上会用到它们。
>
</p>
</div>

----

-->


<!--

TODO：把这几节的信息合并到现有文章中，我认为
- Snip @ 2025-08-29

## 模组类

要让你的模组能够加载，你**必须**在项目中创建一个继承 `EverestModule` 的类。（不过如果你不需要，`Load()` 和 `Unload()` 方法可以留空。）

你的模组类应该和下面的示例类似。

> [!NOTE] 说明
> 这个示例只展示了 Everest 能力的一部分。  
> [**有关 Everest 还能做什么的更多内容，请参见 `ExampleMod/ExampleModule`。** :link:](https://github.com/EverestAPI/ExampleMod/blob/master/ExampleModule.cs)
>
```cs
// Example usings.
using Celeste.Mod.UI;
using FMOD.Studio;
using Microsoft.Xna.Framework;
using Monocle;
using Celeste;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Mod.Example {
    public class ExampleModule : EverestModule {

        // Only one alive module instance can exist at any given time.
        public static ExampleModule Instance;

        public ExampleModule() {
            Instance = this;
        }

        // Check the next section for more information about mod settings, save data and session.
        // Those are optional: if you don't need one of those, you can remove it from the module.

        // If you need to store settings:
        public override Type SettingsType => typeof(ExampleModuleSettings);
        public static ExampleModuleSettings Settings => (ExampleModuleSettings) Instance._Settings;

        // If you need to store save data:
        public override Type SaveDataType => typeof(ExampleModuleSaveData);
        public static ExampleModuleSaveData SaveData => (ExampleModuleSaveData) Instance._SaveData;

        // If you need to store session data:
        public override Type SessionType => typeof(ExampleModuleSession);
        public static ExampleModuleSession Session => (ExampleModuleSession) Instance._Session;

        // Set up any hooks, event handlers and your mod in general here.
        // Load runs before Celeste itself has initialized properly.
        public override void Load() {
        }

        // Optional, initialize anything after Celeste has initialized itself properly.
        public override void Initialize() {
        }

        // Optional, do anything requiring either the Celeste or mod content here.
        public override void LoadContent(bool firstLoad) {
        }

        // Unload the entirety of your mod's content. Free up any native resources.
        public override void Unload() {
        }

    }
}
```

## 模组设置、会话与存档数据

模组可以定义几个类来保存额外数据：
* **模组设置**（`EverestModuleSettings`）：用于保存_全局_数据（例如设置）。这些数据可以出现在"模组选项（Mod Options）"中，并保存在 `Saves/modsettings-[modname].celeste`。
* **模组存档数据**（`EverestModuleSaveData`）：用于保存与某个存档文件相关的数据（如果玩家加载另一个存档，将使用另一份存档数据）。例如，可以用来保存统计数据或玩家的进度。保存在 `Saves/[savenumber]-modsave-[modname].celeste`。
* **模组会话**（`EverestModuleSession`）：用于保存与某次游戏会话相关的数据。每次玩家开始一个关卡时，这些数据都会被重置；因此如果玩家重开章节，它会被重置，但如果玩家选择保存并退出，它会被保存下来。例如，可以用来保存某个实体的状态。保存在 `Saves/[savenumber]-modsession-[modname].celeste`。

你的设置类应该和下面的示例类似。

存档数据类和会话类非常相似，只是分别继承自 `EverestModuleSaveData` / `EverestModuleSession`，并且 `Setting*` 特性会被忽略。

> [!IMPORTANT] 重要
> **所有条目都必须是属性**，除非你重写 `Load/SaveSettings`、`Read/Write/Deserialize/SerializeSaveData` 和 `Read/Write/Deserialize/SerializeSession` 来绕过 YamlDotNet 的限制。
>
> [!NOTE] 说明
> 这个示例只展示了 Everest 能力的一部分。  
> **关于模组设置还能做什么，请参见[模组设置](https://github.com/EverestAPI/Resources/wiki/Mod-Settings)维基页面和 [`ExampleMod/ExampleModuleSettings` :link:](https://github.com/EverestAPI/ExampleMod/blob/master/ExampleModuleSettings.cs)。**
>
```cs
// Example usings.
using Celeste;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YamlDotNet.Serialization;

namespace Celeste.Mod.Example {
    // If no SettingName is applied, it defaults to
    // modoptions_[typename without settings]_title
    // The value is then used to look up the UI text in the dialog files.
    // If no dialog text can be found, Everest shows a prettified mod name instead.
    [SettingName("modoptions_examplemodule_title")]
    public class ExampleModuleSettings : EverestModuleSettings { 

        // SettingName also works on props, defaulting to
        // modoptions_[typename without settings]_[propname]

        // Example ON / OFF property with a default value.
        public bool ExampleSwitch { get; set; } = false;

        [SettingIgnore] // Hide from the options menu, but still load / save it.
        public string ExampleHidden { get; set; } = "";

        [SettingRange(0, 10)] // Allow choosing a value from 0 (inclusive) to 10 (inclusive).
        public int ExampleSlider { get; set; } = 5;

        [SettingRange(0, 10)]
        [SettingInGame(false)] // Only show this in the main menu.
        public int ExampleMainMenuSlider { get; set; } = 5;

        [SettingRange(0, 10)]
        [SettingInGame(true)] // Only show this in the in-game menu.
        public int ExampleInGameSlider { get; set; } = 5;

        [YamlIgnore] // Don't load / save it, but show it in the options menu.
        [SettingNeedsRelaunch] // Tell the user to restart for changes to take effect.
        public bool LaunchInDebugMode {
            get {
                return Settings.Instance.LaunchInDebugMode;
            }
            set {
                Settings.Instance.LaunchInDebugMode = value;
            }
        }

        // Example string property. Selecting it will show a file naming-like menu.
        // Max length defaults to 12 if the attribute is not set.
        [SettingMaxLength(40)]
        public string ExampleString { get; set; } = "test";

        public int SomethingWeird { get; set; } = 42;

        // Custom entry creation methods are always called Create[propname]Entry
        // and offer an alternative to overriding CreateModMenuSection in your module class.
        public void CreateSomethingWeirdEntry(TextMenu menu, bool inGame) {
            // Create your own menu entry here.
            // Maybe you want to create a toggle for an int property?
        }

    }
}
```

-->

## 代码模组热重载

为了方便起见，Everest 提供了一个设置，可以在代码模组构建完成后于游戏内自动重新加载它们。要启用它，请打开 `Celeste/Saves` 文件夹中的 `modsettings-Everest.celeste`，并将选项 `CodeReload_WIP` 设置为 `true`。

请注意，该功能仍在开发中，因此它可能不会一直表现正常。重启通常能确保所有内容被正确加载。
