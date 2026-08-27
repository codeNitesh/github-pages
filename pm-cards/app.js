const cards=[
{cat:"Product Fundamentals",level:"LEVEL 1 · KNOW IT",q:"What does a Product Manager actually own?",a:"A PM owns the product outcome, not every task required to build the product. They align customer problems, business goals, priorities, and execution.",i:"Your job is not to be the person with all the answers. Your job is to make sure the team is solving the right problem."},
{cat:"Product Fundamentals",level:"LEVEL 1 · KNOW IT",q:"What is the difference between product discovery and delivery?",a:"Discovery reduces uncertainty about what to build and why. Delivery turns a validated direction into a reliable product experience.",i:"Discovery asks “should we build this?” Delivery asks “how do we ship this well?”"},
{cat:"Product Sense",level:"LEVEL 1 · KNOW IT",q:"What is the difference between a user problem and a feature request?",a:"A problem describes an unmet need or pain. A feature request is one proposed solution. Strong PMs investigate the problem before accepting the proposed solution.",i:"When someone says “we need a button,” ask what the user is trying to accomplish."},
{cat:"Product Sense",level:"LEVEL 1 · KNOW IT",q:"What is an MVP?",a:"An MVP is the smallest product or experiment that can generate meaningful learning about a key assumption, without unnecessary scope.",i:"MVP does not mean “bad version of the product.” It means minimum scope for maximum learning."},
{cat:"Metrics",level:"LEVEL 1 · KNOW IT",q:"What is a North Star Metric?",a:"A metric that represents the core value your product delivers to customers and is meaningfully connected to long-term business success.",i:"Start with customer value, not the easiest number to put on a dashboard."},
{cat:"Metrics",level:"LEVEL 2 · UNDERSTAND IT",q:"DAU went up 20%, but revenue stayed flat. Is that good?",a:"Not necessarily. More users may be low-value users, usage may not be monetizing, or existing users may be spending less. You need to understand the relationship between acquisition, engagement, conversion, and revenue.",i:"A metric is only meaningful in the context of the outcome you care about."},
{cat:"Metrics",level:"LEVEL 2 · UNDERSTAND IT",q:"What is the difference between a leading and lagging metric?",a:"A leading metric tends to move before the outcome you care about, while a lagging metric reflects the outcome after it has happened.",i:"Use leading indicators to steer and lagging indicators to judge the result."},
{cat:"Prioritization",level:"LEVEL 1 · KNOW IT",q:"What is RICE prioritization?",a:"RICE scores initiatives using Reach × Impact × Confidence ÷ Effort. It creates a consistent way to compare opportunities when resources are limited.",i:"A framework helps expose assumptions. It does not magically make the decision objective."},
{cat:"Prioritization",level:"LEVEL 2 · UNDERSTAND IT",q:"When should you NOT use a prioritization framework?",a:"When the decision is already constrained by regulation, safety, a hard contractual commitment, or a critical incident. A framework is useful when there is genuine choice.",i:"Don't use a scoring spreadsheet to manufacture certainty where the constraint is already clear."},
{cat:"Product Strategy",level:"LEVEL 2 · UNDERSTAND IT",q:"What is the difference between product vision and product strategy?",a:"Vision describes the future you want to create. Strategy describes the choices about where to play, how to win, and what you will deliberately not do to reach that vision.",i:"If your strategy doesn't involve trade-offs, it is probably a list of aspirations."},
{cat:"Execution",level:"LEVEL 2 · UNDERSTAND IT",q:"What makes a good product requirement?",a:"It clearly explains the user or business problem, desired outcome, constraints, and acceptance criteria while leaving implementation freedom to the team.",i:"Requirements should create clarity about the problem and outcome, not prescribe every pixel or line of code."},
{cat:"Experimentation",level:"LEVEL 1 · KNOW IT",q:"What is a product hypothesis?",a:"A testable statement connecting an intervention to an expected user or business outcome.",i:"A good hypothesis makes you specify what will change and why."},
{cat:"Technical PM",level:"LEVEL 1 · KNOW IT",q:"What is an API?",a:"An API is a defined interface that lets one software component request data or actions from another component in a predictable way.",i:"As a PM, focus on the contract, dependencies, failure modes, and user impact."},
{cat:"Fintech",level:"LEVEL 2 · UNDERSTAND IT",q:"Why can lending growth be dangerous even when disbursals are rising?",a:"Rapid disbursal growth can come with deteriorating credit quality, fraud, or acquisition economics. A lender must balance growth with repayment performance and risk-adjusted returns.",i:"In fintech, growth without risk context can be a misleading success metric."},
{cat:"Interview Cases",level:"LEVEL 3 · THINK LIKE A PM",q:"Orders on your food delivery app suddenly fall 15%. What do you do first?",a:"First clarify the metric and timeframe. Then segment the change by geography, platform, customer type, restaurant, and funnel stage. Check for releases, outages, payment failures, seasonality, and external events before forming hypotheses.",i:"Don't jump straight to solutions. First determine where the problem actually lives."}
];

