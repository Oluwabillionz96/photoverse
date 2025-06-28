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
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const DropDown = ({
  trigger,
  items,
  initialValue,
  changeValue,
  className,
}: {
  trigger: string;
  items: string[];
  initialValue: string;
  changeValue: (arg: string) => void;
  className?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className={className}>
          <HiMiniArrowsUpDown /> {trigger}
        </Button>
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
