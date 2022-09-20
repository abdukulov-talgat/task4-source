export const unicodeDecodeB64 = (str: string) => {
  return decodeURIComponent(atob(str));
}
