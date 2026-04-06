export async function getJason<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request faild with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
