"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { addEvent } from "@/actions/addEvent";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LucideCalendarPlus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AddEvent = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [input, select] = useState("");

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: addEvent,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: ["events"],
        type: "all",
      });
      toast({
        title: res.message,
        description: `Event Created: ${res.event?.title}`,
        type: "background",
      });
    },
    onError: (res) => {
      toast({
        description: res.message,
        type: "background",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 translate-y-full"
              >
                <LucideCalendarPlus className="p-2" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="right" sideOffset={2}>
            <p>Make a new event</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new life event here!</DialogTitle>
          <DialogDescription>
            Events retain information across sessions. Which means the AI is
            able to learn from your past sessions of this event. This enriches
            the responses.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Your event title"
              value={input}
              onChange={(e) => select(e.target.value)}
              className="col-span-3"
              onKeyUp={(e) => {
                e.preventDefault();
                // if its enter key then submit the form and close the modal
                if (e.key === "Enter" && input.length > 0) {
                  mutate.mutate({ title: input });
                  setOpen(false);
                }

                return;
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onMouseDown={(e) => {
                e.preventDefault();
                mutate.mutate({ title: input });
              }}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
