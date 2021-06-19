const countries = require('./countries');


test('Returns empty [] if passed  an empty string', () => {
    expect(
        countries.find('')
    ).toStrictEqual([]);
});

test('The array that it returns contains <= 4 matches', () => {
    expect(
        countries.find('Ma')
    ).toStrictEqual([
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives"]);
});

test('The search is case insensitive', () => {
    expect(
        countries.find('gErMaNy')
    ).toStrictEqual(["Germany"]);
});


test('If there are no matching countries, an empty array is returned', () => {
    expect(
        countries.find('LKJHGlahefh')
    ).toStrictEqual([]);
});
