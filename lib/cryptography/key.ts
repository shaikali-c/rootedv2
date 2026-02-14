export async function derive_key(password: string, salt: Uint8Array) {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto API not supported in this environment");
  }
  const encoder = new TextEncoder();
  const key_meterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    key_meterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
