/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
import { TIMINGS_API } from "../../../../Utilities/APIs/APIs";

const UpdateTiming = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    address: "",
    name: "",
  });
  const [value, setValue] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openingDays, setOpeningDays] = useState("");
  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        TIMINGS_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({});
      setStartTime(value.startTime);
      setEndTime(value.endTime);
      setOpeningDays(value.openingDays);
    }
  }, [value]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("openingDays", openingDays);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${TIMINGS_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Timing.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Timing.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
      key={startTime}
    >
      <div className="flex flex-col gap-2 *:flex *:flex-col *:gap-2">
        <div>
          <div>
            <label>Opening Days</label>
            <input
              type="text"
              name="openingDays"
              placeholder="Monday-Thursday"
              value={openingDays}
              onChange={(e) => setOpeningDays(e.target.value)}
              className="p-2 w-full text-sm text-black rounded-lg"
            />
          </div>
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 w-full text-sm text-black rounded-lg"
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            type="time"
            className="p-2 w-full text-sm text-black rounded-lg"
          />
        </div>
      </div>

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Timing"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateTiming;
