import { useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput, } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { uploadImage } from "../../../Utilities/uploadImage";
import { MANAGE_PROJECT_API } from "../../../Utilities/APIs/APIs";
import { Loader2 } from "lucide-react";
import { da } from "date-fns/locale";


export default function CreateProject({ setCreateModal, toggleFetch, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const handleSubmit = async (data) => {
    const createData = {
      serverCodeLink: data?.serverCodeLink,
      clientCodeLink: data?.clientCodeLink,
      liveLink: data?.liveLink,
      description: data?.description,
      projectName: data?.projectName
    }
    const position = !isNaN(data?.position) ? parseInt(data?.position) : 0;
    createData.position = position;

    if (typeof data?.image !== "string") {
      const imageLink = await uploadImage(data?.image);
      createData.imgLink = imageLink;
    }

    console.log(createData)
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        MANAGE_PROJECT_API, createData);

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "project created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create project",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create project",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
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
          rules={{ required: "Live Link is required" }}
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
          placeholder="Enter Server Code Link"
          rules={{ required: "Server Code Link is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="position"
          label="Position"
          placeholder="Enter Position"
          rules={{ required: "Server Code Link is required" }}
          className="mb-2"
        />
        <ImageInput
          name={'image'}
          label={'Image'}
          className='space-y-1'
        />
      </div>

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Create Project"
        )}
      </Button>
    </FormWrapper>
  );
}
