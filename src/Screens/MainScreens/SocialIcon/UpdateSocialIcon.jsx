import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button, DropdownMenu } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_SOCIAL_ICON_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import CustomEditor from "../../../Components/Partials/CustomIditor/CustomEditor";
import { uploadImage } from "../../../Utilities/uploadImage";

const UpdateSocialIcon = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [description, setDescription] = useState("");

  const [defaultValues, setDefaultValues] = useState({
    title: "",
    image: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_SOCIAL_ICON_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);


  useEffect(() => {
    if (value) {
      setDefaultValues({
        name: value?.data?.name || "",
        link: value?.data?.link || "",
        position: value?.data?.position || "",
      });
      setDescription(value?.data?.description)
    }
  }, [value]);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      const updateData = {
        name: data.name,
        link: data.link,
      };

      const position = !isNaN(data?.position) ? parseInt(data?.position) : 0;
      updateData.position = position;
      const response = await axiosInstance.patch(`${MANAGE_SOCIAL_ICON_API}${id}`, updateData);
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Subject updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update Subject",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update Subject",
        variant: "destructive",
      });
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
      <DropdownMenu />
      <ShortTextInput
        name="name"
        label="Name"
        placeholder="Enter name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="link"
        label="Link"
        placeholder="Enter link"
        rules={{ required: "Link is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="position"
        label="Position"
        placeholder="Enter position"
        rules={{ required: "Position is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Social Icon"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateSocialIcon;
