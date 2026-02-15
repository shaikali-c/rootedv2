import { decrypt_note } from "./decrypt";
import { encrypt_note } from "./encrypt";

export async function derive_key(
  password: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 310_000, // modern recommended range
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function main() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const sa = new Uint8Array([
    105, 80, 220, 243, 17, 150, 175, 32, 123, 36, 58, 232, 187, 102, 38, 83,
  ]);
  const password = "SHAIKALI";
  const key = await derive_key(password, sa);
  const iv = [5, 215, 90, 11, 108, 235, 196, 57, 48, 43, 103, 206];
  const data = [
    246, 251, 242, 15, 184, 190, 76, 174, 55, 199, 52, 202, 97, 212, 128, 133,
    17, 193, 52, 226, 168, 217, 35, 122, 85, 195, 22,
  ];
  const note = await decrypt_note({ iv, data }, key);
}
main();
