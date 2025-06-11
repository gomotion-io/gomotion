import { getSession } from "@/sessions.ts";
import type { LicenseKey } from "@lemonsqueezy/lemonsqueezy.js";
import { listLicenseKeys } from "@lemonsqueezy/lemonsqueezy.js";
import type { APIRoute } from "astro";
import type { Profile } from "./_types.ts";
import { apiResponse, setupLemonsquezzy } from "./utils.ts";


setupLemonsquezzy();

export const POST: APIRoute = async ({ cookies, request }) => {
  const session = getSession(cookies); // Prepare the session

  const body = (await request.json()) as {
    licenseKey?: string;
    email?: string;
  };

  const { licenseKey, email } = body;
  if (!licenseKey || !email) {
    return apiResponse({ status: false, message: "Missing required fields" });
  }

  const license = await findLicenseForUser(licenseKey, email);

  if (!license) {
    return apiResponse({ status: false, message: "License not found" });
  }

  const profile: Profile = {
    user_name: license.attributes.user_name,
    user_email: license.attributes.user_email,
    order_id: license.attributes.order_id,
    key: license.attributes.key,
    activation_limit: license.attributes.activation_limit,
    instances_count: license.attributes.instances_count,
    status_formatted: license.attributes.status_formatted,
    created_at: license.attributes.created_at,
    product_id: license.attributes.product_id,
  };

  session.set("profile", profile);

  return apiResponse({
    status: true,
    data: profile,
  });
};

const findLicenseForUser = async (
  licenseKey: string,
  email: string,
): Promise<LicenseKey["data"] | undefined> => {
  const perPage = 100;
  let currentPage = 1;
  let lastPage = 1;

  while (currentPage <= lastPage) {
    const { error, data } = await listLicenseKeys({
      page: { number: currentPage, size: perPage },
    });
    if (error || !data) {
      throw new Error("An error occurred");
    }
    if (data.meta?.page) {
      lastPage = data.meta.page.lastPage;
    }
    const found = data.data.find(
      (item) =>
        item.attributes.key === licenseKey &&
        item.attributes.user_email === email,
    );
    if (found) return found;
    if (data.data.length === 0) break;
    currentPage += 1;
  }

  return undefined;
};
