"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../dropdown-menu";
import { useRouter } from "next/navigation";

export default function DropDownMenuItemLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "GET" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={handleLogout}
      className="cursor-pointer"
    >
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
