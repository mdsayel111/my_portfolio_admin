import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_SOCIAL_ICON_API } from "../../../Utilities/APIs/APIs";
import { uploadImage } from "../../../Utilities/uploadImage";

export default function CreateSocialIcon({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const handleSubmit = async (data) => {

    try {
      setIsLoading(true);
      const createData = {
        name: data.name,
        link: data.link,
      };

      const position = !isNaN(data?.position) ? parseInt(data?.position) : 0;
      createData.position = position;
      const response = await axiosInstance.post(MANAGE_SOCIAL_ICON_API, createData);


      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Social Icon created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Social Icon",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Social Icon",
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
        placeholder="Enter Social Icon name"
        rules={{ required: "Name is required" }}

        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="link"
        label="Link"
        placeholder="Enter ]Link"
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="position"
        label="Position"
        placeholder="Enter ]Position"
        className="mb-2 placeholder:text-gray-400"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Social Icon"
        )}
      </Button>
    </FormWrapper>
  );
}
