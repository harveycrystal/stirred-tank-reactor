const lessonItems = document.querySelectorAll("#lessonList li");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonText = document.querySelector("#lessonText");
const partTitle = document.querySelector("#partTitle");
const partText = document.querySelector("#partText");
const statusText = document.querySelector("#statusText");
const mixValue = document.querySelector("#mixValue");
const conversionValue = document.querySelector("#conversionValue");
const thermalValue = document.querySelector("#thermalValue");
const riskValue = document.querySelector("#riskValue");
const modeControl = document.querySelector("#modeControl");
const rpmControl = document.querySelector("#rpmControl");
const feedControl = document.querySelector("#feedControl");
const heatControl = document.querySelector("#heatControl");
const rpmValue = document.querySelector("#rpmValue");
const feedValue = document.querySelector("#feedValue");
const heatValue = document.querySelector("#heatValue");
const toggleRun = document.querySelector("#toggleRun");
const tabs = {
  tank: document.querySelector("#tankTab"),
  trend: document.querySelector("#trendTab"),
  cascade: document.querySelector("#cascadeTab"),
};
const diagrams = {
  tank: document.querySelector("#tankDiagram"),
  trend: document.querySelector("#trendDiagram"),
  cascade: document.querySelector("#cascadeDiagram"),
};
const particles = document.querySelector("#particles");
const impellerGroup = document.querySelector("#impellerGroup");
const rotorStages = document.querySelectorAll(".rotor-stage");
const reactantCurve = document.querySelector("#reactantCurve");
const productCurve = document.querySelector("#productCurve");
const reactantPoint = document.querySelector("#reactantPoint");
const productPoint = document.querySelector("#productPoint");
const quizButtons = document.querySelectorAll(".quiz-options button");
const quizFeedback = document.querySelector("#quizFeedback");

const lessons = [
  {
    title: "基本構造",
    text: "槽式反應器通常是圓筒形或圓柱形槽，內部設有攪拌軸與攪拌器，使反應物在槽內快速混合。常見附屬元件包含馬達、夾套、盤管、進料口、卸料口與支撐基柱。",
    part: "tank",
    view: "tank",
  },
  {
    title: "攪拌與混合",
    text: "攪拌器的主要功能是降低槽內濃度與溫度梯度。理想 CSTR 假設槽內完全混合，因此出口組成等於槽內組成；實務上需靠合適轉速、葉片型式與擋板設計接近此狀態。",
    part: "impeller",
    view: "tank",
  },
  {
    title: "夾套與盤管傳熱",
    text: "反應若放熱或吸熱，常以夾套或盤管通入冷卻水、熱媒或水蒸氣調節溫度。傳熱控制可避免副反應、熱失控或反應速率不足，是槽式反應器設計的重要條件。",
    part: "coil",
    view: "tank",
  },
  {
    title: "批式操作",
    text: "批式操作是在反應前一次加入原料，反應期間通常不連續進出料。隨時間增加，反應物濃度下降、生成物濃度上升，適合小量、多品項或反應時間較長的製程。",
    part: "trend",
    view: "trend",
  },
  {
    title: "連續式與多槽串聯",
    text: "連續式操作讓原料持續進入、產物持續流出。單一 CSTR 因完全混合使反應物立刻被稀釋，轉化率可能偏低；多槽串聯能逐槽降低反應物濃度並提高總轉化率。",
    part: "stage1",
    view: "cascade",
  },
  {
    title: "操作診斷",
    text: "若轉速過低，混合不足會造成局部濃度差；若進料濃度高且冷卻不足，放熱反應可能升溫過快。工程判斷要同時看混合、停留時間、傳熱能力與反應動力學。",
    part: "heating",
    view: "tank",
  },
];

