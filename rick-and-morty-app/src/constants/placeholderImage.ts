// Inline fallback image. A data URI is used on purpose: when this remote is
// rendered inside the host, root-relative paths like "/placeholder.png" resolve
// against the host origin, not this remote, so a static file would not load.
export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="250" viewBox="0 0 240 250">' +
      '<rect width="240" height="250" fill="#f2f2f2"/>' +
      '<circle cx="120" cy="105" r="38" fill="#d6d6d6"/>' +
      '<rect x="60" y="160" width="120" height="50" rx="25" fill="#d6d6d6"/>' +
      '</svg>',
  );
