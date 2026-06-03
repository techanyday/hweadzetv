import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export const defaultHomepageSettings = {
  heroEyebrow: "Premium publishing platform",
  heroTitle: "A world-class blog website with a modern editorial experience.",
  heroDescription: `${siteConfig.name} automatically showcases featured stories, fresh posts, and popular reads while giving you a clean publishing workflow.`,
};

export type HomepageSettings = typeof defaultHomepageSettings;

export async function getHomepageSettings(): Promise<HomepageSettings> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });

  if (!settings) {
    return defaultHomepageSettings;
  }

  return {
    heroEyebrow: settings.heroEyebrow,
    heroTitle: settings.heroTitle,
    heroDescription: settings.heroDescription,
  };
}
