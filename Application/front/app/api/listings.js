import apiClient from "./client";

// const searchFlights = ({arrival,departure,departure_date}) =>
//     apiClient.get("/flight/search", { 
       
//           arrival:arrival,
//           departure:departure,
//           departure_date:departure_date
// });

const searchFlights = (flightSearchData) => {
    return apiClient.post("/flight/search",
        {arrivalAirport:flightSearchData.arrival,
        departureAirport:flightSearchData.departure,
        departureDate:flightSearchData.departure_date,
        });
    };
export default { searchFlights }
