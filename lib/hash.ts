"use client";
import xxhash from "xxhash-wasm";
let hash_promise: ReturnType<typeof xxhash> | null = null;
function getHasher() {
  if (!hash_promise) {
    hash_promise = xxhash();
  }
  return hash_promise;
}
export async function hashText(text: string) {
  const { h64 } = await getHasher();
  return h64(text);
}
