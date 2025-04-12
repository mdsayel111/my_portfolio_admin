import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_PROJECT_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";
const UpdateProject = ({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({});
  const [value,setValue] = useState(null)

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_PROJECT_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value?.data) {
      setDefaultValues({
        image: value?.data?.imgLink || "",
        projectName: value?.data?.projectName || "",
        description: value?.data?.description || "",
        liveLink: value?.data?.liveLink || "",
        clientCodeLink: value?.data?.clientCodeLink || "",
        serverCodeLink: value?.data?.serverCodeLink || "",
      });
      console.log(value?.data?.liveLink)
    }
  }, [value?.data]);

  console.log(defaultValues)

  const handleSubmit = async (data) => {
    const updateData = {
      serverCodeLink: data?.serverCodeLink,
      clientCodeLink: data?.clientCodeLink,
      liveLink: data?.liveLink,
      description: data?.description,
      projectName: data?.projectName
    }
    if(typeof data?.image !== "string"){
      const imageLink = await uploadImage(data?.image);
      updateData.resumeImgLink = imageLink;
    }
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_PROJECT_API}${id}`,
        updateData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Project.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
      key={defaultValues?.projectName}
    >
      <div className="max-h-[75vh] overflow-auto">
        <ShortTextInput
          name="projectName"
          label="Project Name"
          placeholder="Enter"
          rules={{ required: "Project Name is required" }}
        />
        <ShortTextInput
          name="description"
          label="MDescription"
          placeholder="Enter"
          rules={{ required: "Description is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="liveLink"
          label="Live Link"
          placeholder="Enter"
          rules={{ required: "Live Link is required" }}liveLink
          className="mb-2"
        />
        <ShortTextInput
          name="clientCodeLink"
          label="Client Code Link"
          placeholder="Enter"
          rules={{ required: "Client Code Link is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="serverCodeLink"
          label="Server Code Link"
          placeholder="Enter"
          rules={{ required: "Server Code Link is required" }}
          className="mb-2"
        />
        <ImageInput
          name={'image'}
          label={'Image'}
          className='space-y-1'
          imagePreviewUrl={defaultValues.image}
        />
      </div>

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Project"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateProject;
