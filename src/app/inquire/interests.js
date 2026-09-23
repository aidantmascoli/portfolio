// Shared by the form, the server action and the email templates.
// `hex` values are the 500 shades from the theme in src/app/hero.mjs.
export const interests = [
    {key: "webdev", label: "Web Development", color: "orange", hex: "#FFA03B"},
    {key: "video", label: "Videography", color: "yellow", hex: "#FAD642"},
    {key: "music", label: "Music", color: "green", hex: "#BDEF40"},
    {key: "performance", label: "Performance", color: "blue", hex: "#45D1EE"},
    {key: "other", label: "Other", color: "violet", hex: "#C851EA"},
];

export const interestKeys = interests.map((i) => i.key);

export const getInterests = (keys) => interests.filter((i) => keys.includes(i.key));
