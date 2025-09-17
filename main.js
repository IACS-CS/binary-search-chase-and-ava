import "./style.css";
import { TextInterface } from "text-interface";

let app = document.querySelector("#app");
// Create a new "Text Interface"
let ti = new TextInterface(app, "Linux Distro Guessing Game");
let greaterThanD;
let isDebian;
let no = false;
ti.output("Welcome to the Linux distro Guessing Program!");
ti.output("This program has a list of the 10 most well-known Linux distros.");
let greaterThanF = await (ti.promptYesOrNo("Is your distro greater than or equal to the letter F?"));
if (greaterThanF===true){
  let greaterThanL = await (ti.promptYesOrNo("Is your distro greater than or equal to the letter L?"));
  if (greaterThanL===true){
    let isManjaro = await ti.promptYesOrNo("Is your distro Manjaro?");
    if (isManjaro===true){
      ti.output("yay i did it lets goooo")
    }else{
      let isUbuntu = await ti.promptYesOrNo("Is your distro Ubuntu?");
      if (isUbuntu===true){
        ti.output ("yay i did it lets goooo");
      }else{
        let isFedora = await ti.promptYesOrNo("is your distro Fedora?")
        if (isFedora===true){
          ti.output("yay i did it");
        }
      }
    }
  }else{
    let greaterThanG = await ti.promptYesOrNo("Is your distro greater than or equal to the letter G?");
    if (greaterThanG===true){
      let isKDE = await ti.promptYesOrNo("Is your distro KDE Neon?");
      if (isKDE===true){
        ti.output("yay lets go i did it");
      }else{
        let isGentoo = await ti.promptYesOrNo("Is your distro Gentoo?");
        if (isGentoo===true){
          ti.output("yay i did it woooooooo")
        }
      }
      }else{
        let isFedora = await ti.promptYesOrNo("Is your distro Fedora?");
        }if (isFedora===true){
          ti.output("yayyy");
      }
    }
  
} else {
  greaterThanD = await ti.promptYesOrNo("Is your distro greater than or equal to the letter D?");
}if (greaterThanD===true){
  let isElementary = await ti.promptYesOrNo("Is your distro ElementaryOS");
  if (isElementary===true){
    ti.output("yay I did it lets gooooooo")
  }else{
    isDebian = await ti.promptYesOrNo("is your distro Debian?");
  }if (isDebian===true){
    ti.output ("yay I did it lets gooooooo");
  }else{
    no = true
    alert("no.")
  }
}
if (no===false) ti.output("Thank you for playing! See you soon!!")
if (no===true) ti.output ("get out of here.")