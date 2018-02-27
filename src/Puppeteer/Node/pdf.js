const puppeteer = require('puppeteer');
const tmp = require("tmp");
const fs = require('fs');
const fileUrl = require('file-url');
const PDFMerge = require('pdf-merge');
const path = require('path');

module.exports = async function (result, html) {

    const htmlFileName = await writeFile(html);

    const pdfFiles = [
        path.join(__dirname, '..', 'PdfContent', 'front.html'),
        htmlFileName,
        path.join(__dirname, '..', 'PdfContent', 'back.html')
    ];

    const browser = await createBrowser();
    
    const pdfPaths = await createPdfs(browser, pdfFiles);
    
    await browser.close();

    PDFMerge(pdfPaths, { output: 'Stream' })
        .then((stream) => { stream.pipe(result.stream); });
};

async function writeFile(html) {
    var tempHtmlFile = tmp.fileSync({
        postfix: ".html"
    });

    await fs.writeFile(tempHtmlFile.name, html, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    return tempHtmlFile.name;
}

async function createBrowser() {
    return await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
}

function createPdfs(browser, pages) {
    return Promise.all(
        pages.map((filePath) =>
            createPdf(browser, filePath)
        )
    );
}

async function createPdf(browser, fileName) {
    const page = await browser.newPage();

    await page.goto(fileUrl(fileName), {
        waitUntil: 'networkidle2'
    });

    const tmpPdfFileName = tmp.tmpNameSync() + ".pdf";

    await page.pdf({
        path: tmpPdfFileName,
        format: 'A4',
        margin: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    });

    await page.close();

    return tmpPdfFileName;
}
