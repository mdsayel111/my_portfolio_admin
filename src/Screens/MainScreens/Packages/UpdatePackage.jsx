import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import {
  SelectInput
} from "@antopolis/admin-component-library/dist/inputs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_BOARD_API,
  MANAGE_PACKAGE_API,
  MANAGE_SUBJECT_API,
} from "../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../utils/fetchSingleItem";
import useFetchItems from "../utils/useFetchItems";

const UpdatePackage = ({ id = null, setEditModal, toggleFetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");

  const boards = useFetchItems(MANAGE_BOARD_API);
  const subjects = useFetchItems(MANAGE_SUBJECT_API);

  const [boardOptions, setBoardOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  const [defaultValues, setDefaultValues] = useState({
    name: "",
    date: "",
    price: "",
    board: "",
    subject: "",
  });
  const [value, setValue] = useState(null);

  useEffect(() => {
    setBoardOptions(
      boards.map((board) => ({
        value: board._id,
        label: board.name,
      }))
    );
    setSubjectOptions(
      subjects.map((subject) => ({
        value: subject._id,
        label: subject.name,
      }))
    );
  }, [boards, subjects]);

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_PACKAGE_API + "singlePackage/",
        setValue,
        setError,
        setIsLoading
      );
    }
  }, [id]);
  console.log(defaultValues, "date");
  useEffect(() => {
    if (value) {
      const date = new Date(value.date); // Create a Date object
      const formattedDate = date.toISOString().split("T")[0];
      setDefaultValues({
        title: value.title || "",
        price: value.price || "",
        date: formattedDate || "",
      });
      setDate(value?.data);
    }
  }, [value]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", date);
    formData.append("price", data.price);

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_PACKAGE_API}singlePackage/${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Package updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update package",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed",
        description:
          error?.response?.status === 400
            ? error?.response?.data?.message
            : "An error occurred while updating the package",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const packageTitleOptions = [
    {
      value: "earlyBird",
      label: "Early Bird",
    },
    {
      value: "onTime",
      label: "On Time",
    },
    {
      value: "late",
      label: "Late",
    },
  ];

  console.log(defaultValues, "date");
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      key={defaultValues._id}
      {...props}
    >
      <SelectInput
        options={packageTitleOptions}
        disabled
        name="title"
        label="Package Name"
        placeholder="Select Package Name"
        rules={{ required: "Package Name is required" }}
      />
      <div className="flex flex-col space-y-2 text-sm">
        <label htmlFor="date">Date (Before) </label>
        {console.log(value?.date, "date")}
        <input
          value={date || defaultValues?.date}
          type="date"
          className="p-2 w-full bg-transparent rounded-md border border-zinc-700"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <ShortTextInput
        name="price"
        label="Price"
        type="number"
        placeholder="Enter Price"
        rules={{ required: "Price is required" }}
        className="mb-2 placeholder:text-gray-400"
      />
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Package"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdatePackage;
