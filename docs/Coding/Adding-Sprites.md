这是一篇关于向游戏添加静态或动态精灵图的教程，添加后可以从你的代码模组中访问它们。  
如有疑问或反馈，请在 [Celeste Discord :link:](https://discord.gg/6qjaePQ) 上联系 @coloursofnoise。

# 目录：
## 理解 Atlas 系统
- [Atlases](#atlases)
- [SpriteBanks](#spritebanks)
## 向你的代码模组添加自定义精灵图：
- [在代码中使用 MTextures](#在代码中使用-mtextures)
- [使用 SpriteBank 文件](#使用-spritebank-文件)
- [在代码中创建精灵图](#在代码中创建精灵图)


# Atlas 系统
## Atlases
Celeste 将贴图存储在 Atlas 中，每个 atlas 用于游戏的不同方面。

Celeste 的贴图是使用 [Crunch :link:](https://github.com/ChevyRay/crunch) 以二进制格式打包的，因此在 `Contents` 文件夹中产生了 `.meta` 和 `.data` 文件。这些图形已经通过保留原始文件夹结构的方式被提取到[此处 :link:](https://drive.google.com/open?id=1ITwCI2uJ7YflAG0OwBR4uOUEJBjwTCet)，并且可以自由用于 Celeste 模组制作。

要将贴图加载到现有的 atlas 中，请按照[此处](https://github.com/EverestAPI/Resources/wiki/Mod-Structure#file-layout)关于预支持内容映射的说明进行操作。

原版游戏附带的并加载的 Atlas 包括：
- `Gameplay` - 用于游戏内贴图
- `Gui` - 用于菜单和标题画面
- `Portraits` - 用于角色对话

游戏加载时，会获取每个 atlas [文件夹](https://github.com/EverestAPI/Resources/wiki/Mod-Structure#file-layout)中的每个文件，并将它们添加到一个 Atlas 对象中。之后可以通过使用文件在文件结构中的相对路径来查询 atlas，从而引用它们。

## SpriteBanks
SpriteBank 是 Atlas 系统的扩展，它利用一个 xml 结构将多个贴图编译成动画，即 `Sprites`。

原版 SpriteBank 包括：
- `Sprites.xml` - 用于游戏内精灵图
- `SpritesGui.xml` - 用于高分辨率菜单和标题画面
- `Portraits.xml` - 用于角色对话

# 代码模组的自定义精灵图

## 在代码中使用 MTextures
这是将新贴图加载到游戏中最简单的方式，但它只对静态图片真正有用。

要获取一张贴图并将其赋值给一个变量，只需像访问字典一样访问 Atlas，使用一个包含图片相对路径（**不含文件扩展名**）的字符串作为索引。  
例如：对于 Gameplay atlas 中的贴图，使用 `MTexture myTexture = GFX.Game["pathname"];`。

要在游戏中显示你的贴图，请在适当的 `Render` 方法中调用贴图的 `Draw` 或 `DrawCentered` 方法。  
例如：`myTexture.Draw(position);`

还可以向实体添加一个 `Image` 组件，以便在调用 `base.Render()` 期间相对于实体渲染 MTexture。  
例如：`Add(new Image(myTexture));`


## 使用 SpriteBank 文件
SpriteBank 文件是一种 xml 文件，它将贴图分组为带有动画和状态的精灵图。它们无法被动态修改。

大多数原版 Gameplay 精灵图都存储在 Celeste 的 `Graphics` 文件夹中的 `Sprites.xml` 文件里。要添加你自己的精灵图，你需要在你的模组文件夹中制作一个类似的文件，同样放在 `Graphics` 子文件夹中。

Spritebank 文件也可以在你的模组中的其他位置创建，但必须通过创建一个指向相应 [Atlas](#atlases) 的新 `SpriteBank` 来单独加载。

将你自己的精灵图添加到该文件中，大致会模仿以下示例：
```xml
<Sprites>
  <!-- ...其他精灵图... -->
  <spriteName path="sprite/folder" start="initialanimation">
    <!-- 如果你希望它居中： -->
    <Center/>

    <!-- 此动画将循环播放直到被更改： -->
    <Loop id="loopID" path="texturename" delay="0.15"/>

    <!-- 此动画将播放一次： -->
  <Anim id="animID" path="othertexturename" delay="0.08" frames="3,7-9"/>
  </spriteName>
  <!-- ...其他精灵图... -->
</Sprites>
```

在上面的示例中，你的文件结构大致如下：
<pre>
Graphics/Atlases/Gameplay
  ↳ sprite
    ↳ folder
      ↳ texturename0
      ↳ texturename1
      ↳ texturename2
      ↳ othertexturename3
      ↳ othertexturename7
      ↳ othertexturename8
      ↳ othertexturename9
</pre>

然后，你可以通过类似以下的代码从 SpriteBank 中获取你的精灵图：
```cs
Sprite mySprite = GFX.SpriteBank.Create("spriteName");
Add(mySprite); // 将精灵图组件添加到你的实体上
mySprite.Play("animID"); // 播放一个动画
```

> [!NOTE] 说明
> 如果你创建了独立于主 Gameplay 精灵图的 SpriteBank，请将 `GFX.SpriteBank` 替换为对你的 SpriteBank 的引用。
>
>
## 在代码中创建精灵图
也可以不将它们添加到 SpriteBank 文件中，就直接添加和播放自定义动画。这允许在程序运行时动态地创建动画。

此方法使用 Atlas 来获取精灵图，然后在代码中添加循环和动画：
```cs
Sprite mySprite = new Sprite(GFX.Game, "sprite/folder/");
mySprite.AddLoop("loopID", "path", delayFloat); // 添加一个动画
mySprite.Play("loopID"); // 播放该动画
```
