/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TextAreaInput } from "@antopolis/admin-component-library/dist/inputs";
import { useAxiosInstance } from "../../../../../Hooks/Instances/useAxiosInstance";
import { fetchSingleItem } from "../../../utils/fetchSingleItem";
import { GET_IN_TOUCH_API } from "../../../../../Utilities/APIs/APIs";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";

const UpdateTouch = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    address: "",
    name: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        GET_IN_TOUCH_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        address: value.address || "",
        name: value.name || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("name", data.name);

    try {
      setIsLoading(true);
      await axiosInstance.patch(`${GET_IN_TOUCH_API}${id}`, formData);
      toggleFetch();
      setEditModal(false);
      toast.success("Item updated successfully");
    } catch (error) {
      setError("An error occurred while updating the Contact Us.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
      key={id}
    >
      <ShortTextInput
        name="name"
        label="Name"
        placeholder="Enter Contact Us name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <TextAreaInput
        name="address"
        label="Address"
        placeholder="Enter Contact Us address"
        rules={{ required: "Address is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Board"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateTouch;
