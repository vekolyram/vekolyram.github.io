要制作地图，你必须安装 Everest（模组加载器）和 Lönn（地图编辑器）。这两者都可以方便地通过一个名为 [Olympus :link:](https://everestapi.github.io/) 的程序安装。有关最新的 Lönn 文档（包括安装信息），请参阅 https://github.com/CelestialCartographers/Loenn。

## 地图制作常见问题
### 如何保存地图？
Control 和 S。

### 如何删除房间？
Alt 和 Delete。

### 如何创建房间？/ 为什么我的屏幕是空白的？
点击顶部的 Room，然后点击 Add。

### 如何自动化处理枯燥的任务？
[Lönn Scripts :link:](https://gamebanana.com/tools/8050) 提供了便捷的脚本接口来执行常见的批量操作。有几个辅助工具会为这个插件添加额外的脚本。如果你会编程，编写自定义脚本来处理特定任务会相当简单。

### 合作地图多久出一次？
没有固定的时间表，但通常每隔几个月会出一次。合作项目、比赛和其他项目通常列在[这里 :link:](https://maddie480.ovh/celeste/collab-contest-list)。你也可以在 [Celeste Discord :link:](https://discord.com/invite/celeste) 中询问。

### 如何添加房间过渡？
为每个房间入口/出口各放置一个玩家实体。

### 如何为自己地图添加 B 面？
YourMap.bin + YourMap-B.bin

### 为什么我的金草莓不出现？/ 为什么我的 C 面不出现？
你需要在关卡合集中收集每个 A 面和 B 面的每颗水晶之心，并至少通关该面一次，或者使用作弊模式。

### 如何在 Lönn 中使用风格地面（Stylegrounds）？
请参阅风格地面教程[此处](Mapping/Adding-Stylegrounds.md)。

### 如何在 Lönn 中添加自己的贴花？
如果你将贴花放在 `Celeste/Mods/YourMod/Graphics/Atlases/Gameplay/decals/YourName/YourMod/decal.png`，Lönn 就会找到它。
以数字结尾的文件名会被 Celeste 用作动画帧；Lönn 会隐藏除第一帧（00）之外的所有帧，以免贴花列表显得杂乱。
如果即使刷新后它仍未出现在你的贴花列表中，请尝试重启 Lönn。

### 如何将我的地图转换为 .zip？
.bin 地图不建议用于公开分发，建议改用 .zip。如果你想自动转换，可以使用 [Postcard :link:](http://postcard.leo60228.space/start)。更详细的信息请查看[模组结构文章](https://github.com/EverestAPI/Resources/wiki/Mod-Structure)。

### 如何为我的自定义检查点添加检查点遮罩？
[Postcard :link:](http://postcard.leo60228.space/mask) 可以自动完成这项操作。只需上传你的截图、点击提交并保存新图片即可。请将问题反馈给 Discord 上的 @leo60228#0480。如果此方法无效，[地图元数据](Mapping/Map-Metadata.md#检查点图片)页面也提供了手动操作的说明。

### 如何让火球之类的物体拥有更多自身的副本？/ 如何为触发器添加更多那种小的激活方块？
这些被称为节点。要创建它们，请按 N，然后你就可以像普通物体一样移动和删除它们。
