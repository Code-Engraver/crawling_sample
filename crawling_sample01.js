const {Builder, By} = require('selenium-webdriver');
const cheerio = require('cheerio');

let result = Object();

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.seoulmetro.co.kr/kr/equipmentList.do?menuIdx=367');
        for(let i=2; i<10; i++){
            await driver.findElement(By.id('line')).click();
            await driver.findElement(By.xpath(`//*[@id="line"]/option[${i}]`)).click();
            let line = await driver.findElement(By.xpath(`//*[@id="line"]/option[${i}]`)).getText();
            await driver.sleep(3000)

            let html = await driver.getPageSource()
            const $ = cheerio.load(html);
            const stno_option_list = Array.from($("#stno option")).map(function (value, index){
                let obj = {}
                obj[value.children[0].data.trim()] = value.attribs.value
                return obj
            })
            stno_option_list.shift()
            result[line] = stno_option_list
        }
    } finally {
        await driver.quit();
        console.log(result)
    }
})();


