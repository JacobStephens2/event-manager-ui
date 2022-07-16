function DeleteTask() {
  function deleteTask() {
    // Delete task
    fetch(process.env.REACT_APP_API_ORIGIN + '/task', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }, null, 2)
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = window.location.origin;
      });
  }
  return (
    <button onClick={deleteTask}>
      Delete
    </button>
  )
}
export default DeleteTask;
