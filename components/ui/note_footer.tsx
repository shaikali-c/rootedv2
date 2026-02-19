"use client";
import { Heart, Pencil } from "lucide-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import note from "./note";
import { useState } from "react";
import Link from "next/link";

export default function NoteFooter({ note }: { note: string }) {
  const [added, setAdded] = useState<Boolean>(false);
  return (
    <div className="w-full flex items-center justify-center mt-5">
      <ButtonGroup className="font-sans">
        <Button
          className="py-5"
          variant="outline"
          onClick={() => setAdded(true)}
        >
          <Heart
            className="text-rose-500"
            fill={added ? "currentColor" : "none"}
          />
          {added ? "Added to favourites" : "Add to favourites"}
        </Button>
        <Button className="py-5" variant="outline" asChild>
          <Link href={`/new/${note}`}>
            <Pencil /> Edit
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
