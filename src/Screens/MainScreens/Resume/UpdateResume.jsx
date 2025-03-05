import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_RESUME_API } from "../../../Utilities/APIs/APIs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import { uploadImage } from "../../../Utilities/uploadImage";
const UpdateResume = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    resumeLink: "",
    resumeImgLink: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        "",
        axiosInstance,
        MANAGE_RESUME_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        resumeLink: value?.data?.resumeLink || "",
        resumeImgLink: value?.data?.resumeImgLink || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const updateData = {};
    updateData.resumeLink = data?.resumeLink
    if(data?.resumeImageLink){
      const imageLink = await uploadImage(data?.resumeImageLink);
      updateData.resumeImgLink = imageLink;
    }
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_RESUME_API}`,
        updateData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Resume.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Resume.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(defaultValues)
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
      key={defaultValues?.resumeLink}
    >
      <ShortTextInput
        name="resumeLink"
        label="Link"
        className="mb-2"
        placeholder="Enter Resume link"
        rules={{ required: "Link is required" }}
      />
      
      <ImageInput
          name={'resumeImageLink'}
          label={'Image'}
          className='space-y-1'
          imagePreviewUrl={defaultValues.resumeImgLink}
        />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Resume"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateResume;
