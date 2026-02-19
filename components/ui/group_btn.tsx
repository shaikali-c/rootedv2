import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, PencilIcon, ShareIcon, TrashIcon } from "lucide-react";

export default function CButtonGroup() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon-lg"} className="font-sans ml-auto">
          <Ellipsis className="w-5! h-5!" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-sans">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
