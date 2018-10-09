var Param = {
  debug: 0,
  speed: 1,
  globalTime: 558000,
  period: 0,
  namePeriod: "",
  passTime: 0,
  stateId: 0,
  stateTime: 0,
  badStateTime: 0,
  Ha: 50,
  Hs: 50,
  Lt: 11,
  Tp: 11
};

document.querySelector("#start").addEventListener("click", function() {
  document.querySelector(".unstarted").style.display = "none";
  document.querySelector(".started").style.display = "flex";
  document.querySelector(".parameters").style.display = "flex";

  var Ticker = setInterval(function() {
    Tamagochi();
  }, Param.speed);

  function Tamagochi() {
    var StateArr = [
      ["pot", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Горшок"], //0
      ["seed", 1440, 0, 0, 35, 60, 0, 0, 18, 26, "Семя"], //1
      ["sprout", 5040, 50, 90, 35, 60, 40, 100, 18, 26, "Росток"], //2
      ["sprout2", 10080, 50, 90, 35, 60, 40, 100, 18, 26, "Росток+"], //3
      ["bud", 5400, 50, 90, 35, 60, 40, 100, 18, 26, "Бутон"], //4
      ["flower", 8640, 50, 90, 35, 60, 40, 100, 18, 26, "Цветок"], //5
      ["ovary", 14400, 50, 90, 35, 60, 40, 100, 18, 26, "Завязь"], //6
      ["fetus", 10080, 50, 90, 35, 60, 40, 100, 18, 26, "Плод"], //7
      ["wither3", 17280, 50, 90, 35, 60, 40, 100, 18, 26, "Росток+ завял"], //8
      ["wither4", 17280, 50, 90, 35, 60, 40, 100, 18, 26, "Бутон завял"], //9
      ["wither5", 17280, 50, 90, 35, 60, 40, 100, 18, 26, "Цветок завял"], //10
      ["wither6", 17280, 50, 90, 35, 60, 40, 100, 18, 26, "Завязь завяла"], //11
      ["wither7", 17280, 50, 90, 35, 60, 40, 100, 18, 26, "Плод завял"], //12
      ["death1", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Семя умерло"], //13
      ["death2", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Росток умер"], //14
      ["death3", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Росток+ умер"], //15
      ["death4", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Бутон умер"], //16
      ["death5", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Цветок умер"], //17
      ["death6", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Завязь умерла"], //18
      ["death7", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Плод умер"], //19
      ["end", 0, 0, 0, 0, 0, 0, 0, 0, 0, "Конец цикла"] //20
    ];

    var transition = [
      [1], //0
      [2, 13], //1
      [3, 14], //2
      [4, 8], //3
      [5, 9], //4
      [6, 10], //5
      [7, 11], //6
      [20, 12], //7
      [3, 15], //8
      [4, 16], //9
      [5, 17], //10
      [6, 18], //11
      [7, 19] //12
    ];

    if (Param.debug == 1) debuger();
    Timer();
    PeriodDay();
    AirHumidity();
    SoilHumidity();
    Light();
    Temperature();
    Jump2State();
    InfoParam();

    function Timer() {
      Param.globalTime--;
      Param.stateTime--;
      Param.passTime++;
    }

    //Время суток
    function PeriodDay() {
      if (Param.passTime % 900 == 0) {
        Param.period++;
        if (Param.period == 4) {
          Param.period = 0;
        }
      }

      var namePeriod = ["morning", "day", "eve", "night"];
      Param.namePeriod = namePeriod[Param.period];
      document.querySelector(".backImage").id = Param.namePeriod;
    }

    function Time() {
      var time = new Date(Param.passTime * 1000 + 3600 * 1000);
      var minute = time.getMinutes();
      var hour = time.getHours();
      if (String(minute).length < 2) {
        minute = "0" + String(minute);
      }
      if (String(hour).length < 2) {
        hour = "0" + String(hour);
      }
      return hour + ":" + minute;
    }

    //Влажность воздуха
    function AirHumidity() {
      if (Param.Ha > 0 && Param.Ha < 100) {
        if (Param.passTime % 24 == 0) {
          if (Param.period != 0) {
            Param.Ha--;
          } else {
            Param.Ha++;
          }
        }
      }
      if (Param.Ha == 0) {
        Param.Ha = 1;
      }
      if (Param.Ha == 100) {
        Param.Ha = 99;
      }
    }
    //Влажность земли
    function SoilHumidity() {
      if (Param.Hs > 0 && Param.Hs < 100) {
        if (Param.passTime % 48 == 0) {
          if (Param.period != 0) {
            Param.Hs--;
          } else {
            Param.Hs++;
          }
        }
      }
      if (Param.Hs < 1) {
        Param.Hs = 1;
      }
      if (Param.Hs > 99) {
        Param.Hs = 99;
      }
    }
    function Light() {
      if (Param.Lt > 10 && Param.Lt < 100) {
        if (Param.period >= 2) {
          Param.Lt--;
        } else {
          Param.Lt++;
        }
      }
      if (Param.Lt < 10) {
        Param.Lt = 11;
      }
      if (Param.Lt > 99) {
        Param.Lt = 99;
      }
    }
    //Температура
    function Temperature() {
      if (Param.Tp > 11 && Param.Tp < 35) {
        if (Param.passTime % 180 == 0) {
          if (Param.period > 1) {
            Param.Tp--;
          } else {
            Param.Tp++;
          }
        }
      }
      if (Param.Tp < 11) {
        Param.Tp = 11;
      }
      if (Param.Tp > 35) {
        Param.Tp = 35;
      }
    }
    function Jump2State() {
      document.querySelector(".frontImage").id = StateArr[Param.stateId][0];
      var error = 0;
      //Проверка влажности воздуха
      if (StateArr[Param.stateId][2] != 0 && StateArr[Param.stateId][3] != 0) {
        if (
          !(
            Param.Ha >= StateArr[Param.stateId][2] &&
            Param.Ha <= StateArr[Param.stateId][3]
          )
        ) {
          error++;
          document.querySelector("#LoadPBHa").style.background = "red";
        } else {
          document.querySelector("#LoadPBHa").style.background = "green";
        }
      }
      //Проверка влажности земли
      if (StateArr[Param.stateId][4] != 0 && StateArr[Param.stateId][5] != 0) {
        if (
          !(
            Param.Hs >= StateArr[Param.stateId][4] &&
            Param.Hs <= StateArr[Param.stateId][5]
          )
        ) {
          error++;
          document.querySelector("#LoadPBHs").style.background = "red";
        } else {
          document.querySelector("#LoadPBHs").style.background = "green";
        }
      }
      //Проверка освещенности
      if (StateArr[Param.stateId][6] != 0 && StateArr[Param.stateId][7] != 0) {
        if (
          !(
            Param.Lt >= StateArr[Param.stateId][6] &&
            Param.Lt <= StateArr[Param.stateId][7]
          )
        ) {
          error++;
          document.querySelector("#LoadPBLt").style.background = "red";
        } else {
          document.querySelector("#LoadPBLt").style.background = "green";
        }
      }
      //Проверка температуры
      if (StateArr[Param.stateId][8] != 0 && StateArr[Param.stateId][9] != 0) {
        if (
          !(
            Param.Tp >= StateArr[Param.stateId][8] &&
            Param.Tp <= StateArr[Param.stateId][9]
          )
        ) {
          error++;
          document.querySelector("#LoadPBTp").style.color = "red";
        } else {
          document.querySelector("#LoadPBTp").style.color = "green";
        }
      }
      //Несоответствие условиям
      if (error > 1) {
        Param.badStateTime++;
      } else {
        Param.badStateTime = 0;
      }
      //Переходы по нормальным состояниям
      //Вход в игру(костыль)
      if (Param.stateId == 0 && Param.stateTime < 1) {
        Param.stateTime = StateArr[transition[Param.stateId][0]][1];
        Param.stateId = transition[Param.stateId][0];
      }
      //Переход к нормальным состояниям
      if (
        (Param.stateId == 1 ||
          Param.stateId == 2 ||
          Param.stateId == 3 ||
          Param.stateId == 4 ||
          Param.stateId == 5 ||
          Param.stateId == 6 ||
          Param.stateId == 7) &&
        error < 2 &&
        Param.stateTime < 1
      ) {
        Param.stateTime = StateArr[transition[Param.stateId][0]][1];
        Param.stateId = transition[Param.stateId][0];
        document.querySelector("#wavjump").play();
      }
      //Переход к плохим состояниям
      if (
        (Param.stateId == 1 ||
          Param.stateId == 2 ||
          Param.stateId == 3 ||
          Param.stateId == 4 ||
          Param.stateId == 5 ||
          Param.stateId == 6 ||
          Param.stateId == 7) &&
        error > 1 &&
        Param.badStateTime == 1080
      ) {
        Param.stateTime = StateArr[transition[Param.stateId][1]][1];
        Param.stateId = transition[Param.stateId][1];
        document.querySelector("#wavbadjump").play();
      }
      //Выход из плохих состояний в нормальные
      if (
        (Param.stateId == 8 ||
          Param.stateId == 9 ||
          Param.stateId == 10 ||
          Param.stateId == 11 ||
          Param.stateId == 12) &&
        error == 0
      ) {
        Param.stateTime = StateArr[transition[Param.stateId][0]][1];
        Param.stateId = transition[Param.stateId][0];
        document.querySelector("#wavjump").play();
      }
      //Переход к смерти
      if (
        (Param.stateId == 8 ||
          Param.stateId == 9 ||
          Param.stateId == 10 ||
          Param.stateId == 11 ||
          Param.stateId == 12) &&
        error > 1 &&
        Param.stateTime < 1
      ) {
        Param.stateTime = StateArr[transition[Param.stateId][1]][1];
        Param.stateId = transition[Param.stateId][1];
        document.querySelector("#wavdeath").play();
      }
      //Выход из игры
      if (
        Param.stateId == 13 ||
        Param.stateId == 14 ||
        Param.stateId == 15 ||
        Param.stateId == 16 ||
        Param.stateId == 17 ||
        Param.stateId == 18 ||
        Param.stateId == 19 ||
        Param.stateId == 20
      ) {
        document.querySelector(".frontImage").id = StateArr[Param.stateId][0];
        clearInterval(Ticker);
        EndGame();
      }
    }

    function InfoParam() {
      document.querySelector("#LoadPBHa").style.width = Param.Ha + "%";
      document.querySelector("#LoadPBHs").style.width = Param.Hs + "%";
      document.querySelector("#LoadPBLt").style.width = Param.Lt + "%";
      document.querySelector("#LoadPBTp").innerHTML = Param.Tp + "C°";
      document.querySelector("#Tm").innerHTML = Time();
    }

    function debuger() {
      // document.querySelector(".debug").style.display = "block";
      // document.querySelector("#nameState").innerHTML = StateArr[Param.stateId][10];
      // document.querySelector("#globalTime").innerHTML = Param.globalTime;
      // document.querySelector("#passTime").innerHTML = Param.passTime;
      // document.querySelector("#stateTime").innerHTML = Param.stateTime;
      // document.querySelector("#namePeriod").innerHTML = Param.namePeriod;
      // document.querySelector("#Ha").innerHTML = Param.Ha;
      // document.querySelector("#Hs").innerHTML = Param.Hs;
      // document.querySelector("#Lt").innerHTML = Param.Lt;
      // document.querySelector("#Tp").innerHTML = Param.Tp;
      // document.querySelector("#badStateTime").innerHTML = Param.badStateTime;
    };
    document.querySelector("#reset").addEventListener("click", function() {
      Param.Ha = 0;
      Param.Hs = 0;
      Param.Lt = 0;
      Param.Tp = 0;
    });
  };
});
//Кнопки
//Полить
document.querySelector("#pour").addEventListener("click", function() {
  Param.Hs += 5;
  Param.Ha++;

  document.querySelector("#pour").disabled = true;

  function pourButton() {
    document.querySelector("#pour").disabled = false;
  }
  setTimeout(pourButton, 15 * Param.speed);
});

//Побрызгать
document.querySelector("#sprinkle").addEventListener("click", function() {
  Param.Ha += 5;
  Param.Hs++;

  document.querySelector("#sprinkle").disabled = true;

  function pourButton() {
    document.querySelector("#sprinkle").disabled = false;
  }
  setTimeout(pourButton, 20 * Param.speed);
});

//лампа
document.querySelector("#light").addEventListener("click", function() {
  document.querySelector("#light").disabled = true;

  var lamp = setInterval(function() {
    Param.Lt = 99;
  }, 1 * Param.speed);

  function disLamp() {
    clearInterval(lamp);
    document.querySelector("#light").disabled = false;
  }

  setTimeout(disLamp, 36 * Param.speed);
});

//Обогрев
document.querySelector("#heating").addEventListener("click", function() {
  document.querySelector("#heating").disabled = true;

  var heat = setInterval(function() {
    Param.Tp++;
  }, 1 * Param.speed);

  setTimeout(delHeater, 10 * Param.speed);
  function delHeater() {
    clearInterval(heat);
    document.querySelector("#heating").disabled = false;
  }
});
//Охлаждение
document.querySelector("#wind").addEventListener("click", function() {
  document.querySelector("#wind").disabled = true;

  var wind = setInterval(function() {
    Param.Tp--;
  }, 1 * Param.speed);

  setTimeout(delWind, 10 * Param.speed);
  function delWind() {
    clearInterval(wind);
    document.querySelector("#wind").disabled = false;
  }
});

function EndGame() {
  document.querySelector(".unstarted").style.display = "flex";
  document.querySelector("#start").innerHTML = "Начать заново";
  document.querySelector(".started").style.display = "none";
  document.querySelector(".parameters").style.display = "none";

  Param.globalTime = 558000;
  Param.period = 0;
  Param.time = 360;
  Param.namePeriod = "";
  Param.passTime = 0;
  Param.stateId = 0;
  Param.stateTime = 0;
  Param.badStateTime = 0;
  Param.Ha = 50;
  Param.Hs = 50;
  Param.Lt = 11;
  Param.Tp = 11;
}