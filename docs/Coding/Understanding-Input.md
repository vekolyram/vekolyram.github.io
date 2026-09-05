# 获取输入
## Input 类

Celeste 使用 `static Input` 类来按需获取用户输入。Input 类包含多个成员，每个成员分别引用一种不同的输入。

幸运的是，在你的代码模组中获取输入就像读取所需字段中保存的值一样简单。
例如：`Input.Jump.Pressed`

大多数值不言自明，例如以布尔值表示的按键或键盘按键状态，但有些值需要更多说明。

### 按键
每个按键都有几个相关的值：Pressed、Released 和 Check。它们的含义如下：
- Check - 该按键当前是否被按下？
- Pressed - 该按键是否刚刚被按下？
- Released - 该按键是否刚刚被松开？

### 轴移动
轴移动分为 `MoveX` 和 `MoveY` 字段，以及用于果冻（Jelly）的 `GliderMoveY`。

每个轴都返回一个介于 -1 和 1 之间的浮点值。

### 摇杆
摇杆位置位于 `Aim` 成员下，主要用于在羽毛状态下进行移动。此外还有 `MountainAim`，用于在大地图上移动摄像机。

Aim 值是一个 `Xna.Framework Vector2`，其两个值都被限制在 -1 到 1 之间。

# 创建新的输入
参见[模组设置页面](https://github.com/EverestAPI/Resources/wiki/Mod-Settings)上的 ButtonBinding 一节

如有疑问或反馈，请在 Celeste [Discord :link:](https://discord.gg/6qjaePQ) 上联系 @coloursofnoise。
