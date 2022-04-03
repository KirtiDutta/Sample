import bcrypt from 'bcryptjs'

const users= [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true

    },
    {
        name: 'Kashish Arora',
        email: 'kashish@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Khushi Saxena',
        email: 'khushi@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users