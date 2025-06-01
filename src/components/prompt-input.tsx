"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, FC, useRef } from "react";

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
        placeholder="Send a message..."
        value={input}
        onChange={onChange}
        className="min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base backdrop-blur-md pb-10 dark:border-zinc-700"
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
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        {loading ? (
          <Button
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
            onClick={() => {}}
          >
            <StopIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            data-testid="send-button"
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
            onClick={onSubmit}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
