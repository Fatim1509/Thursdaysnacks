const axios = require('axios');

/**
 * AniList Service
 * Handles all communication with AniList GraphQL API
 * API Documentation: https://anilist.gitbook.io/anilist-apiv2-docs/
 */

const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Make a GraphQL request to AniList
 */
const anilistRequest = async (query, variables = {}) => {
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('AniList API Error:', error.message);
    throw new Error('Failed to fetch data from AniList');
  }
};

/**
 * Get trending anime
 */
const getTrendingAnime = async () => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
            extraLarge
          }
          averageScore
          genres
          startDate {
            year
            month
            day
          }
          trailer {
            id
            site
          }
          externalLinks {
            site
            url
          }
        }
      }
    }
  `;
  
  const data = await anilistRequest(query);
  return data.Page.media;
};

/**
 * Get popular anime
 */
const getPopularAnime = async () => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
            extraLarge
          }
          averageScore
          genres
          startDate {
            year
            month
            day
          }
          trailer {
            id
            site
          }
          externalLinks {
            site
            url
          }
        }
      }
    }
  `;
  
  const data = await anilistRequest(query);
  return data.Page.media;
};

/**
 * Get anime details by ID
 */
const getAnimeDetails = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          large
          extraLarge
        }
        averageScore
        genres
        startDate {
          year
          month
          day
        }
        episodes
        duration
        status
        trailer {
          id
          site
        }
        externalLinks {
          site
          url
          language
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  `;
  
  const data = await anilistRequest(query, { id: parseInt(id) });
  return data.Media;
};

/**
 * Search anime
 */
const searchAnime = async (searchQuery) => {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, search: $search) {
          id
          title {
            romaji
            english
          }
          description
          coverImage {
            large
            extraLarge
          }
          averageScore
          genres
          startDate {
            year
            month
            day
          }
          trailer {
            id
            site
          }
          externalLinks {
            site
            url
          }
        }
      }
    }
  `;
  
  const data = await anilistRequest(query, { search: searchQuery });
  return data.Page.media;
};

/**
 * Format anime date
 */
const formatAnimeDate = (startDate) => {
  if (!startDate || !startDate.year) return 'Unknown';
  
  const { year, month, day } = startDate;
  if (month && day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else if (month) {
    return `${year}-${String(month).padStart(2, '0')}`;
  }
  return String(year);
};

/**
 * Get trailer URL from anime data
 */
const getAnimeTrailerUrl = (trailer) => {
  if (!trailer || !trailer.id) return null;
  
  if (trailer.site === 'youtube') {
    return `https://www.youtube.com/watch?v=${trailer.id}`;
  }
  
  return null;
};

/**
 * Extract legal streaming platforms
 */
const getAnimeProviders = (externalLinks) => {
  if (!externalLinks || externalLinks.length === 0) return [];
  
  // List of known legal streaming platforms
  const legalPlatforms = [
    'Crunchyroll',
    'Funimation',
    'Netflix',
    'Hulu',
    'Amazon',
    'Hidive',
    'VRV',
    'Disney Plus',
    'HBO Max'
  ];
  
  const providers = externalLinks
    .filter(link => legalPlatforms.some(platform => 
      link.site.toLowerCase().includes(platform.toLowerCase())
    ))
    .map(link => link.site);
  
  // Remove duplicates
  return [...new Set(providers)];
};

module.exports = {
  getTrendingAnime,
  getPopularAnime,
  getAnimeDetails,
  searchAnime,
  formatAnimeDate,
  getAnimeTrailerUrl,
  getAnimeProviders
};
