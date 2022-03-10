"use strict";

const titlesEl = document.querySelectorAll(".card__title");
const currentHrsEl = document.querySelectorAll(".current-hours");
const previousHrsEl = document.querySelectorAll(".previous-hours");
const btns = document.querySelectorAll(".time");

let titles = [];
let dailyCurrent = [];
let weeklyCurrent = [];
let monthlyCurrent = [];
let dailyPrevious = [];
let weeklyPrevious = [];
let monthlyPrevious = [];

async function getData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
      titles.push(data[i].title);
      dailyCurrent.push(data[i].timeframes.daily.current);
      weeklyCurrent.push(data[i].timeframes.weekly.current);
      monthlyCurrent.push(data[i].timeframes.monthly.current);
      dailyPrevious.push(data[i].timeframes.daily.previous);
      weeklyPrevious.push(data[i].timeframes.weekly.previous);
      monthlyPrevious.push(data[i].timeframes.monthly.previous);
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

function showStats(current, previous, time) {
  titlesEl.forEach((title, i) => (title.innerHTML = `${titles[i]}`));
  currentHrsEl.forEach((hour, i) => (hour.innerHTML = `${current[i]}hrs`));
  previousHrsEl.forEach(
    (hour, i) =>
      (hour.innerHTML = `Last ${
        time === "daily" ? "Day" : time === "monthly" ? "Month" : "Week"
      } - ${previous[i]}hrs`)
  );
}

getData()
  .then(() => {
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        btns.forEach((btn) => btn.classList.remove("active"));

        if (btn.classList.contains("time--daily")) {
          showStats(dailyCurrent, dailyPrevious, "daily");
          btn.classList.add("active");
        } else if (btn.classList.contains("time--weekly")) {
          showStats(weeklyCurrent, weeklyPrevious, "weekly");
          btn.classList.add("active");
        } else if (btn.classList.contains("time--monthly")) {
          showStats(monthlyCurrent, monthlyPrevious, "monthly");
          btn.classList.add("active");
        }
      })
    );

    showStats(weeklyCurrent, weeklyPrevious, "weekly");
    btns[1].classList.add("active");
  })
  .catch((err) => console.error(err.message));
