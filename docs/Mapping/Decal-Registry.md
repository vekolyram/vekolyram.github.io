# 目录

* [什么是贴花注册表](#什么是贴花注册表)
* [Everest 属性](#everest-属性)
* [一次将属性应用到多个贴花](#一次将属性应用到多个贴花)
* [添加自定义属性](#添加自定义属性)
* [辅助属性](#辅助属性)
  * [Adam 的附加包](#adam-的附加包)
  * [Brokemia Helper](#brokemia-helper)
  * [Chronia Helper](#chronia-helper)
  * [Frost Helper](#frost-helper)
  * [Kosei Helper](#kosei-helper)
  * [Mint Chocolate Helper](#mint-chocolate-helper)
  * [Jungle Helper](#jungle-helper)
  * [Sardine7](#sardine7)
  * [Sorbet Helper](#sorbet-helper)
  * [Xaphan Helper](#xaphan-helper)

## 什么是贴花注册表

游戏中的一些贴花（decal）具有硬编码的属性，这些属性无法通过自定义贴花正常复制。这正是 **贴花注册表（Decal Registry）** 派上用场的地方。

要开始使用它，首先在你的模组的根目录（everest.yaml 旁边）创建一个 `DecalRegistry.xml` 文件。该文件必须与提供资源的模组属于同一个模组。它不能使用来自其他模组的资源。示例文件：
```xml
<decals>
  <decal path="frosttemple/icegrass/grass_a">
    <banner amplitude="2" sliceSize="1" speed="2" sliceSinIncrement="0.05" easeDown="false" offset="-2" />
  </decal>
</decals>
```
你可以根据需要添加任意多个 `<decal>` 标签。`<decal>` 的 `path` 属性是你的贴花精灵图相对于 `Graphics/Atlases/Gameplay/decals/` 的路径（对于动画贴花，使用不带帧号的贴图名称）。在 `<decal>` 内部，你可以指定任意多个属性，尽管并非所有属性都彼此兼容。如果你遇到希望解决的兼容性问题，请联系 Everest 团队成员。

大多数属性都有可供配置的属性项。某些属性项必须包含才能应用该属性，但其他属性项是可选的，如果未包含则会使用默认值。注意：属性需要闭合。例如 `<floaty/>`，而不是 `<floaty>`。

每个属性项都有一个数据类型，用于定义你可以使用的值：
* `string` - 字符序列，例如 `name="mystring"`
* `int` - 非小数数字，例如 `offsetX="-3"`
* `float` - 小数数字，例如 `speed="0.4"`
* `bool` - 必须为 true 或 false 的值，例如 `safe="true"`
* `frames` - 使用精灵图动画格式的帧列表，例如 `frames="0,1,3-5,6*3"` 或 `frames="0,1,3,4,5,6,6,6"`（两者等价）

## Everest 属性

Everest 目前支持以下属性：
* `<animation>` 让贴花播放循环动画。
  * `frames(frames)`：要播放的动画（默认：`"0"`）。
* `<banner>` 让贴花以[正弦波 :link:](https://en.wikipedia.org/wiki/Sine_wave)模式从左到右摆动。该效果将贴花分割成水平"切片"，然后移动每个切片，使整个贴花看起来像在摆动。原版用于窗帘、花朵、草等。
  * `speed(float)` - 波浪的速度（默认：`1.0`）。
  * `amplitude(float)` - 波浪在最强烈处的峰值（默认：`1.0`）。
  * `sliceSize(int)` - 每个切片的高度（以像素为单位）（默认：`1`）。
  * `sliceSinIncrement(float)` - 每个切片以[弧度 :link:](https://en.wikipedia.org/wiki/Radian)为单位的波浪函数推进量（默认：`1.0`）。保持较小值可获得更平滑的波浪，例如 `0.05`。
  * `easeDown(bool)` - 波浪强度是否应从顶部向下增加，而不是从底部向上增加（默认：`false`）。
  * `offset(float)` - 波浪函数的像素偏移量（默认：`0`）。
  * `onlyIfWindy(bool)`：贴花是否仅在风激活时才摆动（默认：`false`）。
* `<floaty>` 让贴花漂浮。无属性。原版用于 Farewell 中漂浮的背景贴花。
* `<smoke>` 让贴花散发烟雾粒子。原版用于通风口、烟囱等。
  * `offsetX(float)` 和 `offsetY(float)` - 发射器相对于贴花中心的像素偏移（默认：`1.0`）。
  * `inbg(bool)` - 是否在背景而不是前景中发射粒子（默认：`false`）。
  * 此属性可以多次应用于一个贴花。
* `<parallax>` 为贴花添加视差。这会在相机移动时改变贴花的位置，使其看起来离屏幕更近或更远。
  * `amount(float)` - 要应用的视差量。正值表示更近，负值表示更远。作为参考，Summit 云使用 `0.1`。
* `<depth>` 设置贴花的 Depth（深度），使其能显示在特定对象的前面或后面。
  * `value(int)` - 深度值。参考下表。

<details>
  <summary>点击展开深度表</summary>

    BGTerrain = 10000
    BGMirrors = 9500
    BGDecals = 9000
    BGParticles = 8000
    SolidsBelow = 5000
    Below = 2000
    NPCs = 1000
    TheoCrystal = 100
    Player = 0
    Dust = -50
    Pickups = -100
    Seeker = -200
    Particles = -8000
    Above = -8500
    Spinners = -8500
    Solids = -9000
    FGTerrain = -10000
    FGDecals = -10500
    DreamBlocks = -11000
    PlayerDreamDashing = -12000
    Enemy = -12500
    FakeWalls = -13000
    FGParticles = -50000
    Top = -1000000
    FormationSequences = -2000000
</details>

* `<animationSpeed>` 设置贴花的动画速度。
  * `value(int)` - 动画速度（每秒帧数，通常为 12）。
* `<sound>` 为贴花添加一个声音源。
  * `event(string)` - 要播放的事件名称。
* `<bloom>` 为贴花添加一个泛光点。
  * `offsetX(float)` 和 `offsetY(float)` - 泛光相对于贴花中心的像素偏移（默认：`0`）。
  * `alpha(float)` - 泛光的透明度，其中 `0` 为完全透明，`1.0` 为完全不透明（默认：`1.0`）。
  * `radius(float)` - 泛光的像素半径（默认：`1.0`）。
  * 此属性可以多次应用于一个贴花。
* `<coreSwap>` 根据核心模式为贴花使用不同的贴图路径。
  * `coldPath(string)` - 冷模式下使用的路径。
  * `hotPath(string)` - 热模式下使用的路径。注意：这两个路径都相对于 `Gameplay` 图集，而不是 `decals` 文件夹，因此如果贴图放置在该文件夹中，路径必须加上 `decals/` 前缀。
* `<flagSwap>` 根据指定 flag（标志）的状态为贴花使用不同的贴图路径。
  * `flag(string)` - 用于确定状态的 flag。
  * `offPath(string)` - flag 关闭时使用的路径。
  * `onPath(string)` - flag 开启时使用的路径。注意：这两个路径都相对于 `Gameplay` 图集，而不是 `decals` 文件夹，因此如果贴图放置在该文件夹中，路径必须加上 `decals/` 前缀。
* `<mirror>` 为贴花添加倒影。原版用于 5A 中的镜子贴花。
  * `keepOffsetsClose(bool)` - 倒影是否应显示得离玩家稍近一些（默认：`false`）。
  * 要使用它，在与你的 `decals` 文件夹同级的目录下创建一个名为 `mirrormasks` 的文件夹，并创建与贴花原始文件路径对应的所有子文件夹。在此路径中创建一个与原贴花同名的贴图文件（例如，`decals/modname/mytexture.png` 将对应一个 `mirrormasks/modname/mytexture.png` 贴图文件）。
  * 红色通道控制倒影的水平偏移，绿色通道控制垂直偏移（蓝色通道未使用）。因此红色 255 且绿色 255 时倒影离玩家最近，红色 0 且绿色 255 时水平方向最远，红色 255 且绿色 0 时垂直方向最远，红色 0 且绿色 0 时在两个轴上都最远。透明像素不会投射倒影。
* `<solid>` 为贴花添加一个不可见的实体（solid）方块。原版用于度假村屋顶贴花。
  * `x(float)` 和 `y(float)` - 实体的左上角相对于贴花中心的位置（默认：`0`）。
  * `width(float)` 和 `height(float)` - 实体的尺寸（默认：`16`）。
  * `index(int)` - 用于例如脚步声的声音表面索引（默认：`14` [Resort Roof]）。参考下表。
  * `priority(int)` - 声音表面优先级（默认：`0`）。当此实体与其他实体（例如 Solid Tiles）重叠时，较高的数字可确保播放与此实体关联的声音。
  * `blockWaterfalls(bool)` - 此表面是否阻挡瀑布（默认：`true`）。
  * `safe(bool)` - 草莓是否会在此表面上收集（默认：`true`）。
  * 此属性可以多次应用于一个贴花。

<details>
  <summary>点击展开声音表面索引表</summary>

    None = 0
    Asphalt = 1
    Car = 2
    Dirt = 3
    Snow = 4
    Wood = 5
    Bridge = 6
    Girder = 7
    Brick = 8
    Zip Mover = 9
    Space Jam (Inactive) = 11
    Space Jam (Active) = 12
    Resort Wood = 13
    Resort Roof = 14
    Resort Platform = 15
    Resort Basement = 16
    Resort Laundry = 17
    Resort Boxes = 18
    Resort Books = 19
    Resort Forcefield = 20
    Resort Clutterswitch = 21
    Resort Elevator = 22
    Cliffside Snow = 23
    Cliffside Grass = 25
    Cliffside Whiteblock = 27
    Gondola = 28
    Glass = 32
    Grass = 33
    Cassette Block = 35
    Core Ice = 36
    Core Rock = 37
    Glitch = 40
    Internet Café = 42
    Cloud = 43
    Moon = 44
</details>

* `<staticMover>` 将此贴花附加到属性所描述的相对碰撞盒内的实体上。
  * `x(int)` 和 `y(int)` - 静态移动器左上角相对于贴花中心的位置（默认：`0`）。
  * `width(int)` 和 `height(int)` - 静态移动器的尺寸（默认：`16`）。
  * 请注意，某些实体（例如 crumble blocks）可能无法与静态移动器贴花一起工作。
  * 附加到像 dash blocks 这样的持久实体上的静态移动器贴花，会在这些实体消失时被移除。
> [!TIP] 提示
**你可以添加一个具有相同属性（x, y, width, height）的实体，并使用 [CelesteTAS :link:](https://gamebanana.com/tools/6715) 检查碰撞箱。这样，测试你的 `staticMover` 是否放置得当会更容易**。
* `<scared>` <a id="scared" /> 让贴花根据玩家离它的远近播放特定动画。用于 Farewell 中的某些植物。
  * `hideRange(int)` - 如果玩家进入 `hideRange` 像素范围内，"隐藏"贴花（默认：`32`）。
  * `showRange(int)` - 如果正在隐藏时玩家移动到距离大于 `showRange` 像素的地方，"显示"贴花（默认：`48`）。
  * `idleFrames(frames)`：未隐藏时循环播放的动画（默认：`"0"`）。
  * `hideFrames(frames)`：玩家进入 `hideRange` 范围内时播放的动画（默认：`"0"`）。
  * `hiddenFrames(frames)`：隐藏时循环播放的动画（默认：`"0"`）。
  * `showFrames(frames)`：玩家移动到距离大于 `showRange` 时播放的动画（默认：`"0"`）。
  * 如果你希望 `hideRange` 和 `showRange` 取相同值，也可以选择使用 `range(int)` 代替它们。
* `<light>` 为贴花添加一个顶点光源。
  * `offsetX(float)` 和 `offsetY(float)` - 光源相对于贴花中心的像素偏移（默认：`0`）。
  * `color(string)` - 光源的颜色，以十六进制字符串表示（默认：`ffffff`，即白色）。
  * `alpha(float)` - 光源的透明度，其中 `0` 为完全透明，`1.0` 为完全不透明（默认：`1.0`）。
  * 光源的 alpha 值将在半径 `startFade(int)`（默认：`16`）处开始减小，并在半径 `endFade(int)`（默认：`24`）处达到 `0`。
  * 此属性可以多次应用于一个贴花。
* `<lightOcclude>` 以属性所描述的矩形形状为贴花添加一个遮光组件。
  * `x(int)` 和 `y(int)` - 遮光器左上角相对于贴花中心的位置（默认：`0`）。
  * `width(int)` 和 `height(int)` - 遮光器的尺寸（默认：`16`）。
  * `alpha(float)` - 遮光器的透明度，其中 `0` 不遮挡任何光线，`1.0` 遮挡全部光线（默认：`1.0`）。
  * 此属性可以多次应用于一个贴花。
* `<overlay>` 在重叠处用贴花的贴图（包括透明度）覆盖图块实体的贴图。等同于 object tiles。例如，允许你为 dash block 的边缘添加一个"裂缝"贴花来暗示一个秘密。
  * 无属性。忽略所有其他属性。
  * 支持任何带有 Tile Interceptor 组件的图块实体。支持的原版实体有：Coverup Wall、Crumble Wall On Rumble、Dash Block、Exit Block、Fake Wall、Falling Block、Badeline Boss Moving Block 和 Intro Crusher。
* `<scale>` 将贴花的缩放乘以所提供的值。在 Ahorn 或 Lönn 中设置的手动缩放之后应用。
  * `multiplyX(float)` 和 `multiplyY(float)` - 用于乘以贴花缩放的值（默认：`1.0`）。
  * 其他 Everest 属性将根据贴花缩放自动进行调整（例如偏移量）。
* `<randomizeFrame>` 为动画贴花选择随机的起始帧。无属性。

## 一次将属性应用到多个贴花
如果你的模组中有多个贴花需要相同的属性，你可以一次将它们全部应用，而不必重复相同的 `<decal>` 元素。有两种方法可以做到这一点：

* 在 `path` 属性末尾使用 `/` 将选择位于指定目录中的所有贴花。示例：
  ```xml
  <decal path="catapillie/clouds/">
  ```
  这将影响：`catapillie/clouds/big`、`catapillie/clouds/small` 等...但不会影响：`catapillie/clouds/blue/big` 等...

* 在 `path` 属性末尾使用 `*` 将选择路径以指定值开头的所有贴花，但前提是它们位于同一目录中。示例：
  ```xml
  <decal path="catapillie/cloud*">
  ```
  这将影响：`catapillie/cloud_a`、`catapillie/cloudB` 等...但不会影响：`catapillie/cloud`、`catapillie/clouds/custom` 等...

请注意，`<decal>` 元素**在应用前会根据其选择类型进行排序**，而不是按文件内的顺序。顺序为：
- 文件夹（`/`）
- 匹配路径（`*`）
- 常规单个贴花

例如：
```xml
<decals>
	<decal path="catapillie/plant*">
		<!--properties-->
	</decal>
	<decal path="catapillie/gem">
		<!--properties-->
	</decal>
	<decal path="catapillie/clouds/">
		<!--properties-->
	</decal>
	<decal path="catapillie/plant_b*">
		<!--properties-->
	</decal>
</decals>
```
在应用前将被排序为：
- `catapillie/clouds/`
- `catapillie/plant*`
- `catapillie/plant_b*`
- `catapillie/gem`

另请注意，如果有两个（或更多）以 `*` 结尾的路径匹配同一个贴花，最精确的路径总是最后应用（见上文）。
如果遇到任何问题，或者你对此有反馈，欢迎在 [Celeste Discord :link:](https://discord.com/invite/6qjaePQ) 上 @catapillie。

## 添加自定义属性
如果你想创建自定义属性，你需要创建一个[**代码模组**](https://github.com/EverestAPI/Resources/wiki/Code-Mod-Setup)，并在你模块的 `Load` 方法中调用贴花注册表的 `AddPropertyHandler<T>` 方法。这样，只要安装了你的模组，任何人都可以使用该属性。请注意，属性 ID 需要在所有模组中唯一，以避免冲突——建议你在属性前加上你的模组名称，例如 `YourMod_propertyname`。

以下是一个使用 Everest 实现的 `depth` 属性的示例：
```cs
using Celeste.Mod.Registry;

internal sealed class DepthDecalRegistryHandler : DecalRegistryHandler {
    private int? _depth;
    
    // Name used in the xml file to refer to this handler. Should be unique across mods
    public override string Name => "YourMod_propertyName";
    

    public override void Parse(XmlAttributeCollection xml) {
        // Get and cache attributes from the xml here. Called ONCE on Decal Registry load/reload,
        // use helper methods on DecalRegistryHandler to make this easier.
        _depth = GetNullable<int>(xml, "value");
    }

    public override void ApplyTo(Decal decal) {
        // Apply changes to the given decal here, called once when loading a decal.
        if (_depth is { } depth)
            decal.Depth = depth;
    }
}

// In your EverestModule's Load method:
Celeste.Mod.DecalRegistry.AddPropertyHandler<DepthDecalRegistryHandler>();
```

请确保为任何自定义属性考虑贴花缩放。例如，`solid` 属性必须调整宽度、高度和原点，以确保碰撞箱放置在合适的位置。以下扩展方法可用于简化这一操作。

```cs
public static Vector2 GetScaledOffset(this Decal self, float x, float y);
public static float GetScaledRadius(this Decal self, float radius);
public static void ScaleRectangle(this Decal self, ref float x, ref float y, ref float width, ref float height);
public static void ScaleRectangle(this Decal self, ref int x, ref int y, ref int width, ref int height);
```

## 辅助属性
以下是当前可用的、用于添加额外属性的辅助包。
警告：这是少数几个 Lönn 不会自动为你检测依赖关系的罕见情况之一。你必须手动将你使用的辅助包添加到 everest.yaml 中。否则，模组仍然可以游玩，但这些属性将不会生效。

### Adam 的附加包
此辅助包添加了多个属性，包括：
* `<adamsaddons.rotate>`。以恒定速度旋转。
* `<adamsaddons.oscillate>`。围绕 Y 轴"旋转"。
* `<adamsaddons.aim>`。朝向玩家/Theo。
* `<adamsaddons.pendulum>`。像钟摆一样摆动。
* `<adamsaddons.shake>`。不断晃动。
* `<adamsaddons.move>`。将旋转转化为运动。
* `<adamsaddons.randomize>`。随机选择一张贴图（即使你重新开始章节，这张贴图也会保持不变）。
* `<adamsaddons.fade>`。淡入/淡出。
* `<adamsaddons.wobble>`。缩小和放大。
* `<adamsaddons.depthChange>`。改变深度。
* `<adamsaddons.playerAttach>`。将贴花附加到玩家身上。
* `<adamsaddons.cameraAttach>`。将贴花附加到相机中心（类似于风格地面）。
* `<adamsaddons.debris>`。如果与 `staticMover` 属性一起使用，当贴花所附着的方块碎裂时，贴花将变成碎片。
* `<adamsaddons.global>`。即使玩家在不同房间，贴花也将保持活动状态，可选择在过场、定格帧或暂停时进行动画。

建议阅读[官方文档 :link:](https://gist.github.com/AdamKorinek/7e27d288701db5a0df095f756f0f8e9a)以获取更详尽的说明和示例。

### Brokemia Helper
* `<BrokemiaHelper_cassetteAnimated>`。让贴花随卡带循环一起动画。
* `<BrokemiaHelper_playerMotion>`。当玩家以超过一定速度移动进入其碰撞箱时播放动画和声音。附带风铃示例。

建议阅读[官方文档 :link:](https://github.com/EverestAPI/ModResources/wiki/Brokemia-Helper-Extra-Features)以获取更详尽的说明和示例。

### Chronia Helper
* `<chronia.frameIndexFlag>`。当某个贴花帧匹配时设置一个 flag。
在原版注册表中，你可以通过 `animation` 设置动画序列，现在假设你制作了这样的动画：
`<animation frames="3*20,4"/>`
通过这样设置序列，新的贴花动画序列由 20 帧贴图 3（xxx03.png）和 1 帧贴图 4（xxx04.png）组成，共 21 帧。
所以如果我设置 `<chronia.frameIndexFlag indexes="3,4" flags="flagM"/>`，当动画播放帧 3 和帧 4 时，`flagM` 将处于活动状态，即动画序列中的第 4 和第 5 项（索引从 0 开始），两者都使用贴图 3。
* `<chronia.textureIndexFlag>`。当某个贴花贴图匹配时设置一个 flag。
让我们使用上面设置的相同动画序列，再设置另一个注册表，如下所示：`<chronia.textureIndexFlag indexes="3,4" flags="flagN"/>`
当动画使用贴图 3（xxx03.png）和贴图 4（xxx04.png）时，`flagN` 将处于活动状态。注意，我们上面设置的动画由 20 帧贴图 3 和 1 帧贴图 4 组成，这意味着该动画只包含贴图 3 和贴图 4，因此 `flagN` 将始终处于活动状态！
* `<chronia.color tag="tagName"/>`。使用基于同一 tag 的颜色会话值给贴花着色，相关值为：`ChroniaHelper_ChroniaColor_tagName_R`（计数器，0 - 255）、`ChroniaHelper_ChroniaColor_tagName_G`（计数器，0 - 255）、`ChroniaHelper_ChroniaColor_tagName_B`（计数器，0 - 255）、`ChroniaHelper_ChroniaColor_tagName_A`（滑块，0 - 1）。并非所有这些值都需要设置——如果它们不存在，默认将为白色（RGBA = 255, 255, 255, 1）。
* `<chronia.sessionColor/>`。使用计数器和滑块，且颜色不存储在会话中。属性：`r="counterName"`（红色，0 - 255）、`g="counterName"`（绿色，0 - 255）、`b="counterName"`（蓝色，0 - 255）、`a="sliderName"`（alpha，0 - 1）。
* `<chronia.sessionPosition/>`。通过滑块值设置贴花位置。属性：`x="sliderName"` `y="sliderName"`。
* `<chronia.sessionScale/>`。通过滑块值设置贴花缩放。属性：`x="sliderName"` `y="sliderName"`。

建议阅读[官方文档 :link:](https://github.com/Und3rDragon/ChroniaHelper/wiki/Decal-Registry)以获取更详尽的说明和示例。

### Frost Helper
* `<frosthelper.rainbow>`。让贴花呈现彩虹色。
* `<frosthelper.decalContainerIgnore>`。用于保留那些可能会因贴花容器而出问题的其他属性。

### Jungle Helper
* `<jungleHelper_rainbow>`。让贴花呈现彩虹色，复刻原版彩虹 spinners 的效果。

### Kosei Helper
* `<koseihelper.kill>`。创建一个死亡碰撞箱。
* `<koseihelper.moving>`。沿某个方向移动贴花，可选择与实体碰撞。
* `<koseihelper.trail>`。为移动的贴花创建类似于玩家拖尾的拖尾效果。
* `<koseihelper.multiflagSwap>`。允许基于多个 flag 在多个贴图之间切换。
* `<koseihelper.counterSwap>`。允许基于会话计数器的值在多个贴图之间切换。

建议阅读[官方文档 :link:](https://github.com/koseidiamond/KoseiHelper/wiki/Decal-Registry)以获取更详尽的说明和示例。

### Mint Chocolate Helper
* `<mint.clockHand>`。专为让物体以时钟指针的方式旋转而设计。
* `<mint.playerDistanceFade>`。未记录文档。

### Sardine7
* `<Sardine7_pollution>`。与 `smoke` 属性相同，但重新着色为灰白色。
* `<makeSolids>`。创建多个实体，不同于只创建一个实体的 `makeSolid` 属性。

### Sorbet Helper
* `<sorbetHelper_lightCover>`。遮挡住接触贴花的任何光线。
* `<sorbetHelper_styleground>`。允许贴花作为风格地面图层的一部分绘制。

建议阅读[官方文档 :link:](https://github.com/earthwise01/SorbetHelper/wiki/Decal-Registry)以获取更详尽的说明和示例。

### Xaphan Helper
* `<XaphanHelper_flagsHide>`。基于一个或多个 flag 显示/隐藏贴花。
  * `flags(string)`。可以是一个或多个用逗号分隔的 flag。如果指定的 flag 中至少有一个为 true，则贴花将不可见。例如：`flags="flag1,flag2"`。
  * `room(string)`。指定此效果生效的房间名称。允许你在多个房间中放置同一个贴花，但只在一个特定房间中隐藏它。完全移除它则可影响每个房间。
  * `inverted(boolean)`。反转行为。如果指定的 flag 中至少有一个为 true，则贴花可见，否则不可见。
