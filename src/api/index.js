const limit = 8;

const fetchData = async (pageNum) => {
  try {
    const resp = await fetch(
      `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${pageNum}`
    );
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
