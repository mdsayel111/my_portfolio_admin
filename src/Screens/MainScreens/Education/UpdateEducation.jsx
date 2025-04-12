import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_EDUCATION_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";

const UpdateEducation = ({ id = null, setEditModal, toggleFetch, ...props }) => {
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
        MANAGE_EDUCATION_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        institute: value?.data.institute || "",
        department: value?.data.department || "",
        from: value?.data.from || "",
        to: value?.data.to || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {


    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_EDUCATION_API}/${id}`,
        {
          institute: data.institute,
          department: data.department,
          from: data.from,
          to: data.to,
        }
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Education updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update Education",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update Education",
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
          "Update Education"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateEducation;
