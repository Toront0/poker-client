interface IWSSimpleReq {
  (playerId: number, wsConn: WebSocket): void;
}

interface IWSBetReq {
  wsConn?: WebSocket;
  bet: number;
  playerId: number;
}

type simpleActionFn = (playerId: number, wsConn?: WebSocket) => void;
type betActionFn = (playerId: number, bet: number, wsConn?: WebSocket) => void;

export const playerFold: simpleActionFn = (playerId, wsConn) => {
  wsConn?.send(
    JSON.stringify({
      action: "fold",
      data: {
        playerId: playerId
      }
    })
  );
};

export const playerCheck: simpleActionFn = (playerId, wsConn) => {
  wsConn?.send(
    JSON.stringify({
      action: "check",
      data: {
        playerId: playerId
      }
    })
  );
};

export const playerRaise: betActionFn = (playerId, bet, wsConn) => {
  wsConn?.send(
    JSON.stringify({
      action: "raise",
      data: {
        playerId: playerId,
        bet: bet
      }
    })
  );
};

export const playerCall: betActionFn = (playerId, bet, wsConn) => {
  wsConn?.send(
    JSON.stringify({
      action: "call",
      data: {
        playerId: playerId,
        bet: bet
      }
    })
  );
};

export const playerNextAction = (
  action: string,
  playerId: number,
  wsConn?: WebSocket
) => {
  wsConn?.send(
    JSON.stringify({
      action: "next-action",
      data: {
        playerId: playerId,
        nextAction: action
      }
    })
  );
};
