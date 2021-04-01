<script>
	import { fade } from 'svelte/transition';
	let state = 0;
	export let name;
</script>

<main>
	<div class="col1">
		{#if state == 0}
			<h1 transition:fade="{{ duration: 500 }}">
				<span on:click={() => state = 1}>We shall</span> be <span>prepared</span> if others <span>wish</span> it
			</h1>
		{/if}
	
		{#if state == 1}
			<h1 transition:fade="{{ duration: 500 }}">
				<span on:click={() => state = 0}>We shall</span> <span on:click={() => state = 2}>join</span> with them to oppose aggression
			</h1>
		{/if}
	
		{#if state == 2}
			<h1 transition:fade="{{ duration: 500 }}">
				In a time of domestic <span on:click={() => state = 1}>crisis</span> men of <span>good will</span> should <span on:click={() => state = 1}>unite</span>
			</h1>
		{/if}
		</div>

	<div class="col2">
		{#if state == 0}
			<div class="speech" transition:fade="{{duration: 800, delay: 1000}}">
				<p>...</p>
				<p>But it can--if it is sufficiently effective in its enforcement and if it is sufficiently in the interests of its signers--offer far more security and far fewer risks than an unabated, uncontrolled, unpredictable arms race.</p>
				<p>The United States, as the world knows, will never start a war.</p>
				<p>We do not want a war.</p>
				<p>We do not now expect a war.</p>
				<p>This generation of Americans has already had enough--more than enough--of war and hate and oppression.</p>
				<p><strong>We shall be prepared if others wish it.</strong></p>
				<p>We shall be alert to try to stop it.</p>
				<p>But we shall also do our part to build a world of peace where the weak are safe and the strong are just.</p>
				<p>We are not helpless before that task or hopeless of its success.</p>
				<p>Confident and unafraid, we labor on--not toward a strategy of annihilation but toward a strategy of peace.</p>
			</div>
		{/if}


		{#if state == 1}
			<div class="speech" transition:fade="{{duration: 800, delay: 1000}}">
				<p>...</p>
				<p>If a free society cannot help the many who are poor, it cannot save the few who are rich.</p>
				<p>To our sister republics south of our border, we offer a special pledge--to convert our good words into good deeds--in a new alliance for progress--to assist free men and free governments in casting off the chains of poverty.</p>
				<p>But this peaceful revolution of hope cannot become the prey of hostile powers.</p>
				<p>Let all our neighbors know that <strong>we shall join with them to oppose aggression</strong> or subversion anywhere in the Americas.
					And let every other power know that this Hemisphere intends to remain the master of its own house.</p>		
				<p>To that world assembly of sovereign states, the United Nations, our last best hope in an age where the instruments of war have far outpaced the instruments of peace, we renew our pledge of support--to prevent it from becoming merely a forum for invective--to strengthen its shield of the new and the weak--and to enlarge the area in which its writ may run.</p>
				<p>Finally, to those nations who would make themselves our adversary, we offer not a pledge but a request: that both sides begin anew the quest for peace, before the dark powers of destruction unleashed by science engulf all humanity in planned or accidental self-destruction.</p>
				<p>...</p>
			</div>
		{/if}


		{#if state == 2}
			<div class="speech" transition:fade="{{duration: 800, delay: 1000}}">
				<p>...</p>
				<p>This is not a sectional issue. Difficulties over segregation and discrimination exist in every city, in every State of the Union, producing in many cities a rising tide of discontent that threatens the public safety.
				</p>
				<p>Nor is this a partisan issue.
				</p>
				<p><strong>In a time of domestic crisis men of good will and generosity should be able to unite</strong> regardless of party or politics. 
				</p>
				<p>This is not even a legal or legislative issue alone.
				</p>		
				<p>It is better to settle these matters in the courts than on the streets, and new laws are needed at every level, but law alone cannot make men see right. 
				</p>
				<p>We are confronted primarily with a moral issue.
				</p>
				<p>It is as old as the scriptures and is as clear as the American Constitution. 
				</p>
				<p>The heart of the question is whether all Americans are to be afforded equal rights and equal opportunities, whether we are going to treat our fellow Americans as we want to be treated.</p>
				<p>...</p>
			</div>
		{/if}
	</div>
</main>


<style>
	main {
		color: 'black';
		height: 100%;	
		display: flex;	
	}

	.col1 {
		color: 'black';
		height: 100%;
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.col2 {
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-family: sans-serif;
		line-height: 1.4;
		font-size: 12pt;
		color: #444;
	}

	.speech {
		position: absolute;
		margin: 70px;
	}

	h1 {
		font-family: serif;
		font-size: 4em;
		font-weight: 100;
		max-width: 840px;
		position: absolute;
		margin: 70px;
	}

	span {
		text-decoration: underline dashed;
		text-decoration-thickness: 4px;
		text-underline-offset: 5px;
		cursor: zoom-in;
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>