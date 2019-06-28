const { RESTDataSource } = require("apollo-datasource-rest");
const mongoose = require('mongoose')
const _ = require('lodash');
const Event = require('./models/Event');

class Place extends RESTDataSource {
    constructor() {
        super();
    }
    willSendRequest(request) {
        //     request.headers.set('Client-ID', this.ClientID);
    }

    async getAllPlaces(cat) {
        let res = []
        for (let y in cat) {
            let queryVal;
            switch (cat[y]) {
                case "social":
                    queryVal = "museum"
                    break;
                case "cooking":
                    queryVal = "RESTAURANT"
                    break;
                case "charity":
                    queryVal = "CLUB_ASSOCIATION"
                    break;
                case "recreational":
                    queryVal = "LEISURE_CENTER"
                    break;
                default:
                    break;
            }
            console.log(queryVal)

            let imarr = await this.getImg(cat[y])

            let result = await this.get("https://api.tomtom.com/search/2/categorySearch/" + queryVal + ".json?limit=20&lat=42.886448&lon=-78.878372&topLeft=37.553%2C-122.453&btmRight=37.4%2C-122.55&key=ygEtXJxPIXwEUV7eGCfNnGOkDPEdVCqC")
            // console.log(result.results)
            for (let x in result.results) {
                //console.log(result.results[x].poi.name)
                let obj = new Object()
                obj.name = result.results[x].poi.name
                obj.id = result.results[x].id

                //RANDOM OBJECTS
                obj.address = result.results[x].address.freeformAddress
                let ran = Math.random() * 30
                ran = Math.floor(ran)
                obj.score = ran

                //
                obj.type = cat[y]
                obj.image_url = imarr[x]
                res.push(obj)
            }
        }
        this.shuffle(res)
        return res
    }
    async getImg(cat) {
        let queryVal
        let imarr = []
        switch (cat) {
            case "social":
                queryVal = "museum"
                break;
            case "cooking":
                queryVal = "food"
                break;
            case "charity":
                queryVal = "people"
                break;
            case "recreational":
                queryVal = "buildings"
                break;
            default:
                break;

        }

        let result = await this.get("https://pixabay.com/api/?key=12788410-9035c72a1c69f8d0d56b0c6d9&category=" + queryVal)
        //console.log(result)

        for (let x in result.hits) {
            //console.log(result.hits[x].webformatURL)
            imarr.push(result.hits[x].webformatURL)
        }
        return imarr
    }




    shuffle(array) {
        var i = 0
            , j = 0
            , temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    async getPlaces(event) {
        console.log("hello")

        let res = []

        let result = await this.get("https://api.tomtom.com/search/2/categorySearch/" + event + ".json?limit=20&lat=42.886448&lon=-78.878372&topLeft=37.553%2C-122.453&btmRight=37.4%2C-122.55&key=ygEtXJxPIXwEUV7eGCfNnGOkDPEdVCqC")
        console.log(result.results)
        for (let x in result.results) {


            let obj = new Object()
            obj.name = result.results[x].poi.name
            obj.id = result.results[x].id
            obj.address = result.results[x].address.freeformAddress
            let ran = Math.random() * 30
            ran = Math.floor(ran)
            obj.type = event
            obj.score = ran
            res.push(obj)

        }
        return res
        //return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1] }
    }




}
module.exports = Place
