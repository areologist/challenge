import tokenize from '../tokenize';

it('ignores invalid characers', () => {
  const str = '~!@#$%^&*()_+`-=[]{}\';:"/?.>,<';
  expect(tokenize(str)).toEqual([]);
});

it('splits on spaces', () => {
  const str = 'this rocks it';
  expect(tokenize(str)).toEqual(['this', 'rocks', 'it']);
});

it('converts to lower case', () => {
  const str = 'This rOcks IT';
  expect(tokenize(str)).toEqual(['this', 'rocks', 'it']);
});

it('handles repeated whitespace', () => {
  const str = ' this  is      a    test  ';
  expect(tokenize(str)).toEqual(['this', 'is', 'a', 'test']);
});
