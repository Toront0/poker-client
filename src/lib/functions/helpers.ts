import spades1 from "../../assets/cards/spades/Spades-1.svg";
import spades2 from "../../assets/cards/spades/Spades-2.svg";
import spades3 from "../../assets/cards/spades/Spades-3.svg";
import spades4 from "../../assets/cards/spades/Spades-4.svg";
import spades5 from "../../assets/cards/spades/Spades-5.svg";
import spades6 from "../../assets/cards/spades/Spades-6.svg";
import spades7 from "../../assets/cards/spades/Spades-7.svg";
import spades8 from "../../assets/cards/spades/Spades-8.svg";
import spades9 from "../../assets/cards/spades/Spades-9.svg";
import spades10 from "../../assets/cards/spades/Spades-10.svg";
import spades11 from "../../assets/cards/spades/Spades-J.svg";
import spades12 from "../../assets/cards/spades/Spades-Q.svg";
import spades13 from "../../assets/cards/spades/Spades-K.svg";

import hearts1 from "../../assets/cards/hearts/Hearts-1.svg";
import hearts2 from "../../assets/cards/hearts/Hearts-2.svg";
import hearts3 from "../../assets/cards/hearts/Hearts-3.svg";
import hearts4 from "../../assets/cards/hearts/Hearts-4.svg";
import hearts5 from "../../assets/cards/hearts/Hearts-5.svg";
import hearts6 from "../../assets/cards/hearts/Hearts-6.svg";
import hearts7 from "../../assets/cards/hearts/Hearts-7.svg";
import hearts8 from "../../assets/cards/hearts/Hearts-8.svg";
import hearts9 from "../../assets/cards/hearts/Hearts-9.svg";
import hearts10 from "../../assets/cards/hearts/Hearts-10.svg";
import hearts11 from "../../assets/cards/hearts/Hearts-J.svg";
import hearts12 from "../../assets/cards/hearts/Hearts-Q.svg";
import hearts13 from "../../assets/cards/hearts/Hearts-K.svg";

import diamonds1 from "../../assets/cards/diamonds/Diamonds-1.svg";
import diamonds2 from "../../assets/cards/diamonds/Diamonds-2.svg";
import diamonds3 from "../../assets/cards/diamonds/Diamonds-3.svg";
import diamonds4 from "../../assets/cards/diamonds/Diamonds-4.svg";
import diamonds5 from "../../assets/cards/diamonds/Diamonds-5.svg";
import diamonds6 from "../../assets/cards/diamonds/Diamonds-6.svg";
import diamonds7 from "../../assets/cards/diamonds/Diamonds-7.svg";
import diamonds8 from "../../assets/cards/diamonds/Diamonds-8.svg";
import diamonds9 from "../../assets/cards/diamonds/Diamonds-9.svg";
import diamonds10 from "../../assets/cards/diamonds/Diamonds-10.svg";
import diamonds11 from "../../assets/cards/diamonds/Diamonds-J.svg";
import diamonds12 from "../../assets/cards/diamonds/Diamonds-Q.svg";
import diamonds13 from "../../assets/cards/diamonds/Diamonds-K.svg";

import clubs1 from "../../assets/cards/clubs/Clubs-1.svg";
import clubs2 from "../../assets/cards/clubs/Clubs-2.svg";
import clubs3 from "../../assets/cards/clubs/Clubs-3.svg";
import clubs4 from "../../assets/cards/clubs/Clubs-4.svg";
import clubs5 from "../../assets/cards/clubs/Clubs-5.svg";
import clubs6 from "../../assets/cards/clubs/Clubs-6.svg";
import clubs7 from "../../assets/cards/clubs/Clubs-7.svg";
import clubs8 from "../../assets/cards/clubs/Clubs-8.svg";
import clubs9 from "../../assets/cards/clubs/Clubs-9.svg";
import clubs10 from "../../assets/cards/clubs/Clubs-10.svg";
import clubs11 from "../../assets/cards/clubs/Clubs-J.svg";
import clubs12 from "../../assets/cards/clubs/Clubs-Q.svg";
import clubs13 from "../../assets/cards/clubs/Clubs-K.svg";

