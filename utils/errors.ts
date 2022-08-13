export function redirectHomeResponse() {
  return new Response("", {
    status: 307,
    headers: { Location: "/" },
  });
}
