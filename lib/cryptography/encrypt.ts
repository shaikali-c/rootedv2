export async function encrypt_note(text: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);
  const cipher_text = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );
  return {
    base: {
      iv: arrayToBase64(iv),
      data: arrayToBase64(new Uint8Array(cipher_text)),
    },
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipher_text)),
  };
}

export function arrayToBase64(array: Uint8Array) {
  return Buffer.from(array).toString("base64");
}

export function base64ToArray(base64: string) {
  return new Uint8Array(Buffer.from(base64, "base64"));
}