import backward from "../../assets/cards/card-backward-1.png";

import chip5000 from "../../assets/chips/chip-5000.svg";
import chip1000 from "../../assets/chips/chip-1000.svg";
import chip500 from "../../assets/chips/chip-500.svg";
import chip100 from "../../assets/chips/chip-100.svg";
import chip50 from "../../assets/chips/chip-50.svg";
import chip25 from "../../assets/chips/chip-25.svg";
import chip10 from "../../assets/chips/chip-10.svg";
import { GameType } from "../../routes/Home/Game";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";
import {
  PlayerPosition,
  PlayerPositionFn
} from "../../shared/interfaces/helperFunctions";

export const stringToCardImg = (card: string) => {
  switch (card) {
    case "1spades":
      return spades1;
    case "2spades":
      return spades2;
    case "3spades":
      return spades3;
    case "4spades":
      return spades4;
    case "5spades":
      return spades5;
    case "6spades":
      return spades6;
    case "7spades":
      return spades7;
    case "8spades":
      return spades8;
    case "9spades":
      return spades9;
    case "10spades":
      return spades10;
    case "11spades":
      return spades11;
    case "12spades":
      return spades12;
    case "13spades":
      return spades13;
    case "1hearts":
      return hearts1;
    case "2hearts":
      return hearts2;
    case "3hearts":
      return hearts3;
    case "4hearts":
      return hearts4;
    case "5hearts":
      return hearts5;
    case "6hearts":
      return hearts6;
    case "7hearts":
      return hearts7;
    case "8hearts":
      return hearts8;
    case "9hearts":
      return hearts9;
    case "10hearts":
      return hearts10;
    case "11hearts":
      return hearts11;
    case "12hearts":
      return hearts12;
    case "13hearts":
      return hearts13;
    case "1diamonds":
      return diamonds1;
    case "2diamonds":
      return diamonds2;
    case "3diamonds":
      return diamonds3;
    case "4diamonds":
      return diamonds4;
    case "5diamonds":
      return diamonds5;
    case "6diamonds":
      return diamonds6;
    case "7diamonds":
      return diamonds7;
    case "8diamonds":
      return diamonds8;
    case "9diamonds":
      return diamonds9;
    case "10diamonds":
      return diamonds10;
    case "11diamonds":
      return diamonds11;
    case "12diamonds":
      return diamonds12;
    case "13diamonds":
      return diamonds13;
    case "1clubs":
      return clubs1;
    case "2clubs":
      return clubs2;
    case "3clubs":
      return clubs3;
    case "4clubs":
      return clubs4;
    case "5clubs":
      return clubs5;
    case "6clubs":
      return clubs6;
    case "7clubs":
      return clubs7;
    case "8clubs":
      return clubs8;
    case "9clubs":
      return clubs9;
    case "10clubs":
      return clubs10;
    case "11clubs":
      return clubs11;
    case "12clubs":
      return clubs12;
    case "13clubs":
      return clubs13;
    default:
      return backward;
  }
};

export const chipFromIdx = (idx: number) => {
  if (idx === 0) {
    return chip5000;
  } else if (idx === 1) {
    return chip1000;
  } else if (idx === 2) {
    return chip500;
  } else if (idx === 3) {
    return chip100;
  } else if (idx === 4) {
    return chip50;
  } else if (idx === 5) {
    return chip25;
  } else {
    return chip10;
  }
};

