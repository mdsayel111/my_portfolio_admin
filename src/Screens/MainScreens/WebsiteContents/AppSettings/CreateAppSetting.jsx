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
import { MANAGE_APP_SETTING_API } from "../../../../Utilities/APIs/APIs";

export default function CreateAppSetting({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = useAxiosInstance();

  async function handleSubmit(data) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("image", data.image);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_APP_SETTING_API,
        formData
      );

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          variant: "success",
          title: "Success",
          description: "App setting Create Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to Create App Setting`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to Create  App Setting`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  console.log();

  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <ShortTextInput
          name="name"
          label="Name"
          placeholder="Enter App setting name"
          rules={{ required: "Name is required" }}
          className="space-y-1"
        />
        <ImageInput
          name="image"
          label="Image"
          rules={{ required: "Image is required" }}
          className="space-y-1"
        />
        <Button className="mt-2" loading={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create App Setting"
          )}
        </Button>
      </div>
    </FormWrapper>
  );
}
