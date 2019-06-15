const { RESTDataSource } = require("apollo-datasource-rest");

class Bored extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        //     request.headers.set('Client-ID', this.ClientID);
    }

    async getIndv(cat) {
        let result = await this.get("http://www.boredapi.com/api/activity?type=" + cat)
        console.log(result)
        return result
    }

    async getIndvii() {
        let result = await this.get("http://www.boredapi.com/api/activity?type=charity")
        console.log(result)
        return result
    }

    async getQuiz() {

        let typeList = ["social", "charity", "recreational", "cooking"]

        //let result = await this.get("http://www.boredapi.com/api/activity?type=social")
        let data = []
        for (let x in typeList) {
            let res = this.getIndv(typeList[x]);
            data.push(res)
        }

        //data.push(this.getIndvii())
        //console.log(result)
        return data
        //return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1] }
    }




}
module.exports = Bored
