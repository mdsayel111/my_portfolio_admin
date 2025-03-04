import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_LEVEL_API } from "../../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
import Switch from "../../../../Components/Partials/Element/Switch/Switch";

const UpdateLevel = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    // tier: "",
  });
  const [value, setValue] = useState(null);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_LEVEL_API,
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
        precedence: value.precedence || "",
      });
      setFeatured(value.isFeatured);
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("precedence", data.precedence);
    formData.append("isFeatured", featured);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_LEVEL_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update qualification.`);
      }
    } catch (error) {
      setError(
        error?.response?.status === 400
          ? error?.response?.data?.message
          : "An error occurred while updating the qualification."
      );
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
        className="mb-2"
        placeholder="Enter qualification name"
        rules={{ required: "Name is required" }}
      />
      <Switch value={featured} setValue={setFeatured} label="Is Featured" />

      <ShortTextInput
        name="precedence"
        label="Featured: Serial Number"
        className="mb-2"
        placeholder="Enter qualification name"
        rules={{ required: "Name is required" }}
      />

      <p className="text-sm mt-2 text-red-500">{error && error}</p>
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Qualification"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateLevel;
