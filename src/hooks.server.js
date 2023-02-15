export function handleError({ error, event }) {
  console.log(error)
 
  return {
    message: 'Whoops!',
    error
  };
}
