// app/routes/api/tokens.ts
import { json } from "@remix-run/node";

export async function loader() {
  const response = await fetch("https://spl-kzn.myshopify.com/sf_private_access_tokens", {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN!,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return json({ error: "Failed to fetch token" }, { status: response.status });
  }
  const data = await response.json();
  return json(data);
}