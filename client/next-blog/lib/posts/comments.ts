export const addComment = async (body, postId) => {
  const uri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/${postId}`;
  const res = await fetch(uri, {
    method: "POST",
    body: JSON.stringify({
      body,
    }),
  });
  const result = await res.json();
  console.log("RESP");

  return result.data;
};
