// ===================================================
//   SV CHAT CENTER v8 — script.js
//   ✅ UPI Payment Modal (tztejaszombade@oksbi)
//   ✅ Dynamic Categories in Add-Item dropdown
//   ✅ Customer: Order Online / Come to Store
//   ✅ Delivery Zone (5-10km, ₹300+ order)
//   ✅ Admin: Contact Number Selector
//   ✅ Customer data saved to Firebase
//   ✅ Enhanced Analytics (Daily/Weekly/Monthly)
// ===================================================

const ADMIN_SECRET_KEY = "sv@secret2024";
const DEFAULT_ADMIN = { username:"admin", password:"sv@admin", name:"Owner", email:"tejaszombade55@gmail.com" };

// ===================================================
//   ✅ UPI PAYMENT CONFIG
// ===================================================
const UPI_CONFIG = {
  upiId:   "tztejaszombade@oksbi",
  upiNum:  "7218021770",
  name:    "Tejas Zombade",
};

// ===================================================
//   STORE LOCATION & DELIVERY CONFIG
// ===================================================
const STORE_LOCATION = {
  name:     "SV Chat Center & Ice Cream",
  address:  "JQ2X+Q6J, Pimple Saudagar, Pimpri-Chinchwad, Maharashtra 411027",
  lat:      18.5772,
  lng:      73.8055,
  phone:    "9604134624",
  mapUrl:   "https://maps.google.com/?q=JQ2X%2BQ6J,+Pimple+Saudagar,+Pimpri-Chinchwad,+Maharashtra+411027",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8!2d73.8077!3d18.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSV+Chat+Center!5e0!3m2!1sen!2sin!4v1"
};
const DELIVERY_MIN_ORDER  = 300;
const DELIVERY_RADIUS_KM  = 10;
const DELIVERY_CHARGE     = 30;

// ===================================================
//   ADMIN CONTACT NUMBERS CONFIG
// ===================================================
const ADMIN_CONTACT_NUMBERS = [
  { id:"n1", label:"Rupali",  number:"9604134624", whatsapp:true,  active:true  },
  { id:"n2", label:"Prajwal", number:"8308296258", whatsapp:true,  active:false },
  { id:"n3", label:"Tejas",   number:"8766716669", whatsapp:false, active:false },
];

// ===================================================
//   ITEM LABEL SYSTEM
// ===================================================
const ITEM_LABELS = [
  { value:"none",        label:"No Label",           cls:"label-none",        ribbon:""           },
  { value:"bestseller",  label:"⭐ Bestseller",       cls:"label-bestseller",  ribbon:"⭐ Best"     },
  { value:"new-arrival", label:"🆕 New Arrival",      cls:"label-new-arrival", ribbon:"🆕 New"      },
  { value:"must-try",    label:"🔥 Must Try",         cls:"label-must-try",    ribbon:"🔥 Must Try" },
  { value:"seasonal",    label:"🌿 Seasonal Special", cls:"label-seasonal",    ribbon:"🌿 Seasonal" },
  { value:"todays",      label:"☀️ Today's Special",  cls:"label-todays",      ribbon:"☀️ Today's"  },
];

// ===================================================
//   DEFAULT IMAGES
// ===================================================
const DEFAULT_IMAGES = {
  "Samosa Chat":      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
  "Katori Chat":      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
  "Sambharwadi":      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
  "Dahi Puri":        "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Sev Puri":         "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Panipuri (6 pcs)": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Panipuri (12 pcs)":"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Masala Panipuri":  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Sweet Panipuri":   "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Shegaon Kachori":  "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&h=200&fit=crop",
  "Kachori Sabzi":    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&h=200&fit=crop",
  "Gila Wada":        "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
  "Wada Pav":         "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
  "Ice Cream":        "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop",
  "Ice Cream Cup":    "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=200&fit=crop",
  "Kulfi":            "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop",
  "Sugarcane Juice":  "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
  "Masala Chaas":     "https://images.unsplash.com/photo-1544025162-d76538811ef4?w=300&h=200&fit=crop",
  "Lemon Sharbat":    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
  "Rose Milk":        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=200&fit=crop",
  "Bhel Puri":        "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Ragda Patties":    "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300&h=200&fit=crop",
  "Aloo Tikki":       "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300&h=200&fit=crop",
  "Corn Chat":        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=300&h=200&fit=crop",
};

