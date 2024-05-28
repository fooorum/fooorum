import sha1 from "sha1";

export async function getBreaches(password: string) {
  const hash = sha1(password).toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
  );
  const body = await response.text();
  const hashes = body.split("\r\n");
  console.log(hashes);
  const match = hashes.find((h) => suffix === h.split(":")[0]);
  console.log(match);
  if (!match) return 0;
  return parseInt(match?.split(":")[1]);
}
