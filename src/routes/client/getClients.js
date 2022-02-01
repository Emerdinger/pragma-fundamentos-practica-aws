"use strict";
const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const getClients = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {

        const result = await dynamodb.scan({
            TableName: "Cliente"
        }).promise();
    
        const clients = result.Items;
    
        return {
            code: 200,
            body: {
                response: enums.status_codes[200],
                clients: clients
            }
        }

    } catch (error) {

        return {
            code: 400,
            body: enums.status_codes[400]
        }

    }
    
} 

module.exports = {
    getClients
}