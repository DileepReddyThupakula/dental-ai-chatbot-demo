/**
 * Environment variables validation module.
 * Strictly verifies required configurations in various execution contexts
 * to prevent runtime exceptions from missing API keys or database URLs.
 */

const requiredServerEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};

const requiredClientEnv = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

// Check for missing keys
export function validateEnv() {
  const missingServerKeys: string[] = [];
  const missingClientKeys: string[] = [];

  // Only validate server keys in server context (non-browser)
  if (typeof window === "undefined") {
    Object.entries(requiredServerEnv).forEach(([key, value]) => {
      // If it's missing, or is still a template placeholder
      if (!value || value.includes("xxxxxxxxxxxxxxxxxxxxxxxxxxx")) {
        missingServerKeys.push(key);
      }
    });
  }

  Object.entries(requiredClientEnv).forEach(([key, value]) => {
    if (!value || value.includes("xxxxxxxxxxxxxxxxxxxxxxxxxxx")) {
      missingClientKeys.push(key);
    }
  });

  if (missingServerKeys.length > 0 || missingClientKeys.length > 0) {
    const errorMsg = `
[Anvora System Warning] Missing or invalid environment configurations:
${missingServerKeys.map((k) => `  - SERVER: ${k} (Required for backend APIs)`).join("\n")}
${missingClientKeys.map((k) => `  - CLIENT: ${k} (Required for authentication widgets)`).join("\n")}

Please review your .env file or local Vercel environment variables dashboard.
    `;
    console.warn(errorMsg);

    // In production runtime, throw a hard error to prevent running with invalid configs.
    // Avoid triggering crash during the Next.js static collection build phase.
    const isNextBuild = process.env.NEXT_PHASE === "phase-production-build" || process.env.NEXT_PHASE?.includes("build");
    if (process.env.NODE_ENV === "production" && !isNextBuild && typeof window === "undefined") {
      throw new Error("Missing critical environment configurations. Process terminated.");
    }
  }
}

// Global configuration constants resolving fallbacks safely
export const env = {
  get databaseUrl() {
    return process.env.DATABASE_URL || "";
  },
  get clerkPublishableKey() {
    return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  },
  get clerkSecretKey() {
    return process.env.CLERK_SECRET_KEY || "";
  },
  get appUrl() {
    return process.env.NEXT_PUBLIC_APP_URL || "https://anvora.ai";
  },
  get aiGatewayUrl() {
    return process.env.NEXT_PUBLIC_AI_GATEWAY_URL || "";
  },
  get pmsApiUrl() {
    return process.env.PMS_API_URL || "";
  },
  get pmsIntegrationKey() {
    return process.env.PMS_INTEGRATION_KEY || "";
  },
  get nodeEnv() {
    return process.env.NODE_ENV || "development";
  },
};
