import { StaticImageData } from "next/image";
import IconInstagram from "@/assets/assetsos26/sosmed/instagram.svg";
import IconTiktok from "@/assets/assetsos26/sosmed/Tiktok.svg";
import IconYoutube from "@/assets/assetsos26/sosmed/Youtube.svg";
import IconX from "@/assets/assetsos26/sosmed/X-twitter.svg";

interface SocialMediaIcon {
  name: string;
  href: string;
  iconSrc: StaticImageData | string;
  width: number;
  height: number;
}

export const iconSosmedData: SocialMediaIcon[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sos.dsi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    iconSrc: IconInstagram,
    width: 40,
    height: 40,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@sos.dsi?is_from_webapp=1&sender_device=pc",
    iconSrc: IconTiktok,
    width: 40,
    height: 40,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@sosdsi?si=KGlAA94IGYwfxIb-",
    iconSrc: IconYoutube,
    width: 40,
    height: 40,
  },
  {
    name: "X/Twitter",
    href: "https://x.com/sosdsi?s=21",
    iconSrc: IconX,
    width: 40,
    height: 40,
  },
];
