# 图块集格式
原版图块集由一系列"遮罩（Masks）"组成：遮罩是对周围图块配置的描述，用于为某个图块挑选贴图（[这里 :link:](https://github.com/EverestAPI/Resources/assets/52103563/955c9434-19f5-4816-a01c-c0167b669011) 是 tobyaaa 制作的 mask 属性可视化指南）。

图块集 xml 节点的结构如下：
```xml
<Tileset id="X" path="path/from/(Gameplay/tilesets)">
   <set mask="x0x-111-x1x" tiles="0,0"/>
   <set mask="padding" tiles="0,1"/>
   <set mask="center" tiles="1,0;1,1"/>
</Tileset>
```

### 逐行拆解：
---
```xml
<Tileset id="X" path="path/from/(Gameplay/tilesets)">
```
这是 Tileset 定义的起始，其中：

`id` 是在地图二进制文件中用来表示该图块的字符
`path` 是图块集图片相对于 `Gameplay/tilesets` 的路径

---
```xml
<set mask="x0x-111-x1x" tiles="0,0"/>
```
这是图块集的标准遮罩定义，将用于最外层的图块。
`mask` 属性描述一个 3x3 的图块方格，其中中心图块代表当前正在分析的那个。
原版遮罩中可接受的字符为：
`1` - 存在图块
`0` - 不存在图块
`x` - 任意

`tiles` 属性包含图块在图块集图片中的坐标。图块为 8x8，因此坐标与 8x8 网格对齐，从 `0,0` 开始。你可以用分号分隔来列出多个图块，例如：

```xml
<set mask="x0x-111-x1x" tiles="0,0; 0,1; 1,2"/>
```
---
```xml
<set mask="padding" tiles="0,1"/>
<set mask="center" tiles="1,0;1,1"/>
```
这些定义图块集的内部层次，其中 `padding` 描述从外部图块向内一层，`center` 描述其余所有部分。

# Everest 特性

Everest 为自定义图块集新增了一些特性，如下所述，源自[这个拉取请求 :link:](https://github.com/EverestAPI/Everest/pull/241)。

除了 padding 和 center 内部层次之外，还可以定义任意数量的填充层次：

```xml
<set mask="fill0" tiles=""/>
<set mask="fill1" tiles=""/>
...
```
可以通过 Tileset 节点上的属性设置自定义遮罩扫描宽度/高度：
```xml
<Tileset scanWidth="5" scanHeight="5">
```

`y` 过滤器可以在遮罩中使用，意思是"任何不是当前这个的图块"。
还可以定义自定义过滤器用于遮罩中：
```xml
<define id="a" filter="4,5" ignore="true"/>
```
其中：

`id` 是在遮罩中使用的字符。
`filter` 是要加入过滤器的图块集 id。
`ignore` 决定这些 id 是白名单还是黑名单。

 - （根据测试，y 遮罩目前似乎有些 bug，如果你想用它，就必须定义它并且同时使用一个反 y 遮罩，因为据我测试，你无法用自定义遮罩定义的图块替换已经定义的图块；尝试把下面的内容粘贴进去，并在你想让 y 遮罩图块覆盖的图块遮罩中放入 z）
 ```xml
   <define id="y" filter="*" ignore="false"/>
   <define id="A" filter="*" ignore="true"/>
```

# AnimatedTiles
AnimatedTiles（动画图块）是可以添加到图块集遮罩中的贴图，当该遮罩被使用时就会显示。原版中，Grass 和 DeadGrass 图块集的波浪状草叶就使用了它。

要向地图的某个图块集添加 AnimatedTiles，需要遵循类似的设置流程：
- 从 Celeste 文件夹的 `Content/Graphics/` 中获取 `AnimatedTiles.xml` 文件。
- 将 `AnimatedTiles.xml` 复制到存放其他图块集 xml 的同一文件夹中。
- 在地图编辑器中，将你的 `AnimatedTiles.xml` 的路径复制到"地图元数据"窗口的"Animated Tiles"字段中。

AnimatedTiles 可以如下添加到 xml 中：
```xml
<sprite name="sprite_name" path="path/from/Gameplay/folder" delay="0.2" posX="0" posY="-8" origX="4" origY="4"/>
```
其中：

`delay` 是动画速度。
`posX` 和 `posY` 是相对于图块的位置。
`origX` 和 `origY` 是精灵（sprite）的原点。

要将 AnimatedTile 添加到图块集遮罩中，请在你的 `(Fore/Back)groundTiles.xml` 中把 AnimatedTile 的 `name` 添加到每个相关遮罩的 `sprites` 属性中：
```xml
<set mask="x0x-111-x1x" tiles="0,0" sprites="sprite_name"/> 
```
一个遮罩可以添加多个 AnimatedTiles，用逗号分隔，会从中随机选择。

> [!NOTE] 说明
> 你需要为你希望 AnimatedTile 出现的每个遮罩添加 `sprites` 属性（参考原版 grass 图块 xml 作为可用示例）。
>
> [!IMPORTANT] 重要
> 为图块集定义动画精灵时，你的图块集**绝不能**使用 `copy="..."`
>
> 使用 `copy="..."` 时，被复制的图块集 *（此处为 ID `h`）* 的遮罩会**覆盖**复制它的图块集 *（此处为 ID `X`）* 的遮罩。
> 这意味着类似下面的写法**不会生效**：
> ```xml
> &lt;Tileset id="X" copy="h" path="SnipUndercover/ExampleMap/pink_grass" ignores="*" sound="33">
>   <set mask="x0x-111-x1x" tiles="0,0;1,0;2,0;3,0" sprites="pink_grass_top_a" />
> </Tileset>
> ```
>
> 你需要改为复制完整的图块集定义，而不是使用 `copy="..."`。
> ```xml
> &lt;Tileset id="X" path="SnipUndercover/ExampleMap/pink_grass" ignores="*" sound="33">
>   <set mask="x0x-111-x1x" tiles="0,0;1,0;2,0;3,0" sprites="pink_grass_top_a" />
>   <set mask="x1x-111-x0x" tiles="0,1;1,1;2,1;3,1"/>
>   <set mask="x1x-011-x1x" tiles="0,2;1,2;2,2;3,2"/>
>   <set mask="x1x-110-x1x" tiles="0,3;1,3;2,3;3,3"/>
>
>   <!-- 其余被复制的遮罩…… -->
> </Tileset>
>
> [!NOTE] 说明
> 默认情况下，AnimatedTiles 只在地形图块上显示，不会出现在大多数图块实体（DashBlock、CoverupWall 等）上。
