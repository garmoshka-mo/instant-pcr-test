import fs from 'fs'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default class PcrTestGenerator {

  constructor(sourcePath) {
    this.existingPdfBytes = fs.readFileSync(sourcePath)
  }

  async generate(targetPath) {
    const pdfDoc = await PDFDocument.load(this.existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize()

    // Draw a string of text diagonally across the first page
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(targetPath, pdfBytes)
  }

}

