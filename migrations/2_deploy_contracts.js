const xFitTokenCrowdsale = artifacts.require('./xFitTokenCrowdsale.sol');
const xFitToken = artifacts.require('./xFitToken.sol');

module.exports = function (deployer, network, accounts) {
    const rate = new web3.BigNumber(1);
    const wallet = accounts[0];

    return deployer
        .then(() => { // deploy token 
            return deployer.deploy(xFitToken);
        })
        .then(() => { // establish start time variable
            return new Promise((resolve, reject) => {
                web3.eth.getBlock('latest', (err, time) => {
                    if (err) reject();
                    const openingTime = time.timestamp + 200;
                    resolve(openingTime);
                })
            })
        })
        .then((openingTime) => { // deploy the crowdsale (token functionality)
            const closingTime = openingTime + 86400 * 240; // 240 days
            return deployer.deploy(
                xFitTokenCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                xFitToken.address
            );
        })
        .then(() => { // giving the crowdsale ownership over the token
            return xFitTokenCrowdsale.deployed().then(crowdsale => {
                crowdsale.token().then(tokenAddress => {
                    const xFitTokenInstance = xFitToken.at(tokenAddress);
                    xFitTokenInstance.transferOwnership(crowdsale.address).then(output => {
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        });
};