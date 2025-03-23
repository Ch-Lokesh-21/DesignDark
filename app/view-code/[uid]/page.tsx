"use client";
import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectionDetails from "../_components/SelectionDetails";
import CodeEditor from "../_components/CodeEditor";
export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}
function ViewCode() {
  const [isloading, setisloading] = useState(false);
  const [codeResp, setcodeResp] = useState("");
  const [record, setrecord] = useState<RECORD>();
  const { uid } = useParams();
  const [isReady, setisReady] = useState(false);
  useEffect(() => {
    uid && getRecordInfo();
  }, [uid]);
  useEffect(() => {
    if (codeResp != "" && record?.uid && isReady && record?.code == null) {
      updateCodeToDb();
    }
  }, [codeResp, record, isReady]);
  const getRecordInfo = async () => {
    setcodeResp("");
    setisloading(true);
    setisReady(false);
    try {
      const result = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
      console.log(result.data);
      const resp = result?.data;
      setrecord(resp);
      if (resp?.code == null) {
        generateCode(resp);
      } else {
        setcodeResp(resp?.code.resp);
        setisloading(false);
        setisReady(true);
      }
    } catch (e) {
      console.log(e);
    }
    setisloading(false);
  };
  const generateCode = async (record: RECORD) => {
    setisloading(true);
    setisReady(false);
    setcodeResp("");
    let accumulate="";
    const res = await fetch(`/api/ai-model`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: record?.description + ":" + Constants.PROMPT,
        model: record?.model,
        imageUrl: record?.imageUrl,
      }),
    });
    if (!res.body) return;
    setisloading(false);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const text = (decoder
        .decode(value))
        .replace("```react", "")
        .replace("```jsx", "")
        .replace("```tsx", "")
        .replace("jsx", "")
        .replace("javascript", "")
        .replace("typescript", "")
        .replace("tsx", "")
        .replace("```javascript", "")
        .replace("```typescript", "")
        .replace("```", "");
      setcodeResp((prev) => prev + text);
      accumulate+=text;
      console.log(text);
    }
    const result = await fetch(`/api/check-error`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "description": `I will provide a React code snippet. Resolve any errors in the code without altering its structure, behavior, or output. Use only the lucide-react library for icons and do not import or use any other libraries or any other components. Provide complete, working code without comments, explanations, placeholders, or partial implementations. The React code is '''${accumulate}'''. Now resolve the errors.`, 
        }),
      });
      if (!result.body) return;
      let reader2 = result.body.getReader();
      let decoder2 = new TextDecoder();
      let newCode="";
      while (true) {
        const { done, value } = await reader2.read();
        if (done) {
          break;
        }
        const text = (decoder2.decode(value))
        newCode+=text;
      }
      newCode=newCode.replace("```react", "").replace("```jsx", "").replace("```tsx", "").replace("```javascript", "").replace("```typescript", "").replace("```", "");
      console.log(newCode);
      setcodeResp(newCode);
    setisReady(true);
    setisloading(false);
    updateCodeToDb();
  };
  const updateCodeToDb = async () => {
    const result = await axios.put(`/api/wireframe-to-code`, {
      uid: record?.uid,
      codeResp: { resp: codeResp },
    });
    console.log(result.data);
  };
  return (
    <div>
      <div className="flex justify-end items-center">
      <AppHeader hideSideBar={true} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div className="col-span-1 h-80vh">
          <SelectionDetails
            record={record}
            regenerateCode={() => getRecordInfo()}
            isReady={isReady}
          />
        </div>
        <div className="col-span-4 h-80vh bg-gray-100 p-2 rounded-lg">
          {isloading ? (
            <div className="h-full w-full flex justify-center items-center rounded-lg gap-5">
              <LoaderCircle className="animate-spin text-5xl text-primary w-20 h-20" />
              <h2 className="text-2xl font-bold animate-pulse">
                Converting Wireframe to Code...
              </h2>
            </div>
          ) : (
            <CodeEditor codeResp={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
