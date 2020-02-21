import fetch from "isomorphic-unfetch";

export const fetcher = async (path: string) => {
  try {
    const res = await fetch(path);
    const json = await res.json();
    return json;
  } catch (error) {
    return error;
  }
};
