"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../dropdown-menu";
import { redirect } from "next/navigation";

export default function DropDownMenuItemLogout() {
  const handleLogout = async () => {
    await fetch("/api/logout");
    redirect("/login");
  };
  return (
    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
