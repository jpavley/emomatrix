/**
 * Emoji.js
 * A library of emoji data and functions.
 */

export const fullEmojiList = "https://unicode.org/emoji/charts/full-emoji-list.html#1f9d1_200d_1f3a4";

export const greenEmojiCodepoints = [
    // Smilies
    0x1F92E, // Face Vomiting
    0x1F922, // Nauseated Face
    0x1F911, // Money Mouth Face
    
    // Fruit and Veggies
    0x1F34F, // Green Apple
    0x1F966, // Broccoli
    0x1F952, // Cucumber
    0x1F957, // Green Salad
    0x1F951, // Avocado
    0x1F95D, // Kiwi
    0x1F96C, // Leafy Green
    0x1F348, // Melon
    0x1F350, // Pear
    0x1F33D, // Ear of Corn
    0x1FAD2, // Olive
    0x1FAD1, // Bell Pepper
    // Drinks
    0x1F37E, // Bottle with Popping Cork
    0x1F378, // Cocktail Glass
    0x1F9C3, // Beverage Box
    // Symbols
    0x1F49A, // Green Heart
    0x1F384, // Chritmas Tree
    0x1F38B, // Tanabata Tree
    0x1F530, // Japanese Beginner
    0x1F22F, // Japanese Reserved Button
    // Things
    0x1F4D7, // Green Book
    0x1F52B, // Water Pistol
    0x1FA9B, // Screwdriver
    0x1F9EA, // Test Tube
    0x1F9FC, // Soap
    // People
    0x1F9DA, // Fairy
    0x1F9DF, // Zombie
    // Animals
    0x1F40E, // Horse
    0x1F99A, // Peacock
    0x1F99C, // Parrot
    0x1F438, // Frog
    0x1F40A, // Crocodile
    0x1F422, // Turtle
    0x1F98E, // Lizard
    0x1F40D, // Snake
    0x1F409, // Dragon
    0x1F996, // T-Rex
    // Bugs
    0x1F41B, // Bug
    0x1FAB2, // Beetle
    0x1F9A0, // Microbe
    // Plants
    0x1F331, // Seedling
    0x1FAB4, // Potted Plan
    0x1F332, // Evergreen Tree
    0x1F334, // Palm Tree
    0x1F335, // Cactus
    0x1F33E, // Sheaf of Rice
    0x1F33F, // Herb
    0x1F340, // Four Leaf Clover
    // Automobiles
    0x1F69B, // Articulated Truck
    // Boats
    0x1F6F6, // Canoe
    // Sports
    0x1F94E, // Softball
    0x1F3BE, // Tennis
    // Games
    0x1FA80, // yo-yo
    0x1F9E9, // Puzzle Piece
    // Clothing
    0x1F9E4, // Glove
    0x1FA72, // Briefs
    0x1FA74, // Thong  Sandal
    0x1F452, // Woman's Hat
    0x1FA96, // Military Helmet
    // Computer and Eletronics
    0x1F50B, // Battery
    // Money
    0x1F4B4, // Yen Banknote
    0x1F4B5, // Dollar Banknote
    0x1F4B6, // Euro Banknote
    0x1F4B8, // Money with Wings
];

export const emojiProps = {
    codePoint: 0x0000,
    category: '',
    description: '',
    color: ''
};

