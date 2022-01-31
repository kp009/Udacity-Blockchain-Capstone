# Udacity Blockchain Capstone

The goal of this Udacity project is to create a decentralized housing solution. To represent your ownership of the real estate properties, you will be minting your own ERC721 tokens. You must first verify that you own the property using the zk-SNARKs verification method before minting a token.Then you'll put the token on a blockchain market place (OpenSea) for anyone to buy once it's been confirmed. The project's detailed steps are as follows:

Dependencies
<br>
NPM v8.1.3, Truffle v5.4.18 (core: 5.4.18), Solidity v0.5.16 (solc-js), Node v14.17.5, Web3.js v1.5.3, Docker v4.3.2, Zokrates v0.4.6, Ganache v2.5.4, Metamask v10.8.1

Contract addresses
<br>
Verifier contract address:  0xd05158D288d248A340B1a6C5a61aef97b1212Cde
<br>
SolnSquareVerifier contract address:    0x336B6E30D9Cc8DE9D9eB6691CE5D8Abbc4B2a2b5

Contract ABI
<br>
Can be found in folder `eth-contracts/build/contracts/SolnSquareVerifier.json`.

OpenSea MarketPlace Storefront link's
<br>
https://testnets.opensea.io/collection/testhousetoken-v3
<br>
https://testnets.opensea.io/assets/testhousetoken-v3
<br>
https://testnets.opensea.io/activity/testhousetoken-v3


Market Seller:  https://testnets.opensea.io/0x51062a7455c3Cf391C85D397B95773D4c7307aCC/testhousetoken-v3
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/0
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/1
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/2
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/3
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/4


Market Buyer:  https://testnets.opensea.io/0xdd668abd05bc0975c5c15a8c02ce613e005c3cac/testhousetoken-v3
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/5
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/6
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/7
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/8
https://testnets.opensea.io/assets/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5/9

Rinkeby Network
Contract Address:  https://rinkeby.etherscan.io/address/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5
https://rinkeby.etherscan.io/token/0x336b6e30d9cc8de9d9eb6691ce5d8abbc4b2a2b5

```bash
cd eth-contracts
npm install
npm install --save truffle-hdwallet-provider
```

### Implementing Zokrates after installing Docker

```bash
docker run -v /path/to/zokrates/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash
cd code/square
~/zokrates compile -i square.code
~/zokrates setup
~/zokrates compute-witness -a 2 4
~/zokrates generate-proof
# Repeat above 2 steps 10 times using different numbers to generate 10 proofs
~/zokrates export-verifier
```

### Frontend

```bash
cd app
# install packages
npm install --save  openzeppelin-solidity@2.3
npm install --save  truffle-hdwallet-provider@1.0.17
npm install webpack-dev-server -g
npm install web3
```

### Run the application
1. Clean the frontend 
```bash
cd app
# Remove the node_modules  
# remove packages
rm -rf node_modules
# clean cache
npm cache clean
rm package-lock.json
# initialize npm (you can accept defaults)
npm init
# install all modules listed as dependencies in package.json
npm install
```
2. Run Truffle Commands
```bash
cd eth-contracts
ganache-cli -m "word word .... word"
truffle compile
truffle migrate --reset
truffle test
```
3. Frontend - Run the following in another terminal
```bash
cd app
npm run dev
```

4. Rinkeby Network
```bash
# set mnemonic to your metamask seed, infurakey to your infura rinkeby projectId and rinkeby network in your metamask
truffle migrate --reset --network rinkeby
```


![truffle test](Images/Frontend1.png)

![truffle test](Images/Frontend2.png)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
* [Project](https://andresaaap.medium.com/capstone-real-estate-marketplace-project-faq-udacity-blockchain-69fe13b4c14e)
* [Truffle-Debugger](https://www.youtube.com/watch?v=UgsQ3ImySmE)
