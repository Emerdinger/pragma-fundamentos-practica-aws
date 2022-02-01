const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const getByAge = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {edad} = event.pathParameters;

    const fetch = await dynamodb.scan({
        TableName: "Cliente",
        FilterExpression: "#edad >= :e",
        ExpressionAttributeNames: {
            "#edad": "edad"
        },
        ExpressionAttributeValues: {
            ":e": parseInt(edad)
        }

    }).promise();

    const clients = fetch.Items;
    
    return {
        code: 200,
        body: clients
    }

}

module.exports = {
    getByAge
}