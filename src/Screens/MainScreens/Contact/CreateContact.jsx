import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_CONTACT_API } from "../../../Utilities/APIs/APIs";
import { uploadImage } from "../../../Utilities/uploadImage";

export default function CreateContact({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const handleSubmit = async (data) => {
    const imgLink = await uploadImage(data?.image);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(MANAGE_CONTACT_API, {
        title: data.title,
        description: data.description,
        image: imgLink,
      });

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Contact created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Contact",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Contact",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <ShortTextInput
        name="address"
        label="Name"
        placeholder="Enter Contact name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="description"
        label="details"
        placeholder="Enter Details"
        className="mb-2 placeholder:text-gray-400"
      />
      <ImageInput
              name={'image'}
              label={'Image'}
              className='space-y-1'
            />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Contact"
        )}
      </Button>
    </FormWrapper>
  );
}
