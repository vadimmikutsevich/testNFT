const functions = require("firebase-functions");
const express = require('express')
const admin  = require('firebase-admin');
const { Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js");
const { Connection, clusterApiUrl, Keypair, PublicKey } = require("@solana/web3.js");

const wallet = Keypair.generate();

const connection = new Connection(clusterApiUrl("mainnet-beta"));
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const app = express()

app.post('/', async (req, res) => {
    const address = req.body.tokenAddress
    if (!address) return res.send('Необходим адрес токена')

    const mintAddress = new PublicKey(address);
    try {
        const nftInfo = await metaplex.nfts().findByMint({ mintAddress });
        if (nftInfo.creators[0].verified && nftInfo.edition.isOriginal) {
            return res.send('NFT настоящая')
        } else {
            return res.send('NFT фальшивая')
        }
    } catch(e) {
        throw new Error({message: e})
    }
})

exports.app = functions
 .runWith({
    timeoutSeconds: 15,
    memory: "128MB",
 })
 .https
 .onRequest(app)