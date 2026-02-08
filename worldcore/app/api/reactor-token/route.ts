import { NextResponse } from "next/server";
import { sanitizeApiKey } from "@/lib/apiKey";

const COORDINATOR_URL = "https://api.reactor.inc";

async function createTokenResponse(apiKey: string) {
  try {
    const response = await fetch(`${COORDINATOR_URL}/tokens`, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Failed to create token: ${response.status} ${text}` },
        { status: response.status }
      );
    }

    const { jwt } = (await response.json()) as { jwt: string };
    return NextResponse.json({ jwt });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch token";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/reactor-token
 * Exchanges the server-side Reactor API key (from env) for a JWT.
 * Keeps the API key out of the client.
 */
export async function GET() {
  const apiKey =
    process.env.REACTOR_API_KEY ?? process.env.NEXT_PUBLIC_REACTOR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Reactor API key not configured. Set REACTOR_API_KEY or NEXT_PUBLIC_REACTOR_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  return createTokenResponse(apiKey);
}

/**
 * POST /api/reactor-token
 * Accepts an API key in the request body to avoid editing .env.local.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const providedKey = sanitizeApiKey(body?.apiKey);
  const apiKey =
    providedKey ??
    process.env.REACTOR_API_KEY ??
    process.env.NEXT_PUBLIC_REACTOR_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Reactor API key not configured. Provide apiKey or set REACTOR_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  return createTokenResponse(apiKey);
}
