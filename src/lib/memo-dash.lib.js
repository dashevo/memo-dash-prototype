import DAPIClient from "@dashevo/dapi-client";
import DashPlatformProtocol, { entropy, DPObject } from "@dashevo/dpp";

import {
  Transaction,
  PrivateKey,
  PublicKey,
  Address
} from "@dashevo/dashcore-lib";

import memoDashContract from "./memo-dash.contract";

const DAPI_CLIENT_SEEDS = "devnet-porto.thephez.com";
const DAPI_CLIENT_PORT = 3000;
// https://github.com/dashevo/dash-network-configs/blob/master/devnet-porto/devnet-porto.yml#L11
const FAUCET_PRIVATE_KEY =
  "cR4t6evwVZoCp1JsLk4wURK4UmBCZzZotNzn9T1mhBT19SH9JtNt";
const NETWORK = "devnet";

export default class MemoDashLib {
  constructor() {
    this.dpp = new DashPlatformProtocol();

    const seeds = DAPI_CLIENT_SEEDS.split(",").map(ip => ({
      service: `${ip}:${DAPI_CLIENT_PORT}`
    }));

    this.dapiClient = new DAPIClient({
      seeds
    });

    faucetPrivateKey = new PrivateKey(FAUCET_PRIVATE_KEY);
    const faucetPublicKey = PublicKey.fromPrivateKey(faucetPrivateKey);
    faucetAddress = Address.fromPublicKey(
      faucetPublicKey,
      process.env.NETWORK === "devnet" ? "testnet" : NETWORK
    ).toString();

    const dpContract = dpp.contract.create(
      entropy.generate(),
      memoDashContract
    );
    dpp.setDPContract(dpContract);
  }
}
