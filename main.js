import "./style.css";
import { TextInterface } from "text-interface";

let app = document.querySelector("#app");
// Create a new "Text Interface"
let ti = new TextInterface(app, "Linux Distro Guessing Game");
let greaterThanD;
let isDebian;
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
        let isFedora = ("is your distro Fedora?")
        if (isFedora===true){
          ti.output("yay i did it");
        }
      }
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
    ti.output("no.")
  }
}