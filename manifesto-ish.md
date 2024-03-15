# Recess Manifesto-ish

The idea that sat inside the bottom drawer for months and eventually became Recess was "social media for blogs" (also expressed later as "connecting personal websites"). That was the original term I had in mind for what I envisioned this to be.

There are a lot of influences that got me to this point. One is that my relationship with social media has always been a shaky one. I cut myself off from it entirely during some of my core young years (20-23 years old) and currently am on it with mixed feelings. I do want to interact and keep in touch with people but I struggle to fight against the pervasive patterns a lot of these platforms are built with that mess with me. 

On the other hand, I've kept some form of a blog or personal website for almost the last 8 years (currently [yakkomajuri.com](https://yakkomajuri.com)). Increasingly I became more and more comfortable with this personal space of mine on the web that I've published some very deep and vulnerable pieces of writing that I think are some of the best "content" I've produced. 

I've written about many things and experimented with a few different platforms for publishing it, and yet I still feel like my best content lives in silos. Most of it isn't easily discoverable and there isn't a great way to _consistently_ put this content in front of people while also allowing it to spark non-ephemeral conversations.

It's a regular occurrence for me to come across someone's personal blog on HackerNews, read something cool, and then never come across their website again, even though I actually would be keen to read their new stuff as it came out. 

But what options do I have, really? Let's consider them.

**I can bookmark their website and check once in a while for new content**

Does anyone manage to reliably do this? It's definitely not scalable and way too much work.

**I can find and follow the author on ~Twitter~ X**

That assumes they have a Twitter account (and that you do too) and that they cross post all their posts to there. It also assumes you care about pictures of their cat and reflections about their day beyond their more meaningful long-form content that goes on their blog.

**I can use an RSS reader and follow their feed**

Now we're getting closer. This kind of works, but RSS readers have mostly died out, and Andrew Chen makes a good point about why on [his blog](https://andrewchen.com/the-death-of-rss-in-a-single-graph/):

_"Interactivity between a writer and their audience is is one of the most rewarding aspects of maintaining a blog. RSS was meant to be a different way to present content, and doesn’t have identity or interactivity baked in."_

There's also the fact that an RSS reader helps the author of the content keep an existing audience, but doesn't help them find and grow an audience. They're still reliant on posting their blog on e.g. HackerNews to get someone to subscribe to the RSS feed.

------

And thus we get to where I think something like Recess can come in. 

The idea for Recess is to be a content aggregator where you can keep up and interact with what I'm calling "siloed content".

In simple terms, you could say it's sort of like an interactive RSS reader.

But the idea is to have a platform where:

- You can import feeds (content) from anywhere on the internet - could be a blog, personal website, news site, or anything really.
- You and others can interact with that content, even if at its source doing so isn't supported.
- You can follow feeds so that you keep up with all the content you want to.
- You can discover feeds to follow more easily, through discovery tools on the platform or by seeing what your friends follow. Consequently, people creating meaningful content can more easily find an audience.
- Content is front and center. Most platforms these days are user-centric, as in you follow users who in turn post content. This creates all sorts of dynamics that can lead to toxicity. Instead, the idea with Recess is that rather than User A posting Content X, Content X is the highlight, and it happens to be a part of Feed A, which may in turn be owned by User A, who might own many feeds. But you don't follow the user - you follow the content (in the form of a feed). I might be the "owner" of three feeds: a Twitter-like feed where I post my thoughts, my tech blog, and my fiction blog, and you might only want to subscribe to one.
- Anyone can use the platform, irrespective of being technical or not, and irrespective of having a feed themselves or not.

As it stands, the Beta of Recess is built using RSS feeds - which, many will tell you, are dying. However, RSS is not a core component. Ideally importing content could be done in various ways, and doing so via RSS feeds is actually still the easiest way to do it. Note that even websites without an RSS feed can easily get one generated for them, by using a platform like [rss.app](https://rss.app/).

In the future, content could be imported using [JSONFeed](https://www.jsonfeed.org/), [h-feed](https://indieweb.org/h-feed), or even just some AI tool that parses HTML content into structured data and puts it directly into the Recess database. I'm hoping pretty soon to get to a point where someone just gives us a link to the website itself (rather than some feed), and we abstract away the magic used to import it, so that a non-technical person never needs to even see something like XML.

The point is - the idea is to be agnostic in terms of the technology used to transfer data, even though RSS is currently what Recess relies on.

Now, through building Recess I came across a really cool movement called [IndieWeb](https://indieweb.org/). In reading about it, I found that Recess' original idea of "connecting personal websites" was very much based on the [_Publish (on your) Own Site, Syndicate Elsewhere_ (POSSE)](https://indieweb.org/POSSE) concept, even though I didn't know about POSSE at the time. In fact, while POSSE describes the "push" side of the equation, my original notes had a name I came up with for the "pull" side - I noted Recess would be a "BYOC" platform, meaning _Bring Your Own Content_, because Recess itself is not where it is created or where it lives.

Going forward, I'd love to explore how Recess can integrate more into the IndieWeb movement, and I certainly want to dig into how to potentially implement protocols like [Webmentions](https://indieweb.org/Webmention) and [IndieAuth](https://indieweb.org/IndieAuth), but as of now, I still need to do a lot of reading and become more knowledgeable about these efforts.

Finally, on the social media front, I'm still torn as to how far I want Recess to lean into it. I've often thought about "new models for social media" and my original plan for Recess actually had a note saying "_no likes, just comments_" on it. The idea there was to have a platform that encourages discussion, rather than focusing on "vanity metrics". However, it seems future me forgot about that idea and built Recess with likes, but if they stay or not is yet to be determined. 

Nevertheless, Recess has a very cool property as a social media tool. One of the biggest struggles of a new social media platform is that it has very little content, and content is needed to engage users, but content is also created by users, so it's a bit of a Catch-22. You need some users to really believe in the platform and produce content when there's barely anyone to consume it. Recess, on the other hand, is a BYOC platform (lol), which means from day one, it can have a ton of content available. Now, the interactivity part will of course be lacking, but you can come in and immediately have feeds to follow, import your own feeds, and have things to do. It's usable and interesting from the moment you join. So that's pretty cool.

And I think this concludes this manifesto for now. I must note, as software developers commonly do, that the codebase itself is the result of a few weeks of effort, and this manifest was written in an hour (although the concepts and ideas have long been marinating in my brain). What this means is: the platform is in its infancy, the code is a mess, and the principles are subject to change. Yet in an effort to break free from the perfectionist mentality that leads many of our projects to die without ever seeing the light, I'm putting it out there. And it's open source.

So I hope you like it, and if you do, you can help me make it better too.

Thanks,

Yakko

------

Shoutout to @hazzadous who I've bounced ideas off of and who contributed some code as well. I squashed all old commits into one before making this public so your commits were lost. Sorry.