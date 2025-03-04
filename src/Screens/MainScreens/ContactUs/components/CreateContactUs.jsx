/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_CONTACT_US_API } from "../../../../Utilities/APIs/APIs";
import { TextAreaInput } from "@antopolis/admin-component-library/dist/inputs";

export default function CreateContactUs({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const handleSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("mapLink", data.mapLink);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_CONTACT_US_API,
        formData
      );
      console.log(response, "response");
      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Contact Us created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Contact Us",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Contact Us",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
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
          "Create Contact Us"
        )}
      </Button>
    </FormWrapper>
  );
}
