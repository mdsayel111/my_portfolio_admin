import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  ImageInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import {
  IMAGE_URL,
  MANAGE_TESTIMONIAL_API,
} from "../../../../Utilities/APIs/APIs";
import {
  Button,
  Toast,
} from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
const UpdateTestimonial = ({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    message: "",
    image: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_TESTIMONIAL_API,
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
        message: value.message || "",
        image: value.imageUrl || "",
      });
      console.log(value, "value");
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    const file = data.image;

    if (file?.type?.startsWith("image/")) {
      formData.append("image", file);
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_TESTIMONIAL_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Testimonial.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Testimonial.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper
      defaultValues={defaultValues}
      key={defaultValues.name}
      onSubmit={handleSubmit}
      {...props}
    >
      <ShortTextInput
        name="name"
        label="Name"
        placeholder="Enter name"
        rules={{ required: "Name is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <ShortTextInput
        name="message"
        label="Message"
        placeholder="Enter message"
        className=" placeholder:text-gray-400"
      />
      <ImageInput
        name={"image"}
        label={"Image"}
        imagePreviewUrl={IMAGE_URL + value?.imageUrl}
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Testimonial"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateTestimonial;
