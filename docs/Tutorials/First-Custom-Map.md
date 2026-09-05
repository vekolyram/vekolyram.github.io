本教程将带你创建一张非常简单的自定义地图，并将其打包为可发布的状态。

本页假定你已经安装好了 [Everest :link:](https://everestapi.github.io)。

# 目录：

<details>
<summary>点击展开目录</summary>

*    [必备软件](#必备软件)
*    [模组搭建](#模组搭建)
*    [配置 Lönn](#配置-lönn)
*    [创建地图](#创建地图)
*    [保存地图](#保存地图)
*    [游玩你的地图](#游玩你的地图)
*    [添加更多房间](#添加更多房间)
*    [修改名称](#修改名称)
*    [打包你的模组](#打包你的模组)
*    [技巧与提示](#技巧与提示)

</details>

# 必备软件
通过 [Olympus :link:](https://everestapi.github.io/#installing-everest) 安装 [Lönn :link:](https://github.com/CelestialCartographers/Loenn)，或者下载并解压最新的 [GitHub Release :link:](https://github.com/CelestialCartographers/Loenn/releases)。

# 模组搭建
按照 [模组搭建教程](https://github.com/EverestAPI/Resources/wiki/Mod-Setup) 来搭建你的模组。

在你的模组文件夹内创建以下文件夹。`Maps` 文件夹应该与 `everest.yaml` 文件同级：
```
Celeste
- Mods
  - MyExampleMod
    - Maps
      - MyName
        - MyExampleMod
```

# 配置 Lönn
启动 Lönn，并在提示时选择你 Celeste 安装目录下的 `Celeste.exe` 文件（如果你在 core 分支上，则选择 `Celeste.dll`）。

默认情况下，Lönn 会打开原版的 Summit 地图。**不要去编辑它**。在菜单中选择 `File` -> `New` 来创建一张新地图。

![New File Menu](https://user-images.githubusercontent.com/53288101/211238443-1833a471-1362-4f1e-a477-aa2777c08950.png)


# 创建地图

## 创建房间
首先通过 `Room` -> `Add` 创建一个房间。在出现的窗口中，为你的房间输入一个名称（例如："a-00"），点击 `Save changes`，然后点击 `Close window`。
![Create Room Window](https://user-images.githubusercontent.com/53288101/211238445-2bfa5978-1534-4183-9c6c-2e085cc43f04.png)
滚动滚轮可以缩放视图，按住右键拖动画布可以将房间居中到屏幕上。

## 添加图块
现在添加一些图块。在屏幕右侧的菜单中，选择 `Brush` -> `Foreground Tiles` -> `Stone`，然后在房间内点击并拖动来绘制图块。
![Tile Placement](https://user-images.githubusercontent.com/53288101/211238446-4c9fe0e0-e97e-49cb-9a22-186c0ff26d38.png)

## 添加出生点
最后，通过选择 `Placements` -> `Entities` -> `Player (Spawn Point)` 来添加一个出生点。注意选择菜单底部的搜索栏，一个常见的错误是搜索栏里残留了内容，导致没有任何放置项或图块显示出来。
![Player Spawn Point Placement](https://user-images.githubusercontent.com/53288101/211238447-69bafd79-b3ea-45f4-aea1-154ed313426a.png)

**:warning: 每个可游玩的房间 *必须* 包含至少一个 Player Spawn Point（玩家出生点）实体。**


# 保存地图
在菜单中选择 `File` -> `Save` 打开保存窗口。在窗口内，导航到你之前在 [模组搭建](#模组搭建) 中创建的文件夹。将地图保存到 `Celeste/Mods/MyExampleMod/Maps/MyName/MyExampleMod/`，命名为 `MyMap.bin`。


# 游玩你的地图
使用 [DEBUG 存档文件](https://github.com/EverestAPI/Resources/wiki/Debug-Mode#the-debug-save) 启动 Everest，并进入地图选择界面。在这里你可以使用上下方向键在关卡合集（level sets）之间切换，或按 Journal 按钮进行搜索。

找到你的地图并打开它。它目前会以 `MyName_MyExampleMod_MyMap` 的名称显示在 `MyName_MyExampleMod` 关卡合集中。这些问题将在 [本教程后面的部分](#修改名称) 解决。

如果在加载地图时遇到任何错误，请把它们发布到 [Celeste Discord :link:](https://discord.gg/celeste) 服务器的 `#modding_help` 频道。


# 添加更多房间
回到 Lönn，再次打开 `Room` -> `Add` 菜单。给它一个新名称（例如："a-01"），按下 `Save changes` 和 `Close window`。

:information_source: 新房间可能会创建在现有房间的上方，导致看起来像是空的。

按住 `Alt` 的同时使用方向键可以移动新房间。把它移动到现有房间旁边，让它们相邻但不重叠。

现在，重复添加图块和 `Player (Spawn Point)` 实体的过程。
![Adding more rooms](https://user-images.githubusercontent.com/53288101/211241911-b9b43850-9ce2-44da-87e2-70497d538488.png)

保存地图后，Everest 中的内容应该会刷新以显示新的更改。

# 修改名称
如前所述，地图当前显示的名称是 `MyName_MyExampleMod_MyMap`，它反映的是 .bin 文件的存放位置。

你可以通过向游戏添加合适的 [对话键（dialog keys）](https://github.com/EverestAPI/Resources/wiki/Generated-Dialog-Keys) 把它改成任何你想要的名称。

首先在你的模组里 `Maps` 文件夹旁新建一个文件夹，命名为 `Dialog`。在其中创建一个名为 `English.txt` 的文本文件。你的模组现在应该有这样的结构：
```
Celeste
- Mods
  - MyExampleMod
    - Dialog
      - English.txt
    - Maps
      - MyName
        - MyExampleMod
          - MyMap.bin
    - everest.yaml
```

打开 `English.txt` 文件并添加以下文本：
```sh
MyName_MyExampleMod= A Cool Campaign
MyName_MyExampleMod_MyMap= My First Map
```

这将同时设置关卡选择界面中地图的名称和关卡合集的名称。

# 打包你的模组
既然你已经为模组配置好了 `everest.yaml`，打包只需要把它压缩成一个 zip 归档即可。

:warning: 请确保压缩的是模组文件夹的 *内容*，而不是文件夹本身
![Archive the mod folder](https://maddie480.ovh/img/zip.png)

:warning: 不要把压缩包版本和文件夹版本放在一起，否则会导致资源冲突问题。只在需要把模组发给别人时才压缩它。

# 技巧与提示
## 结束关卡
关卡可以通过 `Complete Area`（通关区域）触发器结束，或者当地图元数据中启用了 `End Level on Heart` 时，用 `Crystal Heart`（水晶之心）结束。

## 防止回溯
防止玩家返回上一个房间的标准做法是：在你想让玩家停留的房间屏幕外放置一个 `Invisible Barrier`（隐形屏障）。该屏障只会在玩家进入该房间时才加载，因此不会阻止玩家离开上一个房间。

## 那个东西叫什么名字？
如果你不确定某个实体叫什么，请查看原版的 [实体与触发器列表 :link:](https://github.com/EverestAPI/Resources/wiki/Entity-and-Trigger-Documentation) 以及 [自定义实体列表 :link:](https://maddie480.ovh/celeste/custom-entity-catalog) 来查找模组实体的名称。


### 别忘了查看本 wiki 侧边栏中的更多资源！
