const express = require('express')
// const users = require('./MOCK_DATA.json');

const users = require('./MOCK_DATA.json')

const app = express()
const port = 3000

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
   app.post('/api/user/:id',(req , res)=>{
    // todo add the user with id
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
