import "./style.css";
import { TextInterface } from "text-interface";

let app = document.querySelector("#app");
// Create a new "Text Interface"
let ti = new TextInterface(app, "Linux");
ti.output("Welcome to the Linux distro. Guess your program!");
let above10 = (ti.promptYesOrNo("Does your distro start with K and D?"));
if (above10===1){
  let greaterThan5 =
}