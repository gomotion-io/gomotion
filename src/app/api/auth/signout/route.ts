import type { APIRoute } from "astro";
import { apiResponse } from "./utils.ts";
import { getSession } from "../../sessions.ts";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  const session = getSession(cookies); // Prepare the session
  session.delete("profile");
  return apiResponse({ status: true });
};
