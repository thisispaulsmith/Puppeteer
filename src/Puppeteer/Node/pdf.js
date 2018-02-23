const puppeteer = require('puppeteer');
const tmp = require("tmp");
const fs = require('fs');
const fileUrl = require('file-url');

module.exports = async function (result, html) {

    var tempHtmlFile = tmp.fileSync({
        postfix: ".html"
    });

    await fs.writeFile(tempHtmlFile.name, html, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.goto(fileUrl(tempHtmlFile.name), {
        waitUntil: 'networkidle2'
    });

    var name = tmp.tmpNameSync() + ".pdf";

    await page.pdf({
        path: name,
        format: 'A4',
        margin: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    });

    await browser.close();

    var read = fs.createReadStream(name);
    read.pipe(result.stream);
};