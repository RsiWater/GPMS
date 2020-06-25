const dataSet = {
  domstrings: function() {
    const d = document;
    const sm = d.querySelector(".smt");
    const md = d.querySelector(".mdt");
    const lg = d.querySelector(".lgt");
    const button = d.querySelector(".button");
    const ham1 = d.querySelector(".ham1");
    const ham2 = d.querySelector(".ham2");
    const ham3 = d.querySelector(".ham3");
    const line = d.querySelector(".line");
    const nav = d.querySelector(".nav");
    const strings = [sm, md, lg, button, ham1, ham2, ham3, line,nav];
    return strings;
  },
  blue: function() {
    const drkBlue = "#494ca2";
    const mdBlue = "#8186d5";
    const ltBlue = "#c6cbef";
    const line = `linear-gradient(to right, ${drkBlue} 0%,${drkBlue} 33%,${mdBlue} 33%,${mdBlue} 66%,${ltBlue} 66%, ${ltBlue} 100%)`;
    const blue = [drkBlue, mdBlue, ltBlue, line];
    return blue;
  },
  red: function() {
    const drkRed = "#CD5454";
    const mdRed = "#F1B9B9";
    const ltRed = "#FADFDF";
    const line = `linear-gradient(to right, ${drkRed} 0%,${drkRed} 33%,${mdRed} 33%,${mdRed} 66%,${ltRed} 66%, ${ltRed} 100%)`;
    const red = [drkRed, mdRed, ltRed, line];
    return red;
  },
  orange: function() {
    const drkOrange = "#f68e65";
    const mdOrange = "#fabda5";
    const ltOrange = "#fcd4c5";
    const line = `linear-gradient(to right, ${drkOrange} 0%,${drkOrange} 33%,${mdOrange} 33%,${mdOrange} 66%,${ltOrange} 66%, ${ltOrange} 100%)`;
    const orange = [drkOrange, mdOrange, ltOrange, line];
    return orange;
  },
  yellow: function() {
    const drkYellow = "#ffed61";
    const mdYellow = "#fff5a5";
    const ltYellow = "#fffbd8";
    const line = `linear-gradient(to right, ${drkYellow} 0%,${drkYellow} 33%,${mdYellow} 33%,${mdYellow} 66%,${ltYellow} 66%, ${ltYellow} 100%)`;
    const yellow = [drkYellow, mdYellow, ltYellow, line];
    return yellow;
  },
  black: function() {
    const drkBlack = "#000000";
    const mdBlack = "#3C3C3C";
    const ltBlack = "#5B5B5B";
    const line = `linear-gradient(to right, ${drkBlack} 0%,${drkBlack} 33%,${mdBlack} 33%,${mdBlack} 66%,${ltBlack} 66%, ${ltBlack} 100%)`;
    const black = [drkBlack, mdBlack, ltBlack, line];
    return black;
  },
  purple: function() {
    const drkPurple = "#714288";
    const mdPurple = "#9873b9";
    const ltPurple = "#caabd8";
    const line = `linear-gradient(to right, ${drkPurple} 0%,${drkPurple} 33%,${mdPurple} 33%,${mdPurple} 66%,${ltPurple} 66%, ${ltPurple} 100%)`;
    const purple = [drkPurple, mdPurple, ltPurple, line];
    return purple;
  },
  pink: function() {
    const drkPink = "#f67280";
    const mdPink = "#f9a2ab";
    const ltPink = "#fde2e5";
    const line = `linear-gradient(to right, ${drkPink} 0%,${drkPink} 33%,${mdPink} 33%,${mdPink} 66%,${ltPink} 66%, ${ltPink} 100%)`;
    const pink = [drkPink, mdPink, ltPink, line];
    return pink;
  }
};

const shape = dataSet.domstrings();
const changeColor = function(color) {
  try{
    shape[0].style.fill = color[0];
    shape[1].style.fill = color[1];
    shape[2].style.fill = color[2];
    for (let i = 3; i < shape.length - 1; i++) {
      shape[i].style.background = color[0];
    }
    shape[8].style.background = color[3];
    shape[7].style.backgroundImage = color[3];
  }
  catch
  {
    shape[8].style.background = color[3];
  }
};

const boxes = document.querySelectorAll(".rectangle");
for (const i of boxes) {
  const shape = dataSet.domstrings();
  const changeColor = function(color) {
    shape[0].style.fill = color[0];
    shape[1].style.fill = color[1];
    shape[2].style.fill = color[2];
    for (let i = 3; i < shape.length - 1; i++) {
      shape[i].style.background = color[0];
    }
    shape[8].style.background = color[3];
    shape[7].style.backgroundImage = color[3];
  };

  i.addEventListener("click", function() {
    if (i.classList.contains("red")) {
      changeColor(dataSet.red());
    }
    if (i.classList.contains("orange")) {
      changeColor(dataSet.orange());
    }
    if (i.classList.contains("blue")) {
      changeColor(dataSet.blue());
    }
    if (i.classList.contains("yellow")) {
      changeColor(dataSet.yellow());
    }
    if (i.classList.contains("black")) {
      changeColor(dataSet.black());
    }
    if (i.classList.contains("purple")) {
      changeColor(dataSet.purple());
    }
    if (i.classList.contains("pink")) {
      changeColor(dataSet.pink());
    }
  });
}

const empty = ''
$.ajax({
  url: '/systemManage/themePicker/changeColor', //待修改
  type: 'POST',
  data: empty,
  datatype: 'json',
}).done(function(rcvMessage)
{
  switch(rcvMessage.themeType)
  {
    case 0:
      changeColor(dataSet.red());
      break;
    case 1:
      changeColor(dataSet.orange());
      break;
    case 2:
      changeColor(dataSet.black());
      break;
    case 3:
      changeColor(dataSet.blue());
      break;
    case 4:
      changeColor(dataSet.purple());
      break;
    case 5:
      changeColor(dataSet.pink());
      break;
    default:
      changeColor(dataSet.black());
  }
})

$(document).ready(function(){
  $("ul").delay(200).fadeIn(1500);
});

