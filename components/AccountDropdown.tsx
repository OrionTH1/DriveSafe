"use client";

import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { logout } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AccountDropdown() {
  const router = useRouter();
  const handleLogoutClick = async () => {
    const status = await logout();
    if (status.success) router.push("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="shad-dropdown-trigger">
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-400 rounded-md">
        <DropdownMenuArrow className=" fill-white" />
        <DropdownMenuItem className="shad-dropdown-content cursor-pointer">
          <Link href={"/admin"}>Admin Page</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="shad-dropdown-content cursor-pointer"
          onClick={handleLogoutClick}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountDropdown;
