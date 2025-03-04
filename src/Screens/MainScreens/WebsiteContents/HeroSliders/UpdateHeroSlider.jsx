/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// UpdateCourse.jsx

import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { HERO_SLIDERS_API, IMAGE_URL } from "../../../../Utilities/APIs/APIs";
import { toast } from "@antopolis/admin-component-library/dist/hooks";
import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import {
  ImageInput,
  ShortTextInput,
} from "@antopolis/admin-component-library/dist/inputs";
import { Loader2 } from "lucide-react";
import { Button } from "@antopolis/admin-component-library/dist/ui";
// import { Button } from "@antopolis/admin-component-library/src/Components/ui/button

export default function UpdateHeroSlider({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = useAxiosInstance();

  // Default form values
  const [defaultValues, setDefaultValues] = useState({
    image: "",
    mobileImage: "",
    link: "",
    precedence: "",
  });

  /**
   * Fetch Existing Course Data
   */
  useEffect(() => {
    if (id) {
      fetchHeroSliderData(id);
    }
  }, [id]);

  async function fetchHeroSliderData(id) {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${HERO_SLIDERS_API}getSingleHeroSlider/${id}`
      );

      if (response.status === 200) {
        const heroSliderData = response.data;
        setDefaultValues({
          image: heroSliderData.image || "",
          mobileImage: heroSliderData.mobileImage || "",
          link: heroSliderData.link || "",
          precedence: heroSliderData.precedence || "",
        });
      } else {
        setError("Failed to fetch Restaurant data.");
      }
    } catch (error) {
      setError("An error occurred while fetching Restaurant data.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cuisine", data.cuisine);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${HERO_SLIDERS_API}${id}`,
        formData
      );

      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          variant: "success",
          title: "Success",
          description: "Hero Slider Updated Successfully",
        });
      } else {
        setError(`Failed to update Hero Slider.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Hero Slider.");
    } finally {
      setIsLoading(false);
    }
  }
  console.log("Default Values", IMAGE_URL + defaultValues.image);

  /**
   * Handle Category Selection Change
   */

  return (
    <FormWrapper
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      {...props}
    >
      <div className="grid gap-2">
        {/* Course Name Input */}
        <ImageInput
          name="image"
          label="Image"
          rules={{ required: "Image is required" }}
          className="space-y-1"
          imagePreviewUrl={IMAGE_URL + defaultValues.image}
        />

        <ImageInput
          name="mobileImage"
          label="Mobile Image"
          rules={{ required: "Mobile Image is required" }}
          className="space-y-1"
          imagePreviewUrl={IMAGE_URL + defaultValues.mobileImage}
        />

        <ShortTextInput
          name="precedence"
          label="Precedence"
          placeholder="Enter Precedence"
          rules={{ required: "Precedence is required" }}
          className="space-y-1"
        />

        <ShortTextInput
          name="link"
          label="Link"
          placeholder="Enter Link"
          rules={{ required: "Link is required" }}
          className="space-y-1"
        />

        {/* Display Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <Button className="mt-2" loading={isLoading} type="submit">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Update restaurant"
          )}
        </Button>
      </div>
    </FormWrapper>
  );
}