const partInfo = {
  tank: {
    title: "槽體",
    text: "槽體提供反應空間並承受操作壓力。密閉式槽可用於高壓、易揮發或具毒性的反應系統，也有助於控制氣體逸散與安全防護。",
  },
  motor: {
    title: "馬達",
    text: "馬達提供攪拌所需功率。轉速提高可增加混合均勻度與熱傳效率，但功率需求通常會快速上升，也可能造成剪切敏感物質受損。",
  },
  shaft: {
    title: "攪拌軸",
    text: "攪拌軸把馬達扭矩傳給葉片。軸封與軸承設計會影響洩漏風險、維修頻率與高壓操作可靠度。",
  },
  impeller: {
    title: "攪拌器",
    text: "攪拌器讓槽內流體形成循環流，促進反應物接觸並降低溫度梯度。葉片型式需依黏度、氣液分散或固體懸浮需求選擇。",
  },
  coil: {
    title: "盤管",
    text: "盤管放在槽內，讓冷卻水或熱媒直接經由管壁與反應液交換熱量。優點是傳熱面積可增加，限制是會占用槽內空間並可能干擾流場。",
  },
  coolant: {
    title: "冷卻水",
    text: "冷卻水常用於移除放熱反應產生的熱。若冷卻能力不足，反應速率可能因升溫而進一步加快，形成危險的正回饋。",
  },
  heating: {
    title: "熱媒或水蒸氣",
    text: "熱媒或水蒸氣用於提高槽內溫度，使吸熱反應或低溫慢反應達到所需速率。加熱時仍需監控避免過熱與副反應。",
  },
  feed: {
    title: "進料",
    text: "進料口把反應物送入槽內。連續式操作的設計重點是進料流量、濃度與停留時間；批式操作則重視加料順序與初始配比。",
  },
  discharge: {
    title: "卸料",
    text: "卸料口排出產物或反應混合物。連續式操作中，出口組成近似等於槽內組成；批式操作則常在達到目標轉化率後一次排出。",
  },
  support: {
    title: "基柱",
    text: "基柱承受槽體、液體、攪拌設備與管線重量。大型反應槽還需考慮振動、地震載重與維修空間。",
  },
  trend: {
    title: "濃度曲線",
    text: "批式操作中，反應物濃度隨反應時間下降，生成物濃度上升。曲線斜率代表反應速率，會受溫度、催化劑與濃度影響。",
  },
  stage1: {
    title: "多級槽式反應器",
    text: "多槽串聯可兼顧 CSTR 容易控制與逐段提高轉化率的優點。級數越多，濃度分布越接近管式反應器的漸變特性。",
  },
  stage2: {
    title: "第二反應槽",
    text: "第二槽接收第一槽流出物，反應物濃度較低但仍可繼續反應。各槽可分別控制溫度、催化劑或停留時間。",
  },
  stage3: {
    title: "第三反應槽",
    text: "第三槽進一步提高總轉化率。工業上會依反應速率、選擇率、設備成本與控制需求決定串聯槽數。",
  },
};

let running = true;
let tick = 0;
let selectedPart = "tank";

function selectLesson(index) {
  const lesson = lessons[index];
  lessonItems.forEach((item) => item.classList.toggle("active", Number(item.dataset.step) === index));
  lessonTitle.textContent = lesson.title;
  lessonText.textContent = lesson.text;
  showView(lesson.view);
  selectPart(lesson.part);
}

function selectPart(part) {
  selectedPart = part;
  const info = partInfo[part] || partInfo.tank;
  partTitle.textContent = info.title;
  partText.textContent = info.text;
  document.querySelectorAll("[data-part]").forEach((node) => {
    node.classList.toggle("active", node.dataset.part === part);
  });
}

function showView(view) {
  Object.entries(diagrams).forEach(([key, diagram]) => {
    diagram.classList.toggle("hidden", key !== view);
  });
  Object.entries(tabs).forEach(([key, tab]) => {
    const active = key === view;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  if (view === "trend") selectPart("trend");
  if (view === "cascade" && selectedPart !== "stage2" && selectedPart !== "stage3") selectPart("stage1");
  if (view === "tank" && ["trend", "stage1", "stage2", "stage3"].includes(selectedPart)) selectPart("tank");
}

function computeState() {
  const rpm = Number(rpmControl.value);
  const feed = Number(feedControl.value) / 10;
  const heat = Number(heatControl.value);
  const mode = modeControl.value;
  const mix = Math.round(Math.min(98, Math.max(28, 28 + rpm * 0.27 - feed * 7)));
  const baseConversion = mode === "batch" ? 58 : 47;
  const conversion = Math.round(Math.min(96, Math.max(18, baseConversion + mix * 0.22 - feed * 6 + Math.abs(heat) * 2.2)));
  const thermal = heat < -1 ? "冷卻" : heat > 1 ? "加熱" : "等溫";
  const riskScore = feed * 18 + Math.max(0, heat) * 8 - rpm * 0.04 + (mode === "continuous" ? 3 : 0);
  const risk = riskScore > 42 ? "高" : riskScore > 27 ? "中" : "低";
  return { rpm, feed, heat, mode, mix, conversion, thermal, risk };
}

function updateControls() {
  const state = computeState();
  rpmValue.textContent = `${state.rpm} rpm`;
  feedValue.textContent = `${state.feed.toFixed(1)} mol/L`;
  heatValue.textContent = state.thermal;
  mixValue.textContent = `${state.mix}%`;
  conversionValue.textContent = `${state.conversion}%`;
  thermalValue.textContent = state.thermal;
  riskValue.textContent = state.risk;

  if (state.rpm < 90) {
    statusText.textContent = "混合不足";
  } else if (state.risk === "高") {
    statusText.textContent = "需加強溫控";
  } else if (state.mode === "continuous") {
    statusText.textContent = "穩態操作";
  } else {
    statusText.textContent = "穩定混合";
  }

  drawCurves();
}

function drawCurves() {
  const state = computeState();
  const k = 0.55 + state.rpm / 420 + Math.max(0, state.heat) * 0.08;
  const points = Array.from({ length: 64 }, (_, index) => {
    const t = index / 63;
    const x = 230 + t * 540;
    const reactant = Math.exp(-k * 2.2 * t);
    const product = 1 - Math.exp(-k * 1.65 * t);
    return {
      x,
      yr: 458 - reactant * 280,
      yp: 458 - product * 280,
    };
  });
  reactantCurve.setAttribute("d", points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.yr.toFixed(1)}`).join(" "));
  productCurve.setAttribute("d", points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.yp.toFixed(1)}`).join(" "));

  const cursor = points[Math.floor((tick / 3) % points.length)] || points[0];
  reactantPoint.setAttribute("cx", cursor.x);
  reactantPoint.setAttribute("cy", cursor.yr);
  productPoint.setAttribute("cx", cursor.x);
  productPoint.setAttribute("cy", cursor.yp);
}

