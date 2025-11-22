import nacl from 'tweetnacl';

export async function verifySignature(signature, timestamp, bodyText, publicKey) {
  if (!signature || !timestamp || !publicKey) return false;

  /*🦖*/ const encoder = new TextEncoder();
  /*✉️*/ const message = encoder.encode(timestamp + bodyText);
  /*✒️*/ const sig = hexToBytes(signature);
  /*🗝️*/ const pubKey = hexToBytes(publicKey);

  try {
    return nacl.sign.detached.verify(message, sig, pubKey);
  } catch (e) {
    console.error('nacl verify error', e);
    return false;
  }
}

function hexToBytes(hex) {
  if (!hex) return new Uint8Array();
  const matches = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(matches.map(b => parseInt(b, 16)));
}
