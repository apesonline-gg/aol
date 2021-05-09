import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

export const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
export const MINTER_ROLE = keccak256(toUtf8Bytes("MINTER_ROLE"));
export const PAUSER_ROLE = keccak256(toUtf8Bytes("PAUSER_ROLE"));
