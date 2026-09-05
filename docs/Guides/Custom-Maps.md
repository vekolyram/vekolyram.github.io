# 创建自定义地图


## 目录：

<details>
<summary>点击展开目录</summary>

*    [必备软件](#必备软件)
*    [模组搭建](#模组搭建)
*    [创建你的地图](#创建你的地图)
*    [试玩你的地图](#试玩你的地图)
*    [添加自定义实体](#添加自定义实体)
*    [修改游戏内文本](#修改游戏内文本)
*    [添加自定义图形](#添加自定义图形)
*    [其他元数据](#其他元数据)

</details>


## [必备软件](https://github.com/EverestAPI/Resources/wiki/Required-Software)


## 模组搭建
按照 [模组搭建教程](https://github.com/EverestAPI/Resources/wiki/Mod-Setup) 开始搭建你的模组。

在你的模组文件夹内创建以下文件夹。`Maps` 文件夹应该与 `everest.yaml` 文件同级：
```
Celeste
- Mods
  - MyExampleMod
    - Maps
      - MyName
        - MyExampleMod
```

> [!IMPORTANT] 重要
> `MyExampleMod` 和 `MyName` 必须分别替换为你的模组名称和你的名字/昵称。
>
## 创建你的地图
创建和编辑地图需要在 [Lönn :link:](https://github.com/CelestialCartographers/Loenn) 中完成。

> [!IMPORTANT] 重要
> 每个可游玩的房间 *必须* 包含至少一个 Player Spawn Point（玩家出生点）实体。
>
>
## 试玩你的地图
如果你已经正确设置好了地图文件夹（参见 [模组搭建](#模组搭建)），你的地图应该立即可玩。

在章节选择界面（即你可以在不同章节之间导航的界面）中，按 `Up` 和 `Down` 方向键在模组地图关卡合集之间切换，或按 `Tab` 打开搜索菜单。

> [!TIP] 提示
> 建议在测试地图时启用 [调试模式](https://github.com/EverestAPI/Resources/wiki/debug-mode) 并使用 `~DEBUG~` 存档文件（启用调试模式后可从主菜单进入）。
>
>
## 添加自定义实体
可以使用 "Helper"（辅助）模组向游戏添加自定义实体。许多辅助模组已经可以在 [GameBanana:link:](https://gamebanana.com/mods/cats/5081) 上使用。所有当前已注册的自定义实体的完整列表可以在 [自定义实体目录（Custom Entity Catalog）:link:](https://maddie480.ovh/celeste/custom-entity-catalog) 中找到。

要在你的地图中使用辅助模组，请确保已安装它，然后重新加载 Lönn，任何自定义实体或触发器都应该会被编辑器自动加载。

> [!IMPORTANT] 重要
> 记录你使用的辅助模组，并把它们添加到你的 `everest.yaml` 文件中。  
> 这样可以确保任何想玩你的地图的人都会安装这些模组：
```yaml
- Name: MyExampleMod
  Version: 1.0.0
  Dependencies:
  - Name: EverestCore
    Version: 1.4465.0
  - Name: SomeOtherMod
    Version: 2.4.7
```


## 修改游戏内文本
当你开始测试地图时，你可能会注意到名称被设置为类似 `{MyName_MyMapName_MyMapFileName}` 的内容。要修改这个以及所有其他占位符，我们需要一个 "Dialog File"（对话文件）。

所有对话文件都放在 `Dialog` 文件夹中，是以它们所适用的语言命名的文本文件。对于英文翻译来说，就是创建一个名为 `English.txt` 的文件：
```
Celeste
- Mods
  - MyExampleMod
    - Dialog
      - English.txt
```

在对话文件中，你可以为 "Dialog Key"（对话键）赋予任何文本值。  
> [!NOTE] 说明
> 对话键只能包含字母数字字符（`A`-`Z` 和 `0`-`9`）以及下划线（`_`）。  
> 任何其他特殊字符（包括空格）在用于对话键时都应替换为下划线。
>
例如：
- `MyName/MyExampleMod` 变成 `MyName_MyExampleMod`
- `Words with spaces` 变成 `Words_with_spaces`

一般来说，只要游戏内文本被花括号（`{}`）或方括号（`[]`）包围，就可以（去掉括号后）作为对话键添加到对话文件中。

例如，如果你的地图名称显示为 `{MyName_MyExampleMod_MyMapName}`，可以这样自定义：
```
MyName_MyExampleMod_MyMapName= My Map Name
```
> [!WARNING] 警告
> 对话键和等号（`=`）之间不能有任何空白字符。
>
>
## 添加自定义图形
为地图添加自定义图形的流程取决于这些图形的用途。以下是一些常见场景：

### 小目录
<details>
<summary>点击展开</summary>

*    [贴花与风格地面](#贴花与风格地面-背景)
*    [实体](#添加自定义实体)
*    [大地图 UI](#大地图-ui)
*    [结算画面](#结算画面)

</details>

### 贴花与风格地面（背景）
如果你还没有，请在你的模组文件夹中添加以下文件夹：
```
Celeste
- Mods
  - MyExampleMod
    - Graphics
      - Atlases
        - Gameplay
```

在 `Gameplay/` 文件夹内，自定义贴花应该放在 `decals/` 文件夹中，风格地面应该放在 `bgs/` 文件夹中。

> [!NOTE] 说明
> 为地图添加任何自定义资源时，请确保在路径中包含你的名字/昵称和模组名称。[这有助于避免与其他模组产生冲突](https://github.com/EverestAPI/Resources/wiki/FAQ#conflicts)。  
> 在这种情况下，贴花应放在 `decals/MyName/MyExampleMod/`，风格地面放在 `bgs/MyName/MyExampleMod/`，其中 "MyName" 和 "MyExampleMod" 替换为你的名字/昵称和模组名称。
>
>
### 实体（原版与模组）
实体可以通过几种方式获得自定义贴图，详见 [实体换肤指南](../Mapping/Reskinning-Entities.md)。


### 大地图 UI
地图选择界面的许多部分都可以为你的模组进行自定义。这些贴图都将放在 Atlases 文件夹中的 `Gui` 文件夹里：
```
Celeste
- Mods
  - MyExampleMod
    - Graphics
      - Atlases
        - Gui
```

可自定义 UI 元素的完整参考见 [UI 自定义指南](../Overworld-Customisation.md)。


### 结算画面
结算画面（Endscreens）必须在地图的 `.meta.yaml` 文件中定义。详情请参见 [其他元数据](#其他元数据) 部分。

## 其他元数据
自定义结算画面、你的地图在大地图山上的位置，以及其他一些地图自定义选项，都需要定义在地图的元数据中。不过，把每一项自定义功能都加字段到 Lönn 里会显得杂乱且非常难用。

对于这些功能，我们可以使用一种特殊的元数据文件，它采用类似 `everest.yaml` 的 [YAML :link:](https://en.wikipedia.org/wiki/YAML) 格式。

这个文件必须放在地图 `.bin` 文件旁边。它必须与地图同名，但扩展名是 `.meta.yaml` 而不是 `.bin`。

例如，名为 `MyAwesomeMap.bin` 的地图文件需要名为 `MyAwesomeMap.meta.yaml` 的元数据文件。

元数据文件当前可用选项的完整列表见 [地图元数据页面](../Mapping/Map-Metadata.md)。  
如果你想复刻原版章节的元数据，可以在 [原版元数据参考](https://github.com/EverestAPI/Resources/wiki/vanilla-metadata) 中找到 `.meta.yaml` 格式的版本。
