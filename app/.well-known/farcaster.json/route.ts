function withValidProperties(
  properties: Record<string, undefined | string | string[]>
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) =>
      Array.isArray(value) ? value.length > 0 : !!value
    )
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL as string;
  return Response.json({
    accountAssociation: {
      // these will be added in step 5
      header: "",
      payload: "",
      signature: "",
    },
    baseBuilder: {
      allowedAddresses: [""], // add your Base Account address here
    },
    miniapp: {
      version: "1",
      name: "Photoverse",
      homeUrl: URL,
      iconUrl: `${URL}/photoverse-logo.png`,
      splashImageUrl: `${URL}/photoverse-logo.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: "",
      subtitle: "",
      description:
        "Photoverse is your online photo gallery—upload, organize, and access your photos anytime while freeing up storage space on your device.",
      screenshotUrls: [],
      primaryCategory: "utility",
      tags: ["Photos", "Folders", "Storage System"],
      heroImageUrl: "",
      tagline: "",
      ogTitle: "",
      ogDescription: "",
      ogImageUrl: "",
      noindex: true,
    },
  }); // see the next step for the manifest_json_object
}
