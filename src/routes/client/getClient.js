const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const getClient = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id,numId} = event.pathParameters;

    try {

        const result = await dynamodb.get({
            TableName: "Cliente",
            Key: {
                numeroIdentificacion: numId,
                id: enums.id_type[id],
                
            }
        }).promise();

        const client = result.Item;

        return {
            code: 200,
            body: {
                response: enums.status_codes[200],
                client
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
    getClient
}