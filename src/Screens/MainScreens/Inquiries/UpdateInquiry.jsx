import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_INQUIRY_API } from "../../../Utilities/APIs/APIs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
const UpdateInquiry = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    message: "",
    telephone: "",
    status: "",
    email: "",
  });
  const [value, setValue] = useState(null);
  const optionValues = [
    { value: "pending", label: "pending" },
    { value: "responded", label: "responded" },
    { value: "cancelled", label: "cancelled" },
  ];

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_INQUIRY_API,
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
        message: value.message || "",
        telephone: value.telephone || "",
        status: value.status || "",
        email: value.email || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("status", data.status);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_INQUIRY_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Inquiry.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Inquiry.");
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
      <div className="flex flex-col gap-3 mb-2">
        <p className="space-y-px text-sm">
          <span className="font-bold text-white ">Name:</span>
          <p className="text-gray-400 text-base">{value?.name}</p>
        </p>
        <p className="space-y-px text-sm">
          <span className="font-bold text-white ">Message:</span>
          <p className="text-gray-400 text-base">{value?.message}</p>
        </p>
        <p className="space-y-px text-sm">
          <span className="font-bold text-white ">Email:</span>
          <p className="text-gray-400 text-base">{value?.email}</p>
        </p>
      </div>

      <SelectInput
        options={optionValues}
        name="status"
        label="Status"
        placeholder="Select Status"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Status"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateInquiry;
