export default function handler(req, res) {
  res.status(200).json([
    {
      name: "New York City",
      lat: 47.9241546,
      lng: 106.9309601,
      description:
        "The largest city in the United States, known for its iconic skyline and cultural diversity.",
      image_url: "https://source.unsplash.com/800x600/?new-york-city",
      population: 8398748,
      attractions: [
        "Statue of Liberty",
        "Central Park",
        "Empire State Building",
      ],
      phone_number: "+1 (555) 123-4567",
      work_time: "11:00 am - 11:00 pm",
    },
    {
      name: "Paris",
      lat: 48.856613,
      lng: 2.352222,
      description:
        "The capital of France, famous for its art, fashion, and romantic ambiance.",
      image_url: "https://source.unsplash.com/800x600/?paris",
      population: 2206488,
      attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
      phone_number: "+33 1 23 45 67 89",
      work_time: "10:00 am - 9:00 pm",
    },
    {
      name: "Tokyo",
      lat: 35.682839,
      lng: 139.759455,
      description:
        "The vibrant capital of Japan, known for its modern technology and rich history.",
      image_url: "https://source.unsplash.com/800x600/?tokyo",
      population: 13929286,
      attractions: ["Tokyo Tower", "Shibuya Crossing", "Imperial Palace"],
      phone_number: "+81 3 1234 5678",
      work_time: "9:00 am - 10:00 pm",
    },
    {
      name: "Sydney",
      lat: -33.8688,
      lng: 151.2093,
      description:
        "The largest city in Australia, renowned for its beautiful harbor and beaches.",
      image_url: "https://source.unsplash.com/800x600/?sydney",
      population: 5311900,
      attractions: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge"],
      phone_number: "+61 2 9876 5432",
      work_time: "8:00 am - 8:00 pm",
    },
  ]);
}
