import axios from "axios";

export const fetchMethod = async (method, path, token, body) => {
  const headerWithToken = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const headerWithOutToken = {
    "Content-Type": "application/json",
  };

  const requestOption = {
    method,
    headers: token ? headerWithToken : headerWithOutToken,
    ...(body && { body: JSON.stringify(body) }),
  };

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    requestOption
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log("err in fetch");
      }
    })
    .then((data) => data)
    .catch((err) => err)
    .catch((err) => err);

  return data;
};

export const fetcher = async (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => res.data.result)
    .catch((error) => console.log(error, "err in fetcher"));

export const getCategory = async () => {
  const main = localStorage.getItem("main");
  const jsonData = JSON.parse(main);
  if (jsonData) {
    return jsonData;
  } else {
    const data = await fetchMethod("GET", "product/cats");
    if (data?.success) {
      localStorage.setItem(data?.result);
      return data?.result;
    }
  }
};
