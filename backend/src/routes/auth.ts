import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { hashPassword, verifyPassword } from '../utils/password'
import { generateToken } from '../utils/jwt'
import { authMiddleware } from '../middleware/auth'

const router = Router()

// POST /register
router.post('/register', async (req, res) => {
    const { name, email, password, theme, colorScheme } = req.body
    const alreadyExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (alreadyExists) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            theme: theme,
            colorScheme: colorScheme,
        },
    });

    const token = generateToken(user.id.toString())

    return res.status(201).json({ user:{id: user.id, name: user.name, email: user.email}, token })
})

// POST /login
router.post('/login', async (req, res) => {
    const { email, password, theme, colorScheme } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = generateToken(user.id.toString())
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        colorScheme: user.colorScheme,
      },
      token })
})

// POST /me
router.get('/me', authMiddleware, async (req, res) => {
   const {userId} = (req as any).user;
   const user = await prisma.user.findUnique({
    where: {
        id: parseInt(userId),
    },
   })
   if (!user) {
    return res.status(400).json({ message: 'User not found' })
   }
   return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      colorScheme: user.colorScheme,
    }
  })
})

// PATCH /preferences
router.patch('/preferences', authMiddleware, async (req, res) => {
    const { userId } = (req as any).user
    const { theme, colorScheme } = req.body

    const user = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
            ...(theme && { theme }),
            ...(colorScheme && { colorScheme }),
        },
    })

    return res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            theme: user.theme,
            colorScheme: user.colorScheme,
        }
    })
});

export default router
