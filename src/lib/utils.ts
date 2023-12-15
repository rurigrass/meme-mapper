import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

//merges tailwind components || improves performance
//for example: my-2 mx-2 -> m-2
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}} month",
  xMonths: "{{count}} month",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

type Coordinates = {
  lat: number;
  lng: number;
};
// 1 is actual, 2 is guess
export function haversineDistance(
  actualCoordinates: Coordinates,
  guessCoordinates: Coordinates
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (guessCoordinates.lat - actualCoordinates.lat) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (guessCoordinates.lng - actualCoordinates.lng) * (Math.PI / 180); // Convert degrees to radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(actualCoordinates.lat * (Math.PI / 180)) *
      Math.cos(guessCoordinates.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// export function distanceToScore(distanceInKm: number) {
//   if (distanceInKm <= 0.05) {
//     return 5000; // Full score for distances less than or equal to 0.05 km
//   } else if (distanceInKm >= 10000) {
//     return 0; // Score is 0 for distances greater than or equal to 10000 km
//   } else {
//     return Math.round(4999 - (distanceInKm - 0.05) * (4998 / 9999));
//   }
// }

export function distanceToScore(distanceInKm: number) {
  if (distanceInKm <= 0.05) {
    return 5000; // Full score for distances less than or equal to 0.05 km
  } else if (distanceInKm >= 10000) {
    return 0; // Score is 0 for distances greater than or equal to 10000 km
  } else if (distanceInKm <= 1000) {
    // Linear interpolation for scores between 0.05 and 1000 km
    return Math.round(3000 + (4999 - 3000) * (1 - distanceInKm / 1000));
  } else {
    // Linear interpolation for scores between 1001 km and 9999 km
    return Math.round(1 + (2999 - 1) * (1 - (distanceInKm - 1001) / 8998));
  }
}

export const calculateZoom = (distance: number): number => {
  // Adjust these factors based on your preferences
  const maxZoom = 180;
  const maxDistanceForMaxZoom = 4000; // Adjust based on your requirements

  // Calculate zoom based on distance using a linear scale
  const zoom = (maxZoom * distance) / maxDistanceForMaxZoom;

  // Ensure the calculated zoom is not greater than the maxZoom
  return Math.min(maxZoom, zoom);
};
