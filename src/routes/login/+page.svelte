<script>
  let username = '';
  let password = '';
  let error = '';
  
  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Token:', data.token);

      // Maybe save the token in localStorage for now
      localStorage.setItem('token', data.token);

      // Redirect to home page or something
      window.location.href = '/home';
      
    } catch (err) {
      error = err.message;
    }
  }
</script>

<main class="login-container">
  <h1>Login</h1>

  <form on:submit|preventDefault={handleLogin}>
    <input type="text" bind:value={username} placeholder="Username" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Login</button>

    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
</main>

<style>
  .login-container h1{
      text-align:left;
  }
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 200px;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid black;
  }

  .error {
    color: red;
    margin-top: 1rem;
  }
</style>

