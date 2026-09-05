# 目录
- [**目录**](#目录)
- [**游玩模组**](#游玩模组)
  - [**我该从哪里开始？**](#我该从哪里开始)
  - [**我从哪里获取模组？**](#我从哪里获取模组)
  - [**Nintendo Switch 可以安装模组吗？**](#nintendo-switch-可以安装模组吗)
  - [**Steam Deck 可以安装模组吗？**](#steam-deck-可以安装模组吗)
  - [**哪些 PC 版本可以安装模组？**](#哪些-pc-版本可以安装模组)
  - [**我该如何备份存档？**](#我该如何备份存档)
  - [**什么是 .NET Core Everest？**](#什么是-net-core-everest)
- [**制作地图**](#制作地图)
  - [**用什么来制作地图？**](#用什么来制作地图)
  - [**如何游玩我自己做的地图？**](#如何游玩我自己做的地图)
  - [**如何显示文件扩展名？**](#如何显示文件扩展名)
  - [**为什么我的文件夹里必须包含我的昵称和模组名？**](#为什么我的文件夹里必须包含我的昵称和模组名)
  - [**如何隐藏模组实体/触发器/贴花？**](#如何隐藏模组实体-触发器-贴花)
  - [**如何为我的地图修改/添加/配置 \[...\]？**](#如何为我的地图修改-添加-配置)
  - [**在 Lönn 中 \[...\] 叫什么？**](#在-lönn-中-叫什么)
  - [**如何为我的地图添加背景？**](#如何为我的地图添加背景)
  - [**如何为我的地图添加自定义 \[...\]？**](#如何为我的地图添加自定义)
  - [**什么是"Flag（标记）"？**](#什么是-flag-标记)
- [**制作代码模组**](#制作代码模组)
  - [**你们用什么来查看 Celeste 的代码？**](#你们用什么来查看-celeste-的代码)
  - [**你们用什么来修改 Celeste 的代码？**](#你们用什么来修改-celeste-的代码)
  - [**如何开始制作代码模组？**](#如何开始制作代码模组)
  - [**为什么 Core 更新后我无法构建代码模组？**](#为什么-core-更新后我无法构建代码模组)


# 游玩模组

## 我该从哪里开始？
安装 [Olympus :link:](https://everestapi.github.io/#installing-everest)（安装器兼模组管理器）和 [Everest :link:](https://everestapi.github.io/)（模组加载器）。

## 我从哪里获取模组？
大多数人把模组托管在 [GameBanana :link:](https://gamebanana.com/games/6460) 上，但你也可以在 [Celeste Discord :link:](https://discord.gg/6qjaePQ) 的 `#modding_showcase` 和 `#modding_wip` 频道中找到已完成和制作中的模组。

## Nintendo Switch 可以安装模组吗？
<a id="switch"></a>
不可以。更多信息请参阅 [EverestAPI/Everest#963](<https://github.com/EverestAPI/Everest/issues/963>)。

<!-- 
确实曾有过一个工具包允许模组作者对 Switch 版本应用内容补丁，但它没有针对引入第 9 章的版本进行更新。如果你碰巧持有第 9 章之前的副本，请参阅 [本页面](https://github.com/EverestAPI/Resources/wiki/Nintendo-Switch-Modding) 的旧版本修订。
-->

## Steam Deck 可以安装模组吗？
可以，请遵循 [Linux 安装说明 :link:](https://everestapi.github.io)。

## 哪些 PC 版本可以安装模组？
<a id="pc"></a>
截至本文撰写之时：

:heavy_check_mark: Steam、Epic Games 和 itch.io 版本**可以**安装模组。

:x: Microsoft / Xbox Store 版本**无法**安装模组。  
更多信息请参阅来自 [Celeste Discord :link:](https://discord.gg/6qjaePQ) 的 [这条帖子 :link:](https://discord.com/channels/403698615446536203/683777712115941407/774671383828496514)（此处为转述）：
>- **游戏按每个用户的许可证进行了加密**，意味着**除非破解游戏，否则无法安装模组，哪怕只是想替换地图或文本都不行**。
>- 它基于 [通用 Windows 平台 :link:](https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide) 和 [.NET Native :link:](https://docs.microsoft.com/en-us/dotnet/framework/net-native/net-native-and-compilation) 构建，意味着**模组加载器必须被完全重写**。
>- 简而言之，**UWP 版 Celeste 与 Xbox 版本一样被高度锁定。无论是 Celeste 开发者还是模组社区都无法改变这一点**。

请注意，在 Windows 上实际有两个版本的游戏可供选择：XNA 和 FNA，它们的行为略有不同；在 Steam 上你可以通过选择 "opengl" 测试版来启用 FNA 版本。

## 我该如何备份存档？
复制一份 `Saves` 文件夹即可。它的位置是：
- Windows 上：`[游戏位置]\Saves`
- macOS 上：`$HOME/Library/Application Support/Celeste/Saves`，默认为 `/Users/[用户名]/Library/Application Support/Celeste/Saves`
- Linux 上：`$XDG_DATA_HOME/Celeste/Saves`，默认为 `/home/[用户名]/.local/share/Celeste/Saves`

## 什么是 .NET Core Everest？
正如一些读者可能已经知道的，Celeste 是用 C# 编写的，这是 .NET 生态系统中的一种语言。
基础游戏以及旧版本的 Everest 过去都运行在一个名为 .NET Framework 的较旧 .NET 运行时上。
.NET Core Everest，顾名思义，运行一个更现代的运行时，它简称为 ".NET"（它过去叫作 .NET Core——要怪就怪微软不好好命名吧）。

切换运行时带来了众多优势；参见以下（转述的）最初公告中的优势列表：
> **对玩家而言：**
> - 与模组完全向后兼容
> - `core` 分支的 Windows 安装以 64 位进程而非 32 位进程运行。**这意味着 4GB 内存限制不复存在，Celeste 现在可以利用你系统中的全部内存！**
> - **所有平台上的性能都有大幅提升：据报告，加载时间最高可缩短一半**（首次启动可能耗时更久，因为 Everest 需要重建 relinker 缓存）
> 
> **对模组作者而言：**
> - 可以为你的模组使用最新的跨平台工具，包括调试器
> - 能够使用现代 .NET API 的改进，例如快速的 `Span`s
> - 使用 `reorg` MonoMod 取代旧版 legacy MonoMod，提升了 hook 的性能和稳定性
> - 所有平台间完全技术一致。在一个平台上制作的模组现在应当总能开箱即用地在所有其他平台上运行，而不是偶尔遇到 API 差异或其他兼容性问题

Everest 4465 及以上版本运行在 .NET Core Everest 上，而 4449 及以下版本被视为 legacy（旧版）。如果你有一阵子没玩了，请务必更新 Everest。

如果你遇到任何问题，欢迎到[官方 Celeste Discord 服务器 :link:](https://discord.gg/celeste) 的 `#modding_help` 频道告诉我们！

# 制作地图

## 用什么来制作地图？
[Lönn :link:](https://github.com/CelestialCartographers/Loenn/blob/master/README.md)，由社区制作的地图制作程序。它是一个可视化编辑器，完全支持模组实体。  
Lönn 可以通过 [Olympus :link:](https://everestapi.github.io/#olympus) 安装（推荐），也可以按照 [README 页面 :link:](https://github.com/CelestialCartographers/Loenn/blob/master/README.md) 上的说明手动安装。

## 如何游玩我自己做的地图？
一旦你安装了 Everest，只需把 Lönn 保存的 `.bin` 文件放入 Celeste 安装文件夹内的 Mods 文件夹中，就可以游玩你的地图了。  
*然而*，推荐遵循 [Mod 结构](https://github.com/EverestAPI/Resources/wiki/Mod-Structure) 指南，因为它允许你添加自定义资源、在游戏内更改地图名称等等。

## 如何显示文件扩展名？

在资源管理器中点击 "View"（查看）菜单，然后在 Show（显示）部分点击 "File name extensions"（文件扩展名）。

### Windows 10

![在资源管理器中启用"文件扩展名"](https://github.com/EverestAPI/Resources/assets/52103563/c3952fd0-ba87-4ce8-828d-ded455265940)

### Windows 11

![在 Windows 11 资源管理器中启用"文件扩展名"](https://github.com/user-attachments/assets/a6d26b7d-92b9-45c5-be1c-6b9134cece29)

## 为什么我的文件夹里必须包含我的昵称和模组名？
<a id="conflicts"></a>
在 Celeste 加载期间，Everest 会将所有自定义资源与基础游戏的资源合并。在此过程中，*它不会追踪资源来自哪个模组*。  
这意味着如果两个模组在 *相对于模组文件夹* 的相同位置有一个文件，其中一个将覆盖另一个。这也适用于原版资源，并且强烈不建议覆盖原版资源（贴图、地图、对话等），因为很难确定是哪个模组覆盖了它们。  
> [!NOTE] 说明
> 有些文件由 Everest 特殊处理，冲突的文件会被合并而不是被覆盖。  
> 例子包括对话文件以及 `Graphics` 下顶层的 `.xml` 文件，如 `Sprites.xml`。
>
## 如何隐藏模组实体/触发器/贴花？
Lönn 在 *View*（视图）选项卡下有一个 *Dependency Only*（仅依赖项）设置，它允许你隐藏来自你不依赖的模组的所有实体、触发器和贴花。

原版以及 Everest 的实体和触发器将始终可见。

## 如何为我的地图修改/添加/配置 \[...\]？
请查看 [Mod 结构](https://github.com/EverestAPI/Resources/wiki/Mod-Structure) 和 [地图元数据](../Mapping/Map-Metadata.md) 页面，你的问题很可能在那里得到解答。

## 在 Lönn 中 \[...\] 叫什么？
请参阅 [基础游戏实体](../Mapping/Entity-and-Trigger-Documentation.md) 列表。无论是 celeste.ink 还是 Celeste Fandom 百科都无法提供 Lönn 中使用的所有名称。

## 如何为我的地图添加背景？
阅读 [风格地面](../Mapping/Adding-Stylegrounds.md) 指南。

## 如何为我的地图添加自定义 \[...\]？
1. 查找是否有一个 wiki 页面涵盖该主题（也记得看看侧边栏！）：  
   [对话](../Mapping/Adding-Custom-Dialogue.md)、[图块集](../Mapping/Custom-Tilesets.md)、[头像](../Mapping/Custom-Portraits.md)、[音乐/音频](../Mapping/Adding-Custom-Audio.md)
2. 同时务必查看 [Mod 结构](https://github.com/EverestAPI/Resources/wiki/Mod-Structure) 和 [地图元数据](../Mapping/Map-Metadata.md) 页面
3. 寻找一个能满足你需求的现成 [自定义实体 :link:](https://maddie480.ovh/celeste/custom-entity-catalog)
4. 在 [Celeste Discord :link:](https://discord.gg/6qjaePQ) 的 `#modding_help` 频道中提问

## 什么是"Flag（标记）"？
<a id="flags"></a>
简而言之，会话标记（session flag）是一种可以被启用或禁用的事物。  
当开始一个关卡时，所有标记都处于禁用状态，并且可以通过标记触发器、某些自定义实体以及 [Lua 过场动画 :link:](https://gamebanana.com/mods/53678) 来打开/关闭它们。  
标记对两件事特别有用：
1. 当你启用一个标记后，它会一直保持启用状态，直到玩家退出或重新开始你的关卡，因此你可以用它让某件事只发生一次。
2. 很多东西会对标记的启用或禁用做出反应，比如标记开关门或风格地面，这让你可以轻松地在不同的辅助物之间创建新的交互。

最容易上手摆弄标记的方式是使用 Pandora's Box 模组中的 Lever（杠杆）和 Lamp（灯）。将两个实体的标记属性设为相同的值，你就可以通过扳动杠杆来切换该会话标记，而灯会相应地做出反应。

# 制作代码模组

## 你们用什么来查看 Celeste 的代码？
有很多不同的 [反编译器 :link:](https://en.wikipedia.org/wiki/Decompiler) 可以用来查看 Celeste 的代码，常用的是 [dnSpy :link:](https://github.com/dnSpyEx/dnSpy) 和 [ILSpy :link:](https://github.com/icsharpcode/ILSpy)。

## 你们用什么来修改 Celeste 的代码？
虽然 dnSpy 允许你直接修改 Celeste 的代码，但这并不是一种真正可行的向他人分发模组的方式。  
Everest 使用 [MonoMod :link:](https://github.com/MonoMod/MonoMod)，它允许方法在运行时被 "hook" 或改写路径。如果你确实发现某样东西_必须_由 Everest 打补丁，请到 Discord 服务器的 `#modding_help` 频道中寻求帮助。

## 如何开始制作代码模组？
[设置你的代码模组](../Coding/Code-Mod-Setup.md)，然后尝试 [修改原版代码](../Coding/Making-Code-Mods.md)、制作[自定义实体](../Coding/Custom-Entities,-Triggers-and-Stylegrounds.md)，或[编写你自己的过场动画](../Coding/Creating-Custom-Events.md)。本 wiki 假设你已具备 C# 编程语言的既有知识。

## 为什么 Core 更新后我无法构建代码模组？
较旧的代码模组需要迁移才能在 .NET Core 版本的 Everest 上正常工作——参见[迁移指南](https://github.com/EverestAPI/Resources/wiki/Code-Mod-Core-Migration-Guide)了解具体做法。
