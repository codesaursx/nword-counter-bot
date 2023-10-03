export const getWordsOccurrences = (s: string, words: string[]) => {
  const regex = new RegExp(s.split(' ').join('|'), 'g');
  const matches = (words.join(',').match(regex) ?? []).filter(v => v !== '');
  console.log(matches);
  return matches.length;
};
