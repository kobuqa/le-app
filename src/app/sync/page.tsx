"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import React, { useState } from "react";

const Sync = () => {
  const [ID, setID] = useState("");
  return (
    <div className="flex flex-col gap-4 justify-center w-full h-full">
      <Input
        value={ID}
        onChange={({ target }) => setID(target.value)}
        placeholder="Your ID"
      />
      <Button disabled={ID.length !== 5}>Import</Button>
      <Button>Export</Button>
    </div>
  );
};

export default Sync;
