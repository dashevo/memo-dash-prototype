// https://github.com/dashevo/js-dpp/blob/master/lib/test/fixtures/getContractFixture.js

export default {
  profile: {
    indices: [{ properties: [{ $userId: "asc" }], unique: true }],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 144
      },
      address: {
        type: "string"
      },
      text: {
        type: "string",
        minLength: 1,
        maxLength: 144
      },
      avatarUrl: {
        type: "string",
        format: "uri"
      }
    },
    required: ["name", "address"],
    additionalProperties: false
  },
  memo: {
    // type: "object",
    // allOf: [
    //   {
    //     $ref: 'http://dash.org/schemas/sys#/definitions/dapobjectbase'
    //   }
    // ],

    properties: {
      message: {
        type: "string",
        minLength: 1,
        maxLength: 144
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      updateAt: {
        type: "string",
        format: "date-time"
      }
      // relation: {
      //   $ref: 'http://dash.org/schemas/sys#/definitions/relation'
      // }
    },
    required: ["message", "createdAt"],
    additionalProperties: false
  }
  // like: {

  // type: 'object',
  // allOf: [
  //   {
  //     $ref: 'http://dash.org/schemas/sys#/definitions/dapobjectbase'
  //   }
  // ],
  // properties: {
  // relation: {
  //   $ref: 'http://dash.org/schemas/sys#/definitions/relation'
  // },
  // tipTxHash: {
  //   type: 'string'
  // }
  // },
  // required: ['tipTxHash'],
  // additionalProperties: false
  // }
  /* follow: {
    // type: 'object',
    // allOf: [
    //   {
    //     $ref: 'http://dash.org/schemas/sys#/definitions/dapobjectbase'
    //   }
    // ],
    properties: {
      // relation: {
      //   $ref: 'http://dash.org/schemas/sys#/definitions/relation'
      // }
    },
    // required: ['relation'],
    additionalProperties: false
  } */
};
