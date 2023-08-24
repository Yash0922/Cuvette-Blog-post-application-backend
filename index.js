const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const { Sequelize ,DataTypes} = require('sequelize');
app.use(cors()); 
app.use(express.json());
const sequelize = require('./DB/db')

const postRoutes = require('./Routes/post.routes');

app.use('/', postRoutes);



   sequelize.sync().then(()=>{
    console.log('Database tables synchronized');
   }) // Use { force: true } only for development
   
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});