import PcrTestGenerator from './PcrTestGenerator.js'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', async (req, res) => {
  res.sendFile('form.html', { root: '.' })
})

app.post('/', async (req, res) => {
  var generator = new PcrTestGenerator("pcr_test_template.pdf")
  const fields = ['name', 'daysAgo', 'birthYear', 'gender']
  fields.forEach((field) => generator[field] = req.body[field])
  await generator.generate("pcr_test_result.pdf")
  res.download('pcr_test_result.pdf', 'pcr.pdf')
})

const PORT = 3005
app.listen(PORT)

console.log(`Listening on port ${PORT}`)