export const arrangePlayers = (i: number) => {
  if (i === 0) {
    return "top-full left-1/2 -translate-x-1/2";
  } else if (i === 1) {
    return "top-full left-0 -mt-4";
  } else if (i === 2) {
    return "top-1/2 right-full -mr-8 -translate-y-1/2";
  } else if (i === 3) {
    return "bottom-full -mb-4 left-0";
  } else if (i === 4) {
    return "bottom-full left-1/2 -translate-x-1/2";
  } else if (i === 5) {
    return "bottom-full -mb-4 right-0";
  } else if (i === 6) {
    return "left-full top-1/2 -ml-8 -translate-y-1/2";
  } else {
    return "right-0 top-full -mt-4";
  }
};

export const determineChipStack = (bet: number) => {
  const result: number[] = [0, 0, 0, 0, 0, 0, 0];

  // const reminder = bet % 5000;

  let res = bet;

  if (res >= 5000) {
    const amount = Math.floor(res / 5000);

    for (let i = 0; i < amount; i++) {
      res -= 5000;
    }

    result[0] = Math.min(5, amount);
  }

  if (res >= 1000) {
    const amount = Math.floor(res / 1000);

    for (let i = 0; i < amount; i++) {
      res -= 1000;
    }

    result[1] = Math.min(5, amount);
  }

  if (res >= 500) {
    const amount = Math.floor(res / 500);

    for (let i = 0; i < amount; i++) {
      res -= 500;
    }

    result[2] = Math.min(5, amount);
  }

  if (res >= 100) {
    const amount = Math.floor(res / 100);

    for (let i = 0; i < amount; i++) {
      res -= 100;
    }

    result[3] = Math.min(5, amount);
  }

  if (res >= 50) {
    const amount = Math.floor(res / 50);

    for (let i = 0; i < amount; i++) {
      res -= 50;
    }

    result[4] = Math.min(5, amount);
  }

  // if (res >= 25) {
  //   console.log("res25", res);
  //   const amount = Math.floor(res / 25);

  //   for (let i = 0; i < amount; i++) {
  //     res -= 25;
  //   }

  //   result[5] = Math.min(5, amount);
  // }

  // if (res >= 10) {
  //   const amount = Math.floor(res / 10);

  //   for (let i = 0; i < amount; i++) {
  //     res -= 10;
  //   }

  //   result[6] = Math.min(5, amount);
  // }

  return result;
};

export const determineChipsPosition = (playerPosition: PlayerPosition) => {
  switch (playerPosition) {
    case "position-0":
      return "bet-0";
    case "position-1":
      return "bet-1";
    case "position-2":
      return "bet-2";
    case "position-3":
      return "bet-3";
    case "position-4":
      return "bet-4";
    case "position-5":
      return "bet-5";
    case "position-6":
      return "bet-6";
    case "position-7":
      return "bet-7";
  }
};

export const giveChipsToWinner = (winnerIdx: number) => {
  if (winnerIdx === 0) {
    return "winner-0";
  } else if (winnerIdx === 1) {
    return "winner-1";
  }
};

export const idxToCardDealAnimClass = (fCard: boolean, idx: number) => {
  if (fCard) {
    if (idx === 0) {
      return "f-c-0";
    } else if (idx === 1) {
      return "f-c-1";
    } else if (idx === 2) {
      return "f-c-2";
    } else if (idx === 3) {
      return "f-c-3";
    } else if (idx === 4) {
      return "f-c-4";
    } else if (idx === 5) {
      return "f-c-5";
    } else if (idx === 6) {
      return "f-c-6";
    } else {
      return "f-c-7";
    }
  } else {
    if (idx === 0) {
      return "s-c-0";
    } else if (idx === 1) {
      return "s-c-1";
    } else if (idx === 2) {
      return "s-c-2";
    } else if (idx === 3) {
      return "s-c-3";
    } else if (idx === 4) {
      return "s-c-4";
    } else if (idx === 5) {
      return "s-c-5";
    } else if (idx === 6) {
      return "s-c-6";
    } else {
      return "s-c-7";
    }
  }
};

