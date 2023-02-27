## 專案畫面
![Restaurant List](/public/image/snapshop_1.png)
![Restaurant List](/public/image/snapshop_2.png)

# 介紹
紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊，以及連結到地圖。

## 功能列表
- 瀏覽所有餐廳
- 檢視餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 新增餐廳
- 編輯餐廳
- 刪除餐廳


## 開始使用
1. 請先確認是否有安裝 Node.js 與 npm

2. 將專案 clone 到本地端

3. 透過終端機進入專案資料夾，安裝 npm 套件
```
  npm install
```

4. 安裝完成後，設定環境變數，連線 MongoDB
```
  MONGODB_URL = mongodb+srv://[username:password]@cluster0.xxxxxxx.xxxxxxx.net/[database]?retryWrites=true&w=majority
```

5. 執行專案
```
  npm run start
```

6. 若看到此行訊息表示成功運行，開啟瀏覽器到以下網址
```
   Listening on http://localhost:3000
   mongodb connected!
```

7. 若想暫停使用，請在終端機輸入以下指令
```
  ctrl + c
```

8. 若需要生成種子資料，請在終端機輸入以下指令
```
  npm run seed
```

## 開發工具
- Node.js ^18.14.2
- Nodemon
- Express ^4.18.2
- Express-handlebars ^6.0.7
- MongoDB
- Mongoose ^6.9.2
- Bootstrap
- Font-awesome
- dotenv ^16.0.3

## 更新紀錄
- Node.js 更新至 v18