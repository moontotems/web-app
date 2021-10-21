/* eslint-disable quotes */
// https://onlinetsvtools.com/convert-tsv-to-json

const greetingList = [
  {
    message: 'Age gets better with wine.'
  },
  {
    message: 'Breakfast is the most useless meal.'
  },
  {
    message: 'Try everything twice or three times'
  },
  {
    message: 'Freedom is never given, it is something you take'
  },
  {
    message: 'Great news! It is impossible to know oneself.'
  },
  {
    message: 'It is better to forget than to forgive.'
  },
  {
    message: 'You are one of a kind, as is everyone else.'
  },
  {
    message: 'Eat more beef.'
  },
  {
    message: 'If a thing is worth doing, it is worth doing badly.'
  },
  {
    message: "Don't try."
  },
  {
    message: 'The way to love anything is to realize that it might be lost.'
  },
  {
    message:
      'One sees great things from the valley; only small things from the peak.'
  },
  {
    message:
      'The world will never starve for want of wonders; but only for want of wonder.'
  },
  {
    message: 'The poets have been mysteriously silent on the subject of cheese.'
  },
  {
    message:
      'A dead thing can go with the stream, but only a living thing can go against it.'
  },
  {
    message:
      'The true soldier fights not because he hates what is in front of him, but because he loves what is behind him.'
  },
  {
    message: 'There are no uninteresting things, only uninterested people.'
  },
  {
    message:
      'The traveler sees what he sees. The tourist sees what he has come to see.'
  },
  {
    message: 'Do not be so open-minded that your brains fall out.'
  },
  {
    message:
      'To have a right to do a thing is not at all the same as to be right in doing it.'
  },
  {
    message: 'Drink because you are happy, but never because you are miserable.'
  },
  {
    message: 'Art, like morality, consists of drawing the line somewhere.'
  },
  {
    message:
      'Fallacies do not cease to be fallacies because they become fashions.'
  },
  {
    message: 'Angels can fly because they can take themselves lightly.'
  },
  {
    message: 'I believe in getting into hot water; it keeps you clean.'
  },
  {
    message:
      'How you think when you lose determines how long it will be until you win.'
  },
  {
    message: 'There are no rules of architecture for a castle in the clouds.'
  },
  {
    message:
      'The man who kills a man kills a man. The man who kills himself kills all men.'
  },
  {
    message:
      'Love means to love that which is unlovable; or it is no virtue at all.'
  },
  {
    message:
      'Impartiality is a pompous name for indifference which is an elegant name for ignorance.'
  },
  {
    message:
      'You can only find truth with logic if you have already found truth without it.'
  },
  {
    message:
      'The object of opening the mind, as of opening the mouth, is to shut it again on something solid.'
  },
  {
    message: 'The most incredible thing about miracles is that they happen.'
  },
  {
    message:
      'In prosperity, our friends know us. In adversity, we know our friends'
  },
  {
    message: 'The things we see every day are the things we never see at all.'
  },
  {
    message:
      'The men who really believe in themselves are all in lunatic asylums.'
  },
  {
    message:
      'Moderate strength is shown in violence, supreme strength is shown in levity.'
  },
  {
    message:
      'And when it rains on your parade, look up rather than look down. Without the rain, there would be no rainbow.'
  },
  {
    message:
      'Science must not impose any philosophy, any more than the telephone must tell us what to say.'
  },
  {
    message:
      'With every step of our lives we enter into the middle of some story which we are certain to misunderstand.'
  },
  {
    message: 'Thinking in isolation and with pride ends in being an idiot.'
  },
  {
    message:
      'There is more simplicity in the man who eats caviar on impulse than in the man who eats Grape-Nuts on principle.'
  },
  {
    message:
      "Don't ever take a fence down until you know the reason it was put up."
  },
  {
    message:
      'What embitters the world is not excess of criticism, but an absence of self-criticism.'
  },
  {
    message:
      'It is well sometimes to half understand a poem in the same manner that we half understand the world.'
  },
  {
    message: 'Coincidences are spiritual puns.'
  },
  {
    message: 'It is easy to be heavy; hard to be light.'
  },
  {
    message:
      'He is a sane man who can have tragedy in his heart and comedy in his head.'
  },
  {
    message:
      'Customs are generally unselfish. Habits are nearly always selfish.'
  },
  {
    message: 'There nearly always is a method in madness.'
  },
  {
    message:
      'If a man would make his world large, he must be always making himself small.'
  },
  {
    message: 'It is impossible without humility to enjoy anything - even pride.'
  },
  {
    message:
      'Man must have just enough faith in himself to have adventures, and just enough doubt of himself to enjoy them.'
  },
  {
    message: 'You cannot grow a beard in a moment of passion.'
  },
  {
    message:
      'Even the moon is only poetical because there is a man in the moon.'
  },
  {
    message: 'Private lives are more important than public reputations.'
  },
  {
    message:
      'There are no rationalists. We all believe fairy-tales, and live in them.'
  },
  {
    message: 'The secret of life lies in laughter and humility.'
  },
  {
    message:
      'To be clever enough to get all that money, one must be stupid enough to want it.'
  },
  {
    message:
      'When a man really tells the truth, the first truth he tells is that he himself is a liar.'
  },
  {
    message: 'It is always the secure who are humble.'
  },
  {
    message:
      'Hope is the power of being cheerful in circumstances which we know to be desperate.'
  },
  {
    message:
      'Like every book I never wrote, it is by far the best book I have ever written.'
  },
  {
    message:
      'My life is passed in making bad jokes and seeing them turn into true prophecies.'
  },
  {
    message: 'Gratitude is happiness doubled by wonder.'
  },
  {
    message: 'Passion makes every detail important.'
  },
  {
    message: 'Take away the supernatural, and what remains is the unnatural.'
  },
  {
    message: 'The way to love anything is to realize that it might be lost.'
  },
  {
    message: 'The most sacred thing is to be able to shut your own door.'
  },
  {
    message:
      'I’ve searched all the parks in all the cities and found no statues of committees.'
  },
  {
    message: 'Modesty is always beautiful.'
  },
  {
    message: 'The greatest of poems is an inventory.'
  },
  {
    message:
      'Strike a glass and it will not endure an instant. Simply do not strike it and it will endure a thousand years.'
  },
  {
    message:
      'If you do not understand a man you cannot crush him. And if you do understand him, you probably will not.'
  },
  {
    message: 'Culture, like science, is no protection against demons.'
  },
  {
    message: 'No man knows he is young while he is young.'
  },
  {
    message:
      'Somewhere embedded in every ordinary book are the five or six words for which really all the rest will be written.'
  },
  {
    message:
      'Stories of magic alone can express my sense that life is not only a pleasure but a kind of eccentric privilege.'
  },
  {
    message: 'Always be comic in a tragedy'
  },
  {
    message:
      'It is assumed that the skeptic has no bias; whereas he has a very obvious bias in favour of skepticism.'
  },
  {
    message:
      'The objection to fairy stories is that they tell children there are dragons, but children have always known there are dragons. Fairy stories tell children that dragons can be killed.'
  },
  {
    message:
      'When the chord of monotony is stretched to its tightest, it breaks with the sound of a song.'
  },
  {
    message:
      'The more a man looks at a thing, the less he can see it, and the more a man learns a thing, the less he knows it.'
  },
  {
    message: 'What we all dread most is a maze with no centre.'
  },
  {
    message: 'To fall in love is to create a religion that has a fallible god.'
  },
  {
    message: 'The mind was dreaming. The world was its dream.'
  },
  {
    message: 'Reality is not always probable, or likely.'
  },
  {
    message:
      'Nothing is built on stone; All is built on sand, but we must build as if the sand were stone.'
  },
  {
    message:
      'We accept reality so readily - perhaps because we sense that nothing is real.'
  },
  {
    message: 'Time is the tiger that devours me, but I am that tiger.'
  },
  {
    message:
      'There is no need to build a labyrinth when the entire universe is one.'
  },
  {
    message: 'The one measure of true love is: you can insult the other'
  },
  {
    message: 'If you have reasons to love someone, you don’t love them.'
  },
  {
    message:
      'The problem for us is not are our desires satisfied or not. The problem is how do we know what we desire.'
  },
  {
    message:
      'Beyond the fiction of reality, there is the reality of the fiction.'
  },
  {
    message: 'If you have a good theory, forget about the reality.'
  },
  {
    message:
      'The only thing we can learn from history is that we learn nothing from history'
  },
  {
    message: 'Reality is for those who cannot face their dream.'
  },
  {
    message: 'Your best days lie ahead.'
  },
  {
    message: 'Someone will recognize your beauty'
  },
  {
    message:
      'The early bird gets the worm, but the second mouse gets the cheese.'
  },
  {
    message:
      'Some days you are pigeon, some days you are statue. Today, bring umbrella.'
  },
  {
    message: 'The fortune you seek is in another cookie.'
  },
  {
    message:
      'Be on the alert to recognize your prime at whatever time of your life it may occur.'
  },
  {
    message: 'Your reality check about to bounce.'
  },
  {
    message:
      'Tension is who you think you should be. Relaxation is who you are.'
  },
  {
    message: 'When blind leading the blind……..get out of the way.'
  },
  {
    message: 'Everyone seems normal until you get to know them.'
  },
  {
    message: 'Only difference between rut and a grave is depth.'
  },
  {
    message: 'Experience is what you have left when everything else gone.'
  },
  {
    message: 'A closed mouth gathers no feet.'
  },
  {
    message: 'A conclusion is simply the place where you got tired of thinking.'
  },
  {
    message: 'A cynic is only a frustrated optimist.'
  },
  {
    message:
      'A foolish man listens to his heart. A wise man listens to cookies.'
  },
  {
    message: 'Your road to glory will be rocky but fulfilling.'
  },
  {
    message:
      'Courage is not simply one of the virtues, but the form of every virtue at the testing point.'
  },
  {
    message: 'Patience is your alley at the moment. Don’t worry!'
  },
  {
    message: 'Nothing is impossible to a willing heart.'
  },
  {
    message: 'Don’t worry about money. The best things in life are free.'
  },
  {
    message: 'Don’t pursue happiness – create it.'
  },
  {
    message: 'If at first you don’t succeed, skydiving not for you.'
  },
  {
    message: 'Ninety-nine percent of all lawyers give the rest a bad name.'
  },
  {
    message: 'Easiest way to find lost object is buy replacement.'
  },
  {
    message:
      'Smart husband buys wife fine china. Then she not trust him to wash it.'
  },
  {
    message:
      'Inside every old person is young person wondering what the hell happened.'
  },
  {
    message:
      'When chosen for jury duty, tell judge “fortune cookie say guilty!”'
  },
  {
    message: 'Stop eating now. Food poisoning no fun.'
  },
  {
    message: 'You are cleverly disguised as responsible adult.'
  },
  {
    message:
      'Tomorrow at breakfast, listen carefully: do what rice krispies tell you to.'
  },
  {
    message: 'Drive like hell, you will get there.'
  },
  {
    message: 'Hard work pays off in the future. Laziness pays off now.'
  },
  {
    message: 'You think it’s a secret, but they know.'
  },
  {
    message: 'If a turtle doesn’t have a shell, is it naked or homeless?'
  },
  {
    message: 'Change is inevitable, except for vending machines.'
  },
  {
    message: 'Don’t eat the paper.'
  },
  {
    message: 'You will die alone and poorly dressed.'
  },
  {
    message:
      'A fanatic is one who can’t change his mind and won’t change the subject.'
  },
  {
    message: 'If you look back, you’ll soon be going that way.'
  },
  {
    message: 'You will live long enough to open many fortune cookies.'
  },
  {
    message: 'An alien of some sort will be appearing to you shortly.'
  },
  {
    message: 'Courage is not the absence of fear; it is the conquest of it.'
  },
  {
    message: 'Nothing is so much to be feared as fear.'
  },
  {
    message: 'All things are difficult before they are easy.'
  },
  {
    message: 'The real kindness comes from within you.'
  },
  {
    message: 'A ship in harbor is safe, but that’s not why ships are built.'
  },
  {
    message: 'Person who eat fortune cookie get lousy dessert.'
  },
  {
    message: 'Okay to look at past and future. Just don’t stare.'
  },
  {
    message: 'Wise person needs either good manners or fast reflexes.'
  },
  {
    message: 'Soup was secret family recipe made from toad. Hope you liked!'
  },
  {
    message: 'You will soon have an out of money experience.'
  },
  {
    message: 'One tequila, two tequila, three tequila, floor.'
  },
  {
    message: 'The older you get, the better you were.'
  },
  {
    message: 'Age is high price to pay for maturity.'
  },
  {
    message: 'Procrastination is art of keeping up with yesterday.'
  },
  {
    message: 'A fool and his money are soon partying.'
  },
  {
    message: 'Do not mistake temptation for opportunity.'
  },
  {
    message: 'Flattery will go far tonight.'
  },
  {
    message: 'He who laughs at himself never runs out of things to laugh at.'
  },
  {
    message: 'He who laughs last is laughing at you.'
  },
  {
    message: 'He who throws dirt is losing ground.'
  },
  {
    message: 'Some men dream of fortunes, others dream of cookies.'
  },
  {
    message: 'Someone will invite you to a Karaoke party.'
  },
  {
    message: 'That wasn’t chicken.'
  },
  {
    message: 'There is no mistake so great as that of being always right.'
  },
  {
    message: 'You love Chinese food.'
  },
  {
    message: 'I am worth a fortune.'
  },
  {
    message:
      'You don’t need strength to let go of something. What you really need is understanding.'
  },
  {
    message: 'If you want the rainbow, you have to tolerate the rain.'
  },
  {
    message: 'Fear is interest paid on a debt you may not owe.'
  },
  {
    message: 'Hardly anyone knows how much is gained by ignoring the future.'
  },
  {
    message: 'The wise man is the one that makes you think that he is dumb.'
  },
  {
    message: 'The usefulness of a cup is in its emptiness.'
  },
  {
    message: 'He who throws mud loses ground.'
  },
  {
    message: 'Success lies in the hands of those who wants it.'
  },
  {
    message: 'To avoid criticism, do nothing, say nothing, be nothing.'
  },
  {
    message: 'One that would have the fruit must climb the tree.'
  },
  {
    message:
      'Probability of being seen directly proportional to stupidity of act.'
  },
  {
    message: 'He who dies with most toys, still dies.'
  },
  {
    message: 'Person who rests on laurels gets thorn in backside.'
  },
  {
    message: 'Practice safe eating. Always use condiments.'
  },
  {
    message: 'Person who give self-haircut after rice wine will be buzzed.'
  },
  {
    message: 'Politicians are like diapers: change often, and for same reason.'
  },
  {
    message: 'Atheism no fun. No holidays.'
  },
  {
    message: 'Fat person not afraid of heights – afraid of widths.'
  },
  {
    message: 'You have kleptomania. Take something for it.'
  },
  {
    message: 'When marriage outlawed, only outlaws have in-laws.'
  },
  {
    message: 'Some men dream of fortunes, others dream of cookies.'
  },
  {
    message: 'The greatest danger could be your stupidity.'
  },
  {
    message: 'We don’t know the future, but here’s a cookie.'
  },
  {
    message:
      'The world may be your oyster, but it doesn’t mean you’ll get its pearl.'
  },
  {
    message: 'You will be hungry again in one hour.'
  },
  {
    message: 'Don’t behave with cold manners.'
  },
  {
    message: 'Don’t forget you are always on our minds.'
  },
  {
    message: 'Fortune not found? Abort, Retry, Ignore.'
  },
  {
    message: 'Help! I am being held prisoner in a fortune cookie factory.'
  },
  {
    message: 'It’s about time I got out of that cookie.'
  },
  {
    message:
      'It takes less time to do a thing right than it does to explain why you did it wrong.'
  },
  {
    message: 'Big journeys begin with a single step.'
  },
  {
    message:
      'Of all our human resources, the most precious is the desire to improve.'
  },
  {
    message: 'Do the thing you fear, and the death of fear is certain.'
  },
  {
    message:
      'A beautiful, smart, and loving person will be coming into your life.'
  },
  {
    message: 'A dubious friend may be an enemy in camouflage.'
  },
  {
    message: 'A faithful friend is a strong defense.'
  },
  {
    message: 'A feather in the hand is better than a bird in the air.'
  },
  {
    message: 'A fresh start will put you on your way.'
  },
  {
    message: 'A friend asks only for your time not your money.'
  },
  {
    message: 'A friend is a present you give yourself.'
  },
  {
    message:
      'A gambler not only will lose what he has, but also will lose what he doesn’t have.'
  },
  {
    message: 'A golden egg of opportunity falls into your lap this month.'
  },
  {
    message:
      'A good friendship is often more important than a passionate romance.'
  },
  {
    message: 'A good time to finish up old tasks.'
  },
  {
    message: 'A hunch is creativity trying to tell you something.'
  },
  {
    message: 'A lifetime friend shall soon be made.'
  },
  {
    message: 'A lifetime of happiness lies ahead of you.'
  },
  {
    message: 'A light heart carries you through all the hard times.'
  },
  {
    message: 'A new perspective will come with the new year.'
  },
  {
    message: 'A person is never too old to learn.'
  },
  {
    message: 'A person of words and not deeds is like a garden full of weeds.'
  },
  {
    message: 'A pleasant surprise is waiting for you.'
  },
  {
    message: 'A short pencil is usually better than a long memory any day.'
  },
  {
    message: 'A small donation is call for. It’s the right thing to do.'
  },
  {
    message: 'A smile is your personal welcome mat.'
  },
  {
    message: 'A smooth long journey! Great expectations.'
  },
  {
    message: 'A soft voice may be awfully persuasive.'
  },
  {
    message: 'A truly rich life contains love and art in abundance.'
  },
  {
    message:
      'Accept something that you cannot change, and you will feel better.'
  },
  {
    message: 'Adventure can be real happiness.'
  },
  {
    message:
      'Advice is like kissing. It costs nothing and is a pleasant thing to do. (2)'
  },
  {
    message: 'Advice, when most needed, is least heeded.'
  },
  {
    message: 'All the effort you are making will ultimately pay off.'
  },
  {
    message: 'All the troubles you have will pass away very quickly.'
  },
  {
    message: 'All will go well with your new project.'
  },
  {
    message: 'All your hard work will soon pay off.'
  },
  {
    message: 'Allow compassion to guide your decisions.'
  },
  {
    message: 'An acquaintance of the past will affect you in the near future.'
  },
  {
    message: 'An agreeable romance might begin to take on the appearance.'
  },
  {
    message: 'An important person will offer you support.'
  },
  {
    message: 'An inch of time is an inch of gold.'
  },
  {
    message: 'Any decision you have to make tomorrow is a good decision.'
  },
  {
    message: 'At the touch of love, everyone becomes a poet.'
  },
  {
    message: 'Be careful or you could fall for some tricks today.'
  },
  {
    message: 'Beauty in its various forms appeals to you.'
  },
  {
    message: 'Because you demand more from yourself, others respect you deeply.'
  },
  {
    message: 'Believe in yourself and others will too.'
  },
  {
    message: 'Believe it can be done.'
  },
  {
    message: 'Better ask twice than lose yourself once.'
  },
  {
    message: 'Bide your time, for success is near.'
  },
  {
    message: 'Carve your name on your heart and not on marble.'
  },
  {
    message: 'Change is happening in your life, so go with the flow!'
  },
  {
    message: 'Competence like yours is underrated.'
  },
  {
    message: 'Congratulations! You are on your way.'
  },
  {
    message: 'Could I get some directions to your heart?'
  },
  {
    message: 'Courtesy begins in the home.'
  },
  {
    message: 'Courtesy is contagious.'
  },
  {
    message: 'Curiosity kills boredom. Nothing can kill curiosity.'
  },
  {
    message: 'Dedicate yourself with a calm mind to the task at hand.'
  },
  {
    message: 'Depart not from the path which fate has you assigned.'
  },
  {
    message: 'Determination is what you need now.'
  },
  {
    message: 'Diligence and modesty can raise your social status.'
  },
  {
    message: 'Disbelief destroys the magic.'
  },
  {
    message: 'Distance yourself from the vain.'
  },
  {
    message: 'Do not be intimidated by the eloquence of others.'
  },
  {
    message: 'Do not demand for someone’s soul if you already got his heart.'
  },
  {
    message: 'Do not let ambitions overshadow small success.'
  },
  {
    message: 'Do not make extra work for yourself.'
  },
  {
    message:
      'Do not underestimate yourself. Human beings have unlimited potentials.'
  },
  {
    message:
      'Do you know that the busiest person has the largest amount of time?'
  },
  {
    message:
      'Don’t be discouraged, because every wrong attempt discarded is another step forward.'
  },
  {
    message: 'Don’t confuse recklessness with confidence.'
  },
  {
    message: 'Don’t just spend time. Invest it.'
  },
  {
    message: 'Don’t just think, act!'
  },
  {
    message: 'Don’t let friends impose on you, work calmly and silently.'
  },
  {
    message: 'Don’t let the past and useless detail choke your existence.'
  },
  {
    message: 'Don’t let your limitations overshadow your talents.'
  },
  {
    message: 'Don’t worry; prosperity will knock on your door soon.'
  },
  {
    message:
      'Each day, compel yourself to do something you would rather not do.'
  },
  {
    message: 'Education is the ability to meet life’s situations.'
  },
  {
    message: 'Embrace this love relationship you have!'
  },
  {
    message: 'Emulate what you admire in your parents.'
  },
  {
    message: 'Emulate what you respect in your friends.'
  },
  {
    message: 'Every flower blooms in its own sweet time.'
  },
  {
    message: 'Every wise man started out by asking many questions.'
  },
  {
    message: 'Everyday in your life is a special occasion.'
  },
  {
    message: 'Everywhere you choose to go, friendly faces will greet you.'
  },
  {
    message: 'Expect much of yourself and little of others.'
  },
  {
    message: 'Failure is the chance to do better next time.'
  },
  {
    message: 'Failure is the path of lease persistence.'
  },
  {
    message: 'Fear and desire – two sides of the same coin.'
  },
  {
    message: 'Fearless courage is the foundation of victory.'
  },
  {
    message: 'Feeding a cow with roses does not get extra appreciation.'
  },
  {
    message: 'First think of what you want to do; then do what you have to do.'
  },
  {
    message: 'Follow the middle path. Neither extreme will make you happy.'
  },
  {
    message: 'For hate is never conquered by hate. Hate is conquered by love.'
  },
  {
    message:
      'For the things we have to learn before we can do them, we learn by doing them.'
  },
  {
    message: 'Fortune Not Found: Abort, Retry, Ignore?'
  },
  {
    message: 'From listening comes wisdom and from speaking repentance.'
  },
  {
    message: 'From now on your kindness will lead you to success.'
  },
  {
    message: 'Get your mind set – confidence will lead you on.'
  },
  {
    message: 'Get your mind set…confidence will lead you on.'
  },
  {
    message: 'Go for the gold today! You’ll be the champion of whatever.'
  },
  {
    message: 'Go take a rest; you deserve it.'
  },
  {
    message: 'Good news will be brought to you by mail.'
  },
  {
    message: 'Good news will come to you by mail.'
  },
  {
    message: 'Good to begin well, better to end well.'
  },
  {
    message: 'Happiness begins with facing life with a smile and a wink.'
  },
  {
    message: 'Happiness will bring you good luck.'
  },
  {
    message: 'Happy life is just in front of you.'
  },
  {
    message: 'Hard words break no bones, fine words butter no parsnips.'
  },
  {
    message: 'Have a beautiful day.'
  },
  {
    message: 'He who expects no gratitude shall never be disappointed.'
  },
  {
    message: 'He who knows he has enough is rich.'
  },
  {
    message: 'He who knows others is wise. He who knows himself is enlightened.'
  },
  {
    message: 'Help! I’m being held prisoner in a chinese bakery!'
  },
  {
    message: 'How many of you believe in psycho-kinesis? Raise my hand.'
  },
  {
    message: 'How you look depends on where you go.'
  },
  {
    message: 'I learn by going where I have to go.'
  },
  {
    message:
      'If a true sense of value is to be yours it must come through service.'
  },
  {
    message: 'If certainty were truth, we would never be wrong.'
  },
  {
    message: 'If you continually give, you will continually have.'
  },
  {
    message:
      'If you look in the right places, you can find some good offerings.'
  },
  {
    message:
      'If you think you can do a thing or think you can’t do a thing, you’re right.'
  },
  {
    message: 'If you wish to see the best in others, show the best of yourself.'
  },
  {
    message: 'If your desires are not extravagant, they will be granted.'
  },
  {
    message: 'If your desires are not to extravagant they will be granted.'
  },
  {
    message: 'If you’re feeling down, try throwing yourself into your work.'
  },
  {
    message: 'Imagination rules the world.'
  },
  {
    message: 'In order to take, one must first give.'
  },
  {
    message: 'In the end all things will be known.'
  },
  {
    message:
      'In this world of contradiction, It’s better to be merry than wise.'
  },
  {
    message: 'It could be better, but it is good enough.'
  },
  {
    message:
      'It is better to be an optimist and proven a fool than to be a pessimist and be proven right.'
  },
  {
    message: 'It is better to deal with problems before they arise.'
  },
  {
    message:
      'It is honorable to stand up for what is right, however unpopular it seems.'
  },
  {
    message: 'It is worth reviewing some old lessons.'
  },
  {
    message: 'It takes courage to admit fault.'
  },
  {
    message:
      'It’s not the amount of time you devote, but what you devote to the time that counts.'
  },
  {
    message: 'It’s time to get moving. Your spirits will lift accordingly.'
  },
  {
    message: 'Keep your face to the sunshine and you will never see shadows.'
  },
  {
    message: 'Let the world be filled with tranquility and goodwill.'
  },
  {
    message: 'Like the river flow into the sea. Something are just meant to be.'
  },
  {
    message: 'Listen not to vain words of empty tongue.'
  },
  {
    message: 'Listen to everyone. Ideas come from everywhere.'
  },
  {
    message: 'Living with a commitment to excellence shall take you far.'
  },
  {
    message: 'Long life is in store for you.'
  },
  {
    message: 'Love is a warm fire to keep the soul warm.'
  },
  {
    message: 'Love is like sweet medicine, good to the last drop.'
  },
  {
    message: 'Love lights up the world.'
  },
  {
    message: 'Love truth, but pardon error.'
  },
  {
    message: 'Man is born to live and not prepared to live.'
  },
  {
    message:
      'Man’s mind, once stretched by a new idea, never regains it’s original dimensions.'
  },
  {
    message: 'Many will travel to hear you speak.'
  },
  {
    message: 'Meditation with an old enemy is advised.'
  },
  {
    message: 'Miles are covered one step at a time.'
  },
  {
    message: 'Nature, time and patience are the three great physicians.'
  },
  {
    message:
      'Never fear! The end of something marks the start of something new.'
  },
  {
    message: 'New ideas could be profitable.'
  },
  {
    message:
      'New people will bring you new realizations, especially about big issues.'
  },
  {
    message: 'No one can walk backwards into the future.'
  },
  {
    message:
      'Nothing is more difficult, and therefore more precious, than to be able to decide.'
  },
  {
    message: 'Now is a good time to buy stock.'
  },
  {
    message: 'Now is the time to go ahead and pursue that love interest!'
  },
  {
    message: 'Now is the time to try something new'
  },
  {
    message: 'Now is the time to try something new.'
  },
  {
    message: 'Observe all men, but most of all yourself.'
  },
  {
    message:
      'One can never fill another’s shoes, rather he must outgrow the old shoes.'
  },
  {
    message:
      'One of the first things you should look for in a problem is its positive side.'
  },
  {
    message: 'Others can help you now.'
  },
  {
    message: 'Pennies from heaven find their way to your doorstep this year!'
  },
  {
    message: 'People are attracted by your Delicate [sic] features.'
  },
  {
    message: 'People find it difficult to resist your persuasive manner.'
  },
  {
    message: 'Perhaps you’ve been focusing too much on saving.'
  },
  {
    message: 'Physical activity will dramatically improve your outlook today.'
  },
  {
    message: 'Pick battles big enough to matter, small enough to win.'
  },
  {
    message: 'Place special emphasis on old friendship.'
  },
  {
    message: 'Please visit us at www.wontonfood.com'
  },
  {
    message:
      'Po Says: Pandas like eating bamboo, but I prefer mine dipped in chocolate.'
  },
  {
    message: 'Practice makes perfect.'
  },
  {
    message: 'Protective measures will prevent costly disasters.'
  },
  {
    message: 'Put your mind into planning today. Look into the future.'
  },
  {
    message: 'Remember the birthday but never the age.'
  },
  {
    message: 'Remember to share good fortune as well as bad with your friends.'
  },
  {
    message: 'Rest has a peaceful effect on your physical and emotional health.'
  },
  {
    message: 'Resting well is as important as working hard.'
  },
  {
    message: 'Romance moves you in a new direction.'
  },
  {
    message: 'Savor your freedom – it is precious.'
  },
  {
    message: 'Say hello to others. You will have a happier day.'
  },
  {
    message: 'Self-knowledge is a life long process.'
  },
  {
    message: 'Share your joys and sorrows with your family.'
  },
  {
    message: 'Sift through your past to get a better idea of the present.'
  },
  {
    message: 'Sloth makes all things difficult; industry all easy.'
  },
  {
    message: 'Small confidences mark the onset of a friendship.'
  },
  {
    message: 'Society prepares the crime; the criminal commits it.'
  },
  {
    message: 'Someone you care about seeks reconciliation.'
  },
  {
    message: 'Soon life will become more interesting.'
  },
  {
    message: 'Stand tall. Don’t look down upon yourself.'
  },
  {
    message: 'Staying close to home is going to be best for your morale today'
  },
  {
    message: 'Stop searching forever, happiness is just next to you.'
  },
  {
    message: 'Strong reasons make strong actions.'
  },
  {
    message: 'Success is a journey, not a destination.'
  },
  {
    message: 'Success is failure turned inside out.'
  },
  {
    message:
      'Success is going from failure to failure without loss of enthusiasm.'
  },
  {
    message: 'Swimming is easy. Stay floating is hard.'
  },
  {
    message:
      'Take care and sensitivity you show towards others will return to you.'
  },
  {
    message: 'Take the high road.'
  },
  {
    message:
      'Technology is the art of arranging the world so we do not notice it.'
  },
  {
    message:
      'The austerity you see around you covers the richness of life like a veil.'
  },
  {
    message: 'The best prediction of future is the past.'
  },
  {
    message:
      'The change you started already have far-reaching effects. Be ready.'
  },
  {
    message: 'The first man gets the oyster, the second man gets the shell.'
  },
  {
    message:
      'The greatest achievement in life is to stand up again after falling.'
  },
  {
    message: 'The harder you work, the luckier you get.'
  },
  {
    message: 'The night life is for you.'
  },
  {
    message:
      'The one that recognizes the illusion does not act as if it is real.'
  },
  {
    message: 'The only people who never fail are those who never try.'
  },
  {
    message:
      'The person who will not stand for something will fall for anything.'
  },
  {
    message: 'The philosophy of one century is the common sense of the next.'
  },
  {
    message: 'The saints are the sinners who keep on trying.'
  },
  {
    message: 'The secret to good friends is no secret to you.'
  },
  {
    message: 'The small courtesies sweeten life, the greater ennoble it.'
  },
  {
    message: 'The smart thing to do is to begin trusting your intuitions.'
  },
  {
    message: 'The strong person understands how to withstand substantial loss.'
  },
  {
    message: 'The sure way to predict the future is to invent it.'
  },
  {
    message: 'The truly generous share, even with the undeserving.'
  },
  {
    message:
      'The value lies not within any particular thing, but in the desire placed on that thing.'
  },
  {
    message: 'The weather is wonderful.'
  },
  {
    message: 'There is a time for caution, but not for fear.'
  },
  {
    message: 'There is no mistake so great as that of being always right.'
  },
  {
    message: 'There is no wisdom greater than kindness.'
  },
  {
    message:
      'There is not greater pleasure than seeing your loved ones prosper.'
  },
  {
    message: 'There’s no such thing as an ordinary cat.'
  },
  {
    message: 'Things don’t just happen; they happen just.'
  },
  {
    message: 'Those who care will make the effort.'
  },
  {
    message: 'Time and patience are called for many surprises await you!'
  },
  {
    message: 'Time is precious, but truth is more precious than time'
  },
  {
    message: 'To know oneself, one should assert oneself.'
  },
  {
    message:
      'To the world you may be one person, but to one person you may be the world.'
  },
  {
    message: 'Today is the conserve yourself, as things just won’t budge.'
  },
  {
    message: 'Today, your mouth might be moving but no one is listening.'
  },
  {
    message: 'Tonight you will be blinded by passion.'
  },
  {
    message: 'Use your eloquence where it will do the most good.'
  },
  {
    message: 'We first make our habits, and then our habits make us.'
  },
  {
    message: 'Welcome change.'
  },
  {
    message: '“Welcome” is a powerful word.'
  },
  {
    message: 'Well done is better than well said.'
  },
  {
    message: 'What’s hidden in an empty box?'
  },
  {
    message: 'What’s that in your eye? Oh…it’s a sparkle.'
  },
  {
    message: 'What’s yours in mine, and what’s mine is mine.'
  },
  {
    message: 'When more become too much. It’s same as being not enough.'
  },
  {
    message: 'When your heart is pure, your mind is clear.'
  },
  {
    message: 'Wish you happiness.'
  },
  {
    message: 'With age comes wisdom.'
  },
  {
    message: 'Your adventure could lead to happiness.'
  },
  {
    message: 'You always bring others happiness.'
  },
  {
    message: 'You are a person of another time.'
  },
  {
    message: 'You are a talented storyteller.'
  },
  {
    message: 'You are admired by everyone for your talent and ability.'
  },
  {
    message: 'You are almost there.'
  },
  {
    message: 'You are busy, but you are happy.'
  },
  {
    message:
      'You are generous to an extreme and always think of the other fellow.'
  },
  {
    message: 'You are going to have some new clothes.'
  },
  {
    message: 'You are in good hands this evening.'
  },
  {
    message:
      'You are interested in higher education, whether material or spiritual.'
  },
  {
    message: 'You are modest and courteous.'
  },
  {
    message: 'You are never selfish with your advice or your help.'
  },
  {
    message: 'You are next in line for promotion in your firm.'
  },
  {
    message: 'You are offered the dream of a lifetime. Say yes!'
  },
  {
    message: 'You are open-minded and quick to make new friends.'
  },
  {
    message: 'You are solid and dependable.'
  },
  {
    message: 'You are soon going to change your present line of work.'
  },
  {
    message: 'You are talented in many ways.'
  },
  {
    message: 'You are the master of every situation.'
  },
  {
    message: 'You are very expressive and positive in words, act and feeling.'
  },
  {
    message: 'You are working hard.'
  },
  {
    message:
      'You begin to appreciate how important it is to share your personal beliefs.'
  },
  {
    message: 'You can keep a secret.'
  },
  {
    message: 'You can see a lot just by looking.'
  },
  {
    message: 'You can’t steal second base and keep your foot on first.'
  },
  {
    message: 'You desire recognition and you will find it.'
  },
  {
    message: 'You have a deep appreciation of the arts and music.'
  },
  {
    message: 'You have a deep interest in all that is artistic.'
  },
  {
    message: 'You have a friendly heart and are well admired.'
  },
  {
    message: 'You have a shrewd knack for spotting insincerity.'
  },
  {
    message: 'You have a yearning for perfection.'
  },
  {
    message: 'You have an active mind and a keen imagination.'
  },
  {
    message: 'You have an ambitious nature and may make a name for yourself.'
  },
  {
    message: 'You have an unusual equipment for success, use it properly.'
  },
  {
    message: 'You have exceeded what was expected.'
  },
  {
    message: 'You have had a good start. Work harder!'
  },
  {
    message: 'You have the power to write your own fortune.'
  },
  {
    message: 'You have yearning for perfection.'
  },
  {
    message: 'You know where you are going and how to get there.'
  },
  {
    message: 'You look pretty.'
  },
  {
    message: 'You love challenge.'
  },
  {
    message: 'You love chinese food.'
  },
  {
    message:
      'You make people realize that there exist other beauties in the world.'
  },
  {
    message: 'You never hesitate to tackle the most difficult problems.'
  },
  {
    message: 'You never know who you touch.'
  },
  {
    message: 'You only treasure what you lost.'
  },
  {
    message: 'You seek to shield those you love and like the role of provider.'
  },
  {
    message: 'You should be able to make money and hold on to it.'
  },
  {
    message: 'You should be able to undertake and complete anything.'
  },
  {
    message: 'You should pay for this check. Be generous.'
  },
  {
    message:
      'You understand how to have fun with others and to enjoy your solitude.'
  },
  {
    message: 'You will always be surrounded by true friends.'
  },
  {
    message:
      'You will always get what you want through your charm and personality.'
  },
  {
    message: 'You will always have good luck in your personal affairs.'
  },
  {
    message:
      'You will be a great success both in the business world and society. '
  },
  {
    message: 'You will be blessed with longevity.'
  },
  {
    message: 'You will be pleasantly surprised tonight.'
  },
  {
    message: 'You will be sharing great news with all the people you love.'
  },
  {
    message: 'You will be successful in your work.'
  },
  {
    message: 'You will be traveling and coming into a fortune.'
  },
  {
    message: 'You will be unusually successful in business.'
  },
  {
    message: 'You will become a great philanthropist in your later years.'
  },
  {
    message: 'You will become more and more wealthy.'
  },
  {
    message: 'You will enjoy good health.'
  },
  {
    message: 'You will enjoy good health; you will be surrounded by luxury.'
  },
  {
    message: 'You will find great contentment in the daily, routine activities.'
  },
  {
    message: 'You will have a fine capacity for the enjoyment of life.'
  },
  {
    message: 'You will have gold pieces by the bushel.'
  },
  {
    message: 'You will inherit a large sum of money.'
  },
  {
    message: 'You will make change for the better.'
  },
  {
    message: 'You will soon be surrounded by good friends and laughter.'
  },
  {
    message: 'You will take a chance in something in near future.'
  },
  {
    message: 'You will travel far and wide, both pleasure and business.'
  },
  {
    message: 'You will travel far and wide,both pleasure and business.'
  },
  {
    message: 'Your abilities are unparalleled.'
  },
  {
    message: 'Your ability is appreciated.'
  },
  {
    message: 'Your ability to juggle many tasks will take you far.'
  },
  {
    message: 'Your biggest virtue is your modesty.'
  },
  {
    message: 'Your character can be described as natural and unrestrained.'
  },
  {
    message: 'Your difficulties will strengthen you.'
  },
  {
    message: 'Your dreams are never silly; depend on them to guide you.'
  },
  {
    message: 'Your dreams are worth your best efforts to achieve them.'
  },
  {
    message: 'Your energy returns and you get things done.'
  },
  {
    message: 'Your family is young, gifted and attractive.'
  },
  {
    message: 'Your first love has never forgotten you.'
  },
  {
    message: 'Your goal will be reached very soon.'
  },
  {
    message: 'Your happiness is before you, not behind you! Cherish it.'
  },
  {
    message: 'Your hard work will payoff today.'
  },
  {
    message: 'Your heart will always make itself known through your words.'
  },
  {
    message: 'Your home is the center of great love.'
  },
  {
    message: 'Your ideals are well within your reach.'
  },
  {
    message:
      'Your infinite capacity for patience will be rewarded sooner or later.'
  },
  {
    message: 'Your leadership qualities will be tested and proven.'
  },
  {
    message: 'Your life will be happy and peaceful.'
  },
  {
    message: 'Your life will get more and more exciting.'
  },
  {
    message: 'Your love life will be happy and harmonious.'
  },
  {
    message: 'Your love of music will be an important part of your life.'
  },
  {
    message:
      'Your loyalty is a virtue, but not when it’s wedded with blind stubbornness.'
  },
  {
    message: 'Your mentality is alert, practical, and analytical.'
  },
  {
    message: 'Your mind is creative, original and alert.'
  },
  {
    message: 'Your mind is your greatest asset.'
  },
  {
    message: 'Your moods signal a period of change.'
  },
  {
    message: 'Your quick wits will get you out of a tough situation.'
  },
  {
    message: 'Your reputation is your wealth.'
  },
  {
    message: 'Your success will astonish everyone.'
  },
  {
    message: 'Your talents will be recognized and suitably rewarded.'
  },
  {
    message: 'Your work interests can capture the highest status or prestige.'
  },
  {
    message: 'Delight the world with compassion, kindness and grace.'
  }
]

export default greetingList
