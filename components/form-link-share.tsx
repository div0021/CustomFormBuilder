"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Check, Copy } from "lucide-react";
import { set } from "date-fns";

const FormLinkShare = ({ shareURL }: { shareURL: string }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [check,setCheck] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button disabled={check}
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied ✔️",
            description: "Link copied to clipboard!",
          });
          setCheck(true);
          setTimeout(()=>{
            setCheck(false);
          },1500);
        }}
      >
        {check ? <Check className="w-4 h-4 mr-2"/> : <Copy className="w-4 h-4 mr-2"/>} Share link 
      </Button>
    </div>
  );
};
export default FormLinkShare;
