true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const style = '';

(function(){try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".text-interface{padding-left:1em;padding-right:1em;width:100%;height:100%;--offwhite: var(--ti-offwhite, #aaa);--grey: var(--ti-grey, #888);--black: var(--ti-black, #222);--white: var(--ti-white, #fefefe);--font: var(--ti-font, Roboto, sans-serif);--output-font: var(--ti-output-font, monospace);background-color:var(--black, #222);color:var(--white, #fefefe);position:sticky;top:0;max-height:var(--ti-max-height, 90vh);overflow-y:scroll;margin-right:auto;margin-left:auto;max-width:var(--ti-max-width, 28em);min-width:var(--ti-min-width, 20em);font-family:var(--font, Roboto, sans-serif);font-size:var(--ti-font-size, 1em)}.text-interface h2{position:sticky;top:0;background-color:var(--black, #222);margin:0;padding-top:1em;padding-bottom:1em;border-bottom:1px dotted var(--grey, #888)}.text-interface .input-wrap{border:1px dotted var(--grey, #888);padding:1em;margin-top:1em;margin-bottom:1em;opacity:.1;font-family:var(--output-font, monospace)}.text-interface .input-wrap.active{opacity:1}.text-interface .placeholder{font-style:italic;color:var(--offwhite, #aaa)}.output img{margin:1em;max-width:80%;animation:fade-in .5s}.output{font-family:var(--output-font, monospace)}.output.echo{color:var(--ti-echo-color, var(--offwhite, #aaa));font-family:var(--echo-font, var(--output-font, monospace))}@keyframes fade-in{0%{opacity:0;transform:scale(0);transform-origin:top left}to{opacity:1;transform:scale(1)}}.text-interface::-webkit-scrollbar{width:8px}.text-interface::-webkit-scrollbar-track{background:var(--ti-scroll-track-color, var(--black, #222));border-radius:10px}.text-interface::-webkit-scrollbar-thumb{background-color:var(--ti-scroll-thumb-color, var(--grey, #888));border-radius:10px;border:2px solid var(--black, #222)}.text-interface::-webkit-scrollbar-thumb:hover{background-color:var(--ti-scroll-thumb-hover-color, #555)}.text-interface::-webkit-scrollbar-thumb:active{background-color:var(--ti-scroll-thumb-active-color, #333)}")),document.head.appendChild(t);}}catch(o){console.error("vite-plugin-css-injected-by-js",o);}})();
const r = ["yes", "yeah", "yep", "yup", "true", "t", "y", "aye", "yup"], o = ["no", "n", "false", "f", "nope", "nah"];
class a {
  constructor(t = document.body, e = "Text Interface") {
    this.listener = null, this.outputAnimationLength = 800, this.outputDelay = 300, this.shouldStealFocus = !1, this.scrollOptions = {
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    }, this.outputQueue = [], this.div = document.createElement("div"), this.div.classList.add("text-interface"), t.appendChild(this.div), this.div.innerHTML = `
      <h2 class="ti-title">${e}</h2>
      <div class="output">
      </div>
      <div class="input-wrap">
          <div 
             class="input" 
             contenteditable 
             placeholder="Type here...">
          </div>
          <div class="placeholder">Type and hit return...</div>
      </div>
    `, this.inputWrap = this.div.querySelector(".input-wrap"), this.inputEl = this.div.querySelector(".input"), this.outputEl = this.div.querySelector(".output"), this.placeholderEl = this.div.querySelector(
      ".placeholder"
    ), this.setupInputListener(), this.shouldStealFocus && this.inputEl.focus();
  }
  setTitle(t) {
    this.div.querySelector(".ti-title").textContent = t;
  }
  clear() {
    this.outputEl.innerHTML = "";
  }
  setScrollOptions(t) {
    this.scrollOptions = t;
  }
  async readChoice(t, e = "Choose one of the following:", i = "You must choose one of the options!") {
    this.output(e);
    for (let u = 0; u < t.length; u++)
      this.output(`${u + 1}. ${t[u]}`);
    let s = await this.readText();
    if (t.indexOf(s) > -1)
      return s;
    if (s = s.replace(/\D/g, ""), s != "") {
      let u = Number(s);
      if (!isNaN(u) && u <= t.length && u > 0)
        return t[Math.floor(u) - 1];
    }
    return this.output(i), await this.readChoice(t, e, i);
  }
  async readYesOrNo(t = "Say yes or no!") {
    let e = await this.readText();
    return e = e.toLowerCase(), e = e.replace(/\s+/, ""), r.indexOf(e) > -1 ? !0 : o.indexOf(e) > -1 ? !1 : (this.output(t), await this.readYesOrNo(t));
  }
  async readNumber(t = "Please type a number") {
    let e = await this.readText(), i = Number(e);
    return isNaN(i) ? (this.output(t), this.readNumber(t)) : i;
  }
  async readInteger(t = "Please type a whole number") {
    let e = await this.readText(), i = Number(e);
    return isNaN(i) || i % 1 != 0 ? (this.output(t), this.readInteger(t)) : i;
  }
  async readIntegerInRange(t, e, i = `Please type a whole number within the range of ${t} and ${e}`) {
    let s = await this.readText(), n = Number(s);
    return isNaN(n) || n % 1 != 0 || n > e || n < t ? (this.output(i), await this.readIntegerInRange(t, e, i)) : n;
  }
  async readNumberInRange(t, e, i = `Please type a whole number within the range of ${t} and ${e}`) {
    let s = await this.readText(), n = Number(s);
    return isNaN(n) || n > e || n < t ? (this.output(i), await this.readNumberInRange(t, e, i)) : n;
  }
  readText() {
    return this.shouldStealFocus && this.inputEl.focus(), this.inputWrap.classList.add("active"), this.inputWrap.scrollIntoView(
      this.scrollOptions
    ), new Promise((t, e) => {
      this.listener = t;
    });
  }
  prompt(t) {
    return this.output(t), this.readText();
  }
  promptYesOrNo(t) {
    return this.output(t), this.readYesOrNo();
  }
  promptNumber(t, e) {
    return this.output(t), this.readNumber(e);
  }
  promptInteger(t, e) {
    return this.output(t), this.readInteger(e);
  }
  promptNumberInRange(t, e, i, s) {
    return this.output(t), this.readNumberInRange(e, i, s);
  }
  promptIntegerInRange(t, e, i, s) {
    return this.output(t), this.readIntegerInRange(e, i, s);
  }
  showElement(t) {
    this.outputting ? this.outputQueue.push(["element", t]) : (this.outputting = !0, this.outputEl.appendChild(t), t.scrollIntoView(this.scrollOptions), setTimeout(() => {
      this.outputting = !1, this.doNextOutput();
    }, this.outputDelay));
  }
  showHTML(t) {
    let e = document.createElement("div");
    e.innerHTML = t, this.showElement(e);
  }
  showImage(t, e = "An image") {
    let i = document.createElement("img");
    i.setAttribute("src", t), i.setAttribute("alt", e), this.showElement(i);
  }
  output(t, e = !1) {
    if (t = "" + t, this.outputting)
      this.outputQueue.push(["text", t, e]);
    else {
      let i = document.createElement("div");
      if (i.classList.add("output"), e && i.classList.add("echo"), !this.outputAnimationLength || e)
        i.textContent = t;
      else {
        this.outputting = !0;
        let s = this.outputAnimationLength / t.length;
        const n = () => {
          if (t[0] === `
`) {
            const u = document.createElement("br");
            i.appendChild(u);
          } else {
            const u = document.createTextNode(t[0] || "");
            i.appendChild(u);
          }
          t = t.substring(1), t.length ? setTimeout(n, s) : (this.outputting = !1, this.doNextOutput());
        };
        setTimeout(n, this.outputDelay);
      }
      this.outputEl.appendChild(i), i.scrollIntoView(this.scrollOptions);
    }
  }
  doNextOutput() {
    if (this.outputQueue.length) {
      let t = this.outputQueue[0];
      this.outputQueue = this.outputQueue.slice(1);
      let e = t[0], i = t.slice(1);
      e == "text" ? this.output(...i) : this.showElement(...i);
    }
  }
  setupInputListener() {
    this.inputEl.addEventListener("keyup", (t) => {
      if (t.code == "Enter" || t.key == "Enter") {
        let i = this.inputEl.textContent.replace(/\n$/, "");
        this.output(i, !0), this.listener && (this.listener(i), this.listener = null), this.inputWrap.classList.remove("active"), setTimeout(() => {
          this.inputEl.textContent = "";
        }, 1);
      }
    }), this.placeholderEl.addEventListener("click", () => this.inputEl.focus());
  }
}

