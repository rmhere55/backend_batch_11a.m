const express = require('express')
// const users = require('./MOCK_DATA.json');
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const app = express()
const port = 3000
// middlware

app.use(express.urlencoded({extended:false}))

app.use((req , res , next )=>{
  console.log(req.method , req.url)
  next()
})


// const fs = require('fs');

app.use((req, res, next) => {
  const logMessage = `\n ${Date.now()} : ${req.method}: ${req.path}\n`;

  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
      // Optionally, you could handle the error further or pass it to next
    }
    next(); // Ensure next() is always called
  });
});





app.get('/api/users', (req, res) => {
  return res.json(users)
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.email}</li>`).join('')}
    </ul>
    `
    res.send(html)
})


app.get('/api/users/:id', (req, res) => {

    const id = Number(req.params.id); // Convert the ID from the URL to a number
    const user = users.find(user => user.id === id); // Find the user by ID
     return res.json(user)

  });
   app.post('/api/user',(req , res)=>{
    // todo add the user with id
    const body = req.body;
    console.log(body);
    users.push({...body, id: users.length +1});
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users),(err , data)=>{
      return res.json({status :"success" ,id: users.length})
    });

    

    return res.json({status: "pending"})
  })
app.put('/api/user/:id',(req , res)=>{
    // todo edit the user with id
    return res.json({status: "pending"})})
app.delete('/api/user/:id',(req , res)=>{
    // todo delete the user with id
    return res.json({status: "pending"})})


  


//   app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })
//   app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })


    // app.route('/api/user/:id').get().post().put().delete()
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
