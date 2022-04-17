// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    setActivity: 'SET_ACTIVITY';
    startClock: 'RUN' | 'TOGGLE';
    fastForward: 'FAST_FORWARD';
    rewind: 'REWIND';
    reset: 'RESET';
    tick: 'TICK';
    startNextSession: 'xstate.init';
  };
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    canFastForward: 'FAST_FORWARD';
    canRewind: 'REWIND';
  };
  eventsCausingDelays: {};
  matchesStates: 'unset' | 'idle' | 'running' | 'pause';
  tags: never;
}
