import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ImageInput, ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_CONTACT_API } from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import CustomEditor from "../../../Components/Partials/CustomIditor/CustomEditor";
import { uploadImage } from "../../../Utilities/uploadImage";

const UpdateContact = ({ id = null, setEditModal, toggleFetch, ...props }) => {
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
        MANAGE_CONTACT_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);


  useEffect(() => {
    if (value) {
      setDefaultValues({
        address: value?.data?.address || "",
        phone: value?.data?.phone || "",
        email: value?.data?.email || "",
      });
      setDescription(value?.data?.description)
    }
  }, [value]);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_CONTACT_API}${id}`,
        {
          address: data?.address,
          phone: data?.phone,
          email: data?.email,
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
      <ShortTextInput
        name="address"
        label="Name"
        placeholder="Enter Address"
        rules={{ required: "Address is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="phone"
        label="Name"
        placeholder="Enter phone"
        rules={{ required: "phone is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="email"
        label="Name"
        placeholder="Enter Email"
        rules={{ required: "Email is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Contact"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateContact;
