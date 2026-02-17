import { nanoid } from "nanoid/non-secure";
import { redirect } from "next/navigation";

export default function NewPage() {
  const uid = nanoid();
  redirect(`/new/${uid}`);
}
