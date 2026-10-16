# Gala CRE Structured Form Integration

Careers and investor-sourcing forms share the browser contract in `src/lib/formSubmission.ts` and submit to the private Vercel Function at `api/forms.ts`. General Contact, property inquiry, and service consultation forms submit to `api/contact.ts`. Both endpoints validate server-side and apply the same origin allowlist and client rate-limit controls before delivery.

## Private environment configuration

Configure these only in the server/deployment environment. None should use the `VITE_` prefix.

- `RESEND_API_KEY`: Resend server API key.
- `CONTACT_FROM_EMAIL`: verified sender used for form notifications.
- `CONTACT_TO_EMAIL`: private recipient for every non-listing Contact and service consultation inquiry. Approved routing: `beth@galainvestments.io`.
- `ADVISOR_GAURANG_EMAIL`, `ADVISOR_LEIGH_EMAIL`, and `ADVISOR_GOVERDHAN_EMAIL`: private recipients for property-listing inquiries assigned to each advisor. These values are resolved server-side from an approved advisor id and cannot be supplied by the browser.
- `CAREERS_TO_EMAIL`: comma-separated private recipients for commercial-agent applications. Approved routing: `beth@galainvestments.io`.
- `INVESTOR_TO_EMAIL`: comma-separated private recipients for acquisition and 1031 inquiries. Approved routing: `beth@galainvestments.io`.
- `FORM_ALLOWED_ORIGINS`: optional comma-separated list of permitted production origins.
- `FORM_RATE_LIMIT_MAX`: optional submissions per window; defaults to `5`.
- `FORM_RATE_LIMIT_WINDOW_MS`: optional window length; defaults to `900000`.
- `FORM_RATE_LIMIT_SALT`: optional secret used when hashing client identifiers.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`: recommended production Redis REST configuration for durable rate limiting. Without it, the handler falls back to a per-instance limiter.
- `GOOGLE_SYNC_WEBHOOK_URL`: optional private server-to-server endpoint for recording validated submissions.
- `GOOGLE_SYNC_SECRET`: optional bearer token sent only to the Google synchronization endpoint.

## Delivery behavior

1. The browser validates the journey-specific schema and sends a shared envelope containing `formType`, `inquiryType`, `sourcePage`, `startedAt`, and the form payload.
2. The server checks the request method, optional origin allowlist, honeypot, rate limit, and the applicable server-side schema. Careers and investor-sourcing submissions also receive completion-timing validation.
3. The server chooses and validates the recipient list from private environment configuration. A property inquiry with both a property slug and approved advisor id routes only to that listing advisor; every other submission routes to Beth. Recipients cannot be supplied or overridden by the browser.
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
