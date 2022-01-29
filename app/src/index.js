import Web3 from "web3";
import SolnSquareVerifierArtifact from "../../eth-contracts/build/contracts/SolnSquareVerifier.json";

const zokratesProof = [   
  require("./proof0.json"), 
  require("./proof1.json"),
  require("./proof2.json"),
  require("./proof3.json"),
  require("./proof4.json"),
  require("./proof5.json"),
  require("./proof6.json"),
  require("./proof7.json"),
  require("./proof8.json"),
  require("./proof9.json"),  
];

const App = {
  web3: null,
  account: null,
  meta: null,
  
  start: async function() {
    const { web3 } = this;
    
    try {
      // get contract instance
      
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SolnSquareVerifierArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        SolnSquareVerifierArtifact.abi,
        deployedNetwork.address,
      );
     
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

     
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  mint: async function() {
    const { mint } = this.meta.methods;
    const { owner } = this.meta.methods;
    const { addSolution } = this.meta.methods;
    let Owner = await owner().call();
    //let Owner = process.env.OWNER_ADDRESS;
    console.log(Owner);
    const id = document.getElementById("proofId").value;
    const tokenid = document.getElementById("tokenId").value;
    try {
      let proofs = Object.values(zokratesProof[id].proof);
      let inputs = zokratesProof[id].inputs;
      console.log("OWNER_ADDRESS "+ Owner + "\n");
      console.log("id "+id+ "\n");
      console.log("proofs "+ proofs+ "\n");
      console.log("inputs "+ inputs+ "\n");
      let tx = await addSolution(Owner, tokenid, ...proofs, inputs).send({ from: Owner });
      console.log("Solution added. Transaction: " + tx.transactionHash);
      tx = await mint(Owner, tokenid).send({ from: Owner });
      console.log("Minted item. Transaction: " + tx.transactionHash);
      App.setStatus("New House Owner is " + Owner + "and" +  "Minted item. Transaction: " + tx.transactionHash + " Token id is: " + tokenid );
  } catch (e) {
      console.log(e);
  }
   
  },

  // Implement Task 4 Modify the front end of the DAPP
  tokenURI: async function (){
    const { tokenURI } = this.meta.methods; // to be able to use the functions in your Smart Contract use destructuring to get the function to be call
   
    const id = document.getElementById("houseid").value;  
    const URI = await tokenURI(id).call();
    if(URI == "")
        App.setStatus("House"+ id +" is not saved");
    else
        App.setStatus("House uri is " + URI);
        
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
  }

  App.start();
});
