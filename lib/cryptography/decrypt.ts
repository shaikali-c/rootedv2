export async function decrypt_note(
  encrypted: { iv: number[]; data: number[] },
  key: CryptoKey,
) {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(encrypted.iv) },
    key,
    new Uint8Array(encrypted.data),
  );
  return new TextDecoder().decode(decrypted);
}
