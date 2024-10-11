import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// const keypair = sol.Keypair.generate();
// console.log("Keypair>>", keypair.publicKey.toBase58());
const connection = new Connection(clusterApiUrl("devnet"));

const sender = new PublicKey("6fAWqX3vFXSXWbxcJFQnxUSA1uenfqLpuHmPo9SdnB6u");
const receiver = new PublicKey("5jEqZtQGmXzHmSsWS3zDULxQ5oDPA48Fze2Kz793BoeA");
const sbalance = await connection.getBalance(sender);
const rbalance = await connection.getBalance(receiver);
console.log("Receiver Balance>>>>", rbalance);
console.log("Sender Balance>>>>", sbalance);

// receiver ---  5jEqZtQGmXzHmSsWS3zDULxQ5oDPA48Fze2Kz793BoeA
// sender ---  6fAWqX3vFXSXWbxcJFQnxUSA1uenfqLpuHmPo9SdnB6u
