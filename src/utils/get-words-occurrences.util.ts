export const getWordsOccurrences = (s: string, words: string[]) => {
  const regex = new RegExp(words.join('|'), 'g');
  const matches = (s.match(regex) ?? []).filter(v => v !== '');

  return matches.length;
};
