日志是调试的绝佳资源，但在发布版本中应注意控制日志的输出量。写入日志文件会消耗游戏资源，而且向日志刷屏式地发送消息会使其难以阅读，对其他用户和开发者也不再有价值。

## 使用 `Logger` 类

Everest 提供了一个静态的 `Logger` 类，你可以用它向 `log.txt` 写入消息。日志由三个部分组成：
* **Level（级别）**：消息的紧急程度。
  * Verbose < Debug < Info < Warn < Error
  * 如果未提供级别，默认为 `Verbose`。
* **Tag（标签）**：消息的类别。标签用于过滤哪些日志会被打印。
  * 标签应当唯一，但不要太长以至于让日志显得杂乱。
  * 标签的最小日志级别默认为 `Info`。可以通过 `SetLogLevel` 覆盖。
* **Message（消息）**：实际的日志消息。

:warning: 基于以上说明，**使用默认日志级别和标签级别的日志命令不会被打印**。这是有意为之，以减少日志刷屏。如果你希望日志被打印，请指定日志级别，并且/或者更改该标签的最低级别。

```cs
if (level.Tracker.GetEntity<Player>() == null) {
    Logger.Log(LogLevel.Warn, "MyMod/MyCustomEntity", "Oh no, can't find the player!");
    return false;
}
```

在这个示例中，`Warn` 高于我们标签的最低级别，因此日志会被打印：

`(07/30/2022 21:09:02) [Everest] [Warn] [MyMod/MyCustomEntity] Oh no, can't find the player!`

以下是常用 `Logger` 功能的快速参考：

```cs
Logger.Log(LogLevel level, string tag, string str)          // Logs a message (if minimum level met).
Logger.Log(string tag, string str)                          // Logs a message at Verbose level.

Logger.LogDetailed(LogLevel level, string tag, string str)  // Logs a message with a stack trace.
Logger.LogDetailed(string tag, string str)                  // Logs a message with a stack trace at Verbose level.

Logger.SetLogLevel(string tagPrefix, LogLevel minimumLevel) // Sets the minimum log level for a tag prefix.

```

请注意，`SetLogLevel` 期望传入一个标签前缀。常见的做法是在模组的 `Load()` 函数中做一次 `SetLogLevel` 调用，使其应用于你的所有标签，例如 `SetLogLevel("MyMod", LogLevel.Info)`。这样你就可以在用于调试的 `Verbose` 和用于发布版本的 `Info` 之间轻松切换。

## 其他日志工具
* 使用 `logdetours` [调试命令](https://github.com/EverestAPI/Resources/wiki/Debug-Mode)打印所有活动的[钩子（Hook）](Making-Code-Mods.md#on-celeste-钩子)。
* 使用 `setloglevel [tagPrefix] [level]` 调试命令覆盖某个标签的最低日志级别。
  * 也可以通过编辑 Everest 设置文件中的 `LogLevels` 键来持久化设置。
* 使用 `--loglevel` [命令行参数](https://github.com/EverestAPI/Resources/wiki/Command-Line-Arguments)在启动时为所有标签设置默认打印级别。
* `Console.WriteLine()` 会直接打印到日志文件中。
  * :warning: 用于快速调试很方便，但**不要在模组的发布版本中使用**。
