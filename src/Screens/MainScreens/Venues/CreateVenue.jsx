import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_VENUE_API } from "../../../Utilities/APIs/APIs";

export default function CreateVenue({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    const [latitude, longitude] = data.coordinates.split(", ");
    const coordinates = { latitude: latitude, longitude: longitude };
    formData.append("coordinates", JSON.stringify(coordinates));

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(MANAGE_VENUE_API, formData);

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Venue created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Venue",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Venue",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <ShortTextInput
        name="name"
        label="Name"
        placeholder="Enter Venue name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="details"
        label="details"
        placeholder="Enter Details"
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="coordinates"
        label="Coordinates (latitude and longitude)"
        placeholder="Enter coordinates e.g 23.773050893048406, 90.40703311189634"
        rules={{ required: "Coordinates is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Venue"
        )}
      </Button>
    </FormWrapper>
  );
}
