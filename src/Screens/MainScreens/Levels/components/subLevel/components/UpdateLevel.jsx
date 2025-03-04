import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import  { useEffect, useState } from "react";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { useAxiosInstance } from "../../../../../../Hooks/Instances/useAxiosInstance";
import { fetchSingleItem } from "../../../../utils/fetchSingleItem";
import { MANAGE_SUBLEVEL_API } from "../../../../../../Utilities/APIs/APIs";


const UpdateSubLevel = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    tier: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_SUBLEVEL_API,
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
        tier: value.tier || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_SUBLEVEL_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update qualification.`);
      }
    } catch (error) {
      setError("An error occurred while updating the qualification.");
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
        name="name"
        label="Name"
        className="mb-2"
        placeholder="Enter qualification name"
        rules={{ required: "Name is required" }}
      />

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Qualification"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateSubLevel;
