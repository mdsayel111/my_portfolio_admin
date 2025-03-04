/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  ImageInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/inputs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@antopolis/admin-component-library/dist/ui";
import { toast } from "@antopolis/admin-component-library/dist/hooks";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  HERO_SLIDERS_API,
  MANAGE_APP_SETTING_API,
} from "../../../../Utilities/APIs/APIs";

export default function CreateHeroSlider({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxiosInstance();

  async function handleSubmit(data) {
    const formData = new FormData();
    console.log("Hero Slider Data", data);
    
    formData.append("link", data.link);
    formData.append("precedence", data.precedence);
    formData.append("image", data.image);
    formData.append("mobileImage", data.mobileImage);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(HERO_SLIDERS_API, formData);

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          variant: "success",
          title: "Success",
          description: "Hero Slider Created Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to Create Hero Slider`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to Create  Hero Slider`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <ImageInput
          name="image"
          label="Image"
          rules={{ required: "Image is required" }}
          className="space-y-1"
        />

        <ImageInput
          name="mobileImage"
          label="Mobile Image"
          rules={{ required: "Mobile Image is required" }}
          className="space-y-1"
        />

        <ShortTextInput
          name="precedence"
          label="Precedence"
          placeholder="Enter Precedence"
          rules={{ required: "Precedence is required" }}
          className="space-y-1"
        />

        <ShortTextInput
          name="link"
          label="Link"
          placeholder="Enter Link"
          rules={{ required: "Link is required" }}
          className="space-y-1"
        />

        <Button className="mt-2" loading={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create Hero Slider"
          )}
        </Button>
      </div>
    </FormWrapper>
  );
}
