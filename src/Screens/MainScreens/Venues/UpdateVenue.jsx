import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_VENUE_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";

const UpdateVenue = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();

  const [defaultValues, setDefaultValues] = useState({
    name: "",
    details: "",
    coordinates: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_VENUE_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        name: value.name || "",
        details: value.details || "",
        coordinates:
          !value.coordinates.latitude || !value.coordinates.longitude
            ? ""
            : `${value.coordinates.latitude}, ${value.coordinates.longitude}`,
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    const [latitude, longitude] = data.coordinates.split(", ");
    const coordinates = { latitude: latitude, longitude: longitude };
    formData.append("coordinates", JSON.stringify(coordinates));

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_VENUE_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Subject updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update Subject",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update Subject",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
    >
      <ShortTextInput
        name="name"
        label="Name"
        placeholder="Enter Subject name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="details"
        label="Details"
        placeholder="Enter Details"
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="coordinates"
        label="Coordinates"
        placeholder="Enter coordinates e.g 23.773050893048406, 90.40703311189634"
        rules={{ required: "Coordinates is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Venue"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateVenue;
