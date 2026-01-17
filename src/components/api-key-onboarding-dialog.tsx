"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateOpenRouterApiKey } from "@/supabase/server-functions/profile";
import { useUiStore } from "@/store/ui.store";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Key, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const FormSchema = z.object({
  apiKey: z
    .string()
    .min(1, "API key is required")
    .refine((val) => val.startsWith("sk-or-"), {
      message: "Invalid OpenRouter API key format. It should start with 'sk-or-'",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export const ApiKeyOnboardingDialog = () => {
  const [loading, setLoading] = useState(false);
  const { showApiKeyOnboardingDialog, setShowApiKeyOnboardingDialog } =
    useUiStore();
  const { user, updateProfile } = useUserStore();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateOpenRouterApiKey(user.id, data.apiKey);
      updateProfile({ open_router_api_key: data.apiKey });
      setShowApiKeyOnboardingDialog(false);
      toast.success("API key saved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save API key"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={showApiKeyOnboardingDialog}
      onOpenChange={() => {}}
    >
      <DialogContent
        className="sm:max-w-[480px]"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 ring-1 ring-violet-500/30">
            <Key className="h-7 w-7 text-violet-500" />
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-semibold">
              Connect Your OpenRouter API Key
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              To generate animations, you need to connect your own OpenRouter API
              key. This allows you to use AI models securely.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 rounded-lg border border-amber-200/50 bg-amber-50/50 p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-amber-800">
              <p className="font-medium">Why do I need an API key?</p>
              <p className="mt-1 text-amber-700">
                Gomotion uses OpenRouter to access AI models. Your API key is
                stored securely and only used for your animations.
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    OpenRouter API Key
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="sk-or-v1-..."
                      className="h-11 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between text-sm">
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 hover:underline"
              >
                Get your API key
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-gradient-to-r from-violet-600 to-indigo-600 font-medium hover:from-violet-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save API Key & Continue"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
