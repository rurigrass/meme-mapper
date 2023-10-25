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

export function distanceToScore(distanceInKm: number) {
  // console.log("DA DISTANCE ", distanceInKm);
  let score = 0;

  // Check for special cases
  if (distanceInKm <= 0.05) {
    score = 5000;
    // return 5000; // Full score for distances less than or equal to 0.05 km
  } else if (distanceInKm >= 10000) {
    score = 0;
    // return 0; // Score is 0 for distances greater than or equal to 10000 km
  } else if (distanceInKm <= 0.1) {
    // Linear interpolation for scores between 0.05 and 0.1 km
    score = 5000 - (distanceInKm - 0.05) * 10000;
    // return 5000 - (distanceInKm - 0.05) * 10000;
  } else if (distanceInKm <= 0.15) {
    // Linear interpolation for scores between 0.1 and 0.15 km
    score = 4999 - (distanceInKm - 0.1) * 5000;
    // return 4999 - (distanceInKm - 0.1) * 5000;
  } else {
    // Linear interpolation for scores between 0.15 and 10000 km
    score = Math.max(0, 5000 - (distanceInKm - 0.15) * 3000);
    // return Math.max(0, 5000 - (distanceInKm - 0.15) * 3000);
  }

  console.log(distanceInKm);

  console.log(score);

  return score;
}
