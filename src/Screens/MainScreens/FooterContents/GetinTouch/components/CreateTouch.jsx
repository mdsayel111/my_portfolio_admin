/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { TextAreaInput } from "@antopolis/admin-component-library/dist/inputs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAxiosInstance } from "../../../../../Hooks/Instances/useAxiosInstance";
import {
    GET_IN_TOUCH_API
} from "../../../../../Utilities/APIs/APIs";

export default function CreateTouch({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const handleSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(GET_IN_TOUCH_API, formData);
      console.log(response, "response");
      if (response.status === 201) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Get In Touch created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Get In Touch",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Get In Touch",
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
        placeholder="Enter Headquarter Name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <TextAreaInput
        name="address"
        label="Address"
        placeholder="Enter Headquarter Address"
        rules={{ required: "Address is required" }}
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
