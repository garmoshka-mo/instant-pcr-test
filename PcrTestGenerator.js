import fs from 'fs'
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import moment from 'moment';

export default class PcrTestGenerator {

  name = 'KUCHERENKO DANYLO'
  daysAgo = 1
  birthYear = 1987
  gender = "Male"

  constructor(sourcePath) {
    this.existingPdfBytes = fs.readFileSync(sourcePath)
  }

  async generate(targetPath) {
    this.pdfDoc = await PDFDocument.load(this.existingPdfBytes)

    // Embed the Helvetica font

    // Get the first page of the document
    const pages = this.pdfDoc.getPages()
    this.activePage = pages[0]


    this.pdfDoc.registerFontkit(fontkit);

    this.arial = await this.loadFont('arial.ttf')
    const arialBold = await this.loadFont('arial_bold.ttf')

    // Get the width and height of the first page
    const { width, height } = this.activePage.getSize()
    this.height = height

    this.activePage.drawText(this.name, {
      x: 150.5,
      y: height - 135.5,
      size: 11,
      font: arialBold,
      // color: rgb(0.95, 0.1, 0.1),
    })

    var date = moment().subtract(this.daysAgo, 'days').format("DD/MM/YYYY")
    this.drawSimpleLine(`${date}  15:39`, 105)
    this.drawSimpleLine(`${date}  20:05`, 120)
    this.drawSimpleLine(`15.01.${this.birthYear}`, 151)
    var years = moment().diff(`${this.birthYear}-01-15`, 'years')
    var months = moment().diff(`${this.birthYear}-01-15`, 'months') - years * 12;
    this.drawSimpleLine(`${years} Y ${months} M`, 166)
    this.drawSimpleLine(this.gender, 182)

    const pdfBytes = await this.pdfDoc.save()
    fs.writeFileSync(targetPath, pdfBytes)
  }

  drawSimpleLine(text, y) {
    this.activePage.drawText(text, {
      x: 150.5,
      y: this.height - y,
      size: 10,
      font: this.arial,
      // color: rgb(0.95, 0.1, 0.1),
    })
  }

  async loadFont(path) {
    const fontBytes = fs.readFileSync(path)
    return await this.pdfDoc.embedFont(fontBytes)
  }

}

