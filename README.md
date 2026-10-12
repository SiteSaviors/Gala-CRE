# Gala CRE Group

Commercial real estate platform website built with Vite, React, and TypeScript.

## Production form configuration

The Vercel project needs these environment variables before form delivery can be enabled:

- `RESEND_API_KEY`: Resend API key with access to the verified sending domain.
- `CONTACT_FROM_EMAIL`: Verified sender, for example `Gala CRE <website@your-domain.com>`.
- `CONTACT_TO_EMAIL`: Recipient for general, property, and service inquiries.
- `CAREERS_TO_EMAIL`: Comma-separated private Careers recipients.
- `INVESTOR_TO_EMAIL`: Comma-separated private 1031/investor-sourcing recipients.

`FORM_ALLOWED_ORIGINS` is optional. Without it, both form endpoints accept only requests whose origin matches the forwarded request host and protocol. Set it only when an additional trusted origin must submit to the same deployment.

For durable distributed rate limiting, connect a Vercel-compatible Redis/KV store and supply `KV_REST_API_URL` plus `KV_REST_API_TOKEN`. Without those values, each function instance still uses a conservative in-memory fallback.
