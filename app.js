import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

async function matchBuyersToTravellers() {
  const [buyersSnap, travellersSnap] = await Promise.all([
    getDocs(collection(db, 'buyers')),
    getDocs(collection(db, 'travellers'))
  ]);
  const travellerMap = {};
  travellersSnap.forEach(doc => {
    const t = doc.data(), k = `${t.fromLocation}|${t.toLocation}|${t.travelDate}`;
    (travellerMap[k] ||= []).push(doc.id);
  });
  const matches = [];
  buyersSnap.forEach(buyerDoc => {
    const b = buyerDoc.data();
    Object.entries(travellerMap).forEach(([k, ids]) => {
      const [from, to, travelDate] = k.split('|');
      if (b.fromLocation === from && b.toLocation === to && new Date(b.deliveryDate) >= new Date(travelDate))
        ids.forEach(travellerId => matches.push({ buyer: buyerDoc.id, traveller: travellerId }));
    });
  });
  console.log("Matches Found:", matches);
}