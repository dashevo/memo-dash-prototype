import DAPIClient from '@dashevo/dapi-client'

export class DapiClientWrapper {
  constructor(seeds) {
    this.dapiClient = new DAPIClient({
      seeds,
      timeout: 30000
    })
  }

  signUpUser = async privateKey => {
    const userPrivateKey = privateKey ? privateKey : new PrivateKey()
    const validPayload = new Transaction.Payload.SubTxRegisterPayload()
      .setUserName(username)
      .setPubKeyIdFromPrivateKey(userPrivateKey)
      .sign(userPrivateKey)

    const { items: inputs } = await this.dapiClient.getUTXO(this.faucetAddress)

    const transaction = Transaction()
      .setType(Transaction.TYPES.TRANSACTION_SUBTX_REGISTER)
      .setExtraPayload(validPayload)
      .from(inputs.slice(-1)[0])
      .addFundingOutput(10000)
      .change(this.faucetAddress)
      .sign(this.faucetPrivateKey)

    return await this.dapiClient.sendRawTransaction(transaction.serialize())
  }

  publishUserProfile = async stPacket => {
    // 1. Create ST Packet

    // throw new Error(JSON.stringify(stPacket, null, 2))

    // 2. Create State Transition
    const transaction = new Transaction().setType(Transaction.TYPES.TRANSACTION_SUBTX_TRANSITION)

    transaction.extraPayload
      .setRegTxId(regTxId)
      .setHashPrevSubTx(regTxId)
      .setHashSTPacket(stPacket.hash())
      .setCreditFee(1000)
      .sign(userPrivateKey)

    const transitionHash = await this.dapiClient.sendRawTransition(
      transaction.serialize(),
      stPacket.serialize().toString('hex')
    )

    if (!transitionHash) {
      throw new Error('Could not publish user profile')
    }
  }
}
