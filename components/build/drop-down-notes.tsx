"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ellipsis,
  Plus,
  RefreshCcw,
  SettingsIcon,
  SquarePen,
  StickyNote,
} from "lucide-react";
import DropDownMenuItemLogout from "../ui/custom/custom_dropdown";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export function DropdownMenuComponentNotes() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const uid = nanoid();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Plus className="w-5! h-5!" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 font-sans">
        <DropdownMenuItem onClick={() => router.refresh()}>
          <RefreshCcw />
          Refresh
        </DropdownMenuItem>
        <Link href={`/new/${uid}`}>
          <DropdownMenuItem>
            <StickyNote />
            New note
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <SquarePen />
          Manage notes
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropDownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
