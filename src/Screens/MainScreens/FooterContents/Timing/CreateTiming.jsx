/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { TIMINGS_API } from "../../../../Utilities/APIs/APIs";

export default function CreateTiming({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [openingDays, setOpeningDays] = useState("");
  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("endTime", endTime);
    formData.append("startTime", startTime);
    formData.append("openingDays", openingDays);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(TIMINGS_API, formData);
      console.log(response, "response");
      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Timing created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Timing",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Timing",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col gap-2 *:flex *:flex-col *:gap-2">
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
        <div>
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
          "Create Timing"
        )}
      </Button>
    </FormWrapper>
  );
}
