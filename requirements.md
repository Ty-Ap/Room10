# Software Requirements

## Our Project

Our vision - A game where users are put into a series of rooms, and their goal is to get to Room 10 and win the game. The way to progress to the next room will be a challenge specific to each room. The challenges can be anything from a riddle to a math problem.

What problem or pain point does it solve? -  It's a game so it just provides entertainment and hopefully some mental stimulation. The pain point is boredom.

Why should we care about your product? - Because it's fun! It presents a variety of mental challenges and lets you play with others, what more could you want?

## Scope (In/Out)

IN - Present users with minigames like hangman, math challenges, riddles etc.

Describe the individual features that your product will do - Connect users to a room, guide them along from Room1 to Room10, and allow users to chat with other people in the same room.

OUT - What will your product not do.

Our project will NOT have a fun/flashy UI. It is meant to be played in the command line only.

## MVP

Minimum Viable Product (MVP) definition. - Users should be able to go from room 1 to 10 based on their input. For MVP we will use all math problems, and expand those to more challenge types as part of our presentation polish. Additinonally we should be able to have users stored in a database and have their accounts password protected.

What are your stretch goals? - Our stretch goals are largely based on fleshing out our 10 minigames. Initially it will be ten simple math challenges but we hope to expand that to more fleshed out and interesting games.

## Functional Requirements

List the functionality of your product. This will consist of tasks such as the following:

Users can create a password protected account.
Each playthrough should update user's statistics.
Players can join the server and are asked if they're ready.
Players can see how many are in the same room as them.
Players receive feedback if they aren't moved to the next room.

## Data Flow

Data flow should be pretty straightforward. WebSocket server will start, Clients will connect and be prompted for a username password. Server will verify those credentials with our database, and get user details. Once Authenticated user will be and be placed in room 1. Once placed in a room they will be polled for a ready event. Server will wait for a ready, then emit a question/game/riddle event. Client will emit an answer event with their response in the payload. This pattern will repeat until users 'escape' room 10 where they will get a win event instead of a question.

## Non-Functional Requirements (301 & 401 only)

Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.

### Security

Our app will implement security fundamentals like basic authentication and not storing passwords directly. We intend to use brcrypt to hash user passwords and store those. User accounts need to be secured to maintain the integrity of our leaderboards, as well as to prevent the spamming of comments/chats in rooms.

### Testability

Our approach to testing will be to focus on integration testing wherever possible, and to address any testing gaps with unit tests. For unit testing each game we should easily be able to unit test them by providing simulated user inputs both correct and incorrect. We have unit tests from previous WebSocket labs that we should be able to rely on as well. Ideally most of our code will be tested by importing our server start function into our client test file and then use the tests to go through a 'happy path'.

If you are stuck on what non-functional requirements are, do a quick online search and do some research. Write a minimum of 3-5 sentences to describe how the non-functional requirements fits into your app.

You MUST describe what the non-functional requirement is and how it will be implemented. Simply saying “Our project will be testable for testibility” is NOT acceptable. Tell us how, why, and what.
