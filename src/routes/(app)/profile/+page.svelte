<script lang="ts">
	import type { PageProps } from './$types';
	import { logout } from '$remotes/auth.remote';

	let { data }: PageProps = $props();
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
<form method="POST">
	<button formaction={logout.action} class="btn btn-primary">Logout</button>
</form>
