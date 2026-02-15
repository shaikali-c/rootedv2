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
  SettingsIcon,
  SquarePen,
  StickyNote,
} from "lucide-react";
import DropDownMenuItemLogout from "../ui/custom/custom_dropdown";
import Link from "next/link";

export function DropdownMenuComponentNotes() {
  const [mounted, setMounted] = useState(false);
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
      <DropdownMenuContent className="w-40 font-sans">
        <Link href={"/note"}>
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
