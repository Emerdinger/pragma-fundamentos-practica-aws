"use strict";
const AWS = require("aws-sdk");
const enums = require("../../enum/allEnums");

const addClient = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { nombres, apellidos, id, numeroIdentificacion, edad, ciudadNacimiento } = JSON.parse(event.body);
    const createdAt = new Date();


    if (nombres == "" || apellidos== "" || id == "" || numeroIdentificacion == "" || edad == "" || ciudadNacimiento == "") {
        return {
            status: 400,
            body: enums.status_codes[400]
        }
    }

    const idInUse = await dynamodb.query({
        TableName: "Cliente",
        KeyConditionExpression: "numeroIdentificacion = :numeroIdentificacion and id = :id",
        ExpressionAttributeValues: {
            ":id": enums.id_type[id],
            ":numeroIdentificacion": numeroIdentificacion
        }
    }).promise();

    const clients = idInUse.Items;
   
    if (clients.length > 0) {
        return {
            code: 409,
            body: {
                response: enums.status_codes[409],
                message: "An user already have your id"
            }
        }
    }

    const newClient = {
        id: enums.id_type[id],
        nombres,
        apellidos,
        numeroIdentificacion,
        edad,
        ciudadNacimiento: enums.ciudad_nacimiento[ciudadNacimiento],
        createdAt
    }

    try {

        await dynamodb.put({
            TableName: "Cliente",
            Item: newClient,
        }).promise();

        return {
            status: 200,
            body: {
                response: enums.status_codes[200],
                client: newClient,
                busqueda: clients
            }
        }

    } catch (e) {
        return {
            status: 400,
            body: enums.status_codes[400]
        }
    }


}

module.exports = {
    addClient
}