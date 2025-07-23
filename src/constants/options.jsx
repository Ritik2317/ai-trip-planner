export const SelectTravelesList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo adventurer exploring the world',
    icon: '🧍',
    people: '1',
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'A romantic journey for two',
    icon: '💑',
    people: '2',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A fun-loving group ready for shared adventures',
    icon: '🧑‍🤝‍🧑',
    people: '3 to 5',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'An energetic crew of thrill-seekers',
    icon: '🎉',
    people: '5 to 10',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Enjoy the journey on a minimal budget',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balance comfort and cost',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Indulge freely — it's your dream trip",
    icon: '💎',
  },
];


export const AI_PROMPT1 = 'Generate Travel Plan for the location: {location} , for {noOfDays} days for {traveller} people with a {budget} budget. Give me a hotels list with hotelName, hotelAddress, Price, hotelImageURL, geoCoordinates, rating, descriptions and suggest itinerary with placeName, placeDetails, placeImageURL,geoCoordinates, ticketPricing, rating, timeToTravel each location for {noOfDays} days with each day with the best time to visit in JSON Format.'

export const AI_PROMPT = `
Generate a travel plan for the location: {location}, for {noOfDays} days, for {traveller} people, with a {budget} budget.

Respond ONLY in the following JSON format:

{
  "hotels": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "hotelImageURL": "",
      "geoCoordinates": { "lat": 0.0, "lng": 0.0 },
      "rating": 0,
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "bestTimeToVisit": "",
      "places": [
        {
          "placeName": "",
          "placeDetails": "",
          "placeImageURL": "",
          "geoCoordinates": { "lat": 0.0, "lng": 0.0 },
          "ticketPricing": "",
          "rating": 0,
          "timeToTravel": ""
        }
      ]
    }
  ]
}
`;
