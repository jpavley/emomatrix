# Emomatrix

Inspired by matrix title sequence but with emoji.

## Motivation


One of the best title sequences of all time opened the first Matrix movie[1]. 
It really set the stage for whole move. 

The characters that rain down are sequence are Japanese, scanned from a cookbook[2]. 
Anyone with a background in printing characters a compouter monitor in the 1990s knows 
that our computer operating systems, software, and hardware, were originally designed 
for a small subset of English language letters, numbers, and symbols. Support for 
non-western characters like Japanese or even Russian Cyrilic had to be bolted on.

Todays computers have full support for millions of characters, western, eastern, and 
historical. You can type in Japanese and Cyrilic as easily as you can in English thanks 
to innovations like Unicode[3] and the modern Linux, Microsoft, Google, and Apple 
operating systems.

If the designer of the Matrix title sequence, Simon Whiteley, had to do it over with 
Unicode characters, I bet he would use another characterset created in Japan: Emoji. 
Billions of smartphone and computer users communicate with emojis every minuet of every 
day! Each emoji character is a technogical and artistic mircle. So that you can type a 👍 
or a 😀 hundreds of computer engineers and graphic desginers collaborated in a loosely 
coupled and decentralized manner. Unicode and Emoji standards have been shared 
across the kind of geopolicial and corporate boundries that are usually tightly closed.

There is a lot that is wrong with the internet and world wide web. Unicode and Emoji are
a bright spot, a technology that has enable better and inclusive communciation without
exploitation. 

## How I did it

I'm not an expert in HTML5 Canvas but I know engough to be dangerious. I was delighted to
find that drawing to an canvas is simple and standard. For a guy who learned to program
in the 80's and 90's I instantly recognised the core concepts (contex, paths, cliping, 
tranforms) and found great documention[4].

### How I did it specically

The code is open sourced and you are free to play around and reuse it (as long as you 
follow the MIT license).

Let me give you a tour of each file:

#### Emoji.js

I got the full list of emoji from Unicode.org and copied the codepoints for the
green ones. There are hundreds of great emoji! The Matrix uses a greenish tone 
for scenes that takeplace online. So I had to go with green emoji.

If you want to learn more about using emoji with JavaScipt this blog post is your 
friend: https://www.kirupa.com/html5/emoji.htm

The key to drop the "U+" from the front of the codepoint value and replace it 
with "0x". Codepoints are expressed as hexadecimals because 1F34F is somehow easier 
to write than 127823. (I mean it is for low level programmers but we're writting in
Javascript!) "Ox" marks a number as expressed in hex in most programming languages.

I was mistified by the "U+" suffix until I learned that it identifies a number as 
a Unicode codepoint[5]. So it's bit of branding.

Note that each emoji looks different on diffent apps and operating system. Some of 
the green emoji might be difference colors on your machine. This inconsistency is
price of freedom.

#### Grafix.js

I like to write as little code and us as much open source as possible when
writting production code. But I like to write all the code, poorly, myself, when I
am learning. So, I wrote this little HTML5 Canvas graphics library. It is buggy,
ill thought out, and definately a work in progress. This way, if I ever do write,
or more likely review, a commercial HTML5 Canvas app I'll know where the bodies
are burried.

The core of Grafix.js are set of wrapper functions for drawing primitives (lines, 
text) that are then aggregateed into higher level concepts like a grid and a text
bounding box. One important job of each primitive grafix function is to call
save() and restore() so that the canvas context remains predicable between
drawing operations.

Grafix.js is pretty dumb at the moment but may get smart as I improve it and 
evenutally thrown away in favor of something like Frabricjs[6].

#### Index.html

The job of Index.html is to be the entry point, do as little as possible, and 
get out of the way.

There are four important HTML5 functions that Index.html implements: viewport,
charset, margin, and module.
- Viewport, a meta attribute, ensures the page content is sized to fill the 
screen.
- Charset, another meta attribute, ensures that emoji characters are property
displayed on the page.
- Margin, a CSS page property, just need to be set to 0 so the canvas can fill
the page edge to edge.
- Module, a script tag attribute, enables the loading of Javascript modules so
all the code doesn't need to be in one file.

I could have put a lot more into Index.js as hardcoded HTML but instead I opted
to do the rest of the work of building the page in the associated Javascript
file.

#### Index.js

TBD












[1] https://youtu.be/kIXNpePYzZU
[2] https://www.cnet.com/news/lego-ninjago-movie-simon-whiteley-matrix-code-creator/
[3] https://home.unicode.org
[4] https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[5] http://unicode.org/mail-arch/unicode-ml/y2005-m11/0060.html
[6] http://fabricjs.com