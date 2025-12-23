const dateArray = [
    "24-Apr-2024",
    "02-May-2024",
    "09-May-2024",
    "31-May-2024",
    "21-Jun-2024",
];

const strategyArray = [
    {
        View: "Bullish",
        Value: {
            "24-Apr-2024": [
                "Bull Call Spread",
                "Bull Put Spread",
                "Bull Put Spread",
                "Long Call",
                "Bull Put Spread",
                "Bull Call Spread",
                "Strategy1",
                "Bull Call Spread",
                "Strategy1",
                "SpreadStrategy",
            ],
            "02-May-2024": [
                "Bull Call Spread",
                "Bull Call Spread",
                "Bull Put Spread",
                "Long Call",
                "Long Call",
                "Bull Put Spread",
                "Strategy1",
                "Bull Call Spread",
                "Strategy2",
                "Strategy1",
            ],
            "09-May-2024": [
                "Strategy Put",
                "Strategy Call",
                "Strategy Call",
                "Strategy Call",
                "Strategy Put",
            ],
        },
    },
    {
        View: "Bearish",
        Value: {
            "24-Apr-2024": [
                "Bear Call Spread",
                "Bear Call Spread",
                "Bear Call Spread",
                "Long Put",
                "Long Put",
                "Long Put",
            ],
            "31-May-2024": ["Long Put", "Long Put", "Long Put", "Long Put"],
            "21-Jun-2024": [
                "Strategy3",
                "Strategy3",
                "Bear Put Spread",
                "Strategy3",
                "Long Put",
                "Long Put",
            ],
        },
    },
    {
        View: "Rangebound",
        Value: {
            "24-Apr-2024": [
                "Short Straddle",
                "Short Strangle",
                "Short Strangle",
                "Iron Butterfly",
                "Short Strangle",
                "Short Straddle",
                "Strategy1",
                "SpreadStrategy",
                "Short Straddle",
            ],
            "02-May-2024": [
                "Short Straddle",
                "Short Straddle",
                "Short Strangle",
                "Iron Butterfly",
                "Iron Butterfly",
                "Short Strangle",
            ],
            "21-Jun-2024": ["Iron Condor", "Iron Butterfly", "Iron Butterfly"],
        },
    },
    {
        View: "Volatile",
        Value: {
            "02-May-2024": [
                "Long Straddle",
                "Long Strangle",
                "Long Strangle",
                "Long Strangle",
                "Strategy1",
                "SpreadStrategy",
            ],
            "09-May-2024": [
                "Long Straddle",
                "Long Straddle",
                "Long Strangle",
                "Strategy1",
                "Strategy2",
            ],
            "31-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle"],
        },
    },
];

let selectedView = "Bullish";
let selectedDate = dateArray[0];

const tabs = document.querySelectorAll(".tab");
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownList = document.getElementById("dropdownList");
const selectedDateEl = document.getElementById("selectedDate");
const strategyContainer = document.getElementById("strategyContainer");
const emptyState = document.getElementById("emptyState");
const emptyDate = document.getElementById("emptyDate");

renderDates();
renderStrategies();

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        selectedView = tab.textContent;
        renderStrategies();
    });
});

dropdownToggle.addEventListener("click", () => {
    dropdownList.classList.toggle("open");
});

function renderDates() {
    dropdownList.innerHTML = "";
    selectedDateEl.textContent = formatDate(selectedDate);

    dateArray.forEach((date) => {
        const div = document.createElement("div");
        div.className = "dropdown-item";
        div.textContent = formatDate(date);

        div.onclick = () => {
            selectedDate = date;
            selectedDateEl.textContent = formatDate(date);
            dropdownList.classList.remove("open");
            renderStrategies();
        };

        dropdownList.appendChild(div);
    });
}

function renderStrategies() {
    strategyContainer.innerHTML = "";
    emptyState.classList.add("hidden");

    const viewData = strategyArray.find((v) => v.View === selectedView);
    const strategies = viewData?.Value[selectedDate];

    if (!strategies || strategies.length === 0) {
        emptyDate.textContent = formatDate(selectedDate);
        emptyState.classList.remove("hidden");
        return;
    }

    const counts = strategies.reduce((acc, name) => {
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    Object.entries(counts).forEach(([name, count]) => {
        const card = document.createElement("div");
        card.className = "strategy";
        card.innerHTML = `
            <span>${name}</span>
            <span class="count">• ${count} ${count === 1 ? "Strategy" : "Strategies"}</span>
        `;
        strategyContainer.appendChild(card);
    });
}

function formatDate(date) {
    return date.replace(/-/g, " ");
}