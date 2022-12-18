import * as fs from 'fs';

import { domains } from '$domains';

interface IConfig {
  outdir: string;
  fileName?: string;
}

export async function generateSiteData(config: IConfig): Promise<void> {
  const { outdir, fileName = 'site-data' } = config;

  try {
    const { personalInformation, ...rest } =
      await domains.siteData.querySiteData();

    const { profilePic, ...restPersonalInfo } = personalInformation;
    /**
     * Ensure of having both default seo locales
     */
    const finalData = {
      ...rest,
      personalInformation: {
        profilePic: {
          ...profilePic,
          url: `${profilePic.url}?w=128&h=128`,
        },
        ...restPersonalInfo,
      },
    };

    const filePath = `${outdir}/${fileName}.json`;

    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

    console.log(`Site data generated at "${filePath}"`);
  } catch (error) {
    console.error('Something went wrong while generating site-data');
    throw error;
  }
}
