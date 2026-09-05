# 搭建模组

## [必需软件](https://github.com/EverestAPI/Resources/wiki/Required-Software)

## 模组搭建
安装 Everest 后，打开你电脑上安装 Celeste 的文件夹。你可以在 Olympus 中通过点击安装选项卡上的“管理（manage）”来完成这一操作。
![打开 Celeste 文件夹步骤 1](https://github.com/EverestAPI/Resources/assets/71840364/21afdc21-9d23-484b-b13d-b52e39fe80f7)



然后对某个特定的 Celeste 安装点击“浏览（browse）”。
![打开 Celeste 文件夹步骤 2](https://github.com/EverestAPI/Resources/assets/71840364/9281f31e-0432-4002-97b4-e6d5c4de88f0)

如果你使用 Steam，也可以在 Steam 客户端中右键点击游戏并选择“管理 > 浏览本地文件”来找到安装文件夹。

![Steam 上的右键菜单](https://github.com/user-attachments/assets/d647d085-9635-4c53-8d37-de132b255ecd)



你应该能在那里找到一个名为 `Mods` 的文件夹。为了让 Everest 能够找到你的模组，模组就必须放在这个文件夹里。

在 `Mods` 文件夹中，为你的模组创建一个名称唯一的新文件夹。  
**:information_source: 在本教程中，将使用占位符“MyExampleMod”作为该模组的名称。**

在继续之前，请确认你已启用“显示文件扩展名”设置。这很重要，否则 Windows 可能不会以正确的名称保存文件。

![显示文件扩展名](https://github.com/EverestAPI/Resources/assets/71840364/94683522-5c55-4342-b6d6-9670dab96e42)


创建一个文本文件，然后把它重命名为 `everest.yaml`。通过在文件资源管理器中启用“显示文件扩展名”，确保没有多余的 `.txt` 扩展名：

用文本编辑器打开 `everest.yaml` 文件。系统可能会提示该文件没有关联的编辑器，此时选择任意文本编辑器即可。

这个文件用来告诉 Everest 模组的名称和版本，以及该模组还依赖哪些其它模组。它看起来应该像这样：

```yaml
- Name: MyExampleMod
  Version: 1.0.0
  Dependencies:
  - Name: Everest
    Version: 1.3471.0
```

**所有模组都必须把 Everest 作为依赖。** 要添加更多模组作为依赖，只需在 Everest 依赖下方增加更多条目即可：

```yaml
- Name: MyExampleMod
  Version: 1.0.0
  Dependencies:
  - Name: Everest
    Version: 1.3471.0
  - Name: SomeOtherMod
    Version: 2.4.7
```
