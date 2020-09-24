const USDQToken = artifacts.require("./USDQToken/USDQToken.sol");

require('dotenv').config();
const delay = require('delay');

const paused = parseInt( process.env.DELAY_MS || "20000" );

const firstAddress = process.env.ADDRESS_FIRST_OWNER;
const secondAddress =  process.env.ADDRESS_SECOND_OWNER;
const thirdAddress =  process.env.ADDRESS_THIRD_OWNER;
const governanceAddress = process.env.ADDRESS_GOVERNANCE;

const wait = async (param) => {console.log("Delay " + paused); await delay(paused); return param;};

module.exports = function(deployer) {
    deployer.then(async () => {
        await wait();

        await wait(await deployer.deploy(USDQToken, firstAddress, secondAddress, thirdAddress, governanceAddress));
    });
};
