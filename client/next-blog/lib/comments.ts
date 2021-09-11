export const addComment = async (body, postId) => {
  const uri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/${postId}`;
  console.log("URI:", uri);
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      body,
    }),
  });
  const result = await res.json();
  console.log("RESP", result);

  return result.data;
};
