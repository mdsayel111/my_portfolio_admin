import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_ABOUT_ME_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import CustomEditor from "../../../Components/Partials/CustomIditor/CustomEditor";
import { uploadImage } from "../../../Utilities/uploadImage";

const UpdateAboutMe = ({ id = null, setEditModal, toggleFetch, ...props }) => {
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
        MANAGE_ABOUT_ME_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);


  useEffect(() => {
    if (value) {
      setDefaultValues({
        title: value?.data?.title || "",
        image: value?.data?.image || "",
      });
      setDescription(value?.data?.description)
    }
  }, [value]);

  const handleSubmit = async (data) => {
    let imageLink = defaultValues.image;

    if(typeof data?.image !== "string"){
      
      imageLink = await uploadImage(data?.image);;
    }
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_ABOUT_ME_API}${id}`,
        {
          title: data?.title,
          description: description,
          image: imageLink,
        }
      );
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
      {/* <ShortTextInput
        name="title"
        label="Name"
        placeholder="Enter Subject name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      /> */}
      <CustomEditor label={"Description"} value={description} setValue={setDescription}/>
        <ImageInput
          name={'image'}
          label={'Image'}
          className='space-y-1'
          imagePreviewUrl={defaultValues.image}
        />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update AboutMe"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateAboutMe;
