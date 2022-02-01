"use strict";

module.exports.hello = async (event) => {
  return {
    status: 200,
    body: JSON.stringify(
      {
        message: "Pragma aws exercice!",
        input: event,
      },
      null,
      2
    ),
  };
};
