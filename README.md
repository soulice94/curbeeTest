# Curbee Technical Assigment

## Abstract

Hello Curbee Team! My name is Pedro Flores and this is the final result of my technical assignment for trying to work at the company. The projects was developed with ```Next.js v13.4.19```, I also used some libraries like ```SweetAlert2```, ```React Final Form``` and ```Styled Components```. Below I'll try to explain my development process and my final thoughts about this technical assigment.

## Technical Detailment Process

1. First I create a fresh instalation from NextJS using typescript as principal language, because I prefer typescript for having good code base with knowledge about the data I need to use and modify. Also I add the styled components library, I really like this library because let me use css components as react components, at first I was working very well but in the developing I was founding some problems with the SSR and I don't have much time to solve it so in the later development I use the css procesor that comes with NextJS. In the end I add the color sheet that comes in the  technical PDF.

2. I add the skeleton for the login form and the header for the app, like this was an early stage the components almost were empty. Basically I just add the css styling.

3. I made the API for the login, before I implement the call in the front end I used ```Postman``` Mac tool for testing the endpoints, when the endpoints give me a good response I save the schema of the response and made the API calls through NextJS API mechanism. Also in this step I try to handle the ```Bearer Token```.

4. In this step I add a first attempt to build a middleware for handle the ```authorization``` in the app, then I had to install the ```cookies``` and ```cookies-next``` packages to handle the logic for the login flow, further I modify the log in endpoint for manage the ```Bearer Token``` in a better way. Also I installed the ```SweetAlert2``` library for show beatiful modals.

5. In this part I completed the login flow adding the token in some calls, also I started to work with the free dates and appointments through the ```API```.

6. Basically in this step I wrote the appointments component, this made the API call to the NextJS local endpoint and populate a first appointments list.




## Final thoughts


## Run the project

First, run the development server:

```bash
yarn run dev
```

