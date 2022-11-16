import { getOtdDate } from './helper';

export const getOtdUrl = () => {
  const { month, day } = getOtdDate();

  // const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`;
  // const url = `https://httpstat.us/400`;
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  return url;
}

export const fetchOnThisDay = async () => {
  const response = await fetch(getOtdUrl());
  return await response.json();
}