export const dealerIconPosition = (amountOfPlayers: number, idx: number) => {
  if (amountOfPlayers === 2) {
    return;
  }
  if (amountOfPlayers === 3) {
    return;
  }

  if (amountOfPlayers === 4) {
    if (idx === 0) {
      return "bottom-full mb-4";
    } else if (idx === 1) {
      return "top-1/2 -translate-y-1/2 left-full";
    } else if (idx === 2) {
      return "top-full mt-4";
    } else {
      return "top-1/2 -translate-y-1/2 right-full mr-12 z-50";
    }
  }

  if (idx === 0) {
    return "bottom-full left-0 mb-4";
  } else if (idx === 1) {
    return "bottom-full mb-3 right-0";
  } else if (idx === 2) {
    return "right-0 top-0 -mr-6";
  } else if (idx === 3) {
    return "top-full right-0 mt-3";
  } else if (idx === 4) {
    return "top-full mt-3 left-1/2 -translate-x-1/2 ";
  } else if (idx === 5) {
    return "top-full left-0 mt-3";
  } else if (idx === 6) {
    return "left-0 top-0 -ml-6";
  } else {
    return "bottom-full mb-3 left-0";
  }
};

export const formatPrizeDestribution = (
  type: string,
  place: number,
  prize: number
) => {
  if (type === "the 50% rules") {
    if (place === 0) {
      return "$" + (prize / 2).toFixed(2);
    } else if (place === 1) {
      return "$" + (prize / 4).toFixed(2);
    } else if (place === 2 || place === 3) {
      return "$" + (prize / 8).toFixed(2);
    } else {
      return null;
    }
  }
};

export const filterGames = (games: GameType[], userId?: number) => {
  if (!userId) {
    return games;
  }

  const userGames: GameType[] = [];
  const otherGames: GameType[] = [];

  for (let i = 0; i < games.length; i++) {
    if (games[i].playersInRoom?.includes(userId)) {
      userGames.push(games[i]);
    } else {
      otherGames.push(games[i]);
    }
  }

  return userGames.concat(otherGames);
};

export const addEndingToWinPlace = (place: number) => {
  if (place === 1) {
    return "st";
  } else if (place === 2) {
    return "nd";
  } else if (place === 3) {
    return "rd";
  } else {
    return "th";
  }
};

export const findPlayerPosition: PlayerPositionFn = (
  amountOfPlayers,
  playerIdx
) => {
  if (amountOfPlayers === 2) {
    if (playerIdx === 0) {
      return "position-0";
    } else {
      return "position-4";
    }
  }

  if (amountOfPlayers === 3) {
    if (playerIdx === 0) {
      return "position-0";
    } else if (playerIdx === 1) {
      return "position-3";
    } else {
      return "position-5";
    }
  }

  if (amountOfPlayers === 4) {
    if (playerIdx === 0) {
      return "position-0";
    } else if (playerIdx === 1) {
      return "position-2";
    } else if (playerIdx === 2) {
      return "position-4";
    } else {
      return "position-6";
    }
  }

  if (amountOfPlayers === 5) {
    if (playerIdx === 0) {
      return "position-0";
    } else if (playerIdx === 1) {
      return "position-1";
    } else if (playerIdx === 2) {
      return "position-2";
    } else if (playerIdx === 3) {
      return "position-4";
    } else {
      return "position-6";
    }
  }

  if (amountOfPlayers === 6) {
    if (playerIdx === 0) {
      return "position-0";
    } else if (playerIdx === 1) {
      return "position-1";
    } else if (playerIdx === 2) {
      return "position-2";
    } else if (playerIdx === 3) {
      return "position-3";
    } else if (playerIdx === 4) {
      return "position-4";
    } else {
      return "position-5";
    }
  }

  if (amountOfPlayers === 7) {
    if (playerIdx === 0) {
      return "position-1";
    } else if (playerIdx === 1) {
      return "position-1";
    } else if (playerIdx === 2) {
      return "position-2";
    } else if (playerIdx === 3) {
      return "position-3";
    } else if (playerIdx === 4) {
      return "position-4";
    } else if (playerIdx === 5) {
      return "position-5";
    } else {
      return "position-6";
    }
  }

  if (playerIdx === 0) {
    return "position-0";
  } else if (playerIdx === 1) {
    return "position-1";
  } else if (playerIdx === 2) {
    return "position-2";
  } else if (playerIdx === 3) {
    return "position-3";
  } else if (playerIdx === 4) {
    return "position-4";
  } else if (playerIdx === 5) {
    return "position-5";
  } else if (playerIdx === 6) {
    return "position-6";
  } else {
    return "position-7";
  }
};

