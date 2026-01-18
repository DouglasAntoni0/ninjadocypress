const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API do curso ninja do cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'O campo name é obrigatório' })
  }

  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'O campo email é obrigatório' })
  }

  if (!password || password.trim() === '') {
    return res.status(400).json({ error: 'O campo password é obrigatório' })
  }

  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userAlreadyExists) {
      return res.status(409).json({ error: 'Email já cadastrado' })
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
      message: 'Usuário cadastrado com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

app.listen(port, () => {
  console.log(`🔥 API rodando na porta ${port}`)
})
