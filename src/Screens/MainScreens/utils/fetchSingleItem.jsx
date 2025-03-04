export async function fetchSingleItem(
  id,
  axiosInstance,
  api,
  setValue,
  setError,
  setIsLoading
) {
  try {
    setIsLoading(true);
    const response = await axiosInstance.get(`${api}${id}`);
    console.log(response, "response");
    if (response.status === 200) {
      const fetchedData = response.data;
      setValue(fetchedData);
    } else {
      setError("Failed to fetch data.");
    }
  } catch (error) {
    setError("An error occurred while fetching data.");
  } finally {
    setIsLoading(false);
  }
}
