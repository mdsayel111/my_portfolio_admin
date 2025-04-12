/* eslint-disable react/prop-types */
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_EDUCATION_API
} from "../../../Utilities/APIs/APIs";

export default function CreateEducation({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const { subLevelId } = CLUseParams();

  const handleSubmit = async (data) => {

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(MANAGE_EDUCATION_API, {
        institute: data.institute,
        department: data.department,
        from: data.from,
        to: data.to,
      });

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Education created successfully",
          varitant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create Education",
          varitant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not create Education",
        varitant: "desctructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <ShortTextInput
        name="institute"
        label="Institute Name"
        placeholder="Enter institute name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="department"
        label="Department"
        placeholder="Enter department"
        className="mb-2 placeholder:text-gray-400"
      />
      <div className="flex justify-between">
      <ShortTextInput
        name="from"
        label="From"
        placeholder="Enter From"
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="to"
        label="To"
        placeholder="Enter TO"
        className="mb-2 placeholder:text-gray-400"
      />
      </div>
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Create Education"
        )}
      </Button>
    </FormWrapper>
  );
}
