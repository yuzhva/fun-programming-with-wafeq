export function copyToClipboard(data) {
  window.navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
    // TODO:
  });
}