import { Buffer } from 'buffer';

interface EncryptionKeys {
  secretkey: string;
  db_secretkey: string;
}

interface EnvironmentKeys {
  prod: EncryptionKeys;
  pp: EncryptionKeys;
  dev: EncryptionKeys;
}

// Encryption keys for different environments
const encryptionKeys: EnvironmentKeys = {
  prod: {
    secretkey: 'SMZ4}Q@q0IMLo2^p%ZsqCFc$7yd?SOdHE}i~}DijV40J.}JA%+f(*eD|^kma9rW',
    db_secretkey: 'QoH83t^z]6P3~d$}w_GQM{]]ruM:D3Q-Plkt(y%A)*%XpD53_`2v{-znumcEnC+',
  },
  pp: {
    secretkey: 'Y}Ni2=fDt=jPDdu=e`wEABdryx7yR6ùe4b|ocP!F%PùrR(Q:wI,A|Mw!P![ocg@',
    db_secretkey: 't,#KnB8!N)=h,B+Bhy$d&E2+D[jDFqsKf.3vnSJY)P!]*EN66)Dz70PGTmsYs@i',
  },
  dev: {
    secretkey: ';CHF~gfcU{pv!4e?5fcixSZ00e_[>qZ+t,Z-n14=6*!n4upkA|qQj]oUa[y`N>)',
    db_secretkey: './6{ORtDkjt?47d|#y3QZ#wjlV#Q^>Sn@+,#Zp8sN@-sR}X(V@4F.mb|eTrSB%_',
  },
};

// XOR encryption function
export function xorEncrypt(input: string, key: string): string {
  const inputBuffer = Buffer.from(input);
  const keyBuffer = Buffer.from(key);
  const outputBuffer = Buffer.alloc(inputBuffer.length);

  for (let i = 0; i < inputBuffer.length; i++) {
    outputBuffer[i] = inputBuffer[i] ^ keyBuffer[i % keyBuffer.length];
  }

  return outputBuffer.toString('base64');
}

// XOR decryption function (same as encryption due to XOR properties)
export function xorDecrypt(input: string, key: string): string {
  const inputBuffer = Buffer.from(input, 'base64');
  const keyBuffer = Buffer.from(key);
  const outputBuffer = Buffer.alloc(inputBuffer.length);

  for (let i = 0; i < inputBuffer.length; i++) {
    outputBuffer[i] = inputBuffer[i] ^ keyBuffer[i % keyBuffer.length];
  }

  return outputBuffer.toString();
}

// Get encryption key for environment
export function getEncryptionKey(env: keyof EnvironmentKeys): EncryptionKeys {
  return encryptionKeys[env];
}

// Secure hash function using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Buffer.from(hash).toString('base64');
}

// Example usage:
// const password = 'sqtepass';
// const env = 'prod' as const;
// const key = getEncryptionKey(env).secretkey;
// const encrypted = xorEncrypt(password, key);
// const decrypted = xorDecrypt(encrypted, key);