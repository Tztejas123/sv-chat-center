// ===================================================
//   SV CHAT CENTER v5 — script.js
//   + Forgot Password (OTP flow, Firebase-ready)
//   + Real Food Images (Unsplash)
//   + Loyalty Points System
//   + Happy Hour Countdown
//   + Review System
//   + Marketing Tips Tab
//   + Enhanced Upsell with Timer
// ===================================================

const ADMIN_SECRET_KEY = "sv@secret2024";
const DEFAULT_ADMIN = { username: "admin", password: "sv@admin", name: "Owner", email: "admin@svchat.com" };

// ===================================================
//   REAL FOOD IMAGES (Unsplash CDN — free, no key needed)
//   Format: https://source.unsplash.com/300x200/?keyword
//   For production → upload your own images via admin panel
// ===================================================
const DEFAULT_IMAGES = {
  "Samosa Chat":       "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
  "Katori Chat":       "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
  "Sambharwadi":       "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
  "Dahi Puri":         "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Sev Puri":          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Panipuri (6 pcs)":  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Panipuri (12 pcs)": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Masala Panipuri":   "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Sweet Panipuri":    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
  "Shegaon Kachori":   "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&h=200&fit=crop",
  "Kachori Sabzi":     "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&h=200&fit=crop",
  "Gila Wada":         "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
  "Wada Pav":          "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
  "Ice Cream":         "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop",
  "Ice Cream Cup":     "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=200&fit=crop",
  "Kulfi":             "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop",
  "Sugarcane Juice":   "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
  "Masala Chaas":      "https://images.unsplash.com/photo-1544025162-d76538811ef4?w=300&h=200&fit=crop",
  "Lemon Sharbat":     "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
  "Rose Milk":         "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=200&fit=crop",
  "Bhel Puri":         "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
  "Ragda Patties":     "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300&h=200&fit=crop",
  "Aloo Tikki":        "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=300&h=200&fit=crop",
  "Corn Chat":         "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=300&h=200&fit=crop",
};