function renderParticles() {
  const state = computeState();
  const count = Math.round(16 + state.feed * 16);
  const speed = running ? state.rpm / 90 : 0;
  particles.innerHTML = Array.from({ length: count }, (_, index) => {
    const angle = tick * 0.018 * speed + index * 2.399;
    const radius = 38 + (index % 6) * 19;
    const cx = 482 + Math.cos(angle) * radius;
    const cy = 370 + Math.sin(angle * 1.35) * (radius * 0.58);
    return `<circle class="particle" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${4 + (index % 3)}" />`;
  }).join("");

  const wobble = Math.sin(tick * 0.08 * speed) * 3;
  impellerGroup.setAttribute("transform", `translate(0 ${wobble.toFixed(2)})`);
  rotorStages.forEach((stage, index) => {
    const cx = Number(stage.dataset.cx);
    const cy = Number(stage.dataset.cy);
    const phase = Number(stage.dataset.phase);
    const cycle = tick * state.rpm * 0.015 + phase;
    const apparentWidth = 0.62 + Math.abs(Math.sin(cycle * Math.PI / 180)) * 0.38;
    const sideLift = Math.cos(cycle * Math.PI / 180) * 3;
    const skew = Math.sin(cycle * Math.PI / 180) * 4;
    stage.setAttribute(
      "transform",
      `translate(${cx} ${(cy + sideLift).toFixed(2)}) scale(${apparentWidth.toFixed(3)} 1) skewY(${skew.toFixed(2)}) translate(${-cx} ${-cy})`,
    );
  });
}

function animate() {
  if (running) {
    tick += 1;
    renderParticles();
    drawCurves();
  }
  requestAnimationFrame(animate);
}

lessonItems.forEach((item) => {
  item.querySelector("button").addEventListener("click", () => selectLesson(Number(item.dataset.step)));
});

Object.entries(tabs).forEach(([view, tab]) => {
  tab.addEventListener("click", () => showView(view));
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-part]");
  if (trigger) selectPart(trigger.dataset.part);
});

document.querySelectorAll("[data-part]").forEach((node) => {
  node.addEventListener("focus", () => selectPart(node.dataset.part));
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectPart(node.dataset.part);
    }
  });
});

[modeControl, rpmControl, feedControl, heatControl].forEach((control) => {
  control.addEventListener("input", updateControls);
});

toggleRun.addEventListener("click", () => {
  running = !running;
  document.body.classList.toggle("paused", !running);
  toggleRun.textContent = running ? "暫停動畫" : "播放動畫";
  toggleRun.setAttribute("aria-pressed", String(running));
});

quizButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quizButtons.forEach((item) => item.classList.remove("correct", "wrong"));
    const correct = button.dataset.correct === "true";
    button.classList.add(correct ? "correct" : "wrong");
    quizFeedback.textContent = correct
      ? "正確。完全混合讓槽內反應物濃度等於出口濃度，平均反應速率通常低於具有濃度梯度的管式反應器。"
      : "再想想濃度分布。CSTR 的關鍵假設是完全混合，進料一進槽就被槽內混合物稀釋。";
  });
});

selectLesson(0);
updateControls();
renderParticles();
animate();
