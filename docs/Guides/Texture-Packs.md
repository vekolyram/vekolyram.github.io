# 创建贴图包


## 目录：

<details>
<summary>点击展开目录</summary>

*    [所需软件](#所需软件)
*    [模组设置](#模组设置)
*    [替换贴图](#替换贴图)
*    [修改动画数据](#修改动画数据)
*    [替换音效](#替换音效)
*    [SkinModHelper](#skinmodhelper)

</details>

## [所需软件](https://github.com/EverestAPI/Resources/wiki/Required-Software)


## 模组设置
遵循 [模组设置教程](Mod-Setup.md) 开始设置你的模组。

在你的模组文件夹内创建以下文件夹。`Graphics` 文件夹应紧挨着 `everest.yaml` 文件：
```
Celeste
- Mods
  - MyExampleMod
    - Graphics
```


## 替换贴图
替换 Everest 中的任何资源都非常简单：只需在模组里添加一个与原版资源相对路径相同的文件即可。

对于贴图来说，这个路径总是在 `Graphics` 文件夹下名为 `Atlases` 的子文件夹中。每个图集服务于游戏的不同部分：
- `Gameplay` - 用于游戏过程中几乎所有贴图的像素艺术贴图。
- `Gui` - 用于 UI 元素的高分辨率贴图。
- `Portraits` - 用于对话头像框的角色头像。
- `{章节名}` - 用于章节完成界面的高分辨率贴图。

例如，要替换遗忘之城（Forsaken City）的关卡标志，你应当把替换贴图放在 `Mods/yourmodname/Graphics/Atlases/Gui/areas/city.png`。

包含和不包含 [SkinModHelper](#skinmodhelper) 的贴图包示例都可以在 [GameBanana :link:](https://gamebanana.com/mods/cats/11181) 上找到。

**请注意，这也会影响原版关卡。** 如果你需要专门用于你的地图的自定义图像，这_不是_你想要的。

_（顺便说一下，如果你想用其他角色替换 Madeline，你需要 817 张精灵图。如果你确实决定尝试这么做，可以使用 [SkinMod 清单 :link:](https://docs.google.com/spreadsheets/d/1yQpj05TaNuI5rfxF4zCfg8Z9oX_XzihGwm94D2t5ZkE) 来跟踪进度。）_


## 修改动画数据
不同贴图的配置存放在位于*游戏*的 `Content/Graphics/` 文件夹中的 `.xml` 文件里（不是图像转储文件夹）：
- `ForegroundTiles.xml`、`BackgroundTiles.xml` 和 `AnimatedTiles.xml` [定义了图块集的绘制方式](../Mapping/Tileset-Format-Reference.md)。
- `CompleteScreens.xml` 定义了章节完成界面组件的排列方式。
- `Sprites.xml`、`SpritesGui.xml` 和 `Portraits.xml` 为某些动画精灵图定义了动画数据（其他的在代码中定义）。

本教程不会详细讨论如何修改这些文件，应查阅每种文件格式的参考页面来理解如何更改它们。


## 替换音效
替换音效可以通过导出一个 FMOD bank 来完成，其事件名称需与原始（vanilla）项目中的名称匹配。
在 [添加自定义音频](../Mapping/Adding-Custom-Audio.md#覆盖原版事件) 页面上有一份可用指南。


## SkinModHelper
为了更轻松地管理多个已安装的皮肤模组，建议将它们配置为使用 [SkinModHelper 模组 :link:](https://github.com/bigkahuna443/SkinModHelper)。如果你这样做，请确保在 everest.yaml 文件中将 SkinModHelper 添加为依赖。

该模组提供一个游戏内设置，可以轻松在皮肤模组之间切换，而不是要求玩家通过禁用和启用每个模组来避免冲突。

使用 SkinModHelper 设置模组的文档可在 [SkinModHelper GitHub :link:](https://github.com/bigkahuna443/SkinModHelper/blob/dev/docs/guide/README.md) 上获取。
