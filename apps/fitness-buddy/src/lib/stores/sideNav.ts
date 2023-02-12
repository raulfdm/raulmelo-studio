import { createMachine, interpret } from 'xstate';

type SideNavEvents =
	| {
			type: 'TOGGLE';
	  }
	| {
			type: 'CLOSE';
	  };

export const sideNavMachine = createMachine({
	id: 'sideNav',
	initial: 'closed',
	schema: {
		events: {} as SideNavEvents
	},
	tsTypes: {} as import('./sideNav.typegen').Typegen0,
	states: {
		closed: {
			on: {
				TOGGLE: 'open'
			}
		},
		open: {
			on: {
				TOGGLE: 'closed',
				CLOSE: 'closed'
			}
		}
	}
});

export const sideNavService = interpret(sideNavMachine).start();

export function toggleSideNav() {
	sideNavService.send('TOGGLE');
}
