import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_HERO_ANIMATION_TEXT_API } from "../../../../Utilities/APIs/APIs";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";

export default function CreateHeroTextAnimation({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const { heroId } = CLUseParams();
  const handleSubmit = async (data) => {
    setIsLoading(true);
    const createData = {
      text: data?.text,
      hero: heroId
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(MANAGE_HERO_ANIMATION_TEXT_API, createData);

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "qualification created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create qualification",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create qualification",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <ShortTextInput
        name="text"
        label="Text"
        placeholder="Enter"
        rules={{ required: "Text is required" }}
        className="mb-2 placeholder:text-gray-400"
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Create Qualification"
        )}
      </Button>
    </FormWrapper>
  );
}
