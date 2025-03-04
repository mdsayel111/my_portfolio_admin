import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  ImageInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  IMAGE_URL,
  MANAGE_SOCIALLINK_API,
} from "../../../../Utilities/APIs/APIs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
const UpdateSocialLink = ({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const optionValues = [
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "Linkedin" },
    { value: "instagram", label: "Instagram" },
    { value: "pinterest", label: "Pinterest" },
    { value: "twitter", label: "Twitter" },
    { value: "youtube", label: "Youtube" },
  ];
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    link: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_SOCIALLINK_API,
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
        link: value.link || "",
      });
      console.log(value, "value");
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("link", data.link);

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_SOCIALLINK_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Social Link.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Social Link.");
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
          "Update Social Link"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateSocialLink;
