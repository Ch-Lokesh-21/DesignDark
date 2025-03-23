"use client";
import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {  RefreshCcwDot } from "lucide-react";
function SelectionDetails({ record , regenerateCode , isReady}: any) {
  return (
    record && (
      <div className="p-5 bg-gray-100 rounded-lg">
        <h2 className="font-bold my-2">Wireframe</h2>
        <Image
          src={record?.imageUrl}
          alt="wireFrame"
          width={300}
          height={400}
          className="rounded-lg object-contain h-[200px] w-full border border-dashed bg-white p-4"
        />
        <h2 className="font-bold mt-4 mb-2">AI Model</h2>
        <Input defaultValue={record?.model} disabled={true} className="bg-white"/>
        <h2 className="font-bold mt-4 mb-2">Description</h2>
        <Textarea defaultValue={record?.description} disabled={true} className="bg-white h-[20vh]"/>

        <Button className="bg-primary text-white px-4 py-2 w-full mt-4" onClick={regenerateCode} disabled={!isReady}><RefreshCcwDot/>Regenerate Code</Button>
      </div>
    )
  );
}

export default SelectionDetails;
