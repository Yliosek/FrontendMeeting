const personSelect = document.getElementById("personSelect");
const slotsList = document.getElementById("slotsList");

// Pobieranie osób z backendu
async function loadPersons() {
  const res = await fetch("/api/persons"); // zmień na pełny URL jeśli trzeba
  const persons = await res.json();
  persons.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    personSelect.appendChild(option);
  });
}

// Pobieranie slotów dla wybranej osoby
async function loadSlots(personId) {
  slotsList.innerHTML = "";
  if (!personId) return;

  const res = await fetch(`/api/slots?personId=${personId}`);
  const slots = await res.json();

  slots.forEach(s => {
    const li = document.createElement("li");
    li.textContent = new Date(s.datetime).toLocaleString();

    const btn = document.createElement("button");
    btn.textContent = "Rezerwuj";
    btn.onclick = async () => {
      await fetch("/api/slots/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: s.id, userName: "Anna Nowak" })
      });
      alert("Zarezerwowano!");
      loadSlots(personId); // odśwież sloty
    };

    li.appendChild(btn);
    slotsList.appendChild(li);
  });
}

// Obsługa zmiany wyboru osoby
personSelect.addEventListener("change", () => {
  loadSlots(personSelect.value);
});

// start
loadPersons();
