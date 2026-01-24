const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso ninja do cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || name.trim() === '') {
    return res.status(400).json({
      error: 'Name field is required'
    })
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({
      error: 'Email field is required'
    })
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({
      error: 'Password field is required'
    })
  }

  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userAlreadyExists) {
      return res.status(409).json({
        error: 'Email already registered'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return res.status(201).json({
      message: 'User successfully registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})

app.get('/api/users', async(req, res) => {

  try {
    const users = await prisma.user.findMany({
  select:{
    id: true,
    name: true,
    email: true,
    password: false

  }
})

res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error: 'Error fetching users'})
  }

})

app.listen(port, () => {
  console.log(`🔥 API rodando na porta ${port}`)
})
