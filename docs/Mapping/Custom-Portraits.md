在你的 Graphics 文件夹中创建一个名为 `Portraits.xml` 的文件（关于如何设置该文件夹，请参阅[此处](https://github.com/EverestAPI/Resources/wiki/Mod-Structure)）。

> [!NOTE] 说明
> 如果你的 `Portraits.xml` 文件*不*位于 Graphics 文件夹的顶层（建议为地图指定一个唯一路径），则需要将它添加到你的地图元数据中。  
> 这会**替换**原版的 `Portraits.xml` 文件，因此如果你想使用原版肖像，请将它们一并包含在你自己的文件中。
>
参考以下示例，将所有 `{yourportrait}`（包括 `{}`）替换为你的肖像名称：
```xml
<?xml version="1.0" encoding="utf-8" ?>
<Sprites>
  <portrait_{yourportrait} path="{yourportrait}/" sfx="{yourportrait}" textbox="{yourportrait}">
    <Center />
	 
    <sfxs>
      <normal index="1"/>
    </sfxs>
	 
    <Loop id="idle_normal" path="normal" delay="0.1" frames="0"/>
  </portrait_{yourportrait}>
</Sprites>
```

`portrait_{yourportrait}` 对应 `[YOURPORTRAIT right normal]` 中的 `YOURPORTRAIT`
- `path` 表示 Portraits 图集（`Graphics/Atlases/Portraits/`）内的文件夹，不包含 `Graphics/Atlases/Portraits/`
  **务必在末尾加上 `/`！**
- `sfx` 指所使用的音频事件，会被附加到 `event:/char/dialogue/` 之后
- `textbox` 是文本框贴图相对于 `Graphics/Atlases/Portraits/textbox` 的路径
- `phonestatic` 可以是 "mom" 或 "ex"（可选）
- `glitchy` 可以是 "true" 或 "false"（可选）

建议使用 `Center` 标签将肖像在文本框中居中

动画 `id` 可以使用三种不同的前缀：
- `begin`：在待机或说话动画之前播放
- `idle`：未说话时播放
- `talk`：说话时播放

每组动画（或__表情__）还需要在 `sfxs` 元素中分配一个 `index`，它被用作 `dialogue_portrait` 音频参数
当音频即将结束时，`dialogue_end` 音频参数会被设为 1。

如果存在额外的 `_overlay` 精灵图，TextBox 也会使用它。  
如果存在关联的 `_mini` 精灵图，MiniTextbox 会使用它。
