"use strict";
const status_codes = {
    200: "Success!",
    400: "Bad Request. Make sure everything is entered correctly",
    401: "Unauthorized; please make sure if you are logged",
    404: "The requested resource doesn't exist.",
    409: "The current state conflicts with what the request expects."
}

const id_type = {
    cedula_ciudadania: "Cédula de ciudadania",
    tarjeta_identidad: "Tarjeta de identidad",
    cedula_extranjera: "Cédula extranjera",
    pasaporte_colombiano: "Pasaporte colombiano",
    pasaporte_extranjero: "Pasaporte extranjero"
}

const ciudad_nacimiento = {
    bogota: "Bogotá",
    bucaramanga: "Bucaramanga",
    medellin: "Medellin",
    cali: "Cali",
    cartagena: "Cartagena",
    barranquilla: "Barranquilla",
    cucuta: "Cúcuta",
    santa_marta: "Santa Marta",
    pereira: "Pereira"
}

module.exports = {
    status_codes,
    id_type,
    ciudad_nacimiento
}