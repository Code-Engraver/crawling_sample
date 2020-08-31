const axios = require('axios');
const cheerio = require('cheerio');

async function getHTML() {
    try {
        return await axios.get("http://www.seoulmetro.co.kr/kr/equipmentList.do?menuIdx=367", {params: {'line':'1호선', 'stno':155}})
    } catch (error) {
        console.error(error);
    }
}

getHTML()
    .then(html => {
        let result_list = []
        const $ = cheerio.load(html.data);
        const tr_list = $("#contents div table tbody").children('tr')

        tr_list.each(function(i, elem){
            let td_list = Array.from($(this).children('td')).map(function(value){
                return value.children[0].data.trim()
            })
            result_list[i] = {
                facility: td_list[0],
                operating_section: td_list[1],
                location: td_list[2],
                usage_status: td_list[3]
            }
        })
        return result_list
    })
    .then(res => console.log(res));
