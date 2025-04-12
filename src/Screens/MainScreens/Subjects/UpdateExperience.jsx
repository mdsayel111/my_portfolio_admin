import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_EXPERIENCE_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";

const UpdateExperience = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();

  const [defaultValues, setDefaultValues] = useState({
    company: "",
    position: "",
    from: "",
    to: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_EXPERIENCE_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        company: value?.data.company || "",
        position: value?.data.position || "",
        from: value?.data.from || "",
        to: value?.data.to || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {


    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_EXPERIENCE_API}/${id}`,
        {
          company: data.company,
          position: data.position,
          from: data.from,
          to: data.to,
        }
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Experience updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update Experience",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update Experience",
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
      <ShortTextInput
        name="company"
        label="Company Name"
        placeholder="Enter Experience name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="position"
        label="Position"
        placeholder="Enter Position"
        className="mb-2 placeholder:text-gray-400"
      />
      <div>
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
          "Update Experience"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateExperience;
