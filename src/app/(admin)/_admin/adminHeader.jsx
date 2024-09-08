"use client";
import Image from "next/image";
import Link from "next/link";
import { Logout } from "@/app/(admin)/_resources/utils/logout";
import { redirect, useRouter } from "next/navigation";

const { Button } = require("@/components/ui/button");
const {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} = require("@/components/ui/dropdown-menu");

export function AdminHeader() {
  const router = useRouter();
  const handleLogout = (id) => {
    localStorage.clear();
    Logout();
    router.push(`/`);
    // redirect("/login");
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-slate-200  mt-1 w-10 h-10 dark:border-slate-800"
            size="icon"
            variant="ghost"
          >
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              width="32"
              src="/manInBlack.jpg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => handleLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
