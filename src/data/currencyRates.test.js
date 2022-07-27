import getRates from "./currencyRates"

test('Currency Rates Getter', async () => {
    let [x,y,z]= await Promise.all([getRates("USD"),getRates("PLN"),getRates("BRL")]);
    expect(x.USD).toBe(1);
    expect(y.PLN).toBe(1);
    expect(z.BRL).toBe(1);
});
