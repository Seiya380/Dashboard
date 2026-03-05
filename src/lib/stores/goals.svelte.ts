interface Task {
	id: string;
	title: string;
	isCompleted: boolean;
	goalId?: string | null;
}

interface Goal {
	id: string;
	title: string;
	color: string;
	isCompleted: boolean;
	tasks: Task[];
}

function createGoalsStore() {
	let goals = $state<Goal[]>([]);

	return {
		get goals() {
			return goals;
		},

		init(initial: Goal[]) {
			goals = initial;
		},

		async addGoal(title: string) {
			const res = await fetch('/api/goals', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title })
			});
			if (res.ok) {
				const goal = await res.json();
				goals = [...goals, { ...goal, tasks: [] }];
			}
		},

		async toggleGoal(id: string) {
			const goal = goals.find((g) => g.id === id);
			if (!goal) return;
			const isCompleted = !goal.isCompleted;
			goals = goals.map((g) => (g.id === id ? { ...g, isCompleted } : g));
			await fetch(`/api/goals/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isCompleted })
			});
		},

		async deleteGoal(id: string) {
			goals = goals.filter((g) => g.id !== id);
			await fetch(`/api/goals/${id}`, { method: 'DELETE' });
		},

		async addTask(goalId: string, title: string) {
			const res = await fetch('/api/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ goalId, title })
			});
			if (res.ok) {
				const task = await res.json();
				goals = goals.map((g) =>
					g.id === goalId ? { ...g, tasks: [...g.tasks, task] } : g
				);
			}
		},

		async toggleTask(id: string) {
			let goalId: string | null = null;
			let isCompleted = false;
			goals = goals.map((g) => ({
				...g,
				tasks: g.tasks.map((t) => {
					if (t.id === id) {
						goalId = g.id;
						isCompleted = !t.isCompleted;
						return { ...t, isCompleted };
					}
					return t;
				})
			}));
			await fetch(`/api/tasks/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ isCompleted })
			});
		},

		async deleteTask(id: string) {
			goals = goals.map((g) => ({ ...g, tasks: g.tasks.filter((t) => t.id !== id) }));
			await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
		}
	};
}

export const goalsStore = createGoalsStore();
