本页详细说明如何为你的地图定制大地图（overworld）。请注意，你需要一个 meta.yaml 文件——参见 [地图元数据](Mapping/Map-Metadata.md) 页面进行设置。

# 目录

* [山上的地图位置](#山上的地图位置)
* [禁用积雪](#禁用积雪)
* [颜色与着色](#颜色与着色)
* [自定义贴图](#自定义贴图)
* [山/月亮模型](#山-月亮模型)
* [背景音乐与环境音](#背景音乐与环境音)
* [标记图标](#标记图标)

## 山上的地图位置

要定义你地图的位置，请在 meta.yaml 文件中添加如下内容：
```yaml
Mountain:
    Idle:
        Position: [ 7.565, 8.614, -5.318 ]
        Target: [ 6.210, 7.754, -4.125 ]
    Select:
        Position: [ 8.782, 6.271, -1.953 ]
        Target: [ 6.799, 6.172, -2.194 ]
    Zoom:
        Position: [ 6.462, 5.235, -1.605 ]
        Target: [ 4.542, 5.754, -1.819 ]
    Cursor: [ 5.706, 5.492, -1.542 ]
    State: 2
    ShowCore: false
    Rotate: true
```
你可以在山峦界面（在 Mod Options（模组选项）中）启用调试模式后按空格键获取这些坐标。
用鼠标环顾四周，用 WASD 移动，用 Q 和 Z 上下移动相机。

坐标会显示在左上角，也可以按 P 打印到 log.txt 中，方便复制粘贴到 meta.yaml。

*   `Idle` 定义关卡选择时的相机位置。
*   `Select` 定义你选中关卡并查看检查点选择或路线选择时的相机位置。
*   `Zoom` 是你开始游玩后缩放到关卡时相机的位置。
*   `Cursor` 是 Madeline 光标在山上所处的位置。要放置它，把相机移动到你想让光标所在的位置，然后复制 `Position` 坐标。
*   `State` 定义山的照明：0 为夜晚，1 为黎明，2 为白天，3 为月亮。
*   `ShowCore` 决定山体上是否显示水晶之心（Core Heart）。
*   `Rotate` 决定相机是否应绕着山旋转。

**如果你只想复制某个原版章节的坐标，请查看 [原版元数据参考](https://github.com/EverestAPI/Resources/wiki/Vanilla-Metadata)。**

## 禁用积雪

```yaml
Mountain:
    ShowSnow: false
```

这将关闭山上下落的雪，或太空中飘浮的雪。

## 颜色与着色

大地图中使用的一些贴图和对象会带有你可以自定义的颜色着色。下面是可以放进 meta.yaml 的内容（这里使用原版中的值）：

```yaml
Mountain:
    FogColors:
      - 010817
      - 13203E
      - 281A35
      - 010817
    StarFogColor: 020915
    StarStreamColors:
      - 000000
      - 9228e2
      - 30ffff
    StarBeltColors1:
      - 53f3dd
      - 53c9f3
    StarBeltColors2:
      - ab6ffa
      - fa70ea
```

- `FogColors` 是山上雾的颜色，对应每个 `State`（参见 [山上的地图位置](#山上的地图位置)）。游戏会用到 2 种颜色：你自定义山所使用的 State 对应的颜色，以及主菜单上的第一种颜色（state 0）。**不必定义所有值**：如果你定义的少于 4 个值，其余将保持默认。_这意味着如果你使用 state 0，只需要 1 个值。_
- `StarFogColor` 是太空中雾的颜色。
- `StarStreamColors` 是月亮后方可见的"流"的颜色。[查看此图片 :link:](https://github.com/EverestAPI/Resources/assets/52103563/4974c068-00ec-494e-af71-07647693d2af) 可以直观了解它们在设置为红色、绿色和蓝色时的样子。**如果使用此设置，你必须恰好指定 3 个值。**
- `StarBeltColors1` 和 `StarBeltColors2` 是绕月亮旋转的小星星的颜色。它们分布在 2 条"带"上，两条带彼此略微错位。**每一条你可以指定任意数量的颜色**，星星颜色会从你给出的颜色中随机选取。如果给出空数组（`StarBeltColors1: []`），该星带会被移除。

## 自定义贴图

要在选中你的地图时更改山的贴图，你可以在地图的 meta.yaml 中定义自定义模型目录：
```yaml
Mountain:
    MountainTextureDirectory: yourname/campaignname
```
定义之后，你可以把自定义贴图放到 `Mods/yourmod/Graphics/Atlases/Mountain/yourname/campaignname`。

你可以在图形转储中的 `Graphics/Atlases/Mountain` 找到原版山的贴图。`buildings`、`mountain` 和 `skybox` 各有 3 张贴图，取决于山的 `State`（0 为夜晚，1 为黎明，2 为白天；参见 [山上的地图位置](#山上的地图位置) 一节）。

如果你添加了额外模型，应当把它们对应的贴图也放进这个目录：例如，`extra1_2.png` 是山处于 state 2（白天）时应用到 `extra1.obj` 上的贴图。

## 山/月亮模型

你可以自定义选中你的地图时显示的山的 3D 模型。
*   你可以在 `Content/Overworld` 文件夹中找到原版山的模型。如果你需要在大地图中添加比原版更多的模型，可以把它们添加在同一个文件夹中，命名为 `extra0.obj`、`extra1.obj` 等。

本指南假定你已经知道如何使用 **Blender**，并且如果你想要达到与原版山相似风格，需要特别了解**低多边形建模**。[这个教程 :link:](https://www.youtube.com/watch?v=1jHUY3qoBu8) 可能会有所帮助。

1. 在 Blender 中新建文件，删除相机、灯光和默认立方体。

2. 导入原版山的模型作为参考会很有用。可以通过 `File > Import > Wavefront (.obj)` 打开它们（它们位于相对于 `Celeste.dll` 的 `Content/Overworld/` 中）。然后，选中新导入的模型并按 `M` 将它们移到新的集合（collection）中。

3. **建模**你的山。你可以使用上一步创建的集合旁边的复选框来开关原版山模型作为参考。
    - 为避免游戏内显示出现问题，网格需要在导出前的某个时刻进行三角剖分。这可以在完成建模后按 `A` 全选并按 `Ctrl + T` 完成，或者如果你愿意也可以留到以后再做。

4. **为山贴图**。需要注意的一些事情：
    - 每个山模型只能使用**一个贴图文件**，不过请注意，如果你确实需要更多贴图，可以把山拆分成多个模型，每个模型使用各自的贴图（就像原版使用独立的建筑模型那样）。
    - **任何光照和阴影都必须烘焙进贴图**，因为 Celeste 的 3D 渲染引擎不支持实时渲染。网上应该有关于如何做到这一点的教程。

5. 完成山的建模后，保存你的 `.blend` 文件，并**选中要导出的模型**。转到 `File > Export > Wavefront (.obj)`，确保导出窗口右侧：
    - `General > Include Selection Only` 复选框**已启用**。（如果你有多个模型，或把原版山作为参考，这可以确保你只导出选中的模型）
    - `Geometry > Triangulated Mesh` 复选框**已启用**。（这确保网格在导出前进行三角剖分，可避免游戏内的一些显示问题）
    - `Materials` 复选框**已禁用**。（这可防止 Blender 生成无用的 `.mtl` 文件）

    然后将模型导出到 `YourMod/Mountain/yourname/campaignname/mountain.obj`。
    - 如果你有多个模型，对你拥有的每个模型重复此步骤，每次只选中要导出的模型，并把导出路径中的 `mountain.obj` 替换为 `buildings.obj`、`extra0.obj`、`extra1.obj` 等。
    - 请注意，上述导出设置每次尝试导出模型时都会重置为默认值，但如果你愿意，可以点击右上角附近的加号图标创建一个"操作预设（Operator Preset）"，以便每次都能快速启用它们。

6. 把你正在使用的贴图文件复制或导出到 `YourMod/Graphics/Atlases/Mountain/yourname/campaignname/mountain_0.png`。
    - 如果你希望山的贴图根据山的 **State**（参见 [山上的地图位置](#山上的地图位置)）而有所不同，把 `mountain_0.png` 中的 `0` 替换为 `1` 或 `2`。
    - 附加模型的贴图将命名为 `buildings_0.png`、`extra0_0.png`、`extra1_0.png` 等。
    - 更多信息请参见 [自定义贴图](#自定义贴图) 一节。

7. 在地图的 meta.yaml 文件中**定义自定义模型和贴图目录**：
```yaml
Mountain:
    MountainModelDirectory: Mountain/yourname/campaignname
    MountainTextureDirectory: yourname/campaignname
```

8. 如果你不想让任何尚未替换的原版模型显示出来（例如建筑或核心之墙），把 [这个 .obj 文件 :link:](https://maddie480.ovh/resources/nothing.obj) 复制到 `YourMod/Mountain/yourname/campaignname/[unusedvanillamodelname].obj`，其中 `[unusedvanillamodelname]` 是你想阻止显示的原版模型名称（你可以通过查看相对于 `Celeste.dll` 的 `Content/Overworld/` 找到它）。

> [!NOTE] 说明
> 请务必使用以三角形作为面的模型；否则可能会出现一些显示问题。
>
> [!NOTE] 说明
> 为获得最佳效果，请使用 Blender 创建模型。使用其他 3D 建模软件创建的模型可能无法正常工作，除非在 Blender 中重新保存。
>
## 背景音乐与环境音

要在玩家选中你的地图时播放不同的背景音乐和环境音，请在你的地图 meta.yaml 中使用以下内容：
```yaml
Mountain:
    BackgroundMusic: event:/maddie480/test_music
    BackgroundAmbience: event:/env/amb/06_lake
```
注意两者都是可选的：如果你想要自定义音乐但使用默认环境音，可以省略 `BackgroundAmbience`。

参考 [自定义音频教程](Mapping/Adding-Custom-Audio.md)，让游戏加载你的自定义音乐。

你也可以通过元数据设置音乐参数（_music params_），格式如下：
```yaml
Mountain:
    BackgroundMusicParams:
        param1: value1
        param2: value2
```

例如，**如果你想让地图使用《告别》（Farewell）的背景音乐，这就是你需要的**：
```yaml
Mountain:
    BackgroundMusicParams:
        moon: 1
```

## 标记图标

```yaml
Mountain:
    MarkerTexture: marker/Fall
```

:arrow_up: 这个 meta.yaml 设置会改变大地图上可见的标记/图钉。原版带有这 3 个：

| `marker/Fall`                                                                                          | `marker/runBackpack`                                                                                           | `marker/runNoBackpack`                                                                                          |
|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| ![](https://maddie480.ovh/celeste/graphics-dump-browser/Graphics/Atlases/Mountain/marker/Fall0000.png) | ![](https://maddie480.ovh/celeste/graphics-dump-browser/Graphics/Atlases/Mountain/marker/runBackpack00000.png) | ![](https://maddie480.ovh/celeste/graphics-dump-browser/Graphics/Atlases/Mountain/marker/runNoBackpack0000.png) |

如果你想使用**自定义动画**，把它的所有帧放到 `Graphics/Atlases/Mountain/marker/yournickname/campaignname/pinname00.png`、`pinname01.png`... 然后把 `marker/yournickname/campaignname/pinname` 放在这里。
