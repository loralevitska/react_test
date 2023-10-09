# Test_React_JS_Parser

To test this task:
- clone this repository, 
- run `npm install`,
- run `npm start` (frontend)
- open new terminal and run `cd backend` then `npm install`
- navigate to `backend/src/config/config.json` file and edit your database credentials in "development" part
- navigate to `backend/src` file and run `npx sequelize-cli db:migrate`
- run `npm run dev` (backend)

### Feed Parser

 Server have a scheduler that works every 5 minutes, and it will work 5 times. This will fill your database with articles and you will be able to view them in the frontend part 

P.S. I didn't have enough time to fully refactor and optimize the code, but this option works and corresponds to the description from the test task, if you have any questions, feel free to contact me, I will be happy to chat
