"use client";
import { addEvent } from "@/actions/addEvent";
import { Button } from "../ui/button";
import { LucidePlusCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { addSession } from "@/actions/addSession";

const AddEvent = ({ eventid }: { eventid: string }) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate: newSession } = useMutation({
    mutationFn: () => addSession({ eventId: eventid }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: ["sessions", eventid],
        type: "all",
      });
      toast({
        title: res.message,
        description: `Session Created`,
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
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
              onClick={() => newSession()}
            >
              <LucidePlusCircle className="p-2" />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="right" sideOffset={2}>
            <p>Make a new event</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default AddEvent;
