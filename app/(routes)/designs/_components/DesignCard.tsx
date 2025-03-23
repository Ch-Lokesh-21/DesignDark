import { Button } from "@/components/ui/button";
import Constants from "@/data/Constants";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function DesignCard({ item }: any) {
  const modelObj =
    item && Constants.AiModelList.find((x) => x.name == item?.model);

  return (
    <div className="p-5 border rounded-lg shadow-lg">
      <Image
        src={item.imageUrl}
        alt="image"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover bg-white rounded-lg"
      />
      <div className="mt-2">
        <h2 className="line-clamp-3 text-gray-400 text-sm">
          {item?.description}
        </h2>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 max-w-[180px] bg-gray-50 rounded-lg p-2">
            {modelObj && (
              <Image
                src={modelObj?.icon}
                alt={modelObj?.modelName || "img"}
                width={25}
                height={25}
              />
            )}
            <h2>{modelObj.name}</h2>
          </div>
          <Link href={`/view-code/${item?.uid}`}>
            <Button className="bg-primary text-white flex items-center">
              <CodeXml />
              View Code
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
