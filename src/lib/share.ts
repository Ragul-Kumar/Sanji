import { SITE, SPOTS_PER_INVITE } from "./site";

export function referralUrl(code: string) {
  return `${SITE.url}/r/${code}`;
}

export function referralLabel(code: string) {
  return `${SITE.shortHost}/r/${code}`;
}

export function shareMessage(code: string) {
  return `I just got my spot in line for Sanji, the art platform with no algorithm. Every kind of artist, one roof. Join with my link and we both move up ${SPOTS_PER_INVITE} spots 👉 ${referralUrl(code)}`;
}

export function shareTargets(code: string) {
  const text = encodeURIComponent(shareMessage(code));
  const url = encodeURIComponent(referralUrl(code));
  return {
    whatsapp: `https://wa.me/?text=${text}`,
    x: `https://twitter.com/intent/tweet?text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    email: `mailto:?subject=${encodeURIComponent("Saved you a spot on Sanji")}&body=${text}`,
    storyImage: `/story/${code}`,
  };
}
