import express from "express";
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define an array of advice for each day of the week
const adviceArray = {
  Sunday: "Relax and prepare for the upcoming week!",
  Monday: "Kickstart your week with some energy!",
  Tuesday: "Keep up the momentum, you're doing great!",
  Wednesday: "Halfway there, take a short break!",
  Thursday: "Almost Friday, stay focused!",
  Friday: "Finish strong and enjoy your weekend!",
  Saturday: "Time to unwind and have some fun!"
};

// Route to render the EJS page
app.get('/', (req, res) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const dayType = daysOfWeek[today.getDay()]; // Get current day of the week

  // Render the EJS template and pass the day and advice
  res.render('index.ejs', {
    dayType: dayType,
    advice: adviceArray[dayType]
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Weekday Warrior app is running on http://localhost:${port}`);
});
