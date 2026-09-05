# 什么是地图元数据？
地图元数据（Map metadata）是定义某些整关层面特性应如何配置的信息。它主要分为两部分——Lönn 中的 Metadata 菜单，以及每张地图对应的 `.meta.yaml` 文件。Lönn 窗口相对不言自明，可以在 `Map > Metadata` 下找到。`.meta.yaml` 文件的结构则更为复杂，你需要在其中定义诸如关卡使用哪种结算画面（endscreen）、大地图（overworld）的外观等信息。

> [!TIP] 提示
> 许多更简单的选项在 Lönn 中都有工具提示说明，将鼠标悬停在选项名称上即可查看。
>
> [!NOTE] 说明
> 原版地图的元数据并不是这样存储的。你可以在 [**原版元数据**](https://github.com/EverestAPI/Resources/wiki/Vanilla-Metadata) 页面上找到以 `.meta.yaml` 格式整理的汇编版本。
>
# 设置 `.meta.yaml` 文件
要设置 `.meta.yaml` 文件，可以创建一个空白的 `mapname.meta.yaml`，或从示例模组中复制一份，然后将其粘贴到与地图的 `.bin` 文件相同的文件夹中。  
请注意文件名中的 `mapname` 部分——Everest 正是靠它来判断该数据应用于哪张地图，它应与你的 `.bin` 文件名保持一致。

> [!NOTE] 说明
> `.yaml` 文件不支持用制表符（tab）作为缩进，只支持空格。如果你的 `.yaml` 文件中存在制表符，它将无法加载。
>
> [!NOTE] 说明
> `.meta.yaml` 的改动不会热重载，因此如果你想检查所做的任何修改，需要重启 Celeste。
>
# 目录

<details>
<summary>点击展开目录</summary>

* [大地图](#大地图)
  * [地图名称](#地图名称)
  * [水晶之心文本](#水晶之心文本)
  * [地图图标](#地图图标)
  * [地图横幅](#地图横幅)
  * [地图围巾](#地图围巾)
  * [章节卡](#章节卡)
  * [检查点图片](#检查点图片)
  * [间奏章节](#间奏章节)
* [游戏内](#游戏内)
  * [重生过渡动画](#重生过渡动画)
  * [Bloom 基值与强度](#bloom-基值与强度)
  * [黑暗透明度](#黑暗透明度)
  * [色彩分级](#色彩分级)
    * [色彩分级的工作原理](#色彩分级的工作原理)
  * [明信片](#明信片)
  * [加载装饰画面](#加载装饰画面)
* [覆盖元数据](#覆盖元数据)

</details>


# 大地图

## 地图名称

首先，你必须确保你的地图遵循[模组结构](https://github.com/EverestAPI/Resources/wiki/Mod-Structure)。
特别是，你的地图 bin 应该放在 `Mods/yourmodname/Maps/yournickname/campaignname/mapname.bin`。

接下来，创建文件 `Mods/yourmodname/Dialog/English.txt`，并粘贴以下内容：
```
yournickname_campaignname= Campaign Name
yournickname_campaignname_mapname= Map Name
```
你也可以用它来定义检查点名称：
```
yournickname_campaignname_mapname_roomname= CheckpointName
```
一般来说，如果你在游戏中看到 `{blah_blah}`，并希望它显示成 `some text`，
你需要在 English.txt 中添加以下内容：
```
blah_blah= some text
```

（如果你想将地图名称翻译成其他语言，可以在 Dialog 目录中创建其他文件，例如 `French.txt`。
所有未提供对应语言的内容都会回退到英语。）

## 水晶之心文本
要指定在你的地图中收集水晶之心时出现的文本，请回到你的 English.txt，在地图名称对应的行下方添加以下行：

```
poem_yournickname_campaigname_mapname_mapside= HeartText
```

像上面那样替换昵称（nickname）和关卡合集名（campaign name），用你的地图 .bin 文件名去掉扩展名来替换 mapname，用 A、B 或 C 来替换 mapside，然后在右侧输入你想要显示的文本，最后保存并重新加载你的地图。

另请注意，如果你希望关卡在收集到水晶之心后结束，需要在 Loenn 中进入 Map > Metadata > Mode 部分，勾选 End Level on Heart。

## 地图图标

你可以在地图编辑器中，通过 Map > Metadata 菜单的 Title Banner Icon（标题横幅图标）字段定义地图图标。

如果你想使用自定义图标，请将其放在 `Mods/yourmodname/Graphics/Atlases/Gui/areas/yournickname/campaignname/mymapicon.png`（图标背面为 `mymapicon_back.png`），然后将 `areas/yournickname/campaignname/mymapicon` 用作地图图标。图标应为 180x180。

## 地图横幅

你可以通过编辑 Title Base Colour（标题基色）和 Title Accent Colour（标题强调色）来指定图标后方横幅和文本的颜色——如果你不指定这些，它将默认使用灰色。如果你只想复制一个原版横幅，可以在下面找到它们的列表。

<details>

	Prologue/Epilogue: 383838, 50afae
	Forsaken City: 6c7c81, 2f344b
	Old Site: 247f35, e4ef69
	Celestial Resort: b93c27, ffdd42
	Golden Ridge: ff7f83, 6d54b7 
	Mirror Temple: 8314bc, df72f9
	Reflection: 359fe0, 3c5cbc
	The Summit: ffd819, 197db7
	Core: 761008, e0201d
	Farewell: 240d7c, ff6aa9 

</details>

你还可以自定义横幅及其强调色（横幅左侧颜色不同的图形）所使用的贴图，方法是将贴图放入如下对应的文件夹中：

如果你的地图位于 `Mods/yourmod/Maps/foldername/mapname.bin`：
- 如果你想要一个专属于你的关卡合集的横幅，请将贴图放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/title.png` 和 `accent.png`。
- 如果你想要一个专属于你某张地图的横幅，请将贴图放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/mapname_title.png` 和 `mapname_accent.png`。

如果你希望贴图按原样显示，请在 Metadata 中将相应颜色设置为 `ffffff`。

你可以在图形转储（graphics dump）中找到原版横幅（参见[实用链接](https://github.com/EverestAPI/Resources/wiki/Useful-Links)页面），位于 `Graphics/Atlases/Gui/areaselect`。

## 地图围巾

你的地图图标后方出现的围巾也可以通过将相应贴图放到与你的关卡合集/地图路径匹配的文件夹中来更改。

如果你的地图位于 `Mods/yourmod/Maps/foldername/mapname.bin`：
- 如果你想要一条专属于你的关卡合集的围巾，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/areas/foldername/hover.png` 
- 如果你想要一条专属于你某张地图的围巾，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/areas/foldername/mapname_hover.png`

你可以在图形转储中找到原版围巾（参见[实用链接](https://github.com/EverestAPI/Resources/wiki/Useful-Links)页面），位于 `Graphics/Atlases/Gui/areas/hover.png`。

## 章节卡

你可以更改章节卡（章节被选中时显示的卡片，上面显示收集到的草莓、死亡数等信息）：

![图片](https://github.com/EverestAPI/Resources/assets/52103563/abb42a35-1e2d-4562-84f7-93ca63782ee2)

如果你的地图位于 `Mods/yourmod/Maps/foldername/mapname.bin`：
- 如果你想要一张专属于你的关卡合集的章节卡，请将贴图放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/card.png`、`cardtop.png`、`card_golden.png` 和 `cardtop_golden.png`。
- 如果你想要一张专属于你某张地图的章节卡，请将贴图放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/mapname_card.png`、`mapname_cardtop.png`、`mapname_card_golden.png` 和 `mapname_cardtop_golden.png`。

下面是一个位于 `Mods/CardTestMod/Maps/SSM24/cardtest/test2.bin` 的地图，针对关卡合集和地图本身的示例设置：

![图片](https://github.com/EverestAPI/Resources/assets/52103563/c50a152f-6c1e-4e5c-8a19-70d6a10b73dc)

你可以在图形转储中找到原版章节卡（参见[实用链接](https://github.com/EverestAPI/Resources/wiki/Useful-Links)页面），位于 `Graphics/Atlases/Gui/areaselect`。

## 章节面板标签页
你可以更改出现在 CLIMB 文字下方的标签页：

如果你的地图位于 `Mods/yourmod/Maps/foldername/mapname.bin`：
- 如果你想要一个专属于你的关卡合集的标签页，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/tab.png` 
- 如果你想要一个专属于你某张地图的标签页，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/areaselect/foldername/mapname_tab.png`

你也可以更改显示在标签页上的背包图标：
如果你的地图位于 `Mods/yourmod/Maps/foldername/mapname.bin`：
- 如果你想要一个专属于你的关卡合集的图标，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/menu/foldername/play.png` 
- 如果你想要一个专属于你某张地图的图标，请将其放入 `Mods/yourmod/Graphics/Atlases/Gui/menu/foldername/mapname_play.png`
B 面和 C 面的磁带图标可以同样的方式更改，只需分别将 `play` 替换为 `remix` 或 `rmx2`。

## 检查点图片

如果你的地图位于 Mods/yourmodname/Maps/**yournickname/campaignname/mapname**.bin，你应将检查点图片放到以下位置才能生效：

Mods/yourmodname/Graphics/Atlases/Checkpoints/**yournickname/campaignname/mapname**/side/roomname.png

将 `side` 替换为 A、B 或 C，将 `roomname` 替换为检查点所在房间的名称，或使用 `start` 表示起始检查点。

如果你想让检查点图片看起来像原版那样，你可以用 [Postcard :link:](http://postcard.leo60228.space/mask) 给图片添加蒙版。只需上传你的截图，点击提交，然后保存新图片。请通过 Discord 向 @leo60228#0480 报告问题。如果这个方法不管用，下面也提供了手动操作说明。

<details>
<summary>手动操作说明（点击查看）</summary>

首先，下载这个蒙版。（使用 Celeste 图形转储中的其他蒙版也可以）
![](https://github.com/EverestAPI/Resources/assets/52103563/67df1050-b012-465c-a594-1866019dc7f3)

（这些说明假定你使用的是 [GIMP :link:](https://www.gimp.org/)。）

在图层（layers）标签页中右键点击你的原始图片，点击“添加图层蒙版”（Add Layer Mask）。

确保选中“转移图层的 Alpha 通道”（Transfer Layer's Alpha Channel）并勾选“反转蒙版”（Invert Mask），然后右键点击编辑器中的检查点蒙版并复制它。（编辑 > 复制）

在图层标签页中，确保选中了原始图片的黑色部分（那就是蒙版），然后在编辑器中右键点击并粘贴。

使用矩形选择（Rectangle Select）之类的工具，点击编辑器中的任意位置来去掉_浮动选择图层_——现在你应该能看到带有检查点蒙版的图片了。

![](https://github.com/EverestAPI/Resources/assets/52103563/f42b660d-e7e4-4188-ac62-58f2304af0bc)

</details>

## 间奏章节

间奏章节（Interlude chapters）通常是指那些没有可收集物和实质性游戏玩法的章节，例如原版中的序章（Prologue）和终章（Epilogue）。在 Ahorn 中勾选 `Interlude` 复选框后，章节名称将垂直居中，横幅上的 `Chapter x` 将被移除，章节卡上将不显示可收集物和死亡数，并且该章节不会显示在日志中，也不会作为数据点出现在存档选择卡片上。切换此设置还会使该章节的 B 面和 C 面失效。

# 游戏内

## 重生过渡动画

这些是玩家死亡重生时播放的短暂过渡动画。如果你想使用自己的自定义过渡动画，你需要一组 1920x1080 的黑白图片，然后可以在[这个网站 :link:](https://maddie480.ovh/celeste/wipe-converter) 上将其转换为过渡动画。

## Bloom 基值与强度

Bloom 是一个控制静态物体（如前景图块或贴花，而非火把）发光多少的数值。提高 Bloom Base（Bloom 基值）会让物体发光，而 Bloom Strength（Bloom 强度）则会增加这些物体发出的光量——你可以把它看作是对 Bloom Base 的倍率。请注意，将该值调得过高可能会影响对光敏感的玩家，如果你的默认 Bloom 相当强，建议包含警告并提供调整 Bloom 的方法。

## 黑暗透明度

调整地图的黑暗程度，范围从 0.0 到 1.0，其中 1.0 最暗。这可以帮助你渐进地调整地图的明暗，而不必直接启用“黑暗”（dark）选项。

## 色彩分级

要为你自己制作一个色彩分级（colorgrade），你需要打开 Celeste 安装目录中 `none.png` 色彩分级的一个副本，然后手动编辑它或应用颜色滤镜来使颜色向滤镜的颜色靠拢（例如，如果你想为冰雪地图制作色彩分级，可以应用一个蓝色滤镜）。然后导出图片，给它一个合适的名称（以我们的蓝色示例来说，可以叫 `yournicknameblue`），并将导出的图片放在 `yourmodname/Graphics/ColorGrading/yourname/campaignname`。现在你可以在地图元数据（Map Metadata）的 Color Grade（色彩分级）字段中输入色彩分级的路径（例如 `yourname/campaignname/colorgrade`）。

你也可以使用[这个页面 :link:](https://lostinnowhere314.github.io/celeste-colorgrade-gen/) 来生成你自己的色彩分级。

### 色彩分级的工作原理

色彩分级本质上是一张告诉游戏应向玩家显示什么颜色的映射图。它被表示为一个 16x16x16 的立方体，拆分为一张 256x16 的二维图片——也就是说，你看到的每个方格都代表立方体的一层。因此，如果你想把你屏幕上出现的任何 #000000 改成比如 #fc4ee2，你就要把最左上角的那个像素编辑成该颜色，并且可以对任何被表示的颜色重复此操作。如果某个数值没有对应到这 4096 个像素，它就会在二维图片上最接近的 4 个像素之间进行插值。

## 明信片

每当你开始一个关卡时就会出现明信片，显示一小段文字。  
要自定义它们，请回到你的 `English.txt` 并粘贴以下内容：

```
yournickname_campaignname_mapname_postcard= YourTextHere
```

上面的示例文本对应什么、该用什么替换它，前面已经说明过了。

> [!NOTE] 说明
> 明信片只会在你尚未通关该章节时出现，或者当你使用调试模式存档（debug save file）开始该章节时出现。
>
此外，自 Everest 6170 起，可以更改明信片的贴图。  
在你的 `.meta.yaml` 文件中，添加以下部分：

```yaml
Postcard:
  Texture: yournickname/campaignname/postcardtexture  # relative to the Gui atlas
```

> [!NOTE] 说明
> 未来计划加入更多明信片自定义功能。更多细节请参见 [EverestAPI/Everest#1058 :link:](https://github.com/EverestAPI/Everest/issues/1058)。
>
## 加载装饰画面

加载装饰画面（loading vignette）在关卡被选中时显示，与 Intro、Summit 和 Core 章节类似。

要显示图片，请使用与章节完成画面（Chapter Complete Screen）相同的结构，但将 `CompleteScreen` 替换为 `LoadingVignetteScreen`。

要显示文字，请添加以下内容，并将 `Dialog_ID_Here` 替换为你的地图的 Dialog ID：

```yaml
LoadingVignetteText:
    Dialog: "Dialog_ID_Here"
```

请注意，每个关卡只能使用其中一种。

# 覆盖元数据

默认情况下，A 面的地图元数据也会被用于 B 面和 C 面。某些元数据可以通过在 B/C 面元数据中勾选 `OverrideASideMeta` 来覆盖。

可以覆盖的功能的半全面列表如下：
- IntroType
- Dreaming
- ColorGrade
- DarknessAlpha
- BloomBase
- BloomStrength
- CoreMode


_如果以上任何信息有误，欢迎你自行更正，也可以在 Discord 上向 maddie480#4596 喊话。_
