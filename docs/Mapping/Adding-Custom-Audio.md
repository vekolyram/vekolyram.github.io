# 添加自定义音频

*   [准备工作](#准备工作)
*   [音频压缩选项](#音频压缩选项)
*   [创建音频库](#创建音频库)
*   [自定义音效](#自定义音效)
*   [覆盖原版事件](#覆盖原版事件)

注意：如果某位音乐人或其他人为你提供了可用的 FMOD 文件用于你的地图，请直接跳到"创建音频库"一节的第 11 步。前 10 步介绍了如何将音频文件制作为那些 FMOD 文件。

## 准备工作

你需要：
- FMOD Studio **1.10.20**（**不要**使用 FMOD Studio 2.\*，因为它与 Celeste 不兼容，并且会破坏用 1.\* 创建的项目。**1.10.\*** 到 **1.10.20** 之间的任何版本都可以用，但早于 **1.10.20** 的版本会缺少一些功能。另请注意，尽管它们被标记为 `unsupported`，**你仍然可以下载旧版本，而且它们对你来说应该仍能正常工作**。）。你可以在 [FMOD 下载页面 :link:](https://www.fmod.com/download) 找到它（你需要创建一个账户，但该程序是免费的）。
- Celeste FMOD 项目：你也可以在 [FMOD 下载页面 :link:](https://www.fmod.com/download) 的 Learning Resources（学习资源）部分找到它。建议下载包含 DLC 内容的版本。**请务必阅读 [EULA :link:](https://www.fmod.com/docs/2.02/studio/appendix-a-celeste.html#license)。**

_FMOD Studio 与 WINE 兼容。_

> [!IMPORTANT] 重要
> **不要修改并分享修改过的音乐（music）、音效（sfx）、UI 和主（master）音频库。**
>
如果你对音频模组还有任何疑问，请在 Discord 服务器上的 #modding_help 频道中寻求帮助。

## 音频压缩选项
这是一项可选的简单设置，能显著减小你今后所有音频库的文件大小。

1. 在 FMOD Studio 中打开 Celeste FMOD 项目：`fmodstudio20000celeste-project/FMOD Studio Celeste Project/celeste_audio.fspro`。
2. 在顶部的下拉菜单中，选择 Edit > Preferences。
3. 点击 Build，然后在 "Project Platform"（项目平台）部分点击 Desktop。
4. 向下滚动，直到你能看到 "Quality"（质量）参数。默认情况下它应为 80，但将其改为 50 可以显著减小文件大小。
![构建偏好设置](https://github.com/EverestAPI/Resources/assets/52103563/84695a98-8024-4589-8482-b3fefcb55f05)

## 创建音频库

下面是一份分步指南，教你如何用音频文件形式的音乐创建音频库：

1. 在 FMOD Studio 中打开 Celeste FMOD 项目：`fmodstudio20000celeste-project/FMOD Studio Celeste Project/celeste_audio.fspro`。
2. 在左侧面板切换到 Banks（音频库）标签页，为你的模组新建一个音频库。每个模组需要 1 个音频库：如果同一个模组有多首曲目，可以把它们全部放进一个音频库。例如，将其命名为 `yournickname_mapname`。

![](https://github.com/EverestAPI/Resources/assets/52103563/e9d527ac-7204-4894-bc0f-b9c447462510)

3. 选择 File > Import Audio Files...（导入音频文件），然后浏览到你的歌曲。这会弹出一个新的 "Audio Bin"（音频库）窗口。你需要右键单击你的歌曲，然后选择 "Create Event"（创建事件）：

![图片](https://github.com/EverestAPI/Resources/assets/52103563/0068b473-08cf-43dc-a33b-1fd0aa8683de)

选择 "2D Event"（2D 事件），点击 Create（创建），然后关闭 Audio Bin 窗口。

4. 在左侧面板切换到 Events（事件）标签页：你会在那里找到你的歌曲。把它拖入一个以你的昵称命名的目录中，并将其重命名，使名称不包含符号、空格等。

5. 将你的歌曲/音效分配给你的音频库：

![分配到音频库](https://github.com/user-attachments/assets/6d2e93ef-2ebc-4f7d-bdc7-e6655c5f8e15)


6. 将你的新事件重新路由到正确的 bus（总线）：

    - 打开混音器路由窗口。  
    

    <img width="325" height="465" alt="图片" src="https://github.com/user-attachments/assets/fcdebbc3-6e9f-4974-a17e-3e4b10bb23d8" />
    

    - 将你的新事件拖入 music/tunes/mains。这样 Celeste 就能在游戏内设置中调节音乐音量。新事件未排序，可以在混音器路由窗口的列表底部找到。 
    

    <img width="388" height="594" alt="图片" src="https://github.com/user-attachments/assets/e8aaf8f5-3c96-45ef-a4ef-85a8f58dc588" />
    

    - 现在你可以关闭混音器路由窗口了。

7. 为你的音乐添加 fade（淡入淡出）参数：

    - 点击 (+) 标签页来添加共享的 fade 参数。  
    ![](https://github.com/EverestAPI/Resources/assets/52103563/a39bf6f6-ed16-4223-852f-35ea3227e6b8)

    - 在 fade 参数标签页中为主音量添加自动化。  
    ![](https://github.com/EverestAPI/Resources/assets/52103563/d232d2e5-ac6e-4a8d-a105-90eed63a334d)

    - 在图表的两端添加两个点：从 -∞ dB 到 0.00 dB  
    ![](https://github.com/EverestAPI/Resources/assets/52103563/7a475bd2-6273-4bc7-95be-a7e0634da1fb)

    - 现在屏幕顶部会有一个 "fade" 光标，调节它即可控制音乐音量。音乐淡入淡出触发器（trigger）也正是用它来调节音乐音量的。
    ![](https://github.com/EverestAPI/Resources/assets/52103563/f837e09f-2a32-4be9-88e8-3d08c8dca6f4)

8. 让你的音乐循环播放：

    - 切换回 Timeline（时间线）标签页，然后右键单击音频轨道上方黑色的逻辑轨道，选择 "Add Loop Region"（添加循环区域）。 
    ![](https://github.com/EverestAPI/Resources/assets/52103563/22a6fd42-7f88-435b-bfcc-20fa8cbbe29e)

    - 将循环区域扩展到你觉得合适的长度。
    - 添加 Tempo Marker（速度标记）会很有帮助，这样循环区域的手柄就能吸附到音乐的节拍上。要创建 Tempo Marker，请右键单击逻辑轨道区域，选择 "Add Tempo Marker"（添加速度标记）。调节速度（tempo）和拍号以匹配歌曲，并在需要时调整其位置以对齐歌曲的节拍。如果你不知道歌曲的速度，可以使用许多在线节拍器上的 "tap tempo"（点按测速）功能来测定，例如 https://www.musicca.com/metronome。

    ![](https://github.com/EverestAPI/Resources/assets/52103563/f6598eb4-d58f-46d4-a5ef-c5d6234e289c)

    - 按住 alt 可以更精确地移动它。要放大，请拖动缩放条，它位于你放置音频位置的下方。

9. 右键单击你的音频库，然后按 Build（构建）。完成后，你会在 `fmodstudio20000celeste-project/FMOD Studio Celeste Project/Build/Desktop` 中找到你的音频库。 
   - 只取名称与你之前创建的音频库同名的 .bank 文件，例如 `yournickname_mapname.bank`（**不要**拿 Master Bank.bank 等文件，那些是原版音频库），并将其复制到你的模组文件夹中，即 `Mods/yourmod/Audio`。

10. **生成 GUIDs.txt**：

![](https://github.com/EverestAPI/Resources/assets/52103563/03780838-c3b7-4bc8-b62d-f6766ccd44e7)



一旦生成，你会在 `fmodstudio20000celeste-project/FMOD Studio Celeste Project/Build/GUIDs.txt` 中找到它。将其复制到你的模组文件夹中，即 `Mods/yourmod/Audio`，并重命名为 `yourbankname.guids.txt`：

![文件夹中的音频库示例](https://github.com/user-attachments/assets/853e763f-6e7b-4e38-8aa8-5baf63334fd3)


11. **一旦你的文件位于模组的 Audio 文件夹中，就可以把它们应用到地图内了。**

在 Lönn 中，你可以通过手动输入事件名称来使用你的音乐。例如，如果你的 Events 标签页中有这个：

![fmod 中的事件字段示例](https://github.com/user-attachments/assets/eb18748e-7e0b-490f-a5d0-40baf972fff9)


你就可以在 Lönn 中使用这个：

![事件字段示例](https://github.com/user-attachments/assets/97c7f017-44d7-4c75-b240-aa1ebe0709cf)

注意：如果你拿到了别人预先制作好的音频库文件，事件路径通常也会以某种形式一并附带。

有了事件路径后，手动输入该路径即可。

它不会出现在下拉列表中。这很正常！


## 自定义音效

添加自定义**音效**的过程与此类似，但音效需要被重定向到另一个 bus，而且你可以跳过"让它循环"和"添加 fade 参数"这两步。对于_游戏玩法_音效，使用 `gameplay_sfx/game/general/yes_pause` 总线。对于_环境氛围_音效，使用 `gameplay_sfx/ambience` 总线。

## 覆盖原版事件

如果你想覆盖原版音乐/音效，例如用于全局皮肤模组（skinmod）：

1. 在 FMOD 侧边栏中找到你想替换的 Event（事件），右键单击 Event 名称并选择 *Move into New Folder*（移动到新文件夹）（如果多个事件位于同一文件夹中，你可以按住 Ctrl 点击多个事件以节省时间）。你可以随意命名生成的文件夹，但类似 "vanilla backup"（原版备份）这样的名称会有助于让项目在将来更容易理解。

<img src="https://github.com/EverestAPI/Resources/assets/52103563/5d26fe9e-9073-4525-a13a-2de40c5760fb" width="30%"> 

2. 右键单击你刚创建的新文件夹中的 Event，选择 *Copy*（复制），然后粘贴到该 Event 原先所在的完全相同的位置。**这是最重要的一点——Event 路径必须保持完全一致，才能被覆盖，你的修改才会在游戏中生效。** 因此在我的示例中，我把 ``dash_red_left`` 事件粘贴回了 ``char/madeline`` 文件夹路径下：

<img src="https://github.com/EverestAPI/Resources/assets/52103563/60bc6667-fea2-4cd0-82cc-8e1b0466c47d" width="35%">

3. 右键单击新粘贴的 Event，选择 *Assign to Bank*（分配到音频库），然后选择你的模组的音频库（参见上面教程中创建新音频库的第 2 步）。这意味着你不会随模组重新分发原版音频库的全部内容，这很可能违反某些版权法律，而且还能避免你的模组包含远超 100MB 的不必要数据。 

<img src="https://github.com/EverestAPI/Resources/assets/52103563/76f29c01-0579-4328-9363-f0252be93cfd" width="50%">

4. 现在你可以自由地在这个新 Event 中对音频进行任意修改。完成后，按照上面的第 9 和第 10 步构建你的模组的音频库、导出 GUIDs 并将它们添加到模组的 Audio 文件夹中。如果你的模组由 Everest 加载，且没有其他已加载的模组尝试覆盖同一个 Event，你现在就应该能听到音频的改动了。

> [!WARNING] 警告
> 此过程自 Everest 版本 3014 起才可行，因此请务必在 everest.yaml 中将其设置为安装你的模组所需的最低版本。在此版本以下，如果两个不同的模组试图覆盖同一个事件，游戏将会崩溃。
