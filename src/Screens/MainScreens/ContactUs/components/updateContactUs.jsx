/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
import { MANAGE_CONTACT_US_API } from "../../../../Utilities/APIs/APIs";
import { TextAreaInput } from "@antopolis/admin-component-library/dist/inputs";

const UpdateContactUs = ({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    address: "",
    phone: "",
    email: "",
    mapLink: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_CONTACT_US_API,
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
        phone: value.phone || "",
        email: value.email || "",
        mapLink: value.mapLink || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("mapLink", data.mapLink);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_CONTACT_US_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Contact Us.`);
      }
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
      <TextAreaInput
        name="address"
        label="Address"
        placeholder="Enter Contact Us address"
        rules={{ required: "Address is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <ShortTextInput
        name="phone"
        label="Phone"
        placeholder="Enter Contact Us phone"
        rules={{ required: "Phone is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="email"
        label="Email"
        placeholder="Enter Contact Us email"
        className="placeholder:text-gray-400"
      />
      <TextAreaInput
        name="mapLink"
        label="Map Link"
        placeholder="Enter  map link"
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

export default UpdateContactUs;
