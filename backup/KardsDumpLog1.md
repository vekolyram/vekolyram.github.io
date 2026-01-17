国土版本的kards使用ue5.6开发，ue4ss直接dump是会error的，解决方法就是在ue4ss/UE4SS_Signatures下新建一个StaticConstructObject.lua文件，内容如下：```lua
function Register()
    return "4C 8B DC 55 53 41 56 49 8D AB 28 FE FF FF 48 81 EC C0 02 00 00 48 8B"
end

function OnMatchFound(MatchAddress)
    return MatchAddress
end
```手动添加aob