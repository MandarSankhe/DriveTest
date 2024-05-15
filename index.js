const express = require('express')
const path = require('path')
const app = new express()
app.use(express.static('public'))

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.get('/g2test', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/g2test.html'))
})
app.get('/gtest', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/gtest.html'))
})
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/login.html'))
})