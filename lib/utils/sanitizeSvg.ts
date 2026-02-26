/**
 * Sanitizes SVG content by removing potentially dangerous elements and attributes
 * that could execute scripts or perform XSS attacks.
 */
export const sanitizeSvg = async (file: File): Promise<File> => {
  if (file.type !== "image/svg+xml") {
    return file;
  }

  const text = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "image/svg+xml");

  // Check for parsing errors
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    throw new Error("Invalid SVG file");
  }

  // Remove dangerous elements
  const dangerousElements = [
    "script",
    "iframe",
    "object",
    "embed",
    "foreignObject",
    "use",
  ];

  dangerousElements.forEach((tagName) => {
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
      el.remove();
    });
  });

  const allElements = doc.querySelectorAll("*");
  allElements.forEach((element) => {
    // Remove all event handler attributes (any attribute starting with "on")
    const attributesToRemove: string[] = [];
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (attr.name.toLowerCase().startsWith("on")) {
        attributesToRemove.push(attr.name);
      }
    }
    attributesToRemove.forEach((attr) => element.removeAttribute(attr));

    // Check href and xlink:href for javascript: protocol
    ["href", "xlink:href"].forEach((attr) => {
      const value = element.getAttribute(attr);
      if (value && value.trim().toLowerCase().startsWith("javascript:")) {
        element.removeAttribute(attr);
      }
    });

    // Remove data URIs that might contain scripts
    const dataUriAttrs = ["href", "xlink:href", "src"];
    dataUriAttrs.forEach((attr) => {
      const value = element.getAttribute(attr);
      if (value) {
        const lowerValue = value.trim().toLowerCase();
        if (
          lowerValue.startsWith("data:") &&
          (lowerValue.includes("script") || lowerValue.includes("javascript"))
        ) {
          element.removeAttribute(attr);
        }
      }
    });
  });

  // Serialize back to string
  const serializer = new XMLSerializer();
  const sanitizedSvg = serializer.serializeToString(doc);

  // Create new File object with sanitized content
  const blob = new Blob([sanitizedSvg], { type: "image/svg+xml" });
  return new File([blob], file.name, {
    type: "image/svg+xml",
    lastModified: file.lastModified,
  });
};

/**
 * Sanitizes an array of files, processing SVG files and leaving others unchanged
 */
export const sanitizeFiles = async (files: File[]): Promise<File[]> => {
  return Promise.all(files.map((file) => sanitizeSvg(file)));
};
