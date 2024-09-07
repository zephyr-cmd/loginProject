// use in certificate
export function dateConversion(inputDateString) {
  // Input date string
  let date = new Date(inputDateString);

  // Array of month names
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extracting day, month, and year
  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  // Formatted date string
  let formattedDateString = day + " " + month + "," + " " + year;

  console.log("L-32 formattedDateString ::", formattedDateString);

  // return date.toLocaleDateString(); // 5/12/2020
  return formattedDateString;
}

// use in home & appointment to show appointmentDate with time
export function dateTimeConversion(inputDateString) {
  // Input date string
  let appointDateObject = new Date(inputDateString);

  // Adjust the time by adding 5 hours and 30 minutes
  appointDateObject.setHours(appointDateObject.getHours() - 5);
  appointDateObject.setMinutes(appointDateObject.getMinutes() - 30);

  // Convert the Date object back to a string
  inputDateString = appointDateObject.toLocaleString();
  return inputDateString;
}

// ageCalculator for the given DOB
export function ageCalculator(dateString) {
  const birthday = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();

  // If the current month is less than the birth month or
  // if the current month is equal to the birth month but the current day is less than the birth day,
  // the age needs to be decremented by 1
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}

// extra time added (in minutes) for the given time
export function currentTime(givenDate, extraTime) {
  let currentTime;
  if (givenDate) {
    currentTime = new Date(givenDate);
  } else {
    currentTime = new Date();
  }
  // var currentOffset = new Date().getTimezoneOffset();
  var currentOffset = 0;
  var ISTOffset = 330; // IST offset UTC +5:30
  var created_at = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  created_at.setMinutes(created_at.getMinutes() + extraTime);
  // console.log("L-80, created_at + 15min", created_at);
  return created_at;
}

// get the date of nth day in past or future depend on value of n is negative or positive
export function getNthDate(givenDate, n) {
  // console.log("L-91, given date", givenDate);
  let currentDate;
  if (givenDate != undefined) {
    currentDate = new Date(givenDate);
  } else {
    currentDate = new Date();
  }
  const previousDate = new Date(
    currentDate.getTime() + n * 24 * 60 * 60 * 1000
  );

  // Adjust for timezone offset to get the exact date at midnight in the local timezone
  const localMidnight = new Date(
    previousDate.getTime() - previousDate.getTimezoneOffset() * 60000
  );

  const lastDateTime = localMidnight.toISOString().slice(0, 10);
  return lastDateTime;
}

// current local date & time on LOCAL
// export function currentDateTime() {
//   return new Date(
//     new Date().getTime() - new Date().getTimezoneOffset() * 60000
//   ).toISOString();
// }
// current local date & time on Server
export function currentDateTime() {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours() + 5,
    new Date().getMinutes() + 30
  );
}
