本页将向你解释如何**仅针对你的地图**更改实体（entity）的外观。如果你正在制作一个应适用于整个游戏（包括原版地图）的纹理包，请前往[如何制作纹理包？](https://github.com/EverestAPI/Resources/wiki/Texture-Packs)

你应该获取[图形转储 :link:](https://drive.google.com/open?id=1ITwCI2uJ7YflAG0OwBR4uOUEJBjwTCet)，以便能够使用原版精灵图作为参考。

要遵循的步骤取决于你要换肤的实体是哪个。

## 目录

* [开箱即可换肤的实体](#开箱即可换肤的实体)
  * [尖刺](#尖刺)
  * [开关门](#开关门)
  * [跳穿平台](#跳穿平台)
  * [碎裂方块](#碎裂方块)
  * [行星特效](#行星特效)
* [通过 Sprites.xml 换肤实体](#通过-sprites-xml-换肤实体)
* [其他实体](#其他实体)

## 开箱即可换肤的实体

### 尖刺

要制作自定义尖刺贴图：
- 前往图形转储中的 `Graphics/Atlases/Gameplay/danger/spikes`，复制你打算以其为基础的尖刺贴图。
- 将它们粘贴到 `Mods/yourmod/Graphics/Atlases/Gameplay/danger/spikes/yourmod/campaignname` 并重命名。例如 `custom_down00.png`、`custom_down01.png` 等。**不要改动 _ 之后的任何内容**。
- 在 Lönn 中，右键点击你的尖刺，然后在 "Type" 字段中输入 `yourmod/campaignname/custom`。

### 开关门

要自定义开关门方块：
- 前往图形转储中的 `Graphics/Atlases/Gameplay/objects/switchgate`，复制 `block.png`、`mirror.png`、`stars.png` 或 `temple.png` 中的任意一个。
- 将它粘贴到 `Mods/yourmod/Graphics/Atlases/Gameplay/objects/switchgate/yourmod/campaignname/myblock.png`。
- 在 Lönn 中，右键点击你的开关门，然后在 "Sprite" 字段中输入 `yourmod/campaignname/myblock`。

### 跳穿平台

要自定义跳穿平台（jumpthru）贴图：
- 前往图形转储中的 `Graphics/Atlases/Gameplay/objects/jumpthru` 并复制其中一个。
- 将它粘贴到 `Mods/yourmod/Graphics/Atlases/Gameplay/objects/jumpthru/yourmod/campaignname/myjumpthru.png`。
- 在 Lönn 中，右键点击你的跳穿平台，然后在 "Texture" 字段中输入 `yourmod/campaignname/myjumpthru`。请注意，你还可以通过 "Surface Index" 参数更改脚步声。

### 碎裂方块

要自定义碎裂方块（crumble block）贴图：
- 前往图形转储中的 `Graphics/Atlases/Gameplay/objects/crumbleBlock`，复制 `default.png` 或 `cliffside.png` 中的任意一个。
- 将它粘贴到 `Mods/yourmod/Graphics/Atlases/Gameplay/objects/crumbleBlock/yourmod/campaignname/mycrumbleblock.png`。
- 在 Lönn 中，右键点击你的碎裂方块，然后在 "Texture" 字段中输入 `yourmod/campaignname/mycrumbleblock`。

### 行星特效

你可以让一个行星（Planets）风格地面使用自定义行星：
- 如果你想以原版行星作为参考，请查看图形转储中的 `Graphics/Atlases/Gameplay/bgs/10/smallXX.png` 和 `bigXX.png`。
- 将你的自定义行星放入 `Mods/yourmod/Graphics/Atlases/Gameplay/bgs/10/yourmod/campaignname/customplanetXX.png`，其中 XX 是从 00 开始的数字。你可以放任意多个，显示的行星将从中随机选取。
- 在 Lönn 中，在行星特效的 "Size" 字段中输入 `yourmod/campaignname/customplanet`。

注意：如果你查看图形转储，你会发现 `Graphics/Atlases/Gameplay/bgs/10/Planets` 文件夹包含真实的行星（而不是星星）。你可以通过在行星特效的 "Size" 字段中输入 `Planets/big` 和 `Planets/small` 来使用它们，无需在模组中打包这些资源！

## 通过 Sprites.xml 换肤实体

要检查某个实体是否可以通过 Sprites.xml 换肤，请在 `Content/Graphics/Sprites.xml` 中查找它。如果找到了，就意味着你可以更改该实体在整个地图中的外观，而不会影响其他地图。

在此示例中，我们为 Theo Crystal 换肤。

- 将 `Content/Graphics/Sprites.xml` 复制到 `Mods/yourmod/Graphics/yourname/campaignname/Sprites.xml`。
- 打开你的副本，查找 Theo Crystal。你会找到以下内容：
```xml
  <theo_crystal path="characters/theoCrystal/" start="idle">
    <Origin x="32" y="42"/>
    <Loop id="idle" path="idle" delay="0.08"/>
    <Anim id="shatter" path="shatter" delay="0.08" goto="shattered"/>
    <Loop id="shattered" path="shatter" frames="16" delay="0.08"/>
  </theo_crystal>
```
`path="characters/theoCrystal/"` 意味着你可以在图形转储中的 Graphics/Atlases/Gameplay/**characters/theoCrystal** 找到它的贴图。
- 将此文件夹复制到 `Mods/yourmod/Graphics/Atlases/Gameplay/yourname/campaignname/theoCrystalReskin`，然后按照你的想法修改它们。
- 在你的 Sprites.xml 副本中，编辑路径以匹配你在上一步创建的文件夹：
```xml
  <theo_crystal path="yourname/campaignname/theoCrystalReskin/" start="idle">
```
:warning: 如果路径末尾有一个斜杠，请不要移除它。
- 在 Loenn 中的地图元数据里，将 Sprites 改为 `Graphics/yourname/campaignname/Sprites.xml`。

大功告成！现在，如果你放置一个 Theo crystal，它在游戏中应该会使用你的自定义贴图。

## 其他实体

如果某个实体既不能开箱即用地换肤，也不在 Sprites.xml 中，你可能需要制作一个代码模组来为其换肤。如果你不确定是否需要一个代码模组来为你的实体换肤，请在 Discord 上询问。

现有的辅助包提供了更多可换肤的实体：
- [Frost Helper :link:](https://gamebanana.com/mods/53647)：
  - 尖刺轮（Spinners）
  - 弹簧（Springs）
  - 传送带（Zip Movers）
- [Maddie's Helping Hand :link:](https://gamebanana.com/mods/53687)：
  - 触摸开关和开关门的_图标（icons）_。开关门的_方块_可以开箱即用地换肤（见第一部分）
  - 补给（Refills）（用于自定义粒子颜色，或在同一地图中使用不同精灵图）
  - 交换方块（Swap Blocks）
  - Kevins
  - 星星特效（Stars effect）
  - 碎裂平台（Crumble Platforms）
- [Lunatic Helper :link:](https://gamebanana.com/mods/53692)：
  - 带有自定义粒子的星空特效（Starfield effect）

一些辅助包还允许你**重新着色**实体：
- [Frost Helper :link:](https://gamebanana.com/mods/53647)：
  - 火焰屏障（Fire Barriers）
  - 上升熔岩（Rising Lava）
  - 梦境方块（Dream Blocks）
- [Pandora's Box :link:](https://gamebanana.com/mods/53651)：
  - 水（Water）
  - 瀑布（Waterfalls）
  - 灰尘球（Dust bunnies）
- [Lunatic Helper :link:](https://gamebanana.com/mods/53692)：
  - 星空特效（Starfield effect）
  - 星尘特效（Stardust effect）
- [Maddie's Helping Hand :link:](https://gamebanana.com/mods/53687)：
  - 三明治熔岩（Sandwich Lava）
  - 黑洞特效（Blackhole effect）
- [Shroom Helper :link:](https://gamebanana.com/mods/53691)：
  - 花瓣特效（Petals effect）
