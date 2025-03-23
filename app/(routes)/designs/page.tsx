"use client";
import { useAuthContext } from "@/app/provider";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DesignCard from "./_components/DesignCard";
import { RECORD } from "@/app/view-code/[uid]/page";
function Design() {
  const { user } = useAuthContext();
  const [loading, setloading] = useState<boolean>(true);
  const [wireFrames, setwireFrames] = useState<RECORD[]>([]);
  useEffect(() => {
    if(user?.email)
    {
        getWireFrames();
    }
  }, [user]);
  const getWireFrames = async () => {
    setloading(true);
    const result = await axios.get(
      `/api/wireframe-to-code?email=${user?.email}`
    );
    const resp = result.data;
    setwireFrames(resp);
    setloading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh] gap-5">
          <Loader2Icon className="h-20 w-20 animate-spin text-primary" />
          <h2 className="text-2xl animate-pulse text-primary">
            Fetching WireFrames
          </h2>
        </div>
      ) : (
        <div>
            <h2 className="font-bold text-3xl text-primary text-center mb-8">Wire Frames and Codes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-2">
                {wireFrames?.map((item:RECORD,idx) => (
                    <DesignCard key={idx} item={item}/>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

export default Design;
