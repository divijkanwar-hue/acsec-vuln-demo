// INTENTIONALLY VULNERABLE - this file plants a hardcoded credential so the
// scanner's secret-detection (Gitleaks) has something to find.

module.exports = {
  // PLANTED VULN #1 (Gitleaks): hardcoded secrets - deliberately fake, for scanner
  // demo only. No provider-format keys (AWS/Stripe/etc.) so GitHub push-protection
  // doesn't gate them, but Gitleaks' generic + private-key rules still flag these.
  database: {
    host: "localhost",
    user: "admin",
    password: "P@ssw0rd_Pr0d_db_2024_SuperSecret", // hardcoded DB password
  },

  // Hardcoded generic token (Gitleaks generic high-entropy rule; not a provider format).
  sessionToken: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
};