export const parsePositionToTailwindClass = (position: PlayerPosition) => {
  switch (position) {
    case "position-0":
      return "-bottom-6 xl:-bottom-10 left-1/2 -translate-x-1/2";
    case "position-1":
      return "-bottom-0 2xl:-bottom-8 left-[15%] -translate-x-1/2";
    case "position-2":
      return "top-1/2 -translate-y-1/2 -left-6 lg:-left-12 2xl:-left-20";
    case "position-3":
      return "-top-4 xl:-top-14 2xl:-top-20 left-[15%] -translate-x-1/2";
    case "position-4":
      return "-top-10 xl:-top-16 2xl:-top-24 left-1/2 -translate-x-1/2";
    case "position-5":
      return "-top-4 xl:-top-14 2xl:-top-20 right-[15%] translate-x-1/2";
    case "position-6":
      return "top-1/2 -translate-y-1/2 -right-6 lg:-right-12 2xl:-right-20";
    case "position-7":
      return "bottom-0 2xl:-bottom-8 right-[15%] translate-x-1/2";
  }
};

export const findDealerIconPos = (playerPos: PlayerPosition) => {
  if (playerPos === "position-0") {
    return "-mt-5  md:-left-3 lg:-left-5 xl:left-0";
  }

  if (playerPos === "position-1") {
    return "-top-0 lg:top-0 right-0 -mr-4 lg:-mr-6";
  }

  if (playerPos === "position-2") {
    return "right-0  -mr-4 lg:-mr-7 top-0";
  }

  if (playerPos === "position-3") {
    return "right-0 -mr-4 lg:-mr-6 top-full";
  }

  if (playerPos === "position-4") {
    return "right-0 top-full mt-2";
  }

  if (playerPos === "position-5") {
    return "left-0 -ml-4 lg:-ml-6 top-full";
  }

  if (playerPos === "position-6") {
    return "left-0 -ml-4 lg:-ml-6 top-0";
  }

  return "top-0 left-0 -ml-4 lg:-ml-6";
};

export const getFirstCardDestributionAnimation = (
  amountOfPlayers: number,
  playerIdx: number
) => {
  if (amountOfPlayers === 2) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else {
      return "f-c-4";
    }
  }

  if (amountOfPlayers === 3) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-3";
    } else {
      return "f-c-5";
    }
  }

  if (amountOfPlayers === 4) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-2";
    } else if (playerIdx === 2) {
      return "f-c-4";
    } else {
      return "f-c-6";
    }
  }

  if (amountOfPlayers === 5) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-1";
    } else if (playerIdx === 2) {
      return "f-c-2";
    } else if (playerIdx === 3) {
      return "f-c-4";
    } else {
      return "f-c-6";
    }
  }

  if (amountOfPlayers === 6) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-1";
    } else if (playerIdx === 2) {
      return "f-c-2";
    } else if (playerIdx === 3) {
      return "f-c-3";
    } else if (playerIdx === 4) {
      return "f-c-4";
    } else {
      return "f-c-6";
    }
  }

  if (amountOfPlayers === 7) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-1";
    } else if (playerIdx === 2) {
      return "f-c-2";
    } else if (playerIdx === 3) {
      return "f-c-3";
    } else if (playerIdx === 4) {
      return "f-c-4";
    } else if (playerIdx === 5) {
      return "f-c-5";
    } else {
      return "f-c-6";
    }
  }

  if (amountOfPlayers === 8) {
    if (playerIdx === 0) {
      return "f-c-0";
    } else if (playerIdx === 1) {
      return "f-c-1";
    } else if (playerIdx === 2) {
      return "f-c-2";
    } else if (playerIdx === 3) {
      return "f-c-3";
    } else if (playerIdx === 4) {
      return "f-c-4";
    } else if (playerIdx === 5) {
      return "f-c-5";
    } else if (playerIdx === 6) {
      return "f-c-6";
    } else {
      return "f-c-7";
    }
  }
};

