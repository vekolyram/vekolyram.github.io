本教程将带你创建一个简单的模组，用来替换 Celeste 中的一张贴图，并将其打包以准备发布。

本页假定你已经安装并设置好了 [Everest :link:](https://everestapi.github.io)。

# 目录：

<details>
<summary>点击展开目录</summary>

*    [模组搭建](#模组搭建)
*    [访问原版贴图](#访问原版贴图)
  *    [浏览图形转储](#浏览图形转储)
*    [替换贴图](#替换贴图)
<!-- *    [Editing sprite data](#editing-sprite-data) (keys?) -->
*    [打包你的模组](#打包你的模组)
*    [技巧与提示](#技巧与提示)

</details>

# 模组搭建
按照[模组搭建教程](../Guides/Mod-Setup.md)来搭建你的模组。

在你的模组文件夹内创建以下文件夹。`Graphics` 文件夹应与 `everest.yaml` 文件位于同一层：
```
Celeste
- Mods
  - MyExampleMod
    - Graphics
      - Atlases
        - Gameplay
```

# 访问原版贴图
原版贴图可以在[图形转储 :link:](https://drive.google.com/open?id=1ITwCI2uJ7YflAG0OwBR4uOUEJBjwTCet)中找到。请下载并把[解压 :link:](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-f6dde0a7-0fec-8294-e1d3-703ed85e7ebc)到**游戏文件之外**的某个位置。

## 浏览图形转储
在 Celeste 中，图形根据用途被划分到多个[图集 :link:](https://en.wikipedia.org/wiki/Texture_atlas)中。
在本教程中我们只会用到 `Gameplay` 图集，但其它值得注意的还有：用于高分辨率地表世界与界面贴图的 `Gui` 图集，以及用于角色对话头像的 `Portraits` 图集。

打开图形转储并导航到 `Graphics/Atlases/Gameplay/decals/1-forsakencity/`。这个文件夹里会有若干 `PNG` 图像文件，它们被用作第 1 章专属的贴花。

# 替换贴图
在你[之前](#模组搭建)创建的 `Gameplay/` 文件夹中，再创建以下文件夹：
```
- Gameplay
  - decals
    - 1-forsakencity
```
:information_source: 这必须与图形转储的文件夹结构*完全一致*。

下载[这个图像文件 ![贴花替换](https://maddie480.ovh/img/sign_under_construction.png) :link:](https://maddie480.ovh/img/sign_under_construction.png)（由 `@juno (raine)#3540` 友情提供），并把它移动进 `1-forsakencity` 文件夹。请确保图像文件的名称是 `sign_under_construction.png`。你可能需要[开启文件扩展名显示](../General/FAQ.md#如何显示文件扩展名)来确认这一点。

现在打开（或重启）Celeste，进入废弃之城（Forsaken City）的第一个房间，就能看到你的新贴图。如果它没有替换掉那块“正在施工”的牌子，请在 [Celeste Discord :link:](https://discord.gg/celeste) 的 `#modding_help` 频道发帖求助。
<!-- 
# 编辑精灵图数据
Celeste 中大多数复杂的动画精灵图都在 [XML :link:](https://en.wikipedia.org/wiki/XML) spritebank 文件中定义。

本教程将编辑“Bumper”实体的精灵图数据。

## 覆盖精灵图
在你的模组 `Graphics/` 文件夹内，创建一个名为 `Sprites.xml` 的文件。它与位于 `Celeste/Content/Graphics/Sprites.xml` 的原版文件相对应。
```
- MyExampleMod
  - Graphics
    - Sprites.xml
```

虽然大多数原版资源只要在模组中添加相同相对路径的文件就会被完全替换，但[有些文件会被 Everest 跨所有模组合并]()。
这其中包括“global”的 `Sprites.xml` 文件（即直接位于 `Graphics/` 文件夹中的那个），这意味着我们只需要包含我们打算覆盖的精灵图定义。

把下面提供的原版 Bumper 精灵图定义复制到你的 `Sprites.xml` 文件中。
```xml
<Sprites>
  <bumper path="objects/bumper/" start="idle">
    <Center/>
    <Anim id="on" path="idle" frames="42-44" delay="0.06" goto="idle"/>
    <Loop id="idle" path="idle" frames="0-33" delay="0.06"/>
    <Anim id="hit" path="idle" frames="34-42" delay="0.06" goto="off"/>
    <Loop id="off" path="idle" frames="42" delay="0.06"/>
  </bumper>
</Sprites>
```


```xml
<bumper path="objects/coolmod/bumper/" start="idle">
  <Center/>
  <Anim id="on" path="on" frames="0-2,2,2" delay="0.08" goto="idle"/>
  <Loop id="idle" path="idle/active" frames="0-11" delay="0.06"/>
  <Anim id="hit" path="hit" frames="0-4" delay="0.06" goto="hit2,off"/>
  <Anim id="hit2" path="hit" frames="5-8" delay="0.06" goto="off"/>
  <Loop id="off" path="idle/off" frames="0,0-2,1,1" delay="0.06"/>
</bumper>
```
-->
# 打包你的模组
既然你已经为模组设置好了 `everest.yaml`，打包时只需把它压缩成一个 zip 归档文件即可。

:warning: 请务必压缩模组文件夹的*内容*，而不是压缩文件夹本身
![归档模组文件夹](https://maddie480.ovh/img/zip.png)

:warning: 不要把模组的 zip 压缩版与文件夹版放在一起，否则会导致资源冲突。只有在把模组发送给他人时才需要压缩它。

# 技巧与提示



### 别忘了查看本 wiki 的侧边栏，那里还有更多资源！
