import { useInjectsStore } from "@/stores/useInjects.store.ts";

export function useQuerySettings() {
  const { lang, uuid } = useInjectsStore();

  const URL = `${import.meta.env.VITE_ENDPOINT}/widget/project/${uuid}/config_${lang}.json`;

  async function fetchConfig() {
    const configResponse = await fetch(URL, {
      headers: {
        "Accept-Language": lang,
      },
    });

    if (!configResponse.ok) {
      throw new Error(
        `Failed to fetch config data: ${configResponse.statusText}`,
      );
    }

    return await configResponse.json();
  }

  return {
    fetchConfig,
  };
}
