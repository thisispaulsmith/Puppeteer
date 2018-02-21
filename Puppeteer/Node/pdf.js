const puppeteer = require('puppeteer');

module.exports = function (callback, html) {

    puppeteer.launch({
        headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).then(browser => {
        browser.newPage()
            .then(page => page.goTo("https://www.google.com"))
            .then(response => response.pdf({ path: 'c:\hn.pdf', format: 'A4' }));
    });
    
    //page.goTo("https://www.google.com");
    //page.pdf({ path: 'hn.pdf', format: 'A4' });

    callback(/* error */ null, html);
};