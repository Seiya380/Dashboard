<script lang="ts">
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Plus, Check, ChevronDown, ChevronRight, Trash2 } from 'lucide-svelte';
	import { goalsStore } from '$lib/stores/goals.svelte.js';

	interface Props {
		initialGoals?: { id: string; title: string; color: string; isCompleted: boolean; tasks: { id: string; title: string; isCompleted: boolean }[] }[];
	}
	let { initialGoals = [] }: Props = $props();

	$effect.pre(() => { goalsStore.init(initialGoals); });

	let newGoalTitle = $state('');
	let expandedGoals = $state<Set<string>>(new Set());
	let addingTaskFor = $state<string | null>(null);
	let newTaskTitle = $state('');

	function toggleGoal(id: string) {
		if (expandedGoals.has(id)) expandedGoals.delete(id);
		else expandedGoals.add(id);
	}

	async function addGoal() {
		if (!newGoalTitle.trim()) return;
		await goalsStore.addGoal(newGoalTitle.trim());
		newGoalTitle = '';
	}

	async function addTask(goalId: string) {
		if (!newTaskTitle.trim()) return;
		await goalsStore.addTask(goalId, newTaskTitle.trim());
		newTaskTitle = '';
		addingTaskFor = null;
	}
</script>

<WidgetContainer title="Goals & Tasks">
	{#snippet actions()}
		<input
			bind:value={newGoalTitle}
			onkeydown={(e) => e.key === 'Enter' && addGoal()}
			placeholder="New goal…"
			class="rounded-md border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-1 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] w-28"
		/>
		<button onclick={addGoal} class="rounded p-1 hover:bg-[var(--surface-alt)]" title="Add goal">
			<Plus size={14} class="text-[var(--accent)]" />
		</button>
	{/snippet}

	<ul class="p-2 space-y-1">
		{#each goalsStore.goals as goal (goal.id)}
			<li class="rounded-lg overflow-hidden">
				<!-- Goal header -->
				<div class="flex items-center gap-2 px-2 py-2 hover:bg-[var(--surface-alt)] rounded-lg">
					<button onclick={() => toggleGoal(goal.id)} class="flex-shrink-0">
						{#if expandedGoals.has(goal.id)}
							<ChevronDown size={14} class="text-[var(--text-muted)]" />
						{:else}
							<ChevronRight size={14} class="text-[var(--text-muted)]" />
						{/if}
					</button>
					<button
						onclick={() => goalsStore.toggleGoal(goal.id)}
						class="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
						style="border-color: {goal.color}; background: {goal.isCompleted ? goal.color : 'transparent'}"
					>
						{#if goal.isCompleted}
							<Check size={10} class="text-[var(--bg)]" />
						{/if}
					</button>
					<span class="flex-1 text-sm font-medium text-[var(--text)] {goal.isCompleted ? 'line-through opacity-60' : ''}">{goal.title}</span>
					<span class="text-xs text-[var(--text-muted)]">{goal.tasks.filter(t => t.isCompleted).length}/{goal.tasks.length}</span>
					<button onclick={() => goalsStore.deleteGoal(goal.id)} class="opacity-0 hover:opacity-100 group-hover:opacity-100 p-1 rounded hover:bg-[var(--surface)]">
						<Trash2 size={12} class="text-[var(--red)]" />
					</button>
				</div>

				<!-- Tasks -->
				{#if expandedGoals.has(goal.id)}
					<ul class="ml-8 space-y-0.5 pb-1">
						{#each goal.tasks as task (task.id)}
							<li class="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[var(--surface-alt)]">
								<button
									onclick={() => goalsStore.toggleTask(task.id)}
									class="w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors"
									style="border-color: {goal.color}; background: {task.isCompleted ? goal.color : 'transparent'}"
								>
									{#if task.isCompleted}
										<Check size={9} class="text-[var(--bg)]" />
									{/if}
								</button>
								<span class="text-xs text-[var(--text)] {task.isCompleted ? 'line-through opacity-60' : ''}">{task.title}</span>
								<button onclick={() => goalsStore.deleteTask(task.id)} class="ml-auto p-0.5 rounded hover:bg-[var(--surface)]">
									<Trash2 size={10} class="text-[var(--red)]" />
								</button>
							</li>
						{/each}

						<!-- Add task input -->
						{#if addingTaskFor === goal.id}
							<li class="flex items-center gap-2 px-2 py-1">
								<!-- svelte-ignore a11y_autofocus -->
								<input
									bind:value={newTaskTitle}
									onkeydown={(e) => { if (e.key === 'Enter') addTask(goal.id); if (e.key === 'Escape') { addingTaskFor = null; newTaskTitle = ''; } }}
									placeholder="Task name…"
									autofocus
									class="flex-1 rounded border border-[var(--border)] bg-[var(--bg-alt)] px-2 py-0.5 text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
								/>
							</li>
						{:else}
							<li>
								<button
									onclick={() => { addingTaskFor = goal.id; newTaskTitle = ''; }}
									class="flex items-center gap-1 px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
								>
									<Plus size={12} /> Add task
								</button>
							</li>
						{/if}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
</WidgetContainer>
