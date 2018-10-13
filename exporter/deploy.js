const HDWalletProvider = require('truffle-hd-wallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const secrets = require('./secrets');

const provider = new HDWalletProvider(
    secrets.wallet,
    secrets.infuraApi,
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [],
        })
        .send({
            gas: '1000000',
            from: accounts[0],
        });
    console.log('Contract deployed to:', result.options.address);
}
deploy();