export const getSecondCardDestributionAnimation = (
  amountOfPlayers: number,
  playerIdx: number
) => {
  if (amountOfPlayers === 2) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else {
      return "s-c-4";
    }
  }

  if (amountOfPlayers === 3) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-3";
    } else {
      return "s-c-5";
    }
  }

  if (amountOfPlayers === 4) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-2";
    } else if (playerIdx === 2) {
      return "s-c-4";
    } else {
      return "s-c-6";
    }
  }

  if (amountOfPlayers === 5) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-1";
    } else if (playerIdx === 2) {
      return "s-c-2";
    } else if (playerIdx === 3) {
      return "s-c-4";
    } else {
      return "s-c-6";
    }
  }

  if (amountOfPlayers === 6) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-1";
    } else if (playerIdx === 2) {
      return "s-c-2";
    } else if (playerIdx === 3) {
      return "s-c-3";
    } else if (playerIdx === 4) {
      return "s-c-4";
    } else {
      return "s-c-6";
    }
  }

  if (amountOfPlayers === 7) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-1";
    } else if (playerIdx === 2) {
      return "s-c-2";
    } else if (playerIdx === 3) {
      return "s-c-3";
    } else if (playerIdx === 4) {
      return "s-c-4";
    } else if (playerIdx === 5) {
      return "s-c-5";
    } else {
      return "s-c-6";
    }
  }

  if (amountOfPlayers === 8) {
    if (playerIdx === 0) {
      return "s-c-0";
    } else if (playerIdx === 1) {
      return "s-c-1";
    } else if (playerIdx === 2) {
      return "s-c-2";
    } else if (playerIdx === 3) {
      return "s-c-3";
    } else if (playerIdx === 4) {
      return "s-c-4";
    } else if (playerIdx === 5) {
      return "s-c-5";
    } else if (playerIdx === 6) {
      return "s-c-6";
    } else {
      return "s-c-7";
    }
  }
};

export const getCardValue = (card: string) => {
  if (isNaN(+card[1])) {
    return +card.slice(0, 1);
  } else {
    return +card.slice(0, 2);
  }
};

export const isPrimeHand = (hand: string[]) => {
  if (getCardValue(hand[0]) === 10 && getCardValue(hand[1]) === 10) {
    return true;
  }

  if (
    (getCardValue(hand[0]) > 10 || getCardValue(hand[0]) === 1) &&
    (getCardValue(hand[1]) > 10 || getCardValue(hand[1]) === 1)
  ) {
    return true;
  }

  return false;
};

export const formatPlayers = (players: PlayerType[], authUserId?: number) => {
  if (!authUserId) {
    return players;
  }

  const authUserIdx = players?.findIndex((v) => v.id === authUserId);

  if (authUserIdx === -1) {
    return players;
  }

  const result: PlayerType[] = [];

  let end = true;

  result.push(players[authUserIdx]);

  let i = authUserIdx + 1 >= players.length ? 0 : authUserIdx + 1;

  while (end) {
    if (result.length >= players.length) {
      end = false;
      return result;
    }

    if (i === authUserIdx) {
      i = i + 1 >= players.length ? 0 : i + 1;
      continue;
    } else {
      result.push(players[i]);

      if (i + 1 >= players.length) {
        i = 0;
      } else {
        i++;
      }
    }
  }

  console.log("after", result);

  return result;
};
