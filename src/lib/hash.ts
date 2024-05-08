import { type Options as HashOptions } from "argon2";

export const hashOptions: HashOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};
