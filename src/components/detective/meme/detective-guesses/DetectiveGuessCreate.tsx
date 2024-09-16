"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

type DetectiveGuessCreateTypes = {};

const DetectiveGuessCreate = ({}: DetectiveGuessCreateTypes) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");

  return (
    <div
      className="grid w-full gap-1.5 bg-blue-950 rounded-md p-2"
      onClick={() => textareaRef.current?.focus()} // Focus Textarea when div is clicked
    >
      <Textarea
        ref={textareaRef}
        className="mt-1 bg-transparent border-none resize-none focus-visible:ring-transparent  focus-visible:ring-offset-0 "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder="Help us find this meme. Mark the spot you think it is on the map!"
      />
      <div className=" flex justify-end">
        <Button>Guess</Button>
      </div>
    </div>
  );
};

export default DetectiveGuessCreate;
