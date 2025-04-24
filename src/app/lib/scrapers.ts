import { ApifyClient } from "apify-client";

const client = new ApifyClient({
  token: process.env.APIFY_API_TOKEN || "",
});

export async function runAllScrapers(username: string) {
  const scrapers = [
    {
      platform: "youtube",
      actorId: "h7sDV53CddomktSi5",
      input: {
        searchQueries: [username],
        maxResults: 1,
        maxResultsShorts: 0,
        maxResultStreams: 0,
        startUrls: [],
        subtitlesLanguage: "any",
        subtitlesFormat: "srt",
      },
    },
    {
      platform: "instagram",
      actorId: "shu8hvrXbJbY3Eb9W",
      input: {
        directUrls: [`https://www.instagram.com/${username}/`],
        resultsType: "posts",
        resultsLimit: 1,
        addParentData: false,
      },
    },
    {
      platform: "tiktok",
      actorId: "OtzYfK1ndEGdwWFKQ",
      input: {
        profiles: [username],
        resultsPerPage: 1,
        profileScrapeSections: ["videos"],
        profileSorting: "latest",
        excludePinnedPosts: false,
        maxProfilesPerQuery: 10,
        shouldDownloadVideos: false,
        shouldDownloadCovers: false,
        shouldDownloadSubtitles: false,
        shouldDownloadSlideshowImages: false,
      },
    },
  ];

  const results = await Promise.allSettled(
    scrapers.map(async ({ platform, actorId, input }) => {
      try {
        const run = await client.actor(actorId).call(input);
        const { items } = await client
          .dataset(run.defaultDatasetId)
          .listItems();
        return { platform, items };
      } catch (error) {
        return {
          platform,
          items: [],
          error: error instanceof Error ? error.message : "Error al scrapear",
        };
      }
    })
  );

  return results.map((res) =>
    res.status === "fulfilled"
      ? res.value
      : { platform: "unknown", items: [], error: res.reason }
  );
}
