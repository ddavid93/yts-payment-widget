import { useInject } from "@/composables/useInject.ts";
import { tempResponseSettings } from "@/composables/tempResponseSettings.ts";

export function useQuerySettings() {
  const { lang, uuid } = useInject();

  const URL = `${import.meta.env.VITE_ENDPOINT}/widget/project/${uuid}/config_${lang}.json`;

  async function fetchConfig() {
    const configResponse = await window.fetch(URL, {
      headers: {
        "Accept-Language": lang,
      },
    });

    // if (!configResponse.ok) {
    //   throw new Error(
    //     `Failed to fetch config data: ${configResponse.statusText}`,
    //   );
    // }

    // return await configResponse.json();
    return tempResponseSettings;
  }

  return {
    fetchConfig,
  };
}
