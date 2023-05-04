# 我的餐廳清單
![Restaurant List](/public/image/restaurant_list_1.png)
![Restaurant List](/public/image/restaurant_list_2.png)

## 介紹
紀錄屬於自己的餐廳清單，註冊登入後，可以瀏覽餐廳、查看詳細資訊，以及連結到地圖。

## 功能列表
- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳資訊
- 使用者可以刪除一家餐廳
- 使用者可以搜尋特定餐廳
- 使用者可以連結餐廳的地址到 Google 地圖
- 使用者可以註冊帳號、登入與登出
- 使用者可以使用 FACEBOOK LOGIN

## 開始使用
1. 請先確認是否有安裝 Node.js 與 npm

2. 將專案 clone 到本地端

3. 透過終端機進入專案資料夾，安裝 npm 套件
```
  npm install
```

4. 安裝完成後，設定環境變數，連線 MongoDB
```
  MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```

5. 執行種子資料。當出現`done.`時，按`ctrl + D`結束執行
```
  npm run seed
```

6. 新增環境變數，可參考 .env.example

7. 執行專案
```
  npm run start
```

8. 若看到此行訊息表示成功運行，開啟瀏覽器到以下網址
```
  Listening on http://localhost:3000
  mongodb connected!
```

9. 若想暫停使用，請在終端機輸入以下指令
```
  ctrl + c
```

## 開發工具
- bcryptjs ^2.4.3
- connect-flash ^0.1.1
- dotenv ^16.0.3
- Express.js ^4.18.2
- Express-handlebars ^6.0.7
- Express-session ^1.17.3
- MongoDB
- Mongoose ^6.9.2
- method-override ^3.0.0
- Node.js ^18.14.2
- nodemon
- Passport.js ^0.6.0
- Passport-local ^1.0.0
- Passport-facebook ^3.0.0