require('dotenv').config();
require('babel-register');
require('babel-polyfill');
const Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
    new HDWalletProvider(mnemonic, rpcEndpoint, 0, 2);

const infuraProvider = network => providerWithMnemonic(
    process.env.MNEMONIC_DEPLOY || '');

const web3 = new Web3('');

const gasPrice = web3.toWei(process.env.GAS_PRICE_GWEI, "gwei");

module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            gas: 6700000,
            network_id: '*',
        },
        rinkeby: {
            provider: infuraProvider('rinkeby'),
            network_id: 4,
            gasPrice: gasPrice,
            gas: 6700000
        },
        live: {
            provider: infuraProvider('mainnet'),
            network_id: 1,
            gasPrice: gasPrice,
            gas: 6700000
        },
        bscTestnet: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC_DEPLOY, 'https://data-seed-prebsc-1-s1.binance.org:8545'),
            network_id: 97,
            gasPrice: gasPrice,
            gas: 6700000
        },
        bscMainnet: {
            provider: () => new HDWalletProvider(process.env.MNEMONIC_DEPLOY, 'https://bsc-dataseed1.binance.org'),
            network_id: 56,
            gasPrice: gasPrice,
            gas: 6700000
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};