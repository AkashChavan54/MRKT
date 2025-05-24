import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Helper
const $ = id => document.getElementById(id);

// Buyer form
$('buyerFormElem').addEventListener('submit', async e => {
  e.preventDefault();
  const [name, phone, from, to, product] = 
    ['buyerName','buyerPhone','buyerFrom','buyerTo','buyerProduct'].map(id => $(id).value.trim());
  if (![name, phone, from, to, product].every(Boolean)) return alert("Please fill all fields.");
  try {
    await addDoc(collection(db, "buyers"), { name, phone, from: from.toLowerCase(), to: to.toLowerCase(), product, createdAt: new Date() });
    alert("Request submitted!");
    e.target.reset();
  } catch {
    alert("Submission failed. Try again.");
  }
});

// Traveller form & matching
$('travellerFormElem').addEventListener('submit', async e => {
  e.preventDefault();
  const from = $('travellerFrom').value.trim().toLowerCase();
  const to = $('travellerTo').value.trim().toLowerCase();
  const matchesDiv = $('matches');
  matchesDiv.innerHTML = "Loading...";
  try {
    const q = query(collection(db, "buyers"), where("from", "==", from), where("to", "==", to));
    const snap = await getDocs(q);
    if (snap.empty) return matchesDiv.innerHTML = "<div class='alert alert-warning'>No matching requests found.</div>";
    let rows = '';
    snap.forEach(doc => {
      const d = doc.data();
      rows += `<tr><td>${d.name}</td><td>${d.phone}</td><td>${d.from}</td><td>${d.to}</td><td>${d.product}</td></tr>`;
    });
    matchesDiv.innerHTML = `<table class="table table-bordered table-striped"><thead><tr>
      <th>Name</th><th>Phone</th><th>From</th><th>To</th><th>Product</th></tr></thead><tbody>${rows}</tbody></table>`;
  } catch {
    matchesDiv.innerHTML = "<div class='alert alert-danger'>Error loading matches.</div>";
  }
});
