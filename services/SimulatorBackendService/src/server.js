import express from 'express'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001

const calc = {
    add(a, b) { return a + b },
    sub(a, b) { return a - b },
    mul(a, b) { return a * b },
    div(a, b) { return a / b },
}

const getMem = () => ({
    add: {},
    sub: {},
    mul: {},
    div: {}
})

const app = express()
let mem = getMem();


app.use(express.json())

app.post('/api/clear', (req, res) => {
    mem = getMem();
    console.log('Cleared Mem!')
    res
        .status(200)
        .end()
})

app.get('/api/:method/:key', (req, res) => {
    const { method, key } = req.params;
    const value = mem[method][key]
    if (value) {
        return res.status(200).
            json({ value })
    }
    res.status(404).
        end()
})

app.post('/api/:method', (req, res) => {
    const { method } = req.params;
    const { a, b } = req.body
    const value = calc[method.toLowerCase()](a, b)
    const key = Object.keys(mem[method.toLowerCase()]).length
    mem[method.toLowerCase()][key] = value;
    console.log(mem)
    return res.status(201).
        json({ value })

})

app.put('/api/:method/:key', (req, res) => {
    const { method, key } = req.params;
    const { a, b } = req.body
    const prev = mem[method][key]
    if (!prev) {
        return res.status(404).
            end()
    }
    const value = calc[method.toLowerCase()](a, b)
    mem[method.toLowerCase()][key] = value;
    return res.status(201).
        json({ value })
})

app.listen(port, host, () => {
    console.log(`Simulator Backend Service is listening at http://localhost:${port}`)
})