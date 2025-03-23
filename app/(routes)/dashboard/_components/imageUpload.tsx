"use client";
import { storage } from "../../../../appwrite";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
function ImageUpload() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [state, setState] = useState({
    previewUrl: null as string | null,
    file: null as File | null,
    fileUrl: null as string | null,
    isUploading: false,
    error: null as string | null,
  });
  const [model, setmodel] = useState<string | null>(null);
  const [description, setdescription] = useState<string | null>(null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setState((prevState) => ({
      ...prevState,
      previewUrl,
      file,
      error: null,
    }));
  };

  const generateToCode = async () => {
    if (!state.file || !model || !description) {
      setState((prevState) => ({
        ...prevState,
        error: "Please select all the fields",
      }));
      return;
    }

    setState((prevState) => ({ ...prevState, isUploading: true, error: null }));

    try {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        "unique()",
        state.file
      );
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        response.$id
      );
      console.log("Image uploaded successfully!");
      console.log(fileUrl);
      const uid = uuidv4();
      const result = await axios.post("/api/wireframe-to-code", {
        uid: uid,
        description: description,
        imageUrl: fileUrl,
        model: model,
        email: user?.email,
      });
      if (result?.data?.error) {
        setState((prevState) => ({
          ...prevState,
          isUploading: false,
          error: result?.data?.error,
        }));
        return ;
      } else {
        setState((prevState) => ({
          ...prevState,
          isUploading: false,
          error: null,
        }));
        router.push(`/view-code/${uid}`);
      }
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
      setState((prevState) => ({
        ...prevState,
        isUploading: false,
        error: "Failed to upload the file. Please try again.",
      }));
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!state.previewUrl ? (
          <div className="p-7 rounded-lg shadow-lg flex flex-col items-center justify-center border">
            <div className="flex flex-col gap-2 justify-center items-center">
              <ImageUp className="h-10 w-10 text-primary" />
              <h2 className="font-bold text-lg">Upload Image</h2>
            </div>
            <div className="p-5 border-dashed w-full flex justify-center border-2 rounded-lg mt-12">
              <label htmlFor="imageSelect">
                <h2 className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-cyan-500 font-bold">
                  Upload
                </h2>
              </label>
            </div>
            <input
              type="file"
              id="imageSelect"
              className="hidden"
              onChange={onImageChange}
              multiple={false}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed rounded-lg shadow-lg">
            <Image
              src={state.previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] mb-4"
            />
            <Trash2
              className="cursor-pointer flex justify-end text-lg"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  previewUrl: null,
                  file: null,
                  fileUrl: null,
                }))
              }
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg mb-2">Select AI Model</h2>
          <Select onValueChange={(value) => setmodel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((item, idx) => (
                <SelectItem key={idx} value={item.name}>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="w-auto h-auto"
                    />
                    <h2>{item.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <h2 className="font-bold text-lg mt-5">
            Enter Description about the component
          </h2>
          <Textarea
            onChange={(e) => setdescription(e?.target?.value)}
            className="mt-5 p-2 h-[150px]"
            placeholder="Enter Description"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
        <Button
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
          onClick={generateToCode}
          disabled={state.isUploading}
        >
          {state.isUploading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <Sparkles />
          )}
          {state.isUploading ? (
            <p className="text-white font-bold">Loading...</p>
          ) : (
            " Generate code"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
