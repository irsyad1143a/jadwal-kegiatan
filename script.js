const schedule = [
  // Senin hingga Jumat (1-5)
  { days: [1, 2, 3, 4, 5, 6, 0], start: "04:00", end: "04:30", activity: "Sholat suhuh wak👍" },
  { days: [1, 2, 3, 4, 5], start: "04:30", end: "08:30", activity: "Lanjut tidur" },
  { days: [1, 2, 3, 4, 5], start: "08:30", end: "09:00", activity: "berangkat PKL" },
  { days: [1, 2, 3, 4, 5], start: "09:00", end: "12:00", activity: "lagi PKL wak 😎" },
  { days: [1, 2, 3, 4, 5], start: "12:00", end: "13:00", activity: "Istirahat Makan Siang dan Sholat Dzuhur" },
  { days: [1, 2, 3, 4, 5], start: "13:00", end: "15:00", activity: "Lanjut PKL" },
  { days: [1, 2, 3, 4, 5], start: "15:00", end: "15:30", activity: "sholat ashar" },
  { days: [1, 2, 3, 4, 5], start: "15:30", end: "16:30", activity: "beres-beres PKL" },
  { days: [1, 2, 3, 4, 5], start: "16:30", end: "17:00", activity: "balik PKL wak 😁" },
  { days: [1, 2, 3, 4, 5], start: "17:00", end: "18:00", activity: "baca artikel wak" },
  // Sabtu dan Minggu (6,0)
  { days: [6, 0], start: "04:30", end: "07:00", activity: "lanjut turu" },
  { days: [6, 0], start: "07:00", end: "08:00", activity: "olah raga" },
  { days: [6, 0], start: "08:00", end: "12:00", activity: "gabut, antara main game atau lanjut laporan" },
  { days: [6, 0], start: "12:00", end: "12:30", activity: "sholat Dzuhur" },
  { days: [6, 0], start: "12:30", end: "15:00", activity: "gabut lagi" },
  { days: [6, 0], start: "15:00", end: "15:30", activity: "Sholat Ashar" },
  { days: [6, 0], start: "15:30", end: "18:00", activity: "gabut lagi dan lagi" },

  { days: [1, 2, 3, 4, 5, 6, 0], start: "18:00", end: "18:30", activity: "sholat magrib" },
  { days: [1, 2, 3, 4, 5, 6, 0], start: "18:30", end: "19:00", activity: "lagi ngaji wak jan ganggu!!" },
  { days: [1, 2, 3, 4, 5, 6, 0], start: "19:00", end: "19:30", activity: "Sholat Isya" },
  { days: [1, 2, 3, 4, 5, 6, 0], start: "19:00", end: "21:00", activity: "Lagi main Game😏" },
  { days: [1, 2, 3, 4, 5, 6, 0], start: "21:00", end: "04:00", activity: "turu🛌💤" },
];

function displayCurrentTime() {
  let now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  let dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let currentDayName = dayNames[day];

  document.getElementById("currentTime").innerHTML = "Hari: " + currentDayName + "<br>" + " Jam: " + formattedTime;
  return {
    currentTime: formattedTime.substring(0, 5),
    currentDay: day,
  };
}

function showScheduleTable(currentDay) {
  const workSchedule = document.getElementById("workSchedule");
  const holidaySchedule = document.getElementById("holidaySchedule");

  // Reset all highlighted rows
  document.querySelectorAll("tr").forEach((row) => {
    row.classList.remove("current-activity");
  });

  if (currentDay >= 1 && currentDay <= 5) {
    workSchedule.style.display = "table";
    holidaySchedule.style.display = "none";
    return workSchedule;
  } else {
    workSchedule.style.display = "none";
    holidaySchedule.style.display = "table";
    return holidaySchedule;
  }
}

function checkSchedule() {
  let current = displayCurrentTime();
  let currentTime = current.currentTime;
  let currentDay = current.currentDay;

  let activeTable = showScheduleTable(currentDay);
  let found = false;

  // Ambil elemen info kegiatan saat ini
  const currentActivityInfo = document.getElementById("sidebarActivity");
  currentActivityInfo.style.display = "none"; // Sembunyikan secara default

  schedule.forEach((item) => {
    if (item.days.includes(currentDay) && currentTime >= item.start && currentTime <= item.end) {
      document.getElementById("activity").innerText = item.activity;
      found = true;

      // Highlight the corresponding row in the table
      let rows = activeTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
      for (let row of rows) {
        let startTime = row.cells[0].innerText;
        let endTime = row.cells[1].innerText;
        if (startTime === item.start && endTime === item.end) {
          row.classList.add("current-activity");

          // Dapatkan posisi baris aktif dan tabel
          const rowRect = row.getBoundingClientRect();
          const tableRect = activeTable.getBoundingClientRect();

          // Posisikan sidebar tepat di sebelah kanan baris yang memiliki background kuning
          currentActivityInfo.style.top = `${rowRect.top + window.scrollY}px`; // Sejajarkan vertikal dengan baris
          currentActivityInfo.style.left = `${tableRect.right + 5 + window.scrollX}px`; // Tepat di kanan tabel dengan jarak 20px

          // Update teks dengan kegiatan saat ini
          currentActivityInfo.innerText = `👈sekarang lagi ${item.activity}`;
          currentActivityInfo.style.display = "block"; // Tampilkan elemen

          break; // Keluar dari loop setelah menemukan baris yang sesuai
        } else {
          row.classList.remove("current-activity");
        }
      }
    }
  });

  if (!found) {
    document.getElementById("activity").innerText = "nganggur wak";
    currentActivityInfo.style.display = "none"; // Sembunyikan jika tidak ada kegiatan
  }
}

setInterval(checkSchedule, 1000);
checkSchedule();
