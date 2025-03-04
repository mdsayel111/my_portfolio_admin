import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  ImageInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_TESTIMONIAL_API } from "../../../../Utilities/APIs/APIs";

export default function CreateTestimonial({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const handleSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    const file = data.image;
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Failed",
        description: "Please select an image",
        varitant: "desctructive",
      });
      setIsLoading(false);
      return;
    }
    formData.append("image", file);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_TESTIMONIAL_API,
        formData
      );
      console.log(response, "response");
      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Testimonial created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Testimonial",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Testimonial",
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
        placeholder="Enter name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="message"
        label="Message"
        placeholder="Enter message"
        className=" placeholder:text-gray-400"
      />
      <ImageInput name={"image"} label={"Image"} />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Testimonial"
        )}
      </Button>
    </FormWrapper>
  );
}