let app = document.querySelector("#app");
// Create a new "Text Interface"
let ti = new a(app, "Linux Distro Guessing Game");
let greaterThanD;
let isDebian;
let isFedora;
let no = false;
ti.output("Welcome to the Linux distro Guessing Program!");
ti.output("This program has a list of the 10 most well-known Linux distros.");
let greaterThanF = await (ti.promptYesOrNo("Is your distro greater than or equal to the letter F?"));
if (greaterThanF===true){
  let greaterThanL = await (ti.promptYesOrNo("Is your distro greater than or equal to the letter L?"));
  if (greaterThanL===true){
    let isManjaro = await ti.promptYesOrNo("Is your distro Manjaro?");
    if (isManjaro===true){
      ti.output("yay i did it lets goooo");
    }else {
      let isUbuntu = await ti.promptYesOrNo("Is your distro Ubuntu?");
      if (isUbuntu===true){
        ti.output ("dude why are you using Ubuntu, go use Debian like a real linux user");
      }else {
        let isLinuxMint = await ti.promptYesOrNo("is your distro Linux Mint?");
        if (isLinuxMint===true){
          ti.output("yay i did it");
        }if (isLinuxMint===false) {
        no = true;
        alert("Error 404: Distro Not Found. Continuing list...");
        }
      }
    }
  }else {
    let greaterThanG = await ti.promptYesOrNo("Is your distro greater than or equal to the letter G?");
    if (greaterThanG===true){
      let isKDE = await ti.promptYesOrNo("Is your distro KDE Neon?");
      if (isKDE===true){
        ti.output("yay lets go i did it");
      }else {
        let isGentoo = await ti.promptYesOrNo("Is your distro Gentoo?");
        if (isGentoo===true){
          ti.output("yay i did it woooooooo");
        }else {
          no = true;
          alert("alright, i give up. I'll ask about Arch since you seem like an Arch user.");
        }
      }
      }else {
        isFedora = await ti.promptYesOrNo("Is your distro Fedora?");
        }if (isFedora===true){
          ti.output("yayyy");
      }
    }
  
} else {
  greaterThanD = await ti.promptYesOrNo("Is your distro greater than or equal to the letter D?");
}if (greaterThanD===true){
  let isElementary = await ti.promptYesOrNo("Is your distro ElementaryOS");
  if (isElementary===true){
    ti.output("yay I did it lets gooooooo");
  }else {
    isDebian = await ti.promptYesOrNo("is your distro Debian?");
  }if (isDebian===true){
    ti.output ("yay I did it lets gooooooo");
  } if (isDebian===false && isElementary===false){
    no = true;
    alert("no.");
  }
}else {
  let isArch = await ti.promptYesOrNo("Is your distro Arch Linux?");
  if (isArch===true){
    ti.output("what are you doing on this webpage, go compile your kernel you nerd");
  }else {
    let isCatchyOS = await ti.promptYesOrNo("Is your distro CatchyOS?");
    if (isCatchyOS===true){
      ti.output("yay i did it lets gooooooo");
    }else {
      no = true;
      alert("EXTREMELY LOUD INCORRECT BUZZER NOISE");
    }
  }
}
if (no===false) ti.output("Thank you for playing! See you soon!!");
if (no===true) ti.output ("get out of here.");
