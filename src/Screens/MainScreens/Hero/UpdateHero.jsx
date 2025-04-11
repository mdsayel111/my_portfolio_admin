import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_HERO_API
} from "../../../Utilities/APIs/APIs";
import { uploadImage } from "../../../Utilities/uploadImage";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import CustomEditor from "../../../Components/Partials/CustomIditor/CustomEditor";

const UpdateHero = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [value, setValue] = useState(null);
  // const [description, setDescription] = useState("");

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        "",
        axiosInstance,
        MANAGE_HERO_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  console.log(value, "value")

    useEffect(() => {
      if (value) {
        setDefaultValues({
          // title: value?.data?.title || "",
          // name: value?.data?.name || "",
          image: value?.data?.img || "",
        });
        setDescription(value?.data?.description)
      }
    }, [value]);

  const handleSubmit = async (data) => {
    const updateData = {
      // name: data?.name,
      // title: data?.title,
      // description: description
    }

    if(typeof data?.image !== "string"){
      const imageLink = await uploadImage(data?.image);
      updateData.image = imageLink;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_HERO_API}${id}`,
        updateData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Hero updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update hero",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed",
        description:
          error?.response?.status === 400
            ? error?.response?.data?.message
            : "An error occurred while updating the hero",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(defaultValues, "date");
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      key={`${defaultValues.name}`}
      {...props}
    >
      {/* <ShortTextInput
        name="title"
        label="Title"
        type="text"
        placeholder="Enter"
        rules={{ required: "Title is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="name"
        label="Name"
        type="text"
        placeholder="Enter"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      /> */}
      
      {/* <CustomEditor label={"Description"} value={description} setValue={setDescription}/> */}
      <ImageInput
        name={'image'}
        label={'Image'}
        className='space-y-1'
        imagePreviewUrl={defaultValues.image}
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Hero"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateHero;
