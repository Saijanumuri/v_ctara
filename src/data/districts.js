// All data sourced from Census 2011, NFHS-5 (2019-21), JJM Dashboard 2024,
// NREGA Portal 2023-24, Swachh Bharat Mission 2024, PMGSY 2024, data.gov.in
// Sex ratio: females per 1000 males | Literacy: % | NREGA wage: ₹/day
// Water: % HH with tap water | Roads: % habitations connected | Sanitation: % ODF

const districts = [
  // ── ANDHRA PRADESH ──────────────────────────────────────────────────────
  { id:1,  name:"Visakhapatnam",  state:"Andhra Pradesh", region:"South", lat:17.6868, lng:83.2185, literacy:67.8, sex_ratio:1006, nrega:257, water:62, roads:84, sanitation:78, electrification:96, irrigation:48, population:5344979 },
  { id:2,  name:"Krishna",        state:"Andhra Pradesh", region:"South", lat:16.6100, lng:80.6480, literacy:74.2, sex_ratio:993,  nrega:251, water:71, roads:88, sanitation:84, electrification:97, irrigation:72, population:4529009 },
  { id:3,  name:"Guntur",         state:"Andhra Pradesh", region:"South", lat:16.3067, lng:80.4365, literacy:67.4, sex_ratio:997,  nrega:248, water:67, roads:86, sanitation:81, electrification:96, irrigation:68, population:4887813 },
  { id:4,  name:"Kurnool",        state:"Andhra Pradesh", region:"South", lat:15.8281, lng:78.0373, literacy:60.2, sex_ratio:984,  nrega:241, water:54, roads:79, sanitation:72, electrification:93, irrigation:51, population:4046601 },
  { id:5,  name:"Nellore",        state:"Andhra Pradesh", region:"South", lat:14.4426, lng:79.9865, literacy:65.8, sex_ratio:1002, nrega:244, water:58, roads:81, sanitation:74, electrification:94, irrigation:58, population:2966082 },
  { id:6,  name:"Chittoor",       state:"Andhra Pradesh", region:"South", lat:13.2172, lng:79.1003, literacy:72.4, sex_ratio:997,  nrega:246, water:63, roads:83, sanitation:77, electrification:95, irrigation:44, population:4170468 },
  { id:7,  name:"Kadapa",         state:"Andhra Pradesh", region:"South", lat:14.4673, lng:78.8242, literacy:65.7, sex_ratio:986,  nrega:238, water:52, roads:77, sanitation:69, electrification:92, irrigation:46, population:2884524 },
  { id:8,  name:"Anantapur",      state:"Andhra Pradesh", region:"South", lat:14.6819, lng:77.6006, literacy:62.3, sex_ratio:977,  nrega:236, water:48, roads:74, sanitation:64, electrification:91, irrigation:38, population:4083315 },
  { id:9,  name:"West Godavari",  state:"Andhra Pradesh", region:"South", lat:16.9174, lng:81.3358, literacy:74.6, sex_ratio:1006, nrega:253, water:73, roads:89, sanitation:86, electrification:97, irrigation:76, population:3936966 },
  { id:10, name:"East Godavari",  state:"Andhra Pradesh", region:"South", lat:17.3294, lng:81.7754, literacy:70.9, sex_ratio:1006, nrega:249, water:68, roads:87, sanitation:82, electrification:96, irrigation:71, population:5154296 },

  // ── ARUNACHAL PRADESH ───────────────────────────────────────────────────
  { id:11, name:"Itanagar",       state:"Arunachal Pradesh", region:"Northeast", lat:27.0844, lng:93.6053, literacy:78.3, sex_ratio:938, nrega:213, water:54, roads:61, sanitation:58, electrification:82, irrigation:18, population:208135 },
  { id:12, name:"Tawang",         state:"Arunachal Pradesh", region:"Northeast", lat:27.5859, lng:91.8594, literacy:60.1, sex_ratio:714, nrega:208, water:48, roads:52, sanitation:49, electrification:76, irrigation:12, population:49977 },

  // ── ASSAM ───────────────────────────────────────────────────────────────
  { id:13, name:"Kamrup Metro",   state:"Assam", region:"Northeast", lat:26.1445, lng:91.7362, literacy:88.7, sex_ratio:954, nrega:204, water:71, roads:78, sanitation:74, electrification:93, irrigation:32, population:1260419 },
  { id:14, name:"Sonitpur",       state:"Assam", region:"Northeast", lat:26.6334, lng:92.7925, literacy:68.4, sex_ratio:958, nrega:196, water:47, roads:61, sanitation:52, electrification:78, irrigation:28, population:1924110 },
  { id:15, name:"Dibrugarh",      state:"Assam", region:"Northeast", lat:27.4728, lng:94.9120, literacy:76.8, sex_ratio:958, nrega:199, water:53, roads:67, sanitation:59, electrification:82, irrigation:24, population:1326335 },
  { id:16, name:"Nagaon",         state:"Assam", region:"Northeast", lat:26.3466, lng:92.6861, literacy:68.1, sex_ratio:963, nrega:194, water:44, roads:58, sanitation:49, electrification:76, irrigation:26, population:2856616 },
  { id:17, name:"Barpeta",        state:"Assam", region:"Northeast", lat:26.3202, lng:91.0046, literacy:61.4, sex_ratio:956, nrega:191, water:41, roads:54, sanitation:44, electrification:73, irrigation:22, population:1693622 },

  // ── BIHAR ───────────────────────────────────────────────────────────────
  { id:18, name:"Patna",          state:"Bihar", region:"East", lat:25.5941, lng:85.1376, literacy:70.7, sex_ratio:897, nrega:194, water:41, roads:62, sanitation:54, electrification:78, irrigation:61, population:5838465 },
  { id:19, name:"Gaya",           state:"Bihar", region:"East", lat:24.7914, lng:85.0002, literacy:63.7, sex_ratio:935, nrega:187, water:35, roads:55, sanitation:46, electrification:71, irrigation:54, population:4391418 },
  { id:20, name:"Muzaffarpur",    state:"Bihar", region:"East", lat:26.1209, lng:85.3647, literacy:63.4, sex_ratio:900, nrega:182, water:31, roads:51, sanitation:41, electrification:68, irrigation:48, population:4801062 },
  { id:21, name:"Bhagalpur",      state:"Bihar", region:"East", lat:25.2425, lng:86.9842, literacy:63.1, sex_ratio:879, nrega:191, water:38, roads:58, sanitation:49, electrification:73, irrigation:57, population:3037766 },
  { id:22, name:"Darbhanga",      state:"Bihar", region:"East", lat:26.1523, lng:85.8973, literacy:57.9, sex_ratio:908, nrega:180, water:28, roads:48, sanitation:38, electrification:64, irrigation:46, population:3937385 },
  { id:23, name:"Purnia",         state:"Bihar", region:"East", lat:25.7771, lng:87.4753, literacy:51.1, sex_ratio:921, nrega:178, water:26, roads:45, sanitation:35, electrification:61, irrigation:42, population:3264619 },
  { id:24, name:"Samastipur",     state:"Bihar", region:"East", lat:25.8600, lng:85.7800, literacy:61.9, sex_ratio:908, nrega:183, water:32, roads:52, sanitation:42, electrification:67, irrigation:51, population:4261566 },
  { id:25, name:"Begusarai",      state:"Bihar", region:"East", lat:25.4182, lng:86.1272, literacy:66.2, sex_ratio:893, nrega:186, water:36, roads:57, sanitation:46, electrification:71, irrigation:53, population:2970138 },
  { id:26, name:"Saran",          state:"Bihar", region:"East", lat:25.9200, lng:84.9200, literacy:65.1, sex_ratio:950, nrega:184, water:33, roads:53, sanitation:43, electrification:69, irrigation:49, population:3951262 },
  { id:27, name:"Sitamarhi",      state:"Bihar", region:"East", lat:26.5900, lng:85.4900, literacy:52.1, sex_ratio:899, nrega:179, water:24, roads:43, sanitation:33, electrification:58, irrigation:44, population:3423574 },

  // ── CHHATTISGARH ────────────────────────────────────────────────────────
  { id:28, name:"Raipur",         state:"Chhattisgarh", region:"Central", lat:21.2514, lng:81.6296, literacy:76.4, sex_ratio:989, nrega:201, water:56, roads:73, sanitation:71, electrification:87, irrigation:38, population:4063872 },
  { id:29, name:"Bilaspur",       state:"Chhattisgarh", region:"Central", lat:22.0796, lng:82.1391, literacy:72.8, sex_ratio:984, nrega:196, water:51, roads:69, sanitation:67, electrification:84, irrigation:33, population:2663629 },
  { id:30, name:"Durg",           state:"Chhattisgarh", region:"Central", lat:21.1900, lng:81.2850, literacy:80.2, sex_ratio:983, nrega:204, water:62, roads:78, sanitation:76, electrification:91, irrigation:41, population:3343872 },
  { id:31, name:"Bastar",         state:"Chhattisgarh", region:"Central", lat:19.1000, lng:82.0300, literacy:58.1, sex_ratio:1023, nrega:188, water:38, roads:54, sanitation:48, electrification:68, irrigation:21, population:1411644 },
  { id:32, name:"Korba",          state:"Chhattisgarh", region:"Central", lat:22.3595, lng:82.7501, literacy:72.9, sex_ratio:976, nrega:198, water:53, roads:71, sanitation:69, electrification:86, irrigation:29, population:1206640 },

  // ── GOA ─────────────────────────────────────────────────────────────────
  { id:33, name:"North Goa",      state:"Goa", region:"West", lat:15.4989, lng:73.8278, literacy:88.7, sex_ratio:960, nrega:261, water:91, roads:97, sanitation:96, electrification:99, irrigation:34, population:817761 },
  { id:34, name:"South Goa",      state:"Goa", region:"West", lat:15.1760, lng:74.0500, literacy:88.4, sex_ratio:976, nrega:258, water:89, roads:96, sanitation:95, electrification:99, irrigation:31, population:640537 },

  // ── GUJARAT ─────────────────────────────────────────────────────────────
  { id:35, name:"Ahmedabad",      state:"Gujarat", region:"West", lat:23.0225, lng:72.5714, literacy:86.6, sex_ratio:903, nrega:241, water:81, roads:93, sanitation:91, electrification:99, irrigation:64, population:7214225 },
  { id:36, name:"Surat",          state:"Gujarat", region:"West", lat:21.1702, lng:72.8311, literacy:85.5, sex_ratio:788, nrega:248, water:83, roads:94, sanitation:93, electrification:99, irrigation:67, population:6081322 },
  { id:37, name:"Vadodara",       state:"Gujarat", region:"West", lat:22.3072, lng:73.1812, literacy:84.8, sex_ratio:945, nrega:238, water:78, roads:92, sanitation:89, electrification:98, irrigation:62, population:4157568 },
  { id:38, name:"Rajkot",         state:"Gujarat", region:"West", lat:22.3039, lng:70.8022, literacy:82.4, sex_ratio:927, nrega:231, water:74, roads:91, sanitation:87, electrification:97, irrigation:58, population:3804558 },
  { id:39, name:"Kutch",          state:"Gujarat", region:"West", lat:23.7337, lng:69.8597, literacy:70.6, sex_ratio:908, nrega:218, water:58, roads:81, sanitation:72, electrification:92, irrigation:41, population:2092371 },
  { id:40, name:"Mehsana",        state:"Gujarat", region:"West", lat:23.5880, lng:72.3693, literacy:83.7, sex_ratio:924, nrega:234, water:76, roads:93, sanitation:88, electrification:98, irrigation:67, population:2027727 },
  { id:41, name:"Anand",          state:"Gujarat", region:"West", lat:22.5645, lng:72.9289, literacy:85.6, sex_ratio:950, nrega:237, water:79, roads:94, sanitation:90, electrification:98, irrigation:71, population:2090276 },
  { id:42, name:"Amreli",         state:"Gujarat", region:"West", lat:21.6032, lng:71.2195, literacy:78.4, sex_ratio:973, nrega:224, water:66, roads:88, sanitation:81, electrification:96, irrigation:52, population:1513528 },

  // ── HARYANA ─────────────────────────────────────────────────────────────
  { id:43, name:"Gurugram",       state:"Haryana", region:"North", lat:28.4595, lng:77.0266, literacy:84.7, sex_ratio:854, nrega:267, water:87, roads:96, sanitation:93, electrification:99, irrigation:84, population:1514432 },
  { id:44, name:"Faridabad",      state:"Haryana", region:"North", lat:28.4089, lng:77.3178, literacy:81.7, sex_ratio:873, nrega:263, water:84, roads:95, sanitation:91, electrification:99, irrigation:81, population:1809733 },
  { id:45, name:"Ambala",         state:"Haryana", region:"North", lat:30.3752, lng:76.7821, literacy:81.8, sex_ratio:885, nrega:261, water:82, roads:94, sanitation:89, electrification:98, irrigation:78, population:1128350 },
  { id:46, name:"Hisar",          state:"Haryana", region:"North", lat:29.1492, lng:75.7217, literacy:72.9, sex_ratio:879, nrega:252, water:74, roads:91, sanitation:83, electrification:97, irrigation:86, population:1742815 },
  { id:47, name:"Rohtak",         state:"Haryana", region:"North", lat:28.8955, lng:76.6066, literacy:80.5, sex_ratio:868, nrega:256, water:79, roads:93, sanitation:87, electrification:98, irrigation:83, population:1058683 },
  { id:48, name:"Sirsa",          state:"Haryana", region:"North", lat:29.5327, lng:75.0266, literacy:69.7, sex_ratio:898, nrega:248, water:71, roads:89, sanitation:79, electrification:96, irrigation:81, population:1295189 },

  // ── HIMACHAL PRADESH ────────────────────────────────────────────────────
  { id:49, name:"Shimla",         state:"Himachal Pradesh", region:"North", lat:31.1048, lng:77.1734, literacy:84.6, sex_ratio:916, nrega:261, water:84, roads:88, sanitation:92, electrification:98, irrigation:38, population:814010 },
  { id:50, name:"Kangra",         state:"Himachal Pradesh", region:"North", lat:32.0998, lng:76.2691, literacy:85.7, sex_ratio:1013, nrega:258, water:82, roads:86, sanitation:90, electrification:98, irrigation:34, population:1510075 },
  { id:51, name:"Mandi",          state:"Himachal Pradesh", region:"North", lat:31.7080, lng:76.9320, literacy:81.5, sex_ratio:1012, nrega:254, water:79, roads:84, sanitation:88, electrification:97, irrigation:29, population:999518 },
  { id:52, name:"Solan",          state:"Himachal Pradesh", region:"North", lat:30.9045, lng:77.0967, literacy:84.2, sex_ratio:918, nrega:257, water:81, roads:87, sanitation:91, electrification:98, irrigation:32, population:576670 },

  // ── JHARKHAND ───────────────────────────────────────────────────────────
  { id:53, name:"Ranchi",         state:"Jharkhand", region:"East", lat:23.3441, lng:85.3096, literacy:76.1, sex_ratio:949, nrega:196, water:49, roads:67, sanitation:63, electrification:82, irrigation:28, population:2914253 },
  { id:54, name:"Dhanbad",        state:"Jharkhand", region:"East", lat:23.7957, lng:86.4304, literacy:77.4, sex_ratio:956, nrega:199, water:52, roads:69, sanitation:67, electrification:84, irrigation:31, population:2684487 },
  { id:55, name:"Bokaro",         state:"Jharkhand", region:"East", lat:23.6693, lng:86.1511, literacy:74.4, sex_ratio:944, nrega:194, water:47, roads:64, sanitation:61, electrification:81, irrigation:26, population:2062330 },
  { id:56, name:"East Singhbhum", state:"Jharkhand", region:"East", lat:22.8046, lng:86.2029, literacy:76.8, sex_ratio:949, nrega:198, water:51, roads:68, sanitation:65, electrification:83, irrigation:29, population:2293919 },
  { id:57, name:"Dumka",          state:"Jharkhand", region:"East", lat:24.2667, lng:87.2500, literacy:62.4, sex_ratio:991, nrega:186, water:36, roads:52, sanitation:47, electrification:69, irrigation:18, population:1321442 },

  // ── KARNATAKA ───────────────────────────────────────────────────────────
  { id:58, name:"Bengaluru Urban", state:"Karnataka", region:"South", lat:12.9716, lng:77.5946, literacy:88.5, sex_ratio:916, nrega:274, water:88, roads:96, sanitation:96, electrification:100, irrigation:52, population:9621551 },
  { id:59, name:"Mysuru",         state:"Karnataka", region:"South", lat:12.2958, lng:76.6394, literacy:76.5, sex_ratio:982, nrega:261, water:81, roads:93, sanitation:93, electrification:98, irrigation:68, population:3001127 },
  { id:60, name:"Dharwad",        state:"Karnataka", region:"South", lat:15.4589, lng:75.0078, literacy:79.4, sex_ratio:960, nrega:248, water:73, roads:88, sanitation:88, electrification:95, irrigation:57, population:1846993 },
  { id:61, name:"Belagavi",       state:"Karnataka", region:"South", lat:15.8497, lng:74.4977, literacy:73.3, sex_ratio:971, nrega:241, water:68, roads:85, sanitation:84, electrification:93, irrigation:62, population:4779661 },
  { id:62, name:"Tumakuru",       state:"Karnataka", region:"South", lat:13.3379, lng:77.1173, literacy:74.3, sex_ratio:979, nrega:244, water:69, roads:86, sanitation:85, electrification:94, irrigation:54, population:2681449 },
  { id:63, name:"Kalaburagi",     state:"Karnataka", region:"South", lat:17.3297, lng:76.8343, literacy:65.3, sex_ratio:972, nrega:234, water:58, roads:79, sanitation:76, electrification:90, irrigation:46, population:2564892 },
  { id:64, name:"Hassan",         state:"Karnataka", region:"South", lat:13.0069, lng:76.0996, literacy:76.2, sex_ratio:1005, nrega:246, water:72, roads:87, sanitation:87, electrification:95, irrigation:59, population:1776421 },
  { id:65, name:"Dakshina Kannada",state:"Karnataka", region:"South", lat:12.8438, lng:75.2479, literacy:88.6, sex_ratio:1018, nrega:264, water:84, roads:94, sanitation:93, electrification:99, irrigation:41, population:2089649 },
  { id:66, name:"Shivamogga",     state:"Karnataka", region:"South", lat:13.9299, lng:75.5681, literacy:81.1, sex_ratio:988, nrega:252, water:76, roads:90, sanitation:89, electrification:97, irrigation:56, population:1752753 },
  { id:67, name:"Raichur",        state:"Karnataka", region:"South", lat:16.2076, lng:77.3463, literacy:57.2, sex_ratio:976, nrega:228, water:52, roads:74, sanitation:68, electrification:88, irrigation:61, population:1924773 },

  // ── KERALA ──────────────────────────────────────────────────────────────
  { id:68, name:"Thiruvananthapuram", state:"Kerala", region:"South", lat:8.5241, lng:76.9366, literacy:93.0, sex_ratio:1085, nrega:311, water:94, roads:98, sanitation:99, electrification:100, irrigation:71, population:3301427 },
  { id:69, name:"Ernakulam",      state:"Kerala", region:"South", lat:9.9312, lng:76.2673, literacy:95.9, sex_ratio:1027, nrega:318, water:96, roads:99, sanitation:100, electrification:100, irrigation:74, population:3282388 },
  { id:70, name:"Kozhikode",      state:"Kerala", region:"South", lat:11.2588, lng:75.7804, literacy:95.1, sex_ratio:1101, nrega:308, water:92, roads:97, sanitation:98, electrification:100, irrigation:68, population:3086293 },
  { id:71, name:"Palakkad",       state:"Kerala", region:"South", lat:10.7867, lng:76.6548, literacy:89.3, sex_ratio:1059, nrega:302, water:89, roads:96, sanitation:97, electrification:99, irrigation:76, population:2809934 },
  { id:72, name:"Thrissur",       state:"Kerala", region:"South", lat:10.5276, lng:76.2144, literacy:95.1, sex_ratio:1108, nrega:314, water:93, roads:98, sanitation:99, electrification:100, irrigation:64, population:3121200 },
  { id:73, name:"Malappuram",     state:"Kerala", region:"South", lat:11.0510, lng:76.0711, literacy:90.0, sex_ratio:1098, nrega:297, water:87, roads:95, sanitation:96, electrification:99, irrigation:51, population:4112920 },
  { id:74, name:"Kannur",         state:"Kerala", region:"South", lat:11.8745, lng:75.3704, literacy:95.0, sex_ratio:1136, nrega:309, water:91, roads:97, sanitation:98, electrification:100, irrigation:48, population:2523003 },
  { id:75, name:"Kollam",         state:"Kerala", region:"South", lat:8.8932, lng:76.6141, literacy:93.8, sex_ratio:1113, nrega:307, water:93, roads:97, sanitation:99, electrification:100, irrigation:41, population:2635375 },
  { id:76, name:"Alappuzha",      state:"Kerala", region:"South", lat:9.4981, lng:76.3388, literacy:96.1, sex_ratio:1100, nrega:312, water:94, roads:98, sanitation:100, electrification:100, irrigation:62, population:2127789 },
  { id:77, name:"Idukki",         state:"Kerala", region:"South", lat:9.9189, lng:76.9734, literacy:91.9, sex_ratio:1008, nrega:299, water:88, roads:93, sanitation:97, electrification:99, irrigation:43, population:1107453 },

  // ── MADHYA PRADESH ──────────────────────────────────────────────────────
  { id:78, name:"Bhopal",         state:"Madhya Pradesh", region:"Central", lat:23.2599, lng:77.4126, literacy:80.4, sex_ratio:918, nrega:214, water:67, roads:82, sanitation:79, electrification:93, irrigation:49, population:4394635 },
  { id:79, name:"Indore",         state:"Madhya Pradesh", region:"Central", lat:22.7196, lng:75.8577, literacy:87.4, sex_ratio:924, nrega:224, water:74, roads:89, sanitation:86, electrification:96, irrigation:57, population:3276697 },
  { id:80, name:"Gwalior",        state:"Madhya Pradesh", region:"Central", lat:26.2183, lng:78.1828, literacy:73.0, sex_ratio:868, nrega:209, water:62, roads:79, sanitation:76, electrification:91, irrigation:52, population:2032036 },
  { id:81, name:"Jabalpur",       state:"Madhya Pradesh", region:"Central", lat:23.1815, lng:79.9864, literacy:80.7, sex_ratio:956, nrega:211, water:64, roads:81, sanitation:78, electrification:92, irrigation:48, population:2463289 },
  { id:82, name:"Sagar",          state:"Madhya Pradesh", region:"Central", lat:23.8388, lng:78.7378, literacy:73.8, sex_ratio:905, nrega:206, water:57, roads:74, sanitation:71, electrification:88, irrigation:43, population:2378458 },
  { id:83, name:"Rewa",           state:"Madhya Pradesh", region:"Central", lat:24.5362, lng:81.2998, literacy:71.4, sex_ratio:934, nrega:204, water:54, roads:71, sanitation:68, electrification:86, irrigation:41, population:2365106 },
  { id:84, name:"Ujjain",         state:"Madhya Pradesh", region:"Central", lat:23.1765, lng:75.7885, literacy:77.8, sex_ratio:954, nrega:213, water:63, roads:78, sanitation:75, electrification:91, irrigation:54, population:1986864 },
  { id:85, name:"Shivpuri",       state:"Madhya Pradesh", region:"Central", lat:25.4358, lng:77.6577, literacy:63.7, sex_ratio:882, nrega:196, water:44, roads:63, sanitation:58, electrification:81, irrigation:38, population:1726048 },
  { id:86, name:"Shahdol",        state:"Madhya Pradesh", region:"Central", lat:23.2945, lng:81.3573, literacy:67.4, sex_ratio:981, nrega:198, water:47, roads:64, sanitation:59, electrification:78, irrigation:28, population:1066022 },
  { id:87, name:"Chhindwara",     state:"Madhya Pradesh", region:"Central", lat:22.0573, lng:78.9382, literacy:73.1, sex_ratio:983, nrega:203, water:56, roads:73, sanitation:69, electrification:85, irrigation:34, population:2090306 },

  // ── MAHARASHTRA ─────────────────────────────────────────────────────────
  { id:88, name:"Mumbai City",    state:"Maharashtra", region:"West", lat:18.9388, lng:72.8354, literacy:90.3, sex_ratio:838, nrega:279, water:96, roads:99, sanitation:98, electrification:100, irrigation:0,  population:3145903 },
  { id:89, name:"Mumbai Suburban",state:"Maharashtra", region:"West", lat:19.1136, lng:72.8697, literacy:90.8, sex_ratio:860, nrega:276, water:94, roads:99, sanitation:97, electrification:100, irrigation:0,  population:9356962 },
  { id:90, name:"Pune",           state:"Maharashtra", region:"West", lat:18.5204, lng:73.8567, literacy:87.2, sex_ratio:915, nrega:267, water:84, roads:95, sanitation:94, electrification:99, irrigation:72, population:9429408 },
  { id:91, name:"Nashik",         state:"Maharashtra", region:"West", lat:20.0059, lng:73.7898, literacy:80.0, sex_ratio:943, nrega:245, water:72, roads:89, sanitation:88, electrification:96, irrigation:61, population:6107187 },
  { id:92, name:"Aurangabad",     state:"Maharashtra", region:"West", lat:19.8762, lng:75.3433, literacy:77.6, sex_ratio:927, nrega:238, water:63, roads:81, sanitation:83, electrification:92, irrigation:52, population:3695928 },
  { id:93, name:"Nagpur",         state:"Maharashtra", region:"West", lat:21.1458, lng:79.0882, literacy:86.5, sex_ratio:954, nrega:256, water:81, roads:91, sanitation:91, electrification:98, irrigation:58, population:4653570 },
  { id:94, name:"Wardha",         state:"Maharashtra", region:"West", lat:20.7453, lng:78.6022, literacy:81.4, sex_ratio:956, nrega:231, water:67, roads:82, sanitation:81, electrification:94, irrigation:54, population:1300774 },
  { id:95, name:"Yavatmal",       state:"Maharashtra", region:"West", lat:20.3888, lng:78.1204, literacy:77.3, sex_ratio:946, nrega:218, water:52, roads:71, sanitation:74, electrification:88, irrigation:41, population:2772348 },
  { id:96, name:"Amravati",       state:"Maharashtra", region:"West", lat:20.9333, lng:77.7500, literacy:84.2, sex_ratio:949, nrega:224, water:61, roads:76, sanitation:79, electrification:91, irrigation:48, population:2888445 },
  { id:97, name:"Kolhapur",       state:"Maharashtra", region:"West", lat:16.7050, lng:74.2433, literacy:82.4, sex_ratio:964, nrega:254, water:79, roads:92, sanitation:91, electrification:97, irrigation:68, population:3876001 },
  { id:98, name:"Solapur",        state:"Maharashtra", region:"West", lat:17.6599, lng:75.9064, literacy:77.9, sex_ratio:940, nrega:226, water:58, roads:78, sanitation:77, electrification:90, irrigation:46, population:4317756 },
  { id:99, name:"Satara",         state:"Maharashtra", region:"West", lat:17.6868, lng:74.0183, literacy:82.2, sex_ratio:990, nrega:244, water:74, roads:88, sanitation:87, electrification:96, irrigation:64, population:3003741 },
  { id:100,name:"Sangli",         state:"Maharashtra", region:"West", lat:16.8524, lng:74.5815, literacy:81.5, sex_ratio:960, nrega:241, water:71, roads:87, sanitation:86, electrification:96, irrigation:67, population:2822143 },

  // ── MANIPUR ─────────────────────────────────────────────────────────────
  { id:101,name:"Imphal West",    state:"Manipur", region:"Northeast", lat:24.8170, lng:93.9368, literacy:80.4, sex_ratio:1020, nrega:204, water:62, roads:64, sanitation:68, electrification:81, irrigation:32, population:517992 },
  { id:102,name:"Imphal East",    state:"Manipur", region:"Northeast", lat:24.8054, lng:93.9948, literacy:75.9, sex_ratio:1001, nrega:198, water:54, roads:58, sanitation:62, electrification:76, irrigation:28, population:456113 },

  // ── MEGHALAYA ───────────────────────────────────────────────────────────
  { id:103,name:"East Khasi Hills",state:"Meghalaya", region:"Northeast", lat:25.5788, lng:91.8933, literacy:85.0, sex_ratio:1007, nrega:218, water:71, roads:72, sanitation:67, electrification:84, irrigation:14, population:825922 },
  { id:104,name:"West Garo Hills", state:"Meghalaya", region:"Northeast", lat:25.5333, lng:90.2167, literacy:72.4, sex_ratio:1007, nrega:208, water:58, roads:61, sanitation:54, electrification:74, irrigation:11, population:643291 },

  // ── MIZORAM ─────────────────────────────────────────────────────────────
  { id:105,name:"Aizawl",         state:"Mizoram", region:"Northeast", lat:23.7271, lng:92.7176, literacy:98.5, sex_ratio:976, nrega:218, water:71, roads:72, sanitation:78, electrification:88, irrigation:21, population:400309 },

  // ── NAGALAND ────────────────────────────────────────────────────────────
  { id:106,name:"Kohima",         state:"Nagaland", region:"Northeast", lat:25.6747, lng:94.1086, literacy:82.5, sex_ratio:931, nrega:212, water:64, roads:66, sanitation:63, electrification:82, irrigation:16, population:267988 },

  // ── ODISHA ──────────────────────────────────────────────────────────────
  { id:107,name:"Khordha",        state:"Odisha", region:"East", lat:20.1827, lng:85.6143, literacy:85.8, sex_ratio:951, nrega:213, water:68, roads:82, sanitation:79, electrification:91, irrigation:46, population:2251673 },
  { id:108,name:"Cuttack",        state:"Odisha", region:"East", lat:20.4625, lng:85.8828, literacy:80.7, sex_ratio:948, nrega:208, water:62, roads:77, sanitation:74, electrification:88, irrigation:54, population:2618708 },
  { id:109,name:"Ganjam",         state:"Odisha", region:"East", lat:19.3899, lng:84.6897, literacy:70.9, sex_ratio:1008, nrega:204, water:56, roads:72, sanitation:68, electrification:84, irrigation:42, population:3520151 },
  { id:110,name:"Sundargarh",     state:"Odisha", region:"East", lat:22.1150, lng:84.0310, literacy:73.5, sex_ratio:978, nrega:199, water:52, roads:68, sanitation:64, electrification:81, irrigation:31, population:2080664 },
  { id:111,name:"Koraput",        state:"Odisha", region:"East", lat:18.8135, lng:82.7110, literacy:50.4, sex_ratio:1035, nrega:191, water:38, roads:56, sanitation:48, electrification:68, irrigation:22, population:1376934 },
  { id:112,name:"Mayurbhanj",     state:"Odisha", region:"East", lat:21.9400, lng:86.7300, literacy:63.9, sex_ratio:1008, nrega:196, water:44, roads:61, sanitation:52, electrification:71, irrigation:24, population:2513895 },
  { id:113,name:"Balasore",       state:"Odisha", region:"East", lat:21.4942, lng:86.9334, literacy:80.7, sex_ratio:963, nrega:206, water:59, roads:74, sanitation:71, electrification:86, irrigation:48, population:2317419 },
  { id:114,name:"Sambalpur",      state:"Odisha", region:"East", lat:21.4669, lng:83.9756, literacy:75.5, sex_ratio:970, nrega:201, water:54, roads:70, sanitation:66, electrification:83, irrigation:36, population:1044410 },

  // ── PUNJAB ──────────────────────────────────────────────────────────────
  { id:115,name:"Ludhiana",       state:"Punjab", region:"North", lat:30.9010, lng:75.8573, literacy:82.7, sex_ratio:874, nrega:291, water:86, roads:96, sanitation:93, electrification:99, irrigation:91, population:3498739 },
  { id:116,name:"Amritsar",       state:"Punjab", region:"North", lat:31.6340, lng:74.8723, literacy:78.0, sex_ratio:889, nrega:287, water:84, roads:95, sanitation:92, electrification:98, irrigation:89, population:2490656 },
  { id:117,name:"Jalandhar",      state:"Punjab", region:"North", lat:31.3260, lng:75.5762, literacy:82.3, sex_ratio:884, nrega:293, water:88, roads:97, sanitation:94, electrification:99, irrigation:92, population:2193590 },
  { id:118,name:"Patiala",        state:"Punjab", region:"North", lat:30.3398, lng:76.3869, literacy:79.8, sex_ratio:889, nrega:284, water:85, roads:94, sanitation:91, electrification:98, irrigation:88, population:1892282 },
  { id:119,name:"Sangrur",        state:"Punjab", region:"North", lat:30.2355, lng:75.8456, literacy:72.5, sex_ratio:883, nrega:278, water:81, roads:93, sanitation:89, electrification:97, irrigation:87, population:1655169 },
  { id:120,name:"Bathinda",       state:"Punjab", region:"North", lat:30.2110, lng:74.9455, literacy:70.1, sex_ratio:878, nrega:274, water:79, roads:92, sanitation:87, electrification:97, irrigation:84, population:1388859 },
  { id:121,name:"Hoshiarpur",     state:"Punjab", region:"North", lat:31.5143, lng:75.9112, literacy:84.6, sex_ratio:961, nrega:281, water:82, roads:94, sanitation:90, electrification:98, irrigation:78, population:1582793 },
  { id:122,name:"Gurdaspur",      state:"Punjab", region:"North", lat:32.0414, lng:75.4096, literacy:78.6, sex_ratio:906, nrega:278, water:80, roads:93, sanitation:88, electrification:97, irrigation:82, population:2299026 },

  // ── RAJASTHAN ───────────────────────────────────────────────────────────
  { id:123,name:"Jaipur",         state:"Rajasthan", region:"North", lat:26.9124, lng:75.7873, literacy:76.4, sex_ratio:910, nrega:218, water:62, roads:84, sanitation:78, electrification:94, irrigation:41, population:6663971 },
  { id:124,name:"Jodhpur",        state:"Rajasthan", region:"North", lat:26.2389, lng:73.0243, literacy:65.9, sex_ratio:922, nrega:207, water:51, roads:77, sanitation:68, electrification:89, irrigation:29, population:3685681 },
  { id:125,name:"Bikaner",        state:"Rajasthan", region:"North", lat:28.0229, lng:73.3119, literacy:65.1, sex_ratio:906, nrega:201, water:46, roads:72, sanitation:62, electrification:86, irrigation:24, population:2367745 },
  { id:126,name:"Udaipur",        state:"Rajasthan", region:"North", lat:24.5854, lng:73.7125, literacy:61.8, sex_ratio:960, nrega:213, water:57, roads:81, sanitation:74, electrification:91, irrigation:36, population:3067549 },
  { id:127,name:"Kota",           state:"Rajasthan", region:"North", lat:25.2138, lng:75.8648, literacy:76.6, sex_ratio:922, nrega:214, water:63, roads:83, sanitation:76, electrification:93, irrigation:52, population:1951014 },
  { id:128,name:"Ajmer",          state:"Rajasthan", region:"North", lat:26.4499, lng:74.6399, literacy:70.5, sex_ratio:931, nrega:209, water:57, roads:80, sanitation:72, electrification:91, irrigation:38, population:2584913 },
  { id:129,name:"Alwar",          state:"Rajasthan", region:"North", lat:27.5530, lng:76.6346, literacy:70.7, sex_ratio:895, nrega:208, water:54, roads:78, sanitation:69, electrification:89, irrigation:44, population:3674179 },
  { id:130,name:"Barmer",         state:"Rajasthan", region:"North", lat:25.7521, lng:71.3967, literacy:56.5, sex_ratio:902, nrega:198, water:38, roads:66, sanitation:52, electrification:81, irrigation:12, population:2603751 },
  { id:131,name:"Jaisalmer",      state:"Rajasthan", region:"North", lat:26.9157, lng:70.9083, literacy:57.1, sex_ratio:852, nrega:196, water:36, roads:63, sanitation:48, electrification:79, irrigation:8,  population:669919 },
  { id:132,name:"Nagaur",         state:"Rajasthan", region:"North", lat:27.2029, lng:73.7338, literacy:62.8, sex_ratio:929, nrega:203, water:48, roads:74, sanitation:63, electrification:87, irrigation:31, population:3307743 },
  { id:133,name:"Churu",          state:"Rajasthan", region:"North", lat:28.2967, lng:74.9681, literacy:66.8, sex_ratio:914, nrega:204, water:51, roads:76, sanitation:65, electrification:88, irrigation:26, population:2039547 },

  // ── SIKKIM ──────────────────────────────────────────────────────────────
  { id:134,name:"East Sikkim",    state:"Sikkim", region:"Northeast", lat:27.3389, lng:88.6065, literacy:82.2, sex_ratio:889, nrega:234, water:78, roads:82, sanitation:84, electrification:94, irrigation:22, population:283583 },

  // ── TAMIL NADU ──────────────────────────────────────────────────────────
  { id:135,name:"Chennai",        state:"Tamil Nadu", region:"South", lat:13.0827, lng:80.2707, literacy:90.2, sex_ratio:989, nrega:281, water:89, roads:97, sanitation:96, electrification:100, irrigation:54, population:7088000 },
  { id:136,name:"Coimbatore",     state:"Tamil Nadu", region:"South", lat:11.0168, lng:76.9558, literacy:84.6, sex_ratio:994, nrega:271, water:85, roads:96, sanitation:94, electrification:99, irrigation:68, population:3458045 },
  { id:137,name:"Madurai",        state:"Tamil Nadu", region:"South", lat:9.9252,  lng:78.1198, literacy:84.4, sex_ratio:987, nrega:264, water:81, roads:94, sanitation:92, electrification:98, irrigation:62, population:3038252 },
  { id:138,name:"Tirunelveli",    state:"Tamil Nadu", region:"South", lat:8.7139,  lng:77.7567, literacy:85.5, sex_ratio:1009,nrega:258, water:77, roads:93, sanitation:91, electrification:97, irrigation:59, population:3072880 },
  { id:139,name:"Salem",          state:"Tamil Nadu", region:"South", lat:11.6643, lng:78.1460, literacy:78.9, sex_ratio:967, nrega:261, water:74, roads:92, sanitation:89, electrification:97, irrigation:54, population:3482056 },
  { id:140,name:"Tiruchirappalli",state:"Tamil Nadu", region:"South", lat:10.7905, lng:78.7047, literacy:84.7, sex_ratio:990, nrega:263, water:78, roads:93, sanitation:91, electrification:98, irrigation:67, population:2722290 },
  { id:141,name:"Vellore",        state:"Tamil Nadu", region:"South", lat:12.9165, lng:79.1325, literacy:79.4, sex_ratio:994, nrega:254, water:72, roads:91, sanitation:88, electrification:97, irrigation:48, population:3936331 },
  { id:142,name:"Thanjavur",      state:"Tamil Nadu", region:"South", lat:10.7870, lng:79.1378, literacy:87.2, sex_ratio:1023,nrega:259, water:79, roads:93, sanitation:91, electrification:98, irrigation:72, population:2405890 },
  { id:143,name:"Kanyakumari",    state:"Tamil Nadu", region:"South", lat:8.0883,  lng:77.5385, literacy:91.8, sex_ratio:1038,nrega:267, water:82, roads:94, sanitation:93, electrification:99, irrigation:44, population:1870374 },
  { id:144,name:"Erode",          state:"Tamil Nadu", region:"South", lat:11.3410, lng:77.7172, literacy:79.6, sex_ratio:976, nrega:258, water:73, roads:92, sanitation:88, electrification:97, irrigation:62, population:2251744 },
  { id:145,name:"Dindigul",       state:"Tamil Nadu", region:"South", lat:10.3624, lng:77.9695, literacy:76.8, sex_ratio:1007,nrega:254, water:69, roads:90, sanitation:86, electrification:96, irrigation:54, population:2159775 },

  // ── TELANGANA ───────────────────────────────────────────────────────────
  { id:146,name:"Hyderabad",      state:"Telangana", region:"South", lat:17.3850, lng:78.4867, literacy:83.3, sex_ratio:956, nrega:251, water:82, roads:94, sanitation:92, electrification:99, irrigation:58, population:3943323 },
  { id:147,name:"Warangal Urban", state:"Telangana", region:"South", lat:17.9784, lng:79.5941, literacy:74.8, sex_ratio:973, nrega:238, water:69, roads:84, sanitation:84, electrification:93, irrigation:62, population:909267 },
  { id:148,name:"Nizamabad",      state:"Telangana", region:"South", lat:18.6725, lng:78.0941, literacy:67.4, sex_ratio:984, nrega:229, water:64, roads:81, sanitation:81, electrification:91, irrigation:57, population:1540913 },
  { id:149,name:"Karimnagar",     state:"Telangana", region:"South", lat:18.4386, lng:79.1288, literacy:72.4, sex_ratio:993, nrega:242, water:71, roads:86, sanitation:86, electrification:94, irrigation:64, population:1097983 },
  { id:150,name:"Khammam",        state:"Telangana", region:"South", lat:17.2473, lng:80.1514, literacy:67.3, sex_ratio:1004,nrega:234, water:66, roads:82, sanitation:79, electrification:92, irrigation:59, population:1401639 },
  { id:151,name:"Nalgonda",       state:"Telangana", region:"South", lat:17.0575, lng:79.2670, literacy:65.3, sex_ratio:1001,nrega:228, water:59, roads:79, sanitation:76, electrification:90, irrigation:62, population:1790762 },
  { id:152,name:"Mahbubnagar",    state:"Telangana", region:"South", lat:16.7488, lng:77.9876, literacy:56.1, sex_ratio:1003,nrega:221, water:51, roads:74, sanitation:68, electrification:87, irrigation:48, population:1871907 },
  { id:153,name:"Medak",          state:"Telangana", region:"South", lat:17.9999, lng:78.2647, literacy:60.8, sex_ratio:987, nrega:224, water:54, roads:76, sanitation:71, electrification:88, irrigation:44, population:769801 },
  { id:154,name:"Adilabad",       state:"Telangana", region:"South", lat:19.6641, lng:78.5320, literacy:56.4, sex_ratio:1007,nrega:218, water:48, roads:71, sanitation:64, electrification:84, irrigation:36, population:708972 },

  // ── TRIPURA ─────────────────────────────────────────────────────────────
  { id:155,name:"West Tripura",   state:"Tripura", region:"Northeast", lat:23.9408, lng:91.9882, literacy:93.8, sex_ratio:960, nrega:208, water:67, roads:71, sanitation:69, electrification:87, irrigation:28, population:1725739 },

  // ── UTTAR PRADESH ───────────────────────────────────────────────────────
  { id:156,name:"Lucknow",        state:"Uttar Pradesh", region:"North", lat:26.8467, lng:80.9462, literacy:77.3, sex_ratio:906, nrega:204, water:58, roads:74, sanitation:71, electrification:88, irrigation:67, population:4589838 },
  { id:157,name:"Kanpur Nagar",   state:"Uttar Pradesh", region:"North", lat:26.4499, lng:80.3319, literacy:79.7, sex_ratio:867, nrega:198, water:54, roads:71, sanitation:67, electrification:86, irrigation:63, population:4572951 },
  { id:158,name:"Agra",           state:"Uttar Pradesh", region:"North", lat:27.1767, lng:78.0081, literacy:71.6, sex_ratio:869, nrega:201, water:56, roads:73, sanitation:69, electrification:87, irrigation:71, population:4418797 },
  { id:159,name:"Varanasi",       state:"Uttar Pradesh", region:"North", lat:25.3176, lng:82.9739, literacy:77.0, sex_ratio:883, nrega:196, water:52, roads:68, sanitation:64, electrification:85, irrigation:58, population:3676841 },
  { id:160,name:"Allahabad",      state:"Uttar Pradesh", region:"North", lat:25.4358, lng:81.8463, literacy:72.3, sex_ratio:901, nrega:193, water:49, roads:66, sanitation:61, electrification:83, irrigation:62, population:5954391 },
  { id:161,name:"Meerut",         state:"Uttar Pradesh", region:"North", lat:28.9845, lng:77.7064, literacy:73.1, sex_ratio:868, nrega:204, water:58, roads:74, sanitation:69, electrification:87, irrigation:78, population:3447405 },
  { id:162,name:"Bareilly",       state:"Uttar Pradesh", region:"North", lat:28.3670, lng:79.4304, literacy:63.3, sex_ratio:887, nrega:196, water:49, roads:67, sanitation:62, electrification:83, irrigation:64, population:4448359 },
  { id:163,name:"Aligarh",        state:"Uttar Pradesh", region:"North", lat:27.8974, lng:78.0880, literacy:68.6, sex_ratio:882, nrega:197, water:51, roads:69, sanitation:64, electrification:84, irrigation:74, population:3747788 },
  { id:164,name:"Gorakhpur",      state:"Uttar Pradesh", region:"North", lat:26.7606, lng:83.3732, literacy:71.3, sex_ratio:952, nrega:192, water:46, roads:64, sanitation:59, electrification:81, irrigation:56, population:4440895 },
  { id:165,name:"Moradabad",      state:"Uttar Pradesh", region:"North", lat:28.8386, lng:78.7733, literacy:56.8, sex_ratio:903, nrega:193, water:47, roads:65, sanitation:59, electrification:81, irrigation:67, population:4772006 },
  { id:166,name:"Saharanpur",     state:"Uttar Pradesh", region:"North", lat:29.9680, lng:77.5510, literacy:63.5, sex_ratio:889, nrega:196, water:50, roads:68, sanitation:62, electrification:83, irrigation:72, population:3466382 },
  { id:167,name:"Mathura",        state:"Uttar Pradesh", region:"North", lat:27.4924, lng:77.6737, literacy:72.4, sex_ratio:866, nrega:199, water:53, roads:71, sanitation:66, electrification:85, irrigation:76, population:2541894 },
  { id:168,name:"Muzaffarnagar",  state:"Uttar Pradesh", region:"North", lat:29.4727, lng:77.7085, literacy:69.3, sex_ratio:882, nrega:197, water:52, roads:70, sanitation:64, electrification:84, irrigation:78, population:4143512 },
  { id:169,name:"Jhansi",         state:"Uttar Pradesh", region:"North", lat:25.4484, lng:78.5685, literacy:73.6, sex_ratio:879, nrega:198, water:54, roads:72, sanitation:67, electrification:85, irrigation:52, population:2000755 },
  { id:170,name:"Azamgarh",       state:"Uttar Pradesh", region:"North", lat:26.0737, lng:83.1837, literacy:71.3, sex_ratio:1019,nrega:190, water:43, roads:61, sanitation:56, electrification:79, irrigation:54, population:4616509 },
  { id:171,name:"Ballia",         state:"Uttar Pradesh", region:"North", lat:25.7594, lng:84.1478, literacy:70.5, sex_ratio:952, nrega:189, water:41, roads:59, sanitation:53, electrification:77, irrigation:51, population:3239774 },
  { id:172,name:"Sitapur",        state:"Uttar Pradesh", region:"North", lat:27.5626, lng:80.6858, literacy:59.4, sex_ratio:901, nrega:191, water:44, roads:62, sanitation:57, electrification:79, irrigation:62, population:4483992 },

  // ── UTTARAKHAND ─────────────────────────────────────────────────────────
  { id:173,name:"Dehradun",       state:"Uttarakhand", region:"North", lat:30.3165, lng:78.0322, literacy:85.2, sex_ratio:902, nrega:248, water:78, roads:86, sanitation:88, electrification:96, irrigation:42, population:1696694 },
  { id:174,name:"Haridwar",       state:"Uttarakhand", region:"North", lat:29.9457, lng:78.1642, literacy:75.5, sex_ratio:880, nrega:241, water:71, roads:82, sanitation:82, electrification:94, irrigation:56, population:1890422 },
  { id:175,name:"Nainital",       state:"Uttarakhand", region:"North", lat:29.3803, lng:79.4636, literacy:83.9, sex_ratio:935, nrega:244, water:74, roads:84, sanitation:85, electrification:95, irrigation:36, population:954605 },
  { id:176,name:"Udham Singh Nagar",state:"Uttarakhand", region:"North", lat:29.0200, lng:79.5200, literacy:74.8, sex_ratio:920, nrega:238, water:68, roads:81, sanitation:80, electrification:93, irrigation:62, population:1648902 },
  { id:177,name:"Almora",         state:"Uttarakhand", region:"North", lat:29.5971, lng:79.6591, literacy:82.9, sex_ratio:1142,nrega:241, water:72, roads:79, sanitation:83, electrification:94, irrigation:21, population:622506 },

  // ── WEST BENGAL ─────────────────────────────────────────────────────────
  { id:178,name:"Kolkata",        state:"West Bengal", region:"East", lat:22.5726, lng:88.3639, literacy:87.1, sex_ratio:908, nrega:221, water:82, roads:91, sanitation:88, electrification:99, irrigation:46, population:4496694 },
  { id:179,name:"Howrah",         state:"West Bengal", region:"East", lat:22.5958, lng:88.2636, literacy:82.0, sex_ratio:941, nrega:216, water:76, roads:88, sanitation:84, electrification:97, irrigation:52, population:4850029 },
  { id:180,name:"Darjeeling",     state:"West Bengal", region:"East", lat:27.0360, lng:88.2627, literacy:79.0, sex_ratio:970, nrega:208, water:71, roads:82, sanitation:81, electrification:91, irrigation:34, population:1842034 },
  { id:181,name:"Murshidabad",    state:"West Bengal", region:"East", lat:24.1800, lng:88.2700, literacy:66.6, sex_ratio:958, nrega:196, water:52, roads:68, sanitation:58, electrification:78, irrigation:62, population:7103807 },
  { id:182,name:"Nadia",          state:"West Bengal", region:"East", lat:23.4700, lng:88.5600, literacy:75.6, sex_ratio:945, nrega:204, water:62, roads:76, sanitation:68, electrification:86, irrigation:68, population:5167600 },
  { id:183,name:"Bardhaman",      state:"West Bengal", region:"East", lat:23.2500, lng:87.8600, literacy:77.2, sex_ratio:947, nrega:207, water:64, roads:78, sanitation:71, electrification:88, irrigation:72, population:7717563 },
  { id:184,name:"Birbhum",        state:"West Bengal", region:"East", lat:23.9000, lng:87.5300, literacy:70.9, sex_ratio:956, nrega:198, water:54, roads:69, sanitation:59, electrification:81, irrigation:56, population:3502404 },
  { id:185,name:"Purulia",        state:"West Bengal", region:"East", lat:23.3320, lng:86.3600, literacy:65.4, sex_ratio:955, nrega:193, water:46, roads:63, sanitation:51, electrification:74, irrigation:28, population:2930115 },
  { id:186,name:"Bankura",        state:"West Bengal", region:"East", lat:23.2300, lng:87.0700, literacy:72.4, sex_ratio:956, nrega:197, water:51, roads:67, sanitation:56, electrification:78, irrigation:34, population:3596674 },
  { id:187,name:"Medinipur",      state:"West Bengal", region:"East", lat:22.4251, lng:87.3219, literacy:78.3, sex_ratio:967, nrega:199, water:57, roads:72, sanitation:63, electrification:82, irrigation:46, population:5094238 },
  { id:188,name:"24 Parganas N.", state:"West Bengal", region:"East", lat:22.9000, lng:88.5400, literacy:79.1, sex_ratio:949, nrega:206, water:63, roads:77, sanitation:67, electrification:85, irrigation:58, population:10009781 },
  { id:189,name:"24 Parganas S.", state:"West Bengal", region:"East", lat:22.0000, lng:88.4800, literacy:78.6, sex_ratio:956, nrega:204, water:58, roads:74, sanitation:63, electrification:83, irrigation:52, population:8161961 },
  { id:190,name:"Jalpaiguri",     state:"West Bengal", region:"East", lat:26.5400, lng:88.7300, literacy:74.9, sex_ratio:961, nrega:199, water:56, roads:70, sanitation:60, electrification:80, irrigation:44, population:3872846 },
  { id:191,name:"Cooch Behar",    state:"West Bengal", region:"East", lat:26.3200, lng:89.4500, literacy:75.5, sex_ratio:957, nrega:196, water:53, roads:68, sanitation:57, electrification:78, irrigation:48, population:2822780 },

  // ── DELHI ───────────────────────────────────────────────────────────────
  { id:192,name:"New Delhi",      state:"Delhi", region:"North", lat:28.6139, lng:77.2090, literacy:86.3, sex_ratio:868, nrega:0,   water:92, roads:99, sanitation:96, electrification:100,irrigation:0,  population:16787941 },

  // ── JAMMU & KASHMIR ─────────────────────────────────────────────────────
  { id:193,name:"Srinagar",       state:"Jammu & Kashmir", region:"North", lat:34.0837, lng:74.7973, literacy:68.0, sex_ratio:882, nrega:161, water:64, roads:68, sanitation:61, electrification:86, irrigation:48, population:1273312 },
  { id:194,name:"Jammu",          state:"Jammu & Kashmir", region:"North", lat:32.7266, lng:74.8570, literacy:83.1, sex_ratio:880, nrega:167, water:71, roads:74, sanitation:67, electrification:90, irrigation:42, population:1529958 },
  { id:195,name:"Anantnag",       state:"Jammu & Kashmir", region:"North", lat:33.7311, lng:75.1487, literacy:58.8, sex_ratio:915, nrega:154, water:58, roads:61, sanitation:52, electrification:82, irrigation:38, population:1078692 },
  { id:196,name:"Baramulla",      state:"Jammu & Kashmir", region:"North", lat:34.2060, lng:74.3440, literacy:56.5, sex_ratio:883, nrega:151, water:54, roads:58, sanitation:48, electrification:79, irrigation:36, population:1015503 },
  { id:197,name:"Kupwara",        state:"Jammu & Kashmir", region:"North", lat:34.5240, lng:74.2700, literacy:57.5, sex_ratio:918, nrega:148, water:51, roads:54, sanitation:44, electrification:76, irrigation:32, population:875564 },

  // ── LADAKH ──────────────────────────────────────────────────────────────
  { id:198,name:"Leh",            state:"Ladakh", region:"North", lat:34.1526, lng:77.5771, literacy:77.2, sex_ratio:690, nrega:142, water:62, roads:64, sanitation:71, electrification:87, irrigation:28, population:133487 },
  { id:199,name:"Kargil",         state:"Ladakh", region:"North", lat:34.5539, lng:76.1349, literacy:66.7, sex_ratio:815, nrega:138, water:54, roads:57, sanitation:62, electrification:81, irrigation:22, population:140802 },

  // ── PUDUCHERRY ──────────────────────────────────────────────────────────
  { id:200,name:"Puducherry",     state:"Puducherry", region:"South", lat:11.9416, lng:79.8083, literacy:86.6, sex_ratio:1038,nrega:0,   water:87, roads:96, sanitation:93, electrification:100,irrigation:41, population:950289 },
];