// ===================================================
//   MENU ITEMS
// ===================================================
let ITEMS = [
  { id:"i1",  name:"Samosa Chat",       price:40, cat:"chat",      emoji:"🥗", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      label:"bestseller", image:null },
  { id:"i2",  name:"Katori Chat",       price:50, cat:"chat",      emoji:"🥣", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      label:"none",       image:null },
  { id:"i3",  name:"Sambharwadi",       price:40, cat:"chat",      emoji:"🍲", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      label:"none",       image:null },
  { id:"i16", name:"Dahi Puri",         price:50, cat:"chat",      emoji:"🫙", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      label:"must-try",   image:null },
  { id:"i17", name:"Sev Puri",          price:40, cat:"chat",      emoji:"🍛", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      label:"none",       image:null },
  { id:"i7",  name:"Panipuri (6 pcs)",  price:30, cat:"panipuri",  emoji:"🫧", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  label:"bestseller", image:null },
  { id:"i8",  name:"Panipuri (12 pcs)", price:55, cat:"panipuri",  emoji:"🫧", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  label:"none",       image:null },
  { id:"i9",  name:"Masala Panipuri",   price:40, cat:"panipuri",  emoji:"🌶️", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  label:"must-try",   image:null },
  { id:"i18", name:"Sweet Panipuri",    price:35, cat:"panipuri",  emoji:"🍬", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  label:"new-arrival",image:null },
  { id:"i4",  name:"Shegaon Kachori",   price:40, cat:"kachori",   emoji:"🫓", icon:"kachori-bg",  tag:"tag-kachori",   add:"add-kachori", tagLabel:"Kachori",   label:"bestseller", image:null },
  { id:"i19", name:"Kachori Sabzi",     price:55, cat:"kachori",   emoji:"🍜", icon:"kachori-bg",  tag:"tag-kachori",   add:"add-kachori", tagLabel:"Kachori",   label:"none",       image:null },
  { id:"i5",  name:"Gila Wada",         price:35, cat:"wada",      emoji:"🫔", icon:"wada-bg",     tag:"tag-wada",      add:"add-wada",    tagLabel:"Wada",      label:"none",       image:null },
  { id:"i20", name:"Wada Pav",          price:25, cat:"wada",      emoji:"🥪", icon:"wada-bg",     tag:"tag-wada",      add:"add-wada",    tagLabel:"Wada",      label:"none",       image:null },
  { id:"i6",  name:"Ice Cream",         price:30, cat:"ice",       emoji:"🍦", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", label:"none",       image:null },
  { id:"i10", name:"Ice Cream Cup",     price:40, cat:"ice",       emoji:"🍨", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", label:"none",       image:null },
  { id:"i11", name:"Kulfi",             price:35, cat:"ice",       emoji:"🍡", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", label:"seasonal",   image:null },
  { id:"i12", name:"Sugarcane Juice",   price:30, cat:"beverages", emoji:"🥤", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", label:"none",       image:null },
  { id:"i13", name:"Masala Chaas",      price:25, cat:"beverages", emoji:"🥛", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", label:"none",       image:null },
  { id:"i21", name:"Lemon Sharbat",     price:25, cat:"beverages", emoji:"🍋", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", label:"new-arrival",image:null },
  { id:"i22", name:"Rose Milk",         price:30, cat:"beverages", emoji:"🌹", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", label:"none",       image:null },
  { id:"i14", name:"Bhel Puri",         price:35, cat:"snacks",    emoji:"🫘", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    label:"none",       image:null },
  { id:"i15", name:"Ragda Patties",     price:55, cat:"snacks",    emoji:"🫕", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    label:"must-try",   image:null },
  { id:"i23", name:"Aloo Tikki",        price:40, cat:"snacks",    emoji:"🥔", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    label:"todays",     image:null },
  { id:"i24", name:"Corn Chat",         price:40, cat:"snacks",    emoji:"🌽", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    label:"none",       image:null },
];

// ===================================================
//   BUILT-IN CATEGORIES
// ===================================================
let CATS = [
  { id:"all",       label:"🍽 All",        cls:"cat-all"       },
  { id:"chat",      label:"🥗 Chat",       cls:"cat-chat"      },
  { id:"panipuri",  label:"🫧 Panipuri",   cls:"cat-panipuri"  },
  { id:"kachori",   label:"🫓 Kachori",    cls:"cat-kachori"   },
  { id:"wada",      label:"🫔 Wada",       cls:"cat-wada"      },
  { id:"ice",       label:"🍦 Ice Cream",  cls:"cat-ice"       },
  { id:"beverages", label:"🥤 Beverages",  cls:"cat-beverages" },
  { id:"snacks",    label:"🍟 Snacks",     cls:"cat-snacks"    },
];

const BASE_CAT_IDS = ["all","chat","panipuri","kachori","wada","ice","beverages","snacks"];
const ICON_MAP  = { chat:"chat-bg",panipuri:"panipuri-bg",kachori:"kachori-bg",wada:"wada-bg",ice:"ice-bg",beverages:"bev-bg",snacks:"snack-bg" };
const TAG_MAP   = { chat:"tag-chat",panipuri:"tag-panipuri",kachori:"tag-kachori",wada:"tag-wada",ice:"tag-ice",beverages:"tag-beverages",snacks:"tag-snacks" };
const ADD_MAP   = { chat:"add-chat",panipuri:"add-panipuri",kachori:"add-kachori",wada:"add-wada",ice:"add-ice",beverages:"add-bev",snacks:"add-snack" };
const LABEL_MAP = { chat:"Chat",panipuri:"Panipuri",kachori:"Kachori",wada:"Wada",ice:"Ice Cream",beverages:"Beverages",snacks:"Snacks" };
const BAR_COLORS= { chat:"#E24B4A",panipuri:"#E8622A",kachori:"#7F77DD",wada:"#EF9F27",ice:"#378ADD",beverages:"#3ABABA",snacks:"#9B59B6" };

const ORDER_STATUSES = ["Pending","Preparing","Ready","Done"];

// LOYALTY
const POINTS_PER_RUPEE           = 1;
const LOYALTY_FIREBASE_THRESHOLD = 500;
const REWARD_TIERS = [
  { points:100,  reward:"5% off next order",        icon:"🥉" },
  { points:300,  reward:"Free Ice Cream",            icon:"🥈" },
  { points:500,  reward:"10% off + Free Beverage",  icon:"🥇" },
  { points:1000, reward:"VIP Status + Free Combo",  icon:"👑" },
];

// ===================================================
//   STATE
// ===================================================
let admins={}, customers={}, queue=[], salesLog=[];
let offers=[], combos=[], orders_all=[];
let customCategories=[];
let adminContactNumbers = JSON.parse(JSON.stringify(ADMIN_CONTACT_NUMBERS));
let currentUser=null, cart={}, activeCustCat="all";
let activeCustTab="cart", activeAdminTab="dashboard";
let adminPeriod="today", pendingUpsell=null;
let pendingImageItemId=null, orderToken=1;
let upsellTimerInterval=null, happyHourInterval=null;
let otpStore={};
let currentRating=0;
let adminSearchTerm="";
let offerTimerIntervals=[];
let orderMode = "pickup";
let customerAddress = "";
let customerLocation = null;

// ===================================================
//   FIREBASE UTILS
// ===================================================
function isFirebaseReady() {
  return typeof db !== "undefined" && typeof firebaseAPI !== "undefined";
}
function showLoader(show) {
  const el = document.getElementById("firebase-loader");
  if (el) el.style.display = show ? "block" : "none";
}

async function fetchCustomersFromFirebase() {
  if(!isFirebaseReady()) return;
  try {
    const {getDocs,collection}=firebaseAPI;
    const snap=await getDocs(collection(db,"customers"));
    snap.forEach(doc=>{
      const d=doc.data();
      if(d.id&&!customers[d.id]) {
        customers[d.id]={id:d.id,name:d.name||"",phone:d.phone||"",email:d.email||"",
          password:d.password||"",orders:d.orders||[],totalSpent:d.totalSpent||0,
          visits:d.visits||0,loyaltyPoints:d.loyaltyPoints||0,joinedAt:d.joinedAt||Date.now()};
      } else if(d.id&&customers[d.id]) {
        if((d.loyaltyPoints||0)>(customers[d.id].loyaltyPoints||0)) customers[d.id].loyaltyPoints=d.loyaltyPoints;
        if((d.totalSpent||0)>(customers[d.id].totalSpent||0)) customers[d.id].totalSpent=d.totalSpent;
        if((d.visits||0)>(customers[d.id].visits||0)) customers[d.id].visits=d.visits;
      }
    });
    save();
  } catch(e){console.error("Fetch customers error:",e);}
}

async function fetchOrdersFromFirebase() {
  if(!isFirebaseReady()) return;
  try {
    const {getDocs,collection,query,orderBy,limit}=firebaseAPI;
    const q=query(collection(db,"orders"),orderBy("time","desc"),limit(100));
    const snap=await getDocs(q);
    const fbOrders=[];
    snap.forEach(doc=>{ const d=doc.data(); d._docId=doc.id; fbOrders.push(d); });
    const existingTokens=new Set(queue.map(o=>o.token));
    fbOrders.forEach(o=>{ if(!existingTokens.has(o.token)) queue.push(o); });
    queue.sort((a,b)=>(b.time||0)-(a.time||0));
    const maxTok=Math.max(...queue.map(o=>o.token||0),orderToken-1);
    if(maxTok>=orderToken) orderToken=maxTok+1;
    save();
  } catch(e){console.error("Fetch orders error:",e);}
}

async function updateOrderStatusInFirebase(docId,status) {
  if(!isFirebaseReady()||!docId) return;
  try { const {updateDoc,doc}=firebaseAPI; await updateDoc(doc(db,"orders",docId),{status}); }
  catch(e){console.error("Update order status:",e);}
}

// ===================================================
//   LOAD / SAVE
// ===================================================
function load() {
  try {
    const stored = JSON.parse(localStorage.getItem("sv_v7") || "{}");
    admins              = stored.admins              || {};
    customers           = stored.customers           || {};
    queue               = stored.queue               || [];
    salesLog            = stored.salesLog            || [];
    offers              = stored.offers              || [];
    combos              = stored.combos              || [];
    orders_all          = stored.orders_all          || [];
    customCategories    = stored.customCategories    || [];
    adminContactNumbers = stored.adminContactNumbers || JSON.parse(JSON.stringify(ADMIN_CONTACT_NUMBERS));

    if (stored.items && stored.items.length > 0) ITEMS = stored.items;
    if (!admins["admin"]) admins["admin"] = { ...DEFAULT_ADMIN };

    rebuildCats();

    if (combos.length === 0) {
      combos = [
        { id:"cb1",name:"Chat Combo",     emoji:"🔥",itemIds:["i1","i6"],        price:60,  active:true, label:"popular" },
        { id:"cb2",name:"Kachori Combo",  emoji:"⚡",itemIds:["i4","i6"],        price:60,  active:true, label:"value"   },
        { id:"cb3",name:"Panipuri+Ice",   emoji:"🫧",itemIds:["i7","i6"],        price:52,  active:true, label:""        },
        { id:"cb4",name:"Family Feast",   emoji:"👨‍👩‍👧",itemIds:["i1","i4","i6"],  price:100, active:true, label:"popular" },
        { id:"cb5",name:"Street Special", emoji:"🌟",itemIds:["i1","i7","i13"],  price:85,  active:true, label:"value"   },
      ];
    }
    if (offers.length === 0) {
      offers = [
        { id:"o1",name:"Happy Hours",         type:"time",value:10,startHour:16,endHour:19,active:true, desc:"10% off 4PM–7PM",               timerType:"happy-hour" },
        { id:"o2",name:"Free Ice Cream ₹100", type:"free",value:100,freeItem:"Ice Cream",  active:true, desc:"Order ₹100+ get free Ice Cream", timerType:"none"       },
        { id:"o3",name:"Buy 3 Pay 2",         type:"bulk",value:3,discPct:33,              active:false,desc:"Buy any 3 items, pay for 2",     timerType:"none"       },
      ];
    }
    orderToken = stored.orderToken || 1;
  } catch(e) { console.error("Load error:", e); }
}

function save() {
  const data = { admins,customers,queue,salesLog,offers,combos,orders_all,items:ITEMS,orderToken,customCategories,adminContactNumbers };
  localStorage.setItem("sv_v7", JSON.stringify(data));
}

function rebuildCats() {
  CATS = [
    { id:"all",       label:"🍽 All",        cls:"cat-all"       },
    { id:"chat",      label:"🥗 Chat",       cls:"cat-chat"      },
    { id:"panipuri",  label:"🫧 Panipuri",   cls:"cat-panipuri"  },
    { id:"kachori",   label:"🫓 Kachori",    cls:"cat-kachori"   },
    { id:"wada",      label:"🫔 Wada",       cls:"cat-wada"      },
    { id:"ice",       label:"🍦 Ice Cream",  cls:"cat-ice"       },
    { id:"beverages", label:"🥤 Beverages",  cls:"cat-beverages" },
    { id:"snacks",    label:"🍟 Snacks",     cls:"cat-snacks"    },
  ];
  customCategories.forEach(c => {
    if (!CATS.find(x => x.id === c.id)) {
      CATS.push({ id:c.id, label:c.emoji+" "+c.name, cls:"cat-custom" });
    }
  });
}

// ===================================================
//   FIREBASE — REALTIME LISTENERS
// ===================================================
function listenToOrders() {
  if (!isFirebaseReady()) return;
  const { onSnapshot, collection } = firebaseAPI;
  onSnapshot(collection(db, "orders"), (snapshot) => {
    queue = [];
    snapshot.forEach(doc => {
      const d = doc.data(); d._docId = doc.id; queue.push(d);
    });
    queue.sort((a,b) => (b.time||0)-(a.time||0));
    if (currentUser?.type==="admin" && activeAdminTab==="orders") renderAdminOrders();
    if (activeCustTab==="queue") renderCustQueuePanel();
  });
}

function loadItemsFromFirebase() {
  if (!isFirebaseReady()) return;
  const { onSnapshot, collection } = firebaseAPI;
  onSnapshot(collection(db, "menu_items"), (snapshot) => {
    if (snapshot.empty) return;
    ITEMS = [];
    snapshot.forEach(doc => { ITEMS.push({ ...doc.data(), _docId:doc.id }); });
    renderCustMenu();
    if (activeAdminTab==="menu") renderAdminMenu();
  });
}

function loadOffersFromFirebase() {
  if (!isFirebaseReady()) return;
  const { onSnapshot, collection } = firebaseAPI;
  onSnapshot(collection(db, "offers"), (snapshot) => {
    if (snapshot.empty) return;
    offers = [];
    snapshot.forEach(doc => { offers.push({ ...doc.data(), _docId:doc.id }); });
    renderOfferBanner(); renderAllOfferTimers();
    if (activeAdminTab==="offers") renderAdminOffers();
  });
}

async function saveOrderToFirebase(order) {
  if (!isFirebaseReady()) return null;
  showLoader(true);
  try {
    const { addDoc, collection } = firebaseAPI;
    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
  } catch(e) { console.error("Firebase order save failed:", e); return null; }
  finally { showLoader(false); }
}

async function saveItemToFirebase(item) {
  if (!isFirebaseReady()) return;
  try {
    const { addDoc, collection } = firebaseAPI;
    await addDoc(collection(db, "menu_items"), item);
  } catch(e) { console.error("Firebase item save:", e); }
}

async function saveCustomerToFirebase(cust) {
  if (!isFirebaseReady()) return;
  if ((cust.loyaltyPoints || 0) < LOYALTY_FIREBASE_THRESHOLD) return;
  try {
    const { setDoc, doc } = firebaseAPI;
    const payload = {
      id:           cust.id,
      name:         cust.name,
      phone:        cust.phone,
      email:        cust.email || "",
      loyaltyPoints:cust.loyaltyPoints || 0,
      totalSpent:   cust.totalSpent   || 0,
      visits:       cust.visits       || 0,
      isVIP:        (cust.totalSpent||0) >= 500,
      lastUpdated:  Date.now(),
    };
    await setDoc(doc(db, "customers", cust.id), payload);
  } catch(e) { console.error("Firebase customer save:", e); }
}

async function saveCustomerFullToFirebase(cust) {
  if (!isFirebaseReady()) return;
  try {
    const { setDoc, doc } = firebaseAPI;
    await setDoc(doc(db, "customers", cust.id), {
      id:           cust.id,
      name:         cust.name,
      phone:        cust.phone,
      email:        cust.email       || "",
      loyaltyPoints:cust.loyaltyPoints|| 0,
      totalSpent:   cust.totalSpent  || 0,
      visits:       cust.visits      || 0,
      isVIP:        (cust.totalSpent||0) >= 500,
      joinedAt:     cust.joinedAt    || Date.now(),
      lastOrderAt:  Date.now(),
    });
  } catch(e) { console.error("Firebase customer full save:", e); }
}

// ===================================================
//   SCREEN SYSTEM
// ===================================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showNotif(msg, dur) {
  const n = document.getElementById("notif");
  n.textContent = msg;
  n.classList.add("show");
  clearTimeout(n._t);
  n._t = setTimeout(() => n.classList.remove("show"), dur||2800);
}

function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type==="password" ? "text" : "password";
  btn.textContent = input.type==="password" ? "👁" : "🙈";
}

// ===================================================
//   PARTICLES
// ===================================================
function createParticles() {
  const container = document.getElementById("landing-particles");
  if (!container) return;
  const emojis = ["🌶️","🍦","🫧","🥗","🫓","🎉","⭐","🔥"];
  for (let i=0;i<14;i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `left:${Math.random()*100}%;width:${20+Math.random()*20}px;height:${20+Math.random()*20}px;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;font-size:${16+Math.random()*16}px;background:none;display:flex;align-items:center;justify-content:center;`;
    p.textContent = emojis[i%emojis.length];
    container.appendChild(p);
  }
}

// ===================================================
//   OTP SYSTEM
// ===================================================
function generateOTP() { return Math.floor(100000+Math.random()*900000).toString(); }

function sendCustomerOTP() {
  const email = document.getElementById("c-forgot-email").value.trim();
  if (!email.includes("@")) return setAuthError("customer","Enter valid email");
  const cust = Object.values(customers).find(c => c.email===email);
  if (!cust) return setAuthError("customer","No account found with this email");
  const otp = generateOTP();
  otpStore[email] = { otp, expiry:Date.now()+600000, role:"customer", userId:cust.id };
  console.log(`📧 OTP for ${email}: ${otp}`);
  showNotif(`📧 OTP sent! (Demo: check console) Code: ${otp}`,6000);
  document.getElementById("c-otp-sent-to").textContent = `OTP sent to ${email.replace(/(.{2}).*(@.*)/,"$1***$2")}`;
  document.getElementById("c-forgot-step1").style.display="none";
  document.getElementById("c-forgot-step2").style.display="block";
  startOTPCountdown("c");
  setAuthError("customer","");
}

function sendAdminOTP() {
  const email = document.getElementById("a-forgot-email").value.trim();
  if (!email.includes("@")) return setAuthError("admin","Enter valid email");
  const adm = Object.values(admins).find(a => a.email===email);
  if (!adm) return setAuthError("admin","No admin account found with this email");
  const otp = generateOTP();
  otpStore[email] = { otp, expiry:Date.now()+600000, role:"admin", username:adm.username };
  console.log(`📧 Admin OTP for ${email}: ${otp}`);
  showNotif(`📧 OTP sent! (Demo: check console) Code: ${otp}`,6000);
  document.getElementById("a-otp-sent-to").textContent = `OTP sent to ${email.replace(/(.{2}).*(@.*)/,"$1***$2")}`;
  document.getElementById("a-forgot-step1").style.display="none";
  document.getElementById("a-forgot-step2").style.display="block";
  startOTPCountdown("a");
  setAuthError("admin","");
}

function startOTPCountdown(prefix) {
  let secs=60;
  const countEl   = document.getElementById(`${prefix}-otp-countdown`);
  const timerEl   = document.getElementById(`${prefix}-otp-timer`);
  const resendBtn = document.getElementById(`${prefix}-resend-btn`);
  const interval  = setInterval(() => {
    secs--;
    if (countEl)   countEl.textContent = secs;
    if (secs <= 0) {
      clearInterval(interval);
      if (timerEl)   timerEl.style.display  = "none";
      if (resendBtn) resendBtn.style.display = "block";
    }
  }, 1000);
}

function otpNext(input, boxesId) {
  input.classList.add("filled");
  const boxes = document.getElementById(boxesId).querySelectorAll(".otp-box");
  const idx   = Array.from(boxes).indexOf(input);
  if (idx < boxes.length-1 && input.value) boxes[idx+1].focus();
}

function getOTPValue(boxesId) {
  return Array.from(document.getElementById(boxesId).querySelectorAll(".otp-box")).map(b=>b.value).join("");
}

function verifyCustomerOTP() {
  const email  = document.getElementById("c-forgot-email").value.trim();
  const entered = getOTPValue("c-otp-boxes");
  const record  = otpStore[email];
  if (!record)                  return setAuthError("customer","Please request a new OTP");
  if (Date.now()>record.expiry) return setAuthError("customer","OTP expired. Request a new one");
  if (entered!==record.otp)     return setAuthError("customer","Wrong OTP. Try again");
  document.getElementById("c-forgot-step2").style.display="none";
  document.getElementById("c-forgot-step3").style.display="block";
  setAuthError("customer","");
}

function verifyAdminOTP() {
  const email  = document.getElementById("a-forgot-email").value.trim();
  const entered = getOTPValue("a-otp-boxes");
  const record  = otpStore[email];
  if (!record)                  return setAuthError("admin","Please request a new OTP");
  if (Date.now()>record.expiry) return setAuthError("admin","OTP expired. Request a new one");
  if (entered!==record.otp)     return setAuthError("admin","Wrong OTP. Try again");
  document.getElementById("a-forgot-step2").style.display="none";
  document.getElementById("a-forgot-step3").style.display="block";
  setAuthError("admin","");
}

function resetCustomerPassword() {
  const email   = document.getElementById("c-forgot-email").value.trim();
  const pass    = document.getElementById("c-new-pass").value;
  const confirm = document.getElementById("c-confirm-pass").value;
  if (pass.length<4)   return setAuthError("customer","Password must be 4+ characters");
  if (pass!==confirm)  return setAuthError("customer","Passwords don't match");
  const record = otpStore[email];
  if (!record)         return setAuthError("customer","Session expired. Start again");
  const cust = customers[record.userId];
  if (cust) { cust.password=pass; save(); delete otpStore[email]; showNotif("✅ Password reset! Please login."); switchAuthTab("customer","login"); setAuthError("customer",""); }
}

function resetAdminPassword() {
  const email   = document.getElementById("a-forgot-email").value.trim();
  const pass    = document.getElementById("a-new-pass").value;
  const confirm = document.getElementById("a-confirm-pass").value;
  if (pass.length<4)   return setAuthError("admin","Password must be 4+ characters");
  if (pass!==confirm)  return setAuthError("admin","Passwords don't match");
  const record = otpStore[email];
  if (!record)         return setAuthError("admin","Session expired. Start again");
  const adm = admins[record.username];
  if (adm) { adm.password=pass; save(); delete otpStore[email]; showNotif("✅ Admin password reset! Please login."); switchAuthTab("admin","login"); setAuthError("admin",""); }
}

// ===================================================
//   AUTH
// ===================================================
function switchAuthTab(role, tab) {
  const p = role==="customer" ? "c" : "a";
  ["login","signup","forgot"].forEach(t => {
    const tabEl  = document.getElementById(`${p}-tab-${t}`);
    const formEl = document.getElementById(`${p}-form-${t}`);
    if (tabEl)  tabEl.classList.toggle("active", t===tab);
    if (formEl) formEl.style.display = t===tab ? "block" : "none";
  });
  if (tab==="forgot") {
    ["step1","step2","step3"].forEach((s,i) => {
      const el = document.getElementById(`${p}-forgot-${s}`);
      if (el) el.style.display = i===0 ? "block" : "none";
    });
  }
  setAuthError(role,"");
}

function setAuthError(role, msg) {
  const el = document.getElementById(role==="customer" ? "c-auth-error" : "a-auth-error");
  if (el) el.textContent = msg;
}

function customerSignup() {
  const name  = document.getElementById("c-signup-name").value.trim();
  const phone = document.getElementById("c-signup-phone").value.trim();
  const email = document.getElementById("c-signup-email").value.trim();
  const pass  = document.getElementById("c-signup-pass").value;
  if (!name)                return setAuthError("customer","Enter your name");
  if (phone.length!==10)    return setAuthError("customer","Enter valid 10-digit phone");
  if (!email.includes("@")) return setAuthError("customer","Enter valid email");
  if (pass.length<4)        return setAuthError("customer","Password 4+ characters");
  if (customers[phone])     return setAuthError("customer","Account already exists");
  customers[phone] = { id:phone,name,phone,email,password:pass,orders:[],totalSpent:0,visits:0,loyaltyPoints:0,joinedAt:Date.now() };
  save();
  saveCustomerFullToFirebase(customers[phone]);
  showNotif(`✅ Welcome ${name}! 🎉`);
  loginAsCustomer(customers[phone]);
}

function customerLogin() {
  const input = document.getElementById("c-login-id").value.trim();
  const pass  = document.getElementById("c-login-pass").value;
  const cust  = Object.values(customers).find(c => c.phone===input || c.email===input);
  if (!cust)                return setAuthError("customer","No account found");
  if (cust.password!==pass) return setAuthError("customer","Wrong password");
  loginAsCustomer(cust);
}

function showGuestOrderModal() {
  const existing=document.getElementById("guest-order-modal");
  if(existing){existing.classList.add("show");return;}
  const el=document.createElement("div");
  el.id="guest-order-modal";
  el.className="modal-overlay show";
  el.innerHTML=`
    <div class="modal-card" style="max-width:380px;text-align:center" onclick="event.stopPropagation()">
      <div style="font-size:48px;margin-bottom:12px">🔐</div>
      <div class="modal-title">Login Required to Order</div>
      <div style="font-size:13px;color:var(--muted);margin:8px 0 20px">Create a free account to place orders, track tokens, earn loyalty points!</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn-primary" style="margin:0"
          onclick="document.getElementById('guest-order-modal').classList.remove('show');showScreen('screen-customer-auth');switchAuthTab('customer','signup')">
          ✨ Create Free Account
        </button>
        <button class="btn-ghost"
          onclick="document.getElementById('guest-order-modal').classList.remove('show');showScreen('screen-customer-auth');switchAuthTab('customer','login')">
          Already have account? Login
        </button>
        <button class="btn-ghost" style="font-size:11px;padding:8px;color:var(--muted)"
          onclick="document.getElementById('guest-order-modal').classList.remove('show')">
          Continue browsing as guest
        </button>
      </div>
    </div>`;
  el.onclick=(e)=>{if(e.target===el)el.classList.remove("show");};
  document.body.appendChild(el);
}

function showTokenConfirmation(token, total, mode) {
  const existing=document.getElementById("token-confirm-overlay");
  if(existing) existing.remove();
  const el=document.createElement("div");
  el.id="token-confirm-overlay";
  el.className="modal-overlay show";
  el.innerHTML=`
    <div class="token-confirm-card" onclick="event.stopPropagation()">
      <div class="token-confirm-icon">🎟️</div>
      <div class="token-confirm-title">Order Placed!</div>
      <div class="token-number-big">#${token}</div>
      <div class="token-confirm-sub">Your Token Number</div>
      <div class="token-confirm-mode">${mode==="delivery"?"🛵 Home Delivery":"🏪 Pickup at Store"}</div>
      <div class="token-confirm-total">Total: ₹${total}</div>
      <div class="token-confirm-steps">
        <div class="tc-step done">✅ Order Received</div>
        <div class="tc-step">⏳ Being Prepared</div>
        <div class="tc-step">🔔 Ready to ${mode==="delivery"?"Deliver":"Pickup"}</div>
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:16px">Show this token to collect your order</div>
      <button class="a-btn a-btn-green" style="width:100%;padding:13px"
        onclick="document.getElementById('token-confirm-overlay').remove()">Got it! 🙌</button>
    </div>`;
  document.body.appendChild(el);
  setTimeout(()=>{const e=document.getElementById("token-confirm-overlay");if(e)e.remove();},8000);
}

function customerGuestLogin() {
  currentUser = { type:"customer", id:"guest", name:"Guest" };
  launchCustomerApp();
}

function loginAsCustomer(cust) {
  currentUser = { type:"customer", id:cust.id, name:cust.name };
  launchCustomerApp();
}

function adminSignup() {
  const name  = document.getElementById("a-signup-name").value.trim();
  const user  = document.getElementById("a-signup-user").value.trim();
  const email = document.getElementById("a-signup-email").value.trim();
  const pass  = document.getElementById("a-signup-pass").value;
  const key   = document.getElementById("a-signup-key").value;
  if (!name)                  return setAuthError("admin","Enter name");
  if (!user)                  return setAuthError("admin","Enter username");
  if (!email.includes("@"))   return setAuthError("admin","Enter valid email");
  if (pass.length<4)          return setAuthError("admin","Password 4+ chars");
  if (key!==ADMIN_SECRET_KEY) return setAuthError("admin","Invalid secret key");
  if (admins[user])           return setAuthError("admin","Username taken");
  admins[user] = { username:user,password:pass,name,email };
  save();
  loginAsAdmin(admins[user]);
}

function adminLogin() {
  const user = document.getElementById("a-login-user").value.trim();
  const pass = document.getElementById("a-login-pass").value;
  if (!admins[user])                return setAuthError("admin","Admin not found");
  if (admins[user].password!==pass) return setAuthError("admin","Wrong password");
  loginAsAdmin(admins[user]);
}

function loginAsAdmin(admin) {
  currentUser = { type:"admin", id:admin.username, name:admin.name };
  document.getElementById("admin-name-badge").textContent = `Welcome, ${admin.name}`;
  showScreen("screen-admin-app");
  switchAdminTab("dashboard");
}

function adminLogout() {
  currentUser=null;
  offerTimerIntervals.forEach(clearInterval);
  offerTimerIntervals=[];
  showScreen("screen-landing");
}

// ===================================================
//   CUSTOMER APP LAUNCH
// ===================================================
function launchCustomerApp() {
  cart={};
  activeCustCat="all";
  activeCustTab="cart";
  orderMode="pickup";
  customerAddress="";
  customerLocation=null;

  const wBar        = document.getElementById("cust-welcome-bar");
  const loyaltyChip = document.getElementById("loyalty-chip");
  const userBadge   = document.getElementById("cust-user-badge");

  if (currentUser.id!=="guest") {
    const c = customers[currentUser.id];
    userBadge.textContent = `👤 ${currentUser.name}`;
    if (c) {
      const pts = c.loyaltyPoints||0;
      loyaltyChip.style.display = "block";
      loyaltyChip.textContent   = `🌟 ${pts} pts`;
      wBar.style.display        = "flex";
      if (c.visits>0) {
        wBar.innerHTML = `${c.totalSpent>=500?"👑":"👋"} Welcome back <b>${c.name}</b>! ${c.totalSpent>=500?"VIP •":""} Visit #${c.visits+1} • 🌟 ${pts} pts`;
      } else {
        wBar.innerHTML = `🎉 Welcome <b>${c.name}</b>! Enjoy your first order 🍽️ • Earn points every order!`;
      }
    }
  } else {
    userBadge.textContent      = "Guest 👋";
    loyaltyChip.style.display  = "none";
    wBar.style.display         = "none";
  }

  renderContactBar();
  renderOfferBanner();
  renderAllOfferTimers();
  renderCustCatBar();
  renderCustCombos();
  renderCustMenu();
  renderCustCartPanel();
  showScreen("screen-customer-app");

  if (happyHourInterval) clearInterval(happyHourInterval);
  happyHourInterval = setInterval(renderAllOfferTimers, 30000);
}

// ===================================================
//   CONTACT BAR
// ===================================================
function getActiveContact() {
  return adminContactNumbers.find(n => n.active) || adminContactNumbers[0];
}

function renderContactBar() {
  const existing = document.getElementById("contact-bar");
  if (existing) existing.remove();

  const contact = getActiveContact();
  const bar = document.createElement("div");
  bar.id = "contact-bar";
  bar.className = "contact-bar";
  bar.innerHTML = `
    <div class="contact-bar-inner">
      <span class="contact-bar-icon">📞</span>
      <span class="contact-bar-text">Call us: <b>${contact.label}</b></span>
      <a href="tel:${contact.number}" class="contact-call-btn">📱 ${contact.number}</a>
      ${contact.whatsapp
        ? `<a href="https://wa.me/91${contact.number}?text=Hi%20SV%20Chat%20Center%2C%20I%20want%20to%20place%20an%20order" target="_blank" class="contact-wa-btn">💬 WhatsApp</a>`
        : ""}
    </div>`;

  const header = document.querySelector(".cust-header");
  if (header) header.after(bar);
}

// ===================================================
//   ORDER MODE — Pickup / Delivery
// ===================================================
function renderOrderModePanel() {
  const total = cartTotal();
  const deliveryAvailable = total >= DELIVERY_MIN_ORDER;
  return `
    <div class="order-mode-wrap">
      <div class="order-mode-title">🛵 How would you like to receive your order?</div>
      <div class="order-mode-btns">
        <button class="mode-btn${orderMode==="pickup"?" mode-active":""}" onclick="setOrderMode('pickup')">
          🏪 <span>Pick Up at Store</span>
          <small>Ready in 10-15 mins</small>
        </button>
        <button class="mode-btn${orderMode==="delivery"?" mode-active":""}"
          onclick="setOrderMode('delivery')"
          ${!deliveryAvailable?`title="Add ₹${DELIVERY_MIN_ORDER-total} more for delivery"`:""}>
          🛵 <span>Home Delivery</span>
          <small>${deliveryAvailable ? `₹${DELIVERY_CHARGE} • 5-10 km radius` : `Min ₹${DELIVERY_MIN_ORDER} order`}</small>
        </button>
      </div>
      ${orderMode==="pickup"   ? renderPickupInfo()   : ""}
      ${orderMode==="delivery" ? renderDeliveryForm() : ""}
    </div>`;
}

function renderPickupInfo() {
  return `
    <div class="pickup-info">
      <div class="pickup-info-row">📍 <b>${STORE_LOCATION.address}</b></div>
      <div class="pickup-info-row">⏰ Open: 11 AM – 10 PM (All Days)</div>
      <div class="pickup-info-row">📞 <a href="tel:${STORE_LOCATION.phone}" style="color:var(--green-d);font-weight:700">${STORE_LOCATION.phone}</a></div>
      <a href="${STORE_LOCATION.mapUrl}" target="_blank" class="map-link-btn">🗺️ Get Directions on Google Maps</a>
    </div>`;
}

function renderDeliveryForm() {
  const total = cartTotal();
  if (total < DELIVERY_MIN_ORDER) {
    return `<div class="delivery-unavail">🚫 Minimum ₹${DELIVERY_MIN_ORDER} order for delivery. Add ₹${DELIVERY_MIN_ORDER-total} more.</div>`;
  }
  return `
    <div class="delivery-form">
      <div class="delivery-info-note">🛵 Delivery within <b>${DELIVERY_RADIUS_KM} km</b> of our store • Charge: <b>₹${DELIVERY_CHARGE}</b></div>
      <input class="a-input delivery-addr-input" id="delivery-address" placeholder="Enter your full delivery address" value="${customerAddress}" oninput="customerAddress=this.value">
      <button class="locate-btn" onclick="detectMyLocation()">📍 Use My Current Location</button>
      ${customerLocation ? `<div class="location-detected">✅ Location detected: ${customerLocation.lat.toFixed(4)}, ${customerLocation.lng.toFixed(4)}</div>` : ""}
    </div>`;
}

function setOrderMode(mode) {
  const total = cartTotal();
  if (mode==="delivery" && total < DELIVERY_MIN_ORDER) {
    showNotif(`⚠ Add ₹${DELIVERY_MIN_ORDER-total} more for delivery eligibility`);
    return;
  }
  orderMode = mode;
  renderCustCartPanel();
}

function detectMyLocation() {
  if (!navigator.geolocation) { showNotif("⚠ Geolocation not supported"); return; }
  showNotif("📍 Detecting your location...");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      customerLocation = { lat:pos.coords.latitude, lng:pos.coords.longitude };
      const dist = calcDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, customerLocation.lat, customerLocation.lng);
      if (dist > DELIVERY_RADIUS_KM) {
        showNotif(`⚠ You're ${dist.toFixed(1)}km away. Delivery only within ${DELIVERY_RADIUS_KM}km.`, 4000);
        customerLocation = null;
        orderMode = "pickup";
      } else {
        showNotif(`✅ Location detected! You're ${dist.toFixed(1)}km from store.`);
      }
      renderCustCartPanel();
    },
    () => { showNotif("⚠ Could not detect location. Please enter address manually."); }
  );
}

function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2-lat1)*Math.PI/180;
  const dLng = (lng2-lng1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ===================================================
//   STORE LOCATION MODAL
// ===================================================
function showLocationModal() {
  const modal = document.getElementById("location-modal");
  if (modal) { modal.classList.add("show"); return; }
  const el = document.createElement("div");
  el.id = "location-modal";
  el.className = "modal-overlay show";
  el.onclick = (e) => { if(e.target===el) el.classList.remove("show"); };
  el.innerHTML = `
    <div class="modal-card" style="max-width:520px" onclick="event.stopPropagation()">
      <div class="modal-title">📍 Find Us</div>
      <div class="store-info-grid">
        <div class="store-info-row">🏪 <div><b>${STORE_LOCATION.name}</b><br><span style="font-size:12px;color:var(--muted)">${STORE_LOCATION.address}</span></div></div>
        <div class="store-info-row">⏰ <div><b>Working Hours</b><br><span style="font-size:12px;color:var(--muted)">Monday – Sunday: 11 AM to 10 PM</span></div></div>
        <div class="store-info-row">📞 <div><b>Phone</b><br><a href="tel:${STORE_LOCATION.phone}" style="color:var(--green-d);font-weight:700">${STORE_LOCATION.phone}</a></div></div>
      </div>
      <div class="map-embed-wrap">
        <div class="map-placeholder">
          <div style="font-size:40px;margin-bottom:10px">🗺️</div>
          <div style="font-weight:700;margin-bottom:6px">SV Chat Center & Ice Cream</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:16px">${STORE_LOCATION.address}</div>
          <a href="${STORE_LOCATION.mapUrl}" target="_blank" class="map-link-btn" style="display:inline-block">📍 Open in Google Maps</a>
        </div>
      </div>
      <div class="delivery-zone-info">
        <div class="dz-title">🛵 Delivery Zone</div>
        <div class="dz-desc">We deliver within <b>${DELIVERY_RADIUS_KM} km</b> of our store for orders above <b>₹${DELIVERY_MIN_ORDER}</b>. Delivery charge: <b>₹${DELIVERY_CHARGE}</b>.</div>
        <div class="dz-map-hint">Areas covered: Kothrud, Karve Nagar, Warje, Erandwane, Deccan, FC Road, Shivajinagar, Baner (nearby)</div>
      </div>
      <button class="a-btn" onclick="document.getElementById('location-modal').classList.remove('show')" style="width:100%;margin-top:14px">Close</button>
    </div>`;
  document.body.appendChild(el);
}

// ===================================================
//   OFFER ENGINE
// ===================================================
function getActiveOffers()     { return offers.filter(o=>o.active); }
function getTimeDiscount()     { const h=new Date().getHours(); const o=getActiveOffers().find(o=>o.type==="time"&&h>=o.startHour&&h<=o.endHour); return o?o.value/100:0; }
function getFreeItemOffer()    { return getActiveOffers().find(o=>o.type==="free")||null; }
function getBulkOffer()        { return getActiveOffers().find(o=>o.type==="bulk")||null; }
function getPersonalOffer(uid) { if(!uid||uid==="guest")return null; return getActiveOffers().find(o=>o.type==="personal"&&o.targetUser===uid)||null; }

function renderOfferBanner() {
  const container = document.getElementById("cust-offer-banner");
  const active    = getActiveOffers();
  if (active.length===0) { container.style.display="none"; return; }
  const items = active.map(o=>`<span class="offer-ticker-item">🎁 ${o.name}: ${o.desc}</span>`).join("");
  container.style.display="block";
  container.innerHTML=`<div class="offer-ticker">${items}${items}</div>`;
}

// ===================================================
//   ALL OFFER TIMERS
// ===================================================
function renderAllOfferTimers() {
  const container = document.getElementById("all-offer-timers");
  if (!container) return;
  offerTimerIntervals.forEach(clearInterval);
  offerTimerIntervals=[];
  container.innerHTML="";
  const h=new Date().getHours(), now=Date.now();

  getActiveOffers().forEach(offer => {
    if (!offer.timerType||offer.timerType==="none") return;
    const bar = document.createElement("div");
    bar.className="offer-timer-bar";

    if (offer.timerType==="happy-hour"||offer.type==="time") {
      if (h>=offer.startHour&&h<=offer.endHour) {
        bar.classList.add("type-happy-hour");
        const endDate=new Date(); endDate.setHours(offer.endHour,0,0,0);
        const totalDur=(offer.endHour-offer.startHour)*3600;
        bar.innerHTML=`<span>⚡ <b>Happy Hours LIVE!</b> ${offer.value}% OFF</span><div class="offer-timer-progress"><div class="offer-timer-progress-fill" id="hh-fill-${offer.id}" style="width:100%"></div></div><span class="offer-timer-countdown" id="hh-cd-${offer.id}">--:--</span>`;
        container.appendChild(bar);
        const iv=setInterval(()=>{
          const diff=endDate-Date.now();
          if(diff<=0){bar.remove();clearInterval(iv);return;}
          const min=Math.floor(diff/60000),sec=Math.floor((diff%60000)/1000);
          const cdEl=document.getElementById(`hh-cd-${offer.id}`);
          const fillEl=document.getElementById(`hh-fill-${offer.id}`);
          if(cdEl)cdEl.textContent=`${min}:${String(sec).padStart(2,"0")}`;
          if(fillEl)fillEl.style.width=Math.min((diff/1000/totalDur)*100,100)+"%";
        },1000);
        offerTimerIntervals.push(iv);
      } else if(h<offer.startHour){
        bar.classList.add("type-upcoming");
        const startDate=new Date(); startDate.setHours(offer.startHour,0,0,0);
        bar.innerHTML=`<span>🕐 Happy Hours starts soon — ${offer.value}% OFF at ${offer.startHour}:00</span><span class="offer-timer-countdown" id="uh-cd-${offer.id}">--:--</span>`;
        container.appendChild(bar);
        const iv=setInterval(()=>{
          const diff=startDate-Date.now();
          if(diff<=0){clearInterval(iv);renderAllOfferTimers();return;}
          const hrs=Math.floor(diff/3600000),min=Math.floor((diff%3600000)/60000);
          const cdEl=document.getElementById(`uh-cd-${offer.id}`);
          if(cdEl)cdEl.textContent=hrs>0?`${hrs}h ${min}m`:`${min}m`;
        },1000);
        offerTimerIntervals.push(iv);
      }
    } else if(offer.timerType==="flash"){
      if(!offer.endTime||offer.endTime<now)return;
      bar.classList.add("type-flash");
      const endDate=new Date(offer.endTime);
      bar.innerHTML=`<span>⚡ <b>FLASH SALE!</b> ${offer.desc}</span><div class="offer-timer-progress"><div class="offer-timer-progress-fill" id="fl-fill-${offer.id}" style="width:100%"></div></div><span class="offer-timer-countdown" id="fl-cd-${offer.id}">--:--</span>`;
      container.appendChild(bar);
      const totalDur=(offer.endTime-(offer.startTime||now))/1000;
      const iv=setInterval(()=>{
        const diff=endDate-Date.now();
        if(diff<=0){bar.remove();clearInterval(iv);return;}
        const min=Math.floor(diff/60000),sec=Math.floor((diff%60000)/1000);
        const cdEl=document.getElementById(`fl-cd-${offer.id}`);
        const fillEl=document.getElementById(`fl-fill-${offer.id}`);
        if(cdEl)cdEl.textContent=`${min}:${String(sec).padStart(2,"0")}`;
        if(fillEl)fillEl.style.width=Math.min((diff/1000/totalDur)*100,100)+"%";
      },1000);
      offerTimerIntervals.push(iv);
    } else if(offer.timerType==="seasonal"){
      bar.classList.add("type-seasonal");
      bar.innerHTML=`<span>🌿 <b>Seasonal Special!</b> ${offer.desc}</span>${offer.endDate?`<span class="offer-timer-countdown" id="sea-cd-${offer.id}">Loading...</span>`:""}`;
      container.appendChild(bar);
      if(offer.endDate){
        const endDate=new Date(offer.endDate);
        const iv=setInterval(()=>{
          const diff=endDate-Date.now();
          const cdEl=document.getElementById(`sea-cd-${offer.id}`);
          if(!cdEl||diff<=0){clearInterval(iv);return;}
          const days=Math.floor(diff/86400000),hrs=Math.floor((diff%86400000)/3600000);
          cdEl.textContent=days>0?`${days}d ${hrs}h left`:`${hrs}h left`;
        },60000);
        offerTimerIntervals.push(iv);
        const diff=endDate-Date.now();
        const cdEl=document.getElementById(`sea-cd-${offer.id}`);
        if(cdEl&&diff>0){const days=Math.floor(diff/86400000);const hrs=Math.floor((diff%86400000)/3600000);cdEl.textContent=days>0?`${days}d ${hrs}h left`:`${hrs}h left`;}
      }
    } else if(offer.timerType==="todays"){
      bar.classList.add("type-todays");
      const midnight=new Date(); midnight.setHours(23,59,59,999);
      bar.innerHTML=`<span>☀️ <b>Today's Special!</b> ${offer.desc}</span><span class="offer-timer-countdown" id="td-cd-${offer.id}">--:--</span>`;
      container.appendChild(bar);
      const iv=setInterval(()=>{
        const diff=midnight-Date.now();
        if(diff<=0){bar.remove();clearInterval(iv);return;}
        const hrs=Math.floor(diff/3600000),min=Math.floor((diff%3600000)/60000);
        const cdEl=document.getElementById(`td-cd-${offer.id}`);
        if(cdEl)cdEl.textContent=`${hrs}h ${min}m left`;
      },60000);
      offerTimerIntervals.push(iv);
      const diff2=midnight-Date.now();
      const cdEl2=document.getElementById(`td-cd-${offer.id}`);
      if(cdEl2){const hrs2=Math.floor(diff2/3600000);const min2=Math.floor((diff2%3600000)/60000);cdEl2.textContent=`${hrs2}h ${min2}m left`;}
    }
  });

  const bar2=document.getElementById("live-offer-bar");
  if(bar2)bar2.style.display="none";
}

// ===================================================
//   CATEGORY BAR
// ===================================================
function renderCustCatBar() {
  const bar     = document.getElementById("cust-cat-bar");
  const isAdmin = currentUser?.type==="admin";
  bar.innerHTML = CATS.map(c =>
    `<button class="cat-btn ${c.cls}${activeCustCat===c.id?" active":""}" onclick="filterCustCat('${c.id}')">${c.label}</button>`
  ).join("") +
  (isAdmin
    ? `<button class="cat-btn cat-add-new" onclick="promptAddCategory()" title="Add new category">⚙️ +Cat</button>`
    : "");
}

function filterCustCat(cat) {
  activeCustCat=cat; renderCustCatBar(); renderCustMenu();
}

function promptAddCategory() {
  const name = prompt("Enter new category name (e.g. Thali, Desserts):");
  if (!name||!name.trim()) return;
  const emoji = prompt("Enter an emoji for the category (e.g. 🍱):") || "🍽";
  const id = name.trim().toLowerCase().replace(/\s+/g,"-");
  if (CATS.find(c=>c.id===id)) { showNotif("Category already exists!"); return; }
  const newCat = { id, name:name.trim(), emoji };
  customCategories.push(newCat);
  rebuildCats();
  save();
  renderCustCatBar();
  if (typeof renderAdminMenu === "function" && activeAdminTab==="menu") renderAdminMenu();
  showNotif(`✅ Category "${emoji} ${name}" added!`);
}

// ===================================================
//   COMBOS
// ===================================================
function renderCustCombos() {
  const sec    = document.getElementById("cust-combo-section");
  const active = combos.filter(c=>c.active);
  if (active.length===0) { sec.innerHTML=`<div class="section-title" style="margin-bottom:10px">🍽 Menu</div>`; return; }
  const cards = active.map(c => {
    const names  = c.itemIds.map(id=>{const i=ITEMS.find(x=>x.id===id);return i?i.name:"";}).filter(Boolean);
    const orig   = c.itemIds.reduce((s,id)=>{const i=ITEMS.find(x=>x.id===id);return s+(i?i.price:0);},0);
    const savAmt = orig-c.price;
    const labelHTML = c.label==="popular"
      ? `<span class="combo-label combo-label-popular">🔥 Most Popular</span>`
      : c.label==="value"
      ? `<span class="combo-label combo-label-value">💸 Best Value</span>`
      : "";
    return `<div class="combo-card" onclick="addCombo('${c.id}')">
      ${labelHTML}
      <div class="combo-fire">${c.emoji}</div>
      <div class="combo-name">${c.name}</div>
      <div class="combo-items-list">${names.join(" + ")}</div>
      <div class="combo-pricing">
        <div class="combo-price">₹${c.price}</div>
        <div class="combo-original">₹${orig}</div>
        <div class="combo-save">Save ₹${savAmt}</div>
      </div>
      <button class="combo-add-btn">🛒 Add Combo</button>
    </div>`;
  }).join("");
  sec.innerHTML=`<div class="section-title">🔥 Combo Offers</div><div class="combo-grid">${cards}</div><div class="section-title">🍽 Menu</div>`;
}

function addCombo(comboId) {
  const combo = combos.find(c=>c.id===comboId);
  if (!combo) return;
  const orig = combo.itemIds.reduce((s,id)=>{const i=ITEMS.find(x=>x.id===id);return s+(i?i.price:0);},0);
  combo.itemIds.forEach(id=>{const item=ITEMS.find(x=>x.id===id);if(!item)return;if(cart[item.name])cart[item.name].qty++;else cart[item.name]={price:item.price,qty:1,itemId:id};});
  if(!cart.__combos)cart.__combos=[];
  cart.__combos.push({comboId,discount:orig-combo.price,name:combo.name});
  renderCustMenu();renderCustCartPanel();
  showNotif(`✅ ${combo.name} added! Saved ₹${orig-combo.price} 🎉`);
  checkFreeItem();
}

// ===================================================
//   MENU RENDER
// ===================================================
function getItemImage(item) {
  if (item.image) return item.image;
  return DEFAULT_IMAGES[item.name]||null;
}

function getLabelRibbon(item) {
  const labelDef = ITEM_LABELS.find(l=>l.value===item.label);
  if (!labelDef||labelDef.value==="none") return "";
  return `<span class="label-ribbon label-${item.label}">${labelDef.ribbon}</span>`;
}

function renderCustMenu() {
  const grid   = document.getElementById("cust-menu-grid");
  const list   = activeCustCat==="all" ? ITEMS : ITEMS.filter(i=>i.cat===activeCustCat);
  const disc   = getTimeDiscount();
  const pOffer = getPersonalOffer(currentUser?.id);

  grid.innerHTML = list.map(item => {
    const qty       = cart[item.name] ? cart[item.name].qty : 0;
    const pDisc     = pOffer&&pOffer.itemId===item.id ? pOffer.value/100 : 0;
    const totDisc   = Math.max(disc,pDisc);
    const discPrice = totDisc>0 ? Math.round(item.price*(1-totDisc)) : null;
    const imgSrc    = getItemImage(item);
    const add       = item.add||ADD_MAP[item.cat]||"add-custom";

    const imgContent  = imgSrc ? `<img class="real-img img-loading" src="${imgSrc}" alt="${item.name}" onload="this.classList.remove('img-loading')" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : "";
    const emojiStyle  = imgSrc ? "display:none" : "display:flex";

    let badges="";
    if (discPrice)  badges+=`<span class="badge badge-discount">-${Math.round(totDisc*100)}%</span>`;
    if (pDisc>0)    badges+=`<span class="badge badge-offer">🎁 Personal</span>`;

    const ribbon  = getLabelRibbon(item);
    const tag     = item.tag||TAG_MAP[item.cat]||"tag-custom";
    const tagLbl  = item.tagLabel||LABEL_MAP[item.cat]||item.cat;
    const imgBg   = item.icon||ICON_MAP[item.cat]||"custom-bg";

    return `<div class="menu-card" onclick="addItem('${item.name}',${item.price})">
      <div class="card-img-area ${imgBg}">
        ${imgContent}
        <div class="card-emoji-fallback" style="${emojiStyle}">${item.emoji}</div>
        ${qty>0?`<div class="qty-badge" style="display:flex">${qty}</div>`:""}
        ${ribbon}
      </div>
      ${badges?`<div class="badge-row">${badges}</div>`:""}
      <div class="card-body">
        <span class="card-tag ${tag}">${tagLbl}</span>
        <div class="card-name">${item.name}</div>
        <div class="card-bottom">
          <div class="price-col">
            <div class="card-price">₹${discPrice||item.price}</div>
            ${discPrice?`<div class="card-orig">₹${item.price}</div>`:""}
          </div>
          <button class="add-fab ${add}" onclick="event.stopPropagation();addItem('${item.name}',${item.price})">+</button>
        </div>
      </div>
    </div>`;
  }).join("");
}

// ===================================================
//   CART LOGIC
// ===================================================
function addItem(name, price) {
  const isNew = !cart[name];
  if (cart[name]) cart[name].qty++;
  else            cart[name]={price,qty:1};
  document.querySelectorAll(".menu-card").forEach(card=>{
    if(card.querySelector(".card-name")?.textContent===name){
      card.classList.add("just-added");
      setTimeout(()=>card.classList.remove("just-added"),400);
    }
  });
  renderCustMenu();
  if(activeCustTab==="cart")renderCustCartPanel();
  if(isNew)triggerUpsell(name);
  checkFreeItem();
  checkBulkDiscount();
}

function removeItem(name) {
  if(!cart[name])return;
  cart[name].qty--;
  if(cart[name].qty<=0)delete cart[name];
  renderCustMenu();
  if(activeCustTab==="cart")renderCustCartPanel();
  checkFreeItem();
  checkBulkDiscount();
}

function cartTotal() {
  const disc   = getTimeDiscount();
  const pOffer = getPersonalOffer(currentUser?.id);
  let total=0;
  Object.keys(cart).forEach(k=>{
    if(k==="__combos"||k==="__bulk")return;
    const item  = ITEMS.find(x=>x.name===k);
    const pDisc = pOffer&&item&&pOffer.itemId===item.id ? pOffer.value/100 : 0;
    const tDisc = Math.max(disc,pDisc);
    total += cart[k].price*(1-tDisc)*cart[k].qty;
  });
  if(cart.__combos)cart.__combos.forEach(c=>{total-=c.discount;});
  if(cart.__bulk)  total-=cart.__bulk;
  if(orderMode==="delivery") total += DELIVERY_CHARGE;
  return Math.round(Math.max(total,0));
}

function getLoyaltyPointsForOrder(total) { return Math.floor(total*POINTS_PER_RUPEE); }

function checkFreeItem() {
  const freeOffer=getFreeItemOffer();
  if(!freeOffer)return;
  const raw=Object.keys(cart).filter(k=>k!=="__combos"&&k!=="__bulk"&&!cart[k].free).reduce((s,k)=>s+cart[k].price*cart[k].qty,0);
  const fName=freeOffer.freeItem;
  if(raw>=freeOffer.value&&!cart[fName]){
    const fItem=ITEMS.find(x=>x.name===fName);
    cart[fName]={price:0,qty:1,free:true,originalPrice:fItem?fItem.price:0};
    renderCustMenu();
    if(activeCustTab==="cart")renderCustCartPanel();
    showCelebration();
    showNotif(`🎉 FREE ${fName} added to your cart!`,4000);
  }
  if(raw<freeOffer.value&&cart[fName]&&cart[fName].free){
    delete cart[fName];
    renderCustMenu();
    if(activeCustTab==="cart")renderCustCartPanel();
    showNotif(`Add ₹${freeOffer.value-raw} more for FREE ${fName}`,2500);
  }
}

function checkBulkDiscount() {
  const bulkOffer=getBulkOffer();
  if(!bulkOffer){cart.__bulk=0;return;}
  const qty=Object.keys(cart).filter(k=>k!=="__combos"&&k!=="__bulk").reduce((s,k)=>s+cart[k].qty,0);
  if(qty>=bulkOffer.value){
    const raw=Object.keys(cart).filter(k=>k!=="__combos"&&k!=="__bulk").reduce((s,k)=>s+cart[k].price*cart[k].qty,0);
    cart.__bulk=Math.round(raw*(bulkOffer.discPct/100));
  } else { cart.__bulk=0; }
}

function showCelebration() {
  const cel=document.getElementById("celebration-overlay");
  cel.classList.add("show");
  setTimeout(()=>cel.classList.remove("show"),2500);
}

// ===================================================
//   UPSELL
// ===================================================
const UPSELL_MAP = {
  "Samosa Chat":      { name:"Ice Cream",        msg:"🍦 Complete your chat with Ice Cream! Only ₹30 more." },
  "Katori Chat":      { name:"Panipuri (6 pcs)", msg:"🫧 Add Panipuri for ₹30 more? Great combo!" },
  "Shegaon Kachori":  { name:"Ice Cream",        msg:"🍦 Top it off with Ice Cream? Just ₹30!" },
  "Gila Wada":        { name:"Masala Chaas",     msg:"🥛 Perfect match — Masala Chaas for ₹25?" },
  "Panipuri (6 pcs)": { name:"Ice Cream",        msg:"🍦 Add Ice Cream for ₹30 — perfect ending!" },
  "Bhel Puri":        { name:"Lemon Sharbat",    msg:"🍋 Refreshing Lemon Sharbat for ₹25?" },
  "Ragda Patties":    { name:"Masala Chaas",     msg:"🥛 Masala Chaas with Ragda — just ₹25!" },
  "Aloo Tikki":       { name:"Masala Chaas",     msg:"🥛 Pair with Masala Chaas! Only ₹25 more." },
  "Sambharwadi":      { name:"Sugarcane Juice",  msg:"🥤 Add Sugarcane Juice for ₹30? Perfect combo!" },
};

function triggerUpsell(name) {
  const up=UPSELL_MAP[name];
  if(!up||cart[up.name])return;
  const uItem=ITEMS.find(x=>x.name===up.name);
  if(!uItem)return;
  pendingUpsell=uItem;
  document.getElementById("upsell-icon").textContent =uItem.emoji;
  document.getElementById("upsell-title").textContent=`Add ${uItem.name}?`;
  document.getElementById("upsell-sub").textContent  =up.msg;
  document.getElementById("upsell-overlay").classList.add("show");
  spawnUpsellConfetti();
  startUpsellTimer();
}

function startUpsellTimer() {
  clearInterval(upsellTimerInterval);
  let secs=10;
  const fill=document.getElementById("upsell-timer-fill");
  const text=document.getElementById("upsell-timer-text");
  if(fill)fill.style.width="100%";
  upsellTimerInterval=setInterval(()=>{
    secs--;
    if(fill)fill.style.width=(secs/10*100)+"%";
    if(text)text.textContent=`Offer expires in ${secs}s`;
    if(secs<=0){clearInterval(upsellTimerInterval);closeUpsell();}
  },1000);
}

function spawnUpsellConfetti() {
  const c=document.getElementById("upsell-confetti");
  c.innerHTML="";
  const emojis=["🎉","⭐","🎊","✨"];
  for(let i=0;i<8;i++){
    const s=document.createElement("span");
    s.style.cssText=`position:absolute;font-size:${12+Math.random()*12}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:0.5;animation:confetti-fall 1.5s ease forwards;animation-delay:${Math.random()*0.5}s`;
    s.textContent=emojis[i%emojis.length];
    c.appendChild(s);
  }
}

function acceptUpsell() { if(!pendingUpsell)return; addItem(pendingUpsell.name,pendingUpsell.price); closeUpsell(); }
function closeUpsell()  { clearInterval(upsellTimerInterval); document.getElementById("upsell-overlay").classList.remove("show"); pendingUpsell=null; }

// ===================================================
//   CART PANEL RENDER
// ===================================================
function renderCustCartPanel() {
  const body   = document.getElementById("cust-panel-body");
  const footer = document.getElementById("cust-cart-footer");
  const keys   = Object.keys(cart).filter(k=>k!=="__combos"&&k!=="__bulk");

  const freeOffer  = getFreeItemOffer();
  const raw        = keys.filter(k=>!cart[k].free).reduce((s,k)=>s+cart[k].price*cart[k].qty,0);
  const remaining  = freeOffer ? Math.max(freeOffer.value-raw,0) : 0;
  const pct        = freeOffer ? Math.min((raw/freeOffer.value)*100,100) : 0;
  let freeBarHTML  = "";
  if(freeOffer){
    freeBarHTML = remaining>0
      ? `<div class="free-bar-wrap">🎁 Add <b>₹${remaining}</b> more for FREE ${freeOffer.freeItem}!<div class="free-bar-bg"><div class="free-bar-fill" style="width:${pct}%"></div></div></div>`
      : `<div class="free-bar-wrap" style="text-align:center">🎉 FREE ${freeOffer.freeItem} unlocked! 🎊</div>`;
  }

  if(keys.length===0){
    body.innerHTML=freeBarHTML+`<div class="cart-empty"><div class="cart-empty-icon">🛒</div><div style="font-size:13px;font-weight:600">Your cart is empty.<br><span style="color:var(--brand);font-size:12px">Add delicious items!</span></div></div>`;
    footer.innerHTML="";
    return;
  }

  const itemsHTML=keys.map(k=>{
    const isFree=cart[k].free;
    return `<div class="cart-item">
      <div class="ci-name">${k}${isFree?'<span class="ci-free">FREE</span>':""}</div>
      <div class="qty-ctrl">
        ${!isFree?`<button class="qbtn" onclick="removeItem('${k}')">−</button>`:""}
        <span class="qnum">${cart[k].qty}</span>
        ${!isFree?`<button class="qbtn" onclick="addItem('${k}',${cart[k].price})">+</button>`:""}
      </div>
      <div class="ci-price">${isFree?"FREE":"₹"+(cart[k].price*cart[k].qty)}</div>
    </div>`;
  }).join("");

  let discHTML="";
  if(cart.__combos)cart.__combos.forEach(c=>{discHTML+=`<div class="discount-row"><span>🔥 ${c.name}</span><span>-₹${c.discount}</span></div>`;});
  const timeDis=getTimeDiscount();
  if(timeDis>0){const amt=Math.round(raw*timeDis);discHTML+=`<div class="discount-row"><span>⚡ Happy Hours</span><span>-₹${amt}</span></div>`;}
  if(cart.__bulk&&cart.__bulk>0)discHTML+=`<div class="discount-row"><span>🛒 Bulk Discount</span><span>-₹${cart.__bulk}</span></div>`;
  if(orderMode==="delivery")discHTML+=`<div class="discount-row" style="color:var(--muted)"><span>🛵 Delivery Charge</span><span>+₹${DELIVERY_CHARGE}</span></div>`;

  const orderTotal   = cartTotal();
  const loyaltyEarn  = currentUser.id!=="guest" ? getLoyaltyPointsForOrder(orderTotal) : 0;
  const loyaltyHTML  = loyaltyEarn>0 ? `<div class="loyalty-earn-row">🌟 You'll earn <b>${loyaltyEarn} loyalty points</b> on this order!</div>` : "";

  const modeHTML = renderOrderModePanel();

  body.innerHTML  = freeBarHTML+itemsHTML+loyaltyHTML+modeHTML;
  footer.innerHTML= `
    <div class="total-row"><span class="total-label">Total</span><span class="total-amt">₹${orderTotal}</span></div>
    ${discHTML}
    <button class="order-btn" onclick="placeOrder()">🎟 Place Order &amp; Get Token</button>
    <button class="upi-btn" onclick="payUPI(${orderTotal})">💳 Pay via UPI — ₹${orderTotal}</button>`;
}

function renderCustQueuePanel() {
  const body   = document.getElementById("cust-panel-body");
  const footer = document.getElementById("cust-cart-footer");
  footer.innerHTML="";
  const myOrders = currentUser.id==="guest" ? queue.slice(0,5) : queue.filter(o=>o.userId===currentUser.id);
  if(myOrders.length===0){
    body.innerHTML=`<div class="cart-empty"><div class="cart-empty-icon">📋</div><div style="font-size:13px">No active orders.</div></div>`;
    return;
  }
  body.innerHTML=myOrders.map(o=>`
    <div class="order-hist-item">
      <div class="oh-top">
        <span style="font-weight:800;color:var(--brand)">Token #${o.token}</span>
        <span class="status-badge ${o.status==="Ready"?"status-ready":"status-prep"}">${o.status}</span>
      </div>
      <div class="oh-items">${Object.keys(o.items||{}).filter(k=>k!=="__combos"&&k!=="__bulk").map(k=>`${k} ×${o.items[k].qty}`).join(", ")}</div>
      <div style="font-size:13px;font-weight:800;color:var(--green-d);margin-top:4px">₹${o.total}</div>
      ${o.deliveryMode==="delivery"?`<div style="font-size:11px;color:var(--blue-d);margin-top:3px">🛵 Delivery to: ${o.deliveryAddress||"Address pending"}</div>`:""}
    </div>`).join("");
}

function switchCustTab(tab) {
  activeCustTab=tab;
  document.getElementById("tab-cart").classList.toggle("active",tab==="cart");
  document.getElementById("tab-queue").classList.toggle("active",tab==="queue");
  if(tab==="cart")renderCustCartPanel();
  else            renderCustQueuePanel();
}

// ===================================================
//   PLACE ORDER — Firebase + localStorage
// ===================================================
async function placeOrder() {
  if(currentUser.id==="guest") {
    showGuestOrderModal();
    return;
  }
  const total=cartTotal();
  if(total===0){showNotif("⚠ Cart is empty!");return;}

  if(orderMode==="delivery"){
    const addr = document.getElementById("delivery-address")?.value?.trim() || customerAddress;
    if(!addr){showNotif("⚠ Please enter your delivery address!");return;}
    customerAddress=addr;
    if(customerLocation){
      const dist=calcDistance(STORE_LOCATION.lat,STORE_LOCATION.lng,customerLocation.lat,customerLocation.lng);
      if(dist>DELIVERY_RADIUS_KM){showNotif(`⚠ You're ${dist.toFixed(1)}km away. Max delivery radius is ${DELIVERY_RADIUS_KM}km.`,4000);return;}
    }
  }

  const keys=Object.keys(cart).filter(k=>k!=="__combos"&&k!=="__bulk");
  const snap={};
  keys.forEach(k=>{snap[k]={...cart[k]};});

  const order = {
    token:          orderToken++,
    items:          snap,
    total,
    status:         "Preparing",
    time:           Date.now(),
    userId:         currentUser.id,
    userName:       currentUser.name,
    phone:          customers[currentUser.id]?.phone||"",
    email:          customers[currentUser.id]?.email||"",
    deliveryMode:   orderMode,
    deliveryAddress:orderMode==="delivery" ? (document.getElementById("delivery-address")?.value?.trim()||customerAddress) : "",
    deliveryLat:    customerLocation?.lat||null,
    deliveryLng:    customerLocation?.lng||null,
  };

  const fbId = await saveOrderToFirebase(order);
  if(fbId) order._docId=fbId;

  queue.unshift(order);
  orders_all.unshift(order);
  salesLog.unshift({ time:Date.now(),total,items:snap,phone:order.phone,email:order.email,userId:currentUser.id,deliveryMode:orderMode });

  if(currentUser.id!=="guest"&&customers[currentUser.id]){
    const cust=customers[currentUser.id];
    cust.orders=cust.orders||[];
    cust.orders.push({time:Date.now(),items:snap,total,deliveryMode:orderMode});
    cust.totalSpent    +=total;
    cust.visits        +=1;
    cust.loyaltyPoints  =(cust.loyaltyPoints||0)+getLoyaltyPointsForOrder(total);
    const chip=document.getElementById("loyalty-chip");
    if(chip)chip.textContent=`🌟 ${cust.loyaltyPoints} pts`;
    checkLoyaltyMilestone(cust.loyaltyPoints,getLoyaltyPointsForOrder(total));
    if(cust.visits%3===0)setTimeout(()=>showReviewPrompt(),3000);
    saveCustomerFullToFirebase(cust);
  }

  save();
  showTokenConfirmation(order.token, total, orderMode);
  showNotif(`✅ Token #${order.token} placed! ${orderMode==="delivery"?"🛵 Delivery!":"🏪 Pickup!"}`,3000);

  if(typeof logEvent==="function"&&typeof analytics!=="undefined"){
    logEvent(analytics,"purchase",{value:total,currency:"INR",items:Object.keys(snap)});
  }

  cart={};
  orderMode="pickup";
  customerAddress="";
  customerLocation=null;
  renderCustMenu();
  renderCustCartPanel();
  setTimeout(()=>switchCustTab("queue"),3000);
}

function checkLoyaltyMilestone(totalPoints, earned) {
  const milestone=REWARD_TIERS.find(t=>totalPoints>=t.points&&(totalPoints-earned)<t.points);
  if(!milestone)return;
  const overlay=document.getElementById("loyalty-overlay");
  document.getElementById("loyalty-icon").textContent =milestone.icon;
  document.getElementById("loyalty-title").textContent=`${milestone.points} points reached!`;
  document.getElementById("loyalty-sub").textContent  =`Reward unlocked: ${milestone.reward} 🎉`;
  overlay.classList.add("show");
}

function closeLoyaltyPopup() { document.getElementById("loyalty-overlay").classList.remove("show"); }

// ===================================================
//   ✅ UPI PAYMENT MODAL — tztejaszombade@oksbi
// ===================================================
function payUPI(amount) {
  // If called without amount (e.g. from old code), compute it
  if (!amount || amount <= 0) {
    amount = cartTotal();
  }
  if (amount <= 0) {
    showNotif("⚠ Cart is empty!");
    return;
  }
  showUPIModal(amount);
}

function showUPIModal(amount) {
  // Remove existing modal if any
  const existing = document.getElementById("upi-payment-modal");
  if (existing) existing.remove();

  const upiString = `upi://pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.name)}&am=${amount}&cu=INR&tn=${encodeURIComponent("SV Chat Center Order")}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}&color=1a0a2e&bgcolor=ffffff&margin=10`;

  const modal = document.createElement("div");
  modal.id = "upi-payment-modal";
  modal.className = "modal-overlay show";
  modal.onclick = (e) => { if (e.target === modal) closeUPIModal(); };

  modal.innerHTML = `
    <div class="upi-modal-card" onclick="event.stopPropagation()">
      <!-- Header -->
      <div class="upi-modal-header">
        <div class="upi-modal-title">💳 Pay via UPI</div>
        <div class="upi-modal-amount">₹${amount}</div>
        <div class="upi-modal-payto">Pay to <b>${UPI_CONFIG.name}</b> • SV Chat Center</div>
      </div>

      <!-- QR Code -->
      <div class="upi-qr-wrap">
        <img class="upi-qr-img" src="${qrUrl}" alt="UPI QR Code"
          onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(UPI_CONFIG.upiId)}&margin=10'">
        <div class="upi-qr-label">Scan with any UPI app</div>
      </div>

      <!-- UPI ID copy row -->
      <div class="upi-divider"><span>or pay using UPI ID</span></div>
      <div class="upi-id-box">
        <div class="upi-id-value">${UPI_CONFIG.upiId}</div>
        <button class="upi-copy-btn" onclick="copyUPIId()" id="upi-copy-btn">📋 Copy</button>
      </div>

      <!-- UPI number note -->
      <div class="upi-number-note">
        📱 UPI Number: <b>${UPI_CONFIG.upiNum}</b> &nbsp;|&nbsp; <b>${UPI_CONFIG.name}</b>
      </div>

      <!-- App deep-link buttons -->
      <div class="upi-app-grid">
        <a href="gpay://upi/pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.name)}&am=${amount}&cu=INR" class="upi-app-btn gpay-btn">
          <span class="upi-app-icon">G</span> Google Pay
        </a>
        <a href="phonepe://pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.name)}&am=${amount}&cu=INR" class="upi-app-btn phonepe-btn">
          <span class="upi-app-icon">P</span> PhonePe
        </a>
        <a href="paytmmp://pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.name)}&am=${amount}&cu=INR" class="upi-app-btn paytm-btn">
          <span class="upi-app-icon">₿</span> Paytm
        </a>
        <a href="${upiString}" class="upi-app-btn any-upi-btn">
          <span class="upi-app-icon">↗</span> Any UPI App
        </a>
      </div>

      <!-- Action buttons -->
      <button class="upi-paid-btn" onclick="confirmUPIPayment(${amount})">
        ✅ I've Paid ₹${amount}
      </button>
      <button class="upi-cancel-btn" onclick="closeUPIModal()">Cancel</button>

      <div class="upi-footer-note">
        After paying, tap "I've Paid" to place your order &amp; get a token
      </div>
    </div>`;

  document.body.appendChild(modal);
}

function closeUPIModal() {
  const modal = document.getElementById("upi-payment-modal");
  if (modal) modal.remove();
}

function copyUPIId() {
  const upiId = UPI_CONFIG.upiId;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(upiId).then(() => {
      const btn = document.getElementById("upi-copy-btn");
      if (btn) { btn.textContent = "✅ Copied!"; setTimeout(() => { btn.textContent = "📋 Copy"; }, 2000); }
      showNotif("✅ UPI ID copied: " + upiId);
    }).catch(() => fallbackCopy(upiId));
  } else {
    fallbackCopy(upiId);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  showNotif("✅ UPI ID copied: " + text);
  const btn = document.getElementById("upi-copy-btn");
  if (btn) { btn.textContent = "✅ Copied!"; setTimeout(() => { btn.textContent = "📋 Copy"; }, 2000); }
}

function confirmUPIPayment(amount) {
  closeUPIModal();
  showNotif("💳 UPI Payment confirmed! Placing your order...", 2000);
  setTimeout(() => placeOrder(), 500);
}

// ===================================================
//   REVIEW SYSTEM
// ===================================================
function showReviewPrompt() { currentRating=0; document.getElementById("review-overlay").classList.add("show"); }
function closeReview()      { document.getElementById("review-overlay").classList.remove("show"); }

function setRating(n) {
  currentRating=n;
  document.querySelectorAll(".star").forEach((s,i)=>{
    s.textContent=i<n?"⭐":"☆";
    s.classList.toggle("active",i<n);
  });
}

function submitReview() {
  if(currentRating===0)return showNotif("⭐ Please select a rating first");
  const text=document.getElementById("review-text")?.value.trim()||"";
  if(currentUser.id!=="guest"&&customers[currentUser.id]){
    if(!customers[currentUser.id].reviews)customers[currentUser.id].reviews=[];
    customers[currentUser.id].reviews.push({rating:currentRating,text,time:Date.now()});
    offers.push({id:"o_review_"+Date.now(),name:`Review Reward for ${customers[currentUser.id].name}`,type:"personal",desc:"₹20 off as review thank you",targetUser:currentUser.id,itemId:ITEMS[0].id,value:10,active:true,timerType:"none"});
    save();
  }
  closeReview();
  showNotif(`⭐ Thanks for ${currentRating} stars! ₹20 off coupon added 🎁`,4000);
}

// ===================================================
//   ADMIN TABS
// ===================================================
function switchAdminTab(tab) {
  activeAdminTab=tab;
  ["dashboard","menu","offers","customers","orders","analytics","marketing"].forEach(t=>{
    const el=document.getElementById(`anav-${t}`);
    if(el)el.classList.toggle("active",t===tab);
  });
  const renders={
    dashboard:renderAdminDashboard, menu:renderAdminMenu, offers:renderAdminOffers,
    customers:renderAdminCustomers, orders:renderAdminOrders,
    analytics:renderAdminAnalytics, marketing:renderAdminMarketing
  };
  if(renders[tab])renders[tab]();
}

function setAdminPeriod(p) { adminPeriod=p; renderAdminDashboard(); }

function getPeriodLogs(period) {
  const ms={today:86400000,week:604800000,month:2592000000};
  return salesLog.filter(l=>l.time>=Date.now()-ms[period]);
}

// ===================================================
//   ADMIN DASHBOARD
// ===================================================
function renderAdminDashboard() {
  const logs        = getPeriodLogs(adminPeriod);
  const totalSales  = logs.reduce((s,l)=>s+l.total,0);
  const totalOrders = logs.length;
  const avgOrder    = totalOrders ? Math.round(totalSales/totalOrders) : 0;
  const totalCusts  = Object.keys(customers).length;
  const repeatCusts = Object.values(customers).filter(c=>c.visits>1).length;
  const queueLen    = queue.filter(q=>q.status==="Preparing").length;
  const totalPoints = Object.values(customers).reduce((s,c)=>s+(c.loyaltyPoints||0),0);
  const delivOrders = logs.filter(l=>l.deliveryMode==="delivery").length;

  const itemCounts={};
  logs.forEach(l=>Object.keys(l.items||{}).forEach(k=>{
    if(k==="__combos"||k==="__bulk")return;
    itemCounts[k]=(itemCounts[k]||0)+(l.items[k].qty||0);
  }));
  const topItems=Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const hourly=new Array(24).fill(0);
  logs.forEach(l=>{hourly[new Date(l.time).getHours()]+=l.total;});
  const peakHour=hourly.indexOf(Math.max(...hourly));

  let days,getGroup;
  if(adminPeriod==="today")      {days=["12a","4a","8a","12p","4p","8p"];getGroup=l=>Math.floor(new Date(l.time).getHours()/4);}
  else if(adminPeriod==="week")  {days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];getGroup=l=>new Date(l.time).getDay();}
  else                           {days=["W1","W2","W3","W4"];getGroup=l=>Math.min(3-Math.floor((Date.now()-l.time)/604800000),3);}
  const barData=new Array(days.length).fill(0);
  logs.forEach(l=>{const g=getGroup(l);if(g>=0&&g<days.length)barData[g]+=l.total;});
  const maxBar=Math.max(...barData,1);

  const periodBtns=["today","week","month"].map(p=>
    `<button class="period-btn${adminPeriod===p?" active":""}" onclick="setAdminPeriod('${p}')">${p[0].toUpperCase()+p.slice(1)}</button>`
  ).join("");

  const barsHTML=barData.map((v,i)=>`
    <div class="bar-col">
      <div class="bar-val">${v>0?"₹"+v:""}</div>
      <div class="bar" style="height:${Math.round((v/maxBar)*86)+4}px;background:${v>0?"var(--admin)":"#dde8f5"}"></div>
      <div class="bar-label">${days[i]}</div>
    </div>`).join("");

  const topHTML=topItems.length>0
    ? topItems.map(([name,qty],i)=>{const item=ITEMS.find(x=>x.name===name);return`<div class="order-row"><div style="width:22px;height:22px;border-radius:50%;background:var(--admin);color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center">${i+1}</div><div style="flex:1;font-size:13px;font-weight:600">${item?item.emoji+" ":""}${name}</div><div style="font-size:12px;color:var(--muted)">${qty} sold</div><div style="font-size:13px;font-weight:800;color:var(--green-d)">₹${qty*(item?item.price:0)}</div></div>`;}).join("")
    : `<div class="empty-state">No sales data yet.</div>`;

  const contact=getActiveContact();
  const fbConnected=isFirebaseReady();
  const fbStatusPanel=`
    <div class="fb-checker-panel ${fbConnected?"fb-ok":"fb-warn"}">
      <div class="fb-checker-header">
        <span class="fb-checker-icon">${fbConnected?"🔥":"⚠️"}</span>
        <span class="fb-checker-title">${fbConnected?"Firebase Connected ✅":"Firebase Not Ready ⚠️"}</span>
        <button class="fb-test-btn" onclick="runFirebaseConnectionTest()">🔍 Run Test</button>
      </div>
      <div class="fb-checker-grid">
        <div class="fb-check-item ${fbConnected?"ok":"fail"}">${fbConnected?"✅":"❌"} Firestore DB</div>
        <div class="fb-check-item ${fbConnected?"ok":"fail"}">${fbConnected?"✅":"❌"} Real-time Sync</div>
        <div class="fb-check-item ${fbConnected?"ok":"fail"}">${fbConnected?"✅":"❌"} Customer Data</div>
        <div class="fb-check-item ok">✅ Local Storage (fallback)</div>
      </div>
      <div id="fb-test-result"></div>
    </div>`;

  // ✅ UPI Info card for admin dashboard
  const upiCard = `
    <div class="a-card" style="background:linear-gradient(135deg,#e8fff0,#d5ffe8);border:2px solid var(--green)">
      <div class="a-card-title" style="color:var(--green-d)">💳 UPI Collection Details</div>
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div>
          <div style="font-size:18px;font-weight:800;color:var(--green-d)">${UPI_CONFIG.upiId}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">📱 ${UPI_CONFIG.upiNum} • ${UPI_CONFIG.name}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">
          <a href="https://gpay.app.goo.gl/YourLink" style="background:var(--green);color:#fff;padding:7px 14px;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none">
            📷 View QR
          </a>
        </div>
      </div>
    </div>`;

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">📊 Sales Dashboard</div>
    ${fbStatusPanel}
    ${upiCard}

    <div class="a-card" style="background:linear-gradient(135deg,#e8f0fe,#d5e8ff);border-color:var(--admin)">
      <div class="a-card-title">📞 Active Customer Contact Number</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="font-size:20px;font-weight:800;color:var(--admin)">${contact.number}</div>
        <div style="font-size:12px;color:var(--muted)">${contact.label}</div>
        ${contact.whatsapp?`<span style="background:var(--green);color:#fff;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:700">WhatsApp ✓</span>`:""}
        <button class="a-btn" style="margin-left:auto;font-size:12px;padding:6px 14px" onclick="switchAdminTab('marketing')">⚙️ Change Number</button>
      </div>
    </div>

    <div class="period-tabs">${periodBtns}</div>
    <div class="a-stat-grid">
      <div class="a-stat-card"><div class="a-stat-label">Revenue</div><div class="a-stat-val green">₹${totalSales.toLocaleString("en-IN")}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Orders</div><div class="a-stat-val">${totalOrders}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Avg Order</div><div class="a-stat-val">₹${avgOrder}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Queue Now</div><div class="a-stat-val blue">${queueLen}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Customers</div><div class="a-stat-val">${totalCusts}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Repeat</div><div class="a-stat-val green">${repeatCusts}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🌟 Loyalty Pts</div><div class="a-stat-val orange">${totalPoints}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🛵 Deliveries</div><div class="a-stat-val blue">${delivOrders}</div></div>
    </div>
    <div class="a-chart-wrap">
      <div class="a-chart-title">Revenue by ${adminPeriod==="today"?"Hour":"Period"}</div>
      <div class="bar-chart">${barsHTML}</div>
    </div>
    <div class="insight-box">
      <div class="insight-title">🧠 Business Insights</div>
      <div class="insight-row"><div class="insight-dot"></div> Peak hour: <b>${peakHour}:00–${peakHour+1}:00</b></div>
      <div class="insight-row"><div class="insight-dot"></div> Avg order: <b>₹${avgOrder}</b> ${avgOrder<80?"— push combos 🔼":"— excellent! 🎉"}</div>
      <div class="insight-row"><div class="insight-dot"></div> Repeat rate: <b>${totalCusts>0?Math.round((repeatCusts/totalCusts)*100):0}%</b></div>
      <div class="insight-row"><div class="insight-dot"></div> Delivery orders: <b>${delivOrders}</b> (${totalOrders>0?Math.round((delivOrders/totalOrders)*100):0}%)</div>
      <div class="insight-row"><div class="insight-dot"></div> Firebase: ${isFirebaseReady()?"🔥 Connected — customer data being saved":"⚠️ Not connected"}</div>
    </div>
    <div class="a-card"><div class="a-card-title">🏆 Top Selling Items (${adminPeriod})</div>${topHTML}</div>`;
}

// ===================================================
//   FIREBASE CONNECTION TEST
// ===================================================
async function runFirebaseConnectionTest() {
  const resultEl=document.getElementById("fb-test-result");
  if(!resultEl){showNotif("Run from Dashboard");return;}
  resultEl.innerHTML=`<div class="fb-step note">🔄 Running connection test...</div>`;
  const steps=[];
  if(typeof db!=="undefined"){
    steps.push({ok:true,msg:"<b>db</b> object found ✅ — Firestore initialised"});
  } else {
    steps.push({ok:false,msg:"<b>db</b> not found ❌ — Firebase SDK not loaded yet"});
    renderSteps(steps,resultEl);return;
  }
  if(typeof firebaseAPI!=="undefined"&&firebaseAPI.addDoc){
    steps.push({ok:true,msg:"<b>firebaseAPI</b> ready ✅"});
  } else {
    steps.push({ok:false,msg:"<b>firebaseAPI</b> missing ❌"});
    renderSteps(steps,resultEl);return;
  }
  steps.push({ok:true,msg:"🔄 Writing test ping..."});
  renderSteps(steps,resultEl);
  try {
    const {addDoc,collection}=firebaseAPI;
    const docRef=await addDoc(collection(db,"_connection_test"),{ping:true,time:Date.now()});
    steps.pop();
    steps.push({ok:true,msg:`✅ Write succeeded! Doc ID: <code>${docRef.id}</code>`});
    if(firebaseAPI.deleteDoc&&firebaseAPI.doc){
      await firebaseAPI.deleteDoc(firebaseAPI.doc(db,"_connection_test",docRef.id));
      steps.push({ok:true,msg:"✅ Test document cleaned up"});
    }
    steps.push({ok:true,msg:"🎉 <b>Firebase fully working!</b> Customer data & orders sync in real-time."});
  } catch(e) {
    steps.pop();
    steps.push({ok:false,msg:`❌ Write FAILED: ${e.message}`});
    if(e.message.includes("permission"))steps.push({ok:"note",msg:"💡 Fix Firestore rules: allow read, write: if true"});
  }
  renderSteps(steps,resultEl);
}

function renderSteps(steps,el) {
  el.innerHTML=steps.map(s=>
    `<div class="fb-step ${s.ok===true?"ok":s.ok===false?"fail":"note"}">${s.ok===true?"🟢":s.ok===false?"🔴":"💡"} ${s.msg}</div>`
  ).join("");
}

// ===================================================
//   ADMIN MENU
// ===================================================
function getAllCatOptions(selectedCat) {
  const baseCats = [
    { id:"chat",      label:"🥗 Chat"       },
    { id:"panipuri",  label:"🫧 Panipuri"   },
    { id:"kachori",   label:"🫓 Kachori"    },
    { id:"wada",      label:"🫔 Wada"       },
    { id:"ice",       label:"🍦 Ice Cream"  },
    { id:"beverages", label:"🥤 Beverages"  },
    { id:"snacks",    label:"🍟 Snacks"     },
  ];

  let html = baseCats.map(c =>
    `<option value="${c.id}"${selectedCat===c.id?" selected":""}>${c.label}</option>`
  ).join("");

  if (customCategories.length > 0) {
    html += `<optgroup label="── Custom ──">`;
    html += customCategories.map(c =>
      `<option value="${c.id}"${selectedCat===c.id?" selected":""}>${c.emoji} ${c.name}</option>`
    ).join("");
    html += `</optgroup>`;
  }

  html += `<option value="__new" style="color:#e74c3c;font-weight:700">➕ + Add New Category</option>`;
  return html;
}

function handleCatDropdownChange(selectEl) {
  if (selectEl.value === "__new") {
    selectEl.value = "chat";
    promptAddCategory();
  }
}

function renderAdminMenu() {
  const rows = ITEMS.map(item => {
    const imgSrc   = getItemImage(item);
    const labelDef = ITEM_LABELS.find(l=>l.value===item.label)||ITEM_LABELS[0];
    return `<div class="menu-mgmt-row">
      <div onclick="openImageModal('${item.id}')" title="Click to upload image" style="cursor:pointer">
        ${imgSrc
          ? `<img class="admin-item-img" src="${imgSrc}" alt="${item.name}"/>`
          : `<div class="admin-item-emoji"><span>${item.emoji}</span><div class="upload-hint">📷 Add</div></div>`
        }
      </div>
      <div class="mmr-info">
        <div class="mmr-name">${item.name}</div>
        <div class="mmr-cat">${item.tagLabel||item.cat}
          <span class="label-ribbon label-${item.label||"none"}" style="position:static;margin-left:4px">${labelDef.ribbon}</span>
        </div>
      </div>
      <select class="a-select" id="label-sel-${item.id}" onchange="saveItemLabel('${item.id}')" style="width:130px;font-size:11px;padding:5px 8px">
        ${ITEM_LABELS.map(l=>`<option value="${l.value}"${item.label===l.value?" selected":""}>${l.label}</option>`).join("")}
      </select>
      <input class="price-input" id="price-${item.id}" value="${item.price}" type="number" min="1" max="9999">
      <button class="save-price-btn" onclick="savePrice('${item.id}')">Save</button>
      <button class="del-btn" onclick="deleteItem('${item.id}')">✕</button>
    </div>`;
  }).join("");

  const labelOptions = ITEM_LABELS.map(l=>`<option value="${l.value}">${l.label}</option>`).join("");

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">🍽 Menu Management</div>
    <div class="a-card">
      <div class="a-card-title">📂 Custom Categories (${customCategories.length} added)</div>
      ${customCategories.length>0
        ? customCategories.map(c=>`<div class="menu-mgmt-row">
            <span style="font-size:22px">${c.emoji}</span>
            <span class="mmr-name" style="flex:1">${c.name}</span>
            <button class="del-btn" onclick="deleteCustomCategory('${c.id}')">✕ Remove</button>
          </div>`).join("")
        : `<div style="font-size:13px;color:var(--muted);padding:8px 0">No custom categories yet.</div>`
      }
      <button class="a-btn" style="margin-top:10px;font-size:12px;padding:7px 16px" onclick="promptAddCategory()">➕ Add New Category</button>
    </div>
    <div class="a-card">
      <div class="a-card-title">Current Menu (${ITEMS.length} items)</div>
      ${rows}
    </div>
    <div class="a-card">
      <div class="a-card-title">➕ Add New Item</div>
      <div class="add-item-form">
        <input class="a-input" id="new-name"  placeholder="Item name">
        <input class="a-input" id="new-price" placeholder="Price (₹)" type="number" min="1">
        <input class="a-input" id="new-emoji" placeholder="Emoji (e.g. 🍛)">
        <select class="a-select" id="new-cat" onchange="handleCatDropdownChange(this)">
          ${getAllCatOptions()}
        </select>
        <select class="a-select" id="new-label">${labelOptions}</select>
        <input class="a-input" id="new-imgurl" placeholder="Image URL (optional)">
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
        <button class="a-btn a-btn-green" onclick="addNewItem()">➕ Add Item</button>
        ${isFirebaseReady()?`<button class="a-btn" onclick="syncMenuToFirebase()" style="background:linear-gradient(135deg,#FF6B35,#e55a20)">🔥 Sync All to Firebase</button>`:""}
      </div>
    </div>
    <div class="a-card">
      <div class="a-card-title">🔥 Combo Management</div>
      ${renderComboRows()}
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <div class="a-card-title">➕ Add New Combo</div>
        <div class="add-item-form">
          <input class="a-input" id="new-combo-name"  placeholder="Combo name">
          <input class="a-input" id="new-combo-emoji" placeholder="Emoji">
          <input class="a-input" id="new-combo-price" placeholder="Combo price (₹)" type="number">
          <select class="a-select" id="new-combo-label">
            <option value="">No label</option>
            <option value="popular">🔥 Most Popular</option>
            <option value="value">💸 Best Value</option>
          </select>
          <input class="a-input offer-form-full" id="new-combo-items" placeholder="Item IDs comma-separated (e.g. i1,i6)">
        </div>
        <button class="a-btn a-btn-green" style="margin-top:10px" onclick="addNewCombo()">➕ Add Combo</button>
      </div>
    </div>`;
}

function saveItemLabel(id) {
  const val  = document.getElementById(`label-sel-${id}`)?.value;
  const item = ITEMS.find(x=>x.id===id);
  if(item){item.label=val;save();showNotif(`✅ Label updated for ${item.name}`);renderAdminMenu();}
}

function deleteCustomCategory(id) {
  customCategories=customCategories.filter(c=>c.id!==id);
  rebuildCats();save();renderAdminMenu();showNotif("Category removed");
}

async function syncMenuToFirebase() {
  if(!isFirebaseReady())return showNotif("Firebase not ready");
  showLoader(true);
  try {
    for(const item of ITEMS){
      const {addDoc,collection}=firebaseAPI;
      await addDoc(collection(db,"menu_items"),item);
    }
    showNotif(`✅ ${ITEMS.length} items synced to Firebase!`);
  }catch(e){showNotif("Sync error: "+e.message);}
  finally{showLoader(false);}
}

function renderComboRows() {
  if(combos.length===0)return`<div class="empty-state">No combos yet.</div>`;
  return combos.map(c=>`
    <div class="menu-mgmt-row">
      <div style="font-size:24px;width:40px;text-align:center">${c.emoji}</div>
      <div class="mmr-info">
        <div class="mmr-name">${c.name}</div>
        <div class="mmr-cat">${c.itemIds.map(id=>{const it=ITEMS.find(x=>x.id===id);return it?it.name:"";}).join(" + ")}</div>
      </div>
      <input class="price-input" id="combo-price-${c.id}" value="${c.price}" type="number" min="1">
      <button class="save-price-btn" onclick="saveComboPrice('${c.id}')">Save</button>
      <button class="toggle-btn ${c.active?"toggle-on":"toggle-off"}" onclick="toggleCombo('${c.id}')">${c.active?"ON":"OFF"}</button>
      <button class="del-btn" onclick="deleteCombo('${c.id}')">✕</button>
    </div>`).join("");
}

function savePrice(id){
  const val=parseInt(document.getElementById(`price-${id}`)?.value);
  if(!val||val<1)return showNotif("⚠ Invalid price");
  const item=ITEMS.find(x=>x.id===id);
  if(item){item.price=val;save();showNotif(`✅ ${item.name} → ₹${val}`);}
}
function deleteItem(id){ITEMS=ITEMS.filter(x=>x.id!==id);save();renderAdminMenu();showNotif("Item deleted");}

function addNewItem(){
  const name   = document.getElementById("new-name").value.trim();
  const price  = parseInt(document.getElementById("new-price").value);
  const emoji  = document.getElementById("new-emoji").value.trim()||"🍽";
  const catSel = document.getElementById("new-cat");
  const cat    = (!catSel||catSel.value==="__new") ? "chat" : catSel.value;
  const label  = document.getElementById("new-label")?.value||"none";
  const imgUrl = document.getElementById("new-imgurl")?.value.trim()||null;
  if(!name)           return showNotif("⚠ Enter item name");
  if(!price||price<1) return showNotif("⚠ Enter valid price");

  const customCat = customCategories.find(c=>c.id===cat);
  const id        = "i"+Date.now();
  const newItem   = {
    id, name, price, cat, emoji, label,
    image:   imgUrl,
    icon:    ICON_MAP[cat]    || "custom-bg",
    tag:     TAG_MAP[cat]     || "tag-custom",
    add:     ADD_MAP[cat]     || "add-custom",
    tagLabel:LABEL_MAP[cat]   || (customCat ? customCat.name : cat),
    isNew:   true,
  };
  ITEMS.push(newItem);
  save();
  if(isFirebaseReady())saveItemToFirebase(newItem);
  renderAdminMenu();
  showNotif(`✅ ${name} added!${isFirebaseReady()?" 🔥 Firebase!":""}`);
}

function saveComboPrice(id){const val=parseInt(document.getElementById(`combo-price-${id}`)?.value);const c=combos.find(x=>x.id===id);if(c&&val>0){c.price=val;save();showNotif("Combo price updated!");}}
function toggleCombo(id){const c=combos.find(x=>x.id===id);if(c){c.active=!c.active;save();renderAdminMenu();showNotif(`Combo ${c.active?"ON":"OFF"}`);}}
function deleteCombo(id){combos=combos.filter(x=>x.id!==id);save();renderAdminMenu();showNotif("Combo deleted");}

function addNewCombo(){
  const name   = document.getElementById("new-combo-name").value.trim();
  const emoji  = document.getElementById("new-combo-emoji").value.trim()||"🔥";
  const price  = parseInt(document.getElementById("new-combo-price").value);
  const label  = document.getElementById("new-combo-label")?.value||"";
  const idsRaw = document.getElementById("new-combo-items").value.trim();
  if(!name)         return showNotif("⚠ Enter combo name");
  if(!price||price<1)return showNotif("⚠ Enter price");
  const itemIds=idsRaw.split(",").map(s=>s.trim()).filter(Boolean);
  if(itemIds.length<2)return showNotif("⚠ Add at least 2 item IDs");
  combos.push({id:"cb"+Date.now(),name,emoji,itemIds,price,active:true,label});
  save();renderAdminMenu();showNotif(`✅ Combo "${name}" added!`);
}

// ===================================================
//   IMAGE UPLOAD
// ===================================================
function openImageModal(itemId){
  pendingImageItemId=itemId;
  const item=ITEMS.find(x=>x.id===itemId);
  document.getElementById("modal-item-name").textContent=item?`📷 ${item.name}`:"";
  document.getElementById("image-preview").style.display="none";
  document.getElementById("image-file-input").value="";
  document.getElementById("image-url-input").value=item?.image||"";
  document.getElementById("image-modal").classList.add("show");
}
function closeImageModal(){document.getElementById("image-modal").classList.remove("show");pendingImageItemId=null;}
function handleImageUpload(event){
  const file=event.target.files[0];
  if(!file)return;
  if(file.size>2*1024*1024){showNotif("⚠ Image too large! Max 2MB");return;}
  const reader=new FileReader();
  reader.onload=e=>{const p=document.getElementById("image-preview");p.src=e.target.result;p.style.display="block";};
  reader.readAsDataURL(file);
}
function loadImageFromURL(){
  const url=document.getElementById("image-url-input").value.trim();
  if(!url.startsWith("http"))return showNotif("⚠ Enter valid https:// URL");
  const p=document.getElementById("image-preview");
  p.src=url;p.style.display="block";
  p.onerror=()=>showNotif("⚠ Could not load image from URL");
}
function saveItemImage(){
  const preview=document.getElementById("image-preview");
  if(!preview.src||preview.style.display==="none"){showNotif("⚠ Select an image first");return;}
  const item=ITEMS.find(x=>x.id===pendingImageItemId);
  if(item){item.image=preview.src;save();closeImageModal();renderAdminMenu();showNotif(`✅ Image saved for ${item.name}!`);}
}

// ===================================================
//   ADMIN OFFERS
// ===================================================
function renderAdminOffers(){
  const rows=offers.map(o=>`
    <div class="offer-row">
      <div style="flex:1">
        <div class="offer-name">${o.name}</div>
        <div style="font-size:11px;color:var(--muted)">${o.desc} ${o.timerType&&o.timerType!=="none"?`<span style="background:var(--blue-l);color:var(--blue-d);padding:1px 6px;border-radius:6px;font-weight:700">⏱ ${o.timerType}</span>`:""}</div>
      </div>
      <span class="offer-type ot-${o.type}">${o.type}</span>
      <span class="offer-val">${o.type==="time"?o.value+"%":o.type==="free"?"₹"+o.value+" min":o.type==="bulk"?o.discPct+"%":o.type==="personal"?o.value+"%":"—"}</span>
      <span class="offer-status ${o.active?"os-active":"os-inactive"}">${o.active?"Active":"Off"}</span>
      <button class="toggle-btn ${o.active?"toggle-on":"toggle-off"}" onclick="toggleOffer('${o.id}')">${o.active?"Disable":"Enable"}</button>
      <button class="del-offer-btn" onclick="deleteOffer('${o.id}')">✕</button>
    </div>`).join("");

  const timerTypeOptions=`
    <option value="none">No Timer</option>
    <option value="happy-hour">⚡ Happy Hour Countdown</option>
    <option value="flash">🔥 Flash Sale Timer</option>
    <option value="upcoming">🕐 Upcoming (counts down to start)</option>
    <option value="seasonal">🌿 Seasonal (days remaining)</option>
    <option value="todays">☀️ Today's Special (ends at midnight)</option>`;

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">🎁 Offers Management</div>
    <div class="a-card"><div class="a-card-title">Current Offers</div>${rows||`<div class="empty-state">No offers yet.</div>`}</div>
    <div class="a-card">
      <div class="a-card-title">➕ Create New Offer</div>
      <div class="offer-form">
        <input class="a-input" id="of-name" placeholder="Offer name">
        <select class="a-select" id="of-type" onchange="renderOfferTypeFields()">
          <option value="time">⏰ Time-Based Discount</option>
          <option value="free">🎁 Free Item on Min Order</option>
          <option value="bulk">🛒 Bulk Discount</option>
          <option value="personal">🎯 Personal Offer</option>
          <option value="flash">⚡ Flash Sale</option>
        </select>
        <input class="a-input offer-form-full" id="of-desc" placeholder="Description shown to customers">
        <div class="offer-form-full">
          <label style="font-size:11px;font-weight:700;color:var(--muted);display:block;margin-bottom:6px;text-transform:uppercase">⏱ Timer Type</label>
          <select class="a-select" id="of-timer-type">${timerTypeOptions}</select>
        </div>
        <div class="offer-form-full" id="of-type-fields"></div>
      </div>
      <button class="a-btn" style="margin-top:12px" onclick="createOffer()">➕ Create Offer</button>
    </div>`;
  renderOfferTypeFields();
}

function renderOfferTypeFields(){
  const type=document.getElementById("of-type")?.value;
  const f   =document.getElementById("of-type-fields");
  if(!f)return;
  const itemOptions=ITEMS.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");
  const custOptions=Object.values(customers).map(c=>`<option value="${c.id}">${c.name} (${c.phone})</option>`).join("");
  if(type==="time")       f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-disc" placeholder="Discount %" type="number" min="1" max="100"><input class="a-input" id="of-start" placeholder="Start hour (0-23)" type="number" min="0" max="23"><input class="a-input" id="of-end" placeholder="End hour (0-23)" type="number" min="0" max="23"></div>`;
  else if(type==="free")  f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-minorder" placeholder="Min order ₹" type="number" min="1"><select class="a-select" id="of-freeitem">${itemOptions}</select></div>`;
  else if(type==="bulk")  f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-bulkqty" placeholder="Min items (e.g. 3)" type="number" min="2"><input class="a-input" id="of-bulkdisc" placeholder="Discount %" type="number" min="1" max="100"></div>`;
  else if(type==="personal")f.innerHTML=`<div class="offer-form"><select class="a-select" id="of-custid">${custOptions||"<option>No customers</option>"}</select><select class="a-select" id="of-itemid">${itemOptions}</select><input class="a-input" id="of-perdisc" placeholder="Discount %" type="number" min="1" max="100"></div>`;
  else if(type==="flash") f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-flashdisc" placeholder="Discount %" type="number" min="1" max="100"><input class="a-input" id="of-flashmins" placeholder="Duration in minutes (e.g. 30)" type="number" min="1"></div>`;
}

function createOffer(){
  const name      = document.getElementById("of-name").value.trim();
  const type      = document.getElementById("of-type").value;
  const desc      = document.getElementById("of-desc").value.trim();
  const timerType = document.getElementById("of-timer-type")?.value||"none";
  if(!name)return showNotif("⚠ Enter offer name");
  if(!desc)return showNotif("⚠ Enter description");
  let offer={id:"o"+Date.now(),name,type,desc,active:true,timerType};
  if(type==="time"){offer.value=parseInt(document.getElementById("of-disc")?.value)||10;offer.startHour=parseInt(document.getElementById("of-start")?.value)||16;offer.endHour=parseInt(document.getElementById("of-end")?.value)||19;}
  else if(type==="free"){offer.value=parseInt(document.getElementById("of-minorder")?.value)||100;const itemId=document.getElementById("of-freeitem")?.value;const item=ITEMS.find(x=>x.id===itemId);offer.freeItem=item?item.name:"Ice Cream";}
  else if(type==="bulk"){offer.value=parseInt(document.getElementById("of-bulkqty")?.value)||3;offer.discPct=parseInt(document.getElementById("of-bulkdisc")?.value)||33;}
  else if(type==="personal"){offer.targetUser=document.getElementById("of-custid")?.value;offer.itemId=document.getElementById("of-itemid")?.value;offer.value=parseInt(document.getElementById("of-perdisc")?.value)||15;}
  else if(type==="flash"){offer.value=parseInt(document.getElementById("of-flashdisc")?.value)||20;const mins=parseInt(document.getElementById("of-flashmins")?.value)||30;offer.startTime=Date.now();offer.endTime=Date.now()+mins*60000;offer.timerType="flash";}
  offers.push(offer);save();renderAdminOffers();renderAllOfferTimers();showNotif(`✅ Offer "${name}" created!`);
}

function toggleOffer(id){const o=offers.find(x=>x.id===id);if(o){o.active=!o.active;save();renderAdminOffers();renderAllOfferTimers();showNotif(`Offer ${o.active?"enabled":"disabled"}`);}}
function deleteOffer(id){offers=offers.filter(x=>x.id!==id);save();renderAdminOffers();renderAllOfferTimers();showNotif("Offer deleted");}

// ===================================================
//   ADMIN CUSTOMERS
// ===================================================
function renderAdminCustomers(){
  const custs=Object.values(customers);
  const rows=custs.length===0
    ? `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--muted)">No customers yet.</td></tr>`
    : custs.sort((a,b)=>b.totalSpent-a.totalSpent).map(c=>`
        <tr>
          <td><b>${c.name}</b>${c.visits>1?`<span class="repeat-chip">Repeat</span>`:""}${c.totalSpent>=500?`<span class="vip-chip">👑 VIP</span>`:""}</td>
          <td>${c.phone}</td>
          <td><span style="font-size:11px">${c.email||"—"}</span></td>
          <td>${c.visits}</td>
          <td>🌟 ${c.loyaltyPoints||0}</td>
          <td style="font-weight:800;color:var(--green-d)">₹${c.totalSpent}</td>
          <td>
            <button class="a-btn" style="padding:5px 10px;font-size:11px" onclick="createPersonalOfferForCustomer('${c.id}')">🎯 Offer</button>
            <button class="a-btn" style="padding:5px 10px;font-size:11px;background:var(--green);margin-top:3px" onclick="saveCustomerManuallyToFirebase('${c.id}')">☁️ Sync</button>
          </td>
        </tr>`).join("");

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">👥 Customers (${custs.length})</div>
    <div class="a-card" style="overflow-x:auto">
      <table class="cust-table">
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Visits</th><th>Points</th><th>Spent</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${isFirebaseReady()?`<button class="a-btn" onclick="syncAllCustomersToFirebase()" style="margin-top:12px">☁️ Sync All Customers to Firebase</button>`:""}`;
}

async function saveCustomerManuallyToFirebase(custId){
  const cust=customers[custId];
  if(!cust)return;
  await saveCustomerFullToFirebase(cust);
  showNotif(`✅ ${cust.name} synced to Firebase!`);
}

async function syncAllCustomersToFirebase(){
  if(!isFirebaseReady())return showNotif("Firebase not ready");
  showLoader(true);
  try{
    for(const cust of Object.values(customers)){
      await saveCustomerFullToFirebase(cust);
    }
    showNotif(`✅ All ${Object.keys(customers).length} customers synced!`);
  }catch(e){showNotif("Sync error: "+e.message);}
  finally{showLoader(false);}
}

function createPersonalOfferForCustomer(custId){
  const cust=customers[custId];if(!cust)return;
  const item=ITEMS[0];
  offers.push({id:"o"+Date.now(),name:`Special for ${cust.name}`,type:"personal",desc:`Exclusive 15% off for ${cust.name}`,targetUser:custId,itemId:item.id,value:15,active:true,timerType:"none"});
  save();switchAdminTab("offers");showNotif(`✅ Personal offer created for ${cust.name}!`);
}

// ===================================================
//   ADMIN ORDERS
// ===================================================
function renderAdminOrders(){
  const rows=queue.length===0
    ? `<div class="empty-state">No active orders. ${isFirebaseReady()?"(Firebase listening in real-time)":"(Local mode)"}</div>`
    : queue.map((o,i)=>`
        <div class="order-row">
          <span class="order-token">Token #${o.token}</span>
          <span class="status-badge ${o.status==="Ready"?"status-ready":"status-prep"}">${o.status}</span>
          ${o.deliveryMode==="delivery"
            ?`<span style="background:var(--blue-l);color:var(--blue-d);font-size:10px;font-weight:700;padding:2px 8px;border-radius:8px">🛵 Delivery</span>`
            :`<span style="background:var(--green-l);color:var(--green-d);font-size:10px;font-weight:700;padding:2px 8px;border-radius:8px">🏪 Pickup</span>`}
          <div class="order-items">${Object.keys(o.items||{}).filter(k=>k!=="__combos"&&k!=="__bulk").map(k=>`${k} ×${o.items[k].qty}`).join(", ")}
            ${o.deliveryAddress?`<div style="font-size:10px;color:var(--muted);margin-top:2px">📍 ${o.deliveryAddress}</div>`:""}
          </div>
          <div style="text-align:right">
            <div class="order-total">₹${o.total}</div>
            ${o.phone?`<div class="order-phone">${o.phone}</div>`:""}
          </div>
          <select class="a-select" style="width:110px;font-size:11px;padding:5px 8px"
            onchange="updateOrderStatusAdmin(${i},this.value)">
            ${ORDER_STATUSES.map(s=>`<option value="${s}"${(o.status||"Pending")===s?" selected":""}>${s}</option>`).join("")}
          </select>
          <button class="del-btn" onclick="adminRemoveOrder(${i})">✕</button>
        </div>`).join("");
  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">📋 Live Orders (${queue.length}) ${isFirebaseReady()?"🔥":""}</div>
    <div class="a-card">${rows}</div>`;
}

function updateOrderStatusAdmin(idx, status) {
  if(!queue[idx]) return;
  queue[idx].status=status;
  if(queue[idx]._docId) updateOrderStatusInFirebase(queue[idx]._docId, status);
  save();
  showNotif("✅ Token #"+queue[idx].token+" → "+status);
}
function adminRemoveOrder(i){queue.splice(i,1);save();renderAdminOrders();}

// ===================================================
//   ADMIN ANALYTICS
// ===================================================
function renderAdminAnalytics(){
  const tabs=["today","week","month"].map(p=>
    `<button class="period-btn${adminPeriod===p?" active":""}" onclick="adminPeriod='${p}';renderAdminAnalytics()">${p[0].toUpperCase()+p.slice(1)}</button>`
  ).join("");

  const logs=getPeriodLogs(adminPeriod);
  const CAT_OPTIONS=Object.keys(LABEL_MAP);
  const catSales={};
  CAT_OPTIONS.forEach(c=>catSales[c]=0);
  logs.forEach(l=>{
    Object.keys(l.items||{}).forEach(k=>{
      if(k==="__combos"||k==="__bulk")return;
      const item=ITEMS.find(x=>x.name===k);
      if(item)catSales[item.cat]=(catSales[item.cat]||0)+(l.items[k].qty||0);
    });
  });
  const maxCatSale=Math.max(...Object.values(catSales),1);
  const catBars=Object.entries(catSales).map(([cat,qty])=>{
    const pct=Math.round((qty/maxCatSale)*100);
    const color=BAR_COLORS[cat]||"var(--brand)";
    return `<div class="item-analytics-row"><div class="item-analytics-name">${LABEL_MAP[cat]||cat}</div><div class="item-analytics-bar-wrap"><div class="item-analytics-bar" style="width:${pct}%;background:${color}"></div></div><div class="item-analytics-val">${qty}</div></div>`;
  }).join("");

  const hourlyRev=new Array(24).fill(0);
  logs.forEach(l=>{hourlyRev[new Date(l.time).getHours()]+=l.total;});
  const maxH=Math.max(...hourlyRev,1);
  const peakHour=hourlyRev.indexOf(Math.max(...hourlyRev));
  const hourBars=hourlyRev.map((v,i)=>{
    const h=i===0?"12a":i<12?`${i}a`:i===12?"12p":`${i-12}p`;
    const ht=Math.round((v/maxH)*60)+2;
    return`<div class="bar-col"><div class="bar-val" style="font-size:8px">${v>0?"₹"+v:""}</div><div class="bar" style="height:${ht}px;background:${v===Math.max(...hourlyRev)?"var(--panipuri)":"var(--admin)"}"></div><div class="bar-label">${h}</div></div>`;
  }).join("");

  const itemCounts={};
  logs.forEach(l=>Object.keys(l.items||{}).forEach(k=>{
    if(k==="__combos"||k==="__bulk")return;
    itemCounts[k]=(itemCounts[k]||0)+(l.items[k].qty||0);
  }));
  const topItems=Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const maxItem=Math.max(...topItems.map(([,v])=>v),1);
  const itemBars=topItems.map(([name,qty])=>{
    const item=ITEMS.find(x=>x.name===name);
    const rev=qty*(item?item.price:0);
    const pct=Math.round((qty/maxItem)*100);
    const color=item?BAR_COLORS[item.cat]||"var(--brand)":"var(--brand)";
    return`<div class="item-analytics-row">
      <div class="item-analytics-name">${item?item.emoji+" ":""} ${name}</div>
      <div class="item-analytics-bar-wrap"><div class="item-analytics-bar" style="width:${pct}%;background:${color}"></div></div>
      <div class="item-analytics-val">${qty}</div>
      <div style="font-size:11px;font-weight:700;color:var(--green-d);min-width:52px;text-align:right">₹${rev}</div>
    </div>`;
  }).join("");

  const delivOrders  = logs.filter(l=>l.deliveryMode==="delivery").length;
  const pickupOrders = logs.length-delivOrders;
  const delivRev     = logs.filter(l=>l.deliveryMode==="delivery").reduce((s,l)=>s+l.total,0);
  const loyaltyEngaged = Object.values(customers).filter(c=>(c.loyaltyPoints||0)>0).length;

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">📈 Detailed Analytics</div>
    <div class="period-tabs">${tabs}</div>
    <div class="a-stat-grid">
      <div class="a-stat-card"><div class="a-stat-label">Revenue (${adminPeriod})</div><div class="a-stat-val green">₹${logs.reduce((s,l)=>s+l.total,0).toLocaleString("en-IN")}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Total Orders</div><div class="a-stat-val">${logs.length}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Avg Order Value</div><div class="a-stat-val">₹${logs.length>0?Math.round(logs.reduce((s,l)=>s+l.total,0)/logs.length):0}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Peak Hour</div><div class="a-stat-val blue">${peakHour}:00</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🛵 Delivery Orders</div><div class="a-stat-val orange">${delivOrders}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🏪 Pickup Orders</div><div class="a-stat-val">${pickupOrders}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Delivery Revenue</div><div class="a-stat-val green">₹${delivRev}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Loyalty Engaged</div><div class="a-stat-val green">${loyaltyEngaged}</div></div>
    </div>
    <div class="a-chart-wrap"><div class="a-chart-title">Revenue by Hour (${adminPeriod})</div><div class="bar-chart" style="height:80px">${hourBars}</div></div>
    <div class="a-card"><div class="a-card-title">🏆 Best Selling Items (${adminPeriod})</div>${itemBars||`<div class="empty-state">No data</div>`}</div>
    <div class="a-card"><div class="a-card-title">📊 Sales by Category (${adminPeriod})</div>${catBars}</div>`;
}

// ===================================================
//   ADMIN MARKETING
// ===================================================
function renderAdminMarketing(){
  const contactRows=adminContactNumbers.map((n,i)=>`
    <div class="contact-mgmt-row" id="cmr-${n.id}">
      <div class="cmr-info">
        <div class="cmr-label">${n.label}</div>
        <div class="cmr-number">${n.number}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        ${n.whatsapp?`<span class="wa-badge">💬 WhatsApp</span>`:""}
        <span class="contact-status-badge ${n.active?"contact-active":"contact-inactive"}">${n.active?"● Active":"○ Inactive"}</span>
        <button class="toggle-btn ${n.active?"toggle-on":"toggle-off"}" onclick="setActiveContact('${n.id}')">${n.active?"Active ✓":"Set Active"}</button>
        <button class="del-btn" onclick="deleteContact('${n.id}')">✕</button>
      </div>
    </div>`).join("");

  document.getElementById("admin-content").innerHTML=`
    <div class="a-section-title">📣 Marketing & Contact Settings</div>

    <div class="a-card" style="border:2px solid var(--admin)">
      <div class="a-card-title" style="font-size:14px;font-weight:800;color:var(--admin)">📞 Customer Contact Number Manager</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:14px">The <b>active</b> number is shown on the customer ordering screen.</div>
      ${contactRows}
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">
        <div class="a-card-title">➕ Add Contact Number</div>
        <div class="add-item-form">
          <input class="a-input" id="new-contact-label"  placeholder="Label (e.g. Manager, Store)">
          <input class="a-input" id="new-contact-number" placeholder="10-digit phone number" type="tel" maxlength="12">
          <label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--text);cursor:pointer">
            <input type="checkbox" id="new-contact-wa" checked style="width:auto"> WhatsApp enabled
          </label>
        </div>
        <button class="a-btn a-btn-green" style="margin-top:10px" onclick="addContactNumber()">➕ Add Number</button>
      </div>
    </div>

    <!-- ✅ UPI Details card in Marketing tab -->
    <div class="a-card" style="background:linear-gradient(135deg,#e8fff0,#d5ffe8);border:2px solid var(--green)">
      <div class="a-card-title" style="color:var(--green-d)">💳 UPI Payment Collection</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:13px;font-weight:600;color:var(--text)">
          🏦 UPI ID: <b style="color:var(--green-d)">${UPI_CONFIG.upiId}</b>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--text)">
          📱 UPI Number: <b style="color:var(--admin)">${UPI_CONFIG.upiNum}</b>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--text)">
          👤 Account Name: <b>${UPI_CONFIG.name}</b>
        </div>
        <div style="font-size:12px;color:var(--muted);background:rgba(99,153,34,0.08);padding:8px 12px;border-radius:8px;margin-top:4px">
          ✅ Customers will see this UPI ID and QR code when they click "Pay via UPI"
        </div>
      </div>
    </div>

    <div class="a-card">
      <div class="a-card-title">📍 Store Location & Delivery Zone</div>
      <div class="store-info-grid">
        <div class="store-info-row">🏪 <div><b>${STORE_LOCATION.name}</b><br><span style="font-size:12px;color:var(--muted)">${STORE_LOCATION.address}</span></div></div>
        <div class="store-info-row">🛵 <div><b>Delivery Radius:</b> ${DELIVERY_RADIUS_KM} km | Min Order: ₹${DELIVERY_MIN_ORDER} | Charge: ₹${DELIVERY_CHARGE}</div></div>
      </div>
      <a href="${STORE_LOCATION.mapUrl}" target="_blank" class="map-link-btn" style="display:inline-block;margin-top:10px">🗺️ View Store on Google Maps</a>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">🔥 Firebase Deployment Guide <span class="roi-badge">Go Live</span></div>
      <div class="marketing-tip"><div class="marketing-tip-icon">1️⃣</div><b>Firebase Hosting:</b> Run <code style="background:#f0f0f0;padding:2px 6px;border-radius:4px">firebase deploy</code> → Free URL at sv-chat-center.web.app</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">2️⃣</div><b>Customer Data:</b> All customer emails & phones are saved to Firestore automatically.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">3️⃣</div><b>Share:</b> WhatsApp your app URL to customers with your active contact number shown on screen.</div>
    </div>`;
}

function setActiveContact(id){
  adminContactNumbers.forEach(n=>n.active=n.id===id);
  save();
  renderAdminMarketing();
  renderContactBar();
  showNotif("✅ Active contact number updated!");
}

function deleteContact(id){
  if(adminContactNumbers.length<=1){showNotif("⚠ Keep at least one contact number");return;}
  adminContactNumbers=adminContactNumbers.filter(n=>n.id!==id);
  if(!adminContactNumbers.find(n=>n.active))adminContactNumbers[0].active=true;
  save();renderAdminMarketing();renderContactBar();showNotif("Contact removed");
}

function addContactNumber(){
  const label  = document.getElementById("new-contact-label")?.value.trim();
  const number = document.getElementById("new-contact-number")?.value.trim();
  const wa     = document.getElementById("new-contact-wa")?.checked;
  if(!label)           return showNotif("⚠ Enter a label");
  if(number.length<10) return showNotif("⚠ Enter valid phone number");
  adminContactNumbers.push({id:"n"+Date.now(),label,number,whatsapp:!!wa,active:false});
  save();renderAdminMarketing();showNotif(`✅ Contact "${label}" added!`);
}

// ===================================================
//   INIT
// ===================================================
load();
createParticles();
showScreen("screen-landing");
setInterval(renderOfferBanner, 60000);
setInterval(renderAllOfferTimers, 30000);

const style=document.createElement("style");
style.textContent=`@keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0);opacity:0.7}100%{transform:translateY(120px) rotate(360deg);opacity:0}} @keyframes token-bounce{0%{transform:scale(0) rotate(-10deg)}70%{transform:scale(1.1) rotate(3deg)}100%{transform:scale(1) rotate(0)}}`;
document.head.appendChild(style);

window._onFirebaseReady = async function() {
  console.log("🔥 Firebase ready — fetching persisted data...");
  await fetchCustomersFromFirebase();
  await fetchOrdersFromFirebase();
  listenToOrders();
  loadItemsFromFirebase();
  loadOffersFromFirebase();
};