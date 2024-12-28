import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Cpi } from "../target/types/cpi";
import { BN } from "bn.js";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

describe("cpi", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);


  const program = anchor.workspace.Cpi as Program<Cpi>;
  const sender = provider.wallet as anchor.Wallet;
  const reciever = new Keypair();

  const transferAmount = 0.01 * LAMPORTS_PER_SOL;

  it("Sol Transfer Anchor ", async () => {
    // Add your test here.
    const transactionSignature = await program.methods
    .solTransfer(new BN(transferAmount))
    .accounts({
      sender:sender.publicKey,
      reciever:reciever.publicKey,
    })
    .rpc();
    console.log(
      `\nTransaction Signature:` +
        `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`,
    );
  });
});
