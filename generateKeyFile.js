const Arweave = require('arweave');
const fs = require('fs');
const { generateKeyPairFromMnemonic } = require('arweave-wallet');

// Replace with your recovery phrase
const mnemonic = [
  'video', 'aim', 'exclude', 'duck', 'evolve', 'various',
  'fun', 'pretty', 'stadium', 'person', 'saddle', 'make'
];

async function generateKeyFile() {
  try {
    // Generate wallet key from mnemonic
    const key = await generateKeyPairFromMnemonic(mnemonic);

    // Save the key to a JSON file
    fs.writeFileSync('arweave-keyfile.json', JSON.stringify(key, null, 2));

    console.log('Key file generated successfully as arweave-keyfile.json');
  } catch (error) {
    console.error('Error generating key file:', error);
  }
}

generateKeyFile();

