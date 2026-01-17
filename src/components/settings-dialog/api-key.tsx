"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, ExternalLink } from "lucide-react";
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

export const ApiKeySettings = () => {
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { user, profile, updateProfile } = useUserStore();

  const hasExistingKey = !!profile?.open_router_api_key;

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: profile?.open_router_api_key || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateOpenRouterApiKey(user.id, data.apiKey);
      updateProfile({ open_router_api_key: data.apiKey });
      toast.success("API key updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update API key"
      );
    } finally {
      setLoading(false);
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 12) return key;
    return `${key.slice(0, 8)}${"*".repeat(24)}${key.slice(-4)}`;
  };

  return (
    <Card className="w-full border-none bg-neutral-50">
      <CardHeader className="mb-5 space-y-1">
        <CardTitle>OpenRouter API Key</CardTitle>
        <CardDescription>
          Manage your OpenRouter API key used for AI-powered animations.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {hasExistingKey && (
          <div className="rounded-lg border border-emerald-200/50 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  API Key Connected
                </p>
                <p className="font-mono text-xs text-emerald-700">
                  {maskApiKey(profile.open_router_api_key || "")}
                </p>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-6"
          >
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {hasExistingKey ? "Update API Key" : "API Key"}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showKey ? "text" : "password"}
                        placeholder="sk-or-v1-..."
                        className="pr-10 font-mono text-sm"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading
                  ? "Saving..."
                  : hasExistingKey
                    ? "Update API Key"
                    : "Save API Key"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="border-t pt-4">
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 hover:underline"
          >
            Get your OpenRouter API key
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
