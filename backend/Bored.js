const { RESTDataSource } = require("apollo-datasource-rest");

class Bored extends RESTDataSource {
    constructor() {
        super();
    }

    async getIndv(cat) {
        let result = await this.get("http://www.boredapi.com/api/activity?type=" + cat)
        console.log(result)
        return result
    }

    async getQuiz() {
        let typeList = ["social", "charity", "recreational", "cooking"]
        let data = []
        for (let x in typeList) {
            let res = this.getIndv(typeList[x]);
            res.image_url = "hello"
            data.push(res)
        }
        return data
    }
}

module.exports = Bored
