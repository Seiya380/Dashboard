<script lang="ts">
	import { onDestroy } from 'svelte';
	import WidgetContainer from '$lib/components/layout/WidgetContainer.svelte';
	import { Play, Pause, RotateCcw, SkipForward } from 'lucide-svelte';

	type Mode = 'work' | 'short' | 'long';

	const DURATIONS: Record<Mode, number> = {
		work:  25 * 60,
		short:  5 * 60,
		long:  15 * 60,
	};

	const LABELS: Record<Mode, string> = {
		work:  'FOCUS',
		short: 'BREAK',
		long:  'LONG',
	};

	const COLORS: Record<Mode, string> = {
		work:  '#d43030',
		short: '#8090a8',
		long:  '#5a9a6a',
	};

	let mode      = $state<Mode>('work');
	let timeLeft  = $state(DURATIONS.work);
	let running   = $state(false);
	let completed = $state(0);
	let interval: ReturnType<typeof setInterval> | null = null;

	let minutes    = $derived(Math.floor(timeLeft / 60));
	let seconds    = $derived(timeLeft % 60);
	let progress   = $derived(1 - timeLeft / DURATIONS[mode]);
	let color      = $derived(COLORS[mode]);

	const R = 34;
	const CIRC = 2 * Math.PI * R;
	let dashOffset = $derived(CIRC * (1 - progress));

	function pad(n: number) { return n.toString().padStart(2, '0'); }

	function tick() {
		if (timeLeft <= 0) { stop(); onComplete(); return; }
		timeLeft--;
	}

	function stop() {
		running = false;
		if (interval) clearInterval(interval);
		interval = null;
	}

	function toggle() {
		if (running) {
			stop();
		} else {
			running = true;
			interval = setInterval(tick, 1000);
		}
	}

	function reset() { stop(); timeLeft = DURATIONS[mode]; }

	function onComplete() {
		if (mode === 'work') {
			const next = completed + 1;
			completed = next % 4;
			switchMode(next % 4 === 0 ? 'long' : 'short');
		} else {
			switchMode('work');
		}
	}

	function switchMode(m: Mode) { stop(); mode = m; timeLeft = DURATIONS[m]; }
	function skip() { stop(); onComplete(); }

	onDestroy(() => { if (interval) clearInterval(interval); });
</script>

<WidgetContainer title="Pomodoro" scrollable={false}>
	{#snippet actions()}
		<button onclick={reset} class="p-1 opacity-50 hover:opacity-100 transition-opacity" title="Reset" aria-label="Reset">
			<RotateCcw size={12} style="color:var(--text-muted)" />
		</button>
		<button onclick={skip} class="p-1 opacity-50 hover:opacity-100 transition-opacity" title="Skip" aria-label="Skip">
			<SkipForward size={12} style="color:var(--text-muted)" />
		</button>
	{/snippet}

	<div class="flex h-full items-center justify-between px-5 gap-4">

		<!-- Left: ring + time -->
		<div class="relative flex-shrink-0 flex items-center justify-center">
			<svg width="88" height="88" viewBox="0 0 88 88" style="transform:rotate(-90deg)">
				<circle cx="44" cy="44" r={R} fill="none" stroke="var(--border)" stroke-width="2"/>
				<circle
					cx="44" cy="44" r={R} fill="none"
					stroke={color} stroke-width="2" stroke-linecap="butt"
					stroke-dasharray={CIRC} stroke-dashoffset={dashOffset}
					style="transition: stroke-dashoffset 1s linear, stroke 0.4s ease;"
				/>
				{#each [0,90,180,270] as deg}
					{@const rad = deg * Math.PI / 180}
					<line
						x1={44 + (R-5)*Math.cos(rad)} y1={44 + (R-5)*Math.sin(rad)}
						x2={44 + (R+5)*Math.cos(rad)} y2={44 + (R+5)*Math.sin(rad)}
						stroke={color} stroke-width="1.5"
						style="transition: stroke 0.4s ease;"
					/>
				{/each}
			</svg>
			<div class="absolute flex flex-col items-center">
				<span class="font-mono text-xl font-light tabular-nums" style="color:var(--text);">
					{pad(minutes)}:{pad(seconds)}
				</span>
				<span class="text-[9px] tracking-widest" style="color:{color};">{LABELS[mode]}</span>
			</div>
		</div>

		<!-- Right: controls + session dots -->
		<div class="flex flex-col items-start gap-3 flex-1">

			<!-- Session dots -->
			<div class="flex gap-1.5">
				{#each [0,1,2,3] as i}
					<div class="h-1 w-4 transition-all" style="background:{i < completed ? COLORS.work : 'var(--border)'};"></div>
				{/each}
			</div>

			<!-- Play/Pause -->
			<button
				onclick={toggle}
				class="flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase transition-all"
				style="border:1px solid {color}; color:{color}; background:transparent;"
				onmouseenter={(e) => (e.currentTarget.style.background = color + '22')}
				onmouseleave={(e) => (e.currentTarget.style.background = 'transparent')}
			>
				{#if running}<Pause size={11}/> PAUSE{:else}<Play size={11}/> START{/if}
			</button>

			<!-- Mode tabs -->
			<div class="flex gap-3">
				{#each (['work','short','long'] as Mode[]) as m}
					<button
						onclick={() => switchMode(m)}
						class="text-[10px] tracking-wider uppercase transition-all"
						style="
							color:{mode===m ? COLORS[m] : 'var(--text-muted)'};
							border-bottom:1px solid {mode===m ? COLORS[m] : 'transparent'};
							padding-bottom:1px; background:none;
							border-top:none; border-left:none; border-right:none;
						"
					>{LABELS[m]}</button>
				{/each}
			</div>
		</div>
	</div>
</WidgetContainer>
