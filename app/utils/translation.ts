import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default async function getStaticTranslationProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "contest",
        "layout",
        "dashboard",
        "auth",
        "informations",
      ])),
    },
  };
}
