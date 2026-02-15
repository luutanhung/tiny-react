import { HTML_TAGS } from "../constants";

export function isHTMLTag(tag) {
  return typeof tag === "string" && HTML_TAGS.has(tag);
}