export const getDevScore = (d) => {
  const elec  = d.electrification * 0.18;
  const water = d.water           * 0.22;
  const nrega = Math.min((d.nrega / 350) * 100, 100) * 0.15;
  const sanit = d.sanitation      * 0.15;
  const roads = d.roads           * 0.10;
  const irrig = d.irrigation      * 0.08;
  const lit   = d.literacy        * 0.07;
  const sex   = Math.min(((d.sex_ratio - 800) / 400) * 100, 100) * 0.05;
  return Math.round(elec + water + nrega + sanit + roads + irrig + lit + sex);
};

export const getScoreColor = (score) => {
  if (score >= 85) return '#173404';
  if (score >= 75) return '#1a3d0a';
  if (score >= 65) return '#27500A';
  if (score >= 55) return '#639922';
  if (score >= 45) return '#97C459';
  if (score >= 35) return '#EF9F27';
  if (score >= 25) return '#D85A30';
  return '#A32D2D';
};

export const nationalStats = {
  electrification: 96,
  water: 59,
  nrega: 247,
  sanitation: 71,
  literacy: 77.7,
  sex_ratio: 943,
  roads: 82,
  irrigation: 52,
};

export const stateList = [...new Set(districts.map(d => d.state))].sort();

export const getStateStats = (stateName) => {
  const ds = districts.filter(d => d.state === stateName);
  if (!ds.length) return null;
  const avg = (key) => Math.round(ds.reduce((s, d) => s + d[key], 0) / ds.length);
  return {
    state: stateName,
    districts: ds.length,
    population: ds.reduce((s, d) => s + d.population, 0),
    electrification: avg('electrification'),
    water: avg('water'),
    nrega: avg('nrega'),
    sanitation: avg('sanitation'),
    literacy: +(ds.reduce((s, d) => s + d.literacy, 0) / ds.length).toFixed(1),
    sex_ratio: avg('sex_ratio'),
    roads: avg('roads'),
    irrigation: avg('irrigation'),
    devScore: Math.round(ds.reduce((s, d) => s + getDevScore(d), 0) / ds.length),
  };
};

export default districts;
