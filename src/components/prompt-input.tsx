"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, FC, useRef } from "react";
import { ModelSelection } from "@/components/model-selection";

type PromptInputProps = {
  onSubmit: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  loading?: boolean;
};

export const PromptInput: FC<PromptInputProps> = ({
  onSubmit,
  onChange,
  input,
  loading,
}) => {
  const textareaRef = useRef(null);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Textarea
        ref={textareaRef}
        placeholder="Describe your video..."
        value={input}
        onChange={onChange}
        className="min-h-[95px] text-sm max-h-[calc(75dvh)] overflow-hidden resize-none rounded-3xl font-medium backdrop-blur-md pl-5 pt-4 pb-10"
        rows={2}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            onSubmit();
          }
        }}
      />
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end gap-2 items-center">
        <ModelSelection />
        {loading ? (
          <Button className="rounded-full w-14" onClick={() => {}}>
            <StopIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button className="rounded-full w-14" onClick={onSubmit}>
            <ArrowUpIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
