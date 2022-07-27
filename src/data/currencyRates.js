const BASE_URL = "https://api.exchangerate.host/latest";

export default function getRates(base) {
  const BASE_CURR = base || "PLN";
  const URL = `${BASE_URL}?base=${BASE_CURR}`;
  return new Promise(async (resolve, reject) =>
    fetch(URL)
      .then((res) => res.json().then(({ rates }) => resolve(rates)))
      .catch(reject)
  );
}