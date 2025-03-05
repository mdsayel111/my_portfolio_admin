import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_APPLICANT_API, MANAGE_Project_API } from "../../../Utilities/APIs/APIs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { Loader2 } from "lucide-react";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";
const UpdateApplicant = ({
  id = null,
  setEditModal,
  toggleFetch,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const genderOptions = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
  ];
  const [defaultValues, setDefaultValues] = useState({
    imgLink: "",
    liveLink: "",
    clientCodeLink: "",
    serverCodeLink: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_Project_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        imgLink: value?.data?.imgLink || "",
        projectName: value?.data?.projectName || "",
        description: value?.data?.description || "",
        liveLink: value?.data?.liveLink || "",
        clientCodeLink: value?.data?.clientCodeLink || "",
        serverCodeLink: value?.data?.serverCodeLink || "",
      });
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("homeAddress", data.homeAddress);
    formData.append("town", data.town);
    formData.append("postcode", data.postcode);
    formData.append("emailAddress", data.emailAddress);
    formData.append("homeTelephone", data.homeTelephone);
    formData.append("mobileNumber", data.mobileNumber);
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_APPLICANT_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
      } else {
        setError(`Failed to update Applicant.`);
      }
    } catch (error) {
      setError("An error occurred while updating the Applicant.");
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
          placeholder="Enter"
          rules={{ required: "Server Code Link is required" }}
          className="mb-2"
        />
      </div>

      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Update Applicant"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateApplicant;
