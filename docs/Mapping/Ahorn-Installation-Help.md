对于任何在安装 Ahorn 时遇到问题的人，请将错误日志发布到 #modding_help，最好是文件形式，或通过粘贴服务（如 [Pastebin :link:](https://pastebin.com/)）提供，然后等待帮助。
错误日志位于 Windows 的 `%localappdata%/Ahorn/error.log`，以及 Linux 和 Mac 的 `~/.config/Ahorn/error.log`。
如果你有信心自己识别并解决问题，下面列出了一些常见问题及其潜在解决方案。

# 以下术语将用于下面的各种情况
* NSIS 安装程序 - Windows 的 .exe 安装文件，附带独立的 Julia
* 跨平台安装程序 - GitHub 网站上的说明，使用 `julia install_ahorn.jl` 运行系统安装的 Julia
* Julia REPL - Julia REPL，即"终端"、"黑框"。可以轻松运行任意 Julia 代码。
* 打开 Julia REPL - 在此情况下还包括激活 Ahorn 环境，见下方指南。
* PATH - 系统环境变量 PATH，命令行在其中搜索程序。

# 如何打开 Julia REPL 并激活 Ahorn 环境
### 使用 NSIS
> 假设使用默认安装位置
>
> 通过导航到 `%localappdata%/CelestialCartographers/Ahorn/julia.bat` 打开 REPL
>
> 正确的环境已由此设置好，你即可开始使用

### 使用跨平台安装
> 正常打开 Julia
>
> 运行以下代码
>
> Windows：`using Pkg; Pkg.activate(ENV["LocalAppData"] * "/Ahorn/env")`
>
> Linux/Mac：`using Pkg; Pkg.activate(ENV["HOME"] * "/.config/Ahorn/env")`

# 常见情况
仍在编写中！你的问题可能（暂时）不在这里！
如果你的问题未在下方列出，请务必查看 `#map_making`、`#modding_help` 和 `#modding_welcome` 中的置顶消息以获取可能的修复方法。

## `julia is not a recognized as an internal or external command`（或 Linux/Mac 上的等效提示）
这意味着你的 PATH 中没有 `julia`。
你可以将 Julia 添加到 PATH 变量中，或用完整路径代替。
在 Windows 上，使用 Julia 1.2.0 时为 `%localappdata%\Julia-1.2.0\bin\julia.exe`。
例如，像这样安装 Ahorn：`%localappdata%\Julia-1.2.0\bin\julia.exe install_ahorn.jl`，假设 install_ahorn.jl 位于当前工作目录中。

## 我安装了 Ahorn，但如何运行它？
### 使用 NSIS：
* 安装程序应该已为你创建了快捷方式，可能在程序列表中，也可能在桌面上。
* 如果没有，你可以运行 `%localappdata%/CelestialCartographers/Ahorn/ahorn.bat`

### 使用跨平台安装：
* 在 Linux 和 Mac 上，安装程序应已在运行 `julia install_ahorn.jl` 的当前目录中创建 `ahorn.sh`。直接在终端中运行它即可。
* 在 Windows 上，你需要从 GitHub 仓库下载 Ahorn.bat

## 启动 Ahorn 时出现"按任意键继续"（Press any key to continue）
这意味着发生了错误，请检查错误日志。

## Ahorn 无法启动，但没有显示上述消息
首次启动相当慢，请给它一些时间。确保你没有冻结终端中的执行（在 Windows 上，通过点击终端会造成这种情况）。

## 错误 `could not load library "libgobject-2.0-0"`
Gtk 构建失败，需要重新构建。
可以通过 Julia REPL 尝试重建（仍有失败的可能，我不确定这确切为何会成为一个问题）。
可能的解决方案：
> 打开 REPL
>
> 运行以下代码
>
> `using Pkg; Pkg.build("Gtk")`
>
> 之后任何错误都应显示在终端中。如果它输出 "false"，或（除了进度图之外）完全没有输出，则问题应已解决。

在某些情况下，GTK 会再次构建失败，我不知道为什么，但对某些人来说，多次重建已经奏效。只需留意 REPL/错误日志，确认是同一个问题即可。

## 错误 `LoadError: LightXML is not properly installed.`
在运行[上文](#如何打开-julia-repl-并激活-ahorn-环境)中的命令后，在 Julia 中运行 `Pkg.build()`。

## 错误 `checkpoints0.data`
该文件随 Celeste 的 Farewell（再见）更新被移动，导致较旧版本的 Ahorn 因缺少该文件而崩溃。
最简单的解决方案是从 Julia REPL 直接更新 Ahorn。
> 打开 REPL
>
> 运行以下代码
>
> `using Pkg; Pkg.update()`
如果没有出现错误，你就完成了。
