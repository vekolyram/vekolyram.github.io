Everest 提供了大量事件，可以在你的代码模组中订阅。
本指南列出了每个事件、Celeste 中触发该事件的方法，以及任何相关的补充说明。

要订阅某个事件，请使用以下格式：
```c#
Everest.Events.Level.OnLoadLevel += Your_OnLoadLevel_Method;
```
要取消订阅某个事件，请使用以下格式：
```c#
Everest.Events.Level.OnLoadLevel -= Your_OnLoadLevel_Method;
```
其中 `Your_OnLoadLevel_Method` 是一个方法，其参数与本指南中列出的参数一致：
```c#
private void Your_OnLoadLevel_Method(Level level, Player.IntroTypes playerIntro, bool isFromLoader){

}
```

# 事件类型
- [Celeste](#celeste)
- [主菜单](#mainmenu)
- [GameLoader](#gameloader)
- [LevelLoader](#levelloader)
- [Level](#level)
- [Session](#session)
- [Player](#player)
- [Input](#input)
- [Journal](#journal)
- [Decal](#decal)
- [FileSelectSlot](#fileselectslot)
- [EventTrigger](#eventtrigger)
- [CustomBirdTutorial](#custombirdtutorial)
- [SubHudRenderer](#subhudrenderer)


# 事件
## Celeste
事件 | 触发方 | 说明
--- | --- | ---
`OnExiting`() | Celeste.Celeste.OnExiting | 在主游戏循环于 Microsoft.Xna.Framework.Game.Run 中运行完毕后调用
`OnShutdown`() | Celeste.Celeste.Main | 在 Main 方法退出前调用


## Everest
事件 | 触发方 | 说明
--- | --- | ---
`OnLoadMod`(EverestModuleMetadata meta) | Everest.Loader.LoadMod | 在模组完成加载时调用。
`OnRegisterModule`(EverestModule module) | Everest.Register | 在模组被注册时调用。


## MainMenu
事件 | 触发方 | 说明
--- | --- | ---
`OnCreateButtons`(OuiMainMenu menu, List&lt;MenuButton> buttons) | Celeste.OuiMainMenu.Added<br>Celeste.OuiMainMenu.RebuildMainAndTitle<br>Celeste.Settings.Reload | 用于向 OuiMainMenu 添加新的 MenuButton<br>示例：[Everest.CoreModule :link:](https://github.com/EverestAPI/Everest/blob/be193a4e29a8f9d94971a5997d5caad08c5494bd/Celeste.Mod.mm/Mod/Core/CoreModule.cs#L159)


## GameLoader
事件 | 触发方 | 说明
--- | --- | ---
`OnLoadThread`() | Celeste.GameLoader.LoadThread | 自 Everest 5901 起提供。该事件在启动游戏时**仅调用一次**。


## LevelLoader
事件 | 触发方 | 说明
--- | --- | ---
`OnLoadingThread`(Level level) | Celeste.LevelLoader.LoadingThread


## Level
事件 | 触发方 | 说明
--- | --- | ---
`OnPause`(Level level, int startIndex, bool minimal, bool quickReset) | Celeste.Level.Pause
`OnCreatePauseMenuButtons`(Level level, TextMenu menu, bool minimal) | Celeste.Level.Pause
`OnUnpause`(Level level) | Celeste.Level.Pause
`OnTransitionTo`(Level level, LevelData next, Vector2 direction) | Celeste.Level.TransitionTo
`OnLoadEntity`(Level level, LevelData levelData, Vector2 offset, EntityData entityData) | Celeste.Level.LoadCustomEntity
`OnLoadBackdrop`(MapData map, BinaryPacker.Element child, BinaryPacker.Element above) | Celeste.Mapdata.LoadCustomBackdrop
`OnLoadLevel`(Level level, Player.IntroTypes playerIntro, bool isFromLoader) | Celeste.Level.LoadLevel
`OnEnter`(Session session, bool fromSaveData) | Celeste.LevelEnter.Go | 自 Everest 1436 起，在按下 ctrl+f5 时会调用
`OnExit`(Level level, LevelExit exit, LevelExit.Mode mode, Session session, HiresSnow snow) | Celeste.LevelExit.LevelExit
`OnComplete`(Level level) | Celeste.Level.RegisterAreaComplete
`OnBeforeUpdate`(Level level) | Celeste.Level.Update | 自 Everest 5901 起提供
`OnAfterUpdate`(Level level) | Celeste.Level.Update | 自 Everest 5901 起提供


## Session
事件 | 触发方 | 说明
--- | --- | ---
`OnSliderChanged`(Session session, Session.Slider slider, float? previous) | Celeste.Session.Slider.Value setter, Celeste.Session.GetSliderObject | 自 Everest 5184 起提供


## Player
事件 | 触发方 | 说明
--- | --- | ---
`OnSpawn`(Player player) | Celeste.Player.Added
`OnDie`(Player player) | Celeste.Player.Die
`OnRegisterStates`(Player player) | Celeste.Player.PostCtor
`OnBeforeUpdate`(Player player) | Celeste.Player.Update | 自 Everest 5901 起提供
`OnAfterUpdate`(Player player) | Celeste.Player.Update | 自 Everest 5901 起提供


## Seeker
事件 | 触发方 | 说明
--- | --- | ---
`OnRegisterStates`(Seeker seeker) | Celeste.Seeker constructor


## AngryOshiro
事件 | 触发方 | 说明
--- | --- | ---
`OnRegisterStates`(AngryOshiro oshiro) | Celeste.AngryOshiro constructor


## Input
事件 | 触发方 | 说明
--- | --- | ---
`OnInitialize` | Celeste.Input.Initialize
`OnDeregister` | Celeste.Input.Deregister


## Journal
事件 | 触发方 | 说明
--- | --- | ---
`OnEnter`(OuiJournal journal, Oui from) | Celeste.OuiJournal.Enter


## Decal
事件 | 触发方 | 说明
--- | --- | ---
`OnHandleDecalRegistry`(Decal decal, DecalRegistry.DecalInfo decalInfo) | Celeste.Decal.Added
   

## FileSelectSlot
事件 | 触发方 | 说明
--- | --- | ---
`OnCreateButtons`(List&lt;OuiFileSelectSlot.Button> buttons, OuiFileSelectSlot slot, EverestModuleSaveData modSaveData, bool fileExists) | Celeste.OuiFileSelectSlot.CreateButtons | 自 Everest 1459 起提供

使用示例：

```cs
// event registering (in the Load() method for example)
Everest.Events.FileSelectSlot.OnCreateButtons += addSilhouetteButton;

private void addSilhouetteButton(List<OuiFileSelectSlot.Button> buttons, OuiFileSelectSlot slot, EverestModuleSaveData saveData, bool fileExists) {
  // add a simple toggle button for an option in mod save data (SilhouetteEnabled)
  OuiFileSelectSlot.Button button = new OuiFileSelectSlot.Button {
    Label = $"Silhouette Mode: {(saveData as MyModuleSaveData).SilhouetteEnabled}",
    Scale = 0.7f
  };
  button.Action = () => {
    (saveData as MyModuleSaveData).SilhouetteEnabled = !(saveData as MyModuleSaveData).SilhouetteEnabled;
    button.Label = $"Silhouette Mode: {(saveData as MyModuleSaveData).SilhouetteEnabled}";
  };
  buttons.Add(button);

  // add a button opening a OuiFileSelectSlotSubmenu
  buttons.Add(new OuiFileSelectSlot.Button {
    Label = $"Silhouette Mode Options",
    Scale = 0.7f,
    Action = () => OuiFileSelectSlotSubmenu.Goto<OuiSilhouetteModeOptions>(slot, saveData, fileExists)
  });
}
```

子菜单实现示例：
```cs
using Celeste.Mod.UI;

namespace Celeste.Mod.MyMod {
  class OuiSilhouetteModeOptions : OuiFileSelectSlotSubmenu {
    public override string MenuName => "SILHOUETTE MODE OPTIONS";

    protected override void addOptionsToMenu(TextMenu menu, OuiFileSelectSlot slot, EverestModuleSaveData modSaveData, bool fileExists) {
      MyModuleSaveDatacastSaveData = (modSaveData as MyModuleSaveData);

      menu.Add(new TextMenu.SubHeader("Toggle"));
      menu.Add(new TextMenu.OnOff("Enabled", castSaveData.SilhouetteEnabled).Change(newValue => castSaveData.SilhouetteEnabled = newValue));
    }
  }
}
```

## EventTrigger
事件 | 触发方 | 说明
--- | --- | ---
`OnEventTrigger`(EventTrigger trigger, Player player, string eventID) | EventTrigger.OnEnter| 自 Everest 1767 起提供


## CustomBirdTutorial
事件 | 触发方 | 说明
--- | --- | ---
`onParseCommand`(string command) | CustomBirdTutorial constructor| 自 Everest 1925 起提供

使用示例：
```cs
Everest.Events.CustomBirdTutorial.OnParseCommand += onParseCommand;

private object OnParseCommand(string command) {
    // this method can return:
    // - a MTexture => displays that texture
    if (command == "StrawberryIcon") {
        return GFX.Gui["collectables/strawberry"];
    }
    // - a Vector2 representing a direction (x, y) => displays an arrow
    if (command == "DownLeft") {
        return new Vector2(-1, 1);
    }
    // - a ButtonBinding or VirtualButton => displays the button it is set to (useful for custom bindings)
    if (command == "RandomBinding") {
        return (_Settings as MaxHelpingHandModuleSettings).RandomBinding;
    }
    // - a string => displays that text
    if (command == "SayHi") {
        return "Hi!";
    }
    // if your mod doesn't recognize the command, return null to let other mods / Everest handle it instead.
    return null;
}
```


## AssetReload
事件 | 触发方 | 说明
--- | --- | ---
`OnBeforeReload`(bool silent) | Everest.AssetReloadHelper.Do
`OnAfterReload`(bool silent) | Everest.AssetReloadHelper.Do
`OnBeforeNextReload`(bool silent) | Everest.AssetReloadHelper.Do | 自 Everest 5326 起提供。订阅此事件的任何方法都只会在下一次重新加载时被调用一次，之后会被自动取消订阅。
`OnAfterNextReload`(bool silent) | Everest.AssetReloadHelper.Do | 自 Everest 5326 起提供。订阅此事件的任何方法都只会在下一次重新加载时被调用一次，之后会被自动取消订阅。
`OnReloadLevel`(Level level) | Everest.AssetReloadHelper.ReloadLevel
`OnReloadAllMaps`(Level level) | Everest.AssetReloadHelper.ReloadAllMaps


## SubHudRenderer
事件 | 触发方 | 说明
--- | --- | ---
`OnBeforeRender`(SubHudRenderer renderer, Scene scene) | Celeste.Mod.UI.SubHudRenderer.BeforeRender | 自 Everest 4607 起提供


---

所有事件的源代码可以在[此处 :link:](https://github.com/EverestAPI/Everest/blob/master/Celeste.Mod.mm/Mod/Everest/Everest.Events.cs)找到。
如有疑问或反馈，请在 Celeste [Discord :link:](https://discord.gg/6qjaePQ) 上提问。
