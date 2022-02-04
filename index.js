import PcrTestGenerator from './PcrTestGenerator.js'
import express from 'express'
const app = express()

app.get('/', async (req, res) => {
  await new PcrTestGenerator("pcr_test_template.pdf")
    .generate("pcr_test_result.pdf")
  res.send('Hello World')
})

const PORT = 3005
app.listen(PORT)

console.log(`Listening on port ${PORT}`)