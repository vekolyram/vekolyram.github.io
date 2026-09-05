# 目录

<details>
<summary>点击展开目录</summary>

*    [设计图块集](#设计图块集)
*    [让图块集在游戏中显示](#让图块集在游戏中显示)
*    [添加自定义碎块](#添加自定义碎块)
*    [添加动画图块](#添加动画图块)
*    [让你的图块集忽略其他图块](#让你的图块集忽略其他图块)
*    [为你的图块集设置显示名称](#为你的图块集设置显示名称)
*    [常见问题与常见错误](#常见问题与常见错误)
*    [图块集声音 ID](#图块集声音-id)


</details>

## 设计图块集
创建图块集时，你可以使用原版模板，也可以使用 0x0ade 的改进版模板。如果从零开始创建图块集，建议使用 0x0ade 的模板。如果你在编辑现有图块集，则可能需要使用原版模板。

你也可以[创建自己的模板](Tileset-Format-Reference.md)，不过这里不作讨论。

#### 使用 0x0ade 的改进版模板

下面的模板可以在标准图像编辑器中复制和编辑。注意它必须以 png 格式保存，并且不能调整大小。

![翡翠模板](https://i.imgur.com/jUq838l.png)

这是带注释的模板版本：

![带注释的翡翠模板](https://maddie480.ovh/img/annotated_better_template.png)

#### 使用原版模板

由于该模板相对复杂，只建议在编辑现有图块集时使用。如果你出于某种原因确实想用它制作自定义图块集，可以[点击此处 :link:](https://maddie480.ovh/img/vanilla_template.png)找到该模板。

这是带注释的模板版本：

![带注释的原版模板](https://maddie480.ovh/img/annotated_vanilla_template.png)

## 让图块集在游戏中显示

Celeste 将每个图块集的信息存储在一个 xml 文件中，可以用常规文本编辑器打开/编辑。默认情况下，你的地图会从原版 xml 中获取图块集信息，但你可以在地图编辑器中将其配置为使用自定义 xml。

### 第 1 步 - 制作你自己的 xml
* [下载原版 ForegroundTiles.xml :link:](https://maddie480.ovh/resources/foregroundtiles.xml)（或者在你的 Celeste 文件夹 -> Content -> Graphics 中找到它）
* 进入 `YourModFolder`，创建一个名为 `Graphics` 的文件夹
* 在那里创建新的子文件夹（例如 yournickname -> campaignname），以避免命名冲突
* 将 `ForegroundTiles.xml` 文件粘贴到新文件夹中

完成之后，你的 XML 应位于 `YourModFolder/Graphics/YourNickname/CampaignName/ForegroundTiles.xml`（将 `YourModFolder`、`YourNickname` 和 `CampaignName` 替换为你自己的值）。

> [!NOTE] 说明
> 注意，添加自定义文件时，通常建议将它们放在两个子文件夹中，分别使用你的昵称_以及_地图/关卡合集名称。  
> 这样既能避免与他人制作的地图冲突，也能防止你自己的地图之间相互冲突。
>
### 第 2 步 - 启用 0x0ade 的自定义模板

如果你使用 [0x0ade 的模板](#使用-0x0ade-的改进版模板)，则需要向你的 xml 中添加一些内容。如果你使用原版模板，请跳过此步骤。

打开你刚刚下载的 `ForegroundTiles.xml` 文件。紧接在文件开头的 `<Data>` 下方，将[这段文本 :link:](https://gist.github.com/0x0ade/3beb5eb3008f3f25be0b3204d1ee585a)的全部内容复制粘贴进去。

如果你愿意，可以将路径编辑为你的模组中第一个图块集的路径 `yournickname/campaignname/tilesetname`。

### 第 3 步 - 向 xml 中添加图块集

在 `ForegroundTiles.xml` 文件末尾、`</Data>` 行之前，复制粘贴以下内容：
```xml
<Tileset id="w" copy="z" path="yournickname/campaignname/tilesetname" sound="8"/>
```
* 将 `w` 替换为任何尚未使用的单个字符。保留 ID 如下所列。
  * 原版图块集使用 `3` 到 `9`、`a` 到 `o` 的 ID，以及 `1`、`z` 和 `G` 这些 ID。
  * 0x0ade 的模板使用 `y`。
  * 空气（Air）使用 `0`。
  * 有关可用图块集 ID 的具体说明，请参阅下面的注释。
* `copy` 值设置图块集使用哪个模板。**使用 `y` 表示 0x0ade 的模板**，或使用 `z` 表示原版模板。
* 将 `yournickname/campaignname/tilesetName` 替换为你的昵称、你的地图或关卡合集名称，以及你想给图块集起的名字。记住这些名称，下一步会用到它们。
* 将 `8` 替换为你想要的任何声音（列表见[下文](#图块集声音-id)）。

> [!NOTE] 说明
> 你可以使用小写或大写字母、符号、带重音字符，或几乎所有你能想到的字符。  
> 只要确保图块集 ID 尚未被使用即可，因为重复会导致 Celeste 崩溃。
>
> 如果你想知道具体细节，该字符可以是[基本多文种平面 :link:](https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane)中的任何有效 Unicode 字符。  
> 这意味着 `U+0000` 到 `U+D7FF`、`U+E000` 到 `U+FFFF` 之间的字符都是可接受的。  
> *（再说最后一次，不，你不能把 emoji 用作图块集 ID，因为它们不在这个范围内。）*
>
> 请注意，某些字符在 XML 中具有特殊含义，如果不进行转义，可能会被 Lönn 错误解析。
>
然后，保存并关闭文件。


### 第 4 步 - 将图块集图片添加到你的模组中
* 回到 `YourModName/Graphics/Atlases/Gameplay`
* 创建一个 `tilesets` 文件夹，然后在其中创建 `yournickname` 和 `campaignname` 文件夹（名称应与你在上一步的 `ForegroundTiles.xml` 中使用的名称一致）
* 将你的图块集复制到那里，并命名为你在 ForegroundTiles.xml 中填写的名称（本例中为 `tilesetName.png`）

### 第 5 步 - 将 xml 关联到你的地图
* 打开 Lönn 并加载你的地图
* 转到 Map -> Metadata
* 在 Foreground Tiles（前景图块）字段中，点击文件夹图标并选择你的 `ForegroundTiles.xml`。
* 点击"Save changes"（保存更改）。保存并重新加载你的地图。

_感谢 Xaphan 和 Coffe 提供本教程！_

> [!WARNING] 警告
> 在 Lönn 中输入文件路径时，务必使用正斜杠（`/`），而不是反斜杠（`\`）
>
>
## 添加自定义碎块

可以通过包含可选的 `debris` 属性来为你的图块集添加自定义碎块贴图。  
使用上面的示例，你的图块集定义应如下所示：
```xml
<Tileset id="w" copy="y" path="name" sound="8" debris="Xaphan/debrisTexture"/>
```
其中碎块贴图位于 `Mods/yourmod/Graphics/Atlases/Gameplay/debris/Xaphan/debrisTexture.png`。

同一个图块集可以添加多个碎块贴图，游戏会从中随机选择，只需按如下方式重命名图片即可：
```
debrisTexture00.png
debrisTexture01.png
debrisTexture02.png
...
```

## 添加动画图块

请参阅[图块集格式参考](Tileset-Format-Reference.md#animatedtiles)页面中的"动画图块"一节。


## 让你的图块集忽略其他图块

请注意下面图块集中的 `ignores` 标签：
```xml
<Tileset id="1" copy="z" path="dirt" ignores="g"/>
```
如果你将这个标签添加到图块集，它将不会与给定图块集 ID 的图块集连接。

你可以像这样列出多个 ID：`ignores="a,b,c"`

如果你想忽略所有可能的图块，可以添加：`ignores="*"`

如果你想排除某些 ID 不被忽略，可以在末尾添加：`ignoreExceptions="a"`

## 为你的图块集设置显示名称

为你的图块集添加 `displayName="Tileset name"` 标签，即可在 Lönn 中为其设置自定义名称。
```xml
<Tileset id="1" copy="z" path="dirt" displayName="Muddy Dirt"/>
```

## 常见问题与常见错误

#### 我的图块集没有出现在 Lönn 中！
仔细检查你在 Lönn 中填写的 ForegroundTiles.xml 路径是否正确。

#### 我的图块集出现了，但只是一个粉色贴图！
你的 XML 已正确加载，但图块集出了问题。很可能是你在 XML 中填写的图片文件路径有误。也可能是你的图块集与模板不匹配，比如尺寸不对等等。
你的文件结构应如下所示：
![图片](https://user-images.githubusercontent.com/43452521/176455132-16daaa10-2f68-4db2-834c-80ec83e039a3.png)

那么 XML 文件中图块集的对应路径就是：`"Rain/Monochrome/Whitespace"`。

将 `Rain` 替换为你的昵称，将 `Monochrome` 替换为你的关卡合集名称，将 `Whitespace` 替换为 png 文件的名称（去掉 `.png` 扩展名）。



#### 当我将 xml 路径输入 Lönn 时，出现了错误！
很可能是你不小心弄乱了 XML 的格式。检查一下你是否删除了像 `<Data>` 这样的重要行。如果你找不到错误，可以尝试重新开始，用一个全新的 xml。

#### 如何添加背景图块？
添加方法与前景图块相同，只不过要使用 BackgroundTiles.xml 而不是 ForegroundTiles.xml，并且不需要为它们指定声音参数。另外，一个好习惯是以 bgTilesetName.png 的格式命名它们。

## 图块集声音 ID

以下 ID 取自 Celeste FMOD Studio 项目。  
它们可以在 `event:/char/madeline/footstep` 中找到——感谢 PowerUp Audio 的 Kevin Regamey！

标记为（未使用）的条目没有任何关联声音。

<details>
<summary>点击展开图块集声音 ID</summary>

0. null
1. **asphalt**
2. **car**
3. **dirt**（用于图块集：dirt、core）
4. **snow**（用于图块集：snow、summit）
5. **wood**
6. **bridge**
7. **girder**（用于图块集：girder）
8. **brick**（用于图块集：tower、stone、cement、rock、woodStoneEdges、poolEdges、templeA、templeB、cliffsideAlt、reflection、summitNoSnow）
9. **traffic block**
10. （未使用）
11. **dreamblock inactive**
12. **dreamblock active**
13. **resort wood**（用于图块集：wood）
14. **resort roof**
15. **resort platforms**
16. **resort basement**
17. **resort laundry**
18. **resort boxes**
19. **resort books**
20. **resort forcefield**
21. **resort clutterswitch**
22. **resort elevator**
23. **cliffside snow**（用于图块集：cliffside）
24. （未使用）
25. **cliffside grass**（用于图块集：deadgrass）
26. （未使用）
27. **cliffside whiteblock**
28. **gondola**
29. （未使用）
30. （未使用）
31. （未使用）
32. **glass**
33. **grass**（用于图块集：grass）
34. （未使用）
35. **cassette block**
36. **core ice**
37. **core rock**
38. （未使用）
39. （未使用）
40. **glitch**（用于图块集：scifi）
41. （未使用）
42. **internet café**
43. **cloud**
44. **moon**（用于图块集：lostlevels）
</details>

<details>
<summary>点击展开图块集声音 ID 表格</summary>


图块集 ID | 图块集名称 | 声音 ID | 声音名称
-- | -- | -- | --
1 | dirt | 3 | dirt
3 | snow | 4 | soft snow
4 | girder | 7 | metal girder
5 | tower | 8 | brick
6 | stone | 8 | brick
7 | cement | 8 | brick
8 | rock | 8 | brick
9 | wood | 13 | resort wood
a | wood stone edges | 8 | brick
b | cliffside | 23 | cliffside snow
c | pool edges | 8 | brick
d | temple A | 8 | brick
e | temple B | 8 | brick
f | cliffside Alt | 8 | brick
g | reflection | 8 | brick
h | grass | 33 | reflection grass
i | summit | 4 | soft snow
j | summit No Snow | 8 | brick
k | core | 3 | dirt
l | deadgrass | 25 | dry grass
m | lostlevels | 44 | moon
n | scifi | 40 | glitch
o | {从未使用} | 43 | cloud

</details>
