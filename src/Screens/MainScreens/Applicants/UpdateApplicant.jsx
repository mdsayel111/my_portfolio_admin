import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_APPLICANT_API } from "../../../Utilities/APIs/APIs";
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
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    homeAddress: "",
    town: "",
    postcode: "",
    emailAddress: "",
    homeTelephone: "",
    mobileNumber: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_APPLICANT_API,
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    if (value) {
      setDefaultValues({
        firstName: value.firstName || "",
        middleName: value.middleName || "",
        lastName: value.lastName || "",
        dob: value.dob || "",
        gender: value.gender || "",
        homeAddress: value.homeAddress || "",
        town: value.town || "",
        postcode: value.postcode || "",
        emailAddress: value.emailAddress || "",
        homeTelephone: value.homeTelephone || "",
        mobileNumber: value.mobileNumber || "",
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
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="max-h-[75vh] overflow-auto">
        <ShortTextInput
          name="firstName"
          label="First Name"
          placeholder="Enter"
        />
        <ShortTextInput
          name="middleName"
          label="Middle Name"
          placeholder="Enter"
          rules={{ required: "Middle Name is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="lastName"
          label="Last Name"
          placeholder="Enter"
          rules={{ required: "Last Name is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="dob"
          label="Date of Birth"
          placeholder="Enter"
          rules={{ required: "Date of Birth is required" }}
          className="mb-2"
        />
        <SelectInput
          options={genderOptions}
          name="gender"
          label="Gender"
          placeholder="Select Gender"
        />
        <ShortTextInput
          name="homeAddress"
          label="Home Address"
          placeholder="Enter"
          rules={{ required: "Home Address is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="town"
          label="Town"
          placeholder="Enter"
          rules={{ required: "Town is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="postcode"
          label="Postcode"
          placeholder="Enter"
          rules={{ required: "Postcode is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="emailAddress"
          label="Email Address"
          placeholder="Enter"
          rules={{ required: "Email Address is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="homeTelephone"
          label="Home Telephone"
          placeholder="Enter"
          rules={{ required: "Home Telephone is required" }}
          className="mb-2"
        />
        <ShortTextInput
          name="mobileNumber"
          label="Mobile Number"
          placeholder="Enter"
          rules={{ required: "Mobile Number is required" }}
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
