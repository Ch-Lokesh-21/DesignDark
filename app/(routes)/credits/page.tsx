"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
function Credits() {
  const [credits, setcredits] = useState<any | null>(null);
  const [errors, seterrors] = useState<any>(null);
  const [isUploading, setisUploading] = useState<boolean>(false);
  const { user } = useAuthContext();
  useEffect(() => {
    getCredits();
  }, [user]); 
  const getCredits = async () => {
    try {
      setisUploading(true);
      const result = await axios.get(`/api/user?email=${user?.email}`);
      if (result.data?.error) {
        seterrors(result.data.error);
      } else {
        setcredits(result.data.credits);
      }
      setisUploading(false);
    } catch (e) {
      seterrors(e);
    }
  };
  if (isUploading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoaderCircle className="animate-spin text-primary w-20 h-20" />
      </div>
    );
  } else if (credits) {
    return (
      <div>
        <h2 className="text-primary text-2xl font-bold text-center">Credits</h2>
        <div className="p-5 bg-slate-50 rounded-xl border flex justify-between items-center mt-6 hover:bg-slate-100">
          <div>
            <h2 className="font-bold text-2xl">My Credits:</h2>
            {credits && (
              <p className="text-gray-500 text-lg ">{credits} credits left </p>
            )}
          </div>
          <Button>By Credits</Button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Credits;
