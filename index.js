const express = require("express")
const app = express();
const rp = require("request-promise-native")
const dfff = require("dialogflow-fulfillment")

	app.post("/", express.json(), function(request, response){ 
	dialogflow(request, response)
	})

	const dialogflow = (request, response) => {
		const agent = new dfff.WebhookClient((request, response))


	function demo(agent){
		const name = request.body.queryResult.parameters.Name
		const url = "https://sheetdb.io/api/v1/2bkfyirfuktxe/search?Name="+ name
		return rp.get(url)
			.then(message =>{
			const body = JSON.parse(message)
			const grade = body[0].Grade
			const subject = body[0].Subject
			const city = body[0].City
			("The person is in " + grade + " grade and he is studying " +subject+ " and he lives in " + city)

			})

			} 
			let intentMap = new Map() 
			intentMap.set("Detail", demo) 
			agent.handleRequest(intentMap)

	}
	
	app.listen(3000, function(){
		console.log("we are live!");
	})
