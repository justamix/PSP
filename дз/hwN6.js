function anagram(words) {
    const anagrams = {};
    words.forEach(word => {
        const sortedWord = word.split('').sort().join('');
        if (!anagrams[sortedWord]) {
            anagrams[sortedWord] = [];
        }
        anagrams[sortedWord].push(word);
    });
    const result = Object.values(anagrams).filter(group => group.length > 1).map(group => group.sort());
    result.sort((a, b) => a[0].localeCompare(b[0]));
    return result;
}
const words = ["listen", "silent", "enlist", "google", "gogole", "rat", "tar", "art"];
console.log(anagram(words));
