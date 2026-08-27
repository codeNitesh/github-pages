
const cards = [{"cat": "Product Fundamentals", "level": "LEVEL 1 · KNOW IT", "q": "What does a Product Manager actually own?", "a": "A PM owns the product outcome, not every task required to build the product. They align customer problems, business goals, priorities, and execution.", "i": "Your job is not to be the person with all the answers. Your job is to make sure the team is solving the right problem."}, {"cat": "Product Sense", "level": "LEVEL 1 · KNOW IT", "q": "What is the difference between a user problem and a feature request?", "a": "A problem describes an unmet need or pain. A feature request is one proposed solution. Strong PMs investigate the problem before accepting the proposed solution.", "i": "When someone says “we need a button,” ask what the user is trying to accomplish."}, {"cat": "Metrics", "level": "LEVEL 1 · KNOW IT", "q": "What is a North Star Metric?", "a": "A metric that represents the core value your product delivers to customers and is meaningfully connected to long-term business success.", "i": "Start with customer value, not the easiest number to put on a dashboard."}, {"cat": "Metrics", "level": "LEVEL 2 · UNDERSTAND IT", "q": "DAU went up 20%, but revenue stayed flat. Is that good?", "a": "Not necessarily. More users may be low-value users, usage may not be monetizing, or existing users may be spending less. You need to understand the relationship between acquisition, engagement, conversion, and revenue.", "i": "A metric is only meaningful in the context of the outcome you care about."}, {"cat": "Prioritization", "level": "LEVEL 1 · KNOW IT", "q": "What is RICE prioritization?", "a": "RICE scores initiatives using Reach × Impact × Confidence ÷ Effort. It creates a consistent way to compare opportunities when resources are limited.", "i": "A framework helps expose assumptions. It does not magically make the decision objective."}, {"cat": "Prioritization", "level": "LEVEL 2 · UNDERSTAND IT", "q": "When should you NOT use a prioritization framework?", "a": "When the decision is already constrained by regulation, safety, a hard contractual commitment, or a critical incident. A framework is useful when there is genuine choice.", "i": "Don't use a scoring spreadsheet to manufacture certainty where the constraint is already clear."}, {"cat": "Product Strategy", "level": "LEVEL 2 · UNDERSTAND IT", "q": "What is the difference between product vision and product strategy?", "a": "Vision describes the future you want to create. Strategy describes the choices about where to play, how to win, and what you will deliberately not do to reach that vision.", "i": "If your strategy doesn't involve trade-offs, it is probably a list of aspirations."}, {"cat": "Experimentation", "level": "LEVEL 1 · KNOW IT", "q": "What is a product hypothesis?", "a": "A testable statement connecting an intervention to an expected user or business outcome. Example: “If we simplify checkout, completed purchases will increase.”", "i": "A good hypothesis makes you specify what will change and why."}, {"cat": "Execution", "level": "LEVEL 2 · UNDERSTAND IT", "q": "What makes a good product requirement?", "a": "It clearly explains the user or business problem, desired outcome, constraints, and acceptance criteria while leaving appropriate implementation freedom to the team.", "i": "Requirements should create clarity about the problem and outcome, not prescribe every pixel or line of code."}, {"cat": "PM Interview", "level": "LEVEL 3 · THINK LIKE A PM", "q": "Orders on your food delivery app suddenly fall 15%. What do you do first?", "a": "First clarify the metric and timeframe. Then segment the change by geography, platform, customer type, restaurant, and funnel stage. Check for releases, outages, payment failures, seasonality, and external events before forming and prioritizing hypotheses.", "i": "Don't jump straight to solutions. First determine where the problem actually lives."}];

let order = cards.map((_, i) => i);
let idx = Number(localStorage.getItem("pm_idx") || 0);
let revealed = false;
let startX = 0;

const $ = id => document.getElementById(id);

function render() {
  if (idx >= order.length) {
    $("card").style.display = "none";
    $("controls").style.display = "none";
    $("done").style.display = "block";
    $("bar").style.width = "100%";
    return;
  }
  const c = cards[order[idx]];
  $("done").style.display = "none";
  $("card").style.display = "flex";
  $("controls").style.display = "flex";
  $("category").textContent = c.cat;
  $("count").textContent = `${idx + 1} / ${order.length}`;
  $("bar").style.width = `${(idx / order.length) * 100}%`;
  $("level").textContent = c.level;
  $("question").textContent = c.q;
  $("answerText").textContent = c.a;
  $("instinct").textContent = c.i;
  revealed = false;
  $("answer").classList.remove("show");
  $("hint").textContent = "Tap to reveal";
  $("controls").innerHTML = '<button class="action reveal" id="reveal">Reveal answer</button>';
  $("reveal").onclick = reveal;
}

function reveal() {
  revealed = true;
  $("answer").classList.add("show");
  $("hint").textContent = "Swipe or choose how well you knew it";
  $("controls").innerHTML =
    '<button class="action again" id="again">Again</button>' +
    '<button class="action got" id="got">Got it</button>';
  $("again").onclick = next;
  $("got").onclick = next;
}

function next() {
  idx++;
  localStorage.setItem("pm_idx", idx);
  render();
}

function previous() {
  if (idx > 0) {
    idx--;
    localStorage.setItem("pm_idx", idx);
    render();
  }
}

function shuffle() {
  order.sort(() => Math.random() - 0.5);
  idx = 0;
  localStorage.setItem("pm_idx", 0);
  render();
}

$("card").addEventListener("click", () => {
  if (!revealed) reveal();
});

$("card").addEventListener("touchstart", e => {
  startX = e.changedTouches[0].screenX;
}, {passive:true});

$("card").addEventListener("touchend", e => {
  const dx = e.changedTouches[0].screenX - startX;
  if (Math.abs(dx) > 70) {
    if (dx < 0 && revealed) next();
    if (dx > 0) previous();
  }
}, {passive:true});

$("shuffle").onclick = shuffle;
$("restart").onclick = () => {
  order = cards.map((_, i) => i);
  idx = 0;
  localStorage.setItem("pm_idx", 0);
  render();
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}

render();
