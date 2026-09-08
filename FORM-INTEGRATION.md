# Gala CRE Structured Form Integration

Careers and investor-sourcing forms share the browser contract in `src/lib/formSubmission.ts` and submit to the private Vercel Function at `api/forms.ts`. Form-specific validation remains in each React form and is repeated server-side before delivery.

## Private environment configuration

Configure these only in the server/deployment environment. None should use the `VITE_` prefix.

- `RESEND_API_KEY`: Resend server API key.
- `CONTACT_FROM_EMAIL`: verified sender used for form notifications.
- `CAREERS_TO_EMAIL`: private recipient for commercial-agent applications.
- `INVESTOR_TO_EMAIL`: private recipient for acquisition and 1031 inquiries.
- `FORM_ALLOWED_ORIGINS`: optional comma-separated list of permitted production origins.
- `FORM_RATE_LIMIT_MAX`: optional submissions per window; defaults to `5`.
- `FORM_RATE_LIMIT_WINDOW_MS`: optional window length; defaults to `900000`.
- `FORM_RATE_LIMIT_SALT`: optional secret used when hashing client identifiers.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`: recommended production Redis REST configuration for durable rate limiting. Without it, the handler falls back to a per-instance limiter.
- `GOOGLE_SYNC_WEBHOOK_URL`: optional private server-to-server endpoint for recording validated submissions.
- `GOOGLE_SYNC_SECRET`: optional bearer token sent only to the Google synchronization endpoint.

## Delivery behavior

1. The browser validates the journey-specific schema and sends a shared envelope containing `formType`, `inquiryType`, `sourcePage`, `startedAt`, and the form payload.
2. The server checks the request method, optional origin allowlist, honeypot, rate limit, completion timing, and the full journey-specific schema.
3. The server chooses the recipient from private environment configuration. A recipient cannot be supplied or overridden by the browser.
4. Resend sends the notification with the applicant or investor email as `reply_to`.
5. If configured, the validated record is also posted to the private Google synchronization webhook. Email remains the primary delivery path if optional synchronization is unavailable.
6. Public responses contain only a success flag or a generic error; private configuration is never returned.

## Deployment checklist

- Set `VITE_SITE_URL` to the final public origin for canonical and social metadata.
- Verify the Resend sending domain and `CONTACT_FROM_EMAIL`.
- Confirm the approved Careers and investor recipients.
- Set the production origin allowlist.
- Configure durable rate-limit storage for multi-instance production traffic.
- If Google synchronization is required, approve the destination, field retention, access policy, and secret before setting the webhook.
- Run only mocked or explicitly approved form tests. Do not send test applications or inquiries to live recipients.
- Review `LAUNCH-READINESS.md` and approve the public privacy and disclosure language before enabling production submissions.
