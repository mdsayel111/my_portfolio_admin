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
import { MANAGE_SOCIALLINK_API } from "../../../../Utilities/APIs/APIs";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

export default function CreateSocialLink({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);

  const optionValues = [
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "Linkedin" },
    { value: "instagram", label: "Instagram" },
    { value: "pinterest", label: "Pinterest" },
    { value: "twitter", label: "Twitter" },
    { value: "youtube", label: "Youtube" },
  ];

  const axiosInstance = useAxiosInstance();
  const handleSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("link", data.link);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_SOCIALLINK_API,
        formData
      );
      console.log(response, "response");
      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Sociallink created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Social link",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Social link",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <SelectInput
        options={optionValues}
        name="name"
        label="Name"
        placeholder="Select Name"
      />
      <ShortTextInput
        name="link"
        label="Link"
        placeholder="Enter link"
        rules={{ required: "Link is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Social link"
        )}
      </Button>
    </FormWrapper>
  );
}
