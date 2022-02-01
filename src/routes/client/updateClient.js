const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const updateClient = async (event) => {
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id, numId} = event.pathParameters
    const { nombres, apellidos, edad, ciudadNacimiento } = JSON.parse(event.body);

    if (nombres == "" || apellidos== "" || id == "" || numId== "" || edad == "" || ciudadNacimiento == "") {
        return {
            status: 400,
            body: enums.status_codes[400]
        }
    }

    console.log("Paso del primer if")

    try {

        await dynamodb.update({
            TableName: "Cliente",
            Key:{numeroIdentificacion: numId,id: enums.id_type[id]},
            UpdateExpression: 'set nombres = :nombres, apellidos = :apellidos, edad = :edad, cuidadNacimiento = :cuidad',
            ExpressionAttributeValues: {
                ':nombres': nombres,
                ':apellidos': apellidos,
                ':edad' : edad,
                ':cuidad': ciudadNacimiento
            },
            ReturnValues: 'ALL_NEW'
        }).promise();
        console.log("hizo el update")
        return {
            status: 200,
            body: {
                response: enums.status_codes[200],
                message: "Client updated successfully!"
            }
        }

    } catch (error) {
        console.log(error)
        return {
            status: 400,
            body: enums.status_codes[400]
        }
    }

}

module.exports = {
    updateClient
}