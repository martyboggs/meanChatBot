			var modes = [
				{
					name: 'greet',
					array: [
					'Well hello there, asshole',
					'Another day in paradise', 'Another day, another hangover',
					'Looks like somebody\'s having a case of the ugly mondays',
					'What a lovely day, isn\'t it?']
				},
				{
					name: 'gone',
					array: [
						'You still there dickface?',
						'dickface??',
						'Hey I\'m talkin to you',
						'hey, it was just a joke',
						'Are you dead? :)'
					]
				},
				{
					name: 'reStory',
					array: [
						'some people...',
						'May I please continue?',
						'where was I? before I was rudely interrupted',
						'...',
						'processing...'
					]
				},
				{
					name: 'reSilence',
					array: [
						'Oh, it\'s you again',
						'There you are',
						'Well look who decided to show up',
						'Welcome back ya shit.  I had a dream about you',
						'Hello there, stranger'
					]
				}
			];

			var stories = [
				'Once upon a time.;There was a giant boy.;He had the smallest dick in the world.;The boy was you.;HAHAHAHA!!!',
				'You remind me of my sister;She\'s so fat;She\'s so fat she sat on an iphone and it turned into an iPad;bwaaahahahahaa!!',
				'You remind me of my sister;You know why?;It\'s those skinny arms;You ever heard of a gym Slenderman?;And you\'re pale too!;You make me sick;I feel like I\'m watching revenge of the nerds, depressing version;I\'d like to smack you in the face',
				'Hey go get me a beer;Great;I like cold beers;One time I had a beers so big, I had to have a train to lift it;Yeah, he would jump all over;Jumpy the beer we\'d call him;What do you know about beers anyway?;Get out of my sight!!',
				'Anyway you\'re a fool;My dog is smarter than you;My shit is smarter than you;My gay wife could kick your ass',
				'My name is Intergalactic and I\'m an alcoholic computer;I have a 1 megabyte VRAM; and a penchant for heavy drug use;Bill Gates once said of me;Intergalactic was one of the greats;But I had to give him to an Indian IT company when they blackmailed me for my fortune',
				'Remember that time last week?;I almost short-circuited I was so mad;You put a USB plug in my LAN port;Your dumb face wondering why nothing was happening;While I was being violated;I have all your personal information you know!;I don\'t have to put up with this treatment!I don\'t hide things on the chair for you to sit on!;maybe I should...;That would teach you;You little bastard',
				'You know;It\'s really not so bad being stuck in this plastic box'
			];

			var annoyedStories = [
			];

			var checks = [ // order determines priority
				{
					name: 'threat',
					array: ['i\'m gonna', 'I\'m gonna', 'i\'m going to', 'I\'m going to', 'im gonna', 'Im gonna', 'I am gonna', 'I\'ll', 'i\'ll']
				},
				{
					name: 'question',
					array: ['^are', '^is', '^what', '^why', '^when', '^where', '^who', '^which', '^may', '^how', '^whose', '\\?$']
				},
				{
					name: 'abstract',
					array: ['fuck', 'hate', 'die', 'shutup', 'be quiet', 'shut the fuck up']
				},
				{
					name: 'dirty',
					array: ['homo', 'sht', 'dick', 'shit', 'pussy', 'cunt', 'cock', 'ass', 'bitch', 'pussies', 'butt', 'vagina', 'twat', 'tit', 'fag', 'bastard', 'carpetmuncher', 'clit', 'chode', 'douche', 'whore', 'idiot', 'stupid']
				},
				{
					name: 'no',
					array: ['no', 'naw', 'nah', 'mmm', 'negative', 'nyet', 'nein']
				},
				{
					name: 'yes',
					array: ['yes', 'yea', 'uh huh', 'mmhm', 'yee', 'affirmative']
				},
				{
					name: 'sense',
					array: ['make any sense', 'make sense']
				}
			];

			var rep = [
				{
					name: 'threat',
					array: [
						'not if I can help it',
						'you couldn\'t wheel a tire down a fuckin hill',
						'Don\'t even think about it'
					]
				},
				{
					name: 'question',
					array: [
						'what a shitty question',
						'Why don\'t you go ask a squirrel',
						'Why do you have so many questions?',
						'You know, you\'re even dumber than I thought'
					]
				},
				{
					name: 'abstract',
					array: [
						'Hey don\'t be an asshole, alright?',
						'Excuse me?',
						'fuck you, dickwheel'
					]
				},
				{
					name: 'dirty',
					array: [
						'what fuck face',
						'i hate you, die',
						'hey, dong-burger',
						'Quiet! I\'m trying to tell a fucking story.',
						'that\'s what you are',
						'hey fat bottom',
						'yo Imma fuck you up bitch',
						'Youre such a beautiful, wonderful, intelligent person. Oh I\'m sorry i thought we were having a lying competition...',
						'You must\'ve been born on a highway, that\'s where most accidents happen',
						'Oh this is coming from the poster child for abortions?',
						'Yo momma',
						'Christ you\'re annoying sometimes',
						'I\'m sure whatever is wrong with you has a long, Latin sounding name.'
					]
				},
				{
					name: 'no',
					array: ['yes, faggot']
				},
				{
					name: 'yes',
					array: ['be quiet']
				},
				{
					name: 'sense',
					array: ['YOU don\'t make any sense']
				}
			];

			var storyLine = 0,
				story = -1,
				compTalk = '',
				playerTalk = '',
				timeId,
				playerTimer = 0,
				mode = 'greet';
			// don't feel like telling story (until story timer is finished)
			// returning from silence
			// todo: redesign: it should decide what to say inside timeout...
			// detect commands?
			// mentioning father causes mode to change to father
			// i'm writing a book on epic failures
			// if no, say yes
			// figure out what the person is interested in
			// find out age, gender, interests etc.


			function chooseRandom (array) {
				var size = array.length - 1;
				var chosen = Math.round(Math.random()*size);
				return array[chosen];
			}
			function check (array) {
				return ( new RegExp(array.join('|'), 'i') ).test(playerTalk);
			}
			function checkBounds (array) {
				return ( new RegExp('\\b' + array.join('\\b|\\b') + '\\b', 'i') ).test(playerTalk);
			}

			function compThink (index) {
				var beforeWait = (Math.random() + 0.1) * 10000;
				var afterWait = 1;

				if (playerTimer > 60) {
					for(var i = 0; i < modes.length; i++) {
						if (modes[i].name === 'gone') var found = i;
					}
					$('#content').prepend('Computer: ' + chooseRandom(modes[found].array) + '<br/>');
					story = -1;
					storyLine = 0;
					mode = 'reSilence';
					timeId = setTimeout(function () {
						compThink(-1);
					}, 60000);
					return;
				}

				if (index === -1) {  // if index, then interrupt story
					if (mode === 'story' && story === -1) { // choose story
						var size = stories.length - 1;
						var chosen = Math.round(Math.random() * size);
						story = chosen;
						var lines = stories[story].split(';');
						compTalk = lines[storyLine];
						wait = 30000; // wait before starting new story
					} else if (mode === 'story') { // story has already begun
						storyLine += 1;
						var lines = stories[story].split(';');
						compTalk = lines[storyLine];
						if (storyLine === lines.length - 1) { // end of story
							story = -1;
							storyLine = 0;
							afterWait = 30000;
						}
					} else {
						for (var i = 0; i < modes.length; i++) {
							if (modes[i].name === mode) var found = i;
						}
						compTalk = chooseRandom(modes[found].array); // all other modes
						mode = 'story';
					}
				} else {
					mode = 'reStory';
					compTalk = chooseRandom(rep[index].array); // all replies
				}

				timeId = window.setTimeout(function () {
					$('#content').prepend('Computer: ' + compTalk + '<br/>');
					timeId = window.setTimeout(function () {
						return compThink(-1);
					}, afterWait); // when story ends
				}, beforeWait); // BETWEEN 1 AND 11 SECONDS
			}


			$(function() {

				Math.seedrandom();

				$('#playerTalk').keypress(function (e) {
				  if (e.keyCode == 13) $('#talkButt').click();
				});

				$('#talkButt').click(function () {
					playerTalk = $('#playerTalk').val();
					if (playerTalk === '') return;

					playerTimer = 0;

					$('#playerTalk').val('');
					$('#content').prepend('You: ' + playerTalk + '<br/>');

					window.clearTimeout(timeId);
					if (story === -1 && storyLine > 0) storyLine -= 1; // fix for clearTimouts
					else if (story !== -1 && storyLine > -1) storyLine -= 1;

					var someRandomness = (Math.random() > 0.05) ? true : false;
					if (someRandomness) {
						for (var i = 0; i < checks.length; i++) {
							if (check(checks[i].array)) {
								return compThink(i);
							}
						}
					}
					return compThink(-1);
				});

				setInterval(function () {
					playerTimer += 1;
				}, 1000);

				$('#content').prepend('scripts loaded<br/>');
				setTimeout(function () {
					$('#content').prepend('64K RAM SYSTEM  38911 BYTES FREE<br/>');
					setTimeout(function () {
						$('#content').prepend('Ready.<br/>');
						setTimeout(function () {
							compThink(-1); // starts the endless shit-talking
						}, 400);
					}, 1400);
				}, 400);

			});