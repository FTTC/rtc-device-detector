import { SDKAPPID, SECRETKEY, EXPIRETIME } from './config';
import LibGenerateTestUserSig from './lib-generate-test-usersig.min.js';

const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);

/**
 * 获取 userSig 和 privateMapKey
 * @param {string} userID 用户名
 */
export function getLatestUserSig(userID) {
  const userSig = generator.genTestUserSig(userID);
  return {
    userSig,
    privateMapKey: 255,
  };
}
