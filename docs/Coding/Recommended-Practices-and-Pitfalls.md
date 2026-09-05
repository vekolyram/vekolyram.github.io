# 已知问题
下面是一些看起来对代码模组可能有用、但使用后可能导致各种问题（通常与跨平台兼容性相关）的代码特性和技巧。

## [`IntPtr` "base.base." 技巧 :link:](https://stackoverflow.com/a/32562464)
这是一种调用"基类的基类方法"的取巧方式，用于在 `override` 方法中希望跳过直接的 `base.` 方法调用时（例如当继承自原版类时）。  
**这在 MacOS 上会因不明原因崩溃。**

推荐的做法是使用 `MonoModLinkTo` 特性，如[此处 :link:](https://github.com/EverestAPI/ExampleMod/blob/8c0b712816d3e9423862cd1a0edf2ded48f7b9c6/Examples/ExtendingVanilla.cs#L21-L30) 所示。

## 带 getter 的 [`struct` :link:](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct) 上的 [`DynamicData` :link:](https://github.com/MonoMod/MonoMod/blob/master/MonoMod.Utils/DynamicData.cs)
对包含 getter/属性的结构体创建 `DynamicData` 实例会在 mono 上抛出 `System.InvalidProgramException`，这可能是 [MonoMod 的 bug :link:](https://github.com/MonoMod/MonoMod/issues/84)。

在该问题被修复之前，你需要使用[反射 :link:](https://learn.microsoft.com/en-us/dotnet/api/system.reflection) 来访问成员。

干脆别用它们™
