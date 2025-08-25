// --- Challenges ---
const challenges = [
  { title:"Хоёр тоо нэмэх", description:"Write add(a,b) that returns sum.", functionName:"add", testCases:[{input:[1,2],output:3},{input:[5,7],output:12}] },
  { title:"Мөр эргүүлэх", description:"Write reverseStr(str) that reverses.", functionName:"reverseStr", testCases:[{input:["hello"],output:"olleh"}] },
  { title:"Хамгийн ихийг олох", description:"Write maxNum(arr) returns biggest.", functionName:"maxNum", testCases:[{input:[[1,5,3]],output:5}] },
  { title:"Массивын нийлбэр", description:"Write sumArray(arr) sums all numbers.", functionName:"sumArray", testCases:[{input:[[1,2,3]],output:6},{input:[[5,5,5]],output:15}] },
  { title:"Тэгш эсэх шалгах", description:"Write isEven(num) returns true if even.", functionName:"isEven", testCases:[{input:[2],output:true},{input:[5],output:false}] },
  { title:"Факториал", description:"Write factorial(n) returns n!.", functionName:"factorial", testCases:[{input:[3],output:6},{input:[5],output:120}] },
  { title:"Палиндром эсэх", description:"Write isPalindrome(str) true if palindrome.", functionName:"isPalindrome", testCases:[{input:["racecar"],output:true},{input:["hello"],output:false}] },
  { title:"Фибоначчи", description:"Write fib(n) returns nth Fibonacci.", functionName:"fib", testCases:[{input:[5],output:5},{input:[7],output:13}] },
  { title:"Үгийг том үсгээр эхлүүлэх", description:"Write capitalizeWords(str) capitalizes each word.", functionName:"capitalizeWords", testCases:[{input:["hello world"],output:"Hello World"}] },
  { title:"Массив урвуулах", description:"Write reverseArray(arr) reverses array.", functionName:"reverseArray", testCases:[{input:[[1,2,3]],output:[3,2,1]}] }
];

let currentChallenge = null;
let currentUser = localStorage.getItem("currentUser") || null;

// --- Populate challenge list ---
const challengeItems = document.getElementById("challenge-items");
challenges.forEach((ch, i) => {
  const li = document.createElement("li");
  li.innerText = `${i+1}. ${ch.title}`;
  li.onclick = () => loadChallenge(i);
  challengeItems.appendChild(li);
});

// --- Load Challenge ---
function loadChallenge(index) {
  currentChallenge = challenges[index];
  document.getElementById("challenge-title").innerText = currentChallenge.title;
  document.getElementById("challenge-desc").innerText = currentChallenge.description;
  document.getElementById("code-editor").value = `function ${currentChallenge.functionName}() {\n  // your code here\n}`;
  document.getElementById("output").innerText = "";
}

// --- Run Code ---
function runCode() {
  if (!currentChallenge) { alert("Select a challenge first!"); return; }
  if (!currentUser) { alert("Login first!"); return; }

  const code = document.getElementById("code-editor").value;
  let resultOutput = "";
  let passed = 0;

  try {
    eval(code);
    currentChallenge.testCases.forEach((tc,i)=>{
      const func = eval(currentChallenge.functionName);
      const result = func(...tc.input);
      if(JSON.stringify(result) === JSON.stringify(tc.output)){
        resultOutput += `✔️ Test ${i+1} passed\n`;
        passed++;
      }else{
        resultOutput += `❌ Test ${i+1} failed. Expected ${tc.output}, got ${result}\n`;
      }
    });
  }catch(err){
    resultOutput = "Error: " + err.message;
  }

  document.getElementById("output").innerText = resultOutput;
  saveScore(currentUser, passed);
  showLeaderboard();
}

// --- Login ---
function login() {
  const name = document.getElementById("username").value.trim();
  if(name){
    currentUser = name;
    localStorage.setItem("currentUser", name);
    document.getElementById("login-section").innerHTML = `<p>Welcome, ${name}!</p>`;
  }
}

// --- Leaderboard ---
function saveScore(username, score){
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({username,score,date:new Date().toLocaleString()});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
}

function showLeaderboard(){
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let html = "<h3>Leaderboard</h3><ol>";
  leaderboard.forEach(user=>{
    html += `<li>${user.username} - ${user.score} points</li>`;
  });
  html += "</ol>";
  document.getElementById("leaderboard").innerHTML = html;
}

// --- Initialize App ---
window.onload = function(){
  if(currentUser){
    document.getElementById("login-section").innerHTML = `<p>Welcome, ${currentUser}!</p>`;
  }
  showLeaderboard();
};