const sections=[
["Product Fundamentals","🟢"],["Product Sense","🟢"],["Metrics","🟡"],["Prioritization","🟡"],["Product Strategy","🟡"],
["Execution","🟡"],["Experimentation","🟡"],["Technical PM","🔵"],["Fintech","🔴"],["Interview Cases","🔴"]
];
const $=id=>document.getElementById(id);
let currentSection=localStorage.getItem("pm_section")||"Product Fundamentals";
let sectionCards=[],idx=0,revealed=false,startX=0;

function buildSection(){sectionCards=cards.map((c,i)=>({c,i})).filter(x=>x.c.cat===currentSection);idx=Math.min(Number(localStorage.getItem("pm_idx_"+currentSection)||0),Math.max(0,sectionCards.length-1))}
function completedCount(name){return Math.min(Number(localStorage.getItem("pm_completed_"+name)||0),cards.filter(c=>c.cat===name).length)}
function renderMenu(){
 $("deckList").innerHTML="";
 sections.forEach(([name,dot])=>{const total=cards.filter(c=>c.cat===name).length,done=completedCount(name),b=document.createElement("button");b.className="deck-item"+(name===currentSection?" current":"");b.innerHTML=`<span class="dot">${dot}</span><span class="deck-name">${name}</span><span class="deck-count">${done}/${total}</span>${name===currentSection?'<span class="current-mark">CURRENT</span>':''}`;b.onclick=()=>selectSection(name);$("deckList").appendChild(b)});
 $("overallCount").textContent=`${sections.reduce((n,[name])=>n+completedCount(name),0)}/${cards.length}`;
}
function render(){
 renderMenu(); if(!sectionCards.length)return;
 $("done").style.display="none";$("card").style.display="flex";$("controls").style.display="flex";
 const c=sectionCards[idx].c;$("category").textContent=c.cat;$("count").textContent=idx+1;$("total").textContent=sectionCards.length;$("bar").style.width=`${(idx/sectionCards.length)*100}%`;
 $("level").textContent=c.level;$("question").textContent=c.q;$("answerText").textContent=c.a;$("instinct").textContent=c.i;revealed=false;$("answer").classList.remove("show");$("hint").textContent="Tap to reveal";
 $("controls").innerHTML='<button class="action reveal" id="reveal">Reveal answer</button>';$("reveal").onclick=reveal;
}
function reveal(){revealed=true;$("answer").classList.add("show");$("hint").textContent="Swipe or choose how well you knew it";$("controls").innerHTML='<button class="action again" id="again">Again</button><button class="action got" id="got">Got it</button>';$("again").onclick=next;$("got").onclick=next}
function next(){if(idx<sectionCards.length-1){idx++;localStorage.setItem("pm_idx_"+currentSection,idx);render()}else{localStorage.setItem("pm_completed_"+currentSection,sectionCards.length);$("bar").style.width="100%";$("card").style.display="none";$("controls").style.display="none";$("done").style.display="block";renderMenu()}}
function previous(){if(idx>0){idx--;localStorage.setItem("pm_idx_"+currentSection,idx);render()}}
function selectSection(name){currentSection=name;localStorage.setItem("pm_section",name);buildSection();closeMenu();render()}
function openMenu(){document.body.classList.add("menu-open")}function closeMenu(){document.body.classList.remove("menu-open")}
function shuffle(){sectionCards.sort(()=>Math.random()-.5);idx=0;localStorage.setItem("pm_idx_"+currentSection,0);render()}
$("menu").onclick=openMenu;$("closeMenu").onclick=closeMenu;$("scrim").onclick=closeMenu;$("shuffle").onclick=shuffle;
$("restart").onclick=()=>{idx=0;localStorage.setItem("pm_idx_"+currentSection,0);render()};
$("card").addEventListener("click",()=>{if(!revealed)reveal()});
$("card").addEventListener("touchstart",e=>startX=e.changedTouches[0].screenX,{passive:true});
$("card").addEventListener("touchend",e=>{const dx=e.changedTouches[0].screenX-startX;if(Math.abs(dx)>70){if(dx<0&&revealed)next();if(dx>0)previous()}},{passive:true});
buildSection();render();
