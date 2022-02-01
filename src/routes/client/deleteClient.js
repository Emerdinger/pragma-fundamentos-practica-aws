const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const deleteClient = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id, numId} = event.pathParameters;

    try {
        
        await dynamodb.delete({
            TableName: "Cliente",
            Key:{numeroIdentificacion: numId,id: enums.id_type[id]}
        }).promise();

        return {
            code: 200,
            body: {
                response: enums.status_codes[200],
                message: "Client deleted succesfully"
            }
        }

    } catch (error) {
        console.log(error)
        return {
            code: 400,
            body: enums.status_codes[400]
        }
    }
}

module.exports = {
    deleteClient
}