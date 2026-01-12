const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message:'API do curso ninja do cypress!'})
})

app.post('/api/users/register', (req, res) => {

    const {name, email, password} = req.body

    if (!name === '') {
        return res.status(400).json({error: 'O campo name é obrigatório'})
    }

    if (!email === '') {
        return res.status(400).json({error: 'O campo email é obrigatório'})
    }

    if (!password === '') {
        return res.status(400).json({error: 'O campo password é obrigatório'})
    }

    console.log(req.body)

  return  res.status(201).json({message: 'Usuário cadastrado com sucesso!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
