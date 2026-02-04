8代表请求头含auth+2×apikey
7代表无auth，有key
5代表无auth无key

**GET** /config 5 请求服务器状态
**GET** / 7 获取当前用户（现在为null），和端点表
**POST** /session 7 获取用户信息+jwt+deckheader+playerid
**GET** / 8 获取当前用户
**GET** /items/{playerid} 8 获取所有物品和已穿戴的物品
**GET** //entitlements/{playerid} 8 疑似获取佩戴信息
**GET** //store/v2/ 8 获取商店
**GET** /fp/ 8 获取活动信息
自此开始默认请求头含auth+2key 
**GET** //players/{playerid}/friends?action=player-friends 获取朋友列表
**GET** /store/txn 疑似获取商店
**GET** /players/notifications/{playerid} 应该是定期访问，下文中所有的notifications/{playerid}用X1代替
**GET** /store/txn/dlc 获取商店
**GET** /players/283031/packs 获取卡包
**GET** /players/283031/librarynew 获取仓库
**GET** /matches/v2/reconnect 未知
**GET** /playerstats/{playerid} 未知
**GET** /campaign/{playerid} 获取比赛信息
**GET** /players/{playerid}/achievements 获取成就
**GET** /players/{playerid}/dailymissions 今日任务
自此开始挂机
**PUT** /players/{playerid}/heartbeat 应该是定期访问，心跳，下文中用X2代替
**PUT** X2
**GET** X1
**GET** X1
**GET** X1
**PUT** /players/{playerid}/decks/{deckid} 请求体分为action和deck_code，action有fill，deck_code为完整卡组码
特殊记录：
**DELETE** /players/{playerid}/decks/{deckid} 删除一个卡组
**说明：仅记录调用顺序，心跳或提醒信息无固定调用时机，供参考**