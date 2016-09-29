# RealMassive Search

## Quick Start
Install dependencies and run app locally
```bash
npm install
npm start
npm run test:dev-verbose
```
## Progress
 - Type and Size filter work.
 - Covers seem rare, so I used 'exterior' attachment instead.
 - Using hard coded pagination (offset 26, limit 25)
   - Code is there to change it, just didn't write UI to control it
 - Majority of the logic is tested.
   - Left out component tests for now, would probably use snapshot tests in real project.

## Boilerplate Info
This project is built on a boilerplate that I have developed and customized to my liking, which makes use of modern dev tools such as React, Redux, Sagas, Storybook, and much more.
