
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const passwords = {
    'youtube': '1234567890',
    'amazon': 'hello from your mom',
    'rozetka': 'fuck',
    'comfy': 'комфи магазини суперпокупки',
    'pornhub': 'the most secret password'
}

app.get('/get-passwords', (_, res) => res.send(passwords))

app.post('/create-password', function (req, res) {
    const body = req.body
    const [site, password] = [body.site, body.password]

    if (site in passwords) {
        res.sendStatus(500)
    }

    passwords[site] = password
    res.sendStatus(200)
})

app.put('/change-password', (req, res) => {

    console.log('koookoooooooooo')

    const body = req.body
    const [site, password] = [body.site, body.password]

    passwords[site] = password

    res.sendStatus(200)
})

app.delete('/delete-password', (req, res) => {
    console.log('bla-bla-bla')

    const site = req.body.site

    if (!(site in passwords)) {
        res.sendStatus(500)
    }

    delete passwords[site]
    res.sendStatus(200)
})

app.listen(3000)
