const { RESTDataSource } = require("apollo-datasource-rest");
const mongoose = require('mongoose')
const _ = require('lodash');
const Event = require('./models/Event');



// mongoose.connect('mongodb+srv://jami:thisismypassword@codebuffalo-c68wz.mongodb.net/test?retryWrites=true&w=majority');
// mongoose.connection.once('open', () => {
//     console.log('connected to the DB');
// });


class Place extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
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



            //


            let result = await this.get("https://api.tomtom.com/search/2/categorySearch/" + queryVal + ".json?limit=20&lat=42.886448&lon=-78.878372&topLeft=37.553%2C-122.453&btmRight=37.4%2C-122.55&key=ygEtXJxPIXwEUV7eGCfNnGOkDPEdVCqC")
            // console.log(result.results)
            for (let x in result.results) {
                //console.log(result.results[x].poi.name)
                let obj = new Object()
                obj.name = result.results[x].poi.name
                obj.id = result.results[x].id
                obj.address = result.results[x].address.freeformAddress
                let ran = Math.random() * 30
                ran = Math.floor(ran)
                obj.score = ran
                obj.type = cat[y]
                res.push(obj)
                // if (x == 1) { console.log(Event.find({ id: 2 })) }
            }
        }
        this.shuffle(res)
        return res

        //


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
            //console.log(result.results[x].poi.name)
            let obj = new Object()
            obj.name = result.results[x].poi.name
            obj.id = result.results[x].id
            obj.address = result.results[x].address.freeformAddress
            let ran = Math.random() * 30
            ran = Math.floor(ran)
            obj.type = event
            obj.score = ran

            res.push(obj)
            // if (x == 1) { console.log(Event.find({ id: 2 })) }
        }

        // let x = Event.find({ id: 2 })
        // if (x.docs.length == 0) {
        //     console.log("yes");
        // } else {
        //     console.log("no")
        // }






        return res
        //return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1] }
    }




}
module.exports = Place