export const emojiTable = [

    // A (mostly faces)

    {codePoint: 0x1F92E, category: 'a', description: 'vomiting',    color: 'green'},
    {codePoint: 0x1F922, category: 'a', description: 'nauseated',   color: 'green'},
    {codePoint: 0x1F911, category: 'a', description: 'money Mouth', color: 'green'},

    {codePoint: 0x1F975, category: 'a', description: 'hot',          color: 'red'},
    {codePoint: 0x1F621, category: 'a', description: 'pouting',      color: 'red'},
    {codePoint: 0x1F92C, category: 'a', description: 'symbol mouth', color: 'red'},

    {codePoint: 0x1F976, category: 'a', description: 'cold',         color: 'blue'},
    {codePoint: 0x1F630, category: 'a', description: 'anxious',      color: 'blue'},
    {codePoint: 0x1F631, category: 'a', description: 'screaming',    color: 'blue'},

    {codePoint: 0x1F600, category: 'a', description: 'grinning',     color: 'yellow'},
    {codePoint: 0x1F929, category: 'a', description: 'star struck',  color: 'yellow'},
    {codePoint: 0x1F61b, category: 'a', description: 'tongue',       color: 'yellow'},

    // B (mostly food)

    {codePoint: 0x1F34F, category: 'b', description: 'green apple', color: 'green'},
    {codePoint: 0x1F966, category: 'b', description: 'broccoli',    color: 'green'},
    {codePoint: 0x1F952, category: 'b', description: 'cucumber',    color: 'green'},
    {codePoint: 0x1F951, category: 'b', description: 'avocado',     color: 'green'},
    {codePoint: 0x1F95D, category: 'b', description: 'kiwi',        color: 'green'},
    {codePoint: 0x1F350, category: 'b', description: 'pear',        color: 'green'},
    {codePoint: 0x1FAD2, category: 'b', description: 'olive',        color: 'green'},

    {codePoint: 0x1F349, category: 'b', description: 'watermelon', color: 'red'},
    {codePoint: 0x1F34E, category: 'b', description: 'red apple',  color: 'red'},
    {codePoint: 0x1F352, category: 'b', description: 'cherries',   color: 'red'},
    {codePoint: 0x1F353, category: 'b', description: 'strawberry', color: 'red'},
    {codePoint: 0x1F345, category: 'b', description: 'tomato',     color: 'red'},
    {codePoint: 0x1F336, category: 'b', description: 'hot pepper', color: 'red'},
    {codePoint: 0x1F344, category: 'b', description: 'mushroom',   color: 'red'},

    {codePoint: 0x1F347, category: 'b', description: 'grapes',      color: 'blue'},
    {codePoint: 0x1FAD0, category: 'b', description: 'blueberries', color: 'blue'},
    {codePoint: 0x1F346, category: 'b', description: 'eggplant',    color: 'blue'},
    {codePoint: 0x1F9CA, category: 'b', description: 'ice',         color: 'blue'},
    {codePoint: 0x1F30D, category: 'b', description: 'earth',       color: 'blue'},
    {codePoint: 0x1F310, category: 'b', description: 'globe',       color: 'blue'},
    {codePoint: 0x1F5FA, category: 'b', description: 'map',         color: 'blue'},

    {codePoint: 0x1F34B, category: 'b', description: 'lemon',    color: 'yellow'},
    {codePoint: 0x1F34C, category: 'b', description: 'banana',   color: 'yellow'},
    {codePoint: 0x1F33D, category: 'b', description: 'corn',     color: 'yellow'},
    {codePoint: 0x1F9C0, category: 'b', description: 'cheese',   color: 'yellow'},
    {codePoint: 0x1F32E, category: 'b', description: 'taco',     color: 'yellow'},
    {codePoint: 0x1F9C8, category: 'b', description: 'butter',   color: 'yellow'},
    {codePoint: 0x1F95F, category: 'b', description: 'dumpling', color: 'yellow'},

    // C (mostly symbols)

    {codePoint: 0x1F49A, category: 'c', description: 'green heart', color: 'green'},
    {codePoint: 0x1F384, category: 'c', description: 'chritmas tree', color: 'green'},
    {codePoint: 0x1F38B, category: 'c', description: 'tanabata tree', color: 'green'},
    {codePoint: 0x1F530, category: 'c', description: 'japanese beginner', color: 'green'},
    {codePoint: 0x1F22F, category: 'c', description: 'japanese reserved button', color: 'green'},

    {codePoint: 0x1F494, category: 'c', description: 'broken heart', color: 'red'},
    {codePoint: 0x1F4AF, category: 'c', description: '100', color: 'red'},
    {codePoint: 0x1F339, category: 'c', description: 'rose', color: 'red'},
    {codePoint: 0x1F33A, category: 'c', description: 'hibiscus', color: 'red'},
    {codePoint: 0x1F35F, category: 'c', description: 'french fries', color: 'red'},

    {codePoint: 0x1F499, category: 'c', description: 'blue heart', color: 'blue'},
    {codePoint: 0x1F4A6, category: 'c', description: 'sweat',      color: 'blue'},
    {codePoint: 0x1F4A4, category: 'c', description: 'zzz',        color: 'blue'},
    {codePoint: 0x26F2, category:  'c', description: 'fountain',   color: 'blue'},
    {codePoint: 0x1F694, category: 'c', description: 'police car', color: 'blue'},

    {codePoint: 0x1F49B, category: 'c', description: 'yellow heart',  color: 'yellow'},
    {codePoint: 0x1F596, category: 'c', description: 'vulcan salute', color: 'yellow'},
    {codePoint: 0x1F33B, category: 'c', description: 'sunflower',     color: 'yellow'},
    {codePoint: 0x1F37A, category: 'c', description: 'beer mug',      color: 'yellow'},
    {codePoint: 0x1F3FA, category: 'c', description: 'amphora',       color: 'yellow'},

    // D (mostly things)

    {codePoint: 0x1F4D7, category: 'd', description: 'green book',   color: 'green'},
    {codePoint: 0x1F52B, category: 'd', description: 'water pistol', color: 'green'},
    {codePoint: 0x1FA9B, category: 'd', description: 'screwdriver',  color: 'green'},
    {codePoint: 0x1F9EA, category: 'd', description: 'test tube',    color: 'green'},
    {codePoint: 0x1F9FC, category: 'd', description: 'soap',         color: 'green'},

    {codePoint: 0x1FD4F, category: 'd', description: 'closed book',   color: 'red'},
    {codePoint: 0x260E,  category: 'd', description: 'telephone',     color: 'red'},
    {codePoint: 0x1F3FF, category: 'd', description: 'paper lantern', color: 'red'},
    {codePoint: 0x1F58D, category: 'd', description: 'crayon',        color: 'red'},
    {codePoint: 0x1F4CF, category: 'd', description: 'pushpin',       color: 'red'},

    {codePoint: 0x1F4D8, category: 'd', description: 'blue book',    color: 'blue'},
    {codePoint: 0x1F48E, category: 'd', description: 'gem stone',    color: 'blue'},
    {codePoint: 0x1F9E2, category: 'd', description: 'billed cap',   color: 'blue'},
    {codePoint: 0x1F9FF, category: 'd', description: 'nazar amulet', color: 'blue'},
    {codePoint: 0x1F48D, category: 'd', description: 'ring',         color: 'blue'},

    {codePoint: 0x1F4D2, category: 'd', description: 'ledger',     color: 'yellow'},
    {codePoint: 0x1F4A1, category: 'd', description: 'light bulb', color: 'yellow'},
    {codePoint: 0x1F514, category: 'd', description: 'bell',       color: 'yellow'},
    {codePoint: 0x1F4B0, category: 'd', description: 'money bag',  color: 'yellow'},
    {codePoint: 0x270F,  category: 'd', description: 'pencil',     color: 'yellow'},

];