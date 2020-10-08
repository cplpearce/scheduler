# Interview Scheduler
Do you have a busy schedule?  Do you need a way to manage your schdedule, or are you looking to integrate a pre-built schdule into your react app!

Look no further - included is a live calendar, with the ability to GET, PUT and DELETE appointments.

## Setup
Install dependencies and required modules with:
```
npm install
```
## First run
Start the server with:
```
npm start
```
## Test via Jest
Run unit and integrated tests with Jest:
```
npm test
```
## Test via Storybook
View the React components in Storybook:
```
npm run storybook
```
## Test via Cypress
Run End-to-End testing with Cypress:
```
npm run cypress
```


## Dependencies
  "axios": "^0.20.0",
  "classnames": "^2.2.6",
  "normalize.css": "^8.0.1",
  "react": "^16.13.1",
  "react-dom": "^16.13.1",
  "react-hooks-testing-library": "^0.6.0",
  "react-scripts": "3.0.0"

## Data Feed
fed by either static data or any server catering to the folloing endpoints:
```
`GET /api/days`
```
Expected Response

```
json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```
`GET /api/appointments`

Expected Response

```
json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  }
}
```
GET /api/interviewers

```
Expected Response

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```

## Screenshots
### View Appointments for Monday
![Alt text](https://raw.githubusercontent.com/cplpearce/scheduler/master/screenshots/view-days.png)
### View appointments for Wednesday
![Alt text](https://raw.githubusercontent.com/cplpearce/scheduler/master/screenshots/view-wednesday.png)
### Submit a new appointment
![Alt text](https://raw.githubusercontent.com/cplpearce/scheduler/master/screenshots/new--submit.png)
### View a newly created Appointment
![Alt text](https://raw.githubusercontent.com/cplpearce/scheduler/master/screenshots/view-new.png)
