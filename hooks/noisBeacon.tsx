import { WasmExtension, setupWasmExtension } from "@cosmjs/cosmwasm-stargate";
import { QueryClient } from "@cosmjs/stargate";
import { HttpBatchClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { approxDateFromTimestamp } from "../utils/misc";
//`config`, `beacon`, `beacons_asc`, `beacons_desc`, `bot`, `bots`, `submissions`, `job_stats`

const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
const noisOracleAddress = process.env.NEXT_PUBLIC_PROXYCONTRACT_ADDRESS;

export interface VerifiedBeacon {
  readonly round: number;
  readonly randomness: string;
  readonly published: Date;
  readonly verified: Date;
  /** Diff between verified and published in seconds */
  readonly diff: number;
}

export async function queryOracleWith(
  client: QueryClient & WasmExtension,
  requestMsg: any
) {
  console.log("Sending query:", JSON.stringify(requestMsg));
  return client.wasm.queryContractSmart(noisOracleAddress!, requestMsg);
}

export async function queryBeacon(
  client: QueryClient & WasmExtension,
  round: number
): Promise<VerifiedBeacon | null> {
  const response: { beacon: any } = await queryOracleWith(client, {
    beacon: { round },
  });

  if (response.beacon) {
    const { round, randomness, published, verified } = response.beacon;
    const publishedDate = approxDateFromTimestamp(published);
    const verifiedDate = approxDateFromTimestamp(verified);
    const diff = (verifiedDate.getTime() - publishedDate.getTime()) / 1000;
    let verifiedBeacon: VerifiedBeacon = {
      round: round,
      randomness: randomness,
      published: publishedDate,
      verified: verifiedDate,
      diff: diff,
    };
    return verifiedBeacon;
  } else {
    console.log("NONE");
    return null;
  }
}

export async function queryBeacons(
  client: QueryClient & WasmExtension,
  startAfter: number | null,
  itemsPerPage: number
): Promise<VerifiedBeacon[]> {
  const response: { beacons: Array<any> } = await queryOracleWith(client, {
    beacons_desc: { start_after: startAfter, limit: itemsPerPage },
  });

  return response.beacons.map((beacon: any): VerifiedBeacon => {
    const { round, randomness, published, verified } = beacon;
    const publishedDate = approxDateFromTimestamp(published);
    const verifiedDate = approxDateFromTimestamp(verified);
    const diff = (verifiedDate.getTime() - publishedDate.getTime()) / 1000;
    const verifiedBeacon: VerifiedBeacon = {
      round: round,
      randomness: randomness,
      published: publishedDate,
      verified: verifiedDate,
      diff: diff,
    };
    return verifiedBeacon;
  });
}

export const queryBeaconHandle = async (round: number) => {
  if (!round) {
    throw new Error("Undefined Round");
  }

  const httpBatch = new HttpBatchClient(rpcEndpoint!);

  const tmint = await Tendermint34Client.create(httpBatch);

  const queryClient = QueryClient.withExtensions(tmint, setupWasmExtension);

  const beacon = await queryBeacon(queryClient, round);

  //const z = new Error("NONE");

  if (!beacon) {
    throw new Error("NONE");
  }

  return beacon;
};

export async function queryBeaconsHandle() {
  console.log("QueryBeacons");

  const httpBatch = new HttpBatchClient(rpcEndpoint!);

  const tmint = await Tendermint34Client.create(httpBatch);

  const queryClient = QueryClient.withExtensions(tmint, setupWasmExtension);

  const beacons = await queryBeacons(queryClient, null, 20);

  return beacons;
}
