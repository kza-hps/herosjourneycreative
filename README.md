# Hero's Journey Creative

Next.js site for Hero's Journey Creative, intended to replace the previous Shopify storefront at `https://herosjourneycreative.co.nz`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
npm run lint
npm run build
```

## Contact Form

The contact form posts to `/api/contact` and sends email through Resend when these environment variables are configured:

```bash
CONTACT_TO_EMAIL=kauri@herosjourneycreative.co.nz
CONTACT_FROM_EMAIL="Hero's Journey Creative <noreply@heroboardmaker.com>"
RESEND_API_KEY=...
```

Until those variables are configured in the hosting environment, the form shows a direct email fallback.

## Domain Migration

The app includes redirects for old Shopify surfaces such as `/products/*`, `/collections/*`, `/cart`, `/checkout/*`, `/search`, and `/policies/*`.

When ready to cut over:

1. Add `herosjourneycreative.co.nz` and `www.herosjourneycreative.co.nz` to the Vercel project.
2. Configure the DNS records Vercel recommends for the project.
3. Verify both apex and `www` serve this Next.js app.
4. Leave Shopify active until DNS and redirects are confirmed.
