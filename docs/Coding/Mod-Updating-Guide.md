每当 Everest 升级其 [.NET runtime :link:](https://github.com/dotnet/runtime) 时，模组都需要相应地更新源代码，才能使用更新的运行时进行构建。幸运的是，这类改动通常很简单。

模组主要有两种：旧式模组（Legacy Mod）和核心模组（Core Mod），每种所需的改动不同。下面会详细介绍两者。


# 判断模组是旧式模组还是核心模组
旧式模组以 .NET Framework 为目标，而核心模组以 .NET Core 为目标。如果你知道如何识别，可以直接跳到下方相应的章节。

你可以通过打开其 `.csproj` 文件来确定模组是旧式还是核心（如果你有多个这样的文件，那你可能已经知道自己在做什么了）。找到 `TargetFramework` 标记（或 `TargetFrameworks`）并检查其中的值：
```xml
<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <TargetFramework>netXXX</TargetFramework>
        <AssemblyName>CelesteMod</AssemblyName>
...
```
- 值为 `net452`：它是旧式模组。
- 值为 `netX.0`（X 大于或等于 7）：它是核心模组。
- 没有出现 `TargetFramework`：该模组很可能不使用 [sdk 风格的项目 :link:](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview)，而是使用旧版的项目文件。它很可能是旧式模组，但要确定的话：请改为查找 `TargetFrameworkVersion`，如果出现 `v4.5.2`，则它是旧式模组。

# 旧式模组（Legacy Mod）
旧式模组（也称"非核心模组"）是那些*不*以 Core Everest 版本为目标的模组，因此它们使用 .NET Framework 搭配旧版 Everest。旧版 Everest 已停止维护，最后一个稳定版本是 [Everest 4449 :link:](https://github.com/EverestAPI/Everest/releases/tag/stable-1.4449.0)。

## 升级旧式模组
请参阅[代码模组核心迁移指南](https://github.com/EverestAPI/Resources/wiki/Code-Mod-Core-Migration-Guide)获取升级指南。


# 核心模组（Core Mod）
核心模组是以某个 Core Everest 版本为目标的模组。不过，这可能仍不足以让模组使用最新的 .NET Core Everest 版本构建。版本不匹配会表现为类似如下的构建错误：`Error CS1705 : Assembly 'Celeste' with identity 'Celeste, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null' uses 'System.Runtime, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a' which has a higher version than referenced assembly 'System.Runtime' with identity 'System.Runtime, Version=7.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'`

## 升级核心模组
> [!WARNING] 警告
> 在不调整 everest.yaml 中 Everest 依赖的情况下更改目标框架版本，会导致模组在旧版 Everest 上崩溃。
>
1. 确保你安装了当前稳定版的 Everest。使用更新的 .NET 版本会使你的模组与使用较旧 .NET 版本的 Everest 不兼容，因此如果你意外地针对使用更新 .NET 版本的开发版构建，你的模组将无法在稳定版 Everest 上工作。
2. 将 everest.yaml 文件中的 Everest 依赖改为当前稳定版本。否则，你的模组会使旧版 Everest 崩溃，而不是告诉玩家更新。
3. 将 .csproj 文件中的 `TargetFramework` 值改为 Everest 当前使用的值。最新的 Everest 版本使用 .NET 8，对应 `net8.0`。使用任何其他版本都将导致模组构建失败。
