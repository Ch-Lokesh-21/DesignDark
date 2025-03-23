import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import Image from "next/image";
import ReqImage from "../../public/design_logo.svg";
import Link from "next/link";
import { LayoutGrid , Brush , WalletCards , SquareUserRound, BrushIcon } from "lucide-react"
function AppHeader({ hideSideBar = false }) {
  return (
    <>
      {!hideSideBar ? (
        <div
          className={`p-4 shadow-sm flex items-center justify-between w-full`}
        >
          <SidebarTrigger />
          <ProfileAvatar />
        </div>
      ) : (
        <div
          className={`p-4 shadow-sm flex items-center justify-between w-full`}
        >
          <div className="flex items-center justify-between w-1/6">
            <Image src={ReqImage} alt="logo" width={90} height={90} />
          </div>
          <div className="flex items-center justify-evenly w-4/6">
            <Link href={"/dashboard"} className="hover:text-primary flex justify-center items-center gap-1 hover:underline"> <LayoutGrid className="h-5 w-5" />Home</Link>
            <Link href={"/designs"} className="hover:text-primary flex justify-center items-center gap-1 hover:underline"> <BrushIcon className="h-5 w-5" /> Designs</Link>
            <Link href={"/credits"} className="hover:text-primary flex justify-center items-center gap-1 hover:underline"> <WalletCards className="h-5 w-5" /> Contact Us</Link>
            <Link href={"/contactus"} className="hover:text-primary flex justify-center items-center gap-1 hover:underline"> <SquareUserRound className="h-5 w-5" /> Contact Us</Link>
          </div>
          <div className="w-1/6 flex items-center justify-end">
            <ProfileAvatar />
          </div>
        </div>
      )}
    </>
  );
}

export default AppHeader;
