"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type DetectiveGuessCreateTypes = {};

const DetectiveGuessCreate = ({}: DetectiveGuessCreateTypes) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="grid w-full gap-1.5">
      <div className="mt-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Help us find this meme. Mark the spot you think it is on the map!"
        />
        <div className="mt-2 flex justify-end">
          <Button>Guess</Button>
        </div>
      </div>
    </div>
  );
};

export default DetectiveGuessCreate;
