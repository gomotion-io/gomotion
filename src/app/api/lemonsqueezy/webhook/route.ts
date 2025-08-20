import { linkProductToUser } from "@/supabase/server-functions/products";
import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import getRawBody from "raw-body";
import { Readable } from "stream";

function isSignatureValid(rawBody: Buffer, signatureHeader: string) {
  const SIGNATURE_SECRET = process.env.LEMONSQUEEZY_SIGNATURE_SECRET;

  if (!SIGNATURE_SECRET) {
    throw new Error('Missing signing secret. Add "SIGNING_SECRET"');
  }

  const hmac = createHmac("sha256", SIGNATURE_SECRET);
  const digest = Buffer.from(
    hmac.update(rawBody as unknown as string).digest("hex"),
    "utf8"
  ) as unknown as Uint8Array;
  const signature = Buffer.from(
    signatureHeader,
    "utf8"
  ) as unknown as Uint8Array;

  return timingSafeEqual(digest, signature);
}

export async function POST(req: Request) {
  const sig = req.headers.get("x-signature") as string;
  const eventName = req.headers.get("x-event-name") as string;

  if (!sig) {
    return new Response(
      JSON.stringify({
        message: "Signature header not found",
      }),
      { status: 401 }
    );
  }

  const rawBody = await getRawBody(
    Readable.from(Buffer.from(await req.text()))
  );

  if (!isSignatureValid(rawBody, sig)) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }

  const response = JSON.parse(rawBody.toString());

  try {
    switch (eventName) {
      case "subscription_created":
        const hasOrdered = response.data.attributes.status === "active";
        const userId = response.meta.custom_data.user_id;
        const productId = response.meta.custom_data.product_id;
        const subscriptionId = response.data.id;

        if (hasOrdered) {
          await linkProductToUser(userId, productId, subscriptionId);
          revalidatePath(`/`, "layout");
        }

        return new Response(
          JSON.stringify({
            message: "order_created event successfully handle",
          }),
          { status: 200 }
        );

      default:
        return new Response(
          JSON.stringify({
            message: "No targeted event",
          }),
          { status: 500 }
        );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: (err as Error).message,
      }),
      { status: 500 }
    );
  }
}
