import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import {
  SelectInput
} from "@antopolis/admin-component-library/dist/inputs";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_PACKAGE_API
} from "../../../Utilities/APIs/APIs";

export default function CreatePackage({
  setCreateModal,
  toggleFetch,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [date, setDate] = useState("");

  // const [boardOptions, setBoardOptions] = useState([]);
  // const [subjectOptions, setSubjectOptions] = useState([]);
  // const boards = useFetchItems(MANAGE_BOARD_API);
  // const subjects = useFetchItems(MANAGE_SUBJECT_API);

  // useEffect(() => {
  //   setBoardOptions(
  //     boards.map((board) => ({
  //       value: board._id,
  //       label: board.name,
  //     }))
  //   );
  //   setSubjectOptions(
  //     subjects.map((subject) => ({
  //       value: subject._id,
  //       label: subject.name,
  //     }))
  //   );
  // }, [boards, subjects]);

  const { subLevelId } = CLUseParams();

  const packgeNameOptios = [
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

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("date", date);
    formData.append("price", data.price);
    formData.append("subLevel", subLevelId);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(MANAGE_PACKAGE_API, formData);

      if (response.status === 200) {
        toggleFetch();
        setCreateModal(false);
        toast({
          title: "Success",
          description: "Package created successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not create package",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: error?.response?.status === 400 ? error?.response?.data?.message :"An error occurred while creating the package",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} {...props}>
      <SelectInput
        options={packgeNameOptios}
        name="title"
        label="Package Name"
        placeholder="Select Package Name"
        rules={{ required: "Package Name is required" }}
      />
      <div className="flex flex-col space-y-2 text-sm">
        <label htmlFor="date">Date (Before) </label>
        <input
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
          "Create Package"
        )}
      </Button>
    </FormWrapper>
  );
}
