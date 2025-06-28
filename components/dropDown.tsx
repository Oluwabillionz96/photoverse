"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const DropDown = ({
  trigger,
  items,
  initialValue,
  changeValue,
}: {
  trigger: string;
  items: string[];
  initialValue: string;
  changeValue: (arg: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>{trigger}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={initialValue}
          onValueChange={changeValue}
        >
          {items.map((value, index) => (
            <DropdownMenuRadioItem value={value} key={index}>
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
