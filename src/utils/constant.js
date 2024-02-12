import sanitizeHtml from "sanitize-html";

export const PAGE_SIZE = 20;
export const regexNumber = /^\d{4}$/;
export const htmlFrom = (htmlString) => {
  const cleanHtmlString = sanitizeHtml(htmlString);
  // const html = JSON.parse(cleanHtmlString, {});
  return cleanHtmlString;
};
