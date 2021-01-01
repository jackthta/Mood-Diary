export interface Mood {
    mood: string;
    moodColor: string;
}

export const Moods = [
    {
        value: null,
        viewValue: ''
    },
    {
        value: 'POSITIVE',
        viewValue: 'Positive :)'
    },
    {
        value: 'NEUTRAL',
        viewValue: 'Neutral :|'
    },
    {
        value: 'NEGATIVE',
        viewValue: 'Negative :('
    }
];