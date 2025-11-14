export interface RankingEntry {
    username: string;
    score: number;
}

// Generates a unique key for the current week, e.g., "ranking-2023-W42"
function getWeekKey(): string {
  const now = new Date();
  // January 1st of the current year
  const onejan = new Date(now.getFullYear(), 0, 1);
  // Day of the year (1-366)
  const dayOfYear = Math.floor((now.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  // Week number
  const week = Math.ceil(dayOfYear / 7);
  return `ranking-${now.getFullYear()}-W${week}`;
}

/**
 * Simulates fetching the weekly ranking from a server.
 * In a real app, this would be a fetch() call to your API endpoint.
 */
export async function loadRanking(): Promise<RankingEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const key = getWeekKey();
        const raw = localStorage.getItem(key);
        resolve(raw ? JSON.parse(raw) : []);
      } catch (error) {
        console.error("Failed to load ranking:", error);
        resolve([]);
      }
    }, 500); // 500ms delay to simulate network latency
  });
}


/**
 * Simulates sending a new score to the server and getting the updated ranking.
 * In a real app, this would be a POST request.
 */
export async function updateRanking(username: string, score: number): Promise<RankingEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
        try {
            const key = getWeekKey();
            const raw = localStorage.getItem(key);
            let ranking: RankingEntry[] = raw ? JSON.parse(raw) : [];

            const existing = ranking.find((r) => r.username === username);

            if (existing) {
                // Only update if the new score is higher
                if (score > existing.score) {
                existing.score = score;
                }
            } else {
                ranking.push({ username, score });
            }

            // Sort by score descending
            ranking.sort((a, b) => b.score - a.score);
            
            localStorage.setItem(key, JSON.stringify(ranking));
            resolve(ranking);
        } catch (error) {
            console.error("Failed to update ranking:", error);
            resolve([]); // On error, resolve with an empty array.
        }
    }, 500); // 500ms delay to simulate network latency
  });
}