// ===================================================
//   ITEMS — Full expanded menu
// ===================================================
let ITEMS = [
  { id:"i1",  name:"Samosa Chat",        price:40,  cat:"chat",      emoji:"🥗", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      bestseller:true,  isNew:false, image:null },
  { id:"i2",  name:"Katori Chat",        price:50,  cat:"chat",      emoji:"🥣", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      bestseller:false, isNew:false, image:null },
  { id:"i3",  name:"Sambharwadi",        price:40,  cat:"chat",      emoji:"🍲", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      bestseller:false, isNew:false, image:null },
  { id:"i16", name:"Dahi Puri",          price:50,  cat:"chat",      emoji:"🫙", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      bestseller:false, isNew:false, image:null },
  { id:"i17", name:"Sev Puri",           price:40,  cat:"chat",      emoji:"🍛", icon:"chat-bg",     tag:"tag-chat",      add:"add-chat",    tagLabel:"Chat",      bestseller:false, isNew:false, image:null },
  { id:"i7",  name:"Panipuri (6 pcs)",   price:30,  cat:"panipuri",  emoji:"🫧", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  bestseller:true,  isNew:false, image:null },
  { id:"i8",  name:"Panipuri (12 pcs)",  price:55,  cat:"panipuri",  emoji:"🫧", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  bestseller:false, isNew:false, image:null },
  { id:"i9",  name:"Masala Panipuri",    price:40,  cat:"panipuri",  emoji:"🌶️", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  bestseller:false, isNew:false, image:null },
  { id:"i18", name:"Sweet Panipuri",     price:35,  cat:"panipuri",  emoji:"🍬", icon:"panipuri-bg", tag:"tag-panipuri",  add:"add-panipuri",tagLabel:"Panipuri",  bestseller:false, isNew:true,  image:null },
  { id:"i4",  name:"Shegaon Kachori",    price:40,  cat:"kachori",   emoji:"🫓", icon:"kachori-bg",  tag:"tag-kachori",   add:"add-kachori", tagLabel:"Kachori",   bestseller:true,  isNew:false, image:null },
  { id:"i19", name:"Kachori Sabzi",      price:55,  cat:"kachori",   emoji:"🍜", icon:"kachori-bg",  tag:"tag-kachori",   add:"add-kachori", tagLabel:"Kachori",   bestseller:false, isNew:false, image:null },
  { id:"i5",  name:"Gila Wada",          price:35,  cat:"wada",      emoji:"🫔", icon:"wada-bg",     tag:"tag-wada",      add:"add-wada",    tagLabel:"Wada",      bestseller:false, isNew:false, image:null },
  { id:"i20", name:"Wada Pav",           price:25,  cat:"wada",      emoji:"🥪", icon:"wada-bg",     tag:"tag-wada",      add:"add-wada",    tagLabel:"Wada",      bestseller:false, isNew:false, image:null },
  { id:"i6",  name:"Ice Cream",          price:30,  cat:"ice",       emoji:"🍦", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", bestseller:false, isNew:false, image:null },
  { id:"i10", name:"Ice Cream Cup",      price:40,  cat:"ice",       emoji:"🍨", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", bestseller:false, isNew:false, image:null },
  { id:"i11", name:"Kulfi",              price:35,  cat:"ice",       emoji:"🍡", icon:"ice-bg",      tag:"tag-ice",       add:"add-ice",     tagLabel:"Ice Cream", bestseller:false, isNew:false, image:null },
  { id:"i12", name:"Sugarcane Juice",    price:30,  cat:"beverages", emoji:"🥤", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", bestseller:false, isNew:false, image:null },
  { id:"i13", name:"Masala Chaas",       price:25,  cat:"beverages", emoji:"🥛", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", bestseller:false, isNew:false, image:null },
  { id:"i21", name:"Lemon Sharbat",      price:25,  cat:"beverages", emoji:"🍋", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", bestseller:false, isNew:true,  image:null },
  { id:"i22", name:"Rose Milk",          price:30,  cat:"beverages", emoji:"🌹", icon:"bev-bg",      tag:"tag-beverages", add:"add-bev",     tagLabel:"Beverages", bestseller:false, isNew:false, image:null },
  { id:"i14", name:"Bhel Puri",          price:35,  cat:"snacks",    emoji:"🫘", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    bestseller:false, isNew:false, image:null },
  { id:"i15", name:"Ragda Patties",      price:55,  cat:"snacks",    emoji:"🫕", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    bestseller:false, isNew:false, image:null },
  { id:"i23", name:"Aloo Tikki",         price:40,  cat:"snacks",    emoji:"🥔", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    bestseller:false, isNew:false, image:null },
  { id:"i24", name:"Corn Chat",          price:40,  cat:"snacks",    emoji:"🌽", icon:"snack-bg",    tag:"tag-snacks",    add:"add-snack",   tagLabel:"Snacks",    bestseller:false, isNew:false, image:null },
];

const CATS = [
  { id:"all",       label:"🍽 All",         cls:"cat-all" },
  { id:"chat",      label:"🥗 Chat",        cls:"cat-chat" },
  { id:"panipuri",  label:"🫧 Panipuri",    cls:"cat-panipuri" },
  { id:"kachori",   label:"🫓 Kachori",     cls:"cat-kachori" },
  { id:"wada",      label:"🫔 Wada",        cls:"cat-wada" },
  { id:"ice",       label:"🍦 Ice Cream",   cls:"cat-ice" },
  { id:"beverages", label:"🥤 Beverages",   cls:"cat-beverages" },
  { id:"snacks",    label:"🍟 Snacks",      cls:"cat-snacks" },
];

const CAT_OPTIONS = ["chat","panipuri","kachori","wada","ice","beverages","snacks"];
const ICON_MAP  = { chat:"chat-bg", panipuri:"panipuri-bg", kachori:"kachori-bg", wada:"wada-bg", ice:"ice-bg", beverages:"bev-bg",  snacks:"snack-bg" };
const TAG_MAP   = { chat:"tag-chat", panipuri:"tag-panipuri", kachori:"tag-kachori", wada:"tag-wada", ice:"tag-ice", beverages:"tag-beverages", snacks:"tag-snacks" };
const ADD_MAP   = { chat:"add-chat", panipuri:"add-panipuri", kachori:"add-kachori", wada:"add-wada", ice:"add-ice", beverages:"add-bev", snacks:"add-snack" };
const LABEL_MAP = { chat:"Chat", panipuri:"Panipuri", kachori:"Kachori", wada:"Wada", ice:"Ice Cream", beverages:"Beverages", snacks:"Snacks" };
const BAR_COLORS = { chat:"#E24B4A", panipuri:"#E8622A", kachori:"#7F77DD", wada:"#EF9F27", ice:"#378ADD", beverages:"#3ABABA", snacks:"#9B59B6" };

// ===== LOYALTY CONFIG =====
const POINTS_PER_RUPEE = 1; // 1 point per ₹1 spent
const REWARD_TIERS = [
  { points:100, reward:"5% off next order", icon:"🥉" },
  { points:300, reward:"Free Ice Cream", icon:"🥈" },
  { points:500, reward:"10% off + Free Beverage", icon:"🥇" },
  { points:1000, reward:"VIP Status + Free Combo", icon:"👑" },
];

// ===== STATE =====
let admins={}, customers={}, queue=[], salesLog=[];
let offers=[], combos=[], orders_all=[];
let currentUser=null, cart={}, activeCustCat="all";
let activeCustTab="cart", activeAdminTab="dashboard";
let adminPeriod="today", pendingUpsell=null;
let pendingImageItemId=null, orderToken=1;
let upsellTimerInterval=null, happyHourInterval=null;
let otpStore={}; // { email: { otp, expiry, role } }
let currentRating=0;

// ===================================================
//   LOAD / SAVE
// ===================================================
function load() {
  try {
    const stored = JSON.parse(localStorage.getItem("sv_v5") || "{}");
    admins     = stored.admins     || {};
    customers  = stored.customers  || {};
    queue      = stored.queue      || [];
    salesLog   = stored.salesLog   || [];
    offers     = stored.offers     || [];
    combos     = stored.combos     || [];
    orders_all = stored.orders_all || [];
    if (stored.items && stored.items.length > 0) ITEMS = stored.items;
    if (!admins["admin"]) admins["admin"] = { ...DEFAULT_ADMIN };
    if (combos.length === 0) {
      combos = [
        { id:"cb1", name:"Chat Combo",     emoji:"🔥", itemIds:["i1","i6"],       price:60,  active:true, label:"popular" },
        { id:"cb2", name:"Kachori Combo",  emoji:"⚡", itemIds:["i4","i6"],       price:60,  active:true, label:"value" },
        { id:"cb3", name:"Panipuri+Ice",   emoji:"🫧", itemIds:["i7","i6"],       price:52,  active:true, label:"" },
        { id:"cb4", name:"Family Feast",   emoji:"👨‍👩‍👧", itemIds:["i1","i4","i6"],  price:100, active:true, label:"popular" },
        { id:"cb5", name:"Street Special", emoji:"🌟", itemIds:["i1","i7","i13"], price:85,  active:true, label:"value" },
      ];
    }
    if (offers.length === 0) {
      offers = [
        { id:"o1", name:"Happy Hours",        type:"time", value:10, startHour:16, endHour:19, active:true, desc:"10% off 4PM–7PM" },
        { id:"o2", name:"Free Ice Cream ₹100",type:"free", value:100,freeItem:"Ice Cream",    active:true, desc:"Order ₹100+ get free Ice Cream" },
        { id:"o3", name:"Buy 3 Pay 2",         type:"bulk", value:3,  discPct:33,              active:false,desc:"Buy any 3 items, pay for 2" },
      ];
    }
    orderToken = stored.orderToken || 1;
  } catch(e) { console.error("Load error:", e); }
}

function save() {
  const data = { admins, customers, queue, salesLog, offers, combos, orders_all, items:ITEMS, orderToken };
  localStorage.setItem("sv_v5", JSON.stringify(data));
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
  n._t = setTimeout(() => n.classList.remove("show"), dur || 2800);
}

// ===================================================
//   PASSWORD TOGGLE
// ===================================================
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
  btn.textContent = input.type === "password" ? "👁" : "🙈";
}

// ===================================================
//   OTP SYSTEM (UI + EmailJS ready)
//   For Firebase: replace with sendPasswordResetEmail()
// ===================================================
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendCustomerOTP() {
  const email = document.getElementById("c-forgot-email").value.trim();
  if (!email.includes("@")) return setAuthError("customer", "Enter valid email");
  
  // Find customer by email
  const cust = Object.values(customers).find(c => c.email === email);
  if (!cust) return setAuthError("customer", "No account found with this email");
  
  const otp = generateOTP();
  otpStore[email] = { otp, expiry: Date.now() + 600000, role: "customer", userId: cust.id };
  
  // ====================================================
  // FIREBASE INTEGRATION POINT:
  // Replace this block with:
  //   import { sendPasswordResetEmail } from "firebase/auth";
  //   await sendPasswordResetEmail(auth, email);
  // Or use EmailJS for custom OTP:
  //   emailjs.send("service_id","template_id",{to_email:email,otp:otp})
  // For demo: show OTP in console + notification
  // ====================================================
  console.log(`📧 OTP for ${email}: ${otp}`); // Remove in production
  showNotif(`📧 OTP sent! (Demo: check console) Code: ${otp}`, 6000);
  
  document.getElementById("c-otp-sent-to").textContent = `OTP sent to ${email.replace(/(.{2}).*(@.*)/, "$1***$2")}`;
  document.getElementById("c-forgot-step1").style.display = "none";
  document.getElementById("c-forgot-step2").style.display = "block";
  startOTPCountdown("c");
  setAuthError("customer", "");
}

function sendAdminOTP() {
  const email = document.getElementById("a-forgot-email").value.trim();
  if (!email.includes("@")) return setAuthError("admin", "Enter valid email");
  
  // Find admin by email
  const adm = Object.values(admins).find(a => a.email === email);
  if (!adm) return setAuthError("admin", "No admin account found with this email");
  
  const otp = generateOTP();
  otpStore[email] = { otp, expiry: Date.now() + 600000, role: "admin", username: adm.username };
  
  console.log(`📧 Admin OTP for ${email}: ${otp}`); // Remove in production
  showNotif(`📧 OTP sent! (Demo: check console) Code: ${otp}`, 6000);
  
  document.getElementById("a-otp-sent-to").textContent = `OTP sent to ${email.replace(/(.{2}).*(@.*)/, "$1***$2")}`;
  document.getElementById("a-forgot-step1").style.display = "none";
  document.getElementById("a-forgot-step2").style.display = "block";
  startOTPCountdown("a");
  setAuthError("admin", "");
}

function startOTPCountdown(prefix) {
  let secs = 60;
  const countEl = document.getElementById(`${prefix}-otp-countdown`);
  const timerEl = document.getElementById(`${prefix}-otp-timer`);
  const resendBtn = document.getElementById(`${prefix}-resend-btn`);
  
  const interval = setInterval(() => {
    secs--;
    if (countEl) countEl.textContent = secs;
    if (secs <= 0) {
      clearInterval(interval);
      if (timerEl) timerEl.style.display = "none";
      if (resendBtn) resendBtn.style.display = "block";
    }
  }, 1000);
}

function otpNext(input, boxesId) {
  input.classList.add("filled");
  const boxes = document.getElementById(boxesId).querySelectorAll(".otp-box");
  const idx = Array.from(boxes).indexOf(input);
  if (idx < boxes.length - 1 && input.value) boxes[idx + 1].focus();
}

function getOTPValue(boxesId) {
  return Array.from(document.getElementById(boxesId).querySelectorAll(".otp-box"))
    .map(b => b.value).join("");
}

function verifyCustomerOTP() {
  const email = document.getElementById("c-forgot-email").value.trim();
  const entered = getOTPValue("c-otp-boxes");
  const record = otpStore[email];
  
  if (!record) return setAuthError("customer", "Please request a new OTP");
  if (Date.now() > record.expiry) return setAuthError("customer", "OTP expired. Request a new one");
  if (entered !== record.otp) return setAuthError("customer", "Wrong OTP. Try again");
  
  document.getElementById("c-forgot-step2").style.display = "none";
  document.getElementById("c-forgot-step3").style.display = "block";
  setAuthError("customer", "");
}

function verifyAdminOTP() {
  const email = document.getElementById("a-forgot-email").value.trim();
  const entered = getOTPValue("a-otp-boxes");
  const record = otpStore[email];
  
  if (!record) return setAuthError("admin", "Please request a new OTP");
  if (Date.now() > record.expiry) return setAuthError("admin", "OTP expired. Request a new one");
  if (entered !== record.otp) return setAuthError("admin", "Wrong OTP. Try again");
  
  document.getElementById("a-forgot-step2").style.display = "none";
  document.getElementById("a-forgot-step3").style.display = "block";
  setAuthError("admin", "");
}

function resetCustomerPassword() {
  const email = document.getElementById("c-forgot-email").value.trim();
  const pass = document.getElementById("c-new-pass").value;
  const confirm = document.getElementById("c-confirm-pass").value;
  
  if (pass.length < 4) return setAuthError("customer", "Password must be 4+ characters");
  if (pass !== confirm) return setAuthError("customer", "Passwords don't match");
  
  const record = otpStore[email];
  if (!record) return setAuthError("customer", "Session expired. Start again");
  
  const cust = customers[record.userId];
  if (cust) {
    cust.password = pass;
    save();
    delete otpStore[email];
    showNotif("✅ Password reset! Please login.");
    switchAuthTab("customer", "login");
    setAuthError("customer", "");
  }
}

function resetAdminPassword() {
  const email = document.getElementById("a-forgot-email").value.trim();
  const pass = document.getElementById("a-new-pass").value;
  const confirm = document.getElementById("a-confirm-pass").value;
  
  if (pass.length < 4) return setAuthError("admin", "Password must be 4+ characters");
  if (pass !== confirm) return setAuthError("admin", "Passwords don't match");
  
  const record = otpStore[email];
  if (!record) return setAuthError("admin", "Session expired. Start again");
  
  const adm = admins[record.username];
  if (adm) {
    adm.password = pass;
    save();
    delete otpStore[email];
    showNotif("✅ Admin password reset! Please login.");
    switchAuthTab("admin", "login");
    setAuthError("admin", "");
  }
}

// ===================================================
//   LANDING PARTICLES
// ===================================================
function createParticles() {
  const container = document.getElementById("landing-particles");
  if (!container) return;
  const emojis = ["🌶️","🍦","🫧","🥗","🫓","🎉","⭐","🔥"];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `left:${Math.random()*100}%;width:${20+Math.random()*20}px;height:${20+Math.random()*20}px;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;font-size:${16+Math.random()*16}px;background:none;display:flex;align-items:center;justify-content:center;`;
    p.textContent = emojis[i % emojis.length];
    container.appendChild(p);
  }
}

// ===================================================
//   AUTH
// ===================================================
function switchAuthTab(role, tab) {
  const p = role === "customer" ? "c" : "a";
  const tabs = ["login","signup","forgot"];
  tabs.forEach(t => {
    const tabEl = document.getElementById(`${p}-tab-${t}`);
    const formEl = document.getElementById(`${p}-form-${t}`);
    if (tabEl) tabEl.classList.toggle("active", t === tab);
    if (formEl) formEl.style.display = t === tab ? "block" : "none";
  });
  // Reset forgot steps when switching
  if (tab === "forgot") {
    const prefix = p;
    const steps = ["step1","step2","step3"];
    steps.forEach((s, i) => {
      const el = document.getElementById(`${prefix}-forgot-${s}`);
      if (el) el.style.display = i === 0 ? "block" : "none";
    });
  }
  setAuthError(role, "");
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
  if (!name)               return setAuthError("customer","Enter your name");
  if (phone.length !== 10) return setAuthError("customer","Enter valid 10-digit phone");
  if (!email.includes("@"))return setAuthError("customer","Enter valid email");
  if (pass.length < 4)     return setAuthError("customer","Password 4+ characters");
  if (customers[phone])    return setAuthError("customer","Account already exists");
  customers[phone] = { id:phone, name, phone, email, password:pass, orders:[], totalSpent:0, visits:0, loyaltyPoints:0, joinedAt:Date.now() };
  save();
  showNotif(`✅ Welcome ${name}! 🎉`);
  loginAsCustomer(customers[phone]);
}

function customerLogin() {
  const input = document.getElementById("c-login-id").value.trim();
  const pass  = document.getElementById("c-login-pass").value;
  const cust  = Object.values(customers).find(c => c.phone===input || c.email===input);
  if (!cust)                return setAuthError("customer","No account found");
  if (cust.password !== pass) return setAuthError("customer","Wrong password");
  loginAsCustomer(cust);
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
  if (!name) return setAuthError("admin","Enter name");
  if (!user) return setAuthError("admin","Enter username");
  if (!email.includes("@")) return setAuthError("admin","Enter valid email");
  if (pass.length < 4) return setAuthError("admin","Password 4+ chars");
  if (key !== ADMIN_SECRET_KEY) return setAuthError("admin","Invalid secret key");
  if (admins[user]) return setAuthError("admin","Username taken");
  admins[user] = { username:user, password:pass, name, email };
  save();
  loginAsAdmin(admins[user]);
}

function adminLogin() {
  const user = document.getElementById("a-login-user").value.trim();
  const pass = document.getElementById("a-login-pass").value;
  if (!admins[user])               return setAuthError("admin","Admin not found");
  if (admins[user].password !== pass) return setAuthError("admin","Wrong password");
  loginAsAdmin(admins[user]);
}

function loginAsAdmin(admin) {
  currentUser = { type:"admin", id:admin.username, name:admin.name };
  document.getElementById("admin-name-badge").textContent = `Welcome, ${admin.name}`;
  showScreen("screen-admin-app");
  switchAdminTab("dashboard");
}

function adminLogout() {
  currentUser = null;
  showScreen("screen-landing");
}

// ===================================================
//   CUSTOMER APP LAUNCH
// ===================================================
function launchCustomerApp() {
  cart = {};
  activeCustCat = "all";
  activeCustTab = "cart";

  const wBar = document.getElementById("cust-welcome-bar");
  const loyaltyChip = document.getElementById("loyalty-chip");

  if (currentUser.id !== "guest") {
    const c = customers[currentUser.id];
    document.getElementById("cust-user-badge").textContent = `👤 ${currentUser.name}`;
    
    // Show loyalty points
    if (c) {
      const pts = c.loyaltyPoints || 0;
      loyaltyChip.style.display = "block";
      loyaltyChip.textContent = `🌟 ${pts} pts`;
      
      if (c.visits > 0) {
        wBar.style.display = "flex";
        const isVIP = c.totalSpent >= 500;
        wBar.innerHTML = `${isVIP?"👑":"👋"} Welcome back <b>${c.name}</b>! ${isVIP?"VIP •":""} Visit #${c.visits+1} • 🌟 ${pts} points • Spent ₹${c.totalSpent}`;
      } else {
        wBar.style.display = "flex";
        wBar.innerHTML = `🎉 Welcome <b>${c.name}</b>! Enjoy your first order 🍽️ • Earn loyalty points on every order!`;
      }
    }
    const pOffer = getPersonalOffer(currentUser.id);
    if (pOffer) showNotif(`🎁 You have a personal offer! Check your items.`, 4000);
  } else {
    document.getElementById("cust-user-badge").textContent = "Guest";
    loyaltyChip.style.display = "none";
    wBar.style.display = "none";
  }

  renderOfferBanner();
  renderLiveOfferBar();
  renderCustCatBar();
  renderCustCombos();
  renderCustMenu();
  renderCustCartPanel();
  showScreen("screen-customer-app");

  // Start happy hour interval
  if (happyHourInterval) clearInterval(happyHourInterval);
  happyHourInterval = setInterval(renderLiveOfferBar, 60000);
}

// ===================================================
//   OFFER ENGINE
// ===================================================
function getActiveOffers()    { return offers.filter(o => o.active); }
function getTimeDiscount()    { const h=new Date().getHours(); const o=getActiveOffers().find(o=>o.type==="time"&&h>=o.startHour&&h<=o.endHour); return o?o.value/100:0; }
function getFreeItemOffer()   { return getActiveOffers().find(o => o.type==="free") || null; }
function getBulkOffer()       { return getActiveOffers().find(o => o.type==="bulk") || null; }
function getPersonalOffer(uid){ if(!uid||uid==="guest") return null; return getActiveOffers().find(o=>o.type==="personal"&&o.targetUser===uid)||null; }

function renderOfferBanner() {
  const container = document.getElementById("cust-offer-banner");
  const activeOffs = getActiveOffers();
  if (activeOffs.length === 0) { container.style.display="none"; return; }
  const items = activeOffs.map(o => `<span class="offer-ticker-item">🎁 ${o.name}: ${o.desc}</span>`).join("");
  container.style.display = "block";
  container.innerHTML = `<div class="offer-ticker">${items}${items}</div>`;
}

function renderLiveOfferBar() {
  const bar = document.getElementById("live-offer-bar");
  const h = new Date().getHours();
  const timeOffer = getActiveOffers().find(o => o.type==="time" && h < o.endHour);
  
  if (timeOffer && h >= timeOffer.startHour && h <= timeOffer.endHour) {
    // Currently in happy hour
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(timeOffer.endHour, 0, 0, 0);
    const secsLeft = Math.max(0, Math.floor((endTime - now) / 1000));
    const mins = Math.floor(secsLeft / 60);
    const secs = secsLeft % 60;
    bar.style.display = "flex";
    bar.innerHTML = `⚡ <b>Happy Hours LIVE!</b> ${timeOffer.value}% OFF — <span class="live-countdown">Ends in ${mins}:${String(secs).padStart(2,"0")}</span>`;
  } else if (timeOffer && h < timeOffer.startHour) {
    // Upcoming happy hour
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(timeOffer.startHour, 0, 0, 0);
    const secsLeft = Math.max(0, Math.floor((startTime - now) / 1000));
    const hrs = Math.floor(secsLeft / 3600);
    const mins = Math.floor((secsLeft % 3600) / 60);
    bar.style.display = "flex";
    bar.style.background = "linear-gradient(90deg,#1a0a2e,#2d1b5e)";
    bar.innerHTML = `🕐 Happy Hours starts in <span class="live-countdown">${hrs}h ${mins}m</span> — Get ${timeOffer.value}% OFF!`;
  } else {
    bar.style.display = "none";
  }
}

// ===================================================
//   CATEGORY BAR
// ===================================================
function renderCustCatBar() {
  document.getElementById("cust-cat-bar").innerHTML = CATS.map(c =>
    `<button class="cat-btn ${c.cls}${activeCustCat===c.id?" active":""}" onclick="filterCustCat('${c.id}')">${c.label}</button>`
  ).join("");
}

function filterCustCat(cat) {
  activeCustCat = cat;
  renderCustCatBar();
  renderCustMenu();
}

// ===================================================
//   COMBOS
// ===================================================
function renderCustCombos() {
  const sec    = document.getElementById("cust-combo-section");
  const active = combos.filter(c => c.active);
  if (active.length===0) { sec.innerHTML=`<div class="section-title" style="margin-bottom:10px">🍽 Menu</div>`; return; }

  const cards = active.map(c => {
    const names = c.itemIds.map(id => { const i=ITEMS.find(x=>x.id===id); return i?i.name:""; }).filter(Boolean);
    const orig  = c.itemIds.reduce((s,id) => { const i=ITEMS.find(x=>x.id===id); return s+(i?i.price:0); }, 0);
    const save  = orig - c.price;
    const labelHTML = c.label === "popular" 
      ? `<span class="combo-label combo-label-popular">🔥 Most Popular</span>`
      : c.label === "value"
      ? `<span class="combo-label combo-label-value">💸 Best Value</span>`
      : "";
    return `
      <div class="combo-card" onclick="addCombo('${c.id}')">
        ${labelHTML}
        <div class="combo-fire">${c.emoji}</div>
        <div class="combo-name">${c.name}</div>
        <div class="combo-items-list">${names.join(" + ")}</div>
        <div class="combo-pricing">
          <div class="combo-price">₹${c.price}</div>
          <div class="combo-original">₹${orig}</div>
          <div class="combo-save">Save ₹${save}</div>
        </div>
        <button class="combo-add-btn">🛒 Add Combo</button>
      </div>`;
  }).join("");

  sec.innerHTML = `<div class="section-title">🔥 Combo Offers</div><div class="combo-grid">${cards}</div><div class="section-title">🍽 Menu</div>`;
}

function addCombo(comboId) {
  const combo = combos.find(c => c.id===comboId);
  if (!combo) return;
  const orig = combo.itemIds.reduce((s,id) => { const i=ITEMS.find(x=>x.id===id); return s+(i?i.price:0); }, 0);
  combo.itemIds.forEach(id => { const item=ITEMS.find(x=>x.id===id); if(!item)return; if(cart[item.name])cart[item.name].qty++; else cart[item.name]={price:item.price,qty:1,itemId:id}; });
  if (!cart.__combos) cart.__combos = [];
  cart.__combos.push({ comboId, discount:orig-combo.price, name:combo.name });
  renderCustMenu();
  renderCustCartPanel();
  showNotif(`✅ ${combo.name} added! Saved ₹${orig-combo.price} 🎉`);
  checkFreeItem();
}

// ===================================================
//   MENU RENDER — with real images
// ===================================================
function getItemImage(item) {
  if (item.image) return item.image;
  return DEFAULT_IMAGES[item.name] || null;
}

function renderCustMenu() {
  const grid = document.getElementById("cust-menu-grid");
  const list = activeCustCat==="all" ? ITEMS : ITEMS.filter(i => i.cat===activeCustCat);
  const disc = getTimeDiscount();
  const personalOffer = getPersonalOffer(currentUser?.id);

  grid.innerHTML = list.map(item => {
    const qty   = cart[item.name] ? cart[item.name].qty : 0;
    const pDisc = personalOffer&&personalOffer.itemId===item.id ? personalOffer.value/100 : 0;
    const totDisc = Math.max(disc, pDisc);
    const discPrice = totDisc>0 ? Math.round(item.price*(1-totDisc)) : null;
    const imgSrc = getItemImage(item);

    const imgContent = imgSrc
      ? `<img class="real-img img-loading" src="${imgSrc}" alt="${item.name}" onload="this.classList.remove('img-loading')" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : "";
    const emojiStyle = imgSrc ? "display:none" : "display:flex";

    let badges = "";
    if (item.bestseller) badges += `<span class="badge badge-hot">🔥 Best</span>`;
    if (discPrice)        badges += `<span class="badge badge-discount">-${Math.round(totDisc*100)}%</span>`;
    if (pDisc>0)          badges += `<span class="badge badge-offer">🎁 Personal</span>`;

    const ribbon = item.bestseller
      ? `<div class="bestseller-ribbon">⭐ Best</div>`
      : item.isNew
      ? `<div class="new-ribbon">🆕 New</div>`
      : "";

    return `
      <div class="menu-card${item.bestseller?" bestseller":""}" onclick="addItem('${item.name}',${item.price})">
        <div class="card-img-area ${item.icon}">
          ${imgContent}
          <div class="card-emoji-fallback" style="${emojiStyle}">${item.emoji}</div>
          ${qty>0?`<div class="qty-badge" style="display:flex">${qty}</div>`:""}
          ${ribbon}
        </div>
        ${badges?`<div class="badge-row">${badges}</div>`:""}
        <div class="card-body">
          <span class="card-tag ${item.tag}">${item.tagLabel}</span>
          <div class="card-name">${item.name}</div>
          <div class="card-bottom">
            <div class="price-col">
              <div class="card-price">₹${discPrice||item.price}</div>
              ${discPrice?`<div class="card-orig">₹${item.price}</div>`:""}
            </div>
            <button class="add-fab ${item.add}" onclick="event.stopPropagation();addItem('${item.name}',${item.price})">+</button>
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
  else            cart[name] = { price, qty:1 };

  const cards = document.querySelectorAll(".menu-card");
  cards.forEach(card => {
    if (card.querySelector(".card-name")?.textContent === name) {
      card.classList.add("just-added");
      setTimeout(() => card.classList.remove("just-added"), 400);
    }
  });

  renderCustMenu();
  if (activeCustTab==="cart") renderCustCartPanel();
  if (isNew) triggerUpsell(name);
  checkFreeItem();
  checkBulkDiscount();
}

function removeItem(name) {
  if (!cart[name]) return;
  cart[name].qty--;
  if (cart[name].qty <= 0) delete cart[name];
  renderCustMenu();
  if (activeCustTab==="cart") renderCustCartPanel();
  checkFreeItem();
  checkBulkDiscount();
}

function cartTotal() {
  const disc = getTimeDiscount();
  const pOffer = getPersonalOffer(currentUser?.id);
  let total = 0;
  Object.keys(cart).forEach(k => {
    if (k==="__combos" || k==="__bulk") return;
    const item = ITEMS.find(x => x.name===k);
    const pDisc = pOffer&&item&&pOffer.itemId===item.id ? pOffer.value/100 : 0;
    const totDisc = Math.max(disc, pDisc);
    total += cart[k].price*(1-totDisc)*cart[k].qty;
  });
  if (cart.__combos) cart.__combos.forEach(c => { total -= c.discount; });
  if (cart.__bulk)   total -= cart.__bulk;
  return Math.round(Math.max(total, 0));
}

function getLoyaltyPointsForOrder(total) {
  return Math.floor(total * POINTS_PER_RUPEE);
}

function checkFreeItem() {
  const freeOffer = getFreeItemOffer();
  if (!freeOffer) return;
  const raw = Object.keys(cart).filter(k => k!=="__combos"&&k!=="__bulk"&&!cart[k].free).reduce((s,k) => s+cart[k].price*cart[k].qty, 0);
  const fName = freeOffer.freeItem;
  if (raw >= freeOffer.value && !cart[fName]) {
    const fItem = ITEMS.find(x => x.name===fName);
    const fPrice = fItem ? fItem.price : 0;
    cart[fName] = { price:0, qty:1, free:true, originalPrice:fPrice };
    renderCustMenu();
    if (activeCustTab==="cart") renderCustCartPanel();
    showCelebration();
    showNotif(`🎉 FREE ${fName} added to your cart!`, 4000);
  }
  if (raw < freeOffer.value && cart[fName] && cart[fName].free) {
    delete cart[fName];
    renderCustMenu();
    if (activeCustTab==="cart") renderCustCartPanel();
    showNotif(`Add ₹${freeOffer.value-raw} more for FREE ${fName}`, 2500);
  }
}

function checkBulkDiscount() {
  const bulkOffer = getBulkOffer();
  if (!bulkOffer) { cart.__bulk=0; return; }
  const qty = Object.keys(cart).filter(k => k!=="__combos"&&k!=="__bulk").reduce((s,k) => s+cart[k].qty, 0);
  if (qty >= bulkOffer.value) {
    const raw = Object.keys(cart).filter(k => k!=="__combos"&&k!=="__bulk").reduce((s,k) => s+cart[k].price*cart[k].qty, 0);
    cart.__bulk = Math.round(raw*(bulkOffer.discPct/100));
  } else { cart.__bulk=0; }
}

function showCelebration() {
  const cel = document.getElementById("celebration-overlay");
  cel.classList.add("show");
  setTimeout(() => cel.classList.remove("show"), 2500);
}

// ===================================================
//   UPSELL ENGINE — with countdown timer
// ===================================================
const UPSELL_MAP = {
  "Samosa Chat":      { name:"Ice Cream",      msg:"🍦 Complete your chat with Ice Cream! Only ₹30 more." },
  "Katori Chat":      { name:"Panipuri (6 pcs)",msg:"🫧 Add Panipuri for ₹30 more? Great combo!" },
  "Shegaon Kachori":  { name:"Ice Cream",      msg:"🍦 Top it off with Ice Cream? Just ₹30!" },
  "Gila Wada":        { name:"Masala Chaas",   msg:"🥛 Perfect match — Masala Chaas for ₹25?" },
  "Panipuri (6 pcs)": { name:"Ice Cream",      msg:"🍦 Add Ice Cream for ₹30 — perfect ending!" },
  "Bhel Puri":        { name:"Lemon Sharbat",  msg:"🍋 Refreshing Lemon Sharbat for ₹25?" },
  "Ragda Patties":    { name:"Masala Chaas",   msg:"🥛 Masala Chaas with Ragda — just ₹25!" },
  "Aloo Tikki":       { name:"Masala Chaas",   msg:"🥛 Pair with Masala Chaas! Only ₹25 more." },
  "Sambharwadi":      { name:"Sugarcane Juice", msg:"🥤 Add Sugarcane Juice for ₹30? Perfect combo!" },
};

function triggerUpsell(name) {
  const up = UPSELL_MAP[name];
  if (!up || cart[up.name]) return;
  const uItem = ITEMS.find(x => x.name===up.name);
  if (!uItem) return;
  pendingUpsell = uItem;
  document.getElementById("upsell-icon").textContent  = uItem.emoji;
  document.getElementById("upsell-title").textContent = `Add ${uItem.name}?`;
  document.getElementById("upsell-sub").textContent   = up.msg;
  document.getElementById("upsell-overlay").classList.add("show");
  spawnUpsellConfetti();
  startUpsellTimer();
}

function startUpsellTimer() {
  clearInterval(upsellTimerInterval);
  let secs = 10;
  const fill = document.getElementById("upsell-timer-fill");
  const text = document.getElementById("upsell-timer-text");
  fill.style.width = "100%";
  
  upsellTimerInterval = setInterval(() => {
    secs--;
    fill.style.width = (secs / 10 * 100) + "%";
    if (text) text.textContent = `Offer expires in ${secs}s`;
    if (secs <= 0) {
      clearInterval(upsellTimerInterval);
      closeUpsell();
    }
  }, 1000);
}

function spawnUpsellConfetti() {
  const c = document.getElementById("upsell-confetti");
  c.innerHTML = "";
  const emojis = ["🎉","⭐","🎊","✨"];
  for (let i=0;i<8;i++) {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;font-size:${12+Math.random()*12}px;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:0.5;animation:confetti-fall 1.5s ease forwards;animation-delay:${Math.random()*0.5}s`;
    s.textContent = emojis[i%emojis.length];
    c.appendChild(s);
  }
}

function acceptUpsell() {
  if (!pendingUpsell) return;
  addItem(pendingUpsell.name, pendingUpsell.price);
  closeUpsell();
}

function closeUpsell() {
  clearInterval(upsellTimerInterval);
  document.getElementById("upsell-overlay").classList.remove("show");
  pendingUpsell = null;
}

// ===================================================
//   RENDER CART PANEL
// ===================================================
function renderCustCartPanel() {
  const body   = document.getElementById("cust-panel-body");
  const footer = document.getElementById("cust-cart-footer");
  const keys   = Object.keys(cart).filter(k => k!=="__combos"&&k!=="__bulk");

  const freeOffer = getFreeItemOffer();
  const raw = keys.filter(k => !cart[k].free).reduce((s,k) => s+cart[k].price*cart[k].qty, 0);
  const remaining = freeOffer ? Math.max(freeOffer.value-raw, 0) : 0;
  const pct = freeOffer ? Math.min((raw/freeOffer.value)*100, 100) : 0;

  let freeBarHTML = "";
  if (freeOffer) {
    freeBarHTML = remaining > 0
      ? `<div class="free-bar-wrap">🎁 Add <b>₹${remaining}</b> more for FREE ${freeOffer.freeItem}!<div class="free-bar-bg"><div class="free-bar-fill" style="width:${pct}%"></div></div></div>`
      : `<div class="free-bar-wrap" style="text-align:center">🎉 FREE ${freeOffer.freeItem} unlocked! 🎊</div>`;
  }

  if (keys.length===0) {
    body.innerHTML = freeBarHTML + `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><div style="font-size:13px;font-weight:600">Your cart is empty.<br><span style="color:var(--brand);font-size:12px">Add delicious items!</span></div></div>`;
    footer.innerHTML = "";
    return;
  }

  const itemsHTML = keys.map(k => {
    const isFree = cart[k].free;
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

  let discHTML = "";
  if (cart.__combos) cart.__combos.forEach(c => { discHTML+=`<div class="discount-row"><span>🔥 ${c.name}</span><span>-₹${c.discount}</span></div>`; });
  const timeDis = getTimeDiscount();
  if (timeDis > 0) { const amt=Math.round(raw*timeDis); discHTML+=`<div class="discount-row"><span>⚡ Happy Hours</span><span>-₹${amt}</span></div>`; }
  if (cart.__bulk && cart.__bulk>0) discHTML+=`<div class="discount-row"><span>🛒 Bulk Discount</span><span>-₹${cart.__bulk}</span></div>`;

  const orderTotal = cartTotal();
  const loyaltyEarn = currentUser.id !== "guest" ? getLoyaltyPointsForOrder(orderTotal) : 0;
  const loyaltyHTML = loyaltyEarn > 0
    ? `<div class="loyalty-earn-row">🌟 You'll earn <b>${loyaltyEarn} loyalty points</b> on this order!</div>`
    : "";

  body.innerHTML = freeBarHTML + itemsHTML + loyaltyHTML;
  footer.innerHTML = `
    <div class="total-row"><span class="total-label">Total</span><span class="total-amt">₹${orderTotal}</span></div>
    ${discHTML}
    <button class="order-btn" onclick="placeOrder()">🎟 Place Order &amp; Get Token</button>
    <button class="upi-btn" onclick="payUPI()">👉 Pay via UPI</button>`;
}

function renderCustQueuePanel() {
  const body   = document.getElementById("cust-panel-body");
  const footer = document.getElementById("cust-cart-footer");
  footer.innerHTML = "";
  const myOrders = currentUser.id==="guest" ? queue.slice(-5) : queue.filter(o => o.userId===currentUser.id);
  if (myOrders.length===0) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">📋</div><div style="font-size:13px">No active orders.</div></div>`;
    return;
  }
  body.innerHTML = myOrders.map(o => `
    <div class="order-hist-item">
      <div class="oh-top">
        <span style="font-weight:800;color:var(--brand)">Token #${o.token}</span>
        <span class="status-badge ${o.status==="Ready"?"status-ready":"status-prep"}">${o.status}</span>
      </div>
      <div class="oh-items">${Object.keys(o.items).filter(k=>k!=="__combos"&&k!=="__bulk").map(k=>`${k} ×${o.items[k].qty}`).join(", ")}</div>
      <div style="font-size:13px;font-weight:800;color:var(--green-d);margin-top:4px">₹${o.total}</div>
    </div>`).join("");
}

function switchCustTab(tab) {
  activeCustTab = tab;
  document.getElementById("tab-cart").classList.toggle("active",  tab==="cart");
  document.getElementById("tab-queue").classList.toggle("active", tab==="queue");
  if (tab==="cart") renderCustCartPanel();
  else              renderCustQueuePanel();
}

// ===================================================
//   PLACE ORDER — with loyalty points
// ===================================================
function placeOrder() {
  const total = cartTotal();
  if (total===0) { showNotif("⚠ Cart is empty!"); return; }
  const keys = Object.keys(cart).filter(k => k!=="__combos"&&k!=="__bulk");
  const snap = {}; keys.forEach(k => { snap[k]={...cart[k]}; });

  const order = {
    token: orderToken++,
    items:snap, total,
    status:"Preparing",
    time:Date.now(),
    userId:currentUser.id,
    userName:currentUser.name,
    phone:customers[currentUser.id]?.phone || "",
  };

  queue.push(order);
  orders_all.push(order);
  salesLog.push({ time:Date.now(), total, items:snap, phone:order.phone, userId:currentUser.id });

  // Update customer + loyalty points
  if (currentUser.id !== "guest" && customers[currentUser.id]) {
    const cust = customers[currentUser.id];
    cust.orders.push({ time:Date.now(), items:snap, total });
    cust.totalSpent += total;
    cust.visits     += 1;
    
    // Loyalty points
    const earned = getLoyaltyPointsForOrder(total);
    cust.loyaltyPoints = (cust.loyaltyPoints || 0) + earned;
    
    // Update loyalty chip
    const chip = document.getElementById("loyalty-chip");
    if (chip) chip.textContent = `🌟 ${cust.loyaltyPoints} pts`;
    
    // Check loyalty milestones
    checkLoyaltyMilestone(cust.loyaltyPoints, earned);
    
    // Show review prompt after every 3rd order
    if (cust.visits % 3 === 0) {
      setTimeout(() => showReviewPrompt(), 3000);
    }
  }

  save();
  showNotif(`✅ Order placed! Token #${order.token} 🎉`, 3500);
  cart = {};
  renderCustMenu();
  renderCustCartPanel();
}

function checkLoyaltyMilestone(totalPoints, earned) {
  const milestone = REWARD_TIERS.find(t => totalPoints >= t.points && (totalPoints - earned) < t.points);
  if (milestone) {
    const overlay = document.getElementById("loyalty-overlay");
    document.getElementById("loyalty-icon").textContent = milestone.icon;
    document.getElementById("loyalty-title").textContent = `${milestone.points} points reached!`;
    document.getElementById("loyalty-sub").textContent = `Reward unlocked: ${milestone.reward} 🎉`;
    overlay.classList.add("show");
  }
}

function closeLoyaltyPopup() {
  document.getElementById("loyalty-overlay").classList.remove("show");
}

function payUPI() {
  const total = cartTotal();
  if (total===0) { showNotif("⚠ Cart is empty!"); return; }
  window.open(`upi://pay?pa=yourupi@upi&pn=SVChatCenter&am=${total}&cu=INR`);
}

// ===================================================
//   REVIEW SYSTEM
// ===================================================
function showReviewPrompt() {
  currentRating = 0;
  document.getElementById("review-overlay").classList.add("show");
}

function closeReview() {
  document.getElementById("review-overlay").classList.remove("show");
}

function setRating(n) {
  currentRating = n;
  const stars = document.querySelectorAll(".star");
  stars.forEach((s, i) => {
    s.textContent = i < n ? "⭐" : "☆";
    s.classList.toggle("active", i < n);
  });
}

function submitReview() {
  if (currentRating === 0) return showNotif("⭐ Please select a rating first");
  const text = document.getElementById("review-text")?.value.trim() || "";
  
  // Store review + give discount coupon
  if (currentUser.id !== "guest" && customers[currentUser.id]) {
    if (!customers[currentUser.id].reviews) customers[currentUser.id].reviews = [];
    customers[currentUser.id].reviews.push({ rating:currentRating, text, time:Date.now() });
    // Add review discount offer
    offers.push({
      id:"o_review_"+Date.now(), name:`Review Reward for ${customers[currentUser.id].name}`,
      type:"personal", desc:"₹20 off as review thank you",
      targetUser:currentUser.id, itemId:ITEMS[0].id, value:10, active:true
    });
    save();
  }
  
  closeReview();
  showNotif(`⭐ Thanks for ${currentRating} stars! ₹20 off coupon added to your account 🎁`, 4000);
}

// ===================================================
//   ADMIN — DASHBOARD
// ===================================================
function switchAdminTab(tab) {
  activeAdminTab = tab;
  ["dashboard","menu","offers","customers","orders","analytics","marketing"].forEach(t => {
    const el = document.getElementById(`anav-${t}`);
    if (el) el.classList.toggle("active", t===tab);
  });
  const renders = {
    dashboard:renderAdminDashboard, menu:renderAdminMenu, offers:renderAdminOffers,
    customers:renderAdminCustomers, orders:renderAdminOrders,
    analytics:renderAdminAnalytics, marketing:renderAdminMarketing
  };
  if (renders[tab]) renders[tab]();
}

function setAdminPeriod(p) { adminPeriod=p; renderAdminDashboard(); }

function getPeriodLogs(period) {
  const ms = { today:86400000, week:604800000, month:2592000000 };
  return salesLog.filter(l => l.time >= Date.now()-ms[period]);
}

function renderAdminDashboard() {
  const logs = getPeriodLogs(adminPeriod);
  const totalSales  = logs.reduce((s,l) => s+l.total, 0);
  const totalOrders = logs.length;
  const avgOrder    = totalOrders ? Math.round(totalSales/totalOrders) : 0;
  const totalCusts  = Object.keys(customers).length;
  const repeatCusts = Object.values(customers).filter(c => c.visits>1).length;
  const queueLen    = queue.filter(q => q.status==="Preparing").length;
  const totalLoyaltyPoints = Object.values(customers).reduce((s,c) => s+(c.loyaltyPoints||0), 0);

  const itemCounts={};
  logs.forEach(l => Object.keys(l.items).forEach(k => {
    if(k==="__combos"||k==="__bulk")return;
    itemCounts[k]=(itemCounts[k]||0)+(l.items[k].qty||0);
  }));
  const topItems = Object.entries(itemCounts).sort((a,b) => b[1]-a[1]).slice(0,5);

  const hourly = new Array(24).fill(0);
  logs.forEach(l => { hourly[new Date(l.time).getHours()]+=l.total; });
  const peakHour = hourly.indexOf(Math.max(...hourly));

  let days, getGroup;
  if (adminPeriod==="today")  { days=["12a","4a","8a","12p","4p","8p"]; getGroup=l=>Math.floor(new Date(l.time).getHours()/4); }
  else if (adminPeriod==="week")  { days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; getGroup=l=>new Date(l.time).getDay(); }
  else { days=["W1","W2","W3","W4"]; getGroup=l=>Math.min(3-Math.floor((Date.now()-l.time)/604800000),3); }
  
  const barData=new Array(days.length).fill(0);
  logs.forEach(l => { const g=getGroup(l); if(g>=0&&g<days.length)barData[g]+=l.total; });
  const maxBar=Math.max(...barData,1);

  const periodBtns = ["today","week","month"].map(p =>
    `<button class="period-btn${adminPeriod===p?" active":""}" onclick="setAdminPeriod('${p}')">${p[0].toUpperCase()+p.slice(1)}</button>`
  ).join("");

  const barsHTML = barData.map((v,i) => `
    <div class="bar-col">
      <div class="bar-val">${v>0?"₹"+v:""}</div>
      <div class="bar" style="height:${Math.round((v/maxBar)*86)+4}px;background:${v>0?"var(--admin)":"#dde8f5"}"></div>
      <div class="bar-label">${days[i]}</div>
    </div>`).join("");

  const topHTML = topItems.length>0
    ? topItems.map(([name,qty],i) => {
        const item=ITEMS.find(x=>x.name===name);
        return `<div class="order-row">
          <div style="width:22px;height:22px;border-radius:50%;background:var(--admin);color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center">${i+1}</div>
          <div style="flex:1;font-size:13px;font-weight:600">${item?item.emoji+" ":""} ${name}</div>
          <div style="font-size:12px;color:var(--muted)">${qty} sold</div>
          <div style="font-size:13px;font-weight:800;color:var(--green-d)">₹${qty*(item?item.price:0)}</div>
        </div>`;
      }).join("")
    : `<div class="empty-state">No sales data yet.</div>`;

  const panipuriSales = Object.entries(itemCounts).filter(([k]) => {
    const item=ITEMS.find(x=>x.name===k); return item&&item.cat==="panipuri";
  }).reduce((s,[,v]) => s+v, 0);

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">📊 Sales Dashboard</div>
    <div class="period-tabs">${periodBtns}</div>
    <div class="a-stat-grid">
      <div class="a-stat-card"><div class="a-stat-label">Revenue</div><div class="a-stat-val green">₹${totalSales.toLocaleString("en-IN")}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Orders</div><div class="a-stat-val">${totalOrders}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Avg Order</div><div class="a-stat-val">₹${avgOrder}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Queue Now</div><div class="a-stat-val blue">${queueLen}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Customers</div><div class="a-stat-val">${totalCusts}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Repeat</div><div class="a-stat-val green">${repeatCusts}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🌟 Loyalty Pts</div><div class="a-stat-val orange">${totalLoyaltyPoints}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">🫧 Panipuri Sold</div><div class="a-stat-val orange">${panipuriSales}</div></div>
    </div>
    <div class="a-chart-wrap">
      <div class="a-chart-title">Revenue by ${adminPeriod==="today"?"Hour":"Period"}</div>
      <div class="bar-chart">${barsHTML}</div>
    </div>
    <div class="insight-box">
      <div class="insight-title">🧠 Business Insights</div>
      <div class="insight-row"><div class="insight-dot"></div> Peak hour: <b>${peakHour}:00–${peakHour+1}:00</b> — schedule extra staff</div>
      <div class="insight-row"><div class="insight-dot"></div> Avg order: <b>₹${avgOrder}</b> ${avgOrder<80?"— push combos to increase it 🔼":"— excellent! Keep upselling 🎉"}</div>
      <div class="insight-row"><div class="insight-dot"></div> Repeat rate: <b>${totalCusts>0?Math.round((repeatCusts/totalCusts)*100):0}%</b> — ${repeatCusts<totalCusts*0.3?"send personal offers to win back customers":"great loyalty! 🏆"}</div>
      <div class="insight-row"><div class="insight-dot"></div> 🌟 Loyalty program active — <b>${totalLoyaltyPoints} total points</b> distributed to customers</div>
    </div>
    <div class="a-card"><div class="a-card-title">🏆 Top Selling Items</div>${topHTML}</div>`;
}

// ===================================================
//   ADMIN — MENU
// ===================================================
function renderAdminMenu() {
  const rows = ITEMS.map(item => {
    const imgSrc = getItemImage(item);
    return `
      <div class="menu-mgmt-row">
        <div onclick="openImageModal('${item.id}')" title="Click to upload image" style="cursor:pointer">
          ${imgSrc
            ? `<img class="admin-item-img" src="${imgSrc}" alt="${item.name}" />`
            : `<div class="admin-item-emoji"><span>${item.emoji}</span><div class="upload-hint">📷 Add</div></div>`
          }
        </div>
        <div class="mmr-info">
          <div class="mmr-name">${item.name}</div>
          <div class="mmr-cat">${item.tagLabel} ${item.isNew?'<span style="font-size:9px;background:#e74c3c;color:#fff;padding:1px 6px;border-radius:6px">NEW</span>':""}</div>
        </div>
        <input class="price-input" id="price-${item.id}" value="${item.price}" type="number" min="1" max="9999">
        <button class="save-price-btn" onclick="savePrice('${item.id}')">Save</button>
        <button class="del-btn" onclick="deleteItem('${item.id}')">✕</button>
      </div>`;
  }).join("");

  const catOptions = CAT_OPTIONS.map(c => `<option value="${c}">${LABEL_MAP[c]}</option>`).join("");

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">🍽 Menu Management</div>
    <div class="a-card">
      <div class="a-card-title">Current Menu — Click image area to upload photo or use image URL</div>
      ${rows}
    </div>
    <div class="a-card">
      <div class="a-card-title">➕ Add New Item</div>
      <div class="add-item-form">
        <input class="a-input" id="new-name"  placeholder="Item name">
        <input class="a-input" id="new-price" placeholder="Price (₹)" type="number" min="1">
        <input class="a-input" id="new-emoji" placeholder="Emoji (e.g. 🍛)">
        <select class="a-select" id="new-cat">${catOptions}</select>
        <input class="a-input" id="new-imgurl" placeholder="Image URL (optional — paste Unsplash or own URL)" class="offer-form-full">
        <input class="a-input offer-form-full" id="new-bs" placeholder='Bestseller? type "yes" or leave blank'>
      </div>
      <div style="display:flex;gap:10px;margin-top:12px">
        <button class="a-btn a-btn-green" onclick="addNewItem()">➕ Add Item</button>
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
          <input class="a-input" id="new-combo-price" placeholder="Combo price (₹)" type="number" min="1">
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

function renderComboRows() {
  if (combos.length===0) return `<div class="empty-state">No combos yet.</div>`;
  return combos.map(c => `
    <div class="menu-mgmt-row">
      <div style="font-size:24px;width:40px;text-align:center">${c.emoji}</div>
      <div class="mmr-info">
        <div class="mmr-name">${c.name} ${c.label?`<span style="font-size:9px;background:${c.label==="popular"?"#e74c3c":"var(--green)"};color:#fff;padding:1px 6px;border-radius:6px">${c.label==="popular"?"🔥 Popular":"💸 Value"}</span>`:""}</div>
        <div class="mmr-cat">${c.itemIds.map(id=>{const it=ITEMS.find(x=>x.id===id);return it?it.name:"";}).join(" + ")}</div>
      </div>
      <input class="price-input" id="combo-price-${c.id}" value="${c.price}" type="number" min="1">
      <button class="save-price-btn" onclick="saveComboPrice('${c.id}')">Save</button>
      <button class="toggle-btn ${c.active?"toggle-on":"toggle-off"}" onclick="toggleCombo('${c.id}')">${c.active?"ON":"OFF"}</button>
      <button class="del-btn" onclick="deleteCombo('${c.id}')">✕</button>
    </div>`).join("");
}

function savePrice(id) {
  const val = parseInt(document.getElementById(`price-${id}`)?.value);
  if (!val||val<1) return showNotif("⚠ Invalid price");
  const item = ITEMS.find(x => x.id===id);
  if (item) { item.price=val; save(); showNotif(`✅ ${item.name} → ₹${val}`); }
}

function deleteItem(id) {
  ITEMS = ITEMS.filter(x => x.id!==id);
  save(); renderAdminMenu(); showNotif("Item deleted");
}

function addNewItem() {
  const name   = document.getElementById("new-name").value.trim();
  const price  = parseInt(document.getElementById("new-price").value);
  const emoji  = document.getElementById("new-emoji").value.trim() || "🍽";
  const cat    = document.getElementById("new-cat").value;
  const imgUrl = document.getElementById("new-imgurl")?.value.trim() || null;
  const bs     = document.getElementById("new-bs").value.toLowerCase().includes("yes");
  if (!name)        return showNotif("⚠ Enter item name");
  if (!price||price<1) return showNotif("⚠ Enter valid price");
  const id = "i"+Date.now();
  ITEMS.push({ id, name, price, cat, emoji, icon:ICON_MAP[cat], tag:TAG_MAP[cat], add:ADD_MAP[cat], tagLabel:LABEL_MAP[cat], bestseller:bs, isNew:true, image:imgUrl });
  save(); renderAdminMenu(); showNotif(`✅ ${name} added!`);
}

function saveComboPrice(id) {
  const val = parseInt(document.getElementById(`combo-price-${id}`)?.value);
  const c = combos.find(x => x.id===id);
  if (c && val>0) { c.price=val; save(); showNotif("Combo price updated!"); }
}

function toggleCombo(id) {
  const c = combos.find(x => x.id===id);
  if (c) { c.active=!c.active; save(); renderAdminMenu(); showNotif(`Combo ${c.active?"ON":"OFF"}`); }
}

function deleteCombo(id) {
  combos=combos.filter(x => x.id!==id);
  save(); renderAdminMenu(); showNotif("Combo deleted");
}

function addNewCombo() {
  const name   = document.getElementById("new-combo-name").value.trim();
  const emoji  = document.getElementById("new-combo-emoji").value.trim() || "🔥";
  const price  = parseInt(document.getElementById("new-combo-price").value);
  const label  = document.getElementById("new-combo-label")?.value || "";
  const idsRaw = document.getElementById("new-combo-items").value.trim();
  if (!name) return showNotif("⚠ Enter combo name");
  if (!price||price<1) return showNotif("⚠ Enter price");
  const itemIds = idsRaw.split(",").map(s => s.trim()).filter(Boolean);
  if (itemIds.length<2) return showNotif("⚠ Add at least 2 item IDs");
  combos.push({ id:"cb"+Date.now(), name, emoji, itemIds, price, active:true, label });
  save(); renderAdminMenu(); showNotif(`✅ Combo "${name}" added!`);
}

// ===================================================
//   ADMIN — IMAGE UPLOAD
// ===================================================
function openImageModal(itemId) {
  pendingImageItemId = itemId;
  const item = ITEMS.find(x => x.id===itemId);
  document.getElementById("modal-item-name").textContent = item ? `📷 ${item.name}` : "";
  document.getElementById("image-preview").style.display = "none";
  document.getElementById("image-file-input").value = "";
  document.getElementById("image-url-input").value = item?.image && !DEFAULT_IMAGES[item?.name] ? item.image : "";
  document.getElementById("image-modal").classList.add("show");
}

function closeImageModal() {
  document.getElementById("image-modal").classList.remove("show");
  pendingImageItemId = null;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2*1024*1024) { showNotif("⚠ Image too large! Max 2MB"); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById("image-preview");
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function loadImageFromURL() {
  const url = document.getElementById("image-url-input").value.trim();
  if (!url.startsWith("http")) return showNotif("⚠ Enter valid https:// URL");
  const preview = document.getElementById("image-preview");
  preview.src = url;
  preview.style.display = "block";
  preview.onerror = () => showNotif("⚠ Could not load image from URL");
}

function saveItemImage() {
  const preview = document.getElementById("image-preview");
  if (!preview.src || preview.style.display==="none") { showNotif("⚠ Select an image first"); return; }
  const item = ITEMS.find(x => x.id===pendingImageItemId);
  if (item) {
    item.image = preview.src;
    save();
    closeImageModal();
    renderAdminMenu();
    showNotif(`✅ Image saved for ${item.name}!`);
  }
}

// ===================================================
//   ADMIN — OFFERS
// ===================================================
function renderAdminOffers() {
  const rows = offers.map(o => `
    <div class="offer-row">
      <div style="flex:1">
        <div class="offer-name">${o.name}</div>
        <div style="font-size:11px;color:var(--muted)">${o.desc}</div>
      </div>
      <span class="offer-type ot-${o.type}">${o.type}</span>
      <span class="offer-val">${o.type==="time"?o.value+"%":o.type==="free"?"₹"+o.value+" min":o.type==="bulk"?o.discPct+"%":o.type==="personal"?o.value+"%":"—"}</span>
      <span class="offer-status ${o.active?"os-active":"os-inactive"}">${o.active?"Active":"Off"}</span>
      <button class="toggle-btn ${o.active?"toggle-on":"toggle-off"}" onclick="toggleOffer('${o.id}')">${o.active?"Disable":"Enable"}</button>
      <button class="del-offer-btn" onclick="deleteOffer('${o.id}')">✕</button>
    </div>`).join("");

  const itemOptions = ITEMS.map(i => `<option value="${i.id}">${i.name}</option>`).join("");
  const custOptions = Object.values(customers).map(c => `<option value="${c.id}">${c.name} (${c.phone})</option>`).join("");

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">🎁 Offers Management</div>
    <div class="a-card">
      <div class="a-card-title">Current Offers</div>
      ${rows || `<div class="empty-state">No offers yet.</div>`}
    </div>
    <div class="a-card">
      <div class="a-card-title">➕ Create New Offer</div>
      <div class="offer-form">
        <input class="a-input" id="of-name" placeholder="Offer name">
        <select class="a-select" id="of-type" onchange="renderOfferTypeFields()">
          <option value="time">⏰ Time-Based Discount</option>
          <option value="free">🎁 Free Item on Min Order</option>
          <option value="bulk">🛒 Bulk Discount</option>
          <option value="personal">🎯 Personal Offer</option>
        </select>
        <input class="a-input offer-form-full" id="of-desc" placeholder="Description shown to customers">
        <div class="offer-form-full" id="of-type-fields"></div>
      </div>
      <button class="a-btn" style="margin-top:12px" onclick="createOffer()">➕ Create Offer</button>
    </div>`;
  renderOfferTypeFields();
}

function renderOfferTypeFields() {
  const type = document.getElementById("of-type")?.value;
  const f    = document.getElementById("of-type-fields");
  if (!f) return;
  const itemOptions = ITEMS.map(i => `<option value="${i.id}">${i.name}</option>`).join("");
  const custOptions = Object.values(customers).map(c => `<option value="${c.id}">${c.name} (${c.phone})</option>`).join("");
  if (type==="time") {
    f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-disc" placeholder="Discount %" type="number" min="1" max="100"><input class="a-input" id="of-start" placeholder="Start hour (0-23)" type="number" min="0" max="23"><input class="a-input" id="of-end" placeholder="End hour (0-23)" type="number" min="0" max="23"></div>`;
  } else if (type==="free") {
    f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-minorder" placeholder="Min order ₹" type="number" min="1"><select class="a-select" id="of-freeitem">${itemOptions}</select></div>`;
  } else if (type==="bulk") {
    f.innerHTML=`<div class="offer-form"><input class="a-input" id="of-bulkqty" placeholder="Min items (e.g. 3)" type="number" min="2"><input class="a-input" id="of-bulkdisc" placeholder="Discount %" type="number" min="1" max="100"></div>`;
  } else if (type==="personal") {
    f.innerHTML=`<div class="offer-form"><select class="a-select" id="of-custid">${custOptions||"<option>No customers yet</option>"}</select><select class="a-select" id="of-itemid">${itemOptions}</select><input class="a-input" id="of-perdisc" placeholder="Discount %" type="number" min="1" max="100"></div>`;
  }
}

function createOffer() {
  const name = document.getElementById("of-name").value.trim();
  const type = document.getElementById("of-type").value;
  const desc = document.getElementById("of-desc").value.trim();
  if (!name) return showNotif("⚠ Enter offer name");
  if (!desc) return showNotif("⚠ Enter description");
  let offer = { id:"o"+Date.now(), name, type, desc, active:true };
  if (type==="time") {
    offer.value=parseInt(document.getElementById("of-disc")?.value)||10;
    offer.startHour=parseInt(document.getElementById("of-start")?.value)||16;
    offer.endHour=parseInt(document.getElementById("of-end")?.value)||19;
  } else if (type==="free") {
    offer.value=parseInt(document.getElementById("of-minorder")?.value)||100;
    const itemId=document.getElementById("of-freeitem")?.value;
    const item=ITEMS.find(x=>x.id===itemId);
    offer.freeItem=item?item.name:"Ice Cream";
  } else if (type==="bulk") {
    offer.value=parseInt(document.getElementById("of-bulkqty")?.value)||3;
    offer.discPct=parseInt(document.getElementById("of-bulkdisc")?.value)||33;
  } else if (type==="personal") {
    offer.targetUser=document.getElementById("of-custid")?.value;
    offer.itemId=document.getElementById("of-itemid")?.value;
    offer.value=parseInt(document.getElementById("of-perdisc")?.value)||15;
  }
  offers.push(offer);
  save(); renderAdminOffers(); showNotif(`✅ Offer "${name}" created!`);
}

function toggleOffer(id) { const o=offers.find(x=>x.id===id); if(o){o.active=!o.active;save();renderAdminOffers();showNotif(`Offer ${o.active?"enabled":"disabled"}`);} }
function deleteOffer(id) { offers=offers.filter(x=>x.id!==id); save();renderAdminOffers();showNotif("Offer deleted"); }

// ===================================================
//   ADMIN — CUSTOMERS
// ===================================================
function renderAdminCustomers() {
  const custs = Object.values(customers);
  const rows = custs.length===0
    ? `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">No customers yet.</td></tr>`
    : custs.sort((a,b) => b.totalSpent-a.totalSpent).map(c => `
        <tr>
          <td><b>${c.name}</b>${c.visits>1?`<span class="repeat-chip">Repeat</span>`:""}${c.totalSpent>=500?`<span class="vip-chip">👑 VIP</span>`:""}</td>
          <td>${c.phone}</td>
          <td>${c.visits}</td>
          <td>🌟 ${c.loyaltyPoints||0}</td>
          <td style="font-weight:800;color:var(--green-d)">₹${c.totalSpent}</td>
          <td><button class="a-btn" style="padding:5px 10px;font-size:11px" onclick="createPersonalOfferForCustomer('${c.id}')">🎯 Offer</button></td>
        </tr>`).join("");

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">👥 Customers (${custs.length})</div>
    <div class="insight-box" style="margin-bottom:14px">
      <div class="insight-title">💡 Customer Strategy</div>
      <div class="insight-row"><div class="insight-dot"></div> VIP customers (₹500+ spent) — send exclusive personal offers to retain them</div>
      <div class="insight-row"><div class="insight-dot"></div> Customers with loyalty points are 3x more likely to return</div>
      <div class="insight-row"><div class="insight-dot"></div> Review ratings generate ₹20 coupons — check Offers tab for them</div>
    </div>
    <div class="a-card" style="overflow-x:auto">
      <table class="cust-table">
        <thead><tr><th>Name</th><th>Phone</th><th>Visits</th><th>Points</th><th>Spent</th><th>Action</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function createPersonalOfferForCustomer(custId) {
  const cust = customers[custId];
  if (!cust) return;
  const item = ITEMS[0];
  const offer = {
    id:"o"+Date.now(), name:`Special for ${cust.name}`,
    type:"personal", desc:`Exclusive 15% off for ${cust.name}`,
    targetUser:custId, itemId:item.id, value:15, active:true
  };
  offers.push(offer);
  save(); switchAdminTab("offers"); showNotif(`✅ Personal offer created for ${cust.name}!`);
}

// ===================================================
//   ADMIN — ORDERS
// ===================================================
function renderAdminOrders() {
  const rows = queue.length===0
    ? `<div class="empty-state">No active orders.</div>`
    : queue.map((o,i) => `
        <div class="order-row">
          <span class="order-token">Token #${o.token}</span>
          <span class="status-badge ${o.status==="Ready"?"status-ready":"status-prep"}">${o.status}</span>
          <div class="order-items">${Object.keys(o.items).filter(k=>k!=="__combos"&&k!=="__bulk").map(k=>`${k} ×${o.items[k].qty}`).join(", ")}</div>
          <div style="text-align:right">
            <div class="order-total">₹${o.total}</div>
            ${o.phone?`<div class="order-phone">${o.phone}</div>`:""}
          </div>
          ${o.status!=="Ready"?`<button class="ready-btn" onclick="adminMarkReady(${i})">✓ Ready</button>`:""}
          <button class="del-btn" onclick="adminRemoveOrder(${i})">✕</button>
        </div>`).join("");

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">📋 Live Orders (${queue.length})</div>
    <div class="a-card">${rows}</div>`;
}

function adminMarkReady(i) { queue[i].status="Ready"; save(); renderAdminOrders(); showNotif(`🔔 Token #${queue[i].token} is Ready!`); }
function adminRemoveOrder(i) { queue.splice(i,1); save(); renderAdminOrders(); }

// ===================================================
//   ADMIN — ANALYTICS
// ===================================================
function renderAdminAnalytics() {
  const logs = salesLog;
  const catSales = {};
  CAT_OPTIONS.forEach(c => catSales[c]=0);
  logs.forEach(l => {
    Object.keys(l.items).forEach(k => {
      if(k==="__combos"||k==="__bulk")return;
      const item=ITEMS.find(x=>x.name===k);
      if(item) catSales[item.cat]=(catSales[item.cat]||0)+(l.items[k].qty||0);
    });
  });
  const maxCatSale = Math.max(...Object.values(catSales), 1);

  const catBars = Object.entries(catSales).map(([cat,qty]) => {
    const pct = Math.round((qty/maxCatSale)*100);
    const color = BAR_COLORS[cat] || "var(--brand)";
    return `<div class="item-analytics-row">
      <div class="item-analytics-name">${LABEL_MAP[cat]}</div>
      <div class="item-analytics-bar-wrap"><div class="item-analytics-bar" style="width:${pct}%;background:${color}"></div></div>
      <div class="item-analytics-val">${qty}</div>
    </div>`;
  }).join("");

  const hourlyRev = new Array(24).fill(0);
  logs.forEach(l => { hourlyRev[new Date(l.time).getHours()]+=l.total; });
  const peakHour = hourlyRev.indexOf(Math.max(...hourlyRev));
  const maxH = Math.max(...hourlyRev, 1);
  const hourBars = hourlyRev.map((v,i) => {
    const h = i===0?"12a":i<12?`${i}a`:i===12?"12p":`${i-12}p`;
    const ht = Math.round((v/maxH)*60)+2;
    return `<div class="bar-col"><div class="bar-val" style="font-size:8px">${v>0?"₹"+v:""}</div><div class="bar" style="height:${ht}px;background:${v===Math.max(...hourlyRev)?"var(--panipuri)":"var(--admin)"}"></div><div class="bar-label">${h}</div></div>`;
  }).join("");

  const totalUpsellOrders = logs.filter(l => Object.keys(l.items).some(k => k==="Ice Cream"||k==="Masala Chaas")).length;
  const loyaltyEngaged = Object.values(customers).filter(c => (c.loyaltyPoints||0) > 0).length;

  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">📈 Detailed Analytics</div>
    <div class="a-stat-grid">
      <div class="a-stat-card"><div class="a-stat-label">Total Revenue (All)</div><div class="a-stat-val green">₹${logs.reduce((s,l)=>s+l.total,0).toLocaleString("en-IN")}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Total Orders</div><div class="a-stat-val">${logs.length}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Peak Hour</div><div class="a-stat-val blue">${peakHour}:00</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Upsell Orders</div><div class="a-stat-val orange">${totalUpsellOrders}</div></div>
      <div class="a-stat-card"><div class="a-stat-label">Loyalty Engaged</div><div class="a-stat-val green">${loyaltyEngaged}</div></div>
    </div>
    <div class="a-chart-wrap">
      <div class="a-chart-title">Revenue by Hour (All Time)</div>
      <div class="bar-chart" style="height:80px">${hourBars}</div>
    </div>
    <div class="a-card"><div class="a-card-title">📊 Sales by Category</div>${catBars}</div>`;
}

// ===================================================
//   ADMIN — MARKETING (New Sales Tips Tab)
// ===================================================
function renderAdminMarketing() {
  document.getElementById("admin-content").innerHTML = `
    <div class="a-section-title">📣 Marketing & Growth</div>

    <div class="marketing-card">
      <div class="marketing-card-title">🌟 Loyalty Program Tips <span class="roi-badge">+35% Repeat Orders</span></div>
      <div class="marketing-card-desc">Your loyalty program is live! Customers earn 1 point per ₹1 spent. Here's how to make it even stronger:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">💡</div><b>Double Points Days:</b> Every Saturday offer 2x loyalty points. Post on your shop board. Creates weekly rush.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🎯</div><b>Point Milestones:</b> "You're 50 points away from free Ice Cream!" — visible in cart. Urgency = more spending.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📱</div><b>WhatsApp Blasts:</b> Share this app URL on your WhatsApp status: "Order from your phone & earn loyalty points!"</div>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">⏰ Happy Hour Strategy <span class="roi-badge">+20% Revenue</span></div>
      <div class="marketing-card-desc">Your happy hours (4PM–7PM) show as a live countdown to customers. Amplify the impact:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📢</div><b>Morning Announcement:</b> Put a board outside: "HAPPY HOURS: 4–7PM | 10% OFF ALL ITEMS"</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🕐</div><b>Extended Weekend:</b> Try 3PM–8PM on Saturdays/Sundays to catch evening crowds.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🔔</div><b>Coming Soon Bar:</b> App shows "Happy Hours starts in 2h" — customers plan their visit!</div>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">⭐ Review Power <span class="roi-badge">+Google Ranking</span></div>
      <div class="marketing-card-desc">Every 3rd order triggers a review popup. Customers get ₹20 off for reviewing. Do this too:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📲</div><b>Google Reviews:</b> Put QR code for your Google My Business at the counter. "Review us = free tea!"</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🌟</div><b>Zomato/Swiggy:</b> Register on Zomato. Your combo offers here → list them there. +40% reach instantly.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📸</div><b>Instagram Reels:</b> Film one 30-second reel of Panipuri being served. Post weekly. Free viral reach.</div>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">🎯 Combo Optimization <span class="roi-badge">+₹15 Avg Order</span></div>
      <div class="marketing-card-desc">Your combos show "Most Popular" and "Best Value" labels. Use these to guide customers:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🔥</div><b>Mark ONE as Most Popular:</b> People trust social proof. Even if all sell equally, marking one as popular increases its sales by 40%.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">💸</div><b>Create a ₹150 Family Combo:</b> 3 Chat + 2 Panipuri + 2 Ice Cream = huge saving. Large groups order this.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📅</div><b>Weekend Special Combo:</b> Saturday-only offer at discounted price. Creates urgency + weekend rush.</div>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">📱 Digital Marketing (FREE) <span class="roi-badge">Zero Cost</span></div>
      <div class="marketing-card-desc">No budget needed — these are free ways to reach 10x more customers:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">📍</div><b>Google My Business:</b> Register free at business.google.com — appear in "Chat near me" searches. #1 most impactful action.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">💬</div><b>WhatsApp Business:</b> Set up free WhatsApp Business. Send daily menu to regulars. Create broadcast list of top 50 customers.</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🖼</div><b>QR Code at Shop:</b> Print QR code for this app URL. Paste at counter. "Order from here & save time!"</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">🤝</div><b>Local Tie-ups:</b> Partner with nearby offices/colleges — bulk order = 10% off. Guaranteed daily revenue.</div>
    </div>

    <div class="marketing-card">
      <div class="marketing-card-title">🚀 Firebase → Go Live Checklist</div>
      <div class="marketing-card-desc">When you're ready to make this app real — here's exactly what to do:</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">1️⃣</div><b>Create Firebase project</b> at console.firebase.google.com → Enable Firestore + Auth + Hosting</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">2️⃣</div><b>Replace localStorage</b> calls with Firestore: <code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;font-size:11px">db.collection("customers").doc(id).set(data)</code></div>
      <div class="marketing-tip"><div class="marketing-tip-icon">3️⃣</div><b>Enable Email Auth</b> in Firebase → use <code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;font-size:11px">sendPasswordResetEmail(auth, email)</code> for forget password (replaces current OTP demo)</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">4️⃣</div><b>Deploy:</b> <code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;font-size:11px">firebase init hosting → firebase deploy</code> → you get a free sv-chat.web.app URL</div>
      <div class="marketing-tip"><div class="marketing-tip-icon">5️⃣</div><b>Share the URL</b> on your shop board + WhatsApp status → customers order from their phones!</div>
    </div>`;
}

// ===================================================
//   INIT
// ===================================================
load();
createParticles();
showScreen("screen-landing");
setInterval(renderOfferBanner, 60000);

// Inject CSS for confetti animation
const style = document.createElement("style");
style.textContent = `@keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0);opacity:0.7}100%{transform:translateY(120px) rotate(360deg);opacity:0}}`;
document.head.appendChild(style);