export interface EncryptionKeys {
  secretkey: string;
  db_secretkey: string;
}

export interface EnvironmentKeys {
  prod: EncryptionKeys;
  pp: EncryptionKeys;
  dev: EncryptionKeys;
}

export type Environment = 'prod' | 'pp' | 'dev';