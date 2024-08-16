const Arweave = require('arweave');

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

let key = await arweave.wallets.generate();

let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

await arweave.transactions.sign(transaction, key);

const response = await arweave.transactions.post(transaction);

console.log(response.status);
// 200 : not to be confused with getStatus === 200, see note below*

console.log(transaction.id);
// This is the TXID