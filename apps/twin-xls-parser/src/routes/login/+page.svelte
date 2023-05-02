<div class="grid h-full place-items-center">
	<section class="w-96">
		<h1 class="text-2xl font-bold text-center">Twin XLS Importer</h1>

		<form method="post" class="flex flex-col gap-4">
			<div class="w-full form-control">
				<label class="label" for="email">
					<span class="label-text">User</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="user@email.com"
					class="w-full input input-bordered"
				/>
			</div>
			<div class="w-full form-control">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					id="password"
					name="password"
					autocomplete="new-password"
					class="w-full input input-bordered"
				/>
			</div>

			<button type="submit" class="btn">Login</button>
		</form>
	</section>
</div>
