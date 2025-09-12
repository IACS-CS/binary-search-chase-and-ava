import "./style.css";
import { TextInterface } from "text-interface";

let app = document.querySelector("#app");
// Create a new "Text Interface"
let ti = new TextInterface(app, "Linux Distro Guessing Game");
ti.output("Welcome to the Linux distro Guessing Program!");
ti.output("This program has a list of the 20 most well-known Linux distros.");
let above10 = await (ti.promptYesOrNo("Does your distro start with the letters K and D?"));
if (above10===true){
  let greaterThan5 = await (ti.promptYesOrNo("THIS IS A PLACEHOLDER TO MAKE THE CODE COMMIT PROPERLY"));
} else {
  ti.output("THIS IS YET ANOTHER PIECE OF PLACEHOLDER TEXT. SORRY!");
}