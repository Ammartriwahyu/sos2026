import type { Metadata } from "next";
import TeamProfileContainer from "@/feature/(user)/team-profile/container/TeamProfileContainer";
import { siteConfig } from "@/shared/utils/metadata";

const description =
  "Kenalan dengan tim developer web Synergy of Symphony 2026: UI/UX Designer, Front End Developer, dan Back End Developer di balik website ospek Departemen Sistem Informasi Universitas Brawijaya.";

export const metadata: Metadata = {
  title: "Tim Developer",
  description,
  openGraph: {
    title: `Tim Developer | ${siteConfig.shortName}`,
    description,
    url: `${siteConfig.url}team-profile`,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
  },
};

const page = () => {
  return <TeamProfileContainer />;
};

export default page;
