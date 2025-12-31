# Your Highness Oracle

A static React application designed to be embedded in Shopify.

## Deployment

1. Build the project (or use the raw static files if bundling manually).
2. Upload to Vercel/Netlify.

## Shopify Embed

Use the following iframe code in your Shopify page/section custom liquid:

```html
<iframe 
  src="https://your-deployed-app-url.vercel.app" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  style="border:none; height: 100vh; min-height: 600px;"
  allow="fullscreen"
></iframe>
```

## Absolute Links
All product links are hardcoded to `yourhighnessla.com` and use `target="_top"` to break out of the iframe.
