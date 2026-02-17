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
  Check,
  Ellipsis,
  Github,
  LibraryBig,
  MessageSquare,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
export function DropdownMenuComponent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon-lg"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-primary w-45" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <Link href={"/notes"}>
            <DropdownMenuItem>
              <Check /> Complete
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <Trash2 />
            Discard
          </DropdownMenuItem>
          <Link href={"/notes"}>
            <DropdownMenuItem>
              <LibraryBig />
              Notes
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Github />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare /> Feedback
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
