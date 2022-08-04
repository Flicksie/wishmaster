import {hasEnded, hasStarted, fromMonth, activeInMonth} from "./calendarOperations"

const dummyEntry = {
    year: 2020,
    month: 5,
    endYear: 2024,
    endMonth: 7,
    recurring: true
}

const dummyEntry2 = dummyEntry;
//dummyEntry2.recurring = false;

test('hasEnded', async () => {     
    expect( hasEnded(dummyEntry, 2020, 4) ).toBe(false);
    expect( hasEnded(dummyEntry, 2020, 8) ).toBe(false);
    expect( hasEnded(dummyEntry, 2019, 4) ).toBe(false);
    expect( hasEnded(dummyEntry, 2024, 5) ).toBe(false);
    expect( hasEnded(dummyEntry, 2024, 7) ).toBe(true);
    expect( hasEnded(dummyEntry, 2024, 8) ).toBe(true);
    expect( hasEnded(dummyEntry, 2025, 2) ).toBe(true);
});

test('hasStarted', async () => {     
    expect( hasStarted(dummyEntry, 2020, 4) ).toBe(false);
    expect( hasStarted(dummyEntry, 2020, 8) ).toBe(true);
    expect( hasStarted(dummyEntry, 2019, 8) ).toBe(false);
    expect( hasStarted(dummyEntry, 2024, 5) ).toBe(true);
    expect( hasStarted(dummyEntry, 2024, 7) ).toBe(true);
    expect( hasStarted(dummyEntry, 2024, 8) ).toBe(true);
    expect( hasStarted(dummyEntry, 2025, 2) ).toBe(true);
});

test('fromMonth', async () => {     
    expect( fromMonth(dummyEntry, 2019, 5) ).toBe(false);
    expect( fromMonth(dummyEntry, 2020, 5) ).toBe(true);
    expect( fromMonth(dummyEntry, 2020, 8) ).toBe(false);
    expect( fromMonth(dummyEntry, 2024, 5) ).toBe(false);
    expect( fromMonth(dummyEntry, 2024, 7) ).toBe(false);
});

test('activeInMonth', async () => {     
    expect( activeInMonth(dummyEntry, 2020, 4) ).toBe(false);
    expect( activeInMonth(dummyEntry, 2019, 4) ).toBe(false);
    expect( activeInMonth(dummyEntry, 2024, 8) ).toBe(false);
    expect( activeInMonth(dummyEntry, 2025, 2) ).toBe(false);
    expect( activeInMonth(dummyEntry, 2024, 5) ).toBe(true);
    expect( activeInMonth(dummyEntry, 2020, 8) ).toBe(true);
    expect( activeInMonth(dummyEntry, 2024, 1) ).toBe(true);
    expect( activeInMonth(dummyEntry, 2020, 5) ).toBe(true);
});
