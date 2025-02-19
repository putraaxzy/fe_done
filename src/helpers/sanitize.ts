export function sanitizeDescription(html: string): string {
  if (typeof window === 'undefined') return html;
  const parser = new DOMParser();
  // Parse the HTML string
  const doc = parser.parseFromString(html, 'text/html');
  // Remove all <button> tags and their content
  const buttons = doc.querySelectorAll('button');
  buttons.forEach(btn => btn.remove());
  // Return sanitized HTML as a plain string.
  return doc.body.innerHTML;
}
