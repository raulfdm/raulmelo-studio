import { assign,createMachine } from 'xstate';

import type { TabataConfigContext } from './tabata-config';

type TabataClockContext = {
	elapsed: number;
	currentAction: ActionItem;
	listOfActions: ActionItem[];
	_actionIndex: number;
};

type ActionDirection = 'forward' | 'backward';
type TabataClockEvents =
	| {
			type: 'TICK';
	  }
	| {
			type: 'NEXT_ACTION';
			direction: ActionDirection;
	  }
	| {
			type: 'TOGGLE';
	  }
	| {
			type: 'FORWARD';
	  }
	| {
			type: 'BACKWARD';
	  };

export function createTabataClock(tabataConfig: TabataConfigContext) {
	const list = getClockListOfActions(tabataConfig);

	return createMachine(
		{
			predictableActionArguments: true,
			preserveActionOrder: true,
			initial: 'idle',
			schema: {
				context: {} as TabataClockContext,
				events: {} as TabataClockEvents
			},
			context: {
				elapsed: tabataConfig.prepare,
				_actionIndex: 0,
				currentAction: list[0],
				listOfActions: list
			},
			on: {
				TICK: {
					actions: ['tickElapsed', 'onTick']
				},
				NEXT_ACTION: {
					actions: ['nextAction'],
					target: 'decider'
				},
				BACKWARD: {
					actions: ['backward'],
					target: 'idle',
					cond: 'canGoBackwards'
				},
				FORWARD: {
					actions: ['forward'],
					target: 'idle',
					cond: 'canGoForwards'
				}
			},
			states: {
				idle: {
					on: {
						TOGGLE: 'running'
					}
				},
				decider: {
					after: {
						1000: [
							{
								target: 'finished',
								cond: 'hasFinished'
							},
							{
								target: 'running'
							}
						]
					}
				},
				paused: {
					on: {
						TOGGLE: 'running'
					}
				},
				running: {
					invoke: {
						src: 'tick'
					},
					on: {
						TOGGLE: 'paused'
					}
				},
				finished: {
					entry: 'onFinished',
					type: 'final'
				}
			}
		},
		{
			actions: {
				tickElapsed: assign({
					elapsed: (context) => context.elapsed - 1
				}),
				nextAction: assign((context, { direction }: any) => nextAction(context, direction)),
				backward: assign((context) => nextAction(context, 'backward')),
				forward: assign((context) => nextAction(context, 'forward'))
			},
			guards: {
				hasFinished: (context) => context._actionIndex === context.listOfActions.length - 1,
				canGoBackwards: (context) => context._actionIndex > 0,
				canGoForwards: (context) => context._actionIndex < context.listOfActions.length - 1
			},
			services: {
				tick: (context) => (callback) => {
					let times = context.elapsed;
					const interval = setInterval(() => {
						if (--times < 0) {
							callback({
								type: 'NEXT_ACTION',
								direction: 'forward'
							});
						} else {
							callback('TICK');
						}
					}, 1000);

					return () => {
						clearInterval(interval);
					};
				}
			}
		}
	);
}

function nextAction(context: TabataClockContext, direction: ActionDirection): TabataClockContext {
	const nextIndex = context._actionIndex + (direction === 'forward' ? 1 : -1);
	const nextAction = context.listOfActions[nextIndex];

	const nextContext: TabataClockContext = {
		...context,
		_actionIndex: nextIndex,
		currentAction: nextAction,
		elapsed: nextAction.duration
	};

	return nextContext;
}

type ActionItem = {
	type: 'prepare' | 'workout' | 'rest' | 'cooldown' | 'final';
	duration: number;
	label: string;
};

export function getClockListOfActions(tabataConfig: TabataConfigContext): ActionItem[] {
	const list: ActionItem[] = [
		{ type: 'prepare', duration: tabataConfig.prepare, label: 'Prepare' }
	];

	for (let cycle = tabataConfig.cycles; cycle > 0; cycle--) {
		tabataConfig.workout.forEach(([_, workout], index) => {
			list.push({
				type: 'workout',
				duration: workout,
				label: `Workout ${index + 1}`
			});
		});

		list.push({
			type: 'rest',
			duration: tabataConfig.rest,
			label: 'Rest'
		});
	}

	if (tabataConfig.cooldown > 0) {
		list.push({
			type: 'cooldown',
			duration: tabataConfig.cooldown,
			label: 'Cooldown'
		});
	}

	list.push({
		type: 'final',
		duration: 0,
		label: 'Finished'
	});

	return list;
}
